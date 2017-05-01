'use strict'

import {TreeNode} from '../../tree/tree-component'
import {FibraService} from '../../../services/fibra-service'
import * as angular from 'angular'

export class ExploreTypeComponentController {
  private types: () => TreeNode[]
  private displayTypes: () => TreeNode[]

  public constructor(private fibraService: FibraService) {
    this.fibraService = fibraService
    this.types = () => this.fibraService.getState().construct.types.concat(this.fibraService.getState().construct.userTypes)
    this.displayTypes = () => this.fibraService.getState().construct.displayTypes
  }
  public primaryClick(type: TreeNode): void {
    let newTypes: TreeNode[] = this.displayTypes().concat([])
    newTypes[0] = type
    this.fibraService.dispatchAction(this.fibraService.setOrderedTypes(newTypes))
    this.fibraService.dispatch('change')
  }
  public secondaryClick(type: TreeNode): void {
    let newTypes: TreeNode[] = this.displayTypes().concat([])
    newTypes[1] = type
    this.fibraService.dispatchAction(this.fibraService.setOrderedTypes(newTypes))
    this.fibraService.dispatch('change')
  }
  public tertiaryClick(type: TreeNode): void {
    let newTypes: TreeNode[] = this.displayTypes().concat([])
    newTypes[2] = type
    this.fibraService.dispatchAction(this.fibraService.setOrderedTypes(newTypes))
    this.fibraService.dispatch('change')
  }
}

export class ExploreTypeComponent implements angular.IComponentOptions {
    public template = require('./explore-type-component.pug')()
    public controller = ExploreTypeComponentController
}


angular.module('fibra.components.explore-type', ['fibra.services'])
  .component('exploreType', new ExploreTypeComponent())
