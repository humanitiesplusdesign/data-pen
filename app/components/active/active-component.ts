'use strict'
import { ILayoutState, IItemState } from '../../services/project-service/project';
import { ILiteral } from '../../models/rdfjs';
import { ActiveActionService } from '../../actions/active';
import { Class, IClass, IProperty, Property } from '../../services/project-service/data-model';
import { CNode, DataFactory, NamedNode, ONodeSet, RDF, SKOS, OWL } from '../../models/rdf';
import { IFullItemState, IFullLayoutState } from '../../reducers/active';
import { AutocompletionResults, Result, SparqlAutocompleteService, ResultGroup } from '../../services/sparql-autocomplete-service';
import { SparqlItemService, PropertyToValues, IRichPropertyValue } from '../../services/sparql-item-service';
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
import 'angular-ui-sortable';
import 'angular-file-saver';
import cmenu from 'circular-menu';
import { IModalService } from 'angular-ui-bootstrap'
import { BaseType, descending } from 'd3';
import { HIDE_ITEM } from 'actions/items';
import { getPrefLangString } from 'filters/preferred-language-filter';
import { GeneralState } from 'reducers/general';
import 'ng-focus-if';
import { generateAcronym } from 'filters/make-acronym-filter';

declare function unescape(s: string): string;

interface IActiveComponentControllerState {
  project: ProjectState
  active: IActiveState
  general: GeneralState
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
  private radii: number[] = [14, 11, 8, 5, 2]
  private radiusBounce: number = 4
  private nodeSearchTopOffset: number = 39
  private nodeSearchTypeaheadHeight: number = 400
  private circularMenuTopOffset: number = 55
  private currentlyAdding: boolean = false

  private menu: any
  private menuItems: any
  private menuTooltip: d3.Selection<Element, {}, HTMLElement, any>
  private menuOperation: string = ''

  private multiMenu: any
  private multiMenuItems: any

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
  private currentMultiMenuItem: IFullItemState
  private circleMenuVisible: boolean
  private circleMultiMenuVisible: boolean

  private oldActiveLayoutItemState: IFullItemState[]

  private viewOptionsPopoverVisible: boolean = false
  private layerPopoverVisible: boolean = false
  private snapshotsPopoverVisible: boolean = false
  private layoutsPopoverVisible: boolean = false

  private viewOptionsShowLabels: boolean = false
  private viewOptionsShowLinks: boolean = true
  private viewOptionsShowLinkLabels: boolean = false
  private gridOptions: {} = {}

  private selectedNodes: IFullItemState[] = []
  private dragSelection: IFullItemState[] = []

  private currentTableClass: IClass = null
  private currentClasses: IClass[] = []

  private showLayerEffect: boolean = false

  private linkMode: boolean = false
  private linkEndFunction: (d?: IFullItemState) => void

  private gridApis: any = {}

  private snapshotEditing: boolean = false

  private lastClickTargetSelected: boolean = false

  /* @ngInject */
  constructor(private projectActionService: ProjectActionService,
              private activeActionService: ActiveActionService,
              private $scope: angular.IScope,
              private $q: angular.IQService,
              private $ngRedux: IFibraNgRedux,
              private $uibModal: IModalService,
              private $timeout: angular.ITimeoutService,
              private FileSaver: any,
              private sparqlAutocompleteService: SparqlAutocompleteService,
              private $document: angular.IDocumentService) {
    this.unsubscribe = $ngRedux.connect(
      (state: IRootState) => {
        return {
          project: state.project,
          active: state.active,
          general: state.general
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
        title: 'Link',
        click: () => {
          this.linkNode(this.currentMenuItem)
        }
      }, {
        icon: 'properties-icon',
        title: 'Properties',
        click: () => {
          this.buildAndDisplayPropertiesMenu([this.currentMenuItem])
        }
      }, {
        icon: 'expand-icon',
        title: 'Expand',
        click: () => {
          this.buildAndDisplayExpandMenu(this.currentMenuItem)
        }
      }, {
        icon: 'reconcile-icon',
        title: 'Reconcile'
      }, {
        icon: 'remove-icon',
        title: 'Remove',
        click: () => {
          this.activeActionService.deleteItemFromCurrentLayout(this.currentMenuItem)
          this.selectedNodes = []
          this.updateCanvas()
        }
      }]
    })

