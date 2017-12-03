'use strict'

import * as angular from 'angular'
import {WorkerService} from './worker-service/worker-service'
import {FibraSparqlService} from './fibra-sparql-service'
import {Project} from 'services/project-service/project'
import {RemoteEndpointConfiguration} from 'services/project-service/remote-endpoint-configuration'
import {TreeNode} from 'models/treenode'

export class SparqlStatisticsService {

  public static getClassStatisticsQuery: string = `SELECT ?id ?instances {
# STARTGRAPH
  {
    SELECT ?id (COUNT(*) AS ?instances) {
      ?s a ?id .
      # CONSTRAINTS
    }
    GROUP BY ?id
  }
# ENDGRAPH
}
`
  public static getPropertyStatisticsQuery: string = `SELECT ?id ?min ?max ?values {
# STARTGRAPH
  {
    SELECT ?id (COUNT(*) AS ?values) (MIN(?value) AS ?min) (MAX(?value) AS ?max) {
      ?s ?id ?value .
      # CONSTRAINTS
    }
    GROUP BY ?id
  }
# ENDGRAPH
}
`
  /* @ngInject */
  constructor(private workerService: WorkerService) {}
  public getClassStatistics(endpointConfiguration: Project | RemoteEndpointConfiguration, canceller?: angular.IPromise<any>): angular.IPromise<{[id: string]: number}> {
    return this.workerService.call('sparqlStatisticsWorkerService', 'getClassStatistics', [endpointConfiguration.endpoint, endpointConfiguration.classStatisticsQuery], canceller)
  }
}

export class SparqlStatisticsWorkerService {
  /* @ngInject */
  constructor(private fibraSparqlService: FibraSparqlService) {}
  public getClassStatistics(endpoint: string, query: string, canceller?: angular.IPromise<any>): angular.IPromise<{[id: string]: number}> {
    return this.fibraSparqlService.query(endpoint, query, canceller).then(response => {
      let ret:{[id: string]: number} = {}
      for (let b of response.results.bindings)
        ret[b['id'].value] = b['instances'].value
      return ret
    })
  }
}

angular.module('fibra.services.sparql-statistics-service', [])
  .config(($provide) => {
    $provide.service('sparqlStatisticsService', SparqlStatisticsService)
    $provide.service('sparqlStatisticsWorkerService', SparqlStatisticsWorkerService)
  })
