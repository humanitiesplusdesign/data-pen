import { Action, Dispatch } from 'redux'
import * as angular from 'angular';
import { IFibraNgRedux } from 'reducers';

export const SET_LANGUAGE: string = 'SET_LANGUAGE'

export interface ISetLanguageAction extends Action {
  type: 'SET_LANGUAGE'
  language: string
}

class SetLanguageAction implements ISetLanguageAction {
  public type: 'SET_LANGUAGE'
  constructor(public language: string) {}
}

export class GeneralActionService {
  /* @ngInject */
  constructor(private $ngRedux: IFibraNgRedux) {
  }
  public setLanguage(lang: string): ISetLanguageAction {
    return this.$ngRedux.dispatch(new SetLanguageAction(lang))
  }
}

angular.module('fibra.actions.general', [])
.config(($provide) => {
  $provide.service('generalActionService', GeneralActionService)
})
