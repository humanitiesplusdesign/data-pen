namespace fibra {
  'use strict'
  class SparqlAutocompleteComponentController {
    public limit: string
    public constraints: string
    public queryRunning: boolean
    public onSelect: (selection: Result) => void
    public queryRemote?: string
    private error: boolean = false
    private query: string
    private hasMoreResults: boolean = false
    private hide: boolean = false
    private currentLimit: number
    private results: AutocompletionResults
    private canceller: angular.IDeferred<any>
    public onSelectInternal(selection: Result): void {
      this.onSelect(selection)
      this.hide = true
    }
    public clear(): void {
      this.results = null
      this.query = ''
      this.currentLimit = parseInt(this.limit, 10)
    }
    public onChange(query: string): void {
      this.canceller.resolve()
      this.canceller = this.$q.defer()
      this.queryRunning = true
      this.error = false
      this.sparqlAutocompleteService.autocomplete(query, this.currentLimit + 1, this.queryRemote !== undefined, this.constraints, this.canceller.promise).then(
        (results: AutocompletionResults) => {
          this.queryRunning = false
        },
        () => {
          this.queryRunning = false
          this.error = true
        },
        (update: {error?: any, results?: AutocompletionResults}) => {
          if (update.error) this.error = true
          else this.onResults(update.results)
        }
      )
    }
    constructor(private $q: angular.IQService, private sparqlAutocompleteService: SparqlAutocompleteService) {
      this.canceller = $q.defer()
    }
    public $onInit(): void {
      this.currentLimit = parseInt(this.limit, 10)
    }
    private onResults(results: AutocompletionResults): void {
      this.results = results
      if (this.results.localMatchingResults.length === this.currentLimit + 1) {
        this.results.localMatchingResults.splice(this.results.localMatchingResults.length - 1, 1)
        this.results.localNonMatchingResults = []
        this.results.remoteResults = []
      }
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
