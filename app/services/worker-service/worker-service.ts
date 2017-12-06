'use strict'

import * as angular from 'angular'
import {IMessage, SerializationService} from 'services/worker-service/serialization-service'
import {BackendRootState, convertToBackendState, IFibraNgRedux} from 'reducers'

export interface ISerializable {
  serialize(): any
  deserialize(serialized: any): ISerializable
}

export class WorkerServiceConfiguration {
  constructor(public appName: string, public workerThreads: number, public importScripts: string[]) {}
}

export class WorkerService {

  private static workerTemplate: string = `
    var window = self
    window.history = {}
    window.Node = function () {}
    //self.setImmediate = function(fn) { return window.setTimeout(fn, 0) }
    window.document = {
      readyState: 'complete',
      cookie: '',
      querySelector: function (selector) {
        if (selector=='html') return { innerHTML: '', getAttribute: function() {}} // angular-hot-loader patch
      },
      addEventListener: function() {},
      createElement: function() {
        return {
          pathname: '',
          setAttribute: function(key, value) {}
        };
      },
    };
    importScripts('<IMPORT_SCRIPTS>')
    window.angular.module('<APP_NAME>').run(['workerWorkerService', function(workerWorkerService) {
      self.addEventListener('message', function(e) { workerWorkerService.onMessage(e.data) })
    }])
    window.angular.bootstrap(null, ['<APP_NAME>'])
    window = undefined
    self.history = undefined
    self.Node = undefined
    setTimeout(function() { // angular init needs this
      self.document = undefined
    }, 0)
  `

  private workers: Worker[]
  private currentWorker: number = 0
  private deferreds: angular.IDeferred<any>[] = []
  private oldState: BackendRootState = new BackendRootState()

  /* @ngInject */
  constructor(workerServiceConfiguration: WorkerServiceConfiguration, serializationService: SerializationService, $rootScope: angular.IRootScopeService, $window: angular.IWindowService, private $q: angular.IQService, private $ngRedux: IFibraNgRedux) {
    $ngRedux.subscribe(() => {
      let newState: BackendRootState = convertToBackendState(this.$ngRedux.getState(), this.oldState)
      if (newState !== null) {
        this.oldState = newState
        this.callAll('stateWorkerService', 'setState', [newState])
      }
    })
    let path: string = $window.location.protocol + '//' + $window.location.host
    let importScripts: string[] = workerServiceConfiguration.importScripts.map(s =>
      s.indexOf('http') !== 0 ? path + (s.indexOf('/') !== 0 ? $window.location.pathname : '') + s : s
    )
    let blobURL: string = ($window.URL).createObjectURL(new Blob([WorkerService.workerTemplate.replace(/<APP_NAME>/g, workerServiceConfiguration.appName).replace(/<IMPORT_SCRIPTS>/g, importScripts.join('\',\''))], { type: 'application/javascript' }));
    this.workers = []
    for (let i: number = 0; i < workerServiceConfiguration.workerThreads; i++) {
      this.workers.push(new Worker(blobURL))
      this.workers[i].addEventListener('message', (e: MessageEvent) => {
        let eventId: string = e.data.event;
        if (eventId === 'broadcast') {
          $rootScope.$broadcast(e.data.name, serializationService.restorePrototypes(e.data.args))
          $rootScope.$apply()
        } else {
          let deferred: angular.IDeferred<any> = this.deferreds[e.data.id]
          if (deferred) {
            if (eventId === 'success') {
              delete this.deferreds[e.data.id]
              deferred.resolve(serializationService.restorePrototypes(e.data.data))
            } else if (eventId === 'failure') {
              delete this.deferreds[e.data.id]
              deferred.reject(serializationService.restorePrototypes(e.data.data))
            } else
              deferred.notify(serializationService.restorePrototypes(e.data.data))
          }
        }
      })
    }
  }

  public $broadcast(name: string, args: any[]): void {
    this.workers.forEach(w => w.postMessage({name: name, args: args}))
  }

  public callAll<T>(service: string, method: string, args: any[] = [], canceller?: angular.IPromise<any>): angular.IPromise<T> {
    let deferred: angular.IDeferred<T> = this.$q.defer()
    this.deferreds.push(deferred)
    let id: number = this.deferreds.length - 1
    let message: IMessage = {
      id: id,
      service: service,
      method: method,
      args: args
    }
    if (canceller) canceller.then(() => {
      this.workers.forEach(worker => worker.postMessage({
        id: id,
        cancel: true
      }))
      delete this.deferreds[id]
    })
    this.workers.forEach(worker => worker.postMessage(message))
    return deferred.promise
  }
  public call<T>(service: string, method: string, args: any[] = [], canceller?: angular.IPromise<any>): angular.IPromise<T> {
    let deferred: angular.IDeferred<T> = this.$q.defer()
    this.deferreds.push(deferred)
    let id: number = this.deferreds.length - 1
    let worker: Worker = this.workers[this.currentWorker]
    this.currentWorker = (this.currentWorker + 1) % this.workers.length
    if (canceller) canceller.then(() => {
      worker.postMessage({
        id: id,
        cancel: true
      })
      delete this.deferreds[id]
    })
    worker.postMessage({
      id: id,
      service: service,
      method: method,
      args: args
    })
    return deferred.promise
  }

}

angular.module('fibra.services.worker-service', ['fibra.services.serialization-service'])
  .config(($provide) => {
    $provide.service('workerService', WorkerService)
  })
