import { CLEAR_FILTER_STATE } from './filter';
import { CLEAR_ACTIVE_STATE } from './active';
import { CLEAR_SOURCES_STATE, ADD_ARCHIVE_SOURCE, ADD_AUTHORITY_SOURCE } from './sources';
import { Action, Dispatch } from 'redux'
import {ProjectService} from 'services/project-service/project-service'
import {Project} from 'services/project-service/project'
import { IRootState } from 'reducers'
import { IFibraNgRedux } from 'reducers'
import SourceActions from './sources'
import * as angular from 'angular';

export const SET_PROJECT: string = 'SET_PROJECT'
export const SET_ALL_ITEM_COUNT: string = 'SET_ALL_ITEM_COUNT'
export const SET_FILTERED_ITEM_COUNT: string = 'SET_FILTERED_ITEM_COUNT'
export const SET_ACTIVE_ITEM_COUNT: string = 'SET_ACTIVE_ITEM_COUNT'

export interface IProjectLoadedAction extends Action {
  payload: Project
}

export interface ISetAllItemCountAction extends Action {
  payload: number
}

export interface ISetFilteredItemCountAction extends Action {
  payload: number
}

export interface ISetActiveItemCountAction extends Action {
  payload: number
}

export class ProjectActionService {
  /* @ngInject */
  constructor(private $ngRedux: IFibraNgRedux, private projectService: ProjectService) {
  }
  public setProject(id: string, sparqlEndpoint: string, graph: string): angular.IPromise<IProjectLoadedAction> {
    this.$ngRedux.dispatch({
      type: CLEAR_ACTIVE_STATE
    })
    this.$ngRedux.dispatch({
      type: CLEAR_FILTER_STATE
    })
    this.$ngRedux.dispatch({
      type: CLEAR_SOURCES_STATE
    })
    return this.projectService.loadProject({ sparqlEndpoint: sparqlEndpoint, graph: graph }, id, true).then(
        project => {
          console.log(project)
          // TODO: Get the actual sources associated with each endpoint
          project.archiveEndpoints.forEach((ae) => {
            this.$ngRedux.dispatch({
              type: ADD_ARCHIVE_SOURCE,
              payload: {
                id: ae.id,
                labels: ae.labels,
                classes: project.dataModel.classMap.values()
              }
            })
          })
          project.authorityEndpoints.forEach((ae) => {
            this.$ngRedux.dispatch({
              type: ADD_AUTHORITY_SOURCE,
              payload: {
                id: ae.id,
                labels: ae.labels,
                classes: project.dataModel.classMap.values()
              }
            })
          })
          return this.$ngRedux.dispatch({
            type: SET_PROJECT,
            payload: project
          })
        }
    )
  }

  public setAllItemCount(count: number): ISetAllItemCountAction {
    return this.$ngRedux.dispatch({
      type: SET_ALL_ITEM_COUNT,
      payload: count
    })
  }

  public setFilteredItemCount(count: number): ISetFilteredItemCountAction {
    return this.$ngRedux.dispatch({
      type: SET_FILTERED_ITEM_COUNT,
      payload: count
    })
  }

  public setActiveItemCount(count: number): ISetActiveItemCountAction {
    return this.$ngRedux.dispatch({
      type: SET_ACTIVE_ITEM_COUNT,
      payload: count
    })
  }
}

angular.module('fibra.actions.project', [])
.config(($provide) => {
  $provide.service('projectActionService', ProjectActionService)
})
