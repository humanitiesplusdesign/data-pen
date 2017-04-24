'use strict'

import {ILiteral} from '../../models/rdfjs'
import {INode} from '../../models/rdf'
import {IRichNode, FullRichNodeFromNode} from '../../models/richnode'
import {StringSet, Map} from '../../components/collection-utils'

class AsNodes {
  public labels: ILiteral[] = []
  public descriptions: ILiteral[] = []
  public types: Class[] = []
  public asNodes: {[lang: string]: IRichNode}
  public asNode(prefLang: string): IRichNode {
    let ret: IRichNode = this.asNodes[prefLang]
    if (ret) return ret
    ret = this.asNodes['']
    if (ret) return ret
    for (let lang in this.asNodes) return this.asNodes[lang]
    return undefined
  }
  public buildAsNodes(): void {
    if (!this.asNodes) {
      this.asNodes = {}
      let langs: StringSet = new StringSet()
      let llMap: Map<string> = new Map<string>()
      let ldMap: Map<string> = new Map<string>()
      let tlMap: Map<Map<string>> = new Map<Map<string>>()
      this.labels.forEach(l => {
        llMap.set(l.language, l.value)
        if (!llMap.has('')) llMap.set('', l.value)
        langs.add(l.language)
      })
      this.descriptions.forEach(d => {
        ldMap.set(d.language, d.value)
        if (!ldMap.has('')) ldMap.set('', d.value)
        langs.add(d.language)
      })
      this.types.forEach(t => {
        t.buildAsNodes()
        let tlMap2: Map<string> = new Map<string>()
        tlMap.set(t.id.value, tlMap2)
        t.labels.forEach(tl => {
          tlMap2.set(tl.language, tl.value)
          if (!tlMap2.has('')) tlMap2.set('', tl.value)
          langs.add(tl.language)
        })
      })
      langs.each(l => {
        let rn: IRichNode = new FullRichNodeFromNode(this.id)
        rn.label = llMap.get(l)
        if (!rn.label) rn.label = llMap.get('')
        rn.description = ldMap.get(l)
        if (!rn.description) rn.description = ldMap.get('')
        rn.types = this.types.map(tc => tc.id === this.id ? rn : tc.asNode(l))
        this.asNodes[l] = rn
      })
    }
  }
  constructor(public id: INode) { }
}

export class Class extends AsNodes {
  public superClasses: Class[] = []
  public subClasses: Class[] = []
  public properties: Property[] = []
  public inverseProperties: Property[] = []
  constructor(id: INode) { super(id) }
}

export class Property extends AsNodes {
  public domains: Class[] = []
  public ranges: Class[] = []
  public superProperties: Property[] = []
  public subProperties: Property[] = []
  public inverseProperty?: Property
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
  public classMap: d3.Map<Class> = new Map<Class>()
  public propertyMap: d3.Map<Property> = new Map<Property>()
  public rootClasses: Class[] = []
  public rootProperties: Property[] = []
  public static getFilter(types: INode[]): string {
    if (types.length === 0)
      return ''
    else
      return 'FILTER (?groupId IN (' + types.map(id => id.toCanonical()).join(', ') + '))'
  }
}
