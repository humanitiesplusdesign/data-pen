import { Class, Property } from '../services/project-service/data-model';
import {Action} from '../models/action'
import { PropertyService } from 'services/property-service';

export const SET_FILTER_DIVIDER_PERCENTAGE: string = 'SET_FILTER_DIVIDER_PERCENTAGE'
export const SET_FILTER_FOR_CLASS_AND_PROP: string = 'SET_FILTER_FOR_CLASS_AND_PROP'
export const SET_FILTER_SELECTION: string = 'SET_FILTER_SELECTION'
export const REMOVE_FILTER: string = 'REMOVE_FILTER'
export const CLEAR_FILTER_STATE: string = 'CLEAR_FILTER_STATE'
export const UPDATE_PROPERTY_ON_FILTER: string = 'UPDATE_PROPERTY_ON_FILTER'

export function setFilterDividerPercentage(percent: number): any {
  return dispatch => {
    return Promise.resolve(dispatch({
      type: SET_FILTER_DIVIDER_PERCENTAGE,
      payload: percent
    }))
  }
}

export function setFilter(clss: Class, property: Property, propertyService: PropertyService): any {
  return dispatch => {
    return Promise.resolve(dispatch({
      type: SET_FILTER_FOR_CLASS_AND_PROP,
      payload: {
        clss: clss,
        property: property
      }
    })).then(() => {
      return propertyService.getBasicProperty(property)
        .then((bp) => {
          dispatch({
            type: UPDATE_PROPERTY_ON_FILTER,
            payload: {
              clss: clss,
              property: bp
            }
          })

          return propertyService.getDetailedProperty(bp)
            .then((dp) => {
              return dispatch({
                type: UPDATE_PROPERTY_ON_FILTER,
                payload: {
                  clss: clss,
                  property: dp
                }
              })
            })
        })
    })
  }
}

export function removeFilter(clss: Class, property: Property): any {
  return dispatch => {
    return Promise.resolve(dispatch({
      type: REMOVE_FILTER,
      payload: {
        clss: clss,
        property: property
      }
    }))
  }
}

export function setFilterSelection(clss: Class, property: Property, selection: number[]): any {
  return dispatch => {
    return Promise.resolve(dispatch({
      type: SET_FILTER_SELECTION,
      payload: {
        clss: clss,
        property: property,
        selection: selection
      }
    }))
  }
}
