'use strict'

import {EditCitableComponentController} from '../citable-editor/citable-editor-component'
import {RemoteEndpointConfiguration} from '../../services/project-service/remote-endpoint-configuration'
import {FibraService} from '../../services/fibra-service'
import {ProjectService} from '../../services/project-service/project-service'
import {DataFactory} from '../../models/rdf'
import * as angular from 'angular'

export class EditRemoteEndpointConfigurationViewComponentController extends EditCitableComponentController<RemoteEndpointConfiguration> {

  constructor($stateParams: any, fibraService: FibraService, projectService: ProjectService, toastr: angular.toastr.IToastrService) {
    super($stateParams.sourceId, projectService, toastr)
    if ($stateParams.id) projectService.loadRemoteEndpointConfiguration(this.projectSource, $stateParams.id).then(ps => this.c = ps)
    else {
      this.c = new RemoteEndpointConfiguration()
      this.c.labels = [ DataFactory.literal('', fibraService.getState().language)]
      this.c.descriptions = [ DataFactory.literal('', fibraService.getState().language)]
    }
  }
}

export class EditRemoteEndpointConfigurationViewComponent implements angular.IComponentOptions {
    public controller = EditRemoteEndpointConfigurationViewComponentController
    public template = require('./edit-remote-endpoint-configuration-view.pug')()
}

angular.module('fibra.components.edit-remote-endpoint-configuration', ['fibra.services'])
  .component('editRemoteEndpointConfigurationView', new EditRemoteEndpointConfigurationViewComponent())
