'use strict'

import * as angular from 'angular'

import {Project} from './project-service/project'
import {TreeNode} from '../components/tree/tree-component'
import {IGridNode} from '../components/construct-view/explore-component'
import {WorkerService} from './worker-service/worker-service'
import {SparqlItemService} from '../services/sparql-item-service'
import {SparqlTreeService} from './sparql-tree-service'

type CallbackFunction = () => angular.IPromise<string>
type RemovalFunction = () => void
export class CommonState {
  constructor(public project: Project = null, public language: string = 'en') {}
}

export class ConstructState {
  public types: TreeNode[] = []
  public userTypes: TreeNode[] = []
  public displayTypes: TreeNode[] = []
  public items: any[] = []
  public itemIndex: {} = {}
  public localItems: IGridNode[] = []
}

export class UIState extends CommonState {
  public construct: ConstructState = new ConstructState()
  public actionsRunning: number = 0
  public toCommonState(): CommonState {
    return new CommonState(this.project, this.language)
  }
}
type Store = [UIState]
type Action = {
  type: string,
  payload: any
}

const PLACEHOLDER: string = 'PLACEHOLDER'
const SET_LANGUAGE: string = 'SET_LANGUAGE'
const SET_PROJECT: string = 'SET_PROJECT'
const INITIAL_STATE: UIState = new UIState()
const DEFAULT_ACTION: Action = { type: '', payload: null }

export class FibraService {

  // Event model - Based on d3.event
  private callbacks: {[evnt: string]: CallbackFunction[] } = {}

  // Returns a function that can be called to remove the callback
  public on(evnt: string, callback: CallbackFunction): RemovalFunction {
    if (this.callbacks[evnt] === undefined)
      this.callbacks[evnt] = Array<CallbackFunction> ()
    this.callbacks[evnt].push(callback)
    return () => {
      if (this.callbacks[evnt].indexOf(callback) !== -1)
        this.callbacks[evnt].splice(this.callbacks[evnt].indexOf(callback), 1)
    }
  }

  public dispatch(evnt: string): angular.IPromise<Array<string>> {
    if (this.callbacks[evnt] === undefined)
      this.callbacks[evnt] = Array<CallbackFunction> ()
    let proms: Array<angular.IPromise<string>> = this.callbacks[evnt].map((cb) => cb())
    return this.$q.all(proms)
  }

  // Action Queue - redux-style...
  // This is a very initial draft and will change.

  // State and store
  private state: UIState
  private createState() {
    this.state = INITIAL_STATE
    if(!this.store) {
      this.createStore()
    }
  }

  private store: Store
  private createStore() {
    this.store = [this.state]
  }

  // Action creators
  public placeHolderAction(prom: angular.IPromise<string>): Action {
    return {
      type: PLACEHOLDER,
      payload: prom
    }
  }

  public setLanguage(language: string): Action { return { type: SET_LANGUAGE, payload: language} }

  public setProject(project: Project): Action { return { type: SET_PROJECT, payload: project} }

  // Reducers

  private sessionReducer(state: UIState = INITIAL_STATE, action: Action = DEFAULT_ACTION): angular.IPromise<UIState> {
    switch (action.type) {
      case SET_LANGUAGE:
        state.language = action.payload
        return this.$q.resolve(state)
      case SET_PROJECT:
        state.project = action.payload
        return this.$q.resolve(state)
      default:
        return this.$q.resolve(state)
    }
  }

  private constructReducer(state: UIState = INITIAL_STATE, action: Action = DEFAULT_ACTION): angular.IPromise<UIState> {
    switch(action.type) {

    case PLACEHOLDER:
      return action.payload.then(() => {
        return state
      })

    default:
      return this.$q.resolve(state)
    }
  }

  // Public API
  public dispatchAction(action: Action): angular.IPromise<UIState> {
    this.state.actionsRunning = this.state.actionsRunning + 1
    console.log(action.type, this.state.actionsRunning)
    this.dispatch('action')
    let oldCommonState: CommonState = this.state.toCommonState()
    return this.constructReducer(this.state, action)
      .then((state) => this.sessionReducer(state, action))
      .then((state) => {
        if (state.language !== oldCommonState.language || state.project !== oldCommonState.project) {
          let wstate: CommonState = state.toCommonState()
          WorkerService.savePrototypes(wstate)
          this.workerService.callAll('stateWorkerService', 'setState', [wstate])
        }
        this.state = state
        this.state.actionsRunning = this.state.actionsRunning - 1
        return state
      })
  }

  public getState(): UIState {
    return this.state
  }

  public undo() {

  }

  /* @ngInject */
  constructor(private $q: angular.IQService,
              private workerService: WorkerService,
              private sparqlItemService: SparqlItemService,
              private sparqlTreeService: SparqlTreeService) {
    this.createState()
  }
}

angular.module('fibra.services.fibra-service', [])
  .config(($provide) => {
    $provide.service('fibraService', FibraService)
  })
