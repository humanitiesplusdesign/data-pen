import {combineReducers} from 'redux'
import project from './project'
import {ProjectState} from './project'

// type FrontEndState = {
//   test: string
// }

// let defaultState: FrontEndState = {
//   test: 'HELLO world'
// }

// let frontend: (state: FrontEndState, action: any) => FrontEndState = function frontend(state: FrontEndState = defaultState, action): FrontEndState {
//   switch (action.type) {
//     default:
//       return state
//   }
// }

export default combineReducers({
  project
})
