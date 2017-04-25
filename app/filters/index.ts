'use strict'
import * as angular from 'angular'

import './preferred-language-filter'
import './citable-filter'

angular.module('fibra.filters', [
  'fibra.filters.pref-lang',
  'fibra.filters.citable'
])
