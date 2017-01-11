namespace fibra {
  'use strict'
  export class PropertyPopover {

    private propertyPopover: d3.Selection<HTMLDivElement, {}, HTMLBodyElement, undefined>

    public constructor(
        private $element: angular.IAugmentedJQuery,
        private $scope: angular.IScope,
        private fibraService: fibra.FibraService,
        private $compile: angular.ICompileService) {

      this.propertyPopover = d3.select($element[0]).append<HTMLDivElement>('div')
        .classed('property-popover', true)
    }

    public addPopover(this, $scope, types, baseSVG, d, i, g): void {
      let enterNode: any = this
      let propertyPopover: d3.Selection<HTMLDivElement, {}, HTMLBodyElement, undefined> = 
        d3.select(baseSVG.node().parentElement.parentElement).select<HTMLDivElement>('div.property-popover')
      propertyPopover.select('property-popover').remove()
      propertyPopover
        .style('left', (d.fx - 3) + 'px')
        .style('top', (d.fy + 12) + 'px')
      let cscope: angular.IScope = $scope.$new(true)
      cscope['node'] = d
      cscope['types'] = types
      cscope['close'] = () => {
        propertyPopover.style('visibility', 'hidden')
      }
      console.log(cscope['close'])
      propertyPopover.node().appendChild(this.$compile('<property-popover node="node" types="types" close="close"></property-popover>')(cscope)[0])
      propertyPopover.style('visibility', 'visible')
    }

    public hidePopover(): void {
      this.propertyPopover.style('visibility', 'hidden')
    }
  }

  export class PropertyPopoverComponent implements angular.IComponentOptions {
    public bindings: {[id: string]: string} = {
      types: '=',
      node: '=',
      close: '='
    }
    public templateUrl: string = 'components/construct-view/property-popover-component.html'
    public controller = 'PropertyPopoverComponentController'
  }

  export class PropertyPopoverComponentController {
    public types
    public node: Item
    public close: () => void
    public chosenType: TreeNode
    public label: string
    public thingType: string = OWL.Thing.value

    public constructor(
      private fibraService: fibra.FibraService,
      private sparqlItemService: SparqlItemService
    ) { }

    public $postLink(): void {
      this.label = this.node.label.value

      let nodeType: string = this.node.localProperties.filter((p) => {
        return p.value === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type'
      })[0].values[0].value
      this.chosenType = this.types.filter((t:TreeNode) => { return t.id === nodeType})[0]
    }

    private typeChange(type: TreeNode) {
      this.chosenType = type
      let oldTypes: PropertyToValues<INode> = this.node.localProperties.filter((p) => { return p.value === RDF.type.value })[0]
      let typeProp: PropertyToValues<INode> = new PropertyToValues(RDF.type)
      let typeNode: INamedNode = new NamedNode(type.id)
      typeProp.values.push(typeNode)

      this.fibraService.dispatchAction(this.fibraService.itemProperty(this.node, [typeProp], [oldTypes]))

      // Update the type displayed in the construct interface if appropriate (duplicative)
      let chosenTypes: TreeNode[] = this.fibraService.getState().construct.displayTypes
      if (!chosenTypes[0] && type) {
        this.fibraService.dispatchAction(this.fibraService.setOrderedTypes([type]))
      } else if (!chosenTypes[1] && type && (chosenTypes[0] !== type)) {
        let newTypes: TreeNode[] = chosenTypes.concat([])
        newTypes.push(type)
        this.fibraService.dispatchAction(this.fibraService.setOrderedTypes(newTypes))
      }
    }

    private labelChange() {
      let oldLabels: PropertyToValues<INode> = this.node.localProperties.filter((p) => { return p.value === SKOS.prefLabel.value })[0]
      let prefLabel: PropertyToValues<INode> = new PropertyToValues(SKOS.prefLabel)
      prefLabel.values.push(DataFactory.instance.literal(this.label))

      this.fibraService.dispatchAction(this.fibraService.itemProperty(this.node, [prefLabel], [oldLabels]))
    }

    private deleteAndClose() {
      this.fibraService.dispatchAction(this.fibraService.deleteItem(this.node))
        .then(() => {
          this.fibraService.dispatch('change')
          this.close()
        })
    }

    private closePopover() {
      this.close()
      this.fibraService.dispatch('change')
    }
  }
}