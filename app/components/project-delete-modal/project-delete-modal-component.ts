'use strict'
import { NamedNode, RDF, SKOS } from '../../models/rdf';
import { PropertyToValues, SparqlItemService } from '../../services/sparql-item-service';
import { IRootState } from '../../reducers';
import { IFibraNgRedux } from 'reducers';
import { IActiveState } from '../../reducers/active';

import * as angular from 'angular';

interface IConfirmProjectDeletionComponentControlerState {
  active: IActiveState
}

export class ConfirmProjectDeletionComponentControler {
  private close: any
  private dismiss: any

  private commit(): void {
    this.close()
  }

  private cancel(): void {
    this.dismiss()
  }
}

export class ConfirmProjectDeletionComponent implements angular.IComponentOptions {
  public bindings: {[id: string]: string} = {
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
  public template: string = require('./project-delete-modal.pug')()
  public controller: any = ConfirmProjectDeletionComponentControler
}

angular.module('fibra.components.project-delete-modal', [])
  .component('confirmDeleteModal', new ConfirmProjectDeletionComponent())