    this.multiMenu = cmenu('#circle-multiMenu').config({
      background: '#ffffff',
      backgroundHover: '#fafafa',
      diameter: 160,
      menus: [{
        icon: 'link-icon',
        title: 'Link',
        click: () => {
          // this.linkNode(this.currentMenuItem)
        }
      }, {
        icon: 'properties-icon',
        title: 'Properties',
        click: () => {
          this.buildAndDisplayPropertiesMenu(this.selectedNodes)
        }
      }, {
        icon: 'invert-icon',
        title: 'Select Inverse',
        click: () => {
          let oldSelection: IItemState[] = this.selectedNodes.slice(0)
          this.selectedNodes = this.state.active.activeLayout.items.filter((i) => {
            return oldSelection.indexOf(i) === -1
          })
          this.$scope.$apply()
          this.updateCanvas()
        }
      }, {
        icon: 'remove-icon',
        title: 'Remove',
        click: () => {
          this.selectedNodes.forEach((i: IFullItemState) => {
            this.activeActionService.deleteItemFromCurrentLayout(i)
          })
          this.$scope.$apply()
          this.selectedNodes = []
          this.updateCanvas()
        }
      }]
    })

    this.menuItems = this.menu._container.childNodes
    this.multiMenuItems = this.multiMenu._container.childNodes
    this.menuTooltip = d3.select('.circle-menu-tooltip')
    this.updateMenuTooltip()

    // Wire up menu to detect hover and update the menuOperation
    d3.select('#circle-menu')
      .select('ul')
      .selectAll('li')
      .on('mouseover', (d, i, g: BaseType[]) => {
        this.menuOperation = d3.select(g[i])
          .select('a')
          .select('div')
          .select('.text')
          .text()
        this.$scope.$apply()
      })
      .on('mouseout', () => {
        this.menuOperation = ''
        this.$scope.$apply()
      })

    d3.select('#circle-multiMenu')
      .select('ul')
      .selectAll('li')
      .on('mouseover', (d, i, g: BaseType[]) => {
        this.menuOperation = d3.select(g[i])
          .select('a')
          .select('div')
          .select('.text')
          .text()
        this.$scope.$apply()
      })
      .on('mouseout', () => {
        this.menuOperation = ''
        this.$scope.$apply()
      })

    this.$ngRedux.subscribe(() => {
      if (this.oldActiveLayoutItemState !== this.state.active.activeLayout.items) {
        this.oldActiveLayoutItemState = this.state.active.activeLayout.items
        this.updateCanvas()
        this.setGridOptions()
      }

      let tempClasses: IClass[] = this.allClasses()
      if (tempClasses.reduce((a, b) => { return a || this.currentClasses.indexOf(b) === -1 }, false) ||
          this.currentClasses.reduce((a, b) => { return a || tempClasses.indexOf(b) === -1 }, false)
      ) {
        tempClasses = tempClasses.sort((a, b) => this.currentClasses.indexOf(a) - this.currentClasses.indexOf(b))
        this.currentClasses = tempClasses
      }
    })

