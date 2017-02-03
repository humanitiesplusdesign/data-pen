namespace fibra {
  'use strict'

  export class CallbackController {
    constructor(
      $urlService: any,
      $localStorage: any,
      $sessionStorage: any,
      $location: angular.ILocationService,
      $stateParams: any,
      $window: angular.IWindowService,
      $state: angular.ui.IStateService,
      $scope: angular.IScope,
      $stateRegistry: any,
      $http: angular.IHttpService) {

      console.log($stateParams)
      // Uses https://github.com/prose/gatekeeper deployed on Coredatra LLC's Heroku account
      $.getJSON('https://fibra-auth-gateway.herokuapp.com/authenticate/' + $stateParams.code, (result) => {
        $scope.$apply((s) => {
          $.get('https://api.github.com/user/emails?access_token=' + result.token, (user) => {
            $scope.$apply((s) => {
              // Check email is primary and verified
              let userObj = user.filter((ue) => { return ue.primary && ue.verified })[0]
              if(userObj && userObj.email) {
                $localStorage.login_provider = 'Github'
                $sessionStorage.user_email = userObj.email
                $sessionStorage.access_token = result.token
                // Funny redirect to get rid of stray search parameters
                $window.location.href = $window.location.href.split('?')[0] +
                  '#/' + $stateParams.state
              } else {
                alert('Authentication failed')
              }
            })
          })
        })
      })
    }
  }
}
