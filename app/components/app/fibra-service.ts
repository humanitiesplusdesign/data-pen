namespace fibra {
  'use strict'
  type CallbackFunction = () => angular.IPromise<string>
  type RemovalFunction = () => void
  export type State = {
    construct: {
      types: TreeNode[],
      userTypes: TreeNode[],
      displayTypes: TreeNode[],
      items: any[],
      itemIndex: {},
      localItems: IGridNode[],
      verifyItem: Item
    },
    actionsRunning: number
  }
  type Store = [State]
  type Action = {
    type: string,
    payload: any
  }

  const PLACEHOLDER: string = 'PLACEHOLDER'
  const CREATE_TYPE: string = 'CREATE_TYPE'
  const CREATE_ITEMS: string = 'CREATE_ITEMS'
  const CREATE_DISPLAY_ITEMS: string = 'CREATE_DISPLAY_ITEMS'
  const DELETE_ITEMS: string = 'DELETE_ITEMS'
  const VERIFY_ITEM: string = 'VERIFY_ITEM'
  const ADD_TYPE: string = 'ADD_TYPE'
  const CLEAR_TYPES: string = 'CLEAR_TYPES'
  const DISPLAY_ITEMS: string = 'DISPLAY_ITEMS'
  const HIDE_ITEM: string = 'HIDE_ITEM'
  const CREATE_LOCAL_ITEM: string = 'CREATE_LOCAL_ITEM'
  const ITEM_PROPERTIES: string = 'ITEM_PROPERTIES'
  const SET_ORDERED_TYPES: string = 'SET_ORDERED_TYPES'
  const INITIAL_STATE: State = {
    construct: {
      types: [],
      userTypes: [],
      displayTypes: [],
      items: [],
      itemIndex: {},
      localItems: [],
      verifyItem: null
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

    public displayItem(item: ITerm, coordinates?: [number]): Action {
      return {
        type: DISPLAY_ITEMS,
        payload: {
          items: [item],
          coordinates: [coordinates]
        }
      }
    }

    public displayItems(items: ITerm[], coordinates?: [number][]): Action {
      return {
        type: DISPLAY_ITEMS,
        payload: {
          items: items,
          coordinates: coordinates
        }
      }
    }

    public hideItem(item: ITerm): Action {
      return {
        type: HIDE_ITEM,
        payload: item
      }
    }

    public itemProperty(item: INode, propertiesToAdd: PropertyToValues<INode>[], propertiesToRemove?: PropertyToValues<INode>[]) {
      return {
        type: ITEM_PROPERTIES,
        payload: {
          item: item,
          propertiesToAdd: propertiesToAdd,
          propertiesToRemove: propertiesToRemove
        }
      }
    }

    public createItem(item?: INode, typ?: string):Action {
      return {
        type: CREATE_ITEMS,
        payload: {
          items: [item],
          type: typ
        }
      }
    }

    public createItems(items: INode[], typ?: string): Action {
      return {
        type: CREATE_ITEMS,
        payload: {
          items: items,
          type: typ
        }
      }
    }

    public createDisplayItem(item?: INode, typ?: string): Action {
      return {
        type: CREATE_DISPLAY_ITEMS,
        payload: {
          items: [item],
          type: typ
        }
      }
    }

    public createDisplayItems(items: INode[], typ?: string): Action {
      return {
        type: CREATE_DISPLAY_ITEMS,
        payload: {
          items: items,
          type: typ
        }
      }
    }

    public deleteItem(item: INode): Action {
      return {
        type: DELETE_ITEMS,
        payload: [item]
      }
    }

    public verifyItem(item: INode): Action {
      return {
        type: VERIFY_ITEM,
        payload: item
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

    public setOrderedTypes(types: TreeNode[]): Action {
      return {
        type: SET_ORDERED_TYPES,
        payload: types
      }
    }

    public createType(label: string): Action {
      return {
        type: CREATE_TYPE,
        payload: label
      }
    }

    // Reducers
    private itemReducer(state: State = INITIAL_STATE, action: Action = DEFAULT_ACTION): angular.IPromise<State> {
      switch(action.type) {

      case DISPLAY_ITEMS:
        action.payload.items.forEach((item, i) => {
          if(!state.construct.itemIndex[item.value]) {
            state.construct.items.push(item)
            state.construct.itemIndex[item.value] = item

            // If coordinates are provided, apply them
            if(action.payload.coordinates && action.payload.coordinates[i] && action.payload.coordinates[i][0] && action.payload.coordinates[i][1]) {
              state.construct.itemIndex[item.value].x = action.payload.coordinates[i][0]
              state.construct.itemIndex[item.value].y = action.payload.coordinates[i][1]
            }
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
        return this.createItemsInternal(action, state).then((nodes) => {
          return state
        })

      case CREATE_DISPLAY_ITEMS:
        return this.createItemsInternal(action, state).then((nodes) => {
          return this.dispatchAction(this.displayItems(nodes))
        })

      case DELETE_ITEMS:
        return this.q.all(action.payload.map((item: INode) => {
          return this.sparqlItemService.deleteItem(item)
        })).then(() => {
          this.dispatch('change')
          return this.state
        })

      case VERIFY_ITEM:
        this.state.construct.verifyItem = action.payload
        this.dispatch('change')
        return this.q.resolve(this.state)

      case ITEM_PROPERTIES:
        return this.sparqlItemService.alterItem(action.payload.item, action.payload.propertiesToAdd, action.payload.propertiesToRemove).then((str) => {
          return this.state
        })

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
        // Check if this matches any user-defined types and remove them if so
        let dupType = state.construct.userTypes.filter((tn) => {
          return tn.id === action.payload.id
        })[0]
        if(dupType) {
          state.construct.userTypes.splice(state.construct.userTypes.indexOf(dupType), 1)
        }
        return this.q.resolve(state)

      case CLEAR_TYPES:
        state.construct.types = []
        return this.q.resolve(state)

      case SET_ORDERED_TYPES:
        state.construct.displayTypes = action.payload
        return this.q.resolve(state)

      case CREATE_TYPE:
        let prefLabel: PropertyToValues<INode> = new PropertyToValues(SKOS.prefLabel)
        prefLabel.values.push(DataFactory.instance.literal(action.payload))
        return this.sparqlItemService.createNewItem([], [prefLabel]).then((node) => {
          let tn: TreeNode = new TreeNode(node.value, action.payload)
          this.state.construct.userTypes.push(tn)
          return this.state
        })

      default:
        return this.q.resolve(state)
      }
    }

    private createItemsInternal(action, state): angular.IPromise<INode[]> {
      let items: Item[] = action.payload.items
      let typeNode: INamedNode = action.payload.type ? DataFactory.instance.namedNode(action.payload.type) : OWL.Thing

      if (items[0]) {
        let proms = items.map((node) => {
          let prefLabel: PropertyToValues<INode> = new PropertyToValues(SKOS.prefLabel)
          let type: PropertyToValues<INode> = new PropertyToValues(RDF.type)
          type.values.push(typeNode)
          if (node.value) {
            prefLabel.values.push(DataFactory.instance.literal(node.value))
            return this.sparqlItemService.createNewItem([], [prefLabel, type])
          } else {
            return this.sparqlItemService.createNewItem([], [type])
          }

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
        return this.q.all(proms)
      } else {
        let type: PropertyToValues<INode> = new PropertyToValues(RDF.type)
        type.values.push(typeNode)
        let prefLabel: PropertyToValues<INode> = new PropertyToValues(SKOS.prefLabel)
        prefLabel.values.push(DataFactory.instance.literal(''))
        return this.sparqlItemService.createNewItem([], [type, prefLabel]).then((node) => {
          return [node]
        })
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
