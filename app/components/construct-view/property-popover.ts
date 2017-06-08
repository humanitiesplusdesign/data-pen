'use strict'

import {FibraService} from '../../services/fibra-service'
import * as d3 from 'd3'
import {Item, PropertyToValues, PropertyAndValue, SparqlItemService, IPropertyAndValue} from '../../services/sparql-item-service'
import {TreeNode} from '../tree/tree-component'
import {OWL, RDF, NamedNode, SKOS, DataFactory} from '../../models/rdf'
import {INamedNode} from '../../models/rdfjs'
import * as angular from 'angular'
import { INgRedux } from 'ng-redux'
import * as TypeActions from '../../actions/types'
import * as ItemActions from '../../actions/items'

export class PropertyPopover {

  private propertyPopover: d3.Selection<HTMLDivElement, {}, HTMLBodyElement, undefined>

  /* @ngInject */
  public constructor(
      private $element: angular.IAugmentedJQuery,
      private $scope: angular.IScope,
      private fibraService: FibraService,
      private $compile: angular.ICompileService) {

    this.propertyPopover = d3.select($element[0]).append<HTMLDivElement>('div')
      .classed('property-popover', true)
  }

  public addPopover(this, $scope, baseSVG, d, i, g): void {
    let propertyPopover: d3.Selection<HTMLDivElement, {}, HTMLBodyElement, undefined> =
      d3.select(baseSVG.node().parentElement.parentElement).select<HTMLDivElement>('div.property-popover')
    propertyPopover.select('property-popover').remove()
    propertyPopover
      .style('left', (d.fx - 3) + 'px')
      .style('top', (d.fy + 12) + 'px')
    let cscope: angular.IScope = $scope.$new(true)
    cscope['node'] = d
    cscope['close'] = () => {
      propertyPopover.style('visibility', 'hidden')
    }
    propertyPopover.node().appendChild(this.$compile('<property-popover node="node" types="types" close="close"></property-popover>')(cscope)[0])
    propertyPopover.style('visibility', 'visible')
  }

  public hidePopover(): void {
    this.propertyPopover.style('visibility', 'hidden')
  }
}

export class PropertyPopoverComponent implements angular.IComponentOptions {
  public bindings: {[id: string]: string} = {
    node: '=',
    close: '='
  }
  public template = require('./property-popover-component.pug')()
  public controller = PropertyPopoverComponentController
}

interface IPropertyPopoverScope extends angular.IScope {
  selected?: (sel: string) => string
}

export class PropertyPopoverComponentController {
  public types: any
  public node: Item
  public close: () => void
  public chosenType: TreeNode
  public label: string
  public thingType: string = OWL.Thing.value
  public showTypeCreate: boolean = false

  // Actions
  private unsubscribe: any
  private createType: any
  private setOrderedTypes: any
  private itemProperty: any
  private deleteItem: any

  private typeQuery: string = ''
  private getTypes: () => TreeNode[]

  public $onDestroy(): void {
    this.unsubscribe()
  }

  /* @ngInject */
  public constructor(
    private fibraService: FibraService,
    private sparqlItemService: SparqlItemService,
    private $scope: IPropertyPopoverScope,
    private $q: angular.IQService,
    private $ngRedux: INgRedux
  ) {
    let unsub1 = $ngRedux.connect(this.mapTypesToThis, TypeActions)(this)
    let unsub2 = $ngRedux.connect(this.mapItemsToThis, ItemActions)(this)
    this.unsubscribe = () => {
      unsub1()
      unsub2()
    }

    this.getTypes = () => {
      return this.types.types.concat(this.types.userTypes)
    }
  }

  public $postLink(): void {
    this.label = this.node.label

    let nodeType: string = this.node.localProperties.filter((p) => {
      return p.value === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type'
    })[0].values[0].value.value
    this.chosenType = this.types.types.filter((t:TreeNode) => { return t.id === nodeType})[0]
    if (this.chosenType) this.typeQuery = this.chosenType.label
  }

  private typeQueryGS: (query: string) => string = (query: string) => {
    if(query !== undefined) {
      this.typeQuery = query
    }
    return this.typeQuery
  }

  private typeCreate(label) {
    if (label && !this.types.types.filter((t:TreeNode) => { return t.label === label})[0]) {
      // We have a string and no matching type is in scope.
      this.createType(label, this.sparqlItemService).then(() => {
        // Type should now show up in the list. Assign the type that was picked
        let typePicked: TreeNode = this.types.userTypes.filter((t) => t.label === label)[0]
        if (typePicked) return this.typeChange(typePicked)
        else return this.$q.resolve({})
      })
    }
  }

  private mapTypesToThis(state) {
    return {
      types: state.types
    }
  }

  private mapItemsToThis(state) {
    return {
      items: state.items
    }
  }

  private typeEvaluate(label) {
    if(label && !this.getTypes().filter((t: TreeNode) => { return t.label === label})[0]) {
      this.showTypeCreate = true
    } else {
      // Does match an existing type, or is empty
      this.showTypeCreate = false
    }
  }

  private typeChange(type: TreeNode) {
    this.chosenType = type
    let oldTypes: IPropertyAndValue[] = this.node.localProperties.filter((p) => { return p.value === RDF.type.value })[0].values.map((n) => { return new PropertyAndValue(RDF.type, n.value) })
    let typeNode: INamedNode = new NamedNode(type.id)
    this.showTypeCreate = false

    return this.itemProperty(this.sparqlItemService, this.node, [new PropertyAndValue(RDF.type, typeNode)], oldTypes).then(() => {
      // Update the type displayed in the construct interface if appropriate (duplicative)
      let chosenTypes: TreeNode[] = this.types.displayTypes
      if (!chosenTypes[0] && type) {
        return this.setOrderedTypes([type])
      } else if (!chosenTypes[1] && type && (chosenTypes[0] !== type)) {
        let newTypes: TreeNode[] = chosenTypes.concat([])
        newTypes.push(type)
        return this.setOrderedTypes(newTypes)
      }
    })
  }

  private labelChange(): void {
    let oldLabels: IPropertyAndValue[] = this.node.localProperties.filter((p) => { return p.value === SKOS.prefLabel.value })[0].values.map((n) => { return new PropertyAndValue(SKOS.prefLabel, n.value)})
    this.itemProperty(this.sparqlItemService, this.node, [new PropertyAndValue(SKOS.prefLabel, DataFactory.instance.literal(this.label))], oldLabels)
  }

  private deleteAndClose(): void {
    this.deleteItem(this.$q, this.sparqlItemService, this.node)
      .then(() => {
        this.fibraService.dispatch('change')
        this.close()
      })
  }

  private closePopover(): void {
    this.close()
    this.fibraService.dispatch('change')
  }
}

angular.module('fibra.components.property-popover', ['fibra.services', 'ui.bootstrap'])
  .component('propertyPopover', new PropertyPopoverComponent())
