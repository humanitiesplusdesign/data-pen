namespace fibra {
  'use strict'
  class SparqlAutocompleteComponentController {
    public limit: number
    public queryRunning: boolean
    public onSelect: (selection: Result) => void
    public error: boolean = false
    public query: string
    public queryRemote?: string
    private hide: boolean = false
    private results: AutocompletionResults
    private canceller: angular.IDeferred<any>
    public onSelectInternal(selection: Result): void {
      this.onSelect(selection)
      this.hide = true
    }
    public clear(): void {
      this.results = null
      this.query = ''
    }
    public onChange(query: string): void {
      this.canceller.resolve()
      this.canceller = this.$q.defer()
      this.queryRunning = true
      this.error = false
      this.sparqlAutocompleteService.autocomplete(query, this.limit, this.queryRemote !== undefined, '', this.canceller.promise).then(
        (results: AutocompletionResults) => {
          this.results = results
          this.queryRunning = false
        },
        () => {
          this.queryRunning = false
          this.error = true
        },
        (update: {error?: any, results?: AutocompletionResults}) => {
          if (update.error) this.error = true
          else {
            this.error = false
            this.results = update.results
          }
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
        queryRemote: '@'
      }
      public controller: string = 'SparqlAutocompleteComponentController' // (new (...args: any[]) => angular.IController) = SparqlAutocompleteComponentController
      public templateUrl: string = 'components/sparql-autocomplete/sparql-autocomplete.html'
  }
}
