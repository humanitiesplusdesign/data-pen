import {PROJECT_LOADED} from '../../../actions/project'

export type ProjectState = {
  id: string
}|{}

let defaultState: ProjectState = {}

export default function models(state: ProjectState = {}, action): ProjectState {
  switch (action.type) {
    case PROJECT_LOADED:
      return Object.assign({}, state, {
        id: action.payload.id
      })

    default:
      return state
  }
}
