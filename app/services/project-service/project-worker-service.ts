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
import {DataFactory, ONodeSet} from '../../models/rdf'
import {DataModel, Class, Property} from './data-model'
import { ILiteral } from 'models/rdfjs';
import { SerializationService } from 'services/worker-service/serialization-service';

export class ProjectWorkerService {
  public static orderCitables(citables: ICitable[]): void {
    citables.sort((a, b) => (a['order'] ? a['order'] : Number.MAX_VALUE) - (b['order'] ? b['order'] : Number.MAX_VALUE))
    citables.forEach(rh => delete rh['order'])
  }

  constructor(private fibraSparqlService: FibraSparqlService, private serializationService: SerializationService, private $q: angular.IQService) {}

  public loadPrimaryEndpointConfiguration(source: ICitableSource, templateId: string): angular.IPromise<PrimaryEndpointConfiguration> {
    return this.runSingleQuery(source, PrimaryEndpointConfiguration.listPrimaryEndpointConfigurationsQuery, templateId, new PrimaryEndpointConfiguration(templateId, source))
  }

  public listPrimaryEndpointConfigurations(source: ICitableSource): angular.IPromise<PrimaryEndpointConfiguration[]> {
    return this.runListQuery(source, PrimaryEndpointConfiguration.listPrimaryEndpointConfigurationsQuery, (id: string) => new PrimaryEndpointConfiguration(id, source))
  }

  public loadRemoteEndpointConfiguration(source: ICitableSource, templateId: string): angular.IPromise<RemoteEndpointConfiguration> {
    return this.runSingleQuery(source, RemoteEndpointConfiguration.listRemoteEndpointConfigurationsQuery, templateId, new RemoteEndpointConfiguration(templateId, source))
  }

