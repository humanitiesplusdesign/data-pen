import { SET_SOURCE_CLASS_ACTIVE } from '../../../actions/sources'

export interface ISourceClassTree {
  [source: string]: {
    [clss: string]: boolean
  }
}

export interface ISourcesState {
  sourceClassToggle: ISourceClassTree
}

let defaultState: ISourcesState = {
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

    case SET_SOURCE_CLASS_ACTIVE:
      return Object.assign({}, state, {
        sourceClassToggle: Object.assign({}, state.sourceClassToggle, {
          [action.payload.source]: Object.assign({}, state.sourceClassToggle[action.payload.source], {
            [action.payload.clss]: action.payload.status
          })
        })
      })

    default:
      return state
  }
}
