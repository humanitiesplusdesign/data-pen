namespace fibra {
  'use strict'

  class TreeViewConfiguration {
    constructor(public endpoint: string, public queryTemplate: string) {}
  }

  export class MainComponentController {
    public itemId: string
    public itemEndpoint: string

    public setItem: (itemId: string, itemEndpoint: string) => void = (itemId: string, itemEndpoint: string) => {
      this.itemId = itemId
      this.itemEndpoint = itemEndpoint
    }

    constructor(private configurationService: ConfigurationService) {}
  }

  export class MainComponent implements angular.IComponentOptions {
      public controller: Function = MainComponentController
      public templateUrl: string = 'partials/main.html'
  }
}
