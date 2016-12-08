namespace fibra {
  'use strict'

  import s = fi.seco.sparql

  export class AutocompletionResults {
    public localMatchingResults: ResultGroup[] = []
    public localNonMatchingResults: ResultGroup[] = []
    public remoteResults: ResultGroup[] = []
  }

  export class ResultGroup {
    public results: Result[] = []
    constructor(public label: string) {}
  }

  export class Result {
    public additionalInformation: {[varName: string]: INode[]} = {}
    constructor(public ids: INode[], public datasources: EndpointConfiguration[], public matchedLabel: INode, public prefLabel: INode) {}
  }

  export class SparqlAutocompleteService {

    public static naiveMatchQueryTemplate: string = `
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  PREFIX mads: <http://www.loc.gov/mads/rdf/v1#>
  PREFIX owl: <http://www.w3.org/2002/07/owl#>
  PREFIX dcterms: <http://purl.org/dc/terms/>
  SELECT ?groupId ?groupLabel ?id ?prefLabel ?matchedLabel ?sameAs ?altLabel { # ADDITIONALVARIABLES
    GRAPH <GRAPH> {
      {
        SELECT ?groupId ?id {
          {
            ?id skos:prefLabel|rdfs:label|skos:altLabel|mads:authoritativeLabel|mads:variantLabel <QUERY> .
          } UNION {
            ?id skos:prefLabel|rdfs:label|skos:altLabel|mads:authoritativeLabel|mads:variantLabel <QUERY>@<PREFLANG> .
          }
          ?id a ?groupId .
        }
        GROUP BY ?groupId ?id
        HAVING(BOUND(?id))
        LIMIT <LIMIT>
      }
      ?id skos:prefLabel|rdfs:label|skos:altLabel|mads:authoritativeLabel|mads:variantLabel ?matchedLabel .
      FILTER (REGEX(LCASE(?matchedLabel),CONCAT("\\\\b",LCASE(<QUERY>))))
      OPTIONAL {
        ?groupId skos:prefLabel|rdfs:label|skos:altLabel|mads:authoritativeLabel|mads:variantLabel ?groupLabelP .
      }
      BIND(COALESCE(?groupLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?groupId),".*/",""),".*#",""),"_"," "),"([A-ZÅÄÖ])"," $1")) AS ?groupLabel)
      {
        ?id  rdfs:label|skos:prefLabel|mads:authoritativeLabel ?prefLabel .
      } UNION {
        ?id owl:sameAs ?sameAs .
      } UNION {
        ?id skos:altLabel|mads:variantLabel ?altLabel .
      }
      # ADDITIONALSELECT
    }
  }
  `

    public static defaultMatchQueryTemplate: string = `
PREFIX text: <http://jena.apache.org/text#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX mads: <http://www.loc.gov/mads/rdf/v1#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX sf: <http://ldf.fi/functions#>
PREFIX fibra: <http://ldf.fi/fibra/schema#>
PREFIX dcterms: <http://purl.org/dc/terms/>
SELECT ?groupId ?groupLabel ?id ?prefLabel ?matchedLabel ?sameAs ?altLabel { # ADDITIONALVARIABLES
  # STARTGRAPH
    {
      SELECT ?groupId ?id (SUM(?sc) AS ?score) {
        {
          SELECT ?groupId ?id ?sc {
            BIND(CONCAT(REPLACE(<QUERY>,"([\\\\+\\\\-\\\\&\\\\|\\\\!\\\\(\\\\)\\\\{\\\\}\\\\[\\\\]\\\\^\\\\\\"\\\\~\\\\*\\\\?\\\\:\\\\/\\\\\\\\])","\\\\$1"),"*") AS ?query)
            (?id ?sc) text:query ?query .
            ?id a ?groupId .
            # GROUPID
            # CONSTRAINTS
          } LIMIT <LIMIT>
        } UNION {
          BIND(CONCAT("\\"",REPLACE(<QUERY>,"([\\\\+\\\\-\\\\&\\\\|\\\\!\\\\(\\\\)\\\\{\\\\}\\\\[\\\\]\\\\^\\\\\\"\\\\~\\\\*\\\\?\\\\:\\\\/\\\\\\\\])","\\\\$1"),"\\"") AS ?query)
          (?id ?sc) text:query ?query .
          ?id skos:prefLabel|rdfs:label|skos:altLabel|mads:authoritativeLabel|mads:variantLabel ?matchedLabel
          FILTER (LCASE(?matchedLabel)=LCASE(<QUERY>))
          ?id a ?groupId .
          # GROUPID
          # CONSTRAINTS
        }
      }
      GROUP BY ?groupId ?id
      HAVING(BOUND(?id))
    }
    ?id skos:prefLabel|rdfs:label|skos:altLabel|mads:authoritativeLabel|mads:variantLabel ?matchedLabel
    FILTER (REGEX(LCASE(?matchedLabel),CONCAT("\\\\b",LCASE(<QUERY>))))
    {
      OPTIONAL {
        ?groupId sf:preferredLanguageLiteral (skos:prefLabel mads:authoritativeLabel rdfs:label skos:altLabel mads:variantLabel '<PREFLANG>' '' ?groupLabelP) .
      }
      BIND(COALESCE(?groupLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?groupId),".*/",""),".*#",""),"_"," "),"([A-ZÅÄÖ])"," $1")) AS ?groupLabel)
    } UNION {
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

    constructor(private workerService: WorkerService) {}

    public autocomplete(query: string, limit: number, queryRemote: boolean = false, limits: string = '', canceller?: angular.IPromise<any>): angular.IPromise<AutocompletionResults> {
      return this.workerService.call('sparqlAutocompleteWorkerService', 'autocomplete', [query, limit, queryRemote, limits], canceller)
    }

  }

  class ProcessingData {
    public idToIdSet: EMap<StringSet> = new EMap<StringSet>(() => new StringSet()) // id to sameAs ids
    public idToGroupIdSet: EMap<StringSet> = new EMap<StringSet>(() => new StringSet())
    public ifpVarPlusValueToIdSet: EMap<EMap<StringSet>> = new EMap<EMap<StringSet>>(() => new EMap<StringSet>(() => new StringSet())) // inverse functional properties & values to ids
    public idToPrefLabelSet: EMap<ONodeSet<INode>> = new EMap<ONodeSet<INode>>(() => new ONodeSet<INode>())
    public idToMatchedLabelSet: EMap<ONodeSet<INode>> = new EMap<ONodeSet<INode>>(() => new ONodeSet<INode>())
    public idToAltLabelSet: EMap<ONodeSet<INode>> = new EMap<ONodeSet<INode>>(() => new ONodeSet<INode>())
    public idToDatasourceSet: EMap<IdentitySet<EndpointConfiguration>> = new EMap<IdentitySet<EndpointConfiguration>>(() => new IdentitySet<EndpointConfiguration>())
    public seen: StringSet = new StringSet()
  }

  export class SparqlAutocompleteWorkerService {

    private static processBindings(pd: ProcessingData, endpoint: EndpointConfiguration, result: s.ISparqlBindingResult<{[id: string]: s.ISparqlBinding}>): void {
      result.results.bindings.forEach(binding => {
        let id: string = binding['id'].value
        pd.idToIdSet.goc(id).add(id)
        pd.idToDatasourceSet.goc(id).add(endpoint)
        if (binding['prefLabel'])
          pd.idToPrefLabelSet.goc(id).add(DataFactory.instance.nodeFromBinding(binding['prefLabel']))
        if (binding['altLabel'])
          pd.idToAltLabelSet.goc(id).add(DataFactory.instance.nodeFromBinding(binding['altLabel']))
        if (binding['matchedLabel'])
          pd.idToMatchedLabelSet.goc(id).add(DataFactory.instance.nodeFromBinding(binding['matchedLabel']))
        if (binding['groupId']) {
          pd.idToGroupIdSet.goc(id).add(binding['groupId'].value)
          if (binding['groupLabel'])
            pd.idToPrefLabelSet.goc(binding['groupId'].value).add(DataFactory.instance.nodeFromBinding(binding['groupLabel']))
        }
        if (binding['sameAs']) {
          pd.idToIdSet.get(id).add(binding['sameAs'].value)
          pd.idToIdSet.goc(binding['sameAs'].value).add(id)
        }
        for (let v of result.head.vars) if (v.indexOf('ifp') === 0 && binding[v]) pd.ifpVarPlusValueToIdSet.goc(v.substring(3)).goc(binding[v].value).add(id)
      })
    }

    private static buildResults(pd: ProcessingData, groupIdToGroup: EMap<ResultGroup>): ResultGroup[] {
      let res: ResultGroup[] = []
      pd.idToIdSet.each((idSet: StringSet, id: string) => {
        if (!pd.seen.has(id)) {
          pd.seen.adds(idSet)
          let result: Result = new Result(idSet.values().map(oid => DataFactory.instance.namedNode(oid)), pd.idToDatasourceSet.get(id).values(), pd.idToMatchedLabelSet.get(id).values()[0], pd.idToPrefLabelSet.get(id).values()[0])
          if (pd.idToAltLabelSet.has(id)) result.additionalInformation['altLabel'] = pd.idToAltLabelSet.get(id).values()
          result.additionalInformation['type'] = pd.idToGroupIdSet.get(id).values().map(v => DataFactory.instance.namedNode(v))
          result.additionalInformation['typeLabel'] = pd.idToGroupIdSet.get(id).values().map(v => {
            // console.log(id, v, pd.idToPrefLabelSet.get(v))
            return pd.idToPrefLabelSet.get(v).values()[0]
          })
          pd.idToGroupIdSet.get(id).each(gid => {
            let resultGroup: ResultGroup = groupIdToGroup.get(gid)
            if (!resultGroup) {
              resultGroup = new ResultGroup(pd.idToPrefLabelSet.get(gid).values()[0].value)
              groupIdToGroup.set(gid, resultGroup)
              res.push(resultGroup)
            }
            resultGroup.results.push(result)
          })
        }
      })
      return res
    }

    private static unifyResults(pd: ProcessingData): void {
      // create sameAses for all objects sharing same inverse functional property values
      pd.ifpVarPlusValueToIdSet.each(valueToIdSet => valueToIdSet.each(ids => ids.each(id => pd.idToIdSet.goc(id).adds(ids))))
      // consolidate id sets as well as all id -related information
      pd.idToIdSet.each((idSet: StringSet, id: string) => idSet.each(oid => {
        let oidSet: StringSet = pd.idToIdSet.get(oid)
        if (idSet !== oidSet) {
          pd.idToIdSet.set(oid, idSet)
          idSet.adds(oidSet)
          let datasourceSet: IdentitySet<EndpointConfiguration> = pd.idToDatasourceSet.get(id)
          let oDatasourceSet: IdentitySet<EndpointConfiguration> = pd.idToDatasourceSet.get(oid)
          if (datasourceSet) {
            if (oDatasourceSet) datasourceSet.adds(oDatasourceSet)
            pd.idToDatasourceSet.set(oid, datasourceSet)
          } else if (oDatasourceSet) pd.idToDatasourceSet.set(id, oDatasourceSet)
          let groupIdSet: StringSet = pd.idToGroupIdSet.get(id)
          let oGroupIdSet: StringSet = pd.idToGroupIdSet.get(oid)
          if (groupIdSet) {
            if (oGroupIdSet) groupIdSet.adds(oGroupIdSet)
            pd.idToGroupIdSet.set(oid, groupIdSet)
          } else if (oGroupIdSet) pd.idToGroupIdSet.set(id, oGroupIdSet)
          let mSet: ONodeSet<INode> = pd.idToPrefLabelSet.get(id)
          let oSet: ONodeSet<INode> = pd.idToPrefLabelSet.get(oid)
          if (mSet) {
            if (oSet) mSet.adds(oSet)
            pd.idToPrefLabelSet.set(oid, mSet)
          } else if (oSet) pd.idToPrefLabelSet.set(id, oSet)
          mSet = pd.idToMatchedLabelSet.get(id)
          oSet = pd.idToMatchedLabelSet.get(oid)
          if (mSet) {
            if (oSet) mSet.adds(oSet)
            pd.idToMatchedLabelSet.set(oid, mSet)
          } else if (oSet) pd.idToMatchedLabelSet.set(id, oSet)
          mSet = pd.idToAltLabelSet.get(id)
          oSet = pd.idToAltLabelSet.get(oid)
          if (mSet) {
            if (oSet) mSet.adds(oSet)
            pd.idToAltLabelSet.set(oid, mSet)
          } else if (oSet) pd.idToAltLabelSet.set(id, oSet)
        }
      }))
    }

    constructor(private $q: angular.IQService, private sparqlService: s.SparqlService, private configurationWorkerService: ConfigurationWorkerService) {
    }

    public autocomplete(query: string, limit: number, queryRemote: boolean = false, limits: string = '', canceller?: angular.IPromise<any>): angular.IPromise<AutocompletionResults> {
      let d: angular.IDeferred<AutocompletionResults> = this.$q.defer()
      let results: AutocompletionResults = new AutocompletionResults()
      let queryTemplate: string = this.configurationWorkerService.configuration.primaryEndpoint.autocompletionTextMatchQueryTemplate
      queryTemplate = queryTemplate.replace(/<QUERY>/g, s.SparqlService.stringToSPARQLString(query))
      queryTemplate = queryTemplate.replace(/<LIMIT>/g, '' + limit)
      queryTemplate = queryTemplate.replace(/# CONSTRAINTS/g, this.configurationWorkerService.configuration.primaryEndpoint.dataModelConfiguration.typeConstraints)
      queryTemplate = queryTemplate.replace(/<PREFLANG>/g, this.configurationWorkerService.configuration.preferredLanguage)
      let pd: ProcessingData = new ProcessingData()
      this.sparqlService.query(this.configurationWorkerService.configuration.primaryEndpoint.endpoint.value, queryTemplate, {timeout: canceller}).then(
        (response) => {
          SparqlAutocompleteWorkerService.processBindings(pd, this.configurationWorkerService.configuration.primaryEndpoint, response.data)
          results.localMatchingResults = SparqlAutocompleteWorkerService.buildResults(pd, new EMap<ResultGroup>())
          if (!queryRemote) d.resolve(results)
          else d.notify({endpointType: 'primary', endpoint: this.configurationWorkerService.configuration.primaryEndpoint, results: results})
        }
      )
      if (queryRemote) {
        let remoteGroupIdToGroup: EMap<ResultGroup> = new EMap<ResultGroup>()
        this.$q.all(this.configurationWorkerService.configuration.remoteEndpoints().map(endpointConfiguration => {
          queryTemplate = endpointConfiguration.autocompletionTextMatchQueryTemplate
          queryTemplate = queryTemplate.replace(/<QUERY>/g, s.SparqlService.stringToSPARQLString(query))
          queryTemplate = queryTemplate.replace(/<LIMIT>/g, '' + limit)
          queryTemplate = queryTemplate.replace(/# CONSTRAINTS/g, endpointConfiguration.dataModelConfiguration.typeConstraints)
          queryTemplate = queryTemplate.replace(/<PREFLANG>/g, this.configurationWorkerService.configuration.preferredLanguage)
          return this.sparqlService.query(endpointConfiguration.endpoint.value, queryTemplate, {timeout: canceller}).then(
          (response) => {
            if (response.data.results.bindings.length !== 0) {
              SparqlAutocompleteWorkerService.processBindings(pd, endpointConfiguration, response.data)
              SparqlAutocompleteWorkerService.unifyResults(pd)
              results.remoteResults = results.remoteResults.concat(SparqlAutocompleteWorkerService.buildResults(pd, remoteGroupIdToGroup))
              d.notify({endpointType: 'remote', endpoint: endpointConfiguration, results: results})
            }
          },
          (error) => d.notify({endpointType: 'remote', endpoint: endpointConfiguration, error: WorkerWorkerService.stripFunctions(error)})
        )})).then(() => d.resolve(results))
      }
      return d.promise
    }
  }
}
