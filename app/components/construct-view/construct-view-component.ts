namespace fibra {
  'use strict'

  class TreeViewConfiguration {
    constructor(public endpoint: string, public queryTemplate: string) {}
  }

  export class ConstructViewComponentController {

    public classTree: TreeNode[]
    public classTreePromise: angular.IPromise<TreeNode[]>
    public selectedItem: INode
    public types: TreeNode[] = []
    public chosenTypes: { [id: string]: TreeNode|null}
    public state: fibra.State

    public createItem(item: Result) {
      // Is there a type on this item? If so, and it is not already in chosenTypes,
      // add it.
      let itemTypeKey: string = item.additionalInformation['type'][0] ? item.additionalInformation['type'][0].value : ""
      let itemType: TreeNode = this.types.filter((t) => { return t.id === itemTypeKey })[0]
      if (!this.chosenTypes['primary'] && itemType) {
        this.chosenTypes['primary'] = itemType
      } else if (!this.chosenTypes['secondary'] && itemType) {
        this.chosenTypes['secondary'] = itemType
      }

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
                private fibraService: FibraService,
                private $scope: angular.IRootScopeService,
                private $q: angular.IQService) {

      this.chosenTypes = {
        primary: null,
        secondary: null,
        tertiary: null
      }
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
      this.fibraService.on('action', () => {
        this.state = fibraService.getState()
        return this.$q.resolve('ok')
      })
      this.state = fibraService.getState()
    }
  }

  export class ConstructViewComponent implements angular.IComponentOptions {
      public controller: string = 'ConstructViewComponentController' // (new (...args: any[]) => angular.IController) = ConstructViewComponentController
      public templateUrl: string = 'components/construct-view/construct-view.html'
  }
}
