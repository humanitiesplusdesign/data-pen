'use strict'

import * as angular from 'angular';
import { IFibraNgRedux } from 'reducers'
import { Property } from 'services/project-service/data-model';
import { FullRichNodeFromNode } from 'models/richnode';
import { CNode } from 'models/rdf';

export class BasicProperty extends Property {
  public minimumValue: FullRichNodeFromNode
  public maximumValue: FullRichNodeFromNode
  public type: 'DateTime' | 'Ordinal' | 'Coordinate' | 'Numeric' | 'Text'

  constructor(prop: Property) {
    super(prop.id)
    this.domains = prop.domains
    this.ranges = prop.ranges
    this.superProperties = prop.superProperties
    this.subProperties = prop.subProperties
    this.inverseProperty = prop.inverseProperty
    this.minimumValue = null
    this.maximumValue = null
    return this
  }
}

export class DetailedProperty extends BasicProperty {
  public distributionData: {
    key: FullRichNodeFromNode,
    value: number
  }[]
  public distributionMaximum: number

  constructor(prop: BasicProperty) {
    super(prop)
    this.minimumValue = prop.minimumValue
    this.maximumValue = prop.maximumValue
    this.type = prop.type
  }
}

export class PropertyService {

  private $q: angular.IQService
  private $ngRedux: IFibraNgRedux

  /* @ngInject */
  constructor(
    $q: angular.IQService,
    $ngRedux: IFibraNgRedux
  ) {
    this.$q = $q
    this.$ngRedux = $ngRedux
  }

  public getBasicProperty(prop: Property): angular.IPromise<BasicProperty> {
    let bp: BasicProperty = new BasicProperty(prop)
    bp.maximumValue = new FullRichNodeFromNode(
      new CNode(
        '2500-01-01',
        'NamedNode'
      )
    )
    bp.minimumValue = new FullRichNodeFromNode(
      new CNode(
        '0001-01-01',
        'NamedNode'
      )
    )
    bp.type = 'DateTime'
    return this.$q.resolve(bp)
  }

  public getDetailedProperty(prop: BasicProperty): angular.IPromise<DetailedProperty> {
    let dp: DetailedProperty = new DetailedProperty(prop)
    return this.$q.resolve(dp)
  }
}


angular.module('fibra.services.property-service', [])
  .config(($provide) => {
    $provide.service('propertyService', PropertyService)
  })
