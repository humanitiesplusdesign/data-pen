namespace fibra {
  'use strict'

    export class Configuration {
      public preferredLanguage: string = 'en'
      public primaryEndpoint: PrimaryEndpointConfiguration
      public authorityEndpoints: EndpointConfiguration[] = []
      public archiveEndpoints: EndpointConfiguration[] = []
      public globalDataModelConfiguration: DataModelConfiguration = new DataModelConfiguration()
      public instanceNS: string
      public graph: INode
      public schemaNS: string
      public deleteItemQuery: string = SparqlItemService.deleteItemQuery
      public prefixes: string = ''
      constructor(public id: string, public name: string) {}
      public allEndpoints(): EndpointConfiguration[] {
        let allEndpoints: EndpointConfiguration[] = this.archiveEndpoints.concat(this.authorityEndpoints)
        allEndpoints.push(this.primaryEndpoint)
        return allEndpoints
      }
      public remoteEndpoints(): EndpointConfiguration[] {
        return this.archiveEndpoints.concat(this.authorityEndpoints)
      }
    }

    export class EndpointConfiguration {
      public class: string = ''
      public autocompletionTextMatchQueryTemplate: string = SparqlAutocompleteService.defaultMatchQueryTemplate
      public treeQueryTemplate: string = SparqlTreeService.getClassTreeQuery
      public localItemQueryTemplate: string = SparqlItemService.getLocalItemPropertiesQuery
      public remoteItemQueryTemplate: string = SparqlItemService.getRemoteItemPropertiesQuery
      public dataModelConfiguration: DataModelConfiguration = new DataModelConfiguration()
      constructor(public id: string, public title: string, public endpoint: INode, selectedTypes: INode[] = []) {
        this.dataModelConfiguration.setSelectedTypes(selectedTypes)
      }
    }

    export class PrimaryEndpointConfiguration extends EndpointConfiguration {
      constructor(id: string, title: string, endpoint: INode, public updateEndpoint: INode = endpoint) {
        super(id, title, endpoint)
      }
    }

    export class DataModelConfiguration {
      public typeConstraints: string = ''
      public typeTree: TreeNode[] = []
      public selectedTypes: INode[] = []
      public properties: INode[] = []
      public selectedProperties: INode[] = []
      public propertyPropertyMap: {[id: string]: ISourcedNode[] } = {}
      public typeTypeMap: {[id: string]: ISourcedNode[] } = {}
      public setSelectedTypes(selectedTypes: INode[]): void {
        this.selectedTypes = selectedTypes
        this.updateFilter()
      }
      private updateFilter(): void {
        if (this.selectedTypes.length === 0)
          this.typeConstraints = ''
        else
          this.typeConstraints = 'FILTER (?groupId IN (' + this.selectedTypes.map(id => id.toCanonical()).join(', ') + '))'
      }
    }

  export class ConfigurationService {
    public configuration: Configuration
    public setConfiguration(configuration: Configuration): void {
      WorkerService.savePrototypes(configuration)
      this.$localStorage['configuration'] = configuration
      this.configuration = configuration
      this.workerService.callAll('configurationWorkerService', 'setConfiguration', [configuration])
    }
    constructor(private workerService: WorkerService, private $localStorage: any) {
      this.configuration = $localStorage['configuration']
      if (this.configuration) {
        workerService.restorePrototypes(this.configuration)
        this.workerService.callAll('configurationWorkerService', 'setConfiguration', [this.configuration])
      }
    }
  }

  export class ConfigurationWorkerService {
    public configuration: Configuration
    public setConfiguration(configuration: Configuration): void {
      this.configuration = configuration
    }
  }

}
