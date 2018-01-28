'use strict'
import { ActiveActionService } from '../../actions/active';
import { NamedNode, RDF, SKOS } from '../../models/rdf';
import { PropertyToValues, SparqlItemService } from '../../services/sparql-item-service';
import { IRootState } from '../../reducers';
import { IFibraNgRedux } from 'reducers';
import { IActiveState, IFullItemState } from '../../reducers/active';

import * as angular from 'angular';

interface IExpandModalComponentControllerState {
  active: IActiveState
}

export class ExpandModalComponentController {
  private actions: any = {}
  private state: IExpandModalComponentControllerState = <IExpandModalComponentControllerState>{}

  private close: any
  private dismiss: any
  private resolve: any

  private itemState: IFullItemState
  private itemProperties: PropertyToValues[]

  private expandRadius: number = 60
  private numberFirstRing: number = 12

  /* @ngInject */
  constructor(
    private $ngRedux: IFibraNgRedux,
    private activeActionService: ActiveActionService
  ) {
    let stateUnsubscribe: () => void = $ngRedux.connect(
      (state: IRootState) => {
        return {
          active: state.active
        }
      },
      null)(this.state)
    this.actions.unsubscribe = () => {
      stateUnsubscribe()
    }
  }

  public $onInit(): void {
    this.itemState = this.resolve.item
    this.itemProperties = this.itemState.item.localProperties.concat(this.itemState.item.remoteProperties)
        .filter((p) => p.property.value !== RDF.type.value
          && p.property.value !== SKOS.prefLabel.value
          && p.property.value !== SKOS.altLabel.value
          && p.property.value !== 'http://purl.org/dc/terms/identifier'
        )
    console.log(this.itemProperties)
  }

  private expand(propValues: PropertyToValues): void {
    let ring: number = 1
    let subtract: number = 0
    this.activeActionService.addItemsToCurrentLayout(
      propValues.values.map((v, i): IFullItemState => {
        if ((i - subtract) > this.numberFirstRing * ring) {
          subtract += this.numberFirstRing * ring
          ring += 1
        }
        let theta: number = ((Math.PI * 2) / ((propValues.values.length - subtract) < this.numberFirstRing * ring ? (propValues.values.length - subtract) : this.numberFirstRing * ring ))
        let angle: number = (theta * (i - subtract))
        let leftOffset: number = this.itemState.leftOffset + (this.expandRadius * ring * Math.cos(angle))
        let topOffset: number = this.itemState.topOffset + (this.expandRadius * ring * Math.sin(angle))

        return {
          ids: [new NamedNode(v.value.value)],
          item: null,
          description: null,
          topOffset: topOffset,
          leftOffset: leftOffset
        }
      })
    )
    this.close()
  }

  private commit(): void {
    this.close()
  }

  private cancel(): void {
    this.dismiss()
  }
}

export class ExpandModalComponent implements angular.IComponentOptions {
  public bindings: {[id: string]: string} = {
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
  public template: string = require('./expand-modal.pug')()
  public controller: (new (...args: any[]) => angular.IController) = ExpandModalComponentController
}

angular.module('fibra.components.expand-modal', [])
  .component('expandModal', new ExpandModalComponent())
