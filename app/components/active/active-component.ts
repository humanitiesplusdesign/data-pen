'use strict'
import * as angular from 'angular'
import { ProjectService } from '../../services/project-service/project-service'
import * as ProjectActions from '../../actions/project'
import { INgRedux } from 'ng-redux'

export class ActiveComponentController {

  private actions: any = {}

  /* @ngInject */
  constructor(private projectService: ProjectService,
              private $ngRedux: INgRedux) {
    let unsub1: () => void = $ngRedux.connect(this.mapProjectToActions, ProjectActions)(this.actions)
    this.actions.unsubscribe = () => {
      unsub1()
    }
  }

  private mapProjectToActions(state: any): any {
    return {
      project: state.frontend.project
    }
  }
}

export class ActiveComponent implements angular.IComponentOptions {
    public template: any = require('./active.pug')()
    public controller: any = ActiveComponentController
}

angular.module('fibra.components.active', [])
  .component('active', new ActiveComponent())
