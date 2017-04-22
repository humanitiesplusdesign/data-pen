'use strict'

import {Citable} from '../app/_datamodel/citable'
import {DataModel} from './data-model'
import {FIBRA, VOID} from '../app/_datamodel/rdf'

import s = fi.seco.sparql.SparqlService

export class Schema extends Citable {
  public static listSchemasQuery: string = `PREFIX fibra: <http://hdlab.stanford.edu/fibra/ontology#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX dcterms: <http://purl.org/dc/terms/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX void: <http://rdfs.org/ns/void#>
SELECT ?id ?labels ?descriptions ?rightsHolders ?rightsHolders_labels ?rightsHolders_descriptions ?rightsHolders_url ?rightsHolders_order ?url ?endpoint ?classQuery ?propertyQuery {
# STARTGRAPH
  ?id a fibra:Schema .
  { ?id skos:prefLabel ?labels }
  UNION
  { ?id dcterms:description ?descriptions }
  UNION
  { ?id foaf:homepage ?url }
  UNION
  {
    ?id void:sparqlEndpoint ?endpoint .
    ?id fibra:classQuery ?classQuery .
    ?id fibra:propertyQuery ?propertyQuery .
  } UNION {
    {
      ?id dcterms:rightsHolder ?rightsHolders
    } UNION {
      ?id fibra:qualifiedAssertion ?qa .
      ?qa rdf:predicate dcterms:rightsHolder .
      ?qa rdf:object ?rightsHolders .
      OPTIONAL { ?qa fibra:order ?rightsHolders_order }
    }
    {
      ?rightsHolders skos:prefLabel ?rightsHolders_labels
    } UNION {
      ?rightsHolders foaf:homepage ?rightsHolders_url
    } UNION {
      ?rightsHolders dcterms:description ?rightsHolders_descriptions
    }
  }
# ENDGRAPH
}`
  public static schemaQuery: string = `PREFIX fibra: <http://hdlab.stanford.edu/fibra/ontology#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX dcterms: <http://purl.org/dc/terms/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX void: <http://rdfs.org/ns/void#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
SELECT ?labels ?descriptions ?rightsHolders ?rightsHolders_labels ?rightsHolders_descriptions ?rightsHolders_url ?rightsHolders_order ?url ?endpoint ?classQuery ?propertyQuery {
# STARTGRAPH
  { <ID> skos:prefLabel ?labels }
  UNION
  { <ID> dcterms:description ?descriptions }
  UNION
  {
    <ID> void:sparqlEndpoint ?endpoint .
    <ID> fibra:classQuery ?classQuery .
    <ID> fibra:propertyQuery ?propertyQuery .
  } UNION {
    {
      <ID> dcterms:rightsHolder ?rightsHolders
    } UNION {
      <ID> fibra:qualifiedAssertion ?qa .
      ?qa rdf:predicate dcterms:rightsHolder .
      ?qa rdf:object ?rightsHolders .
      OPTIONAL { ?qa fibra:order ?rightsHolders_order }
    }
    {
      ?rightsHolders skos:prefLabel ?rightsHolders_labels
    } UNION {
      ?rightsHolders foaf:homepage ?rightsHolders_url
    } UNION {
      ?rightsHolders dcterms:description ?rightsHolders_descriptions
    }
  }
# ENDGRAPH
}
`
  public endpoint: string
  public classQuery: string = DataModel.classQuery
  public propertyQuery: string = DataModel.propertyQuery
  public toTurtle(fragmentsById: d3.Map<string>, prefixes: {[id: string]: string}): void {
    if (!fragmentsById.has(this.id)) {
      prefixes['fibra'] = FIBRA.ns
      prefixes['void'] = VOID.ns
      fragmentsById.set(this.id, `<${this.id}> a fibra:Schema ;`)
      super.toTurtle(fragmentsById, prefixes)
      let f: string = fragmentsById.get(this.id)
      f = f + `
void:sparqlEndpoint <${this.endpoint}> ;
fibra:classQuery ${s.stringToSPARQLString(this.classQuery)} ;
fibra:propertyQuery ${s.stringToSPARQLString(this.propertyQuery)} .`
      fragmentsById.set(this.id, f)
    }
  }
}
