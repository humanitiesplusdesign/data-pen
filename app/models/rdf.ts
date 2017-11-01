'use strict'

import { ISparqlBinding, SparqlService } from 'angular-sparql-service'
import { ITerm, INamedNode, ILiteral, IDefaultGraph, IUNDEF, IVariable, IBlankNode, IQuad, ITriple, IDataFactory} from 'models/rdfjs'
import { IEMap, EMap, EOMap } from 'components/collection-utils'

export interface INode extends ITerm {
  language?: string
  datatype?: INamedNode
}

export class CNode implements INode {
  constructor(public value: string, public termType: 'NamedNode' | 'BlankNode' | 'Literal' | 'Variable' | 'DefaultGraph' | 'UNDEF', public language: string | undefined = undefined, public datatype: INamedNode | undefined = undefined) {}
  public toCanonical(): string {
    switch (this.termType) {
      case 'NamedNode': return '<' + this.value + '>'
      case 'BlankNode': return '_:' + this.value
      case 'Literal': return SparqlService.stringToSPARQLString(this.value) + (this.language ? '@' + this.language : (!this.datatype || RDF.langString.equals(this.datatype!) || XMLSchema.string.equals(this.datatype!) ? '' : '^^' + this.datatype!.toCanonical()))
      case 'Variable': return '?' + this.value
      case 'DefaultGraph': return ''
      case 'UNDEF': return 'UNDEF'
      default: throw 'Unknown term type ' + this
    }
  }
  public equals(other: ITerm): boolean {
    return this.termType === other.termType && this.value === other.value && (this.termType !== 'Literal' || (this.language === (<ILiteral>other).language && this.datatype === (<ILiteral>other).datatype))
  }
}

export class NodeFromNode extends CNode {
  constructor(other: INode) {
    super(other.value, other.termType, other.language, other.datatype)
  }
}

export class DefaultGraph extends CNode implements IDefaultGraph {
  public static instance: IDefaultGraph = new DefaultGraph()
  public termType: 'DefaultGraph'
  public toCanonical(): string { return '' }
  public equals(other: ITerm): boolean { return other.termType === 'DefaultGraph' }
  constructor() { super('', 'DefaultGraph') }
}

export class UNDEF extends CNode implements IUNDEF {
  public static instance: IUNDEF = new UNDEF()
  public termType: 'UNDEF'
  public toCanonical(): string { return '' }
  public equals(other: ITerm): boolean { return other.termType === 'UNDEF' }
  constructor() { super('', 'UNDEF') }
}

export class Variable extends CNode implements IVariable {
  public termType: 'Variable'
  constructor(value: string) { super(value, 'Variable') }
  public toCanonical(): string { return '?' + this.value }
}

export class NamedNode extends CNode implements INamedNode {
  public termType: 'NamedNode'
  constructor(value: string) { super(value, 'NamedNode') }
  public toCanonical(): string { return '<' + this.value + '>' }
}

export class BlankNode extends CNode implements IBlankNode {
  public termType: 'BlankNode'
  constructor(value: string) { super(value, 'BlankNode') }
  public toCanonical(): string { return '?' + this.value }
}

export class Literal extends CNode implements ILiteral {
  public termType: 'Literal'
  public language: string
  public datatype: INamedNode
  constructor(value: string, language: string = '', datatype?: INamedNode) {
    super(value, 'Literal', language, datatype ? datatype : (language ? RDF.langString : XMLSchema.string))
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
    public graph: INode,
    public triples: ITriple[] = []
  ) {}
}

export class DataFactory implements IDataFactory {

  public static instance: DataFactory = new DataFactory()

  private nextBlankNodeId: number = 0

  public static nodeFromBinding(binding: ISparqlBinding): INode {
    return DataFactory.instance.nodeFromBinding(binding)
  }

  public static nodeFromNode(other: ITerm): INode {
    return DataFactory.instance.nodeFromNode(other)
  }

  public static nodeFromCanonicalRepresentation(id: string): INode {
    return DataFactory.instance.nodeFromCanonicalRepresentation(id)
  }

