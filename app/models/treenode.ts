'use strict'

export class TreeNode<I> {
  public item: I
  public parent: TreeNode<I>
  public children: TreeNode<I>[] = []
}
