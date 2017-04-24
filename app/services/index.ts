'use strict'
import * as angular from 'angular'

import './social-auth-service'
import './worker-service/worker-service'
import './project-service/project-service'
import './fibra-service'
import './fibra-sparql-service'
import './sparql-item-service'
import './sparql-tree-service'

angular.module('fibra.services', [
  'fibra.services.social-auth-service',
  'fibra.services.worker-service',
  'fibra.services.project-service',
  'fibra.services.fibra-service',
  'fibra.services.fibra-sparql-service',
  'fibra.services.sparql-item-service',
  'fibra.services.sparql-tree-service'
])