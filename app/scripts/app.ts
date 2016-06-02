namespace fibra {
  'use strict'
  let m: angular.IModule = angular.module('fibra', [ 'http-auth-interceptor', 'ui.router' ])
  m.config(($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) => {
    $urlRouterProvider.otherwise('/')
    $stateProvider.state('main', {
      url: '/',
      templateUrl: 'partials/main.html',
      controller: 'MainController'
      })
  })
}
