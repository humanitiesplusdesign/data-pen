namespace fibra {
  'use strict'
  type CallbackFunction = () => angular.IPromise<string>
  type RemovalFunction = () => void
  type State = any
  type Store = [State]
  type Action = {
    type: string,
    payload: any
  }

  const CREATE_ITEMS = "CREATE_ITEMS"
  const ADD_TYPE = "ADD_TYPE"
  const CLEAR_TYPES = "CLEAR_TYPES"
  const INITIAL_STATE = {}
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
          types: []
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

      case CREATE_ITEMS:
        let items: Item[] = action.payload
    
        let proms = items.map((item) => {
          // let prefLabel: PropertyToValues<INode> = new PropertyToValues(SKOS.prefLabel)
          // prefLabel.values.push(item.remoteProperties.filter((p) => {

          // }))
          let type: PropertyToValues<INode> = new PropertyToValues(RDF.type)
          let typeProp = item.localProperties.filter((pr) => {
            return pr.value === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type'
          })
          // let typeLabelProp = item.localProperties.filter((pr) => {
          //   return pr.value === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#typeLabel'
          // })
          if(typeProp[0]) {
            let typeWithLabel: INodePlusLabel = new SourcedNodePlusLabel(typeProp[0])
            type.values.push(typeWithLabel)
          }
          return this.sparqlItemService.createNewItem(items, [type])
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
