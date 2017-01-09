namespace fibra {
  'use strict'

  interface IAuthenticationRootScopeService extends angular.IRootScopeService {
    setAuth: () => void
    dismissAuth: () => void
    authInfo: {
      authOpen: boolean
      username: string | undefined
      password: string | undefined
    }
  }

  let m: angular.IModule = angular.module('fibra', [ 'http-auth-interceptor', 'ngStorage', 'ui.router',  'ui.bootstrap', 'ui.bootstrap.tpls' ])
  m.config(($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) => {
    $urlRouterProvider.otherwise('/landing')
    $stateProvider.state('landing', {
      url: '/landing',
      templateUrl: 'components/app/landing.html'
    })
    $stateProvider.state('configure', {
      url: '/configure',
      template: '<configure-view></configure-view>'
    })
    $stateProvider.state('select', {
      url: '/select',
      template: '<select-view></select-view>'
    })
    $stateProvider.state('construct', {
      url: '/construct',
      template: '<construct-view></construct-view>'
    })
    $stateProvider.state('author', {
      url: '/author',
      template: '<author-view></author-view>'
    })
  })
  m.config(($localStorageProvider) => {
    $localStorageProvider.setKeyPrefix('fibra-');
  })
  m.value('workerServiceConfiguration', {
    appName: 'fibra',
    workerThreads: 8,
    importScripts: [
      'bower_components/angular/angular.min.js',
      'bower_components/angular-http-auth/src/http-auth-interceptor.js',
      'bower_components/angular-sparql-service/dist/sparql-service.js',
      'components/app/app-configuration-worker.js',
      'components/app/app-configuration-common.js',
      'components/worker-service/worker-service.js',
      'components/app/configuration-service.js',
      'components/collection-utils.js',
      'components/rdf/rdf.js',
      'components/sparql-item/sparql-item-service.js',
      'components/sparql-autocomplete/sparql-autocomplete-service.js',
      'components/sparql-tree-service.js',
      'components/sparql-update-service.js',
      'components/tree/tree-component.js'
      ]
  })
  m.run(($rootScope: IAuthenticationRootScopeService, $localStorage: any, $http: angular.IHttpService, authService: angular.httpAuth.IAuthService, workerService: WorkerService) => {
    $rootScope.authInfo = {
      authOpen: false,
      username: undefined,
      password: undefined
    }
    if ($localStorage.authorization) {
      $http.defaults.headers!.common['Authorization'] = $localStorage.authorization
      workerService.$broadcast('main:auth-loginAuthInfo', $localStorage.authorization)
    }
    $rootScope.setAuth = () => {
      $rootScope.authInfo.authOpen = false
      $localStorage.authorization = 'Basic ' + btoa($rootScope.authInfo.username + ':' + $rootScope.authInfo.password)
      $http.defaults.headers!.common['Authorization'] = $localStorage.authorization
      workerService.$broadcast('main:auth-loginAuthInfo', $localStorage.authorization)
      authService.loginConfirmed()
    }
    $rootScope.dismissAuth = () => {
      $rootScope.authInfo.authOpen = false
      authService.loginCancelled({status: 401}, 'Authentication required')
    }
    $rootScope.$on('event:auth-loginRequired', () => $rootScope.authInfo.authOpen = true)
  })
}
