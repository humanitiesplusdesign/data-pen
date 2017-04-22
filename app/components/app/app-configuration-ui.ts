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

  let m: angular.IModule = angular.module('fibra', [ 'http-auth-interceptor', 'ngStorage', 'ui.router', 'ui.bootstrap', 'ui.bootstrap.tpls', 'ngAnimate', 'fi.seco.yasqe', 'fi.seco.yasr', 'toastr', 'fi.seco.sparql', 'ui.codemirror', 'ngFileSaver' ])
  m.config((toastrConfig: angular.toastr.IToastConfig) =>
    angular.extend(toastrConfig, { positionClass: 'toast-top-full-width'}))
  m.config(($stateProvider: angular.ui.IStateProvider,
            $urlServiceProvider: any,
            $locationProvider: angular.ILocationProvider,
            $uiRouterProvider: any) => {
    $urlServiceProvider.rules.otherwise((match, url, router) => {
      // Manually parse the search because it is not visible to Angular.
      let search: {} = url.search
      window.location.search.replace('?', '').split('&').forEach((pair: string) => {
        let pa: string[] = pair.split('=')
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
      template: '<projects-view></projects-view>'
    })
    $stateProvider.state('rdfstoreTest', {
      url: '/rdfstore-test',
      template: '<rdfstore-test-view></rdfstore-test-view>'
    })
    $stateProvider.state('projectSources', {
      url: '/project-sources?sourceId&sparqlEndpoint&updateEndpoint&graphStoreEndpoint&graph&type',
      template: '<project-sources-view></project-sources-view>',
    })
    $stateProvider.state('projectSourceConfigurations', {
      url: '/project-source-configurations?sourceId',
      template: '<project-source-configurations-view></project-source-configurations-view>',
    })
    $stateProvider.state('editPrimaryEndpointConfiguration', {
      url: '/edit-primary-endpoint-configuration?sourceId&id',
      template: '<edit-primary-endpoint-configuration-view></edit-primary-endpoint-configuration-view>',
    })
    $stateProvider.state('editRemoteEndpointConfiguration', {
      url: '/edit-remote-endpoint-configuration?sourceId&id',
      template: '<edit-remote-endpoint-configuration-view></edit-remote-endpoint-configuration-view>',
    })
    $stateProvider.state('editSchema', {
      url: '/edit-schema?sourceId&id',
      template: '<edit-schema-view></edit-schema-view>',
    })
    $stateProvider.state('configure', {
      url: '/configure?sourceId&id',
      template: '<configure-view></configure-view>'
    })
    $stateProvider.state('construct', {
      url: '/construct?id&sparqlEndpoint&graph',
      resolve: { project: (projectService: ProjectService, fibraService: FibraService, $stateParams: any) =>
        projectService.loadProject({ sparqlEndpoint: $stateParams.sparqlEndpoint, graph: $stateParams.graph }, $stateParams.id, true).then(
          project => fibraService.dispatchAction(fibraService.setProject(project))
        )
      },
      template: '<construct-view></construct-view>'
    })
    $stateProvider.state('author', {
      url: '/author?id&sparqlEndpoint&graph',
      resolve: { project: (projectService: ProjectService, fibraService: FibraService, $stateParams: any) =>
        projectService.loadProject({ sparqlEndpoint: $stateParams.sparqlEndpoint, graph: $stateParams.graph }, $stateParams.id, true).then(
          project => fibraService.dispatchAction(fibraService.setProject(project))
        )
      },
      template: '<author-view></author-view>'
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
  m.config($localStorageProvider => $localStorageProvider.setKeyPrefix('fibra-'))
  m.value('workerServiceConfiguration', {
    appName: 'fibra',
    workerThreads: 8,
    importScripts: [
      'bower_components/angular/angular.js',
      'bower_components/angular-http-auth/src/http-auth-interceptor.js',
      'bower_components/angular-sparql-service/dist/sparql-service.js',
      'bower_components/rdfstore/dist/rdfstore.js',
      'components/app/_datamodel/citable.js',
      'components/app/_datamodel/rdf.js',
      'components/app/_datamodel/richnode.js',
      'components/app/app-configuration-worker.js',
      'components/app/app-configuration-common.js',
      'components/app/fibra-service.js',
      'components/project-service/project.js',
      'components/project-service/schema.js',
      'components/project-service/primary-endpoint-configuration.js',
      'components/project-service/remote-endpoint-configuration.js',
      'components/project-service/data-model.js',
      'components/project-service/project-service.js',
      'components/collection-utils.js',
      'components/sparql-item/sparql-item-service.js',
      'components/worker-service/worker-service.js',
      'components/app/fibra-sparql-service.js',
      'components/sparql-autocomplete/sparql-autocomplete-service.js',
      'components/sparql-tree-service.js',
      'components/sparql-update-service.js',
      'components/tree/tree-component.js',
      'components/misc-utils.js'
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
    let requiresAuthCriteria: {} = {
      to: (state) => state.data && state.data.requiresAuth
    };

    // Function that returns a redirect for the current transition to the login state
    // if the user is not currently authenticated (according to the AuthService)

    let redirectToLogin: (any) => boolean = (transition) => {
      if (!socialAuthService.isAuthenticated()) {
        // Save state token on local storage.
        return transition.router.stateService.target('login', { redirect_hash: window.location.hash })
      }
    };

    $rootScope.socialAuthService = socialAuthService

    // Register the "requires auth" hook with the TransitionsService
    // Turn this off for the moment - go to #/login to login.
    $transitions.onBefore(requiresAuthCriteria, redirectToLogin, {priority: 10});

    // add info on which view we're in to the page title (currently just the raw view name)
    $transitions.onSuccess({}, transition => $rootScope.viewName = transition._targetState.name())
  })
}
