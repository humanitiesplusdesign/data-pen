namespace fibra {
  'use strict'

  export class EditPrimaryEndpointConfigurationViewComponentController implements angular.IComponentController {

    public ps: PrimaryEndpointConfiguration
    public disabled: boolean = false

    public save(): void {
      this.disabled = true
      this.projectService.saveCitable(this.ps).then(
        () => {
          this.toastr.success('Configuration saved')
          this.disabled = false
        },
        (err) => {
          this.toastr.error('Error saving configuration', err)
          this.disabled = false
        }
      )
    }

    public addCompatibleEndpoint(): void {
      this.ps.compatibleEndpoints.push('')
    }
    public removeCompatibleEndpoint(index: number): void {
      this.ps.compatibleEndpoints.splice(index, 1)
    }

    constructor($stateParams: any, private fibraService: FibraService, private projectService: ProjectService, private toastr: angular.toastr.IToastrService) {
      if ($stateParams.id) projectService.loadPrimaryEndpointConfiguration($stateParams.endpoint, $stateParams.id, $stateParams.graph).then(ps => this.ps = ps)
      else {
        this.ps = new PrimaryEndpointConfiguration()
        this.ps.id = $stateParams.id
        this.ps.labels = [ DataFactory.literal('', fibraService.getState().language)]
        this.ps.descriptions = [ DataFactory.literal('', fibraService.getState().language)]
        this.ps.sourceEndpoint = $stateParams.endpoint
        this.ps.sourceGraph = $stateParams.graph
      }
    }
  }

  export class EditPrimaryEndpointConfigurationViewComponent implements angular.IComponentOptions {
      public controller: string = 'EditPrimaryEndpointConfigurationViewComponentController'
      public templateUrl: string = 'components/edit-primary-endpoint-configuration-view/edit-primary-endpoint-configuration-view.html'
  }

}
