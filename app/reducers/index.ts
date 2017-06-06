import {combineReducers} from 'redux'
import verify from './verify'
import types from './types'
import items from './items'

const rootReducer = combineReducers({
  verify,
  types,
  items
})

export default rootReducer
