import { ILayoutState } from '../services/project-service/project';
import { SparqlStatisticsService } from '../services/sparql-statistics-service';
import { CLEAR_FILTER_STATE } from './filter';
import { ActiveActionService, CLEAR_ACTIVE_STATE } from './active';
import { CLEAR_SOURCES_STATE, ADD_ARCHIVE_SOURCE, ADD_AUTHORITY_SOURCE, ADD_PROP_STATS_TO_SOURCE } from './sources';
import { Action, Dispatch } from 'redux'
import {ProjectService} from 'services/project-service/project-service'
import {Project} from 'services/project-service/project'
import { IRootState } from 'reducers'
import { IFibraNgRedux } from 'reducers'
import * as angular from 'angular';
import { ProjectSourceInfo } from 'components/project-sources-view/project-sources-view-component';
import { CitableSource } from 'models/citable';
import { IFullLayoutState } from 'reducers/active';

export const SET_PROJECT: string = 'SET_PROJECT'
export const SET_ALL_ITEM_COUNT: string = 'SET_ALL_ITEM_COUNT'
export const SET_FILTERED_ITEM_COUNT: string = 'SET_FILTERED_ITEM_COUNT'
export const SET_ACTIVE_ITEM_COUNT: string = 'SET_ACTIVE_ITEM_COUNT'
export const ADD_LAYOUT: string = 'ADD_LAYOUT'
export const DELETE_LAYOUT: string = 'DELETE_LAYOUT'
export const REPLACE_LAYOUT: string = 'REPLACE_LAYOUT'

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
  constructor(private $ngRedux: IFibraNgRedux, private projectService: ProjectService, private sparqlStatisticsService: SparqlStatisticsService, private activeActionService: ActiveActionService) {
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
    return this.projectService.loadProject(new CitableSource(sparqlEndpoint, graph), id, true).then(
        project => {
          project.archiveEndpoints.forEach(ae => {
            this.sparqlStatisticsService.getClassStatistics(ae).then(stats => {
              this.$ngRedux.dispatch({
                type: ADD_ARCHIVE_SOURCE,
                payload: {
                  id: ae.id,
                  labels: ae.labels,
                  classes: project.dataModel.classMap.values().filter(c => stats.has(c.value)),
                  classStats: stats,
                  propStats: null
                }
              })

              this.sparqlStatisticsService.getPropertyStatistics(ae).then(propStats => {
                this.$ngRedux.dispatch({
                  type: ADD_PROP_STATS_TO_SOURCE,
                  payload: {
                    source: this.$ngRedux.getState().sources.archiveSources.concat(this.$ngRedux.getState().sources.authoritySources).find(s => s.id === ae.id),
                    propStats: propStats
                  }
                })
              })
            })
          })
          project.authorityEndpoints.forEach(ae => {
            this.sparqlStatisticsService.getClassStatistics(ae).then(stats => {
              this.$ngRedux.dispatch({
                type: ADD_AUTHORITY_SOURCE,
                payload: {
                  id: ae.id,
                  labels: ae.labels,
                  classes: project.dataModel.classMap.values().filter(c => stats.has(c.value)),
                  classStats: stats,
                  propStats: null
                }
              })

              this.sparqlStatisticsService.getPropertyStatistics(ae).then(propStats => {
                this.$ngRedux.dispatch({
                  type: ADD_PROP_STATS_TO_SOURCE,
                  payload: {
                    source: this.$ngRedux.getState().sources.archiveSources.concat(this.$ngRedux.getState().sources.authoritySources).find(s => s.id === ae.id),
                    propStats: propStats
                  }
                })
              })
            })
          })

          let ret: IProjectLoadedAction = this.$ngRedux.dispatch({
            type: SET_PROJECT,
            payload: project
          })

          if (project.layouts.filter((l) => l.active )[0]) {
            this.activeActionService.setLayout(project.layouts.filter((l) => l.active )[0])
          } else {
            this.addLayout({
              items: [],
              active: true,
              description: ''
            }).then(() => {
              this.activeActionService.setLayout(this.$ngRedux.getState().project.project.layouts.filter((l) => l.active )[0])
            })
          }

          return ret
        }
    )
  }

  public addLayout(layout: ILayoutState): angular.IPromise<any> {
    this.$ngRedux.dispatch({
      type: ADD_LAYOUT,
      payload: layout
    })

    return this.projectService.saveCitable(
      this.$ngRedux.getState().project.project.updateEndpoint,
      this.$ngRedux.getState().project.project.graphStoreEndpoint,
      this.$ngRedux.getState().project.project
    )
  }

  public deleteLayout(layout: ILayoutState): angular.IPromise<any> {
    this.$ngRedux.dispatch({
      type: DELETE_LAYOUT,
      payload: layout
    })

    return this.projectService.saveCitable(
      this.$ngRedux.getState().project.project.updateEndpoint,
      this.$ngRedux.getState().project.project.graphStoreEndpoint,
      this.$ngRedux.getState().project.project
    )
  }

  public changeLayoutDescription(originalLayout: ILayoutState, newDescription: string): angular.IPromise<any> {
    let newLayout: ILayoutState = {
      items: originalLayout.items,
      active: originalLayout.active,
      description: newDescription
    }

    this.$ngRedux.dispatch({
      type: REPLACE_LAYOUT,
      payload: {
        oldLayout: originalLayout,
        newLayout: newLayout
      }
    })

    return this.projectService.saveCitable(
      this.$ngRedux.getState().project.project.updateEndpoint,
      this.$ngRedux.getState().project.project.graphStoreEndpoint,
      this.$ngRedux.getState().project.project
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
