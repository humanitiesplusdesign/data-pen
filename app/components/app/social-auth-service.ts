'use strict'

export class SocialAuthService {

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
}