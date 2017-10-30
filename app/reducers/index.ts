import {combineReducers} from 'redux'
import verify from './verify'
import types from './types'
import items from './items'
import models from './models'
import {IFrontendState} from 'reducers/frontend'
import {Project} from 'services/project-service/project'
import frontend from 'reducers/frontend'

export interface IRootState {
  frontend: IFrontendState
}

export class BackendRootState {
  constructor(
    public project: Project = null,
    public language: string = 'en'
  ) {}
}


export function convertToBackendState(state: IRootState, oldState: BackendRootState): BackendRootState | null {
  if (oldState.project === state.frontend.project.project) return null
  return new BackendRootState(state.frontend.project.project)
}

export default combineReducers({
  verify,
  types,
  items,
  models,
  frontend
})
