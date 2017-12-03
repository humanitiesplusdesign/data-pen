'use strict'
import { SourcesActionService } from '../../actions/sources';
import { ProjectActionService } from '../../actions/project';
import { IRootState } from '../../reducers';
import { ISource, ISourceClassTree, ISourcesState } from '../../reducers/sources';
import { ProjectState } from '../../reducers/project';
import * as angular from 'angular';
import { ProjectService } from '../../services/project-service/project-service'
import { IFibraNgRedux } from 'reducers'
import { IModalService } from 'angular-ui-bootstrap'
import * as d3 from 'd3';
import { Class, Property } from 'services/project-service/data-model';

interface ISourcesComponentControllerState {
  project: ProjectState
  sources: ISourcesState
}

export class SourcesComponentController {

  private state: ISourcesComponentControllerState = <ISourcesComponentControllerState>{}
  private projectsOpen: { [id: string]: boolean } = {}
  private localSourceClassTree: ISourceClassTree

  /* @ngInject */
  constructor(private projectService: ProjectService,
              private projectActionService: ProjectActionService,
              private sourcesActionService: SourcesActionService,
              private $ngRedux: IFibraNgRedux,
              private $uibModal: IModalService) {
    let stateUnsubscribe: () => void = $ngRedux.connect(
      (state: IRootState) => {
        return {
          project: state.project,
          sources: state.sources
        }
      })(this.state)

    this.localSourceClassTree = angular.copy(this.state.sources.sourceClassToggle)

    let oldSourceClassTree: ISourceClassTree = this.state.sources.sourceClassToggle

    // Because we need to keep a local copy of the state to mutate, we have to observe it for changes.
    $ngRedux.subscribe(() => {
      if (this.state.sources.sourceClassToggle !== oldSourceClassTree) {
        this.localSourceClassTree = angular.copy(this.state.sources.sourceClassToggle)
        oldSourceClassTree = this.state.sources.sourceClassToggle
      }
    })
  }

  private openAddSourcesModal(): void {
    let modalInstance: any = this.$uibModal.open({
      animation: true,
      component: 'addSource',
      size: 'lg',
      resolve: {
      }
    });
  }

  private allClasses(): Class[] {
    return d3.keys(this.localSourceClassTree).reduce(
      (a, b) => {
        let sourceClasses: string[] = d3.keys(this.localSourceClassTree[b])
          .filter(k => this.localSourceClassTree[b][k])
          .filter(k => a.indexOf(k) === -1)
        return a.concat(sourceClasses)
      },
      []).map(c => this.state.project.project ? this.state.project.project.dataModel.classMap.get(c) : null)
        .filter(c => c)
  }

  private sourcePropsForClass(c: Class): any {
    let sources: string[] = d3.keys(this.localSourceClassTree)
    let properties: Property[] = c.properties.map(p => p.value).map(p => this.state.project.project.dataModel.propertyMap.get(p))
    return {
      sources: sources,
      properties: properties
    }
  }

  private getSourceClassStatus(source: string, clss: string): boolean {
    if (this.state.sources.sourceClassToggle[source] && this.state.sources.sourceClassToggle[source][clss]) {
      return this.state.sources.sourceClassToggle[source][clss]
    } else {
      return false
    }
  }

  private mapProjectToActions(state: any): any {
    return {
      project: state.project
    }
  }
}

export class SourcesComponent implements angular.IComponentOptions {
    public template: any = require('./sources.pug')()
    public controller: any = SourcesComponentController
}

angular.module('fibra.components.sources', ['ui.bootstrap'])
  .component('sources', new SourcesComponent())
