'use strict'

import {ILiteral} from '../models/rdfjs'
import * as angular from 'angular'
import { IFibraNgRedux } from 'reducers';
import { NodeSet, ONodeSet } from 'models/rdf';

export function getPrefLangString(literals: NodeSet<ILiteral>, prefLang: string): string {
  let dl: string = null
  let al: string = null
  let cl: ILiteral = literals.find(l => {
    if (l.language === '') dl = l.value
    else al = l.value
    return l.language === prefLang
  })
  if (cl) return cl.value
  if (dl) return dl
  return al
}

angular.module('fibra.filters.pref-lang', [])
  .filter('prefLang', /* @ngInject */ ($ngRedux: IFibraNgRedux) => (literals: NodeSet<ILiteral>) => {
    return getPrefLangString(literals, $ngRedux.getState().general.language)
  })
