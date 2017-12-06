'use strict'
import { ILiteral } from '../../models/rdfjs';
import { ActiveActionService } from '../../actions/active';
import { Class, IClass, IProperty, Property } from '../../services/project-service/data-model';
import { CNode, DataFactory, NamedNode, ONodeSet, RDF, SKOS } from '../../models/rdf';
import { IFullItemState } from '../../reducers/active';
import { AutocompletionResults, Result, SparqlAutocompleteService, ResultGroup } from '../../services/sparql-autocomplete-service';
import { SparqlItemService, PropertyToValues } from '../../services/sparql-item-service';
import * as angular from 'angular';
import { ProjectService } from 'services/project-service/project-service'
import { ProjectActionService } from 'actions/project';
import { IFibraNgRedux } from 'reducers'
import { Dispatch } from 'redux'
import * as d3 from 'd3';
import { ProjectState } from 'reducers/project'
import { IRootState } from 'reducers'
import { IActiveState } from 'reducers/active'
import 'angular-drag-drop';
import 'angular-ui-grid';
import 'angular-bootstrap-toggle/dist/angular-bootstrap-toggle.js';
import cmenu from 'circular-menu';
import { IModalService } from 'angular-ui-bootstrap'
import { BaseType } from 'd3';
import { HIDE_ITEM } from 'actions/items';

interface IActiveComponentControllerState {
  project: ProjectState
  active: IActiveState
}

export interface ILink {
  source: IFullItemState,
  target: IFullItemState,
  prop: IProperty
}

export class ActiveComponentController {

  private state: IActiveComponentControllerState = <IActiveComponentControllerState>{}

  private radiusInitial: number = 1
  private radius: number = 8
  private radiusBounce: number = 12
  private nodeSearchTopOffset: number = 39
  private nodeSearchTypeaheadHeight: number = 400
  private circularMenuTopOffset: number = 55
  private currentlyAdding: boolean = false

  private menu: any

  private nodeSearch: d3.Selection<Element, {}, HTMLElement, any>
  private nodeSearchTypeahead: d3.Selection<Element, {}, HTMLElement, any>
  private tooltip: d3.Selection<HTMLDivElement, {}, HTMLElement, undefined>
  private nodeSearchSelected: string|{}
  private nodeSearchOffsetTop: number
  private nodeSearchOffsetLeft: number
  private unsubscribe: () => void

  private dragOrigX: number
  private dragOrigY: number

  private currentMenuItem: IFullItemState

  private oldActiveLayoutItemState: IFullItemState[]

  private viewOptionsPopoverVisible: boolean = false
  private layerPopoverVisible: boolean = false
  private snapshotsPopoverVisible: boolean = false
  private layoutsPopoverVisible: boolean = false

  private viewOptionsShowLabels: boolean = false
  private viewOptionsShowLinks: boolean = true
  private viewOptionsShowLinkLabels: boolean = false
  private gridOptions: {} = {}

  private linkMode: boolean = false
  private linkEndFunction: (d: IFullItemState) => void

  private gridApis: any = {}

  /* @ngInject */
  constructor(private projectActionService: ProjectActionService,
              private activeActionService: ActiveActionService,
              private $scope: angular.IScope,
              private $q: angular.IQService,
              private $ngRedux: IFibraNgRedux,
              private $uibModal: IModalService,
              private $timeout: angular.ITimeoutService,
              private sparqlAutocompleteService: SparqlAutocompleteService,
              private $document: angular.IDocumentService) {
    this.unsubscribe = $ngRedux.connect(
      (state: IRootState) => {
        return {
          project: state.project,
          active: state.active
        }
      },
      null)(this.state)
  }

  public $onDestroy(): void {
    this.unsubscribe()
  }

