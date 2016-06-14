namespace fibra {
  'use strict'

  import s = fi.seco.sparql

  export enum NodeType {
    Literal,
    IRI,
    BlankNode
  }

  export interface INode {
    value: string
    type: NodeType
    lang?: string
    datatype?: string
  }

  export class SparqlBindingNode implements INode {
    public value: string
    public type: NodeType
    public lang: string
    public datatype: string
    constructor(binding: s.ISparqlBinding) {
      this.value = binding.value
      switch (binding.type) {
        case 'literal':
          this.type = NodeType.Literal
          this.lang = binding['xml:lang']
          this.datatype = binding.datatype
          break
        case 'uri':
          this.type = NodeType.IRI
          break
        case 'bnode':
          this.type = NodeType.BlankNode
          break
        default: throw 'Unknown binding type ' + binding.type + ' for ' + binding
      }
    }
  }

  export class IRI implements INode {
    public type: NodeType = NodeType.IRI
    constructor(public value: string) {}
  }

  export class BlankNode implements INode {
    public type: NodeType = NodeType.BlankNode
    constructor(public value: string) {}
  }

  export class Literal implements INode {
    public type: NodeType = NodeType.Literal
    constructor(public value: string, public lang?: string, public datatype?: string) {}
  }

  export class NodePlusLabel {
    public label: string
    constructor(public node: INode, label?: string) {
      this.label = label
    }
  }

  export class PropertyToValues extends NodePlusLabel {
    public values: NodePlusLabel[] = []
    constructor(property: s.ISparqlBinding) {
      super(new SparqlBindingNode(property))
    }
  }

  export class Item {
    public properties: PropertyToValues[] = []
    public inverseProperties: PropertyToValues[] = []
    public label: string
    constructor(public node: INode) {}
  }

  export class SparqlItemService {
    public static getItemPropertiesQuery: string = `
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX sf: <http://ldf.fi/functions#>
SELECT ?itemLabel ?property ?propertyLabel ?object ?objectLabel {
  <ID> sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?itemLabel) .
  <ID> ?property ?object .
  OPTIONAL {
    ?property sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?propertyLabelP)
  }
  BIND(COALESCE(?propertyLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?property),".*/",""),".*#",""),"_"," "),"([A-ZÅÄÖ])"," $1")) AS ?propertyLabel)
  OPTIONAL {
    ?object sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?objectLabelP) .
  }
  BIND (IF(ISIRI(?object),COALESCE(?objectLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?object),".*/",""),".*#",""),"_"," "),"([A-ZÅÄÖ])"," $1")),?object) AS ?objectLabel)
}
`
    constructor(private sparqlService: s.SparqlService) {}

    public getItem(endpoint: string, iri: string, canceller?: angular.IPromise<any>): angular.IPromise<Item> {
      return this.sparqlService.query(endpoint, SparqlItemService.getItemPropertiesQuery.replace(/<ID>/g, '<' + iri + '>'), {timeout: canceller}).then(
        (response: angular.IHttpPromiseCallbackArg<s.ISparqlBindingResult<{[id: string]: s.ISparqlBinding}>>) => {
          let item: Item = new Item(new IRI(iri))
          let propertyMap: {[property: string]: PropertyToValues} = {}
          response.data.results.bindings.forEach(b => {
            if (b['itemLabel']) item.label = b['itemLabel'].value
            if (b['property']) {
              let propertyToValues: PropertyToValues = propertyMap[b['property'].value]
              if (!propertyToValues) {
                propertyToValues = new PropertyToValues(b['property'])
                if (b['propertyLabel']) propertyToValues.label = b['propertyLabel'].value
                item.properties.push(propertyToValues)
              }
              let oNode: NodePlusLabel = new NodePlusLabel(new SparqlBindingNode(b['object']))
              if (b['objectLabel']) oNode.label = b['objectLabel'].value
              propertyToValues.values.push(oNode)
            }
          })
          return item
        }
      )
    }

  }

}
