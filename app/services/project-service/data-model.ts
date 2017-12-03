'use strict'

import {ILiteral} from '../../models/rdfjs'
import {INode} from '../../models/rdf'
import {IRichNode, FullRichNodeFromNode} from '../../models/richnode'
import {StringSet, FMap, IMap} from '../../components/collection-utils'

export class Class extends FullRichNodeFromNode {
  public superClasses: Class[] = []
  public subClasses: Class[] = []
  public properties: Property[] = []
  public inverseProperties: Property[] = []
  constructor(id: INode) { super(id) }
  public clone(classMap: {[id: string]: Class}, propertyMap: {[id: string]: Property}): Class {
    if (classMap[this.value]) return classMap[this.value]
    let clone: Class = new Class(this)
    clone.labels = this.labels
    clone.descriptions = this.descriptions
    clone.types = this.types
    clone.sourceEndpoints = this.sourceEndpoints
    clone.superClasses = this.superClasses.map(c => c.clone(classMap, propertyMap))
    clone.subClasses = this.subClasses.map(c => c.clone(classMap, propertyMap))
    clone.properties = this.properties.map(p => p.clone(classMap, propertyMap))
    clone.inverseProperties = this.inverseProperties.map(p => p.clone(classMap, propertyMap))
    return clone
  }
}

export class Property extends FullRichNodeFromNode {
  public domains: Class[] = []
  public ranges: Class[] = []
  public superProperties: Property[] = []
  public subProperties: Property[] = []
  public inverseProperty?: Property
  constructor(id: INode) { super(id) }
  public clone(classMap: {[id: string]: Class}, propertyMap: {[id: string]: Property}): Property {
    if (classMap[this.value]) return propertyMap[this.value]
    let clone: Property = new Property(this)
    clone.labels = this.labels
    clone.descriptions = this.descriptions
    clone.types = this.types
    clone.sourceEndpoints = this.sourceEndpoints
    clone.domains = this.domains.map(d => d.clone(classMap, propertyMap))
    clone.ranges = this.ranges.map(r => r.clone(classMap, propertyMap))
    clone.superProperties = this.superProperties.map(p => p.clone(classMap, propertyMap))
    clone.subProperties = this.subProperties.map(p => p.clone(classMap, propertyMap))
    clone.inverseProperty = this.inverseProperty ? this.inverseProperty.clone(classMap, propertyMap) : undefined
  }
}

export class DataModel {
  public static propertyQuery: string = `PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX sf: <http://ldf.fi/functions#>
PREFIX dcterms: <http://purl.org/dc/terms/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
SELECT ?id ?domains ?ranges ?labels ?descriptions ?types ?inverseProperty ?superProperties ?subProperties {
# STARTGRAPH
  {
    ?types rdfs:subClassOf* rdf:Property .
    ?id a ?types .
  }
    {
    ?id skos:prefLabel|rdfs:label ?labels .
  } UNION {
    ?id rdfs:comment|dcterms:description ?descriptions .
  } UNION {
    ?id owl:inverseOf ?inverseProperty .
  } UNION {
    ?id rdfs:domain ?domains .
  } UNION {
    ?id rdfs:range ?ranges .
  } UNION {
    ?id rdfs:subPropertyOf ?superProperties .
  } UNION {
    ?subProperties rdfs:subPropertyOf ?id .
  }
# ENDGRAPH
}`
  public static classQuery: string = `PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX sf: <http://ldf.fi/functions#>
PREFIX dcterms: <http://purl.org/dc/terms/>
SELECT ?id ?types ?labels ?descriptions ?superClasses ?subClasses {
# STARTGRAPH
  {
    ?types rdfs:subClassOf* rdfs:Class .
    ?id a ?types .
  }
  {
    ?id skos:prefLabel|rdfs:label ?labels .
  } UNION {
    ?id rdfs:comment|dcterms:description ?descriptions .
  } UNION {
    ?id rdfs:subClassOf ?superClasses .
  } UNION {
    ?subClasses rdfs:subClassOf ?id .
  }
# ENDGRAPH
}`
  public classMap: IMap<Class> = new FMap<Class>()
  public propertyMap: IMap<Property> = new FMap<Property>()
  public rootClasses: Class[] = []
  public rootProperties: Property[] = []
  public static getFilter(types: INode[]): string {
    if (types.length === 0)
      return ''
    else
      return 'FILTER (?groupId IN (' + types.map(id => id.toCanonical()).join(', ') + '))'
  }
  public clone(): DataModel {
    let clone: DataModel = new DataModel()
    let classMap: {[id: string]: Class} = {}
    let propertyMap: {[id: string]: Property} = {}
    clone.classMap = this.classMap.mapValues(c => c.clone(classMap, propertyMap))
    clone.propertyMap = this.propertyMap.mapValues(c => c.clone(classMap, propertyMap))
    clone.rootClasses = this.rootClasses.map(c => c.clone(classMap, propertyMap))
    clone.rootProperties = this.rootProperties.map(p => p.clone(classMap, propertyMap))
    return clone
  }
}
