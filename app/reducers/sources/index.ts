import { IMap } from '../../components/collection-utils';
import { ILiteral } from 'models/rdfjs';
import { Class } from 'services/project-service/data-model';
import { RemoteEndpointConfiguration } from 'services/project-service/remote-endpoint-configuration';
import { CLEAR_SOURCES_STATE, SET_SOURCE_CLASS_ACTIVE, ADD_ARCHIVE_SOURCE, ADD_AUTHORITY_SOURCE } from 'actions/sources';
import { PropertyStatistics } from 'services/sparql-statistics-service';

export interface ISourceClassTree {
  [source: string]: {
    [clss: string]: boolean
  }
}

export interface ISource {
  id: string,
  labels: ILiteral[],
  classes: Class[],
  classStats: {classname: number}[]
  propStats: IMap<PropertyStatistics>
}

export interface ISourcesState {
  archiveSources: ISource[]
  authoritySources: ISource[]
}

let defaultState: ISourcesState = {
  archiveSources: [],
  authoritySources: []
}

export default function models(state: ISourcesState = defaultState, action): ISourcesState {
  switch (action.type) {

    case CLEAR_SOURCES_STATE:
      return defaultState

    case ADD_ARCHIVE_SOURCE:
      let newArchiveSources: ISource[] = state.archiveSources.slice()
      newArchiveSources.push(action.payload)
      return Object.assign({}, state, {
        archiveSources: newArchiveSources
      })

    case ADD_AUTHORITY_SOURCE:
      let newAuthoritySources: ISource[] = state.authoritySources.slice()
      newAuthoritySources.push(action.payload)
      return Object.assign({}, state, {
        authoritySources: newAuthoritySources
      })

    default:
      return state
  }
}
