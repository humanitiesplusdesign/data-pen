namespace fibra {
  'use strict'
  let m: angular.IModule = angular.module('fibra')

  m.service('workerServicePrototypeMappingConfiguration', function(): {} {
    return {
      'Object': Object.prototype,
      'Configuration': Configuration.prototype,
      'NamedNode': NamedNode.prototype,
      'SparqlBindingNode': SparqlBindingNode.prototype,
      'DataModelConfiguration': DataModelConfiguration.prototype,
      'Item': Item.prototype,
      'PropertyToValues': PropertyToValues.prototype,
      'NodePlusLabel': NodePlusLabel.prototype
    }
  })
}
