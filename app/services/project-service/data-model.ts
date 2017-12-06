'use strict'

import {ILiteral} from '../../models/rdfjs'
import { INode, ONodeSet } from '../../models/rdf';
import {IRichNode, FullRichNodeFromNode} from '../../models/richnode'
import {StringSet, FMap, IMap} from '../../components/collection-utils'

export interface IClass extends IRichNode {
  superClasses: ONodeSet<IClass>
  subClasses: ONodeSet<IClass>
  properties: ONodeSet<IProperty>
  inverseProperties: ONodeSet<IProperty>
}

export class Class extends FullRichNodeFromNode implements IClass {
  public superClasses: ONodeSet<IClass> = new ONodeSet<IClass>()
  public subClasses: ONodeSet<IClass> = new ONodeSet<IClass>()
  public properties: ONodeSet<IProperty> = new ONodeSet<IProperty>()
  public inverseProperties: ONodeSet<IProperty> = new ONodeSet<IProperty>()
  constructor(id: INode) { super(id) }
}

export interface IProperty extends IRichNode {
  domains?: ONodeSet<IClass>
  ranges?: ONodeSet<IClass>
  superProperties?: ONodeSet<IProperty>
  subProperties?: ONodeSet<IProperty>
  inverseProperty?: IProperty
}

export class Property extends FullRichNodeFromNode implements IProperty {
  public domains: ONodeSet<IClass> = new ONodeSet<IClass>()
  public ranges: ONodeSet<IClass> = new ONodeSet<IClass>()
  public superProperties: ONodeSet<IProperty> = new ONodeSet<IProperty>()
  public subProperties: ONodeSet<IProperty> = new ONodeSet<IProperty>()
  public inverseProperty: IProperty
  constructor(id: INode) { super(id) }
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
  public classMap: IMap<IClass> = new FMap<IClass>()
  public propertyMap: IMap<IProperty> = new FMap<IProperty>()
  public rootClasses: IClass[] = []
  public rootProperties: IProperty[] = []
  public static getFilter(types: INode[]): string {
    if (types.length === 0)
      return ''
    else
      return 'FILTER (?groupId IN (' + types.map(id => id.toCanonical()).join(', ') + '))'
  }
}
