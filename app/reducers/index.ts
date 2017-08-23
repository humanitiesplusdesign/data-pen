import {combineReducers} from 'redux'
import verify from './verify'
import types from './types'
import items from './items'
import models from './models'
import frontend from './frontend'

const rootReducer = combineReducers({
  verify,
  types,
  items,
  models,
  frontend
})

export default rootReducer
