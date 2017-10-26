'use strict'
import { ItemsService } from '../../services/items-service';
import * as angular from 'angular';
import { ProjectService } from '../../services/project-service/project-service'
import * as ProjectActions from '../../actions/project';
import { INgRedux } from 'ng-redux'

export class ProjectComponentController {

  private actions: any = {}
  private currentView: string = 'sources'

  /* @ngInject */
  constructor(private projectService: ProjectService,
              private itemsService: ItemsService,
              private $stateParams: any,
              private $state: any,
              private $ngRedux: INgRedux) {
    let unsub1: () => void = $ngRedux.connect(this.mapProjectToActions, ProjectActions)(this.actions)
    this.actions.unsubscribe = () => {
      unsub1()
    }

    // Put the project from $stateParams onto the state
    if ($stateParams.id && $stateParams.sparqlEndpoint && $stateParams.graph) {
      if (this.actions.project.id !== $stateParams.id) {
        this.actions.setProject($stateParams.id, $stateParams.sparqlEndpoint, $stateParams.graph, projectService)
      }
    }

    if ($stateParams.view) {
      if (['sources', 'filter', 'active'].indexOf($stateParams.view) !== -1) {
        this.currentView = $stateParams.view
      }
    }

    itemsService.getAllItemsCount().then((count) => this.actions.setAllItemCount(count))
    itemsService.getFilteredItemsCount().then((count) => this.actions.setFilteredItemCount(count))
  }

  private setView(newView: string): void {
    this.$state.go('project', { view: newView })
  }

  private dataUsedProportion(): number {
    return this.currentView === 'filter' ?
        this.actions.project.filteredItemsCount / this.actions.project.allItemsCount * 100 :
      this.currentView === 'active' ?
        this.actions.project.activeItemsCount / this.actions.project.filteredItemsCount * 100 :
        0
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
