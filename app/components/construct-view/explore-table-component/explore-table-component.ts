'use strict'

import {Item, PropertyToValues, SparqlItemService, IRichPropertyValue, RichPropertyValue, PropertyAndValue} from '../../../services/sparql-item-service'
import {FibraService, UIState} from '../../../services/fibra-service'
import {DataFactory, OWL, INode} from '../../../models/rdf'
import {FullRichNodeFromNode} from '../../../models/richnode'
import * as angular from 'angular'

type TableInfo = {
  properties: String[],
  items: Item[]
}

export class ExploreTableComponentController {
  // bindings
  private primaryItems: Item[] = []
  private secondaryItems: Item[] = []

  private tableTypes: string[] = ['primary', 'secondary']
  private primary: TableInfo = {
    properties: [],
    items: []
  }
  private secondary: TableInfo = {
    properties: [],
    items: []
  }

  private removedProperties: String[] = []

  private originalPropertiesMap: { [id: string] : PropertyToValues[] } = { }
  private editItem: Item

  public constructor( private fibraService: FibraService,
                      private sparqlItemService: SparqlItemService) {
    this.fibraService = fibraService
  }

  public $onChanges(chngsObj: any): void {
    this.primary.properties = []
    this.secondary.properties = []
    this.primary.items = this.primaryItems
    this.secondary.items = this.secondaryItems
    this.sortProperties();
    console.log(this.primary.items)
    console.log(this.secondary.items)
    console.log(this.primary.properties)
    console.log(this.secondary.properties)
  }

  private selectItem(item: Item): void {
    this.editItem = item

    let origProps: PropertyToValues[] = item.localProperties.map((prop) => {
      let newProp = new PropertyToValues(prop)
      prop.values
        // Only handle literal values
        .filter((vl) => { return vl.value.termType === 'Literal' })
        .forEach((vl: IRichPropertyValue) => {
          let literalNode = DataFactory.instance.literal(vl.value.value)
          let snpl = new FullRichNodeFromNode(literalNode, vl.value.label, undefined, undefined, vl.value.sourceEndpoints)
          newProp.values.push(new RichPropertyValue(snpl, vl.properties))
        })
      return newProp
    }).filter((prop) => { return prop.values.length > 0 })
    this.originalPropertiesMap[item.value] = origProps
  }

  private itemVerified(item: Item): boolean {
    return !!(item.localProperties.filter((p) =>  p.value === OWL.sameAs.value)[0])
  }

  private saveItem(item: Item): void {
    // Currently this just replaces all properties on the item. We should really only update
    // properties that have changed.
    let newProps = item.localProperties.map(prop =>
      prop.values
        .filter((vl) => { return vl.value.termType === 'Literal' })
        .map((vl: IRichPropertyValue) =>
          new PropertyAndValue(prop, DataFactory.instance.literal(vl.value.value))
        )
    ).reduce((acc, val) => acc.concat(val), [])
    this.fibraService.dispatchAction(this.fibraService.itemProperty(item, newProps, this.originalPropertiesMap[item.value].map(v => v.toPropertyAndValues(true)).reduce((acc, val) => acc.concat(val), [])))
  }

  private hide(id: INode): angular.IPromise<string> {
    return this.fibraService.dispatchAction(this.fibraService.hideItem(id)).then(() => { return 'ok' })
  }

  private delete(id: INode): angular.IPromise<UIState> {
    return this.fibraService.dispatchAction(this.fibraService.deleteItem(id))
  }

  private sortProperties(): void {
    // fill in each property array with every property possessed by the associated objects
    ['primary', 'secondary'].forEach((key) => {
      for (let i = 0; i < this[key].items.length; i++) {
        for (let p = 0; p < this[key].items[i].localProperties.length; p++) {
          let duplicate = false

          for (let j = 0; j < this.removedProperties.length; j++) { //if user has already hidden/removed this property, don't show it again
            if (this.removedProperties[j] == this[key].items[i].localProperties[p].value) duplicate = true
          }

          for (let j = 0; j < this[key].properties.length; j++) {
            if (this[key].properties[j] == this[key].items[i].localProperties[p].value) {
              duplicate = true
            }
          }
          if (!duplicate) {
            this[key].properties.push(this[key].items[i].localProperties[p])
          }
        }
      }
    })
  }

  private removeFromProperties(property) {
      ['primary', 'secondary'].forEach((key) => {
          for (let i = 0; i < this[key].properties.length; i++) {
            if (this[key].properties[i] == property) {
                this[key].properties.splice(i, 1)
              }
          }
      })
      this.addToRemovedProperties(property);
  }

  private addToRemovedProperties(property) {
      this.removedProperties.push(property);
  }

  private addFromRemovedProperties(property) {
    for (let i = 0; i < this.removedProperties.length; i++) { //remove from removedproperties
      if (this.removedProperties[i] == property) this.removedProperties.splice(i, 1);
    }

    this.fibraService.dispatch('change')
  }

  private verify(node: Item) {
    this.fibraService.dispatchAction(this.fibraService.verifyItem(node))
  }

  // start of csv download capability
  private downloadcsv() {
    let table = this.primary.items;
    let csv= "data:text/csv;charset=utf-8,";

    for (let i = 0; i < table.length; i++) {
        for (let j = 0; j < table[i].localProperties.length; j++) {
          csv += table[i].localProperties[j].values[0].value + ",";
        }
        csv += "\n";
    }

    let encUri = encodeURI(csv);
    window.open(encUri);
  }
}

export class ExploreTableComponent implements angular.IComponentOptions {
    public template = require('./explore-table-component.pug')()
    public controller = ExploreTableComponentController
    public bindings: {[id: string]: string} = {
      primaryItems: '<',
      secondaryItems: '<'
    }
}

angular.module('fibra.components.explore-table', ['fibra.services'])
  .component('exploreTable', new ExploreTableComponent())