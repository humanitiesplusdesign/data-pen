'use strict'
import * as angular from 'angular'

import {ICitable, ICitableSource, CitableSource, Citable} from '../../models/citable'
import {Project} from './project'
import {ProjectSourceInfo} from '../../components/project-sources-view/project-sources-view-component'
import {SparqlService, IBindingsToObjectConfiguration, UniqueObjectTracker} from 'angular-sparql-service'
import {FibraSparqlService} from '../../services/fibra-sparql-service'
import {PrimaryEndpointConfiguration} from './primary-endpoint-configuration'
import {RemoteEndpointConfiguration} from './remote-endpoint-configuration'
import {Schema} from './schema'
import {FMap, IEMap, EMap} from '../../components/collection-utils'
import {toTurtle} from '../../components/misc-utils'
import {DataFactory} from '../../models/rdf'
import {DataModel, Class, Property} from './data-model'

export class ProjectWorkerService {
  public static orderCitables(citables: ICitable[]): void {
    citables.sort((a, b) => (a['order'] ? a['order'] : Number.MAX_VALUE) - (b['order'] ? b['order'] : Number.MAX_VALUE))
    citables.forEach(rh => delete rh['order'])
  }

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

  public loadDataModel(schemas: Schema[], endpoints: RemoteEndpointConfiguration[]): angular.IPromise<DataModel> {
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
    let classConf: IBindingsToObjectConfiguration = {
      bindingTypes: { types: 'uniqueArray' },
      bindingConverters: {
        superClasses: (binding) => classes.goc(binding.value),
        subClasses: (binding) => classes.goc(binding.value),
        types: (binding) => classes.goc(binding.value),
        labels: (binding) => DataFactory.nodeFromBinding(binding),
        descriptions: (binding) => DataFactory.nodeFromBinding(binding),
      }
    }
    let propertyConf: IBindingsToObjectConfiguration = {
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
    let promises: angular.IPromise<void>[] = []
    schemas.forEach(schema => {
      endpoints.forEach(ep => {
        if (ep.schemaEndpoint && ep.classQuery) {
          promises.push(this.fibraSparqlService.query(ep.schemaEndpoint, ep.classQuery).then(response => {
            let tracker: UniqueObjectTracker = new UniqueObjectTracker()
            response.results.bindings.forEach(binding => SparqlService.bindingsToObject(binding, classes.goc(binding['id'].value), classConf, binding['id'].value, tracker))
          }))
          promises.push(this.fibraSparqlService.query(ep.schemaEndpoint, ep.propertyQuery).then(response => {
            let tracker: UniqueObjectTracker = new UniqueObjectTracker()
            response.results.bindings.forEach(binding => SparqlService.bindingsToObject(binding, properties.goc(binding['id'].value), propertyConf, binding['id'].value, tracker))
          }))
      }})
      promises.push(this.fibraSparqlService.query(schema.endpoint, schema.classQuery).then(response => {
        let tracker: UniqueObjectTracker = new UniqueObjectTracker()
        response.results.bindings.forEach(binding => SparqlService.bindingsToObject(binding, classes.goc(binding['id'].value), classConf, binding['id'].value, tracker))
      }))
      promises.push(this.fibraSparqlService.query(schema.endpoint, schema.propertyQuery).then(response => {
        let tracker: UniqueObjectTracker = new UniqueObjectTracker()
        response.results.bindings.forEach(binding => SparqlService.bindingsToObject(binding, properties.goc(binding['id'].value), propertyConf, binding['id'].value, tracker))
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

  public loadProject(source: ICitableSource, id: string, loadFull: boolean): angular.IPromise<Project> {
    let q: angular.IPromise<Project> = this.runSingleQuery(source, Project.projectQuery, id, new Project(id, source))
    if (!loadFull) return q; else return q.then(p => {
      let promises: angular.IPromise<any>[] = []
      promises.push(this.$q.all(p.schemas.map(schema => this.loadSchema(schema.source, schema.id))).then(schemas => {
        p.schemas = schemas
        return this.loadDataModel(schemas, p.archiveEndpoints.concat(p.authorityEndpoints)).then(dm => p.dataModel = dm)
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
      let conf: IBindingsToObjectConfiguration = {
        bindingTypes: { rightsHolders: 'uniqueArray', schemas: 'uniqueArray', compatibleSchemas: 'uniqueArray', authorityEndpoints: 'uniqueArray', archiveEndpoints: 'uniqueArray'},
        bindingConverters: {
          dateCreated: (binding) => new Date(binding.value),
          types: (binding) => DataFactory.nodeFromBinding(binding),
          labels: (binding) => DataFactory.nodeFromBinding(binding),
          descriptions: (binding) => DataFactory.nodeFromBinding(binding),
          schemas: (binding) => new Schema(binding.value, CitableSource.clone(source)),
          authorityEndpoints: (binding) => new RemoteEndpointConfiguration(binding.value, CitableSource.clone(source)),
          archiveEndpoints: (binding) => new RemoteEndpointConfiguration(binding.value, CitableSource.clone(source)),
          rightsHolders_labels: (binding) => DataFactory.nodeFromBinding(binding),
          rightsHolders_descriptions: (binding) => DataFactory.nodeFromBinding(binding),
          rightsHolders: (binding) => new Citable(binding.value, source),
          compatibleSchemas: (binding) => DataFactory.nodeFromBinding(binding)
        }
      }
      let tracker: UniqueObjectTracker = new UniqueObjectTracker()
      response.results.bindings.forEach(b => SparqlService.bindingsToObject(b, ps, conf, id, tracker))
      ProjectWorkerService.orderCitables(ps.rightsHolders)
      deferred.resolve(ps)
    })
    return deferred.promise
  }

  private runListQuery<T extends ICitable>(source: ICitableSource, lq: string, oc: (id: string) => T): angular.IPromise<T[]> {
    lq = source.graph ? lq.replace(/# STARTGRAPH/g, 'GRAPH <' + source.graph + '> {').replace(/# ENDGRAPH/g, '}') : lq.replace(/.*# STARTGRAPH\n/g, '').replace(/.*# ENDGRAPH\n/g, '')
    return this.fibraSparqlService.query(source.sparqlEndpoint, lq).then(
      response => {
        console.log(response)
        let projects: EMap<T> = new EMap<T>(oc)
        let conf: IBindingsToObjectConfiguration = {
          bindingTypes: { rightsHolders: 'uniqueArray', schemas: 'uniqueArray', compatibleSchemas: 'uniqueArray', authorityEndpoints: 'uniqueArray', archiveEndpoints: 'uniqueArray'},
          bindingConverters: {
            dateCreated: (binding) => new Date(binding.value),
            types: (binding) => DataFactory.nodeFromBinding(binding),
            labels: (binding) => DataFactory.nodeFromBinding(binding),
            descriptions: (binding) => DataFactory.nodeFromBinding(binding),
            schemas: (binding) => new Schema(binding.value, CitableSource.clone(source)),
            authorityEndpoints: (binding) => new RemoteEndpointConfiguration(binding.value, CitableSource.clone(source)),
            archiveEndpoints: (binding) => new RemoteEndpointConfiguration(binding.value, CitableSource.clone(source)),
            rightsHolders_labels: (binding) => DataFactory.nodeFromBinding(binding),
            rightsHolders_descriptions: (binding) => DataFactory.nodeFromBinding(binding),
            rightsHolders: (binding) => new Citable(binding.value, source),
            compatibleSchemas: (binding) => DataFactory.nodeFromBinding(binding)
          }
        }
        let tracker: UniqueObjectTracker = new UniqueObjectTracker()
        response.results.bindings.forEach(binding => SparqlService.bindingsToObject(binding, projects.goc(binding['id'].value), conf, binding['id'].value, tracker))
        projects.values().forEach(p => ProjectWorkerService.orderCitables(p.rightsHolders))
        console.log(projects.values())
        return projects.values()
      })
  }
}

angular.module('fibra.services.project-service', [
  'fibra.services.fibra-sparql-service'
])
  .config(($provide) => {
    $provide.service('projectWorkerService', ProjectWorkerService)
  })
