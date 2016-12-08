namespace fibra {
  'use strict'

  export class ConfigureViewComponentController implements angular.IComponentController {
    public configurations: Configuration[] = []
    public setConfiguration(configuration: Configuration): void {
      this.configurationService.setConfiguration(configuration)
      this.$state.go('select')
    }
    constructor(private configurationService: ConfigurationService, private $state: angular.ui.IStateService) {
      let emloConfiguration: EndpointConfiguration = new EndpointConfiguration('emlo', 'EMLO', new NamedNode('http://ldf.fi/emlo/sparql'), [CIDOC.Person, CIDOC.Place, CIDOC.Group])
      emloConfiguration.autocompletionTextMatchQueryTemplate = emloConfiguration.autocompletionTextMatchQueryTemplate.replace(/\{ # ADDITIONALVARIABLES/g, '?ifpWikipediaPage ?ifpODBNId {').replace(/# ADDITIONALSELECT/g, `
UNION {
  {
    ?id <http://emlo.bodleian.ox.ac.uk/schema#cofk_union_relationship_type-is_related_to> ?ref .
    FILTER(REGEX(STR(?ref),'http://..\\\\.wikipedia\\\\.org/wiki/'))
    BIND(?ref AS ?ifpWikipediaPage)
  } UNION {
    ?id <http://emlo.bodleian.ox.ac.uk/schema#cofk_union_relationship_type-is_related_to> ?ref .
    FILTER(STRSTARTS(STR(?ref),'http://www.oxforddnb.com/view/article/'))
    BIND(REPLACE(STR(?ref),'http://www.oxforddnb.com/view/article/([^?]*).*','$1') AS ?ifpODBNId)
  }
}`)
      let sdfbConfiguration: EndpointConfiguration = new EndpointConfiguration('sdfb', 'SDFB', new NamedNode('http://ldf.fi/sdfb/sparql'), [CIDOC.Person, CIDOC.Place, CIDOC.Group])
      sdfbConfiguration.autocompletionTextMatchQueryTemplate = sdfbConfiguration.autocompletionTextMatchQueryTemplate.replace(/\{ # ADDITIONALVARIABLES/g, '?ifpODBNId {').replace(/# ADDITIONALSELECT/g, `
UNION {
  ?id <http://ldf.fi/sdfb/schema#odbnId> ?ifpODBNId .
}
`)
      let lcnamesConfiguration: EndpointConfiguration = new EndpointConfiguration('lcnames', 'LC Names', new NamedNode('http://ldf.fi/lcnames/sparql'), [MADS.CorporateName, MADS.PersonalName, MADS.Geographic])
      let procopeConfiguration: EndpointConfiguration = new EndpointConfiguration('procope', 'Procope', new NamedNode('http://ldf.fi/procope/sparql'), [CIDOC.Person, CIDOC.Place, CIDOC.Group])
      procopeConfiguration.autocompletionTextMatchQueryTemplate = procopeConfiguration.autocompletionTextMatchQueryTemplate.replace(/\{ # ADDITIONALVARIABLES/g, '?ifpWikipediaPage {').replace(/# ADDITIONALSELECT/g, `
UNION {
  ?id <http://ldf.fi/procope-schema#wikipediaUrl> ?ref .
  BIND(IRI(?ref) AS ?ifpWikipediaPage)
}
`)
      let gettyAutocompletionQueryTemplate: string = `PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX luc: <http://www.ontotext.com/owlim/lucene#>
PREFIX gvp: <http://vocab.getty.edu/ontology#>
PREFIX aat: <http://vocab.getty.edu/aat/>
PREFIX tgn: <http://vocab.getty.edu/tgn/>
SELECT ?groupId ?groupLabel ?id ?prefLabel ?matchedLabel ?sameAs ?altLabel {
  {
    SELECT ?id ?matchedLabel {
      BIND(CONCAT(REPLACE(<QUERY>,"([\\\\+\\\\-\\\\&\\\\|\\\\!\\\\(\\\\)\\\\{\\\\}\\\\[\\\\]\\\\^\\\\\\"\\\\~\\\\*\\\\?\\\\:\\\\/\\\\\\\\])","\\\\$1"),"*") AS ?query)
      ?id luc:term ?query .
      # CONSTRAINTS
      ?id rdfs:label ?matchedLabel .
    } LIMIT <LIMIT>
  } UNION {
    BIND(CONCAT("\\"",REPLACE(<QUERY>,"([\\\\+\\\\-\\\\&\\\\|\\\\!\\\\(\\\\)\\\\{\\\\}\\\\[\\\\]\\\\^\\\\\\"\\\\~\\\\*\\\\?\\\\:\\\\/\\\\\\\\])","\\\\$1"),"\\"") AS ?query)
    ?id luc:term ?query .
    # CONSTRAINTS
    ?id rdfs:label ?matchedLabel .
    FILTER (LCASE(?matchedLabel)=LCASE(<QUERY>))
  }
  ?id skos:inScheme <SCHEME> .
  FILTER (REGEX(LCASE(?matchedLabel),CONCAT("\\\\b",LCASE(<QUERY>))))
  ?id a ?groupId .
  ?groupId rdfs:label ?groupLabel .
  {
    ?id gvp:prefLabelGVP [xl:literalForm ?prefLabel] .
  } UNION {
    ?id skos:exactMatch ?sameAs .
  }
}`
      let gettyRemoteItemQueryTemplate: string = `PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX gvp: <http://vocab.getty.edu/ontology#>
SELECT ?property ?propertyLabel ?object ?objectLabel {
  VALUES (?id ?oid) { <IDPAIRS> }
  ?oid ?property ?object .
  ?property rdfs:label ?propertyLabel .
  ?object gvp:prefLabelGVP [xl:literalForm ?objectLabel] .
}`
      let ulanConfiguration: EndpointConfiguration = new EndpointConfiguration('ulan', 'ULAN', new NamedNode('http://ldf.fi/corsproxy/vocab.getty.edu/sparql'), [GETTY.PersonConcept, GETTY.GroupConcept])
      ulanConfiguration.autocompletionTextMatchQueryTemplate = gettyAutocompletionQueryTemplate.replace(/<SCHEME>/g, 'ulan:')
      ulanConfiguration.remoteItemQueryTemplate = gettyRemoteItemQueryTemplate
      let tgnConfiguration: EndpointConfiguration = new EndpointConfiguration('tgn', 'TGN', new NamedNode('http://ldf.fi/corsproxy/vocab.getty.edu/sparql'), [GETTY.AdminPlaceConcept, GETTY.PhysAdminPlaceConcept])
      tgnConfiguration.autocompletionTextMatchQueryTemplate = gettyAutocompletionQueryTemplate.replace(/<SCHEME>/g, 'tgn:')
      tgnConfiguration.remoteItemQueryTemplate = gettyRemoteItemQueryTemplate
      let viafConfiguration: EndpointConfiguration = new EndpointConfiguration('viaf', 'VIAF', new NamedNode('http://ldf.fi/viaf/sparql'))
      viafConfiguration.autocompletionTextMatchQueryTemplate = viafConfiguration.autocompletionTextMatchQueryTemplate.replace(/# ADDITIONALSELECT/g, `
UNION {
  ?id dcterms:identifier ?rid .
  FILTER(STRSTARTS(?rid,"LC|n"))
  BIND(IRI(REPLACE(?rid, "^LC\\\\|n *","http://id.loc.gov/authorities/names/n")) AS ?sameAs)
}`)

      let c: Configuration = new Configuration('fbtee', 'French Book Trade in Enlightenment Europe')
      c.primaryEndpoint = new PrimaryEndpointConfiguration('local', 'Local', new NamedNode('http://ldf.fi/fibra/sparql'), new NamedNode('http://ldf.fi/fibra/sparql'))
      c.primaryEndpoint.autocompletionTextMatchQueryTemplate = c.primaryEndpoint.autocompletionTextMatchQueryTemplate.replace(/# STARTGRAPH/g, 'GRAPH <GRAPH> {').replace(/# ENDGRAPH/g, '}')
      c.authorityEndpoints = [
        ulanConfiguration,
        viafConfiguration,
        tgnConfiguration,
        new EndpointConfiguration('geonames', 'GeoNames', new NamedNode('http://ldf.fi/geonames/sparql'))
      ]
      c.authorityEndpoints.forEach((e, i) => e.class =  'source' + i)
      c.archiveEndpoints = [
        new EndpointConfiguration('fbtee', 'FBTEE', new NamedNode('http://ldf.fi/fbtee/sparql'), [CIDOC.Person, CIDOC.Place, CIDOC.Group])
      ]
      c.archiveEndpoints.forEach((e, i) => e.class =  'source' + (c.authorityEndpoints.length + i))
      this.configurations.push(c)
      c = new Configuration('aw', 'Ancient World')
      c.primaryEndpoint = new PrimaryEndpointConfiguration('local', 'Local', new NamedNode('http://ldf.fi/fibra/sparql'), new NamedNode('http://ldf.fi/fibra/sparql'))
      c.primaryEndpoint.autocompletionTextMatchQueryTemplate = c.primaryEndpoint.autocompletionTextMatchQueryTemplate.replace(/# STARTGRAPH/g, 'GRAPH <GRAPH> {').replace(/# ENDGRAPH/g, '}')
      c.authorityEndpoints = [
        // pleiades
        // latin DBpedia?
        tgnConfiguration,
        new EndpointConfiguration('geonames', 'GeoNames', new NamedNode('http://ldf.fi/geonames/sparql'))
      ]
      c.authorityEndpoints.forEach((e, i) => e.class =  'source' + i)
      c.archiveEndpoints = [
        // pelagios
        // nomisma
        // perseus
      ]
      c.archiveEndpoints.forEach((e, i) => e.class =  'source' + (c.authorityEndpoints.length + i))
      this.configurations.push(c)
      c = new Configuration('procope', 'Procope')
      c.primaryEndpoint = new PrimaryEndpointConfiguration('local', 'Local', new NamedNode('http://ldf.fi/fibra/sparql'), new NamedNode('http://ldf.fi/fibra/sparql'))
      c.primaryEndpoint.autocompletionTextMatchQueryTemplate = c.primaryEndpoint.autocompletionTextMatchQueryTemplate.replace(/# STARTGRAPH/g, 'GRAPH <GRAPH> {').replace(/# ENDGRAPH/g, '}')
      c.authorityEndpoints = [
        ulanConfiguration,
        viafConfiguration,
        tgnConfiguration,
        new EndpointConfiguration('geonames', 'GeoNames', new NamedNode('http://ldf.fi/geonames/sparql'))
      ]
      c.authorityEndpoints.forEach((e, i) => e.class =  'source' + i)
      c.archiveEndpoints = [
        emloConfiguration
      ]
      c.archiveEndpoints.forEach((e, i) => e.class =  'source' + (c.authorityEndpoints.length + i))
      this.configurations.push(c)
      c = new Configuration('all', 'All Datasources')
      c.primaryEndpoint = new PrimaryEndpointConfiguration('local', 'Local', new NamedNode('http://ldf.fi/fibra/sparql'), new NamedNode('http://ldf.fi/fibra/sparql'))
      c.primaryEndpoint.autocompletionTextMatchQueryTemplate = c.primaryEndpoint.autocompletionTextMatchQueryTemplate.replace(/# STARTGRAPH/g, 'GRAPH <GRAPH> {').replace(/# ENDGRAPH/g, '}')
      c.authorityEndpoints = [
        ulanConfiguration,
        lcnamesConfiguration,
        viafConfiguration,
        tgnConfiguration,
        new EndpointConfiguration('geonames', 'GeoNames', new NamedNode('http://ldf.fi/geonames/sparql'))
      ]
      c.authorityEndpoints.forEach((e, i) => e.class =  'source' + i)
      c.archiveEndpoints = [
        sdfbConfiguration,
        emloConfiguration,
        procopeConfiguration,
        new EndpointConfiguration('fbtee', 'FBTEE', new NamedNode('http://ldf.fi/fbtee/sparql'), [CIDOC.Person, CIDOC.Place, CIDOC.Group]),
        new EndpointConfiguration('schoenberg', 'Schoenberg', new NamedNode('http://ldf.fi/schoenberg/sparql'), [CIDOC.Person, CIDOC.Place, CIDOC.Group])
      ]
      c.archiveEndpoints.forEach((e, i) => e.class =  'source' + (c.authorityEndpoints.length + i))
      c.instanceNS = 'http://ldf.fi/fibra/'
      c.schemaNS = 'http://ldf.fi/fibra/schema#'
      this.configurations.push(c)
      c = new Configuration('local', 'SPARQL endpoint on localhost')
      c.primaryEndpoint = new PrimaryEndpointConfiguration('local', 'Local', new NamedNode('http://localhost:3030/fibra/sparql'), new NamedNode('http://localhost:3030/fibra/update'))
      c.primaryEndpoint.autocompletionTextMatchQueryTemplate = SparqlAutocompleteService.naiveMatchQueryTemplate
      c.primaryEndpoint.localItemQueryTemplate = SparqlItemService.naiveGetLocalItemPropertiesQuery
      this.configurations.push(c)
    }
  }

  export class ConfigureViewComponent implements angular.IComponentOptions {
      public controller: string = 'ConfigureViewComponentController' // (new (...args: any[]) => angular.IController) = ConfigureViewComponentController
      public templateUrl: string = 'components/configure-view/configure-view.html'
  }
}
