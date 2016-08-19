namespace fibra {
  'use strict'

    export class Configuration {
      public preferredLanguage: string = '"en"'
      public primaryEndpoint: PrimaryEndpointConfiguration
      public authorityEndpoints: EndpointConfiguration[] = []
      public archiveEndpoints: EndpointConfiguration[] = []
      public globalDataModelConfiguration: DataModelConfiguration = new DataModelConfiguration()
      public instanceNS: string
      public instanceGraph: string
      public schemaNS: string
      public schemaGraph: string
      public deleteItemQuery: string = SparqlItemService.deleteItemQuery
      public prefixes: string = ''
      public allEndpoints(): EndpointConfiguration[] {
        let allEndpoints: EndpointConfiguration[] = this.archiveEndpoints.concat(this.authorityEndpoints)
        allEndpoints.push(this.primaryEndpoint)
        return allEndpoints
      }
    }

    export class EndpointConfiguration {
      public autocompletionTextMatchQueryTemplate: string = SparqlAutocompleteService.defaultMatchQueryTemplate
      public treeQueryTemplate: string = SparqlTreeService.getClassTreeQuery
      public itemQueryTemplate: string = SparqlItemService.getItemPropertiesQuery
      public dataModelConfiguration: DataModelConfiguration = new DataModelConfiguration()
      constructor(public id: string, public title: string, public endpoint: INode, selectedTypes: INode[] = []) {
        this.dataModelConfiguration.setSelectedTypes(selectedTypes)
      }
    }

    export class PrimaryEndpointConfiguration extends EndpointConfiguration {
      constructor(id: string, title: string, endpoint: INode, public updateEndpoint: INode = endpoint) {
        super(id, title, endpoint)
      }
    }

    export class DataModelConfiguration {
      public typeConstraints: string = ''
      public typeTree: TreeNode[] = []
      public selectedTypes: INode[] = []
      public properties: INode[] = []
      public selectedProperties: INode[] = []
      public propertyPropertyMap: {[id: string]: ISourcedNode[] } = {}
      public typeTypeMap: {[id: string]: ISourcedNode[] } = {}
      public setSelectedTypes(selectedTypes: INode[]): void {
        this.selectedTypes = selectedTypes
        this.updateFilter()
      }
      private updateFilter(): void {
        if (this.selectedTypes.length === 0)
          this.typeConstraints = ''
        else
          this.typeConstraints = 'FILTER (?groupId IN (' + this.selectedTypes.map(id => id.toCanonical()).join(', ') + '))'
      }
    }

  export class ConfigurationService {
    public configuration: Configuration = new Configuration()
    constructor(workerService: WorkerService) {
      let c: Configuration = this.configuration
      c.primaryEndpoint = new PrimaryEndpointConfiguration('local', 'Local', new NamedNode('http://ldf.fi/fibra/sparql'), new NamedNode('http://ldf.fi/fibra/sparql'))
      c.authorityEndpoints = [
        // ULAN endpoint is not standards compliant, needs further tweaking new EndpointConfiguration('ulan', 'ULAN', new NamedNode('http://ldf.fi/corsproxy/vocab.getty.edu/sparql.json')),
        new EndpointConfiguration('geonames', 'GeoNames', new NamedNode('http://ldf.fi/geonames/sparql')),
        new EndpointConfiguration('viaf', 'VIAF', new NamedNode('http://ldf.fi/viaf-labels/sparql')), // birth/death dates not yet loaded
        // not yet loaded new EndpointConfiguration('lcnames', 'LC Names', new NamedNode('http://ldf.fi/lcnames/sparql'))
      ]
      let emloConfiguration: EndpointConfiguration = new EndpointConfiguration('emlo', 'EMLO', new NamedNode('http://ldf.fi/emlo/sparql'), [CIDOC.Person, CIDOC.Place, CIDOC.Group])
      emloConfiguration.autocompletionTextMatchQueryTemplate = emloConfiguration.autocompletionTextMatchQueryTemplate.replace(/# ADDITIONALCONSTRUCT/g, '?id fibra:ifpWikipediaPage ?ifpWikipediaPage . ?id fibra:ifpODBNId ?ifpODBNId .').replace(/# ADDITIONALSELECT/g, `
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
      let sdfbConfiguration: EndpointConfiguration = new EndpointConfiguration('sdfb', 'Six Degrees of Francis Bacon', new NamedNode('http://ldf.fi/sdfb/sparql'), [CIDOC.Person, CIDOC.Place, CIDOC.Group])
      sdfbConfiguration.autocompletionTextMatchQueryTemplate = sdfbConfiguration.autocompletionTextMatchQueryTemplate.replace(/# ADDITIONALCONSTRUCT/g, '?id fibra:ifpWikipediaPage ?ifpWikipediaPage .').replace(/# ADDITIONALSELECT/g, `
UNION {
  ?id <http://ldf.fi/procope-schema#wikipediaUrl> ?ref .
  BIND(IRI(?ref) AS ?ifpWikipediaPage)
}
`)
      let procopeConfiguration: EndpointConfiguration = new EndpointConfiguration('procope', 'Procope', new NamedNode('http://ldf.fi/procope/sparql'), [CIDOC.Person, CIDOC.Place, CIDOC.Group])
      procopeConfiguration.autocompletionTextMatchQueryTemplate = procopeConfiguration.autocompletionTextMatchQueryTemplate.replace(/# ADDITIONALCONSTRUCT/g, '?id fibra:ifpODBNId ?ifpODBNId .').replace(/# ADDITIONALSELECT/g, `
UNION {
  ?id <http://ldf.fi/sdfb/schema#odbnId> ?ifpODBNId .
}
`)
      c.archiveEndpoints = [
        sdfbConfiguration,
        emloConfiguration,
        procopeConfiguration,
        new EndpointConfiguration('schoenberg', 'Schoenberg', new NamedNode('http://ldf.fi/schoenberg/sparql'), [CIDOC.Person, CIDOC.Place, CIDOC.Group])
      ]
      c.instanceNS = 'http://ldf.fi/fibra/'
      c.instanceGraph = 'http://ldf.fi/fibra/main/'
      c.schemaNS = 'http://ldf.fi/fibra/schema#'
      c.schemaGraph = 'http://ldf.fi/fibra/schema#'
      workerService.callAll('configurationWorkerService', 'setConfiguration', [c])
    }
  }

  export class ConfigurationWorkerService {
    public configuration: Configuration
    public setConfiguration(configuration: Configuration): void {
      this.configuration = configuration
    }
  }

}
