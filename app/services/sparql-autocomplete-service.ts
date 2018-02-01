'use strict'
import { SerializationService } from './worker-service/serialization-service';
import { getPrefLangString } from '../filters/preferred-language-filter';

import { INode, ONodeSet, DataFactory } from '../models/rdf'
import { WorkerService } from './worker-service/worker-service'
import { FMap, EMap, StringSet } from 'components/collection-utils'
import { FibraSparqlService } from './fibra-sparql-service'
import { StateWorkerService, WorkerWorkerService } from './worker-service/worker-worker-service'
import { DataModel } from './project-service/data-model'
import { SparqlService, ISparqlBindingResult } from 'angular-sparql-service'
import * as angular from 'angular';
import { UnifyMap } from 'services/id-consolidation-utils';

export class AutocompletionResults {
  public localMatchingResults: ResultGroup[] = []
  public localNonMatchingResults: ResultGroup[] = []
  public remoteResults: ResultGroup[] = []
}

export class ResultGroup {
  public results: Result[] = []
  constructor(public label: string) { }
}

export class Result {
  public additionalInformation: { [varName: string]: INode[] } = {}
  constructor(public ids: INode[], public datasources: string[], public matchedLabel: INode, public prefLabel: INode) { }
}

export class SparqlAutocompleteService {

  public static defaultMatchQuery: string = `
PREFIX text: <http://jena.apache.org/text#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX mads: <http://www.loc.gov/mads/rdf/v1#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX sf: <http://ldf.fi/functions#>
PREFIX fibra: <http://ldf.fi/fibra/schema#>
PREFIX dcterms: <http://purl.org/dc/terms/>
SELECT ?groupId ?id ?prefLabel ?matchedLabel ?sameAs ?altLabel { # ADDITIONALVARIABLES
# STARTGRAPH
  {
    SELECT ?groupId ?id (SUM(?sc) AS ?score) {
      {
        SELECT ?groupId ?id ?sc {
          BIND(CONCAT("\\"",REPLACE(<QUERY>,"([\\\\+\\\\-\\\\&\\\\|\\\\!\\\\(\\\\)\\\\{\\\\}\\\\[\\\\]\\\\^\\\\\\"\\\\~\\\\*\\\\?\\\\:\\\\/\\\\\\\\])","\\\\$1"),"\\"") AS ?query)
          (?id ?sc) text:query ?query .
          ?id skos:prefLabel|rdfs:label|skos:altLabel|mads:authoritativeLabel|mads:variantLabel ?matchedLabel
          FILTER (LCASE(?matchedLabel)=LCASE(<QUERY>))
          ?id a ?groupIdLocal .
          BIND(?groupIdLocal AS ?groupId)
          # CONSTRAINTS
        }
        GROUP BY ?groupId ?id ?sc
        LIMIT <LIMIT>
      } UNION {
        SELECT ?groupId ?id ?sc {
          BIND(CONCAT(REPLACE(<QUERY>,"([\\\\+\\\\-\\\\&\\\\|\\\\!\\\\(\\\\)\\\\{\\\\}\\\\[\\\\]\\\\^\\\\\\"\\\\~\\\\*\\\\?\\\\:\\\\/\\\\\\\\])","\\\\$1"),"*") AS ?query)
          (?id ?sc) text:query ?query .
          ?id a ?groupIdLocal .
          BIND(?groupIdLocal AS ?groupId)
          # CONSTRAINTS
        }
        GROUP BY ?groupId ?id ?sc
        LIMIT <LIMIT>
      }
    }
    GROUP BY ?groupId ?id
    HAVING(BOUND(?id))
    LIMIT <LIMIT>
  }
  ?id skos:prefLabel|rdfs:label|skos:altLabel|mads:authoritativeLabel|mads:variantLabel ?matchedLabel
  FILTER (REGEX(LCASE(?matchedLabel),CONCAT("\\\\b",LCASE(<QUERY>))))
  {
    ?id sf:preferredLanguageLiteral (skos:prefLabel mads:authoritativeLabel rdfs:label skos:altLabel mads:variantLabel '<PREFLANG>' '' ?prefLabel) .
  } UNION {
    ?id owl:sameAs ?sameAs .
  } UNION {
    ?id skos:altLabel|mads:variantLabel ?altLabel .
  }
  # ADDITIONALSELECT
# ENDGRAPH
}
`

