'use strict'
import * as angular from 'angular'
import * as CryptoJS from 'crypto-js';

export class SocialAuthService {

  /* @ngInject */
  public constructor(private $localStorage: any, private $state: angular.ui.IStateService) {
  }

  public loginState(): string {
    if (this.$localStorage.user_email)
      return this.$localStorage.user_email + ' (via ' + this.$localStorage.login_provider + ')'
      else
        return 'Not logged in'
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

  public getSourceID(): string {
    return 'http://ldf.fi/fibra/user/' + CryptoJS.SHA256(this.loginState()) + '/projects/'
  }
}

angular.module('fibra.services.social-auth-service', [])
  .config(($provide) => {
    $provide.service('socialAuthService', SocialAuthService)
  })
