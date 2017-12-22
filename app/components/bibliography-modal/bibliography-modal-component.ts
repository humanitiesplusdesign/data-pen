'use strict'
import { NamedNode, RDF, SKOS } from '../../models/rdf';
import { PropertyToValues, SparqlItemService } from '../../services/sparql-item-service';
import { IRootState } from '../../reducers';
import { IFibraNgRedux } from 'reducers';
import { IActiveState } from '../../reducers/active';

import * as angular from 'angular';

interface IBibliographyModalComponentControllerState {
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

  /* @ngInject */
  constructor() {
    
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
