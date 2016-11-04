namespace fibra {
  'use strict'
  class SparqlAutocompleteComponentController {
    public limit: number
    public queryRunning: boolean
    public onSelect: (selection: Result) => void
    public error: boolean = false
    public query: string
    private results: ResultGroup[]
    private canceller: angular.IDeferred<any>
    public clearResults: () => void = () => {
      this.results = []
      this.query = ''
    }
    public onChange: (query: string) => void = (query: string) => {
      this.canceller.resolve()
      this.canceller = this.$q.defer()
      this.queryRunning = true
      this.error = false
      this.sparqlAutocompleteService.autocomplete(query, this.limit, this.canceller.promise).then(
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
    constructor(private $q: angular.IQService, private sparqlAutocompleteService: SparqlAutocompleteService) {
      this.canceller = $q.defer()
    }
  }

  export class SparqlAutocompleteComponent implements angular.IComponentOptions {
      public bindings: {[id: string]: string} = {
        constraints: '<',
        limit: '@',
        onSelect: '&',
      }
      public controller: string = 'SparqlAutocompleteComponentController' // (new (...args: any[]) => angular.IController) = SparqlAutocompleteComponentController
      public templateUrl: string = 'components/sparql-autocomplete/sparql-autocomplete.html'
  }
}
