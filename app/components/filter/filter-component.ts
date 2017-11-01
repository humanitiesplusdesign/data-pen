'use strict'
import { ISourcesState } from '../../reducers/frontend/sources';
import { ProjectState } from '../../reducers/frontend/project';
import { IFilterState } from '../../reducers/frontend/filter';
import { IRootState } from '../../reducers';
import { Class, Property } from '../../services/project-service/data-model';
import { ItemsService } from '../../services/items-service';
import { $stateChangeCancel } from 'angular-ui-router/lib-esm/legacy/stateEvents';
import * as angular from 'angular';
import { ProjectService } from '../../services/project-service/project-service'
import * as ProjectActions from '../../actions/project';
import * as FilterActions from '../../actions/filter';
import { INgRedux } from 'ng-redux'
import 'angular-drag-drop';
import 'angular-ui-grid';
import * as d3 from 'd3';
import 'angularjs-slider';

interface IFilterComponentControllerState {
  project: ProjectState
  sources: ISourcesState
  filter: IFilterState
}

export class FilterComponentController {

  private actions: any = {}
  private state: IFilterComponentControllerState = <IFilterComponentControllerState>{}
  private allItems: {}[] = []
  private selectedClass: Class

  /* @ngInject */
  constructor(private projectService: ProjectService,
              private itemsService: ItemsService,
              private $scope: angular.IScope,
              private $q: angular.IQService,
              private $ngRedux: INgRedux) {
    let unsub1: () => void = $ngRedux.connect(this.mapProjectToActions, ProjectActions)(this.actions)
    let unsub2: () => void = $ngRedux.connect(this.mapFilterToActions, FilterActions)(this.actions)

    let stateUnsubscribe: () => void = $ngRedux.connect(
      (state: IRootState) => {
        return {
          project: state.frontend.project,
          sources: state.frontend.sources,
          filter: state.frontend.filter
        }
      })(this.state)
    this.actions.unsubscribe = () => {
      unsub1()
      unsub2()
      stateUnsubscribe()
    }

    this.itemsService.getAllItems().then((items) => {
      this.allItems = items
    })

    this.selectedClass = this.getActiveClasses()[0]
  }

  private addFilter(clss: Class, prop: Property): void {
    this.actions.setFilter(clss, prop)
  }

  private getActiveClasses(): Class[] {
    let classes: Class[] = []
    new Set(this.state.sources.sources.map((s) => d3.keys(this.state.sources.sourceClassToggle[s.id]))
      .reduce((a, b) => a.concat(b), [])).forEach((c) => classes.push(this.state.project.project.dataModel.classMap['s'][c]))
    return classes
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

angular.module('fibra.components.filter', ['ui.bootstrap', 'filearts.dragDrop', 'ui.grid', 'ui.grid.autoResize', 'rzModule'])
  .component('filter', new FilterComponent())
