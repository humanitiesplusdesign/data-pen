'use strict'
import * as angular from 'angular'

export class SocialAuthService {

  /* @ngInject */
  public constructor(private $localStorage: any, private $state: angular.ui.IStateService) {
  }

  public loginState(): string {
    if (this.$localStorage.user_email)
      return this.$localStorage.user_email + ' (' + this.$localStorage.login_provider + ')'
      else
        return ''
  }

  public isLoggedIn(): boolean {
    return this.$localStorage.user_email !== null && this.$localStorage.user_email !== undefined
  }

  public isAuthenticated(): boolean {
    return !!this.$localStorage.access_token
  }

  public logout(): void {
    this.$localStorage.access_token = null
    this.$localStorage.login_provider = null
    this.$localStorage.user_email = null
    this.$state.go('projects')
  }
}

angular.module('fibra.services.social-auth-service', [])
  .config(($provide) => {
    $provide.service('socialAuthService', SocialAuthService)
  })