  private $postLink(): void {
    this.buildCanvas()

    this.nodeSearch = d3.select('.node-search')

    this.menu = cmenu('#circle-menu').config({
      background: '#ffffff',
      backgroundHover: '#fafafa',
      diameter: 160,
      menus: [{
        icon: 'link-icon',
        click: () => {
          this.linkNode(this.currentMenuItem)
        }
      }, {
        icon: 'properties-icon'
      }, {
        icon: 'expand-icon',
        click: () => {
          this.buildAndDisplayPropertiesMenu(this.currentMenuItem)
        }
      }, {
        icon: 'reconcile-icon'
      }, {
        icon: 'remove-icon',
        click: () => {
          this.activeActionService.deleteItemFromCurrentLayout(this.currentMenuItem)
          this.updateCanvas()
        }
      }]
    })

    this.$ngRedux.subscribe(() => {
      if (this.oldActiveLayoutItemState !== this.state.active.activeLayout.items) {
        this.oldActiveLayoutItemState = this.state.active.activeLayout.items
        this.updateCanvas()
        this.setGridOptions()
      }
    })

    this.updateCanvas()
  }

  private linkNode(item: IFullItemState): void {
    let s: d3.Selection<Element, {}, HTMLElement, any> = d3.select('.main-svg')
    let g: d3.Selection<Element, {}, HTMLElement, any> = s.select('.main-g')
    let link: d3.Selection<SVGElement, {}, HTMLElement, any> = g.append<SVGGElement>('g')
      .classed('link', true)
      .classed('item-link', true)

    let line = link.append('line')
      .classed('link-line', true)

    this.linkMode = true
    this.linkEndFunction = (i: IFullItemState) => {
      this.activeActionService.addLink(item, i)
      link.remove()
    }

    d3.select('.main-background')
      .on('mousemove', (d, i: number, grp) => {
        line.attr('x1', item.leftOffset)
        line.attr('y1', item.topOffset)
        line.attr('x2', d3.event.offsetX)
        line.attr('y2', d3.event.offsetY)
      })
  }

