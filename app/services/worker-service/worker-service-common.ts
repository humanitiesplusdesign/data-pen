'use strict'

export interface IMessage {
  id?: number
  name?: string
  args?: any
  cancel?: boolean
  service?: string
  method?: string
}

export class WorkerServiceUtils {
  public static stripMarks(args: any): void {
    if (!args || !args.__mark || typeof args !== 'object') return
    delete args.__mark
    if (args instanceof Array) args.forEach(arg => WorkerServiceUtils.stripMarks(arg))
    else {
      for (let key in args) if (args.hasOwnProperty(key))
        WorkerServiceUtils.stripMarks(args[key])
    }
  }

  public static stripPrototypes(args: any): void {
    if (!args || !args.__className || typeof args !== 'object') return
    delete args.__className
    if (args instanceof Array) args.forEach(arg => WorkerServiceUtils.stripPrototypes(arg))
    else {
      for (let key in args) if (args.hasOwnProperty(key))
        WorkerServiceUtils.stripPrototypes(args[key])
    }
  }

  public static savePrototypes(args: any): any {
    WorkerServiceUtils.stripPrototypes(args)
    WorkerServiceUtils.savePrototypesInternal(args)
    return args
  }

  private static savePrototypesInternal(args: any): void {
    if (!args || args.__className || typeof args !== 'object') return
    if (args instanceof Array) args.forEach(arg => WorkerServiceUtils.savePrototypesInternal(arg))
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
        WorkerServiceUtils.savePrototypesInternal(args[key])
    }
  }
}
