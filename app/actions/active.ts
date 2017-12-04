import * as angular from 'angular';

import { DataFactory, FIBRA, NamedNode, RDF, SKOS } from '../models/rdf';
import { SparqlItemService, PropertyAndValue } from '../services/sparql-item-service';

import { IItemState } from 'reducers/active'
import { Dispatch, Action } from 'redux'
import { IRootState, IFibraNgRedux } from 'reducers'
import { Property } from 'services/project-service/data-model';

export const ADD_ITEM_TO_CURRENT_LAYOUT: string = 'ADD_ITEM_TO_CURRENT_LAYOUT'
export const SET_ACTIVE_DIVIDER_PERCENTAGE: string = 'SET_ACTIVE_DIVIDER_PERCENTAGE'
export const CLEAR_ACTIVE_STATE: string = 'CLEAR_ACTIVE_STATE'
export const ADD_ITEM_TO_ITEM_STATE: string = 'ADD_ITEM_TO_ITEM_STATE'
export const DELETE_ITEM_FROM_LAYOUT: string = 'DELETE_ITEM_FROM_LAYOUT'

export interface IAddItemToCurrentLayoutAction extends Action {
  payload: IItemState
}

export interface ISetActiveDividerPercentage extends Action {
  payload: number
}

export interface IDeleteItemFromCurrentLayoutAction extends Action {
  payload: IItemState
}

export class ActiveActionService {
  /* @ngInject */
  constructor(private $ngRedux: IFibraNgRedux, private sparqlItemService: SparqlItemService) {}

  public addLink(item1: IItemState, item2: IItemState) {
    this.sparqlItemService.alterItem(item1.ids[0], [new PropertyAndValue(new Property(new NamedNode('DataPenLink')), item2.ids[0])])
      .then(() => {
        this.sparqlItemService.getItem(item1.ids, true).then((i) => {
          this.$ngRedux.dispatch({
            type: ADD_ITEM_TO_ITEM_STATE,
            payload: {
              itemState: item1,
              fullItem: i
            }
          })
        })
    
        this.sparqlItemService.getItem(item2.ids, true).then((i) => {
          this.$ngRedux.dispatch({
            type: ADD_ITEM_TO_ITEM_STATE,
            payload: {
              itemState: item2,
              fullItem: i
            }
          })
        })
      })
  }

  public addItemToCurrentLayout(item: IItemState): IAddItemToCurrentLayoutAction {
    // Check that the item doesn't already exist
    console.log(item.ids[0], this.$ngRedux.getState().active.activeLayout.items, this.$ngRedux.getState().active.activeLayout.items.find((i) => i.ids[0] === item.ids[0]))
    if(this.$ngRedux.getState().active.activeLayout.items.find((i) => i.ids[0].value === item.ids[0].value)) {
      return null
    }

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
    return this.sparqlItemService.createNewItem([
      new PropertyAndValue(SKOS.prefLabel, DataFactory.instance.literal(item.description)),
      new PropertyAndValue(RDF.type, DataFactory.instance.namedNode('http://www.cidoc-crm.org/cidoc-crm/E21_Person')),
      new PropertyAndValue(FIBRA.sourceFile, DataFactory.instance.literal('Manually entered'))
    ]).then((node) => {
      item.ids = [node]
      return this.addItemToCurrentLayout(item)
    })
  }

  public deleteItemFromCurrentLayout(item: IItemState): IDeleteItemFromCurrentLayoutAction {
    return this.$ngRedux.dispatch({
      type: DELETE_ITEM_FROM_LAYOUT,
      payload: item
    })
  }
}

angular.module('fibra.actions.active', [])
.config(($provide) => {
  $provide.service('activeActionService', ActiveActionService)
})
