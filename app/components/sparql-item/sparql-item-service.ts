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

    public static naiveGetLocalItemPropertiesQuery: string = `
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX mads: <http://www.loc.gov/mads/rdf/v1#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
SELECT ?id ?itemLabel ?property ?propertyLabel ?object ?objectLabel {
  GRAPH <GRAPH> {
    VALUES ?id { <IDS> }
    ?id skos:prefLabel|mads:authoritativeLabel|rdfs:label ?itemLabel .
    FILTER(LANG(?itemLabel)='' || LANG(?itemLabel)='<PREFLANG>')
    ?id ?property ?object .
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
}`

    public static getLocalItemPropertiesQuery: string = `
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX mads: <http://www.loc.gov/mads/rdf/v1#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX sf: <http://ldf.fi/functions#>
SELECT ?id ?itemLabel ?property ?propertyLabel ?object ?objectLabel {
  GRAPH <GRAPH> {
    VALUES ?id { <IDS> }
    ?id sf:preferredLanguageLiteral (skos:prefLabel mads:authoritativeLabel rdfs:label skos:altLabel mads:variantLabel '<PREFLANG>' '' ?itemLabel) .
    { ?id ?property ?object . }
    UNION
    { ?object ?property ?id . }
    OPTIONAL {
      ?property sf:preferredLanguageLiteral (skos:prefLabel mads:authoritativeLabel rdfs:label skos:altLabel mads:variantLabel '<PREFLANG>' '' ?propertyLabelP)
    }
    BIND(COALESCE(?propertyLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?property),".*/",""),".*#",""),"_"," "),"([A-ZÅÄÖ])"," $1")) AS ?propertyLabel)
    OPTIONAL {
      ?object sf:preferredLanguageLiteral (skos:prefLabel mads:authoritativeLabel rdfs:label skos:altLabel mads:variantLabel '<PREFLANG>' '' ?objectLabelP) .
    }
    BIND (IF(ISIRI(?object),COALESCE(?objectLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?object),".*/",""),".*#",""),"_"," "),"([A-ZÅÄÖ])"," $1")),?object) AS ?objectLabel)
  }
}`

    public static getRemoteItemPropertiesQuery: string = `
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX mads: <http://www.loc.gov/mads/rdf/v1#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX sf: <http://ldf.fi/functions#>
SELECT ?id ?property ?propertyLabel ?object ?objectLabel {
  VALUES (?id ?oid) { <IDPAIRS> }
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
     * @param queryRemote whether to query remote endpoints for properties
     * @param canceller promise that can be resolved to cancel a remote fetch
     */
    public getItem(id: INode, queryRemote: boolean = false, canceller?: angular.IPromise<any>): angular.IPromise<Item> {
      return this.workerService.call('sparqlItemWorkerService', 'getItems', [[id], queryRemote], canceller).then((items: Item[]) => items[0], null, (info: {endpointType: 'primary' | 'remote', endpoint: string, items: Item[]}) => { return { endpointType: info.endpointType, endpoint: info.endpoint, item: info.items[0] } })
    }

    /**
     * Get multiple items from the local store
     * @param queryRemote whether to query remote endpoints for properties
     * @param canceller promise that can be resolved to cancel a remote fetch
     */
    public getItems(ids: INode[], queryRemote: boolean = false, canceller?: angular.IPromise<any>): angular.IPromise<Item[]> {
      return this.workerService.call('sparqlItemWorkerService', 'getItems', [ids, queryRemote], canceller)
    }

    public getAllItems(queryRemote: boolean = false, canceller?: angular.IPromise<any>): angular.IPromise<Item[]> {
      return this.workerService.call('sparqlItemWorkerService', 'getItems', [[], queryRemote, canceller, true])
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

    private static processItemResult(properties: PropertyToValues<INodePlusLabel>[], propertyMap: EMap<PropertyToValues<INodePlusLabel>>, propertyValueMap: EMap<EMap<ISourcedNodePlusLabel>>, sameAses: INode[], endpoint: EndpointConfiguration, b: {[varId: string]: s.ISparqlBinding}): void {
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
          if (OWL.sameAs.equals(propertyToValues)) sameAses.push(oNode)
          return oNode
        })
        n.sourceEndpoints.push(endpoint)
        if (b['objectLabel'] && !n.label) n.label = DataFactory.instance.nodeFromBinding(b['objectLabel'])
      }
    }

    constructor(private sparqlService: s.SparqlService, private $q: angular.IQService, private sparqlUpdateWorkerService: SparqlUpdateWorkerService, private configurationWorkerService: ConfigurationWorkerService) {}

    public getItems(ids: INode[], queryRemote: boolean = false, canceller?: angular.IPromise<any>, unrestricted: boolean = false): angular.IPromise<Item[]> {
      let queryTemplate: string = this.configurationWorkerService.configuration.primaryEndpoint.localItemQueryTemplate
      console.log(queryTemplate)
      if (unrestricted) queryTemplate = queryTemplate.replace(/VALUES \?id { <IDS> }/g, '')
      queryTemplate = queryTemplate.replace(/<IDS>/g, ids.map(id => id.toCanonical()).join(''))
      queryTemplate = queryTemplate.replace(/<PREFLANG>/g, this.configurationWorkerService.configuration.preferredLanguage)
      console.log(queryTemplate)
      let items: EMap<Item> = new EMap<Item>((id) => new Item(DataFactory.instance.namedNode(id)))
      let ret: angular.IDeferred<Item[]> = this.$q.defer()
      this.sparqlService.query(this.configurationWorkerService.configuration.primaryEndpoint.endpoint.value, queryTemplate, {timeout: canceller}).then(
        (response: angular.IHttpPromiseCallbackArg<s.ISparqlBindingResult<{[id: string]: s.ISparqlBinding}>>) => {
          let idPropertyMap: EMap<EMap<PropertyToValues<INodePlusLabel>>> = new EMap<EMap<PropertyToValues<INodePlusLabel>>>(() => new EMap<PropertyToValues<INodePlusLabel>>())
          let idPropertyValueMap: EMap<EMap<EMap<ISourcedNodePlusLabel>>> = new EMap<EMap<EMap<ISourcedNodePlusLabel>>>(() => new EMap<EMap<ISourcedNodePlusLabel>>(() => new EMap<ISourcedNodePlusLabel>()))
          let idSameAses: ENodeMap<INode[]> = new ENodeMap<INode[]>(() => [])
          for (let b of response.data!.results.bindings) {
            let item: Item = items.goc(b['id'].value)
            if (b['itemLabel']) item.label = DataFactory.instance.nodeFromBinding(b['itemLabel'])
            SparqlItemWorkerService.processItemResult(item.localProperties, idPropertyMap.goc(b['id'].value), idPropertyValueMap.goc(b['id'].value), idSameAses.goc(item), this.configurationWorkerService.configuration.primaryEndpoint, b)
          }
          if (queryRemote) {
            ret.notify({ endpointType: 'primary', endpoint: this.configurationWorkerService.configuration.primaryEndpoint.id, items: items.values()})
            let itemIdQuery: string = ''
            for (let item of items.values()) {
              itemIdQuery += '(' + item.toCanonical() + item.toCanonical() + ')'
              for (let item2 of idSameAses.get(item)) itemIdQuery += '(' + item.toCanonical() + item2.toCanonical() + ')'
            }
            this.$q.all(this.configurationWorkerService.configuration.remoteEndpoints().map(endpoint => {
              let queryTemplate2: string = endpoint.remoteItemQueryTemplate
              queryTemplate2 = queryTemplate2.replace(/<IDPAIRS>/g, itemIdQuery)
              queryTemplate2 = queryTemplate2.replace(/<PREFLANG>/g, this.configurationWorkerService.configuration.preferredLanguage)
              return this.sparqlService.query(endpoint.endpoint.value, queryTemplate2, {timeout: canceller}).then(
                (response2: angular.IHttpPromiseCallbackArg<s.ISparqlBindingResult<{[id: string]: s.ISparqlBinding}>>) => {
                  if (response2.data!.results.bindings.length !== 0) {
                    for (let b of response2.data!.results.bindings) {
                      let item: Item = items.goc(b['id'].value)
                      SparqlItemWorkerService.processItemResult(item.remoteProperties, idPropertyMap.goc(b['id'].value), idPropertyValueMap.goc(b['id'].value), idSameAses.goc(item), endpoint, b)
                    }
                    ret.notify({ endpointType: 'remote', endpoint: endpoint.id, items: items.values()})
                  }
                },
                (error) => ret.notify({ endpointType: 'remote', endpoint: endpoint.id, error: WorkerWorkerService.stripFunctions(error) })
              )
            })).then(() => ret.resolve(items.values()))
          } else ret.resolve(items.values())
        }
      )
      return ret.promise
    }

    public deleteItem(id: INode): angular.IPromise<boolean> {
      return this.sparqlService.update(this.configurationWorkerService.configuration.primaryEndpoint.updateEndpoint.value, this.configurationWorkerService.configuration.deleteItemQuery.replace(/<ID>/g, id.toCanonical())).then(
        (r) => r.status === 204,
        (r) => false
      )
    }

    public alterItem(id: INode, propertiesToAdd: IPropertyToValues<INode>[], propertiesToRemove: IPropertyToValues<INode>[] = []): angular.IPromise<boolean> {
      let triplesToAdd: ITriple[] = []
      let triplesToRemove: ITriple[] = []
      propertiesToAdd.forEach(property => {
        if (property.label) triplesToAdd.push(new Triple(property, SKOS.prefLabel, property.label))
        property.values.forEach(value => {
          triplesToAdd.push(new Triple(id, property, value))
          if ((<NodePlusLabel>value).label) triplesToAdd.push(new Triple(value, SKOS.prefLabel, (<NodePlusLabel>value).label))
        })
      })
      propertiesToRemove.forEach(property => property.values.forEach(value => triplesToRemove.push(new Triple(id, property, value))))
      return this.sparqlUpdateWorkerService.updateGraphs(this.configurationWorkerService.configuration.primaryEndpoint.updateEndpoint.value, [new Graph(this.configurationWorkerService.configuration.graph, triplesToAdd)], [new Graph(this.configurationWorkerService.configuration.graph, triplesToRemove)])
    }

    public createNewItem(equivalentNodes: INode[] = [], properties: PropertyToValues<INode>[] = []): angular.IPromise<INode> {
      let deferred: angular.IDeferred<INode> = this.$q.defer()
      let subject: INode = new NamedNode(this.configurationWorkerService.configuration.instanceNS + SparqlItemService.UUID())
      deferred.notify(subject)
      let triplesToAdd: ITriple[] = []
      equivalentNodes.forEach(node => triplesToAdd.push(new Triple(subject, OWL.sameAs, node)))
      properties.forEach(property => {
        if (property.label) triplesToAdd.push(new Triple(property, SKOS.prefLabel, property.label))
        property.values.forEach(value => {
          triplesToAdd.push(new Triple(subject, property, value))
          if ((<NodePlusLabel>value).label) triplesToAdd.push(new Triple(value, SKOS.prefLabel, (<NodePlusLabel>value).label))
        })
      })
      this.sparqlUpdateWorkerService.updateGraphs(this.configurationWorkerService.configuration.primaryEndpoint.updateEndpoint.value, [new Graph(this.configurationWorkerService.configuration.graph, triplesToAdd)]).then(
        () => deferred.resolve(subject),
        deferred.reject,
        deferred.notify
      )
      return deferred.promise
    }

  }

}
