namespace fibra {
  'use strict'

  interface PaletteItem extends Item {

  }

  export class PaletteComponentController {

    private svgSel: d3.Selection<SVGSVGElement, {}, null, undefined>
    private items: PaletteItem[]
    private itemPromise: angular.IPromise<PaletteItem[]>
    private paletteWidth: number
    private paletteHeight: number

    public constructor( private fibraService: FibraService,
                        private configurationService: ConfigurationService,
                        private $element: angular.IAugmentedJQuery,
                        private sparqlItemService: SparqlItemService,
                        private sparqlTreeService: SparqlTreeService,
                        private $q: angular.IQService) {

      this.query()
    }

    public query(): angular.IPromise<PaletteItem[]> {
      return this.itemPromise = this.sparqlItemService.getAllItems().then((items) => {
        return this.items = this.mergeItems(this.items, items)
      })
    }

    public $postLink(): void {
      this.svgSel = d3.select(this.$element[0]).select<SVGSVGElement>('svg')

      this.svgSel
        .style('height', '100%')
        .style('width', '100%')

      let onChangeFunction = () => {
        return this.query().then(this.build.bind(this)).then(() => { return 'Done' })
      }

      this.fibraService.on('change', onChangeFunction)

      this.itemPromise.then((items) => {
        this.build.bind(this)(items)
      })
    }

    public addItem(item: PaletteItem) {
      let itemTypeKey: string = item.localProperties.filter((p) => p.value === RDF.type.value)[0].values[0].value
      let itemType: TreeNode = this.fibraService.getState().construct.types.filter((t) => { return t.id === itemTypeKey })[0]
      let chosenTypes: TreeNode[] = this.fibraService.getState().construct.displayTypes
      if (!chosenTypes[0] && itemType) {
        this.fibraService.dispatchAction(this.fibraService.setOrderedTypes([itemType]))
      } else if (!chosenTypes[1] && itemType && (chosenTypes[0] !== itemType)) {
        let newTypes: TreeNode[] = chosenTypes.concat([])
        newTypes.push(itemType)
        this.fibraService.dispatchAction(this.fibraService.setOrderedTypes(newTypes))
      }
      return this.fibraService.dispatchAction(this.fibraService.displayItem(item)).then((state) => {
        this.fibraService.dispatch('change')
        return state
      })
    }

    public build(items: PaletteItem[]) {
      this.updateSizing()
      let circles = this.svgSel
        .selectAll('circle.item')
          .data(items)

      let padding = items.length > 300 ? items.length > 2000 ? 1 : 2 : 4
      let rawRadius = (Math.sqrt(this.paletteWidth * this.paletteHeight / items.length) - padding) / 2
      let radius = rawRadius > 8 ? 8 : rawRadius
      let xOffset = radius * 2 + padding
      let yOffset = radius * 2 + padding
      let xDots = Math.floor((this.paletteWidth) / xOffset) - 1

      circles.exit().remove()

      circles.enter()
        .append('circle')
          .classed('item', true)
          .attr('r', radius)
          .on('click', this.addItem.bind(this))
        .merge(circles)
          .attr('transform', (d, i) => { return 'translate(' + ((i % xDots) + 1) * xOffset + ',' + (Math.floor(i / xDots) + 1) * yOffset + ')'})
    }

    private updateSizing(): void {
      this.paletteWidth = Math.round(window.innerWidth * 0.15) // this.svgSel.node().clientWidth
      this.paletteHeight = Math.round(window.innerHeight)
    }

    private mergeItems(oldItems, newItems) {
      return newItems
    }
  }

  export class PaletteComponent implements angular.IComponentOptions {
    public templateUrl: string = 'components/construct-view/palette-component/palette-component.html'
    public controller: string = 'PaletteComponentController'
  }
}