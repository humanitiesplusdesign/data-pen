'use strict'
import { IActiveActions } from '../../actions/active';
import { ISourcesState } from 'reducers/sources';
import { ProjectState } from 'reducers/project';
import { IClassFilterTree, IFilterState, IFilter } from 'reducers/filter';
import { IRootState } from '../../reducers';
import { Class, Property } from '../../services/project-service/data-model';
import { ItemsService } from '../../services/items-service';
import { $stateChangeCancel } from 'angular-ui-router/lib-esm/legacy/stateEvents';
import * as angular from 'angular';
import { ProjectService } from '../../services/project-service/project-service'
import * as ProjectActions from '../../actions/project';
import * as FilterActions from '../../actions/filter';
import { IFibraNgRedux } from 'reducers'
import 'angular-drag-drop';
import 'angular-ui-grid';
import * as d3 from 'd3';
import 'angularjs-slider';
import { PropertyService, BasicProperty } from 'services/property-service';

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
  private histogramData: any = [
    {key: '1900', count: 4},
    {key: '1910', count: 9},
    {key: '1920', count: 17},
    {key: '1930', count: 5},
    {key: '1940', count: 10},
    {key: '1950', count: 22},
    {key: '1960', count: 0},
    {key: '1970', count: 8},
    {key: '1980', count: 21},
    {key: '1990', count: 12}
  ]
  private histogramRectangles: any = []
  private min: number = 0
  private max: number = 2500
  private slideMin: number = this.min
  private slideMax: number = this.max
  private slider: any = {
    min: 0,
    max: 2500,
    ceil: 2500,
    floor: 0
  }

  /* @ngInject */
  constructor(private projectService: ProjectService,
              private itemsService: ItemsService,
              private $scope: angular.IScope,
              private $q: angular.IQService,
              private $ngRedux: IFibraNgRedux,
              private $document: angular.IDocumentService,
              private propertyService: PropertyService) {
    let unsub1: () => void = $ngRedux.connect(this.mapProjectToActions, ProjectActions)(this.actions)
    let unsub2: () => void = $ngRedux.connect(this.mapFilterToActions, FilterActions)(this.actions)

    let stateUnsubscribe: () => void = $ngRedux.connect(
      (state: IRootState) => {
        return {
          project: state.project,
          sources: state.sources,
          filter: state.filter
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

    this.histogramRectangles = this.generateHistogram(this.histogramData)
  }

  private addFilter(clss: Class, prop: Property): void {
    this.actions.setFilter(clss, prop, this.propertyService)
  }

  private removeFilter(clss: Class, prop: Property): void {
    this.actions.removeFilter(clss, prop)
  }

  private setFilterSelection(clss: Class, prop: Property, id: string, low: number, high: number): void {
    this.actions.setFilterSelection(clss, prop, [low, high])
  }

  private getActiveClasses(): Class[] {
    let classes: Class[] = []
    new Set(this.state.sources.archiveSources.concat(this.state.sources.authoritySources).map((s) => d3.keys(this.state.sources.sourceClassToggle[s.id]))
      .reduce((a, b) => a.concat(b), [])).forEach((c) => classes.push(this.state.project.project.dataModel.classMap['s'][c]))
    return classes
  }

  private mapProjectToActions(state: any): any {
    return {
      project: state.project
    }
  }

  private mapFilterToActions(state: any): any {
    return {
      filter: state.filter
    }
  }

  private slideOptionsFromFilter(filter: IFilter): any {
    let options: {} = {
      draggableRange: true,
      showTicks: filter.domain[1] / 10,
      showTicksValues: true,
      onEnd: this.setFilterSelection.bind(this, filter.clss, filter.prop)
    }
    switch (filter.prop['type']) {
      case 'DateTime':
        options['floor'] = d3.timeParse('%Y-%m-%d')(filter.prop['minimumValue'].value).getFullYear()
        options['ceil'] = d3.timeParse('%Y-%m-%d')(filter.prop['maximumValue'].value).getFullYear()
        break;
      default:
        options['floor'] = 0
        options['ceil'] = 2550
    }

    options['showTicks'] = options['ceil'] / 10
    return options
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

  private map_range(value, low1, high1, low2, high2): number {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
  }

  private generateHistogram(data: any): any {
    // get min and max count
    let countsArray: number[] = []
    for (let j: number = 0; j < data.length; j++) {
      countsArray.push(data[j].count)
    }
    let minCount: number = Math.min.apply(Math, countsArray)
    let maxCount: number = Math.max.apply(Math, countsArray)

    // get and set graph width and height
    let graphWidth: number = 1547
    let graphHeight: number = 100

    // generate histogram rectangles
    let rects: any = []
    let rectWidth: number = graphWidth / data.length
    for (let i: number = 0; i < data.length; i++) {
      let rectHeight: number = this.map_range(data[i].count, 0, maxCount, 0, 1 * graphHeight)
      let tempRect: any = {'x': i * rectWidth, 'y': graphHeight - rectHeight, 'w': rectWidth, 'h': rectHeight}
      rects.push(tempRect)
    }

    return rects
  }

  private changeMinSlider(): void {
    if (this.slider.min < this.min) {
      this.slideMin = this.min
    } else {
      this.slideMin = this.slider.min
    }
  }

  private changeMaxSlider(): void {
    if (this.slider.max > this.max) {
       this.slideMax = this.max
    } else {
      this.slideMax = this.slider.max
    }
  }
}

export class FilterComponent implements angular.IComponentOptions {
    public template: any = require('./filter.pug')()
    public controller: any = FilterComponentController
}

angular.module('fibra.components.filter', ['ui.bootstrap', 'filearts.dragDrop', 'rzModule', 'ui.grid', 'ui.grid.emptyBaseLayer', 'ui.grid.resizeColumns', 'ui.grid.autoResize', 'ui.grid.edit'])
  .component('filter', new FilterComponent())
