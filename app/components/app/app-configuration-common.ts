namespace fibra {
  'use strict'
  let m: angular.IModule = angular.module('fibra')

  m.service('workerServicePrototypeMappingConfiguration', function(): {[className: string]: {}} {
    let mappings: {[className: string]: {}} = {
      'Object': Object.prototype
    }
    for (let prop of Object.getOwnPropertyNames(fibra)) {
      mappings[prop] = fibra[prop].prototype
      fibra[prop].__name = prop
    }
    return mappings
  })
}
