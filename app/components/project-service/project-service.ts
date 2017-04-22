'use strict'

import {ICitable, ICitableSource, CitableSource, Citable} from '../app/_datamodel/citable'
import {WorkerService} from '../worker-service/worker-service'
import {FibraService, UIState} from '../app/fibra-service'
import {Project} from './project'
import {ProjectSourceInfo} from '../project-sources-view/project-sources-view-component'
import {FibraSparqlService} from '../app/fibra-sparql-service'
import {PrimaryEndpointConfiguration} from './primary-endpoint-configuration'
import {RemoteEndpointConfiguration} from './remote-endpoint-configuration'
import {Schema} from './schema'
import {Map, IEMap, EMap} from '../collection-utils'
import {toTurtle} from '../misc-utils'
import {DataFactory} from '../app/_datamodel/rdf'
import {DataModel, Class, Property} from './data-model'


import s = fi.seco.sparql

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

  public static orderCitables(citables: ICitable[]): void {
    citables.sort((a, b) => (a['order'] ? a['order'] : Number.MAX_VALUE) - (b['order'] ? b['order'] : Number.MAX_VALUE))
    citables.forEach(rh => delete rh['order'])
  }

  constructor(private workerService: WorkerService, private fibraService: FibraService, private fibraSparqlService: FibraSparqlService, private $localStorage: any) {
    if (!$localStorage.projectSources)
      $localStorage.projectSources = []
    else $localStorage.projectSources.forEach(ps => { // upgrade of earlier format
      if (!ps.sparqlEndpoint) {
        ps.sparqlEndpoint = ps['endpoint']
        ps.updateEndpoint = ps['endpoint']
        ps.graphStoreEndpoint = ps['endpoint']
      }
    })
  }

  public getCurrentProject(): Project {
    return this.fibraService.getState().project
  }

  public setCurrentProject(project: Project): angular.IPromise<UIState> {
    return this.fibraService.dispatchAction(this.fibraService.setProject(project))
  }

  public getProjectSources(): ProjectSourceInfo[] {
    return this.$localStorage.projectSources
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

  public loadProject(source: ICitableSource, projectId: string): angular.IPromise<Project> {
    return this.workerService.call('projectWorkerService', 'loadProject', [source, projectId])
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
    let m: d3.Map<string> = new Map<string>()
    let prefixes: {} = {}
    ps.toTurtle(m, prefixes)
    return this.deleteObjects(updateEndpoint, m.keys(), ps.source.graph).then(() => this.fibraSparqlService.post(graphStoreEndpoint, toTurtle(prefixes, m), ps.source.graph))
  }

}

export class ProjectWorkerService {
  constructor(private fibraSparqlService: FibraSparqlService, private $q: angular.IQService) {}

  public loadPrimaryEndpointConfiguration(source: ICitableSource, templateId: string): angular.IPromise<PrimaryEndpointConfiguration> {
    return this.runSingleQuery(source, PrimaryEndpointConfiguration.primaryEndpointConfigurationQuery, templateId, new PrimaryEndpointConfiguration(templateId, source))
  }

  public listPrimaryEndpointConfigurations(source: ICitableSource): angular.IPromise<PrimaryEndpointConfiguration[]> {
    return this.runListQuery(source, PrimaryEndpointConfiguration.listPrimaryEndpointConfigurationsQuery, (id: string) => new PrimaryEndpointConfiguration(id, source))
  }

  public loadRemoteEndpointConfiguration(source: ICitableSource, templateId: string): angular.IPromise<RemoteEndpointConfiguration> {
    return this.runSingleQuery(source, RemoteEndpointConfiguration.remoteEndpointConfigurationQuery, templateId, new RemoteEndpointConfiguration(templateId, source))
  }

  public listArchiveEndpointConfigurations(source: ICitableSource): angular.IPromise<RemoteEndpointConfiguration[]> {
    return this.runListQuery(source, RemoteEndpointConfiguration.listArchiveEndpointConfigurationsQuery, (id: string) => new RemoteEndpointConfiguration(id, source))
  }

  public listAuthorityEndpointConfigurations(source: ICitableSource): angular.IPromise<RemoteEndpointConfiguration[]> {
    return this.runListQuery(source, RemoteEndpointConfiguration.listAuthorityEndpointConfigurationsQuery, (id: string) => new RemoteEndpointConfiguration(id, source))
  }

  public listProjects(source: ICitableSource): angular.IPromise<Project[]> {
    return this.runListQuery(source, Project.listProjectsQuery, (id: string) => new Project(id, source))
  }

