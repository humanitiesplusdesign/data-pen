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

    public createItem(item: Result) {
      // Figure out if there is a Fibra identifier
      let fibraId = item.ids.filter((id) => {
        return id.value.indexOf("http://ldf.fi/fibra/") !== -1;
      })

      if(fibraId[0]) {
        // Make item visible
        return this.fibraService.dispatchAction(this.fibraService.displayItem(fibraId[0]))
      } else {
        // Create item and then display it
        // return this.fibraService.dispatchAction(this.fibraService.createItem(item.ids[0]))
      }

      // Otherwise just display a remote item at random (remove once creation is implemented)
      return this.fibraService.dispatchAction(this.fibraService.displayItem(item.ids[0]))
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
        this.fibraService.dispatchAction(this.fibraService.clearTypes())
        this.types = this.fibraService.getState().construct.types
        let addType = (type: TreeNode) => this.fibraService.dispatchAction(this.fibraService.addType(type))
        this.traverseClassTree(c, n => this.types.indexOf(n) === -1 && n.children.length === 0, n => addType(n))
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
