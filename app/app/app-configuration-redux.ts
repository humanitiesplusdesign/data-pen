import { INgReduxProvider } from 'ng-redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import rootReducer from '../reducers'

export default function reduxConfig($ngReduxProvider: INgReduxProvider) {
  $ngReduxProvider.createStoreWith(rootReducer, [thunkMiddleware, promiseMiddleware, createLogger()], [])
}
