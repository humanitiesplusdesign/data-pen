import { ProjectActionService } from './project';
import { ISetLanguageAction } from './general';
import * as angular from 'angular';

import { DataFactory, FIBRA, NamedNode, RDF, SKOS, INode } from '../models/rdf';
import { SparqlItemService, PropertyAndValue } from '../services/sparql-item-service';

import { IFullItemState, IFullLayoutState } from 'reducers/active'
import { Dispatch, Action } from 'redux'
import { IRootState, IFibraNgRedux } from 'reducers'
import { Property } from 'services/project-service/data-model';
import { ILayoutState, Project, IItemState } from 'services/project-service/project';
import { ProjectService } from 'services/project-service/project-service';
import { getPrefLangString } from 'filters/preferred-language-filter';

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

  public addLink(item1: IFullItemState, item2: IFullItemState): void {
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

  public setLayout(layout: ILayoutState): angular.IPromise<any> {
    let fls: IFullLayoutState = {
      items: [],
      description: ''
    }

    let itemIds: INode[][] = layout.items.map((i) => {
      return i.ids
    })

    return this.sparqlItemService.getItems(itemIds, true)
      .then((items) => {
        fls.items = items.map((i) => {
          let origItemState: IItemState = layout.items.find((fi) => fi.ids.map(id => id.value).indexOf(i.value) !== -1)
          let newItemState: IFullItemState = {
            ids: [new NamedNode(i.value)],
            item: i,
            description: getPrefLangString(i.labels, this.$ngRedux.getState().general.language),
            topOffset: origItemState ? origItemState.topOffset : null,
            leftOffset: origItemState ? origItemState.leftOffset : null
          }
          if (origItemState.mark !== undefined) newItemState.mark = origItemState.mark
          return newItemState
        }).filter(i => i.topOffset && i.leftOffset)

        return this.$ngRedux.dispatch({
          type: SET_ACTIVE_LAYOUT,
          payload: fls
        })
      })
  }

  public addItemsToCurrentLayout(items: IFullItemState[]): IAddItemToCurrentLayoutAction[] {
    let ret: IAddItemToCurrentLayoutAction[] = items.filter((item) => {
      return !this.$ngRedux.getState().active.activeLayout.items.find((i) => i.ids[0].value === item.ids[0].value)
    }).map((item) => {
      return this.$ngRedux.dispatch({
        type: ADD_ITEM_TO_CURRENT_LAYOUT,
        payload: item
      })
    })

    this.sparqlItemService.getItems(
      ret.map((item) => {
        return item.payload.ids
      }),
      true
    ).then((sparqlItems) => {
      return sparqlItems.map((i) => {
        if (i) {
          this.$ngRedux.dispatch({
            type: ADD_ITEM_TO_ITEM_STATE,
            payload: {
              itemState: items.find((item) => item.ids[0].value === i.value),
              fullItem: i
            }
          })
        } else {
          // ID doesn't exist
          this.$ngRedux.dispatch({
            type: UPDATE_ITEM_DESCRIPTION,
            payload: {
              itemState: items.find((item) => item.ids[0].value === i.value),
              newDescription: items.find((item) => item.ids[0].value === i.value).ids[0]
            }
          })
        }
      })
    })

    return ret
  }

  public addItemToCurrentLayout(item: IFullItemState): IAddItemToCurrentLayoutAction {
    // Check that the item doesn't already exist
    if (this.$ngRedux.getState().active.activeLayout.items.find((i) => i.ids[0].value === item.ids[0].value)) {
      return null
    }

    this.sparqlItemService.getItem(item.ids, true).then((i) => {
      if (i) {
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

    let ret: IAddItemToCurrentLayoutAction = this.$ngRedux.dispatch({
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
      active: true,
      counts: {},
      description: this.$ngRedux.getState().active.activeLayout.description
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
    let ret: IDeleteItemFromCurrentLayoutAction = this.$ngRedux.dispatch({
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
      active: true,
      counts: {},
      description: this.$ngRedux.getState().active.activeLayout.description
    }
    this.projectService.saveCitable(proj.updateEndpoint, proj.graphStoreEndpoint, proj)

    return ret
  }

  public saveCurrentLayout(): IDeleteItemFromCurrentLayoutAction {
    // Currently a stub - anywhere this is used we actually need a new action that properly goes through a reducer
    let proj: Project = angular.copy(this.$ngRedux.getState().project.project)
    let activeLayoutIndex: number = proj.layouts.findIndex((l => l.active))
    proj.layouts[activeLayoutIndex] = {
      items: this.$ngRedux.getState().active.activeLayout.items.map((i) => {
        return {
          ids: i.ids,
          topOffset: i.topOffset,
          leftOffset: i.leftOffset,
          mark: i.mark
        }
      }),
      // Build active counts
      counts: this.$ngRedux.getState().active.activeLayout.items.reduce((a, b) => {
        b.item.localProperties.concat(b.item.remoteProperties).filter(p => p.property.value === RDF.type.value)
          .forEach(p => p.values.forEach(v => {
            if(a[v.value.value] !== undefined) {
              a[v.value.value].count += 1
            } else {
              a[v.value.value] = {
                count: 1,
                description: this.$ngRedux.getState().project.project.dataModel.classMap.get(v.value.value).labels.values()
              }
            }
          }))
        return a
      }, {}),
      active: true,
      description: this.$ngRedux.getState().active.activeLayout.description
    }
    this.projectService.saveCitable(proj.updateEndpoint, proj.graphStoreEndpoint, proj)

    return null
  }
}

angular.module('fibra.actions.active', [])
.config(($provide) => {
  $provide.service('activeActionService', ActiveActionService)
})
