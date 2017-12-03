'use strict'

import { ILiteral } from 'models/rdfjs';
import { IClass } from 'services/project-service/data-model';
import { StringSet } from 'components/collection-utils';
import { INode, ONodeSet, NodeFromNode } from 'models/rdf';

export interface IRichNode extends INode {
  labels?: ONodeSet<ILiteral>
  descriptions?: ONodeSet<ILiteral>
  types?: ONodeSet<IClass>
  sourceEndpoints?: StringSet
}

export class FullRichNodeFromNode extends NodeFromNode implements IRichNode {
  constructor(node: INode, public labels: ONodeSet<ILiteral> = new ONodeSet<ILiteral>(), public descriptions: ONodeSet<ILiteral> = new ONodeSet<ILiteral>(), public types: ONodeSet<IClass> = new ONodeSet<IClass>(), public sourceEndpoints: StringSet = new StringSet()) {
    super(node)
  }
}

export class RichNodeFromRichNode extends NodeFromNode implements IRichNode {
  public labels?: ONodeSet<ILiteral>
  public descriptions?: ONodeSet<ILiteral>
  public types?: ONodeSet<IClass>
  public sourceEndpoints?: StringSet
  constructor(node: IRichNode) {
    super(node)
    this.labels = node.labels
    this.descriptions = node.descriptions
    this.types = node.types
    this.sourceEndpoints = node.sourceEndpoints
  }
}

export class PrunedRichNodeFromNode extends NodeFromNode implements IRichNode {
  constructor(node: INode) {
    super(node)
  }
}
