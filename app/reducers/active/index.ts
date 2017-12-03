import { getPrefLangString } from '../../filters/preferred-language-filter';
import { ADD_ITEM_TO_ITEM_STATE, DELETE_ITEM_FROM_LAYOUT } from 'actions/active';
import { Item } from 'services/sparql-item-service';
import { INode, SKOS } from 'models/rdf';
import { ADD_ITEM_TO_CURRENT_LAYOUT, SET_ACTIVE_DIVIDER_PERCENTAGE, CLEAR_ACTIVE_STATE } from 'actions/active'

export type IItemState = {
  ids: INode[],
  item: Item,
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

    case CLEAR_ACTIVE_STATE:
      return defaultState

    case ADD_ITEM_TO_CURRENT_LAYOUT:
      let newItems: IItemState[] = state.activeLayout.items.slice(0)
      newItems.push(action.payload)

      return Object.assign({}, state, {
        activeLayout: Object.assign({}, state.activeLayout, {
          items: newItems
        })
      })

    case DELETE_ITEM_FROM_LAYOUT:
      let newItems3: IItemState[] = state.activeLayout.items.slice(0)
      newItems3.splice(newItems3.indexOf(action.payload), 1)
      return Object.assign({}, state, {
        activeLayout: Object.assign({}, state.activeLayout, {
          items: newItems3
        })
      })

    case ADD_ITEM_TO_ITEM_STATE:
      let newItems2: IItemState[] = state.activeLayout.items.slice(0)
      let updateItem: IItemState = action.payload.itemState
      let fullItem: Item = action.payload.fullItem
      newItems2.splice(newItems2.indexOf(updateItem), 1)
      newItems2.push(Object.assign({}, updateItem, {
        description: !updateItem.description && fullItem && fullItem.remoteProperties.find((rp) => rp.property.value === SKOS.prefLabel.value) ?
          fullItem.remoteProperties.find((rp) => rp.property.value === SKOS.prefLabel.value).values[0].value.value :
          updateItem.description,
        item: fullItem
      }))
      return Object.assign({}, state, {
        activeLayout: Object.assign({}, state.activeLayout, {
          items: newItems2
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
