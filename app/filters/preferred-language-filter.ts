'use strict'

import {ILiteral} from '../models/rdfjs'
import * as angular from 'angular'
import { IFibraNgRedux } from 'reducers';
import { NodeSet, ONodeSet, INode } from 'models/rdf';
import { IRichNode } from 'models/richnode';

let uriCache: Map<string, string> = new Map()

export function getPrefLangString(literals: NodeSet<ILiteral> | ILiteral[], prefLang: string, uri?: string): string {
  if (uri && uriCache.has(uri)) {
    // console.log('hit')
    return uriCache.get(uri)
  }
  if (!literals) {
    if (uri) {
      let lname: string = uri.replace(/.*\//, '').replace(/.*\#/, '').replace('_', ' ').replace(/[A-ZÅÄÖ]/g, (match) => ' ' + match.toLocaleLowerCase())
      if (lname !== '') return lname
      return uri
    }
    return '?'
  }
  let dl: string = null
  let pl: string = null
  let al: string = null
  let plParts: string[] = prefLang.split('-')
  let p: (l: ILiteral) => boolean = l => {
    if (l.language === '') dl = l.value
    else al = l.value
    if (l.language === prefLang) return true
    let lparts: string[] = l.language.split('-')
    if (lparts.length >= plParts.length && plParts.every((value, index) => value === lparts[index])) pl = l.value
    return false
  }
  let cl: ILiteral = literals instanceof Array ? literals.find(p) : literals.find(p)
  if (cl) {
    if (uri) uriCache.set(uri, cl.value)
    return cl.value
  }
  if (pl) return pl
  if (dl) return dl
  if (al) return al
  if (uri) {
    let lname: string = uri.replace(/.*\//, '').replace(/.*\#/, '').replace('_', ' ')
    lname = lname[0] + lname.substring(1).replace(/[A-ZÅÄÖ]/g, (match) => ' ' + match.toLocaleLowerCase())
    if (lname !== '') return lname
    return uri
  }
  return '?'
}

angular.module('fibra.filters.pref-lang-label', [])
  .filter('prefLangLabel', /* @ngInject */ ($ngRedux: IFibraNgRedux) => (node: IRichNode) => {
    if (!node) return '?'
    return getPrefLangString(node.labels, $ngRedux.getState().general.language, node.value)
  })

angular.module('fibra.filters.pref-lang', [])
  .filter('prefLang', /* @ngInject */ ($ngRedux: IFibraNgRedux) => (literals: NodeSet<ILiteral>, uri?: string) => {
    return getPrefLangString(literals, $ngRedux.getState().general.language, uri)
  })
