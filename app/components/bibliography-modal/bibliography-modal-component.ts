'use strict'
import { NamedNode, RDF, SKOS } from '../../models/rdf';
import { PropertyToValues, SparqlItemService } from '../../services/sparql-item-service';
import { IRootState } from '../../reducers';
import { INgRedux } from 'ng-redux';
import { IActiveState, IItemState } from '../../reducers/frontend/active';
import ActiveActions, { IActiveActions } from '../../actions/active';

import * as angular from 'angular';

interface IBibliographyModalComponentControllerState extends IActiveActions {
  active: IActiveState
}

export class BibliographyModalComponentController {
  private close: any
  private dismiss: any

  private commit(): void {
    this.close()
  }

  private cancel(): void {
    this.dismiss()
  }
}

export class BiblographyModalComponent implements angular.IComponentOptions {
  public bindings: {[id: string]: string} = {
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
  public template: string = require('./bibliography-modal.pug')()
  public controller: any = BibliographyModalComponentController
}

angular.module('fibra.components.bibliography-modal', [])
  .component('bibliographyModal', new BiblographyModalComponent())
