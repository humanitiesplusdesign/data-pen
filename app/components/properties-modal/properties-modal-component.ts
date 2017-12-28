'use strict'
import { ActiveActionService } from '../../actions/active';
import { NamedNode, RDF, SKOS } from '../../models/rdf';
import { PropertyToValues, SparqlItemService } from '../../services/sparql-item-service';
import { IRootState } from '../../reducers';
import { IFibraNgRedux } from 'reducers';
import { IActiveState, IFullItemState } from '../../reducers/active';

import * as angular from 'angular';
import { Mark } from 'services/project-service/project';

interface IPropertiesModalComponentControllerState {
  active: IActiveState
}

export class PropertiesModalComponentController {
  private actions: any = {}
  private state: IPropertiesModalComponentControllerState = <IPropertiesModalComponentControllerState>{}

  private close: any
  private dismiss: any
  private resolve: any

  private titleText: string = ''
  private marks: Mark[] = [Mark.Red, Mark.Yellow, Mark.Green, Mark.Blue, Mark.White]
  private itemProperties: PropertyToValues[]

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
    this.titleText = this.resolve.items.length === 1 ?
      this.resolve.items[0].description :
      '' + this.resolve.items.length + ' nodes'
    
  }

  private setMark(mark?: Mark) {
    this.resolve.items.forEach(it => it.mark = mark)
    this.resolve.update()
  }
}

export class PropertiesModalComponent implements angular.IComponentOptions {
  public bindings: {[id: string]: string} = {
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
  public template: string = require('./properties-modal.pug')()
  public controller: (new (...args: any[]) => angular.IController) = PropertiesModalComponentController
}

angular.module('fibra.components.properties-modal', [])
  .component('propertiesModal', new PropertiesModalComponent())
