'use strict'

import {ICitable, Citable} from '../../models/citable'
import {ProjectSourceInfo} from '../project-sources-view/project-sources-view-component'
import {ProjectService} from '../../services/project-service/project-service'
import {UUID} from '../misc-utils'
import {DataFactory} from '../../models/rdf'
import * as angular from 'angular'
import { IFibraNgRedux } from 'reducers';

export class EditCitableComponentController<T extends ICitable> implements angular.IComponentController {
  public c: T
  public disabled: boolean = false
  public projectSource: ProjectSourceInfo
  public projectSources: ProjectSourceInfo[]

  public delete(): void {
    this.disabled = true
    this.projectService.deleteCitable(this.projectSource.updateEndpoint, this.c).then(
      () => {
        this.toastr.success('Resource deleted')
        this.disabled = false
      },
      (err) => {
        this.toastr.error('Error deleting resource', err)
        this.disabled = false
      }
    )
  }

  public save(): void {
    this.disabled = true
    this.c.source = this.projectSource
    this.projectService.saveCitable(this.projectSource.updateEndpoint, this.projectSource.graphStoreEndpoint, this.c).then(
      () => {
        this.toastr.success('Resource saved')
        this.disabled = false
      },
      (err) => {
        this.toastr.error('Error saving resource', err)
        this.disabled = false
      }
    )
  }

  /* @ngInject */
  constructor(sourceId: string, private projectService: ProjectService, private toastr: angular.toastr.IToastrService) {
    this.projectSources = projectService.getProjectSources()
    this.projectSource = this.projectSources.find(cs2 => cs2.id === sourceId)
  }

}

export class CitableEditorComponentController implements angular.IComponentController {
  public citable: ICitable
  public noRightsHolders: string
  public noId: string
  public noRightsHolderIds: string
  public addRightsHolder(): void {
    let c: ICitable = new Citable('http://ldf.fi/fibra/citable_' + UUID())
    c.labels.add(DataFactory.literal('', this.$ngRedux.getState().general.language))
    c.descriptions.add(DataFactory.literal('', this.$ngRedux.getState().general.language))
    this.citable.rightsHolders.push(c)
  }
  public addLabel(): void {
    this.citable.labels.add(DataFactory.literal('', ''))
  }
  public addDescription(): void {
    this.citable.descriptions.add(DataFactory.literal('', ''))
  }
  public removeLabel(index: number): void {
    this.citable.labels.removei(index)
  }
  public removeDescription(index: number): void {
    this.citable.descriptions.removei(index)
  }
  /* @ngInject */
  constructor(private $ngRedux: IFibraNgRedux) {
  }
}

export class CitableEditorComponent implements angular.IComponentOptions {
  public bindings: {[id: string]: string} = {
    citable: '=',
    noRightsHolders: '@',
    noId: '@',
    noRightsHolderIds: '@'
  }
  public controller: (new (...args: any[]) => angular.IController) = CitableEditorComponentController // (new (...args: any[]) => angular.IController) = ConfigureViewComponentController
  public template: string = require('./citable-editor.pug')()
}

angular.module('fibra.components.citable-editor', ['fibra.services'])
  .component('citableEditor', new CitableEditorComponent())
