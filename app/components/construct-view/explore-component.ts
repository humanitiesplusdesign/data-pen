'use strict'

import {Item, PropertyToValues, SparqlItemService, PropertyAndValue} from '../../services/sparql-item-service'
import {Sunburst} from './sunburst'
import {PropertyPopover} from './property-popover'
import * as d3 from 'd3'
import {TreeNode} from '../tree/tree-component'
import {OWL, SKOS, DataFactory, ENodeMap} from '../../models/rdf'
import {FibraService} from '../../services/fibra-service'
import * as angular from 'angular'
import { INgRedux } from 'ng-redux'
import * as VerifyActions from '../../actions/verify'
import * as TypeActions from '../../actions/types'
import * as ItemActions from '../../actions/items'
import { IExploreItem } from '../../models/iexplore-item'

interface IExploreComponentInterface extends angular.IComponentController {
}

interface IExploreScope extends angular.IScope {
  layout: { choice: string, links: string }
}

interface IExploreItemLink extends d3.SimulationLinkDatum<IExploreItem> {
  property?: PropertyToValues
}

class ExploreComponentController {
  // bindings
  public linkMode: boolean


  public itemService: SparqlItemService
  public properties: {}[]
  private svgSel: d3.Selection<SVGSVGElement, {}, null, undefined>
  private links: IExploreItemLink[]
  private primaryItems: Item[] = []
  private secondaryItems: Item[] = []
  private tertiaryItems: Item[] = []
  private untypedItems: Item[] = []
  private removedUntypedItems: IExploreItem[] = []
  private allItems: Item[] = []
  private radiusInitial: number = 1
  private radius: number = 8
  private radiusBounce: number = 15
  private tooltip: d3.Selection<HTMLDivElement, {}, HTMLElement, undefined>
  private edittip: d3.Selection<HTMLDivElement, {}, HTMLElement, undefined>
  private dragline: d3.Selection<SVGLineElement, {}, null, undefined>
  private exploreWidth: number
  private exploreHeight: number
  private gridOffset: number = 50 // Should be even
  private chargeForce: d3.ForceCollide<IExploreItem> = d3.forceCollide<IExploreItem>(this.gridOffset / 1.5)
  private chargeForce2: d3.ForceCollide<IExploreItem> = d3.forceCollide<IExploreItem>(this.gridOffset / 1.5)
  private svgBackgroundColor: string = '#EEE'
  private lastClickX: number = 0
  private lastClickY: number = 0

  private sunburst: Sunburst
  private propertyPopover: PropertyPopover

  // Actions
  private unsubscribe: any
  private verifyItem: any
  private displayItem: any
  private displayItems: any
  private itemProperty: any
  private createDisplayItem: any
  private types: any
  private items: any

  public $onChanges(chngsObj: any): void {
    if (this.svgSel) {
      this.updateExplore(false, false)
    }
  }

  public $postLink(): void {
    this.svgSel = d3.select(this.$element[0]).select<SVGSVGElement>('svg')

    this.svgSel.append('rect')
      .classed('background', true)
      .style('fill', this.svgBackgroundColor)
      .on('click', () => {
        this.lastClickX = d3.event.offsetX
        this.lastClickY = d3.event.offsetY
        this.createDisplayItem(this.$q, this.sparqlItemService).then(() => {
          this.fibraService.dispatch('change')
        })
      })

    // Create link g
    this.svgSel.append('g').attr('class', 'links')

    this.sunburst.addSunburstGroup(this.svgSel)

    this.radius = 8

    this.tooltip = d3.select('body').append<HTMLDivElement>('div')
      .style('position', 'absolute')
      .style('z-index', '20')
      .style('background-color', 'gray')
      .style('color', 'white')
      .style('padding', '3px')
      .style('border-radius', '2px')
      .style('visibility', 'hidden')

    this.edittip = d3.select('body').append<HTMLDivElement>('div')
      .attr('id', 'edittip')
      .style('position', 'absolute')
      .style('z-index', '40')
      .style('background-color', 'white')
      .style('color', 'gray')
      .style('border', '1px solid gray')
      .style('padding', '3px')
      .style('border-radius', '2px')
      .style('visibility', 'hidden')

    this.updateSizing();

    this.queryAndBuild()
  }

