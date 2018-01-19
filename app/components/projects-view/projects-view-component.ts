'use strict'
import { Project } from '../../services/project-service/project';
import { RemoteEndpointConfiguration } from '../../services/project-service/remote-endpoint-configuration';
import * as angular from 'angular';

import { Citable, ICitable, ICitableSource } from '../../models/citable';
import { ProjectSourceInfo } from '../project-sources-view/project-sources-view-component'
import { ProjectService } from '../../services/project-service/project-service'
import { SocialAuthService } from '../../services/social-auth-service'
import { IModalService } from 'angular-ui-bootstrap'
import retina from 'retinajs'
import { IClass } from 'services/project-service/data-model';
import { ILiteral } from 'models/rdfjs';
import { ONodeSet, CNode } from 'models/rdf';

export interface IClassCounts { 
  [clss: string]: {
    count: number,
    description: CNode[]
  }
}

export class ProjectsViewComponentController implements angular.IComponentController {

  public projectSourceState: { [id: string]: 'loading' | 'error' | 'ready' } = {}
  public projects: { [id: string]: ICitable[] } = {}
  public projectSources: { [id: string]: ProjectSourceInfo } = {}
  private projectClassCounts: { [id: string]: IClassCounts } = {}
  public lang: string

  private authorities: RemoteEndpointConfiguration[]
  private archives: RemoteEndpointConfiguration[]

  public deleteProject(sourceId: string, projectIndex: number, project: ICitable): void {
    this.projects[sourceId].splice(projectIndex, 1)
    this.projectService.deleteCitable(this.projectSources[sourceId].updateEndpoint, project)
  }

  /* @ngInject */
  constructor(
    private projectService: ProjectService,
    socialAuthService: SocialAuthService,
    $document: angular.IDocumentService,
    private $uibModal: IModalService,
    private $q: angular.IQService
  ) {
    let projectSources: ProjectSourceInfo[] = projectService.getProjectSources()
    if (projectSources.length === 0) {
      // projectSources.push(new ProjectSourceInfo('Private projects in local browser storage', 'local:projects', 'local:projects', 'local:projects', '', 'http://ldf.fi/fibra/rdfstoreJSEndpoint'))
      // http://localhost:3000/#!/project-sources?sourceId=Private projects in local browser storage&sparqlEndpoint=local:projects&type=http://ldf.fi/fibra/rdfstoreJSEndpoint
      // projectSources.push(new ProjectSourceInfo('Projects in local Fuseki SPARQL server', 'http://localhost:3030/fibra/sparql', 'http://localhost:3030/fibra/update', 'http://localhost:3030/fibra/data', '', 'http://ldf.fi/fibra/fusekiEndpoint'))
      // http://localhost:3000/#!/project-sources?sourceId=Projects in local Fuseki SPARQL server&sparqlEndpoint=http://localhost:3030/fibra/sparql&updateEndpoint=http://localhost:3030/fibra/update&graphStoreEndpoint=http://localhost:3030/fibra/data&type=http://ldf.fi/fibra/fusekiEndpoint
      projectSources.push(new ProjectSourceInfo('Shared projects', 'https://ldf.fi/fibra/sparql', 'https://ldf.fi/fibra/update', 'https://ldf.fi/fibra/data', 'http://ldf.fi/fibra/shared-projects/', 'http://ldf.fi/fibra/fusekiEndpointWithTextIndexAndSecoFunctions'))
    }

    if (socialAuthService.isLoggedIn() && !projectSources.some(s => s.id === 'Projects')) {
      projectSources.unshift(new ProjectSourceInfo('Projects', 'http:s//ldf.fi/fibra/sparql', 'https://ldf.fi/fibra/sparql', 'https://ldf.fi/fibra/sparql', socialAuthService.getSourceID(), 'http://ldf.fi/fibra/fusekiEndpointWithTextIndexAndSecoFunctions'))
    }

    projectSources.forEach(source => {
      this.projectSources[source.id] = source
      this.projects[source.id] = []
      this.projectSourceState[source.id] = 'loading'
      projectService.listProjects(source).then(
        projects => {
          this.projectSourceState[source.id] = 'ready'
          this.projects[source.id] = projects
          projects.forEach(p => {
            this.populateClassCounts(p, source)
          })
        },
        err => {
          this.projectSourceState[source.id] = 'error'
          this.projects[source.id] = err
        }
      )
    })

    this.authorities = []
    this.archives = []
    projectService.listAuthorityEndpointConfigurations(new ProjectSourceInfo('Shared projects', 'http://ldf.fi/fibra/sparql', 'http://ldf.fi/fibra/update', 'http://ldf.fi/fibra/data', 'http://ldf.fi/fibra/shared-projects/', 'http://ldf.fi/fibra/fusekiEndpointWithTextIndexAndSecoFunctions')).then(pt => this.authorities = this.authorities.concat(pt))
    projectService.listArchiveEndpointConfigurations(new ProjectSourceInfo('Shared projects', 'http://ldf.fi/fibra/sparql', 'http://ldf.fi/fibra/update', 'http://ldf.fi/fibra/data', 'http://ldf.fi/fibra/shared-projects/', 'http://ldf.fi/fibra/fusekiEndpointWithTextIndexAndSecoFunctions')).then(pt => this.archives = this.archives.concat(pt))
  }

  private getSources(project: Project): RemoteEndpointConfiguration[] {
    return this.authorities.concat(this.archives).filter((ae) => {
      return project.authorityEndpoints.concat(project.archiveEndpoints).map((p) => p.id).indexOf(ae.id) !== -1
    })
  }

  private populateClassCounts(project: Project, source: ICitableSource): void {
    this.projectService.loadProject(source, project.id, false)
      .then(p => {
        if(p.layouts.find(l => l.active)) {
          this.projectClassCounts[project.id] = p.layouts.find(l => l.active).counts
        } else {
          this.projectClassCounts[project.id] = {}
        }
      })
      .then(() => console.log(this.projectClassCounts))
  }

  private openDeleteProjectModal(project: Project, i: number, sourceId: string): void {
    let deleteProject: (string, number, Citable) => void = this.deleteProject.bind(this)
    let modalInstance: any = this.$uibModal.open({
      animation: true,
      component: 'confirmDeleteModal',
      resolve: {
        project: function(): Project {
          return project
        }
      }
    });
    modalInstance.result.then(
      function(): void {
        deleteProject(sourceId, i, project)
      },
      function(): void {
        // didn't delete
      });
  };

}

export class ProjectsViewComponent implements angular.IComponentOptions {
  public controller = ProjectsViewComponentController // (new (...args: any[]) => angular.IController) = SelectViewComponentController
  public template: string = require('./projects-view.pug')()
}

angular.module('fibra.components.projects-view', ['ui.bootstrap'])
  .component('projectsView', new ProjectsViewComponent())
  .controller('projectsSortController', function($scope) {
    $scope.item = {
      "id": "0",
      "name": "Date Created",
    };

    $scope.options = [{
      "id": "0",
      "description": "Date created.",
      "name": "Date created"
    },
    {
      "id": "1",
      "description": "Alphabetical.",
      "name": "A to Z"
    },
    {
      "id": "2",
      "description": "Alphabetical (reversed).",
      "name": "Z to A"
    }];
  });
