namespace fibra {
  'use strict'

  export class ProjectsViewComponentController implements angular.IComponentController {

    public projectSourceState: {[id: string]: 'loading'|'error'|'ready' } = {}
    public projects: {[id: string]: ICitable[]} = {}
    public projectSources: {[id: string]: ProjectSourceInfo} = {}
    public lang: string

    public deleteProject(sourceId: string, projectIndex: number, project: ICitable): void {
      this.projects[sourceId].splice(projectIndex, 1)
      this.projectService.deleteCitable(this.projectSources[sourceId].updateEndpoint, project)
    }

    constructor(private projectService: ProjectService, socialAuthService: SocialAuthService, $localStorage: any) {
      let projectSources: ProjectSourceInfo[] = $localStorage['projectSources']
      if (!projectSources || projectSources.length === 0) {
        projectSources = []
        projectSources.push(new ProjectSourceInfo('Private projects in local browser storage', 'local:projects', 'local:projects', 'local:projects', '', 'http://ldf.fi/fibra/rdfstoreJSEndpoint'))
        // http://localhost:3000/#!/project-sources?sourceId=Private projects in local browser storage&sparqlEndpoint=local:projects&type=http://ldf.fi/fibra/rdfstoreJSEndpoint
        projectSources.push(new ProjectSourceInfo('Projects in local Fuseki SPARQL server', 'http://localhost:3030/fibra/sparql', 'http://localhost:3030/fibra/update', 'http://localhost:3030/fibra/data', '', 'http://ldf.fi/fibra/fusekiEndpoint'))
        // http://localhost:3000/#!/project-sources?sourceId=Projects in local Fuseki SPARQL server&sparqlEndpoint=http://localhost:3030/fibra/sparql&updateEndpoint=http://localhost:3030/fibra/update&graphStoreEndpoint=http://localhost:3030/fibra/data&type=http://ldf.fi/fibra/fusekiEndpoint
        projectSources.push(new ProjectSourceInfo('Shared projects on the public LDF.fi endpoint', 'http://ldf.fi/fibra/sparql', 'http://ldf.fi/fibra/update', 'http://ldf.fi/fibra/data', 'http://ldf.fi/fibra/shared-projects/', 'http://ldf.fi/fibra/fusekiEndpointWithTextIndexAndSecoFunctions'))
        $localStorage['projectSources'] = projectSources
      }
      if (socialAuthService.isLoggedIn() && !projectSources.some(s => s.id === 'Personal projects on the public LDF.fi endpoint')) {
        let uid: string = CryptoJS.SHA256(socialAuthService.loginState())
        projectSources.push(new ProjectSourceInfo('Personal projects on the public LDF.fi endpoint', 'http://ldf.fi/fibra/sparql', 'http://ldf.fi/fibra/sparql', 'http://ldf.fi/fibra/sparql', 'http://ldf.fi/fibra/user/' + uid + '/projects/', 'http://ldf.fi/fibra/fusekiEndpointWithTextIndexAndSecoFunctions'))
      }
      projectSources.forEach(source => {
        this.projectSources[source.id] = source
        this.projects[source.id] = []
        this.projectSourceState[source.id] = 'loading'
        projectService.listProjects(source).then(
          projects => {
            this.projectSourceState[source.id] = 'ready'
            this.projects[source.id] = projects
          },
          err => {
            this.projectSourceState[source.id] = 'error'
            this.projects[source.id] = err
          })
      })
    }
  }

  export class ProjectsViewComponent implements angular.IComponentOptions {
      public controller: string = 'ProjectsViewComponentController' // (new (...args: any[]) => angular.IController) = SelectViewComponentController
      public templateUrl: string = 'components/projects-view/projects-view.html'
  }

}
