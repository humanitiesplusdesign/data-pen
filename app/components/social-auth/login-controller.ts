namespace fibra {
  'use strict'

  export class LoginController implements angular.IController {
    constructor($urlService: any, $scope: any, $window: angular.IWindowService, $stateParams: any) {
      $scope.login = () => {
        $window.location.href = 'https://github.com/login/oauth/authorize?' +
          'client_id=6a9ff845a1c35f43a0f2' +
          '&scope=user:email' +
          '&state=' + $stateParams.redirect_hash.replace('#/', '')
      }
    }
  }
}
