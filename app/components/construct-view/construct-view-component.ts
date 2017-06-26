'use strict'

import {TreeNode} from '../tree/tree-component'
import {UIState, FibraService} from '../../services/fibra-service'
import {ProjectSourceInfo} from '../project-sources-view/project-sources-view-component'
import {Result} from '../../services/sparql-autocomplete-service'
import {SparqlTreeService} from '../../services/sparql-tree-service'
import {ProjectService} from '../../services/project-service/project-service'
import {Project} from '../../services/project-service/project'
import * as angular from 'angular'
import { INgRedux } from 'ng-redux'
import * as TypeActions from '../../actions/types'
import * as ItemActions from '../../actions/items'

// class TreeViewConfiguration {
//   constructor(public endpoint: string, public queryTemplate: string) {}
// }

export class ConstructViewComponentController {
  public classTree: TreeNode[]
  public classTreePromise: angular.IPromise<TreeNode[]>
  public types: any
  public state: UIState
  public currentProjectSource: ProjectSourceInfo
  public paletteDisplay: boolean = true
  private limitFilter: string = ''

  // Actions
  private unsubscribe: any
  private displayItem: any
  private addType: any
  private setOrderedTypes: any
  private clearTypes: any

  public createItem(item: Result) {
    // Is there a type on this item? If so, and it is not already in chosenTypes,
    // add it.
    let itemTypeKey: string = item.additionalInformation['type'][0] ? item.additionalInformation['type'][0].value : ""
    let itemType: TreeNode = this.types.types.filter((t) => { return t.id === itemTypeKey })[0]
    let chosenTypes: TreeNode[] = this.fibraService.getState().construct.displayTypes
    if (!chosenTypes[0] && itemType) {
      this.setOrderedTypes([itemType])
    } else if (!chosenTypes[1] && itemType && (chosenTypes[0] !== itemType)) {
      let newTypes: TreeNode[] = chosenTypes.concat([])
      newTypes.push(itemType)
      this.setOrderedTypes(newTypes)
    }

    return this.fibraService.dispatchAction(this.displayItem(item.ids[0]))
  }

  public downloadRDF() {
    let currentConfig = this.fibraService.getState().project.graph
    let downloadlink = "http://ldf.fi/fibra/sparql?graph=" + currentConfig // + "&force-accept=application/rdf+xml"
    let request = new XMLHttpRequest()
    request.open("GET", downloadlink, true)
    request.onload = function (e) {
        if (request.readyState === 4) {
          if (request.status === 200) {
            let data = request.responseText
            let download = document.createElement("a")
            download.href = "data:application/rdf+xml;charset=utf-8," + data
            download.download = "fibra.ttl"
            document.body.appendChild(download)
            download.click()
            document.body.removeChild(download)
          } else {
            console.error(request.statusText);
          }
        }
      }
      request.send(null);
  }

  public $onDestroy(): void {
    this.unsubscribe()
  }

  /* @ngInject */
  constructor(private sparqlTreeService: SparqlTreeService,
              private projectService: ProjectService,
              private fibraService: FibraService,
              private $ngRedux: INgRedux,
              private $q: angular.IQService) {
    let unsub1 = $ngRedux.connect(this.mapTypesToThis, TypeActions)(this)
    let unsub2 = $ngRedux.connect(this.mapItemsToThis, ItemActions)(this)
    this.unsubscribe = () => {
      unsub1()
      unsub2()
    }

    let currentProject: Project = projectService.getCurrentProject()
    this.currentProjectSource = projectService.getProjectSources().find(ps => ps.sparqlEndpoint === currentProject.source.sparqlEndpoint && ps.graph === currentProject.source.graph)
    fibraService.on('change', () => {
      let chosenTypes = fibraService.getState().construct.displayTypes
      this.limitFilter = ''
      chosenTypes.forEach((t) => { if (t) this.limitFilter += '<' + t.id + '>' + ',' })
      if (this.limitFilter.length !== 0) this.limitFilter = 'FILTER (?groupId IN (' + this.limitFilter.substring(0, this.limitFilter.length - 1) + '))'
      return this.$q.resolve('ok')
    })
    this.classTreePromise = sparqlTreeService.getTree(this.fibraService.getState().project.endpoint, this.fibraService.getState().project.treeQuery)
    this.classTreePromise.then(c => {
      this.classTree = c;
      this.clearTypes()
      this.traverseClassTree(c, n => this.types.types.indexOf(n) === -1 && n.children.length === 0 , n => this.addType(n))
    })
    this.fibraService.on('change', () => {
      this.classTreePromise = sparqlTreeService.getTree(this.fibraService.getState().project.endpoint, SparqlTreeService.getClassTreeQuery)
      return this.classTreePromise.then(c => {
        this.classTree = c
        return 'ok'
      })
    })
    this.fibraService.on('action', () => {
      this.state = fibraService.getState()
      return this.$q.resolve('ok')
    })
    this.state = fibraService.getState()
  }

  private mapTypesToThis(state) {
    return {
      types: state.types
    }
  }

  private mapItemsToThis(state) {
    return {
      items: state.items
    }
  }

  private traverseClassTree(nodes: TreeNode[], test: Function, onSuccess: Function): void {
    let traverse = (node: TreeNode) => {
      if(test(node)) {
        onSuccess(node)
        node.children.forEach(traverse)
      }
    }
    nodes.forEach(traverse)
  }
}

export class ConstructViewComponent implements angular.IComponentOptions {
  public controller = ConstructViewComponentController // (new (...args: any[]) => angular.IController) = ConstructViewComponentController
  public template: string = require('./construct-view.pug')()
}

angular.module('fibra.components.construct-view', ['fibra.services'])
  .component('constructView', new ConstructViewComponent())