  public static namedNode(value: string): INamedNode { return DataFactory.instance.namedNode(value) }
  public static blankNode(value?: string): IBlankNode { return DataFactory.instance.blankNode(value) }
  public static literal(value: string, languageOrDatatype?: string|NamedNode): ILiteral {
    return DataFactory.instance.literal(value, languageOrDatatype)
  }
  public static variable(value: string): IVariable { return DataFactory.instance.variable(value) }
  public static defaultGraph(): IDefaultGraph { return DataFactory.instance.defaultGraph() }
  public static triple(subject: ITerm, predicate: ITerm, object: ITerm): ITriple {
    return DataFactory.instance.triple(subject, predicate, object)
  }
  public static quad(subject: ITerm, predicate: ITerm, object: ITerm, graph?: ITerm): IQuad {
    return DataFactory.instance.quad(subject, predicate, object, graph)
  }

  public nodeFromBinding(binding: ISparqlBinding): INode {
    let n: CNode = new CNode(binding.value, binding.type === 'literal' ? 'Literal' : (binding.type === 'uri' ? 'NamedNode' : 'BlankNode'))
    if (binding.type === 'literal') {
      n.language = binding['xml:lang'] ? binding['xml:lang'] : ''
      n.datatype = binding.datatype ? new NamedNode(binding.datatype) : (n.language !== '' ? RDF.langString : XMLSchema.string)
    }
    return n
  }

  public nodeFromNode(other: ITerm): INode {
    if (other.termType === 'Literal') return new Literal(other.value, (<ILiteral>other).language, (<ILiteral>other).datatype)
    else return new CNode(other.value, other.termType)
  }

  public nodeFromCanonicalRepresentation(id: string): INode {
    if (id.indexOf('<') === 0)
      return new NamedNode(id.substring(1, id.length - 1))
    else if (id.indexOf('_:') === 0)
      return new BlankNode(id.substring(2))
    else {
      let value: string = id.substring(1, id.lastIndexOf('"'))
      if (id.lastIndexOf('@') === id.lastIndexOf('"') + 1)
        return new Literal(value, id.substring(id.lastIndexOf('@')))
      else if (id.lastIndexOf('^^<') === id.lastIndexOf('"') + 1)
        return new Literal(value, '', new NamedNode(id.substring(id.lastIndexOf('^^<'), id.length - 1)))
      else return new Literal(value)
    }
  }

  public namedNode(value: string): INamedNode { return new NamedNode(value) }
  public blankNode(value?: string): IBlankNode { return new BlankNode(value ? value : ('b' + ++this.nextBlankNodeId)) }
  public literal(value: string, languageOrDatatype?: string|NamedNode): ILiteral {
    if (typeof(languageOrDatatype) === 'string') return new Literal(value, <string>languageOrDatatype)
    else return new Literal(value, undefined , <NamedNode>languageOrDatatype)
  }
  public variable(value: string): IVariable { return new Variable(value) }
  public defaultGraph(): IDefaultGraph { return DefaultGraph.instance }
  public triple(subject: ITerm, predicate: ITerm, object: ITerm): ITriple {
    return new Triple(subject, predicate, object)
  }
  public quad(subject: ITerm, predicate: ITerm, object: ITerm, graph?: ITerm): IQuad {
    return new Quad(subject, predicate, object, graph ? graph : DefaultGraph.instance)
  }
}

// DRAFT
export class FIBRA {
  public static ns: string = 'http://hdlab.stanford.edu/fibra/ontology#'

  public static Project: INamedNode = new NamedNode(FIBRA.ns + 'Project')
  public static graph: INamedNode = new NamedNode(FIBRA.ns + 'graph')
  public static qualifiedAssertion: INamedNode = new NamedNode(FIBRA.ns + 'qualifiedAssertion')
  public static order: INamedNode = new NamedNode(FIBRA.ns + 'order')
  public static schemaNS: INamedNode = new NamedNode(FIBRA.ns + 'schemaNS')
  public static instanceNS: INamedNode = new NamedNode(FIBRA.ns + 'instanceNS')
  public static updateEndpoint: INamedNode = new NamedNode(FIBRA.ns + 'updateEndpoint')
  public static configuration: INamedNode = new NamedNode(FIBRA.ns + 'configuration')
  public static configurationReference: INamedNode = new NamedNode(FIBRA.ns + 'configurationReference')
  public static schema: INamedNode = new NamedNode(FIBRA.ns + 'schema')
  public static schemaReference: INamedNode = new NamedNode(FIBRA.ns + 'schemaReference')
  public static autocompletionQuery: INamedNode = new NamedNode(FIBRA.ns + 'autocompletionQuery')
  public static propertyQuery: INamedNode = new NamedNode(FIBRA.ns + 'propertyQuery')
  public static classQuery: INamedNode = new NamedNode(FIBRA.ns + 'classQuery')
  public static itemQuery: INamedNode = new NamedNode(FIBRA.ns + 'itemQuery')
  public static deleteItemQuery: INamedNode = new NamedNode(FIBRA.ns + 'deleteItemQuery')

