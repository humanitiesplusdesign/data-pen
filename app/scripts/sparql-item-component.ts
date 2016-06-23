namespace fibra {
  'use strict'

  interface IChangeObject<T> {
    currentValue: T
    previousValue: T
    isFirstChange: () => boolean
  }

  class SparqlItemComponentBindings {
    public endpoint: string
    public itemId: INode
  }

  interface ISparqlItemComponentBindingChanges {
    endpoint?: IChangeObject<string>
    itemId?: IChangeObject<INode>
  }

  class SparqlItemComponentController extends SparqlItemComponentBindings {
    private item: Item
    public $onChanges: (changes: ISparqlItemComponentBindingChanges) => void = (changes: ISparqlItemComponentBindingChanges) => {
      if (this.endpoint && this.itemId)
        this.sparqlItemService.getItem(this.endpoint, this.itemId).then(
          (item: Item) => this.item = item
        )
    }
    constructor(private sparqlItemService: SparqlItemService) {
      super()
    }
  }

  export class SparqlItemComponent implements angular.IComponentOptions {
      public bindings: {[id: string]: string} = {
        endpoint: '<',
        itemId: '<',
        onSelect: '&'
      }
      public controller: Function = SparqlItemComponentController
      public templateUrl: string = 'partials/sparql-item.html'
  }
}
