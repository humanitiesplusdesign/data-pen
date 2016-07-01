namespace fibra {
  'use strict'

  class SparqlExploreComponentController {
    public itemService: SparqlItemService
    public items: Item[]
    public properties: {}[]
    public classTreePromise: angular.IPromise<TreeNode[]>
    public callbackRegistrator: Function
    
    public queryAndBuild = ():void => {
      console.log("Query and Build")
      this.classTreePromise.then(ct => {
        this.itemService.getAllItems().then(
          (items: Item[]) => {
            this.items = items
            console.log(this.items)
            this.properties = this.items[0].properties.map((p) => {
              return {key: p.id, value: p.label.value }
            })
          }
        )
      })
    }

    constructor(private sparqlItemService: SparqlItemService) {
      console.log("Here")
      this.callbackRegistrator(this.queryAndBuild)
      this.itemService = sparqlItemService
      this.queryAndBuild()
    }
  }

  export class ExploreComponent implements angular.IComponentOptions {
    public bindings: {[id: string]: string} = {
      classTreePromise: '=',
      callbackRegistrator: '='
    }
    public controller: Function = SparqlExploreComponentController
    public templateUrl: string = 'partials/explore.html'
  }
}
