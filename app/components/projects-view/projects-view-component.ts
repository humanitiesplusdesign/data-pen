namespace fibra {
  'use strict'

  export class ProjectsViewComponentController implements angular.IComponentController {
    public setProject(identifier: string): void {
      let c: Configuration
      // FIXME: hardcoded
      if (identifier === 'set1') c = this.configurationService.presets[2]; else c = this.configurationService.presets[0]
      c.graph = DataFactory.instance.namedNode('http://ldf.fi/fibra/' + identifier + '/')
      c.primaryEndpoint.localItemQueryTemplate = c.primaryEndpoint.localItemQueryTemplate.replace(/GRAPH <GRAPH>/g, 'GRAPH <http://ldf.fi/fibra/' + identifier + '/>')
      c.primaryEndpoint.autocompletionTextMatchQueryTemplate = c.primaryEndpoint.autocompletionTextMatchQueryTemplate.replace(/GRAPH <GRAPH>/g, 'GRAPH <http://ldf.fi/fibra/' + identifier + '/>')
      c.primaryEndpoint.treeQueryTemplate = c.primaryEndpoint.treeQueryTemplate.replace(/GRAPH <GRAPH>/g, 'GRAPH <http://ldf.fi/fibra/' + identifier + '/>')
      c.deleteItemQuery = c.deleteItemQuery.replace(/GRAPH <GRAPH>/g, 'GRAPH <http://ldf.fi/fibra/' + identifier + '/>')
      this.configurationService.setConfiguration(c)
      this.$state.go('construct')
    }
    constructor(private configurationService: ConfigurationService, private $state: angular.ui.IStateService) {}
  }

  export class ProjectsViewComponent implements angular.IComponentOptions {
      public controller: string = 'ProjectsViewComponentController' // (new (...args: any[]) => angular.IController) = SelectViewComponentController
      public templateUrl: string = 'components/projects-view/projects-view.html'
  }
}
