'use strict'

import * as angular from 'angular'
import {Store} from 'rdfstore'
import {SparqlService, ISparqlBindingResult, ISparqlBinding} from 'angular-sparql-service'
import {EMap, StringSet} from '../components/collection-utils'

export class SparqlServiceDefinition {
  constructor(public type: 'local'|'remote', public id: string) {}
}

declare var rdfstore: any

export class FibraSparqlService {
  private services: EMap<angular.IPromise<IInternalSparqlService>> = new EMap<angular.IPromise<IInternalSparqlService>>((id) => {
    if (id.indexOf('local:') === 0) {
      let r: angular.IDeferred<IInternalSparqlService> = this.$q.defer()
      new Store({name: id, persistent: true}, (err, rdfStore) => {
        if (err) r.reject(err)
        else r.resolve(new RDFStoreInternalSparqlService(rdfStore, this.$q))
      })
      return r.promise
    } else return this.$q.resolve(new RemoteInternalSparqlService(this.sparqlService, id))
  })
  public query(id: string, query: string, params?: {}): angular.IPromise<ISparqlBindingResult<{[id: string]: ISparqlBinding}>> {
    return this.services.goc(id).then(s => s.query(query, params))
  }
  public update<T>(id: string, query: string, params?: {}): angular.IPromise<T> {
    return this.services.goc(id).then(s => s.update(query, params))
  }
  public get<T>(id: string, graphIRI?: string, params?: {}): angular.IPromise<T> {
    return this.services.goc(id).then(s => s.get(graphIRI, params))
  }
  public put<T>(id: string, data: string, graphIRI?: string, params?: {}): angular.IPromise<T> {
    return this.services.goc(id).then(s => s.put(data, graphIRI, params))
  }
  public post<T>(id: string, data: string, graphIRI?: string, params?: {}): angular.IPromise<T> {
    return this.services.goc(id).then(s => s.post(data, graphIRI, params))
  }
  /* @ngInject */
  constructor(private sparqlService: SparqlService, private $q: angular.IQService) {}
}

interface IInternalSparqlService {
  query<T extends {[id: string]: ISparqlBinding}>(query: string, params?: {}): angular.IPromise<ISparqlBindingResult<T>>
  update<T>(query: string, params?: {}): angular.IPromise<T>
  get<T>(graphIRI?: string, params?: {}): angular.IPromise<T>
  put<T>(data: string, graphIRI?: string, params?: {}): angular.IPromise<T>
  post<T>(data: string, graphIRI?: string, params?: {}): angular.IPromise<T>
}

class RemoteInternalSparqlService implements IInternalSparqlService {
  constructor(private s: SparqlService, private endpoint: string) {}
  public query<T extends {[id: string]: ISparqlBinding}>(query: string, params?: {}): angular.IPromise<ISparqlBindingResult<T>> {
    return this.s.query(this.endpoint, query, params).then(s => s.data)
  }
  public update<T>(query: string, params?: {}): angular.IPromise<T> {
    return this.s.update(this.endpoint, query, params).then(s => s.data)
  }
  public get<T>(graphIRI?: string, params?: {}): angular.IPromise<T> {
    return this.s.get(this.endpoint, graphIRI, params).then(s => s.data)
  }
  public post<T>(data: string, graphIRI?: string, params?: {}): angular.IPromise<T> {
    return this.s.post(this.endpoint, data, graphIRI, params).then(s => s.data)
  }
  public put<T>(data: string, graphIRI?: string, params?: {}): angular.IPromise<T> {
    return this.s.put(this.endpoint, data, graphIRI, params).then(s => s.data)
  }
}

interface IRDFStoreSparqlBinding {
  token: 'uri' | 'literal' | 'blank'
  lang?: string
  type?: string
  value: string
}

interface IRDFStore {
  execute(query: string, cb: (err: any, results: {[id: string]: IRDFStoreSparqlBinding}[] | boolean) => void): void
  graph(graphIRI: string, cb: (err: any, results: any) => void): void
  graph(cb: (err: any, results: any) => void): void
  clear(graphIRI: string, cb: (err: any) => void): void
  clear(cb: (err: any) => void): void
  load(format: string, data: string, graphIRI: string, cb: (err: any , graph: any) => void): void
  load(format: string, data: string, cb: (err: any , graph: any) => void): void
}

