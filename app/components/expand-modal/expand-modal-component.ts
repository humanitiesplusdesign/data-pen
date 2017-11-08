'use strict'
import { NamedNode, RDF, SKOS } from '../../models/rdf';
import { PropertyToValues, SparqlItemService } from '../../services/sparql-item-service';
import { IRootState } from '../../reducers';
import { INgRedux } from 'ng-redux';
import { IActiveState, IItemState } from '../../reducers/frontend/active';
import ActiveActions, { IActiveActions } from '../../actions/active';

import * as angular from 'angular';

interface IExpandModalComponentControllerState extends IActiveActions {
  active: IActiveState
}

export class ExpandModalComponentController {
  private actions: any = {}
  private state: IExpandModalComponentControllerState = <IExpandModalComponentControllerState>{}

  private close: any
  private dismiss: any
  private resolve: any

  private itemState: IItemState
  private itemProperties: PropertyToValues[]

  private expandRadius: number = 60

  /* @ngInject */
  constructor(
    private $ngRedux: INgRedux,
    private sparqlItemService: SparqlItemService
  ) {
    let stateUnsubscribe: () => void = $ngRedux.connect(
      (state: IRootState) => {
        return {
          active: state.frontend.active
        }
      },
      ActiveActions)(this.state)
    this.actions.unsubscribe = () => {
      stateUnsubscribe()
    }
  }

  private $onInit(): void {
    this.itemState = this.resolve.item
    this.itemProperties = this.itemState.item.localProperties.concat(this.itemState.item.remoteProperties)
        .filter((p) => p.value !== RDF.type.value
          && p.value !== SKOS.prefLabel.value
          && p.value !== SKOS.altLabel.value
          && p.value !== 'http://purl.org/dc/terms/identifier'
        )
  }

  private expand(propValues: PropertyToValues): void {
    propValues.values.forEach((v, i) => {
      let theta: number = ((Math.PI * 2) / propValues.values.length)
      let angle: number = (theta * i)
      let leftOffset: number = this.itemState.leftOffset + (this.expandRadius * Math.cos(angle))
      let topOffset: number = this.itemState.topOffset + (this.expandRadius * Math.sin(angle))

      this.state.addItemToCurrentLayout(
        {
          ids: [new NamedNode(v.value.value)],
          item: null,
          description: null,
          topOffset: topOffset,
          leftOffset: leftOffset
        },
        this.sparqlItemService)
    })
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
  public controller: any = ExpandModalComponentController
}

angular.module('fibra.components.expand-modal', [])
  .component('expandModal', new ExpandModalComponent())
