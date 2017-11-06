'use strict'
import { ISourcesActions } from '../../actions/sources';
import { IRootState } from '../../reducers';
import { ISource, ISourceClassTree, ISourcesState } from '../../reducers/frontend/sources';
import { ProjectState } from '../../reducers/frontend/project';
import { IActiveActions } from '../../actions/active';
import * as angular from 'angular';
import { ProjectService } from '../../services/project-service/project-service'
import * as ProjectActions from '../../actions/project';
import { INgRedux } from 'ng-redux'
import SourcesActions from '../../actions/sources'

interface ISourcesComponentControllerState extends ISourcesActions {
  project: ProjectState
  sources: ISourcesState
}

export class SourcesComponentController {

  private actions: any = {}
  private state: ISourcesComponentControllerState = <ISourcesComponentControllerState>{}
  private projectsOpen: { [id: string]: boolean } = {}
  private localSourceClassTree: ISourceClassTree

  /* @ngInject */
  constructor(private projectService: ProjectService,
              private $ngRedux: INgRedux) {
    let unsub1: () => void = $ngRedux.connect(this.mapProjectToActions, ProjectActions)(this.actions)
    let stateUnsubscribe: () => void = $ngRedux.connect(
      (state: IRootState) => {
        return {
          project: state.frontend.project,
          sources: state.frontend.sources
        }
      },
      SourcesActions)(this.state)
    this.actions.unsubscribe = () => {
      unsub1()
      stateUnsubscribe()
    }

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

  private getSourceClassStatus(source: string, clss: string): boolean {
    if (this.state.sources.sourceClassToggle[source] && this.state.sources.sourceClassToggle[source][clss]) {
      return this.state.sources.sourceClassToggle[source][clss]
    } else {
      return false
    }
  }

  private mapProjectToActions(state: any): any {
    return {
      project: state.frontend.project
    }
  }
}

export class SourcesComponent implements angular.IComponentOptions {
    public template: any = require('./sources.pug')()
    public controller: any = SourcesComponentController
}

angular.module('fibra.components.sources', [])
  .component('sources', new SourcesComponent())
