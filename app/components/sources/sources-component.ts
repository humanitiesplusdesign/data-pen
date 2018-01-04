'use strict'
import { PropertyStatistics, SparqlStatisticsService } from '../../services/sparql-statistics-service';
import { SourcesActionService } from '../../actions/sources';
import { ProjectActionService } from '../../actions/project';
import { IRootState } from '../../reducers';
import { ISource, ISourceClassTree, ISourcesState } from '../../reducers/sources';
import { ProjectState } from '../../reducers/project';
import * as angular from 'angular';
import { ProjectService } from '../../services/project-service/project-service'
import { IFibraNgRedux } from 'reducers'
import { IModalService } from 'angular-ui-bootstrap'
import * as d3 from 'd3';
import { Class, Property, IClass, IProperty } from 'services/project-service/data-model';
import { FMap, IMap, EMap, IEMap } from 'components/collection-utils';
import { SKOS, RDF, FOAF, DCTerms } from 'models/rdf';

interface ISourcesComponentControllerState {
  project: ProjectState
  sources: ISourcesState
}

export class SourcesComponentController {

  private state: ISourcesComponentControllerState = <ISourcesComponentControllerState>{}
  private projectsOpen: { [id: string]: boolean } = {}
  private localSourceClassTree: ISourceClassTree
  private propStatistics: IMap<IMap<PropertyStatistics>>

  /* @ngInject */
  constructor(private projectService: ProjectService,
              private projectActionService: ProjectActionService,
              private sourcesActionService: SourcesActionService,
              private sparqlStatisticsService: SparqlStatisticsService,
              private $ngRedux: IFibraNgRedux,
              private $uibModal: IModalService) {
    let stateUnsubscribe: () => void = $ngRedux.connect(
      (state: IRootState) => {
        return {
          project: state.project,
          sources: state.sources
        }
      })(this.state)

    if (this.state.project.project) {
      this.localSourceClassTree = angular.copy(this.state.project.project.sourceClassSettings)
    }

    let oldSourceClassTree: ISourceClassTree = this.state.project.project ? this.state.project.project.sourceClassSettings : {}

    // Because we need to keep a local copy of the state to mutate, we have to observe it for changes.
    $ngRedux.subscribe(() => {
      if (this.state.project.project && this.state.project.project.sourceClassSettings !== oldSourceClassTree) {
        this.localSourceClassTree = angular.copy(this.state.project.project.sourceClassSettings)
        oldSourceClassTree = this.state.project.project.sourceClassSettings
      }

      this.propStatistics = this.buildPropStatistics()
    })
  }

  private openAddSourcesModal(): void {
    let modalInstance: any = this.$uibModal.open({
      animation: true,
      component: 'addSource',
      size: 'lg',
      resolve: {
      }
    });
  }

  private allClasses(): IClass[] {
    return d3.keys(this.localSourceClassTree).reduce(
      (a, b) => {
        let sourceClasses: string[] = d3.keys(this.localSourceClassTree[b])
          .filter(k => this.localSourceClassTree[b][k])
          .filter(k => a.indexOf(k) === -1)
        return a.concat(sourceClasses)
      },
      []).map(c => this.state.project.project ? this.state.project.project.dataModel.classMap.get(c) : null)
        .filter(c => c)
  }

  private sourcePropsForClass(c: Class): any {
    let sources: string[] = d3.keys(this.localSourceClassTree)
    let allPropStatistics: IMap<IMap<PropertyStatistics>> = this.propStatistics
    if (!allPropStatistics.has(c.value)) return {
      sources: sources,
      properies: []
    }
    let propStatistics: IMap<PropertyStatistics> = allPropStatistics.get(c.value)
    return {
      sources: sources,
      properties: this.state.project.project.dataModel.propertyMap.values()
        .filter(p => { return propStatistics.has(p.value) && propStatistics.get(p.value).values > 0 })
        .filter(p => p.labels.values().length > 0)
        .filter(p => {
          // Check that an authority with this class also has this property
          return this.state.sources.archiveSources.concat(this.state.sources.authoritySources).reduce(
            (a, b) => {
              return a || (
                this.state.project.project.sourceClassSettings[b.id] &&
                this.state.project.project.sourceClassSettings[b.id][c.value] &&
                b.propStats.get(c.value) &&
                b.propStats.get(c.value).get(p.value) &&
                !!b.propStats.get(c.value).get(p.value).values
              )
            },
            false)
        })
        .sort((a, b) => {
          return +propStatistics.get(a.value).values < +propStatistics.get(b.value).values ? 1 : -1
        })
    }
  }

