'use strict'

import {ICitable} from '../models/citable'
import {getPrefLangString} from './preferred-language-filter'
import * as angular from 'angular'
import { IFibraNgRedux } from 'reducers';

angular.module('fibra.filters.citable', [])
  .filter('citable', /* @ngInject */ ($ngRedux: IFibraNgRedux) => (obj: ICitable) => {
    let prefLang: string = $ngRedux.getState().general.language
    let ret: string = getPrefLangString(obj.labels, prefLang)
    if (obj.rightsHolders.length > 0) {
      ret += ' ('
      obj.rightsHolders.forEach(rh => ret += getPrefLangString(rh.labels, prefLang) + ', ')
      ret = ret.substring(0, ret.length - 2) + ')'
    }
    return ret
  })
