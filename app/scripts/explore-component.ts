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
      let drag = this.d3.drag()
        .on("drag", (d,i) => {
            let x = this.d3.event.x
            let y = this.d3.event.y
            //prevents dragging nodes outside of the svg
            let svg_width = +this.d3.select("#explore").style('width').replace("px", "")
            let svg_height = +this.d3.select("#explore").style('height').replace("px", "")
            if (x < 0) x = 0;
            if (y < 0) y = 0;
            if (x > svg_width) x = svg_width;
            if (y > svg_height) y = svg_height;
          this.d3.select("#node-container-" + i).attr("transform", () => {
            return "translate(" + [x,y] + ")"
          })
     })

      let items = this.svgSel.selectAll("circle").data(this.items, (d) => {
        return d.value })
      items.exit().remove()

      //container holding circle and label
      let nodes = items.enter().append("g")
        .attr("class", "node-container")
        .attr("id", (d,i) => { return "node-container-" + i})
        .attr("transform", (d,i) => {return "translate(" + [i*50 + 30 + this.d3.randomUniform(-10, 10)(), 60 + this.d3.randomUniform(-10, 100)()] + ")"})
        .call(drag)

      nodes.append("circle")
          .attr("class", "node-circle")
          .attr("id", (d,i) => { return "node-circle-" + i})
        .merge(items)
          .style("stroke", "black")
          .attr("r", "8px")
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
                this.d3.select("#node-circle-" + j).attr("r", "7px")
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

          // appends a text label to each node with the name of the person
          nodes.append("text")
            .attr("id", (d,i) => { return "node-circle-text-" + i})
            .attr("class", "node-text")
            .attr("text-anchor", "middle")
            .attr("y", 36)
            .style("opacity", 0)
            .text((d,i) => { return d.label.value})
            .on("click", (d,i) => {
              // on clicking text label, scrolls page down to person's information
              if (this.d3.select("#node-circle-" + i).classed("selected-circle")) {
                $('html,body').animate({scrollTop:$('body').height()}, 500)
              }
            })

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
