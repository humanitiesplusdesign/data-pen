'use strict'

import {TreeNode} from '../../tree/tree-component'
import {FibraService} from '../../../services/fibra-service'
import * as angular from 'angular'
import { INgRedux } from 'ng-redux'
import * as TypeActions from '../../../actions/types'

export class ExploreTypeComponentController {

  // Actions
  private unsubscribe: any
  private setOrderedTypes: any
  private types: any

  /* @ngInject */
  public constructor(private fibraService: FibraService,
                     private $ngRedux: INgRedux) {
    this.unsubscribe = $ngRedux.connect(this.mapStateToThis, TypeActions)(this)
    this.fibraService = fibraService
  }
  public primaryClick(type: TreeNode): void {
    let newTypes: TreeNode[] = this.types.displayTypes.concat([])
    newTypes[0] = type
    this.setOrderedTypes(newTypes)
    this.fibraService.dispatch('change')
  }
  public secondaryClick(type: TreeNode): void {
    let newTypes: TreeNode[] = this.types.displayTypes.concat([])
    newTypes[1] = type
    this.setOrderedTypes(newTypes)
    this.fibraService.dispatch('change')
  }
  public tertiaryClick(type: TreeNode): void {
    let newTypes: TreeNode[] = this.types.displayTypes.concat([])
    newTypes[2] = type
    this.setOrderedTypes(newTypes)
    this.fibraService.dispatch('change')
  }

  public $onDestroy(): void {
    this.unsubscribe()
  }

  private mapStateToThis(state) {
    return {
      types: state.types
    }
  }
}

export class ExploreTypeComponent implements angular.IComponentOptions {
    public template = require('./explore-type-component.pug')()
    public controller = ExploreTypeComponentController
}


angular.module('fibra.components.explore-type', ['fibra.services'])
  .component('exploreType', new ExploreTypeComponent())