  public static RemoteEndpointConfiguration: INamedNode = new NamedNode(FIBRA.ns + 'RemoteEndpointConfiguration')
  public static PrimaryEndpointConfiguration: INamedNode = new NamedNode(FIBRA.ns + 'PrimaryEndpointConfiguration')
  public static AuthorityEndpointConfiguration: INamedNode = new NamedNode(FIBRA.ns + 'AuthorityEndpointConfiguration')
  public static ArchiveEndpointConfiguration: INamedNode = new NamedNode(FIBRA.ns + 'ArchiveEndpointConfiguration')
  public static Schema: INamedNode = new NamedNode(FIBRA.ns + 'Schema')
}

export class SD {
  public static ns: string = 'http://www.w3.org/ns/sparql-service-description#'
  public static _name: INamedNode = new NamedNode(SD.ns + 'name')
}

export class SKOS {
  public static ns: string = 'http://www.w3.org/2004/02/skos/core#'
  public static prefLabel: INamedNode = new NamedNode(SKOS.ns + 'prefLabel')
  public static altLabel: INamedNode = new NamedNode(SKOS.ns + 'altLabel')
  public static related: INamedNode = new NamedNode(SKOS.ns + 'related')
}

export class VOID {
  public static ns: string = 'http://rdfs.org/ns/void#'
  public static sparqlEndpoint: INamedNode = new NamedNode(VOID.ns + 'sparqlEndpoint')
}

export class DCTerms {
  public static ns: string = 'http://purl.org/dc/terms/'
  public static rightsHolder: INamedNode = new NamedNode(DCTerms.ns + 'rightsHolder')
  public static description: INamedNode = new NamedNode(DCTerms.ns + 'description')
}

export class FOAF {
  public static ns: string = 'http://xmlns.com/foaf/0.1/'
  public static homepage: INamedNode = new NamedNode(FOAF.ns + 'homepage')
}

export class OWL {
  public static ns: string = 'http://www.w3.org/2002/07/owl#'
  public static sameAs: INamedNode = new NamedNode(OWL.ns + 'sameAs')
  public static Thing: INamedNode = new NamedNode(OWL.ns + 'Thing')
  public static Class: INamedNode = new NamedNode(OWL.ns + 'Class')
}

export class RDF {
  public static ns: string = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#'
  public static type: INamedNode = new NamedNode(RDF.ns + 'type')
  public static langString: INamedNode = new NamedNode(RDF.ns + 'langString')
  public static Triple: INamedNode = new NamedNode(RDF.ns + 'Triple')
  public static subject: INamedNode = new NamedNode(RDF.ns + 'subject')
  public static predicate: INamedNode = new NamedNode(RDF.ns + 'predicate')
  public static object: INamedNode = new NamedNode(RDF.ns + 'object')
  public static value: INamedNode = new NamedNode(RDF.ns + 'value')
}

export class XMLSchema {
  public static ns: string = 'http://www.w3.org/2001/XMLSchema#'
  public static string: INamedNode = new NamedNode(XMLSchema.ns + 'string')
  public static dateTime: INamedNode = new NamedNode(XMLSchema.ns + 'dateTime')
}

export class CIDOC {
  public static ns: string = 'http://www.cidoc-crm.org/cidoc-crm/'
  public static Person: INamedNode = new NamedNode(CIDOC.ns + 'E21_Person')
  public static Place: INamedNode = new NamedNode(CIDOC.ns + 'E53_Place')
  public static Group: INamedNode = new NamedNode(CIDOC.ns + 'E74_Group')
}

