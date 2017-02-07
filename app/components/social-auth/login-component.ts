namespace fibra {
  'use strict'

  export class LoginComponent implements angular.IComponentOptions {
    public controller: string = 'LoginController' // (new (...args: any[]) => angular.IController) = SelectViewComponentController
    public template: string = '<button ng-click="login()">Login with Github</button>'
  }

  export class LoginController implements angular.IComponentController {
    constructor(
      $urlService: any,
      $scope: any,
      $localStorage: any,
      $window: angular.IWindowService,
      $stateParams: any
    ) {
      $scope.login = () => {
        $localStorage.redirectState = $stateParams.redirect_hash.replace('#/', '')
        $localStorage.requestTime = Date.now()
        $window.location.href = 'https://github.com/login/oauth/authorize?' +
          'client_id=6a9ff845a1c35f43a0f2' +
          '&scope=user:email'
      }
    }
  }
}
