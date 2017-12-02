import * as angular from 'angular';

import { NamedNode } from '../models/rdf';
import { SparqlItemService } from '../services/sparql-item-service';

import { IItemState } from 'reducers/active'
import { Dispatch, Action } from 'redux'
import { IRootState, IFibraNgRedux } from 'reducers'

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

export class ActiveActionService {
  /* @ngInject */
  constructor(private $ngRedux: IFibraNgRedux, private sparqlItemService: SparqlItemService) {}

  public addItemToCurrentLayout(item: IItemState): IAddItemToCurrentLayoutAction {
    // TODO: Fix to use the local item associated with this node
    this.sparqlItemService.getItem(item.ids[0], true).then((i) => {
      this.$ngRedux.dispatch({
        type: ADD_ITEM_TO_ITEM_STATE,
        payload: {
          itemState: item,
          fullItem: i
        }
      })
    })

    return this.$ngRedux.dispatch({
      type: ADD_ITEM_TO_CURRENT_LAYOUT,
      payload: item
    })
  }

  public setActiveDividerPercentage(percent: number): ISetActiveDividerPercentage {
    return this.$ngRedux.dispatch({
      type: SET_ACTIVE_DIVIDER_PERCENTAGE,
      payload: percent
    })
  }
}

angular.module('fibra.actions.active', [])
.config(($provide) => {
  $provide.service('activeActionService', ActiveActionService)
})
