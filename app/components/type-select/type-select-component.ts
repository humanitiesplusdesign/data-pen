namespace fibra {
  'use strict'

  export class TypeSelectComponent implements angular.IComponentOptions {
      public bindings: {[id: string]: string} = {
        tree: '<',
        onSelect: '&',
      }
      public templateUrl: string = 'components/type-select/type-select.html'
  }
}
