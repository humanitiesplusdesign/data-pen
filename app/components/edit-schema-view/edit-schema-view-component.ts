'use strict'

import {EditCitableComponentController} from '../citable-editor/citable-editor-component'
import {FibraService} from '../../services/fibra-service'
import {ProjectService} from '../../services/project-service/project-service'
import {Schema} from '../../services/project-service/schema'
import {DataFactory} from '../../models/rdf'
import * as angular from 'angular'

export class EditSchemaViewComponentController extends EditCitableComponentController<Schema> {

  constructor($stateParams: any, fibraService: FibraService, projectService: ProjectService, toastr: angular.toastr.IToastrService) {
    super($stateParams.sourceId, projectService, toastr)
    if ($stateParams.id) projectService.loadSchema(this.projectSource, $stateParams.id).then(ps => this.c = ps)
    else {
      this.c = new Schema()
      this.c.labels = [ DataFactory.literal('', fibraService.getState().language)]
      this.c.descriptions = [ DataFactory.literal('', fibraService.getState().language)]
      this.c.endpoint = this.projectSource.sparqlEndpoint
    }
  }
}

export class EditSchemaViewComponent implements angular.IComponentOptions {
    public controller = EditSchemaViewComponentController
    public template = require('./edit-schema-view.pug')
}

angular.module('fibra.components.edit-schema-view', ['fibra.services'])
  .component('editSchemaView', new EditSchemaViewComponent())

