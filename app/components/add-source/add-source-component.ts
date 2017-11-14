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
  private userSource: ProjectSourceInfo

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

      this.userSource = projectService.getProjectSources()[0]

    })
  }

  private commit(): void {
    this.projectService.loadProject(this.userSource, this.state.project.project.id, true).then((p) => {
      p.labels = this.state.project.project.labels
      p.archiveEndpoints = this.archiveEndpoints.filter((ae) => this.sourceSelections[ae.id])
      p.authorityEndpoints = this.authorityEndpoints.filter((ae) => this.sourceSelections[ae.id])
      p.descriptions = this.state.project.project.descriptions
      p.rightsHolders = this.state.project.project.rightsHolders
      p.schemas = this.state.project.project.schemas

      this.projectService.saveCitable(this.userSource.updateEndpoint, this.userSource.graphStoreEndpoint, p)
        .then(() => {
          this.projectActionService.setProject(p.id, p.source.sparqlEndpoint, p.source.graph)
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

angular.module('fibra.components.add-source', ['ui.bootstrap'])
  .component('addSource', new AddSourceComponent())
  .controller('TabsCtrl', function ($scope, $window) {
  $scope.tabs = [
    { title:'Dynamic Title 1', content:'Dynamic content 1' },
    { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
  ];

  $scope.alertMe = function() {
    setTimeout(function() {
      $window.alert('You\'ve selected the alert tab!');
    });
  };

  $scope.model = {
    name: 'Tabs'
  };
});
