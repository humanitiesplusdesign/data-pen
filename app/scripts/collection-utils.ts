namespace fibra {
  'use strict'

  export class EMap<V> implements d3.D3Map<V> {

    public s: {[id: string]: V} = {}

    constructor(protected create: (key?: string) => V = () => { return <V>{} }) {}

    public has(key: string): boolean {
      return this.s[key] !== undefined
    }
    public goc(key: string, create?: (key?: string) => V): V {
      if (!this.has(key))
        this.set(key, create ? create(key) : this.create(key))
      return this.get(key)
    }
    public set(key: string, value: V): EMap<V> {
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
    public sets(obj: {[id: string]: V}): EMap<V> {
      for (let key in obj) this.set(key, obj[key])
      return this
    }
    public setm(obj: d3.D3Map<V>): EMap<V> {
      for (let key in obj) this.set(key, obj[key])
      return this
    }
    public clear(): EMap<V> {
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
    public each(func: (value: V, key: string, map: d3.D3Map<V>) => void): undefined {
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

  export class StringSet implements d3.D3Set<string> {
    public s: {[id: string]: string} = {}
    public clear(): StringSet {
      this.s = {}
      return this
    }
    public has(key: string): boolean {
      return this.s[key] !== undefined
    }
    public add(key: string): StringSet {
      this.s[key] = key
      return this
    }
    public adda(arr: string[]): StringSet {
      arr.forEach(str => this.add(str))
      return this
    }
    public remove(key: string): boolean {
      let contained: boolean = this.has(key)
      delete this.s[key]
      return contained
    }
    public each(func: (value: string, valueRepeat: string, set: d3.D3Set<string>) => void): undefined {
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

  export class EOMap<V> extends EMap<V> {
    public a: V[] = []
    constructor(create?: (key?: string) => V) {
      super(create)
    }

    public goc(key: string, create?: (key?: string) => V): V {
      if (!this.has(key))
        this.set(key, create ? create(key) : this.create(key))
      return this.get(key)
    }
    public set(key: string, value: V): EOMap<V> {
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
    public clear(): EOMap<V> {
      super.clear()
      this.a = []
      return this
    }
  }

  export class OStringSet extends StringSet {
    public a: string[] = []

    public add(key: string): OStringSet {
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
    public clear(): OStringSet {
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
