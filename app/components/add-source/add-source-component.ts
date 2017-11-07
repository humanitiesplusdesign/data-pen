'use strict'
import { ProjectSourceInfo } from '../project-sources-view/project-sources-view-component';
import { RemoteEndpointConfiguration } from '../../services/project-service/remote-endpoint-configuration';
import { ISourcesState } from '../../reducers/frontend/sources';
import { ProjectState } from '../../reducers/frontend/project';
import { IRootState } from '../../reducers';
import { INgRedux } from 'ng-redux'
import { ProjectService } from '../../services/project-service/project-service';
import SourcesActions, { ISourcesActions } from '../../actions/sources';

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

  /* @ngInject */
  constructor(
    private projectService: ProjectService,
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
      SourcesActions)(this.state)
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
