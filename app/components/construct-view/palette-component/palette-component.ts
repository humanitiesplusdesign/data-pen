namespace fibra {
  'use strict'

  interface IPaletteItem extends Item {
    typeValue: string
    typeLabel: string
  }

  export class PaletteComponentController {

    private svgSel: d3.Selection<SVGSVGElement, {}, null, undefined>
    private circles: d3.Selection<d3.BaseType, IPaletteItem, SVGSVGElement, {}>
    private tooltip: d3.Selection<HTMLDivElement, {}, HTMLBodyElement, undefined>
    private items: IPaletteItem[]
    private itemPromise: angular.IPromise<IPaletteItem[]>
    private paletteWidth: number
    private paletteHeight: number
    private paletteSearchHeight: number = 40
    private typeColorScale: d3.ScaleOrdinal<string, string> = d3.scaleOrdinal(d3.schemeCategory20c)
    private labelFilter: string = ''

    public constructor( private fibraService: FibraService,
                        private configurationService: ConfigurationService,
                        private $element: angular.IAugmentedJQuery,
                        private sparqlItemService: SparqlItemService,
                        private sparqlTreeService: SparqlTreeService,
                        private $q: angular.IQService) {

      this.query()
    }

    public query(): angular.IPromise<IPaletteItem[]> {
      return this.itemPromise = this.sparqlItemService.getAllItems().then((items: IPaletteItem[]) => {
        return this.items = this.mergeItems(this.items, items)
      })
    }

    public $postLink(): void {
      this.svgSel = d3.select(this.$element[0]).select<SVGSVGElement>('svg')

      this.svgSel
        .style('height', '100%')
        .style('width', '100%')

      this.tooltip = d3.select('body').append<HTMLDivElement>('div')
        .style('position', 'absolute')
        .style('z-index', '20')
        .style('background-color', 'gray')
        .style('color', 'white')
        .style('padding', '3px')
        .style('border-radius', '2px')
        .style('visibility', 'hidden')

      let onChangeFunction = () => {
        return this.query().then(this.build.bind(this)).then(() => { return 'Done' })
      }

      this.fibraService.on('change', onChangeFunction)

      this.itemPromise.then((items) => {
        this.build.bind(this)(items)
      })
    }

    public addItem(item: IPaletteItem) {
      let itemTypeKey: string = item.typeValue
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

    public build(items: IPaletteItem[]) {
      this.updateSizing()
      this.circles = this.svgSel
        .selectAll('circle.item')
          .data(items, (d: IPaletteItem) => d.value )

      let padding = items.length > 300 ? items.length > 2000 ? 1 : 2 : 4
      let rawRadius = (Math.sqrt(this.paletteWidth * this.paletteHeight / items.length) - padding) / 2
      let radius = rawRadius > 8 ? 8 : rawRadius
      let xOffset = radius * 2 + padding / 2
      let yOffset = radius * 2 + padding / 2
      let xDots = Math.floor((this.paletteWidth) / xOffset) - 1

      this.circles.exit().remove()

      this.circles = this.circles.enter()
        .append('circle')
          .classed('item', true)
          .attr('r', radius)
          .on('click', this.addItem.bind(this))
          .on('mouseover', (d: IPaletteItem, i: number) => {
            this.tooltip.style('top', (d3.event.pageY - 10) + 'px')
              .style('left', (d3.event.pageX + 10) + 'px')
              .style('visibility', 'visible')
              .text(d.label.value + ' (' + d.typeLabel + ')')
          })
          .on('mouseout', (d: IExploreItem, i: number) => {
            this.tooltip.style('visibility', 'hidden')
          })
        .merge(this.circles)
          .call(this.update.bind(this))

      this.circles
        .transition()
          .attr('fill', (d: IPaletteItem) => this.typeColorScale(d.typeValue))
          .attr('transform', (d, i) => { return 'translate(' + ((i % xDots) + 1) * xOffset + ',' + (Math.floor(i / xDots) + 1) * yOffset + ')'})
    }

    public update(circles: d3.Selection<d3.BaseType, IPaletteItem, SVGSVGElement, {}>) {
      let c: d3.Selection<d3.BaseType, IPaletteItem, SVGSVGElement, {}> = circles ? circles : this.circles

      c .classed('displayed', (d: IPaletteItem) => this.fibraService.getState().construct.itemIndex[d.value] ? true : false)
        .classed('filtered', (d: IPaletteItem) => this.labelFilter && !(d.label.value.toUpperCase().indexOf(this.labelFilter.toUpperCase()) !== -1))
    }

    private updateSizing(): void {
      this.paletteWidth = Math.round(window.innerWidth * 0.15) // this.svgSel.node().clientWidth
      this.paletteHeight = Math.round(window.innerHeight) - this.paletteSearchHeight
      this.svgSel.style('height', this.paletteHeight + 'px')
    }

    private mergeItems(oldItems, newItems: IPaletteItem[]) {
      newItems.forEach((item) => {
        let typeProp = item.localProperties.filter((p) => p.value === RDF.type.value)[0]
        if(typeProp && typeProp.values[0]) {
          item.typeValue = typeProp.values[0].value
          item.typeLabel = typeProp.values[0].label.value
        } else {
          item.typeValue = ''
          item.typeLabel = 'No type defined'
        }
      })
      newItems.sort((a: IPaletteItem, b: IPaletteItem) => a.typeValue === b.typeValue ? 0 : a.typeValue > b.typeValue ? 1 : -1)
      return newItems.filter((item: IPaletteItem) => item.typeValue !== '')
    }
  }

  export class PaletteComponent implements angular.IComponentOptions {
    public templateUrl: string = 'components/construct-view/palette-component/palette-component.html'
    public controller: string = 'PaletteComponentController'
  }
}
