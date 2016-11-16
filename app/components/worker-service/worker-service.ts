namespace fibra {
  'use strict'

  export class WorkerServiceConfiguration {
    constructor(public appName: string, public workerThreads: number, public importScripts: string[]) {}
  }

  export class WorkerService {

    private static workerTemplate: string = `
      var window = self
      self.history = {}
      self.Node = function () {}
      var document = {
        readyState: 'complete',
        cookie: '',
        querySelector: function () {},
        createElement: function() {
          return {
            pathname: '',
            setAttribute: function() {}
          };
        },
      };
      importScripts('<IMPORT_SCRIPTS>')
      window.angular.module('<APP_NAME>').run(['workerWorkerService', function(workerWorkerService) {
        self.addEventListener('message', function(e) { workerWorkerService.onMessage(e.data) })
      }])
      window.angular.bootstrap(null, ['<APP_NAME>'])
    `

    private workers: Worker[]
    private currentWorker: number = 0
    private deferreds: angular.IDeferred<any>[] = []

    public static stripMarks(args: any): void {
      if (!args || !args.__mark || typeof args !== 'object') return
      delete args.__mark
      if (args instanceof Array) args.forEach(arg => WorkerService.stripMarks(arg))
      else {
        for (let key in args) if (args.hasOwnProperty(key))
          WorkerService.stripMarks(args[key])
      }
    }

    public static savePrototypes(args: any): any {
      this.savePrototypesInternal(args)
      return args
    }
    private static savePrototypesInternal(args: any): void {
      if (!args || args.__className || typeof args !== 'object') return
      if (args instanceof Array) args.forEach(arg => WorkerService.savePrototypes(arg))
      else {
        if (args.constructor.__name || args.constructor.name !== 'Object') {
          let currentPrototype: {} = Object.getPrototypeOf(args)
          out: while (currentPrototype !== Object.prototype) { // attach types only to objects that need them = that have functions
            for (let prop of Object.getOwnPropertyNames(currentPrototype)) {
              if (prop !== 'constructor' && typeof(args.__proto__[prop]) === 'function') {
                args.__className = args.constructor.__name ? args.constructor.__name : args.constructor.name
                break out
              }
            }
            currentPrototype = Object.getPrototypeOf(currentPrototype)
          }
          if (!args.__className) args.__className = 'Object'
        }
        for (let key in args) if (args.hasOwnProperty(key))
          WorkerService.savePrototypes(args[key])
      }
    }

    constructor(workerServiceConfiguration: WorkerServiceConfiguration, private workerServicePrototypeMappingConfiguration: {[className: string]: Object}, $rootScope: angular.IRootScopeService, $window: angular.IWindowService, private $q: angular.IQService) {
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
            $rootScope.$broadcast(e.data.name, this.restorePrototypes(e.data.args))
            $rootScope.$apply()
          } else {
            let deferred: angular.IDeferred<any> = this.deferreds[e.data.id]
            if (deferred) {
              delete this.deferreds[e.data.id]
              if (eventId === 'success')
                deferred.resolve(this.restorePrototypes(e.data.data))
              else if (eventId === 'failure')
                deferred.reject(this.restorePrototypes(e.data.data))
              else
                deferred.notify(this.restorePrototypes(e.data.data))
            }
          }
        })
      }
    }

    public $broadcast(name: string, args: any[]): void {
      this.workers.forEach(w => w.postMessage({name: name, args: WorkerService.savePrototypes(args)}))
    }

    public callAll<T>(service: string, method: string, args: any[] = [], canceller?: angular.IPromise<any>): angular.IPromise<T> {
      let deferred: angular.IDeferred<T> = this.$q.defer()
      this.deferreds.push(deferred)
      let id: number = this.deferreds.length - 1
      let message: IMessage = {
        id: id,
        service: service,
        method: method,
        args: WorkerService.savePrototypes(args)
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
        args: WorkerService.savePrototypes(args)
      })
      return deferred.promise
    }

    private restorePrototypes(args: any): any {
      this.restorePrototypesInternal(args)
      WorkerService.stripMarks(args)
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

  declare var self: any

  interface IMessage {
    id?: number
    name?: string
    args?: any
    cancel?: boolean
    service?: string
    method?: string
  }

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
        self.postMessage({event: 'broadcast', name: name, args: WorkerService.savePrototypes(args)})
      } catch (e) {
        console.log(args, e)
        throw e
      }
    }
    constructor(private workerServicePrototypeMappingConfiguration:  {[className: string]: Object}, private $injector: angular.auto.IInjectorService, private $q: angular.IQService, private $rootScope: angular.IRootScopeService) {}
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
            self.postMessage({event: 'success', id: message.id, data: WorkerService.savePrototypes(success)});
          },
          (error) => {
            delete this.cancellers[message.id!]
            self.postMessage({event: 'failure', id: message.id, data: WorkerService.savePrototypes(WorkerWorkerService.stripFunctions(error))})
          },
          (update) => {
            delete this.cancellers[message.id!]
            self.postMessage({event: 'update', id: message.id, data: WorkerService.savePrototypes(update)});
        })
      }
    }

    private restorePrototypes(args: any): any {
      this.restorePrototypesInternal(args)
      WorkerService.stripMarks(args)
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

}
