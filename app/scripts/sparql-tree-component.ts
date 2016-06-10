namespace fibra {
  'use strict'
  class SparqlTreeComponentController {
    private endpoint: string
    private query: string
    private tree: TreeNode[]
    constructor(private $q: angular.IQService, private sparqlTreeService: SparqlTreeService) {
      this.sparqlTreeService.getTree(this.endpoint , this.query).then(
        (tree: TreeNode[]) => this.tree = tree
      )
    }
  }

  export class SparqlTreeComponent implements angular.IComponentOptions {
      public bindings: {[id: string]: string} = {
        endpoint: '<',
        query: '<',
      }
      public controller: Function = SparqlTreeComponentController
      public templateUrl: string = 'partials/sparql-tree.html'
  }
}
