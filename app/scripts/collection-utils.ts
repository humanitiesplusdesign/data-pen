namespace fibra {
  'use strict'

  export class EnsuredMap<T> {
    private _set: {[id: string]: T} = {}
    public get(key: string): T {
      return this._set[key]
    }
    public contains(key: string): boolean {
      return this._set[key] !== undefined
    }
    public goc(key: string, create?: (key?: string) => T): T {
      if (this._set[key] === undefined)
        this._set[key] = create ? create(key) : <T>{}
      return this._set[key]
    }
  }

  export class EnsuredOrderedMap<T> {
    private _set: {[id: string]: T} = {}
    private _array: T[] = []
    public get(key: string): T {
      return this._set[key]
    }
    public contains(key: string): boolean {
      return this._set[key] !== undefined
    }
    public goc(key: string, create?: (key?: string) => T): T {
      if (this._set[key] === undefined) {
        this._set[key] = create ? create(key) : <T>{}
        this._array.push(this._set[key])
      }
      return this._set[key]
    }
    public cpush(key: string, value: T): void {
      if (this._set[key] === undefined) {
        this._set[key] = value
        this._array.push(value)
      }
    }
    public array(): T[] {
      return this._array
    }
  }

  export function goc<T>(obj: {[id: string]: T}, key: string, create?: (key?: string) => T): T {
    if (obj[key] === undefined)
      obj[key] = create ? create(key) : <T>{}
    return obj[key]
  }

  export function ogoc<T>(obj: {[id: string]: T}, key: string, arr: T[], create?: (key?: string) => T): T {
    if (obj[key] === undefined) {
      obj[key] = create ? create(key) : <T>{}
      arr.push(obj[key])
    }
    return obj[key]
  }

  export function cpush<T>(arr: T[], obj: {[id: string]: T}, key: string, value: T): void {
    if (obj[key] === undefined) {
      obj[key] = value
      arr.push(value)
    }
  }

}
