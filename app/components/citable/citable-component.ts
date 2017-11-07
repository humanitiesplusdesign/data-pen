'use strict'

import * as angular from 'angular'

export class CitableComponentController {
  private parseDate(isoDate: string): Date {
    return new Date(isoDate)
  }
}

export class CitableComponent implements angular.IComponentOptions {
  public bindings: {[id: string]: string} = {
    citable: '<',
    noLink: '@'
  }
  public template: string = require('./citable.pug')()
  public controller: any = CitableComponentController
}

angular.module('fibra.components.citable', [])
  .component('citable', new CitableComponent())
