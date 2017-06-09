'use strict'
import {ITerm} from 'models/rdfjs'
import {Action} from 'models/action'
import {INode} from 'models/rdf'
import {Item, SparqlItemService} from 'services/sparql-item-service'
import {FibraService} from 'services/fibra-service'
import { INgRedux } from 'ng-redux'
import * as ItemActions from 'actions/items'

class SparqlItemComponentBindings {
  public itemId: INode
}

interface ISparqlItemComponentBindingChanges {
  itemId?: angular.IChangesObject<Item>
}

class SparqlItemComponentController extends SparqlItemComponentBindings {
  private item: Item
  private unsubscribe: () => void

  private displayItem: (item: ITerm, coordinates?: [number]) => Action
  public $onChanges: (changes: ISparqlItemComponentBindingChanges) => void = (changes: ISparqlItemComponentBindingChanges) => {
    if (this.itemId)
      this.sparqlItemService.getItem(this.itemId).then(
        (item: Item) => this.item = item
      )
  }
  public addItem = () => {
    // May need to handle creation here as well but for now, just display
    this.fibraService.dispatchAction(this.displayItem(this.item))
  }


  /* @ngInject */
  constructor(private sparqlItemService: SparqlItemService,
              private fibraService: FibraService,
              private $ngRedux: INgRedux) {
    super()
    this.unsubscribe = $ngRedux.connect(this.mapItemsToThis, ItemActions)(this)
  }
  public $onDestroy(): void {
    this.unsubscribe()
  }

  private mapItemsToThis(state): any {
    return {
      items: state.items
    }
  }

}

export class SparqlItemComponent implements angular.IComponentOptions {
    public bindings: {[id: string]: string} = {
      itemId: '<',
      onSelect: '&',
      showRemoteProperties: '@'
    }
    public controller: string = 'SparqlItemComponentController' // (new (...args: any[]) => angular.IController) = SparqlItemComponentController
    public templateUrl: string = 'components/sparql-item/sparql-item.html'
}
