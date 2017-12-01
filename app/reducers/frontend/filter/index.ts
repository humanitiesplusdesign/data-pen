import { Class, Property } from '../../../services/project-service/data-model';
import {
  CLEAR_FILTER_STATE,
  REMOVE_FILTER,
  SET_FILTER_DIVIDER_PERCENTAGE,
  SET_FILTER_FOR_CLASS_AND_PROP,
  SET_FILTER_SELECTION,
  UPDATE_PROPERTY_ON_FILTER,
} from '../../../actions/filter';
import { BasicProperty, DetailedProperty } from 'services/property-service';

export interface IFilter {
  type: string
  description: string
  domain: number[],
  selection: number[],
  clss: Class,
  prop: Property | BasicProperty | DetailedProperty
}

export interface IClassFilterTree {
  [clss: string]: {
    [prop: string]: IFilter
  }
}

export interface IFilterState {
  dividerPercent: number,
  filtersByClass: IClassFilterTree
}

let defaultState: IFilterState = {
  dividerPercent: 0,
  filtersByClass: {}
}

export default function models(state: IFilterState = defaultState, action): IFilterState {
  switch (action.type) {

    case CLEAR_FILTER_STATE:
      return defaultState

    case SET_FILTER_DIVIDER_PERCENTAGE:
      return Object.assign({}, state, {
        dividerPercent: action.payload
      })

    case SET_FILTER_FOR_CLASS_AND_PROP:
      return Object.assign({}, state, {
        filtersByClass: Object.assign({}, state.filtersByClass, {
          [action.payload.clss.id.value]: Object.assign({}, state.filtersByClass[action.payload.clss.id.value], {
            [action.payload.property.id.value]: {
              type: 'TIMELINE',
              description: 'Timeline',
              domain: [],
              selection: [100, 2400],
              clss: action.payload.clss,
              prop: action.payload.property
            }
          })
        })
      })

    case UPDATE_PROPERTY_ON_FILTER:
      return Object.assign({}, state, {
        filtersByClass: Object.assign({}, state.filtersByClass, {
          [action.payload.clss.id.value]: Object.assign({}, state.filtersByClass[action.payload.clss.id.value], {
            [action.payload.property.id.value]: Object.assign({}, state.filtersByClass[action.payload.clss.id.value][action.payload.property.id.value], {
              domain: [action.payload.property.minimumValue ? action.payload.property.minimumValue : state.filtersByClass[action.payload.clss.id.value][action.payload.property.id.value].domain[0], action.payload.property.maximumValue ? action.payload.property.maximumValue : state.filtersByClass[action.payload.clss.id.value][action.payload.property.id.value].domain[1]],
              prop: action.payload.property
            })
          })
        })
      })

    case SET_FILTER_SELECTION:
      return Object.assign({}, state, {
        filtersByClass: Object.assign({}, state.filtersByClass, {
          [action.payload.clss.id.value]: Object.assign({}, state.filtersByClass[action.payload.clss.id.value], {
            [action.payload.property.id.value]: Object.assign({}, state.filtersByClass[action.payload.clss.id.value][action.payload.property.id.value], {
              selection: action.payload.selection
            })
          })
        })
      })

    case REMOVE_FILTER:
      let newPropMap: {} = Object.assign({}, state.filtersByClass[action.payload.clss.id.value], {
        [action.payload.property.id.value]: null
      })
      delete newPropMap[action.payload.property.id.value]
      return Object.assign({}, state, {
        filtersByClass: Object.assign({}, state.filtersByClass, {
          [action.payload.clss.id.value]: newPropMap
        })
      })

    default:
      return state
  }
}
