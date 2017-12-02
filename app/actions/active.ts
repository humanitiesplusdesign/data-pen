import { NamedNode } from '../models/rdf';
import { SparqlItemService } from '../services/sparql-item-service';

import { IItemState } from 'reducers/active'
import { Dispatch, Action } from 'redux'
import { IRootState } from 'reducers'

export const ADD_ITEM_TO_CURRENT_LAYOUT: string = 'ADD_ITEM_TO_CURRENT_LAYOUT'
export const SET_ACTIVE_DIVIDER_PERCENTAGE: string = 'SET_ACTIVE_DIVIDER_PERCENTAGE'
export const CLEAR_ACTIVE_STATE: string = 'CLEAR_ACTIVE_STATE'
export const ADD_ITEM_TO_ITEM_STATE: string = 'ADD_ITEM_TO_ITEM_STATE'

export interface IAddItemToCurrentLayoutAction extends Action {
  payload: IItemState
}

export interface ISetActiveDividerPercentage extends Action {
  payload: number
}

export interface IActiveActions {
  addItemToCurrentLayout(item: IItemState, itemService: SparqlItemService): Promise<IAddItemToCurrentLayoutAction>
  setActiveDividerPercentage(percent: number): Promise<ISetActiveDividerPercentage>
}

export default {
  addItemToCurrentLayout: function(item: IItemState, itemService: SparqlItemService): (dispatch: Dispatch<IRootState>) => Promise<IAddItemToCurrentLayoutAction> {
    return dispatch => {
      // TODO: Fix to use the local item associated with this node
      itemService.getItem(item.ids[0], true).then((i) => {
        dispatch({
          type: ADD_ITEM_TO_ITEM_STATE,
          payload: {
            itemState: item,
            fullItem: i
          }
        })
      })

      return Promise.resolve(dispatch({
        type: ADD_ITEM_TO_CURRENT_LAYOUT,
        payload: item
      }))
    }
  },

  setActiveDividerPercentage: function(percent: number): (dispatch: Dispatch<IRootState>) => Promise<ISetActiveDividerPercentage> {
    return dispatch => {
      return Promise.resolve(dispatch({
        type: SET_ACTIVE_DIVIDER_PERCENTAGE,
        payload: percent
      }))
    }
  }
}
