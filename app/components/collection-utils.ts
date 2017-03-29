namespace fibra {
  'use strict'

  export class Map<V> implements d3.Map<V> {

    public s: {[id: string]: V} = {}

    public has(key: string): boolean {
      return this.s[key] !== undefined
    }

    public set(key: string, value: V): this {
      this.s[key] = value
      return this
    }
    public get(key: string): V {
      return this.s[key]
    }
    public remove(key: string): boolean {
      let contained: boolean = this.has(key)
      delete this.s[key]
      return contained
    }
    public sets(obj: {[id: string]: V}): this {
      for (let key in obj) this.set(key, obj[key])
      return this
    }
    public setm(obj: d3.Map<V>): this {
      for (let key in obj) this.set(key, obj[key])
      return this
    }
    public clear(): this {
      this.s = {}
      return this
    }
    public keys(): string[] {
      let ret: string[] = []
      for (let key in this.s) ret.push(key)
      return ret
    }
    public values(): V[] {
      let ret: V[] = []
      for (let key in this.s) ret.push(this.s[key])
      return ret
    }
    public entries(): { key: string, value: V }[] {
      let ret: { key: string, value: V }[] = []
      for (let key in this.s) ret.push({ key, value: this.s[key] })
      return ret
    }
    public each(func: (value: V, key: string, map: Map<V>) => void): undefined {
      for (let key in this.s)
        func(this.s[key], key, this)
      return undefined
    }
    public size(): number {
      let size: number = 0
      /*tslint:disable no-unused-variable*/
      for (let key in this.s) size++
      /*tslint:enable no-unused-variable*/
      return size
    }
    public empty(): boolean {
      return this.size() === 0
    }
  }

  export interface IEMap<V> extends d3.Map<V> {
    goc(key: string, create?: (key?: string) => V): V
  }

  export class EMap<V> extends Map<V> implements IEMap<V> {

    constructor(protected create: (key?: string) => V = () => { return <V>{} }) { super() }

    public goc(key: string, create?: (key?: string) => V): V {
      if (!this.has(key))
        this.set(key, create ? create(key) : this.create(key))
      return this.get(key)
    }
  }

  export class IdentitySet<V> {
    public a: V[] = []
    public clear(): this {
      this.a = []
      return this
    }
    public has(key: V): boolean {
      return this.a.indexOf(key) !== -1
    }
    public add(key: V): this {
      if (this.has(key)) return this
      this.a.push(key)
      return this
    }
    public adda(arr: V[]): this {
      arr.forEach(v => this.add(v))
      return this
    }
    public adds(oset: IdentitySet<V>): this {
      oset.each(v => this.add(v))
      return this
    }
    public remove(key: V): boolean {
      let index: number = this.a.indexOf(key)
      if (index === -1) return false
      this.a.splice(index, 1)
      return true
    }
    public each(func: (value: V, valueRepeat: V, set: IdentitySet<V>) => void): undefined {
      for (let value of this.a)
        func(value, value, this)
      return undefined
    }
    public size(): number {
      return this.a.length
    }
    public empty(): boolean {
      return this.size() === 0
    }
    public values(): V[] {
      return this.a
    }
  }

  export class StringSet implements d3.Set {
    public s: {[id: string]: string} = {}
    public clear(): this {
      this.s = {}
      return this
    }
    public has(key: string): boolean {
      return this.s[key] !== undefined
    }
    public add(key: string): this {
      this.s[key] = key
      return this
    }
    public adda(arr: string[]): this {
      arr.forEach(str => this.add(str))
      return this
    }
    public adds(oset: d3.Set): this {
      oset.each(str => this.add(str))
      return this
    }
    public remove(key: string): boolean {
      let contained: boolean = this.has(key)
      delete this.s[key]
      return contained
    }
    public each(func: (value: string, valueRepeat: string, set: StringSet) => void): undefined {
      for (let key in this.s)
        func(this.s[key], key, this)
      return undefined
    }
    public size(): number {
      let size: number = 0
      /*tslint:disable no-unused-variable*/
      for (let key in this.s) size++
      /*tslint:enable no-unused-variable*/
      return size
    }
    public empty(): boolean {
      return this.size() === 0
    }
    public values(): string[] {
      let ret: string[] = []
      for (let key in this.s) ret.push(key)
      return ret
    }
  }

  export class OMap<V> extends Map<V> {
    public a: V[] = []

    public set(key: string, value: V): this {
      if (!this.has(key)) {
        super.set(key, value)
        this.a.push(value)
      }
      return this
    }
    public remove(key: string): boolean {
      let value: V = this.get(key)
      if (value !== undefined) {
        super.remove(key)
        this.a.splice(this.a.indexOf(value), 1)
      }
      return value !== undefined
    }
    public size(): number {
      return this.a.length
    }
    public values(): V[] {
      return this.a
    }
    public clear(): this {
      super.clear()
      this.a = []
      return this
    }
  }

  export class EOMap<V> extends OMap<V> implements IEMap<V> {
    constructor(protected create?: (key?: string) => V) { super() }

    public goc(key: string, create?: (key?: string) => V): V {
      if (!this.has(key))
        this.set(key, create ? create(key) : this.create(key))
      return this.get(key)
    }
  }

  export class OStringSet extends StringSet {
    public a: string[] = []

    public add(key: string): this {
      if (!this.has(key)) {
        super.add(key)
        this.a.push(key)
      }
      return this
    }
    public remove(key: string): boolean {
      let contained: boolean = super.remove(key)
      if (contained)
        this.a.splice(this.a.indexOf(key), 1)
      return contained
    }
    public size(): number {
      return this.a.length
    }
    public values(): string[] {
      return this.a
    }
    public clear(): this {
      super.clear()
      this.a = []
      return this
    }
  }

  export function goc<V>(obj: {[id: string]: V}, key: string, create?: (key?: string) => V): V {
    if (obj[key] === undefined)
      obj[key] = create ? create(key) : <V>{}
    return obj[key]
  }

  export function ogoc<V>(obj: {[id: string]: V}, key: string, arr: V[], create?: (key?: string) => V): V {
    if (obj[key] === undefined) {
      obj[key] = create ? create(key) : <V>{}
      arr.push(obj[key])
    }
    return obj[key]
  }

  export function cpush<V>(arr: V[], obj: {[id: string]: V}, key: string, value: V): void {
    if (obj[key] === undefined) {
      obj[key] = value
      arr.push(value)
    }
  }

  export function cpushs<V>(arr: V[], obj: {[id: string]: V}, obj2: {[id: string]: V}): void {
    for (let key in obj2) cpush(arr, obj, key, obj2[key])
  }

}
