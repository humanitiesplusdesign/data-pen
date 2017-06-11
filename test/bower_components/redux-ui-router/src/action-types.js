// Exports the constants used for triggering transitions using Angular UI Router
//
// STATE_GO: Action for triggering a $state.go
// STATE_RELOAD: Action for triggering a $state.reload
// STATE_TRANSITION_TO: Action for triggering a $state.transitionTo
//
export const STATE_GO = '@@reduxUiRouter/stateGo';
export const STATE_RELOAD = '@@reduxUiRouter/stateReload';
export const STATE_TRANSITION_TO = '@@reduxUiRouter/transitionTo';

// UI Router Events
export const STATE_CHANGE_START = '@@reduxUiRouter/onStart';
export const STATE_CHANGE_SUCCESS = '@@reduxUiRouter/onSuccess';
export const STATE_CHANGE_ERROR = '@@reduxUiRouter/onError';
