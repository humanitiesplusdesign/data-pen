'use strict';

angular.module('app', [
  'ngRoute',
  'ui.codemirror'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'main/main.html',
    controller: 'MainCtrl'
  })
  .otherwise({redirectTo: '/'});
}])
