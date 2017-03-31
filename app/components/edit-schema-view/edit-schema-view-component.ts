namespace fibra {
  'use strict'

  export class EditCitableComponentController<T extends ICitable> implements angular.IComponentController {
    public c: T
    public disabled: boolean = false
    public projectSource: ProjectSourceInfo

    public delete(): void {
      this.disabled = true
      this.projectService.deleteCitable(this.projectSource.updateEndpoint, this.c).then(
        () => {
          this.toastr.success('Resource deleted')
          this.disabled = false
        },
        (err) => {
          this.toastr.error('Error deleting resource', err)
          this.disabled = false
        }
      )
    }

    public save(): void {
      this.disabled = true
      this.c.source = this.projectSource
      this.projectService.saveCitable(this.projectSource.updateEndpoint, this.projectSource.graphStoreEndpoint, this.c).then(
        () => {
          this.toastr.success('Resource saved')
          this.disabled = false
        },
        (err) => {
          this.toastr.error('Error saving resource', err)
          this.disabled = false
        }
      )
    }

    constructor(sourceId: string, private projectService: ProjectService, private toastr: angular.toastr.IToastrService) {
      this.projectSource = projectService.getProjectSources().find(cs2 => cs2.id === sourceId)
    }

  }

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
      public controller: string = 'EditSchemaViewComponentController'
      public templateUrl: string = 'components/edit-schema-view/edit-schema-view.html'
  }

}
