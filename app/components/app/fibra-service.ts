namespace fibra {
  'use strict'
  type CallbackFunction = () => angular.IPromise<string>
  type RemovalFunction = () => void

  export class FibraService {
    // Modeled on d3.event

    private q: angular.IQService
    private callbacks: {} = {}

    // Returns a function that can be called to remove the callback
    public on(evnt: string, callback: CallbackFunction): RemovalFunction {
      if (this.callbacks[evnt] === undefined)
        this.callbacks[evnt] = Array<CallbackFunction> ()
      this.callbacks[evnt].push(callback)
      return () => {
        if (this.callbacks[evnt].indexOf(callback) !== -1)
          this.callbacks[evnt].splice(this.callbacks[evnt].indexOf(callback), 1)
      }
    }

    public dispatch(evnt: string): angular.IPromise<Array<string>> {
      let proms: Array<angular.IPromise<string>> = this.callbacks[evnt].map((cb) => cb())
      return this.q.all(proms)
    }

    constructor($q: angular.IQService) {
      this.q = $q
    }
  }
}
