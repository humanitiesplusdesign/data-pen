namespace fibra {
  'use strict'

  class SparqlExploreComponentController {
    public itemService: SparqlItemService
    public items: Item[]
    public selectedItem: INode
    public properties: {}[]
    public classTreePromise: angular.IPromise<TreeNode[]>

    public queryAndBuild(): angular.IPromise<String> {
      return this.classTreePromise.then(ct => {
        return this.itemService.getAllItems().then(
          (items: Item[]) => {
            this.items = items
            this.properties = this.items[0].properties.map((p) => {
              return {key: p.toCanonical(), value: p.label.value }
            })
            return 'ok'
          }
        )
      })
    }

    public selectItem(id: INode): void {
      this.selectedItem = id
    }

    public delete(id: INode): angular.IPromise<string> {
      let prom = this.itemService.deleteItem(id)
      prom.then(() => { this.queryAndBuild() })
      return prom
    }

    constructor(private sparqlItemService: SparqlItemService,
                private fibraService: FibraService,
                private $q: angular.IQService) {
      this.fibraService.on('change', () => {
        return this.queryAndBuild()
      })
      this.itemService = sparqlItemService
      this.queryAndBuild()
    }
  }

  export class ExploreComponent implements angular.IComponentOptions {
    public bindings: {[id: string]: string} = {
      classTreePromise: '<',
      selectedItem: '='
    }
    public controller: Function = SparqlExploreComponentController
    public templateUrl: string = 'partials/explore.html'   
  }
}