  private buildAndDisplayPropertiesMenu(item: IFullItemState): void {
    let modalInstance: any = this.$uibModal.open({
      animation: true,
      component: 'expandModal',
      resolve: {
        item: function(): IFullItemState { return item }
      }
    });
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
      this.menu.hide()

      if (!this.currentlyAdding) {
        this.nodeSearchOffsetTop = d3.event.offsetY
        this.nodeSearchOffsetLeft = d3.event.offsetX
        this.appendNode(sel, this.nodeSearchOffsetTop, this.nodeSearchOffsetLeft, 'addition-node')
        this.nodeSearch
          .style('top', d3.event.offsetY + this.nodeSearchTopOffset + 'px')
        if (this.getCanvasSize().width - (d3.event.offsetX + (this.state.active.dividerPercent / 100 * window.innerWidth)) > 250 + 30) {
          this.nodeSearch.style('left', d3.event.offsetX + (this.state.active.dividerPercent / 100 * window.innerWidth) + 30 + 'px')
        } else {
          this.nodeSearch.style('left', d3.event.offsetX + (this.state.active.dividerPercent / 100 * window.innerWidth) - 30 - 250 + 'px')
        }

        this.nodeSearchTypeahead = d3.select('.custom-popup-wrapper')
        if (window.innerHeight - d3.event.offsetY < this.nodeSearchTypeaheadHeight) {
          this.nodeSearchTypeahead.style('max-height', (window.innerHeight - d3.event.offsetY - 100) + 'px')
        } else {
          this.nodeSearchTypeahead.style('max-height', this.nodeSearchTypeaheadHeight + 'px')
        }

        this.$timeout(250).then(() => {
          this.nodeSearch.select<HTMLInputElement>('input').node().focus()
        })
      }

      this.currentlyAdding = true

    })
  }

  private nodeSearchRemove(): void {
    d3.select('.addition-node').remove()
    this.currentlyAdding = false
    this.nodeSearchSelected = ''
  }

  private nodeSearchResults(searchValue: string): angular.IPromise<Result[]> {
    // return this.searchService.searchSources(searchValue)
    return this.sparqlAutocompleteService.autocomplete(searchValue, 20, true).then(ret => this.processResults(ret), null, ret => {
      if (ret.results) this.processResults(ret.results)
    })
  }

  private processResults(res: AutocompletionResults): Result[] {



    let activeItemIds: string[] = this.$ngRedux.getState().active.activeLayout.items.map((d: IFullItemState) => d.ids.map((i) => i.value)).reduce((a, b) => a.concat(b), [])
    let ret: Result[] = []
    let processMatchingResults: (results: ResultGroup, classRestrict: boolean) => void = (results, classRestrict) => results.results.forEach(r => {
      if (activeItemIds.indexOf(r.ids[0].value) === -1 && r.additionalInformation.type && r.additionalInformation.type[0]
      // Class filter (TODO: Move server-side)
      && (!classRestrict || r.datasources.reduce(
          (p, c) => {
            return (this.$ngRedux.getState().project.project.sourceClassSettings[c]
              && this.$ngRedux.getState().project.project.sourceClassSettings[c][r.additionalInformation.type[0].value]) || p
          },
          false))) {
        r.additionalInformation.typeDescriptions = this.state.project.project.dataModel.classMap.get(r.additionalInformation.type[0].value).labels.values()
        r.additionalInformation.dataSourceDescriptions = this.state.project.project.authorityEndpoints.concat(this.state.project.project.archiveEndpoints)
          .filter((ae) => r.datasources.filter((rd) => ae.id === rd ).length > 0)
          .map((ae) => ae.labels.find(la => la.language === 'en'))
        ret.push(r)
      }
    })
    res.localMatchingResults.forEach((results) => processMatchingResults(results, false))
    res.remoteResults.forEach((results) => processMatchingResults(results, true))
    return ret
  }

  private nodeSearchLabel(res: Result): string {
    return res ? res.matchedLabel.value === res.prefLabel.value ?
      res.matchedLabel.value :
      res.matchedLabel.value + ' (' + res.prefLabel.value + ')' : ''
  }

  private nodeSearchSelect($item: Result, $model, $label, $event): void {
    let item: IFullItemState = {
      ids: $item.ids,
      item: null,
      description: $item.prefLabel.value,
      topOffset: this.nodeSearchOffsetTop,
      leftOffset: this.nodeSearchOffsetLeft
    }

    this.activeActionService.addItemToCurrentLayout(item)
    // this.updateCanvas()
    // this.$scope.$apply(this.nodeSearchRemove.bind(this))
    this.nodeSearchRemove()

    this.projectActionService.setActiveItemCount(this.state.active.activeLayout.items.length)
  }

  private addColdNode(query: string): void {
    this.nodeSearchRemove()
    let item: IFullItemState = {
      ids: [],
      item: null,
      description: query,
      topOffset: this.nodeSearchOffsetTop,
      leftOffset: this.nodeSearchOffsetLeft
    }

    this.activeActionService.createNewItem(item)
  }

  private sanitizeId(id: string): string {
    return id.replace(/\/|\:|\.|\(|\)|\%|\#|\+|\_/g, '')
  }

  private nodeClick(d: IFullItemState, groups: SVGCircleElement[]): void {
    this.currentMenuItem = d
    d3.select('#' + this.sanitizeId(d.ids[0].value)).style('opacity', '0')
    this.menu.hide()
    this.menu.show(this.getMenuPosition(d))
  }

  private getMenuPosition(itemState: IFullItemState): [number, number] {
    return [
      itemState.leftOffset + (this.state.active.dividerPercent / 100 * window.innerWidth),
      itemState.topOffset + this.circularMenuTopOffset
    ]
  }

  private showTooltips(): void {
    d3.selectAll<HTMLDivElement, {}>('.tooltips > .active-tooltip')
      .style('top', (d: IFullItemState, i, grp) => (d.topOffset + 43) + 'px' )
      .style('left', (d: IFullItemState, i, grp) => (d.leftOffset + (this.state.active.dividerPercent / 100 * window.innerWidth) + 17) + 'px' )
      .style('opacity', '1')
      .text((d: IFullItemState) => d.description ? d.description : 'Loading...')
  }

  private hideTooltips(): void {
    d3.selectAll<HTMLDivElement, {}>('.tooltips > .active-tooltip')
      .style('opacity', '0')
  }

  private getLinkSelNode(link: ILink): SVGGElement {
    return d3.select<SVGGElement, ILink>('#link-' + this.sanitizeId(link.source.ids[0].value + link.target.ids[0].value + link.prop.value)).node()
  }

  private showLinkTooltips(): void {
    d3.selectAll<HTMLDivElement, {}>('.link-tooltips > .active-tooltip')
      .style('top', (link: ILink, i, grp) => (this.getLinkSelNode(link).getBoundingClientRect().top + this.getLinkSelNode(link).getBoundingClientRect().height / 2 - 10 ) + 'px')
      .style('left', (link: ILink, i, grp) => (this.getLinkSelNode(link).getBoundingClientRect().left + this.getLinkSelNode(link).getBoundingClientRect().width / 2) + 'px')
      .style('opacity', '1')
      .text((link: ILink, i, grp) => link.prop.labels.values()[0] ? link.prop.labels.values()[0].value : 'Loading...')
  }

  private hideLinkTooltips(): void {
    d3.selectAll<HTMLDivElement, {}>('.link-tooltips > .active-tooltip')
      .style('opacity', '0')
  }

  private appendNode(sel: d3.Selection<SVGGElement, any, HTMLElement, any>, top: number, left: number, clss: string): d3.Selection<SVGGElement, IFullItemState, Element, {}> {
    let g: d3.Selection<SVGGElement, IFullItemState, Element, {}> = sel.append<SVGGElement>('g')
      .classed('node', true)
      .classed(clss, true)
      .attr('transform', 'translate(' + left + ',' + top + ')')

    let c: d3.Selection<SVGCircleElement, IFullItemState, Element, {}> = g.append<SVGCircleElement>('circle')
      .classed('node-circle', true)
      .attr('r', this.radiusInitial + 'px')

    c.transition()
        .attr('r', this.radiusBounce + 'px')
      .transition()
      .attr('r', this.radius + 'px')

    return g
  }

  private maintainNode(sel: d3.Selection<SVGGElement, IFullItemState, Element, {}>, top: number, left: number): d3.Selection<SVGGElement, IFullItemState, Element, {}> {
    sel.attr('transform', 'translate(' + top + ',' + left + ')')
    sel.select('circle')
      .classed('loading', (d): boolean => {
        return d.item === null
      })
      .transition().attr('r', this.radius + 'px')
    return sel
  }

  private calculateLinks(): ILink[] {
    let activeItemValues: string[] = this.state.active.activeLayout.items.filter(i => i.item).map(i => i.item.value)
    let links: ILink[] = []

    this.state.active.activeLayout.items.filter(i => i.item).forEach(i => {
      i.item.localProperties.concat(i.item.remoteProperties).forEach(p => {
        p.values.forEach(v => {
          if (activeItemValues.indexOf(v.value.value) !== -1 && v.value.value !== i.item.value) {
            links.push({
              source: i,
              target: this.state.active.activeLayout.items[activeItemValues.indexOf(v.value.value)],
              prop: p.property
            })
          }
        })
      })
    })

    return links
  }

  private updateCanvas(): void {
    let s: d3.Selection<Element, {}, HTMLElement, any> = d3.select('.main-svg')
    let g: d3.Selection<Element, {}, HTMLElement, any> = s.select('.main-g')
    let itemG: d3.Selection<SVGGElement, {}, HTMLElement, any> = g.select('.main-g-items')
    let linkG: d3.Selection<SVGGElement, {}, HTMLElement, any> = g.select('.main-g-links')
    let ctrl: this = this

    let linkSelection: d3.Selection<SVGGElement, ILink, Element, {}> = linkG.selectAll<SVGGElement, {}>('.item-link')
      .data(this.calculateLinks(), (link: ILink) => {
        return link.source.ids[0].value + link.target.ids[0].value + link.prop.value
      })

    linkSelection.exit().remove()

    let linkEnterSel: d3.Selection<SVGGElement, ILink, Element, {}> = linkSelection.enter()
      .append<SVGGElement>('g')
      .attr('id', (link: ILink) => 'link-' + this.sanitizeId(link.source.ids[0].value + link.target.ids[0].value + link.prop.value))
      .classed('link', true)
      .classed('item-link', true)

    linkEnterSel.append<SVGLineElement>('line')
      .classed('link-line', true)
      .on('mouseenter', (link: ILink, i: number, grp: SVGLineElement[]) => {
        d3.select('#' + this.sanitizeId(link.source.ids[0].value + link.target.ids[0].value + link.prop.value))
          .style('top', (grp[i].getBoundingClientRect().top + grp[i].getBoundingClientRect().height / 2 - 10 ) + 'px')
          .style('left', (grp[i].getBoundingClientRect().left + grp[i].getBoundingClientRect().width / 2) + 'px')
          .style('opacity', '1')
          .text(link.prop.labels.values()[0] ? link.prop.labels.values()[0].value : 'Loading...')
      })
      .on('mouseout', (link: ILink, i: number) => {
        if (!this.viewOptionsShowLinkLabels) {
          d3.select('#' + this.sanitizeId(link.source.ids[0].value + link.target.ids[0].value + link.prop.value)).style('opacity', '0')
        }
      })

    linkSelection = linkSelection.merge(linkEnterSel)

    linkSelection
      .attr('transform', (d) => { return 'translate(' + d.source.leftOffset + ',' + d.source.topOffset + ')' })
      .style('opacity', this.viewOptionsShowLinks ? '1' : '0')

    linkSelection
      .select('line')
        .attr('x1', d => 0 + 'px' )
        .attr('y1', d => 0 + 'px' )
        .attr('x2', d => ( d.target.leftOffset - d.source.leftOffset ) + 'px' )
        .attr('y2', d => ( d.target.topOffset - d.source.topOffset ) + 'px' )

    let linkTooltipSelection: d3.Selection<HTMLDivElement, ILink, BaseType, {}> = d3.select('.link-tooltips')
      .selectAll<HTMLDivElement, {}>('.active-tooltip')
      .data(this.calculateLinks(), (link: ILink) => {
        return link.source.ids[0].value + link.target.ids[0].value + link.prop.value
      })

    linkTooltipSelection.exit().remove()
    linkTooltipSelection.enter()
      .append('div')
        .classed('active-tooltip', true)
        .attr('id', (link) => this.sanitizeId(link.source.ids[0].value + link.target.ids[0].value + link.prop.value))

    let itemSelection: d3.Selection<SVGGElement, IFullItemState, Element, {}> = itemG.selectAll<SVGGElement, {}>('.item-node')
      .data(this.state.active.activeLayout.items, (it: IFullItemState) => {
        return it.ids[0].value;
      })

    itemSelection.exit().remove()

    let tooltipSelection: d3.Selection<HTMLDivElement, IFullItemState, BaseType, {}> = d3.select('.tooltips')
      .selectAll<HTMLDivElement, {}>('.active-tooltip')
      .data<IFullItemState>(this.state.active.activeLayout.items, (it: IFullItemState) => {
        return it.ids[0].value;
      })

    tooltipSelection.exit().remove()
    tooltipSelection.enter()
      .append('div')
        .classed('active-tooltip', true)
        .attr('id', (it) => this.sanitizeId(it.ids[0].value))

    let enterSel: d3.Selection<SVGGElement, IFullItemState, Element, {}> = itemSelection.enter()
      .append<SVGGElement>('g')
      .classed('node', true)
      .classed('item-node', true)
      .attr('transform', (d) => { return 'translate(' + d.leftOffset + ',' + d.topOffset + ')' })

    enterSel.append<SVGCircleElement>('circle')
      .classed('node-circle', true)
      .on('click', (d: IFullItemState, i: number, groups: SVGCircleElement[]) => {
        if(this.linkMode) {
          this.linkEndFunction(d)
          this.linkMode = false
        } else {
          this.nodeClick(d, groups)
        }
      })
      .on('mouseenter', (d: IFullItemState, i: number, grp: SVGCircleElement[]) => {
        if (d.item && !this.dragOrigX) {
          d3.select('#' + this.sanitizeId(d.ids[0].value)).style('top', (grp[i].getBoundingClientRect().top - 5) + 'px')
          .style('left', (grp[i].getBoundingClientRect().left + 25) + 'px')
          .style('opacity', '1')
          .text(d.description)
        } else if (!this.dragOrigX) {
          d3.select('#' + this.sanitizeId(d.ids[0].value)).style('top', (grp[i].getBoundingClientRect().top - 5) + 'px')
          .style('left', (grp[i].getBoundingClientRect().left + 25) + 'px')
          .style('opacity', '1')
          .text('Loading...')
        }
      })
      .on('mouseout', (d: IFullItemState, i: number) => {
        if (!this.viewOptionsShowLabels) {
          d3.select('#' + this.sanitizeId(d.ids[0].value)).style('opacity', '0')
        }
      })
      .call(d3.drag()
        .on('start', (d: IFullItemState, i: number) => {
          d3.select('#' + this.sanitizeId(d.ids[0].value)).style('opacity', '0')
          this.dragOrigX = d.leftOffset
          this.dragOrigY = d.topOffset
        })
        .on('drag', (d: IFullItemState, i: number, group) => {
          // TODO: implement change to offsets using actions and reducers
          d.leftOffset = d3.event.x + this.dragOrigX
          d.topOffset = d3.event.y + this.dragOrigY
          if (d.topOffset < 20) { d.topOffset = 20 }
          if (d.topOffset > window.innerHeight - 75) { d.topOffset = window.innerHeight - 75 }
          if (d.leftOffset < 20) { d.leftOffset = 20 }
          if (d.leftOffset > window.innerWidth - 20) { d.leftOffset = window.innerWidth - 20 }
          this.dragOrigX = d.leftOffset
          this.dragOrigY = d.topOffset
          this.updateCanvas()
        })
        .on('end',  (d: IFullItemState, i: number, group) => {
          // TODO: implement change to offsets using actions and reducers
          d.leftOffset = d3.event.x + this.dragOrigX
          d.topOffset = d3.event.y + this.dragOrigY
          if (d.topOffset < 20) { d.topOffset = 20 }
          if (d.topOffset > window.innerHeight - 75) { d.topOffset = window.innerHeight - 75 }
          if (d.leftOffset < 20) { d.leftOffset = 20 }
          if (d.leftOffset > window.innerWidth - 20) { d.leftOffset = window.innerWidth - 20 }
          this.dragOrigX = null
          this.dragOrigY = null
          this.updateCanvas()
          this.activeActionService.moveItemOnCurrentLayout()
        }))

    itemSelection = itemSelection.merge(enterSel)

    itemSelection.each((datum, i) => {
      ctrl.maintainNode(d3.select(itemSelection.nodes()[i]), datum.leftOffset, datum.topOffset)
    })

    if (this.viewOptionsShowLabels) this.showTooltips()
    if (this.viewOptionsShowLinkLabels) this.showLinkTooltips()

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
    this.menu.hide()
    let nativePercent: number = 100 * evt.clientX / window.innerWidth
    this.activeActionService.setActiveDividerPercentage(nativePercent > 98 ? 100 : nativePercent < 2 ? 0 : nativePercent)
    this.$timeout(0).then(() => d3.values(this.gridApis).forEach((gapi) => gapi.core.handleWindowResize()))
    if (this.viewOptionsShowLabels) this.showTooltips()
    if (this.viewOptionsShowLinkLabels) this.$timeout(0).then(() => this.showLinkTooltips())
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

  private allClasses(): IClass[] {
    if(this.$ngRedux.getState().project.project) {
      return d3.keys(this.$ngRedux.getState().project.project.sourceClassSettings).reduce(
        (a, b) => {
          let sourceClasses: string[] = d3.keys(this.$ngRedux.getState().project.project.sourceClassSettings[b])
            .filter(k => this.$ngRedux.getState().project.project.sourceClassSettings[b][k])
            .filter(k => a.indexOf(k) === -1)
          return a.concat(sourceClasses)
        },
        []).map(c => this.state.project.project ? this.state.project.project.dataModel.classMap.get(c) : null)
          .filter(c => c)
    } else {
      return []
    }
  }

  private allClassesFiltered(filterString: string): IClass[] {
    return filterString ? this.state.project.project.dataModel.classMap.values().filter((c) => {
      return c.labels.find((l) => l.value.toLowerCase().indexOf(filterString.toLowerCase()) !== -1)
    }) : null
  }

  private setGridOptions(): void {
    let generatedColumns: Map<string, string[]> = new Map()
    let generatedColumnLabels: Map<string, ONodeSet<ILiteral>[]> = new Map()

    let data: {}[] = this.state.active.activeLayout.items.map((item) => {
      let obj: {} = {}
      let typeProp: PropertyToValues = item.item ? item.item.localProperties.concat(item.item.remoteProperties).filter(p => p.property.value === RDF.type.value)[0] : null
      obj['id'] = item.ids[0].value
      obj['description'] = item.description
      obj['types'] = typeProp ? typeProp.values : []

      if(item.item) {
        item.item.localProperties.concat(item.item.remoteProperties).forEach((p) => {
          let propValue = p.values.map((v) => {
            return v.value.labels.values && v.value.labels.values() && v.value.labels.values()[0] ?
              v.value.labels.values()[0].value :
              // v.value.labels.values ?
                // v.value.labels.values[0] :
                v.value.value
          }).join(',')
          obj[this.sanitizeId(p.property.value)] = propValue
          if(typeProp) {
            typeProp.values.forEach(v => {
              if(!generatedColumns.has(v.value.value)) {
                generatedColumns.set(v.value.value, [])
                generatedColumnLabels.set(v.value.value, [])
              }
              if(generatedColumns.get(v.value.value).indexOf(p.property.value) === -1 && p.property.value !== RDF.type.value && p.property.value !== SKOS.prefLabel.value) {
                generatedColumns.get(v.value.value).push(p.property.value)
                generatedColumnLabels.get(v.value.value).push(p.property.labels)
              }
            })
          }
        })
      }
      return obj
    })

    this.allClasses().forEach((c) => {
      let columnDefs: {}[] = [
        {
          field: 'id',
          name: 'id',
          cellTemplate: '<div class="ui-grid-cell-contents"><a href="{{row.entity.id}}" target="_blank">{{row.entity.id}}</a></div>',
          width: 200
        },
        {
          field: 'description',
          name: 'description',
          width: 200
        }
      ]

      if(generatedColumns.has(c.value)) {
        generatedColumns.get(c.value).forEach((col, i) => {
          columnDefs.push({
            name: col,
            field: this.sanitizeId(col),
            displayName: generatedColumnLabels.get(c.value)[i].values && generatedColumnLabels.get(c.value)[i].values()[0] ? generatedColumnLabels.get(c.value)[i].values()[0].value : '',
            width: 200
          })
        })
      }

      this.gridOptions[c.value] = {
        data: [{}].concat(data.filter((d) => { return d['types'] ? d['types'].map(v => v.value.value).indexOf(c.value) !== -1 : false })),
        enableFiltering: true,
        columnDefs: columnDefs,
        onRegisterApi: (gridApi) => {
          //set gridApi on scope
          this.gridApis[c.value] = gridApi
          gridApi.edit.on.afterCellEdit(this.$scope, (rowEntity, colDef, newValue, oldValue) => {
            console.log(rowEntity, colDef, newValue, oldValue)
            this.$scope.$apply();
          })
        }
      }
    })

    console.log(this.gridOptions)
  }
}

export class ActiveComponent implements angular.IComponentOptions {
    public template: any = require('./active.pug')()
    public controller: any = ActiveComponentController
}

angular.module('fibra.components.active', ['ui.bootstrap', 'fibra.actions.project', 'filearts.dragDrop', 'ui.grid', 'ui.grid.emptyBaseLayer', 'ui.grid.resizeColumns', 'ui.grid.edit', 'ui.toggle'])
  .component('active', new ActiveComponent())
