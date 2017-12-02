'use strict'

import * as angular from 'angular'
import {WorkerService} from './worker-service/worker-service'
import {FibraSparqlService} from './fibra-sparql-service'
import {Project} from 'services/project-service/project'
import {RemoteEndpointConfiguration} from 'services/project-service/remote-endpoint-configuration'
import {TreeNode} from 'models/treenode'

export class ClassStatistic {
  public id: string
  public instances: number
}

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
  public getClassStatistics(endpointConfiguration: Project | RemoteEndpointConfiguration, canceller?: angular.IPromise<any>): angular.IPromise<ClassStatistic[]> {
    return this.workerService.call('sparqlStatisticsWorkerService', 'getClassStatistics', [endpointConfiguration.endpoint, endpointConfiguration.classStatisticsQuery], canceller)
  }
}

export class SparqlTreeWorkerService {
  /* @ngInject */
  constructor(private fibraSparqlService: FibraSparqlService) {}

}

angular.module('fibra.services.sparql-statistics-service', [])
  .config(($provide) => {
    $provide.service('sparqlStatisticsService', SparqlStatisticsService)
  })
