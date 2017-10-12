export type FilterState = {
}|{}

let defaultState: FilterState = {
}

export default function models(state: FilterState = {}, action): FilterState {
  switch (action.type) {

    default:
      return state
  }
}
