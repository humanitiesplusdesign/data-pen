'use strict'

import * as angular from 'angular'
import {Project} from 'services/project-service/project'
import {PrimaryEndpointConfiguration} from 'services/project-service/primary-endpoint-configuration'
import {RemoteEndpointConfiguration} from 'services/project-service/remote-endpoint-configuration'
import {Schema} from 'services/project-service/schema'
import {Class, Property, DataModel} from 'services/project-service/data-model'
import {CNode, ONodeSet, NodeMap} from 'models/rdf'
import {NamedNode} from 'models/rdf'
import {Citable, CitableSource} from 'models/citable'
import {FMap, StringSet} from 'components/collection-utils'
import {PropertyAndValue, Item, PropertyToValues} from 'services/sparql-item-service'
import {FullRichNodeFromNode} from 'models/richnode'
import { ProjectSourceInfo } from 'components/project-sources-view/project-sources-view-component'
import { TurtleBuilder } from 'components/misc-utils'
import { SparqlService } from 'angular-sparql-service/dist/sparql-service'
import * as cjson from 'circular-json'

export interface IMessage {
  id?: number
  name?: string
  args?: any
  cancel?: boolean
  service?: string
  method?: string
}

export interface IObjectToTurtleConfiguration<T> {
  idGenerator: (obj: T) => string
  defaultPrefix?: string
  prefixes?: {[prefix: string]: string}
  propertyMapping?: {[prop: string]: string}
  ignoredProperties?: {[prop: string]: boolean}
  valueConverters?: {[prop: string]: <V>(value: V, prop: string, obj: T, tb: TurtleBuilder) => string | string[]}
  propertyHandlers?: {[prop: string]: <V>(value: V, tb: TurtleBuilder, prop: string, obj: any) => void}
}

export class SerializationService {

  private prototypeMappings: {[className: string]: {}} = {}

  public static stripFunctions(obj): any {
    let ret: {} = {}
    for (let key in obj)
      if (typeof obj[key] === 'object') ret[key] = SerializationService.stripFunctions(obj[key])
      else if (typeof obj[key] !== 'function') ret[key] = obj[key]
    return ret
  }

  public static stripMarks(args: any): void {
    if (!args || !args.__mark || typeof args !== 'object') return
    delete args.__mark
    if (args instanceof Array) args.forEach(arg => SerializationService.stripMarks(arg))
    else {
      for (let key in args) if (args.hasOwnProperty(key))
        SerializationService.stripMarks(args[key])
    }
  }

  public static savePrototypes(args: any): any {
    SerializationService.savePrototypesInternal(args, new Set<any>())
    return args
  }

  public static toJson(obj: any): string {
    return cjson.stringify(SerializationService.savePrototypes(obj))
  }

  private static savePrototypesInternal(args: any, seen: Set<any>): void {
    if (!args || seen.has(args) || typeof args !== 'object') return
    seen.add(args)
    if (args instanceof Array) args.forEach(arg => SerializationService.savePrototypesInternal(arg, seen))
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
        SerializationService.savePrototypesInternal(args[key], seen)
    }
  }

  constructor() {
    let mappings: {[className: string]: any} = {
      'Project': Project,
      'CNode': CNode,
      'NamedNode': NamedNode,
      'Citable': Citable,
      'FMap': FMap,
      'Class': Class,
      'Property': Property,
      'PrimaryEndpointConfiguration': PrimaryEndpointConfiguration,
      'RemoteEndpointConfiguration': RemoteEndpointConfiguration,
      'CitableSource': CitableSource,
      'ProjectSourceInfo': ProjectSourceInfo,
      'Schema': Schema,
      'ONodeSet': ONodeSet,
      'StringSet': StringSet,
      'NodeMap': NodeMap,
      'DataModel': DataModel,
      'PropertyAndValue': PropertyAndValue,
      'Item': Item,
      'PropertyToValues': PropertyToValues,
      'FullRichNodeFromNode': FullRichNodeFromNode
    }
    for (let className in mappings)
      mappings[className]['__name'] = className
    mappings['Object'] = Object // it's bad to have __name in Object.prototype, but it does need to be registered
    for (let className in mappings)
      this.prototypeMappings[className] = mappings[className].prototype
  }

  public fromJson(json: string): any {
    let obj: any = cjson.parse(json)
    this.restorePrototypes(obj)
    return obj
  }

  public objectToTurtle(obj: any, tb: TurtleBuilder, conf: IObjectToTurtleConfiguration<any>): void {
    if (conf.prefixes) for (let key in conf.prefixes) tb.prefixes[key] = conf.prefixes[key]
    let ttl: string = ''
    let id: string = conf.idGenerator(obj)
    for (let key in obj) if (obj[key] !== undefined && obj[key] !== null && !(obj[key] instanceof Array && obj[key].length === 0) && (!conf.ignoredProperties || !conf.ignoredProperties[key])) {
      let val: any = obj[key]
      if (conf.propertyHandlers && conf.propertyHandlers[key]) conf.propertyHandlers[key](val, tb, key, obj)
      else if (conf.propertyHandlers && conf.propertyHandlers['']) conf.propertyHandlers[''](val, tb, key, obj)
      else {
        let prop: string = (conf.propertyMapping && conf.propertyMapping[key]) ? conf.propertyMapping[key] : conf.defaultPrefix + ':' + encodeURIComponent(key)
        let values: string[] = null
        if (conf.valueConverters && conf.valueConverters[key]) {
          let v: string[] | string = conf.valueConverters[key](obj[key], key, obj, tb)
          values = (v instanceof Array) ? v : [v]
        } else if (conf.valueConverters && conf.valueConverters['']) {
          let v: string[] | string = conf.valueConverters[''](obj[key], key, obj, tb)
          values = (v instanceof Array) ? v : [v]
        }
        if (values === null) {
          if (obj[key] instanceof Array)
            values = obj[key].filter(v => v !== undefined).map(v => SparqlService.stringToSPARQLString(typeof v === 'string' ? v : cjson.stringify(SerializationService.savePrototypes(v))))
          else values = [ SparqlService.stringToSPARQLString(typeof obj[key] === 'string' ? obj[key] : cjson.stringify(SerializationService.savePrototypes(obj[key]))) ]
        }
        if (values && values.length > 0) {
          ttl += prop + ' '
          for (let value of values) ttl += value + ' ,'
          ttl = ttl.substring(0, ttl.length - 2) + ' ;\n'
        }
      }
    }
    if (ttl.length > 0) ttl = id + ' ' + ttl
    tb.fragmentsById.set(id, ttl)
  }

  public restorePrototypes(args: any): any {
    this.restorePrototypesInternal(args)
    SerializationService.stripMarks(args)
    return args
  }

  private restorePrototypesInternal(args: any): void {
    if (!args || args.__mark || typeof args !== 'object') return
    args.__mark = true
    if (args instanceof Array) args.forEach(arg => this.restorePrototypesInternal(arg))
    else {
      if (args.__className) {
        let prototype: Object = this.prototypeMappings[args.__className]
        if (!prototype) throw 'Unknown prototype ' + args.__className
        args.__proto__ =  prototype
        delete args.__className
      }
      for (let key in args) if (args.hasOwnProperty(key))
        this.restorePrototypesInternal(args[key])
    }
  }
}

angular.module('fibra.services.serialization-service', [])
  .config(($provide) => $provide.service('serializationService', SerializationService))
