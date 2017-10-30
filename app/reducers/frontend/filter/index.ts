import { SET_FILTER_DIVIDER_PERCENTAGE } from '../../../actions/filter'

export interface IFilterState {
  dividerPercent: number
}

let defaultState: IFilterState = {
  dividerPercent: 0
}

export default function models(state: IFilterState = defaultState, action): IFilterState {
  switch (action.type) {

    case SET_FILTER_DIVIDER_PERCENTAGE:
      return Object.assign({}, state, {
        dividerPercent: action.payload
      })

    default:
      return state
  }
}
