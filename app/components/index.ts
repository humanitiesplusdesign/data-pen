'use strict'
import * as angular from 'angular'

import './projects-view/projects-view-component'
import './citable/citable-component'
import './social-auth/callback-component'
import './social-auth/login-component'

angular.module('fibra.components', [
  'fibra.components.projects-view',
  'fibra.components.citable',
  'fibra.components.callback',
  'fibra.components.login'
])