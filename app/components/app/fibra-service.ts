namespace fibra {
  'use strict'
  type CallbackFunction = () => angular.IPromise<string>
  type RemovalFunction = () => void
  type State = {
    construct: {
      types: any[],
      items: any[],
      itemIndex: {}
    }
  }
  type Store = [State]
  type Action = {
    type: string,
    payload: any
  }

  const CREATE_ITEMS = "CREATE_ITEMS"
  const ADD_TYPE = "ADD_TYPE"
  const CLEAR_TYPES = "CLEAR_TYPES"
  const DISPLAY_ITEM = "DISPLAY_ITEM"
  const HIDE_ITEM = "HIDE_ITEM"
  const INITIAL_STATE = {
    construct: {
      types: [],
      items: [],
      itemIndex: {}
    }
  }
  const DEFAULT_ACTION: Action = { type: '', payload: null }

  export class FibraService {
    
    // Event model - Based on d3.event
    private q: angular.IQService
    private callbacks: {} = {}

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
      let proms: Array<angular.IPromise<string>> = this.callbacks[evnt].map((cb) => cb())
      return this.q.all(proms)
    }

    // Action Queue - redux-style...
    // This is a very initial draft and will change.

    // State and store
    private state: State
    private createState() {
      this.state = {
        construct: {
          types: [],
          items: [],
          itemIndex: {}
        }
      }
      if(!this.store) {
        this.createStore()
      }
    }

    private store: Store
    private createStore() {
      this.store = [this.state]
    }

    // Action creators
    public displayItem(item: ITerm): Action {
      return {
        type: DISPLAY_ITEM,
        payload: item
      }
    }

    public hideItem(item: ITerm): Action {
      return {
        type: HIDE_ITEM,
        payload: item
      }
    }

    public createItem(item: INode):Action {
      return {
        type: CREATE_ITEMS,
        payload: [item]
      }
    }

    public createItems(items: INode[]): Action {
      return {
        type: CREATE_ITEMS,
        payload: items
      }
    }

    public addType(type: TreeNode):Action {
      return {
        type: ADD_TYPE,
        payload: type
      }
    }

    public clearTypes(): Action {
      return {
        type: CLEAR_TYPES,
        payload: undefined
      }
    }

    // Reducers
    private itemReducer(state: State = INITIAL_STATE, action: Action = DEFAULT_ACTION): angular.IPromise<State> {
      switch(action.type) {

      case DISPLAY_ITEM:
        if(!state.construct.itemIndex[action.payload.value]) {
          state.construct.items.push(action.payload)
          state.construct.itemIndex[action.payload.value] = action.payload
        }
        this.dispatch('change')
        return this.q.resolve(state)

      case HIDE_ITEM:
        let it = state.construct.itemIndex[action.payload.value]
        if(it) {
          state.construct.items.splice(state.construct.items.indexOf(it), 1)
          delete state.construct.itemIndex[action.payload.value]
        }
        this.dispatch('change')
        return this.q.resolve(state)

      case CREATE_ITEMS:
        let items: Item[] = action.payload
    
        let proms = items.map((node) => {
          // let prefLabel: PropertyToValues<INode> = new PropertyToValues(SKOS.prefLabel)
          // prefLabel.values.push(item.remoteProperties.filter((p) => {

          // }))
          return this.sparqlItemService.getItem(node).then((item) => {
            let prefLabelProp = item.localProperties.filter((pr) => {
              return pr.value === 'http://www.w3.org/2004/02/skos/core#prefLabel'
            })
            let type: PropertyToValues<INode> = new PropertyToValues(RDF.type)
            let typeProp = item.remoteProperties.filter((pr) => {
              return pr.value === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type'
            })
            if(typeProp[0]) {
              let typeWithLabel: INodePlusLabel = new SourcedNodePlusLabel(typeProp[0])
              type.values.push(typeWithLabel)
            }
            return this.sparqlItemService.createNewItem(items, [type, prefLabelProp[0]])
          })
        })
        let prom = this.q.all(proms).then(() => {
          this.dispatch('change')
        }).then(() => {
          return state
        })
        return prom

      default:
        return this.q.resolve(state)
      }
    }

    private constructReducer(state: State = INITIAL_STATE, action: Action = DEFAULT_ACTION): angular.IPromise<State> {
      switch(action.type) {

      case ADD_TYPE:
        state.construct.types.push(action.payload)
        return this.q.resolve(state)

      case CLEAR_TYPES:
        state.construct.types = []
        return this.q.resolve(state)

      default:
        return this.q.resolve(state)
      }
    }

    // Public API
    public dispatchAction(action: Action): angular.IPromise<State> {
      console.log(action.type)
      return this.constructReducer(this.state, action)
        .then((state) => this.itemReducer(state, action))
    }

    public getState(): State {
      return this.state
    }

    public undo() {

    }



    constructor($q: angular.IQService,
                private sparqlItemService: SparqlItemService,
                private sparqlTreeService: SparqlTreeService) {
      this.q = $q
      this.createState()
    }
  }
}