    this.updateCanvas()
    this.currentTableClass = this.allClasses()[0]
    this.currentClasses = this.allClasses()
  }

  private linkNode(item: IFullItemState): void {
    let s: d3.Selection<Element, {}, HTMLElement, any> = d3.select('.main-svg')
    let g: d3.Selection<Element, {}, HTMLElement, any> = s.select('.main-g')
    let link: d3.Selection<SVGElement, {}, HTMLElement, any> = g.append<SVGGElement>('g')
      .classed('link', true)
      .classed('item-link', true)
      .classed('new-link', true)

    let line: d3.Selection<SVGElement, {}, HTMLElement, any> = link.append<SVGLineElement>('line')
      .classed('link-line', true)
      .classed('new-link', true)

    this.linkMode = true
    this.linkEndFunction = (i: IFullItemState) => {
      if (i && i.item) {
        this.activeActionService.addLink(item, i)
      }
      link.remove()
      this.linkMode = false
    }

    d3.select('.main-background')
      .on('mousemove', (d, i: number, grp) => {
        line.attr('x1', item.leftOffset)
        line.attr('y1', item.topOffset)
        line.attr('x2', d3.event.offsetX)
        line.attr('y2', d3.event.offsetY)
      })
  }

  private buildAndDisplayExpandMenu(item: IFullItemState): void {
    let modalInstance: any = this.$uibModal.open({
      animation: true,
      component: 'expandModal',
      resolve: {
        item: function(): IFullItemState { return item }
      }
    });
  }

  private buildAndDisplayPropertiesMenu(items: IFullItemState[]): void {
    let modalInstance: any = this.$uibModal.open({
      animation: true,
      component: 'propertiesModal',
      resolve: {
        items: function(): IFullItemState[] { return items }
      }
    })
  }

  private buildCanvas(): void {
    let s: d3.Selection<Element, {}, HTMLElement, any> = d3.select('.main-svg')
    let g: d3.Selection<Element, {}, HTMLElement, any> = s.select('.main-g')

    let r: d3.Selection<SVGRectElement, {}, HTMLElement, any> = g.select<SVGRectElement>('rect')
      .on('contextmenu', this.canvasClick.bind(this, g))
      .on('click', () => {
        if (this.linkEndFunction) this.linkEndFunction()
      })
      .call(d3.drag()
        .on('start', () => {
          this.$scope.$apply(() => {
            this.menu.hide()
            this.multiMenu.hide()
            this.updateMenuTooltip()
            this.nodeSearchRemove()
            if (!d3.event.sourceEvent.shiftKey) {
              this.selectedNodes = []
            }
            this.updateCanvas()
          })
          d3.select('.main-g')
            .append('rect')
              .classed('selection-rect', true)
        })
        .on('drag', () => {
          if (d3.event.x - d3.event.subject.x < 0) {
            d3.select('.selection-rect')
              .attr('x', d3.event.x)
              .attr('width', d3.event.subject.x - d3.event.x)
          } else {
            d3.select('.selection-rect')
              .attr('x', d3.event.subject.x)
              .attr('width', d3.event.x - d3.event.subject.x)
          }
          if (d3.event.y - d3.event.subject.y < 0) {
            d3.select('.selection-rect')
              .attr('y', d3.event.y)
              .attr('height', d3.event.subject.y - d3.event.y)
          } else {
            d3.select('.selection-rect')
              .attr('y', d3.event.subject.y)
              .attr('height', d3.event.y - d3.event.subject.y)
          }
          this.state.active.activeLayout.items.forEach((i) => {
            if (i.leftOffset > parseInt(d3.select('.selection-rect').attr('x'), 10) &&
                i.leftOffset < parseInt(d3.select('.selection-rect').attr('x'), 10) + parseInt(d3.select('.selection-rect').attr('width'), 10) &&
                i.topOffset > parseInt(d3.select('.selection-rect').attr('y'), 10) &&
                i.topOffset < parseInt(d3.select('.selection-rect').attr('y'), 10) + parseInt(d3.select('.selection-rect').attr('height'), 10) &&
                this.selectedNodes.concat(this.dragSelection).indexOf(i) === -1) {

              this.dragSelection.push(i)
            } else if (
              !( i.leftOffset > parseInt(d3.select('.selection-rect').attr('x'), 10) &&
                i.leftOffset < parseInt(d3.select('.selection-rect').attr('x'), 10) + parseInt(d3.select('.selection-rect').attr('width'), 10) &&
                i.topOffset > parseInt(d3.select('.selection-rect').attr('y'), 10) &&
                i.topOffset < parseInt(d3.select('.selection-rect').attr('y'), 10) + parseInt(d3.select('.selection-rect').attr('height'), 10)) &&
              this.dragSelection.indexOf(i) !== -1
            ) {
              // Outside the current selection box but in the current drag selection, remove it.
              this.dragSelection.splice(this.dragSelection.indexOf(i), 1)
            }
          })
          this.$scope.$apply()
          this.updateCanvas()
        })
        .on('end', () => {
          d3.select('.selection-rect').remove()
          this.dragSelection.forEach(i => this.selectedNodes.push(i))
          this.dragSelection = []
          this.$scope.$apply()
        })
      )

    this.updateCanvasSize()
  }

  private canvasClick(sel: d3.Selection<SVGGElement, {}, HTMLElement, any>): void {
    d3.event.preventDefault()
    this.$scope.$apply(() => {
      this.menu.hide()
      this.multiMenu.hide()
      if (this.linkEndFunction) this.linkEndFunction()
      this.updateMenuTooltip()

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
    return 'f' + id.replace(/\/|\:|\.|\(|\)|\%|\#|\+|\_/g, '')
  }

  private nodeClick(d: IFullItemState, groups: SVGCircleElement[]): void {
    this.currentMenuItem = d
    d3.select('#' + this.sanitizeId(d.ids[0].value)).style('opacity', '0')
    this.menu.hide()
    this.multiMenu.hide()
    if (this.selectedNodes.length > 1 && this.selectedNodes.indexOf(d) !== -1) {
      this.multiMenu.show(this.getMenuPosition(d))
    } else {
      this.menu.show(this.getMenuPosition(d))
    }
    this.updateMenuTooltip(d)
    this.$scope.$apply()
  }

  private getMenuPosition(itemState: IFullItemState): [number, number] {
    return [
      itemState.leftOffset + (this.state.active.dividerPercent / 100 * window.innerWidth),
      itemState.topOffset + this.circularMenuTopOffset
    ]
  }

  private updateMenuTooltip(d?: IFullItemState): void {
    this.circleMenuVisible = document.getElementById('circle-menu').classList.contains('opened-nav')
    this.circleMultiMenuVisible = document.getElementById('circle-multiMenu').classList.contains('opened-nav')
    if (this.circleMenuVisible || this.circleMultiMenuVisible) {
      this.menuTooltip.style('opacity', '1')
      this.menuTooltip.style('left', this.getMenuPosition(d)[0] + 'px')
      this.menuTooltip.style('top', this.getMenuPosition(d)[1] + 95 + 'px')
    } else {
      this.menuTooltip.style('opacity', '0')
    }
  }

  private hideMenuTooltip(): void {
    this.menuTooltip.style('opacity', '0')
  }

  private showTooltips(): void {
    d3.selectAll<HTMLDivElement, {}>('.tooltips > .active-tooltip')
      .style('top', (d: IFullItemState, i, grp) => (d.topOffset + 41) + 'px' )
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
        .attr('r', (this.radiusInitial + this.radiusBounce) + 'px')
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
      .attr('filter', d => this.selectedNodes.concat(this.dragSelection).indexOf(d) !== -1 ? 'url(#drop-shadow)' : '')
      .transition().attr('r', (d): string => {
        if (this.showLayerEffect && d.item && d.item.localProperties.concat(d.item.remoteProperties).find(p => p.property.value === RDF.type.value)) {
          let layerIndex: number = d.item.localProperties.concat(d.item.remoteProperties).find(p => p.property.value === RDF.type.value).values.reduce((a, b) => {
            let foundIndex: number = this.currentClasses.findIndex(c => c.value === b.value.value)
            return foundIndex !== -1 && foundIndex < a ? foundIndex : a
          }, this.currentClasses.length - 1)
          return this.radii[layerIndex] + 'px'
        } else {
          return this.radius + 'px'
        }
      })
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

  private getLinkedNodes(node: IFullItemState): IFullItemState[] {
    let links: ILink[] = this.calculateLinks()
    return this.state.active.activeLayout.items.filter(i => {
      return links.find(l => (l.source === node && l.target === i) || (l.target === node && l.source === i))
    })
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
      .on('contextmenu', (d: IFullItemState, i: number, groups: SVGCircleElement[]) => {
        d3.event.preventDefault()
        this.nodeClick(d, groups)
      })
      .on('click', (d: IFullItemState, i: number, groups: SVGCircleElement[]) => {
        if (this.linkMode) {
          this.linkEndFunction(d)
          this.linkMode = false
        } else {
          this.lastClickTargetSelected = this.selectedNodes.indexOf(d) !== -1
          if (d3.event.shiftKey) {
            if (this.selectedNodes.indexOf(d) === -1) {
              this.selectedNodes.push(d)
            } else {
              this.selectedNodes.splice(this.selectedNodes.indexOf(d), 1)
            }
            console.log('Node clicked while holding shift. Currently: ' + this.selectedNodes.length + ' nodes selected.')
          } else {
            if (this.selectedNodes.indexOf(d) === -1) {
              this.selectedNodes = []
              this.selectedNodes.push(d)
            }
          }
          this.$scope.$apply()
          this.updateCanvas()
        }
      })
      .on('dblclick', (d: IFullItemState, i: number, groups: SVGCircleElement[]) => {
        // Keep in mind that click also triggers twice when this event triggers.
        if (d.item) {
          if (this.lastClickTargetSelected) {
            this.selectedNodes.slice().forEach((n: IFullItemState) => {
              this.getLinkedNodes(n)
                .filter(no => this.selectedNodes.indexOf(no) === -1)
                .forEach(no => this.selectedNodes.push(no))
            })
          } else {
            this.getLinkedNodes(d)
              .filter(n => this.selectedNodes.indexOf(n) === -1)
              .forEach(n => this.selectedNodes.push(n))
            if (this.selectedNodes.indexOf(d) === -1) this.selectedNodes.push(d)
          }
          this.updateCanvas()
        }
      })
      .on('mouseenter', (d: IFullItemState, i: number, grp: SVGCircleElement[]) => {
        if (d.item && !this.dragOrigX) {
          d3.select('#' + this.sanitizeId(d.ids[0].value))
            .style('top', (d: IFullItemState, i, grp) => (d.topOffset + 41) + 'px' )
            .style('left', (d: IFullItemState, i, grp) => (d.leftOffset + (this.state.active.dividerPercent / 100 * window.innerWidth) + 17) + 'px' )
            .style('opacity', '1')
            .text(d.description)
        } else if (!this.dragOrigX) {
          d3.select('#' + this.sanitizeId(d.ids[0].value))
            .style('top', (d: IFullItemState, i, grp) => (d.topOffset + 41) + 'px' )
            .style('left', (d: IFullItemState, i, grp) => (d.leftOffset + (this.state.active.dividerPercent / 100 * window.innerWidth) + 17) + 'px' )
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
          ((this.selectedNodes.indexOf(d) === -1) ? [d] : this.selectedNodes).forEach((is) => {
            d3.select('#' + this.sanitizeId(is.ids[0].value)).style('opacity', '0')
          })
          this.dragOrigX = d.leftOffset
          this.dragOrigY = d.topOffset
        })
        .on('drag', (d: IFullItemState, i: number, group) => {
          // TODO: implement change to offsets using actions and reducers
          let origTop: number = d.topOffset;
          let origLeft: number = d.leftOffset;
          ((this.selectedNodes.indexOf(d) === -1) ? [d] : this.selectedNodes).forEach((is) => {
            is.leftOffset = d3.event.x + this.dragOrigX + (is.leftOffset - origLeft)
            is.topOffset = d3.event.y + this.dragOrigY + (is.topOffset - origTop)
            if (is.topOffset < 20) { is.topOffset = 20 }
            if (is.topOffset > window.innerHeight - 75) { is.topOffset = window.innerHeight - 75 }
            if (is.leftOffset < 20) { is.leftOffset = 20 }
            if (is.leftOffset > window.innerWidth - 20) { is.leftOffset = window.innerWidth - 20 }
          })
          this.dragOrigX = d.leftOffset
          this.dragOrigY = d.topOffset
          this.updateCanvas()
        })
        .on('end',  (d: IFullItemState, i: number, group) => {
          this.dragOrigX = null
          this.dragOrigY = null
          this.updateCanvas()
          this.$timeout(0).then(() => this.activeActionService.moveItemOnCurrentLayout())
        }))

    itemSelection = itemSelection.merge(enterSel)

    itemSelection.each((datum, i) => {
      ctrl.maintainNode(d3.select(itemSelection.nodes()[i]), datum.leftOffset, datum.topOffset)
    })

    if (this.viewOptionsShowLabels) this.showTooltips()
    if (this.viewOptionsShowLinkLabels) this.showLinkTooltips()

    // Align table selections to node selections
    let allIds: string[] = this.selectedNodes.map(n => n.ids[0].value)
    d3.entries(this.gridOptions).forEach((e: any) => {
      if (this.gridApis[e.key]) {
        e.value.data.forEach(d => {
          if (allIds.indexOf(d['id']) !== -1) {
            this.gridApis[e.key].selection.selectRow(d)
          } else {
            this.gridApis[e.key].selection.unSelectRow(d)
          }
        })
      }
    })

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
    this.multiMenu.hide()
    let nativePercent: number = 100 * evt.clientX / window.innerWidth
    this.activeActionService.setActiveDividerPercentage(nativePercent > 98 ? 100 : nativePercent < 2 ? 0 : nativePercent)
    this.forceTableResize()
    if (this.viewOptionsShowLabels) this.showTooltips()
    if (this.viewOptionsShowLinkLabels) this.$timeout(0).then(() => this.showLinkTooltips())
  }

  private forceTableResize(clss?: IClass): void {
    let gapis: any[] = clss ? [this.gridApis[clss.value]] : d3.values(this.gridApis)
    this.$timeout(0).then(() => gapis.forEach((gapi) => gapi.core.handleWindowResize()))
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
    if (this.$ngRedux.getState().project.project) {
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

  private savedLayouts(): ILayoutState[] {
    return this.state.project.project.layouts.filter(l => !l.active)
  }

  private saveLayoutDescription(layout: ILayoutState, layoutIndex: number): void {
    let newDescription: string =
      d3.select('.snapshot-list')
        .selectAll<HTMLLabelElement, {}>('.snapshot-name-label')
        .nodes()[layoutIndex].textContent

    this.projectActionService.changeLayoutDescription(layout, newDescription)
  }

  private saveLayout(description: string): void {
    let newLayout: ILayoutState = {
      items: this.state.active.activeLayout.items.map((i): IItemState => {
        return {
          ids: i.ids,
          topOffset: i.topOffset,
          leftOffset: i.leftOffset
        }
      }),
      active: false,
      description: description
    }
    this.projectActionService.addLayout(newLayout)
  }

  private loadLayout(layout: ILayoutState): angular.IPromise<any> {
    return this.activeActionService.setLayout(layout)
  }

  private deleteLayout(layout: ILayoutState): angular.IPromise<any> {
    return this.projectActionService.deleteLayout(layout)
  }

  private openLoadSnapshotWarningModal(): void {
    let modalInstance: any = this.$uibModal.open({
      animation: true,
      component: 'snapshotWarningModal'
    });
    modalInstance.result.then(
      function(): void {
        // continue
      },
      function(): void {
        // cancel
      });
  };

  private exportTable(): void {
    let exportData: {}[] = this.gridOptions[this.currentTableClass.value].data.slice(0)
      .map((d) => {
        let nd: {} = angular.copy(d)
        delete nd['types']
        return nd
      })
    exportData.shift()
    let dataBlob: Blob = new Blob([d3.csvFormat(exportData)], { type: 'text/csv;charset=utf-8' });
    this.FileSaver.saveAs(dataBlob, this.state.project.description + ' - ' + getPrefLangString(this.currentTableClass.labels, this.state.general.language) + '.csv');
  }

  private setGridOptions(): void {
    if (!this.currentTableClass) this.currentTableClass = this.allClasses()[0]

    let generatedColumns: Map<string, string[]> = new Map()
    let generatedColumnLabels: Map<string, ONodeSet<ILiteral>[]> = new Map()
    let generatedColumnMultiples: Map<string, boolean[]> = new Map()

    let data: {}[] = this.state.active.activeLayout.items.map((item) => {
      let obj: {} = {}
      let typeProp: PropertyToValues = item.item ? item.item.localProperties.concat(item.item.remoteProperties).filter(p => p.property.value === RDF.type.value)[0] : null
      obj['id'] = item.ids[0].value
      obj['description'] = item.description
      obj['types'] = typeProp ? typeProp.values : []

      if (item.item) {
        item.item.localProperties.concat(item.item.remoteProperties).forEach((p) => {
          let propValue: IRichPropertyValue[] = p.values// .map((v) => {
            // return v.value.labels.values && v.value.labels.values() && v.value.labels.values()[0] ?
          //     v.value.labels.values()[0].value :
          //     // v.value.labels.values ?
          //       // v.value.labels.values[0] :
          //       v.value.value
          // })
          obj[this.sanitizeId(p.property.value)] = propValue
          if (typeProp) {
            typeProp.values.forEach(v => {
              if (!generatedColumns.has(v.value.value)) {
                generatedColumns.set(v.value.value, [])
                generatedColumnLabels.set(v.value.value, [])
                generatedColumnMultiples.set(v.value.value, [])
              }
              if (generatedColumns.get(v.value.value).indexOf(p.property.value) === -1 && p.property.value !== RDF.type.value && p.property.value !== SKOS.prefLabel.value) {
                generatedColumns.get(v.value.value).push(p.property.value)
                generatedColumnLabels.get(v.value.value).push(p.property.labels)
                generatedColumnMultiples.get(v.value.value).push(false)
              }
              if (propValue && propValue.length && propValue.length > 1) generatedColumnMultiples.get(v.value.value).splice(generatedColumns.get(v.value.value).indexOf(p.property.value), 1, true)
            })
          } else {
            if (!generatedColumns.has('other')) {
              generatedColumns.set('other', [])
              generatedColumnLabels.set('other', [])
              generatedColumnMultiples.set('other', [])
            }
            if (generatedColumns.get('other').indexOf(p.property.value) === -1 && p.property.value !== RDF.type.value && p.property.value !== SKOS.prefLabel.value) {
              generatedColumns.get('other').push(p.property.value)
              generatedColumnLabels.get('other').push(p.property.labels)
              generatedColumnMultiples.get('other').push(false)
            }
            if (propValue && propValue.length && propValue.length > 1) generatedColumnMultiples.get('other').splice(generatedColumns.get('other').indexOf(p.property.value), 1, true)
          }
        })
      }
      return obj
    })

    this.allClasses()
      .map(c => c.value)
      .concat(['other'])
      .forEach((c) => {
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

        if (generatedColumns.has(c)) {
          generatedColumns.get(c).forEach((col, i) => {
            let cd: {} = {
              name: col,
              field: this.sanitizeId(col),
              displayName: generatedColumnLabels.get(c)[i].values && generatedColumnLabels.get(c)[i].values()[0] ? generatedColumnLabels.get(c)[i].values()[0].value : '',
              width: 200
            }
            if (generatedColumnMultiples.get(c)[i]) {
              cd['cellTemplate'] = '<div class="ui-grid-cell-contents" title="TOOLTIP">' +
                  '<span ng-repeat="propValue in COL_FIELD" class="table-cell-pill">{{ propValue.value.labels | prefLang }}</span>' +
                '</div>'
            } else {
              cd['cellTemplate'] = '<div class="ui-grid-cell-contents" title="TOOLTIP">' +
                  '<span ng-repeat="propValue in COL_FIELD">{{ propValue.value.labels | prefLang }}</span>' +
                '</div>'
            }
            columnDefs.push(cd)
          })
        }

        console.log([{}].concat(data.filter((d) => { return d['types'] ? d['types'].map(v => v.value.value).indexOf(c) !== -1 : false })))

        this.gridOptions[c] = {
          data: [{}].concat(data.filter((d) => { return d['types'] ? d['types'].map(v => v.value.value).indexOf(c) !== -1 : false })),
          enableFiltering: true,
          multiSelect: true,
          columnDefs: columnDefs,
          onRegisterApi: (gridApi) => {
            // set gridApi on scope
            this.gridApis[c] = gridApi
            gridApi.edit.on.afterCellEdit(this.$scope, (rowEntity, colDef, newValue, oldValue) => {
              console.log(rowEntity, colDef, newValue, oldValue)
              this.$scope.$apply();
            })

            gridApi.selection.on.rowSelectionChanged(this.$scope, (row) => {
              let selectedIds: string[] = this.selectedNodes.map(n => n.ids[0].value)
              if (row.isSelected && selectedIds.indexOf(row.entity.id) === -1 && this.state.active.activeLayout.items.find(i => i.ids[0].value === row.entity.id)) {
                this.selectedNodes.push(this.state.active.activeLayout.items.find(i => i.ids[0].value === row.entity.id))
              } else if (!row.isSelected && selectedIds.indexOf(row.entity.id) !== -1) {
                this.selectedNodes.splice(selectedIds.indexOf(row.entity.id), 1)
              }
              this.updateCanvas()
            })
          }
        }

        if (c === 'other') {
          this.gridOptions[c].data = [{}].concat(data.filter((d) => { return d['types'].length === 0 }))
        }
      })
  }
}

export class ActiveComponent implements angular.IComponentOptions {
    public template: any = require('./active.pug')()
    public controller: any = ActiveComponentController
}

angular.module('fibra.components.active', [
    'ui.bootstrap',
    'fibra.actions.project',
    'filearts.dragDrop',
    'ui.grid',
    'ui.grid.emptyBaseLayer',
    'ui.grid.resizeColumns',
    'ui.grid.edit',
    'ui.grid.selection',
    'ui.toggle',
    'ui.sortable',
    'ngFileSaver',
    'focus-if'
  ])
  .component('active', new ActiveComponent())
