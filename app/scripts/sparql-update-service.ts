namespace fibra {
  'use strict'

  import s = fi.seco.sparql

  export class SparqlUpdateService {

    public static serialize(s: Triple): string {
      return s.subject.id + ' ' + s.property.id + ' ' + s.object.id
    }

    constructor(private workerService: WorkerService) {}

    public updateQuads(endpoint: string, quadsToAdd: Quad[], quadsToRemove: Quad[]): angular.IPromise<any> {
      return this.workerService.call('sparqlUpdateWorkerService', 'update', [endpoint, quadsToAdd, quadsToRemove])
    }

    public updateGraphs(endpoint: string, graphsToAdd: Graph[], graphsToRemove: Graph[]): angular.IPromise<any> {
      return this.workerService.call('sparqlUpdateWorkerService', 'update', [endpoint, graphsToAdd, graphsToRemove])
    }

  }

  export class SparqlUpdateWorkerService {
    private static queryTemplate: string = `DELETE{<DELETE>}INSERT{<INSERT>}WHERE {}`

    constructor(private sparqlService: s.SparqlService, private workerWorkerService: WorkerWorkerService ) {}

    public updateQuads(endpoint: string, quadsToAdd: Quad[] = [], quadsToRemove: Quad[] = []): angular.IPromise<any> {
      let graphsToAddMap: {[graphId: string]: Graph} = {}
      let graphsToRemoveMap: {[graphId: string]: Graph} = {}
      let graphsToAdd: Graph[] = []
      let graphsToRemove: Graph[] = []
      quadsToAdd.forEach(q => {
        let graph: Graph = graphsToAddMap[q.graph.id]
        if (!graph) {
          graph = new Graph(q.graph)
          graphsToAddMap[q.graph.id] = graph
          graphsToAdd.push(graph)
        }
        graph.triples.push(q)
      })
      quadsToRemove.forEach(q => {
        let graph: Graph = graphsToRemoveMap[q.graph.id]
        if (!graph) {
          graph = new Graph(q.graph)
          graphsToRemoveMap[q.graph.id] = graph
          graphsToRemove.push(graph)
        }
        graph.triples.push(q)
      })
      return this.updateGraphs(endpoint, graphsToAdd, graphsToRemove)
    }

    public updateGraphs(endpoint: string, graphsToAdd: Graph[] = [], graphsToRemove: Graph[] = []): angular.IPromise<any> {
      let addString: string = graphsToAdd.map(graph => 'GRAPH' + graph.graph.id + '{' + graph.triples.map(SparqlUpdateService.serialize).join(' . ') + '}').join()
      let removeString: string = graphsToRemove.map(graph => 'GRAPH' + graph.graph.id + '{' + graph.triples.map(SparqlUpdateService.serialize).join(' . ') + '}').join()
      return this.sparqlService.update(endpoint, SparqlUpdateWorkerService.queryTemplate.replace(/<DELETE>/g, removeString).replace(/<INSERT>/g, addString)).then(
        (r) => this.workerWorkerService.stripFunctions(r)
      )
    }

  }
}
