'use strict'
import * as angular from 'angular'

import 'actions/project'
import 'actions/filter'
import 'actions/active'
import 'actions/sources'

angular.module('fibra.actions', [
  'fibra.actions.project',
  'fibra.actions.filter',
  'fibra.actions.active',
  'fibra.actions.sources'
])
