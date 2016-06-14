namespace fibra {
  'use strict'

  class TreeViewConfiguration {
    constructor(public endpoint: string, public queryTemplate: string) {}
  }

  class Configuration {
    public autocompletionConfiguration: SparqlAutocompletionConfiguration

    public classTree: TreeNode[]

    private allowed: string[] = []
    private disallowed: string[] = []

    private allSelected: boolean = true

    public setClassTree: (classTree: TreeNode[]) => void = (classTree: TreeNode[]) => {
      classTree.forEach(tree2 => tree2.recursivelyProcess(treeNode => {
        treeNode.selected = true
        this.allowed.push(treeNode.id)
      }))
      this.classTree = classTree
      this.allSelected = true
    }
    public alterSelection: (TreeNode) => void = (node: TreeNode) => {
      node.selected = !node.selected
      node.recursivelyProcess(n => n.selected = node.selected)
      if (node.selected) {
        this.disallowed.splice(this.disallowed.indexOf(node.id), 1)
        this.allowed.push(node.id)
      } else {
        this.allSelected = false
        this.allowed.splice(this.allowed.indexOf(node.id), 1)
        this.disallowed.push(node.id)
      }
      this.updateFilter()
    }
    public toggleAll: () => void = () => {
      this.classTree.forEach(tree => tree.recursivelyProcess(tree2 => tree2.selected = this.allSelected))
      if (this.allSelected) {
        this.allowed = this.allowed.concat(this.disallowed)
        this.disallowed = []
      } else {
        this.disallowed = this.disallowed.concat(this.allowed)
        this.allowed = []
      }
      this.updateFilter()
    }

    constructor(public id: string, public title: string, public endpoint: string) {
      this.autocompletionConfiguration = new SparqlAutocompletionConfiguration(id, title, endpoint, SparqlAutocompleteService.queryTemplate)
    }

    private updateFilter: () => void = () => {
      if (this.disallowed.length === 0)
        this.autocompletionConfiguration.constraints = ''
      else if (this.disallowed.length < this.allowed.length)
        this.autocompletionConfiguration.constraints = 'FILTER (?groupId NOT IN (' + this.disallowed.map(id => '<' + id + '>').join(', ') + '))'
      else
        this.autocompletionConfiguration.constraints = 'FILTER (?groupId IN (' + this.allowed.map(id => '<' + id + '>').join(', ') + '))'
    }

  }

  export class MainComponentController {
    public configurations: Configuration[] = [
      new Configuration('sdfb', 'Six Degrees of Francis Bacon', 'http://ldf.fi/sdfb/sparql'),
      new Configuration('emlo', 'EMLO', 'http://ldf.fi/emlo/sparql'),
      new Configuration('procope', 'Procope', 'http://ldf.fi/procope/sparql'),
      new Configuration('schoenberg', 'Schoenberg', 'http://ldf.fi/schoenberg/sparql'),
    ]

    public autocompletionConfigurations: SparqlAutocompletionConfiguration[] = this.configurations.map(c => c.autocompletionConfiguration)

    public itemId: string
    public itemEndpoint: string

    public setItem: (itemId: string, itemEndpoint: string) => void = (itemId: string, itemEndpoint: string) => {
      this.itemId = itemId
      this.itemEndpoint = itemEndpoint
    }

    public selectTab: (Configuration) => void = (c: Configuration) => {
      if (!c.classTree)
        this.sparqlTreeService.getTree(c.endpoint, SparqlTreeService.getClassTreeQuery).then(c.setClassTree)
    }

    constructor(private sparqlTreeService: SparqlTreeService) {}

  }

  export class MainComponent implements angular.IComponentOptions {
      public controller: Function = MainComponentController
      public templateUrl: string = 'partials/main.html'
  }
}
