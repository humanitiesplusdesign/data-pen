namespace fibra {
  'use strict'

  import s = fi.seco.sparql

  export class ResultGroup {
    public results: Result[] = []
    constructor(public label: string) {}
  }

  export class Result {
    public additionalInformation: {[varName: string]: INode[]} = {}
    constructor(public ids: INode[], public datasources: EndpointConfiguration[], public matchedLabel: INode, public prefLabel: INode) {}
  }

  export class SparqlAutocompleteService {

    public static defaultMatchQueryTemplate: string = `
PREFIX text: <http://jena.apache.org/text#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX sf: <http://ldf.fi/functions#>
PREFIX fibra: <http://ldf.fi/fibra/schema#>
PREFIX dcterms: <http://purl.org/dc/terms/>
SELECT ?groupId ?groupLabel ?id ?prefLabel ?matchedLabel ?sameAs ?altLabel { # ADDITIONALVARIABLES
  {
    SELECT ?groupId ?id (SUM(?sc) AS ?score) {
      {
        SELECT ?groupId ?id ?sc {
          BIND(CONCAT(REPLACE(<QUERY>,"([\\\\+\\\\-\\\\&\\\\|\\\\!\\\\(\\\\)\\\\{\\\\}\\\\[\\\\]\\\\^\\\\\\"\\\\~\\\\*\\\\?\\\\:\\\\/\\\\\\\\])","\\\\$1"),"*") AS ?query)
          (?id ?sc) text:query ?query .
          ?id a ?groupId .
          # CONSTRAINTS
        } LIMIT <LIMIT>
      } UNION {
        BIND(CONCAT("\\"",REPLACE(<QUERY>,"([\\\\+\\\\-\\\\&\\\\|\\\\!\\\\(\\\\)\\\\{\\\\}\\\\[\\\\]\\\\^\\\\\\"\\\\~\\\\*\\\\?\\\\:\\\\/\\\\\\\\])","\\\\$1"),"\\"") AS ?query)
        (?id ?sc) text:query ?query .
        ?id skos:prefLabel|rdfs:label|skos:altLabel ?matchedLabel
        FILTER (LCASE(?matchedLabel)=LCASE(<QUERY>))
        ?id a ?groupId .
        # CONSTRAINTS
      }
    }
    GROUP BY ?groupId ?id
    HAVING(BOUND(?id))
  }
  ?id skos:prefLabel|rdfs:label|skos:altLabel ?matchedLabel
  FILTER (REGEX(LCASE(?matchedLabel),CONCAT("\\\\b",LCASE(<QUERY>))))
  {
    ?groupId sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel <PREFLANG> '' ?groupLabel) .
  } UNION {
    ?id sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel <PREFLANG> '' ?prefLabel) .
  } UNION {
    ?id owl:sameAs ?sameAs .
  } UNION {
    ?id skos:altLabel ?altLabel .
  }
  # ADDITIONALSELECT
}
`

    constructor(private workerService: WorkerService) {}

    public autocomplete(query: string, limit: number, canceller?: angular.IPromise<any>): angular.IPromise<ResultGroup[]> {
      return this.workerService.call('sparqlAutocompleteWorkerService', 'autocomplete', [query, limit], canceller)
    }

  }

  export class SparqlAutocompleteWorkerService {

    constructor(private $q: angular.IQService, private sparqlService: s.SparqlService, private configurationWorkerService: ConfigurationWorkerService) {
    }

    public autocomplete(query: string, limit: number, canceller?: angular.IPromise<any>): angular.IPromise<ResultGroup[]> {
      let idToIdSet: EMap<StringSet> = new EMap<StringSet>(() => new StringSet())
      let idToGroupIdSet: EMap<StringSet> = new EMap<StringSet>(() => new StringSet())
      let ifpVarPlusValueToIdSet: EMap<EMap<StringSet>> = new EMap<EMap<StringSet>>(() => new EMap<StringSet>(() => new StringSet()))
      let idToPrefLabelSet: EMap<ONodeSet<INode>> = new EMap<ONodeSet<INode>>(() => new ONodeSet<INode>())
      let idToMatchedLabelSet: EMap<ONodeSet<INode>> = new EMap<ONodeSet<INode>>(() => new ONodeSet<INode>())
      let idToAltLabelSet: EMap<ONodeSet<INode>> = new EMap<ONodeSet<INode>>(() => new ONodeSet<INode>())
      let idToDatasourceSet: EMap<IdentitySet<EndpointConfiguration>> = new EMap<IdentitySet<EndpointConfiguration>>(() => new IdentitySet<EndpointConfiguration>())
      return this.$q.all(this.configurationWorkerService.configuration.allEndpoints().map(endpointConfiguration => {
        let queryTemplate: string = endpointConfiguration.autocompletionTextMatchQueryTemplate
        queryTemplate = queryTemplate.replace(/<QUERY>/g, s.SparqlService.stringToSPARQLString(query))
        queryTemplate = queryTemplate.replace(/# CONSTRAINTS/g, endpointConfiguration.dataModelConfiguration.typeConstraints)
        queryTemplate = queryTemplate.replace(/<LIMIT>/g, '' + limit)
        queryTemplate = queryTemplate.replace(/<PREFLANG>/g, this.configurationWorkerService.configuration.preferredLanguage)
        return this.sparqlService.query(endpointConfiguration.endpoint.value, queryTemplate, {timeout: canceller}).then(
          (response) => response.data!.results.bindings.forEach(binding => {
            let id: string = binding['id'].value
            idToIdSet.goc(id).add(id)
            idToDatasourceSet.goc(id).add(endpointConfiguration)
            if (binding['prefLabel'])
              idToPrefLabelSet.goc(id).add(DataFactory.instance.nodeFromBinding(binding['prefLabel']))
            if (binding['altLabel'])
              idToAltLabelSet.goc(id).add(DataFactory.instance.nodeFromBinding(binding['altLabel']))
            if (binding['matchedLabel'])
              idToMatchedLabelSet.goc(id).add(DataFactory.instance.nodeFromBinding(binding['matchedLabel']))
            if (binding['groupId']) {
              idToGroupIdSet.goc(id).add(binding['groupId'].value)
              if (binding['groupLabel'])
                idToPrefLabelSet.goc(binding['groupId'].value).add(DataFactory.instance.nodeFromBinding(binding['groupLabel']))
            }
            if (binding['sameAs']) {
              idToIdSet.get(id).add(binding['sameAs'].value)
              idToIdSet.goc(binding['sameAs'].value).add(id)
            }
            for (let v of response.data!.head.vars) if (v.indexOf('ifp') === 0 && binding[v]) ifpVarPlusValueToIdSet.goc(v.substring(3)).goc(binding[v].value).add(id)
          })
        ).catch(() => undefined)
      })).then(() => {
        // create sameAses for all objects sharing same inverse functional property values
        ifpVarPlusValueToIdSet.each(valueToIdSet => valueToIdSet.each(ids => ids.each(id => idToIdSet.goc(id).adds(ids))))
        // consolidate id sets as well as all id -related information
        idToIdSet.each((idSet: StringSet, id: string) => {
          idSet.each(oid => {
            let oidSet: StringSet = idToIdSet.get(oid)
            if (idSet !== oidSet) {
              idToIdSet.set(oid, idSet)
              idSet.adds(oidSet)
              let datasourceSet: IdentitySet<EndpointConfiguration> = idToDatasourceSet.get(id)
              let oDatasourceSet: IdentitySet<EndpointConfiguration> = idToDatasourceSet.get(oid)
              if (datasourceSet) {
                if (oDatasourceSet) datasourceSet.adds(oDatasourceSet)
                idToDatasourceSet.set(oid, datasourceSet)
              } else if (oDatasourceSet) idToDatasourceSet.set(id, oDatasourceSet)
              let groupIdSet: StringSet = idToGroupIdSet.get(id)
              let oGroupIdSet: StringSet = idToGroupIdSet.get(oid)
              if (groupIdSet) {
                if (oGroupIdSet) groupIdSet.adds(oGroupIdSet)
                idToGroupIdSet.set(oid, groupIdSet)
              } else if (oGroupIdSet) idToGroupIdSet.set(id, oGroupIdSet)
              let mSet: ONodeSet<INode> = idToPrefLabelSet.get(id)
              let oSet: ONodeSet<INode> = idToPrefLabelSet.get(oid)
              if (mSet) {
                if (oSet) mSet.adds(oSet)
                idToPrefLabelSet.set(oid, mSet)
              } else if (oSet) idToPrefLabelSet.set(id, oSet)
              mSet = idToMatchedLabelSet.get(id)
              oSet = idToMatchedLabelSet.get(oid)
              if (mSet) {
                if (oSet) mSet.adds(oSet)
                idToMatchedLabelSet.set(oid, mSet)
              } else if (oSet) idToMatchedLabelSet.set(id, oSet)
              mSet = idToAltLabelSet.get(id)
              oSet = idToAltLabelSet.get(oid)
              if (mSet) {
                if (oSet) mSet.adds(oSet)
                idToAltLabelSet.set(oid, mSet)
              } else if (oSet) idToAltLabelSet.set(id, oSet)
            }
          })
        })
        let ret: ResultGroup[] = []
        let groupIdToGroup: EMap<ResultGroup> = new EMap<ResultGroup>()
        let seen: StringSet = new StringSet()
        idToIdSet.each((idSet: StringSet, id: string) => {
          if (!seen.has(id)) {
            seen.adds(idSet)
            let result: Result = new Result(idSet.values().map(oid => DataFactory.instance.namedNode(oid)), idToDatasourceSet.get(id).values(), idToMatchedLabelSet.get(id).values()[0], idToPrefLabelSet.get(id).values()[0])
            if (idToAltLabelSet.has(id)) result.additionalInformation['altLabel'] = idToAltLabelSet.get(id).values()
            result.additionalInformation['type'] = idToGroupIdSet.get(id).values().map(v => DataFactory.instance.namedNode(v))
            result.additionalInformation['typeLabel'] = idToGroupIdSet.get(id).values().map(v => idToPrefLabelSet.get(v).values()[0])
            idToGroupIdSet.get(id).each(gid => {
              let resultGroup: ResultGroup = groupIdToGroup.get(gid)
              if (!resultGroup) {
                resultGroup = new ResultGroup(idToPrefLabelSet.get(gid).values()[0].value)
                groupIdToGroup.set(gid, resultGroup)
                ret.push(resultGroup)
              }
              resultGroup.results.push(result)
            })
          }
        })
        return ret
      })
    }
  }

}
