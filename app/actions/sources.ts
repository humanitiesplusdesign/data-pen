import { ISource } from '../reducers/frontend/sources';
import { Dispatch } from 'redux';
import { IRootState } from '../reducers';
import {Action} from '../models/action'
import { Class } from 'services/project-service/data-model';
import { disconnect } from 'cluster';
import { SparqlItemService, PropertyAndValue } from 'services/sparql-item-service';
import { SKOS, DataFactory, RDF } from 'models/rdf';

export const SET_SOURCE_CLASS_ACTIVE: string = 'SET_SOURCE_CLASS_ACTIVE'
export const ADD_ARCHIVE_SOURCE: string = 'ADD_ARCHIVE_SOURCE'
export const ADD_AUTHORITY_SOURCE: string = 'ADD_AUTHORITY_SOURCE'
export const CLEAR_SOURCES_STATE: string = 'CLEAR_SOURCES_STATE'
export const UPLOAD_FILE: string = 'UPLOAD_FILE'

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
  addArchiveSource(source: ISource): Promise<IAddSourceAction>,
  addAuthoritySource(source: ISource): Promise<IAddSourceAction>,
  uploadFile(parsedFile: d3.DSVParsedArray<{}>, type: Class, labelColumn: string, sparqlItemService: SparqlItemService): Promise<IAddSourceAction>
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
  addArchiveSource: function(source: ISource): (dispatch: Dispatch<IRootState>) => Promise<IAddSourceAction> {
    return dispatch => {
      return Promise.resolve(dispatch({
        type: ADD_ARCHIVE_SOURCE,
        payload: source
      }))
    }
  },
  addAuthoritySource: function(source: ISource): (dispatch: Dispatch<IRootState>) => Promise<IAddSourceAction> {
    return dispatch => {
      return Promise.resolve(dispatch({
        type: ADD_AUTHORITY_SOURCE,
        payload: source
      }))
    }
  },
  uploadFile: (parsedFile: d3.DSVParsedArray<{}>, type: Class, labelColumn: string, sparqlItemService: SparqlItemService): (dispatch: Dispatch<IRootState>) => Promise<IAddSourceAction> => {
    return dispatch => {

      let localColumns: string[] = parsedFile.columns.slice().filter((c) => c !== labelColumn)
      parsedFile.forEach((line) => {
        sparqlItemService.createNewItem([
          new PropertyAndValue(SKOS.prefLabel, DataFactory.instance.literal(line[labelColumn])),
          new PropertyAndValue(RDF.type, type.id)
        ])
      })

      return Promise.resolve(dispatch({
        type: UPLOAD_FILE,
        payload: null
      }))
    }
  }
}