  constructor(private workerService: WorkerService) { }

  public autocomplete(query: string, limit: number, queryRemote: boolean = false, canceller?: angular.IPromise<any>): angular.IPromise<AutocompletionResults> {
    return this.workerService.call('sparqlAutocompleteWorkerService', 'autocomplete', [query, limit, queryRemote], canceller)
  }

}

class ProcessingData {
  public unifyMap: UnifyMap = new UnifyMap()
  public idToGroupIdSet: EMap<StringSet> = new EMap<StringSet>(() => new StringSet())
  public idToPrefLabelSet: EMap<ONodeSet<INode>> = new EMap<ONodeSet<INode>>(() => new ONodeSet<INode>())
  public idToMatchedLabelSet: EMap<ONodeSet<INode>> = new EMap<ONodeSet<INode>>(() => new ONodeSet<INode>())
  public idToAltLabelSet: EMap<ONodeSet<INode>> = new EMap<ONodeSet<INode>>(() => new ONodeSet<INode>())
  public idToDatasourceSet: EMap<StringSet> = new EMap<StringSet>(() => new StringSet())
  public processAndConsolidate(result: ISparqlBindingResult<{ [id: string]: ISparqlBinding }>, endpoint: string): void {
    result.results.bindings.forEach(binding => {
      let id: string = binding['id'].value
      this.idToDatasourceSet.goc(id).add(endpoint)
      if (binding['prefLabel'])
        this.idToPrefLabelSet.goc(id).add(DataFactory.instance.nodeFromBinding(binding['prefLabel']))
      if (binding['altLabel'])
        this.idToAltLabelSet.goc(id).add(DataFactory.instance.nodeFromBinding(binding['altLabel']))
      if (binding['matchedLabel'])
        this.idToMatchedLabelSet.goc(id).add(DataFactory.instance.nodeFromBinding(binding['matchedLabel']))
      if (binding['groupId']) {
        this.idToGroupIdSet.goc(id).add(binding['groupId'].value)
        if (binding['groupLabel'])
          this.idToPrefLabelSet.goc(binding['groupId'].value).add(DataFactory.instance.nodeFromBinding(binding['groupLabel']))
      }
    })
    this.unifyMap.consolidate(result)
    this.unifyMap.idToIdSet.each((idSet: StringSet, id: string) => {
      let datasourceSet: StringSet = this.idToDatasourceSet.get(id)
      let groupIdSet: StringSet = this.idToGroupIdSet.get(id)
      let prefLabelSet: ONodeSet<INode> = this.idToPrefLabelSet.get(id)
      let matchedLabelSet: ONodeSet<INode> = this.idToMatchedLabelSet.get(id)
      let altLabelSet: ONodeSet<INode> = this.idToAltLabelSet.get(id)
      idSet.each(oid => {
        let oDatasourceSet: StringSet = this.idToDatasourceSet.get(oid)
        if (datasourceSet !== oDatasourceSet) {
          if (datasourceSet) {
            if (oDatasourceSet) datasourceSet.adds(oDatasourceSet)
            this.idToDatasourceSet.set(oid, datasourceSet)
          } else if (oDatasourceSet) this.idToDatasourceSet.set(id, oDatasourceSet)
        }
        let oGroupIdSet: StringSet = this.idToGroupIdSet.get(oid)
        if (groupIdSet !== oGroupIdSet) {
          if (groupIdSet) {
            if (oGroupIdSet) groupIdSet.adds(oGroupIdSet)
            this.idToGroupIdSet.set(oid, groupIdSet)
          } else if (oGroupIdSet) this.idToGroupIdSet.set(id, oGroupIdSet)
        }
        let oPrefLabelSet: ONodeSet<INode> = this.idToPrefLabelSet.get(oid)
        if (prefLabelSet !== oPrefLabelSet) {
          if (prefLabelSet) {
            if (oPrefLabelSet) prefLabelSet.adds(oPrefLabelSet)
            this.idToPrefLabelSet.set(oid, prefLabelSet)
          } else if (oPrefLabelSet) this.idToPrefLabelSet.set(id, oPrefLabelSet)
        }
        let oMatchedLabelSet: ONodeSet<INode> = this.idToMatchedLabelSet.get(oid)
        if (matchedLabelSet !== oMatchedLabelSet) {
          if (matchedLabelSet) {
            if (oMatchedLabelSet) matchedLabelSet.adds(oMatchedLabelSet)
            this.idToMatchedLabelSet.set(oid, matchedLabelSet)
          } else if (oMatchedLabelSet) this.idToMatchedLabelSet.set(id, oMatchedLabelSet)
        }
        let oAltLabelSet: ONodeSet<INode> = this.idToAltLabelSet.get(oid)
        if (altLabelSet !== oAltLabelSet) {
          if (altLabelSet) {
            if (oAltLabelSet) altLabelSet.adds(oAltLabelSet)
            this.idToAltLabelSet.set(oid, altLabelSet)
          } else if (oAltLabelSet) this.idToAltLabelSet.set(id, oAltLabelSet)
        }
      })
    })
  }
}

