'use strict'

import {Project} from '../project-service/project'
import {Class, Property} from '../project-service/data-model'
import {Node} from '../../models/rdf'
import {Citable} from '../../models/citable'
import {Map} from '../../components/collection-utils'
import {TreeNode} from '../../components/tree/tree-component'
import {PropertyAndValue} from '../sparql-item-service'
import * as angular from 'angular'

angular.module('fibra.services.worker-service-prototype-mapping-configuration', [])
  .config(($provide) => {
    $provide.service('workerServicePrototypeMappingConfiguration', function(): {[className: string]: {}} {
      let mappings: {[className: string]: {}} = {
        'Object': Object.prototype,
      }
      let fibra: {[className: string]: any} = {
        'Project': Project,
        'Node': Node,
        'Citable': Citable,
        'Map': Map,
        'Class': Class,
        'Property': Property,
        'TreeNode': TreeNode,
        'PropertyAndValue': PropertyAndValue
      } // List out classes here
      for (let prop of Object.getOwnPropertyNames(fibra)) {
        mappings[prop] = fibra[prop].prototype
        fibra[prop].__name = prop
      }
      return mappings
    })
  })
