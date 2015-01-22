angular.module('app')
  .controller('MainCtrl', function ($scope, $http) {

    // loading sample data
    $http.get('../data/graph.json').
    success(function(data, status) {
      data.nodes.forEach(function(d,i){
        d.group = i > 30 ? 1 : 2;
      })
      $scope.data = data;
    }).
    error(function(error, status) {
      console.log('error:', error)
    });

    //$scope.selected = []

    // methods

    $scope.addNode = function(){
      $scope.data.nodes.push(
        {"name":"Antani","group":10}
      )
    }

    $scope.removeNode = function(node){
      if (!arguments.length) $scope.data.nodes.pop();
      else $scope.data.nodes.splice(node,1);
    }

  });