  private propSubjectsComparator(classValue: string, prop1: any, prop2: any): number {
    if (!this.propStatistics.get(classValue).get(prop1.value) || !this.propStatistics.get(classValue).get(prop2.value)) {
      return -1
    } else {
      return this.propStatistics.get(classValue).get(prop1.value).subjects > this.propStatistics.get(classValue).get(prop2.value).subjects ?
        1 :
        this.propStatistics.get(classValue).get(prop1.value).subjects < this.propStatistics.get(classValue).get(prop2.value).subjects ?
          -1 :
          0
    }
  }

  private buildPropStatistics(): IMap<IMap<PropertyStatistics>> {
    let classPropMap: IEMap<IMap<PropertyStatistics>> = new EMap<FMap<PropertyStatistics>>(() => new FMap<PropertyStatistics>())
    this.state.sources.archiveSources.concat(this.state.sources.authoritySources)
      .filter(ae => ae.propStats)
      .forEach((ae) => {
        ae.propStats.entries().forEach((ckv) => {
          let propMap: IMap<PropertyStatistics> = classPropMap.goc(ckv.key)
          // Only count if this source is turned on for this class
          if(ae.classStats.has(ckv.key) && this.localSourceClassTree[ae.id][ckv.key]) {
            ckv.value.each((value, key) => {
              if (key !== SKOS.prefLabel.value &&
                  key !== RDF.type.value &&
                  key !== SKOS.altLabel.value &&
                  key !== DCTerms.description.value) {
                if (!propMap.has(key)) {
                  let newValue: PropertyStatistics = angular.copy(value)
                  newValue.subjects = +newValue.subjects
                  newValue.values = +newValue.values
                  propMap.set(key, newValue)
                } else {
                  let ps: PropertyStatistics = propMap.get(key)
                  ps.subjects += +value.subjects
                  ps.values += +value.values
                  ps.min = ps.min < value.min ? ps.min : value.min
                  ps.max = ps.max > value.max ? ps.max : value.max
                }
              }
            })
          }
        })
      })
    return classPropMap
  }

  private grandTotal(clss: string): number {
    return this.state.sources.archiveSources.concat(this.state.sources.authoritySources)
      // Filter out sources where this class is not turned on
      .filter(ae => ae.classStats.has(clss) && this.localSourceClassTree[ae.id][clss])
      .map(ae => ae.classStats.get(clss))
      .filter((tot) => !isNaN(tot))
      .reduce((a, b) => +a + +b, 0)
  }

  private propertyTotalPercentage(classKey: string, propKey: string): number {
    console.log(classKey, propKey, this.propStatistics.get(classKey).get(propKey).subjects, this.grandTotal(classKey))
    return this.propStatistics.get(classKey).get(propKey).subjects / this.grandTotal(classKey)
  }

  private getSourceClassStatus(source: string, clss: string): boolean {
    if (this.state.project.project.sourceClassSettings[source] && this.state.project.project.sourceClassSettings[source][clss]) {
      return this.state.project.project.sourceClassSettings[source][clss]
    } else {
      return false
    }
  }

  private floor(value: number): number {
    return Math.floor(value)
  }
}

export class SourcesComponent implements angular.IComponentOptions {
    public template: any = require('./sources.pug')()
    public controller: any = SourcesComponentController
}

angular.module('fibra.components.sources', ['ui.bootstrap'])
  .component('sources', new SourcesComponent())
