import { ISource } from '../reducers/frontend/sources';
import { Dispatch } from 'redux';
import { IRootState } from '../reducers';
import {Action} from '../models/action'

export const SET_SOURCE_CLASS_ACTIVE: string = 'SET_SOURCE_CLASS_ACTIVE'
export const ADD_SOURCE: string = 'ADD_SOURCE'
export const CLEAR_SOURCES_STATE: string = 'CLEAR_SOURCES_STATE'

export interface ISetSourceClassActiveAction extends Action {
  payload: {
    source: string,
    clss: string,
    status: boolean
  }
}

export interface IAddSourceAction extends Action {
  payload: ISource
}

export interface ISourcesActions {
  setSourceClassActive(source: string, clss: string, status: boolean): Promise<ISetSourceClassActiveAction>
  addSource(source: ISource): Promise<IAddSourceAction>
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
  },
  addSource: function(source: ISource): (dispatch: Dispatch<IRootState>) => Promise<IAddSourceAction> {
    return dispatch => {
      return Promise.resolve(dispatch({
        type: ADD_SOURCE,
        payload: source
      }))
    }
  }
}
