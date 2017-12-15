'use strict'

import {ILiteral} from '../models/rdfjs'
import * as angular from 'angular'
import { IFibraNgRedux } from 'reducers';
import { NodeSet, ONodeSet } from 'models/rdf';

export function getPrefLangString(literals: NodeSet<ILiteral> | ILiteral[], prefLang: string): string {
  if (!literals) return '?'
  let dl: string = null
  let pl: string = null
  let al: string = '?'
  let plParts: string[] = prefLang.split('-')
  let p: (l) => boolean = l => {
    if (l.language === '') dl = l.value
    else al = l.value
    if (l.language === prefLang) return true
    let lparts: string[] = l.language.split('-')
    if (lparts.length >= plParts.length && plParts.every((value, index) => value === lparts[index])) pl = l.value
    return false
  }
  let cl: ILiteral = literals instanceof Array ? literals.find(p) : literals.find(p)
  if (cl) return cl.value
  if (pl) return pl
  if (dl) return dl
  return al
}

angular.module('fibra.filters.pref-lang', [])
  .filter('prefLang', /* @ngInject */ ($ngRedux: IFibraNgRedux) => (literals: NodeSet<ILiteral>) => {
    return getPrefLangString(literals, $ngRedux.getState().general.language)
  })
