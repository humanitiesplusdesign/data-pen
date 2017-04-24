'use strict'

import {Item, SparqlItemService} from '../../services/sparql-item-service'

export class AuthorViewComponentController implements angular.IComponentController {
  public items: Item[] = []
  constructor(private sparqlItemService: SparqlItemService) {

  }
}

export class AuthorViewComponent implements angular.IComponentOptions {
    public controller: string = 'AuthorViewComponentController' // (new (...args: any[]) => angular.IController) = AuthorViewComponentController
    public templateUrl: string = 'components/author-view/author-view.html'
}
