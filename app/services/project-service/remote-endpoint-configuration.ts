'use strict'

import { Citable } from 'models/citable'
import { INode, FIBRA, VOID, RDF, ONodeSet } from 'models/rdf'
import { SparqlAutocompleteService } from 'services/sparql-autocomplete-service'
import { DataModel, Class, IClass } from 'services/project-service/data-model'
import { SparqlItemService } from 'services/sparql-item-service'
import { SparqlStatisticsService } from 'services/sparql-statistics-service'
import { SparqlService } from 'angular-sparql-service'
import { TurtleBuilder } from 'components/misc-utils';

export class RemoteEndpointConfiguration extends Citable {
  public static listRemoteEndpointConfigurationsQuery: string = `PREFIX fibra: <http://hdlab.stanford.edu/fibra/ontology#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX dcterms: <http://purl.org/dc/terms/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX void: <http://rdfs.org/ns/void#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
SELECT * {
# STARTGRAPH
  # VALUE
  # TYPELIMIT
  { ?id a ?types }
  UNION
  { ?id skos:prefLabel ?labels }
  UNION
  { ?id dcterms:description ?descriptions }
  UNION
  {
    ?id void:sparqlEndpoint ?endpoint .
    ?id fibra:autocompletionQuery ?autocompletionQuery .
    ?id fibra:itemQuery ?itemQuery .
    ?id fibra:classStatisticsQuery ?classStatisticsQuery .
    OPTIONAL {
      ?id fibra:propertyStatisticsQuery ?propertyStatisticsQuery .
    }
    ?id fibra:propertyQuery ?propertyQuery .
    ?id fibra:classQuery ?classQuery .
    OPTIONAL { ?id fibra:schemaEndpoint ?schemaEndpoint }
    OPTIONAL { ?id foaf:homepage ?url }
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
  public types: ONodeSet<IClass> = new ONodeSet<IClass>()
  public autocompletionQuery: string = SparqlAutocompleteService.defaultMatchQuery
  public propertyQuery: string = DataModel.propertyQuery
  public classQuery: string = DataModel.classQuery
  public itemQuery: string = SparqlItemService.getItemPropertiesQuery
  public classStatisticsQuery: string = SparqlStatisticsService.getClassStatisticsQuery
  public propertyStatisticsQuery: string = SparqlStatisticsService.getPropertyStatisticsQuery
  public schemaEndpoint: string
  public endpoint: string
  public constraints: string
  protected __className: string = 'RemoteEndpointConfiguration'
  public toTurtle(tb: TurtleBuilder): void {
    if (!tb.fragmentsById.has(this.id)) {
      tb.prefixes['fibra'] = FIBRA.ns
      tb.prefixes['void'] = VOID.ns
      tb.prefixes['rdf'] = RDF.ns
      let f: string = `<${this.id}> a `
      this.types.each(type => f = f + `${type.toCanonical()}, `)
      f = f.substring(0, f.length - 2) + ' ;'
      tb.fragmentsById.set(this.id, f)
      super.toTurtle(tb)
      f = tb.fragmentsById.get(this.id)
      f = f + `
fibra:schemaEndpoint <${this.schemaEndpoint}> ;
void:sparqlEndpoint <${this.endpoint}> ;
fibra:autocompletionQuery ${SparqlService.stringToSPARQLString(this.autocompletionQuery)} ;
fibra:itemQuery ${SparqlService.stringToSPARQLString(this.itemQuery)} ;
fibra:classStatisticsQuery ${SparqlService.stringToSPARQLString(this.classStatisticsQuery)} ;
fibra:propertyStatisticsQuery ${SparqlService.stringToSPARQLString(this.propertyStatisticsQuery)} ;
fibra:propertyQuery ${SparqlService.stringToSPARQLString(this.propertyQuery)} ;
fibra:classQuery ${SparqlService.stringToSPARQLString(this.classQuery)} .`
      tb.fragmentsById.set(this.id, f)
    }
  }
}
