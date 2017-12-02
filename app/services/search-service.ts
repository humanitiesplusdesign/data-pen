'use strict'

import * as angular from 'angular'
import { INgRedux } from 'ng-redux'
import { IItemState } from 'reducers/active'
import { SparqlAutocompleteService, AutocompletionResults} from 'services/sparql-autocomplete-service'

export class AutocompletionResult {
  constructor(
  public id: string,
  public description: string) {}
}

export class SearchService {

  // private testData = [{"id":"http://www.w3.org/2002/07/owl#sameAs","description":"same As"},{"id":"http://emlo.bodleian.ox.ac.uk/id/cccc8972-7adb-463d-b039-bcee2898b222","description":"cccc8972-7adb-463d-b039-bcee2898b222"},{"id":"http://www.w3.org/2004/02/skos/core#prefLabel","description":"pref Label"},{"id":"http://www.w3.org/1999/02/22-rdf-syntax-ns#type","description":"type"},{"id":"http://www.cidoc-crm.org/cidoc-crm/E21_Person","description":"Person"},{"id":"http://ldf.fi/sdfb/person_10007541","description":"John Locke"},{"id":"http://www.cidoc-crm.org/cidoc-crm/E53_Place","description":"Place"},{"id":"http://ldf.fi/sdfb/person_10006012","description":"Hobbes, Thomas, 1588-1679"},{"id":"http://ldf.fi/sdfb/person_10009549","description":"Samuel Pepys"},{"id":"http://emlo.bodleian.ox.ac.uk/id/7ce5b3fe-1fc7-4c42-80f1-120f91ab0a1c","description":"Edinburgh"},{"id":"http://xmlns.com/foaf/0.1/name","description":"name"},{"id":"http://www.w3.org/2004/02/skos/core#altLabel","description":"alt Label"},{"id":"http://emlo.bodleian.ox.ac.uk/schema#ipersonId","description":"iperson_id"},{"id":"http://ldf.fi/sdfb/schema#odbnId","description":"ODBN id"},{"id":"http://purl.org/dc/terms/description","description":"description"},{"id":"http://xmlns.com/foaf/0.1/family_name","description":"family name"},{"id":"http://xmlns.com/foaf/0.1/givenname","description":"givenname"},{"id":"http://ldf.fi/sdfb/schema#relationship_39_4","description":"unlikely met"},{"id":"http://ldf.fi/sdfb/person_10011671","description":"King Charles II"},{"id":"http://ldf.fi/sdfb/person_10011670","description":"King Charles I"},{"id":"http://ldf.fi/sdfb/person_10007966","description":"Henrietta Maria, Queen consort of Charles I, 1609-1669"},{"id":"http://ldf.fi/sdfb/person_10011474","description":"Thomas Stanley"},{"id":"http://ldf.fi/sdfb/person_10010637","description":"Thomas Salmon"},{"id":"http://ldf.fi/sdfb/person_10011108","description":"Simpson, Christopher, 1602-1669"},{"id":"http://ldf.fi/sdfb/schema#relationship_59_4","description":"possibly met"},{"id":"http://ldf.fi/sdfb/person_10011229","description":"Robert Smith"},{"id":"http://ldf.fi/sdfb/person_10010863","description":"Sir Charles Sedley"},{"id":"http://ldf.fi/sdfb/person_10010009","description":"Henry Purcell"},{"id":"http://ldf.fi/sdfb/schema#relationship_79_4","description":"likely met"},{"id":"http://ldf.fi/sdfb/person_10010932","description":"Thomas Shadwell"},{"id":"http://ldf.fi/sdfb/person_10010906","description":"Elkanah Settle"},{"id":"http://ldf.fi/sdfb/person_10011822","description":"Silas Taylor"},{"id":"http://ldf.fi/sdfb/schema#relationship_99_4","description":"very likely met"},{"id":"http://ldf.fi/sdfb/person_10010636","description":"Salmon, Thomas, 1647-1706"},{"id":"http://ldf.fi/sdfb/schema#relationship_100_4","description":"met"},{"id":"http://ldf.fi/sdfb/schema#relationship_19_4","description":"very unlikely met"},{"id":"http://ldf.fi/sdfb/person_10009069","description":"Titus Oates"},{"id":"http://ldf.fi/sdfb/person_10013084","description":"Anthony Wood"},{"id":"http://ldf.fi/sdfb/person_10009676","description":"Phillips, John, 1631-1706"},{"id":"http://ldf.fi/sdfb/person_10011957","description":"John Tillotson"},{"id":"http://ldf.fi/sdfb/person_10010824","description":"Sir William Scroggs"},{"id":"http://ldf.fi/sdfb/person_10010730","description":"Sir George Savile"},{"id":"http://ldf.fi/sdfb/person_10012251","description":"Sir Henry Vane the younger"},{"id":"http://ldf.fi/sdfb/person_10012466","description":"John Wallis"},{"id":"http://ldf.fi/sdfb/person_10010252","description":"Rich, Mary, 1624-1678"},{"id":"http://ldf.fi/sdfb/person_10012250","description":"Sir Henry Vane"},{"id":"http://ldf.fi/sdfb/person_10011006","description":"Sir Fleetwood Sheppard"},{"id":"http://ldf.fi/sdfb/person_10012817","description":"Bulstrode Whitelocke"},{"id":"http://ldf.fi/sdfb/person_10010549","description":"Edward Russell"},{"id":"http://ldf.fi/sdfb/person_10012940","description":"Thomas Willis"},{"id":"http://ldf.fi/sdfb/person_10011975","description":"Thomas Tollemache"},{"id":"http://ldf.fi/sdfb/person_10010404","description":"John Rogers"},{"id":"http://ldf.fi/sdfb/person_10011557","description":"Sir James Stewart of Goodtrees"},{"id":"http://ldf.fi/sdfb/person_10010372","description":"Sir William Robinson"},{"id":"http://ldf.fi/sdfb/person_10012810","description":"Robert Whitehall"},{"id":"http://ldf.fi/sdfb/person_10012503","description":"Izaak Walton"},{"id":"http://ldf.fi/sdfb/person_10013158","description":"Sir Robert Wright"},{"id":"http://ldf.fi/sdfb/person_10013033","description":"Richard Wiseman"},{"id":"http://ldf.fi/sdfb/person_10011246","description":"Thomas Smith"},{"id":"http://ldf.fi/sdfb/person_10011522","description":"George Stepney"},{"id":"http://ldf.fi/sdfb/person_10011797","description":"Thomas Tanner"},{"id":"http://ldf.fi/sdfb/person_10009947","description":"Colonel Thomas Pride"},{"id":"http://ldf.fi/sdfb/person_10012521","description":"John Ward"},{"id":"http://ldf.fi/sdfb/person_10010920","description":"Elizabeth Seymour"},{"id":"http://ldf.fi/sdfb/person_10009872","description":"Thomas Povey"},{"id":"http://ldf.fi/sdfb/person_10009619","description":"Peter Pett"},{"id":"http://ldf.fi/sdfb/person_10013041","description":"Willem Wissing"},{"id":"http://ldf.fi/sdfb/person_10010916","description":"Charles Seymour duke of Somerset"},{"id":"http://ldf.fi/sdfb/person_10012305","description":"Aubrey de Vere"},{"id":"http://ldf.fi/sdfb/person_10011635","description":"Giles Strangways"},{"id":"http://ldf.fi/sdfb/person_10009968","description":"Sir William Pritchard"},{"id":"http://ldf.fi/sdfb/person_10012683","description":"Henrietta Maria Wentworth"},{"id":"http://ldf.fi/sdfb/person_10012226","description":"James Ussher"},{"id":"http://ldf.fi/sdfb/person_10010747","description":"Sir Robert Sawyer"},{"id":"http://ldf.fi/sdfb/person_10013300","description":"Prince Rupert of the Rhine"},{"id":"http://ldf.fi/sdfb/person_10013082","description":"Laurence Womock"},{"id":"http://ldf.fi/sdfb/person_10012908","description":"Abigail Williams"},{"id":"http://ldf.fi/sdfb/person_10011666","description":"Queen Anne"},{"id":"http://ldf.fi/sdfb/person_10012567","description":"Sir Philip Warwick"},{"id":"http://ldf.fi/sdfb/person_10009976","description":"Edward Progers"},{"id":"http://ldf.fi/sdfb/person_10012962","description":"John Wilmot"},{"id":"http://ldf.fi/sdfb/person_10011976","description":"Elizabeth Tollet"},{"id":"http://ldf.fi/sdfb/person_10009698","description":"Edward Pierce"},{"id":"http://ldf.fi/sdfb/person_10011896","description":"Ralph Thoresby"},{"id":"http://ldf.fi/sdfb/person_10011334","description":"John Spademan"},{"id":"http://ldf.fi/sdfb/person_10010793","description":"James Scott Duke of Monmouth"},{"id":"http://ldf.fi/sdfb/person_10012876","description":"Sir John Wildman"},{"id":"http://ldf.fi/sdfb/person_10009625","description":"Maximilian Petty"},{"id":"http://ldf.fi/sdfb/person_10013141","description":"Matthew Wren"},{"id":"http://ldf.fi/sdfb/person_10011672","description":"Charles Stuart"},{"id":"http://ldf.fi/sdfb/person_10011641","description":"Robert Streater"},{"id":"http://ldf.fi/sdfb/person_10009620","description":"Sir Peter Pett"},{"id":"http://ldf.fi/sdfb/person_10011827","description":"Sir Thomas Teddeman"},{"id":"http://ldf.fi/sdfb/person_10011399","description":"William Spurstowe"},{"id":"http://ldf.fi/sdfb/person_10012872","description":"Robert Wild"},{"id":"http://ldf.fi/sdfb/person_10012563","description":"Sir William Warren"},{"id":"http://ldf.fi/sdfb/person_10010758","description":"Scarborough, Charles"},{"id":"http://ldf.fi/sdfb/person_10012136","description":"Turberville, Daubeney, 1612-1696"},{"id":"http://ldf.fi/sdfb/person_10010709","description":"Margaret Saunders"},{"id":"http://ldf.fi/sdfb/person_10012983","description":"William Winde"}]

