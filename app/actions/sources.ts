import { ProjectService } from '../services/project-service/project-service';
import { ARGUMENT_PROPERTIES } from 'tslint/lib/rules/completedDocsRule';
import * as angular from 'angular';

import { ISource } from '../reducers/sources';
import { Dispatch } from 'redux';
import { IFibraNgRedux, IRootState } from '../reducers';
import { Action } from '../models/action'
import { Class, IClass } from 'services/project-service/data-model';
import { disconnect } from 'cluster';
import { SparqlItemService, PropertyAndValue, IPropertyAndValue } from 'services/sparql-item-service';
import { SKOS, DataFactory, RDF, INode, FIBRA } from 'models/rdf';
import { INamedNode } from 'models/rdfjs';
import { UUID } from 'components/misc-utils';

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
  constructor(private $ngRedux: IFibraNgRedux, private $q: angular.IQService, private projectService: ProjectService) {}

  public setSourceClassActive(source: string, clss: string, status: boolean): ISetSourceClassActiveAction {
    let ret = this.$ngRedux.dispatch({
      type: SET_SOURCE_CLASS_ACTIVE,
      payload: {
        source: source,
        clss: clss,
        status: status
      }
    })

    let updatedProject = this.$ngRedux.getState().project.project

    this.projectService.saveCitable(updatedProject.updateEndpoint, updatedProject.graphStoreEndpoint, updatedProject)

    return ret
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

  public uploadFile(filename: string, parsedFile: d3.DSVParsedArray<{}>, type: IClass, labelColumn: string, sparqlItemService: SparqlItemService): angular.IPromise<IAddSourceAction> {
    let localColumns: string[] = parsedFile.columns.slice().filter((c) => c !== labelColumn)
    let localColumnProperties: INamedNode[] = localColumns.map((c) => DataFactory.instance.namedNode(this.$ngRedux.getState().project.project.schemaNS + encodeURI(c)))
    return sparqlItemService.createNewItems(parsedFile.map((line) => {
      let properties: IPropertyAndValue[] = []
      properties.push(new PropertyAndValue(SKOS.prefLabel, DataFactory.instance.literal(line[labelColumn])))
      properties.push(new PropertyAndValue(RDF.type, type))
      properties.push(new PropertyAndValue(FIBRA.sourceFile, DataFactory.instance.literal(filename)))

      localColumns.forEach((c, i) => {
        properties.push(new PropertyAndValue(localColumnProperties[i], DataFactory.instance.literal(line[c])))
      })

      return properties
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
