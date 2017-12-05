'use strict'
import * as angular from 'angular'

import {ICitable, ICitableSource, CitableSource, Citable} from '../../models/citable'
import {WorkerService} from '../../services/worker-service/worker-service'
import {Project} from './project'
import {ProjectSourceInfo} from '../../components/project-sources-view/project-sources-view-component'
import {SparqlService, IBindingsToObjectConfiguration, UniqueObjectTracker} from 'angular-sparql-service'
import {FibraSparqlService} from '../../services/fibra-sparql-service'
import {PrimaryEndpointConfiguration} from './primary-endpoint-configuration'
import {RemoteEndpointConfiguration} from './remote-endpoint-configuration'
import {Schema} from './schema'
import {FMap, IEMap, EMap} from '../../components/collection-utils'
import {toTurtle, TurtleBuilder} from '../../components/misc-utils'
import {DataFactory, FIBRA} from '../../models/rdf'
import {DataModel, Class, Property} from './data-model'
import { SerializationService } from 'services/worker-service/serialization-service';

export class ProjectService {

  private static deleteQuery: string = `DELETE {
# STARTGRAPH
  # PATTERNS
# ENDGRAPH
}
WHERE {
# STARTGRAPH
  # PATTERNS
# ENDGRAPH
}`

  /* @ngInject */
  constructor(private workerService: WorkerService, private fibraSparqlService: FibraSparqlService, private $localStorage: any, private serializationService: SerializationService) {
    if (!$localStorage.projectSources)
      $localStorage.projectSources = []
    this.$localStorage['projectSources'] = this.$localStorage['projectSources'].map(ps => new ProjectSourceInfo(ps.id, ps.sparqlEndpoint, ps.updateEndpoint, ps.graphStoreEndpoint, ps.graph, ps.type))
  }

  public getProjectSources(): ProjectSourceInfo[] {
    return this.$localStorage['projectSources']
  }

  public listPrimaryEndpointConfigurations(source: ICitableSource): angular.IPromise<PrimaryEndpointConfiguration[]> {
    return this.workerService.call('projectWorkerService', 'listPrimaryEndpointConfigurations', [source])
  }

  public loadPrimaryEndpointConfiguration(source: ICitableSource, templateId: string): angular.IPromise<PrimaryEndpointConfiguration> {
    return this.workerService.call('projectWorkerService', 'loadPrimaryEndpointConfiguration', [source, templateId])
  }

  public listArchiveEndpointConfigurations(source: ICitableSource): angular.IPromise<RemoteEndpointConfiguration[]> {
    return this.workerService.call('projectWorkerService', 'listArchiveEndpointConfigurations', [source])
  }

  public listAuthorityEndpointConfigurations(source: ICitableSource): angular.IPromise<RemoteEndpointConfiguration[]> {
    return this.workerService.call('projectWorkerService', 'listAuthorityEndpointConfigurations', [source])
  }

  public loadRemoteEndpointConfiguration(source: ICitableSource, templateId: string): angular.IPromise<RemoteEndpointConfiguration> {
    return this.workerService.call('projectWorkerService', 'loadRemoteEndpointConfiguration', [source, templateId])
  }

  public listSchemas(source: ICitableSource): angular.IPromise<Schema[]> {
    return this.workerService.call('projectWorkerService', 'listSchemas', [source])
  }

  public loadSchema(source: ICitableSource, id: string): angular.IPromise<Schema> {
    return this.workerService.call('projectWorkerService', 'loadSchema', [source, id])
  }

  public listProjects(source: ICitableSource): angular.IPromise<Project[]> {
    return this.workerService.call('projectWorkerService', 'listProjects', [source])
  }

  public loadProject(source: ICitableSource, projectId: string, loadFull: boolean): angular.IPromise<Project> {
    return this.workerService.call('projectWorkerService', 'loadProject', [source, projectId, loadFull])
  }

  public deleteCitable(updateEndpoint: string, citable: ICitable): angular.IPromise<{}> {
    return this.deleteObject(updateEndpoint, citable.id, citable.source.graph)
  }

  public deleteObjects(updateEndpoint: string, ids: string[], graph?: string): angular.IPromise<{}> {
    let dq: string = graph ? ProjectService.deleteQuery.replace(/# STARTGRAPH/g, 'GRAPH <' + graph + '> {').replace(/# ENDGRAPH/g, '}') : ProjectService.deleteQuery.replace(/.*# STARTGRAPH\n/g, '').replace(/.*# ENDGRAPH\n/g, '')
    dq = dq.replace(/# PATTERNS/g, ids.reduce((acc: string, id: string, index: number) => acc + ' <' + id + '> ?p' + index + ' ?o' + index + ' .', ''))
    return this.fibraSparqlService.update(updateEndpoint, dq)
  }

  public deleteObject(updateEndpoint: string, id: string, graph?: string): angular.IPromise<{}> {
    return this.deleteObjects(updateEndpoint, [id], graph)
  }

  public saveCitable(updateEndpoint: string, graphStoreEndpoint: string, ps: ICitable): angular.IPromise<{}> {
    let tb: TurtleBuilder = new TurtleBuilder()
    ps.toTurtle(tb)
    return this.deleteObjects(updateEndpoint, tb.fragmentsById.keys(), ps.source.graph).then(() => this.fibraSparqlService.post(graphStoreEndpoint, toTurtle(tb), ps.source.graph))
  }

}

angular.module('fibra.services.project-service', [
  'fibra.services.worker-service',
  'fibra.services.fibra-sparql-service'
])
  .config(($provide) => {
    $provide.service('projectService', ProjectService)
  })
