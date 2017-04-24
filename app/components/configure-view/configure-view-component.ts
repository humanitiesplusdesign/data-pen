'use strict'

import {Project} from '../project-service/project'
import {ProjectSourceInfo} from '../project-sources-view/project-sources-view-component'
import {PrimaryEndpointConfiguration} from '../project-service/primary-endpoint-configuration'
import {RemoteEndpointConfiguration} from '../project-service/remote-endpoint-configuration'
import {TreeNode} from '../tree/tree-component'
import {Schema} from '../project-service/schema'
import {ProjectService} from '../project-service/project-service'
import {FibraService} from '../../services/fibra-service'
import {UUID} from '../misc-utils'
import {DataFactory} from '../../models/rdf'
import {SparqlTreeService} from '../sparql-tree-service'

export class ConfigureViewComponentController implements angular.IComponentController {
  public project: Project
  public projectSources: ProjectSourceInfo[]
  public projectSource: ProjectSourceInfo
  public primaryEndpointConfigurations: PrimaryEndpointConfiguration[] = []
  public statistics: {[id: string]: TreeNode[]} = {}
  public selectedAuthorities: {[id: string]: boolean} = {}
  public selectedArchives: {[id: string]: boolean} = {}
  public selectedSchemas: {[id: string]: boolean} = {}
  public selectedTemplate: PrimaryEndpointConfiguration
  public schemas: Schema[] = []
  public authorities: RemoteEndpointConfiguration[] = []
  public archives: RemoteEndpointConfiguration[] = []

  public saveAndOpen(): void {
    this.project.authorityEndpoints = this.authorities.filter(a => this.selectedAuthorities[a.id])
    this.project.archiveEndpoints = this.archives.filter(a => this.selectedArchives[a.id])
    this.project.schemas = this.schemas.filter(a => this.selectedSchemas[a.id])
    this.projectService.saveCitable(this.projectSource.updateEndpoint, this.projectSource.graphStoreEndpoint, this.project).then(() => this.$state.go('construct', { id: this.project.id, sparqlEndpoint: this.project.source.sparqlEndpoint, graph: this.project.source.graph}))
  }

  public delete(): void {
    this.projectService.deleteCitable(this.projectSource.updateEndpoint, this.project).then(() => this.$state.go('projects'))
  }

  public changeTemplate(): void {
    if (this.project) this.selectedTemplate.copyToProject(this.project)
  }

  constructor(private $q: angular.IQService, private projectService: ProjectService, fibraService: FibraService, private sparqlTreeService: SparqlTreeService, $stateParams: any, private $state: angular.ui.IStateService) {
    this.projectSources = projectService.getProjectSources()
    this.projectSource = this.projectSources.find(ps => ps.id === $stateParams.sourceId)
    if ($stateParams.id) {
      projectService.loadProject(this.projectSource, $stateParams.id).then(p => {
        this.project = p
        this.selectedTemplate = p.asTemplate()
      })
    } else {
      let pid: string = 'http://ldf.fi/fibra/project_' + UUID()
      this.project = new Project(pid)
      this.project.labels = [ DataFactory.literal('', fibraService.getState().language)]
      this.project.descriptions = [ DataFactory.literal('', fibraService.getState().language)]
      this.project.source = this.projectSource
      this.project.endpoint = this.projectSource.sparqlEndpoint
      this.project.updateEndpoint = this.projectSource.updateEndpoint
      this.project.graphStoreEndpoint = this.projectSource.graphStoreEndpoint
      this.project.graph = pid
    }
    this.projectSources.forEach(ps => {
      projectService.listPrimaryEndpointConfigurations(ps).then(pt => {
        if (!this.selectedTemplate) {
          let matchingEC: PrimaryEndpointConfiguration = pt.find(ec => ec.compatibleEndpoints.find(et => et === this.projectSource.type) !== undefined)
          if (matchingEC) {
            this.selectedTemplate = matchingEC
            this.changeTemplate()
          }
        }
        this.primaryEndpointConfigurations = this.primaryEndpointConfigurations.concat(pt)
      })
      projectService.listAuthorityEndpointConfigurations(ps).then(pt => this.authorities = this.authorities.concat(pt))
      projectService.listArchiveEndpointConfigurations(ps).then(pt => this.archives = this.archives.concat(pt))
      projectService.listSchemas(ps).then(pt => this.schemas = this.schemas.concat(pt))
    })
  }

}

export class ConfigureViewComponent implements angular.IComponentOptions {
    public controller: string = 'ConfigureViewComponentController' // (new (...args: any[]) => angular.IController) = ConfigureViewComponentController
    public templateUrl: string = 'components/configure-view/configure-view.html'
}
