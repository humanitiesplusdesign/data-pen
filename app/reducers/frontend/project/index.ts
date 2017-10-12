import {PROJECT_LOADED} from '../../../actions/project'
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
  description: string
}|{}

let defaultState: ProjectState = {
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

    default:
      return state
  }
}
