import { Item } from '../services/sparql-item-service'

export interface IGridNode extends d3.SimulationNodeDatum {
  gx?: number
  gy?: number
  fx?: number
  fy?: number
  selected?: boolean
}

export interface IExploreItem extends Item, IGridNode {
}
