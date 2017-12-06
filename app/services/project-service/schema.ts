'use strict'

import {Citable} from '../../models/citable'
import {DataModel} from './data-model'
import { FIBRA, ONodeSet, VOID } from '../../models/rdf';
import {SparqlService} from 'angular-sparql-service'
import { TurtleBuilder } from 'components/misc-utils';

export class Schema extends Citable {
  public static listSchemasQuery: string = `PREFIX fibra: <http://hdlab.stanford.edu/fibra/ontology#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX dcterms: <http://purl.org/dc/terms/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX void: <http://rdfs.org/ns/void#>
SELECT ?id ?labels ?descriptions ?rightsHolders ?rightsHolders_labels ?rightsHolders_descriptions ?rightsHolders_url ?rightsHolders_order ?url ?endpoint ?classQuery ?propertyQuery {
# STARTGRAPH
# VALUE
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
  public endpoint: string
  public classQuery: string = DataModel.classQuery
  public propertyQuery: string = DataModel.propertyQuery
  protected __className: string = 'Schema'
  public toTurtle(tb: TurtleBuilder): void {
    if (!tb.fragmentsById.has(this.id)) {
      tb.prefixes['fibra'] = FIBRA.ns
      tb.prefixes['void'] = VOID.ns
      tb.fragmentsById.set(this.id, `<${this.id}> a fibra:Schema ;`)
      super.toTurtle(tb)
      let f: string = tb.fragmentsById.get(this.id)
      f = f + `
void:sparqlEndpoint <${this.endpoint}> ;
fibra:classQuery ${SparqlService.stringToSPARQLString(this.classQuery)} ;
fibra:propertyQuery ${SparqlService.stringToSPARQLString(this.propertyQuery)} .`
      tb.fragmentsById.set(this.id, f)
    }
  }
}