  // currently broken on deleting a link
  public highlightLinks(d: IExploreItem, i: number): void {
    d3.selectAll('line').classed('relevant', false)
    for (let j: number = 0; j < this.links.length; j++) {
      let linksource: IExploreItem = <IExploreItem>this.links[j].source
      let linktarget: IExploreItem = <IExploreItem>this.links[j].target
      if (linksource.index === i || linktarget.index === i)
          d3.select('#link-' + j).classed('relevant', true)
    }
  }

  public $onDestroy(): void {
    this.unsubscribe()
  }

  /* @ngInject */
  constructor(private $element: angular.IAugmentedJQuery,
              private $compile: angular.ICompileService,
              private $window: angular.IWindowService,
              private $scope: IExploreScope,
              private $timeout: angular.ITimeoutService,
              private sparqlItemService: SparqlItemService,
              private fibraService: FibraService,
              private $ngRedux: INgRedux,
              private $q: angular.IQService) {

    let unsub1: () => void = $ngRedux.connect(this.mapVerifyToThis, VerifyActions)(this)
    let unsub2: () => void = $ngRedux.connect(this.mapTypesToThis, TypeActions)(this)
    let unsub3: () => void = $ngRedux.connect(this.mapItemsToThis, ItemActions)(this)
    this.unsubscribe = () => {
      unsub1()
      unsub2()
      unsub3()
    }

    this.sunburst = new Sunburst($element, $compile, $scope, sparqlItemService, fibraService, this.displayItem, this.displayItems)
    this.propertyPopover = new PropertyPopover($element, $scope, fibraService, $compile)

    this.fibraService.on('change', () => {
      // this.verifyItem = this.fibraService.getState().construct.verifyItem
      return this.queryAndBuild()
    })
    this.itemService = sparqlItemService
    this.links = []
    this.$scope.layout = {
      'choice': 'force',
      'links': 'hide'
    }

    this.$scope.$watch('layout.choice', this.updateExplore.bind(this, false))
    this.$scope.$watch('layout.links', this.updateExplore.bind(this, false))
  }

  public queryAndBuild(): angular.IPromise<string> {
    let prom: angular.IPromise<string> = this.sparqlItemService.getItems(this.items.items, false).then((items: Item[]) => {

        // If we are showing property popovers, hide 'em.
        this.propertyPopover.hidePopover()

        // Lock previous items
        this.lockExisting(this.primaryItems)
        this.lockExisting(this.secondaryItems)
        this.lockExisting(this.tertiaryItems)

        let displayTypes: TreeNode[] = this.types.displayTypes

        let currentUntyped: IExploreItem[] = this.filterItemsByType(items, OWL.Thing.value)
        this.removedUntypedItems = this.untypedItems.filter((it) => currentUntyped.indexOf(it) === -1)

        this.untypedItems = this.mergeNodes(this.untypedItems, this.filterItemsByType(items, OWL.Thing.value))
        if (displayTypes[0]) this.primaryItems = this.mergeNodes(this.primaryItems, this.filterItemsByType(items, displayTypes[0].id))
        if (displayTypes[1]) this.secondaryItems = this.mergeNodes(this.secondaryItems, this.filterItemsByType(items, displayTypes[1].id))
        if (displayTypes[2]) this.tertiaryItems = this.mergeNodes(this.tertiaryItems, this.filterItemsByType(items, displayTypes[2].id))
        this.allItems = this.primaryItems.concat(this.secondaryItems).concat(this.tertiaryItems).concat(this.untypedItems)
        this.properties = []

        if (this.primaryItems[0] && this.primaryItems[0].localProperties) {
          for (let p of this.primaryItems[0].localProperties)
            this.properties.push({key: p.toCanonical(), value: p.label })
        }
        this.links = this.mergeLinks(this.links)

        return 'ok';
      }).then(() => this.updateExplore())

    this.fibraService.dispatchAction(this.fibraService.placeHolderAction(prom))

    return prom
  }

  private lockExisting(nodes: IExploreItem[]): void {
    nodes.forEach((node) => {
      node.fx = node.gx
      node.fy = node.gy
    })
  }

