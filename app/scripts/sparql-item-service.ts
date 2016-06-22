namespace fibra {
  'use strict'

  import s = fi.seco.sparql

  export enum NodeType {
    Literal,
    IRI,
    BlankNode
  }

  export interface INode {
    id: string
    value: string
    type: NodeType
    lang?: string
    datatype?: string
  }

  export class SparqlBindingNode implements INode {
    public id: string
    public value: string
    public type: NodeType
    public lang: string
    public datatype: string
    constructor(binding: s.ISparqlBinding) {
      this.id = s.SparqlService.bindingToString(binding)
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

  export class Node implements INode {
    public type: NodeType
    public value: string
    public lang: string
    public datatype: string
    constructor(public id: string) {
      if (id.indexOf('<') === 0) {
        this.type = NodeType.IRI
        this.value = id.substring(1, id.length - 1)
      } else if (id.indexOf('_:') === 0) {
        this.type = NodeType.BlankNode
        this.value = id.substring(2)
      } else if (id.indexOf('"') === 0) {
        this.type = NodeType.Literal
        this.value = id.substring(1, id.lastIndexOf('"'))
        if (id.lastIndexOf('@') === id.lastIndexOf('"') + 1)
          this.lang = id.substring(id.lastIndexOf('@'))
        else if (id.lastIndexOf('^^<') === id.lastIndexOf('"') + 1)
          this.datatype = id.substring(id.lastIndexOf('^^<'), id.length - 1)
      } else {
        throw 'Number datatypes not done yet'
      }
    }
  }

  export class IRI implements INode {
    public type: NodeType = NodeType.IRI
    public id: string
    constructor(public value: string) {
      this.id = '<' + value + '>'
    }
  }

  export class BlankNode implements INode {
    public type: NodeType = NodeType.BlankNode
    public id: string
    constructor(public value: string) {
      this.id = '_:' + value
    }
  }

  export class Literal implements INode {
    public type: NodeType = NodeType.Literal
    public id: string
    constructor(public value: string, public lang?: string, public datatype?: string) {
      if (datatype) switch (datatype) {
        case 'http://www.w3.org/2001/XMLSchema#integer':
        case 'http://www.w3.org/2001/XMLSchema#decimal':
        case 'http://www.w3.org/2001/XMLSchema#double':
        case 'http://www.w3.org/2001/XMLSchema#boolean': this.id = value; break
        case 'http://www.w3.org/2001/XMLSchema#string': this.id = '"' + value + '"'; break
        default: this.id = '"' + value + '"^^<' + datatype + '>'; break
      }
      else if (lang) this.id = '"' + value + '"@' + lang
      else this.id = '"' + value + '"'
    }
  }

  export class NodePlusLabel implements INode {
    get id(): string { return this.node.id }
    get value(): string { return this.node.value }
    get type(): NodeType { return this.node.type }
    constructor(public node: INode, public label?: string) {}
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
    constructor(private workerService: WorkerService) {}
    public getItem(endpoint: string, iri: string, canceller?: angular.IPromise<any>): angular.IPromise<Item> {
      return this.workerService.call('sparqlItemWorkerService', 'getItem', [endpoint, iri], canceller)
    }
  }

  export class SparqlItemWorkerService {

    constructor(private sparqlService: s.SparqlService) {}

    public getItem(endpoint: string, id: string, canceller?: angular.IPromise<any>): angular.IPromise<Item> {
      return this.sparqlService.query(endpoint, SparqlItemService.getItemPropertiesQuery.replace(/<ID>/g, id), {timeout: canceller}).then(
        (response: angular.IHttpPromiseCallbackArg<s.ISparqlBindingResult<{[id: string]: s.ISparqlBinding}>>) => {
          let item: Item = new Item(new Node(id))
          let propertyMap: {[property: string]: PropertyToValues} = {}
          response.data.results.bindings.forEach(b => {
            if (b['itemLabel']) item.label = b['itemLabel'].value
            if (b['property']) {
              let propertyToValues: PropertyToValues = propertyMap[b['property'].value]
              if (!propertyToValues) {
                propertyToValues = new PropertyToValues(b['property'])
                propertyMap[b['property'].value] = propertyToValues
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
