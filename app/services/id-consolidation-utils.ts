'use strict'

import { EMap, StringSet } from 'components/collection-utils';
import {SparqlService, ISparqlBindingResult} from 'angular-sparql-service'

export class UnifyMap {
    public idToIdSet: EMap<StringSet> = new EMap<StringSet>(() => new StringSet()) // id to sameAs ids
    private ifpVarPlusValueToIdSet: EMap<EMap<StringSet>> = new EMap<EMap<StringSet>>(() => new EMap<StringSet>(() => new StringSet())) // inverse functional properties & values to ids
    public consolidate(result: ISparqlBindingResult<{[id: string]: ISparqlBinding}>, idVar = 'id', sameAsVar = 'sameAs', ifpVars = result.head.vars.filter(v => v.indexOf('ifp') === 0)): void {
      result.results.bindings.forEach(binding => {
        let id: string = binding[idVar].value
        this.idToIdSet.goc(id).add(id)
        if (binding[sameAsVar]) {
          this.idToIdSet.get(id).add(binding[sameAsVar].value)
          this.idToIdSet.goc(binding[sameAsVar].value).add(id)
        }
        for (let v of ifpVars) if (binding[v]) this.ifpVarPlusValueToIdSet.goc(v).goc(binding[v].value).add(id)
      })
      // create sameAses for all objects sharing the same inverse functional property values
      this.ifpVarPlusValueToIdSet.each(valueToIdSet => valueToIdSet.each(ids => ids.each(id2 => this.idToIdSet.goc(id2).adds(ids))))
      // consolidate id sets
      this.idToIdSet.each((idSet: StringSet) => idSet.each(id => {
        let oidSet: StringSet = this.idToIdSet.get(id)
        if (idSet !== oidSet) {
          this.idToIdSet.set(id, idSet)
          idSet.adds(oidSet)
        }
      }))
    }
  }
