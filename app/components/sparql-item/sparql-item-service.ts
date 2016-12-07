namespace fibra {
  'use strict'

  import s = fi.seco.sparql

  export interface ISourcedNode extends INode {
    sourceEndpoints: EndpointConfiguration[]
  }

  export interface INodePlusLabel extends INode {
    label: INode
  }

  export interface ISourcedNodePlusLabel extends INodePlusLabel, ISourcedNode {}

  export class NodePlusLabel extends NodeFromNode implements INodePlusLabel {
    public label: INode
    constructor(node: INode, label?: INode) {
      super(node)
      if (label) this.label = label
    }
  }

  export class SourcedNodePlusLabel extends NodePlusLabel implements ISourcedNodePlusLabel {
    constructor(node: INode, label?: INode, public sourceEndpoints: EndpointConfiguration[] = []) {
      super(node, label)
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
    public localProperties: PropertyToValues<INodePlusLabel>[] = []
    public remoteProperties: PropertyToValues<INodePlusLabel>[] = []
    public localInverseProperties: PropertyToValues<INodePlusLabel>[] = []
    public remoteInverseProperties: PropertyToValues<INodePlusLabel>[] = []
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

    public static naiveGetLocalItemPropertiesQuery: string = `
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX mads: <http://www.loc.gov/mads/rdf/v1#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
SELECT ?itemLabel ?property ?propertyLabel ?object ?objectLabel {
  GRAPH <GRAPH> {
    {
      <ID> skos:prefLabel|mads:authoritativeLabel|rdfs:label ?itemLabel .
      FILTER(LANG(?itemLabel)='' || LANG(?itemLabel)='<PREFLANG>')
    } UNION {
      <ID> ?property ?object .
      OPTIONAL {
        ?property skos:prefLabel|rdfs:label ?propertyLabelP .
        FILTER(LANG(?propertyLabelP)='' || LANG(?propertyLabelP)='<PREFLANG>')
      }
      BIND(COALESCE(?propertyLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?property),".*/",""),".*#",""),"_"," "),"([A-ZÅÄÖ])"," $1")) AS ?propertyLabel)
      OPTIONAL {
        ?object skos:prefLabel|rdfs:label ?objectLabelP .
        FILTER(LANG(?objectLabelP)='' || LANG(?objectLabelP)='<PREFLANG>')
      }
      BIND (IF(ISIRI(?object),COALESCE(?objectLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?object),".*/",""),".*#",""),"_"," "),"([A-ZÅÄÖ])"," $1")),?object) AS ?objectLabel)
    }
  }
}`

    public static getLocalItemPropertiesQuery: string = `
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX mads: <http://www.loc.gov/mads/rdf/v1#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX sf: <http://ldf.fi/functions#>
SELECT ?itemLabel ?property ?propertyLabel ?object ?objectLabel {
  GRAPH <GRAPH> {
    {
      <ID> sf:preferredLanguageLiteral (skos:prefLabel mads:authoritativeLabel rdfs:label skos:altLabel mads:variantLabel '<PREFLANG>' '' ?itemLabel) .
    } UNION {
      <ID> ?property ?object .
      OPTIONAL {
        ?property sf:preferredLanguageLiteral (skos:prefLabel mads:authoritativeLabel rdfs:label skos:altLabel mads:variantLabel '<PREFLANG>' '' ?propertyLabelP)
      }
      BIND(COALESCE(?propertyLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?property),".*/",""),".*#",""),"_"," "),"([A-ZÅÄÖ])"," $1")) AS ?propertyLabel)
      OPTIONAL {
        ?object sf:preferredLanguageLiteral (skos:prefLabel mads:authoritativeLabel rdfs:label skos:altLabel mads:variantLabel '<PREFLANG>' '' ?objectLabelP) .
      }
      BIND (IF(ISIRI(?object),COALESCE(?objectLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?object),".*/",""),".*#",""),"_"," "),"([A-ZÅÄÖ])"," $1")),?object) AS ?objectLabel)
    }
  }
}`
    public static getItemInversePropertiesQuery: string = `
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX mads: <http://www.loc.gov/mads/rdf/v1#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX sf: <http://ldf.fi/functions#>
SELECT ?property ?propertyLabel ?object ?objectLabel {
  VALUES ?id { <IDS> }
  ?object ?property ?id .
  ?id ?property ?object .
  OPTIONAL {
    ?property sf:preferredLanguageLiteral (skos:prefLabel mads:authoritativeLabel rdfs:label skos:altLabel mads:variantLabel '<PREFLANG>' '' ?propertyLabelP)
  }
  BIND(COALESCE(?propertyLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?property),".*/",""),".*#",""),"_"," "),"([A-ZÅÄÖ])"," $1")) AS ?propertyLabel)
  OPTIONAL {
    ?object sf:preferredLanguageLiteral (skos:prefLabel mads:authoritativeLabel rdfs:label skos:altLabel mads:variantLabel '<PREFLANG>' '' ?objectLabelP) .
  }
  BIND (IF(ISIRI(?object),COALESCE(?objectLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?object),".*/",""),".*#",""),"_"," "),"([A-ZÅÄÖ])"," $1")),?object) AS ?objectLabel)
}
`
    public static getRemoteItemPropertiesQuery: string = `
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX mads: <http://www.loc.gov/mads/rdf/v1#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX sf: <http://ldf.fi/functions#>
SELECT ?property ?propertyLabel ?object ?objectLabel {
  VALUES ?id { <IDS> }
  ?id ?property ?object .
  OPTIONAL {
    ?property sf:preferredLanguageLiteral (skos:prefLabel mads:authoritativeLabel rdfs:label skos:altLabel mads:variantLabel '<PREFLANG>' '' ?propertyLabelP)
  }
  BIND(COALESCE(?propertyLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?property),".*/",""),".*#",""),"_"," "),"([A-ZÅÄÖ])"," $1")) AS ?propertyLabel)
  OPTIONAL {
    ?object sf:preferredLanguageLiteral (skos:prefLabel mads:authoritativeLabel rdfs:label skos:altLabel mads:variantLabel '<PREFLANG>' '' ?objectLabelP) .
  }
  BIND (IF(ISIRI(?object),COALESCE(?objectLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?object),".*/",""),".*#",""),"_"," "),"([A-ZÅÄÖ])"," $1")),?object) AS ?objectLabel)
}
`
    public static getItemsForExploreQuery: string = `
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX mads: <http://www.loc.gov/mads/rdf/v1#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX sf: <http://ldf.fi/functions#>
SELECT ?id ?type ?itemLabel ?property ?propertyLabel ?object ?objectLabel {
  ?id a ?type .
  {
    ?id owl:sameAs ?oid
    VALUES ?service {
      <SERVICES>
    }
    SERVICE ?service {
      ?oid ?property ?object .
      OPTIONAL {
        ?property sf:preferredLanguageLiteral (skos:prefLabel mads:authoritativeLabel rdfs:label skos:altLabel mads:variantLabel '<PREFLANG>' '' ?propertyLabelP)
      }
      BIND(COALESCE(?propertyLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?property),".*/",""),".*#",""),"_"," "),"([A-ZÅÄÖ])"," $1")) AS ?propertyLabel)
      OPTIONAL {
        ?object sf:preferredLanguageLiteral (skos:prefLabel mads:authoritativeLabel rdfs:label skos:altLabel mads:variantLabel '<PREFLANG>' '' ?objectLabelP) .
      }
      BIND (IF(ISIRI(?object),COALESCE(?objectLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?object),".*/",""),".*#",""),"_"," "),"([A-ZÅÄÖ])"," $1")),?object) AS ?objectLabel)
    }
  } UNION {
    ?id sf:preferredLanguageLiteral (skos:prefLabel mads:authoritativeLabel rdfs:label skos:altLabel mads:variantLabel '<PREFLANG>' '' ?itemLabel) .
  } UNION {
    ?id ?property ?object .
    OPTIONAL {
      ?property sf:preferredLanguageLiteral (skos:prefLabel mads:authoritativeLabel rdfs:label skos:altLabel mads:variantLabel '<PREFLANG>' '' ?propertyLabelP)
    }
    BIND(COALESCE(?propertyLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?property),".*/",""),".*#",""),"_"," "),"([A-ZÅÄÖ])"," $1")) AS ?propertyLabel)
    OPTIONAL {
      ?object sf:preferredLanguageLiteral (skos:prefLabel mads:authoritativeLabel rdfs:label skos:altLabel mads:variantLabel '<PREFLANG>' '' ?objectLabelP) .
    }
    BIND (IF(ISIRI(?object),COALESCE(?objectLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?object),".*/",""),".*#",""),"_"," "),"([A-ZÅÄÖ])"," $1")),?object) AS ?objectLabel)
  }
}
`

    public static deleteItemQuery: string = `
DELETE {
  GRAPH <GRAPH> {
    <ID> ?p ?o .
    ?s ?p <ID> .
  }
}
WHERE {
  GRAPH <GRAPH> {
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
      queryTemplate = queryTemplate.replace(/<PREFLANG>/g, this.configurationWorkerService.configuration.preferredLanguage)
      let item: Item = new Item(id)
      return this.sparqlService.query(this.configurationWorkerService.configuration.primaryEndpoint.endpoint.value, queryTemplate, {timeout: canceller}).then(
        (response: angular.IHttpPromiseCallbackArg<s.ISparqlBindingResult<{[id: string]: s.ISparqlBinding}>>) => {
          let propertyMap: EMap<PropertyToValues<INodePlusLabel>> = new EMap<PropertyToValues<INodePlusLabel>>()
          let propertyValueMap: EMap<EMap<ISourcedNodePlusLabel>> = new EMap<EMap<ISourcedNodePlusLabel>>(() => new EMap<ISourcedNodePlusLabel>())
          for (let b of response.data!.results.bindings) {
            if (b['itemLabel']) item.label = DataFactory.instance.nodeFromBinding(b['itemLabel'])
            this.processItemResult(item.localProperties, propertyMap, propertyValueMap, this.configurationWorkerService.configuration.primaryEndpoint, b)
          }
          let sameAses: PropertyToValues<INodePlusLabel> = item.localProperties.filter(p => OWL.sameAs.equals(p))[0]
          let ids: string[] = [item.toCanonical()]
          if (sameAses) for (let v of sameAses.values) ids.push(v.toCanonical())
          return this.$q.all(this.configurationWorkerService.configuration.remoteEndpoints().map(endpoint => {
            let queryTemplate2: string = endpoint.remoteItemQueryTemplate
            queryTemplate2 = queryTemplate2.replace(/<IDS>/g, ids.join(''))
            queryTemplate2 = queryTemplate2.replace(/<PREFLANG>/g, this.configurationWorkerService.configuration.preferredLanguage)
            return this.sparqlService.query(endpoint.endpoint.value, queryTemplate2, {timeout: canceller}).then(
              (response2: angular.IHttpPromiseCallbackArg<s.ISparqlBindingResult<{[id: string]: s.ISparqlBinding}>>) => {
                for (let b of response2.data!.results.bindings)
                  this.processItemResult(item.remoteProperties, propertyMap, propertyValueMap, endpoint, b)
              })
          })).then(() => item)
        }
      )
    }

    public getItemsForExplore(canceller?: angular.IPromise<any>): angular.IPromise<Item[]> {
      let queryTemplate: string = SparqlItemService.getItemsForExploreQuery
      queryTemplate = queryTemplate.replace(/<SERVICES>/g, this.configurationWorkerService.configuration.remoteEndpoints().map(p => p.endpoint.toCanonical()).join(''))
      queryTemplate = queryTemplate.replace(/<PREFLANG>/g, this.configurationWorkerService.configuration.preferredLanguage)
      return this.sparqlService.query(this.configurationWorkerService.configuration.primaryEndpoint.endpoint.value, queryTemplate, {timeout: canceller}).then(
        (response: angular.IHttpPromiseCallbackArg<s.ISparqlBindingResult<{[id: string]: s.ISparqlBinding}>>) => {
          let items: EOMap<Item> = new EOMap<Item>()
          let itemPropertyMap: EMap<EMap<PropertyToValues<INodePlusLabel>>> = new EMap<EMap<PropertyToValues<INodePlusLabel>>>(() => new EMap<PropertyToValues<INodePlusLabel>>())
          let itemPropertyValueMap: EMap<EMap<EMap<ISourcedNodePlusLabel>>> = new EMap<EMap<EMap<ISourcedNodePlusLabel>>>(() => new EMap<EMap<ISourcedNodePlusLabel>>(() => new EMap<ISourcedNodePlusLabel>()))
          for (let b of response.data!.results.bindings) {
            let item: Item = items.goc(b['id'].value, () => new Item(DataFactory.instance.nodeFromBinding(b['id'])))
            if (b['itemLabel']) item.label = DataFactory.instance.nodeFromBinding(b['itemLabel'])
            this.processItemResult(item.localProperties, itemPropertyMap.goc(b['id'].value), itemPropertyValueMap.goc(b['id'].value), this.configurationWorkerService.configuration.primaryEndpoint, b)
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

    private processItemResult(properties: PropertyToValues<INodePlusLabel>[], propertyMap: EMap<PropertyToValues<INodePlusLabel>>, propertyValueMap: EMap<EMap<ISourcedNodePlusLabel>>, endpoint: EndpointConfiguration, b: {[varId: string]: s.ISparqlBinding}): void {
      if (b['property']) {
        let n: ISourcedNodePlusLabel = propertyValueMap.goc(b['property'].value).goc(b['object'].value, () => {
          let propertyToValues: PropertyToValues<INodePlusLabel> = propertyMap.goc(b['property'].value, () => {
            let ret: PropertyToValues<INodePlusLabel> = new PropertyToValues<INodePlusLabel>(DataFactory.instance.nodeFromBinding(b['property']))
            if (b['propertyLabel']) ret.label = DataFactory.instance.nodeFromBinding(b['propertyLabel'])
            properties.push(ret)
            return ret
          })
          let oNode: ISourcedNodePlusLabel = new SourcedNodePlusLabel(DataFactory.instance.nodeFromBinding(b['object']))
          propertyToValues.values.push(oNode)
          return oNode
        })
        n.sourceEndpoints.push(endpoint)
        if (b['objectLabel'] && !n.label) n.label = DataFactory.instance.nodeFromBinding(b['objectLabel'])
      }
    }

  }

}
