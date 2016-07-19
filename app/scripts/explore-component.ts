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
      // add delete and alter ability to sparql-item.pug

      //fix how links sit on top of nodes
      let viewport_width = window.innerWidth;
      let viewport_height = window.innerHeight;
      let drawmode = false;

      // add shift to enable draw mode - this can easily be changed to require shift to be held
      this.$window.addEventListener('keydown', (event) => {
        console.log(document.activeElement)
          if (event.keyCode === 16 && document.activeElement instanceof HTMLBodyElement) {
            drawmode = drawmode ? false : true
            this.d3.select("#explore, #explorecontainer").style("background-color", drawmode ? "#d9d9d9" : "#F2F2F2")
            if (drawmode) {
              this.d3.select("#explore").append("text")
                .attr("id", "drawmodetext")
                .html("Draw Mode engaged; to link two nodes, drag from one to the other")
                .style("stroke", "red")
                .attr("y", 100)
            } else {
              this.d3.select("#drawmodetext").remove()
              this.d3.selectAll(".dragLine").remove()
            }

          }
      })

      this.d3.selectAll(".treelist, .treelist li, .treelist ul").on("mouseover", () => {
        console.log(this.d3.event.x)
        this.d3.selectAll(".treelist").style("left", this.d3.event.x + "px")
      })

      this.d3.select("#explorecontainer").style('width', viewport_width + "px")
        .style("height", viewport_height + 20 + "px")

      // dbl click to add - incomplete/broken
      this.d3.select("#explore").style('width', viewport_width + "px")
        .style("height", viewport_height - 50 + "px")
        .style("top", 25 + "px")
        .on("dblclick", () => {
          this.$scope.$apply(() => {
            this.itemService.createNewItem();
          })
        });

        this.d3.select("#searchbar").style("top", viewport_height * 6 / 7 + "px")
          .style("left", viewport_width / 2 - 100 + "px")



      //move table down so top is at bottom of viewport
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
        .style("color", "white")
        .style("padding", "3px")
        .style("border-radius", "2px")
        .style("visibility", "hidden")

      let demo_links = [

      ]

      let dragline;

      let test_simulation = this.d3.forceSimulation()
        .force("charge", this.d3.forceManyBody(3))
        .force("center", this.d3.forceCenter(svg_width/2, svg_height/2))
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
                    .attr("class", "dragLine")
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
                        this.svgSel.select(".links").remove()
                        let linkUpdate = this.svgSel.append("g").attr("class", "links").selectAll("line").data(demo_links)
                        let linkExit = linkUpdate.exit().remove()
                        let linkEnter = linkUpdate.enter().append("line")
                        link = linkUpdate.merge(linkEnter)
                        test_simulation.force("link").links(demo_links)
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
                      // this seems to work, but might be cleaner way

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
