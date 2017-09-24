'use strict'
import * as angular from 'angular'
import { ProjectService } from '../../services/project-service/project-service'
import * as ProjectActions from '../../actions/project'
import { INgRedux } from 'ng-redux'
import * as d3 from 'd3'

export class ActiveComponentController {

  private actions: any = {}

  /* @ngInject */
  constructor(private projectService: ProjectService,
              private $ngRedux: INgRedux) {
    let unsub1: () => void = $ngRedux.connect(this.mapProjectToActions, ProjectActions)(this.actions)
    this.actions.unsubscribe = () => {
      unsub1()
    }
  }

  private mapProjectToActions(state: any): any {
    return {
      project: state.frontend.project
    }
  }

  private $postLink(): void {
    this.buildCanvas()
  }

  private buildCanvas(): void {
    let s: d3.Selection<Element, {}, HTMLElement, any> = d3.select('.main-svg')

    // let canvasSize: {height: number, width: number} = this.getCanvasSize()
    // let h: number = canvasSize.height
    // let w: number = canvasSize.width

    let g: d3.Selection<Element, {}, HTMLElement, any> = s.select('.main-g')

    let r: d3.Selection<SVGRectElement, {}, HTMLElement, any> = g.append<SVGRectElement>('rect')
      .classed('main-background', true)
      .on('click', () => {
        console.log(d3.event)
        console.log(this.actions)
      })

    this.updateCanvasSize()

  }

  private updateCanvas(): void {
    let a: number = 1;
  }

  private updateCanvasSize(): void {
    let canvasSize: {height: number, width: number} = this.getCanvasSize()
    let h: number = canvasSize.height
    let w: number = canvasSize.width

    let r: d3.Selection<SVGRectElement, {}, HTMLElement, any> = d3.select('.main-background')
    r.style('height', h)
    r.style('width', w)
  }

  private getCanvasSize(): { height: number, width: number } {
    let s: d3.Selection<Element, {}, HTMLElement, any> = d3.select('.main-svg')
    return {
      height: s.node().clientHeight,
      width: s.node().clientWidth
    }
  }
}

export class ActiveComponent implements angular.IComponentOptions {
    public template: any = require('./active.pug')()
    public controller: any = ActiveComponentController
}

angular.module('fibra.components.active', [])
  .component('active', new ActiveComponent())
