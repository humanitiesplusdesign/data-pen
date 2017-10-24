import { ItemState } from '../reducers/frontend/active';
import {Action} from '../models/action'

export const SET_FILTER_DIVIDER_PERCENTAGE: string = 'SET_FILTER_DIVIDER_PERCENTAGE'

export function setFilterDividerPercentage(percent: number): any {
  return dispatch => {
    return Promise.resolve(dispatch({
      type: SET_FILTER_DIVIDER_PERCENTAGE,
      payload: percent
    }))
  }
}
