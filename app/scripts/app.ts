namespace fibra {
  'use strict'

  interface IAuthenticationRootScopeService extends angular.IRootScopeService {
    setAuth: () => void
    dismissAuth: () => void
    authInfo: {
      authOpen: boolean
      username: string
      password: string
    }
  }

  let m: angular.IModule = angular.module('fibra', [ 'http-auth-interceptor', 'ngStorage', 'ui.router', 'fi.seco.sparql' ])
  m.config(($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) => {
    $urlRouterProvider.otherwise('/')
    $stateProvider.state('main', {
      url: '/',
      templateUrl: 'partials/main.html',
      controller: 'MainController'
      })
  })
  m.config(($localStorageProvider) => {
    $localStorageProvider.setKeyPrefix('fibra-');
  })
  m.run(($rootScope: IAuthenticationRootScopeService, $localStorage: any, $http: angular.IHttpService, authService: angular.httpAuth.IAuthService) => {
    $rootScope.authInfo = {
      authOpen: false,
      username: undefined,
      password: undefined
    }
    if ($localStorage.authorization) $http.defaults.headers.common['Authorization'] = $localStorage.authorization
    $rootScope.setAuth = () => {
      $rootScope.authInfo.authOpen = false
      $localStorage.authorization = 'Basic ' + btoa($rootScope.authInfo.username + ':' + $rootScope.authInfo.password)
      $http.defaults.headers.common['Authorization'] = $localStorage.authorization
      authService.loginConfirmed()
    }
    $rootScope.dismissAuth = () => {
      $rootScope.authInfo.authOpen = false
      authService.loginCancelled({status: 401}, 'Authentication required')
    }
    $rootScope.$on('event:auth-loginRequired', () => $rootScope.authInfo.authOpen = true)
  })
}
