namespace fibra {
  'use strict'

  type ProjectSourceParams = {
    id?: string
    sparqlEndpoint?: string
    updateEndpoint?: string
    graphStoreEndpoint?: string
    graph?: string
    type?: string
  }

  export class ProjectSourcesViewComponentController implements angular.IComponentController {

    public projectSources: ProjectSourceInfo[]
    public deleteProjectSource(index: number): void {
      this.projectSources.splice(index, 1)
    }
    public addNewProjectSource(): void {
      this.projectSources.push(new ProjectSourceInfo('', '' , '', '', '', ''))
    }

    constructor(private $state: angular.ui.IStateService, $stateParams: ProjectSourceParams, projectService: ProjectService) {
      this.projectSources = projectService.getProjectSources()
      if ($stateParams.id && $stateParams.sparqlEndpoint && $stateParams.type) {
        this.projectSources.push(new ProjectSourceInfo($stateParams.id, $stateParams.sparqlEndpoint, $stateParams.updateEndpoint ? $stateParams.updateEndpoint : $stateParams.sparqlEndpoint, $stateParams.graphStoreEndpoint ? $stateParams.graphStoreEndpoint : $stateParams.sparqlEndpoint, $stateParams.graph, $stateParams.type))
        $state.go('projects')
      }
    }
  }

  export class ProjectSourceInfo implements ICitableSource {
    constructor(public id: string, public sparqlEndpoint: string, public updateEndpoint: string, public graphStoreEndpoint: string, public graph: string, public type: string) {}
  }

  export class ProjectSourcesViewComponent implements angular.IComponentOptions {
      public controller: string = 'ProjectSourcesViewComponentController' // (new (...args: any[]) => angular.IController) = SelectViewComponentController
      public templateUrl: string = 'components/project-sources-view/project-sources-view.html'
  }

}
