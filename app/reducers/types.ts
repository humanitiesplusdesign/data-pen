import { ADD_TYPE, CLEAR_TYPES, SET_ORDERED_TYPES, TYPE_CREATED } from '../actions/types'
import { TreeNode } from '../components/tree/tree-component'

export default function types(state = {userTypes: [], types: [], displayTypes: []}, action) {
  switch (action.type) {
    case ADD_TYPE:
      // Check if this matches any user-defined types and remove them if so
      let dupType = state.userTypes.filter((tn) => {
        return tn.id === action.payload.id
      })[0]
      let newUserTypes = state.userTypes.slice(0)
      if(dupType) newUserTypes.splice(state.userTypes.indexOf(dupType), 1)
      let newTypes = state.types.slice(0)
      newTypes.push(action.payload)
      return Object.assign({}, state, {
        types: newTypes,
        userTypes: newUserTypes
      })

    case CLEAR_TYPES:
      return Object.assign({}, state, {
        types: []
      })

    case SET_ORDERED_TYPES:
      return Object.assign({}, state, {
        displayTypes: action.payload
      })

    case TYPE_CREATED:
      let tn: TreeNode = new TreeNode(action.payload.value, action.payload.label)
      let newUserTypes2 = state.userTypes.slice(0)
      newUserTypes2.push(tn)
      return Object.assign({}, state, {
        userTypes: newUserTypes2
      })

    default:
      return state
  }
}