  public listSchemas(source: ICitableSource): angular.IPromise<Schema[]> {
    return this.runListQuery(source, Schema.listSchemasQuery, (id: string) => new Schema(id, source))
  }

  public loadSchema(source: ICitableSource, id: string): angular.IPromise<Schema> {
    return this.runSingleQuery(source, Schema.schemaQuery, id, new Schema(id, source))
  }

  public loadDataModel(schemas: Schema[]): angular.IPromise<DataModel> {
    let dataModel: DataModel = new DataModel()
    let classes: IEMap<Class> = new EMap<Class>((id: string) => {
      let cl: Class = new Class(DataFactory.namedNode(id))
      dataModel.classMap.set(id, cl)
      return cl
    })
    let properties: IEMap<Property> = new EMap<Property>((id: string) => {
      let pr: Property = new Property(DataFactory.namedNode(id))
      dataModel.propertyMap.set(id, pr)
      return pr
    })
    let promises: angular.IPromise<void>[] = []
    schemas.forEach(schema => {
      promises.push(this.fibraSparqlService.query(schema.endpoint, schema.classQuery).then(response => {
        let conf: s.IBindingsToObjectConfiguration = {
          bindingTypes: { types: 'uniqueArray' },
          bindingConverters: {
            superClasses: (binding) => classes.goc(binding.value),
            subClasses: (binding) => classes.goc(binding.value),
            types: (binding) => classes.goc(binding.value),
            labels: (binding) => DataFactory.nodeFromBinding(binding),
            descriptions: (binding) => DataFactory.nodeFromBinding(binding),
          }
        }
        let tracker: s.UniqueObjectTracker = new s.UniqueObjectTracker()
        response.results.bindings.forEach(binding => s.SparqlService.bindingsToObject(binding, classes.goc(binding['id'].value), conf, tracker))
      }))
      promises.push(this.fibraSparqlService.query(schema.endpoint, schema.propertyQuery).then(response => {
        let conf: s.IBindingsToObjectConfiguration = {
          bindingTypes: { types: 'uniqueArray' },
          bindingConverters: {
            superProperties: (binding) => properties.goc(binding.value),
            subProperties: (binding) => properties.goc(binding.value),
            inverseProperty: (binding) => properties.goc(binding.value),
            types: (binding) => classes.goc(binding.value),
            domains: (binding) => classes.goc(binding.value),
            ranges: (binding) => classes.goc(binding.value),
            labels: (binding) => DataFactory.nodeFromBinding(binding),
            descriptions: (binding) => DataFactory.nodeFromBinding(binding),
          }
        }
        let tracker: s.UniqueObjectTracker = new s.UniqueObjectTracker()
        response.results.bindings.forEach(binding => s.SparqlService.bindingsToObject(binding, properties.goc(binding['id'].value), conf, tracker))
      }))
    })
    return this.$q.all(promises).then(() => {
      classes.values().forEach(cl => {
        cl.buildAsNodes()
        cl.superClasses.filter(spr => !spr.subClasses.find(opr => opr === cl)).forEach(spr => spr.subClasses.push(cl))
        cl.subClasses.filter(spr => !spr.superClasses.find(opr => opr === cl)).forEach(spr => spr.superClasses.push(cl))
      })
      classes.values().forEach(cl => {
        if (cl.superClasses.length === 0) dataModel.rootClasses.push(cl)
      })
      properties.values().forEach(pr => {
        pr.buildAsNodes()
        if (pr.inverseProperty) pr.inverseProperty.inverseProperty = pr
        pr.superProperties.filter(spr => !spr.subProperties.find(opr => opr === pr)).forEach(spr => spr.subProperties.push(pr))
        pr.subProperties.filter(spr => !spr.superProperties.find(opr => opr === pr)).forEach(spr => spr.superProperties.push(pr))
        pr.domains.forEach(dc => dc.properties.push(pr))
        pr.ranges.forEach(rc => rc.inverseProperties.push(pr))
      })
      properties.values().forEach(pr => {
        if (pr.superProperties.length === 0) dataModel.rootProperties.push(pr)
      })
      return dataModel
    })
  }

  public loadProject(source: ICitableSource, id: string): angular.IPromise<Project> {
    return this.runSingleQuery(source, Project.projectQuery, id, new Project(id, source)).then(p => {
      let promises: angular.IPromise<any>[] = []
      promises.push(this.$q.all(p.schemas.map(schema => this.loadSchema(schema.source, schema.id))).then(schemas => {
        p.schemas = schemas
        return this.loadDataModel(schemas).then(dm => p.dataModel = dm)
      }))
      let narche: RemoteEndpointConfiguration[] = []
      let nauthe: RemoteEndpointConfiguration[] = []
      p.archiveEndpoints.forEach(ae => promises.push(this.loadRemoteEndpointConfiguration(ae.source, ae.id).then(ae2 => narche.push(ae2))))
      p.authorityEndpoints.forEach(ae => promises.push(this.loadRemoteEndpointConfiguration(ae.source, ae.id).then(ae2 => nauthe.push(ae2))))
      return this.$q.all(promises).then(() => {
        p.archiveEndpoints = narche
        p.authorityEndpoints = nauthe
        return p
      })
    })
  }

