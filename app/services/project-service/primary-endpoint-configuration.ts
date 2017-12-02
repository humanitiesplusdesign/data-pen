'use strict'

import {Citable} from '../../models/citable'
import {SparqlAutocompleteService} from '../sparql-autocomplete-service'
import {SparqlItemService} from '../sparql-item-service'
import {DataModel} from './data-model'
import {FIBRA} from '../../models/rdf'
import {Project} from '../project-service/project'
import {SparqlService} from 'angular-sparql-service'
import { SparqlStatisticsService } from 'services/sparql-statistics-service';

export class PrimaryEndpointConfiguration extends Citable {
  public static listPrimaryEndpointConfigurationsQuery: string = `PREFIX fibra: <http://hdlab.stanford.edu/fibra/ontology#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX dcterms: <http://purl.org/dc/terms/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
SELECT ?id ?labels ?descriptions ?compatibleEndpoints ?rightsHolders ?rightsHolders_labels ?rightsHolders_descriptions ?rightsHolders_url ?rightsHolders_order ?url ?autocompletionQuery ?itemQuery ?deleteItemQuery ?classStatisticsQuery ?properyQuery ?classQuery {
# STARTGRAPH
  ?id a fibra:PrimaryEndpointConfiguration .
  { ?id skos:prefLabel ?labels }
  UNION
  { ?id dcterms:description ?descriptions }
  UNION
  { ?id fibra:compatibleEndpoint ?compatibleEndpoints }
  UNION
  {
    ?id fibra:autocompletionQuery ?autocompletionQuery .
    ?id fibra:itemQuery ?itemQuery .
    ?id fibra:deleteItemQuery ?deleteItemQuery .
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
  public static primaryEndpointConfigurationQuery: string = `PREFIX fibra: <http://hdlab.stanford.edu/fibra/ontology#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX dcterms: <http://purl.org/dc/terms/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
SELECT ?labels ?descriptions ?compatibleEndpoints ?rightsHolders ?rightsHolders_labels ?rightsHolders_descriptions ?rightsHolders_url ?rightsHolders_order ?url ?autocompletionQuery ?itemQuery ?deleteItemQuery ?classStatisticsQuery ?properyQuery ?classQuery {
# STARTGRAPH
  { <ID> skos:prefLabel ?labels }
  UNION
  { <ID> dcterms:description ?descriptions }
  UNION
  { <ID> fibra:compatibleEndpoint ?compatibleEndpoints }
  UNION
  {
    <ID> fibra:autocompletionQuery ?autocompletionQuery .
    <ID> fibra:itemQuery ?itemQuery .
    <ID> fibra:deleteItemQuery ?deleteItemQuery .
    <ID> fibra:classStatisticsQuery ?classStatisticsQuery .
    <ID> fibra:propertyQuery ?propertyQuery .
    <ID> fibra:classQuery ?classQuery .
    OPTIONAL { <ID> foaf:homepage ?url }
  } UNION {
    {
      <ID> dcterms:rightsHolder ?rightsHolders
    } UNION {
      <ID> fibra:qualifiedAssertion ?qa .
      <ID> rdf:predicate dcterms:rightsHolder .
      <ID> rdf:object ?rightsHolders .
      OPTIONAL { <ID> fibra:order ?rightsHolders_order }
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
  public compatibleEndpoints: string[] = []
  public autocompletionQuery: string = SparqlAutocompleteService.defaultMatchQuery
  public itemQuery: string = SparqlItemService.getLocalItemPropertiesQuery
  public deleteItemQuery: string = SparqlItemService.deleteItemQuery
  public classStatisticsQuery: string = SparqlStatisticsService.getClassStatisticsQuery
  public classQuery: string = DataModel.classQuery
  public propertyQuery: string = DataModel.propertyQuery
  public clone(): PrimaryEndpointConfiguration {
    let clone: PrimaryEndpointConfiguration = new PrimaryEndpointConfiguration()
    this.copyCitableTo(clone)
    clone.compatibleEndpoints = this.compatibleEndpoints.slice(0)
    clone.autocompletionQuery = this.autocompletionQuery
    clone.itemQuery = this.itemQuery
    clone.deleteItemQuery = this.deleteItemQuery
    clone.classStatisticsQuery = this.classStatisticsQuery
    clone.classQuery = this.classQuery
    clone.propertyQuery = this.propertyQuery
    return clone
  }
  public toTurtle(fragmentsById: d3.Map<string>, prefixes: {[id: string]: string}): void {
    if (!fragmentsById.has(this.id)) {
      prefixes['fibra'] = FIBRA.ns
      fragmentsById.set(this.id, `<${this.id}> a fibra:PrimaryEndpointConfiguration ;`)
      super.toTurtle(fragmentsById, prefixes)
      let f: string = fragmentsById.get(this.id)
      let nece: string[] = this.compatibleEndpoints.filter(e => e)
      if (nece.length !== 0) {
        f = f + `
fibra:compatibleEndpoint `
        nece.forEach(e => f = f + `<${e}>, `)
        f = f.substring(0, f.length - 2) + ' ;'
      }
      f = f + `
fibra:autocompletionQuery ${SparqlService.stringToSPARQLString(this.autocompletionQuery)} ;
fibra:classStatisticsQuery ${SparqlService.stringToSPARQLString(this.classStatisticsQuery)} ;
fibra:propertyQuery ${SparqlService.stringToSPARQLString(this.propertyQuery)} ;
fibra:classQuery ${SparqlService.stringToSPARQLString(this.classQuery)} ;
fibra:itemQuery ${SparqlService.stringToSPARQLString(this.itemQuery)} ;
fibra:deleteItemQuery ${SparqlService.stringToSPARQLString(this.deleteItemQuery)} .`
      fragmentsById.set(this.id, f)
    }
  }
  public copyToProject(p: Project): void {
    let aq: string = this.autocompletionQuery
    aq = p.graph ? aq.replace(/# STARTGRAPH/g, 'GRAPH <' + p.graph + '> {').replace(/# ENDGRAPH/g, '}') : aq.replace(/.*# STARTGRAPH\n/g, '').replace(/.*# ENDGRAPH\n/g, '')
    p.autocompletionQuery = aq
    aq = this.itemQuery
    aq = p.graph ? aq.replace(/# STARTGRAPH/g, 'GRAPH <' + p.graph + '> {').replace(/# ENDGRAPH/g, '}') : aq.replace(/.*# STARTGRAPH\n/g, '').replace(/.*# ENDGRAPH\n/g, '')
    p.itemQuery = aq
    aq = this.deleteItemQuery
    aq = p.graph ? aq.replace(/# STARTGRAPH/g, 'GRAPH <' + p.graph + '> {').replace(/# ENDGRAPH/g, '}') : aq.replace(/.*# STARTGRAPH\n/g, '').replace(/.*# ENDGRAPH\n/g, '')
    p.deleteItemQuery = aq
    aq = this.classStatisticsQuery
    aq = p.graph ? aq.replace(/# STARTGRAPH/g, 'GRAPH <' + p.graph + '> {').replace(/# ENDGRAPH/g, '}') : aq.replace(/.*# STARTGRAPH\n/g, '').replace(/.*# ENDGRAPH\n/g, '')
    p.classStatisticsQuery = aq
    aq = this.propertyQuery
    aq = p.graph ? aq.replace(/# STARTGRAPH/g, 'GRAPH <' + p.graph + '> {').replace(/# ENDGRAPH/g, '}') : aq.replace(/.*# STARTGRAPH\n/g, '').replace(/.*# ENDGRAPH\n/g, '')
    p.propertyQuery = aq
    aq = this.classQuery
    aq = p.graph ? aq.replace(/# STARTGRAPH/g, 'GRAPH <' + p.graph + '> {').replace(/# ENDGRAPH/g, '}') : aq.replace(/.*# STARTGRAPH\n/g, '').replace(/.*# ENDGRAPH\n/g, '')
    p.classQuery = aq
  }
}
