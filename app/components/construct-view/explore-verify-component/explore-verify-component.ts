'use strict'

import {Item, PropertyToValues, IPropertyAndValue, PropertyAndValue} from '../../../services/sparql-item-service'
import {ResultGroup, SparqlAutocompleteService, AutocompletionResults, Result} from '../../../services/sparql-autocomplete-service'
import {IRichNode} from '../../../models/richnode'
import {FibraService} from '../../../services/fibra-service'
import {OWL} from '../../../models/rdf'
import * as angular from 'angular'

export class ExploreVerifyComponentController {
  // Bindings
  private node: Item
  private queryRunning: boolean
  private error: boolean
  private limitFilter: string = ''
  private queryString: string = ''
  private canceller: angular.IDeferred<any>
  private matchingResults: ResultGroup[]
  private relevantTypes: IRichNode[] = []

  public constructor( private fibraService: FibraService,
                      private $q: angular.IQService,
                      private sparqlAutocompleteService: SparqlAutocompleteService) {
    this.fibraService = fibraService
    this.canceller = $q.defer()
  }

  public $onChanges(chngsObj: any): void {
    if (this.node) {
      this.queryString = this.node.label
      if (this.node) {
        this.runQuery()
      }
    }
  }

  private runQuery(): void {
    this.canceller.resolve()
    this.updateResults(new AutocompletionResults())
    this.queryRunning = true
    this.error = false
    this.limitFilter = ''
    this.canceller = this.$q.defer()
    let nodeTypes: PropertyToValues = this.node.localProperties.filter((p) => p.value === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type')[0]
    this.relevantTypes = nodeTypes ? nodeTypes.values.map(v => v.value) : []
    this.relevantTypes.forEach((t) => { if (t) this.limitFilter += '<' + t.value + '>' + ',' })
    if (this.limitFilter.length !== 0) this.limitFilter = 'FILTER (?groupId IN (' + this.limitFilter.substring(0, this.limitFilter.length - 1) + '))'
    this.sparqlAutocompleteService.autocomplete(this.queryString, 6, true, this.limitFilter, this.canceller.promise).then(
      (results: AutocompletionResults) => {
        console.log("Results in verify: ", results)
        this.queryRunning = false
        this.updateResults(results)
      },
      () => {
        console.log("Error in verify")
        this.queryRunning = false
        this.error = true
      },
      (update: {error?: any, results?: AutocompletionResults}) => {
        console.log("Update in verify: ", update)
        if (update.error) this.error = true
        else this.updateResults(update.results)
      }
    )
  }

  private updateResults(results: AutocompletionResults) {
    console.log(this.relevantTypes)
    let typeLabels: string[] = this.relevantTypes.map((t) => { return t.label })
    // this.matchingResults = results.remoteResults.filter((r) => typeLabels.indexOf(r.label) !== -1)
    this.matchingResults = results.remoteResults
    console.log(this.matchingResults)
  }

  private sourcesFromResult(result: Result): string {
    return ' (Sources: ' + result.datasources.join(', ') + ')'
  }

  private verify(result: Result): void {
    let prop: IPropertyAndValue[] = result.ids.map(id => new PropertyAndValue(OWL.sameAs, id))
    this.fibraService.dispatchAction(this.fibraService.itemProperty(this.node, prop))
      .then(() => {
        this.clear()
      })
  }

  private clear(): void {
    this.fibraService.dispatchAction(this.fibraService.verifyItem(null))
  }
}

export class ExploreVerifyComponent implements angular.IComponentOptions {
  public template = require('./explore-verify-component.pug')()
  public controller = ExploreVerifyComponentController
  public bindings: {[id: string]: string} = {
    node: '<'
  }
}

angular.module('fibra.components.verify', ['fibra.services'])
  .component('verify', new ExploreVerifyComponent())