  private filterItemsByType(items: Item[], type: string): IExploreItem[] {
    return items.filter((it) => {
      let typeProp: PropertyToValues[] = it.localProperties.concat(it.remoteProperties).filter((pr) => {
        return pr.value === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type'
      })
      if (typeProp[0]) {
        return typeProp[0].values.map((v) => { return v.value.value; }).indexOf(type) !== -1
      } else {
        return false;
      }
    })
  }

  private updateSizing(): void {
    // allow item_info_tip to expand somehow
    // add delete and alter ability to sparql-item.pug
    // fix how links sit on top of nodes
    let viewport_width: number = window.innerWidth
    let viewport_height: number = window.innerHeight
    this.exploreWidth = viewport_width
    this.exploreHeight = viewport_height - 36

    d3.select(this.$element[0]).select('#explorecontainer')
      .style('height', this.exploreHeight + 'px')

    // move table down so top is at bottom of viewport
    d3.select(this.$element[0]).select('#exploretable')
      .style('height', viewport_height - 50 + 'px')

    this.svgSel.style('width', viewport_width + 'px')
      .style('height', viewport_height - 36 + 'px')

    this.svgSel.select('rect.background')
        .style('width', viewport_width + 'px')
        .style('height', viewport_height - 36 + 'px')

    let svg_width: number = +this.svgSel.style('width').replace('px', '')
    let svg_height: number = +this.svgSel.style('height').replace('px', '')
  }

  private appendNodes(enterSelection: d3.Selection<d3.BaseType, {}, SVGSVGElement, {}>, className: string): d3.Selection<d3.BaseType, {}, SVGSVGElement, {}> {

    let appendSelection: d3.Selection<d3.BaseType, {}, SVGSVGElement, {}> = enterSelection.append('g')
        .attr('id', (d, i: number) => 'node-' + i + '-' + className)
        .attr('class', 'node')
        .classed(className, true)
      .append('circle')
        .classed('node-circle', true)
        .classed(className, true)
        .attr('id', (d, i: number) => 'node-circle-' + i + '-' + className)
        .attr('r', this.radiusInitial + 'px')
        .call(d3.drag()
            .on('start', (d: IExploreItem, i: number) => {
              if (!this.linkMode) {
                d.fx = d.x
                d.fy = d.y
              } else {
                  this.dragline = this.svgSel.append<SVGLineElement>('line')
                  .attr('class', 'dragLine')
              }
              })
            .on('drag', (d: IExploreItem, i: number, group) => {
              if (!this.linkMode) {
                d3.select(group[i]).classed('fixed', true)
                d.x = d3.event.x
                d.y = d3.event.y
              } else {
                this.dragline.attr('x1', d.x!)
                  .attr('y1', d.y!)
                  .attr('x2', d3.event.x)
                  .attr('y2', d3.event.y)
              }
              this.updateExplore(false, false)
              })
            .on('end',  (d: IExploreItem, i: number, group) => {
              if (!this.linkMode) {
                if (!d3.select(group[i]).classed('fixed')) {
                  d.fx = undefined
                  d.fy = undefined
                }
              } else {
                let lineX: number = +this.dragline.attr('x2')
                let lineY: number = +this.dragline.attr('y2')

                let nodeDrop: boolean = false

                d3.selectAll('.node')
                  .each((f: IExploreItem, j) => {
                    if (Math.abs(lineX - f.x) < this.radius && Math.abs(lineY - f.y) < this.radius) {
                      nodeDrop = true
                      this.itemProperty(f, [new PropertyAndValue(SKOS.related, DataFactory.instance.nodeFromNode(d))], [])
                        .then((state) => {
                          this.dragline.remove()
                          this.queryAndBuild()
                          return state
                        })
                    }
                  })

                if (!nodeDrop) {
                  this.dragline.remove()
                }
              }
            }))
        .on('mouseover', (d: IExploreItem, i: number) => {
          this.highlightLinks(d, i)
          this.tooltip.style('top', (d3.event.pageY - 10) + 'px')
            .style('left', (d3.event.pageX + 10) + 'px')
            .style('visibility', 'visible')
            .text(d.label)
        })
        .on('mouseout', (d: IExploreItem, i: number) => {
          this.svgSel.selectAll('line').classed('relevant', false)
          this.tooltip.style('visibility', 'hidden')
        })
        .on('click', (d: IExploreItem, i, group) => {
          let localSelected: boolean = d.selected
          // Unselect everything
          this.svgSel.selectAll('.node')
            .each((n: IExploreItem) => { n.selected = false })
          // Flip this one
          d.selected = !localSelected
          this.updateExplore(false)
          if (d.selected) {
            this.svgSel.select('g.sunburst-overlay')
              .datum(d)
              .each(this.sunburst.buildSunburst.bind(this))
              .style('display', 'block')
          } else {
            this.svgSel.select('.sunburst-overlay').style('display', 'none')
          }
          this.highlightLinks(d, i)
        })

    appendSelection
      .transition()
        .attr('r', (this.radius + this.radiusBounce) + 'px')
      .transition()
        .attr('r', this.radius + 'px')

    return appendSelection
  }

