namespace fibra {
  'use strict'

  type ProjectSourceConfigurationsParams = {
    sourceId?: string
  }

  export class ProjectSourceConfigurationsViewComponentController implements angular.IComponentController {

    public source: ProjectSourceInfo
    public projects: Project[]
    public archiveEndpoints: RemoteEndpointConfiguration[]
    public authorityEndpoints: RemoteEndpointConfiguration[]
    public primaryEndpointConfigurations: PrimaryEndpointConfiguration[]
    public schemas: Schema[]

    constructor($stateParams: ProjectSourceConfigurationsParams, projectService: ProjectService) {
      this.source = projectService.getProjectSources().find(ps => ps.id === $stateParams.sourceId)
      projectService.listProjects(this.source).then(projects => this.projects = projects)
      projectService.listSchemas(this.source).then(schemas => this.schemas = schemas)
      projectService.listPrimaryEndpointConfigurations(this.source).then(primaryEndpointConfigurations => this.primaryEndpointConfigurations = primaryEndpointConfigurations)
      projectService.listAuthorityEndpointConfigurations(this.source).then(authorityEndpoints => this.authorityEndpoints = authorityEndpoints)
      projectService.listArchiveEndpointConfigurations(this.source).then(archiveEndpoints => this.archiveEndpoints = archiveEndpoints)
    }
  }

  export class ProjectSourceConfigurationsViewComponent implements angular.IComponentOptions {
      public controller: string = 'ProjectSourceConfigurationsViewComponentController' // (new (...args: any[]) => angular.IController) = SelectViewComponentController
      public templateUrl: string = 'components/project-source-configurations-view/project-source-configurations-view.html'
  }

}
