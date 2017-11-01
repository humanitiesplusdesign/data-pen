import { Property } from '../../../services/project-service/data-model';
import { SET_FILTER_DIVIDER_PERCENTAGE, SET_FILTER_FOR_CLASS_AND_PROP } from '../../../actions/filter'

export interface IFilter {
  type: string
  description: string
  domain: number[],
  selection: number[]
}

export interface IClassFilterTree {
  [clss: string]: {
    [prop: string]: IFilter[]
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
              domain: [0, 2500],
              selection: [0, 2500]
            }
          })
        })
      })

    default:
      return state
  }
}
