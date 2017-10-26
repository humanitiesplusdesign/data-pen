import {Action} from '../models/action'
import {ProjectService} from '../services/project-service/project-service'
import {Project} from '../services/project-service/project'

export const SET_PROJECT: string = 'SET_PROJECT'
export const PROJECT_LOADED: string = 'PROJECT_LOADED'
export const SET_ALL_ITEM_COUNT: string = 'SET_ALL_ITEM_COUNT'
export const SET_FILTERED_ITEM_COUNT: string = 'SET_FILTERED_ITEM_COUNT'
export const SET_ACTIVE_ITEM_COUNT: string = 'SET_ACTIVE_ITEM_COUNT'

export function setProject(id: string, sparqlEndpoint: string, graph: string, projectService: ProjectService): any {
  return dispatch => { projectService.loadProject({ sparqlEndpoint: sparqlEndpoint, graph: graph }, id, true).then(
      project => {
        return dispatch(projectLoaded(project))
      }
    )
  }
}

function projectLoaded(project: Project): Action {
  return {
    type: PROJECT_LOADED,
    payload: project
  }
}

export function setAllItemCount(count: number): Action {
  return {
    type: SET_ALL_ITEM_COUNT,
    payload: count
  }
}

export function setFilteredItemCount(count: number): Action {
  return {
    type: SET_FILTERED_ITEM_COUNT,
    payload: count
  }
}

export function setActiveItemCount(count: number): Action {
  return {
    type: SET_ACTIVE_ITEM_COUNT,
    payload: count
  }
}
