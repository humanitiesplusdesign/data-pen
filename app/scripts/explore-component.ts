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

    public $onInit: () => void = () => {
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
      let items = this.svgSel.selectAll("circle").data(this.items, (d) => { return d.value })
      items.exit().remove()
      items.enter().append("circle")
          .style("fill", "grey")
        .merge(items)
          .style("stroke", "grey")
          .attr("r", "20px")
          .attr("transform", (d,i) => { return "translate(" + (30+(i*45)) + ",60)" })
          .on('click', (d:INode) => {
            this.$scope.$apply(() => {
              this.selectItem(d)
            })
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
