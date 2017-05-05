import { INgReduxProvider } from 'ng-redux'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers'

export default function reduxConfig($ngReduxProvider: INgReduxProvider) {
  $ngReduxProvider.createStoreWith(rootReducer, [createLogger()], [])
}
