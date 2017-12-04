import { ILiteral } from 'models/rdfjs';
import { Class } from 'services/project-service/data-model';
import { RemoteEndpointConfiguration } from 'services/project-service/remote-endpoint-configuration';
import { CLEAR_SOURCES_STATE, SET_SOURCE_CLASS_ACTIVE, ADD_ARCHIVE_SOURCE, ADD_AUTHORITY_SOURCE } from 'actions/sources';

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
}

export interface ISourcesState {
  archiveSources: ISource[]
  authoritySources: ISource[]
  sourceClassToggle: ISourceClassTree
}

let defaultState: ISourcesState = {
  archiveSources: [],
  authoritySources: [],
  sourceClassToggle: {
    'http://ldf.fi/fibra/viafCidocLiteEndpointConfiguration': {
      'http://www.cidoc-crm.org/cidoc-crm/E21_Person': true,
      'http://www.cidoc-crm.org/cidoc-crm/E53_Place': true
    },
    'http://ldf.fi/fibra/geonamesCidocLiteEndpointConfiguration': {
      'http://www.cidoc-crm.org/cidoc-crm/E21_Person': true,
      'http://www.cidoc-crm.org/cidoc-crm/E53_Place': true
    }
  }
}

export default function models(state: ISourcesState = defaultState, action): ISourcesState {
  switch (action.type) {

    case CLEAR_SOURCES_STATE:
      return defaultState

    case SET_SOURCE_CLASS_ACTIVE:
      return Object.assign({}, state, {
        sourceClassToggle: Object.assign({}, state.sourceClassToggle, {
          [action.payload.source]: Object.assign({}, state.sourceClassToggle[action.payload.source], {
            [action.payload.clss]: action.payload.status
          })
        })
      })

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
