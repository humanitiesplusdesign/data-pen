import { VERIFY_ITEM } from '../actions/verify'

export default function verify(state = null, action) {
  switch (action.type) {
    case VERIFY_ITEM:
      return action.payload
    default:
      return state
  }
}
