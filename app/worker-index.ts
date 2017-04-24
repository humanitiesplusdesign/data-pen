import * as angular from 'angular'

// Register modules
import {WorkerWorkerService} from './services/worker-service/worker-service'
import {ProjectWorkerService} from './services/project-service/project-service'
import {FibraSparqlService} from './services/fibra-sparql-service'

let m: angular.IModule = angular.module('fibra', ['fi.seco.sparql', 'http-auth-interceptor'])

m.config(($provide) => {
  $provide.service('workerServicePrototypeMappingConfiguration', function(): {[className: string]: {}} {
    let mappings: {[className: string]: {}} = {
      'Object': Object.prototype
    }
    let fibra = {} // List out classes here
    for (let prop of Object.getOwnPropertyNames(fibra)) {  // Was 'fibra' object, but no longer exists.
      mappings[prop] = fibra[prop].prototype
      fibra[prop].__name = prop
    }
    return mappings
  })
  $provide.service('fibraSparqlService', FibraSparqlService)
  $provide.service('projectWorkerService', ProjectWorkerService)
  $provide.service('workerWorkerService', WorkerWorkerService)
})
m.run(($rootScope: angular.IRootScopeService, workerWorkerService: WorkerWorkerService) => {
  $rootScope.$on('event:auth-loginRequired', () => workerWorkerService.$broadcast('event:auth-loginRequired'))
})

m.run(($rootScope: angular.IRootScopeService, authService: angular.httpAuth.IAuthService, $http: angular.IHttpService) => {
  $rootScope.$on('main:auth-loginAuthInfo', (event: angular.IAngularEvent, authorization: string) => {
    $http.defaults.headers!.common['Authorization'] = authorization
    authService.loginConfirmed()
  })
})