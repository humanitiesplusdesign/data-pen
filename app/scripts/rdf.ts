namespace fibra {
  'use strict'

  import s = fi.seco.sparql

  export enum NodeType {
    Literal,
    IRI,
    BlankNode
  }

  export interface INode {
    id: string
    value: string
    type: NodeType
    lang?: string
    datatype?: string
  }

  export class SparqlBindingNode implements INode {
    public id: string
    public value: string
    public type: NodeType
    public lang: string
    public datatype: string
    constructor(binding: s.ISparqlBinding) {
      this.id = s.SparqlService.bindingToString(binding)
      this.value = binding.value
      switch (binding.type) {
        case 'literal':
          this.type = NodeType.Literal
          this.lang = binding['xml:lang']
          this.datatype = binding.datatype
          break
        case 'uri':
          this.type = NodeType.IRI
          break
        case 'bnode':
          this.type = NodeType.BlankNode
          break
        default: throw 'Unknown binding type ' + binding.type + ' for ' + binding
      }
    }
  }

  export class NodeNode implements INode {
    public id: string
    public type: NodeType
    public value: string
    public lang: string
    public datatype: string
    constructor(public other: INode) {
      this.id = other.id
      this.type = other.type
      this.value = other.value
      this.lang = other.lang
      this.datatype = other.datatype
    }
  }

  export class IdNode implements INode {
    public type: NodeType
    public value: string
    public lang: string
    public datatype: string
    constructor(public id: string) {
      if (id.indexOf('<') === 0) {
        this.type = NodeType.IRI
        this.value = id.substring(1, id.length - 1)
      } else if (id.indexOf('_:') === 0) {
        this.type = NodeType.BlankNode
        this.value = id.substring(2)
      } else if (id.indexOf('"') === 0) {
        this.type = NodeType.Literal
        this.value = id.substring(1, id.lastIndexOf('"'))
        if (id.lastIndexOf('@') === id.lastIndexOf('"') + 1)
          this.lang = id.substring(id.lastIndexOf('@'))
        else if (id.lastIndexOf('^^<') === id.lastIndexOf('"') + 1)
          this.datatype = id.substring(id.lastIndexOf('^^<'), id.length - 1)
      } else {
        throw 'Number datatypes not done yet'
      }
    }
  }

  export class IRI implements INode {
    public type: NodeType = NodeType.IRI
    public id: string
    constructor(public value: string) {
      this.id = '<' + value + '>'
    }
  }

  export class BlankNode implements INode {
    public type: NodeType = NodeType.BlankNode
    public id: string
    constructor(public value: string) {
      this.id = '_:' + value
    }
  }

  export class Literal implements INode {
    public type: NodeType = NodeType.Literal
    public id: string
    constructor(public value: string, public lang?: string, public datatype?: string) {
      if (datatype) switch (datatype) {
        case 'http://www.w3.org/2001/XMLSchema#integer':
        case 'http://www.w3.org/2001/XMLSchema#decimal':
        case 'http://www.w3.org/2001/XMLSchema#double':
        case 'http://www.w3.org/2001/XMLSchema#boolean': this.id = value; break
        case 'http://www.w3.org/2001/XMLSchema#string': this.id = '"' + value + '"'; break
        default: this.id = '"' + value + '"^^<' + datatype + '>'; break
      }
      else if (lang) this.id = '"' + value + '"@' + lang
      else this.id = '"' + value + '"'
    }
  }

  export interface ISourcedNode extends INode {
    sourceEndpoints: string[]
  }

  export interface INodePlusLabel extends INode {
    label: INode
  }

  export class NodePlusLabel extends NodeNode implements INodePlusLabel {
    constructor(public node: INode, public label?: INode) {
      super(node)
    }
  }

  export class PropertyToValues extends NodePlusLabel {
    public values: (INode|NodePlusLabel)[] = []
    constructor(property: INode) {
      super(property)
    }
  }

  export class Item extends NodePlusLabel {
    public properties: PropertyToValues[] = []
    public inverseProperties: PropertyToValues[] = []
  }

  export class Triple {
    constructor (
      public subject: INode,
      public property: INode,
      public object: INode
    ) {}
  }

  export class Quad extends Triple {
    constructor (
      subject: INode,
      property: INode,
      object: INode,
      public graph: INode
    ) { super(subject, property, object) }
  }

  export class Graph {
    constructor(
      public graph?: INode,
      public triples: Triple[] = []
    ) {}
  }

  export class SKOS {
    public static ns: string = 'http://www.w3.org/2004/02/skos/core#'
    public static prefLabel: IRI = new IRI(SKOS.ns + 'prefLabel')
  }

  export class OWL {
    public static ns: string = 'http://www.w3.org/2002/07/owl#'
    public static sameAs: IRI = new IRI(OWL.ns + 'sameAs')
  }

  export class RDF {
    public static ns: string = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#'
    public static type: IRI = new IRI(RDF.ns + 'type')
  }

}
