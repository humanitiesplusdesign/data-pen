namespace fibra {
  'use strict'

  export class TreeNode {
    public children: TreeNode[] = []
    public instances: number
    public matchingInstances: number
    public selected: boolean = true
    public open: boolean = true
    public static recursivelyProcess: (node: TreeNode, f: (TreeNode) => void) => void = (node: TreeNode, f: (TreeNode) => void) => {
      f(node)
      node.children.forEach(n => TreeNode.recursivelyProcess(n, f))
    }
    constructor(public id: string, public label: string) {}
  }

  export class TreeComponent implements angular.IComponentOptions {
      public bindings: {[id: string]: string} = {
        tree: '<',
        onSelect: '&',
      }
      public templateUrl: string = 'components/tree/tree.html'
  }
}