  public listArchiveEndpointConfigurations(source: ICitableSource): angular.IPromise<RemoteEndpointConfiguration[]> {
    return this.runListQuery(source, RemoteEndpointConfiguration.listRemoteEndpointConfigurationsQuery.replace(/# TYPELIMIT/g, '?id a fibra:ArchiveEndpointConfiguration'), (id: string) => new RemoteEndpointConfiguration(id, source))
  }

  public listAuthorityEndpointConfigurations(source: ICitableSource): angular.IPromise<RemoteEndpointConfiguration[]> {
    return this.runListQuery(source, RemoteEndpointConfiguration.listRemoteEndpointConfigurationsQuery.replace(/# TYPELIMIT/g, '?id a fibra:AuthorityEndpointConfiguration'), (id: string) => new RemoteEndpointConfiguration(id, source))
  }

  public listProjects(source: ICitableSource): angular.IPromise<Project[]> {
    return this.runListQuery(source, Project.listProjectsQuery, (id: string) => new Project(id, source))
  }

  public listSchemas(source: ICitableSource): angular.IPromise<Schema[]> {
    return this.runListQuery(source, Schema.listSchemasQuery, (id: string) => new Schema(id, source))
  }

  public loadSchema(source: ICitableSource, id: string): angular.IPromise<Schema> {
    return this.runSingleQuery(source, Schema.listSchemasQuery, id, new Schema(id, source))
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
      bindingConverters: {
        superClasses: (binding) => classes.goc(binding.value),
        subClasses: (binding) => classes.goc(binding.value),
        types: (binding) => classes.goc(binding.value),
        labels: (binding) => DataFactory.nodeFromBinding(binding),
        descriptions: (binding) => DataFactory.nodeFromBinding(binding),
      },
      bindingHandlers: {
        types: (obj, prop, val) => obj[prop].add(val),
        labels: (obj, prop, val) => obj[prop].add(val),
        descriptions: (obj, prop, val) => obj[prop].add(val),
        superClasses: (obj, prop, val) => obj[prop].add(val),
        subClasses: (obj, prop, val) => obj[prop].add(val)
      }
    }
    let propertyConf: IBindingsToObjectConfiguration = {
      bindingConverters: {
        superProperties: (binding) => properties.goc(binding.value),
        subProperties: (binding) => properties.goc(binding.value),
        inverseProperty: (binding) => properties.goc(binding.value),
        types: (binding) => classes.goc(binding.value),
        domains: (binding) => classes.goc(binding.value),
        ranges: (binding) => classes.goc(binding.value),
        labels: (binding) => DataFactory.nodeFromBinding(binding),
        descriptions: (binding) => DataFactory.nodeFromBinding(binding)
      },
      bindingHandlers: {
        superProperties: (obj, prop, val) => obj[prop].add(val),
        subProperties: (obj, prop, val) => obj[prop].add(val),
        types: (obj, prop, val) => obj[prop].add(val),
        domains: (obj, prop, val) => obj[prop].add(val),
        ranges: (obj, prop, val) => obj[prop].add(val),
        labels: (obj, prop, val) => obj[prop].add(val),
        descriptions: (obj, prop, val) => obj[prop].add(val)
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
        cl.superClasses.values().filter(spr => !spr.subClasses.find(opr => opr === cl)).forEach(spr => spr.subClasses.add(cl))
        cl.subClasses.values().filter(spr => !spr.superClasses.find(opr => opr === cl)).forEach(spr => spr.superClasses.add(cl))
      })
      classes.values().forEach(cl => {
        if (cl.superClasses.empty()) dataModel.rootClasses.push(cl)
      })
      properties.values().forEach(pr => {
        if (pr.inverseProperty) pr.inverseProperty.inverseProperty = pr
        pr.superProperties.values().filter(spr => !spr.subProperties.find(opr => opr === pr)).forEach(spr => spr.subProperties.add(pr))
        pr.subProperties.values().filter(spr => !spr.superProperties.find(opr => opr === pr)).forEach(spr => spr.superProperties.add(pr))
        pr.domains.each(dc => dc.properties.add(pr))
        pr.ranges.each(rc => rc.inverseProperties.add(pr))
      })
      properties.values().forEach(pr => {
        if (pr.superProperties.empty()) dataModel.rootProperties.push(pr)
      })
      return dataModel
    })
  }

  public loadProject(source: ICitableSource, id: string, loadFull: boolean): angular.IPromise<Project> {
    let q: angular.IPromise<Project> = this.runSingleQuery(source, Project.listProjectsQuery, id, new Project(id, source))
    if (!loadFull) return q; else return q.then(p => {
      let promises: angular.IPromise<any>[] = []
      promises.push(this.$q.all(p.schemas.map(schema => this.loadSchema(schema.source, schema.id))).then(schemas => p.schemas = schemas))
      promises.push(this.$q.all(p.archiveEndpoints.map(ae => this.loadRemoteEndpointConfiguration(ae.source, ae.id))).then(aes => p.archiveEndpoints = aes))
      promises.push(this.$q.all(p.authorityEndpoints.map(ae => this.loadRemoteEndpointConfiguration(ae.source, ae.id))).then(aes => p.authorityEndpoints = aes))
      return this.$q.all(promises).then(() => this.loadDataModel(p.schemas, p.archiveEndpoints.concat(p.authorityEndpoints)).then(dm => p.dataModel = dm).then(() => p))
    })
  }

  private runSingleQuery<T extends ICitable>(source: ICitableSource, tq: string, id: string, ps: T): angular.IPromise<T> {
    return this.runQuery(source, tq, id, () => ps).then(a => a[0])
  }

  private runListQuery<T extends ICitable>(source: ICitableSource, lq: string, oc: (id: string) => T): angular.IPromise<T[]> {
    return this.runQuery(source, lq, null, oc)
  }

  private runQuery<T extends ICitable>(source: ICitableSource, lq: string, id: string, oc: (id: string) => T): angular.IPromise<T[]> {
    lq = source.graph ? lq.replace(/# STARTGRAPH/g, 'GRAPH <' + source.graph + '> {').replace(/# ENDGRAPH/g, '}') : lq.replace(/.*# STARTGRAPH\n/g, '').replace(/.*# ENDGRAPH\n/g, '')
    if (id) lq = lq.replace(/# VALUE/g, 'VALUES ?id { <' + id + '> }').replace(/<ID>/g, '<' + id + '>')
    return this.fibraSparqlService.query(source.sparqlEndpoint, lq).then(
      response => {
        let projects: EMap<T> = new EMap<T>(oc)
        let conf: IBindingsToObjectConfiguration = {
          bindingTypes: { rightsHolders: 'uniqueArray', sourceClassSettings: 'single', layouts: 'single', schemas: 'uniqueArray', authorityEndpoints: 'uniqueArray', archiveEndpoints: 'uniqueArray'},
          bindingConverters: {
            dateCreated: (binding) => new Date(binding.value),
            types: (binding) => DataFactory.nodeFromBinding(binding),
            labels: (binding) => DataFactory.nodeFromBinding(binding),
            descriptions: (binding) => DataFactory.nodeFromBinding(binding),
            schemas: (binding) => new Schema(binding.value, source),
            authorityEndpoints: (binding) => new RemoteEndpointConfiguration(binding.value, source),
            archiveEndpoints: (binding) => new RemoteEndpointConfiguration(binding.value, source),
            rightsHolders_labels: (binding) => DataFactory.nodeFromBinding(binding),
            rightsHolders_descriptions: (binding) => DataFactory.nodeFromBinding(binding),
            rightsHolders: (binding) => new Citable(binding.value, source),
            compatibleSchemas: (binding) => DataFactory.nodeFromBinding(binding),
            sourceClassSettings: (binding) => this.serializationService.fromJson(binding.value),
            layouts: (binding) => this.serializationService.fromJson(binding.value)
          },
          bindingHandlers: {
            types: (obj, prop, value) => obj[prop].add(value),
            labels: (obj, prop, value) => obj[prop].add(value),
            descriptions: (obj, prop, value) => obj[prop].add(value)
          }
        }
        let tracker: UniqueObjectTracker = new UniqueObjectTracker()
        response.results.bindings.forEach(binding => SparqlService.bindingsToObject(binding, projects.goc(binding['id'].value), conf, binding['id'].value, tracker))
        projects.values().forEach(p => ProjectWorkerService.orderCitables(p.rightsHolders))
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
