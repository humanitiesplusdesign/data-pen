'use strict'

import {ProjectService} from '../../services/project-service/project-service'
import {ICitableSource, CitableSource} from '../../models/citable'
import * as angular from 'angular'

type ProjectSourceParams = {
  sourceId?: string
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

  /* @ngInject */
  constructor(private $state: angular.ui.IStateService, $stateParams: ProjectSourceParams, projectService: ProjectService) {
    this.projectSources = projectService.getProjectSources()
    if ($stateParams.sourceId && $stateParams.sparqlEndpoint && $stateParams.type) {
      this.projectSources.push(new ProjectSourceInfo($stateParams.sourceId, $stateParams.sparqlEndpoint, $stateParams.updateEndpoint ? $stateParams.updateEndpoint : $stateParams.sparqlEndpoint, $stateParams.graphStoreEndpoint ? $stateParams.graphStoreEndpoint : $stateParams.sparqlEndpoint, $stateParams.graph ? $stateParams.graph : '', $stateParams.type))
      $state.go('projects')
    }
  }
}

export class ProjectSourceInfo extends CitableSource {
  constructor(public id: string, sparqlEndpoint: string, public updateEndpoint: string, public graphStoreEndpoint: string, graph: string, public type: string) {
    super(sparqlEndpoint, graph)
  }
}

export class ProjectSourcesViewComponent implements angular.IComponentOptions {
    public controller: (new (...args: any[]) => angular.IController) = ProjectSourcesViewComponentController // (new (...args: any[]) => angular.IController) = SelectViewComponentController
    public template: string = require('./project-sources-view.pug')()
}

angular.module('fibra.components.project-sources-view', ['fibra.services'])
  .component('projectSourcesView', new ProjectSourcesViewComponent())
