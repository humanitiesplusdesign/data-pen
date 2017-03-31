namespace fibra {
  'use strict'

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

}
