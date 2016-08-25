namespace fibra {
  'use strict'

  import s = fi.seco.sparql

  export class ResultGroup {
    public results: Result[] = []
    constructor(public label: string) {}
  }

  export class Result {
    public ids: INode[] = []
    public datasources: EndpointConfiguration[] = []
    public additionalInformation: {[varName: string]: INode[]} = {}
    constructor(id: INode, public resultGroup: ResultGroup, datasource: EndpointConfiguration, public matchedLabel: INode, public prefLabel: INode) {
      this.ids.push(id)
      this.datasources.push(datasource)
    }
  }

  export class SparqlAutocompleteService {

    public static defaultMatchQueryTemplate: string = `
PREFIX text: <http://jena.apache.org/text#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX sf: <http://ldf.fi/functions#>
PREFIX fibra: <http://ldf.fi/fibra/schema#>
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
        ?id a ?groupId .
        # CONSTRAINTS
      }
    }
    GROUP BY ?groupId ?id
    HAVING(BOUND(?id))
  }
  {
    ?groupId sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel <PREFLANG> '' ?groupLabel) .
    ?id sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel <PREFLANG> '' ?prefLabel) .
  } UNION {
    ?id skos:prefLabel|rdfs:label|skos:altLabel ?matchedLabel
    FILTER (REGEX(LCASE(?matchedLabel),CONCAT("\\\\b",LCASE(<QUERY>))))
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
      let idToIdSet: EMap<StringSet> = new EMap<StringSet>()
      let idToGroupIdSet: EMap<StringSet> = new EMap<StringSet>()
      let groupIdToLabel: EMap<ONodeSet<INode>> = new EMap<ONodeSet<INode>>()
      let ifpVarPlusValueToIdSet: EMap<EMap<StringSet>> = new EMap<EMap<StringSet>>()
      let idToPrefLabel: EMap<INode> = new EMap<INode>()
      let idToMatchedLabelSet: EMap<NodeSet<INode>> = new EMap<NodeSet<INode>>()
      let idToAltLabelSet: EMap<NodeSet<INode>> = new EMap<NodeSet<INode>>(() => new ONodeSet<INode>())
      return this.$q.all(this.configurationWorkerService.configuration.allEndpoints().map(endpointConfiguration => {
        let queryTemplate: string = endpointConfiguration.autocompletionTextMatchQueryTemplate
        queryTemplate = queryTemplate.replace(/<QUERY>/g, s.SparqlService.stringToSPARQLString(query))
        queryTemplate = queryTemplate.replace(/# CONSTRAINTS/g, endpointConfiguration.dataModelConfiguration.typeConstraints)
        queryTemplate = queryTemplate.replace(/<LIMIT>/g, '' + limit)
        queryTemplate = queryTemplate.replace(/<PREFLANG>/g, this.configurationWorkerService.configuration.preferredLanguage)
        return this.sparqlService.query(endpointConfiguration.endpoint.value, queryTemplate, {timeout: canceller}).then(
          (response) => response.data!.results.bindings.forEach(binding => {
            let id: string = binding['id'].value
            if (binding['prefLabel']) {
              if (idToPrefLabel.has(id)) idToAltLabelSet.goc(id).add(idToPrefLabel.get(id))
              idToPrefLabel.set(id, DataFactory.instance.nodeFromBinding(binding['prefLabel']))
            }
            if (binding['altLabel'])
              idToAltLabelSet.goc(id).add(DataFactory.instance.nodeFromBinding(binding['altLabel']))
          })
        ).catch(() => undefined)
      })).then(() => {
        let ret: ResultGroup[] = []
        return ret
      })
    }
  }

}
