namespace fibra {
  'use strict'

  export class ConfigureViewComponentController implements angular.IComponentController {
    public project: Project
    public projectSources: ProjectSourceInfo[]
    public projectSource: ProjectSourceInfo
    public primaryEndpointConfigurations: PrimaryEndpointConfiguration[] = []
    public statistics: {[id: string]: TreeNode[]} = {}
    public selectedAuthorities: {[id: string]: boolean} = {}
    public selectedArchives: {[id: string]: boolean} = {}
    public selectedSchemas: {[id: string]: boolean} = {}
    public selectedTemplate: PrimaryEndpointConfiguration
    public schemas: Schema[] = []
    public authorities: RemoteEndpointConfiguration[] = []
    public archives: RemoteEndpointConfiguration[] = []

    public saveAndOpen(): void {
      this.project.authorityEndpoints = this.authorities.filter(a => this.selectedAuthorities[a.id])
      this.project.archiveEndpoints = this.archives.filter(a => this.selectedArchives[a.id])
      this.project.schemas = this.schemas.filter(a => this.selectedSchemas[a.id])
      this.projectService.saveCitable(this.project).then(() => this.$state.go('construct', { id: this.project.id, endpoint: this.project.sourceEndpoint, graph: this.project.sourceGraph}))
    }

    public delete(): void {
      this.projectService.deleteCitable(this.project).then(() => this.$state.go('projects'))
    }

    public changeTemplate(): void {
      this.selectedTemplate.copyToProject(this.project)
    }

    constructor(private $q: angular.IQService, private projectService: ProjectService, fibraService: FibraService, private sparqlTreeService: SparqlTreeService, $stateParams: any, private $state: angular.ui.IStateService) {
      if ($stateParams.id) {
        projectService.loadProject($stateParams.endpoint, $stateParams.id, $stateParams.graph).then(p => {
          this.project = p
          this.selectedTemplate = p.asTemplate()
        })
      } else {
        let pid: string = 'http://ldf.fi/fibra/project_' + UUID()
        this.project = new Project(pid)
        this.project.labels = [ DataFactory.literal('', fibraService.getState().language)]
        this.project.descriptions = [ DataFactory.literal('', fibraService.getState().language)]
        this.project.sourceGraph = $stateParams.graph
        this.project.sourceEndpoint = $stateParams.endpoint
        this.project.endpoint = this.project.sourceEndpoint
        this.project.updateEndpoint = this.project.sourceEndpoint
        this.project.graphStoreEndpoint = this.project.sourceEndpoint
        this.project.graph = pid
      }
      this.projectSources = projectService.getProjectSources()
      this.projectSource = this.projectSources.find(ps => ps.endpoint === $stateParams.endpoint && ($stateParams.graph ? ps.graph === $stateParams.graph : ps.graph === ''))
      this.projectSources.forEach(ps => {
        projectService.listPrimaryEndpointConfigurations(ps.endpoint, ps.graph).then(pt => {
          if (!this.selectedTemplate) {
            let matchingEC: PrimaryEndpointConfiguration = pt.find(ec => ec.compatibleEndpoints.find(et => et === this.projectSource.type) !== undefined)
            if (matchingEC) {
              this.selectedTemplate = matchingEC
              this.changeTemplate()
            }
          }
          this.primaryEndpointConfigurations = this.primaryEndpointConfigurations.concat(pt)
        })
        projectService.listAuthorityEndpointConfigurations(ps.endpoint, ps.graph).then(pt => this.authorities = this.authorities.concat(pt))
        projectService.listArchiveEndpointConfigurations(ps.endpoint, ps.graph).then(pt => this.archives = this.archives.concat(pt))
        projectService.listSchemas(ps.endpoint, ps.graph).then(pt => this.schemas = this.schemas.concat(pt))
      })
    }

  }

  export class ConfigureViewComponent implements angular.IComponentOptions {
      public controller: string = 'ConfigureViewComponentController' // (new (...args: any[]) => angular.IController) = ConfigureViewComponentController
      public templateUrl: string = 'components/configure-view/configure-view.html'
  }
}
