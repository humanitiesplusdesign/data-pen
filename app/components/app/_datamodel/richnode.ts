namespace fibra {
  'use strict'

  export interface IRichNode extends INode {
    label?: string
    description?: string
    types?: IRichNode[]
    sourceEndpoints?: string[]
  }

  export class FullRichNodeFromNode extends NodeFromNode implements IRichNode {
    constructor(node: INode, public label?: string, public description?: string, public types: IRichNode[] = [], public sourceEndpoints: string[] = []) {
      super(node)
    }
  }

  export class RichNodeFromRichNode extends NodeFromNode implements IRichNode {
    public label?: string
    public description?: string
    public types?: IRichNode[]
    public sourceEndpoints?: string[]
    constructor(node: IRichNode) {
      super(node)
      this.label = node.label
      this.description = node.description
      this.types = node.types
      this.sourceEndpoints = node.sourceEndpoints
    }
  }

  export class PrunedRichNodeFromNode extends NodeFromNode implements IRichNode {
    constructor(node: INode) {
      super(node)
    }
  }

}