export class SparqlAutocompleteWorkerService {

  private static buildResults(pd: ProcessingData, filteredIds: StringSet, dataModel: DataModel, prefLang: string): ResultGroup[] {
    let res: ResultGroup[] = []
    let idToResult: FMap<Result> = new FMap<Result>()
    let groupIdToGroup: EMap<ResultGroup> = new EMap<ResultGroup>()
    pd.unifyMap.idToIdSet.each((idSet: StringSet, id: string) => {
      if (!idSet.values().some(v => filteredIds.has(v))) {
        let resultId: string = idSet.values().find(id2 => idToResult.has(id2))
        if (!resultId) {
          let result: Result = new Result(idSet.values().map(oid => DataFactory.instance.namedNode(oid)), pd.idToDatasourceSet.get(id).values(), pd.idToMatchedLabelSet.get(id).values()[0], pd.idToPrefLabelSet.has(id) ? pd.idToPrefLabelSet.get(id).values()[0] : null)
          let altLabels: INode[] = pd.idToAltLabelSet.has(id) ? pd.idToAltLabelSet.get(id).values() : []
          if (pd.idToPrefLabelSet.has(id)) {
            let prefLabels: INode[] = pd.idToPrefLabelSet.get(id).values()
            altLabels = altLabels.concat(prefLabels.slice(1))
          }
          result.additionalInformation['altLabel'] = altLabels.length > 0 ? altLabels : null
          result.additionalInformation['type'] = pd.idToGroupIdSet.get(id).values().map(v => DataFactory.instance.namedNode(v))
          result.additionalInformation['typeLabel'] = pd.idToGroupIdSet.get(id).values().map(v => {
            return pd.idToPrefLabelSet.has(id) ? pd.idToPrefLabelSet.get(id).values()[0] : null
          })
          idSet.each(id2 => idToResult.set(id2, result))
          pd.idToGroupIdSet.get(id).each(gid =>
            groupIdToGroup.goc(gid, () => {
              let glabel: string = dataModel.classMap.has(gid) ? getPrefLangString(dataModel.classMap.get(gid).labels, prefLang) :
                (pd.idToPrefLabelSet.has(gid) ? pd.idToPrefLabelSet.get(gid).values()[0].value : gid)
              let resultGroup: ResultGroup = new ResultGroup(glabel)
              res.push(resultGroup)
              return resultGroup
            }).results.push(result)
          )
        }
      }
    })
    return res
  }

