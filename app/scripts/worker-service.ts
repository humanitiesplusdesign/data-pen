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

    constructor(workerServiceConfiguration: WorkerServiceConfiguration, $rootScope: angular.IRootScopeService, $window: angular.IWindowService, private $q: angular.IQService) {
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
            $rootScope.$broadcast(e.data.name, e.data.args)
            $rootScope.$apply()
          } else {
            let deferred: angular.IDeferred<any> = this.deferreds[e.data.id]
            if (deferred) {
              delete this.deferreds[e.data.id]
              if (eventId === 'success')
                deferred.resolve(e.data.data);
              else if (eventId === 'failure')
                deferred.reject(e.data.data);
              else
                deferred.notify(e.data.data);
            }
          }
        })
      }
    }

    public $broadcast(name: string, args: any[]): void {
      this.workers.forEach(w => w.postMessage({name: name, args: args}))
    }

    public call<T>(service: string, method: string, args: any[], canceller?: angular.IPromise<any>): angular.IPromise<T> {
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

  declare var self: any

  interface IMessage {
    id?: number
    name?: string
    args?: any[]
    cancel?: boolean
    service?: string
    method?: string
  }

  export class WorkerWorkerService {
    private cancellers: angular.IDeferred<any>[] = []
    public stripFunctions(obj): any {
      let ret: {} = {}
      for (let key in obj)
        if (typeof obj[key] === 'object') ret[key] = this.stripFunctions(obj[key])
        else if (typeof obj[key] !== 'function') ret[key] = obj[key]
      return ret
    }
    public $broadcast(name: string, args?: any): void {
      try {
       self.postMessage({event: 'broadcast', name: name, args: args})
      } catch (e) {
        console.log(args, e)
        throw e
      }
    }
    constructor(private $injector: angular.auto.IInjectorService, private $q: angular.IQService, private $rootScope: angular.IRootScopeService) {}
    public onMessage(message: IMessage): void {
      if (message.id === undefined) {
        this.$rootScope.$broadcast(message.name, message.args)
        this.$rootScope.$apply()
      } else if (message.cancel) {
        let canceller: angular.IDeferred<any> = this.cancellers[message.id];
        delete this.cancellers[message.id];
        if (canceller) canceller.resolve();
      } else {
        let service: any = this.$injector.get(message.service)
        let canceller: angular.IDeferred<any> = this.$q.defer();
        this.cancellers[message.id] = canceller;
        service[message.method].apply(service, message.args.concat(canceller.promise)).then(
          (success) => {
            delete this.cancellers[message.id]
            self.postMessage({event: 'success', id: message.id, data: success});
          },
          (error) => {
            delete this.cancellers[message.id]
            self.postMessage({event: 'failure', id: message.id, data: this.stripFunctions(error)})
          },
          (update) => {
            delete this.cancellers[message.id]
            self.postMessage({event: 'update', id: message.id, data: update});
        })
      }
    }
  }

}
