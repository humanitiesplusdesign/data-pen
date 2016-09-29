namespace fibra {
  'use strict'

  class TreeViewConfiguration {
    constructor(public endpoint: string, public queryTemplate: string) {}
  }

  export class AuthorComponentController {

    public endpoints: EndpointConfiguration[]
    public classTree: TreeNode[]
    public classTreePromise: angular.IPromise<TreeNode[]>
    public selectedItem: INode

    public createItem(item: Result): angular.IPromise<INode> {
      let prefLabel: PropertyToValues<INode> = new PropertyToValues(SKOS.prefLabel)
      // prefLabel.values.push(item.prefLabel)
      console.log(item)
      let type: PropertyToValues<INode> = new PropertyToValues(RDF.type)
      // type.values.push(new NodePlusLabel(item.additionalInformation['type'][0], item.additionalInformation['typeLabel'][0]))
      let prom: angular.IPromise<INode> = this.sparqlItemService.createNewItem(item.ids, [prefLabel, type])
      prom.then(() => {
        this.fibraService.dispatch('change')
      })
      return prom
    }

    constructor(private configurationService: ConfigurationService,
                sparqlTreeService: SparqlTreeService,
                private sparqlItemService: SparqlItemService,
                private fibraService: FibraService) {
      this.endpoints = configurationService.configuration.remoteEndpoints()
      this.classTreePromise = sparqlTreeService.getTree(this.configurationService.configuration.primaryEndpoint.endpoint.value, SparqlTreeService.getClassTreeQuery)
      this.classTreePromise.then(c => this.classTree = c)

      this.fibraService.on('change', () => {
        this.classTreePromise = sparqlTreeService.getTree(this.configurationService.configuration.primaryEndpoint.endpoint.value, SparqlTreeService.getClassTreeQuery)
        return this.classTreePromise.then(c => {
          this.classTree = c
          return 'ok'
        })
      })
    }
  }

  export class AuthorComponent implements angular.IComponentOptions {
      public controller = AuthorComponentController
      public templateUrl: string = 'partials/author.html'
  }
}
