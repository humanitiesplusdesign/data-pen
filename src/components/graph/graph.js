angular.module('app')
.directive('graph', function () {
  return {
    restrict: 'A',
    link: function postLink(scope, element, attrs) {

      var graph = fibra.graph()
        , selection = d3.select(element[0]);

      function update(){
        if (!scope.data) return;

        graph
        .width(element.width())
        .height(500)
        .size(size)
        .key(key)
        .on('selected', selected)

        selection
        .datum(scope.data)
        .call(graph)

      }

      scope.$watch('data', update, true);

      scope.$watch('selection', function(selection){
        graph.select(function(d){ return d.name == 'Napoleon' });
      })

      function selected(d){
        scope.$apply(function(){
          console.log(d)
          scope.selected = d//.map(function(a){ return a.label; });
        })
      }

      function size(d){
        return d.group;
      }

      function key(d){
        return d.name;
      }

    }
  }

});
