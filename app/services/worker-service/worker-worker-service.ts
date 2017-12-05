'use strict'

import * as angular from 'angular';
import './prototype-mapping-configuration';
import {BackendRootState, convertToBackendState} from 'reducers'
import {IMessage, SerializationService} from 'services/worker-service/serialization-service'

declare var self: any

export class WorkerWorkerService {
  private cancellers: angular.IDeferred<any>[] = []

  public $broadcast(name: string, args?: any): void {
    try {
      self.postMessage({event: 'broadcast', name: name, args: SerializationService.savePrototypes(args)})
    } catch (e) {
      console.log(args, e)
      throw e
    }
  }
  /* @ngInject */
  constructor(private serializationService: SerializationService, private $injector: angular.auto.IInjectorService, private $q: angular.IQService, private $rootScope: angular.IRootScopeService) {
  }
  public onMessage(message: IMessage): void {
    if (message.id === undefined) {
      this.$rootScope.$broadcast(message.name!, this.serializationService.restorePrototypes(message.args))
      this.$rootScope.$apply()
    } else if (message.cancel) {
      let canceller: angular.IDeferred<any> = this.cancellers[message.id];
      delete this.cancellers[message.id];
      if (canceller) canceller.resolve();
    } else {
      let service: any = this.$injector.get(message.service!)
      let canceller: angular.IDeferred<any> = this.$q.defer();
      this.cancellers[message.id] = canceller;
      let promise: any = service[message.method!].apply(service, this.serializationService.restorePrototypes(message.args).concat(canceller.promise))
      if (!promise || !promise.then) {
        let deferred: angular.IDeferred<any> = this.$q.defer()
        deferred.resolve(promise)
        promise = deferred.promise
      }
      promise.then(
        (success) => {
          delete this.cancellers[message.id!]
          self.postMessage({event: 'success', id: message.id, data: SerializationService.savePrototypes(success)})
        },
        (error) => {
          delete this.cancellers[message.id!]
          if (error instanceof Error) {
            self.postMessage({event: 'failure', id: message.id, data: { name: error.name, message: error.message, stack: error.stack }})
            throw error
          }
          self.postMessage({event: 'failure', id: message.id, data: SerializationService.savePrototypes(SerializationService.stripFunctions(error))})
        },
        (update) =>
          self.postMessage({event: 'update', id: message.id, data: SerializationService.savePrototypes(update)})
      )
    }
  }

}

export class StateWorkerService {
  public state: BackendRootState
  public setState(state: BackendRootState): void {
    this.state = state
  }
}

angular.module('fibra.services.worker-service', ['fibra.services.serialization-service'])
  .config(($provide) => {
    $provide.service('stateWorkerService', StateWorkerService)
    $provide.service('workerWorkerService', WorkerWorkerService)
  })
