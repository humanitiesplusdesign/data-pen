import { SparqlStatisticsService } from '../services/sparql-statistics-service';
import { CLEAR_FILTER_STATE } from './filter';
import { ActiveActionService, CLEAR_ACTIVE_STATE } from './active';
import { CLEAR_SOURCES_STATE, ADD_ARCHIVE_SOURCE, ADD_AUTHORITY_SOURCE } from './sources';
import { Action, Dispatch } from 'redux'
import {ProjectService} from 'services/project-service/project-service'
import {Project} from 'services/project-service/project'
import { IRootState } from 'reducers'
import { IFibraNgRedux } from 'reducers'
import * as angular from 'angular';
import { ProjectSourceInfo } from 'components/project-sources-view/project-sources-view-component';
import { CitableSource } from 'models/citable';

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
              this.sparqlStatisticsService.getPropertyStatistics(ae).then(propStats => {
                this.$ngRedux.dispatch({
                  type: ADD_ARCHIVE_SOURCE,
                  payload: {
                    id: ae.id,
                    labels: ae.labels,
                    classes: project.dataModel.classMap.values().filter(c => stats.has(c.value)),
                    classStats: stats,
                    propStats: propStats
                  }
                })
              })  
            })
          })
          project.authorityEndpoints.forEach(ae => {
            this.sparqlStatisticsService.getClassStatistics(ae).then(stats => {
              this.sparqlStatisticsService.getPropertyStatistics(ae).then(propStats => {
                this.$ngRedux.dispatch({
                  type: ADD_AUTHORITY_SOURCE,
                  payload: {
                    id: ae.id,
                    labels: ae.labels,
                    classes: project.dataModel.classMap.values().filter(c => stats.has(c.value)),
                    classStats: stats,
                    propStats: propStats
                  }
                })
              })
            })
          })

          let ret = this.$ngRedux.dispatch({
            type: SET_PROJECT,
            payload: project
          })

          if(project.layouts[0]) this.activeActionService.setLayout(project.layouts[0])
          
          return ret
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
