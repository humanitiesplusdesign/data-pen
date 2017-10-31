import { ISourcesState } from './sources';
import {combineReducers} from 'redux'
import {ProjectState} from 'reducers/frontend/project'
import project from 'reducers/frontend/project'
import {IFilterState} from 'reducers/frontend/filter'
import filter from 'reducers/frontend/filter'
import {IActiveState} from 'reducers/frontend/active'
import active from 'reducers/frontend/active'
import sources from 'reducers/frontend/sources'

export interface IFrontendState {
  project: ProjectState
  filter: IFilterState
  active: IActiveState
  sources: ISourcesState
}

export default combineReducers({
  project,
  filter,
  active,
  sources
})