  /* @ngInject */
  constructor(private $q: angular.IQService, private fibraSparqlService: FibraSparqlService, private stateWorkerService: StateWorkerService) {
  }

  public autocomplete(query: string, limit: number, queryRemote: boolean = false, canceller?: angular.IPromise<any>): angular.IPromise<AutocompletionResults> {
    let d: angular.IDeferred<AutocompletionResults> = this.$q.defer()
    let results: AutocompletionResults = new AutocompletionResults()
    let queryTemplate: string = this.stateWorkerService.state.project.autocompletionQuery
    queryTemplate = queryTemplate.replace(/<QUERY>/g, SparqlService.stringToSPARQLString(query))
    queryTemplate = queryTemplate.replace(/<LIMIT>/g, '' + limit)
    queryTemplate = queryTemplate.replace(/# CONSTRAINTS/g, this.stateWorkerService.state.project.constraints ? this.stateWorkerService.state.project.constraints : '')
    queryTemplate = queryTemplate.replace(/<PREFLANG>/g, this.stateWorkerService.state.language)
    let pd: ProcessingData = new ProcessingData()
    let localResults: StringSet = new StringSet()
    let primaryProcessed: angular.IPromise<void> = this.fibraSparqlService.query(this.stateWorkerService.state.project.endpoint, queryTemplate, { timeout: canceller }).then(
      (response) => {
        pd.processAndConsolidate(response, this.stateWorkerService.state.project.endpoint)
        results.localMatchingResults = SparqlAutocompleteWorkerService.buildResults(pd, localResults, this.stateWorkerService.state.project.dataModel, this.stateWorkerService.state.language)
        if (!queryRemote) d.resolve(results)
        else d.notify({ endpointType: 'primary', endpoint: this.stateWorkerService.state.project.id, results: results })
      }
    )
    if (queryRemote) {
      results.localMatchingResults.forEach(rg => rg.results.forEach(r => r.ids.forEach(id => localResults.add(id.value))))
      // FIXME: It is currently possible that we miss equivalencies because equivalent data from one source doesn't fit the limit while it does for another. Add further query to make sure all equivalencies are fetched (either in autocompletion or latest in import)
      let remoteGroupIdToGroup: EMap<ResultGroup> = new EMap<ResultGroup>()
      this.$q.all(this.stateWorkerService.state.project.remoteEndpoints().map(endpointConfiguration => {
        queryTemplate = endpointConfiguration.autocompletionQuery
        queryTemplate = queryTemplate.replace(/<QUERY>/g, SparqlService.stringToSPARQLString(query))
        queryTemplate = queryTemplate.replace(/<LIMIT>/g, '' + limit)
        queryTemplate = queryTemplate.replace(/# CONSTRAINTS/g, endpointConfiguration.constraints ? endpointConfiguration.constraints : '')
        queryTemplate = queryTemplate.replace(/<PREFLANG>/g, this.stateWorkerService.state.language)
        return this.fibraSparqlService.query(endpointConfiguration.endpoint, queryTemplate, { timeout: canceller }).then(
          (response) => {
            if (response.results.bindings.length !== 0) {
              return primaryProcessed.then(() => {
                pd.processAndConsolidate(response, endpointConfiguration.id)
                results.remoteResults = SparqlAutocompleteWorkerService.buildResults(pd, localResults, this.stateWorkerService.state.project.dataModel, this.stateWorkerService.state.language)
                d.notify({ endpointType: 'remote', endpoint: endpointConfiguration.id, results: results })
              })
            }
          },
          (error) => d.notify({ endpointType: 'remote', endpoint: endpointConfiguration.id, error: SerializationService.stripFunctions(error) })
        )
      })).then(() => {
        console.log(results)
        d.resolve(results)
      })
    }
    return d.promise
  }
}


angular.module('fibra.services.sparql-autocomplete-service', [])
  .config(($provide) => {
    $provide.service('sparqlAutocompleteService', SparqlAutocompleteService)
  })
