import {combineReducers} from 'redux'
import project from './project'
import filter from './filter'
import active from './active'

export default combineReducers({
  project,
  filter,
  active
})
