import { Dispatch } from 'redux';
import { IRootState } from '../reducers';
import {Action} from '../models/action'

export const SET_SOURCE_CLASS_ACTIVE: string = 'SET_SOURCE_CLASS_ACTIVE'

export interface ISetSourceClassActiveAction extends Action {
  payload: {
    source: string,
    clss: string,
    status: boolean
  }
}

export interface ISourcesActions {
  setSourceClassActive(source: string, clss: string, status: boolean): Promise<ISetSourceClassActiveAction>
}

export default {
  setSourceClassActive: function (source: string, clss: string, status: boolean): (dispatch: Dispatch<IRootState>) => Promise<ISetSourceClassActiveAction> {
    return dispatch => {
      return Promise.resolve(dispatch({
        type: SET_SOURCE_CLASS_ACTIVE,
        payload: {
          source: source,
          clss: clss,
          status: status
        }
      }))
    }
  }
}
