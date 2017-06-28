'use strict'

import {Project} from 'services/project-service/project'
import {PrimaryEndpointConfiguration} from 'services/project-service/primary-endpoint-configuration'
import {RemoteEndpointConfiguration} from 'services/project-service/remote-endpoint-configuration'
import {Schema} from 'services/project-service/schema'
import {Class, Property} from 'services/project-service/data-model'
import {CNode} from 'models/rdf'
import {NamedNode} from 'models/rdf'
import {Citable} from 'models/citable'
import {FMap} from 'components/collection-utils'
import {TreeNode} from 'components/tree/tree-component'
import {PropertyAndValue, Item, PropertyToValues} from 'services/sparql-item-service'
import {FullRichNodeFromNode} from 'models/richnode'
import * as angular from 'angular'

angular.module('fibra.services.worker-service-prototype-mapping-configuration', [])
  .config(($provide) => {
    $provide.service('workerServicePrototypeMappingConfiguration', function(): {[className: string]: {}} {
      let mappings: {[className: string]: any} = {
        'Project': Project,
        'CNode': CNode,
        'NamedNode': NamedNode,
        'Citable': Citable,
        'FMap': FMap,
        'Class': Class,
        'Property': Property,
        'TreeNode': TreeNode,
        'PrimaryEndpointConfiguration': PrimaryEndpointConfiguration,
        'RemoteEndpointConfiguration': RemoteEndpointConfiguration,
        'Schema': Schema,
        'PropertyAndValue': PropertyAndValue,
        'Item': Item,
        'PropertyToValues': PropertyToValues,
        'FullRichNodeFromNode': FullRichNodeFromNode
      }
      for (let className in mappings)
        mappings[className]['__name'] = className
      mappings['Object'] = Object // it's bad to have __name in Object.prototype, but it does need to be registered
      let prototypeMappings: {[className: string]: {}} = {}
      for (let className in mappings)
        prototypeMappings[className] = mappings[className].prototype
      return prototypeMappings
    })
  })