  private runSingleQuery<T extends ICitable>(source: ICitableSource, tq: string, id: string, ps: T): angular.IPromise<T> {
    tq = source.graph ? tq.replace(/# STARTGRAPH/g, 'GRAPH <' + source.graph + '> {').replace(/# ENDGRAPH/g, '}') : tq.replace(/.*# STARTGRAPH\n/g, '').replace(/.*# ENDGRAPH\n/g, '')
    tq = tq.replace(/<ID>/g, '<' + id + '>')
    let deferred: angular.IDeferred<T> = this.$q.defer()
    this.fibraSparqlService.query(source.sparqlEndpoint, tq).then(response => {
      let conf: s.IBindingsToObjectConfiguration = {
        bindingTypes: { rightsHolders: 'uniqueArray', schemas: 'uniqueArray', authorityEndpoints: 'uniqueArray', archiveEndpoints: 'uniqueArray'},
        bindingConverters: {
          types: (binding) => DataFactory.nodeFromBinding(binding),
          labels: (binding) => DataFactory.nodeFromBinding(binding),
          descriptions: (binding) => DataFactory.nodeFromBinding(binding),
          schemas: (binding) => new Schema(binding.value, CitableSource.clone(source)),
          authorityEndpoints: (binding) => new RemoteEndpointConfiguration(binding.value, CitableSource.clone(source)),
          archiveEndpoints: (binding) => new RemoteEndpointConfiguration(binding.value, CitableSource.clone(source)),
          rightsHolders_labels: (binding) => DataFactory.nodeFromBinding(binding),
          rightsHolders_descriptions: (binding) => DataFactory.nodeFromBinding(binding),
          rightsHolders: (binding) => new Citable(binding.value, source)
        }
      }
      let tracker: s.UniqueObjectTracker = new s.UniqueObjectTracker()
      response.results.bindings.forEach(b => s.SparqlService.bindingsToObject(b, ps, conf, tracker))
      ProjectService.orderCitables(ps.rightsHolders)
      deferred.resolve(ps)
    })
    return deferred.promise
  }

  private runListQuery<T extends ICitable>(source: ICitableSource, lq: string, oc: (id: string) => T): angular.IPromise<T[]> {
    lq = source.graph ? lq.replace(/# STARTGRAPH/g, 'GRAPH <' + source.graph + '> {').replace(/# ENDGRAPH/g, '}') : lq.replace(/.*# STARTGRAPH\n/g, '').replace(/.*# ENDGRAPH\n/g, '')
    return this.fibraSparqlService.query(source.sparqlEndpoint, lq).then(
      response => {
        let projects: EMap<T> = new EMap<T>(oc)
        let conf: s.IBindingsToObjectConfiguration = {
          bindingTypes: { rightsHolders: 'uniqueArray', schemas: 'uniqueArray', authorityEndpoints: 'uniqueArray', archiveEndpoints: 'uniqueArray'},
          bindingConverters: {
            types: (binding) => DataFactory.nodeFromBinding(binding),
            labels: (binding) => DataFactory.nodeFromBinding(binding),
            descriptions: (binding) => DataFactory.nodeFromBinding(binding),
            schemas: (binding) => new Schema(binding.value, CitableSource.clone(source)),
            authorityEndpoints: (binding) => new RemoteEndpointConfiguration(binding.value, CitableSource.clone(source)),
            archiveEndpoints: (binding) => new RemoteEndpointConfiguration(binding.value, CitableSource.clone(source)),
            rightsHolders_labels: (binding) => DataFactory.nodeFromBinding(binding),
            rightsHolders_descriptions: (binding) => DataFactory.nodeFromBinding(binding),
            rightsHolders: (binding) => new Citable(binding.value, source)
          }
        }
        let tracker: s.UniqueObjectTracker = new s.UniqueObjectTracker()
        response.results.bindings.forEach(binding => s.SparqlService.bindingsToObject(binding, projects.goc(binding['id'].value), conf, tracker))
        projects.values().forEach(p => ProjectService.orderCitables(p.rightsHolders))
        return projects.values()
      })
  }

}