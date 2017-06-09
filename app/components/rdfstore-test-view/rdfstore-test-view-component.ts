'use strict'

import {FibraSparqlService} from 'services/fibra-sparql-service'
import {ISparqlBindingResult, ISparqlBinding} from 'angular-sparql-service'

declare var CodeMirror: any

import 'angular-yasr-component'
import 'angular-ui-codemirror'
import 'codemirror/mode/turtle/turtle'
import 'codemirror/addon/display/fullscreen'
import 'codemirror/addon/hint/show-hint'
import 'codemirror/addon/hint/anyword-hint'
import 'codemirror/addon/search/searchcursor'
import 'codemirror/addon/search/search'
import 'codemirror/addon/search/match-highlighter'
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/dialog/dialog'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/edit/trailingspace'
import 'codemirror/addon/runmode/runmode'
import 'codemirror/addon/fold/foldcode'
import 'codemirror/addon/fold/foldgutter'
import 'codemirror/addon/fold/indent-fold'
import 'codemirror/addon/selection/active-line'

export class RdfstoreTestViewComponentController implements angular.IComponentController {
  public data: string
  public query: string
  public results: ISparqlBindingResult<{[id: string]: ISparqlBinding}>
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

  /* @ngInject */
  constructor(private fibraSparqlService: FibraSparqlService, private toastr: angular.toastr.IToastrService) {}
}

export class RdfstoreTestViewComponent implements angular.IComponentOptions {
  public controller: string = 'RdfstoreTestViewComponentController' // (new (...args: any[]) => angular.IController) = ConfigureViewComponentController
  public templateUrl: string = 'components/rdfstore-test-view/rdfstore-test-view.html'
}
