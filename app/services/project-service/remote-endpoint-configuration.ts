'use strict'

import {Citable} from '../../models/citable'
import {INode, FIBRA, VOID, RDF} from '../../models/rdf'
import {SparqlAutocompleteService} from '../../components/sparql-autocomplete/sparql-autocomplete-service'
import {DataModel} from './data-model'
import {SparqlItemService} from '../sparql-item-service'
import {SparqlTreeService} from '../../services/sparql-tree-service'

import s = fi.seco.sparql.SparqlService

export class RemoteEndpointConfiguration extends Citable {
  public static listAuthorityEndpointConfigurationsQuery: string = `PREFIX fibra: <http://hdlab.stanford.edu/fibra/ontology#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX dcterms: <http://purl.org/dc/terms/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX void: <http://rdfs.org/ns/void#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
SELECT ?id ?types ?labels ?descriptions ?rightsHolders ?rightsHolders_labels ?rightsHolders_descriptions ?rightsHolders_url ?rightsHolders_order ?url ?endpoint ?autocompletionQuery ?itemQuery ?treeQuery ?propertyQuery ?classQuery {
# STARTGRAPH
  ?id a fibra:AuthorityEndpointConfiguration .
  ?id a ?types .
  { ?id skos:prefLabel ?labels }
  UNION
  { ?id dcterms:description ?descriptions }
  UNION
  {
    ?id void:sparqlEndpoint ?endpoint .
    ?id fibra:autocompletionQuery ?autocompletionQuery .
    ?id fibra:itemQuery ?itemQuery .
    ?id fibra:treeQuery ?treeQuery .
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
SELECT ?types ?labels ?descriptions ?rightsHolders ?rightsHolders_labels ?rightsHolders_descriptions ?rightsHolders_url ?rightsHolders_order ?url ?endpoint ?autocompletionQuery ?itemQuery ?treeQuery ?propertyQuery ?classQuery {
# STARTGRAPH
  { <ID> skos:prefLabel ?labels }
  UNION
  { <ID> dcterms:description ?descriptions }
  UNION
  {
    <ID> a ?types .
    <ID> void:sparqlEndpoint ?endpoint .
    <ID> fibra:autocompletionQuery ?autocompletionQuery .
    <ID> fibra:itemQuery ?itemQuery .
    <ID> fibra:treeQuery ?treeQuery .
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
  public autocompletionQuery: string = SparqlAutocompleteService.defaultMatchQuery
  public propertyQuery: string = DataModel.propertyQuery
  public classQuery: string = DataModel.classQuery
  public itemQuery: string = SparqlItemService.getRemoteItemPropertiesQuery
  // TODO remove
  public treeQuery: string = SparqlTreeService.getClassTreeQuery
  public endpoint: string
  public toTurtle(fragmentsById: d3.Map<string>, prefixes: {[id: string]: string}): void {
    if (!fragmentsById.has(this.id)) {
      prefixes['fibra'] = FIBRA.ns
      prefixes['void'] = VOID.ns
      prefixes['rdf'] = RDF.ns
      let f: string = `<${this.id}> a `
      this.types.forEach(type => f = f + `${type.toCanonical()} ,`)
      f = f.substring(0, f.length - 2) + ' ;'
      fragmentsById.set(this.id, f)
      super.toTurtle(fragmentsById, prefixes)
      f  = fragmentsById.get(this.id)
      f = f + `
void:sparqlEndpoint <${this.endpoint}> ;
fibra:autocompletionQuery ${s.stringToSPARQLString(this.autocompletionQuery)} ;
fibra:itemQuery ${s.stringToSPARQLString(this.itemQuery)} ;
fibra:treeQuery ${s.stringToSPARQLString(this.treeQuery)} ;
fibra:propertyQuery ${s.stringToSPARQLString(this.propertyQuery)} ;
fibra:classQuery ${s.stringToSPARQLString(this.classQuery)} .`
      fragmentsById.set(this.id, f)
    }
  }
}
