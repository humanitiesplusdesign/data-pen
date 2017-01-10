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
    $urlRouterProvider.otherwise('/projects')
    $stateProvider.state('projects', {
      url: '/projects',
      template: '<projects-view></projects-view>'
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
      'scripts/app-configuration-worker.js',
      'scripts/app-configuration-common.js',
      'scripts/worker-service.js',
      'scripts/configuration-service.js',
      'scripts/collection-utils.js',
      'scripts/rdf.js',
      'scripts/sparql-item-service.js',
      'scripts/sparql-autocomplete-service.js',
      'scripts/sparql-tree-service.js',
      'scripts/sparql-update-service.js',
      'scripts/tree-component.js'
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
