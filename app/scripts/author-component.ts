namespace fibra {
  'use strict'

  class TreeViewConfiguration {
    constructor(public endpoint: string, public queryTemplate: string) {}
  }

  export class AuthorComponentController {
    public itemId: string
    public itemEndpoint: string

    public setItem: (itemId: string, itemEndpoint: string) => void = (itemId: string, itemEndpoint: string) => {
      this.itemId = itemId
      this.itemEndpoint = itemEndpoint
    }

    constructor(private configurationService: ConfigurationService) {}
  }

  export class AuthorComponent implements angular.IComponentOptions {
      public controller: Function = AuthorComponentController
      public templateUrl: string = 'partials/author.html'
  }
}