  private snapToGrid(x: number, y: number, primary: boolean = true): number[] {
    let sx: number, sy: number
    // Snap to gridOffset with further offset for multiples
    if (primary) {
      sx = Math.round(x / this.gridOffset) * this.gridOffset
      sy = Math.round(y / this.gridOffset) * this.gridOffset
    } else {
      sx = Math.round(x / this.gridOffset) * this.gridOffset - this.gridOffset / 2
      sy = Math.round(y / this.gridOffset) * this.gridOffset - this.gridOffset / 2
    }
    return [sx, sy]
  }

  private tickTransformNodes( sel: d3.Selection<d3.BaseType, {}, SVGSVGElement, {}>|d3.Transition<d3.BaseType, {}, SVGSVGElement, {}>,
                              primary: boolean = true ): void {
    sel.attr('transform', (d: IExploreItem, i) => {
      let x: number = d.x!, y: number = d.y!
      if (d.x < this.radius) x = this.radius
      if (d.y < this.radius) y = this.radius

      let [gx, gy] = [x, y]
      if (this.$scope.layout.choice === 'forcegrid') {
        [gx, gy] = this.snapToGrid(x, y, primary)
      }
      d.gx = gx
      d.gy = gy

      return 'translate(' + gx + ', ' + gy + ')'
    })

    if (sel.filter((d: IExploreItem) => { return d.selected }).node()) {
      let sbFunc: (d: any, i: any, g: any) => void = this.sunburst.buildSunburst
      let svgSel: d3.Selection<SVGSVGElement, {}, null, undefined> = this.svgSel

      let tickSunburst: (this: any, d: any, i: any, g: any) => void = function(this: any, d: any, i: any, g: any): void {
        svgSel.select('g.sunburst-overlay').datum(d).each(sbFunc.bind(this))
      }

      sel.filter((d: IExploreItem) => { return d.selected })
        .each(tickSunburst.bind(this))
    }
  }

