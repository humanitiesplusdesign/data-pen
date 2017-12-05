import * as angular from 'angular'

// Register modules
import {WorkerWorkerService, StateWorkerService} from 'services/worker-service/worker-worker-service'
import {ProjectWorkerService} from 'services/project-service/project-worker-service'
import {FibraSparqlService} from 'services/fibra-sparql-service'
import {SparqlItemWorkerService} from 'services/sparql-item-service'
import {SparqlUpdateWorkerService} from 'services/sparql-update-service'
import {SparqlAutocompleteWorkerService} from 'services/sparql-autocomplete-service'
import 'services/sparql-statistics-service'
import 'services/worker-service/serialization-service'

import 'angular-http-auth'
import 'rdfstore'
import { IHttpRequestTransformer } from 'angular';

let m: angular.IModule = angular.module('fibra', ['fi.seco.sparql', 'http-auth-interceptor', 'fibra.services.serialization-service', 'fibra.services.sparql-statistics-service'])

m.config(($provide) => {
  $provide.service('fibraSparqlService', FibraSparqlService)
  $provide.service('projectWorkerService', ProjectWorkerService)
  $provide.service('stateWorkerService', StateWorkerService)
  $provide.service('workerWorkerService', WorkerWorkerService)
  $provide.service('sparqlItemWorkerService', SparqlItemWorkerService)
  $provide.service('sparqlUpdateWorkerService', SparqlUpdateWorkerService)
  $provide.service('sparqlAutocompleteWorkerService', SparqlAutocompleteWorkerService)
})

// if we get a loginRequired event, broadcast it to the UI thread
m.run(($rootScope: angular.IRootScopeService, workerWorkerService: WorkerWorkerService) => {
  $rootScope.$on('event:auth-loginRequired', (rejection) => workerWorkerService.$broadcast('event:auth-loginRequired', rejection))
})

let auths: {[url: string]: string} = {}

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

m.run(($rootScope: angular.IRootScopeService, authService: angular.httpAuth.IAuthService, $http: angular.IHttpService) => {
  $rootScope.$on('main:auth-loginAuthInfo', (event: angular.IAngularEvent, authorizations: {[url: string]: string}) => {
    auths = authorizations
    authService.loginConfirmed()
  })
})
