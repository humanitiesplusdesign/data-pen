namespace fibra {
  'use strict'

  class SparqlItemComponentBindings {
    public itemId: INode
  }

  interface ISparqlItemComponentBindingChanges {
    itemId?: angular.IChangesObject<Item>
  }

  class SparqlItemComponentController extends SparqlItemComponentBindings {
    private item: Item
    public $onChanges: (changes: ISparqlItemComponentBindingChanges) => void = (changes: ISparqlItemComponentBindingChanges) => {
      if (this.itemId)
        this.sparqlItemService.getItem(this.itemId).then(
          (item: Item) => this.item = item
        )
    }
    public addItem = () => {
      console.log("Adding", this.item)
      this.fibraService.dispatchAction(this.fibraService.createItem(this.item))
    }

    constructor(private sparqlItemService: SparqlItemService,
                private fibraService: FibraService) {
      super()
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
}
