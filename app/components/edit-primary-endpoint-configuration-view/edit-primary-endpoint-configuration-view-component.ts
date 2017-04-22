'use strict'

import {EditCitableComponentController} from '../citable-editor/citable-editor-component'
import {PrimaryEndpointConfiguration} from '../project-service/primary-endpoint-configuration'
import {FibraService} from '../app/fibra-service'
import {ProjectService} from '../project-service/project-service'
import {DataFactory} from '../app/_datamodel/rdf'

export class EditPrimaryEndpointConfigurationViewComponentController  extends EditCitableComponentController<PrimaryEndpointConfiguration> {

  public addCompatibleEndpoint(): void {
    this.c.compatibleEndpoints.push('')
  }
  public removeCompatibleEndpoint(index: number): void {
    this.c.compatibleEndpoints.splice(index, 1)
  }

  constructor($stateParams: any, fibraService: FibraService, projectService: ProjectService, toastr: angular.toastr.IToastrService) {
    super($stateParams.sourceId, projectService, toastr)
    if ($stateParams.id) projectService.loadPrimaryEndpointConfiguration(this.projectSource, $stateParams.id).then(ps => this.c = ps)
    else {
      this.c = new PrimaryEndpointConfiguration()
      this.c.id = $stateParams.id
      this.c.labels = [ DataFactory.literal('', fibraService.getState().language)]
      this.c.descriptions = [ DataFactory.literal('', fibraService.getState().language)]
    }
  }
}

export class EditPrimaryEndpointConfigurationViewComponent implements angular.IComponentOptions {
    public controller: string = 'EditPrimaryEndpointConfigurationViewComponentController'
    public templateUrl: string = 'components/edit-primary-endpoint-configuration-view/edit-primary-endpoint-configuration-view.html'
}