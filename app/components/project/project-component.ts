'use strict'
import * as angular from 'angular'
import { ProjectService } from '../../services/project-service/project-service'
import * as ProjectActions from '../../actions/project'
import { INgRedux } from 'ng-redux'

export class ProjectComponentController {

  private actions: any = {}
  private currentView: string = 'sources'

  /* @ngInject */
  constructor(private projectService: ProjectService,
              private $stateParams: any,
              private $ngRedux: INgRedux) {
    let unsub1: () => void = $ngRedux.connect(this.mapProjectToActions, ProjectActions)(this.actions)
    this.actions.unsubscribe = () => {
      unsub1()
    }

    // Put the project from $stateParams onto the state
    if ($stateParams.id && $stateParams.sparqlEndpoint && $stateParams.graph) {
      this.actions.setProject($stateParams.id, $stateParams.sparqlEndpoint, $stateParams.graph, projectService)
    }
  }

  private mapProjectToActions(state: any): any {
    return {
      project: state.frontend.project
    }
  }
}

export class ProjectComponent implements angular.IComponentOptions {
    public template: any = require('./project.pug')()
    public controller: any = ProjectComponentController
}

angular.module('fibra.components.project', [])
  .component('project', new ProjectComponent())
