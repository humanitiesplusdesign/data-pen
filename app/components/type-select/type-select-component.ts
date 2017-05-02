'use strict'

import * as angular from 'angular'

export class TypeSelectComponent implements angular.IComponentOptions {
    public bindings: {[id: string]: string} = {
      tree: '<',
      onSelect: '&',
    }
    public template = require('./type-select.pug')
}

angular.module('fibra.components.type-select', [])
  .component('typeSelect', new TypeSelectComponent())