export class GETTY {
  public static ns: string = 'http://vocab.getty.edu/ontology#'
  public static AdminPlaceConcept: INamedNode = new NamedNode(GETTY.ns + 'AdminPlaceConcept')
  public static PhysicalPlaceConcept: INamedNode = new NamedNode(GETTY.ns + 'PhysicalPlaceConcept')
  public static PhysAdminPlaceConcept: INamedNode = new NamedNode(GETTY.ns + 'PhysAdminPlaceConcept')
  public static PersonConcept: INamedNode = new NamedNode(GETTY.ns + 'PersonConcept')
  public static GroupConcept: INamedNode = new NamedNode(GETTY.ns + 'GroupConcept')
}

export class MADS {
  public static ns: string = 'http://www.loc.gov/mads/rdf/v1#'
  public static CorporateName: INamedNode = new NamedNode(MADS.ns + 'CorporateName')
  public static PersonalName: INamedNode = new NamedNode(MADS.ns + 'PersonalName')
  public static NameTitle: INamedNode = new NamedNode(MADS.ns + 'NameTitle')
  public static Geographic: INamedNode = new NamedNode(MADS.ns + 'Geographic')
}

export class GEOVOCAB {
  public static ns: string = 'http://geovocab.org/spatial#'
  public static Feature: INamedNode = new NamedNode(GEOVOCAB.ns + 'Feature')
}

export class ENodeMap<V> {
  constructor(private create: (key?: INode) => V = () => { return <V>{}}, private map: IEMap<V> = new EMap<V>()) {}
  public goc(key: INode, create?: (key?: INode) => V): V {
    if (!this.has(key))
      this.set(key, create ? create(key) : this.create(key))
    return this.get(key)
  }
  public get(key: INode): V {
    return this.map.get(key.toCanonical())
  }
  public remove(key: INode): boolean {
    return this.map.remove(key.toCanonical())
  }
  public each(f: (value: V, key: INode, map: ENodeMap<V>) => void): void {
    this.map.each((value, key, map) => f(value, DataFactory.instance.nodeFromCanonicalRepresentation(key), this))
  }
  public has(key: INode): boolean {
    return this.map.has(key.toCanonical())
  }
  public set(key: INode, value: V): ENodeMap<V> {
    this.map.set(key.toCanonical(), value)
    return this
  }
  get size(): number {
    return this.map.size()
  }
  public values(): V[] {
    return this.map.values()
  }
  public keys(): INode[] {
    return this.map.keys().map(k => DataFactory.instance.nodeFromCanonicalRepresentation(k))
  }
  public entries(): {key: INode, value: V}[] {
    return this.map.entries().map(o => { return { key: DataFactory.instance.nodeFromCanonicalRepresentation(o.key), value: o.value }})
  }
  public clear(): ENodeMap<V> {
    this.map.clear()
    return this
  }
}

export class EONodeMap<V> extends ENodeMap<V> {
  constructor(create?: (key?: INode) => V ) {
    super(create, new EOMap<V>())
  }
}

export class NodeSet<N extends INode> {
  public m: ENodeMap<N>
  constructor(map: IEMap<N> = new EMap<N>()) {
    this.m = new ENodeMap<N>(undefined, map)
  }
  public add(value: N): NodeSet<N> {
    this.m.set(value, value)
    return this
  }
  public adda(arr: N[]): this {
    arr.forEach(n => this.add(n))
    return this
  }
  public adds(oset: NodeSet<N>): this {
    oset.each(n => this.add(n))
    return this
  }
  public has(value: N): boolean {
    return this.m.has(value)
  }
  public get(value: N): N {
    return this.m.get(value)
  }
  public clear(): NodeSet<N> {
    this.m.clear()
    return this
  }

  public remove(value: N): boolean {
    return this.m.remove(value)
  }

  public values(): N[] {
    return this.m.values()
  }

  get size(): number {
    return this.m.size
  }

  public each(f: (value: N, key: N, set: NodeSet<N>) => void): void {
    this.m.each((value, key, map) => f(value, value, this))
  }
}

export class ONodeSet<N extends INode> extends NodeSet<N> {
  constructor() {
    super(new EOMap<N>())
  }
}