export class RDFStoreInternalSparqlService implements IInternalSparqlService {
  private static convertBinding(binding: IRDFStoreSparqlBinding): ISparqlBinding {
    switch (binding.token) {
      case 'uri': return {
        type: 'uri',
        value: binding.value
      }
      case 'blank': return {
        type: 'bnode',
        value: binding.value
      }
      case 'literal': return {
        type: 'literal',
        value: binding.value,
        'xml:lang': binding.lang,
        datatype: binding.type
      }
      default: throw 'Unknown binding type ' + binding.token
    }
  }
  constructor(private s: IRDFStore, private $q: angular.IQService) {}
  public query<T extends {[id: string]: ISparqlBinding}>(query: string, params?: {}): angular.IPromise<ISparqlBindingResult<T>> {
    let deferred: angular.IDeferred<ISparqlBindingResult<T>> = this.$q.defer()
    try {
      this.s.execute(query, (err: any, results: {[id: string]: IRDFStoreSparqlBinding}[]) => {
        if (err) {
          console.log('Error executing', this.s, query, err)
          deferred.reject(err)
        } else {
          let ret: ISparqlBindingResult<T> = {
            head: {
              vars: []
            },
            results: {
              bindings: []
            }
          }
          let vars: StringSet = new StringSet()
          ret.results.bindings = results.map(binding => {
            let tb: T = {} as T
            for (let v in binding) {
              vars.add(v)
              if (binding[v] !== null) tb[v] = RDFStoreInternalSparqlService.convertBinding(binding[v])
            }
            return tb
          })
          ret.head.vars = vars.values()
          deferred.resolve(ret)
        }
      })
    } catch (err) {
      console.log('Exception executing', this.s, query, err)
      throw err
    }
    return deferred.promise
  }
  public update<T>(query: string, params?: {}): angular.IPromise<T> {
    let deferred: angular.IDeferred<T> = this.$q.defer()
    this.s.execute(query, (err: any, results: any) => {
      if (err) deferred.reject(err)
      else deferred.resolve(results)
    })
    return deferred.promise
  }
  public get<T>(graphIRI?: string, params?: {}): angular.IPromise<T> {
    let deferred: angular.IDeferred<T> = this.$q.defer()
    this.s.graph(graphIRI, (err: any , graph: any) => {
      if (err) deferred.reject(err)
      else deferred.resolve(graph.toNT())
    })
    return deferred.promise
  }
  public post<T>(data: string, graphIRI?: string, params?: {}): angular.IPromise<T> {
    let deferred: angular.IDeferred<T> = this.$q.defer()
    let handler: (err: any, graph: any) => void = (err: any , graph: any) => {
      if (err) deferred.reject(err)
      else deferred.resolve()
    }
    if (graphIRI)
      this.s.load('text/turtle', data, graphIRI, handler)
    else this.s.load('text/turtle', data, handler)
    return deferred.promise
  }
  public put<T>(data: string, graphIRI?: string, params?: {}): angular.IPromise<T> {
    let deferred: angular.IDeferred<T> = this.$q.defer()
    let handler: (any) => void = (err: any) => {
      if (err) deferred.reject(err)
      let handler2: (err2: any, graph: any) => void = (err2: any , graph: any) => {
        if (err2) deferred.reject(err2)
        else deferred.resolve()
      }
      if (graphIRI)
        this.s.load('text/turtle', data, graphIRI, handler2)
      else this.s.load('text/turtle', data, handler2)
    }
    if (graphIRI)
      this.s.clear(graphIRI, handler)
    else this.s.clear(handler)
    return deferred.promise
  }
}

angular.module('fibra.services.fibra-sparql-service', [])
  .config(($provide) => {
    $provide.service('fibraSparqlService', FibraSparqlService)
  })
