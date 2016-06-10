namespace fibra {
  'use strict'
  interface IMainScope extends angular.IScope {
    getClassTreeQuery: string
    acConfig: ISparqlAutocompletionConfiguration[]
  }

  export class MainController {
    constructor(private $scope: IMainScope) {
      let queryTemplate: string = `PREFIX text: <http://jena.apache.org/text#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX sf: <http://ldf.fi/functions#>
SELECT ?groupId ?groupLabel ?id ?matchedLabel ?prefLabel (GROUP_CONCAT(?altLabel;SEPARATOR=', ') AS ?additionalInformation) {
{
  SELECT DISTINCT ?groupId ?id ?matchedLabel {
    BIND(CONCAT(<QUERY>," ",REPLACE(<QUERY>,"([\\\\+\\\\-\\\\&\\\\|\\\\!\\\\(\\\\)\\\\{\\\\}\\\\[\\\\]\\\\^\\\\\\"\\\\~\\\\*\\\\?\\\\:\\\\/\\\\\\\\])","\\\\$1"),"*") AS ?query)
    ?id text:query ?query .
    ?id skos:prefLabel|rdfs:label|skos:altLabel ?matchedLabel
    FILTER (REGEX(LCASE(?matchedLabel),CONCAT("\\\\b",LCASE(<QUERY>))))
    ?id a ?groupId .
    FILTER EXISTS {
      ?groupId skos:prefLabel|rdfs:label ?groupLabel
    }
    # CONSTRAINTS
  } LIMIT <LIMIT>
}
?groupId sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?groupLabel) .
?id sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?prefLabel) .
OPTIONAL {
  ?id skos:altLabel ?altLabel .
}
}
GROUP BY ?groupId ?groupLabel ?id ?matchedLabel ?prefLabel
HAVING(BOUND(?id) && COUNT(?altLabel)<10) # workaround for Schoenberg bug
`
      $scope.acConfig = [
        {
          id: 'schoenberg',
          title: 'Schoenberg',
          endpoint: 'http://ldf.fi/schoenberg/sparql',
          queryTemplate: queryTemplate
        },
        {
          id: 'emlo',
          title: 'EMLO',
          endpoint: 'http://ldf.fi/emlo/sparql',
          queryTemplate: queryTemplate
        },
        { id: 'procope',
          title: 'Procope',
          endpoint: 'http://ldf.fi/procope/sparql',
          queryTemplate: queryTemplate
        }
      ]
      $scope.getClassTreeQuery = SparqlTreeService.getClassTreeQuery
    }
  }
}
