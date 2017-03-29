namespace fibra {
  'use strict'

  angular.module('fibra').filter('citable', (fibraService: FibraService) => (obj: ICitable) => {
    let prefLang: string = fibraService.getState().language
    let ret: string = getPrefLangString(obj.labels, prefLang)
    if (obj.rightsHolders.length > 0) {
      ret += ' ('
      obj.rightsHolders.forEach(rh => ret += getPrefLangString(rh.labels, prefLang) + ', ')
      ret = ret.substring(0, ret.length - 2) + ')'
    }
    return ret
  })

}
