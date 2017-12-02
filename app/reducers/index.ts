import { ISourcesState } from './sources';
import {combineReducers} from 'redux'
import {ProjectState} from 'reducers/project'
import projectReducer from 'reducers/project'
import {GeneralState} from 'reducers/general'
import general from 'reducers/general'
import {IFilterState} from 'reducers/filter'
import filter from 'reducers/filter'
import {IActiveState} from 'reducers/active'
import active from 'reducers/active'
import sources from 'reducers/sources'
import { INgRedux } from 'ng-redux';
import { Project } from 'services/project-service/project';

export class BackendRootState {
  constructor(
    public project: Project = null,
    public language: string = 'en'
  ) {}
}


export function convertToBackendState(state: IRootState, oldState: BackendRootState): BackendRootState | null {
  if (oldState.project === state.project.project) return null
  return new BackendRootState(state.project.project, state.general.language)
}

export default combineReducers({
  general,
  project: projectReducer,
  filter,
  active,
  sources
})

export interface IFibraNgRedux extends INgRedux {
  dispatch<T>(action: T): T;
  getState(): IRootState;
}

export interface IRootState {
  general: GeneralState
  project: ProjectState
  filter: IFilterState
  active: IActiveState
  sources: ISourcesState
}

