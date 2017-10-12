'use strict'
import { ItemState } from '../../reducers/frontend/active';
import * as angular from 'angular';
import { ProjectService } from '../../services/project-service/project-service'
import * as ProjectActions from '../../actions/project';
import * as ActiveActions from '../../actions/active';
import { INgRedux } from 'ng-redux'
import * as d3 from 'd3';
import { SearchService } from '../../services/search-service'

export class ActiveComponentController {

  private actions: any = {}

  private radiusInitial: number = 1
  private radius: number = 8
  private radiusBounce: number = 15
  private currentlyAdding: boolean = false

  private nodeSearch: d3.Selection<Element, {}, HTMLElement, any>
  private nodeSearchSelected: string|{}
  private nodeSearchOffsetX: number
  private nodeSearchOffsetY: number

  /* @ngInject */
  constructor(private projectService: ProjectService,
              private $scope: angular.IScope,
              private $q: angular.IQService,
              private $ngRedux: INgRedux,
              private searchService: SearchService) {
    let unsub1: () => void = $ngRedux.connect(this.mapProjectToActions, ProjectActions)(this.actions)
    let unsub2: () => void = $ngRedux.connect(this.mapActiveToActions, ActiveActions)(this.actions)
    this.actions.unsubscribe = () => {
      unsub1()
    }
  }

  private mapProjectToActions(state: any): any {
    return {
      project: state.frontend.project
    }
  }

  private mapActiveToActions(state: any): any {
    return {
      project: state.frontend.active
    }
  }

  private $postLink(): void {
    this.buildCanvas()

    this.nodeSearch = d3.select('.node-search')
  }

  private buildCanvas(): void {
    let s: d3.Selection<Element, {}, HTMLElement, any> = d3.select('.main-svg')

    // let canvasSize: {height: number, width: number} = this.getCanvasSize()
    // let h: number = canvasSize.height
    // let w: number = canvasSize.width

    let g: d3.Selection<Element, {}, HTMLElement, any> = s.select('.main-g')

    let r: d3.Selection<SVGRectElement, {}, HTMLElement, any> = g.append<SVGRectElement>('rect')
      .classed('main-background', true)
      .on('click', this.canvasClick.bind(this, g))

    this.updateCanvasSize()

  }

  private canvasClick(sel: d3.Selection<SVGGElement, {}, HTMLElement, any>): void {
    this.$scope.$apply(() => {
      if (!this.currentlyAdding) {
        this.nodeSearchOffsetX = d3.event.offsetX
        this.nodeSearchOffsetY = d3.event.offsetY
        this.appendNode(sel, d3.event.offsetX, d3.event.offsetY, 'addition-node')
        this.nodeSearch
          .style('top', d3.event.offsetY + 25 + 'px')
        if (this.getCanvasSize().width - d3.event.offsetX > 350 + 30) {
          this.nodeSearch.style('left', d3.event.offsetX + 30 + 'px')
        } else {
          this.nodeSearch.style('left', d3.event.offsetX - 30 - 350 + 'px')
        }
      }

      this.currentlyAdding = true
    })
  }

  private nodeSearchRemove(): void {
    d3.select('.addition-node').remove()
    this.currentlyAdding = false
    this.nodeSearchSelected = ''
  }

  private nodeSearchResults(searchValue: string): angular.IPromise<{}[]> {
    return this.searchService.searchSources(searchValue)
  }

  private nodeSearchSelect($item, $model, $label, $event): void {
    let item: ItemState = {
      id: $item.id,
      description: $item.description,
      xpos: this.nodeSearchOffsetX,
      ypos: this.nodeSearchOffsetX
    }

    this.actions.addItemToCurrentLayout(item).then(() => {
        console.log('Added'),
        this.updateCanvas()
        this.$scope.$apply(this.nodeSearchRemove)
      }
    )
  }

  private appendNode(sel: d3.Selection<SVGGElement, {}, HTMLElement, any>, top: number, left: number, clss: string): d3.Selection<SVGGElement, {}, HTMLElement, any> {
    let g: d3.Selection<SVGGElement, {}, HTMLElement, any> = sel.append<SVGGElement>('g')
      .classed('node', true)
      .classed(clss, true)
      .attr('transform', 'translate(' + top + ',' + left + ')')

    let c: d3.Selection<SVGCircleElement, {}, HTMLElement, any> = g.append<SVGCircleElement>('circle')
      .classed('node-circle', true)
      .attr('r', this.radiusInitial + 'px')

    c.transition()
        .attr('r', this.radiusBounce + 'px')
      .transition()
      .attr('r', this.radius + 'px')

    return g
  }

  private updateCanvas(): void {
    let a: number = 1;
  }

  private updateCanvasSize(): void {
    let canvasSize: {height: number, width: number} = this.getCanvasSize()
    let h: number = canvasSize.height
    let w: number = canvasSize.width

    let r: d3.Selection<SVGRectElement, {}, HTMLElement, any> = d3.select('.main-background')
    r.style('height', h)
    r.style('width', w)
  }

  private getCanvasSize(): { height: number, width: number } {
    let s: d3.Selection<Element, {}, HTMLElement, any> = d3.select('.main-svg')
    return {
      height: s.node().clientHeight,
      width: s.node().clientWidth
    }
  }
}

export class ActiveComponent implements angular.IComponentOptions {
    public template: any = require('./active.pug')()
    public controller: any = ActiveComponentController
}

angular.module('fibra.components.active', ['ui.bootstrap', 'fibra.services.search-service'])
  .component('active', new ActiveComponent())
