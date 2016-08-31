namespace fibra {
  'use strict'

  class SparqlItemComponentBindings {
    public itemId: INode
  }

  interface ISparqlItemComponentBindingChanges {
    itemId?: angular.IChangesObject
  }

  class SparqlItemComponentController extends SparqlItemComponentBindings {
    private item: Item
    public $onChanges: (changes: ISparqlItemComponentBindingChanges) => void = (changes: ISparqlItemComponentBindingChanges) => {
      if (this.itemId)
        this.sparqlItemService.getItem(this.itemId).then(
          (item: Item) => this.item = item
        )
    }
    constructor(private sparqlItemService: SparqlItemService) {
      super()
    }
  }

  export class SparqlItemComponent implements angular.IComponentOptions {
      public bindings: {[id: string]: string} = {
        itemId: '<',
        onSelect: '&',
        showRemoteProperties: '@'
      }
      public controller: Function = SparqlItemComponentController
      public templateUrl: string = 'partials/sparql-item.html'
  }
}
