import {Action} from 'models/action'
import {INode, DataFactory, OWL, SKOS, RDF} from 'models/rdf'
import {INamedNode, ITerm} from 'models/rdfjs'
import {IPropertyAndValue, SparqlItemService, PropertyAndValue, Item} from 'services/sparql-item-service'

export const CREATE_TYPE: string = 'CREATE_TYPE'
export const ITEMS_CREATED: string = 'ITEMS_CREATED'
export const CREATE_DISPLAY_ITEMS: string = 'CREATE_DISPLAY_ITEMS'
export const ITEMS_DELETED: string = 'ITEMS_DELETED'
export const CLEAR_TYPES: string = 'CLEAR_TYPES'
export const DISPLAY_ITEMS: string = 'DISPLAY_ITEMS'
export const HIDE_ITEM: string = 'HIDE_ITEM'
export const CREATE_LOCAL_ITEM: string = 'CREATE_LOCAL_ITEM'
export const ITEM_PROPERTIES: string = 'ITEM_PROPERTIES'
export const SET_ORDERED_TYPES: string = 'SET_ORDERED_TYPES'
export const LOAD_ALL_ITEMS: string = 'LOAD_ALL_ITEMS'
export const ALL_ITEMS_LOADED: string = 'ALL_ITEMS_LOADED'

export function loadAllItems(sparqlItemService: SparqlItemService): any {
  return dispatch => {
    return sparqlItemService.getAllItems().then((items: Item[]) => {
      dispatch(allItemsLoaded(items))
    })
  }
}

export function allItemsLoaded(items: Item[]): Action {
  return {
    type: ALL_ITEMS_LOADED,
    payload: {
      items: items
    }
  }
}

export function displayItem(item: ITerm, coordinates?: [number]): Action {
  return {
    type: DISPLAY_ITEMS,
    payload: {
      items: item ? [item] : [],
      coordinates: [coordinates]
    }
  }
}

export function displayItems(items: ITerm[], coordinates?: [number][]): Action {
  return {
    type: DISPLAY_ITEMS,
    payload: {
      items: items,
      coordinates: coordinates
    }
  }
}

export function itemProperty(sparqlItemService: SparqlItemService, item: INode, propertiesToAdd: IPropertyAndValue[], propertiesToRemove?: IPropertyAndValue[]): any {
  return dispatch => {
    return sparqlItemService.alterItem(item, propertiesToAdd, propertiesToRemove).then((str) => {
      dispatch(itemPropertyUpdated())
    })
  }
}

export function itemPropertyUpdated(): Action {
  return {
    type: ITEM_PROPERTIES,
    payload: {

    }
  }
}

export function createItem($q: angular.IQService, sparqlItemService: SparqlItemService, item?: INode, typ?: string): any {
  return dispatch => {
    dispatch(createItems($q, sparqlItemService, item ? [item] : [], typ))
  }
}

export function createItems($q: angular.IQService, sparqlItemService: SparqlItemService, items: INode[], typ?: string): any {
  return dispatch => {
    return createItemsInternal($q, sparqlItemService, items, typ).then((nodes) => {
      dispatch(itemsCreated(nodes))
    })
  }
}

export function itemsCreated(nodes): Action {
  return {
    type: ITEMS_CREATED,
    payload: {
      items: nodes
    }
  }
}

export function createDisplayItem($q: angular.IQService, sparqlItemService: SparqlItemService, item?: INode, typ?: string): any {
  return dispatch => {
    return createItemsInternal($q, sparqlItemService, item ? [item] : [], typ).then((newItems) => {
      return dispatch(displayItems(newItems))
    })
  }
}

export function createDisplayItems($q: angular.IQService, sparqlItemService: SparqlItemService, items: INode[], typ?: string): any {
  return dispatch => {
    return createItemsInternal($q, sparqlItemService, items, typ).then((newItems) => {
      return dispatch(displayItems(newItems))
    })
  }
}

export function deleteItem($q: angular.IQService, sparqlItemService: SparqlItemService,item: INode): any {
  return dispatch => {
    return dispatch(deleteItems($q, sparqlItemService, item ? [item] : []))
  }
}

export function deleteItems($q: angular.IQService, sparqlItemService: SparqlItemService, items: INode[]): any {
  return dispatch => {
    return $q.all(items.map((item: INode) => {
      return sparqlItemService.deleteItem(item)
    })).then(() => {
      return dispatch(itemsDeleted(items))
    })
  }
}

export function itemsDeleted(items: INode[]): Action {
  return {
    type: ITEMS_DELETED,
    payload: {
      items: items
    }
  }
}

export function hideItem(item: ITerm): Action {
  return {
    type: HIDE_ITEM,
    payload: item
  }
}

function createItemsInternal($q: angular.IQService, sparqlItemService: SparqlItemService, items, type): angular.IPromise<INode[]> {
    let typeNode: INamedNode = type ? DataFactory.instance.namedNode(type) : OWL.Thing

    if (items[0]) {
      let proms: angular.IPromise<INode>[] = items.map((node) => {
        if (node.value) {
          return sparqlItemService.createNewItem([new PropertyAndValue(SKOS.prefLabel, DataFactory.instance.literal(node.value)), new PropertyAndValue(RDF.type, typeNode)])
        } else {
          return sparqlItemService.createNewItem([new PropertyAndValue(RDF.type, typeNode)])
        }
      })
      return $q.all(proms)
    } else {
      return sparqlItemService.createNewItem([new PropertyAndValue(RDF.type, typeNode), new PropertyAndValue(SKOS.prefLabel, DataFactory.instance.literal(''))]).then((node) => {
        return [node]
      })
    }
  }
