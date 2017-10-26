import { allItemsLoaded } from '../../../actions/items';
import { SET_ACTIVE_DIVIDER_PERCENTAGE } from '../../../actions/active';
import {PROJECT_LOADED, SET_ACTIVE_ITEM_COUNT, SET_ALL_ITEM_COUNT, SET_FILTERED_ITEM_COUNT} from '../../../actions/project'
import {Project} from '../../../services/project-service/project'
import {RemoteEndpointConfiguration} from '../../../services/project-service/remote-endpoint-configuration'
import {CNode} from '../../../models/rdf'

export type ProjectClass = {
  description: string
}

export type ProjectSource = {
  id: string,
  description: string
  classList: ProjectClass[]
}

export type ProjectState = {
  id: string,
  sources: ProjectSource[],
  description: string,
  allItemsCount: number,
  filteredItemsCount: number,
  activeItemsCount: number
}

let defaultState: ProjectState = {
  id: '',
  sources: [],
  description: '',
  allItemsCount: 0,
  filteredItemsCount: 0,
  activeItemsCount: 0
}

export default function models(state: ProjectState = defaultState, action): ProjectState {
  switch (action.type) {
    case PROJECT_LOADED:

      let project: Project = action.payload

      let sources: ProjectSource[] = project.archiveEndpoints.concat(project.authorityEndpoints).map((endpoint, i) => {
        return {
          id: endpoint.id,
          description: endpoint.labels
            .filter((label: CNode) => label.language === 'en')[0].value,
          classList: [
            {
              description: 'Concept'
            },
            {
              description: 'Document'
            },
            {
              description: 'Person'
            },
            {
              description: 'Organization'
            },
            {
              description: 'CorporateBody'
            },
            {
              description: 'Place'
            }
          ]
        }
      })

      return Object.assign({}, state, {
        id: action.payload.id,
        sources: sources,
        description: action.payload.labels[0].value
      })

    case SET_ALL_ITEM_COUNT:
      return Object.assign({}, state, {
        allItemsCount: action.payload
      })

    case SET_FILTERED_ITEM_COUNT:
      return Object.assign({}, state, {
        filteredItemsCount: action.payload
      })

    case SET_ACTIVE_ITEM_COUNT:
    return Object.assign({}, state, {
      activeItemsCount: action.payload
    })

    default:
      return state
  }
}
