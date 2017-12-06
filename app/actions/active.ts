import * as angular from 'angular';

import { DataFactory, FIBRA, NamedNode, RDF, SKOS, INode } from '../models/rdf';
import { SparqlItemService, PropertyAndValue } from '../services/sparql-item-service';

import { IFullItemState, IFullLayoutState } from 'reducers/active'
import { Dispatch, Action } from 'redux'
import { IRootState, IFibraNgRedux } from 'reducers'
import { Property } from 'services/project-service/data-model';
import { ILayoutState, Project } from 'services/project-service/project';
import { ProjectService } from 'services/project-service/project-service';

export const ADD_ITEM_TO_CURRENT_LAYOUT: string = 'ADD_ITEM_TO_CURRENT_LAYOUT'
export const SET_ACTIVE_DIVIDER_PERCENTAGE: string = 'SET_ACTIVE_DIVIDER_PERCENTAGE'
export const CLEAR_ACTIVE_STATE: string = 'CLEAR_ACTIVE_STATE'
export const ADD_ITEM_TO_ITEM_STATE: string = 'ADD_ITEM_TO_ITEM_STATE'
export const DELETE_ITEM_FROM_LAYOUT: string = 'DELETE_ITEM_FROM_LAYOUT'
export const UPDATE_ITEM_DESCRIPTION: string = 'UPDATE_ITEM_DESCRIPTION'
export const SET_ACTIVE_LAYOUT: string = 'SET_ACTIVE_LAYOUT'

export interface IAddItemToCurrentLayoutAction extends Action {
  payload: IFullItemState
}

export interface ISetActiveDividerPercentage extends Action {
  payload: number
}

export interface IDeleteItemFromCurrentLayoutAction extends Action {
  payload: IFullItemState
}

export interface ISetLayout extends angular.IPromise<Action> {
  payload: IFullLayoutState
}

export class ActiveActionService {
  /* @ngInject */
  constructor(private $ngRedux: IFibraNgRedux, private sparqlItemService: SparqlItemService, private projectService: ProjectService) {}

  public addLink(item1: IFullItemState, item2: IFullItemState) {
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

  public setLayout(layout: ILayoutState): any {
    let fls: IFullLayoutState = {
      items: []
    }

    let itemIds: INode[][] = layout.items.map((i) => {
      return i.ids
    })

    return this.sparqlItemService.getItems(itemIds, true)
      .then((items) => {
        fls.items = items.map((i) => {
          let origItemState = layout.items.find((fi) => fi.ids.map(id => id.value).indexOf(i.value) !== -1)
          return {
            ids: [new NamedNode(i.value)],
            item: i,
            description: i.remoteProperties.find((rp) => rp.property.value === SKOS.prefLabel.value) ?
              i.remoteProperties.find((rp) => rp.property.value === SKOS.prefLabel.value).values[0].value.value :
              '?',
            topOffset: origItemState ? origItemState.topOffset : null,
            leftOffset: origItemState ? origItemState.leftOffset : null
          }
        }).filter(i => i.topOffset && i.leftOffset)

        return this.$ngRedux.dispatch({
          type: SET_ACTIVE_LAYOUT,
          payload: fls
        })
      })
  }

  public addItemToCurrentLayout(item: IFullItemState): IAddItemToCurrentLayoutAction {
    // Check that the item doesn't already exist
    if(this.$ngRedux.getState().active.activeLayout.items.find((i) => i.ids[0].value === item.ids[0].value)) {
      return null
    }

    this.sparqlItemService.getItem(item.ids, true).then((i) => {
      if(i) {
        this.$ngRedux.dispatch({
          type: ADD_ITEM_TO_ITEM_STATE,
          payload: {
            itemState: item,
            fullItem: i
          }
        })
      } else {
        // ID doesn't exist
        this.$ngRedux.dispatch({
          type: UPDATE_ITEM_DESCRIPTION,
          payload: {
            itemState: item,
            newDescription: item.ids[0]
          }
        })
      }
    })

    let ret = this.$ngRedux.dispatch({
      type: ADD_ITEM_TO_CURRENT_LAYOUT,
      payload: item
    })

    let proj: Project = angular.copy(this.$ngRedux.getState().project.project)
    proj.layouts[0] = {
      items: this.$ngRedux.getState().active.activeLayout.items.map((i) => {
        return {
          ids: i.ids,
          topOffset: i.topOffset,
          leftOffset: i.leftOffset
        }
      }),
      active: true
    }
    this.projectService.saveCitable(proj.updateEndpoint, proj.graphStoreEndpoint, proj)

    return ret
  }

  public setActiveDividerPercentage(percent: number): ISetActiveDividerPercentage {
    return this.$ngRedux.dispatch({
      type: SET_ACTIVE_DIVIDER_PERCENTAGE,
      payload: percent
    })
  }

  public createNewItem(item: IFullItemState): angular.IPromise<IAddItemToCurrentLayoutAction> {
    return this.sparqlItemService.createNewItem([
      new PropertyAndValue(SKOS.prefLabel, DataFactory.instance.literal(item.description)),
      new PropertyAndValue(RDF.type, DataFactory.instance.namedNode('http://www.cidoc-crm.org/cidoc-crm/E21_Person')),
      new PropertyAndValue(FIBRA.sourceFile, DataFactory.instance.literal('Manually entered'))
    ]).then((node) => {
      item.ids = [node]
      return this.addItemToCurrentLayout(item)
    })
  }

  public deleteItemFromCurrentLayout(item: IFullItemState): IDeleteItemFromCurrentLayoutAction {
    let ret = this.$ngRedux.dispatch({
      type: DELETE_ITEM_FROM_LAYOUT,
      payload: item
    })

    let proj: Project = angular.copy(this.$ngRedux.getState().project.project)
    proj.layouts[0] = {
      items: this.$ngRedux.getState().active.activeLayout.items.map((i) => {
        return {
          ids: i.ids,
          topOffset: i.topOffset,
          leftOffset: i.leftOffset
        }
      }),
      active: true
    }
    this.projectService.saveCitable(proj.updateEndpoint, proj.graphStoreEndpoint, proj)

    return ret
  }

  public moveItemOnCurrentLayout(): IDeleteItemFromCurrentLayoutAction {
    // Currently a stub
    let proj: Project = angular.copy(this.$ngRedux.getState().project.project)
    proj.layouts[0] = {
      items: this.$ngRedux.getState().active.activeLayout.items.map((i) => {
        return {
          ids: i.ids,
          topOffset: i.topOffset,
          leftOffset: i.leftOffset
        }
      }),
      active: true
    }
    this.projectService.saveCitable(proj.updateEndpoint, proj.graphStoreEndpoint, proj)

    return null
  }
}

angular.module('fibra.actions.active', [])
.config(($provide) => {
  $provide.service('activeActionService', ActiveActionService)
})
