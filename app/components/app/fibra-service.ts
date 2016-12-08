namespace fibra {
  'use strict'
  type CallbackFunction = () => angular.IPromise<string>
  type RemovalFunction = () => void
  export type State = {
    construct: {
      types: any[],
      items: any[],
      itemIndex: {},
      localItems: IGridNode[]
    },
    actionsRunning: number
  }
  type Store = [State]
  type Action = {
    type: string,
    payload: any
  }

  const PLACEHOLDER: string = 'PLACEHOLDER'
  const CREATE_ITEMS: string = 'CREATE_ITEMS'
  const ADD_TYPE: string = 'ADD_TYPE'
  const CLEAR_TYPES: string = 'CLEAR_TYPES'
  const DISPLAY_ITEMS: string = 'DISPLAY_ITEMS'
  const HIDE_ITEM: string = 'HIDE_ITEM'
  const CREATE_LOCAL_ITEM: string = 'CREATE_LOCAL_ITEM'
  const INITIAL_STATE: State = {
    construct: {
      types: [],
      items: [],
      itemIndex: {},
      localItems: []
    },
    actionsRunning: 0
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

    public createLocalItem(item: ITerm): Action {
      return {
        type: CREATE_LOCAL_ITEM,
        payload: item
      }
    }

    public displayItem(item: ITerm): Action {
      return {
        type: DISPLAY_ITEMS,
        payload: [item]
      }
    }

    public displayItems(items: ITerm[]): Action {
      return {
        type: DISPLAY_ITEMS,
        payload: items
      }
    }

    public hideItem(item: ITerm): Action {
      return {
        type: HIDE_ITEM,
        payload: item
      }
    }

    public createItem(item?: INode):Action {
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

      case DISPLAY_ITEMS:
        action.payload.forEach((item) => {
          if(!state.construct.itemIndex[item.value]) {
            state.construct.items.push(item)
            state.construct.itemIndex[item.value] = item
          }
        })
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

      case CREATE_LOCAL_ITEM:
        let item: IGridNode = action.payload
        state.construct.localItems.push(item)
        return this.q.resolve(state)

      case CREATE_ITEMS:
        let items: Item[] = action.payload

        if(items[0]) {
          let proms = items.map((node) => {
            // let prefLabel: PropertyToValues<INode> = new PropertyToValues(SKOS.prefLabel)
            // prefLabel.values.push(item.remoteProperties.filter((p) => {

            // }))
            return this.sparqlItemService.createNewItem([node])

            // return this.sparqlItemService.getItem(node).then((item) => {
            //   let prefLabelProp = item.localProperties.concat(item.remoteProperties).filter((pr) => {
            //     return pr.value === 'http://www.w3.org/2004/02/skos/core#prefLabel'
            //   })
            //   let type: PropertyToValues<INode> = new PropertyToValues(RDF.type)
            //   let typeProp = item.localProperties.concat(item.remoteProperties).filter((pr) => {
            //     return pr.value === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type'
            //   })
            //   if(typeProp[0]) {
            //     let typeWithLabel: INodePlusLabel = new SourcedNodePlusLabel(typeProp[0])
            //     type.values.push(typeWithLabel)
            //   }
            //   return this.sparqlItemService.createNewItem([item], [type, prefLabelProp[0]])
            // }).then((node) => {
            //   // Display the item
            //   return this.dispatchAction(this.displayItem(node))
            // })
          })
          return this.q.all(proms).then((node) => {
            console.log(node)
            this.dispatch('change')
          }).then(() => {
            return state
          })
        } else {
          return this.sparqlItemService.createNewItem().then((node) => {
            console.log(node)
            return this.state
          })
        }

      default:
        return this.q.resolve(state)
      }
    }

    private constructReducer(state: State = INITIAL_STATE, action: Action = DEFAULT_ACTION): angular.IPromise<State> {
      switch(action.type) {

      case PLACEHOLDER:
        return action.payload.then(() => {
          return state
        })

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
      this.state.actionsRunning = this.state.actionsRunning+1
      console.log(action.type, this.state.actionsRunning)
      this.dispatch('action')
      return this.constructReducer(this.state, action)
        .then((state) => this.itemReducer(state, action))
        .then((state) => {
          this.state.actionsRunning = this.state.actionsRunning-1
          return state
        })
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
