namespace fibra {
  'use strict'
  class SparqlAutocompleteComponentController {
    public limit: number
    public queryRunning: boolean
    public onSelect: (selection: Result) => void
    public error: boolean = false
    public by: 'datasource' | 'group' = 'datasource'
    private results: (ResultsByDatasource|ResultGroup)[]
    private canceller: angular.IDeferred<any>
    public onChange: (query: string) => void = (query: string) => {
      this.canceller.resolve()
      this.canceller = this.$q.defer()
      this.queryRunning = true
      this.error = false
      if (this.by === 'datasource')
        this.sparqlAutocompleteService.autocompleteByDatasource(query, this.limit, this.canceller.promise).then(
          (resultsByDatasource: ResultsByDatasource[]) => {
            this.results = resultsByDatasource
            this.queryRunning = false
          },
          () => {
            this.queryRunning = false
            this.error = true
          }
        )
      else
        this.sparqlAutocompleteService.autocompleteByGroup(query, this.limit, this.canceller.promise).then(
          (resultsByGroup: ResultGroup[]) => {
            this.results = resultsByGroup
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
        onSelect: '&',
        by: '@'
      }
      public controller: Function = SparqlAutocompleteComponentController
      public templateUrl: string = 'partials/sparql-autocomplete.html'
  }
}
