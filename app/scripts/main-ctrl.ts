namespace app {
  'use strict'

  interface IMainScope extends angular.IScope {
  }

  export class MainController {
    constructor(private $scope: IMainScope) {
    }
  }
}
