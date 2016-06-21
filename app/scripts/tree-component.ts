namespace fibra {
  'use strict'

  export class TreeNode {
    public children: TreeNode[] = []
    public instances: number
    public matchingInstances: number
    public selected: boolean = true
    public open: boolean = true
    public recursivelyProcessChildren: (f: (TreeNode) => void) => void = (f: (TreeNode) => void) => {
      this.children.forEach(n => n.recursivelyProcess(f))
    }
    public recursivelyProcess: (f: (TreeNode) => void) => void = (f: (TreeNode) => void) => {
      f(this)
      this.children.forEach(n => n.recursivelyProcess(f))
    }
    constructor(public id: string, public label: string) {}
  }

  export class TreeComponent implements angular.IComponentOptions {
      public bindings: {[id: string]: string} = {
        tree: '<',
        onSelect: '&',
      }
      public templateUrl: string = 'partials/tree.html'
  }
}