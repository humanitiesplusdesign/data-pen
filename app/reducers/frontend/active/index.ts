import { ADD_ITEM_TO_CURRENT_LAYOUT, SET_ACTIVE_DIVIDER_PERCENTAGE } from '../../../actions/active'

export type ItemState = {
  id: string,
  description: string,
  topOffset: number,
  leftOffset: number
}

export type LayoutState = {
  items: ItemState[]
}

export type ActiveState = {
  activeLayout: LayoutState,
  dividerPercent: number
}

let defaultState: ActiveState = {
  activeLayout: {
    items: []
  },
  dividerPercent: 0
}

export default function models(state: ActiveState = defaultState, action): ActiveState {
  switch (action.type) {

    case ADD_ITEM_TO_CURRENT_LAYOUT:
      let newItems: ItemState[] = state.activeLayout.items.slice(0)
      newItems.push(action.payload)

      return Object.assign({}, state, {
        activeLayout: Object.assign({}, state.activeLayout, {
          items: newItems
        })
      })

    case SET_ACTIVE_DIVIDER_PERCENTAGE:
      return Object.assign({}, state, {
        dividerPercent: action.payload
      })

    default:
      return state
  }
}
