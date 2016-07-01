namespace fibra {
  'use strict'

  class TreeViewConfiguration {
    constructor(public endpoint: string, public queryTemplate: string) {}
  }

  export class AuthorComponentController {

    public classTree: TreeNode[]
    public classTreePromise: angular.IPromise<TreeNode[]>
    
    public onChange: Function[] = []
    public registerCallback = (f: Function):void => {
      this.onChange.push(f)
    }

    public createItem(item: Result): void {
      let prefLabel: PropertyToValues = new PropertyToValues(SKOS.prefLabel)
      prefLabel.values.push(item.prefLabel)
      let type: PropertyToValues = new PropertyToValues(RDF.type)
      type.values.push(new NodePlusLabel(item.additionalInformation['type'][0], item.additionalInformation['typeLabel'][0]))
      this.sparqlItemService.createNewItem(item.ids, [prefLabel, type]).then(() => {
        this.onChange.forEach((f) => f())
      })
    }

    constructor(private configurationService: ConfigurationService, sparqlTreeService: SparqlTreeService, private sparqlItemService: SparqlItemService) {
      this.classTreePromise = sparqlTreeService.getTree(this.configurationService.configurations[0].endpoint, SparqlTreeService.getClassTreeQuery)
      this.classTreePromise.then(c => this.classTree = c)
    }
  }

  export class AuthorComponent implements angular.IComponentOptions {
      public controller: Function = AuthorComponentController
      public templateUrl: string = 'partials/author.html'
  }
}
