angular.module('fi.seco.sparql', [])
namespace fi.seco.sparql {
  'use strict'

  export interface ISparqlBinding {
    type: 'uri' | 'bnode' | 'literal',
    value: string,
    'xml:lang'?: string,
    datatype?: string
  }

  export interface ISparqlBindingResult<BindingType extends {[id: string]: ISparqlBinding}> {
    head: {
      vars: string[],
      link?: string[]
    },
    results: {
      bindings: BindingType[]
    }
  }

  export interface ISparqlAskResult {
    boolean: boolean
  }

  export interface IBindingsToObjectConfiguration {
    bindingTypes?: {[varname: string]: 'ignore' | 'single' | 'array' | 'uniqueArray' | 'hash'}
    bindingConverters?: {[varname: string]: (binding: ISparqlBinding, bindings: {[id: string]: ISparqlBinding}) => any }
  }

  export class UniqueObjectTracker {
    public objectsById?: {[id: string]: {}} = {}
    public assignmentsById?: {[id: string]: {}} = {}
  }

  export class SparqlService {
    public static stringToSPARQLString(string): string {
      return '"' + string
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/\n/g, '\\n')
        .replace(/\t/g, '\\t')
        .replace(/\r/g, '\\r')
        .replace(/\f/g, '\\f')
        + '"'
    }
    public static bindingsToObject<T>(bindings: {[id: string]: ISparqlBinding}, ret: {} = {}, config?: IBindingsToObjectConfiguration, tracker?: UniqueObjectTracker): T {
      for (let bkey in bindings) {
        let okey: string = bkey
        let obj: {} = ret
        let subObjectPrefixIndex: number = okey.indexOf('_')
        let lastSubObjectPrefixIndex: number = -1
        let assignmentsById: {[id: string]: {}}
        if (tracker) assignmentsById = tracker.assignmentsById
        while (subObjectPrefixIndex !== -1) {
          okey = bkey.substring(lastSubObjectPrefixIndex + 1, subObjectPrefixIndex)
          let sbkey: string = bkey.substring(0, subObjectPrefixIndex)
          if (config && config.bindingTypes && config.bindingTypes[sbkey] && config.bindingTypes[sbkey] === 'uniqueArray') {
            if (!obj[okey]) obj[okey] = []
            if (!tracker.objectsById[sbkey]) tracker.objectsById[sbkey] = {}
            let tmp: any
            if (!tracker.objectsById[sbkey][bindings[sbkey].value]) {
              tmp = config.bindingConverters[sbkey](bindings[sbkey], bindings)
              tracker.objectsById[sbkey][bindings[sbkey].value] = tmp
            } else tmp = tracker.objectsById[sbkey][bindings[sbkey].value]
            if (!assignmentsById[sbkey]) assignmentsById[sbkey] = {}
            if (!assignmentsById[sbkey][bindings[sbkey].value]) {
              obj[sbkey].push(tmp)
              assignmentsById[sbkey][bindings[sbkey].value] = {}
            }
            assignmentsById = assignmentsById[sbkey][bindings[sbkey].value]
            obj = tmp
          } else {
            if (config && config.bindingTypes && config.bindingTypes[sbkey] && config.bindingTypes[sbkey] === 'single') {
              if (!tracker.objectsById[sbkey]) tracker.objectsById[sbkey] = {}
              if (!tracker.objectsById[sbkey][bindings[sbkey].value]) {
                obj[okey] = config.bindingConverters[sbkey](bindings[sbkey], bindings)
                tracker.objectsById[sbkey][bindings[sbkey].value] = obj[okey]
              }
            } else if (!obj[okey]) obj[okey] = config.bindingConverters[sbkey](bindings[sbkey], bindings)
            obj = obj[okey]
          }
          lastSubObjectPrefixIndex = subObjectPrefixIndex
          subObjectPrefixIndex = bkey.indexOf('_', subObjectPrefixIndex + 1)
        }
        okey = bkey.substring(lastSubObjectPrefixIndex + 1)
        let val: any
        if (tracker && config && config.bindingTypes && (config.bindingTypes[bkey] === 'single' || config.bindingTypes[bkey] === 'uniqueArray')) {
          if (!tracker.objectsById[bkey]) tracker.objectsById[bkey] = {}
          if (!tracker.objectsById[bkey][bindings[bkey].value]) {
            if (config && config.bindingConverters && config.bindingConverters[bkey])
              val = config.bindingConverters[bkey](bindings[bkey], bindings)
            else
              val = SparqlService.bindingToValue(bindings[bkey])
            tracker.objectsById[bkey][bindings[bkey].value] = val
          } else val = tracker.objectsById[bkey][bindings[bkey].value]
        } else if (config && config.bindingConverters && config.bindingConverters[bkey])
            val = config.bindingConverters[bkey](bindings[bkey], bindings)
        else if (!config || !config.bindingTypes || !config.bindingTypes[bkey] || (config.bindingTypes[bkey] !== 'hash' && config.bindingTypes[bkey] !== 'ignore'))
            val = SparqlService.bindingToValue(bindings[bkey])
        if (config && config.bindingTypes && config.bindingTypes[bkey]) {
          switch (config.bindingTypes[bkey]) {
            case 'ignore': break
            case 'single': obj[okey] = val; break
            case 'array':
              if (!Array.isArray(obj[okey])) obj[okey] = []
              obj[okey].push(val)
              break
            case 'hash':
              if (!obj[okey]) obj[okey] = {}
              if (val) obj[okey][bindings[bkey].value] = val
              else if (bindings[bkey].type === 'literal') {
                let key2: string = bindings[bkey].datatype
                if (!key2) {
                  key2 = bindings[bkey]['xml:lang']
                  if (!key2) key2 = ''
                }
                obj[okey][key2] = bindings[bkey].value
              } else obj[okey][bindings[bkey].value] = bindings[bkey].value
              break
            default: // uniqueArray
              if (!obj[okey]) obj[okey] = []
              if (!assignmentsById[bkey]) assignmentsById[bkey] = {}
              if (!assignmentsById[bkey][bindings[bkey].value]) {
                assignmentsById[bkey][bindings[bkey].value] = val
                obj[okey].push(val)
              }
          }
        } else if (Array.isArray(obj[okey])) obj[okey].push(val)
        else if (obj[okey] !== null && typeof(obj[okey]) === 'object' && bindings[bkey]) {
          if (bindings[bkey].type === 'literal') {
            let key2: string = bindings[bkey].datatype
            if (!key2) {
              key2 = bindings[bkey]['xml:lang']
              if (!key2) key2 = ''
            }
            if (config && config.bindingConverters && config.bindingConverters[bkey])
              obj[okey][key2] = config.bindingConverters[bkey](bindings[bkey], bindings)
            else
              obj[okey][key2] = bindings[bkey].value
          } else if (config && config.bindingConverters && config.bindingConverters[bkey])
            obj[okey][bindings[bkey].value] = config.bindingConverters[bkey](bindings[bkey], bindings)
          else obj[okey][bindings[bkey].value] = bindings[bkey].value
        }
        else obj[okey] = val
      }
      return <T>ret
    }
    public static bindingToValue(binding: ISparqlBinding): any {
      if (!binding) return undefined
      if (binding.type === 'uri') return binding.value
      else if (binding.type === 'bnode') return binding.value
      else if (binding.datatype) switch (binding.datatype) {
        case 'http://www.w3.org/2001/XMLSchema#integer':
        case 'http://www.w3.org/2001/XMLSchema#decimal': return parseInt(binding.value, 10)
        case 'http://www.w3.org/2001/XMLSchema#float':
        case 'http://www.w3.org/2001/XMLSchema#double': return parseFloat(binding.value)
        case 'http://www.w3.org/2001/XMLSchema#boolean': return binding.value ? true : false
        default:
      }
      return binding.value
    }
    public static bindingToString(binding: ISparqlBinding): string {
      if (!binding) return 'UNDEF'
      else {
        let value: string = binding.value.replace(/\\/g, '\\\\').replace(/\t/g, '\\t').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/[\b]/g, '\\b').replace(/\f/g, '\\f').replace(/\"/g, '\\"').replace(/\'/g, '\\\'')
        if (binding.type === 'uri') return '<' + value + '>'
        else if (binding.type === 'bnode') return '_:' + value
        else if (binding.datatype) switch (binding.datatype) {
          case 'http://www.w3.org/2001/XMLSchema#integer':
          case 'http://www.w3.org/2001/XMLSchema#decimal':
          case 'http://www.w3.org/2001/XMLSchema#double':
          case 'http://www.w3.org/2001/XMLSchema#boolean': return value
          case 'http://www.w3.org/2001/XMLSchema#string': return '"' + value + '"'
          default: return '"' + value + '"^^<' + binding.datatype + '>'
        }
        else if (binding['xml:lang']) return '"' + value + '"@' + binding['xml:lang']
        else return '"' + value + '"'
      }
    }
    constructor(private $http: angular.IHttpService, private $q: angular.IQService) {}
    public check(endpoint: string, params?: {}): angular.IPromise<boolean> {
      let deferred: angular.IDeferred<any> = this.$q.defer()
      this.$http(
        angular.extend(
          {
            method: 'GET',
            url: endpoint,
            params: { query: 'ASK {}' },
            headers: { 'Accept': 'application/sparql-results+json' }
          },
          params
        )
      ).then(
        (response: angular.IHttpPromiseCallbackArg<ISparqlAskResult>) => deferred.resolve(response.data.boolean === true)
      , (response: angular.IHttpPromiseCallbackArg<string>) => deferred.resolve(false)
      )
      return deferred.promise;
    }
    public checkUpdate(endpoint: string, params?: {}): angular.IPromise<boolean> {
      let deferred: angular.IDeferred<any> = this.$q.defer()
      this.$http(
        angular.extend(
          {
            method: 'POST',
            url: endpoint,
            headers: { 'Content-Type' : 'application/sparql-update' },
            data: 'INSERT DATA {}'
          },
          params
        )
      ).then(
        (response: angular.IHttpPromiseCallbackArg<string>) => deferred.resolve(response.status === 204)
      , (response: angular.IHttpPromiseCallbackArg<string>) => deferred.resolve(false)
      )
      return deferred.promise;
    }
    public checkRest(endpoint: string, params?: {}): angular.IPromise<boolean> {
      let deferred: angular.IDeferred<any> = this.$q.defer()
      this.$http(
        angular.extend(
          {
            method: 'POST',
            url : endpoint + '?default',
            data : '',
            headers: { 'Content-Type' : 'text/turtle' }
          },
          params
        )
      ).then(
        (response: angular.IHttpPromiseCallbackArg<string>) => deferred.resolve(response.status === 204)
      , (response: angular.IHttpPromiseCallbackArg<string>) => deferred.resolve(false)
      )
      return deferred.promise;
    }
    public get<T>(endpoint: string, graphIRI?: string, params?: {}): angular.IHttpPromise<T> {
      return this.$http(
        angular.extend(
          {
            method: 'GET',
            url : endpoint,
            params: graphIRI ? { graph: graphIRI } : {'default': ''},
            headers: { 'Accept' : 'text/turtle' }
          },
          params
        )
      )
    }
    public post<T>(endpoint: string, graph: string, graphIRI?: string, params?: {}): angular.IHttpPromise<T> {
      return this.$http(
        angular.extend(
          {
            method: 'POST',
            url : endpoint,
            params: graphIRI ? { graph: graphIRI } : {'default': ''},
            data: graph,
            headers: { 'Content-Type' : 'text/turtle' }
          },
          params
        )
      )
    }
    public put<T>(endpoint: string, graph: string, graphIRI?: string, params?: {}): angular.IHttpPromise<T> {
      return this.$http(
        angular.extend(
          {
            method: 'PUT',
            url : endpoint,
            params: graphIRI ? { graph: graphIRI } : {'default': ''},
            data: graph,
            headers: { 'Content-Type' : 'text/turtle' }
          },
          params
        )
      )
    }
    public delete<T>(endpoint: string, graphIRI: string, params?: {}): angular.IHttpPromise<T> {
      return this.$http(
        angular.extend(
          {
            method: 'DELETE',
            url: endpoint,
            params: graphIRI ? { graph: graphIRI } : {'default': ''}
          },
          params
        )
      )
    }
    public query<T extends {[id: string]: ISparqlBinding}>(endpoint: string, query: string, params?: {}): angular.IHttpPromise<ISparqlBindingResult<T>> {
      if (query.length <= 2048)
        return this.$http(
          angular.extend(
            {
              method: 'GET',
              url: endpoint,
              params: { query: query },
              headers: { 'Accept' : 'application/sparql-results+json' }
            },
            params
          )
        )
      else
        return this.$http(
          angular.extend(
            {
              method: 'POST',
              url: endpoint,
              data: 'query=' + encodeURIComponent(query),
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept' : 'application/sparql-results+json'
              }
            },
            params
          )
        )
    }
    public construct<T>(endpoint: string, query: string, params?: {}): angular.IHttpPromise<T> {
      if (query.length <= 2048)
        return this.$http(
          angular.extend(
            {
              method: 'GET',
              url : endpoint,
              params: { query: query },
              headers: { 'Accept' : 'text/turtle' }
            },
            params
          )
        )
      else
        return this.$http(
          angular.extend(
            {
              method: 'POST',
              url: endpoint,
              data: query,
              headers: {
                'Content-Type': 'application/sparql-query',
                'Accept' : 'text/turtle'
              }
            },
            params
          )
        )
    }
    public update<T>(endpoint: string, query: string, params?: {}): angular.IHttpPromise<T> {
      return this.$http(
        angular.extend(
          {
            method: 'POST',
            url: endpoint,
            headers: { 'Content-Type' : 'application/sparql-update' },
            data: query
          },
          params
        )
      )
    }
  }
}
