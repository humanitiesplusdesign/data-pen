'use strict'

import {Citable} from 'models/citable'
import {INode, FIBRA, VOID, RDF} from 'models/rdf'
import {SparqlAutocompleteService} from 'services/sparql-autocomplete-service'
import {DataModel} from 'services/project-service/data-model'
import {SparqlItemService} from 'services/sparql-item-service'
import {SparqlStatisticsService} from 'services/sparql-statistics-service'
import {SparqlService} from 'angular-sparql-service'

export class RemoteEndpointConfiguration extends Citable {
  public static listAuthorityEndpointConfigurationsQuery: string = `PREFIX fibra: <http://hdlab.stanford.edu/fibra/ontology#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX dcterms: <http://purl.org/dc/terms/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX void: <http://rdfs.org/ns/void#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
SELECT ?id ?types ?schemaEndpoint ?compatibleSchemas ?labels ?descriptions ?rightsHolders ?rightsHolders_labels ?rightsHolders_descriptions ?rightsHolders_url ?rightsHolders_order ?url ?endpoint ?autocompletionQuery ?itemQuery ?classStatisticsQuery ?propertyQuery ?classQuery {
# STARTGRAPH
  ?id a fibra:AuthorityEndpointConfiguration .
  ?id a ?types .
  { ?id fibra:schemaEndpoint ?schemaEndpoint }
  UNION
  { ?id fibra:compatibleWith ?compatibleSchemas }
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
    ?id fibra:propertyQuery ?propertyQuery .
    ?id fibra:classQuery ?classQuery .
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
  public static listArchiveEndpointConfigurationsQuery: string = RemoteEndpointConfiguration.listAuthorityEndpointConfigurationsQuery.replace(/fibra:AuthorityEndpointConfiguration/, 'fibra:ArchiveEndpointConfiguration')
  public static remoteEndpointConfigurationQuery: string = `PREFIX fibra: <http://hdlab.stanford.edu/fibra/ontology#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX dcterms: <http://purl.org/dc/terms/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX void: <http://rdfs.org/ns/void#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
SELECT ?types ?schemaEndpoint ?compatibleSchemas ?labels ?descriptions ?rightsHolders ?rightsHolders_labels ?rightsHolders_descriptions ?rightsHolders_url ?rightsHolders_order ?url ?endpoint ?autocompletionQuery ?itemQuery ?classStatisticsQuery ?propertyQuery ?classQuery {
# STARTGRAPH
  { <ID> fibra:schemaEndpoint ?schemaEndpoint }
  UNION
  { <ID> fibra:compatibleWith ?compatibleSchemas }
  UNION
  { <ID> skos:prefLabel ?labels }
  UNION
  { <ID> dcterms:description ?descriptions }
  UNION
  {
    <ID> a ?types .
    <ID> void:sparqlEndpoint ?endpoint .
    <ID> fibra:autocompletionQuery ?autocompletionQuery .
    <ID> fibra:itemQuery ?itemQuery .
    <ID> fibra:classStatisticsQuery ?classStatisticsQuery .
    <ID> fibra:propertyQuery ?propertyQuery .
    <ID> fibra:classQuery ?classQuery .
    OPTIONAL { <ID> foaf:homepage ?url }
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
}`
  public types: INode[] = []
  public compatibleSchemas: INode[] = []
  public autocompletionQuery: string = SparqlAutocompleteService.defaultMatchQuery
  public propertyQuery: string = DataModel.propertyQuery
  public classQuery: string = DataModel.classQuery
  public itemQuery: string = SparqlItemService.getItemPropertiesQuery
  public classStatisticsQuery: string = SparqlStatisticsService.getClassStatisticsQuery
  public schemaEndpoint: string
  public endpoint: string
  public clone(): RemoteEndpointConfiguration {
    let clone: RemoteEndpointConfiguration = new RemoteEndpointConfiguration()
    clone.types = this.types.slice(0)
    clone.compatibleSchemas = this.compatibleSchemas.slice(0)
    clone.autocompletionQuery = this.autocompletionQuery
    clone.propertyQuery = this.propertyQuery
    clone.classQuery = this.classQuery
    clone.itemQuery = this.itemQuery
    clone.classStatisticsQuery = this.classStatisticsQuery
    clone.schemaEndpoint = this.schemaEndpoint
    clone.endpoint = this.endpoint
    return clone
  }
  public toTurtle(fragmentsById: d3.Map<string>, prefixes: {[id: string]: string}): void {
    if (!fragmentsById.has(this.id)) {
      prefixes['fibra'] = FIBRA.ns
      prefixes['void'] = VOID.ns
      prefixes['rdf'] = RDF.ns
      let f: string = `<${this.id}> a `
      this.types.forEach(type => f = f + `${type.toCanonical()}, `)
      f = f.substring(0, f.length - 2) + ' ;'
      if (this.compatibleSchemas.length > 0) {
        f = f + `
fibra:schemaMap `
        this.compatibleSchemas.forEach(cs => f = f + `fibra:compatibleWith ${cs.toCanonical()}, `)
        f = f.substring(0, f.length - 2) + ' ;'
      }
      fragmentsById.set(this.id, f)
      super.toTurtle(fragmentsById, prefixes)
      f  = fragmentsById.get(this.id)
      f = f + `
fibra:schemaEndpoint <${this.schemaEndpoint}> ;
void:sparqlEndpoint <${this.endpoint}> ;
fibra:autocompletionQuery ${SparqlService.stringToSPARQLString(this.autocompletionQuery)} ;
fibra:itemQuery ${SparqlService.stringToSPARQLString(this.itemQuery)} ;
fibra:classStatisticsQuery ${SparqlService.stringToSPARQLString(this.classStatisticsQuery)} ;
fibra:propertyQuery ${SparqlService.stringToSPARQLString(this.propertyQuery)} ;
fibra:classQuery ${SparqlService.stringToSPARQLString(this.classQuery)} .`
      fragmentsById.set(this.id, f)
    }
  }
}
