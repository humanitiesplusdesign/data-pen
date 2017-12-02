'use strict'

import * as angular from 'angular'
import './prototype-mapping-configuration'
import {BackendRootState, convertToBackendState} from 'reducers'
import {WorkerServiceUtils, IMessage} from 'services/worker-service/worker-service-common'

declare var self: any

export class WorkerWorkerService {
  private cancellers: angular.IDeferred<any>[] = []

  public static stripFunctions(obj): any {
    let ret: {} = {}
    for (let key in obj)
      if (typeof obj[key] === 'object') ret[key] = WorkerWorkerService.stripFunctions(obj[key])
      else if (typeof obj[key] !== 'function') ret[key] = obj[key]
    return ret
  }
  public $broadcast(name: string, args?: any): void {
    try {
      self.postMessage({event: 'broadcast', name: name, args: WorkerServiceUtils.savePrototypes(args)})
    } catch (e) {
      console.log(args, e)
      throw e
    }
  }
  /* @ngInject */
  constructor(private workerServicePrototypeMappingConfiguration:  {[className: string]: Object}, private $injector: angular.auto.IInjectorService, private $q: angular.IQService, private $rootScope: angular.IRootScopeService) {
  }
  public onMessage(message: IMessage): void {
    if (message.id === undefined) {
      this.$rootScope.$broadcast(message.name!, this.restorePrototypes(message.args))
      this.$rootScope.$apply()
    } else if (message.cancel) {
      let canceller: angular.IDeferred<any> = this.cancellers[message.id];
      delete this.cancellers[message.id];
      if (canceller) canceller.resolve();
    } else {
      let service: any = this.$injector.get(message.service!)
      let canceller: angular.IDeferred<any> = this.$q.defer();
      this.cancellers[message.id] = canceller;
      let promise: any = service[message.method!].apply(service, this.restorePrototypes(message.args).concat(canceller.promise))
      if (!promise || !promise.then) {
        let deferred: angular.IDeferred<any> = this.$q.defer()
        deferred.resolve(promise)
        promise = deferred.promise
      }
      promise.then(
        (success) => {
          delete this.cancellers[message.id!]
          self.postMessage({event: 'success', id: message.id, data: WorkerServiceUtils.savePrototypes(success)})
        },
        (error) => {
          delete this.cancellers[message.id!]
          if (error instanceof Error) {
            self.postMessage({event: 'failure', id: message.id, data: { name: error.name, message: error.message, stack: error.stack }})
            throw error
          }
          self.postMessage({event: 'failure', id: message.id, data: WorkerServiceUtils.savePrototypes(WorkerWorkerService.stripFunctions(error))})
        },
        (update) =>
          self.postMessage({event: 'update', id: message.id, data: WorkerServiceUtils.savePrototypes(update)})
      )
    }
  }

  private restorePrototypes(args: any): any {
    this.restorePrototypesInternal(args)
    WorkerServiceUtils.stripMarks(args)
    return args
  }

  private restorePrototypesInternal(args: any): void {
    if (!args || args.__mark || typeof args !== 'object') return
    args.__mark = true
    if (args instanceof Array) args.forEach(arg => this.restorePrototypesInternal(arg))
    else {
      if (args.__className) {
        let prototype: Object = this.workerServicePrototypeMappingConfiguration[args.__className]
        if (!prototype) throw 'Unknown prototype ' + args.__className
        args.__proto__ =  prototype
        delete args.__className
      }
      for (let key in args) if (args.hasOwnProperty(key))
        this.restorePrototypesInternal(args[key])
    }
  }
}

export class StateWorkerService {
  public state: BackendRootState
  public setState(state: BackendRootState): void {
    this.state = state
  }
}

angular.module('fibra.services.worker-service', ['fibra.services.worker-service-prototype-mapping-configuration'])
  .config(($provide) => {
    $provide.service('stateWorkerService', StateWorkerService)
    $provide.service('workerWorkerService', WorkerWorkerService)
  })
