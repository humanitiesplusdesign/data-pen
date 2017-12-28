'use strict'
import { ActiveActionService, ADD_ITEM_TO_ITEM_STATE } from '../../actions/active';
import { NamedNode, RDF, SKOS, FIBRA, CNode, INode } from '../../models/rdf';
import { PropertyToValues, SparqlItemService, PropertyAndValue, Item } from '../../services/sparql-item-service';
import { IRootState } from '../../reducers';
import { IFibraNgRedux } from 'reducers';
import { IActiveState, IFullItemState } from '../../reducers/active';

import * as angular from 'angular';
import { Mark, IItemState } from 'services/project-service/project';
import { Property, IProperty } from 'services/project-service/data-model';
import { INamedNode } from 'models/rdfjs';
import { ProjectState } from 'reducers/project';
import { GeneralState } from 'reducers/general';

import { getPrefLangString } from 'filters/preferred-language-filter';

interface IPropertiesModalComponentControllerState {
  active: IActiveState,
  project: ProjectState,
  general: GeneralState
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

  private selectedProp: IProperty
  private selectedPropDescription: string
  private selectedValue: INode
  private selectedValueDescription: string

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
          active: state.active,
          project: state.project,
          general: state.general
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

  private getFilteredProperties(filter: string): IProperty[] {
    return this.state.project.project.dataModel.propertyMap.values()
      .filter(prop => prop.labels.values().map(l => l.value).join().toLowerCase().indexOf(filter.toLowerCase()) !== -1)
  }

  private onPropertySelect($item: IProperty, $model, $label, $event): void {
    this.selectedProp = $item
    this.selectedPropDescription = getPrefLangString($item.labels, this.state.general.language)
  }

  private getFilteredValues(filter: string): Item[] {
    return this.state.active.activeLayout.items.map(i => i.item).filter(i => i)
      .filter(i => i.labels.values().map(l => l.value).join().toLowerCase().indexOf(filter.toLowerCase()) !== -1)
  }

  private onValueSelect($item: Item, $model, $label, $event): void {
    this.selectedValue = $item
    this.selectedValueDescription = getPrefLangString($item.labels, this.state.general.language)
  }

  private applyPropValueSelection(): void {
    if(!this.selectedPropDescription || !this.selectedValueDescription) return
    let localProp: IProperty = this.selectedProp ? this.selectedProp : new Property(new NamedNode(this.selectedPropDescription))
    let localValue: INode = this.selectedValue ? this.selectedValue : new CNode(this.selectedValueDescription, 'Literal')
    this.setProperty(localProp, localValue)
  }

  private setProperty(prop: IProperty, value: INode): void {
    this.$q.all(
      this.resolve.items.map((item: IItemState) => {
        return this.sparqlItemService.alterItem(item.ids[0], [new PropertyAndValue(prop, value)])
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

  private setGroup(group: string): void {
    this.setProperty(new Property(FIBRA.groupProp), new CNode(group, 'Literal'))
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

angular.module('fibra.components.properties-modal', ['ui.bootstrap'])
  .component('propertiesModal', new PropertiesModalComponent())
