namespace fibra {
  'use strict'

  import s = fi.seco.sparql

  export interface ISourcedNode extends INode {
    sourceEndpoints: EndpointConfiguration[]
  }

  export interface INodePlusLabel extends INode {
    label: INode
  }

  export class NodePlusLabel extends NodeFromNode implements INodePlusLabel {
    public label: INode
    constructor(public node: INode, label?: INode) {
      super(node)
      if (label) this.label = label
    }
  }

  export interface IPropertyToValues<T extends INode> extends INodePlusLabel {
    values: T[]
  }

  export class PropertyToValues<T extends INode> extends NodePlusLabel implements IPropertyToValues<T> {
    public values: T[] = []
    constructor(property: INode) {
      super(property)
    }
  }

  export class SourcePlusProperties {
    public properties: PropertyToValues<INodePlusLabel>[] = []
    constructor(public source: EndpointConfiguration) {}
  }

  export class Item extends NodePlusLabel {
    public properties: SourcePlusProperties[] = []
    public inverseProperties: SourcePlusProperties[] = []
  }

  export interface IConstraint {
    /**
     * Constraint as expressed as a SPARQL expression
     */
    constraintString: string
    /**
     * Ordering hint for ordering constraints in the SPARQL query. The larger, the more important (where it matters)
     */
    priority: number
  }

  export class SimpleConstraint implements IConstraint {
    constructor(public constraintString: string, public priority: number = 0) {}
  }

  export class SparqlItemService {

    public static ns: string = 'http://ldf.fi/fibra/'
    public static schemaGraph: INode = new NamedNode(SparqlItemService.ns + 'schema#')
    public static instanceGraph: INode = new NamedNode(SparqlItemService.ns + 'main/')

