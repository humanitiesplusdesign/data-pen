namespace fibra {
  'use strict'

  export class SocialAuthService {
    private ls: any
    private ss: any

    public constructor($localStorage: any, $sessionStorage: any, private $state: angular.ui.IStateService) {
      this.ls = $localStorage
      this.ss = $sessionStorage
    }

    public isAuthenticated(): boolean {
      return !!this.ls.access_token
    }

    public logout(): void {
      this.ls.access_token = null
      this.ls.login_provider = null
      this.ls.user_email = null
      this.$state.go('projects')
    }
  }
}
