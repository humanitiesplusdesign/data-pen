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
    constructor(public id: INode, public resultGroup: ResultGroup, public datasource: ResultsByDatasource, public matchedLabel: string, public prefLabel: string, public additionalInformation: string) {}
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
PREFIX sf: <http://ldf.fi/functions#>
SELECT ?groupId ?groupLabel ?id (SAMPLE(?matchedLabelS) AS ?matchedLabel) ?prefLabel (GROUP_CONCAT(?altLabel;SEPARATOR=', ') AS ?additionalInformation) {
  {
    SELECT DISTINCT ?groupId ?id {
      {
        SELECT DISTINCT ?groupId ?id {
          BIND(CONCAT("\\"",REPLACE(<QUERY>,"([\\\\+\\\\-\\\\&\\\\|\\\\!\\\\(\\\\)\\\\{\\\\}\\\\[\\\\]\\\\^\\\\\\"\\\\~\\\\*\\\\?\\\\:\\\\/\\\\\\\\])","\\\\$1"),"\\"") AS ?query)
          ?id text:query ?query .
          ?id a ?groupId .
          FILTER EXISTS {
            ?groupId skos:prefLabel|rdfs:label ?groupLabel
          }
          # CONSTRAINTS
        } LIMIT <LIMIT>
      } UNION {
        BIND(CONCAT(REPLACE(<QUERY>,"([\\\\+\\\\-\\\\&\\\\|\\\\!\\\\(\\\\)\\\\{\\\\}\\\\[\\\\]\\\\^\\\\\\"\\\\~\\\\*\\\\?\\\\:\\\\/\\\\\\\\])","\\\\$1"),"*") AS ?query)
        ?id text:query ?query .
        ?id a ?groupId .
        FILTER EXISTS {
          ?groupId skos:prefLabel|rdfs:label ?groupLabel
        }
        # CONSTRAINTS
      }
    }
  }
  ?id skos:prefLabel|rdfs:label|skos:altLabel ?matchedLabelS
  FILTER (REGEX(LCASE(?matchedLabelS),CONCAT("\\\\b",LCASE(<QUERY>))))
  ?groupId sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?groupLabel) .
  ?id sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?prefLabel) .
  OPTIONAL {
    ?id skos:altLabel ?altLabel .
  }
}
GROUP BY ?groupId ?groupLabel ?id ?prefLabel
HAVING(BOUND(?id) && COUNT(?altLabel)<10) # workaround for Schoenberg bug
`

    constructor(private workerService: WorkerService) {}
    public autocomplete(query: string, limit: number, configurations: SparqlAutocompletionConfiguration[], canceller?: angular.IPromise<any>): angular.IPromise<ResultsByDatasource[]> {
      return this.workerService.call('sparqlAutocompleteWorkerService', 'autocomplete', [query, limit, configurations], canceller)
    }
  }

  export class SparqlAutocompleteWorkerService {
    constructor(private $q: angular.IQService, private sparqlService: s.SparqlService) { }

    public autocomplete(query: string, limit: number, configurations: SparqlAutocompletionConfiguration[], canceller?: angular.IPromise<any>): angular.IPromise<ResultsByDatasource[]> {
      return this.$q.all(configurations.map(configuration => {
        let queryTemplate: string = configuration.queryTemplate
        queryTemplate = queryTemplate.replace(/<QUERY>/g, s.SparqlService.stringToSPARQLString(query))
        queryTemplate = queryTemplate.replace(/# CONSTRAINTS/g, configuration.constraints)
        queryTemplate = queryTemplate.replace(/<LIMIT>/g, '' + limit)
        return this.sparqlService.query(configuration.endpoint, queryTemplate, {timeout: canceller}).then(
          (response: angular.IHttpPromiseCallbackArg<s.ISparqlBindingResult<{[id: string]: s.ISparqlBinding}>>) => {
            let ds: ResultsByDatasource = new ResultsByDatasource(configuration)
            let groupToResults: {[groupId: string]: ResultGroup} = {}
            response.data.results.bindings.forEach(binding => {
              if (!groupToResults[binding['groupId'].value]) groupToResults[binding['groupId'].value] = new ResultGroup(binding['groupLabel'].value)
              groupToResults[binding['groupId'].value].results.push(new Result(new SparqlBindingNode(binding['id']), groupToResults[binding['groupId'].value], ds, binding['matchedLabel'].value, binding['prefLabel'].value, binding['additionalInformation'] ? binding['additionalInformation'].value : ''))
            })
            for (let groupId in groupToResults) ds.resultsByGroup.push(groupToResults[groupId])
            return ds
          }
        )
      }))
    }
  }

}
