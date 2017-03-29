namespace fibra {
  'use strict'

  export class EditSchemaViewComponentController implements angular.IComponentController {

    public ps: Schema
    public disabled: boolean = false

    public delete(): void {
      this.disabled = true
      this.projectService.deleteCitable(this.ps).then(
        () => {
          this.toastr.success('Schema deleted')
          this.disabled = false
        },
        (err) => {
          this.toastr.error('Error deleting schema', err)
          this.disabled = false
        }
      )
    }

    public save(): void {
      this.disabled = true
      this.projectService.saveCitable(this.ps).then(
        () => {
          this.toastr.success('Schema saved')
          this.disabled = false
        },
        (err) => {
          this.toastr.error('Error saving schema', err)
          this.disabled = false
        }
      )
    }

    constructor($stateParams: any, private fibraService: FibraService, private projectService: ProjectService, private toastr: angular.toastr.IToastrService) {
      if ($stateParams.id) projectService.loadSchema($stateParams.endpoint, $stateParams.id, $stateParams.graph).then(ps => this.ps = ps)
      else {
        this.ps = new Schema()
        this.ps.labels = [ DataFactory.literal('', fibraService.getState().language)]
        this.ps.descriptions = [ DataFactory.literal('', fibraService.getState().language)]
        this.ps.sourceEndpoint = $stateParams.endpoint
        this.ps.endpoint = $stateParams.endpoint
        this.ps.sourceGraph = $stateParams.graph
      }
    }
  }

  export class EditSchemaViewComponent implements angular.IComponentOptions {
      public controller: string = 'EditSchemaViewComponentController'
      public templateUrl: string = 'components/edit-schema-view/edit-schema-view.html'
  }

}
