import {Action} from '../models/action'
import {TreeNode} from '../components/tree/tree-component'
import { PropertyAndValue } from '../services/sparql-item-service'
import { SKOS, DataFactory, RDF, OWL } from '../models/rdf'
import { SparqlItemService } from '../services/sparql-item-service'

export const CREATE_TYPE: string = 'CREATE_TYPE'
export const TYPE_CREATED: string = 'TYPE_CREATED'
export const ADD_TYPE: string = 'ADD_TYPE'
export const CLEAR_TYPES: string = 'CLEAR_TYPES'
export const SET_ORDERED_TYPES: string = 'SET_ORDERED_TYPES'

export function addType(type: TreeNode):Action {
  return {
    type: ADD_TYPE,
    payload: type
  }
}

export function clearTypes(): Action {
  return {
    type: CLEAR_TYPES,
    payload: undefined
  }
}

export function setOrderedTypes(types: TreeNode[]): Action {
  return {
    type: SET_ORDERED_TYPES,
    payload: types
  }
}

export function createType(label: string, service: SparqlItemService): any {
  return dispatch => {
    return service.createNewItem([new PropertyAndValue(SKOS.prefLabel, DataFactory.instance.literal(label)), new PropertyAndValue(RDF.type, OWL.Class)])
      .then((node) => {
        dispatch(typeCreated(node, label))
      })
  }
}

export function typeCreated(node: any, label: string): Action {
  return {
    type: TYPE_CREATED,
    payload: {
      node: node,
      label: label
    }
  }
}
