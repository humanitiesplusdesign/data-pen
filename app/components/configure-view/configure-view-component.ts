namespace fibra {
  'use strict'

  export class ConfigureViewComponentController implements angular.IComponentController {
    private configurations: Configuration[] = []
    private statistics: {[id: string]: TreeNode[]} = {}
    public setConfiguration(configuration: Configuration): void {
      this.configurationService.setConfiguration(configuration)
      this.$state.go('select')
    }
    constructor(private configurationService: ConfigurationService, private sparqlTreeService: SparqlTreeService, private $state: angular.ui.IStateService) {
      this.configurations = configurationService.presets
      configurationService.presetAuthorities.forEach(c => this.calculateStatistics(c))
    }
    private calculateStatistics(c: EndpointConfiguration): void {
      c.treeQueryTemplate = c.treeQueryTemplate.replace(/# CONSTRAINTS/g, c.dataModelConfiguration.typeConstraints)
      this.sparqlTreeService.getTree(c.endpoint.value, c.treeQueryTemplate).then(
        (tree) => {
          let ntree: TreeNode[] = []
          let f: (n: TreeNode, cns: TreeNode[]) => TreeNode[] = (n: TreeNode, cns: TreeNode[]) => {
            if (cns.length === 1) return cns
            return [n]
          }
          for (let tn of tree) ntree = ntree.concat(TreeNode.recursivelyMap(tn, f))
          console.log(c.id, ntree)
          this.statistics[c.id] = ntree
        }
      )
    }
  }

  export class ConfigureViewComponent implements angular.IComponentOptions {
      public controller: string = 'ConfigureViewComponentController' // (new (...args: any[]) => angular.IController) = ConfigureViewComponentController
      public templateUrl: string = 'components/configure-view/configure-view.html'
  }
}
