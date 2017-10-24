'use strict'
import { $stateChangeCancel } from 'angular-ui-router/lib-esm/legacy/stateEvents';
import * as angular from 'angular';
import { ProjectService } from '../../services/project-service/project-service'
import * as ProjectActions from '../../actions/project';
import * as FilterActions from '../../actions/filter';
import { INgRedux } from 'ng-redux'
import * as angularDragDrop from 'angular-drag-drop';
import * as angularUIGrid from 'angular-ui-grid';

export class FilterComponentController {

  private actions: any = {}

  /* @ngInject */
  constructor(private projectService: ProjectService,
              private $scope: angular.IScope,
              private $q: angular.IQService,
              private $ngRedux: INgRedux) {
    let unsub1: () => void = $ngRedux.connect(this.mapProjectToActions, ProjectActions)(this.actions)
    let unsub2: () => void = $ngRedux.connect(this.mapFilterToActions, FilterActions)(this.actions)
    this.actions.unsubscribe = () => {
      unsub1()
      unsub2()
    }
  }

  private mapProjectToActions(state: any): any {
    return {
      project: state.frontend.project
    }
  }

  private mapFilterToActions(state: any): any {
    return {
      filter: state.frontend.filter
    }
  }

  private dragDivider(evt: DragEvent): void {
    let nativePercent: number = 100 * evt.clientX / window.innerWidth
    this.actions.setFilterDividerPercentage(nativePercent > 98 ? 100 : nativePercent < 2 ? 0 : nativePercent)
  }

  private tableWidthStyle(): {} {
    return { 'width': this.actions.filter.dividerPercent + '%' }
  }

  private canvasWidthStyle(): {} {
    console.log(this.actions.filter)
    return { 'width': (100 - this.actions.filter.dividerPercent) + '%', 'left': this.actions.filter.dividerPercent + '%' }
  }

  private dragTabLeftStyle(): {} {
    return { 'left': this.actions.filter.dividerPercent + '%' }
  }
}

export class FilterComponent implements angular.IComponentOptions {
    public template: any = require('./filter.pug')()
    public controller: any = FilterComponentController
}

angular.module('fibra.components.filter', ['ui.bootstrap', angularDragDrop, angularUIGrid, 'ui.grid.autoResize'])
  .component('filter', new FilterComponent())
