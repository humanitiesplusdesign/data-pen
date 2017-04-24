'use strict'

angular.module('fibra').service('workerServicePrototypeMappingConfiguration', function(): {[className: string]: {}} {
  let mappings: {[className: string]: {}} = {
    'Object': Object.prototype
  }
  for (let prop of Object.getOwnPropertyNames(fibra)) {
    mappings[prop] = fibra[prop].prototype
    fibra[prop].__name = prop
  }
  return mappings
})
