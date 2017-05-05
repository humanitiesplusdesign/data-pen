import {INode} from '../models/rdf'
import {Action} from 'redux'

export const VERIFY_ITEM = 'VERIFY_ITEM'

interface IVerifyAction extends Action {
  payload: INode
}

export function verifyItem(item: INode): IVerifyAction {
  return {
    type: VERIFY_ITEM,
    payload: item
  }
}
