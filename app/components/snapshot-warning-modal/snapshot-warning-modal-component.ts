'use strict'
import { NamedNode, RDF, SKOS } from '../../models/rdf';
import { PropertyToValues, SparqlItemService } from '../../services/sparql-item-service';
import { IRootState } from '../../reducers';
import { IFibraNgRedux } from 'reducers';
import { IActiveState } from '../../reducers/active';

import * as angular from 'angular';

interface IConfirmSnapshotLoadComponentControllerState {
  active: IActiveState
}

export class ConfirmSnapshotLoadComponentController {
  private close: any
  private dismiss: any

  private commit(): void {
    this.close()
  }

  private cancel(): void {
    this.dismiss()
  }
}

export class ConfirmSnapshotLoadComponent implements angular.IComponentOptions {
  public bindings: {[id: string]: string} = {
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
  public template: string = require('./snapshot-warning-modal.pug')()
  public controller: any = ConfirmSnapshotLoadComponentController
}

angular.module('fibra.components.snapshot-warning-modal', [])
  .component('snapshotWarningModal', new ConfirmSnapshotLoadComponent())
