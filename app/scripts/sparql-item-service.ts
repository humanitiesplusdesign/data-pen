namespace fibra {
  'use strict'

  import s = fi.seco.sparql

  export class SparqlItemService {

    public static ns: string = 'http://ldf.fi/fibra/'
    public static schemaGraph: INode = new IRI(SparqlItemService.ns + 'schema#')
    public static instanceGraph: INode = new IRI(SparqlItemService.ns + 'main/')

    public static getItemPropertiesQuery: string = `
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX sf: <http://ldf.fi/functions#>
SELECT ?service ?itemLabel ?property ?propertyLabel ?object ?objectLabel {
  <ID> owl:sameAs* ?id .
  VALUES ?service {
    <SERVICES>
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

    public createNewItem(equivalentNodes: INode[] = [], properties: PropertyToValues[] = []): angular.IPromise<INode> {
      return this.workerService.call('sparqlItemWorkerService', 'createNewItem', [equivalentNodes, properties])
    }

  }

  export class SparqlItemWorkerService {

    constructor(private sparqlService: s.SparqlService, private $q: angular.IQService, private sparqlUpdateWorkerService: SparqlUpdateWorkerService, private configurationWorkerService: ConfigurationWorkerService) {}

    public getItem(id: INode, canceller?: angular.IPromise<any>): angular.IPromise<Item> {
      let queryTemplate: string = SparqlItemService.getItemPropertiesQuery
      queryTemplate = queryTemplate.replace(/<ID>/g, id.id)
      queryTemplate = queryTemplate.replace(/<SERVICES>/g, this.configurationWorkerService.configurations.map(c => '<' + c.endpoint + '>').join(''))
      return this.sparqlService.query(this.configurationWorkerService.configurations[0].endpoint, queryTemplate, {timeout: canceller}).then(
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

    public createNewItem(equivalentNodes: INode[] = [], properties: PropertyToValues[] = []): angular.IPromise<INode> {
      let deferred: angular.IDeferred<INode> = this.$q.defer()
      let subject: INode = new IRI(SparqlItemService.ns + SparqlItemService.UUID())
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
      this.sparqlUpdateWorkerService.updateGraphs(this.configurationWorkerService.configurations[0].endpoint, [new Graph(SparqlItemService.schemaGraph, schemaTriplesToAdd), new Graph(SparqlItemService.instanceGraph, instanceTriplesToAdd)]).then(
        () => deferred.resolve(subject),
        deferred.reject,
        deferred.notify
      )
      return deferred.promise
    }

  }

}
