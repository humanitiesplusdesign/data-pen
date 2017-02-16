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
    socialAuthService: SocialAuthService
  }

  let m: angular.IModule = angular.module('fibra', [ 'http-auth-interceptor', 'ngStorage', 'ui.router', 'ui.bootstrap', 'ui.bootstrap.tpls', 'ngAnimate' ])
  m.config(($stateProvider: angular.ui.IStateProvider,
            $urlServiceProvider: any,
            $uiRouterProvider: any) => {
    $urlServiceProvider.rules.otherwise((match, url, router) => {
      // Manually parse the search because it is not visible to Angular.
      let search: {} = url.search
      window.location.search.replace('?', '').split('&').forEach((pair: string) => {
        let pa = pair.split('=')
        search[pa[0]] = pa[1]
      })
      if (search['code']) {
        $uiRouterProvider.stateService.go('callback', search)
      } else {
        $uiRouterProvider.stateService.go('projects')
      }
    })
    $stateProvider.state('projects', {
      url: '/projects',
      template: '<projects-view></projects-view>',
      data: { requiresAuth: true }
    })
    $stateProvider.state('configure', {
      url: '/configure',
      template: '<configure-view></configure-view>',
      data: { requiresAuth: true }
    })
    $stateProvider.state('select', {
      url: '/select',
      template: '<select-view></select-view>',
      data: { requiresAuth: true }
    })
    $stateProvider.state('construct', {
      url: '/construct',
      template: '<construct-view></construct-view>',
      data: { requiresAuth: true }
    })
    $stateProvider.state('author', {
      url: '/author',
      template: '<author-view></author-view>',
      data: { requiresAuth: true }
    })
    $stateProvider.state('login', {
      url: '/login',
      template: '<login></login>',
      params: {
        redirect_hash: {
          type: 'string',
          value: ''
        }
      }
    })
    $stateProvider.state('callback', {
      url: '/callback',
      template: '<callback></callback>',
      params: {
        code: {
          type: 'string',
          array: false,
          value: ''
        }
      }
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
  m.run(( $rootScope: IAuthenticationRootScopeService,
          $localStorage: any,
          $http: angular.IHttpService,
          $state: angular.ui.IStateService,
          authService: angular.httpAuth.IAuthService,
          $location: angular.ILocationService,
          workerService: WorkerService,
          socialAuthService: SocialAuthService,
          $window: angular.IWindowService,
          $transitions: any) => {
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

    // Social logon
    let requiresAuthCriteria = {
      to: (state) => state.data && state.data.requiresAuth
    };

    // Function that returns a redirect for the current transition to the login state
    // if the user is not currently authenticated (according to the AuthService)

    let redirectToLogin = (transition) => {
      if (!socialAuthService.isAuthenticated()) {
        // Save state token on local storage.
        return transition.router.stateService.target('login', { redirect_hash: window.location.hash })
      }
    };

    $rootScope.socialAuthService = socialAuthService

    // Register the "requires auth" hook with the TransitionsService
    // Turn this off for the moment - go to #/login to login.
    $transitions.onBefore(requiresAuthCriteria, redirectToLogin, {priority: 10});
  })
}
