import { ADD_ITEM_TO_CURRENT_LAYOUT, SET_ACTIVE_DIVIDER_PERCENTAGE } from 'actions/active'

export type IItemState = {
  id: string,
  description: string,
  topOffset: number,
  leftOffset: number
}

export type ILayoutState = {
  items: IItemState[]
}

export type IActiveState = {
  activeLayout: ILayoutState,
  dividerPercent: number
}

let defaultState: IActiveState = {
  activeLayout: {
    items: []
  },
  dividerPercent: 0
}

export default function models(state: IActiveState = defaultState, action): IActiveState {
  switch (action.type) {

    case ADD_ITEM_TO_CURRENT_LAYOUT:
      let newItems: IItemState[] = state.activeLayout.items.slice(0)
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
