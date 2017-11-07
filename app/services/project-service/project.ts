'use strict'

import {Citable} from 'models/citable'
import {DataModel} from 'services/project-service/data-model'
import {SparqlService} from 'angular-sparql-service'
import {SparqlAutocompleteService} from 'services/sparql-autocomplete-service'
import {SparqlTreeService} from 'services/sparql-tree-service'
import {SparqlItemService} from 'services/sparql-item-service'
import {RemoteEndpointConfiguration} from 'services/project-service/remote-endpoint-configuration'
import {PrimaryEndpointConfiguration} from 'services/project-service/primary-endpoint-configuration'
import {Schema} from 'services/project-service/schema'
import {FIBRA, VOID} from 'models/rdf'

export class Project extends Citable {

  public static listProjectsQuery: string = `PREFIX fibra: <http://hdlab.stanford.edu/fibra/ontology#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX dcterms: <http://purl.org/dc/terms/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX void: <http://rdfs.org/ns/void#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
SELECT ?id ?labels ?descriptions ?url ?dateCreated ?rightsHolders ?rightsHolders_labels ?rightsHolders_descriptions ?rightsHolder_surl ?rightsHolders_order ?instanceNS ?schemaNS ?endpoint ?graphStoreEndpoint ?updateEndpoint ?graph ?autocompletionQuery ?treeQuery ?itemQuery ?deleteItemQuery ?authorityEndpoints ?authorityEndpoints_source_graph ?authorityEndpoints_source_sparqlEndpoint ?archiveEndpoints ?archiveEndpoints_source_graph ?archiveEndpoints_source_sparqlEndpoint ?schemas ?schemas_source_graph ?schemas_source_sparqlEndpoint {
# STARTGRAPH
  ?id a fibra:Project .
  {
    ?id skos:prefLabel ?labels
  } UNION {
    ?id fibra:instanceNS ?instanceNS .
    ?id fibra:schemaNS ?schemaNS .
    ?id void:sparqlEndpoint ?endpoint .
    ?id fibra:updateEndpoint ?updateEndpoint .
    ?id fibra:graphStoreEndpoint ?graphStoreEndpoint .
    ?id fibra:autocompletionQuery ?autocompletionQuery .
    ?id fibra:treeQuery ?treeQuery .
    ?id fibra:itemQuery ?itemQuery .
    ?id fibra:deleteItemQuery ?deleteItemQuery .
    OPTIONAL { ?id fibra:graph ?graph }
    OPTIONAL { ?id dcterms:created ?dateCreated }
    OPTIONAL { ?id foaf:homepage ?url }
  } UNION {
    ?id fibra:schema ?schemas
  } UNION {
    ?id fibra:schemaReference ?ar .
    ?ar rdf:value ?schemas .
    ?ar void:sparqlEndpoint ?schemas_source_sparqlEndpoint .
    OPTIONAL { ?ar fibra:graph ?schemas_source_graph }
  } UNION {
    ?id fibra:authorityEndpoint ?authorityEndpoints
  } UNION {
    ?id fibra:authorityEndpointReference ?ar .
    ?ar rdf:value ?authorityEndpoints .
    ?ar void:sparqlEndpoint ?authorityEndpoints_source_sparqlEndpoint .
    OPTIONAL { ?ar fibra:graph ?authorityEndpoints_source_graph }
  } UNION {
    ?id fibra:archiveEndpoint ?archiveEndpoints
  } UNION {
    ?id fibra:archiveEndpointReference ?ar .
    ?ar rdf:value ?archiveEndpoints .
    ?ar void:sparqlEndpoint ?archiveEndpoints_source_sparqlEndpoint .
    OPTIONAL { ?ar fibra:graph ?archiveEndpoints_source_graph }
  } UNION {
    ?id dcterms:description ?descriptions
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

  public static projectQuery: string = `PREFIX fibra: <http://hdlab.stanford.edu/fibra/ontology#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX dcterms: <http://purl.org/dc/terms/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX void: <http://rdfs.org/ns/void#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
SELECT ?labels ?descriptions ?url ?dateCreated ?rightsHolders ?rightsHolders_labels ?rightsHolders_descriptions ?rightsHolder_surl ?rightsHolders_order ?instanceNS ?schemaNS ?endpoint ?graphStoreEndpoint ?updateEndpoint ?graph ?autocompletionQuery ?treeQuery ?itemQuery ?deleteItemQuery ?authorityEndpoints ?authorityEndpoints_source_graph ?authorityEndpoints_source_sparqlEndpoint ?archiveEndpoints ?archiveEndpoints_source_graph ?archiveEndpoints_source_sparqlEndpoint ?schemas ?schemas_source_graph ?schemas_source_sparqlEndpoint {
# STARTGRAPH
  {
    <ID> skos:prefLabel ?labels
  } UNION {
    <ID> fibra:instanceNS ?instanceNS .
    <ID> fibra:schemaNS ?schemaNS .
    <ID> void:sparqlEndpoint ?endpoint .
    <ID> fibra:updateEndpoint ?updateEndpoint .
    <ID> fibra:graphStoreEndpoint ?graphStoreEndpoint .
    <ID> fibra:autocompletionQuery ?autocompletionQuery .
    <ID> fibra:treeQuery ?treeQuery .
    <ID> fibra:itemQuery ?itemQuery .
    <ID> fibra:deleteItemQuery ?deleteItemQuery .
    OPTIONAL { <ID> fibra:graph ?graph }
    OPTIONAL { <ID> foaf:homepage ?url }
    OPTIONAL { <ID> dcterms:created ?dateCreated }
  } UNION {
    <ID> fibra:schema ?schemas
  } UNION {
    <ID> fibra:schemaReference ?ar .
    ?ar rdf:value ?schemas .
    ?ar void:sparqlEndpoint ?schemas_source_sparqlEndpoint .
    OPTIONAL { ?ar fibra:graph ?schemas_source_graph }
  } UNION {
    <ID> fibra:authorityEndpoint ?authorityEndpoints
  } UNION {
    <ID> fibra:authorityEndpointReference ?ar .
    ?ar rdf:value ?authorityEndpoints .
    ?ar void:sparqlEndpoint ?authorityEndpoints_source_sparqlEndpoint .
    OPTIONAL { ?ar fibra:graph ?authorityEndpoints_source_graph }
  } UNION {
    <ID> fibra:archiveEndpoint ?archiveEndpoints
  } UNION {
    <ID> fibra:archiveEndpointReference ?ar .
    ?ar rdf:value ?archiveEndpoints .
    ?ar void:sparqlEndpoint ?archiveEndpoints_source_sparqlEndpoint .
    OPTIONAL { ?ar fibra:graph ?archiveEndpoints_source_graph }
  } UNION {
    <ID> dcterms:description ?descriptions
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
  public instanceNS: string = 'http://ldf.fi/fibra/'
  public schemaNS: string = 'http://ldf.fi/fibra/schema#'
  public dataModel: DataModel = new DataModel()
  public autocompletionQuery: string = SparqlAutocompleteService.defaultMatchQuery
  // TODO: remove
  public treeQuery: string = SparqlTreeService.getClassTreeQuery
  public itemQuery: string = SparqlItemService.getLocalItemPropertiesQuery
  public deleteItemQuery: string = SparqlItemService.deleteItemQuery
  public classQuery: string = DataModel.classQuery
  public propertyQuery: string = DataModel.propertyQuery
  public endpoint: string
  public graphStoreEndpoint: string
  public updateEndpoint: string
  public graph: string
  public authorityEndpoints: RemoteEndpointConfiguration[] = []
  public archiveEndpoints: RemoteEndpointConfiguration[] = []
  public schemas: Schema[] = []
  public remoteEndpoints(): RemoteEndpointConfiguration[] {
    return this.archiveEndpoints.concat(this.authorityEndpoints)
  }
  public asTemplate(): PrimaryEndpointConfiguration {
    let p: PrimaryEndpointConfiguration = new PrimaryEndpointConfiguration()
    p.autocompletionQuery = this.autocompletionQuery
    p.itemQuery = this.itemQuery
    p.deleteItemQuery = this.deleteItemQuery
    p.treeQuery = this.treeQuery
    p.propertyQuery = this.propertyQuery
    p.classQuery = this.classQuery
    return p
  }
  public toTurtle(fragmentsById: d3.Map<string>, prefixes: {[id: string]: string}): void {
    if (!fragmentsById.has(this.id)) {
      prefixes['fibra'] = FIBRA.ns
      prefixes['void'] = VOID.ns
      fragmentsById.set(this.id, `<${this.id}> a fibra:Project ;`)
      super.toTurtle(fragmentsById, prefixes)
      let f: string = fragmentsById.get(this.id)
      if (this.schemas.length > 0) {
        f = f + `
fibra:schema `
        this.schemas.forEach(ae => {
          f = f + `<${ae.id}>, `
        })
        f = f.substring(0, f.length - 2) + ' ;'
        this.schemas
          .filter(ae => ae.source.sparqlEndpoint !== this.source.sparqlEndpoint || this.source.graph !== ae.source.graph)
          .forEach(ae => {
            f = f + `
fibra:schemaReference [
  rdf:value <${ae.id}> ;
  void:sparqlEndpoint <${ae.source.sparqlEndpoint}> ;`
            if (ae.source.graph) f = f + `
  fibra:graph <${ae.source.graph}>`
            f = f + `
] ;`
        })
      }
      if (this.authorityEndpoints.length > 0) {
        f = f + `
fibra:authorityEndpoint `
        this.authorityEndpoints.forEach(ae => {
          f = f + `<${ae.id}>, `
        })
        f = f.substring(0, f.length - 2) + ' ;'
        this.authorityEndpoints
          .filter(ae => ae.source.sparqlEndpoint !== this.source.sparqlEndpoint || this.source.graph !== ae.source.graph)
          .forEach(ae => {
            f = f + `
fibra:authorityEndpointReference [
  rdf:value <${ae.id}> ;
  void:sparqlEndpoint <${ae.source.sparqlEndpoint}> ;`
            if (ae.source.graph) f = f + `
  fibra:graph <${ae.source.graph}>`
            f = f + `
] ;`
        })
      }
      if (this.archiveEndpoints.length > 0) {
        f = f + `
fibra:archiveEndpoint `
        this.archiveEndpoints.forEach(ae => {
          f = f + `<${ae.id}>, `
        })
        f = f.substring(0, f.length - 2) + ' ;'
        this.archiveEndpoints
          .filter(ae => ae.source.sparqlEndpoint !== this.source.sparqlEndpoint || this.source.graph !== ae.source.graph)
          .forEach(ae => {
            f = f + `
fibra:archiveEndpointReference [
  rdf:value <${ae.id}> ;
  void:sparqlEndpoint <${ae.source.sparqlEndpoint}> ;`
            if (ae.source.graph) f = f + `
  fibra:graph <${ae.source.graph}>`
            f = f + `
] ;`
        })
      }
      if (this.graph) f = f + `
fibra:graph <${this.graph}> ;`
      f = f + `
fibra:autocompletionQuery ${SparqlService.stringToSPARQLString(this.autocompletionQuery)} ;
fibra:treeQuery ${SparqlService.stringToSPARQLString(this.treeQuery)} ;
fibra:itemQuery ${SparqlService.stringToSPARQLString(this.itemQuery)} ;
fibra:deleteItemQuery ${SparqlService.stringToSPARQLString(this.deleteItemQuery)} ;
fibra:classQuery ${SparqlService.stringToSPARQLString(this.classQuery)} ;
fibra:propertyQuery ${SparqlService.stringToSPARQLString(this.propertyQuery)} ;
void:sparqlEndpoint <${this.endpoint}> ;
fibra:updateEndpoint <${this.updateEndpoint}> ;
fibra:graphStoreEndpoint <${this.graphStoreEndpoint}> ;
fibra:schemaNS ${SparqlService.stringToSPARQLString(this.schemaNS)} ;
fibra:instanceNS ${SparqlService.stringToSPARQLString(this.instanceNS)} .`
      fragmentsById.set(this.id, f)
    }
  }
}