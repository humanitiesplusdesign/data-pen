namespace fibra {
  'use strict'

  export class CallbackComponent implements angular.IComponentOptions {
      public controller: string = 'CallbackController' // (new (...args: any[]) => angular.IController) = SelectViewComponentController
      public template: string = ''
  }

  export class CallbackController implements angular.IComponentController {
    constructor(
      // $urlService: any,
      $localStorage: any,
      $sessionStorage: any,
      // $location: angular.ILocationService,
      $stateParams: any,
      $window: angular.IWindowService,
      // $state: angular.ui.IStateService,
      $scope: angular.IScope
      // $stateRegistry: any
      ) {
      // Uses https://github.com/prose/gatekeeper deployed on Coredatra LLC's Heroku account
      let search: {} = {
        code: $stateParams.code,
        state: $localStorage.redirectState ? $localStorage.redirectState : 'projects'
      }
      if (!search['code']) {
        window.location.search.replace('?', '').split('&').forEach((pair: string) => {
          let pa = pair.split('=')
          search[pa[0]] = pa[1]
        })
      }

      // If no requestTime, redirect to localhost
      if(!$localStorage.requestTime) {
        $window.location.href = 'http://localhost:3000/#/?' + $window.location.href.split('?')[1]
      } else {
        $.getJSON('https://fibra-auth-gateway.herokuapp.com/authenticate/' + search['code'], (result) => {
          $scope.$apply((s) => {
            $.get('https://api.github.com/user/emails?access_token=' + result.token, (user) => {
              $scope.$apply((s) => {
                // Check email is primary and verified
                let userObj = user.filter((ue) => { return ue.primary && ue.verified })[0]
                if(userObj && userObj.email) {
                  $localStorage.login_provider = 'Github'
                  $localStorage.user_email = userObj.email
                  $localStorage.access_token = result.token
                  $localStorage.requestTime = null

                  // Funny redirect to get rid of stray search parameters
                  $window.location.href = $window.location.origin + $window.location.pathname +
                    '#/' + search['state']
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
}
