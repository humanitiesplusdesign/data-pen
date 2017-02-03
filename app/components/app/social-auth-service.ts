namespace fibra {
  'use strict'

  export class SocialAuthService {
    private ls: any
    private ss: any

    public constructor($localStorage: any, $sessionStorage: any) {
      this.ls = $localStorage
      this.ss = $sessionStorage
    }

    public isAuthenticated(): boolean {
      return !!this.ss.access_token
    }
  }
}
