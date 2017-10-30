import { IItemState } from 'reducers/frontend/active'
import { Dispatch, Action } from 'redux'
import { IRootState } from 'reducers'

export const ADD_ITEM_TO_CURRENT_LAYOUT: string = 'ADD_ITEM_TO_CURRENT_LAYOUT'
export const SET_ACTIVE_DIVIDER_PERCENTAGE: string = 'SET_ACTIVE_DIVIDER_PERCENTAGE'

export interface IAddItemToCurrentLayoutAction extends Action {
  payload: IItemState
}

export interface ISetActiveDividerPercentage extends Action {
  payload: number
}

export interface IActiveActions {
  addItemToCurrentLayout(item: IItemState): Promise<IAddItemToCurrentLayoutAction>
  setActiveDividerPercentage(percent: number): Promise<ISetActiveDividerPercentage>
}

export default {

  addItemToCurrentLayout: function(item: IItemState): (dispatch: Dispatch<IRootState>) => Promise<IAddItemToCurrentLayoutAction> {
    return dispatch => {
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
