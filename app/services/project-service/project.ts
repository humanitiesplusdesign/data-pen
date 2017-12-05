'use strict'

import {Citable} from 'models/citable'
import {DataModel} from 'services/project-service/data-model'
import {SparqlService} from 'angular-sparql-service'
import {SparqlAutocompleteService} from 'services/sparql-autocomplete-service'
import {SparqlItemService} from 'services/sparql-item-service'
import {RemoteEndpointConfiguration} from 'services/project-service/remote-endpoint-configuration'
import {PrimaryEndpointConfiguration} from 'services/project-service/primary-endpoint-configuration'
import {Schema} from 'services/project-service/schema'
import {FIBRA, VOID} from 'models/rdf'
import { SparqlStatisticsService } from 'services/sparql-statistics-service';
import { TurtleBuilder } from 'components/misc-utils';

export class Project extends Citable {

  public static listProjectsQuery: string = `PREFIX fibra: <http://hdlab.stanford.edu/fibra/ontology#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX dcterms: <http://purl.org/dc/terms/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX void: <http://rdfs.org/ns/void#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
SELECT * {
# STARTGRAPH
# VALUE
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
    ?id fibra:classStatisticsQuery ?classStatisticsQuery .
    OPTIONAL { ?id fibra:propertyStatisticsQuery ?propertyStatisticsQuery }
    ?id fibra:itemQuery ?itemQuery .
    ?id fibra:deleteItemQuery ?deleteItemQuery .
    OPTIONAL { ?id fibra:graph ?graph }
    OPTIONAL { ?id dcterms:created ?dateCreated }
    OPTIONAL { ?id foaf:homepage ?url }
    OPTIONAL { ?id fibra:coalesceIdsQuery ?coalesceIdsQuery }
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

  public instanceNS: string = 'http://ldf.fi/fibra/'
  public schemaNS: string = 'http://ldf.fi/fibra/schema#'
  public dataModel: DataModel = new DataModel()
  public autocompletionQuery: string = SparqlAutocompleteService.defaultMatchQuery
  public classStatisticsQuery: string = SparqlStatisticsService.getClassStatisticsQuery
  public propertyStatisticsQuery: string = SparqlStatisticsService.getPropertyStatisticsQuery
  public itemQuery: string = SparqlItemService.getItemPropertiesQuery
  public coalesceIdsQuery: string = SparqlItemService.coalesceIdsQuery
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
    p.classStatisticsQuery = this.classStatisticsQuery
    p.propertyStatisticsQuery = this.propertyStatisticsQuery
    p.coalesceIdsQuery = this.coalesceIdsQuery
    p.propertyQuery = this.propertyQuery
    p.classQuery = this.classQuery
    return p
  }
  public clone(): Project {
    let clone: Project = new Project()
    this.copyCitableTo(clone)
    clone.instanceNS = this.instanceNS
    clone.schemaNS = this.schemaNS
    clone.dataModel = this.dataModel.clone()
    clone.autocompletionQuery = this.autocompletionQuery
    clone.classStatisticsQuery = this.classStatisticsQuery
    clone.propertyStatisticsQuery = this.propertyStatisticsQuery
    clone.itemQuery = this.itemQuery
    clone.coalesceIdsQuery = this.coalesceIdsQuery
    clone.deleteItemQuery = this.deleteItemQuery
    clone.classQuery = this.classStatisticsQuery
    clone.propertyQuery = this.propertyQuery
    clone.endpoint = this.endpoint
    clone.graphStoreEndpoint = this.graphStoreEndpoint
    clone.updateEndpoint = this.updateEndpoint
    clone.graph = this.graph
    clone.authorityEndpoints = this.authorityEndpoints.map(re => re.clone())
    clone.archiveEndpoints = this.archiveEndpoints.map(re => re.clone())
    clone.schemas = this.schemas.map(sch => sch.clone())
    return clone
  }
  public toTurtle(tb: TurtleBuilder): void {
    if (!tb.fragmentsById.has(this.id)) {
      tb.prefixes['fibra'] = FIBRA.ns
      tb.prefixes['void'] = VOID.ns
      tb.fragmentsById.set(this.id, `<${this.id}> a fibra:Project ;`)
      super.toTurtle(tb)
      let f: string = tb.fragmentsById.get(this.id)
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
fibra:classStatisticsQuery ${SparqlService.stringToSPARQLString(this.classStatisticsQuery)} ;
fibra:propertyStatisticsQuery ${SparqlService.stringToSPARQLString(this.propertyStatisticsQuery)} ;
fibra:itemQuery ${SparqlService.stringToSPARQLString(this.itemQuery)} ;
fibra:coalesceIdsQuery ${SparqlService.stringToSPARQLString(this.coalesceIdsQuery)} ;
fibra:deleteItemQuery ${SparqlService.stringToSPARQLString(this.deleteItemQuery)} ;
fibra:classQuery ${SparqlService.stringToSPARQLString(this.classQuery)} ;
fibra:propertyQuery ${SparqlService.stringToSPARQLString(this.propertyQuery)} ;
void:sparqlEndpoint <${this.endpoint}> ;
fibra:updateEndpoint <${this.updateEndpoint}> ;
fibra:graphStoreEndpoint <${this.graphStoreEndpoint}> ;
fibra:schemaNS ${SparqlService.stringToSPARQLString(this.schemaNS)} ;
fibra:instanceNS ${SparqlService.stringToSPARQLString(this.instanceNS)} .`
      tb.fragmentsById.set(this.id, f)
    }
  }
}
