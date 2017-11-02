'use strict'
import { IItemState } from 'reducers/frontend/active';
import * as angular from 'angular';
import { ProjectService } from 'services/project-service/project-service'
import { ProjectActionService } from 'actions/project';
import ActiveActions from 'actions/active';
import { INgRedux } from 'ng-redux'
import { Dispatch } from 'redux'
import * as d3 from 'd3';
import { SearchService, AutocompletionResult } from 'services/search-service'
import { IActiveActions } from 'actions/active'
import { ProjectState } from 'reducers/frontend/project'
import { IRootState } from 'reducers'
import { IActiveState } from 'reducers/frontend/active'
import 'angular-drag-drop';
import 'angular-ui-grid';
import cmenu from 'circular-menu';

interface IActiveComponentControllerState extends IActiveActions {
  project: ProjectState
  active: IActiveState
}

export class ActiveComponentController {

  private state: IActiveComponentControllerState = <IActiveComponentControllerState>{}

  private radiusInitial: number = 1
  private radius: number = 8
  private radiusBounce: number = 15
  private nodeSearchTopOffset: number = 39
  private circularMenuTopOffset: number = 55
  private currentlyAdding: boolean = false

  private menu: any

  private nodeSearch: d3.Selection<Element, {}, HTMLElement, any>
  private nodeSearchSelected: string|{}
  private nodeSearchOffsetTop: number
  private nodeSearchOffsetLeft: number
  private unsubscribe: () => void

  /* @ngInject */
  constructor(private projectActionService: ProjectActionService,
              private $scope: angular.IScope,
              private $q: angular.IQService,
              private $ngRedux: INgRedux,
              private searchService: SearchService) {
    this.unsubscribe = $ngRedux.connect(
      (state: IRootState) => {
        return {
          project: state.frontend.project,
          active: state.frontend.active
        }
      },
      ActiveActions)(this.state)
  }

  public $onDestroy(): void {
    this.unsubscribe()
  }

  private $postLink(): void {
    this.buildCanvas()

    this.nodeSearch = d3.select('.node-search')

    console.log(cmenu)

    this.menu = cmenu('#circle-menu')
      .config({
        background: '#FFFFFF',
        backgroundHover: '#DDDDDD',
        diameter: 150,
        menus: [{
          title: 'E'
        }, {
          title: 'C'
        }, {
          title: 'D'
        }, {
          title: '?'
        }, {
          title: 'T'
        }]
      });

    this.updateCanvas()
  }

  private buildCanvas(): void {
    let s: d3.Selection<Element, {}, HTMLElement, any> = d3.select('.main-svg')
    let g: d3.Selection<Element, {}, HTMLElement, any> = s.select('.main-g')

    let r: d3.Selection<SVGRectElement, {}, HTMLElement, any> = g.select<SVGRectElement>('rect')
      .on('click', this.canvasClick.bind(this, g))

    this.updateCanvasSize()

  }

