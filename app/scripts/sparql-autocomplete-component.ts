namespace fibra {
  'use strict'
  class SparqlAutocompleteComponentController {
    public configurations: SparqlAutocompletionConfiguration[] = this.configurationService.configurations.map(c => c.autocompletionConfiguration)
    public limit: number
    public queryRunning: boolean
    public onSelect: (selection: Result) => void
    public error: boolean = false
    private resultsByDatasource: ResultsByDatasource[]
    private canceller: angular.IDeferred<any>
    public onChange: (query: string) => void = (query: string) => {
      this.canceller.resolve()
      this.canceller = this.$q.defer()
      this.queryRunning = true
      this.error = false
      this.sparqlAutocompleteService.autocomplete(query, this.limit, this.configurations, this.canceller.promise).then(
        (resultsByDatasource: ResultsByDatasource[]) => {
          this.resultsByDatasource = resultsByDatasource
          this.queryRunning = false
        },
        () => {
          this.queryRunning = false
          this.error = true
        }
      )
    }
    constructor(private $q: angular.IQService, private sparqlAutocompleteService: SparqlAutocompleteService, private configurationService: ConfigurationService) {
      this.canceller = $q.defer()
    }
  }

  export class SparqlAutocompleteComponent implements angular.IComponentOptions {
      public bindings: {[id: string]: string} = {
        constraints: '<',
        limit: '@',
        onSelect: '&'
      }
      public controller: Function = SparqlAutocompleteComponentController
      public templateUrl: string = 'partials/sparql-autocomplete.html'
  }
}
