'use strict'

import {Item, SparqlItemService} from '../../services/sparql-item-service'
import * as angular from 'angular'

export class AuthorViewComponentController implements angular.IComponentController {
  public items: Item[] = []
  constructor(private sparqlItemService: SparqlItemService) {

  }
}

export class AuthorViewComponent implements angular.IComponentOptions {
    public controller = AuthorViewComponentController // (new (...args: any[]) => angular.IController) = AuthorViewComponentController
    public template = require('./author-view.pug')()
}

angular.module('fibra.components.author-view', ['fibra.services'])
  .component('authorView', new AuthorViewComponent())
