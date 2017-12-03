'use strict'

export interface IMap<V> extends d3.Map<V> {
  map(f: (value: V, key: string, map: IMap<V>) => {value: V, key: string}): IMap<V>
  mapValues(f: (value: V, key: string, map: IMap<V>) => V): IMap<V>
  some(f: (value: V, key: string, map: IMap<V>) => boolean): boolean
  find(f: (value: V, key: string, map: IMap<V>) => boolean): {value: V, key: string}
  clone(): IMap<V>
  empty(): boolean
}

export class FMap<V> implements IMap<V> {

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
  public map(f: (value: V, key: string, map: FMap<V>) => {value: V, key: string}): FMap<V> {
    let ret: FMap<V> = new FMap<V>()
    this.each((value: V, key: string) => {
      let mapped: {value: V, key: string} = f(value, key, this)
      ret.set(mapped.key, mapped.value)
    })
    return ret
  }
  public mapValues(f: (value: V, key: string, map: IMap<V>) => V): IMap<V> {
    let ret: IMap<V> = new FMap<V>()
    this.each((value: V, key: string) => {
      ret.set(key, f(value, key, this))
    })
    return ret
  }
  public each(func: (value: V, key: string, map: IMap<V>) => void): undefined {
    for (let key in this.s)
      func(this.s[key], key, this)
    return undefined
  }
  public some(func: (value: V, key: string, map: IMap<V>) => boolean): boolean {
    for (let key in this.s) if (func(this.s[key], key, this)) return true
    return false
  }
  public find(func: (value: V, key: string, map: IMap<V>) => boolean): {value: V, key: string} {
    for (let key in this.s) if (func(this.s[key], key, this)) return {value: this.s[key], key: key}
    return null
  }
  public clone(): IMap<V> {
    let ret: IMap<V> = new FMap<V>()
    this.each((value: V, key: string) => {
      ret.set(key, value)
    })
    return ret
  }
  public size(): number {
    let size: number = 0
    /*tslint:disable no-unused-variable*/
    for (let key in this.s) size++
    /*tslint:enable no-unused-variable*/
    return size
  }
  public empty(): boolean {
    for (let key in this.s) return false
    return true
  }
}

export interface IEMap<V> extends IMap<V> {
  goc(key: string, create?: (key?: string) => V): V
}

export class EMap<V> extends FMap<V> implements IEMap<V> {

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
  public map(f: (value: V, valueRepeat: V, set: IdentitySet<V>) => V): IdentitySet<V> {
    let ret: IdentitySet<V> = new IdentitySet<V>()
    this.each(value => ret.add(f(value, value, this)))
    return ret
  }
  public some(f: (value: V, valueRepeat: V, set: IdentitySet<V>) => boolean): boolean {
    for (let value of this.a)
      if (f(value, value, this)) return true
    return false
  }
  public find(f: (value: V, valueRepeat: V, set: IdentitySet<V>) => boolean): V {
    for (let value of this.a)
      if (f(value, value, this)) return value
    return null
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
    this.s[key] = ''
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
      func(key, key, this)
    return undefined
  }
  public size(): number {
    let size: number = 0
    /*tslint:disable no-unused-variable*/
    for (let key in this.s) size++
    /*tslint:enable no-unused-variable*/
    return size
  }
  public values(): string[] {
    let ret: string[] = []
    for (let key in this.s) ret.push(key)
    return ret
  }
  public map(f: (value: string, valueRepeat: string, set: StringSet) => string): StringSet {
    let ret: StringSet = new StringSet()
    this.each(value => ret.add(f(value, value, this)))
    return ret
  }
  public some(f: (value: string, valueRepeat: string, set: StringSet) => boolean): boolean {
    for (let value in this.s)
      if (f(value, value, this)) return true
    return false
  }
  public find(f: (value: string, valueRepeat: string, set: StringSet) => boolean): string {
    for (let value in this.s)
      if (f(value, value, this)) return value
    return null
  }
  public clone(): StringSet {
    let ret: StringSet = new StringSet()
    this.each(value => ret.add(value))
    return ret
  }
  public empty(): boolean {
    for (let value in this.s) return false
    return true
  }
}

export class OMap<V> extends FMap<V> {
  public ka: string[] = []
  public va: V[] = []

  public set(key: string, value: V): this {
    if (!this.has(key)) {
      super.set(key, value)
      this.ka.push(key)
      this.va.push(value)
    }
    return this
  }
  public remove(key: string): boolean {
    let value: V = this.get(key)
    if (value !== undefined) {
      super.remove(key)
      let index: number = this.ka.indexOf(key)
      this.ka.splice(index, 1)
      this.va.splice(index, 1)
    }
    return value !== undefined
  }
  public removei(index: number): void {
    super.remove(this.ka[index])
    this.ka.splice(index, 1)
    this.va.splice(index, 1)
  }
  public size(): number {
    return this.ka.length
  }
  public empty(): boolean {
    return this.ka.length !== 0
  }
  public keys(): string[] {
    return this.ka
  }
  public values(): V[] {
    return this.va
  }
  public clear(): this {
    super.clear()
    this.ka = []
    this.va = []
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
  public empty(): boolean {
    return this.a.length !== 0
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
