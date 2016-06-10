namespace fibra {
  'use strict'

  import s = fi.seco.sparql

  export class ResultsByDatasource {
    constructor(public id: string, public title: string, public resultsByGroup: ResultGroup[]) {}
  }

  export class ResultGroup {
    public results: Result[] = []
    constructor(public label: string) {}
  }

  export class Result {
    constructor(public id: string, public matchedLabel: string, public prefLabel: string, public additionalInformation: string) {}
  }

  export interface ISparqlAutocompletionConfiguration {
    id: string
    title: string
    endpoint: string
    queryTemplate: string
  }

  export class SparqlAutocompleteService {
    constructor(private $q: angular.IQService, private sparqlService: s.SparqlService) { }

    public autocomplete(query: string, constraints: string, limit: number, configurations: ISparqlAutocompletionConfiguration[], canceller?: angular.IPromise<any>): angular.IPromise<ResultsByDatasource[]> {
      return this.$q.all(configurations.map(configuration => {
        let queryTemplate: string = configuration.queryTemplate
        queryTemplate = queryTemplate.replace(/<QUERY>/g, this.sparqlService.stringToSPARQLString(query))
        if (constraints) queryTemplate = queryTemplate.replace(/# CONSTRAINTS/g, constraints)
        queryTemplate = queryTemplate.replace(/<LIMIT>/g, '' + limit)
        return this.sparqlService.query(configuration.endpoint, queryTemplate, {timeout: canceller}).then(
          (response: angular.IHttpPromiseCallbackArg<s.ISparqlBindingResult<{[id: string]: s.ISparqlBinding}>>) => {
            let ret: ResultGroup[] = []
            let groupToResults: {[groupId: string]: ResultGroup} = {}
            response.data.results.bindings.forEach(binding => {
              if (!groupToResults[binding['groupId'].value]) groupToResults[binding['groupId'].value] = new ResultGroup(binding['groupLabel'].value)
              groupToResults[binding['groupId'].value].results.push(new Result(binding['id'].value, binding['matchedLabel'].value, binding['prefLabel'].value, binding['additionalInformation'] ? binding['additionalInformation'].value : ''))
            })
            for (let groupId in groupToResults) ret.push(groupToResults[groupId])
            return new ResultsByDatasource(configuration.id, configuration.title, ret)
          }
        )
      }))
    }
  }

}
