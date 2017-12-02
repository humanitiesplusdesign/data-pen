import { Class, Property } from '../services/project-service/data-model';
import {Action} from '../models/action'
import { PropertyService } from 'services/property-service';
import { Dispatch } from 'redux';
import { IRootState, IFibraNgRedux } from 'reducers';
import * as angular from 'angular';

export const SET_FILTER_DIVIDER_PERCENTAGE: string = 'SET_FILTER_DIVIDER_PERCENTAGE'
export const SET_FILTER_FOR_CLASS_AND_PROP: string = 'SET_FILTER_FOR_CLASS_AND_PROP'
export const SET_FILTER_SELECTION: string = 'SET_FILTER_SELECTION'
export const REMOVE_FILTER: string = 'REMOVE_FILTER'
export const CLEAR_FILTER_STATE: string = 'CLEAR_FILTER_STATE'
export const UPDATE_PROPERTY_ON_FILTER: string = 'UPDATE_PROPERTY_ON_FILTER'

export interface ISetFilterDividerPercentage extends Action {
  payload: number
}

export interface ISetFilter extends Action {
  payload: {
    clss: Class,
    property: Property
  }
}

export interface IRemoveFilter extends Action {
  payload: {
    clss: Class,
    property: Property
  }
}

export interface ISetFilterSelection extends Action {
  payload: {
    clss: Class,
    property: Property
    selection: number[]
  }
}

export class FilterActionService {
  /* @ngInject */
  constructor(private $ngRedux: IFibraNgRedux, private propertyService: PropertyService) {
  }
  public setFilterDividerPercentage(percent: number): ISetFilterDividerPercentage {
    return this.$ngRedux.dispatch({
      type: SET_FILTER_DIVIDER_PERCENTAGE,
      payload: percent
    })
  }
  public setFilter(clss: Class, property: Property, propertyService: PropertyService): angular.IPromise<ISetFilter> {
    this.$ngRedux.dispatch({
      type: SET_FILTER_FOR_CLASS_AND_PROP,
      payload: {
        clss: clss,
        property: property
      }
    })
    return this.propertyService.getBasicProperty(property)
      .then((bp) => {
        this.$ngRedux.dispatch({
          type: UPDATE_PROPERTY_ON_FILTER,
          payload: {
            clss: clss,
            property: bp
          }
        })
        return propertyService.getDetailedProperty(bp)
          .then((dp) => {
            return this.$ngRedux.dispatch({
              type: UPDATE_PROPERTY_ON_FILTER,
              payload: {
                clss: clss,
                property: dp
              }
            })
          })
        })
    }

  public removeFilter(clss: Class, property: Property): IRemoveFilter {
    return this.$ngRedux.dispatch({
      type: REMOVE_FILTER,
      payload: {
        clss: clss,
        property: property
      }
    })
  }

  public setFilterSelection(clss: Class, property: Property, selection: number[]): ISetFilterSelection {
    return this.$ngRedux.dispatch({
      type: SET_FILTER_SELECTION,
      payload: {
        clss: clss,
        property: property,
        selection: selection
      }
    })
  }
}

angular.module('fibra.actions.filter', [])
.config(($provide) => {
  $provide.service('filterActionService', FilterActionService)
})
