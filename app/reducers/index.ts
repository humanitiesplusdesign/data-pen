import {combineReducers} from 'redux'
import verify from './verify'
import types from './types'

const rootReducer = combineReducers({
  verify,
  types
})

export default rootReducer
