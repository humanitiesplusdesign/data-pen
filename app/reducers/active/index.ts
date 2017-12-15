import { DESCRIPTOR_LOCATIONS } from 'tslint/lib/rules/completedDocsRule';
import { getPrefLangString } from '../../filters/preferred-language-filter';
import { ADD_ITEM_TO_ITEM_STATE, DELETE_ITEM_FROM_LAYOUT, UPDATE_ITEM_DESCRIPTION, SET_ACTIVE_LAYOUT } from 'actions/active';
import { Item } from 'services/sparql-item-service';
import { INode, SKOS } from 'models/rdf';
import { ADD_ITEM_TO_CURRENT_LAYOUT, SET_ACTIVE_DIVIDER_PERCENTAGE, CLEAR_ACTIVE_STATE } from 'actions/active'

export type IFullItemState = {
  ids: INode[],
  item: Item,
  description: string,
  topOffset: number,
  leftOffset: number
}

export type IFullLayoutState = {
  items: IFullItemState[],
  description: string
}

export type IActiveState = {
  activeLayout: IFullLayoutState,
  dividerPercent: number
}

let defaultState: IActiveState = {
  activeLayout: {
    items: [],
    description: ''
  },
  dividerPercent: 0
}

export default function models(state: IActiveState = defaultState, action): IActiveState {
  switch (action.type) {

    case CLEAR_ACTIVE_STATE:
      return defaultState

    case ADD_ITEM_TO_CURRENT_LAYOUT:
      let newItems: IFullItemState[] = state.activeLayout.items.slice(0)
      newItems.push(action.payload)

      return Object.assign({}, state, {
        activeLayout: Object.assign({}, state.activeLayout, {
          items: newItems
        })
      })

    case SET_ACTIVE_LAYOUT:
      return Object.assign({}, state, {
        activeLayout: action.payload
      })

    case DELETE_ITEM_FROM_LAYOUT:
      let newItems3: IFullItemState[] = state.activeLayout.items.slice(0)
      newItems3.splice(newItems3.indexOf(action.payload), 1)
      return Object.assign({}, state, {
        activeLayout: Object.assign({}, state.activeLayout, {
          items: newItems3
        })
      })

    case ADD_ITEM_TO_ITEM_STATE:
      let newItems2: IFullItemState[] = state.activeLayout.items.slice(0)
      let updateItem: IFullItemState = action.payload.itemState
      let fullItem: Item = action.payload.fullItem
      newItems2.splice(newItems2.indexOf(updateItem), 1)
      newItems2.push(Object.assign({}, updateItem, {
        description: !updateItem.description && fullItem ? getPrefLangString(fullItem.labels, 'en') : updateItem.description, // FIXME language is not from state
        item: fullItem
      }))
      return Object.assign({}, state, {
        activeLayout: Object.assign({}, state.activeLayout, {
          items: newItems2
        })
      })

    case UPDATE_ITEM_DESCRIPTION:
      let newItems4: IFullItemState[] = state.activeLayout.items.slice(0)
      let updateItem4: IFullItemState = action.payload.itemState
      newItems4.splice(newItems4.indexOf(updateItem4), 1)
      newItems4.push(Object.assign({}, updateItem4, {
        description: action.payload.newDescription
      }))
      return Object.assign({}, state, {
        activeLayout: Object.assign({}, state.activeLayout, {
          items: newItems4
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
