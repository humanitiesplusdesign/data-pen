namespace fibra {
  'use strict'

  export class CitableEditorComponentController implements angular.IComponentController {
    public citable: ICitable
    public noRightsHolders: string
    public noId: string
    public noRightsHolderIds: string
    public addRightsHolder(): void {
      let c: ICitable = new Citable('http://ldf.fi/fibra/citable_' + UUID())
      c.labels = [ DataFactory.literal('', this.fibraService.getState().language)]
      c.descriptions = [ DataFactory.literal('', this.fibraService.getState().language) ]
      this.citable.rightsHolders.push(c)
    }
    public addLabel(): void {
      this.citable.labels.push(DataFactory.literal('', ''))
    }
    public addDescription(): void {
      this.citable.descriptions.push(DataFactory.literal('', ''))
    }
    public removeLabel(index: number): void {
      this.citable.labels.splice(index, 1)
    }
    public removeDescription(index: number): void {
      this.citable.descriptions.splice(index, 1)
    }
    constructor(private fibraService: FibraService) {}
  }

  export class CitableEditorComponent implements angular.IComponentOptions {
    public bindings: {[id: string]: string} = {
      citable: '=',
      noRightsHolders: '@',
      noId: '@',
      noRightsHolderIds: '@'
    }
    public controller: string = 'CitableEditorComponentController' // (new (...args: any[]) => angular.IController) = ConfigureViewComponentController
    public templateUrl: string = 'components/citable-editor/citable-editor.html'
  }
}
