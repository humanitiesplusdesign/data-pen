import * as angular from 'angular'
import * as uiConfig from './app/app-configuration-ui'
import reduxConfig from './app/app-configuration-redux'

import 'angular-http-auth'
import 'angular-ui-router'
import 'angular-animate'
import 'angular-ui-bootstrap'
import 'angular-toastr'
import 'angular-file-saver'

import './styles/main.styl'
// Register modules
import './services'
import './components'
import './filters'

import 'ng-redux'
import 'angular-yasqe-component'
import 'ngstorage'
import 'angular-ui-codemirror'

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
    'https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js',
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
