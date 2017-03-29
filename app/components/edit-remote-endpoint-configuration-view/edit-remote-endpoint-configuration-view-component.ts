namespace fibra {
  'use strict'

  export class EditRemoteEndpointConfigurationViewComponentController implements angular.IComponentController {

    public ps: RemoteEndpointConfiguration
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

    constructor($stateParams: any, private fibraService: FibraService, private projectService: ProjectService, private toastr: angular.toastr.IToastrService) {
      if ($stateParams.id) projectService.loadRemoteEndpointConfiguration($stateParams.endpoint, $stateParams.id, $stateParams.graph).then(ps => this.ps = ps)
      else {
        this.ps = new RemoteEndpointConfiguration()
        this.ps.labels = [ DataFactory.literal('', fibraService.getState().language)]
        this.ps.descriptions = [ DataFactory.literal('', fibraService.getState().language)]
        this.ps.sourceEndpoint = $stateParams.endpoint
        this.ps.sourceGraph = $stateParams.graph
      }
    }
  }

  export class EditRemoteEndpointConfigurationViewComponent implements angular.IComponentOptions {
      public controller: string = 'EditRemoteEndpointConfigurationViewComponentController'
      public templateUrl: string = 'components/edit-remote-endpoint-configuration-view/edit-remote-endpoint-configuration-template-view.html'
  }

}
