import { Class, Property } from '../services/project-service/data-model';
import {Action} from '../models/action'

export const SET_FILTER_DIVIDER_PERCENTAGE: string = 'SET_FILTER_DIVIDER_PERCENTAGE'
export const SET_FILTER_FOR_CLASS_AND_PROP: string = 'SET_FILTER_FOR_CLASS_AND_PROP'

export function setFilterDividerPercentage(percent: number): any {
  return dispatch => {
    return Promise.resolve(dispatch({
      type: SET_FILTER_DIVIDER_PERCENTAGE,
      payload: percent
    }))
  }
}

export function setFilter(clss: Class, property: Property): any {
  return dispatch => {
    return Promise.resolve(dispatch({
      type: SET_FILTER_FOR_CLASS_AND_PROP,
      payload: {
        clss: clss,
        property: property
      }
    }))
  }
}
