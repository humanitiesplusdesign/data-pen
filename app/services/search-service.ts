'use strict'

import * as angular from 'angular'

export class SearchService {

  private $q: angular.IQService

  constructor(
    $q: angular.IQService
  ) {
    this.$q = $q
  }

  public searchSources(query: string): angular.IPromise<{}[]> {
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
