'use strict'

import {Project} from '../../services/project-service/project'
import {ProjectSourceInfo} from '../project-sources-view/project-sources-view-component'
import {RemoteEndpointConfiguration} from '../../services/project-service/remote-endpoint-configuration'
import {PrimaryEndpointConfiguration} from '../../services/project-service/primary-endpoint-configuration'
import {Schema} from '../../services/project-service/schema'
import {ProjectService} from '../../services/project-service/project-service'
import * as angular from 'angular'

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

  /* @ngInject */
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
    public controller = ProjectSourceConfigurationsViewComponentController // (new (...args: any[]) => angular.IController) = SelectViewComponentController
    public template = require('./project-source-configurations-view.pug')()
}

angular.module('fibra.components.project-source-configurations-view', ['fibra.services'])
  .component('projectSourceConfigurationsView', new ProjectSourceConfigurationsViewComponent())
