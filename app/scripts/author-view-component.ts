namespace fibra {
  'use strict'

  export class AuthorComponentController implements angular.IComponentController {
    public items: Item[] = []
    constructor(private sparqlItemService: SparqlItemService) {

    }
  }

  export class AuthorComponent implements angular.IComponentOptions {
      public controller: (new (...args: any[]) => angular.IController) = AuthorComponentController
      public templateUrl: string = 'partials/author.html'
  }
}
