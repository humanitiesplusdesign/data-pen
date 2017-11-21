'use strict'
import { IActiveActions } from '../../actions/active';
import { ItemsService } from 'services/items-service'
import * as angular from 'angular';
import { ProjectService } from 'services/project-service/project-service'
import { ProjectActionService } from 'actions/project'
import { INgRedux } from 'ng-redux'
import { IModalService } from 'angular-ui-bootstrap'
import * as FilterActions from '../../actions/filter';
import ActiveActions from 'actions/active';

export class ProjectComponentController {

  private actions: any = {}
  private currentView: string = 'sources'

  /* @ngInject */
  constructor(private projectActionService: ProjectActionService,
              private itemsService: ItemsService,
              private $stateParams: any,
              private $state: any,
              private $ngRedux: INgRedux,
              private $document: angular.IDocumentService,
              private $uibModal: IModalService) {
    let unsub1: () => void = $ngRedux.connect(this.mapProjectToActions, null)(this.actions)
    let unsub2: () => void = $ngRedux.connect(this.mapFilterToActions, FilterActions)(this.actions)
    let unsub3: () => void = $ngRedux.connect(this.mapActiveToActions, ActiveActions)(this.actions)
    this.actions.unsubscribe = () => {
      unsub1()
      unsub2()
      unsub3()
    }

    // Put the project from $stateParams onto the state
    if ($stateParams.id && $stateParams.sparqlEndpoint && $stateParams.graph)
      if (this.actions.project.id !== $stateParams.id)
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
    let setFilterDividerPercentage: any = this.actions.setFilterDividerPercentage.bind(this)
    let setActiveDividerPercentage: IActiveActions['setActiveDividerPercentage'] = this.actions.setActiveDividerPercentage.bind(this)
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
      this.actions.project.filteredItemsCount / this.actions.project.allItemsCount * 100 :
      this.currentView === 'active' ?
        this.actions.project.activeItemsCount / this.actions.project.filteredItemsCount * 100 :
        0
  }

  private mapProjectToActions(state: any): any {
    return {
      project: state.frontend.project
    }
  }

  private mapFilterToActions(state: any): any {
    return {
      filter: state.frontend.filter
    }
  }

  private mapActiveToActions(state: any): any {
    return {
      active: state.frontend.active
    }
  }

  private openBibliographyModal(currentView: string): void {
    //let deleteProject: (string, number, Citable) => void = this.deleteProject.bind(this)
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
