namespace fibra {
  'use strict'

  export class CitableComponent implements angular.IComponentOptions {
    public bindings: {[id: string]: string} = {
      citable: '<',
      noLink: '@'
    }
    public templateUrl: string = 'components/citable/citable.html'
  }
}
