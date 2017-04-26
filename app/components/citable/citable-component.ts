'use strict'

import * as angular from 'angular'

export class CitableComponent implements angular.IComponentOptions {
  public bindings: {[id: string]: string} = {
    citable: '<',
    noLink: '@'
  }
  public template: string = require('./citable.pug')()
}

angular.module('fibra.components.citable', [])
  .component('citable', new CitableComponent())
