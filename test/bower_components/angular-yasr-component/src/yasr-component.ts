angular.module('fi.seco.yasr', [])
namespace fi.seco.yasr {
  'use strict'

  declare var YASR: any

  export interface IYasrComponentBindingChanges {
    data?: angular.IChangesObject<string>
    prefixes?: angular.IChangesObject<() => {}>
  }

  export class YasrComponentController implements angular.IComponentController {

    public onInit: (vars: {yasr: any}) => void
    public data: string
    public prefixes: () => {}

    private yasr: any

    constructor(private $element: angular.IAugmentedJQuery) {}
    public $postLink(): void {
      this.yasr = YASR(this.$element[0], { getUsedPrefixes: this.prefixes})
      this.onInit({yasr: this.yasr})
    }
    public $onChanges(changes: IYasrComponentBindingChanges): void {
      if (this.yasr && changes.data && changes.data.currentValue) this.yasr.setResponse(changes.data.currentValue)
      if (this.yasr && changes.prefixes) this.yasr.options.getUsedPrefixes = changes.prefixes.currentValue
    }
  }

  export class YasrComponent implements angular.IComponentOptions {
    public bindings: {[id: string]: string} = {
      data: '<',
      prefixes: '<',
      onInit: '&'
    }
    public controller: string = 'YasrComponentController' // (new (...args: any[]) => angular.IController) = SelectViewComponentController
  }

}
