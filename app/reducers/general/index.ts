import { SET_LANGUAGE } from 'actions/general';

export class GeneralState {
  constructor(
    public language: string = 'en'
  ) {}
}

let defaultState: GeneralState = new GeneralState()

export default function models(state: GeneralState = defaultState, action): GeneralState {
  switch (action.type) {
    case SET_LANGUAGE:
      let language: string = action.language
      return Object.assign({}, state, {
        language: language
    })
    default:
      return state
  }
}
