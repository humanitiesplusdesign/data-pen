'use strict'

import {FibraSparqlService} from '../app/fibra-sparql-service'

declare var CodeMirror: any

export class RdfstoreTestViewComponentController implements angular.IComponentController {
  public data: string
  public query: string
  public results: fi.seco.sparql.ISparqlBindingResult<{[id: string]: fi.seco.sparql.ISparqlBinding}>
  public status: 'success' | 'error'
  public message: any
  public editorOptions: any = {
    lineWrapping : true,
    lineNumbers: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    showTrailingSpace : true,
    styleActiveLine : true,
    syntaxErrorCheck : true,
    highlightSelectionMatches: {showToken: /\w/},
    foldGutter : { rangeFinder: CodeMirror.fold.indent },
    gutters: [ 'CodeMirror-linenumbers', 'CodeMirror-foldgutter' ]
  }
  public loadData(): void {
    this.fibraSparqlService.put('local:test', this.data).then(
      success => {
        this.toastr.success('success')
        this.status = 'success'
        this.message = success
      },
      error => {
        this.toastr.error('error')
        this.status = 'error'
        this.message = error
      })
  }
  public runQuery(): void {
    this.fibraSparqlService.query('local:test', this.query).then(
      success => {
        this.toastr.success('success')
        this.message = ''
        this.results = success
      },
      error => {
        this.toastr.error('error')
        this.results = error
      })
  }
  constructor(private fibraSparqlService: FibraSparqlService, private toastr: angular.toastr.IToastrService) {}
}

export class RdfstoreTestViewComponent implements angular.IComponentOptions {
  public controller: string = 'RdfstoreTestViewComponentController' // (new (...args: any[]) => angular.IController) = ConfigureViewComponentController
  public templateUrl: string = 'components/rdfstore-test-view/rdfstore-test-view.html'
}
