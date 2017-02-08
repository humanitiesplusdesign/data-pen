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
    private limitFilter: string = ''
    public state: fibra.State
    public paletteDisplay: boolean = false

    public createItem(item: Result) {
      // Is there a type on this item? If so, and it is not already in chosenTypes,
      // add it.
      let itemTypeKey: string = item.additionalInformation['type'][0] ? item.additionalInformation['type'][0].value : ""
      let itemType: TreeNode = this.types.filter((t) => { return t.id === itemTypeKey })[0]
      let chosenTypes: TreeNode[] = this.fibraService.getState().construct.displayTypes
      if (!chosenTypes[0] && itemType) {
        this.fibraService.dispatchAction(this.fibraService.setOrderedTypes([itemType]))
      } else if (!chosenTypes[1] && itemType && (chosenTypes[0] !== itemType)) {
        let newTypes: TreeNode[] = chosenTypes.concat([])
        newTypes.push(itemType)
        this.fibraService.dispatchAction(this.fibraService.setOrderedTypes(newTypes))
      }

      return this.fibraService.dispatchAction(this.fibraService.displayItem(item.ids[0]))
    }

    public downloadRDF() {
      let currentConfig = this.configurationService.configuration.graph.value
      let downloadlink = "http://ldf.fi/fibra/sparql?graph=" + currentConfig // + "&force-accept=application/rdf+xml"
      let request = new XMLHttpRequest()
      request.open("GET", downloadlink, true)
      request.onload = function (e) {
          if (request.readyState === 4) {
            if (request.status === 200) {
              let data = request.responseText
              let download = document.createElement("a")
              download.href = "data:application/rdf+xml;charset=utf-8," + data
              download.download = "fibra.ttl"
              document.body.appendChild(download)
              download.click()
              document.body.removeChild(download)
            } else {
              console.error(request.statusText);
            }
          }
        }
        request.send(null);
    }

    constructor(private configurationService: ConfigurationService,
                private sparqlTreeService: SparqlTreeService,
                private sparqlItemService: SparqlItemService,
                private fibraService: FibraService,
                private $scope: angular.IScope,
                private $q: angular.IQService) {

      fibraService.on('change', () => {
        let chosenTypes = fibraService.getState().construct.displayTypes
        this.limitFilter = ''
        chosenTypes.forEach((t) => { if (t) this.limitFilter += '<' + t.id + '>' + ',' })
        if (this.limitFilter.length !== 0) this.limitFilter = 'FILTER (?groupId IN (' + this.limitFilter.substring(0, this.limitFilter.length - 1) + '))'
        return this.$q.resolve('ok')
      })
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

    private traverseClassTree(nodes: TreeNode[], test: Function, onSuccess: Function): void {
      let traverse = (node: TreeNode) => {
        if(test(node)) {
          onSuccess(node)
          node.children.forEach(traverse)
        }
      }
      nodes.forEach(traverse)
    }
  }

  export class ConstructViewComponent implements angular.IComponentOptions {
      public controller: string = 'ConstructViewComponentController' // (new (...args: any[]) => angular.IController) = ConstructViewComponentController
      public templateUrl: string = 'components/construct-view/construct-view.html'
  }
}
