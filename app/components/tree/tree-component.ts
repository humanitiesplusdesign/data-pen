'use strict'

export class TreeNode {
  public children: TreeNode[] = []
  public instances: number
  public matchingInstances: number
  public selected: boolean = true
  public open: boolean = true
  public static recursivelyProcess(node: TreeNode, f: (TreeNode) => void): void {
    f(node)
    node.children.forEach(n => TreeNode.recursivelyProcess(n, f))
  }
  public static filter(node: TreeNode, f: (TreeNode) => boolean): TreeNode {
    let ret: TreeNode = node.cloneWithoutChildren()
    for (let cn of node.children) if (f(cn)) ret.children.push(cn)
    return ret
  }
  public static recursivelyMap(node: TreeNode, f: (n: TreeNode, mcn: TreeNode[]) => TreeNode[]): TreeNode[] {
    let cns: TreeNode[] = []
    for (let cn of node.children) cns = cns.concat(TreeNode.recursivelyMap(cn, f))
    return f(node, cns)
  }
  public cloneWithoutChildren(): TreeNode {
    let ret: TreeNode = new TreeNode(this.id, this.label)
    ret.instances = this.instances
    ret.matchingInstances = this.matchingInstances
    ret.selected = this.selected
    ret.open = this.open
    return ret
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
