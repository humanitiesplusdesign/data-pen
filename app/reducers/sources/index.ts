import { IMap } from '../../components/collection-utils';
import { ILiteral } from 'models/rdfjs';
import { Class } from 'services/project-service/data-model';
import { RemoteEndpointConfiguration } from 'services/project-service/remote-endpoint-configuration';
import { CLEAR_SOURCES_STATE, SET_SOURCE_CLASS_ACTIVE, ADD_ARCHIVE_SOURCE, ADD_AUTHORITY_SOURCE, ADD_PROP_STATS_TO_SOURCE } from 'actions/sources';
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
  classStats: IMap<number>
  propStats: IMap<IMap<PropertyStatistics>>
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

    case ADD_PROP_STATS_TO_SOURCE:
      let newArchiveSources2: ISource[] = state.archiveSources.slice()
      let newAuthoritySources2: ISource[] = state.authoritySources.slice()
      if (newArchiveSources2.indexOf(action.payload.source) !== -1 && action.payload.propStats) {
        let oldArchiveSource: ISource = newArchiveSources2[newArchiveSources2.indexOf(action.payload.source)]
        let newArchiveSource: ISource = {
          id: oldArchiveSource.id,
          labels: oldArchiveSource.labels,
          classes: oldArchiveSource.classes,
          classStats: oldArchiveSource.classStats,
          propStats: action.payload.propStats
        }
        newArchiveSources2.splice(newArchiveSources2.indexOf(action.payload.source), 1, newArchiveSource)
      }

      if (newAuthoritySources2.indexOf(action.payload.source) !== -1 && action.payload.propStats) {
        let oldAuthoritySource: ISource = newAuthoritySources2[newAuthoritySources2.indexOf(action.payload.source)]
        let newAuthoritySource: ISource = {
          id: oldAuthoritySource.id,
          labels: oldAuthoritySource.labels,
          classes: oldAuthoritySource.classes,
          classStats: oldAuthoritySource.classStats,
          propStats: action.payload.propStats
        }
        newAuthoritySources2.splice(newAuthoritySources2.indexOf(action.payload.source), 1, newAuthoritySource)
      }

      return Object.assign({}, state, {
        authoritySources: newAuthoritySources2,
        archiveSources: newArchiveSources2
      })

    default:
      return state
  }
}
