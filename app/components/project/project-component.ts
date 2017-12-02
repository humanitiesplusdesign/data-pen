'use strict'
import { ActiveActionService, ISetActiveDividerPercentage } from '../../actions/active';
import { FilterActionService, ISetFilterDividerPercentage } from '../../actions/filter';
import { ItemsService } from 'services/items-service'
import * as angular from 'angular';
import { ProjectService } from 'services/project-service/project-service'
import { ProjectActionService } from 'actions/project'
import { IFibraNgRedux } from 'reducers'
import { IModalService } from 'angular-ui-bootstrap'
import { IActiveState } from 'reducers/active';
import { ProjectState } from 'reducers/project';
import { IRootState } from 'reducers';

interface IProjectComponentControllerState {
  project: ProjectState
  active: IActiveState
}

export class ProjectComponentController {

  private state: IProjectComponentControllerState = <IProjectComponentControllerState>{}
  private unsubscribe: () => void
  private currentView: string = 'sources'

  /* @ngInject */
  constructor(private projectActionService: ProjectActionService,
              private activeActionService: ActiveActionService,
              private filterActionService: FilterActionService,
              private itemsService: ItemsService,
              private $stateParams: any,
              private $state: any,
              private $ngRedux: IFibraNgRedux,
              private $document: angular.IDocumentService,
              private $uibModal: IModalService) {
    this.unsubscribe = $ngRedux.connect(
      (state: IRootState) => {
        return {
          project: state.project,
          active: state.active,
          filter: state.filter
        }
      },
      null)(this.state)
    // Put the project from $stateParams onto the state
    if ($stateParams.id && $stateParams.sparqlEndpoint && $stateParams.graph)
      if (this.state.project.id !== $stateParams.id)
        this.projectActionService.setProject($stateParams.id, $stateParams.sparqlEndpoint, $stateParams.graph)

    if ($stateParams.view) {
      if (['sources', 'filter', 'active'].indexOf($stateParams.view) !== -1) {
        this.currentView = $stateParams.view
      }
    }

    itemsService.getAllItemsCount().then((count) => this.projectActionService.setAllItemCount(count))
    itemsService.getFilteredItemsCount().then((count) => this.projectActionService.setFilteredItemCount(count))
  }

  public $postLink(): void {
    let setView: any = this.setView.bind(this)
    let setFilterDividerPercentage: (percent: number) => ISetFilterDividerPercentage = this.filterActionService.setFilterDividerPercentage.bind(this)
    let setActiveDividerPercentage: (percent: number) => ISetActiveDividerPercentage = this.activeActionService.setActiveDividerPercentage.bind(this)
    let ctrl: ProjectComponentController = this
    this.$document.bind('keydown', function (e: JQueryEventObject): void {
      if (e.ctrlKey && e.keyCode === 84) {
        if (ctrl.$stateParams.view === 'filter') { setFilterDividerPercentage(100) }
        else  { setActiveDividerPercentage(100) }
      } else if (e.ctrlKey && e.keyCode === 71) {
        if (ctrl.$stateParams.view === 'filter') { setFilterDividerPercentage(0) }
        else { setActiveDividerPercentage(0) }
      } else if (e.ctrlKey && e.keyCode === 72) {
        if (ctrl.$stateParams.view === 'filter') { setFilterDividerPercentage(50) }
        else { setActiveDividerPercentage(50) }
      } else if (e.ctrlKey && e.keyCode === 49) {
        setView('sources')
      } else if (e.ctrlKey && e.keyCode === 50) {
        setView('filter')
      } else if (e.ctrlKey && e.keyCode === 51) {
        setView('active')
      }
    });
  }

  public $onDestroy(): void {
    console.log('DESTROYING')
    this.$document.detach('keydown')
  }

  private setView(newView: string): void {
    this.$state.go('project', { view: newView })
  }

  private dataUsedProportion(): number {
    return this.currentView === 'filter' ?
      this.state.project.filteredItemsCount / this.state.project.allItemsCount * 100 :
      this.currentView === 'active' ?
        this.state.project.activeItemsCount / this.state.project.filteredItemsCount * 100 :
        0
  }

  private openBibliographyModal(currentView: string): void {
    // let deleteProject: (string, number, Citable) => void = this.deleteProject.bind(this)
    console.log(currentView)
    let modalInstance: any = this.$uibModal.open({
      animation: true,
      component: 'bibliographyModal',
      resolve: {
        currentView: function(): string {
          return currentView
        }
      }
    });
    modalInstance.result.then(
      function(): void {
        // deleteProject(sourceId, i, project)
      },
      function(): void {
        // didn't delete
      });
  };

}

export class ProjectComponent implements angular.IComponentOptions {
  public template: any = require('./project.pug')()
  public controller: any = ProjectComponentController
}

angular.module('fibra.components.project', [])
  .component('project', new ProjectComponent())
