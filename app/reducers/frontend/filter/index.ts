import { SET_FILTER_DIVIDER_PERCENTAGE } from '../../../actions/filter'

export type FilterState = {
  dividerPercent: number
}|{}

let defaultState: FilterState = {
  dividerPercent: 0
}

export default function models(state: FilterState = defaultState, action): FilterState {
  switch (action.type) {

    case SET_FILTER_DIVIDER_PERCENTAGE:
      return Object.assign({}, state, {
        dividerPercent: action.payload
      })

    default:
      return state
  }
}
