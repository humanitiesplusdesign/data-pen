'use strict'
import * as angular from 'angular'

export class ProjectComponentController {

}

export class ProjectComponent implements angular.IComponentOptions {
    public template: any = require('./project.pug')()
    public controller: any = ProjectComponentController
}

angular.module('fibra.components.project', [])
  .component('project', new ProjectComponent())
