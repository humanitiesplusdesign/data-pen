namespace fibra {
  'use strict'

  export class WorkerServiceConfiguration {
    constructor(public appName: string, public workerThreads: number, public angularURL: string, public importScripts: string[], public requiredModules: string[]) {}
  }

  export interface IWorkerWorkerService {
    $broadcast: (name: string, args?: any[]) => void
  }

  export class WorkerService {

    private static workerTemplate: string = `
      var window = self;
      self.history = {};
      self.Node = function () {};
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
      function stripFunctions(obj) {
        for (key in obj) if (obj.hasOwnProperty[key]) {
          if (typeof obj[key] === 'object') stripFunctions(obj[key])
          else if (typeof obj[key] === 'function') delete(obj[key])
        }
      }
      importScripts('<URL_TO_ANGULAR>')
      angular = window.angular;
      var app = angular.module('<APP_NAME>', ['<DEP_MODULES>']);
      self.$broadcast = function(name,args) {
        try {
          self.postMessage({event:'broadcast', name:name, args:args})
        } catch (e) {
          console.log(args,e)
          throw e
        }
      }
      app.value('workerWorkerService',self);
      importScripts('<IMPORT_SCRIPTS>');
      var cancellers = [];
      app.run(['$injector','$q','$rootScope', function($injector,$q,$rootScope) {
        self.addEventListener('message', function(e) {
          var id = e.data.id;
          if (id === undefined) {
            $rootScope.$broadcast(e.data.name, e.data.args);
            $rootScope.$apply();
          } else if (e.data.cancel) {
            let canceller = cancellers[id];
            delete cancellers[id];
            if (canceller) canceller.resolve();
          } else {
            var service = $injector.get(e.data.service);
            var canceller = $q.defer();
            cancellers[id] = canceller;
            service[e.data.method].apply(service,e.data.args.concat(canceller.promise)).then(function(success) {
              delete cancellers[id]
              try {
                self.postMessage({event:'success', id: id, data: success});
              } catch (e) {
                console.log(success,e)
                throw e
              }
            }, function(error) {
              delete cancellers[id]
              try {
                self.postMessage({event:'failure', id: id, data: stripFunctions(error)});
              } catch (e) {
                console.log(error,e)
                throw e
              }
            }, function(update) {
              delete cancellers[id]
              try {
                self.postMessage({event:'update', id: id, data: update});
              } catch (e) {
                console.log(update,e)
                throw e
              }
            });
          }
        })
      }])
      angular.bootstrap(null, ['<APP_NAME>']);
    `

    private workers: Worker[]
    private currentWorker: number = 0
    private deferreds: angular.IDeferred<any>[] = []

    constructor(workerServiceConfiguration: WorkerServiceConfiguration, $rootScope: angular.IRootScopeService, $window: angular.IWindowService, private $q: angular.IQService) {
      let angularURL: string = workerServiceConfiguration.angularURL
      let path: string = $window.location.protocol + '//' + $window.location.host
      if (angularURL.indexOf('http') !== 0)
        angularURL = path + (angularURL.indexOf('/') !== 0 ? $window.location.pathname : '') + angularURL
      let importScripts: string[] = workerServiceConfiguration.importScripts.map(s =>
        s.indexOf('http') !== 0 ? path + (s.indexOf('/') !== 0 ? $window.location.pathname : '') + s : s
      )
      let blobURL: string = ($window.URL).createObjectURL(new Blob([WorkerService.workerTemplate.replace(/<APP_NAME>/g, workerServiceConfiguration.appName).replace(/<URL_TO_ANGULAR>/g, angularURL).replace(/<IMPORT_SCRIPTS>/g, importScripts.join('\',\'')).replace(/<DEP_MODULES>/g, workerServiceConfiguration.requiredModules.join('\',\''))], { type: 'application/javascript' }));
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
}
