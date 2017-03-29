namespace fibra {
  'use strict'

  export interface ICitable {
    id: string
    labels: ILiteral[]
    descriptions: ILiteral[]
    url?: string
    rightsHolders: ICitable[]
    sourceEndpoint?: string
    sourceGraph?: string
    toTurtle(fragmentsById: d3.Map<string>, prefixes: {[id: string]: string}): void
  }

  export class Citable implements ICitable {
    public id: string
    public static toTurtle(c: ICitable, fragmentsById: d3.Map<string>, prefixes: {[id: string]: string}): void {
      prefixes['skos'] = SKOS.ns
      prefixes['dcterms'] = DCTerms.ns
      prefixes['foaf'] = FOAF.ns
      prefixes['fibra'] = FIBRA.ns
      prefixes['rdf'] = RDF.ns
      let f: string = fragmentsById.get(c.id)
      c.labels.forEach(label => { if (label.value) f = f + `
  skos:prefLabel ${label.toCanonical()} ;` })
      c.descriptions.forEach(descr => { if (descr.value) f = f + `
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
    constructor(id?: string, public sourceEndpoint?: string, public sourceGraph?: string, public labels: ILiteral[] = [], public url?: string, public descriptions: ILiteral[] = [], public rightsHolders: ICitable[] = []) {
      this.id = id
    }
    public toTurtle(fragmentsById: d3.Map<string>, prefixes: {[id: string]: string}): void { Citable.toTurtle(this, fragmentsById, prefixes) }
  }

}
