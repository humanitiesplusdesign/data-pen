namespace fibra {
  'use strict'

  interface IExploreComponentInterface extends angular.IComponentController {
  }

  interface IExploreScope extends angular.IScope {
    layout: { choice: string }
  }

  interface IGridNode extends d3.SimulationNodeDatum {
    gx?: number
    gy?: number
  }

  interface IExploreItem extends Item, IGridNode {
  }

  interface IExploreItemLink extends d3.SimulationLinkDatum<IExploreItem> {
    property?: PropertyToValues<INodePlusLabel>
  }

  class ExploreComponentController {
    public itemService: SparqlItemService
    // public items: Item[] = []
    public selectedItem: INode
    public chosenTypes
    public properties: {}[]
    private svgSel: d3.Selection<SVGSVGElement, {}, null, undefined>
    private links: IExploreItemLink[]
    private forceSim: d3.Simulation<IExploreItem, IExploreItemLink>
    private primaryItems: Item[] = []
    private secondaryItems: Item[] = []
    private tertiaryItems: Item[] = []
    private item_info_tip: d3.Selection<HTMLDivElement, {}, HTMLBodyElement, undefined>
    private radius: number = 8
    private tooltip: d3.Selection<HTMLDivElement, {}, HTMLBodyElement, undefined>
    private edittip: d3.Selection<HTMLDivElement, {}, HTMLBodyElement, undefined>
    private dragline: d3.Selection<SVGLineElement, {}, null, undefined>
    private exploreWidth: number
    private exploreHeight: number
    private gridOffset: number = 50 // Should be even
    private chargeForce: d3.ForceCollide<IExploreItem> = d3.forceCollide<IExploreItem>(this.gridOffset/1.5)
    private chargeForce2: d3.ForceCollide<IExploreItem> = d3.forceCollide<IExploreItem>(this.gridOffset/1.5)

    private drawmode: boolean = false

    public $postLink(): void {
      this.svgSel = d3.select(this.$element[0]).select<SVGSVGElement>('svg')
      // Create link g
      this.svgSel.append('g').attr('class', 'links')

      this.forceSim = d3.forceSimulation<IExploreItem, IExploreItemLink>()
        .force('charge', this.chargeForce)
        .force('charge2', this.chargeForce2)
        .force('link', d3.forceLink().distance(40).strength(1).iterations(1).id((d: IExploreItem) => '' + d.index))

      this.item_info_tip = d3.select('body').append<HTMLDivElement>('div')
        .attr('id', 'item_info_tip')
        .style('position', 'absolute')
        .style('z-index', '20')
        .style('background-color', 'white')
        .style('padding', '3px')
        .style('visibility', 'hidden')

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

    public queryAndBuild(): angular.IPromise<string> {
      return this.itemService.getItemsForExplore().then(
        (items: Item[]) => {
          if(this.chosenTypes.primary) this.primaryItems = this.mergeNodes(this.primaryItems, this.filterItemsByType(items, this.chosenTypes.primary.id))
          if(this.chosenTypes.secondary) this.secondaryItems = this.mergeNodes(this.secondaryItems, this.filterItemsByType(items, this.chosenTypes.secondary.id))
          if(this.chosenTypes.tertiary) this.tertiaryItems = this.mergeNodes(this.tertiaryItems, this.filterItemsByType(items, this.chosenTypes.tertiary.id))
          this.properties = []
          if(this.primaryItems[0] && this.primaryItems[0].localProperties) {
            for (let p of this.primaryItems[0].localProperties)
              this.properties.push({key: p.toCanonical(), value: p.label.value })
          }
          this.links = this.mergeLinks(this.links)
          return 'ok';
        }).then(() => this.updateExplore())
    }

    private filterItemsByType(items: Item[], type: string): Item[] {
      return items.filter((it) => {
        let typeProp = it.localProperties.filter((pr) => {
          return pr.value === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type'
        })
        if(typeProp[0]) {
          return typeProp[0].values.map((v) => { return v.value; }).indexOf(type) !== -1
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
      let searchbarwidth: number = +d3.select('#searchbar').style('width').replace('px', '')
      this.exploreWidth = viewport_width
      this.exploreHeight = viewport_height - 36

      d3.select(this.$element[0]).select('#explorecontainer')
        .style('width', this.exploreWidth + 'px')
        .style('height', this.exploreHeight + 'px')

      d3.select(this.$element[0].parentElement).select('#searchbar')
        .style('top', viewport_height * 6 / 7 + 'px')
        .style('left', viewport_width / 2 - searchbarwidth / 2 + 'px')
        .style('display', 'block')

      // move table down so top is at bottom of viewport
      d3.select(this.$element[0]).select('#exploretable')
        .style('width', viewport_width + 'px')
        .style('height', viewport_height - 50 + 'px')

      this.svgSel.style('width', viewport_width + 'px')
        .style('height', viewport_height - 36 + 'px')
        // .style('top', 25 + 'px')

      let svg_width: number = +this.svgSel.style('width').replace('px', '')
      let svg_height: number = +this.svgSel.style('height').replace('px', '')

      this.forceSim.force('center', d3.forceCenter(svg_width / 2, svg_height / 2))
      this.forceSim.force('xposition', d3.forceX(svg_width / 2).strength(0.01))
      this.forceSim.force('yposition', d3.forceY(svg_height / 2).strength(0.01))

      // Build grids

    }

    private appendNodes(enterSelection: d3.Selection<d3.BaseType, {}, SVGSVGElement, {}>, className: string) {
      return enterSelection.append('g')
          .attr('id', (d, i: number) => 'node-' + i + '-' + className)
          .attr('class', 'node')
        .append('circle')
          .classed('node-circle', true)
          .classed(className, true)
          .attr('id', (d, i: number) => 'node-circle-' + i + '-' + className)
          .style('stroke', 'black')
          .attr('r', this.radius + 'px')
          .call(d3.drag()
              .on('start', (d: IExploreItem, i: number) => {
                if (!this.drawmode) {
                  d.fx = d.x
                  d.fy = d.y
                } else {
                    this.dragline = this.svgSel.append<SVGLineElement>('line')
                    .attr('class', 'dragLine')
                }
               })
              .on('drag', (d: IExploreItem, i: number, group) => {
                if (!this.drawmode) {
                  d3.select(group[i]).classed('fixed', true)
                  d.x = d3.event.x
                  d.y = d3.event.y
                  if (d3.select(group[i]).classed('selected-circle')) {
                  this.item_info_tip.style('top', (d3.event.y + 30) + 'px')
                  .style('left', (d3.event.x + 30) + 'px')
                  }
                } else {
                  this.dragline.attr('x1', d.x!)
                    .attr('y1', d.y!)
                    .attr('x2', d3.event.x)
                    .attr('y2', d3.event.y)
                }
                this.updateExplore(false, false)
               })
              .on('end',  (d: IExploreItem, i: number, group) => {
                if (!this.drawmode) {
                  if (!d3.select(group[i]).classed('fixed')) {
                    d.fx = undefined
                    d.fy = undefined
                  }
                } else {
                  let lineX: number = +this.dragline.attr('x2')
                  let lineY: number = +this.dragline.attr('y2')

                  d3.selectAll('.node')
                    .each((f: IExploreItem, j) => {
                      if (Math.abs(lineX - f.x) < this.radius && Math.abs(lineY - f.y) < this.radius) {
                        this.links.push({'source': d, 'target': f, 'property': undefined})
                        this.updateExplore(false)
                      }
                    })
                  this.dragline.remove()
                }

               }))
          .on('mouseover', (d: IExploreItem, i: number) => {
            this.highlightLinks(d, i)
            this.tooltip.style('top', (d3.event.pageY - 10) + 'px')
              .style('left', (d3.event.pageX + 10) + 'px')
              .style('visibility', 'visible')
              .text(d.label.value)
          })
          .on('mouseout', (d: IExploreItem, i: number) => {
            this.svgSel.selectAll('line').classed('relevant', false)
            this.tooltip.style('visibility', 'hidden')
          })
          .on('click', (d: IExploreItem, i, group) => {
            this.svgSel.selectAll('.node-circle')
              .classed('selected-circle', false)
              .attr('r', this.radius + 'px')
            d3.select(group[i])
              .classed('selected-circle', true)
              .attr('r', this.radius + 3 + 'px')
            this.tooltip.style('visibility', 'hidden')
            this.highlightLinks(d, i)
            this.$scope.$apply(() => this.selectItem(d))
            this.item_info_tip.style('top', (d3.event.pageY - 10) + 'px')
            .style('left', (d3.event.pageX + 17) + 'px')
            .style('visibility', 'visible')
            let cscope: angular.IScope = this.$scope.$new(true)
            cscope['node'] = d
            this.item_info_tip.selectAll('*').remove()
            this.item_info_tip.node().appendChild(this.$compile('<sparql-item item-id="node"></sparql-item>')(cscope)[0])
          })
    }

    private snapToGrid(x: number, y: number, primary: boolean = true): number[] {
      let sx: number, sy: number
      // Snap to gridOffset with further offset for multiples
      if(primary) {
        sx = Math.round(x / this.gridOffset) * this.gridOffset
        sy = Math.round(y / this.gridOffset) * this.gridOffset
      } else {
        sx = Math.round(x / this.gridOffset) * this.gridOffset - this.gridOffset/2
        sy = Math.round(y / this.gridOffset) * this.gridOffset - this.gridOffset/2
      }
      return [sx,sy]
    }

    private tickTransformNodes(sel: d3.Selection<d3.BaseType, {}, SVGSVGElement, {}>|d3.Transition<d3.BaseType, {}, SVGSVGElement, {}>,
                                primary: boolean = true ) {
      sel.attr('transform', (d: IExploreItem, i) => {
        let x: number = d.x!, y: number = d.y!
        if (d.x < this.radius) x = this.radius
        if (d.y < this.radius) y = this.radius

        let [gx,gy] = [x,y]
        if(this.$scope.layout.choice === 'forcegrid') {
          [gx,gy] = this.snapToGrid(x,y,primary)
        }
        d.gx = gx
        d.gy = gy

        return 'translate(' + gx + ', ' + gy + ')'
      })
    }

    private genericTick(primaryNodes: d3.Selection<d3.BaseType, {}, SVGSVGElement, {}>,
                        secondaryNodes: d3.Selection<d3.BaseType, {}, SVGSVGElement, {}>,
                        linkLines: d3.Selection<SVGLineElement, IExploreItemLink, SVGGElement, {}>,
                        transition: boolean = false) {

      let lPrimaryNodes: d3.Selection<d3.BaseType, {}, SVGSVGElement, {}>|d3.Transition<d3.BaseType, {}, SVGSVGElement, {}> = primaryNodes
      let lSecondaryNodes: d3.Selection<d3.BaseType, {}, SVGSVGElement, {}>|d3.Transition<d3.BaseType, {}, SVGSVGElement, {}> = secondaryNodes
      let lLinkLines: d3.Selection<SVGLineElement, IExploreItemLink, SVGGElement, {}>|d3.Transition<SVGLineElement, IExploreItemLink, SVGGElement, {}> = linkLines
      if(transition) {
        lPrimaryNodes = lPrimaryNodes.transition()
        lSecondaryNodes = lSecondaryNodes.transition()
        lLinkLines = lLinkLines.transition()
      }

      this.tickTransformNodes(lPrimaryNodes, true)
      this.tickTransformNodes(lSecondaryNodes, false)

      lLinkLines
        .attr('x1', (d: IExploreItemLink) => (<IExploreItem>d.source).gx!)
        .attr('y1', (d: IExploreItemLink) => (<IExploreItem>d.source).gy!)
        .attr('x2', (d: IExploreItemLink) => (<IExploreItem>d.target).gx!)
        .attr('y2', (d: IExploreItemLink) => (<IExploreItem>d.target).gy!)
    }

    private updateExplore(runSim: boolean = true, transition: boolean = false): angular.IPromise<string> {

      let primaryNodes: d3.Selection<d3.BaseType, {}, SVGSVGElement, {}> = this.svgSel
          .selectAll<SVGElement, IExploreItem>('circle.primary')
        .data(this.primaryItems, (d: Item) => d.value)
      let secondaryNodes: d3.Selection<d3.BaseType, {}, SVGSVGElement, {}> = this.svgSel
          .selectAll<SVGElement, IExploreItem>('circle.secondary')
        .data(this.secondaryItems, (d: Item) => d.value)

      primaryNodes.exit().remove()
      secondaryNodes.exit().remove()

      primaryNodes = primaryNodes.merge(this.appendNodes(primaryNodes.enter(), 'primary'))
      secondaryNodes = secondaryNodes.merge(this.appendNodes(secondaryNodes.enter(), 'secondary'))

      let linkLines: d3.Selection<SVGLineElement, IExploreItemLink, SVGGElement, {}> = this.svgSel
          .select<SVGGElement>('g.links')
          .selectAll<SVGLineElement, IExploreItemLink>('line')
        .data(this.links)

      linkLines.exit().remove()

      linkLines= linkLines
        .enter().append<SVGLineElement>('line')
          .attr('id', (d: IExploreItemLink, i: number) => 'link-' + i)
        .merge(linkLines)

      this.forceSim.stop()
      let onTick = this.genericTick.bind(this, primaryNodes, secondaryNodes, linkLines, false)
      this.forceSim.nodes(this.primaryItems.concat(this.secondaryItems))
        .on('tick', onTick)
      this.forceSim
        .force<d3.ForceLink<IExploreItem, IExploreItemLink>>('link').links(this.links)

      // Apply forces only to one set of items, depending on force.
      let collideForce = this.forceSim.force('charge')
      let collideForce2 = this.forceSim.force('charge2')
      let centerForce = this.forceSim.force('center')
      let xpositionForce = this.forceSim.force('xposition')
      let ypositionForce = this.forceSim.force('yposition')
      if(collideForce.initialize) collideForce.initialize(this.primaryItems)
      if(collideForce2.initialize) collideForce2.initialize(this.secondaryItems)
      // if(centerForce.initialize) centerForce.initialize(this.primaryItems)
      // if(xpositionForce.initialize) xpositionForce.initialize(this.primaryItems)
      // if(ypositionForce.initialize) ypositionForce.initialize(this.primaryItems)

      if(runSim) {
        this.forceSim.alpha(1).restart()
      } else {
        this.genericTick(primaryNodes, secondaryNodes, linkLines, transition)
      }

      return this.$q.resolve('ok')
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

    public selectItem(id: INode): void {
      this.selectedItem = id
    }

    // BUG: after deleting item, links think nodes are in old locations and stationary, items are not getting rebound to new nodes
    public delete(id: INode): angular.IPromise<string> {

      // remove any links from the item -
      for (let i: number = 0; i < this.links.length; i++) {
        if (this.links[i].source === id || this.links[i].target === id) {
          this.links.splice(i, 1)
        }
      }
      // might need more to fully clear svg of deleted links

      let prom: angular.IPromise<string> = this.itemService.deleteItem(id)
      prom.then(() => this.fibraService.dispatch('change'))
      return prom
    }

    constructor(private $element: angular.IAugmentedJQuery,
                private $compile: angular.ICompileService,
                private $window: angular.IWindowService,
                private $scope: IExploreScope,
                private $timeout: angular.ITimeoutService,
                private sparqlItemService: SparqlItemService,
                private fibraService: FibraService,
                private $q: angular.IQService) {

      this.fibraService.on('change', () => this.queryAndBuild())
      this.itemService = sparqlItemService
      this.links = []
      this.$scope.layout = {
        'choice': 'force'
      }

      this.$scope.$watch('layout.choice', this.updateExplore.bind(this, false))

      // add shift to enable draw mode - this can easily be changed to require shift to be held
      this.$window.addEventListener('keydown', (event) => {
          if (document.activeElement instanceof HTMLBodyElement) {
            if (event.keyCode === 16 ) {
              this.drawmode = this.drawmode ? false : true
              this.svgSel.style('background-color', this.drawmode ? '#d9d9d9' : '#F2F2F2')
              if (this.drawmode) {
              this.svgSel.append('text')
                  .attr('id', 'drawmodetext')
                  .html('Draw Mode engaged; to link two nodes, drag from one to the other')
                  .style('stroke', 'red')
                  .attr('y', 100)
              } else {
                d3.select('#drawmodetext').remove()
                d3.selectAll('.dragLine').remove()
              }
            } else if (event.keyCode === 49) {
              console.log(this.links)
            } else if (event.keyCode === 50) {
              // console.log(this.items)
            }
          }
      })
    }

    private mergeNodes(oldNodes: Item[], newNodes: Item[]) {
      // TODO
      return newNodes
    }

    private mergeLinks(oldLinks: IExploreItemLink[]): IExploreItemLink[] {
      let newLinks: IExploreItemLink[] = []
      let items = this.primaryItems.concat(this.secondaryItems)

      let sameAs: ENodeMap<Item> = new ENodeMap<Item>()
      for (let item of items) {
        sameAs.set(item, item)
        let sameAsProp: PropertyToValues<INodePlusLabel> = item.localProperties.filter((p) =>
          OWL.sameAs.equals(p)
        )[0]
        if (sameAsProp && sameAsProp.values) for (let n of sameAsProp.values) sameAs.set(n, item)
      }

      // Iterate over item property values to see if they match the id of any
      // of the items displayed. Also check if they match sameAs values...
      for (let item of items) {
        for (let p of item.localProperties) {
          for (let v of p.values) {
            if (sameAs.has(v) && item !== sameAs.get(v) && items.indexOf(sameAs.get(v)) !== -1) {
              newLinks.push({
                source: <IExploreItem>item,
                target: <IExploreItem>sameAs.get(v),
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
      selectedItem: '=',
      chosenTypes: '='
    }
    public controller: string = 'ExploreComponentController' // (new (...args: any[]) => angular.IController) = ExploreComponentController
    public templateUrl: string = 'components/construct-view/explore.html'
  }
}
