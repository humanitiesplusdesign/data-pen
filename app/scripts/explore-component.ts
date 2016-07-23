namespace fibra {
  'use strict'

  interface WindowServiceWithD3 extends angular.IWindowService {
    d3: any
  }

  interface ExploreComponentInterface extends angular.IComponentController {

  }

  class ExploreComponentController {
    public itemService: SparqlItemService
    public items: Item[] = []
    public selectedItem: INode
    public properties: {}[]
    public classTreePromise: angular.IPromise<TreeNode[]>
    private svgSel: any
    private d3: any
    private links: any
    private forceSim: any

    public $postLink: () => void = () => {
      this.svgSel = this.$window.d3.select(this.$element[0]).select('svg')

      this.forceSim = this.d3.forceSimulation()
        .force("charge", this.d3.forceCollide(20))
        .force("attract", this.d3.forceManyBody().strength(3))
        .force("link", this.d3.forceLink().distance(40).strength(1).iterations(1).id(function(d) {return d.index}))

      this.queryAndBuild()
    }

    public queryAndBuild(): angular.IPromise<String> {
      return this.classTreePromise.then(ct => {
        return this.itemService.getAllItems().then(
          (items: Item[]) => {

            // Merge items
            this.items = this.mergeItems(this.items, items)
            this.properties = this.items[0].properties.map((p) => {
              return {key: p.toCanonical(), value: p.label.value }
            })
            return 'ok'
          }
        ).then(this.updateExplore.bind(this))
      })
    }

    private mergeItems(oldItems:Item[], newItems: Item[]): Item[] {
      let items: Item[] = [].concat(oldItems)
      let j, i: number

      for(i=0; i<oldItems.length; i++) {
        for(j=0; j<newItems.length; j++) {
          if(oldItems[i].value === newItems[j].value) {
            break
          }
        }

        if(j === newItems.length) {
          // Old item is not in new items. Remove.
          items.splice(items.indexOf(oldItems[i]),1)
        } 
      }

      // New item is not in old items. Add.
      for(j=0; j<newItems.length; j++) {
        for(i=0; i<oldItems.length; i++) {
          if(oldItems[i].value === newItems[j].value) {
            break
          }
        }

        if(i === oldItems.length) {
          items.push(newItems[j])
        } 
      }

      return items
    }

    public updateExplore(): string {

      // allow item_info_tip to expand somehow
      // add delete and alter ability to sparql-item.pug
      //fix how links sit on top of nodes
      let d3 = this.d3
      let viewport_width = window.innerWidth
      let viewport_height = window.innerHeight
      let searchbarwidth =   d3.select("#searchbar").style("width").replace('px','')
      let drawmode = false

      // add shift to enable draw mode - this can easily be changed to require shift to be held
      this.$window.addEventListener('keydown', (event) => {
          if (document.activeElement instanceof HTMLBodyElement) {
            if (event.keyCode === 16 ) {
              drawmode = drawmode ? false : true
              this.svgSel.style("background-color", drawmode ? "#d9d9d9" : "#F2F2F2")
              if (drawmode) {
              this.svgSel.append("text")
                  .attr("id", "drawmodetext")
                  .html("Draw Mode engaged; to link two nodes, drag from one to the other")
                  .style("stroke", "red")
                  .attr("y", 100)
              } else {
                d3.select("#drawmodetext").remove()
                d3.selectAll(".dragLine").remove()
              }
            } else if (event.keyCode === 49) {
              console.log(this.links)
            } else if (event.keyCode === 50) {
              console.log(this.items)
            }
          }
      })

      d3.select("#explorecontainer").style('width', viewport_width + "px")
        .style("height", viewport_height + 20 + "px")

      // dbl click to add - incomplete/broken
    this.svgSel.style('width', viewport_width + "px")
        .style("height", viewport_height - 50 + "px")
        .style("top", 25 + "px")
        .on("dblclick", () => {
            edittip.style("top", (this.d3.event.pageY - 40)+"px")
            .style("left", (this.d3.event.pageX - 40)+"px")
            .style("visibility", "visible")
            .html("Enter a label: <input type='text' name='label'>")
            .append("circle").attr("r", "4px").attr("fill", "red")
      //    this.$scope.$apply(() => {
      //      this.itemService.createNewItem([]);
      //      console.log(this.items)
      //    })
        });

        d3.select("#searchbar").style("top", viewport_height * 6 / 7 + "px")
          .style("left", viewport_width / 2 - searchbarwidth / 2 + "px")
          .style("display", "block")

      //move table down so top is at bottom of viewport
      d3.select("#exploretable").style('width', viewport_width + "px")
        .style("height", viewport_height - 50 + "px")

      let svg_width = +this.svgSel.style('width').replace("px", "")
      let svg_height = +this.svgSel.style('height').replace("px", "")

      this.forceSim.force("center", this.d3.forceCenter(svg_width/2, svg_height/2))

      let item_info_tip = d3.select("#right-column")

      let radius = 8

      let tooltip = d3.select("body").append("div")
        .style("position", "absolute")
        .style("z-index", "20")
        .style("background-color", "gray")
        .style("color", "white")
        .style("padding", "3px")
        .style("border-radius", "2px")
        .style("visibility", "hidden")

      let edittip = d3.select("body").append("div")
        .attr("id", "edittip")
        .style("position", "absolute")
        .style("z-index", "40")
        .style("background-color", "white")
        .style("color", "gray")
        .style("border", "1px solid gray")
        .style("padding", "3px")
        .style("border-radius", "2px")
        .style("visibility", "hidden")

      let dragline;

      let linked = this.svgSel.append("g")
          .attr("class", "links").selectAll("line")
        .data(this.links)
      
      linked.exit().remove()

      let link = linked
        .enter().append("line")
          .attr("id", (d,i) => {return "link-" + i})
      link = link.merge(linked)

      let items = this.svgSel.selectAll("circle").data(this.items, (d) =>  {return d.value })
      items.exit().remove()

      let node = items.enter().append("g")
          .attr("id", (d,i) => {
            return "node-" + i
          })
          .attr("class", "node")
        .append("circle")
          .attr("class", "node-circle")
          .attr("id", (d,i) => { return "node-circle-" + i})
          .style("stroke", "black")
          .attr("r", radius + "px")
          .call(d3.drag()
              .on("start", (d,i) => {
                if (!drawmode) {
                  if (!d3.event.active) this.forceSim.alphaTarget(.1).restart()
                    d.fx = d.x
                    d.fy = d.y
                } else {
                    dragline = this.svgSel.append("line")
                    .attr("class", "dragLine")
                }
               })
              .on("drag", (d,i) => {
                if (!drawmode) {
                  d3.select("#node-circle-" + i).classed("fixed", true)
                  d.fx = d3.event.x
                  d.fy = d3.event.y
                  if (d3.select("#node-circle-" + i).classed("selected-circle")) {
                  item_info_tip.style("top", (d3.event.y + 30)+"px")
                  .style("left", (d3.event.x + 30)+"px")
                  }
                } else {
                    dragline.attr("x1", d.x)
                    .attr("y1", d.y)
                    .attr("x2", d3.event.x)
                    .attr("y2", d3.event.y)
                }
               })
              .on("end",  (d,i) => {
                if (!drawmode) {
                  if (!d3.event.active) this.forceSim.alphaTarget(0)
                  if (!d3.select("#node-circle-" + i).classed("fixed")) {
                    d.fx = null
                    d.fy = null
                  }
                } else {
                  let lineX = dragline.attr("x2")
                  let lineY = dragline.attr("y2")

                  d3.selectAll(".node")
                    .each((f,j) => {
                      if (Math.abs(lineX - f.x) < radius && Math.abs(lineY - f.y) < radius) {
                        this.links.push({"source": i, "target": j})
                        this.svgSel.select(".links").remove()
                        let linkUpdate = this.svgSel.append("g").attr("class", "links").selectAll("line").data(this.links)
                        let linkExit = linkUpdate.exit().remove()
                        let linkEnter = linkUpdate.enter().append("line")
                        link = linkUpdate.merge(linkEnter)
                        this.forceSim.force("link").links(this.links)
                        linkEnter.attr("id", (d,i) => {return "link-" + i})
                          .attr("x1", (d) => {return d.source.x})
                          .attr("y1", (d) => {return d.source.y})
                          .attr("x2", (d) => {return d.target.x})
                          .attr("y2", (d) => {return d.target.y})
                          dragline.remove();
                      } else {
                        dragline.remove();
                      }
                    })
                }

               }))
          .on("mouseover", (d,i) => {
            this.hightlightLinks(d,i)
              tooltip.style("top", (d3.event.pageY - 10)+"px")
              .style("left", (d3.event.pageX + 10)+"px")
              .style("visibility", "visible")
              .text(d.label.value)
          })
          .on("mouseout", (d,i) => {
            d3.selectAll("line").classed("relevant", false)
            tooltip.style("visibility", "hidden")
          })
          .on('click', (d:INode, i) => {
            d3.selectAll(".node").classed("selected-circle", false).attr("r", radius + "px")
            this.d3.select("#node-circle-" + i).classed("selected-circle", true).attr("r", "11px")
            tooltip.style("visibility", "hidden")
            this.hightlightLinks(d, i)

            this.$scope.$apply(() => {
             this.selectItem(d)
           })

            item_info_tip.style("top", (d3.event.pageY -10)+"px")
            .style("left", (this.d3.event.pageX + 17)+"px")
            .style("visibility", "visible")
          })

      node = node.merge(items)

      let onTick = function() {
        console.log("Tick")
        
        node
          .attr("transform", (d,i) => {
            let x = d.x, y = d.y
            if (d.x > svg_width - radius) x = svg_width - radius
            if (d.x < radius) x = radius
            if (d.y > svg_height - radius) y = svg_height - radius
            if (d.y < radius) y = radius
            return "translate(" + x + ", " + y + ")"
          })

        link
          .attr("x1", (d) => {return d.source.x})
          .attr("y1", (d) => {return d.source.y})
          .attr("x2", (d) => {return d.target.x})
          .attr("y2", (d) => {return d.target.y})
      }

      this.forceSim.nodes(this.items)
        .on("tick", onTick)
      this.forceSim
        .force("link").links(this.links)
      this.forceSim.alpha(1).restart()

      return 'ok'
    }

    // currently broken on deleting a link
    public hightlightLinks(d, i):void {
      this.d3.selectAll("line").classed("relevant", false)
        for (let j = 0; j < this.links.length; j++) {
            let linksource:any = this.links[j].source
            let linktarget:any = this.links[j].target
            if (linksource.index == i || linktarget.index == i) {
                this.d3.select("#link-" + j).classed("relevant", true)
        }
      }
    }

    public selectItem(id: INode): void {
      this.selectedItem = id
    }

    //BUG: after deleting item, links think nodes are in old locations and stationary, items are not getting rebound to new nodes
    public delete(id: INode): angular.IPromise<string> {

      // remove any links from the item -
      for (let i = 0; i < this.links.length; i++) {
        if (this.links[i].source == id || this.links[i].target == id) {
          this.links.splice(i, 1)
        }
      }
      // might need more to fully clear svg of deleted links

      let prom = this.itemService.deleteItem(id)
      prom.then(() => this.fibraService.dispatch('change'))
      return prom
    }

    constructor(private $element: any,
                private $window: WindowServiceWithD3,
                private $scope: angular.IScope,
                private $timeout: angular.ITimeoutService,
                private sparqlItemService: SparqlItemService,
                private fibraService: FibraService,
                private $q: angular.IQService) {
      this.fibraService.on('change', () => {
        return this.queryAndBuild()
      })
      this.itemService = sparqlItemService
      this.d3 = this.$window.d3
      this.links = []
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
