import * as angular from 'angular'

// Register modules
import {WorkerWorkerService} from './services/worker-service/worker-service'
import {ProjectWorkerService} from './services/project-service/project-service'
import {FibraSparqlService} from './services/fibra-sparql-service'
import './services/worker-service/prototype-mapping-configuration'

let m: angular.IModule = angular.module('fibra', ['fi.seco.sparql', 'http-auth-interceptor', 'fibra.services.worker-service-prototype-mapping-configuration'])

m.config(($provide) => {
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