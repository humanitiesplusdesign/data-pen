'use strict'
import * as angular from 'angular'

import 'filters/preferred-language-filter'
import 'filters/citable-filter'
import 'filters/make-acronym-filter'

angular.module('fibra.filters', [
  'fibra.filters.pref-lang',
  'fibra.filters.citable',
  'fibra.filters.make-acronym'
])
