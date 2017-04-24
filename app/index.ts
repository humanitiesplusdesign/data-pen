import * as angular from 'angular'
import * as uiConfig from './components/app/app-configuration-ui.ts'

// Register modules
import './components/worker-service/worker-service'
import './components/app/social-auth-service'

let m: angular.IModule = angular.module('fibra', [
  'fibra.services.worker-service',
  'fibra.services.social-auth-service',
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
  ])
  .constant('version', '0.5.0')

m.value('workerServiceConfiguration', {
  appName: 'fibra',
  workerThreads: 8,
  importScripts: [
    'bower_components/angular/angular.js',
      'bower_components/angular-http-auth/src/http-auth-interceptor.js',
      'bower_components/angular-sparql-service/dist/sparql-service.js',
      'bower_components/rdfstore/dist/rdfstore.js',
      'worker-bundle.js'
    ]
})

m
  .config(uiConfig.toastConfig)
  .config(uiConfig.uiConfig)
  .config(uiConfig.localStorageConfig)
  .run(uiConfig.uiRun)
// import './components/app/app-configuration-common.ts'
// import './components/app/app-configuration-worker.ts'
