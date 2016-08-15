namespace fibra {
  'use strict'

  export class TypeSelectComponent implements angular.IComponentOptions {
      public bindings: {[id: string]: string} = {
        tree: '<',
        onSelect: '&',
      }
      public templateUrl: string = 'partials/type-select.html'
  }
}