  private canvasClick(sel: d3.Selection<SVGGElement, {}, HTMLElement, any>): void {
    this.$scope.$apply(() => {
      if (!this.currentlyAdding) {
        this.nodeSearchOffsetTop = d3.event.offsetY
        this.nodeSearchOffsetLeft = d3.event.offsetX
        this.appendNode(sel, this.nodeSearchOffsetTop, this.nodeSearchOffsetLeft, 'addition-node')
        this.nodeSearch
          .style('top', d3.event.offsetY + this.nodeSearchTopOffset + 'px')
        if (this.getCanvasSize().width - (d3.event.offsetX + (this.state.active.dividerPercent / 100 * window.innerWidth)) > 350 + 30) {
          this.nodeSearch.style('left', d3.event.offsetX + (this.state.active.dividerPercent / 100 * window.innerWidth) + 30 + 'px')
        } else {
          this.nodeSearch.style('left', d3.event.offsetX + (this.state.active.dividerPercent / 100 * window.innerWidth) - 30 - 350 + 'px')
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

  private nodeSearchResults(searchValue: string): angular.IPromise<AutocompletionResult[]> {
    return this.searchService.searchSources(searchValue)
  }

  private nodeSearchSelect($item, $model, $label, $event): void {
    let item: IItemState = {
      id: $item.id,
      description: $item.description,
      topOffset: this.nodeSearchOffsetTop,
      leftOffset: this.nodeSearchOffsetLeft
    }

    this.state.addItemToCurrentLayout(item).then(() => {
        this.updateCanvas()
        this.$scope.$apply(this.nodeSearchRemove.bind(this))
      }
    )

    this.projectActionService.setActiveItemCount(this.state.active.activeLayout.items.length)
  }

  private nodeClick(d: IItemState, groups: SVGCircleElement[]): void {
    this.menu.show([d.leftOffset, d.topOffset + this.circularMenuTopOffset])
    console.log(d3.event)
  }

  private appendNode(sel: d3.Selection<SVGGElement, any, HTMLElement, any>, top: number, left: number, clss: string): d3.Selection<SVGGElement, IItemState, Element, {}> {
    let g: d3.Selection<SVGGElement, IItemState, Element, {}> = sel.append<SVGGElement>('g')
      .classed('node', true)
      .classed(clss, true)
      .attr('transform', 'translate(' + left + ',' + top + ')')

    let c: d3.Selection<SVGCircleElement, IItemState, Element, {}> = g.append<SVGCircleElement>('circle')
      .classed('node-circle', true)
      .attr('r', this.radiusInitial + 'px')

    c.transition()
        .attr('r', this.radiusBounce + 'px')
      .transition()
      .attr('r', this.radius + 'px')

    return g
  }

  private maintainNode(sel: d3.Selection<SVGGElement, IItemState, Element, {}>, top: number, left: number): d3.Selection<SVGGElement, IItemState, Element, {}> {
    sel.attr('transform', 'translate(' + top + ',' + left + ')')
    sel.select('circle').transition().attr('r', this.radius + 'px')
    return sel
  }

  private updateCanvas(): void {
    let s: d3.Selection<Element, {}, HTMLElement, any> = d3.select('.main-svg')
    let g: d3.Selection<Element, {}, HTMLElement, any> = s.select('.main-g')
    let itemG: d3.Selection<SVGGElement, {}, HTMLElement, any> = g.select('.main-g-items')
    let ctrl: this = this

    let itemSelection: d3.Selection<SVGGElement, IItemState, Element, {}> = itemG.selectAll<SVGGElement, {}>('.item-node')
      .data(this.state.active.activeLayout.items, (it: IItemState) => {
        return it.id;
      })

    let enterSel: d3.Selection<SVGGElement, IItemState, Element, {}> = itemSelection.enter()
      .append<SVGGElement>('g')
      .classed('node', true)
      .classed('item-node', true)
      .attr('transform', (d) => { return 'translate(' + d.leftOffset + ',' + d.topOffset + ')' })

    enterSel.append<SVGCircleElement>('circle')
      .classed('node-circle', true)
      .on('click', (d: IItemState, i: number, groups: SVGCircleElement[]) => {
        this.nodeClick(d, groups)
      })

    itemSelection = itemSelection.merge(enterSel)

    itemSelection.each((datum, i) => {
      ctrl.maintainNode(d3.select(itemSelection.nodes()[i]), datum.leftOffset, datum.topOffset)
    })

    // itemSelection
    //   .attr('transform', d => 'translate(' + d.xpos + ',' + d.ypos + ')')

    // itemSelection.selectAll('circle')
    //   .attr('r', '5px')
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

  private dragDivider(evt: DragEvent): void {
    let nativePercent: number = 100 * evt.clientX / window.innerWidth
    this.state.setActiveDividerPercentage(nativePercent > 98 ? 100 : nativePercent < 2 ? 0 : nativePercent)
  }

  private tableWidthStyle(): {} {
    return { 'width': this.state.active.dividerPercent + '%' }
  }

  private canvasWidthStyle(): {} {
    return { 'width': (100 - this.state.active.dividerPercent) + '%', 'left': this.state.active.dividerPercent + '%' }
  }

  private dragTabLeftStyle(): {} {
    return { 'left': this.state.active.dividerPercent + '%' }
  }
}

export class ActiveComponent implements angular.IComponentOptions {
    public template: any = require('./active.pug')()
    public controller: any = ActiveComponentController
}

angular.module('fibra.components.active', ['ui.bootstrap', 'fibra.actions.project', 'fibra.services.search-service', 'filearts.dragDrop', 'ui.grid', 'ui.grid.autoResize'])
  .component('active', new ActiveComponent())