    public static getLocalItemPropertiesQuery: string = `
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX sf: <http://ldf.fi/functions#>
SELECT ?itemLabel ?property ?propertyLabel ?object ?objectLabel {
  {
    <ID> sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?itemLabel) .
  } UNION {
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
}`
    public static getItemInversePropertiesQuery: string = `
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX sf: <http://ldf.fi/functions#>
SELECT ?property ?propertyLabel ?object ?objectLabel {
  VALUES ?id { <IDS> }
  ?object ?property ?id .
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
    public static getRemoteItemPropertiesQuery: string = `
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX sf: <http://ldf.fi/functions#>
SELECT ?property ?propertyLabel ?object ?objectLabel {
  VALUES ?id { <IDS> }
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
    public static getItemsForExploreQuery: string = `
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX sf: <http://ldf.fi/functions#>
SELECT ?id ?itemLabel ?property ?propertyLabel ?object ?objectLabel {
  ?id a ?type .
  {
    ?id owl:sameAs ?oid .
    VALUES ?service {
      <SERVICES>
    }
    SERVICE ?service {
      ?oid ?property ?object .
      OPTIONAL {
        ?property sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?propertyLabelP)
      }
      BIND(COALESCE(?propertyLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?property),".*/",""),".*#",""),"_"," "),"([A-ZÅÄÖ])"," $1")) AS ?propertyLabel)
      OPTIONAL {
        ?object sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?objectLabelP) .
      }
      BIND (IF(ISIRI(?object),COALESCE(?objectLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?object),".*/",""),".*#",""),"_"," "),"([A-ZÅÄÖ])"," $1")),?object) AS ?objectLabel)
    }
  } UNION {
    ?id sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?itemLabel) .
  } UNION {
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

    /**
     * Get a single item from the local store
     * @param canceller promise that can be resolved to cancel a remote fetch
     */
    public getItem(id: INode, canceller?: angular.IPromise<any>): angular.IPromise<Item> {
      return this.workerService.call('sparqlItemWorkerService', 'getItem', [id], canceller)
    }

    public getItemsForExplore(canceller?: angular.IPromise<any>): angular.IPromise<Item[]> {
      return this.workerService.call('sparqlItemWorkerService', 'getItemsForExplore', [], canceller)
    }

    public createNewItem(equivalentNodes: INode[] = [], properties: IPropertyToValues<INode>[] = []): angular.IPromise<INode> {
      return this.workerService.call('sparqlItemWorkerService', 'createNewItem', [equivalentNodes, properties])
    }

    public alterItem(id: INode, propertiesToAdd: IPropertyToValues<INode>[], propertiesToRemove: IPropertyToValues<INode>[] = []): angular.IPromise<string> {
      return this.workerService.call('sparqlItemWorkerService', 'alterItem', [id, propertiesToAdd, propertiesToRemove])
    }

    public deleteItem(id: INode): angular.IPromise<string> {
      return this.workerService.call('sparqlItemWorkerService', 'deleteItem', [id])
    }
  }

  export class SparqlItemWorkerService {

    constructor(private sparqlService: s.SparqlService, private $q: angular.IQService, private sparqlUpdateWorkerService: SparqlUpdateWorkerService, private configurationWorkerService: ConfigurationWorkerService) {}

    public getItem(id: INode, canceller?: angular.IPromise<any>): angular.IPromise<Item> {
      let queryTemplate: string = this.configurationWorkerService.configuration.primaryEndpoint.localItemQueryTemplate
      queryTemplate = queryTemplate.replace(/<ID>/g, id.toCanonical())
      let item: Item = new Item(id)
      item.properties = this.configurationWorkerService.configuration.allEndpoints().map(e => new SourcePlusProperties(e))
      return this.sparqlService.query(this.configurationWorkerService.configuration.primaryEndpoint.endpoint.value, queryTemplate, {timeout: canceller}).then(
        (response: angular.IHttpPromiseCallbackArg<s.ISparqlBindingResult<{[id: string]: s.ISparqlBinding}>>) => {
          let propertyMap: EMap<PropertyToValues<INodePlusLabel>> = new EMap<PropertyToValues<INodePlusLabel>>()
          for (let b of response.data!.results.bindings) {
            if (b['itemLabel']) item.label = DataFactory.instance.nodeFromBinding(b['itemLabel'])
            this.processItemResult(item.properties[0], propertyMap, b)
          }
          let sameAses: PropertyToValues<INodePlusLabel> = item.properties[0].properties.filter(p => OWL.sameAs.equals(p))[0]
          let ids: string[] = [item.toCanonical()]
          if (sameAses) for (let v of sameAses.values) ids.push(v.toCanonical())
          return this.$q.all(this.configurationWorkerService.configuration.remoteEndpoints().map(endpoint =>
            this.sparqlService.query(endpoint.endpoint.value, SparqlItemService.getRemoteItemPropertiesQuery.replace(/<IDS>/g, ids.join('')), {timeout: canceller}).then(
              (response2: angular.IHttpPromiseCallbackArg<s.ISparqlBindingResult<{[id: string]: s.ISparqlBinding}>>) => {
                for (let b of response2.data!.results.bindings)
                  this.processItemResult(item.properties[0], propertyMap, b)
              })
          )).then(() => item)
        }
      )
    }

    public getItemsForExplore(canceller?: angular.IPromise<any>): angular.IPromise<Item[]> {
      let queryTemplate: string = SparqlItemService.getItemsForExploreQuery
      queryTemplate = queryTemplate.replace(/<SERVICES>/g, this.configurationWorkerService.configuration.remoteEndpoints().map(p => p.endpoint.toCanonical()).join(''))
      return this.sparqlService.query(this.configurationWorkerService.configuration.primaryEndpoint.endpoint.value, queryTemplate, {timeout: canceller}).then(
        (response: angular.IHttpPromiseCallbackArg<s.ISparqlBindingResult<{[id: string]: s.ISparqlBinding}>>) => {
          let items: EOMap<Item> = new EOMap<Item>()
          let itemPropertyMap: ENodeMap<EOMap<PropertyToValues<INodePlusLabel>>> = new ENodeMap<EOMap<PropertyToValues<INodePlusLabel>>>(() => new EOMap<PropertyToValues<INodePlusLabel>>())
          for (let b of response.data!.results.bindings) {
            let item: Item = items.goc(b['id'].value, () => {
              let ret: Item = new Item(DataFactory.instance.nodeFromBinding(b['id']))
              ret.properties = this.configurationWorkerService.configuration.allEndpoints().map(e => new SourcePlusProperties(e))
              return ret
            })
            if (b['itemLabel']) item.label = DataFactory.instance.nodeFromBinding(b['itemLabel'])
            this.processItemResult(item.properties[0], itemPropertyMap.goc(item), b)
          }
          return items.values()
        }
      )
    }

    public deleteItem(id: INode): angular.IPromise<boolean> {
      return this.sparqlService.update(this.configurationWorkerService.configuration.primaryEndpoint.updateEndpoint.value, this.configurationWorkerService.configuration.deleteItemQuery.replace(/<ID>/g, id.toCanonical())).then(
        (r) => r.status === 204,
        (r) => false
      )
    }

    public alterItem(id: INode, propertiesToAdd: IPropertyToValues<INode>[], propertiesToRemove: IPropertyToValues<INode>[] = []): angular.IPromise<boolean> {
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

    public createNewItem(equivalentNodes: INode[] = [], properties: PropertyToValues<INode>[] = []): angular.IPromise<INode> {
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

    private processItemResult(properties: SourcePlusProperties, propertyMap: EMap<PropertyToValues<INodePlusLabel>>, b: {[varId: string]: s.ISparqlBinding}): void {
      if (b['property']) {
        let propertyToValues: PropertyToValues<INodePlusLabel> = propertyMap.goc(b['property'].value, () => {
          let ret: PropertyToValues<INodePlusLabel> = new PropertyToValues<INodePlusLabel>(DataFactory.instance.nodeFromBinding(b['property']))
          if (b['propertyLabel']) ret.label = DataFactory.instance.nodeFromBinding(b['propertyLabel'])
          properties.properties.push(ret)
          return ret
        })
        let oNode: NodePlusLabel = new NodePlusLabel(DataFactory.instance.nodeFromBinding(b['object']))
        if (b['objectLabel']) oNode.label = DataFactory.instance.nodeFromBinding(b['objectLabel'])
        propertyToValues.values.push(oNode)
      }
    }

  }

}
