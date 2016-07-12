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
      let svg_width = +this.d3.select("#explore").style('width').replace("px", "")
      let svg_height = +this.d3.select("#explore").style('height').replace("px", "")
      let radius = 8

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

      let test_simulation = this.d3.forceSimulation()
        .force("charge", this.d3.forceManyBody(-5).distanceMax(200))
        .force("center", this.d3.forceCenter(500, 190))
        .force("link", this.d3.forceLink().distance(40).strength(1).iterations(1).id(function(d) {return d.index}))

      let link = this.svgSel.append("g")
      .attr("class", "links").selectAll("line")
       .data(demo_links)
       .enter().append("line")

      let items = this.svgSel.selectAll("circle").data(this.items, (d) =>  {return d.value })
        items.exit().remove()

      let node = items.enter().append("g")
        .attr("class", "node")
        .append("circle")
          .attr("class", "node-circle")
          .attr("id", (d,i) => { return "node-circle-" + i})
        .merge(items)
          .style("stroke", "black")
          .attr("r", radius + "px")
          .call(this.d3.drag()
              .on("start", (d) => {
                 if (!this.d3.event.active) test_simulation.alphaTarget(.2).restart();
                 d.fx = d.x;
                 d.fy = d.y;
               })
              .on("drag", (d) => {
                 d.fx = this.d3.event.x;
                 d.fy = this.d3.event.y;
               })
              .on("end",  (d) =>   {
                 if (!this.d3.event.active) test_simulation.alphaTarget(0);
                 d.fx = null;
                 d.fy = null;
               }))
               .on("mouseover", (d,i) => {
            if (!this.d3.select("#node-circle-" + i).classed("selected-circle")) {
              this.d3.select("#node-circle-text-" + i).style("opacity", 1)

            }
          })
          .on("mouseout", (d,i) => {
            if (!this.d3.select("#node-circle-" + i).classed("selected-circle")) {
            this.d3.select("#node-circle-text-" + i).style("opacity", 0)
            }
          })
          .on('click', (d:INode, i) => {

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
                  .attr("transform", function(d) {
                    let x = d.x, y = d.y
                    if (d.x > svg_width - radius) x = svg_width - radius
                    if (d.x < radius) x = radius
                    if (d.y > svg_height - radius) y = svg_height - radius
                    if (d.y < radius) y = radius
                     return "translate(" + x + ", " + y + ")";
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
