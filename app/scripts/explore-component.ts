namespace fibra {
  'use strict'

  interface WindowServiceWithD3 extends angular.IWindowService {
    d3: any
  }

  interface ExploreComponentInterface extends angular.IComponentController {

  }

  class ExploreComponentController {
    public itemService: SparqlItemService
    public items: Item[]
    public selectedItem: INode
    public properties: {}[]
    public classTreePromise: angular.IPromise<TreeNode[]>
    private svgSel: any
    private d3: any

    public $postLink: () => void = () => {
      this.svgSel = this.$window.d3.select(this.$element[0]).select('svg')
      this.queryAndBuild()
    }

    public queryAndBuild(): angular.IPromise<String> {
      return this.classTreePromise.then(ct => {
        return this.itemService.getAllItems().then(
          (items: Item[]) => {
            this.items = items
            this.properties = this.items[0].properties.map((p) => {
              return {key: p.toCanonical(), value: p.label.value }
            })
            return 'ok'
          }
        ).then(this.updateExplore.bind(this))
      })
    }

    public updateExplore(): string {
      //to do: fix highlightLinks, fix display issues in item_info_tip when hovering, allow item_info_tip to expand somehow
      // add delete and alter ability to sparql-item.pug, add shift + drag line for linking
      let viewport_width = window.innerWidth;
      let viewport_height = window.innerHeight;
      let drawmode = false;

      this.$window.addEventListener('keydown', (event) => {
          if (event.keyCode === 16) {
            drawmode = drawmode ? false : true
            this.d3.select("#explore").style("background-color", drawmode ? "#bfbfbf" : "white")
            if (drawmode) {
              this.d3.select("#explore").append("text")
                .attr("id", "drawmodetext")
                .html("Draw Mode engaged; to link two nodes, drag from one to the other")
                .style("stroke", "red")
                .style("fill", "blue")
                .attr("y", 100)
            } else {
              this.d3.select("#drawmodetext").remove()
            }

          }
      })


      this.d3.select("#explore").style('width', viewport_width + "px")
        .style("height", viewport_height - 50 + "px")
        .on("dblclick", () => {
          this.$scope.$apply(() => {
            this.itemService.createNewItem();
          })
        });

      this.d3.select("#exploretable").style('width', viewport_width + "px")
        .style("height", viewport_height - 50 + "px")

      let svg_width = +this.d3.select("#explore").style('width').replace("px", "")
      let svg_height = +this.d3.select("#explore").style('height').replace("px", "")

      let item_info_tip = this.d3.select("#right-column")

      let radius = 8

      let tooltip = this.d3.select("body").append("div")
        .style("position", "absolute")
        .style("z-index", "20")
        .style("background-color", "gray")
        .style("padding", "3px")
        .style("border-radius", "2px")
        .style("visibility", "hidden")

      let demo_links = [
        {"source": 1, "target": 3},
        {"source": 4, "target": 2},
        {"source": 8, "target": 9},
        {"source": 7, "target": 5},
        {"source": 12, "target": 13},
        {"source": 4, "target": 15},
        {"source": 6, "target": 4},
        {"source": 1, "target": 5},
        {"source": 5, "target": 8},
        {"source": 15, "target": 8},
        {"source": 1, "target": 2},
        {"source": 10, "target": 3},
        {"source": 10, "target": 9},
        {"source": 11, "target": 5},
        {"source": 0,  "target": 6},
        {"source": 10, "target": 9}
      ]

      let dragline;

      let test_simulation = this.d3.forceSimulation()
        .force("charge", this.d3.forceManyBody(3))
        .force("center", this.d3.forceCenter(500, 190))
        .force("link", this.d3.forceLink().distance(40).strength(1).iterations(1).id(function(d) {return d.index}))

      let linked = this.svgSel.append("g")
      .attr("class", "links").selectAll("line")
       .data(demo_links)

       linked.exit().remove()

      let link = linked
       .enter().append("line")
        .attr("id", (d,i) => {return "link-" + i})
        .on("click", (d,i) => {
          this.d3.select("#link-" + i).remove()

          for (let j = 0; j < demo_links.length; j++) {
            let linksource:any = demo_links[j].source
            let linktarget:any = demo_links[j].target
            if (linksource.index == d.source.index && linktarget.index == d.target.index) demo_links.splice(j, 1)

          }
        })

      let items = this.svgSel.selectAll("circle").data(this.items, (d) =>  {return d.value })
        items.exit().remove()

      let node = items.enter().append("g")
        .attr("id", (d,i) => {return "node-" + i})
        .attr("class", "node")
        .append("circle")
          .attr("class", "node-circle")
          .attr("id", (d,i) => { return "node-circle-" + i})
        .merge(items)
          .style("stroke", "black")
          .attr("r", radius + "px")
          .call(this.d3.drag()
              .on("start", (d,i) => {
                if (!drawmode) {
                  if (!this.d3.event.active) test_simulation.alphaTarget(.1).restart()
                    d.fx = d.x
                    d.fy = d.y
                } else {
                    dragline = this.svgSel.append("line")
                    .attr("id", "dragLine")
                }
               })
              .on("drag", (d,i) => {
                if (!drawmode) {
                  this.d3.select("#node-" + i).classed("fixed", true)
                  d.fx = this.d3.event.x
                  d.fy = this.d3.event.y
                  if (this.d3.select("#node-circle-" + i).classed("selected-circle")) {
                  item_info_tip.style("top", (this.d3.event.y + 30)+"px")
                  .style("left", (this.d3.event.x + 30)+"px")
                  }
                } else {
                    dragline.attr("x1", d.x)
                    .attr("y1", d.y)
                    .attr("x2", this.d3.event.x)
                    .attr("y2", this.d3.event.y)
                }
               })
              .on("end",  (d,i) =>   {
                if (!drawmode) {
                  if (!this.d3.event.active) test_simulation.alphaTarget(0)
                  if (!this.d3.select("#node-" + i).classed("fixed")) {
                    d.fx = null
                    d.fy = null
                  }
                } else {
                  let lineX = dragline.attr("x2")
                  let lineY = dragline.attr("y2")

                  this.d3.selectAll(".node")
                    .each((f,j) => {
                      if (Math.abs(lineX - f.x) < radius && Math.abs(lineY - f.y) < radius) {
                        demo_links.push({"source": i, "target": j})
                      //  make line show up
                          dragline.remove();
                      } else {
                        dragline.remove();
                      }
                    })
                      // this seems to work, but might be cleaner way
                      this.svgSel.select(".links").remove()
                      let linkUpdate = this.svgSel.append("g").attr("class", "links").selectAll("line").data(demo_links)
                      let linkExit = linkUpdate.exit().remove()
                      let linkEnter = linkUpdate.enter().append("line")
                        .attr("id", (d,i) => {return "link-" + i})
                        .attr("x1", (d) => {return d.source.x})
                        .attr("y1", (d) => {return d.source.y})
                        .attr("x2", (d) => {return d.target.x})
                        .attr("y2", (d) => {return d.target.y})
                      link = linkUpdate.merge(linkEnter)

                      test_simulation.force("link").links(demo_links)
                }

               }))
          .on("mouseover", (d,i) => {
            this.hightlightLinks(d,i, demo_links)
            if (!this.d3.select("#node-circle-" + i).classed("selected-circle")) {
              tooltip.style("top", (this.d3.event.pageY - 10)+"px")
              .style("left", (this.d3.event.pageX + 10)+"px")
              .style("visibility", "visible")
              .text(d.label.value)
            }
          })
          .on("mouseout", (d,i) => {
            this.d3.selectAll("line").classed("relevant", false)
            for (let j = 0; j < this.svgSel.selectAll("circle").size(); j++) {
              if (this.d3.select("#node-circle-" + j).classed("selected-circle")) {
                  this.hightlightLinks(d, j, demo_links)
              }
            }

            tooltip.style("visibility", "hidden")
          })
          .on('click', (d:INode, i) => {
            this.hightlightLinks(d, i, demo_links)
            tooltip.style("visibility", "hidden")

            item_info_tip.style("top", (this.d3.event.pageY -10)+"px")
            .style("left", (this.d3.event.pageX + 17)+"px")
            .style("visibility", "visible")

            //unselects each circle
            for (let j = 0; j < this.svgSel.selectAll("circle").size(); j++) {
                this.d3.select("#node-circle-" + j).classed("selected-circle", false)
                this.d3.select("#node-circle-text-" + j).style("opacity", 0)
                this.d3.select("#node-circle-text-" + j).style("cursor", "default")
                this.d3.select("#node-circle-" + j).attr("r", radius + "px")
            }
            //selects the clicked circle
            this.d3.select("#node-circle-" + i).classed("selected-circle", true)
            this.d3.select("#node-circle-text-" + i).style("opacity", 1)
            this.d3.select("#node-circle-text-" + i).style("cursor", "s-resize")
            this.d3.select("#node-circle-" + i).attr("r", "11px")

            this.$scope.$apply(() => {
              this.selectItem(d)
            })
          })

      test_simulation.nodes(this.items)
      .on("tick", () => {
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
      })
      test_simulation.force("link").links(demo_links)

      //makes the left column pop-out on hover
      this.d3.select("#left-column").on("mouseover", () => {
        this.d3.select("#left-column").style("opacity", 1)
          .style("border-right", "2px solid black")
          .style("width", "80px")
          .style("padding-right", "10px")
          .style("border-bottom-right-radius", "8px")
      })
        .on("mouseout", () => {
          this.d3.select("#left-column").style("opacity", .5)
          .style("width", "8px")
          .style("border-right", "8px solid black")
          .style("border-bottom-right-radius", "1px")
          .style("padding-right", "0px")
        })

      return 'ok'
    }

    // currently broken on deleting a link
    public hightlightLinks(d, i, linkArray):void {
      this.d3.selectAll("line").classed("relevant", false)
        for (let j = 0; j < linkArray.length; j++) {
            let linksource:any = linkArray[j].source
            let linktarget:any = linkArray[j].target
            if (linksource.index == i || linktarget.index == i) {
                this.d3.select("#link-" + j).classed("relevant", true)
        }
      }
    }

    public selectItem(id: INode): void {
      this.selectedItem = id
    }

    public delete(id: INode): angular.IPromise<string> {
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
