'use strict'
import { ActiveActionService, ADD_ITEM_TO_ITEM_STATE } from '../../actions/active';
import { NamedNode, RDF, SKOS, FIBRA, CNode } from '../../models/rdf';
import { PropertyToValues, SparqlItemService, PropertyAndValue, Item } from '../../services/sparql-item-service';
import { IRootState } from '../../reducers';
import { IFibraNgRedux } from 'reducers';
import { IActiveState, IFullItemState } from '../../reducers/active';

import * as angular from 'angular';
import { Mark, IItemState } from 'services/project-service/project';
import { Property } from 'services/project-service/data-model';

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
    private activeActionService: ActiveActionService,
    private sparqlItemService: SparqlItemService,
    private $q: angular.IQService
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

  private setGroup(group: string) {
    this.$q.all(
      this.resolve.items.map((item: IItemState) => {
        return this.sparqlItemService.alterItem(item.ids[0], [new PropertyAndValue(new Property(FIBRA.groupProp), new CNode(group, 'Literal'))])
      })
    ).then(() => {
      return this.sparqlItemService.getItems(this.resolve.items.map((item: IItemState) => item.ids), true)
        .then((items) => {
          return items.forEach((item: Item) => {
            this.$ngRedux.dispatch({
              type: ADD_ITEM_TO_ITEM_STATE,
              payload: {
                itemState: this.resolve.items.find((i) => i.ids[0].value === item.value),
                fullItem: item
              }
            })
          })
        })
    })
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
