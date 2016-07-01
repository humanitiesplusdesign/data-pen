namespace fibra {
  'use strict'

  class SparqlExploreComponentController {
    public itemService: SparqlItemService
    public classTreePromise: angular.IPromise<TreeNode[]>
    constructor(private sparqlItemService: SparqlItemService) {
      this.itemService = sparqlItemService
      // this.sparqlItemService.getItem(1).then(
      //   (item: Item) => this.item = item
      // )
      this.classTreePromise.then(ct => {
        console.log(ct)
      })
    }
  }

  export class ExploreComponent implements angular.IComponentOptions {
    public bindings: {[id: string]: string} = {
      classTreePromise: '='
    }
    public controller: Function = SparqlExploreComponentController
    public templateUrl: string = 'partials/explore.html'
  }
}
