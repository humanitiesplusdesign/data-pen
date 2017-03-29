namespace fibra {
  'use strict'

  export class SparqlUpdateService {

    constructor(private workerService: WorkerService) {}

    public updateQuads(endpoint: string, quadsToAdd: Quad[], quadsToRemove: Quad[]): angular.IPromise<any> {
      return this.workerService.call('sparqlUpdateWorkerService', 'updateQuads', [endpoint, quadsToAdd, quadsToRemove])
    }

    public updateGraphs(endpoint: string, graphsToAdd: Graph[], graphsToRemove: Graph[]): angular.IPromise<any> {
      return this.workerService.call('sparqlUpdateWorkerService', 'updateGraphs', [endpoint, graphsToAdd, graphsToRemove])
    }

  }

  export class SparqlUpdateWorkerService {
    private static queryTemplate: string = `DELETE{<DELETE>}INSERT{<INSERT>}WHERE {}`

    constructor(private fibraSparqlService: FibraSparqlService) {}

    public updateQuads(endpoint: string, quadsToAdd: Quad[] = [], quadsToRemove: Quad[] = []): angular.IPromise<any> {
      let graphsToAddMap: {[graphId: string]: Graph} = {}
      let graphsToRemoveMap: {[graphId: string]: Graph} = {}
      let graphsToAdd: Graph[] = []
      let graphsToRemove: Graph[] = []
      quadsToAdd.forEach(q => {
        let graph: Graph = graphsToAddMap[q.graph.value]
        if (!graph) {
          graph = new Graph(q.graph)
          graphsToAddMap[q.graph.value] = graph
          graphsToAdd.push(graph)
        }
        graph.triples.push(DataFactory.triple(q.subject, q.predicate, q.object))
      })
      quadsToRemove.forEach(q => {
        let graph: Graph = graphsToRemoveMap[q.graph.value]
        if (!graph) {
          graph = new Graph(q.graph)
          graphsToRemoveMap[q.graph.value] = graph
          graphsToRemove.push(graph)
        }
        graph.triples.push(DataFactory.triple(q.subject, q.predicate, q.object))
      })
      return this.updateGraphs(endpoint, graphsToAdd, graphsToRemove)
    }

    public updateGraphs(endpoint: string, graphsToAdd: Graph[] = [], graphsToRemove: Graph[] = []): angular.IPromise<boolean> {
      let addString: string = graphsToAdd.map(graph => (DefaultGraph.instance.equals(graph.graph) ? '' : 'GRAPH' + graph.graph.toCanonical()) + '{' + graph.triples.map(g => g.toCanonical()).join(' . ') + '}').join('')
      let removeString: string = graphsToRemove.map(graph => (DefaultGraph.instance.equals(graph.graph) ? '' : 'GRAPH' + graph.graph.toCanonical()) + '{' + graph.triples.map(g => g.toCanonical()).join(' . ') + '}').join('')
      return this.fibraSparqlService.update(endpoint, SparqlUpdateWorkerService.queryTemplate.replace(/<DELETE>/g, removeString).replace(/<INSERT>/g, addString)).then(
        (r) => true,
        (r) => false
      )
    }

  }
}
