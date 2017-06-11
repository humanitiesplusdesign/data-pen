namespace fi.seco.sparql {
  'use strict'

  describe('Angular SPARQL service', () => {

    beforeEach(angular.mock.module('fi.seco.sparql'))

    let sparqlService: SparqlService = null

    beforeEach(inject((_sparqlService_: SparqlService) => sparqlService = _sparqlService_))

    it('should exist', () => {
      expect(sparqlService).toBeDefined()
    })

    it('should convert strings containing " properly', () => {
      expect(SparqlService.stringToSPARQLString('""')).toBe('"\\\"\\\""')
    })

    class SubObj {
      public array: string[] = []
      public obj: {} = {}
      public singleValue: string = null
    }

    class TestObj {
      public array: string[] = []
      public obj: {} = {}
      public singleValue: string = null
      public subObj: SubObj = new SubObj()
      public subObjArray: SubObj[] = []
    }

    it('should convert objects', () => {
      let obj: TestObj = new TestObj()
      let bindings: {[varName: string]: ISparqlBinding} = {}
      bindings['array'] = {
        type: 'literal',
        value: 'arrayvalue'
      }
      bindings['obj'] = {
        type: 'literal',
        'xml:lang': 'en',
        value: 'objvalue'
      }
      bindings['singleValue'] = {
        type: 'literal',
        'xml:lang': 'en',
        value: 'singlevalue'
      }
      SparqlService.bindingsToObject(bindings, obj)
      expect(obj.array[0]).toBe('arrayvalue')
      expect(obj.obj['en']).toBe('objvalue')
      expect(obj.singleValue).toBe('singlevalue')
    })

    it('should follow conversion types', () => {
      let obj: TestObj = new TestObj()
      let bindings: {[varName: string]: ISparqlBinding} = {}
      bindings['array'] = {
        type: 'literal',
        value: 'arrayvalue'
      }
      bindings['obj'] = {
        type: 'literal',
        'xml:lang': 'en',
        value: 'objvalue'
      }
      SparqlService.bindingsToObject(bindings, obj)
      expect(obj.array[0]).toBe('arrayvalue')
      expect(obj.obj['en']).toBe('objvalue')
      SparqlService.bindingsToObject(bindings, obj)
      expect(obj.array[1]).toBe('arrayvalue')
      expect(obj.array.length).toBe(2)
      SparqlService.bindingsToObject(bindings, obj, {
        bindingTypes: {
          array: 'ignore',
          obj: 'array'
        }
      })
      expect(obj.array.length).toBe(2)
      expect(Array.isArray(obj.obj)).toBe(true)
      obj.array = []
      let tracker: UniqueObjectTracker = new UniqueObjectTracker()
      SparqlService.bindingsToObject(bindings, obj, {
        bindingTypes: {
          array: 'uniqueArray',
        }
      },                             tracker)
      SparqlService.bindingsToObject(bindings, obj, {
        bindingTypes: {
          array: 'uniqueArray',
        }
      },                             tracker)
      expect(obj.array.length).toBe(1)
    })

    it('should use given converters', () => {
      let obj: TestObj = new TestObj()
      let bindings: {[varName: string]: ISparqlBinding} = {}
      bindings['array'] = {
        type: 'literal',
        value: 'arrayvalue'
      }
      bindings['obj'] = {
        type: 'literal',
        'xml:lang': 'en',
        value: 'objvalue'
      }
      SparqlService.bindingsToObject(bindings, obj, {
        bindingConverters: {
          array: (binding: ISparqlBinding) => 'arrayvalue2',
          obj: (binding: ISparqlBinding) => 'objvalue2'
        }
      })
      expect(obj.array[0]).toBe('arrayvalue2')
      expect(obj.obj['en']).toBe('objvalue2')
    })

    it('should handle subobjects', () => {
      let obj: TestObj = new TestObj()
      let bindings: {[varName: string]: ISparqlBinding} = {}
      bindings['subObj_array'] = {
        type: 'literal',
        value: 'arrayvalue'
      }
      bindings['subObj_obj'] = {
        type: 'literal',
        'xml:lang': 'en',
        value: 'objvalue'
      }
      SparqlService.bindingsToObject(bindings, obj)
      expect(obj.subObj.array[0]).toBe('arrayvalue')
      expect(obj.subObj.obj['en']).toBe('objvalue')
      SparqlService.bindingsToObject(bindings, obj, {
        bindingConverters: {
          subObj_array: (binding: ISparqlBinding) => 'arrayvalue2',
          subObj_obj: (binding: ISparqlBinding) => 'objvalue2'
        }
      })
      expect(obj.subObj.array[0]).toBe('arrayvalue')
      expect(obj.subObj.array[1]).toBe('arrayvalue2')
      expect(obj.subObj.obj['en']).toBe('objvalue2')
      bindings['subObjArray'] = {
        type: 'literal',
        'xml:lang': 'en',
        value: 'subobjid'
      }
      bindings['subObjArray_obj'] = {
        type: 'literal',
        'xml:lang': 'en',
        value: 'objvalue'
      }
      bindings['subObjArray_array'] = {
        type: 'literal',
        'xml:lang': 'en',
        value: 'objvalue'
      }
      let tracker: UniqueObjectTracker = new UniqueObjectTracker()
      SparqlService.bindingsToObject(bindings, obj, {
        bindingTypes: { subObjArray: 'uniqueArray', subObjArray_array: 'uniqueArray'},
        bindingConverters: {
          subObjArray: (binding: ISparqlBinding) => new SubObj(),
          subObjArray_array: (binding: ISparqlBinding) => 'arrayvalue2',
          subObjArray_obj: (binding: ISparqlBinding) => 'objvalue2'
        }
      },                             tracker)
      SparqlService.bindingsToObject(bindings, obj, {
        bindingTypes: { subObjArray: 'uniqueArray', subObjArray_array: 'uniqueArray'},
        bindingConverters: {
          subObjArray: (binding: ISparqlBinding) => new SubObj(),
          subObjArray_array: (binding: ISparqlBinding) => 'arrayvalue2',
          subObjArray_obj: (binding: ISparqlBinding) => 'objvalue2'
        }
      },                             tracker)
      expect(obj.subObjArray[0].array[0]).toBe('arrayvalue2')
      expect(obj.subObjArray[0].array.length).toBe(1)
      expect(obj.subObjArray[0].obj['en']).toBe('objvalue2')
    })

    it('should handle multiple subobjects', () => {
      let obj: TestObj = new TestObj()
      let bindings: {[varName: string]: ISparqlBinding} = {}
      bindings['subObjArray'] = {
        type: 'literal',
        'xml:lang': 'en',
        value: 'subobjid'
      }
      bindings['subObjArray_obj'] = {
        type: 'literal',
        'xml:lang': 'en',
        value: 'objvalue'
      }
      bindings['subObjArray_array'] = {
        type: 'literal',
        'xml:lang': 'en',
        value: 'objarrayvalue'
      }
      let tracker: UniqueObjectTracker = new UniqueObjectTracker()
      SparqlService.bindingsToObject(bindings, obj, {
        bindingTypes: { subObjArray: 'uniqueArray', subObjArray_array: 'uniqueArray'},
        bindingConverters: {
          subObjArray: (binding: ISparqlBinding) => new SubObj(),
          subObjArray_array: (binding: ISparqlBinding) => 'arrayvalue2',
          subObjArray_obj: (binding: ISparqlBinding) => 'objvalue2'
        }
      },                             tracker)
      expect(obj.subObjArray[0].array[0]).toBe('arrayvalue2')
      expect(obj.subObjArray[0].array.length).toBe(1)
      expect(obj.subObjArray[0].obj['en']).toBe('objvalue2')
      bindings['subObjArray'] = {
        type: 'literal',
        'xml:lang': 'en',
        value: 'subobjid2'
      }
      SparqlService.bindingsToObject(bindings, obj, {
        bindingTypes: { subObjArray: 'uniqueArray', subObjArray_array: 'uniqueArray'},
        bindingConverters: {
          subObjArray: (binding: ISparqlBinding) => new SubObj(),
          subObjArray_array: (binding: ISparqlBinding) => 'arrayvalue3',
          subObjArray_obj: (binding: ISparqlBinding) => 'objvalue3'
        }
      },                             tracker)
      expect(obj.subObjArray.length).toBe(2)
      expect(obj.subObjArray[0].array[0]).toBe('arrayvalue2')
      expect(obj.subObjArray[0].array.length).toBe(1)
      expect(obj.subObjArray[0].obj['en']).toBe('objvalue2')
      // different override cannot be applied again, tracker by id already has object
      expect(tracker.objectsById['subObjArray_array']['objarrayvalue']).toBe('arrayvalue2')
      expect(obj.subObjArray[1].array[0]).toBe('arrayvalue2')
      expect(obj.subObjArray[1].array.length).toBe(1)
      expect(obj.subObjArray[1].obj['en']).toBe('objvalue3')
    })

    it('should handle nested subobjects', () => {
      class TestObj {
        public name: string
        public subObj: TestObj
        public subObjs: TestObj[]
      }

      let obj: TestObj = new TestObj()
      let bindings: {[varName: string]: ISparqlBinding} = {
        name: { type: 'literal', value: 'rname'},
        subObj: { type: 'uri', value: 'http://foo.com/subObjId/'},
        subObj_name: { type: 'literal', value: 'soname' },
        subObj_subObj: { type: 'uri', value: 'http://foo.com/subObj2Id/'},
        subObj_subObj_name: { type: 'literal', value: 'so3name'},
        subObjs: { type: 'uri', value: 'http://foo.com/subObj2Id/'},
        subObjs_name: { type: 'literal', value: 'so2name' }
      }
      let tracker: UniqueObjectTracker = new UniqueObjectTracker()
      SparqlService.bindingsToObject(bindings, obj, {
        bindingTypes: { subObj: 'single', subObjs: 'uniqueArray'},
        bindingConverters: {
          subObj: (binding: ISparqlBinding) => new TestObj(),
          subObj_subObjs: (binding: ISparqlBinding) => new TestObj(),
          subObjs_subObj: (binding: ISparqlBinding) => new TestObj(),
          subObj_subObj: (binding: ISparqlBinding) => new TestObj(),
          subObjs: (binding: ISparqlBinding) => new TestObj(),
        }
      },                             tracker)
      expect(obj.name).toBe('rname')
      expect(obj.subObj.name).toBe('soname')
      expect(obj.subObj.subObj).toBeDefined()
      expect(obj.subObjs.length).toBe(1)
      expect(obj.subObjs[0].name).toBe('so2name')
      expect(obj.subObj.subObj.name).toBe('so3name')
    })

  })
}
