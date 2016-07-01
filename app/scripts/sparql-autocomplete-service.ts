namespace fibra {
  'use strict'

  import s = fi.seco.sparql

  export class ResultsByDatasource {
    public resultsByGroup: ResultGroup[] = []
    constructor(public configuration: SparqlAutocompletionConfiguration) {}
  }

  export class ResultGroup {
    public results: Result[] = []
    constructor(public label: string) {}
  }

  export class Result {
    public ids: INode[] = []
    public datasources: SparqlAutocompletionConfiguration[] = []
    public additionalInformation: {[varName: string]: INode[]} = {}
    constructor(id: INode, public resultGroup: ResultGroup, datasource: SparqlAutocompletionConfiguration, public matchedLabel: INode, public prefLabel: INode) {
      this.ids.push(id)
      this.datasources.push(datasource)
    }
  }

  export class SparqlAutocompletionConfiguration {

    public constraints: string = ''

    constructor(
      public id: string,
      public title: string,
      public endpoint: string,
      public queryTemplate: string
    ) {}
  }

  export class SparqlAutocompleteService {

    public static queryTemplate: string = `
PREFIX text: <http://jena.apache.org/text#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX sf: <http://ldf.fi/functions#>
SELECT ?groupId ?groupLabel ?id ?matchedLabel ?prefLabel ?altLabel ?type ?typeLabel ?sameAs ?ifpWikipediaPage ?ifpODBNId {
  {
    SELECT ?groupId ?id (SAMPLE(?matchedLabelS) AS ?matchedLabel) {
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
            ?id a ?groupId .
            # CONSTRAINTS
          }
        }
        GROUP BY ?groupId ?id
      }
      FILTER (?id!=<http://ldf.fi/schoenberg/actor_>) # SCHOENBERG BUG
      ?id skos:prefLabel|rdfs:label|skos:altLabel ?matchedLabelS
      FILTER (REGEX(LCASE(?matchedLabelS),CONCAT("\\\\b",LCASE(<QUERY>))))
    }
    GROUP BY ?groupId ?id ?score
    HAVING(BOUND(?id))
    ORDER BY DESC(?score)
  }
  ?groupId sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?groupLabel) .
  ?id sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?prefLabel) .
  BIND(?groupId AS ?type)
  BIND(?groupLabel AS ?typeLabel)
  OPTIONAL {
    ?id skos:altLabel ?altLabel .
  }
  OPTIONAL {
    ?id owl:sameAs ?sameAs .
  }
  OPTIONAL {
    {
      ?id <http://emlo.bodleian.ox.ac.uk/schema#cofk_union_relationship_type-is_related_to> ?ref .
      FILTER(REGEX(STR(?ref),'http://..\\\\.wikipedia\\\\.org/wiki/'))
      BIND(?ref AS ?ifpWikipediaPage)
    } UNION {
      ?id <http://emlo.bodleian.ox.ac.uk/schema#cofk_union_relationship_type-is_related_to> ?ref .
      FILTER(STRSTARTS(STR(?ref),'http://www.oxforddnb.com/view/article/'))
      BIND(REPLACE(STR(?ref),'http://www.oxforddnb.com/view/article/([^?]*).*','$1') AS ?ifpODBNId)
    } UNION {
      ?id <http://ldf.fi/procope-schema#wikipediaUrl> ?ref .
      BIND(IRI(?ref) AS ?ifpWikipediaPage)
    } UNION {
      ?id <http://ldf.fi/sdfb/schema#odbnId> ?ifpODBNId .
    }
  }
}
`

    constructor(private workerService: WorkerService) {}
    public autocompleteByDatasource(query: string, limit: number, canceller?: angular.IPromise<any>): angular.IPromise<ResultsByDatasource[]> {
      return this.workerService.call('sparqlAutocompleteWorkerService', 'autocompleteByDatasource', [query, limit], canceller)
    }
    public autocompleteByGroup(query: string, limit: number, canceller?: angular.IPromise<any>): angular.IPromise<ResultGroup[]> {
      return this.workerService.call('sparqlAutocompleteWorkerService', 'autocompleteByGroup', [query, limit], canceller)
    }

  }

  export class SparqlAutocompleteWorkerService {

    private static defaultVars: {[varName: string]: boolean} = {
      'id': true, 'prefLabel': true, 'matchedLabel': true, 'groupId': true, 'groupLabel': true, 'sameAs': true
    }

    constructor(private $q: angular.IQService, private sparqlService: s.SparqlService, private configurationWorkerService: ConfigurationWorkerService) {
    }

    public autocompleteByDatasource(query: string, limit: number, canceller?: angular.IPromise<any>): angular.IPromise<ResultsByDatasource[]> {
      let configurations: SparqlAutocompletionConfiguration[] = this.configurationWorkerService.configurations.map(c => c.autocompletionConfiguration)
      return this.$q.all(this.query(query, limit, configurations).map((promise, index) => promise.then(response => {
        let ds: ResultsByDatasource = new ResultsByDatasource(configurations[index])
        let groupToResults: {[id: string]: ResultGroup} = this.processResults(response, configurations[index])
        for (let groupId in groupToResults) ds.resultsByGroup.push(groupToResults[groupId])
        return ds
      })))
    }

    public autocompleteByGroup(query: string, limit: number, canceller?: angular.IPromise<any>): angular.IPromise<ResultGroup[]> {
      let configurations: SparqlAutocompletionConfiguration[] = this.configurationWorkerService.configurations.map(c => c.autocompletionConfiguration)
      let groupToResults: {[id: string]: ResultGroup} = {}
      let idToResult: {[id: string]: Result} = {}
      let idToDatasource: {[id: string]: {[id: string]: SparqlAutocompletionConfiguration}} = {}
      let idToAdditionalInformation: {[id: string]: {[varName: string]: {[aiId: string]: INode}}} = {}
      let ifpToId: {[varName: string]: {[id: string]: string}} = {}
      return this.$q.all(this.query(query, limit, configurations).map((promise, index) => promise.then(response =>
        this.processResults(response, configurations[index], groupToResults, idToResult, ifpToId, idToDatasource, idToAdditionalInformation)
      ))).then(() => {
        let ret: ResultGroup[] = []
        for (let groupId in groupToResults) ret.push(groupToResults[groupId])
        return ret
      })
    }

    private processResults(
      response: angular.IHttpPromiseCallbackArg<s.ISparqlBindingResult<{[id: string]: s.ISparqlBinding}>>,
      configuration: SparqlAutocompletionConfiguration,
      groupToResults: {[id: string]: ResultGroup} = {},
      idToResult: {[id: string]: Result} = {},
      ifpToId: {[varName: string]: {[id: string]: string}} = {},
      idToDatasource: {[id: string]: {[id: string]: SparqlAutocompletionConfiguration}} = {},
      idToAdditionalInformation: {[id: string]: {[varName: string]: {[aiId: string]: INode}}} = {}): {[id: string]: ResultGroup} {
        let additionalInformationVars: string[] = response.data.head.vars.filter(varName => !SparqlAutocompleteWorkerService.defaultVars[varName] && varName.indexOf('ifp') !== 0)
        let ifpVars: string[] = response.data.head.vars.filter(varName => varName.indexOf('ifp') === 0)
        response.data.results.bindings.forEach(binding => {
          let rg: ResultGroup = goc(groupToResults, binding['groupId'].value, () => new ResultGroup(binding['groupLabel'].value))
          let resultNode: INode = new SparqlBindingNode(binding['id'])
          let result: Result = idToResult[resultNode.id]
          // FIXME refactor into something sensible. This even still does not guarantee unique results
          if (!result && binding['sameAs'])
            result = idToResult[new SparqlBindingNode(binding['sameAs']).id]
          if (!result) ifpVars.forEach(ifpVar => {
            if (binding[ifpVar]) result = idToResult[goc(ifpToId, ifpVar)[new SparqlBindingNode(binding[ifpVar]).id]]
          })
          if (!result) {
            result = new Result(resultNode, rg, configuration, new SparqlBindingNode(binding['matchedLabel']), new SparqlBindingNode(binding['prefLabel']))
            rg.results.push(result)
            idToDatasource[resultNode.id] = {}
            idToDatasource[resultNode.id][result.datasources[0].id] = configuration
            idToResult[resultNode.id] = result
          } else
            cpush(result.datasources, goc(idToDatasource, resultNode.id), configuration.id, configuration)
          if (binding['sameAs']) {
            let otherNode: INode = new SparqlBindingNode(binding['sameAs'])
            if (!idToResult[otherNode.id]) {
              idToResult[otherNode.id] = result
              result.ids.push(otherNode)
            } else {
              let otherResult: Result = idToResult[otherNode.id]
              if (otherResult !== result) {
                otherResult.ids.forEach(otherNode => {
                  otherResult.datasources.forEach(dconfiguration =>
                    cpush(result.datasources, goc(idToDatasource, resultNode.id), dconfiguration.id, dconfiguration)
                  )
                  for (let varName in otherResult.additionalInformation)
                    otherResult.additionalInformation[varName].forEach(ai =>
                      cpush(
                        goc(result.additionalInformation, varName, () => []),
                        goc(goc(idToAdditionalInformation, resultNode.id), varName),
                        ai.id, ai)
                    )
                  result.ids.push(otherNode)
                  idToResult[otherNode.id] = result
                })
                idToResult[otherNode.id] = result
              }
            }
          }
          ifpVars.forEach(ifpVar => {
            if (binding[ifpVar]) {
              let ifp: INode = new SparqlBindingNode(binding[ifpVar])
              if (!goc(ifpToId, ifpVar)[ifp.id]) {
                ifpToId[ifpVar][ifp.id] = resultNode.id
              } else {
                let otherResult: Result = idToResult[ifpToId[ifpVar][ifp.id]]
                if (otherResult !== result) {
                  otherResult.ids.forEach(otherNode => {
                    otherResult.datasources.forEach(dconfiguration =>
                      cpush(result.datasources, goc(idToDatasource, resultNode.id), dconfiguration.id, dconfiguration)
                    )
                    for (let varName in otherResult.additionalInformation)
                      otherResult.additionalInformation[varName].forEach(ai =>
                        cpush(
                          goc(result.additionalInformation, varName, () => []),
                          goc(goc(idToAdditionalInformation, resultNode.id), varName),
                          ai.id, ai)
                      )
                    result.ids.push(otherNode)
                    idToResult[otherNode.id] = result
                  })
                  ifpToId[ifpVar][ifp.id] = resultNode.id
                }
              }
            }
          })
          additionalInformationVars.forEach(varName => {
            if (binding[varName]) {
              let ai: INode = new SparqlBindingNode(binding[varName])
              cpush(
                goc(result.additionalInformation, varName, () => []),
                goc(goc(idToAdditionalInformation, resultNode.id), varName),
                ai.id, ai)
            }
          })
        })
        return groupToResults
    }

    private query(query: string, limit: number, configurations: SparqlAutocompletionConfiguration[], canceller?: angular.IPromise<any>): angular.IPromise<angular.IHttpPromiseCallbackArg<s.ISparqlBindingResult<{[id: string]: s.ISparqlBinding}>>>[] {
      return configurations.map(configuration => {
        let queryTemplate: string = configuration.queryTemplate
        queryTemplate = queryTemplate.replace(/<QUERY>/g, s.SparqlService.stringToSPARQLString(query))
        queryTemplate = queryTemplate.replace(/# CONSTRAINTS/g, configuration.constraints)
        queryTemplate = queryTemplate.replace(/<LIMIT>/g, '' + limit)
        return this.sparqlService.query(configuration.endpoint, queryTemplate, {timeout: canceller})})
    }

  }

}