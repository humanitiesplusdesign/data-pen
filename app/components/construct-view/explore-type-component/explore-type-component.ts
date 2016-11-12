namespace fibra {
  'use strict'

  export class ExploreTypeComponentController {
    public types
    public chosenTypes
    private fibraService: FibraService

    public constructor(fibraService: FibraService) {
      this.fibraService = fibraService
    }
    public primaryClick(type: TreeNode) {
      this.chosenTypes.primary = type
      this.fibraService.dispatch('change')
    }
    public secondaryClick(type: TreeNode) {
      this.chosenTypes.secondary = type
      this.fibraService.dispatch('change')
    }
    public tertiaryClick(type: TreeNode) {
      this.chosenTypes.tertiary = type
      this.fibraService.dispatch('change')
    }
  }

  export class ExploreTypeComponent implements angular.IComponentOptions {
      public bindings: {[id: string]: string} = {
        types: '=',
        chosenTypes: '='
      }
      public templateUrl: string = 'components/construct-view/explore-type-component/explore-type-component.html'
      public controller = ExploreTypeComponentController
  }
}