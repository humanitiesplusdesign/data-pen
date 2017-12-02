import * as angular from 'angular';

import { ISource } from '../reducers/sources';
import { Dispatch } from 'redux';
import { IFibraNgRedux, IRootState } from '../reducers';
import { Action } from '../models/action'
import { Class } from 'services/project-service/data-model';
import { disconnect } from 'cluster';
import { SparqlItemService, PropertyAndValue } from 'services/sparql-item-service';
import { SKOS, DataFactory, RDF, INode, FIBRA } from 'models/rdf';

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

export class SourcesActionService {
  constructor(private $ngRedux: IFibraNgRedux, private $q: angular.IQService) {}

  public setSourceClassActive(source: string, clss: string, status: boolean): ISetSourceClassActiveAction {
    return this.$ngRedux.dispatch({
      type: SET_SOURCE_CLASS_ACTIVE,
      payload: {
        source: source,
        clss: clss,
        status: status
      }
    })
  }

  public addArchiveSource(source: ISource): IAddSourceAction {
    return this.$ngRedux.dispatch({
      type: ADD_ARCHIVE_SOURCE,
      payload: source
    })
  }

  public addAuthoritySource(source: ISource): IAddSourceAction {
    return this.$ngRedux.dispatch({
      type: ADD_AUTHORITY_SOURCE,
      payload: source
    })
  }

  public uploadFile(filename: string, parsedFile: d3.DSVParsedArray<{}>, type: Class, labelColumn: string, sparqlItemService: SparqlItemService): angular.IPromise<IAddSourceAction> {
    let localColumns: string[] = parsedFile.columns.slice().filter((c) => c !== labelColumn)

    return this.$q.all(parsedFile.map((line) => {
      return sparqlItemService.createNewItem([
        new PropertyAndValue(SKOS.prefLabel, DataFactory.instance.literal(line[labelColumn])),
        new PropertyAndValue(RDF.type, type.id),
        new PropertyAndValue(FIBRA.sourceFile, DataFactory.instance.literal(filename))
      ])
    })).then(() => {
      return this.$ngRedux.dispatch({
        type: UPLOAD_FILE,
        payload: null
      })
    })
  }
}

angular.module('fibra.actions.sources', [])
.config(($provide) => {
  $provide.service('sourcesActionService', SourcesActionService)
})
