'use strict'

import {EditCitableComponentController} from '../citable-editor/citable-editor-component'
import {RemoteEndpointConfiguration} from '../../services/project-service/remote-endpoint-configuration'
import {ProjectService} from '../../services/project-service/project-service'
import {DataFactory} from '../../models/rdf'
import * as angular from 'angular'
import { IFibraNgRedux } from 'reducers';
import { Class } from 'services/project-service/data-model';

export class EditRemoteEndpointConfigurationViewComponentController extends EditCitableComponentController<RemoteEndpointConfiguration> {

  public addType(): void {
    this.c.types.add(new Class(DataFactory.namedNode('')))
  }
  public removeType(index: number): void {
    this.c.types.removei(index)
  }

  /* @ngInject */
  constructor($stateParams: any, $ngRedux: IFibraNgRedux, projectService: ProjectService, toastr: angular.toastr.IToastrService) {
    super($stateParams.sourceId, projectService, toastr)
    if ($stateParams.id) projectService.loadRemoteEndpointConfiguration(this.projectSource, $stateParams.id).then(ps => this.c = ps)
    else {
      this.c = new RemoteEndpointConfiguration()
      this.c.labels.add(DataFactory.literal('', $ngRedux.getState().general.language))
      this.c.descriptions.add(DataFactory.literal('', $ngRedux.getState().general.language))
      this.c.types.add(new Class(DataFactory.namedNode('')))
    }
  }
}

export class EditRemoteEndpointConfigurationViewComponent implements angular.IComponentOptions {
    public controller: (new (...args: any[]) => angular.IController) = EditRemoteEndpointConfigurationViewComponentController
    public template: string = require('./edit-remote-endpoint-configuration-view.pug')()
}

angular.module('fibra.components.edit-remote-endpoint-configuration', ['fibra.services'])
  .component('editRemoteEndpointConfigurationView', new EditRemoteEndpointConfigurationViewComponent())