  private genericTick(primaryNodes: d3.Selection<d3.BaseType, {}, SVGSVGElement, {}>,
                      secondaryNodes: d3.Selection<d3.BaseType, {}, SVGSVGElement, {}>,
                      untypedNodes: d3.Selection<d3.BaseType, {}, SVGSVGElement, {}>,
                      linkLines: d3.Selection<SVGLineElement, IExploreItemLink, SVGGElement, {}>,
                      transition: boolean = false): void {

    let lPrimaryNodes: d3.Selection<d3.BaseType, {}, SVGSVGElement, {}>|d3.Transition<d3.BaseType, {}, SVGSVGElement, {}> = primaryNodes
    let lSecondaryNodes: d3.Selection<d3.BaseType, {}, SVGSVGElement, {}>|d3.Transition<d3.BaseType, {}, SVGSVGElement, {}> = secondaryNodes
    let lUntypedNodes: d3.Selection<d3.BaseType, {}, SVGSVGElement, {}>|d3.Transition<d3.BaseType, {}, SVGSVGElement, {}> = untypedNodes
    let lLinkLines: d3.Selection<SVGLineElement, IExploreItemLink, SVGGElement, {}>|d3.Transition<SVGLineElement, IExploreItemLink, SVGGElement, {}> = linkLines
    if (transition) {
      lPrimaryNodes = lPrimaryNodes.transition()
      lSecondaryNodes = lSecondaryNodes.transition()
      lUntypedNodes = lUntypedNodes.transition()
      lLinkLines = lLinkLines.transition()
    }

    this.tickTransformNodes(lPrimaryNodes, true)
    this.tickTransformNodes(lSecondaryNodes, false)
    this.tickTransformNodes(lUntypedNodes, false)

    this.svgSel.selectAll('.node-circle')
            .classed('selected-circle', (d: IExploreItem) => { return d.selected })
            .style('cursor', this.linkMode ? 'crosshair' : 'initial')
    this.svgSel.selectAll('.node-circle')
      .classed('labeled', (d: IExploreItem) => { return d.label ? true : false; })
      // We should only count 'sameAs' relations as verified if they are against the configuration,
      // but this doesn't make that distinction.
      .classed('verified', (d: IExploreItem) => { return d.localProperties.filter((p) => { return p.value === 'http://www.w3.org/2002/07/owl#sameAs' }).length > 0; })

    lLinkLines
      .attr('x1', (d: IExploreItemLink) => (<IExploreItem>d.source).gx!)
      .attr('y1', (d: IExploreItemLink) => (<IExploreItem>d.source).gy!)
      .attr('x2', (d: IExploreItemLink) => (<IExploreItem>d.target).gx!)
      .attr('y2', (d: IExploreItemLink) => (<IExploreItem>d.target).gy!)
  }

  private updateExplore(runSim: boolean = true, transition: boolean = false): angular.IPromise<string> {

    let untypedNodes: d3.Selection<d3.BaseType, {}, SVGSVGElement, {}> = this.svgSel
        .selectAll<SVGElement, IExploreItem>('circle.untyped')
      .data(this.untypedItems, (d: Item) => d.value)
    let primaryNodes: d3.Selection<d3.BaseType, {}, SVGSVGElement, {}> = this.svgSel
        .selectAll<SVGElement, IExploreItem>('circle.primary')
      .data(this.primaryItems, (d: Item) => d.value)
    let secondaryNodes: d3.Selection<d3.BaseType, {}, SVGSVGElement, {}> = this.svgSel
        .selectAll<SVGElement, IExploreItem>('circle.secondary')
      .data(this.secondaryItems, (d: Item) => d.value)

    primaryNodes.exit().remove()
    secondaryNodes.exit().remove()
    untypedNodes.exit().remove()

    // Untyped nodes should come in one at a time based on a user's click event. For these
    // we also want append the user interface for setting type and label.
    untypedNodes.enter().each((datum: IExploreItem, i, g) => {
      datum.x = this.lastClickX
      datum.y = this.lastClickY
      datum.fx = this.lastClickX
      datum.fy = this.lastClickY
      datum.gx = this.lastClickX
      datum.gy = this.lastClickY
    }).each(this.propertyPopover.addPopover.bind(this, this.$scope, this.svgSel))

    // If a node went from being untyped to being primary or secondary, bring along its position
    // Also handle position getting set from a drop (pull position from state)
    let applyOldPosition: (datum: IExploreItem) => void = (datum: IExploreItem) => {
      // Get position from state if it was set there.
      datum.x = this.items.itemIndex[datum.value].x
      datum.y = this.items.itemIndex[datum.value].y
      datum.fx = this.items.itemIndex[datum.value].x
      datum.fy = this.items.itemIndex[datum.value].y
      datum.gx = this.items.itemIndex[datum.value].x
      datum.gx = this.items.itemIndex[datum.value].y

      // Or if node was already here, get position from old node
      let oldNode: IExploreItem = this.removedUntypedItems.filter((it) => { return it.value === datum.value })[0]
      if (oldNode) {
        datum.x = oldNode.x
        datum.y = oldNode.y
        datum.fx = oldNode.fx
        datum.fy = oldNode.fy
        datum.gx = oldNode.gx
        datum.gy = oldNode.gy
      }
    }
    primaryNodes.enter().each(applyOldPosition)
    secondaryNodes.enter().each(applyOldPosition)

    primaryNodes = primaryNodes.merge(this.appendNodes(primaryNodes.enter(), 'primary'))
    secondaryNodes = secondaryNodes.merge(this.appendNodes(secondaryNodes.enter(), 'secondary'))
    untypedNodes = untypedNodes.merge(this.appendNodes(untypedNodes.enter(), 'untyped'))

    let linkLines: d3.Selection<SVGLineElement, IExploreItemLink, SVGGElement, {}> = this.svgSel
        .select<SVGGElement>('g.links')
        .selectAll<SVGLineElement, IExploreItemLink>('line')
      .data(this.links)

    linkLines.exit().remove()

    linkLines = linkLines
      .enter().append<SVGLineElement>('line')
        .attr('id', (d: IExploreItemLink, i: number) => 'link-' + i)
        .on('mouseover', (d: IExploreItemLink, i: number) => {
          this.tooltip.style('top', (d3.event.pageY - 10) + 'px')
            .style('left', (d3.event.pageX + 10) + 'px')
            .style('visibility', 'visible')
            .text(d.property.label)
        })
        .on('mouseout', (d: IExploreItemLink, i: number) => {
          this.tooltip.style('visibility', 'hidden')
        })
      .merge(linkLines)
        .style('visibility', this.$scope.layout.links === 'show' ? 'visible' : 'hidden')

    // Add sunburst again so it stays on top
    this.sunburst.addSunburstGroup(this.svgSel)

    this.genericTick(primaryNodes, secondaryNodes, untypedNodes, linkLines, transition)

    return this.$q.resolve('ok')
  }

