namespace fibra {
  'use strict'

  class TreeViewConfiguration {
    constructor(public endpoint: string, public queryTemplate: string) {}
  }

  export class ConstructViewComponentController {

    public endpoints: EndpointConfiguration[]
    public classTree: TreeNode[]
    public classTreePromise: angular.IPromise<TreeNode[]>
    public selectedItem: INode
    public types: TreeNode[] = []
    public chosenTypes: { [id: string]: TreeNode|null}

    public createItem(item: Result): angular.IPromise<INode> {
      let prefLabel: PropertyToValues<INode> = new PropertyToValues(SKOS.prefLabel)
      prefLabel.values.push(item.prefLabel)
      let type: PropertyToValues<INode> = new PropertyToValues(RDF.type)
      let typeWithLabel: INodePlusLabel = new SourcedNodePlusLabel(item.additionalInformation['type'][0], item.additionalInformation['typeLabel'][0])
      type.values.push(typeWithLabel)
      let prom: angular.IPromise<INode> = this.sparqlItemService.createNewItem(item.ids, [prefLabel, type])
      prom.then(() => {
        this.fibraService.dispatch('change')
      })
      return prom
    }

    private traverseClassTree(nodes: TreeNode[], test: Function, onSuccess: Function): void {
      let traverse = (node: TreeNode) => {
        if(test(node)) {
          onSuccess(node)
          node.children.forEach(traverse)
        }
      }
      nodes.forEach(traverse)
    }

    constructor(private configurationService: ConfigurationService,
                private sparqlTreeService: SparqlTreeService,
                private sparqlItemService: SparqlItemService,
                private fibraService: FibraService) {

      this.chosenTypes = {
        primary: null,
        secondary: null,
        tertiary: null
      }
      this.endpoints = configurationService.configuration.remoteEndpoints()
      this.classTreePromise = sparqlTreeService.getTree(this.configurationService.configuration.primaryEndpoint.endpoint.value, this.configurationService.configuration.primaryEndpoint.treeQueryTemplate)
      this.classTreePromise.then(c => { 
        this.classTree = c;
        this.traverseClassTree(c, n => this.types.indexOf(n) === -1 && n.children.length === 0, n => this.types.push(n))
      })
      this.fibraService.on('change', () => {
        this.classTreePromise = sparqlTreeService.getTree(this.configurationService.configuration.primaryEndpoint.endpoint.value, SparqlTreeService.getClassTreeQuery)
        return this.classTreePromise.then(c => {
          this.classTree = c
          return 'ok'
        })
      })
    }
  }

  export class ConstructViewComponent implements angular.IComponentOptions {
      public controller: string = 'ConstructViewComponentController' // (new (...args: any[]) => angular.IController) = ConstructViewComponentController
      public templateUrl: string = 'components/construct-view/construct-view.html'
  }
}
