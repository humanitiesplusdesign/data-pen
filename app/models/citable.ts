'use strict'

import {ILiteral} from 'models/rdfjs'
import {SKOS, DCTerms, FOAF, FIBRA, RDF, XMLSchema, NodeSet, ONodeSet} from 'models/rdf'

export interface ICitableSource {
  sparqlEndpoint: string
  graph?: string
  clone(): ICitableSource
}

export class CitableSource implements ICitableSource {

  constructor(public sparqlEndpoint: string, public graph?: string) {}

  public clone(): ICitableSource { return new CitableSource(this.sparqlEndpoint, this.graph) }
}

export interface ICitable {
  id: string
  labels: ONodeSet<ILiteral>
  descriptions: ONodeSet<ILiteral>
  url?: string
  rightsHolders: ICitable[]
  source: ICitableSource
  dateCreated: Date
  copyCitableTo(other: ICitable): void
  clone(): ICitable
  toTurtle(fragmentsById: d3.Map<string>, prefixes: {[id: string]: string}): void
}

export class Citable implements ICitable {
  public id: string
  public source: ICitableSource = new CitableSource(null)
  public static toTurtle(c: ICitable, fragmentsById: d3.Map<string>, prefixes: {[id: string]: string}): void {
    prefixes['skos'] = SKOS.ns
    prefixes['dcterms'] = DCTerms.ns
    prefixes['foaf'] = FOAF.ns
    prefixes['fibra'] = FIBRA.ns
    prefixes['rdf'] = RDF.ns
    prefixes['xsd'] = XMLSchema.ns
    let f: string = fragmentsById.get(c.id)
    c.labels.each(label => { if (label.value) f = f + `
skos:prefLabel ${label.toCanonical()} ;` })
    f = f + `
dcterms:created "${c.dateCreated.toISOString()}"^^xsd:dateTime ;`
    c.descriptions.each(descr => { if (descr.value) f = f + `
dcterms:description ${descr.toCanonical()} ;` })
    if (c.url) f = f + `
foaf:homepage <${c.url}> ;`
    if (c.rightsHolders.length > 0) {
      f = f + `
dcterms:rightsHolder `
      c.rightsHolders.forEach(rh => {
        f = f + `<${rh.id}>, `
        if (!fragmentsById.has(rh.id)) {
          fragmentsById.set(rh.id, `<${rh.id}> a foaf:Agent ;`)
          rh.toTurtle(fragmentsById, prefixes)
        }
      })
      f = f.substring(0, f.length - 2) + ' ;'
      if (c.rightsHolders.length > 1)
        c.rightsHolders.forEach((rh, index) => {
          f = f + `
fibra:qualifiedAssertion [
  rdf:predicate dcterms:rightsHolder ;
  rdf:object <${rh.id}> ;
  fibra:order ${index} ;
] ;`
        })
    }
    fragmentsById.set(c.id, f)
  }
  constructor(id?: string, source?: ICitableSource, public labels: ONodeSet<ILiteral> = new ONodeSet<ILiteral>(), public url?: string, public descriptions: ONodeSet<ILiteral> = new ONodeSet<ILiteral>(), public rightsHolders: ICitable[] = [], public dateCreated: Date = new Date()) {
    this.id = id
    this.source = source
  }
  public toTurtle(fragmentsById: d3.Map<string>, prefixes: {[id: string]: string}): void { Citable.toTurtle(this, fragmentsById, prefixes) }
  public copyCitableTo(other: ICitable): void {
    other.id = this.id
    other.source = this.source.clone()
    other.labels = this.labels.clone()
    other.url = this.url
    other.descriptions = this.descriptions.clone()
    other.rightsHolders = this.rightsHolders.map(rh => rh.clone())
    other.dateCreated = this.dateCreated
  }
  public clone(): ICitable {
    return new Citable(this.id, this.source, this.labels.clone(), this.url, this.descriptions.clone(), this.rightsHolders.map(rh => rh.clone()), this.dateCreated)
  }
}
