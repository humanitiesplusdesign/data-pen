namespace fibra {
  'use strict'

  import s = fi.seco.sparql

  export interface IPropertyToValues extends IRichNode {
    values: IRichPropertyValue[]
    toPropertyAndValues(includePropertiesOfProperties: boolean): IPropertyAndValue[]
  }

  export interface IPropertyAndValue {
    property: INode
    object: INode
    properties: IPropertyAndValue[]
    pruned(): IPropertyAndValue
  }

  export class PropertyAndValue {
    constructor(public property: INode, public object: INode, public properties: IPropertyAndValue[] = []) {}
    public pruned(): IPropertyAndValue {
      return new PropertyAndValue(new PrunedRichNodeFromNode(this.property), new PrunedRichNodeFromNode(this.object), this.properties.map(p => p.pruned()))
    }
  }

  export interface IRichPropertyValue {
    value: IRichNode
    properties: IPropertyToValues[]
  }

  export class RichPropertyValue implements IRichPropertyValue {
    constructor(public value: IRichNode, public properties: IPropertyToValues[] = []) {}
  }

  export class PropertyToValues extends RichNodeFromRichNode implements IPropertyToValues {
    public values: IRichPropertyValue[] = []

    public static toPropertyAndValues(pv: IPropertyToValues, includePropertiesOfProperties: boolean): IPropertyAndValue[] {
      if (!includePropertiesOfProperties) return pv.values.map(v => new PropertyAndValue(pv, v.value))
      let ret: IPropertyAndValue[] = []
      pv.values.forEach(v => {
        ret.push(new PropertyAndValue(pv, v.value))
        v.properties.forEach(pv2 => pv2.values.forEach(v2 => ret.push(new PropertyAndValue(pv2, v2.value))))
      })
      return ret
    }
    public static toTriples(subject: INode, pv: IPropertyToValues, includePropertiesOfProperties: boolean): ITriple[] {
      return PropertyToValues.toQuads(subject, pv, DefaultGraph.instance, includePropertiesOfProperties) as ITriple[]
    }
    public static toQuads(subject: INode, pv: IPropertyToValues,  graph: INode, includePropertiesOfProperties: boolean): IQuad[] {
      if (!includePropertiesOfProperties) return pv.values.map(v => DataFactory.instance.quad(subject, pv, v.value, graph))
      let ret: IQuad[] = []
      pv.values.forEach(v => {
        ret.push(DataFactory.instance.quad(subject, pv, v.value, graph))
        v.properties.forEach(pv2 => pv2.values.forEach(v2 => ret.push(DataFactory.instance.quad(subject, pv2, v2.value, graph))))
      })
      return ret
    }

    constructor(property: IRichNode) {
      super(property)
    }
    public toPropertyAndValues(includePropertiesOfProperties: boolean): IPropertyAndValue[] {
      return PropertyToValues.toPropertyAndValues(this, includePropertiesOfProperties)
    }
  }

  export class Item extends FullRichNodeFromNode {
    public localProperties: PropertyToValues[] = []
    public remoteProperties: PropertyToValues[] = []
    public localInverseProperties: PropertyToValues[] = []
    public remoteInverseProperties: PropertyToValues[] = []
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

    public static naiveGetLocalItemPropertiesQuery: string = `PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX mads: <http://www.loc.gov/mads/rdf/v1#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
SELECT ?id ?itemLabel ?property ?propertyLabel ?object ?objectLabel {
  # STARTGRAPH
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
  # ENDGRAPH
}`

    public static getLocalItemPropertiesQuery: string = `PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX mads: <http://www.loc.gov/mads/rdf/v1#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX sf: <http://ldf.fi/functions#>
SELECT ?id ?itemLabel ?property ?propertyLabel ?object ?objectLabel {
  # STARTGRAPH
    VALUES ?id { <IDS> }
    { ?id ?property ?object . }
    UNION
    { ?object ?property ?id . }
    ?id sf:preferredLanguageLiteral (skos:prefLabel mads:authoritativeLabel rdfs:label skos:altLabel mads:variantLabel '<PREFLANG>' '' ?itemLabel) .
    OPTIONAL {
      ?property sf:preferredLanguageLiteral (skos:prefLabel mads:authoritativeLabel rdfs:label skos:altLabel mads:variantLabel '<PREFLANG>' '' ?propertyLabelP)
    }
    BIND(COALESCE(?propertyLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?property),".*/",""),".*#",""),"_"," "),"([A-ZÅÄÖ])"," $1")) AS ?propertyLabel)
    OPTIONAL {
      ?object sf:preferredLanguageLiteral (skos:prefLabel mads:authoritativeLabel rdfs:label skos:altLabel mads:variantLabel '<PREFLANG>' '' ?objectLabelP) .
    }
    BIND (IF(ISIRI(?object),COALESCE(?objectLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?object),".*/",""),".*#",""),"_"," "),"([A-ZÅÄÖ])"," $1")),?object) AS ?objectLabel)
  # ENDGRAPH
}`

    public static getRemoteItemPropertiesQuery: string = `PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
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

    public static deleteItemQuery: string = `DELETE {
  # STARTGRAPH
    <ID> ?p ?o .
    ?s ?p <ID> .
  # ENDGRAPH
}
WHERE {
  # STARTGRAPH
    { <ID> ?p ?o } UNION { ?s ?p <ID> }
  # ENDGRAPH
}
`

    constructor(private workerService: WorkerService) {}

    /**
     * Get a single item from the local store
     * @param queryRemote whether to query remote endpoints for properties
     * @param canceller promise that can be resolved to cancel a remote fetch
     */
    public getItem(id: INode, queryRemote: boolean = false, canceller?: angular.IPromise<any>): angular.IPromise<Item> {
      return this.workerService.call('sparqlItemWorkerService', 'getItems', [[id.toCanonical()], queryRemote], canceller).then((items: Item[]) => items[0], null, (info: {endpointType: 'primary' | 'remote', endpoint: string, items: Item[]}) => { return { endpointType: info.endpointType, endpoint: info.endpoint, item: info.items[0] } })
    }

    /**
     * Get multiple items from the local store
     * @param queryRemote whether to query remote endpoints for properties
     * @param canceller promise that can be resolved to cancel a remote fetch
     */
    public getItems(ids: INode[], queryRemote: boolean = false, canceller?: angular.IPromise<any>): angular.IPromise<Item[]> {
      return this.workerService.call('sparqlItemWorkerService', 'getItems', [ids.map(id => id.toCanonical()), queryRemote], canceller)
    }

    public getAllItems(queryRemote: boolean = false, canceller?: angular.IPromise<any>): angular.IPromise<Item[]> {
      return this.workerService.call('sparqlItemWorkerService', 'getItems', [false, queryRemote], canceller)
    }

    public createNewItem(properties: IPropertyAndValue[] = []): angular.IPromise<INode> {
      return this.workerService.call('sparqlItemWorkerService', 'createNewItem', [properties.map(pv => pv.pruned())])
    }

    public alterItem(id: INode, propertiesToAdd: IPropertyAndValue[], propertiesToRemove: IPropertyAndValue[] = []): angular.IPromise<string> {
      return this.workerService.call('sparqlItemWorkerService', 'alterItem', [(id), propertiesToAdd.map(pv => pv.pruned()), propertiesToRemove.map(pv => pv.pruned())])
    }

    public deleteItem(id: INode): angular.IPromise<string> {
      return this.workerService.call('sparqlItemWorkerService', 'deleteItem', [id])
    }
  }

  export class SparqlItemWorkerService {

    private static processItemResult(properties: PropertyToValues[], propertyMap: EMap<PropertyToValues>, propertyValueMap: EMap<EMap<IRichNode>>, sameAses: INode[], endpoint: string, b: {[varId: string]: s.ISparqlBinding}): void {
      if (b['property']) {
        let n: IRichNode = propertyValueMap.goc(b['property'].value).goc(b['object'].value, () => {
          let propertyToValues: PropertyToValues = propertyMap.goc(b['property'].value, () => {
            let ret: PropertyToValues = new PropertyToValues(DataFactory.instance.nodeFromBinding(b['property']))
            if (b['propertyLabel']) ret.label = b['propertyLabel'].value
            properties.push(ret)
            return ret
          })
          let oNode: IRichNode = new FullRichNodeFromNode(DataFactory.instance.nodeFromBinding(b['object']))
          oNode.sourceEndpoints = []
          propertyToValues.values.push(new RichPropertyValue(oNode))
          if (OWL.sameAs.equals(propertyToValues)) sameAses.push(oNode)
          return oNode
        })
        n.sourceEndpoints.push(endpoint)
        if (b['objectLabel'] && !n.label) n.label = b['objectLabel'].value
      }
    }

    constructor(private fibraSparqlService: FibraSparqlService, private $q: angular.IQService, private sparqlUpdateWorkerService: SparqlUpdateWorkerService, private stateWorkerService: StateWorkerService) {}

    public getItems(ids: string[] | boolean, queryRemote: boolean = false, canceller?: angular.IPromise<any>): angular.IPromise<Item[]> {
      let queryTemplate: string = this.stateWorkerService.state.project.itemQuery
      if (!ids) queryTemplate = queryTemplate.replace(/VALUES \?id { <IDS> }/g, '')
      else queryTemplate = queryTemplate.replace(/<IDS>/g, (ids as string[]).join(''))
      queryTemplate = queryTemplate.replace(/<PREFLANG>/g, this.stateWorkerService.state.language)
      let items: EMap<Item> = new EMap<Item>((id) => new Item(DataFactory.instance.namedNode(id)))
      let ret: angular.IDeferred<Item[]> = this.$q.defer()
      this.fibraSparqlService.query(this.stateWorkerService.state.project.endpoint, queryTemplate, {timeout: canceller}).then(
        response => {
          let idPropertyMap: EMap<EMap<PropertyToValues>> = new EMap<EMap<PropertyToValues>>(() => new EMap<PropertyToValues>())
          let idPropertyValueMap: EMap<EMap<EMap<IRichNode>>> = new EMap<EMap<EMap<IRichNode>>>(() => new EMap<EMap<IRichNode>>(() => new EMap<IRichNode>()))
          let idSameAses: ENodeMap<INode[]> = new ENodeMap<INode[]>(() => [])
          for (let b of response.results.bindings) {
            let item: Item = items.goc(b['id'].value)
            if (b['itemLabel']) item.label = b['itemLabel'].value
            SparqlItemWorkerService.processItemResult(item.localProperties, idPropertyMap.goc(b['id'].value), idPropertyValueMap.goc(b['id'].value), idSameAses.goc(item), this.stateWorkerService.state.project.endpoint, b)
          }
          if (queryRemote) {
            ret.notify({ endpointType: 'primary', endpoint: this.stateWorkerService.state.project.endpoint, items: items.values()})
            let itemIdQuery: string = ''
            for (let item of items.values()) {
              itemIdQuery += '(' + item.toCanonical() + item.toCanonical() + ')'
              for (let item2 of idSameAses.get(item)) itemIdQuery += '(' + item.toCanonical() + item2.toCanonical() + ')'
            }
            this.$q.all(this.stateWorkerService.state.project.remoteEndpoints().map(endpoint => {
              let queryTemplate2: string = endpoint.itemQuery
              queryTemplate2 = queryTemplate2.replace(/<IDPAIRS>/g, itemIdQuery)
              queryTemplate2 = queryTemplate2.replace(/<PREFLANG>/g, this.stateWorkerService.state.language)
              return this.fibraSparqlService.query(endpoint.endpoint, queryTemplate2, {timeout: canceller}).then(
                response2 => {
                  if (response2.results.bindings.length !== 0) {
                    for (let b of response2.results.bindings) {
                      let item: Item = items.goc(b['id'].value)
                      SparqlItemWorkerService.processItemResult(item.remoteProperties, idPropertyMap.goc(b['id'].value), idPropertyValueMap.goc(b['id'].value), idSameAses.goc(item), endpoint.id, b)
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
      return this.fibraSparqlService.update(this.stateWorkerService.state.project.updateEndpoint, this.stateWorkerService.state.project.deleteItemQuery.replace(/<ID>/g, id.toCanonical())).then(
        (r) => true,
        (r) => false
      )
    }

    public alterItem(id: INode, propertiesToAdd: IPropertyAndValue[], propertiesToRemove: IPropertyAndValue[] = []): angular.IPromise<boolean> {
      let triplesToAdd: ITriple[] = []
      let triplesToRemove: ITriple[] = []
      propertiesToAdd.forEach(property => triplesToAdd.push(new Triple(id, property.property, property.object)))
      propertiesToRemove.forEach(property => triplesToRemove.push(new Triple(id, property.property, property.object)))
      return this.sparqlUpdateWorkerService.updateGraphs(this.stateWorkerService.state.project.updateEndpoint, [new Graph(this.stateWorkerService.state.project.graph ? DataFactory.namedNode(this.stateWorkerService.state.project.graph) : DefaultGraph.instance, triplesToAdd)], [new Graph(this.stateWorkerService.state.project.graph ? DataFactory.namedNode(this.stateWorkerService.state.project.graph) : DefaultGraph.instance, triplesToRemove)])
    }

    public createNewItem(properties: IPropertyAndValue[] = []): angular.IPromise<INode> {
      let deferred: angular.IDeferred<INode> = this.$q.defer()
      let subject: INode = new NamedNode(this.stateWorkerService.state.project.instanceNS + UUID())
      deferred.notify(subject)
      let triplesToAdd: ITriple[] = []
      properties.forEach(property => triplesToAdd.push(new Triple(subject, property.property, property.object)))
      this.sparqlUpdateWorkerService.updateGraphs(this.stateWorkerService.state.project.updateEndpoint, [new Graph(this.stateWorkerService.state.project.graph ? DataFactory.namedNode(this.stateWorkerService.state.project.graph) : DefaultGraph.instance, triplesToAdd)]).then(
        () => deferred.resolve(subject),
        deferred.reject,
        deferred.notify
      )
      return deferred.promise
    }

  }

}
