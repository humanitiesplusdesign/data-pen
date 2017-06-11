angular.module('fi.seco.yasqe', [])
namespace fi.seco.yasqe {
  'use strict'

  declare var YASQE: any

  export interface IYasqeComponentBindingChanges {
    content?: angular.IChangesObject<string>
    endpoint?: angular.IChangesObject<string>
  }

  export class YasqeComponentController implements angular.IComponentController {

    public onQueryResults: (vars: {results: any}) => void
    public onContentChanged: (vars: {content: string}) => void
    public onInit: (vars: {yasqe: any}) => void
    public endpoint: string
    public content: string
    public showQueryButton: string

    private yasqe: any

    constructor(private $element: angular.IAugmentedJQuery, private $timeout: angular.ITimeoutService) {}
    public $postLink(): void {
      if (!this.content) this.content = ''
      this.yasqe = YASQE(this.$element[0], {createShareLink: false, sparql: { endpoint: this.endpoint, callbacks: { complete: (results) => this.onQueryResults({results: results})}, showQueryButton: this.showQueryButton }})
      this.yasqe.setValue(this.content)
      this.yasqe.on('change', () => this.onContentChanged({content: this.yasqe.getValue()}))
      this.onInit({yasqe: this.yasqe})
    }
    public $onChanges(changes: IYasqeComponentBindingChanges): void {
      if (changes.endpoint && !changes.endpoint.isFirstChange()) this.yasqe.options.sparql.endpoint = changes.endpoint.currentValue
      if (changes.content && !changes.content.isFirstChange() && changes.content.currentValue !== this.yasqe.getValue()) this.yasqe.setValue(changes.content.currentValue)
    }
  }

  export class YasqeComponent implements angular.IComponentOptions {
    public bindings: {[id: string]: string} = {
      content: '<',
      onContentChanged: '&',
      onQueryResults: '&',
      endpoint: '<',
      onInit: '&',
      showQueryButton: '@'
    }
    public controller: string = 'YasqeComponentController' // (new (...args: any[]) => angular.IController) = SelectViewComponentController
  }

}
