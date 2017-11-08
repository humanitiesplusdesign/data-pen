'use strict'
import { Citable } from '../../models/citable';
import { PrimaryEndpointConfiguration } from '../../services/project-service/primary-endpoint-configuration';
import { Project } from '../../services/project-service/project';
import { ProjectSourceInfo } from '../project-sources-view/project-sources-view-component';
import { RemoteEndpointConfiguration } from '../../services/project-service/remote-endpoint-configuration';
import { ISourcesState } from '../../reducers/frontend/sources';
import { ProjectState } from '../../reducers/frontend/project';
import { IRootState } from '../../reducers';
import { INgRedux } from 'ng-redux'
import { ProjectService } from '../../services/project-service/project-service';
import SourcesActions, { ISourcesActions } from '../../actions/sources';
import { ProjectActionService } from '../../actions/project'

import * as angular from 'angular';

interface IAddSourceComponentControllerState extends ISourcesActions {
  project: ProjectState
  sources: ISourcesState
}

export class AddSourceComponentController {
  private actions: any = {}
  private state: IAddSourceComponentControllerState = <IAddSourceComponentControllerState>{}
  private authorityEndpoints: RemoteEndpointConfiguration[]
  private archiveEndpoints: RemoteEndpointConfiguration[]
  private primarySource: ProjectSourceInfo =  new ProjectSourceInfo('Shared projects', 'http://ldf.fi/fibra/sparql', 'http://ldf.fi/fibra/update', 'http://ldf.fi/fibra/data', 'http://ldf.fi/fibra/shared-projects/', 'http://ldf.fi/fibra/fusekiEndpointWithTextIndexAndSecoFunctions')

  private sourceSelections: {}

  private close: any
  private dismiss: any

  /* @ngInject */
  constructor(
    private projectService: ProjectService,
    private projectActionService: ProjectActionService,
    private $ngRedux: INgRedux,
    private $q: angular.IQService
  ) {
    let stateUnsubscribe: () => void = $ngRedux.connect(
      (state: IRootState) => {
        return {
          project: state.frontend.project,
          sources: state.frontend.sources
        }
      },
      {})(this.state)
    this.actions.unsubscribe = () => {
      stateUnsubscribe()
    }

    $q.all([
      projectService.listAuthorityEndpointConfigurations(this.primarySource).then(pt => this.authorityEndpoints = pt),
      projectService.listArchiveEndpointConfigurations(this.primarySource).then(pt => this.archiveEndpoints = pt)
    ]).then(() => {
      this.sourceSelections = {}
      this.authorityEndpoints.concat(this.archiveEndpoints).forEach((ae) => {
        this.sourceSelections[ae.id] = this.state.project.project.archiveEndpoints
          .concat(this.state.project.project.authorityEndpoints)
          .map((projectEndpoint) => projectEndpoint.id)
          .indexOf(ae.id) !== -1
      })
    })
  }

  private commit(): void {
    // This doesn't fly
    this.projectService.loadProject(this.primarySource, this.state.project.project.id, true).then((p) => {
      p.labels = this.state.project.project.labels
      p.archiveEndpoints = this.archiveEndpoints.filter((ae) => this.sourceSelections[ae.id])
      p.authorityEndpoints = this.authorityEndpoints.filter((ae) => this.sourceSelections[ae.id])
      p.descriptions = this.state.project.project.descriptions
      p.rightsHolders = this.state.project.project.rightsHolders
      p.schemas = this.state.project.project.schemas

      this.projectService.saveCitable(this.primarySource.updateEndpoint, this.primarySource.graphStoreEndpoint, p)
        .then(() => {
          this.projectActionService.setProject(p.id, this.primarySource.sparqlEndpoint, this.primarySource.graphStoreEndpoint)
            .then(() => {
              this.close()
            })
        })
    })
  }

  private cancel(): void {
    this.dismiss()
  }
}

export class AddSourceComponent implements angular.IComponentOptions {
  public bindings: {[id: string]: string} = {
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
  public template: string = require('./add-source.pug')()
  public controller: any = AddSourceComponentController
}

angular.module('fibra.components.add-source', [])
  .component('addSource', new AddSourceComponent())