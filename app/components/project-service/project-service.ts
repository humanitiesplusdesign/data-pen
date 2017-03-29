namespace fibra {
  'use strict'

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

    public listPrimaryEndpointConfigurations(endpoint: string, graph?: string): angular.IPromise<PrimaryEndpointConfiguration[]> {
      return this.workerService.call('projectWorkerService', 'listPrimaryEndpointConfigurations', [endpoint, graph])
    }

    public loadPrimaryEndpointConfiguration(endpoint: string, templateId: string, graph?: string): angular.IPromise<PrimaryEndpointConfiguration> {
      return this.workerService.call('projectWorkerService', 'loadPrimaryEndpointConfiguration', [endpoint, templateId, graph])
    }

    public listArchiveEndpointConfigurations(endpoint: string, graph?: string): angular.IPromise<RemoteEndpointConfiguration[]> {
      return this.workerService.call('projectWorkerService', 'listArchiveEndpointConfigurations', [endpoint, graph])
    }

    public listAuthorityEndpointConfigurations(endpoint: string, graph?: string): angular.IPromise<RemoteEndpointConfiguration[]> {
      return this.workerService.call('projectWorkerService', 'listAuthorityEndpointConfigurations', [endpoint, graph])
    }

    public loadRemoteEndpointConfiguration(endpoint: string, templateId: string, graph?: string): angular.IPromise<RemoteEndpointConfiguration> {
      return this.workerService.call('projectWorkerService', 'loadRemoteEndpointConfiguration', [endpoint, templateId, graph])
    }

    public listSchemas(endpoint: string, graph?: string): angular.IPromise<Schema[]> {
      return this.workerService.call('projectWorkerService', 'listSchemas', [endpoint, graph])
    }

    public loadSchema(endpoint: string, id: string, graph?: string): angular.IPromise<Schema> {
      return this.workerService.call('projectWorkerService', 'loadSchema', [endpoint, id, graph])
    }

    public listProjects(endpoint: string, graph?: string): angular.IPromise<Project[]> {
      return this.workerService.call('projectWorkerService', 'listProjects', [endpoint, graph])
    }

    public loadProject(endpoint: string, projectId: string, graph?: string): angular.IPromise<Project> {
      return this.workerService.call('projectWorkerService', 'loadProject', [endpoint, projectId, graph])
    }

    public deleteCitable(citable: ICitable): angular.IPromise<{}> {
      return this.deleteObject(citable.sourceEndpoint, citable.id, citable.sourceGraph)
    }

    public deleteObjects(endpoint: string, ids: string[], graph?: string): angular.IPromise<{}> {
      let dq: string = graph ? ProjectService.deleteQuery.replace(/# STARTGRAPH/g, 'GRAPH <' + graph + '> {').replace(/# ENDGRAPH/g, '}') : ProjectService.deleteQuery.replace(/.*# STARTGRAPH\n/g, '').replace(/.*# ENDGRAPH\n/g, '')
      dq = dq.replace(/# PATTERNS/g, ids.reduce((acc: string, id: string, index: number) => acc + ' <' + id + '> ?p' + index + ' ?o' + index + ' .', ''))
      return this.fibraSparqlService.update(endpoint, dq)
    }

    public deleteObject(endpoint: string, id: string, graph?: string): angular.IPromise<{}> {
      return this.deleteObjects(endpoint, [id], graph)
    }

    public saveCitable(ps: ICitable): angular.IPromise<{}> {
      let m: d3.Map<string> = new Map<string>()
      let prefixes: {} = {}
      ps.toTurtle(m, prefixes)
      return this.deleteObjects(ps.sourceEndpoint, m.keys(), ps.sourceGraph).then(() => this.fibraSparqlService.post(ps.sourceEndpoint, toTurtle(prefixes, m), ps.sourceGraph))
    }

  }

  export class ProjectWorkerService {
    constructor(private fibraSparqlService: FibraSparqlService, private $q: angular.IQService) {}

    public loadPrimaryEndpointConfiguration(endpoint: string, templateId: string, graph?: string): angular.IPromise<PrimaryEndpointConfiguration> {
      return this.runSingleQuery(endpoint, PrimaryEndpointConfiguration.primaryEndpointConfigurationQuery, templateId, new PrimaryEndpointConfiguration(templateId, endpoint, graph), graph)
    }

    public listPrimaryEndpointConfigurations(endpoint: string, graph?: string): angular.IPromise<PrimaryEndpointConfiguration[]> {
      return this.runListQuery(endpoint, PrimaryEndpointConfiguration.listPrimaryEndpointConfigurationsQuery, (id: string) => new PrimaryEndpointConfiguration(id, endpoint, graph), graph)
    }

    public loadRemoteEndpointConfiguration(endpoint: string, templateId: string, graph?: string): angular.IPromise<RemoteEndpointConfiguration> {
      return this.runSingleQuery(endpoint, RemoteEndpointConfiguration.remoteEndpointConfigurationQuery, templateId, new RemoteEndpointConfiguration(templateId, endpoint, graph), graph)
    }

    public listArchiveEndpointConfigurations(endpoint: string, graph?: string): angular.IPromise<RemoteEndpointConfiguration[]> {
      return this.runListQuery(endpoint, RemoteEndpointConfiguration.listArchiveEndpointConfigurationsQuery, (id: string) => new RemoteEndpointConfiguration(id, endpoint, graph), graph)
    }

    public listAuthorityEndpointConfigurations(endpoint: string, graph?: string): angular.IPromise<RemoteEndpointConfiguration[]> {
      return this.runListQuery(endpoint, RemoteEndpointConfiguration.listAuthorityEndpointConfigurationsQuery, (id: string) => new RemoteEndpointConfiguration(id, endpoint, graph), graph)
    }

    public listProjects(endpoint: string, graph?: string): angular.IPromise<Project[]> {
      return this.runListQuery(endpoint, Project.listProjectsQuery, (id: string) => new Project(id, endpoint, graph), graph)
    }

    public listSchemas(endpoint: string, graph?: string): angular.IPromise<Schema[]> {
      return this.runListQuery(endpoint, Schema.listSchemasQuery, (id: string) => new Schema(id, endpoint, graph), graph)
    }

    public loadSchema(endpoint: string, id: string, graph?: string): angular.IPromise<Schema> {
      return this.runSingleQuery(endpoint, Schema.schemaQuery, id, new Schema(id, endpoint, graph), graph)
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
            bindingTypes: { types: {} },
            bindingConverters: {
              superClasses: (binding) => classes.goc(binding.value),
              subClasses: (binding) => classes.goc(binding.value),
              types: (binding) => classes.goc(binding.value),
              labels: (binding) => DataFactory.nodeFromBinding(binding),
              descriptions: (binding) => DataFactory.nodeFromBinding(binding),
            }
          }
          response.results.bindings.forEach(binding => s.SparqlService.bindingsToObject(binding, classes.goc(binding['id'].value), conf))
        }))
        promises.push(this.fibraSparqlService.query(schema.endpoint, schema.propertyQuery).then(response => {
          let conf: s.IBindingsToObjectConfiguration = {
            bindingTypes: { types: {} },
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
          response.results.bindings.forEach(binding => s.SparqlService.bindingsToObject(binding, properties.goc(binding['id'].value), conf))
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

    public loadProject(endpoint: string, id: string, graph?: string): angular.IPromise<Project> {
      return this.runSingleQuery(endpoint, Project.projectQuery, id, new Project(id), graph).then(p => {
        let promises: angular.IPromise<any>[] = []
        promises.push(this.$q.all(p.schemas.map(schema => this.loadSchema(schema.sourceEndpoint, schema.id, schema.sourceGraph))).then(schemas => {
          p.schemas = schemas
          return this.loadDataModel(schemas).then(dm => p.dataModel = dm)
        }))
        let narche: RemoteEndpointConfiguration[] = []
        let nauthe: RemoteEndpointConfiguration[] = []
        p.archiveEndpoints.forEach(ae => promises.push(this.loadRemoteEndpointConfiguration(ae.sourceEndpoint, ae.id, ae.sourceGraph).then(ae2 => narche.push(ae2))))
        p.authorityEndpoints.forEach(ae => promises.push(this.loadRemoteEndpointConfiguration(ae.sourceEndpoint, ae.id, ae.sourceGraph).then(ae2 => nauthe.push(ae2))))
        return this.$q.all(promises).then(() => {
          p.archiveEndpoints = narche
          p.authorityEndpoints = nauthe
          return p
        })
      })
    }

    private runSingleQuery<T extends ICitable>(endpoint: string, tq: string, id: string, ps: T, graph?: string): angular.IPromise<T> {
      tq = graph ? tq.replace(/# STARTGRAPH/g, 'GRAPH <' + graph + '> {').replace(/# ENDGRAPH/g, '}') : tq.replace(/.*# STARTGRAPH\n/g, '').replace(/.*# ENDGRAPH\n/g, '')
      tq = tq.replace(/<ID>/g, '<' + id + '>')
      let deferred: angular.IDeferred<T> = this.$q.defer()
      this.fibraSparqlService.query(endpoint, tq).then(response => {
        ps.sourceEndpoint = endpoint
        ps.sourceGraph = graph
        let conf: s.IBindingsToObjectConfiguration = {
          bindingTypes: { rightsHolders: {}, schemas: {}, authorityEndpoints: {}, archiveEndpoints: {}},
          bindingConverters: {
            types: (binding) => DataFactory.nodeFromBinding(binding),
            labels: (binding) => DataFactory.nodeFromBinding(binding),
            descriptions: (binding) => DataFactory.nodeFromBinding(binding),
            schemas: (binding) => new Schema(binding.value, endpoint, graph),
            authorityEndpoints: (binding) => new RemoteEndpointConfiguration(binding.value, endpoint, graph),
            archiveEndpoints: (binding) => new RemoteEndpointConfiguration(binding.value, endpoint, graph),
            rightsHolderslabels: (binding) => DataFactory.nodeFromBinding(binding),
            rightsHoldersdescriptions: (binding) => DataFactory.nodeFromBinding(binding),
            rightsHolders: (binding) => new Citable(binding.value, endpoint, graph)
          },
          subObjectPrefixes: { rightsHolders: {}, schemas: {}, authorityEndpoints: {}, archiveEndpoints: {}}
        }
        response.results.bindings.forEach(b => s.SparqlService.bindingsToObject(b, ps, conf))
        ProjectService.orderCitables(ps.rightsHolders)
        deferred.resolve(ps)
      })
      return deferred.promise
    }

    private runListQuery<T extends ICitable>(endpoint: string, lq: string, oc: (id: string) => T, graph?: string): angular.IPromise<T[]> {
      lq = graph ? lq.replace(/# STARTGRAPH/g, 'GRAPH <' + graph + '> {').replace(/# ENDGRAPH/g, '}') : lq.replace(/.*# STARTGRAPH\n/g, '').replace(/.*# ENDGRAPH\n/g, '')
      return this.fibraSparqlService.query(endpoint, lq).then(
        response => {
          let projects: EMap<T> = new EMap<T>((id: string) => {
            let ret: T = oc(id)
            ret.sourceEndpoint = endpoint
            ret.sourceGraph = graph
            return ret
          })
          let conf: s.IBindingsToObjectConfiguration = {
            bindingTypes: { rightsHolders: {}, schemas: {}, authorityEndpoints: {}, archiveEndpoints: {}},
            bindingConverters: {
              types: (binding) => DataFactory.nodeFromBinding(binding),
              labels: (binding) => DataFactory.nodeFromBinding(binding),
              descriptions: (binding) => DataFactory.nodeFromBinding(binding),
              schemas: (binding) => new Schema(binding.value, endpoint, graph),
              authorityEndpoints: (binding) => new RemoteEndpointConfiguration(binding.value, endpoint, graph),
              archiveEndpoints: (binding) => new RemoteEndpointConfiguration(binding.value, endpoint, graph),
              rightsHolderslabels: (binding) => DataFactory.nodeFromBinding(binding),
              rightsHoldersdescriptions: (binding) => DataFactory.nodeFromBinding(binding),
              rightsHolders: (binding) => new Citable(binding.value, endpoint, graph)
            },
            subObjectPrefixes: { rightsHolders: {}, schemas: {}, authorityEndpoints: {}, archiveEndpoints: {}}
          }
          response.results.bindings.forEach(binding => s.SparqlService.bindingsToObject(binding, projects.goc(binding['id'].value), conf))
          projects.values().forEach(p => ProjectService.orderCitables(p.rightsHolders))
          return projects.values()
        })
    }

  }

}
