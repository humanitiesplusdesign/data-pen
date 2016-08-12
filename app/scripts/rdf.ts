namespace fibra {
  'use strict'

  import s = fi.seco.sparql

  export interface INode extends ITerm {
    language?: string
    datatype?: INamedNode
  }

  export class Node implements INode {
    constructor(public value?: string, public termType?: 'NamedNode' | 'BlankNode' | 'Literal' | 'Variable' | 'DefaultGraph', public language?: string, public datatype?: INamedNode) {}
    public toCanonical(): string {
      switch (this.termType) {
        case 'NamedNode': return '<' + this.value + '>'
        case 'BlankNode': return '_:' + this.value
        case 'Literal': return JSON.stringify(this.value) + (this.language ? '@' + this.language : (this.datatype.equals(XMLSchema.string) ? '' : '^^' + this.datatype.toCanonical()))
        case 'Variable': return '?' + this.value
        case 'DefaultGraph': return ''
        default: throw 'Unknown term type ' + this.termType
      }
    }
    public equals(other: ITerm): boolean {
      return this.termType === other.termType && this.value === other.value && (this.termType !== 'Literal' || (this.language === (<ILiteral>other).language && this.datatype === (<ILiteral>other).datatype))
    }
  }

  export class SparqlBindingNode extends Node {
    public termType: 'NamedNode' | 'BlankNode' | 'Literal'
    constructor(binding: s.ISparqlBinding) {
      super()
      this.value = binding.value
      switch (binding.type) {
        case 'literal':
          this.termType = 'Literal'
          this.language = binding['xml:lang'] ? binding['xml:lang'] : ''
          this.datatype = binding.datatype ? new NamedNode(binding.datatype) : (this.language !== '' ? RDF.langString : XMLSchema.string)
          break
        case 'uri':
          this.termType = 'NamedNode'
          break
        case 'bnode':
          this.termType = 'BlankNode'
          break
        default: throw 'Unknown binding type ' + binding.type + ' for ' + binding
      }
    }
  }

  export class NodeFromNode extends Node {
    constructor(other: INode) {
      super(other.value, other.termType, other.language, other.datatype)
    }
  }

  class CanonicalNode extends Node {
    public datatype: INamedNode
    public language: string
    constructor(id: string) {
      super()
      if (id.indexOf('<') === 0) {
        this.termType = 'NamedNode'
        this.value = id.substring(1, id.length - 1)
      } else if (id.indexOf('_:') === 0) {
        this.termType = 'BlankNode'
        this.value = id.substring(2)
      } else if (id.indexOf('"') === 0) {
        this.termType = 'Literal'
        this.value = id.substring(1, id.lastIndexOf('"'))
        if (id.lastIndexOf('@') === id.lastIndexOf('"') + 1) {
          this.language = id.substring(id.lastIndexOf('@'))
          this.datatype = RDF.langString
        } else if (id.lastIndexOf('^^<') === id.lastIndexOf('"') + 1)
          this.datatype = new NamedNode(id.substring(id.lastIndexOf('^^<'), id.length - 1))
        else this.datatype = XMLSchema.string
      }
    }
  }

  export class DefaultGraph extends Node implements IDefaultGraph {
    public static instance: IDefaultGraph = new DefaultGraph()
    public termType: 'DefaultGraph'
    public toCanonical(): string { return '' }
    public equals(other: ITerm): boolean { return other.termType === 'DefaultGraph' }
    constructor() { super('', 'DefaultGraph') }
  }

  export class Variable extends Node implements IVariable {
    public termType: 'Variable'
    constructor(value: string) { super(value, 'Variable') }
    public toCanonical(): string { return '?' + this.value }
  }


  export class NamedNode extends Node implements INamedNode {
    public termType: 'NamedNode'
    constructor(value: string) { super(value, 'NamedNode') }
    public toCanonical(): string { return '<' + this.value + '>' }
  }

  export class BlankNode extends Node implements IBlankNode {
    public termType: 'BlankNode'
    constructor(value: string) { super(value, 'BlankNode') }
    public toCanonical(): string { return '?' + this.value }
  }

  export class Literal extends Node implements ILiteral {
    public termType: 'Literal'
    constructor(value: string, language: string = '', datatype?: INamedNode) {
      super(value, 'Literal', language, datatype ? datatype : (language !== '' ? RDF.langString : XMLSchema.string))
    }
  }

  export class Quad implements IQuad {
    constructor (
      public subject: INode,
      public predicate: INode,
      public object: INode,
      public graph: INode
    ) {}
    public toCanonical(): string {
     return this.subject.toCanonical() + ' ' + this.predicate.toCanonical() + ' ' + this.object.toCanonical() + (this.graph.termType === 'DefaultGraph' ? '' : (' ' + this.graph.toCanonical()))
    }
    public equals(other: IQuad): boolean {
      return this.subject.equals(other.subject) && this.predicate.equals(other.predicate) && this.object.equals(other.object) && this.graph.equals(other.graph)
    }
  }

  export class Triple implements ITriple {
    public graph: IDefaultGraph = DefaultGraph.instance
    constructor (
      public subject: INode,
      public predicate: INode,
      public object: INode
    ) {}
    public toCanonical(): string {
     return this.subject.toCanonical() + ' ' + this.predicate.toCanonical() + ' ' + this.object.toCanonical()
    }
    public equals(other: IQuad): boolean {
      return this.subject.equals(other.subject) && this.predicate.equals(other.predicate) && this.object.equals(other.object) && this.graph.equals(other.graph)
    }
  }


  export class Graph {
    constructor(
      public graph?: INode,
      public triples: IQuad[] = []
    ) {}
  }

  export class DataFactory implements IDataFactory {
    public static instance: DataFactory = new DataFactory()
    public nodeFromBinding(binding: s.ISparqlBinding): INode { return new SparqlBindingNode(binding) }
    public nodeFromNode(other: ITerm): INode { return new NodeFromNode(other) }
    public namedNode(value: string): INamedNode { return new NamedNode(value) }
    public blankNode(value?: string): IBlankNode { return new BlankNode(value) }
    public literal(value: string, languageOrDatatype?: string|NamedNode): ILiteral {
      if (typeof(languageOrDatatype) === 'string') return new Literal(value, <string>languageOrDatatype)
      else return new Literal(value, undefined , <NamedNode>languageOrDatatype)
    }
    public variable(value: string): IVariable { return new Variable(value) }
    public defaultGraph(): IDefaultGraph { return DefaultGraph.instance }
    public triple(subject: ITerm, predicate: ITerm, object: ITerm): IQuad {
      return new Triple(subject, predicate, object)
    }
    public quad(subject: ITerm, predicate: ITerm, object: ITerm, graph?: ITerm): IQuad {
      return new Quad(subject, predicate, object, graph ? graph : DefaultGraph.instance)
    }
  }

  export class SKOS {
    public static ns: string = 'http://www.w3.org/2004/02/skos/core#'
    public static prefLabel: INamedNode = new NamedNode(SKOS.ns + 'prefLabel')
  }

  export class OWL {
    public static ns: string = 'http://www.w3.org/2002/07/owl#'
    public static sameAs: INamedNode = new NamedNode(OWL.ns + 'sameAs')
  }

  export class RDF {
    public static ns: string = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#'
    public static type: INamedNode = new NamedNode(RDF.ns + 'type')
    public static langString: INamedNode = new NamedNode(RDF.ns + 'langString')
  }

  export class XMLSchema {
    public static ns: string = 'http://www.w3.org/2001/XMLSchema#'
    public static string: INamedNode = new NamedNode(XMLSchema.ns + 'string')
  }

  export class CIDOC {
    public static ns: string = 'http://www.cidoc-crm.org/cidoc-crm/'
    public static Person: INamedNode = new NamedNode(CIDOC.ns + 'E21_Person')
    public static Place: INamedNode = new NamedNode(CIDOC.ns + 'E53_Place')
    public static Group: INamedNode = new NamedNode(CIDOC.ns + 'E74_Group')
  }

}
