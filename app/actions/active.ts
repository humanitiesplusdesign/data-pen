import * as angular from 'angular';

import { DataFactory, FIBRA, NamedNode, RDF, SKOS } from '../models/rdf';
import { SparqlItemService, PropertyAndValue } from '../services/sparql-item-service';

import { IItemState } from 'reducers/active'
import { Dispatch, Action } from 'redux'
import { IRootState, IFibraNgRedux } from 'reducers'

export const ADD_ITEM_TO_CURRENT_LAYOUT: string = 'ADD_ITEM_TO_CURRENT_LAYOUT'
export const SET_ACTIVE_DIVIDER_PERCENTAGE: string = 'SET_ACTIVE_DIVIDER_PERCENTAGE'
export const CLEAR_ACTIVE_STATE: string = 'CLEAR_ACTIVE_STATE'
export const ADD_ITEM_TO_ITEM_STATE: string = 'ADD_ITEM_TO_ITEM_STATE'
export const CREATE_NEW_ITEM: string = 'CREATE_NEW_ITEM'

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
    this.sparqlItemService.getItem(item.ids, true).then((i) => {
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

  public createNewItem(item: IItemState): angular.IPromise<IAddItemToCurrentLayoutAction> {
    console.log('before')
    return this.sparqlItemService.createNewItem([
      new PropertyAndValue(SKOS.prefLabel, DataFactory.instance.literal(item.description)),
      new PropertyAndValue(RDF.type, DataFactory.instance.namedNode('http://www.cidoc-crm.org/cidoc-crm/E21_Person')),
      new PropertyAndValue(FIBRA.sourceFile, DataFactory.instance.literal('Manually entered'))
    ]).then((node) => {
      console.log('after')
      item.ids = [node]
      return this.addItemToCurrentLayout(item)
    })
  }
}

angular.module('fibra.actions.active', [])
.config(($provide) => {
  $provide.service('activeActionService', ActiveActionService)
})
