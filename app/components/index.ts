'use strict'
import * as angular from 'angular'

import './projects-view/projects-view-component'
import './citable/citable-component'
import './social-auth/callback-component'
import './social-auth/login-component'
import './configure-view/configure-view-component'
import './citable-editor/citable-editor-component'
import './edit-primary-endpoint-configuration-view/edit-primary-endpoint-configuration-view-component'
import './edit-remote-endpoint-configuration-view/edit-remote-endpoint-configuration-view-component'
import './edit-schema-view/edit-schema-view-component'
import './project-source-configurations-view/project-source-configurations-view-component'
import './project-sources-view/project-sources-view-component'
import './type-select/type-select-component'
import './project/project-component'
import './sources/sources-component'
import './active/active-component'
import './filter/filter-component'
import './add-source/add-source-component'
import './expand-modal/expand-modal-component'
import './project-delete-modal/project-delete-modal-component'
import './bibliography-modal/bibliography-modal-component'
import './snapshot-warning-modal/snapshot-warning-modal-component'

angular.module('fibra.components', [
  'fibra.components.projects-view',
  'fibra.components.citable',
  'fibra.components.callback',
  'fibra.components.login',
  'fibra.components.configure',
  'fibra.components.citable-editor',
  'fibra.components.edit-primary-endpoint-configuration',
  'fibra.components.edit-remote-endpoint-configuration',
  'fibra.components.edit-schema-view',
  'fibra.components.project-source-configurations-view',
  'fibra.components.project-sources-view',
  'fibra.components.type-select',
  'fibra.components.project',
  'fibra.components.sources',
  'fibra.components.active',
  'fibra.components.filter',
  'fibra.components.add-source',
  'fibra.components.expand-modal',
  'fibra.components.project-delete-modal',
  'fibra.components.bibliography-modal',
  'fibra.components.snapshot-warning-modal'
])
