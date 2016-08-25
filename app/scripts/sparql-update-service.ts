namespace fibra {
  'use strict'

  import s = fi.seco.sparql

  export class SparqlUpdateService {

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

    constructor(private sparqlService: s.SparqlService) {}

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
        graph.triples.push(q)
      })
      quadsToRemove.forEach(q => {
        let graph: Graph = graphsToRemoveMap[q.graph.value]
        if (!graph) {
          graph = new Graph(q.graph)
          graphsToRemoveMap[q.graph.value] = graph
          graphsToRemove.push(graph)
        }
        graph.triples.push(q)
      })
      return this.updateGraphs(endpoint, graphsToAdd, graphsToRemove)
    }

    public updateGraphs(endpoint: string, graphsToAdd: Graph[] = [], graphsToRemove: Graph[] = []): angular.IPromise<boolean> {
      let addString: string = graphsToAdd.map(graph => (DefaultGraph.instance.equals(graph.graph) ? '' : 'GRAPH' + graph.graph.toCanonical()) + '{' + graph.triples.map(g => g.toCanonical()).join(' . ') + '}').join('')
      let removeString: string = graphsToRemove.map(graph => (DefaultGraph.instance.equals(graph.graph) ? '' : 'GRAPH' + graph.graph.toCanonical()) + '{' + graph.triples.map(g => g.toCanonical()).join(' . ') + '}').join('')
      return this.sparqlService.update(endpoint, SparqlUpdateWorkerService.queryTemplate.replace(/<DELETE>/g, removeString).replace(/<INSERT>/g, addString)).then(
        (r) => r.status === 204,
        (r) => false
      )
    }

  }
}
