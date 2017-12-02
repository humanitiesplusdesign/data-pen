'use strict'

import {EditCitableComponentController} from '../citable-editor/citable-editor-component'
import {ProjectService} from '../../services/project-service/project-service'
import {Schema} from '../../services/project-service/schema'
import {DataFactory} from '../../models/rdf'
import * as angular from 'angular'
import { IFibraNgRedux } from 'reducers';

export class EditSchemaViewComponentController extends EditCitableComponentController<Schema> {

  /* @ngInject */
  constructor($stateParams: any, ngRedux: IFibraNgRedux, projectService: ProjectService, toastr: angular.toastr.IToastrService) {
    super($stateParams.sourceId, projectService, toastr)
    if ($stateParams.id) projectService.loadSchema(this.projectSource, $stateParams.id).then(ps => this.c = ps)
    else {
      this.c = new Schema()
      this.c.labels = [ DataFactory.literal('', ngRedux.getState().general.language)]
      this.c.descriptions = [ DataFactory.literal('', ngRedux.getState().general.language)]
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
