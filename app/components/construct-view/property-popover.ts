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
        .style('position', 'absolute')
        .style('z-index', '20')
        .style('background-color', 'gray')
        .style('color', 'white')
        .style('padding', '3px')
        .style('border-radius', '2px')
        .classed('property-popover', true)
      

    }

    public addPopover(this, $scope, types, d, i, g): void {
      let enterNode: any = this
      let propertyPopover: d3.Selection<HTMLDivElement, {}, HTMLBodyElement, undefined> = 
        d3.select(d.baseSelection.node().parentElement.parentElement).select<HTMLDivElement>('div.property-popover')
      
      propertyPopover.select('property-popover').remove()
      
      propertyPopover
        .style('left', (d.fx - 3) + 'px')
        .style('top', (d.fy + 12) + 'px')
      let cscope: angular.IScope = $scope.$new(true)
      cscope['node'] = d
      cscope['types'] = types
      propertyPopover.node().appendChild(this.$compile('<property-popover node="node" types="types"></property-popover>')(cscope)[0])
    }
  }

  export class PropertyPopoverComponent implements angular.IComponentOptions {
    public bindings: {[id: string]: string} = {
      types: '=',
      node: '='
    }
    public templateUrl: string = 'components/construct-view/property-popover-component.html'
    public controller = 'PropertyPopoverComponentController'
  }

  export class PropertyPopoverComponentController {
    public types
    public node: Item
    public chosenType: TreeNode
    public label: string

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

    private typeClick(type: TreeNode) {
      this.chosenType = type
      let typeProp: PropertyToValues<INode> = new PropertyToValues(RDF.type)
      let typeNode: INamedNode = new NamedNode(type.id)
      console.log(typeNode)
      typeProp.values.push(typeNode)

      this.fibraService.dispatchAction(this.fibraService.itemProperty(this.node, [typeProp]))
      // this.sparqlItemService.alterItem(this.node, [typeProp])
    }
  }
}