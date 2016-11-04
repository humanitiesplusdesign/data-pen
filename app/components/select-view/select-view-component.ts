namespace fibra {
  'use strict'

  export class SelectViewComponentController implements angular.IComponentController {
    public setData(identifier: string): void {
      let c: Configuration = this.configurationService.configuration
      c.primaryEndpoint.localItemQueryTemplate = c.primaryEndpoint.localItemQueryTemplate.replace(/GRAPH <GRAPH>/g, 'GRAPH <http://ldf.fi/fibra/' + identifier + '/>')
      c.primaryEndpoint.autocompletionTextMatchQueryTemplate = c.primaryEndpoint.autocompletionTextMatchQueryTemplate.replace(/GRAPH <GRAPH>/g, 'GRAPH <http://ldf.fi/fibra/' + identifier + '/>')
      this.configurationService.setConfiguration(c)
      this.$state.go('construct')
    }
    constructor(private configurationService: ConfigurationService, private $state: angular.ui.IStateService) {}
  }

  export class SelectViewComponent implements angular.IComponentOptions {
      public controller: string = 'SelectViewComponentController' // (new (...args: any[]) => angular.IController) = SelectViewComponentController
      public templateUrl: string = 'components/select-view/select-view.html'
  }
}
