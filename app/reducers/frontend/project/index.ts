import { allItemsLoaded } from 'actions/items';
import { SET_ACTIVE_DIVIDER_PERCENTAGE } from 'actions/active';
import { SET_PROJECT, SET_ACTIVE_ITEM_COUNT, SET_ALL_ITEM_COUNT, SET_FILTERED_ITEM_COUNT} from 'actions/project'
import {Project} from 'services/project-service/project'
import {RemoteEndpointConfiguration} from 'services/project-service/remote-endpoint-configuration'
import {CNode} from 'models/rdf'

export interface IProjectClass {
  description: string
}

export interface IProjectSource {
  id: string
  description: string
  classList: IProjectClass[]
}

export class ProjectState {
  constructor(
    public project: Project = null,
    public id: string = '',
    public sources: IProjectSource[] = [],
    public description: string = '',
    public allItemsCount: number = 0,
    public filteredItemsCount: number = 0,
    public activeItemsCount: number = 0
  ) {}
}

let defaultState: ProjectState = new ProjectState()

export default function models(state: ProjectState = defaultState, action): ProjectState {
  switch (action.type) {
    case SET_PROJECT:

      let project: Project = action.payload

      let sources: IProjectSource[] = project.archiveEndpoints.concat(project.authorityEndpoints).map((endpoint, i) => {
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
        project: project,
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
