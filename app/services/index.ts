'use strict'
import * as angular from 'angular'

import 'services/social-auth-service'
import 'services/worker-service/worker-service'
import 'services/project-service/project-service'
import 'services/fibra-service'
import 'services/fibra-sparql-service'
import 'services/sparql-item-service'
import 'services/sparql-tree-service'
import 'services/sparql-autocomplete-service'

angular.module('fibra.services', [
  'fibra.services.social-auth-service',
  'fibra.services.worker-service',
  'fibra.services.project-service',
  'fibra.services.fibra-service',
  'fibra.services.fibra-sparql-service',
  'fibra.services.sparql-item-service',
  'fibra.services.sparql-tree-service',
  'fibra.services.sparql-autocomplete-service'
])
