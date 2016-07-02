namespace fibra {
  'use strict'

  import s = fi.seco.sparql

  export interface ISourcedNode extends INode {
    sourceEndpoints: string[]
  }

  export interface INodePlusLabel extends INode {
    label: INode
  }

  export class NodePlusLabel extends NodeFromNode implements INodePlusLabel {
    constructor(public node: INode, public label?: INode) {
      super(node)
    }
  }

  export interface IPropertyToValues extends INodePlusLabel {
    values: (INode|NodePlusLabel)[]
  }

  export class PropertyToValues extends NodePlusLabel {
    public values: (INode|NodePlusLabel)[] = []
    constructor(property: INode) {
      super(property)
    }
  }

  export class Item extends NodePlusLabel {
    public properties: PropertyToValues[] = []
    public inverseProperties: PropertyToValues[] = []
  }

  export class SparqlItemService {

    public static ns: string = 'http://ldf.fi/fibra/'
    public static schemaGraph: INode = new NamedNode(SparqlItemService.ns + 'schema#')
    public static instanceGraph: INode = new NamedNode(SparqlItemService.ns + 'main/')

    public static getItemPropertiesQuery: string = `
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX sf: <http://ldf.fi/functions#>
SELECT ?serviceId ?service ?itemLabel ?property ?propertyLabel ?object ?objectLabel {
  <ID> owl:sameAs* ?id .
  VALUES (?serviceId ?service) {
    (<SERVICES>)
  }
  SERVICE ?service {
    ?id sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?itemLabel) .
    ?id ?property ?object .
    OPTIONAL {
      ?property sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?propertyLabelP)
    }
    BIND(COALESCE(?propertyLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?property),".*/",""),".*#",""),"_"," "),"([A-ZÅÄÖ])"," $1")) AS ?propertyLabel)
    OPTIONAL {
      ?object sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?objectLabelP) .
    }
    BIND (IF(ISIRI(?object),COALESCE(?objectLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?object),".*/",""),".*#",""),"_"," "),"([A-ZÅÄÖ])"," $1")),?object) AS ?objectLabel)
  }
}
`

    public static getAllItemPropertiesQuery: string = `
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX sf: <http://ldf.fi/functions#>
SELECT ?id ?itemLabel ?property ?propertyLabel ?object ?objectLabel {
  ?id a ?type .
  ?id sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?itemLabel) .
  ?id ?property ?object .
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

    public static deleteItemQuery: string = `
DELETE {
  GRAPH ?g {
    <ID> ?p ?o .
    ?s ?p <ID> .
  }
}
WHERE {
  GRAPH ?g {
    { <ID> ?p ?o } UNION { ?s ?p <ID> }
  }
}
`

    private static lut: string[] = (() => {
      let lut: string[] = []
      for (let i: number = 0; i < 256; i++)
        lut[i] = (i < 16 ? '0' : '') + i.toString(16)
      return lut
    })()

    public static UUID(): string {
      /* tslint:disable:no-bitwise */
      let d0: number = Math.random() * 0xffffffff | 0
      let d1: number = Math.random() * 0xffffffff | 0
      let d2: number = Math.random() * 0xffffffff | 0
      let d3: number = Math.random() * 0xffffffff | 0
      return SparqlItemService.lut[d0 & 0xff] + SparqlItemService.lut[d0 >> 8 & 0xff] + SparqlItemService.lut[d0 >> 16 & 0xff] + SparqlItemService.lut[d0 >> 24 & 0xff] + '-' +
        SparqlItemService.lut[d1 & 0xff] + SparqlItemService.lut[d1 >> 8 & 0xff] + '-' + SparqlItemService.lut[d1 >> 16 & 0x0f | 0x40] + SparqlItemService.lut[d1 >> 24 & 0xff] + '-' +
        SparqlItemService.lut[d2 & 0x3f | 0x80] + SparqlItemService.lut[d2 >> 8 & 0xff] + '-' + SparqlItemService.lut[d2 >> 16 & 0xff] + SparqlItemService.lut[d2 >> 24 & 0xff] +
        SparqlItemService.lut[d3 & 0xff] + SparqlItemService.lut[d3 >> 8 & 0xff] + SparqlItemService.lut[d3 >> 16 & 0xff] + SparqlItemService.lut[d3 >> 24 & 0xff]
      /* tslint:enable:no-bitwise */
    }

    constructor(private workerService: WorkerService) {}

    public getItem(id: INode, canceller?: angular.IPromise<any>): angular.IPromise<Item> {
      return this.workerService.call('sparqlItemWorkerService', 'getItem', [id], canceller)
    }

    public getAllItems(canceller?: angular.IPromise<any>): angular.IPromise<Item[]> {
      return this.workerService.call('sparqlItemWorkerService', 'getAllItems', [], canceller)
    }

    public createNewItem(equivalentNodes: INode[] = [], properties: IPropertyToValues[] = []): angular.IPromise<INode> {
      return this.workerService.call('sparqlItemWorkerService', 'createNewItem', [equivalentNodes, properties])
    }

    public alterItem(id: INode, propertiesToAdd: IPropertyToValues[], propertiesToRemove: IPropertyToValues[] = []): angular.IPromise<string> {
      return this.workerService.call('sparqlItemWorkerService', 'alterItem', [id, propertiesToAdd, propertiesToRemove])
    }

    public deleteItem(id: INode): angular.IPromise<string> {
      return this.workerService.call('sparqlItemWorkerService', 'deleteItem', [id])
    }
  }

  export class SparqlItemWorkerService {

    constructor(private sparqlService: s.SparqlService, private $q: angular.IQService, private sparqlUpdateWorkerService: SparqlUpdateWorkerService, private configurationWorkerService: ConfigurationWorkerService) {}

    public getItem(id: INode, canceller?: angular.IPromise<any>): angular.IPromise<Item> {
      let queryTemplate: string = SparqlItemService.getItemPropertiesQuery
      queryTemplate = queryTemplate.replace(/<ID>/g, id.toCanonical())
      queryTemplate = queryTemplate.replace(/\(<SERVICES>\)/g, this.configurationWorkerService.configuration.allEndpoints().map(c => '(' + s.SparqlService.stringToSPARQLString(c.id) + c.endpoint.toCanonical() + ')').join(''))
      return this.sparqlService.query(this.configurationWorkerService.configuration.primaryEndpoint.endpoint.value, queryTemplate, {timeout: canceller}).then(
        (response: angular.IHttpPromiseCallbackArg<s.ISparqlBindingResult<{[id: string]: s.ISparqlBinding}>>) => {
          let item: Item = new Item(id)
          let propertyMap: {[property: string]: PropertyToValues} = {}
          response.data.results.bindings.forEach(b => {
            if (b['itemLabel']) item.label = new SparqlBindingNode(b['itemLabel'])
            if (b['property']) {
              let propertyToValues: PropertyToValues = propertyMap[b['property'].value]
              if (!propertyToValues) {
                propertyToValues = new PropertyToValues(new SparqlBindingNode(b['property']))
                propertyMap[b['property'].value] = propertyToValues
                if (b['propertyLabel']) propertyToValues.label = new SparqlBindingNode(b['propertyLabel'])
                item.properties.push(propertyToValues)
              }
              let oNode: NodePlusLabel = new NodePlusLabel(new SparqlBindingNode(b['object']))
              if (b['objectLabel']) oNode.label = new SparqlBindingNode(b['objectLabel'])
              propertyToValues.values.push(oNode)
            }
          })
          return item
        }
      )
    }

    public getAllItems(canceller?: angular.IPromise<any>): angular.IPromise<Item[]> {
      let queryTemplate: string = SparqlItemService.getAllItemPropertiesQuery
      return this.sparqlService.query(this.configurationWorkerService.configuration.primaryEndpoint.endpoint.value, queryTemplate, {timeout: canceller}).then(
        (response: angular.IHttpPromiseCallbackArg<s.ISparqlBindingResult<{[id: string]: s.ISparqlBinding}>>) => {
          let items: EnsuredOrderedMap<Item> = new EnsuredOrderedMap<Item>()
          let itemPropertyMap: EnsuredMap<{[property: string]: PropertyToValues}> = new EnsuredMap<{[property: string]: PropertyToValues}>()
          response.data.results.bindings.forEach(b => {
            let item: Item = items.goc(b['id'].value, () => new Item(new SparqlBindingNode(b['id'])))
            if (b['itemLabel']) item.label = new SparqlBindingNode(b['itemLabel'])
            if (b['property']) {
              let propertyToValues: PropertyToValues = goc(itemPropertyMap.goc(item.toCanonical()), b['property'].value, () => {
                propertyToValues = new PropertyToValues(new SparqlBindingNode(b['property']))
                if (b['propertyLabel']) propertyToValues.label = new SparqlBindingNode(b['propertyLabel'])
                item.properties.push(propertyToValues)
                return propertyToValues
              })
              let oNode: NodePlusLabel = new NodePlusLabel(new SparqlBindingNode(b['object']))
              if (b['objectLabel']) oNode.label = new SparqlBindingNode(b['objectLabel'])
              propertyToValues.values.push(oNode)
            }
          })
          return items.array()
        }
      )
    }

    public deleteItem(id: INode): angular.IPromise<boolean> {
      return this.sparqlService.update(this.configurationWorkerService.configuration.primaryEndpoint.updateEndpoint.value, this.configurationWorkerService.configuration.deleteItemQuery.replace(/<ID>/g, id.toCanonical())).then(
        (r) => r.status === 204,
        (r) => false
      )
    }

    public alterItem(id: INode, propertiesToAdd: IPropertyToValues[], propertiesToRemove: IPropertyToValues[] = []): angular.IPromise<boolean> {
      let instanceTriplesToAdd: ITriple[] = []
      let schemaTriplesToAdd: ITriple[] = []
      let instanceTriplesToRemove: ITriple[] = []
      propertiesToAdd.forEach(property => {
        if (property.label) schemaTriplesToAdd.push(new Triple(property, SKOS.prefLabel, property.label))
        property.values.forEach(value => {
          instanceTriplesToAdd.push(new Triple(id, property, value))
          if ((<NodePlusLabel>value).label) instanceTriplesToAdd.push(new Triple(value, SKOS.prefLabel, (<NodePlusLabel>value).label))
        })
      })
      propertiesToRemove.forEach(property => property.values.forEach(value => instanceTriplesToRemove.push(new Triple(id, property, value))))
      return this.sparqlUpdateWorkerService.updateGraphs(this.configurationWorkerService.configuration.primaryEndpoint.updateEndpoint.value, [new Graph(SparqlItemService.schemaGraph, schemaTriplesToAdd), new Graph(SparqlItemService.instanceGraph, instanceTriplesToAdd)])
    }

    public createNewItem(equivalentNodes: INode[] = [], properties: PropertyToValues[] = []): angular.IPromise<INode> {
      let deferred: angular.IDeferred<INode> = this.$q.defer()
      let subject: INode = new NamedNode(SparqlItemService.ns + SparqlItemService.UUID())
      deferred.notify(subject)
      let schemaTriplesToAdd: Triple[] = []
      let instanceTriplesToAdd: Triple[] = []
      equivalentNodes.forEach(node => instanceTriplesToAdd.push(new Triple(subject, OWL.sameAs, node)))
      properties.forEach(property => {
        if (property.label) schemaTriplesToAdd.push(new Triple(property, SKOS.prefLabel, property.label))
        property.values.forEach(value => {
          instanceTriplesToAdd.push(new Triple(subject, property, value))
          if ((<NodePlusLabel>value).label) instanceTriplesToAdd.push(new Triple(value, SKOS.prefLabel, (<NodePlusLabel>value).label))
        })
      })
      this.sparqlUpdateWorkerService.updateGraphs(this.configurationWorkerService.configuration.primaryEndpoint.updateEndpoint.value, [new Graph(SparqlItemService.schemaGraph, schemaTriplesToAdd), new Graph(SparqlItemService.instanceGraph, instanceTriplesToAdd)]).then(
        () => deferred.resolve(subject),
        deferred.reject,
        deferred.notify
      )
      return deferred.promise
    }

  }

}
