'use strict'

import {WorkerWorkerService} from '../services/worker-service/worker-service'
import * as angular from 'angular'

let m: angular.IModule = angular.module('fibra', ['fi.seco.sparql', 'http-auth-interceptor'])

m.run(/* @ngInject */ ($rootScope: angular.IRootScopeService, workerWorkerService: WorkerWorkerService) => {
  $rootScope.$on('event:auth-loginRequired', () => workerWorkerService.$broadcast('event:auth-loginRequired'))
})

m.run(/* @ngInject */ ($rootScope: angular.IRootScopeService, authService: angular.httpAuth.IAuthService, $http: angular.IHttpService) => {
  $rootScope.$on('main:auth-loginAuthInfo', (event: angular.IAngularEvent, authorization: string) => {
    $http.defaults.headers!.common['Authorization'] = authorization
    authService.loginConfirmed()
  })
})
