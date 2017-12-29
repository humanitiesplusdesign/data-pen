'use strict'
import { ActiveActionService, ADD_ITEM_TO_ITEM_STATE } from '../../actions/active';
import { NamedNode, RDF, SKOS, FIBRA, CNode, INode } from '../../models/rdf';
import { PropertyToValues, SparqlItemService, PropertyAndValue, Item } from '../../services/sparql-item-service';
import { IRootState } from '../../reducers';
import { IFibraNgRedux } from 'reducers';
import { IActiveState, IFullItemState } from '../../reducers/active';

import * as angular from 'angular';
import { Mark, IItemState } from 'services/project-service/project';
import { Property, IProperty, IClass } from 'services/project-service/data-model';
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
  private selectedType: IClass
  private selectedTypeDescription: string
  private groupDescription: string

  /* @ngInject */
  constructor(
    private $ngRedux: IFibraNgRedux,
    private activeActionService: ActiveActionService,
    private sparqlItemService: SparqlItemService,
    private $q: angular.IQService,
    private $timeout: angular.ITimeoutService,
    private $scope: angular.IScope
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
    this.setProperty(localProp, [localValue])
    this.selectedPropDescription = null
    this.selectedValueDescription = null
  }

  private getTypes(): IClass[] {
    return this.resolve.items.reduce((a: IClass[], b: IFullItemState) => {
      b.item.localProperties.concat(b.item.remoteInverseProperties)
        .filter(pv => pv.property.value === RDF.type.value)
        .forEach(pv => pv.values.forEach(v => {
          if(!a.find(c => c.value === v.value.value)) {
            a.push(this.state.project.project.dataModel.classMap.get(v.value.value))
          }
        }))
      return a
    }, [])
  }

  private setProperty(prop: IProperty, values?: INode[], removeValues?: INode[]): void {
    this.$q.all(
      this.resolve.items.map((item: IItemState) => {
        return this.sparqlItemService.alterItem(
          item.ids[0],
          values ? values.map(v => new PropertyAndValue(prop, v)) : [],
          removeValues ? removeValues.map(rv => new PropertyAndValue(prop, rv)) : [])
      })
    ).then(() => {
      return this.sparqlItemService.getItems(this.resolve.items.map((item: IItemState) => item.ids), true)
        .then((items) => {
          return items.forEach((item: Item) => {
            console.log(this.resolve.items.find((i) => !!i.ids.find((v) => v.value === item.value)), this.state.active.activeLayout.items.find((i) => !!i.ids.find((v) => v.value === item.value)), item.value, this.resolve.items.map(i => i.ids))
            this.$ngRedux.dispatch({
              type: ADD_ITEM_TO_ITEM_STATE,
              payload: {
                itemState: this.state.active.activeLayout.items.find((i) => !!i.ids.find((v) => v.value === item.value)),
                fullItem: item
              }
            })
          })
        })
    }).then(() => {
      // The item on the active layout state actually changes, so we have to swap out the item in this.resolve.items
      this.resolve.items = this.resolve.items.map(item => this.state.active.activeLayout.items.find((i) => i.ids[0] === item.ids[0]))
    })
  }

  private setGroup(group: string): void {
    this.setProperty(
      new Property(FIBRA.groupProp),
      [new CNode(group, 'Literal')],
      this.resolve.items.reduce((a: INode[], b: IFullItemState) => {
        // Find all groups assigned to the current selection and remove them.
        b.item.localProperties.concat(b.item.remoteProperties)
          .filter(pv => pv.property.value === FIBRA.groupProp.value)
          .forEach(pv => pv.values.forEach(v => {
            if(!a.find(n => n.value === v.value.value) && v.value.value !== group) {
              a.push(v.value)
            }
          }))
        return a
      }, [])
    )
    this.groupDescription = null
  }

  private setType(): void {
    if (this.selectedType) {
      this.setProperty(new Property(RDF.type), [this.selectedType])
      this.selectedTypeDescription = null
    }
  }

  private onTypeSelect($item: IClass, $model, $label, $event): void {
    this.selectedType = $item
    this.selectedTypeDescription = getPrefLangString($item.labels, this.state.general.language)
  }

  private getFilteredTypes(filter: string): IClass[] {
    return this.state.project.project.dataModel.classMap.values()
      .filter(clss => clss.labels.values().map(l => l.value).join().toLowerCase().indexOf(filter.toLowerCase()) !== -1)
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