  private mapVerifyToThis(state: any): any {
    return {
      verify: state.verify
    }
  }

  private mapTypesToThis(state: any): any {
    return {
      types: state.types
    }
  }

  private mapItemsToThis(state: any): any {
    return {
      items: state.items
    }
  }

  private mergeNodes(oldNodes: Item[], nodes: Item[]): IExploreItem[] {
    let newNodes: Item[] = []

    // Check if old nodes are still in the mix
    for (let i: number = 0; i < oldNodes.length; i++) {
      for (let j: number = 0; j < nodes.length; j++) {
        if (oldNodes[i].toCanonical() === nodes[j].toCanonical()) {
          newNodes.push(oldNodes[i])

          // We need to grab new node information like labels and props in case it's changed
          oldNodes[i].label = nodes[j].label
          oldNodes[i].localProperties = nodes[j].localProperties
        }
      }
    }

    // Add the new nodes
    for (let i: number = 0; i < nodes.length; i++) {
      let check: boolean = false
      for (let j: number = 0; j < newNodes.length; j++) {
        if (newNodes[j].toCanonical() === nodes[i].toCanonical()) check = true
      }
      if (!check) {
        newNodes.push(nodes[i])
      }
    }

    return newNodes
  }

  private mergeLinks(oldLinks: IExploreItemLink[]): IExploreItemLink[] {
    let newLinks: IExploreItemLink[] = []
    let items: Item[] = this.primaryItems.concat(this.secondaryItems)

    let sameAs: ENodeMap<Item> = new ENodeMap<Item>()
    for (let item of items) {
      sameAs.set(item, item)
      let sameAsProp: PropertyToValues = item.localProperties.filter((p) =>
        OWL.sameAs.equals(p)
      )[0]
      if (sameAsProp && sameAsProp.values) for (let n of sameAsProp.values) sameAs.set(n.value, item)
    }

    // Iterate over item property values to see if they match the id of any
    // of the items displayed. Also check if they match sameAs values...
    for (let item of items) {
      for (let p of item.localProperties) {
        for (let v of p.values) {
          if (sameAs.has(v.value) && item !== sameAs.get(v.value) && items.indexOf(sameAs.get(v.value)) !== -1) {
            newLinks.push({
              source: <IExploreItem>item,
              target: <IExploreItem>sameAs.get(v.value),
              property: p
            })
          }
        }
      }
    }

    return newLinks
  }
}

export class ExploreComponent implements angular.IComponentOptions {
  public bindings: {[id: string]: string} = {
    linkMode: '<',
  }
  public controller: any = ExploreComponentController // (new (...args: any[]) => angular.IController) = ExploreComponentController
  public template: string = require('./explore.pug')()
}

angular.module('fibra.components.explore', ['fibra.services'])
  .component('explore', new ExploreComponent())
