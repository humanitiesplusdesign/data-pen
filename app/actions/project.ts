import {Action} from '../models/action'
import {ProjectService} from '../services/project-service/project-service'
import {Project} from '../services/project-service/project'

export const SET_PROJECT: string = 'SET_PROJECT'
export const PROJECT_LOADED: string = 'PROJECT_LOADED'

export function setProject(id: string, sparqlEndpoint: string, graph: string, projectService: ProjectService): any {
  return dispatch => { projectService.loadProject({ sparqlEndpoint: sparqlEndpoint, graph: graph }, id, true).then(
      project => dispatch(projectLoaded(project))
    )
  }
}

function projectLoaded(project: Project): Action {
  return {
    type: PROJECT_LOADED,
    payload: project
  }
}
