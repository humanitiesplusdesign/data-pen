'use strict'

import {EditCitableComponentController} from '../citable-editor/citable-editor-component'
import {RemoteEndpointConfiguration} from '../project-service/remote-endpoint-configuration'
import {FibraService} from '../../services/fibra-service'
import {ProjectService} from '../project-service/project-service'
import {DataFactory} from '../../models/rdf'

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
    public controller: string = 'EditRemoteEndpointConfigurationViewComponentController'
    public templateUrl: string = 'components/edit-remote-endpoint-configuration-view/edit-remote-endpoint-configuration-view.html'
}

