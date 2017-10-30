'use strict'
import * as angular from 'angular'

import 'filters/preferred-language-filter'
import 'filters/citable-filter'

angular.module('fibra.filters', [
  'fibra.filters.pref-lang',
  'fibra.filters.citable'
])
