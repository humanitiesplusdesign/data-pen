'use strict'
import * as angular from 'angular'

import './projects-view/projects-view-component'
import './citable/citable-component'
import './social-auth/callback-component'
import './social-auth/login-component'
import './construct-view/construct-view-component'
import './construct-view/explore-component'
import './construct-view/property-popover'
import './construct-view/palette-component/palette-component'
import './construct-view/explore-verify-component/explore-verify-component'
import './construct-view/explore-table-component/explore-table-component'
import './construct-view/explore-type-component/explore-type-component'

angular.module('fibra.components', [
  'fibra.components.construct-view',
  'fibra.components.explore',
  'fibra.components.property-popover',
  'fibra.components.palette',
  'fibra.components.verify',
  'fibra.components.explore-table',
  'fibra.components.explore-type',
  'fibra.components.projects-view',
  'fibra.components.citable',
  'fibra.components.callback',
  'fibra.components.login'
])
