import * as angular from 'angular'
import * as uiConfig from './app/app-configuration-ui'
import reduxConfig from './app/app-configuration-redux'

import './styles/main.styl'
// Register modules
import './services'
import './components'
import './filters'

// Forces the build to include ng-redux from node_modules
// tslint:disable-next-line:no-var-requires
require('../node_modules/ng-redux/dist/ng-redux')

let m: angular.IModule = angular.module('fibra', [
  'fibra.services',
  'fibra.components',
  'fibra.filters',
  'http-auth-interceptor',
  'ngStorage',
  'ui.router',
  'ui.bootstrap',
  'ui.bootstrap.tpls',
  'ngAnimate',
  'fi.seco.yasqe',
  'fi.seco.yasr',
  'toastr',
  'fi.seco.sparql',
  'ui.codemirror',
  'ngFileSaver',
  'ngRedux'
  ])
  .constant('version', '0.5.0')

m.value('workerServiceConfiguration', {
  appName: 'fibra',
  workerThreads: 1,
  importScripts: [
    'bower_components/angular/angular.js',
    'bower_components/angular-http-auth/src/http-auth-interceptor.js',
    'bower_components/angular-sparql-service/dist/sparql-service.js',
    'bower_components/rdfstore/dist/rdfstore.js',
    'commons-bundle.js',
    'worker-bundle.js'
  ]
})

m
  .config(reduxConfig)
  .config(uiConfig.toastConfig)
  .config(uiConfig.uiConfig)
  .config(uiConfig.localStorageConfig)
  .run(uiConfig.uiRun)
// import './components/app/app-configuration-common.ts'
// import './components/app/app-configuration-worker.ts'
