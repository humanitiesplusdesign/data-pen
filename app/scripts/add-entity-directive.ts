namespace fibra {
  'use strict'

//   import s = fi.seco.sparql
  interface IAddEntityScope extends angular.IScope {
  }

  export class AddEntityDirective implements angular.IDirective {
    public scope: {[id: string]: string} = {
    }
    public templateUrl: string = 'partials/add-entity.html'
    constructor(private $q: angular.IQService) {
    }
    public link: (...any) => void = ($scope: IAddEntityScope, element: JQuery, attr: angular.IAttributes) => {
      
    }
  }
}