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
import {TurtleBuilder} from '../../components/misc-utils'
import {DataFactory, FIBRA} from '../../models/rdf'
import {DataModel, Class, Property} from './data-model'
import { SerializationService } from 'services/worker-service/serialization-service';

export class ProjectService {

  private static updateQuery: string = `# PREFIXES
DELETE {
# STARTGRAPH
  # PATTERNS
# ENDGRAPH
}
INSERT {
# STARTGRAPH
  # DATA
# ENDGRAPH
}
WHERE {
{
# STARTGRAPH
  # PATTERNS
# ENDGRAPH
} UNION {}
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

  public updateObjects(updateEndpoint: string, deleteIds: string[], graph?: string, prefixes?: string, update?: string): angular.IPromise<{}> {
    let dq: string = ProjectService.updateQuery
    if (prefixes) dq = dq.replace(/# PREFIXES/g, prefixes)
    if (graph) dq = dq.replace(/# STARTGRAPH/g, 'GRAPH <' + graph + '> {').replace(/# ENDGRAPH/g, '}')
    dq = dq.replace(/# PATTERNS/g, deleteIds.reduce((acc: string, id: string, index: number) => acc + ' <' + id + '> ?p' + index + ' ?o' + index + ' .', ''))
    if (update) dq = dq.replace(/# DATA/g, update)
    return this.fibraSparqlService.update(updateEndpoint, dq)
  }

  public deleteObject(updateEndpoint: string, id: string, graph?: string): angular.IPromise<{}> {
    return this.updateObjects(updateEndpoint, [id], graph)
  }

  public saveCitable(updateEndpoint: string, graphStoreEndpoint: string, ps: ICitable): angular.IPromise<{}> {
    let tb: TurtleBuilder = new TurtleBuilder()
    ps.toTurtle(tb)
    return this.updateObjects(updateEndpoint, tb.fragmentsById.keys(), ps.source.graph, tb.sparqlPrefixes(), tb.toTurtle(false))
  }

}

angular.module('fibra.services.project-service', [
  'fibra.services.worker-service',
  'fibra.services.fibra-sparql-service'
])
  .config(($provide) => {
    $provide.service('projectService', ProjectService)
  })
