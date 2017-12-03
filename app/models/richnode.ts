'use strict'

import {INode, NodeFromNode, NodeSet, ONodeSet} from './rdf'
import { ILiteral } from 'models/rdfjs';
import { Class } from 'services/project-service/data-model';
import { StringSet } from 'components/collection-utils';

export interface IRichNode extends INode {
  labels?: ONodeSet<ILiteral>
  descriptions?: ONodeSet<ILiteral>
  types?: ONodeSet<Class>
  sourceEndpoints?: StringSet
}

export class FullRichNodeFromNode extends NodeFromNode implements IRichNode {
  constructor(node: INode, public labels: ONodeSet<ILiteral> = new ONodeSet<ILiteral>(), public descriptions: ONodeSet<ILiteral> = new ONodeSet<ILiteral>(), public types: ONodeSet<Class> = new ONodeSet<Class>(), public sourceEndpoints: StringSet = new StringSet()) {
    super(node)
  }
}

export class RichNodeFromRichNode extends NodeFromNode implements IRichNode {
  public labels?: ONodeSet<ILiteral>
  public descriptions?: ONodeSet<ILiteral>
  public types?: ONodeSet<Class>
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
