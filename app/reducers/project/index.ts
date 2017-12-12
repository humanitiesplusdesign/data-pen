import { ILayoutState } from '../../services/project-service/project';
import { ADD_LAYOUT, DELETE_LAYOUT } from '../../actions/project';
import { allItemsLoaded } from 'actions/items';
import { SET_ACTIVE_DIVIDER_PERCENTAGE } from 'actions/active';
import { SET_PROJECT, SET_ACTIVE_ITEM_COUNT, SET_ALL_ITEM_COUNT, SET_FILTERED_ITEM_COUNT} from 'actions/project'
import {Project} from 'services/project-service/project'
import {RemoteEndpointConfiguration} from 'services/project-service/remote-endpoint-configuration'
import {CNode, INode} from 'models/rdf'
import { SET_SOURCE_CLASS_ACTIVE } from 'actions/sources';
import * as angular from 'angular';
import { IFullLayoutState } from 'reducers/active';

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
            .find((label: INode) => label.language === 'en').value,
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
        description: action.payload.labels.values()[0].value
      })

    case ADD_LAYOUT:
      let newProject2: Project = angular.copy(state.project)
      let newLayouts: ILayoutState[] = newProject2.layouts.slice(0)
      newLayouts.push(action.payload)
      newProject2.layouts = newLayouts
      return Object.assign({}, state, {
        project: newProject2
      })

    case DELETE_LAYOUT:
      let newProject3: Project = angular.copy(state.project)
      let newLayouts2: ILayoutState[] = newProject3.layouts.slice(0)
      newLayouts2.splice(newLayouts2.indexOf(action.payload), 1)
      newProject3.layouts = newLayouts2
      return Object.assign({}, state, {
        project: newProject3
      })

    case SET_SOURCE_CLASS_ACTIVE:
      let newProject1: Project = angular.copy(state.project)
      newProject1.sourceClassSettings = Object.assign({}, state.project.sourceClassSettings, {
        [action.payload.source]: Object.assign({}, state.project.sourceClassSettings[action.payload.source], {
          [action.payload.clss]: action.payload.status
        })
      })

      return Object.assign({}, state, {
        project: newProject1
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
