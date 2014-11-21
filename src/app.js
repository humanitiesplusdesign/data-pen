'use strict';
console.log('daicazzo')
angular.module('rawApp', [
  'ngRoute',
  'rawApp.main',
//  'rawApp.view2',
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'main/main.html',
    controller: 'MainCtrl'
  })
  .otherwise({redirectTo: '/'});
}])
