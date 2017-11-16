'use strict'
import { IActiveActions } from '../../actions/active';
import { ISourcesState } from '../../reducers/frontend/sources';
import { ProjectState } from '../../reducers/frontend/project';
import { IClassFilterTree, IFilterState } from '../../reducers/frontend/filter';
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
  private localFilterTree: IClassFilterTree
  private histogramWidth: number = 1000
  private histogramHeight: number = 100
  //private histogramColour = "blue"
  private histogramRectangles: any = [
    {'x': 20, 'y': 100-80, 'w': 20, 'h': 80},
    {'x': 60, 'y': 100-50, 'w': 20, 'h': 50},
    {'x': 1200, 'y': 100-20, 'w': 20, 'h': 20},
  ]

  /* @ngInject */
  constructor(private projectService: ProjectService,
              private itemsService: ItemsService,
              private $scope: angular.IScope,
              private $q: angular.IQService,
              private $ngRedux: INgRedux,
              private $document: angular.IDocumentService) {
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

    this.localFilterTree = angular.copy(this.state.filter.filtersByClass)

    let oldFilterTree: IClassFilterTree = this.state.filter.filtersByClass

    // Because we need to keep a local copy of the state to mutate, we have to observe it for changes.
    $ngRedux.subscribe(() => {
      if (this.state.filter.filtersByClass !== oldFilterTree) {
        this.localFilterTree = angular.copy(this.state.filter.filtersByClass)
        oldFilterTree = this.state.filter.filtersByClass
      }
    })
  }

  private addFilter(clss: Class, prop: Property): void {
    this.actions.setFilter(clss, prop)
  }

  private removeFilter(clss: Class, prop: Property): void {
    this.actions.removeFilter(clss, prop)
  }

  private setFilterSelection(clss: Class, prop: Property, id: string, low: number, high: number): void {
    this.actions.setFilterSelection(clss, prop, [low, high])
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

angular.module('fibra.components.filter', ['ui.bootstrap', 'filearts.dragDrop', 'rzModule', 'ui.grid', 'ui.grid.emptyBaseLayer', 'ui.grid.resizeColumns', 'ui.grid.autoResize', 'ui.grid.edit'])
  .component('filter', new FilterComponent())