  constructor(
    private $q: angular.IQService,
    private $ngRedux: INgRedux,
    private sparqlAutocompleteService: SparqlAutocompleteService
  ) {
  }

  public searchSources(query: string): angular.IPromise<AutocompletionResult[]> {
    return this.sparqlAutocompleteService.autocomplete(query, 20, true).then(ret => this.processResults(ret), null, ret => {
      if (ret.results) this.processResults(ret.results)
    })
/*    let activeItemIds: string[] = this.$ngRedux.getState().frontend.active.activeLayout.items.map((d: IItemState) => d.id)
    return this.$q.resolve(
      this.testData
        .filter((d) => d.description.indexOf(query) >= 0 )
        .filter((d) => activeItemIds.indexOf(d.id) === -1)
    )*/
  }

  private processResults(res: AutocompletionResults): AutocompletionResult[] {
    let activeItemIds: string[] = this.$ngRedux.getState().frontend.active.activeLayout.items.map((d: IItemState) => d.ids).reduce((a, b) => a.concat(b), [])
    let ret: AutocompletionResult[] = []
    res.localMatchingResults.forEach(l => l.results.forEach(r => {
      if (activeItemIds.indexOf(r.ids[0].value) === -1) ret.push(new AutocompletionResult(r.ids[0].value, r.matchedLabel.value))
    }))
    res.remoteResults.forEach(l => l.results.forEach(r => {
      if (activeItemIds.indexOf(r.ids[0].value) === -1
        && r.additionalInformation.type && r.additionalInformation.type[0]
        && r.datasources.reduce((p, c) => this.$ngRedux.getState().frontend.sources.sourceClassToggle[c] && this.$ngRedux.getState().frontend.sources.sourceClassToggle[c][r.additionalInformation.type[0].value], false)) {
          ret.push(new AutocompletionResult(r.ids[0].value, r.matchedLabel.value))
        }
    }))
    return ret
  }

}


angular.module('fibra.services.search-service', ['fibra.services.sparql-autocomplete-service'])
  .config(($provide) => {
    $provide.service('searchService', SearchService)
  })
