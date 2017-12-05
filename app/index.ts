import { SparqlService } from 'angular-sparql-service/dist/sparql-service';
import * as angular from 'angular';

import 'angular-http-auth';
import 'angular-ui-router';
import 'angular-animate';
import 'angular-ui-bootstrap';
import 'angular-toastr';
import 'angular-file-saver';

import 'styles/main.styl';
// Register modules
import 'actions';
import 'services';
import 'components';
import 'filters';

import 'ng-redux';
import 'angular-yasqe-component';
import 'ngstorage';
import 'angular-ui-codemirror';
import { INgReduxProvider } from 'ng-redux';
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import rootReducer from 'reducers'

import {SocialAuthService} from 'services/social-auth-service'
import {ProjectService} from 'services/project-service/project-service'
import {WorkerService} from 'services/worker-service/worker-service'
import { IHttpRequestTransformer } from 'angular'
import { RemoteEndpointConfiguration } from 'services/project-service/remote-endpoint-configuration'
import { ONodeSet, XMLSchema, VOID } from 'models/rdf'
import { IClass } from 'services/project-service/data-model'

let m: angular.IModule = angular.module('fibra', [
  'fibra.services',
  'fibra.actions',
  'fibra.components',
  'fibra.filters',
  'http-auth-interceptor',
  'ngStorage',
  'ui.router',
  'ui.bootstrap',
  'ui.bootstrap.tpls',
  'ngAnimate',
  'fi.seco.yasqe',
  'toastr',
  'fi.seco.sparql',
  'ui.codemirror',
  'ngFileSaver',
  'ngRedux'
  ])
  .constant('version', '0.5.0')

m.value('workerServiceConfiguration', {
  appName: 'fibra',
  workerThreads: 1,
  importScripts: [
    'https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js',
    'common-bundle.js',
    'worker-bundle.js'
  ]
})

/* @ngInject */
m.config(($ngReduxProvider: INgReduxProvider) => {
    $ngReduxProvider.createStoreWith(rootReducer, [thunkMiddleware, promiseMiddleware, createLogger()], [])
  })

interface IAuthenticationRootScopeService extends angular.IRootScopeService {
  setAuth: () => void
  dismissAuth: () => void
  authInfo: {
    url: string | undefined
    authOpen: boolean
    username: string | undefined
    password: string | undefined
  }
  socialAuthService: SocialAuthService
}

/* @ngInject */
m.config((toastrConfig: angular.toastr.IToastConfig) => angular.extend(toastrConfig, { positionClass: 'toast-top-full-width'}))

/* @ngInject */
m.config(($localStorageProvider) => $localStorageProvider.setKeyPrefix('fibra-'))

let auths: {[url: string]: string} = {}

/* @ngInject */
m.config(($httpProvider: angular.IHttpProvider) => {
  $httpProvider.interceptors.push(() => {
    return {
      request: (request) => {
        if (auths[request.url]) request.headers['Authorization'] = auths[request.url]
        return request
      }
    }
  })
})

/* @ngInject */
m.config((
  $stateProvider: angular.ui.IStateProvider,
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
    $stateProvider.state('project', {
      url: '/project/:view?id&sparqlEndpoint&graph',
      params: {
        id: {
          type: 'string',
          array: false,
          value: ''
        },
        sparqlEndpoint: {
          type: 'string',
          array: false,
          value: ''
        },
        graph: {
          type: 'string',
          array: false,
          value: ''
        },
        view: {
          type: 'string',
          array: false,
          value: 'sources'
        }
      },
      template: '<project></project>'
    })
  })

  /* @ngInject */
m.run((
  $rootScope: IAuthenticationRootScopeService,
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
      url: undefined,
      username: undefined,
      password: undefined
    };
    if (!$localStorage.authorization) $localStorage.authorization = {}
    else {
      workerService.$broadcast('main:auth-loginAuthInfo', $localStorage.authorization)
    }
    auths = $localStorage.authorization
    $rootScope.setAuth = () => {
      $rootScope.authInfo.authOpen = false
      auths[$rootScope.authInfo.url] = 'Basic ' + btoa($rootScope.authInfo.username + ':' + $rootScope.authInfo.password)
      workerService.$broadcast('main:auth-loginAuthInfo', [auths])
      authService.loginConfirmed()
    }
    $rootScope.dismissAuth = () => {
      $rootScope.authInfo.authOpen = false
      authService.loginCancelled({status: 401}, 'Authentication required')
    }
    $rootScope.$on('event:auth-loginRequired', (event, rejected) => {
      $rootScope.authInfo.url = rejected.config.url
      $rootScope.authInfo.authOpen = true
    })

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
    // $transitions.onSuccess({}, transition => $rootScope.viewName = transition._targetState.name())
  })
