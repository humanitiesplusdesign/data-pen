'use strict'
import {ICitable} from '../models/citable'
import {FMap, IMap} from './collection-utils'
import { SparqlService } from 'angular-sparql-service/dist/sparql-service'
import * as cjson from 'circular-json'

export function toTurtle(tb: TurtleBuilder): string {
  let s: string = ''
  for (let key in tb.prefixes) s = s + '@prefix ' + key + ': <' + tb.prefixes[key] + '> .\n'
  tb.fragmentsById.values().forEach(str => s = s + str.substring(0, str.length - 2) + ' .\n\n')
  return s
}

export class TurtleBuilder {
  public prefixes: {[prefix: string]: string} = {}
  public fragmentsById: IMap<string> = new FMap<string>()
}

export function citableToTurtle(c: ICitable): string {
  let tb: TurtleBuilder = new TurtleBuilder()
  c.toTurtle(tb)
  return toTurtle(tb)
}

let lut: string[] = []
for (let i: number = 0; i < 256; i++)
  lut[i] = (i < 16 ? '0' : '') + i.toString(16)

export function UUID(): string {
  /* tslint:disable:no-bitwise */
  let d0: number = Math.random() * 0xffffffff | 0
  let d1: number = Math.random() * 0xffffffff | 0
  let d2: number = Math.random() * 0xffffffff | 0
  let d3: number = Math.random() * 0xffffffff | 0
  return lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' +
    lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' +
    lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] +
    lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff]
  /* tslint:enable:no-bitwise */
}

export function flatten(arr: any[], initial: any[] = []): any[] {
  return arr.reduce(
    (flat, toFlatten) => flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten),
    initial
  )
}
