namespace fibra {
  'use strict'

  export class ConfigureViewComponentController implements angular.IComponentController {
    private configurations: Configuration[] = []
    private statistics: {[id: string]: TreeNode[]} = {}
    public setConfiguration(configuration: Configuration): void {
      this.configurationService.setConfiguration(configuration)
      this.$state.go('select')
    }
    constructor(private configurationService: ConfigurationService, private sparqlTreeService: SparqlTreeService, private $state: angular.ui.IStateService) {
      let emloConfiguration: EndpointConfiguration = new EndpointConfiguration('emlo', 'EMLO', new Citation('Early Modern Letters Online', 'http://emlo.bodleian.ox.ac.uk/blog/?page_id=907', 'Cultures of Knowledge', 'http://www.culturesofknowledge.org/'), new NamedNode('http://ldf.fi/emlo/sparql'), [CIDOC.Person, CIDOC.Place, CIDOC.Group])
      this.calculateStatistics(emloConfiguration)
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
      let sdfbConfiguration: EndpointConfiguration = new EndpointConfiguration('sdfb', 'SDFB', new Citation('Six Degrees of Francis Bacon: Reassembling the Early Modern Social Network', 'http://www.sixdegreesoffrancisbacon.com/about', 'SDFB Team', 'http://www.sixdegreesoffrancisbacon.com/team'), new NamedNode('http://ldf.fi/sdfb/sparql'), [CIDOC.Person, CIDOC.Place, CIDOC.Group])
      this.calculateStatistics(sdfbConfiguration)
      sdfbConfiguration.autocompletionTextMatchQueryTemplate = sdfbConfiguration.autocompletionTextMatchQueryTemplate.replace(/\{ # ADDITIONALVARIABLES/g, '?ifpODBNId {').replace(/# ADDITIONALSELECT/g, `
UNION {
  ?id <http://ldf.fi/sdfb/schema#odbnId> ?ifpODBNId .
}
`)
      let lcnamesConfiguration: EndpointConfiguration = new EndpointConfiguration('lcnames', 'LC Names', new Citation('Library of Congress Name Authority', 'http://id.loc.gov/authorities/names.html', 'Library of Congress', 'https://www.loc.gov/'), new NamedNode('http://ldf.fi/lcnames/sparql'), [MADS.CorporateName, MADS.PersonalName, MADS.Geographic])
      this.calculateStatistics(lcnamesConfiguration)
      let procopeConfiguration: EndpointConfiguration = new EndpointConfiguration('procope', 'Procope', new Citation('Procope', '', 'Dan Edelstein et al.', 'https://dlcl.stanford.edu/people/dan-edelstein'), new NamedNode('http://ldf.fi/procope/sparql'), [CIDOC.Person, CIDOC.Place, CIDOC.Group])
      this.calculateStatistics(procopeConfiguration)
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
      let ulanConfiguration: EndpointConfiguration = new EndpointConfiguration('ulan', 'ULAN', new Citation('Getty Union List of Artist Names', 'http://www.getty.edu/research/tools/vocabularies/ulan/index.html', 'The Getty Research Institute', 'http://www.getty.edu/research/'), new NamedNode('http://ldf.fi/corsproxy/vocab.getty.edu/sparql'), [GETTY.PersonConcept, GETTY.GroupConcept])
      ulanConfiguration.autocompletionTextMatchQueryTemplate = gettyAutocompletionQueryTemplate.replace(/<SCHEME>/g, 'ulan:')
      ulanConfiguration.remoteItemQueryTemplate = gettyRemoteItemQueryTemplate
      let tgnConfiguration: EndpointConfiguration = new EndpointConfiguration('tgn', 'TGN', new Citation('Getty Thesaurus of Geographic Names', 'http://www.getty.edu/research/tools/vocabularies/tgn/index.html', 'The Getty Research Institute', 'http://www.getty.edu/research/'), new NamedNode('http://ldf.fi/corsproxy/vocab.getty.edu/sparql'), [GETTY.AdminPlaceConcept, GETTY.PhysAdminPlaceConcept])
      tgnConfiguration.autocompletionTextMatchQueryTemplate = gettyAutocompletionQueryTemplate.replace(/<SCHEME>/g, 'tgn:')
      tgnConfiguration.remoteItemQueryTemplate = gettyRemoteItemQueryTemplate
      let viafConfiguration: EndpointConfiguration = new EndpointConfiguration('viaf', 'VIAF', new Citation('Virtual International Authority File', 'http://viaf.org/viaf/data/', 'OCLC Research', 'http://www.oclc.org/research.html'), new NamedNode('http://ldf.fi/viaf/sparql'))
      this.calculateStatistics(viafConfiguration)
      viafConfiguration.autocompletionTextMatchQueryTemplate = viafConfiguration.autocompletionTextMatchQueryTemplate.replace(/# ADDITIONALSELECT/g, `
UNION {
  ?id dcterms:identifier ?rid .
  FILTER(STRSTARTS(?rid,"LC|n"))
  BIND(IRI(REPLACE(?rid, "^LC\\\\|n *","http://id.loc.gov/authorities/names/n")) AS ?sameAs)
}`)

      let c: Configuration = new Configuration('fbtee', 'French Book Trade in Enlightenment Europe')
      c.primaryEndpoint = new PrimaryEndpointConfiguration('local', 'Local', new Citation('Local'), new NamedNode('http://ldf.fi/fibra/sparql'), new NamedNode('http://ldf.fi/fibra/sparql'))
      c.primaryEndpoint.autocompletionTextMatchQueryTemplate = c.primaryEndpoint.autocompletionTextMatchQueryTemplate.replace(/# STARTGRAPH/g, 'GRAPH <GRAPH> {').replace(/# ENDGRAPH/g, '}')
      c.primaryEndpoint.treeQueryTemplate = c.primaryEndpoint.treeQueryTemplate.replace(/# STARTGRAPH/g, 'GRAPH <GRAPH> {').replace(/# ENDGRAPH/g, '}')
      let geonamesConfiguration: EndpointConfiguration = new EndpointConfiguration('geonames', 'GeoNames', new Citation('GeoNames', 'http://www.geonames.org/about.html'), new NamedNode('http://ldf.fi/geonames/sparql'))
      this.calculateStatistics(geonamesConfiguration)
      c.authorityEndpoints = [
        ulanConfiguration,
        viafConfiguration,
        tgnConfiguration,
        geonamesConfiguration
      ]
      c.authorityEndpoints.forEach((e, i) => e.class =  'source' + i)
      let fbteeConfiguration: EndpointConfiguration = new EndpointConfiguration('fbtee', 'FBTEE', new Citation('The French Book Trade in Enlightenment Europe', 'http://fbtee.uws.edu.au/main/about-the-project/', 'FBTEE Project', 'http://fbtee.uws.edu.au/main/eula/#cites'), new NamedNode('http://ldf.fi/fbtee/sparql'), [CIDOC.Person, CIDOC.Place, CIDOC.Group])
      this.calculateStatistics(fbteeConfiguration)
      c.archiveEndpoints = [
        fbteeConfiguration
      ]
      c.archiveEndpoints.forEach((e, i) => e.class =  'source' + (c.authorityEndpoints.length + i))
      this.configurations.push(c)
      c = new Configuration('aw', 'Ancient World')
      c.primaryEndpoint = new PrimaryEndpointConfiguration('local', 'Local', new Citation('Local'), new NamedNode('http://ldf.fi/fibra/sparql'), new NamedNode('http://ldf.fi/fibra/sparql'))
      c.primaryEndpoint.autocompletionTextMatchQueryTemplate = c.primaryEndpoint.autocompletionTextMatchQueryTemplate.replace(/# STARTGRAPH/g, 'GRAPH <GRAPH> {').replace(/# ENDGRAPH/g, '}')
      c.primaryEndpoint.treeQueryTemplate = c.primaryEndpoint.treeQueryTemplate.replace(/# STARTGRAPH/g, 'GRAPH <GRAPH> {').replace(/# ENDGRAPH/g, '}')
      let ladbpediaConfiguration: EndpointConfiguration = new EndpointConfiguration('dbpedia-la', 'Latin DBPedia', new Citation('Latin DBpedia', 'http://wiki.dbpedia.org/about', 'DBpedia Association', 'http://wiki.dbpedia.org/dbpedia-association'), new NamedNode('http//ldf.fi/dbpedia/sparql'))
      // this.calculateStatistics(ladbpediaConfiguration)
      let pleiadesConfiguration: EndpointConfiguration = new EndpointConfiguration('pleiades', 'Pleiades', new Citation('The Pleiades Gazetteer', 'https://pleiades.stoa.org/home', 'The Pleiades Community', 'https://pleiades.stoa.org/credits'), new NamedNode('http://ldf.fi/ancore/sparql'), [GEOVOCAB.Feature])
      this.calculateStatistics(pleiadesConfiguration)
      // this.calculateStatistics(pleiadesConfiguration)
      c.authorityEndpoints = [
        pleiadesConfiguration,
        ladbpediaConfiguration,
        tgnConfiguration,
        geonamesConfiguration
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
      c.primaryEndpoint = new PrimaryEndpointConfiguration('local', 'Local', new Citation('Local'), new NamedNode('http://ldf.fi/fibra/sparql'), new NamedNode('http://ldf.fi/fibra/sparql'))
      c.primaryEndpoint.autocompletionTextMatchQueryTemplate = c.primaryEndpoint.autocompletionTextMatchQueryTemplate.replace(/# STARTGRAPH/g, 'GRAPH <GRAPH> {').replace(/# ENDGRAPH/g, '}')
      c.primaryEndpoint.treeQueryTemplate = c.primaryEndpoint.treeQueryTemplate.replace(/# STARTGRAPH/g, 'GRAPH <GRAPH> {').replace(/# ENDGRAPH/g, '}')
      c.authorityEndpoints = [
        ulanConfiguration,
        viafConfiguration,
        tgnConfiguration,
        geonamesConfiguration
      ]
      c.authorityEndpoints.forEach((e, i) => e.class =  'source' + i)
      c.archiveEndpoints = [
        emloConfiguration
      ]
      c.archiveEndpoints.forEach((e, i) => e.class =  'source' + (c.authorityEndpoints.length + i))
      this.configurations.push(c)
      c = new Configuration('all', 'All Datasources')
      c.primaryEndpoint = new PrimaryEndpointConfiguration('local', 'Local', new Citation('Local'), new NamedNode('http://ldf.fi/fibra/sparql'), new NamedNode('http://ldf.fi/fibra/sparql'))
      c.primaryEndpoint.autocompletionTextMatchQueryTemplate = c.primaryEndpoint.autocompletionTextMatchQueryTemplate.replace(/# STARTGRAPH/g, 'GRAPH <GRAPH> {').replace(/# ENDGRAPH/g, '}')
      c.primaryEndpoint.treeQueryTemplate = c.primaryEndpoint.treeQueryTemplate.replace(/# STARTGRAPH/g, 'GRAPH <GRAPH> {').replace(/# ENDGRAPH/g, '}')
      c.authorityEndpoints = [
        ulanConfiguration,
        lcnamesConfiguration,
        viafConfiguration,
        tgnConfiguration,
        geonamesConfiguration
      ]
      c.authorityEndpoints.forEach((e, i) => e.class =  'source' + i)
      let schoenbergConfiguration: EndpointConfiguration =  new EndpointConfiguration('schoenberg', 'Schoenberg', new Citation('The Schoenberg Database of Manuscripts', 'http://dla.library.upenn.edu/dla/schoenberg/ancillary.html?id=collections/schoenberg/about', 'SDBM Project', 'https://sdbm.library.upenn.edu/pages/About##staff'), new NamedNode('http://ldf.fi/schoenberg/sparql'), [CIDOC.Person, CIDOC.Place, CIDOC.Group])
      this.calculateStatistics(schoenbergConfiguration)
      c.archiveEndpoints = [
        sdfbConfiguration,
        emloConfiguration,
        procopeConfiguration,
        fbteeConfiguration,
        schoenbergConfiguration
      ]
      c.archiveEndpoints.forEach((e, i) => e.class =  'source' + (c.authorityEndpoints.length + i))
      c.instanceNS = 'http://ldf.fi/fibra/'
      c.schemaNS = 'http://ldf.fi/fibra/schema#'
      this.configurations.push(c)
      c = new Configuration('local', 'SPARQL endpoint on localhost')
      c.primaryEndpoint = new PrimaryEndpointConfiguration('local', 'Local', new Citation('Local'), new NamedNode('http://localhost:3030/fibra/sparql'), new NamedNode('http://localhost:3030/fibra/update'))
      c.primaryEndpoint.autocompletionTextMatchQueryTemplate = SparqlAutocompleteService.naiveMatchQueryTemplate
      c.primaryEndpoint.localItemQueryTemplate = SparqlItemService.naiveGetLocalItemPropertiesQuery
      this.configurations.push(c)
    }
    private calculateStatistics(c: EndpointConfiguration): void {
      c.treeQueryTemplate = c.treeQueryTemplate.replace(/# CONSTRAINTS/g, c.dataModelConfiguration.typeConstraints)
      this.sparqlTreeService.getTree(c.endpoint.value, c.treeQueryTemplate).then(
        (tree) => {
          let ntree: TreeNode[] = []
          let f: (n: TreeNode, cns: TreeNode[]) => TreeNode[] = (n: TreeNode, cns: TreeNode[]) => {
            if (cns.length === 1) return cns
            return [n]
          }
          for (let tn of tree) ntree = ntree.concat(TreeNode.recursivelyMap(tn, f))
          console.log(c.id, ntree)
          this.statistics[c.id] = ntree
        }
      )
    }
  }

  export class ConfigureViewComponent implements angular.IComponentOptions {
      public controller: string = 'ConfigureViewComponentController' // (new (...args: any[]) => angular.IController) = ConfigureViewComponentController
      public templateUrl: string = 'components/configure-view/configure-view.html'
  }
}
