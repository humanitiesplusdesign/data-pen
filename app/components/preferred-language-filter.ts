namespace fibra {
  'use strict'

  export function getPrefLangString(literals: ILiteral[], prefLang: string): string {
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

  angular.module('fibra').filter('prefLang', (fibraService: FibraService) => (literals: ILiteral[]) => {
    return getPrefLangString(literals, fibraService.getState().language)
  })

}
