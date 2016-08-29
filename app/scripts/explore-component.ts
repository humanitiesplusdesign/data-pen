namespace fibra {
  'use strict'

  interface IExploreComponentInterface extends angular.IComponentController {
  }

  interface IExploreItem extends Item, d3.SimulationNodeDatum {
  }

  interface IExploreItemLink extends d3.SimulationLinkDatum<IExploreItem> {
    property?: PropertyToValues<INodePlusLabel>
  }

  class ExploreComponentController {
    public itemService: SparqlItemService
    public items: Item[] = []
    public selectedItem: INode
    public properties: {}[]
    public classTreePromise: angular.IPromise<TreeNode[]>
    private svgSel: d3.Selection<SVGSVGElement, {}, null, undefined>
    private links: IExploreItemLink[]
    private forceSim: d3.Simulation<IExploreItem, IExploreItemLink>

    private drawmode: boolean = false

    public $postLink(): void {
      console.log('postLink')
      this.svgSel = d3.select(this.$element[0]).select<SVGSVGElement>('svg')

      // Create link g
      this.svgSel.append('g').attr('class', 'links')

      this.forceSim = d3.forceSimulation<IExploreItem, IExploreItemLink>()
        .force('charge', d3.forceCollide(20))
        .force('link', d3.forceLink().distance(40).strength(1).iterations(1).id((d: IExploreItem) => '' + d.index))
      this.queryAndBuild()
    }

    public queryAndBuild(): angular.IPromise<string> {
      return this.classTreePromise.then(ct => this.itemService.getItemsForExplore().then(
        (items: Item[]) => {
          // Merge items
          this.items = items
          this.properties = []
          for (let source of this.items[0].properties) for (let p of source.properties)
            this.properties.push({key: p.toCanonical(), value: p.label.value })
          this.links = this.mergeLinks(this.links)
          this.updateExplore()
          return 'ok'
        })
      )
    }

    public updateExplore(): string {

      // allow item_info_tip to expand somehow
      // add delete and alter ability to sparql-item.pug
      // fix how links sit on top of nodes
      let viewport_width: number = window.innerWidth
      let viewport_height: number = window.innerHeight
      let searchbarwidth: number = +d3.select('#searchbar').style('width').replace('px', '')

      d3.select('#explorecontainer').style('width', viewport_width + 'px')
        .style('height', viewport_height - 36 + 'px')

      d3.select('#searchbar').style('top', viewport_height * 6 / 7 + 'px')
        .style('left', viewport_width / 2 - searchbarwidth / 2 + 'px')
        .style('display', 'block')

      // move table down so top is at bottom of viewport
      d3.select('#exploretable').style('width', viewport_width + 'px')
        .style('height', viewport_height - 50 + 'px')

      this.svgSel.style('width', viewport_width + 'px')
        .style('height', viewport_height - 36 + 'px')
        // .style('top', 25 + 'px')

      let svg_width: number = +this.svgSel.style('width').replace('px', '')
      let svg_height: number = +this.svgSel.style('height').replace('px', '')

      this.forceSim.force('center', d3.forceCenter(svg_width / 2, svg_height / 2))
      this.forceSim.force('xposition', d3.forceX(svg_width / 2).strength(0.01))
      this.forceSim.force('yposition', d3.forceY(svg_height / 2).strength(0.01))

      let item_info_tip: d3.Selection<HTMLDivElement, {}, HTMLBodyElement, undefined> = d3.select('body').append<HTMLDivElement>('div')
        .attr('id', 'item_info_tip')
        .style('position', 'absolute')
        .style('z-index', '20')
        .style('background-color', 'white')
        .style('padding', '3px')
        .style('visibility', 'hidden')

      let radius: number = 8

      let tooltip: d3.Selection<HTMLDivElement, {}, HTMLBodyElement, undefined> = d3.select('body').append<HTMLDivElement>('div')
        .style('position', 'absolute')
        .style('z-index', '20')
        .style('background-color', 'gray')
        .style('color', 'white')
        .style('padding', '3px')
        .style('border-radius', '2px')
        .style('visibility', 'hidden')

      let edittip: d3.Selection<HTMLDivElement, {}, HTMLBodyElement, undefined> = d3.select('body').append<HTMLDivElement>('div')
        .attr('id', 'edittip')
        .style('position', 'absolute')
        .style('z-index', '40')
        .style('background-color', 'white')
        .style('color', 'gray')
        .style('border', '1px solid gray')
        .style('padding', '3px')
        .style('border-radius', '2px')
        .style('visibility', 'hidden')

      this.svgSel.on('dblclick', () => {
          edittip.style('top', (d3.event.pageY - 40) + 'px')
                 .style('left', (d3.event.pageX - 40) + 'px')
                 .style('visibility', 'visible')
                 .html('Enter a label: <input type="text" name="label">')
                 .append('circle')
                 .attr('r', '4px')
                 .attr('fill', 'red')
      //    this.$scope.$apply(() => {
      //      this.itemService.createNewItem([])
      //      console.log(this.items)
      //    })
        })


      let dragline: d3.Selection<SVGLineElement, {}, null, undefined>

      let linked: d3.Selection<SVGLineElement, IExploreItemLink, SVGGElement, {}> = this.svgSel.select<SVGGElement>('g.links').selectAll<SVGLineElement, IExploreItemLink>('line')
        .data(this.links)

      linked.exit().remove()

      let link: d3.Selection<SVGLineElement, IExploreItemLink, SVGGElement, {}> = linked
        .enter().append<SVGLineElement>('line')
          .attr('id', (d: IExploreItemLink, i: number) => 'link-' + i)
      link = link.merge(linked)

      let items: d3.Selection<d3.BaseType, {}, SVGSVGElement, {}> = this.svgSel.selectAll<SVGElement, IExploreItem>('circle').data(this.items, (d: Item) => d.value)
      items.exit().remove()

      let node: d3.Selection<d3.BaseType, {}, SVGSVGElement, {}> = items.enter().append('g')
          .attr('id', (d, i: number) => 'node-' + i)
          .attr('class', 'node')
        .append('circle')
          .attr('class', 'node-circle')
          .attr('id', (d, i: number) => 'node-circle-' + i)
          .style('stroke', 'black')
          .attr('r', radius + 'px')
          .call(d3.drag()
              .on('start', (d: IExploreItem, i: number) => {
                if (!this.drawmode) {
                  if (!d3.event.active) this.forceSim.alphaTarget(.1).restart()
                  d.fx = d.x
                  d.fy = d.y
                } else {
                    dragline = this.svgSel.append<SVGLineElement>('line')
                    .attr('class', 'dragLine')
                }
               })
              .on('drag', (d: IExploreItem, i: number) => {
                if (!this.drawmode) {
                  d3.select('#node-circle-' + i).classed('fixed', true)
                  d.fx = d3.event.x
                  d.fy = d3.event.y
                  if (d3.select('#node-circle-' + i).classed('selected-circle')) {
                  item_info_tip.style('top', (d3.event.y + 30) + 'px')
                  .style('left', (d3.event.x + 30) + 'px')
                  }
                } else {
                  dragline.attr('x1', d.x!)
                    .attr('y1', d.y!)
                    .attr('x2', d3.event.x)
                    .attr('y2', d3.event.y)
                }
               })
              .on('end',  (d: IExploreItem, i: number) => {
                if (!this.drawmode) {
                  if (!d3.event.active) this.forceSim.alphaTarget(0)
                  if (!d3.select('#node-circle-' + i).classed('fixed')) {
                    d.fx = undefined
                    d.fy = undefined
                  }
                } else {
                  let lineX: number = +dragline.attr('x2')
                  let lineY: number = +dragline.attr('y2')

                  d3.selectAll('.node')
                    .each((f: IExploreItem, j) => {
                      if (Math.abs(lineX - f.x) < radius && Math.abs(lineY - f.y) < radius) {
                        this.links.push({'source': d, 'target': f, 'property': undefined})
                        this.updateExplore()
                      }
                    })
                  dragline.remove()
                }

               }))
          .on('mouseover', (d: IExploreItem, i: number) => {
            this.highlightLinks(d, i)
            tooltip.style('top', (d3.event.pageY - 10) + 'px')
              .style('left', (d3.event.pageX + 10) + 'px')
              .style('visibility', 'visible')
              .text(d.label.value)
          })
          .on('mouseout', (d: IExploreItem, i: number) => {
            d3.selectAll('line').classed('relevant', false)
            tooltip.style('visibility', 'hidden')
          })
          .on('click', (d: IExploreItem, i) => {
            d3.selectAll('.node').classed('selected-circle', false).attr('r', radius + 'px')
            d3.select('#node-circle-' + i).classed('selected-circle', true).attr('r', '11px')
            tooltip.style('visibility', 'hidden')
            this.highlightLinks(d, i)
            this.$scope.$apply(() => this.selectItem(d))
            item_info_tip.style('top', (d3.event.pageY - 10) + 'px')
            .style('left', (d3.event.pageX + 17) + 'px')
            .style('visibility', 'visible')
            let cscope: angular.IScope = this.$scope.$new(true)
            cscope['node'] = d.node
            item_info_tip.selectAll('*').remove()
            item_info_tip.node().appendChild(this.$compile('<sparql-item item-id="node"></sparql-item>')(cscope)[0])
          })

      node = node.merge(items)

      let onTick: () => void = () => {

        node
          .attr('transform', (d: IExploreItem, i) => {
            let x: number = d.x!, y: number = d.y!
            if (d.x > svg_width - radius) x = svg_width - radius
            if (d.x < radius) x = radius
            if (d.y > svg_height - radius) y = svg_height - radius
            if (d.y < radius) y = radius
            return 'translate(' + x + ', ' + y + ')'
          })

        link
          .attr('x1', (d: IExploreItemLink) => (<IExploreItem>d.source).x!)
          .attr('y1', (d: IExploreItemLink) => (<IExploreItem>d.source).y!)
          .attr('x2', (d: IExploreItemLink) => (<IExploreItem>d.target).x!)
          .attr('y2', (d: IExploreItemLink) => (<IExploreItem>d.target).y!)
      }

      this.forceSim.nodes(this.items)
        .on('tick', onTick)
      this.forceSim
        .force<d3.ForceLink<IExploreItem, IExploreItemLink>>('link').links(this.links)
      this.forceSim.alpha(1).restart()

      return 'ok'
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
                private $scope: angular.IScope,
                private $timeout: angular.ITimeoutService,
                private sparqlItemService: SparqlItemService,
                private fibraService: FibraService,
                private $q: angular.IQService) {
      this.fibraService.on('change', () => this.queryAndBuild())
      this.itemService = sparqlItemService
      this.links = []

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
              console.log(this.items)
            }
          }
      })
    }

    private mergeLinks(oldLinks: IExploreItemLink[]): IExploreItemLink[] {
      let newLinks: IExploreItemLink[] = []

      let sameAs: ENodeMap<Item> = new ENodeMap<Item>()
      for (let item of this.items) {
        sameAs.set(item, item)
        let sameAsProp: PropertyToValues<INodePlusLabel> = item.properties[0].properties.filter((p) =>
          OWL.sameAs.equals(p)
        )[0]
        if (sameAsProp && sameAsProp.values) for (let n of sameAsProp.values) sameAs.set(n, item)
      }

      // Iterate over item property values to see if they match the id of any
      // of the items displayed. Also check if they match sameAs values...
      for (let item of this.items)
        for (let source of item.properties)
          for (let p of source.properties)
            for (let v of p.values)
              if (sameAs.has(v))
                newLinks.push({
                  source: <IExploreItem>item,
                  target: <IExploreItem>sameAs.get(v),
                  property: p
                })
      return newLinks
    }
  }

  export class ExploreComponent implements angular.IComponentOptions {
    public bindings: {[id: string]: string} = {
      classTreePromise: '<',
      selectedItem: '='
    }
    public controller: angular.IComponentController = ExploreComponentController
    public templateUrl: string = 'partials/explore.html'
  }
}
