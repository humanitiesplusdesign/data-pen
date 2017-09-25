'use strict'

import * as angular from 'angular'
import { INgRedux } from 'ng-redux'

export class SearchService {

  private $q: angular.IQService
  private $ngRedux: INgRedux

  constructor(
    $q: angular.IQService,
    $ngRedux: INgRedux
  ) {
    this.$q = $q
    this.$ngRedux = $ngRedux
  }

  public searchSources(query: string): angular.IPromise<{}[]> {
    console.log(this.$ngRedux.getState())

    return this.$q.resolve([
      { description: 'Testing testing' },
      { description: 'Blah blah blah' },
      { description: '1234 1234' }
    ])
  }
}


angular.module('fibra.services.search-service', [])
  .config(($provide) => {
    $provide.service('searchService', SearchService)
  })
