'use strict'

import {Project} from '../../services/project-service/project'
import {ProjectSourceInfo} from '../project-sources-view/project-sources-view-component'
import {PrimaryEndpointConfiguration} from '../../services/project-service/primary-endpoint-configuration'
import {RemoteEndpointConfiguration} from '../../services/project-service/remote-endpoint-configuration'
import {Schema} from '../../services/project-service/schema'
import {ProjectService} from '../../services/project-service/project-service'
import {UUID} from '../misc-utils'
import {DataFactory, NodeSet} from '../../models/rdf'
import * as angular from 'angular'
import { IFibraNgRedux } from 'reducers';

export class ConfigureViewComponentController implements angular.IComponentController {
  public project: Project
  public projects: Project[]
  public projectSources: ProjectSourceInfo[]
  public projectSource: ProjectSourceInfo
  public primaryEndpointConfigurations: PrimaryEndpointConfiguration[] = []
  public selectedAuthorities: {[id: string]: boolean} = {
    'http://ldf.fi/fibra/geonamesCidocLiteEndpointConfiguration': true,
    'http://ldf.fi/fibra/viafCidocLiteEndpointConfiguration': true
  }
  public selectedArchives: {[id: string]: boolean} = {
    'http://ldf.fi/fibra/sdfbCidocLiteEndpointConfiguration': true,
    'http://ldf.fi/fibra/eeCidocLiteEndpointConfiguration': true
  }
  public selectedSchemas: {[id: string]: boolean} = {
    'http://ldf.fi/fibra/cidocCRMSchema': true
  }
  public selectedTemplate: PrimaryEndpointConfiguration
  public schemas: Schema[] = []
  public authorities: RemoteEndpointConfiguration[] = []
  public archives: RemoteEndpointConfiguration[] = []

  private $stateParams: any

  public saveAndOpen(): void {
    this.project.authorityEndpoints = this.authorities.filter(a => this.selectedAuthorities[a.id])
    this.project.archiveEndpoints = this.archives.filter(a => this.selectedArchives[a.id])
    this.project.schemas = this.schemas.filter(a => this.selectedSchemas[a.id])
    this.projectService.saveCitable(this.projectSource.updateEndpoint, this.projectSource.graphStoreEndpoint, this.project).then(() => this.$state.go('project', { id: this.project.id, sparqlEndpoint: this.project.source.sparqlEndpoint, graph: this.project.source.graph, view: 'active'}))
  }

  public deleteIfNew(): void {
    if (this.$stateParams.id) {
      this.$state.go('projects')
    } else {
      this.projectService.deleteCitable(this.projectSource.updateEndpoint, this.project).then(() => this.$state.go('projects'))
    }
  }

  public changeTemplate(): void {
    if (this.project) this.selectedTemplate.copyToProject(this.project)
  }

  public projectTitleFilled(): boolean {
    let projectTitleLength: number = this.project && this.project.labels ? this.project.labels.first().value.length : 0
    if (projectTitleLength > 0) {
      return true
    } else {
      return false
    }
  }

  public editingMode(): boolean {
    if (this.$stateParams.id) {
      return true
    } else {
      return false
    }
  }

  public noProjects(): boolean {
    if (this.projects.length == 0) {
      return true
    } else {
      return false
    }
  }

  /* @ngInject */
  constructor(private $q: angular.IQService, private projectService: ProjectService, $stateParams: any, private $ngRedux: IFibraNgRedux, private $state: angular.ui.IStateService) {
    this.projectSources = projectService.getProjectSources()
    this.$stateParams = $stateParams
    this.projectSource = this.projectSources.find(ps => ps.id === $stateParams.sourceId)
    projectService.listProjects(this.projectSource).then(projects => this.projects = projects)
    if ($stateParams.id) {
      projectService.loadProject(this.projectSource, $stateParams.id, false).then(p => {
        this.project = p
        this.selectedTemplate = p.asTemplate()
      })
    } else {
      let pid: string = 'http://ldf.fi/fibra/project_' + UUID()
      this.project = new Project(pid)
      this.project.labels.add(DataFactory.literal('', $ngRedux.getState().general.language))
      this.project.descriptions.add(DataFactory.literal('', $ngRedux.getState().general.language))
      this.project.source = this.projectSource
      this.project.endpoint = this.projectSource.sparqlEndpoint
      this.project.updateEndpoint = this.projectSource.updateEndpoint
      this.project.graphStoreEndpoint = this.projectSource.graphStoreEndpoint
      this.project.graph = pid
    }
    // Hackety hackety hack
    [new ProjectSourceInfo('Shared projects', 'http://ldf.fi/fibra/sparql', 'http://ldf.fi/fibra/update', 'http://ldf.fi/fibra/data', 'http://ldf.fi/fibra/shared-projects/', 'http://ldf.fi/fibra/fusekiEndpointWithTextIndexAndSecoFunctions')]
      .concat(this.projectSources).forEach(ps => {
      projectService.listPrimaryEndpointConfigurations(ps).then(pt => {
        if (!this.selectedTemplate) {
          let matchingEC: PrimaryEndpointConfiguration = pt.find(ec => ec.compatibleEndpoints.find(et => et === this.projectSource.type) !== undefined)
          if (matchingEC) {
            this.selectedTemplate = matchingEC
            this.changeTemplate()
          }
        }
        this.primaryEndpointConfigurations = this.primaryEndpointConfigurations.concat(pt)
      })
      projectService.listAuthorityEndpointConfigurations(ps).then(pt => this.authorities = this.authorities.concat(pt))
      projectService.listArchiveEndpointConfigurations(ps).then(pt => this.archives = this.archives.concat(pt))
      projectService.listSchemas(ps).then(pt => this.schemas = this.schemas.concat(pt))
    })
  }
}

export class ConfigureViewComponent implements angular.IComponentOptions {
    public controller = ConfigureViewComponentController // (new (...args: any[]) => angular.IController) = ConfigureViewComponentController
    public template = require('./configure-view.pug')()
}

angular.module('fibra.components.configure', ['fibra.services'])
  .component('configureView', new ConfigureViewComponent())
