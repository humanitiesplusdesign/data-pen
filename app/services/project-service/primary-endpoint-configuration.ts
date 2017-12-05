'use strict'

import {Citable} from '../../models/citable'
import {SparqlAutocompleteService} from '../sparql-autocomplete-service'
import {SparqlItemService} from '../sparql-item-service'
import {DataModel} from './data-model'
import {FIBRA} from '../../models/rdf'
import {Project} from '../project-service/project'
import {SparqlService} from 'angular-sparql-service'
import { SparqlStatisticsService } from 'services/sparql-statistics-service';
import { TurtleBuilder } from 'components/misc-utils';

export class PrimaryEndpointConfiguration extends Citable {
  public static listPrimaryEndpointConfigurationsQuery: string = `PREFIX fibra: <http://hdlab.stanford.edu/fibra/ontology#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX dcterms: <http://purl.org/dc/terms/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
SELECT * {
# STARTGRAPH
  # VALUE
  ?id a fibra:PrimaryEndpointConfiguration .
  { ?id skos:prefLabel ?labels }
  UNION
  { ?id dcterms:description ?descriptions }
  UNION
  { ?id fibra:compatibleEndpoint ?compatibleEndpoints }
  UNION
  { ?d fibra:coalesceIdsQuery ?coalesceIdsQuery }
  UNION
  {
    ?id fibra:autocompletionQuery ?autocompletionQuery .
    ?id fibra:itemQuery ?itemQuery .
    ?id fibra:deleteItemQuery ?deleteItemQuery .
    ?id fibra:classStatisticsQuery ?classStatisticsQuery .
    OPTIONAL { ?id fibra:propertyStatisticsQuery ?propertyStatisticsQuery }
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
  public compatibleEndpoints: string[] = []
  public autocompletionQuery: string = SparqlAutocompleteService.defaultMatchQuery
  public itemQuery: string = SparqlItemService.getItemPropertiesQuery
  public coalesceIdsQuery: string = SparqlItemService.coalesceIdsQuery
  public deleteItemQuery: string = SparqlItemService.deleteItemQuery
  public classStatisticsQuery: string = SparqlStatisticsService.getClassStatisticsQuery
  public propertyStatisticsQuery: string = SparqlStatisticsService.getPropertyStatisticsQuery
  public classQuery: string = DataModel.classQuery
  public propertyQuery: string = DataModel.propertyQuery
  public clone(): PrimaryEndpointConfiguration {
    let clone: PrimaryEndpointConfiguration = new PrimaryEndpointConfiguration()
    this.copyCitableTo(clone)
    clone.compatibleEndpoints = this.compatibleEndpoints.slice(0)
    clone.autocompletionQuery = this.autocompletionQuery
    clone.itemQuery = this.itemQuery
    clone.coalesceIdsQuery = this.coalesceIdsQuery
    clone.deleteItemQuery = this.deleteItemQuery
    clone.classStatisticsQuery = this.classStatisticsQuery
    clone.propertyStatisticsQuery = this.propertyStatisticsQuery
    clone.classQuery = this.classQuery
    clone.propertyQuery = this.propertyQuery
    return clone
  }
  public toTurtle(tb: TurtleBuilder): void {
    if (!tb.fragmentsById.has(this.id)) {
      tb.prefixes['fibra'] = FIBRA.ns
      tb.fragmentsById.set(this.id, `<${this.id}> a fibra:PrimaryEndpointConfiguration ;`)
      super.toTurtle(tb)
      let f: string = tb.fragmentsById.get(this.id)
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
fibra:propertyStatisticsQuery ${SparqlService.stringToSPARQLString(this.propertyStatisticsQuery)} ;
fibra:propertyQuery ${SparqlService.stringToSPARQLString(this.propertyQuery)} ;
fibra:classQuery ${SparqlService.stringToSPARQLString(this.classQuery)} ;
fibra:itemQuery ${SparqlService.stringToSPARQLString(this.itemQuery)} ;
fibra:coalesceIdsQuery ${SparqlService.stringToSPARQLString(this.coalesceIdsQuery)} ;
fibra:deleteItemQuery ${SparqlService.stringToSPARQLString(this.deleteItemQuery)} .`
      tb.fragmentsById.set(this.id, f)
    }
  }
  public copyToProject(p: Project): void {
    let aq: string = this.autocompletionQuery
    aq = p.graph ? aq.replace(/# STARTGRAPH/g, 'GRAPH <' + p.graph + '> {').replace(/# ENDGRAPH/g, '}') : aq.replace(/.*# STARTGRAPH\n/g, '').replace(/.*# ENDGRAPH\n/g, '')
    p.autocompletionQuery = aq
    aq = this.itemQuery
    aq = p.graph ? aq.replace(/# STARTGRAPH/g, 'GRAPH <' + p.graph + '> {').replace(/# ENDGRAPH/g, '}') : aq.replace(/.*# STARTGRAPH\n/g, '').replace(/.*# ENDGRAPH\n/g, '')
    p.itemQuery = aq
    aq = this.coalesceIdsQuery
    aq = p.graph ? aq.replace(/# STARTGRAPH/g, 'GRAPH <' + p.graph + '> {').replace(/# ENDGRAPH/g, '}') : aq.replace(/.*# STARTGRAPH\n/g, '').replace(/.*# ENDGRAPH\n/g, '')
    p.coalesceIdsQuery = aq
    aq = this.deleteItemQuery
    aq = p.graph ? aq.replace(/# STARTGRAPH/g, 'GRAPH <' + p.graph + '> {').replace(/# ENDGRAPH/g, '}') : aq.replace(/.*# STARTGRAPH\n/g, '').replace(/.*# ENDGRAPH\n/g, '')
    p.deleteItemQuery = aq
    aq = this.classStatisticsQuery
    aq = p.graph ? aq.replace(/# STARTGRAPH/g, 'GRAPH <' + p.graph + '> {').replace(/# ENDGRAPH/g, '}') : aq.replace(/.*# STARTGRAPH\n/g, '').replace(/.*# ENDGRAPH\n/g, '')
    p.classStatisticsQuery = aq
    aq = this.propertyStatisticsQuery
    aq = p.graph ? aq.replace(/# STARTGRAPH/g, 'GRAPH <' + p.graph + '> {').replace(/# ENDGRAPH/g, '}') : aq.replace(/.*# STARTGRAPH\n/g, '').replace(/.*# ENDGRAPH\n/g, '')
    p.propertyStatisticsQuery = aq
    aq = this.propertyQuery
    aq = p.graph ? aq.replace(/# STARTGRAPH/g, 'GRAPH <' + p.graph + '> {').replace(/# ENDGRAPH/g, '}') : aq.replace(/.*# STARTGRAPH\n/g, '').replace(/.*# ENDGRAPH\n/g, '')
    p.propertyQuery = aq
    aq = this.classQuery
    aq = p.graph ? aq.replace(/# STARTGRAPH/g, 'GRAPH <' + p.graph + '> {').replace(/# ENDGRAPH/g, '}') : aq.replace(/.*# STARTGRAPH\n/g, '').replace(/.*# ENDGRAPH\n/g, '')
    p.classQuery = aq
  }
}
