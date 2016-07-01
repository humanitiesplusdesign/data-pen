namespace fibra {
  'use strict'

  export interface ITerm {
    termType: 'NamedNode' | 'BlankNode' | 'Literal' | 'Variable' | 'DefaultGraph'
    value: string
    equals(other: ITerm): boolean
    toCanonical(): string
  }

  export interface INamedNode extends ITerm {
    termType: 'NamedNode'
  }

  export interface IBlankNode extends ITerm {
    termType: 'BlankNode'
  }

  export interface ILiteral extends ITerm {
    termType: 'Literal'
    language: string
    datatype: string
  }

  export interface IVariable extends ITerm {
    termType: 'Variable'
  }

  export interface IDefaultGraph extends ITerm {
    termType: 'DefaultGraph'
  }

  export interface IQuad {
    subject: ITerm
    predicate: ITerm
    object: ITerm
    graph: ITerm
    toCanonical(): string
    equals(other: IQuad): boolean
  }

  export interface ITriple extends IQuad {
    graph: IDefaultGraph
  }

  export interface IDataFactory {
    namedNode(value: string): INamedNode
    blankNode(value?: string): IBlankNode
    literal(value: string, languageOrDatatype?: string): ILiteral
    variable(value: string): IVariable
    defaultGraph(): IDefaultGraph
    triple(subject: ITerm, predicate: ITerm, object: ITerm): IQuad
    quad(subject: ITerm, predicate: ITerm, object: ITerm): IQuad
  }


}
