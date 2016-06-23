namespace fibra {
  'use strict'

  export class ConfigurationService {
    public configurations: Configuration[] = [
      new Configuration('local', 'Local', 'http://ldf.fi/fibra/sparql'),
      new Configuration('sdfb', 'Six Degrees of Francis Bacon', 'http://ldf.fi/sdfb/sparql'),
      new Configuration('emlo', 'EMLO', 'http://ldf.fi/emlo/sparql'),
      new Configuration('procope', 'Procope', 'http://ldf.fi/procope/sparql'),
      new Configuration('schoenberg', 'Schoenberg', 'http://ldf.fi/schoenberg/sparql'),
    ]
  }

  export class Configuration {
    public autocompletionConfiguration: SparqlAutocompletionConfiguration

    public classTree: TreeNode[]

    private allowed: string[] = []
    private disallowed: string[] = []

    private allSelected: boolean = true

    public setClassTree: (classTree: TreeNode[]) => void = (classTree: TreeNode[]) => {
      classTree.forEach(tree2 => TreeNode.recursivelyProcess(tree2, treeNode => {
        treeNode.selected = true
        this.allowed.push(treeNode.id)
      }))
      this.classTree = classTree
      this.allSelected = true
    }
    public alterSelection: (TreeNode) => void = (node: TreeNode) => {
      node.children.forEach(cn => TreeNode.recursivelyProcess(cn, n => {
        n.selected = node.selected
        this.setAllowedDisallowed(n)
      }))
      this.setAllowedDisallowed(node)
      this.updateFilter()
    }
    public setAllowedDisallowed: (TreeNode) => void = (node: TreeNode) => {
      if (node.selected) {
        this.removeDisallowed(node)
        this.addAllowed(node)
      } else {
        this.allSelected = false
        this.removeAllowed(node)
        this.addDisallowed(node)
      }
    }
    public addAllowed: (TreeNode) => void = (node: TreeNode) => {
      if (this.allowed.indexOf(node.id) === -1) {
        this.allowed.push(node.id)
      }
    }
    public removeAllowed: (TreeNode) => void = (node: TreeNode) => {
      if (this.allowed.indexOf(node.id) !== -1) {
        this.allowed.splice(this.allowed.indexOf(node.id), 1)
      }
    }
    public addDisallowed: (TreeNode) => void = (node: TreeNode) => {
      if (this.disallowed.indexOf(node.id) === -1) {
        this.disallowed.push(node.id)
      }
    }
    public removeDisallowed: (TreeNode) => void = (node: TreeNode) => {
      if (this.disallowed.indexOf(node.id) !== -1) {
        this.disallowed.splice(this.disallowed.indexOf(node.id), 1)
      }
    }
    public toggleAll: () => void = () => {
      this.classTree.forEach(node => TreeNode.recursivelyProcess(node, n => {
        n.selected = this.allSelected
        this.setAllowedDisallowed(n)
      }))
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
}
