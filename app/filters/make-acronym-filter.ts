'use strict'

import * as angular from 'angular'

export function generateAcronym(item: string): string {
  if (item.match(' ') != null) {
    return item.match(/\b([A-Z])/g).join('')
  } else {
    return item
  }
}

angular.module('fibra.filters.make-acronym', [])
  .filter('makeAcronym', /* @ngInject */ () => generateAcronym)
