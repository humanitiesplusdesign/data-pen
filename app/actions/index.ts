'use strict'
import * as angular from 'angular'

import 'actions/project'
import 'actions/filter'

angular.module('fibra.actions', [
  'fibra.actions.project',
  'fibra.actions.filter'
])
