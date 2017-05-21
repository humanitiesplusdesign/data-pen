'use strict'
import * as angular from 'angular'
import * as d3 from 'd3'
import {FibraService, UIState} from '../../services/fibra-service'
import {IPropertyAndValue, PropertyAndValue} from '../../services/sparql-item-service'
import {DataFactory, INode, OWL, NamedNode} from '../../models/rdf'
import { INgRedux } from 'ng-redux'
import * as TypeActions from '../../actions/types'

interface IUploadScope extends angular.IScope {
  registerFile
}

export class UploadComponentController implements angular.IComponentController {

  // Actions
  private unsubscribe: any
  private types: any

  private fileInput: any
  private classSelect: any = null
  private onUpload: any

  public constructor(private fibraService: FibraService,
                     private $ngRedux: INgRedux,
                     private $q: angular.IQService,
                     private $scope: IUploadScope) {
    this.unsubscribe = $ngRedux.connect(this.mapStateToThis, TypeActions)(this)
    this.fibraService = fibraService
    $scope.registerFile = this.registerFile.bind(this)
  }

  private mapStateToThis(state) {
    return {
      types: state.types
    }
  }

  private registerFile(file): void {
    this.fileInput = file
  }

  private uploadFile() {
    console.log(this.fileInput, this.types.types.filter((t) => t.id === this.classSelect)[0])
    let selectedClass = this.types.types.filter((t) => t.id === this.classSelect)[0]

        // Notes: column headers we should handle
    //  - 'FibraId' - this will be the matching Fibra identifier. In this case we should not createItem
    //              but rather update an existing item if necessary
    //  - SKOS.prefLabel.value - Will be the label to use
    //  - 'Match' - will be the Recon matched value and should go to OWL.sameAs property
    //  - 'Notes' - will do onto a notes property?


    // Just uses the first column of the file as labels
    let reader: FileReader = new FileReader();
    reader.onload = () => {
      let parsedCSV = d3.csvParse(reader.result)
      let newRows: d3.DSVRowString[] = parsedCSV.filter((row) => {
        return !row['FibraId']  // Not an update
      })
      let labelColumnKey = parsedCSV.columns[0]
      console.log(parsedCSV, labelColumnKey)
      let proms: angular.IPromise<UIState>[] = [
        newRows.length > 0 ? this.fibraService.dispatchAction(
          this.fibraService.createItems(
            newRows.map((row) => {
              let node: INode = DataFactory.instance.namedNode(row[labelColumnKey])
              return node
            }),
            selectedClass.id
          )
        ) : this.$q.resolve(this.fibraService.getState()),
        this.$q.all(parsedCSV.filter((row) => {
          return !!row['FibraId']
        }).map((row) => {
          if(row['Match'] && !row[OWL.sameAs.value]) {
            row[OWL.sameAs.value] = row['Match']
            delete row['Match']
          }
          let entries = d3.entries(row)
          let props: IPropertyAndValue[] = entries
            .filter((entry) =>  entry.key !== 'FibraId'
                                && entry.value
                                && entry.key !== OWL.sameAs.value
                                && entry.key !== 'Notes'
                                && entry.key !== 'Match')
            .map(entry =>
              new PropertyAndValue(
                DataFactory.instance.namedNode(entry.key),
                entry.value.indexOf('http://') === 0 ?
                DataFactory.instance.namedNode(entry.value) :
                DataFactory.instance.literal(entry.value)
              )
            )
          // Handle OWL.sameAs
          entries
            .filter((entry) => entry.key === OWL.sameAs.value && entry.value)
            .forEach((entry) => props.push(new PropertyAndValue(OWL.sameAs, DataFactory.instance.namedNode(entry.value))))
          return this.fibraService.dispatchAction(
            this.fibraService.itemProperty(
              new NamedNode(row['FibraId']),
              props
            )
          )
        })).then((states: UIState[]) => states[states.length - 1])
      ]

      this.$q.all(proms).then(() => {
        this.fibraService.dispatch('change')
      })
    };
    reader.readAsText(this.fileInput.files[0]);
    // We need to clear the input so that we pick up future uploads. This is *not*
    // cross-browser-compatible.
    this.fileInput.value = null;

    this.onUpload()
  }
}

export class UploadComponent implements angular.IComponentOptions {
  public controller = UploadComponentController // (new (...args: any[]) => angular.IController) = SelectViewComponentController
  public template: string = require('./upload.pug')()
  public bindings: {[id: string]: string} = {
    onUpload: '&'
  }
}

angular.module('fibra.components.upload', [])
  .component('upload', new UploadComponent())