angular.module('app')
  .controller('MainCtrl', function ($scope) {

    $scope.codemirrorLoaded = function(editor){
      // Editor part
      var doc = editor.getDoc();
      editor.focus();

      // Events
      editor.on("drop", function(i,e){

            });
    }

    $scope.$watch('text', function(text){
      
    })


  });
