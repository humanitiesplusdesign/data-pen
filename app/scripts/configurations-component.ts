namespace fibra {
  'use strict'

  export class ConfigurationsComponentController {
    public configurations: Configuration[]

    public selectedConfiguration: Configuration

    public selectConfiguration: (Configuration) => void = (c: Configuration) => {
      this.selectedConfiguration = c
      if (!c.classTree)
        this.sparqlTreeService.getTree(c.endpoint, SparqlTreeService.getClassTreeQuery).then(c.setClassTree)
    }

    constructor(private sparqlTreeService: SparqlTreeService, private configurationService: ConfigurationService) {
      this.configurations = configurationService.configurations
    }
  }

  export class ConfigurationsComponent implements angular.IComponentOptions {
      public controller: Function = ConfigurationsComponentController
      public templateUrl: string = 'partials/configurations.html'
  }
}
