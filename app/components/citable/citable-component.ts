'use strict'

import * as angular from 'angular'

export class CitableComponent implements angular.IComponentOptions {
  public bindings: {[id: string]: string} = {
    citable: '<',
    noLink: '@'
  }
  public templateUrl: string = 'components/citable/citable.html'
}

angular.module('fibra.components.citable', [])
  .component('citable', new CitableComponent())