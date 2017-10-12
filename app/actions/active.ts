import { ItemState } from '../reducers/frontend/active';
import {Action} from '../models/action'

export const ADD_ITEM_TO_CURRENT_LAYOUT: string = 'ADD_ITEM_TO_CURRENT_LAYOUT'

export function addItemToCurrentLayout(item: ItemState): any {
  return dispatch => {
    return Promise.resolve(dispatch({
      type: ADD_ITEM_TO_CURRENT_LAYOUT,
      payload: item
    }))
  }
}
