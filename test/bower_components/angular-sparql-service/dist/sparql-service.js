angular.module('fi.seco.sparql', []);
var fi;
(function (fi) {
    var seco;
    (function (seco) {
        var sparql;
        (function (sparql) {
            'use strict';
            var UniqueObjectTracker = (function () {
                function UniqueObjectTracker() {
                    this.objectsById = {};
                    this.assignmentsById = {};
                }
                return UniqueObjectTracker;
            }());
            sparql.UniqueObjectTracker = UniqueObjectTracker;
            var SparqlService = (function () {
                function SparqlService($http, $q) {
                    this.$http = $http;
                    this.$q = $q;
                }/*<auto_generate>*/SparqlService.$inject = ['$http','$q']; SparqlService.$componentName = 'sparqlService'/*</auto_generate>*/
                SparqlService.stringToSPARQLString = function (string) {
                    return '"' + string
                        .replace(/\\/g, '\\\\')
                        .replace(/"/g, '\\"')
                        .replace(/\n/g, '\\n')
                        .replace(/\t/g, '\\t')
                        .replace(/\r/g, '\\r')
                        .replace(/\f/g, '\\f')
                        + '"';
                };
                SparqlService.bindingsToObject = function (bindings, ret, config, tracker) {
                    if (ret === void 0) { ret = {}; }
                    for (var bkey in bindings) {
                        var okey = bkey;
                        var obj = ret;
                        var subObjectPrefixIndex = okey.indexOf('_');
                        var lastSubObjectPrefixIndex = -1;
                        var assignmentsById = void 0;
                        if (tracker)
                            assignmentsById = tracker.assignmentsById;
                        while (subObjectPrefixIndex !== -1) {
                            okey = bkey.substring(lastSubObjectPrefixIndex + 1, subObjectPrefixIndex);
                            var sbkey = bkey.substring(0, subObjectPrefixIndex);
                            if (config && config.bindingTypes && config.bindingTypes[sbkey] && config.bindingTypes[sbkey] === 'uniqueArray') {
                                if (!obj[okey])
                                    obj[okey] = [];
                                if (!tracker.objectsById[sbkey])
                                    tracker.objectsById[sbkey] = {};
                                var tmp = void 0;
                                if (!tracker.objectsById[sbkey][bindings[sbkey].value]) {
                                    tmp = config.bindingConverters[sbkey](bindings[sbkey], bindings);
                                    tracker.objectsById[sbkey][bindings[sbkey].value] = tmp;
                                }
                                else
                                    tmp = tracker.objectsById[sbkey][bindings[sbkey].value];
                                if (!assignmentsById[sbkey])
                                    assignmentsById[sbkey] = {};
                                if (!assignmentsById[sbkey][bindings[sbkey].value]) {
                                    obj[sbkey].push(tmp);
                                    assignmentsById[sbkey][bindings[sbkey].value] = {};
                                }
                                assignmentsById = assignmentsById[sbkey][bindings[sbkey].value];
                                obj = tmp;
                            }
                            else {
                                if (config && config.bindingTypes && config.bindingTypes[sbkey] && config.bindingTypes[sbkey] === 'single') {
                                    if (!tracker.objectsById[sbkey])
                                        tracker.objectsById[sbkey] = {};
                                    if (!tracker.objectsById[sbkey][bindings[sbkey].value]) {
                                        obj[okey] = config.bindingConverters[sbkey](bindings[sbkey], bindings);
                                        tracker.objectsById[sbkey][bindings[sbkey].value] = obj[okey];
                                    }
                                }
                                else if (!obj[okey])
                                    obj[okey] = config.bindingConverters[sbkey](bindings[sbkey], bindings);
                                obj = obj[okey];
                            }
                            lastSubObjectPrefixIndex = subObjectPrefixIndex;
                            subObjectPrefixIndex = bkey.indexOf('_', subObjectPrefixIndex + 1);
                        }
                        okey = bkey.substring(lastSubObjectPrefixIndex + 1);
                        var val = void 0;
                        if (tracker && config && config.bindingTypes && (config.bindingTypes[bkey] === 'single' || config.bindingTypes[bkey] === 'uniqueArray')) {
                            if (!tracker.objectsById[bkey])
                                tracker.objectsById[bkey] = {};
                            if (!tracker.objectsById[bkey][bindings[bkey].value]) {
                                if (config && config.bindingConverters && config.bindingConverters[bkey])
                                    val = config.bindingConverters[bkey](bindings[bkey], bindings);
                                else
                                    val = SparqlService.bindingToValue(bindings[bkey]);
                                tracker.objectsById[bkey][bindings[bkey].value] = val;
                            }
                            else
                                val = tracker.objectsById[bkey][bindings[bkey].value];
                        }
                        else if (config && config.bindingConverters && config.bindingConverters[bkey])
                            val = config.bindingConverters[bkey](bindings[bkey], bindings);
                        else if (!config || !config.bindingTypes || !config.bindingTypes[bkey] || (config.bindingTypes[bkey] !== 'hash' && config.bindingTypes[bkey] !== 'ignore'))
                            val = SparqlService.bindingToValue(bindings[bkey]);
                        if (config && config.bindingTypes && config.bindingTypes[bkey]) {
                            switch (config.bindingTypes[bkey]) {
                                case 'ignore': break;
                                case 'single':
                                    obj[okey] = val;
                                    break;
                                case 'array':
                                    if (!Array.isArray(obj[okey]))
                                        obj[okey] = [];
                                    obj[okey].push(val);
                                    break;
                                case 'hash':
                                    if (!obj[okey])
                                        obj[okey] = {};
                                    if (val)
                                        obj[okey][bindings[bkey].value] = val;
                                    else if (bindings[bkey].type === 'literal') {
                                        var key2 = bindings[bkey].datatype;
                                        if (!key2) {
                                            key2 = bindings[bkey]['xml:lang'];
                                            if (!key2)
                                                key2 = '';
                                        }
                                        obj[okey][key2] = bindings[bkey].value;
                                    }
                                    else
                                        obj[okey][bindings[bkey].value] = bindings[bkey].value;
                                    break;
                                default:
                                    if (!obj[okey])
                                        obj[okey] = [];
                                    if (!assignmentsById[bkey])
                                        assignmentsById[bkey] = {};
                                    if (!assignmentsById[bkey][bindings[bkey].value]) {
                                        assignmentsById[bkey][bindings[bkey].value] = val;
                                        obj[okey].push(val);
                                    }
                            }
                        }
                        else if (Array.isArray(obj[okey]))
                            obj[okey].push(val);
                        else if (obj[okey] !== null && typeof (obj[okey]) === 'object' && bindings[bkey]) {
                            if (bindings[bkey].type === 'literal') {
                                var key2 = bindings[bkey].datatype;
                                if (!key2) {
                                    key2 = bindings[bkey]['xml:lang'];
                                    if (!key2)
                                        key2 = '';
                                }
                                if (config && config.bindingConverters && config.bindingConverters[bkey])
                                    obj[okey][key2] = config.bindingConverters[bkey](bindings[bkey], bindings);
                                else
                                    obj[okey][key2] = bindings[bkey].value;
                            }
                            else if (config && config.bindingConverters && config.bindingConverters[bkey])
                                obj[okey][bindings[bkey].value] = config.bindingConverters[bkey](bindings[bkey], bindings);
                            else
                                obj[okey][bindings[bkey].value] = bindings[bkey].value;
                        }
                        else
                            obj[okey] = val;
                    }
                    return ret;
                };
                SparqlService.bindingToValue = function (binding) {
                    if (!binding)
                        return undefined;
                    if (binding.type === 'uri')
                        return binding.value;
                    else if (binding.type === 'bnode')
                        return binding.value;
                    else if (binding.datatype)
                        switch (binding.datatype) {
                            case 'http://www.w3.org/2001/XMLSchema#integer':
                            case 'http://www.w3.org/2001/XMLSchema#decimal': return parseInt(binding.value, 10);
                            case 'http://www.w3.org/2001/XMLSchema#float':
                            case 'http://www.w3.org/2001/XMLSchema#double': return parseFloat(binding.value);
                            case 'http://www.w3.org/2001/XMLSchema#boolean': return binding.value ? true : false;
                            default:
                        }
                    return binding.value;
                };
                SparqlService.bindingToString = function (binding) {
                    if (!binding)
                        return 'UNDEF';
                    else {
                        var value = binding.value.replace(/\\/g, '\\\\').replace(/\t/g, '\\t').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/[\b]/g, '\\b').replace(/\f/g, '\\f').replace(/\"/g, '\\"').replace(/\'/g, '\\\'');
                        if (binding.type === 'uri')
                            return '<' + value + '>';
                        else if (binding.type === 'bnode')
                            return '_:' + value;
                        else if (binding.datatype)
                            switch (binding.datatype) {
                                case 'http://www.w3.org/2001/XMLSchema#integer':
                                case 'http://www.w3.org/2001/XMLSchema#decimal':
                                case 'http://www.w3.org/2001/XMLSchema#double':
                                case 'http://www.w3.org/2001/XMLSchema#boolean': return value;
                                case 'http://www.w3.org/2001/XMLSchema#string': return '"' + value + '"';
                                default: return '"' + value + '"^^<' + binding.datatype + '>';
                            }
                        else if (binding['xml:lang'])
                            return '"' + value + '"@' + binding['xml:lang'];
                        else
                            return '"' + value + '"';
                    }
                };
                SparqlService.prototype.check = function (endpoint, params) {
                    var deferred = this.$q.defer();
                    this.$http(angular.extend({
                        method: 'GET',
                        url: endpoint,
                        params: { query: 'ASK {}' },
                        headers: { 'Accept': 'application/sparql-results+json' }
                    }, params)).then(function (response) { return deferred.resolve(response.data.boolean === true); }, function (response) { return deferred.resolve(false); });
                    return deferred.promise;
                };
                SparqlService.prototype.checkUpdate = function (endpoint, params) {
                    var deferred = this.$q.defer();
                    this.$http(angular.extend({
                        method: 'POST',
                        url: endpoint,
                        headers: { 'Content-Type': 'application/sparql-update' },
                        data: 'INSERT DATA {}'
                    }, params)).then(function (response) { return deferred.resolve(response.status === 204); }, function (response) { return deferred.resolve(false); });
                    return deferred.promise;
                };
                SparqlService.prototype.checkRest = function (endpoint, params) {
                    var deferred = this.$q.defer();
                    this.$http(angular.extend({
                        method: 'POST',
                        url: endpoint + '?default',
                        data: '',
                        headers: { 'Content-Type': 'text/turtle' }
                    }, params)).then(function (response) { return deferred.resolve(response.status === 204); }, function (response) { return deferred.resolve(false); });
                    return deferred.promise;
                };
                SparqlService.prototype.get = function (endpoint, graphIRI, params) {
                    return this.$http(angular.extend({
                        method: 'GET',
                        url: endpoint,
                        params: graphIRI ? { graph: graphIRI } : { 'default': '' },
                        headers: { 'Accept': 'text/turtle' }
                    }, params));
                };
                SparqlService.prototype.post = function (endpoint, graph, graphIRI, params) {
                    return this.$http(angular.extend({
                        method: 'POST',
                        url: endpoint,
                        params: graphIRI ? { graph: graphIRI } : { 'default': '' },
                        data: graph,
                        headers: { 'Content-Type': 'text/turtle' }
                    }, params));
                };
                SparqlService.prototype.put = function (endpoint, graph, graphIRI, params) {
                    return this.$http(angular.extend({
                        method: 'PUT',
                        url: endpoint,
                        params: graphIRI ? { graph: graphIRI } : { 'default': '' },
                        data: graph,
                        headers: { 'Content-Type': 'text/turtle' }
                    }, params));
                };
                SparqlService.prototype.delete = function (endpoint, graphIRI, params) {
                    return this.$http(angular.extend({
                        method: 'DELETE',
                        url: endpoint,
                        params: graphIRI ? { graph: graphIRI } : { 'default': '' }
                    }, params));
                };
                SparqlService.prototype.query = function (endpoint, query, params) {
                    if (query.length <= 2048)
                        return this.$http(angular.extend({
                            method: 'GET',
                            url: endpoint,
                            params: { query: query },
                            headers: { 'Accept': 'application/sparql-results+json' }
                        }, params));
                    else
                        return this.$http(angular.extend({
                            method: 'POST',
                            url: endpoint,
                            data: 'query=' + encodeURIComponent(query),
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                                'Accept': 'application/sparql-results+json'
                            }
                        }, params));
                };
                SparqlService.prototype.construct = function (endpoint, query, params) {
                    if (query.length <= 2048)
                        return this.$http(angular.extend({
                            method: 'GET',
                            url: endpoint,
                            params: { query: query },
                            headers: { 'Accept': 'text/turtle' }
                        }, params));
                    else
                        return this.$http(angular.extend({
                            method: 'POST',
                            url: endpoint,
                            data: query,
                            headers: {
                                'Content-Type': 'application/sparql-query',
                                'Accept': 'text/turtle'
                            }
                        }, params));
                };
                SparqlService.prototype.update = function (endpoint, query, params) {
                    return this.$http(angular.extend({
                        method: 'POST',
                        url: endpoint,
                        headers: { 'Content-Type': 'application/sparql-update' },
                        data: query
                    }, params));
                };
                return SparqlService;
            }());/*<auto_generate>*/angular.module('fi.seco.sparql').service('sparqlService',SparqlService);/*</auto_generate>*/
            sparql.SparqlService = SparqlService;
        })(sparql = seco.sparql || (seco.sparql = {}));
    })(seco = fi.seco || (fi.seco = {}));
})(fi || (fi = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zcGFycWwtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQyxDQUFBO0FBQ3BDLElBQVUsRUFBRSxDQXVXWDtBQXZXRCxXQUFVLEVBQUU7SUFBQyxJQUFBLElBQUksQ0F1V2hCO0lBdldZLFdBQUEsSUFBSTtRQUFDLElBQUEsTUFBTSxDQXVXdkI7UUF2V2lCLFdBQUEsTUFBTTtZQUN0QixZQUFZLENBQUE7WUE0Qlo7Z0JBQUE7b0JBQ1MsZ0JBQVcsR0FBd0IsRUFBRSxDQUFBO29CQUNyQyxvQkFBZSxHQUF3QixFQUFFLENBQUE7Z0JBQ2xELENBQUM7Z0JBQUQsMEJBQUM7WUFBRCxDQUhBLEFBR0MsSUFBQTtZQUhZLDBCQUFtQixzQkFHL0IsQ0FBQTtZQUVEO2dCQWlKRSx1QkFBb0IsS0FBMkIsRUFBVSxFQUFxQjtvQkFBMUQsVUFBSyxHQUFMLEtBQUssQ0FBc0I7b0JBQVUsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7Z0JBQUcsQ0FBQztnQkFoSnBFLGtDQUFvQixHQUFsQyxVQUFtQyxNQUFNO29CQUN2QyxNQUFNLENBQUMsR0FBRyxHQUFHLE1BQU07eUJBQ2hCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDO3lCQUN0QixPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQzt5QkFDcEIsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUM7eUJBQ3JCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDO3lCQUNyQixPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQzt5QkFDckIsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUM7MEJBQ3BCLEdBQUcsQ0FBQTtnQkFDVCxDQUFDO2dCQUNhLDhCQUFnQixHQUE5QixVQUFrQyxRQUF3QyxFQUFFLEdBQVksRUFBRSxNQUF1QyxFQUFFLE9BQTZCO29CQUFwRixvQkFBQSxFQUFBLFFBQVk7b0JB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O1FBQ0gsQ0FBQyxFQXZXaUIsTUFBTSxHQUFOLFdBQU0sS0FBTixXQUFNLFFBdVd2QjtJQUFELENBQUMsRUF2V1ksSUFBSSxHQUFKLE9BQUksS0FBSixPQUFJLFFBdVdoQjtBQUFELENBQUMsRUF2V1MsRUFBRSxLQUFGLEVBQUUsUUF1V1giLCJmaWxlIjoic3BhcnFsLXNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnZmkuc2Vjby5zcGFycWwnLCBbXSlcbm5hbWVzcGFjZSBmaS5zZWNvLnNwYXJxbCB7XG4gICd1c2Ugc3RyaWN0J1xuXG4gIGV4cG9ydCBpbnRlcmZhY2UgSVNwYXJxbEJpbmRpbmcge1xuICAgIHR5cGU6ICd1cmknIHwgJ2Jub2RlJyB8ICdsaXRlcmFsJyxcbiAgICB2YWx1ZTogc3RyaW5nLFxuICAgICd4bWw6bGFuZyc/OiBzdHJpbmcsXG4gICAgZGF0YXR5cGU/OiBzdHJpbmdcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgSVNwYXJxbEJpbmRpbmdSZXN1bHQ8QmluZGluZ1R5cGUgZXh0ZW5kcyB7W2lkOiBzdHJpbmddOiBJU3BhcnFsQmluZGluZ30+IHtcbiAgICBoZWFkOiB7XG4gICAgICB2YXJzOiBzdHJpbmdbXSxcbiAgICAgIGxpbms/OiBzdHJpbmdbXVxuICAgIH0sXG4gICAgcmVzdWx0czoge1xuICAgICAgYmluZGluZ3M6IEJpbmRpbmdUeXBlW11cbiAgICB9XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIElTcGFycWxBc2tSZXN1bHQge1xuICAgIGJvb2xlYW46IGJvb2xlYW5cbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgSUJpbmRpbmdzVG9PYmplY3RDb25maWd1cmF0aW9uIHtcbiAgICBiaW5kaW5nVHlwZXM/OiB7W3Zhcm5hbWU6IHN0cmluZ106ICdpZ25vcmUnIHwgJ3NpbmdsZScgfCAnYXJyYXknIHwgJ3VuaXF1ZUFycmF5JyB8ICdoYXNoJ31cbiAgICBiaW5kaW5nQ29udmVydGVycz86IHtbdmFybmFtZTogc3RyaW5nXTogKGJpbmRpbmc6IElTcGFycWxCaW5kaW5nLCBiaW5kaW5nczoge1tpZDogc3RyaW5nXTogSVNwYXJxbEJpbmRpbmd9KSA9PiBhbnkgfVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIFVuaXF1ZU9iamVjdFRyYWNrZXIge1xuICAgIHB1YmxpYyBvYmplY3RzQnlJZD86IHtbaWQ6IHN0cmluZ106IHt9fSA9IHt9XG4gICAgcHVibGljIGFzc2lnbm1lbnRzQnlJZD86IHtbaWQ6IHN0cmluZ106IHt9fSA9IHt9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgU3BhcnFsU2VydmljZSB7XG4gICAgcHVibGljIHN0YXRpYyBzdHJpbmdUb1NQQVJRTFN0cmluZyhzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgcmV0dXJuICdcIicgKyBzdHJpbmdcbiAgICAgICAgLnJlcGxhY2UoL1xcXFwvZywgJ1xcXFxcXFxcJylcbiAgICAgICAgLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKVxuICAgICAgICAucmVwbGFjZSgvXFxuL2csICdcXFxcbicpXG4gICAgICAgIC5yZXBsYWNlKC9cXHQvZywgJ1xcXFx0JylcbiAgICAgICAgLnJlcGxhY2UoL1xcci9nLCAnXFxcXHInKVxuICAgICAgICAucmVwbGFjZSgvXFxmL2csICdcXFxcZicpXG4gICAgICAgICsgJ1wiJ1xuICAgIH1cbiAgICBwdWJsaWMgc3RhdGljIGJpbmRpbmdzVG9PYmplY3Q8VD4oYmluZGluZ3M6IHtbaWQ6IHN0cmluZ106IElTcGFycWxCaW5kaW5nfSwgcmV0OiB7fSA9IHt9LCBjb25maWc/OiBJQmluZGluZ3NUb09iamVjdENvbmZpZ3VyYXRpb24sIHRyYWNrZXI/OiBVbmlxdWVPYmplY3RUcmFja2VyKTogVCB7XG4gICAgICBmb3IgKGxldCBia2V5IGluIGJpbmRpbmdzKSB7XG4gICAgICAgIGxldCBva2V5OiBzdHJpbmcgPSBia2V5XG4gICAgICAgIGxldCBvYmo6IHt9ID0gcmV0XG4gICAgICAgIGxldCBzdWJPYmplY3RQcmVmaXhJbmRleDogbnVtYmVyID0gb2tleS5pbmRleE9mKCdfJylcbiAgICAgICAgbGV0IGxhc3RTdWJPYmplY3RQcmVmaXhJbmRleDogbnVtYmVyID0gLTFcbiAgICAgICAgbGV0IGFzc2lnbm1lbnRzQnlJZDoge1tpZDogc3RyaW5nXToge319XG4gICAgICAgIGlmICh0cmFja2VyKSBhc3NpZ25tZW50c0J5SWQgPSB0cmFja2VyLmFzc2lnbm1lbnRzQnlJZFxuICAgICAgICB3aGlsZSAoc3ViT2JqZWN0UHJlZml4SW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgb2tleSA9IGJrZXkuc3Vic3RyaW5nKGxhc3RTdWJPYmplY3RQcmVmaXhJbmRleCArIDEsIHN1Yk9iamVjdFByZWZpeEluZGV4KVxuICAgICAgICAgIGxldCBzYmtleTogc3RyaW5nID0gYmtleS5zdWJzdHJpbmcoMCwgc3ViT2JqZWN0UHJlZml4SW5kZXgpXG4gICAgICAgICAgaWYgKGNvbmZpZyAmJiBjb25maWcuYmluZGluZ1R5cGVzICYmIGNvbmZpZy5iaW5kaW5nVHlwZXNbc2JrZXldICYmIGNvbmZpZy5iaW5kaW5nVHlwZXNbc2JrZXldID09PSAndW5pcXVlQXJyYXknKSB7XG4gICAgICAgICAgICBpZiAoIW9ialtva2V5XSkgb2JqW29rZXldID0gW11cbiAgICAgICAgICAgIGlmICghdHJhY2tlci5vYmplY3RzQnlJZFtzYmtleV0pIHRyYWNrZXIub2JqZWN0c0J5SWRbc2JrZXldID0ge31cbiAgICAgICAgICAgIGxldCB0bXA6IGFueVxuICAgICAgICAgICAgaWYgKCF0cmFja2VyLm9iamVjdHNCeUlkW3Nia2V5XVtiaW5kaW5nc1tzYmtleV0udmFsdWVdKSB7XG4gICAgICAgICAgICAgIHRtcCA9IGNvbmZpZy5iaW5kaW5nQ29udmVydGVyc1tzYmtleV0oYmluZGluZ3Nbc2JrZXldLCBiaW5kaW5ncylcbiAgICAgICAgICAgICAgdHJhY2tlci5vYmplY3RzQnlJZFtzYmtleV1bYmluZGluZ3Nbc2JrZXldLnZhbHVlXSA9IHRtcFxuICAgICAgICAgICAgfSBlbHNlIHRtcCA9IHRyYWNrZXIub2JqZWN0c0J5SWRbc2JrZXldW2JpbmRpbmdzW3Nia2V5XS52YWx1ZV1cbiAgICAgICAgICAgIGlmICghYXNzaWdubWVudHNCeUlkW3Nia2V5XSkgYXNzaWdubWVudHNCeUlkW3Nia2V5XSA9IHt9XG4gICAgICAgICAgICBpZiAoIWFzc2lnbm1lbnRzQnlJZFtzYmtleV1bYmluZGluZ3Nbc2JrZXldLnZhbHVlXSkge1xuICAgICAgICAgICAgICBvYmpbc2JrZXldLnB1c2godG1wKVxuICAgICAgICAgICAgICBhc3NpZ25tZW50c0J5SWRbc2JrZXldW2JpbmRpbmdzW3Nia2V5XS52YWx1ZV0gPSB7fVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXNzaWdubWVudHNCeUlkID0gYXNzaWdubWVudHNCeUlkW3Nia2V5XVtiaW5kaW5nc1tzYmtleV0udmFsdWVdXG4gICAgICAgICAgICBvYmogPSB0bXBcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGNvbmZpZyAmJiBjb25maWcuYmluZGluZ1R5cGVzICYmIGNvbmZpZy5iaW5kaW5nVHlwZXNbc2JrZXldICYmIGNvbmZpZy5iaW5kaW5nVHlwZXNbc2JrZXldID09PSAnc2luZ2xlJykge1xuICAgICAgICAgICAgICBpZiAoIXRyYWNrZXIub2JqZWN0c0J5SWRbc2JrZXldKSB0cmFja2VyLm9iamVjdHNCeUlkW3Nia2V5XSA9IHt9XG4gICAgICAgICAgICAgIGlmICghdHJhY2tlci5vYmplY3RzQnlJZFtzYmtleV1bYmluZGluZ3Nbc2JrZXldLnZhbHVlXSkge1xuICAgICAgICAgICAgICAgIG9ialtva2V5XSA9IGNvbmZpZy5iaW5kaW5nQ29udmVydGVyc1tzYmtleV0oYmluZGluZ3Nbc2JrZXldLCBiaW5kaW5ncylcbiAgICAgICAgICAgICAgICB0cmFja2VyLm9iamVjdHNCeUlkW3Nia2V5XVtiaW5kaW5nc1tzYmtleV0udmFsdWVdID0gb2JqW29rZXldXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIW9ialtva2V5XSkgb2JqW29rZXldID0gY29uZmlnLmJpbmRpbmdDb252ZXJ0ZXJzW3Nia2V5XShiaW5kaW5nc1tzYmtleV0sIGJpbmRpbmdzKVxuICAgICAgICAgICAgb2JqID0gb2JqW29rZXldXG4gICAgICAgICAgfVxuICAgICAgICAgIGxhc3RTdWJPYmplY3RQcmVmaXhJbmRleCA9IHN1Yk9iamVjdFByZWZpeEluZGV4XG4gICAgICAgICAgc3ViT2JqZWN0UHJlZml4SW5kZXggPSBia2V5LmluZGV4T2YoJ18nLCBzdWJPYmplY3RQcmVmaXhJbmRleCArIDEpXG4gICAgICAgIH1cbiAgICAgICAgb2tleSA9IGJrZXkuc3Vic3RyaW5nKGxhc3RTdWJPYmplY3RQcmVmaXhJbmRleCArIDEpXG4gICAgICAgIGxldCB2YWw6IGFueVxuICAgICAgICBpZiAodHJhY2tlciAmJiBjb25maWcgJiYgY29uZmlnLmJpbmRpbmdUeXBlcyAmJiAoY29uZmlnLmJpbmRpbmdUeXBlc1tia2V5XSA9PT0gJ3NpbmdsZScgfHwgY29uZmlnLmJpbmRpbmdUeXBlc1tia2V5XSA9PT0gJ3VuaXF1ZUFycmF5JykpIHtcbiAgICAgICAgICBpZiAoIXRyYWNrZXIub2JqZWN0c0J5SWRbYmtleV0pIHRyYWNrZXIub2JqZWN0c0J5SWRbYmtleV0gPSB7fVxuICAgICAgICAgIGlmICghdHJhY2tlci5vYmplY3RzQnlJZFtia2V5XVtiaW5kaW5nc1tia2V5XS52YWx1ZV0pIHtcbiAgICAgICAgICAgIGlmIChjb25maWcgJiYgY29uZmlnLmJpbmRpbmdDb252ZXJ0ZXJzICYmIGNvbmZpZy5iaW5kaW5nQ29udmVydGVyc1tia2V5XSlcbiAgICAgICAgICAgICAgdmFsID0gY29uZmlnLmJpbmRpbmdDb252ZXJ0ZXJzW2JrZXldKGJpbmRpbmdzW2JrZXldLCBiaW5kaW5ncylcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgdmFsID0gU3BhcnFsU2VydmljZS5iaW5kaW5nVG9WYWx1ZShiaW5kaW5nc1tia2V5XSlcbiAgICAgICAgICAgIHRyYWNrZXIub2JqZWN0c0J5SWRbYmtleV1bYmluZGluZ3NbYmtleV0udmFsdWVdID0gdmFsXG4gICAgICAgICAgfSBlbHNlIHZhbCA9IHRyYWNrZXIub2JqZWN0c0J5SWRbYmtleV1bYmluZGluZ3NbYmtleV0udmFsdWVdXG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnICYmIGNvbmZpZy5iaW5kaW5nQ29udmVydGVycyAmJiBjb25maWcuYmluZGluZ0NvbnZlcnRlcnNbYmtleV0pXG4gICAgICAgICAgICB2YWwgPSBjb25maWcuYmluZGluZ0NvbnZlcnRlcnNbYmtleV0oYmluZGluZ3NbYmtleV0sIGJpbmRpbmdzKVxuICAgICAgICBlbHNlIGlmICghY29uZmlnIHx8ICFjb25maWcuYmluZGluZ1R5cGVzIHx8ICFjb25maWcuYmluZGluZ1R5cGVzW2JrZXldIHx8IChjb25maWcuYmluZGluZ1R5cGVzW2JrZXldICE9PSAnaGFzaCcgJiYgY29uZmlnLmJpbmRpbmdUeXBlc1tia2V5XSAhPT0gJ2lnbm9yZScpKVxuICAgICAgICAgICAgdmFsID0gU3BhcnFsU2VydmljZS5iaW5kaW5nVG9WYWx1ZShiaW5kaW5nc1tia2V5XSlcbiAgICAgICAgaWYgKGNvbmZpZyAmJiBjb25maWcuYmluZGluZ1R5cGVzICYmIGNvbmZpZy5iaW5kaW5nVHlwZXNbYmtleV0pIHtcbiAgICAgICAgICBzd2l0Y2ggKGNvbmZpZy5iaW5kaW5nVHlwZXNbYmtleV0pIHtcbiAgICAgICAgICAgIGNhc2UgJ2lnbm9yZSc6IGJyZWFrXG4gICAgICAgICAgICBjYXNlICdzaW5nbGUnOiBvYmpbb2tleV0gPSB2YWw7IGJyZWFrXG4gICAgICAgICAgICBjYXNlICdhcnJheSc6XG4gICAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShvYmpbb2tleV0pKSBvYmpbb2tleV0gPSBbXVxuICAgICAgICAgICAgICBvYmpbb2tleV0ucHVzaCh2YWwpXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICdoYXNoJzpcbiAgICAgICAgICAgICAgaWYgKCFvYmpbb2tleV0pIG9ialtva2V5XSA9IHt9XG4gICAgICAgICAgICAgIGlmICh2YWwpIG9ialtva2V5XVtiaW5kaW5nc1tia2V5XS52YWx1ZV0gPSB2YWxcbiAgICAgICAgICAgICAgZWxzZSBpZiAoYmluZGluZ3NbYmtleV0udHlwZSA9PT0gJ2xpdGVyYWwnKSB7XG4gICAgICAgICAgICAgICAgbGV0IGtleTI6IHN0cmluZyA9IGJpbmRpbmdzW2JrZXldLmRhdGF0eXBlXG4gICAgICAgICAgICAgICAgaWYgKCFrZXkyKSB7XG4gICAgICAgICAgICAgICAgICBrZXkyID0gYmluZGluZ3NbYmtleV1bJ3htbDpsYW5nJ11cbiAgICAgICAgICAgICAgICAgIGlmICgha2V5Mikga2V5MiA9ICcnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9ialtva2V5XVtrZXkyXSA9IGJpbmRpbmdzW2JrZXldLnZhbHVlXG4gICAgICAgICAgICAgIH0gZWxzZSBvYmpbb2tleV1bYmluZGluZ3NbYmtleV0udmFsdWVdID0gYmluZGluZ3NbYmtleV0udmFsdWVcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGRlZmF1bHQ6IC8vIHVuaXF1ZUFycmF5XG4gICAgICAgICAgICAgIGlmICghb2JqW29rZXldKSBvYmpbb2tleV0gPSBbXVxuICAgICAgICAgICAgICBpZiAoIWFzc2lnbm1lbnRzQnlJZFtia2V5XSkgYXNzaWdubWVudHNCeUlkW2JrZXldID0ge31cbiAgICAgICAgICAgICAgaWYgKCFhc3NpZ25tZW50c0J5SWRbYmtleV1bYmluZGluZ3NbYmtleV0udmFsdWVdKSB7XG4gICAgICAgICAgICAgICAgYXNzaWdubWVudHNCeUlkW2JrZXldW2JpbmRpbmdzW2JrZXldLnZhbHVlXSA9IHZhbFxuICAgICAgICAgICAgICAgIG9ialtva2V5XS5wdXNoKHZhbClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KG9ialtva2V5XSkpIG9ialtva2V5XS5wdXNoKHZhbClcbiAgICAgICAgZWxzZSBpZiAob2JqW29rZXldICE9PSBudWxsICYmIHR5cGVvZihvYmpbb2tleV0pID09PSAnb2JqZWN0JyAmJiBiaW5kaW5nc1tia2V5XSkge1xuICAgICAgICAgIGlmIChiaW5kaW5nc1tia2V5XS50eXBlID09PSAnbGl0ZXJhbCcpIHtcbiAgICAgICAgICAgIGxldCBrZXkyOiBzdHJpbmcgPSBiaW5kaW5nc1tia2V5XS5kYXRhdHlwZVxuICAgICAgICAgICAgaWYgKCFrZXkyKSB7XG4gICAgICAgICAgICAgIGtleTIgPSBiaW5kaW5nc1tia2V5XVsneG1sOmxhbmcnXVxuICAgICAgICAgICAgICBpZiAoIWtleTIpIGtleTIgPSAnJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvbmZpZyAmJiBjb25maWcuYmluZGluZ0NvbnZlcnRlcnMgJiYgY29uZmlnLmJpbmRpbmdDb252ZXJ0ZXJzW2JrZXldKVxuICAgICAgICAgICAgICBvYmpbb2tleV1ba2V5Ml0gPSBjb25maWcuYmluZGluZ0NvbnZlcnRlcnNbYmtleV0oYmluZGluZ3NbYmtleV0sIGJpbmRpbmdzKVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICBvYmpbb2tleV1ba2V5Ml0gPSBiaW5kaW5nc1tia2V5XS52YWx1ZVxuICAgICAgICAgIH0gZWxzZSBpZiAoY29uZmlnICYmIGNvbmZpZy5iaW5kaW5nQ29udmVydGVycyAmJiBjb25maWcuYmluZGluZ0NvbnZlcnRlcnNbYmtleV0pXG4gICAgICAgICAgICBvYmpbb2tleV1bYmluZGluZ3NbYmtleV0udmFsdWVdID0gY29uZmlnLmJpbmRpbmdDb252ZXJ0ZXJzW2JrZXldKGJpbmRpbmdzW2JrZXldLCBiaW5kaW5ncylcbiAgICAgICAgICBlbHNlIG9ialtva2V5XVtiaW5kaW5nc1tia2V5XS52YWx1ZV0gPSBiaW5kaW5nc1tia2V5XS52YWx1ZVxuICAgICAgICB9XG4gICAgICAgIGVsc2Ugb2JqW29rZXldID0gdmFsXG4gICAgICB9XG4gICAgICByZXR1cm4gPFQ+cmV0XG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgYmluZGluZ1RvVmFsdWUoYmluZGluZzogSVNwYXJxbEJpbmRpbmcpOiBhbnkge1xuICAgICAgaWYgKCFiaW5kaW5nKSByZXR1cm4gdW5kZWZpbmVkXG4gICAgICBpZiAoYmluZGluZy50eXBlID09PSAndXJpJykgcmV0dXJuIGJpbmRpbmcudmFsdWVcbiAgICAgIGVsc2UgaWYgKGJpbmRpbmcudHlwZSA9PT0gJ2Jub2RlJykgcmV0dXJuIGJpbmRpbmcudmFsdWVcbiAgICAgIGVsc2UgaWYgKGJpbmRpbmcuZGF0YXR5cGUpIHN3aXRjaCAoYmluZGluZy5kYXRhdHlwZSkge1xuICAgICAgICBjYXNlICdodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYSNpbnRlZ2VyJzpcbiAgICAgICAgY2FzZSAnaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEjZGVjaW1hbCc6IHJldHVybiBwYXJzZUludChiaW5kaW5nLnZhbHVlLCAxMClcbiAgICAgICAgY2FzZSAnaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEjZmxvYXQnOlxuICAgICAgICBjYXNlICdodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYSNkb3VibGUnOiByZXR1cm4gcGFyc2VGbG9hdChiaW5kaW5nLnZhbHVlKVxuICAgICAgICBjYXNlICdodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYSNib29sZWFuJzogcmV0dXJuIGJpbmRpbmcudmFsdWUgPyB0cnVlIDogZmFsc2VcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgIH1cbiAgICAgIHJldHVybiBiaW5kaW5nLnZhbHVlXG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgYmluZGluZ1RvU3RyaW5nKGJpbmRpbmc6IElTcGFycWxCaW5kaW5nKTogc3RyaW5nIHtcbiAgICAgIGlmICghYmluZGluZykgcmV0dXJuICdVTkRFRidcbiAgICAgIGVsc2Uge1xuICAgICAgICBsZXQgdmFsdWU6IHN0cmluZyA9IGJpbmRpbmcudmFsdWUucmVwbGFjZSgvXFxcXC9nLCAnXFxcXFxcXFwnKS5yZXBsYWNlKC9cXHQvZywgJ1xcXFx0JykucmVwbGFjZSgvXFxuL2csICdcXFxcbicpLnJlcGxhY2UoL1xcci9nLCAnXFxcXHInKS5yZXBsYWNlKC9bXFxiXS9nLCAnXFxcXGInKS5yZXBsYWNlKC9cXGYvZywgJ1xcXFxmJykucmVwbGFjZSgvXFxcIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFwnL2csICdcXFxcXFwnJylcbiAgICAgICAgaWYgKGJpbmRpbmcudHlwZSA9PT0gJ3VyaScpIHJldHVybiAnPCcgKyB2YWx1ZSArICc+J1xuICAgICAgICBlbHNlIGlmIChiaW5kaW5nLnR5cGUgPT09ICdibm9kZScpIHJldHVybiAnXzonICsgdmFsdWVcbiAgICAgICAgZWxzZSBpZiAoYmluZGluZy5kYXRhdHlwZSkgc3dpdGNoIChiaW5kaW5nLmRhdGF0eXBlKSB7XG4gICAgICAgICAgY2FzZSAnaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEjaW50ZWdlcic6XG4gICAgICAgICAgY2FzZSAnaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEjZGVjaW1hbCc6XG4gICAgICAgICAgY2FzZSAnaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEjZG91YmxlJzpcbiAgICAgICAgICBjYXNlICdodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYSNib29sZWFuJzogcmV0dXJuIHZhbHVlXG4gICAgICAgICAgY2FzZSAnaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEjc3RyaW5nJzogcmV0dXJuICdcIicgKyB2YWx1ZSArICdcIidcbiAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gJ1wiJyArIHZhbHVlICsgJ1wiXl48JyArIGJpbmRpbmcuZGF0YXR5cGUgKyAnPidcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChiaW5kaW5nWyd4bWw6bGFuZyddKSByZXR1cm4gJ1wiJyArIHZhbHVlICsgJ1wiQCcgKyBiaW5kaW5nWyd4bWw6bGFuZyddXG4gICAgICAgIGVsc2UgcmV0dXJuICdcIicgKyB2YWx1ZSArICdcIidcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkaHR0cDogYW5ndWxhci5JSHR0cFNlcnZpY2UsIHByaXZhdGUgJHE6IGFuZ3VsYXIuSVFTZXJ2aWNlKSB7fVxuICAgIHB1YmxpYyBjaGVjayhlbmRwb2ludDogc3RyaW5nLCBwYXJhbXM/OiB7fSk6IGFuZ3VsYXIuSVByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgbGV0IGRlZmVycmVkOiBhbmd1bGFyLklEZWZlcnJlZDxhbnk+ID0gdGhpcy4kcS5kZWZlcigpXG4gICAgICB0aGlzLiRodHRwKFxuICAgICAgICBhbmd1bGFyLmV4dGVuZChcbiAgICAgICAgICB7XG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgdXJsOiBlbmRwb2ludCxcbiAgICAgICAgICAgIHBhcmFtczogeyBxdWVyeTogJ0FTSyB7fScgfSxcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9zcGFycWwtcmVzdWx0cytqc29uJyB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBwYXJhbXNcbiAgICAgICAgKVxuICAgICAgKS50aGVuKFxuICAgICAgICAocmVzcG9uc2U6IGFuZ3VsYXIuSUh0dHBQcm9taXNlQ2FsbGJhY2tBcmc8SVNwYXJxbEFza1Jlc3VsdD4pID0+IGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UuZGF0YS5ib29sZWFuID09PSB0cnVlKVxuICAgICAgLCAocmVzcG9uc2U6IGFuZ3VsYXIuSUh0dHBQcm9taXNlQ2FsbGJhY2tBcmc8c3RyaW5nPikgPT4gZGVmZXJyZWQucmVzb2x2ZShmYWxzZSlcbiAgICAgIClcbiAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgIH1cbiAgICBwdWJsaWMgY2hlY2tVcGRhdGUoZW5kcG9pbnQ6IHN0cmluZywgcGFyYW1zPzoge30pOiBhbmd1bGFyLklQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgIGxldCBkZWZlcnJlZDogYW5ndWxhci5JRGVmZXJyZWQ8YW55PiA9IHRoaXMuJHEuZGVmZXIoKVxuICAgICAgdGhpcy4kaHR0cChcbiAgICAgICAgYW5ndWxhci5leHRlbmQoXG4gICAgICAgICAge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICB1cmw6IGVuZHBvaW50LFxuICAgICAgICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJyA6ICdhcHBsaWNhdGlvbi9zcGFycWwtdXBkYXRlJyB9LFxuICAgICAgICAgICAgZGF0YTogJ0lOU0VSVCBEQVRBIHt9J1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcGFyYW1zXG4gICAgICAgIClcbiAgICAgICkudGhlbihcbiAgICAgICAgKHJlc3BvbnNlOiBhbmd1bGFyLklIdHRwUHJvbWlzZUNhbGxiYWNrQXJnPHN0cmluZz4pID0+IGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2Uuc3RhdHVzID09PSAyMDQpXG4gICAgICAsIChyZXNwb25zZTogYW5ndWxhci5JSHR0cFByb21pc2VDYWxsYmFja0FyZzxzdHJpbmc+KSA9PiBkZWZlcnJlZC5yZXNvbHZlKGZhbHNlKVxuICAgICAgKVxuICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgfVxuICAgIHB1YmxpYyBjaGVja1Jlc3QoZW5kcG9pbnQ6IHN0cmluZywgcGFyYW1zPzoge30pOiBhbmd1bGFyLklQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgIGxldCBkZWZlcnJlZDogYW5ndWxhci5JRGVmZXJyZWQ8YW55PiA9IHRoaXMuJHEuZGVmZXIoKVxuICAgICAgdGhpcy4kaHR0cChcbiAgICAgICAgYW5ndWxhci5leHRlbmQoXG4gICAgICAgICAge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICB1cmwgOiBlbmRwb2ludCArICc/ZGVmYXVsdCcsXG4gICAgICAgICAgICBkYXRhIDogJycsXG4gICAgICAgICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnIDogJ3RleHQvdHVydGxlJyB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBwYXJhbXNcbiAgICAgICAgKVxuICAgICAgKS50aGVuKFxuICAgICAgICAocmVzcG9uc2U6IGFuZ3VsYXIuSUh0dHBQcm9taXNlQ2FsbGJhY2tBcmc8c3RyaW5nPikgPT4gZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZS5zdGF0dXMgPT09IDIwNClcbiAgICAgICwgKHJlc3BvbnNlOiBhbmd1bGFyLklIdHRwUHJvbWlzZUNhbGxiYWNrQXJnPHN0cmluZz4pID0+IGRlZmVycmVkLnJlc29sdmUoZmFsc2UpXG4gICAgICApXG4gICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICB9XG4gICAgcHVibGljIGdldDxUPihlbmRwb2ludDogc3RyaW5nLCBncmFwaElSST86IHN0cmluZywgcGFyYW1zPzoge30pOiBhbmd1bGFyLklIdHRwUHJvbWlzZTxUPiB7XG4gICAgICByZXR1cm4gdGhpcy4kaHR0cChcbiAgICAgICAgYW5ndWxhci5leHRlbmQoXG4gICAgICAgICAge1xuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIHVybCA6IGVuZHBvaW50LFxuICAgICAgICAgICAgcGFyYW1zOiBncmFwaElSSSA/IHsgZ3JhcGg6IGdyYXBoSVJJIH0gOiB7J2RlZmF1bHQnOiAnJ30sXG4gICAgICAgICAgICBoZWFkZXJzOiB7ICdBY2NlcHQnIDogJ3RleHQvdHVydGxlJyB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBwYXJhbXNcbiAgICAgICAgKVxuICAgICAgKVxuICAgIH1cbiAgICBwdWJsaWMgcG9zdDxUPihlbmRwb2ludDogc3RyaW5nLCBncmFwaDogc3RyaW5nLCBncmFwaElSST86IHN0cmluZywgcGFyYW1zPzoge30pOiBhbmd1bGFyLklIdHRwUHJvbWlzZTxUPiB7XG4gICAgICByZXR1cm4gdGhpcy4kaHR0cChcbiAgICAgICAgYW5ndWxhci5leHRlbmQoXG4gICAgICAgICAge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICB1cmwgOiBlbmRwb2ludCxcbiAgICAgICAgICAgIHBhcmFtczogZ3JhcGhJUkkgPyB7IGdyYXBoOiBncmFwaElSSSB9IDogeydkZWZhdWx0JzogJyd9LFxuICAgICAgICAgICAgZGF0YTogZ3JhcGgsXG4gICAgICAgICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnIDogJ3RleHQvdHVydGxlJyB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBwYXJhbXNcbiAgICAgICAgKVxuICAgICAgKVxuICAgIH1cbiAgICBwdWJsaWMgcHV0PFQ+KGVuZHBvaW50OiBzdHJpbmcsIGdyYXBoOiBzdHJpbmcsIGdyYXBoSVJJPzogc3RyaW5nLCBwYXJhbXM/OiB7fSk6IGFuZ3VsYXIuSUh0dHBQcm9taXNlPFQ+IHtcbiAgICAgIHJldHVybiB0aGlzLiRodHRwKFxuICAgICAgICBhbmd1bGFyLmV4dGVuZChcbiAgICAgICAgICB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgICAgICAgdXJsIDogZW5kcG9pbnQsXG4gICAgICAgICAgICBwYXJhbXM6IGdyYXBoSVJJID8geyBncmFwaDogZ3JhcGhJUkkgfSA6IHsnZGVmYXVsdCc6ICcnfSxcbiAgICAgICAgICAgIGRhdGE6IGdyYXBoLFxuICAgICAgICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJyA6ICd0ZXh0L3R1cnRsZScgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgcGFyYW1zXG4gICAgICAgIClcbiAgICAgIClcbiAgICB9XG4gICAgcHVibGljIGRlbGV0ZTxUPihlbmRwb2ludDogc3RyaW5nLCBncmFwaElSSTogc3RyaW5nLCBwYXJhbXM/OiB7fSk6IGFuZ3VsYXIuSUh0dHBQcm9taXNlPFQ+IHtcbiAgICAgIHJldHVybiB0aGlzLiRodHRwKFxuICAgICAgICBhbmd1bGFyLmV4dGVuZChcbiAgICAgICAgICB7XG4gICAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICAgICAgdXJsOiBlbmRwb2ludCxcbiAgICAgICAgICAgIHBhcmFtczogZ3JhcGhJUkkgPyB7IGdyYXBoOiBncmFwaElSSSB9IDogeydkZWZhdWx0JzogJyd9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBwYXJhbXNcbiAgICAgICAgKVxuICAgICAgKVxuICAgIH1cbiAgICBwdWJsaWMgcXVlcnk8VCBleHRlbmRzIHtbaWQ6IHN0cmluZ106IElTcGFycWxCaW5kaW5nfT4oZW5kcG9pbnQ6IHN0cmluZywgcXVlcnk6IHN0cmluZywgcGFyYW1zPzoge30pOiBhbmd1bGFyLklIdHRwUHJvbWlzZTxJU3BhcnFsQmluZGluZ1Jlc3VsdDxUPj4ge1xuICAgICAgaWYgKHF1ZXJ5Lmxlbmd0aCA8PSAyMDQ4KVxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cChcbiAgICAgICAgICBhbmd1bGFyLmV4dGVuZChcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgICAgdXJsOiBlbmRwb2ludCxcbiAgICAgICAgICAgICAgcGFyYW1zOiB7IHF1ZXJ5OiBxdWVyeSB9LFxuICAgICAgICAgICAgICBoZWFkZXJzOiB7ICdBY2NlcHQnIDogJ2FwcGxpY2F0aW9uL3NwYXJxbC1yZXN1bHRzK2pzb24nIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYXJhbXNcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoXG4gICAgICAgICAgYW5ndWxhci5leHRlbmQoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICB1cmw6IGVuZHBvaW50LFxuICAgICAgICAgICAgICBkYXRhOiAncXVlcnk9JyArIGVuY29kZVVSSUNvbXBvbmVudChxdWVyeSksXG4gICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXG4gICAgICAgICAgICAgICAgJ0FjY2VwdCcgOiAnYXBwbGljYXRpb24vc3BhcnFsLXJlc3VsdHMranNvbidcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBhcmFtc1xuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgIH1cbiAgICBwdWJsaWMgY29uc3RydWN0PFQ+KGVuZHBvaW50OiBzdHJpbmcsIHF1ZXJ5OiBzdHJpbmcsIHBhcmFtcz86IHt9KTogYW5ndWxhci5JSHR0cFByb21pc2U8VD4ge1xuICAgICAgaWYgKHF1ZXJ5Lmxlbmd0aCA8PSAyMDQ4KVxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cChcbiAgICAgICAgICBhbmd1bGFyLmV4dGVuZChcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgICAgdXJsIDogZW5kcG9pbnQsXG4gICAgICAgICAgICAgIHBhcmFtczogeyBxdWVyeTogcXVlcnkgfSxcbiAgICAgICAgICAgICAgaGVhZGVyczogeyAnQWNjZXB0JyA6ICd0ZXh0L3R1cnRsZScgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBhcmFtc1xuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgZWxzZVxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cChcbiAgICAgICAgICBhbmd1bGFyLmV4dGVuZChcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgIHVybDogZW5kcG9pbnQsXG4gICAgICAgICAgICAgIGRhdGE6IHF1ZXJ5LFxuICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9zcGFycWwtcXVlcnknLFxuICAgICAgICAgICAgICAgICdBY2NlcHQnIDogJ3RleHQvdHVydGxlJ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGFyYW1zXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgfVxuICAgIHB1YmxpYyB1cGRhdGU8VD4oZW5kcG9pbnQ6IHN0cmluZywgcXVlcnk6IHN0cmluZywgcGFyYW1zPzoge30pOiBhbmd1bGFyLklIdHRwUHJvbWlzZTxUPiB7XG4gICAgICByZXR1cm4gdGhpcy4kaHR0cChcbiAgICAgICAgYW5ndWxhci5leHRlbmQoXG4gICAgICAgICAge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICB1cmw6IGVuZHBvaW50LFxuICAgICAgICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJyA6ICdhcHBsaWNhdGlvbi9zcGFycWwtdXBkYXRlJyB9LFxuICAgICAgICAgICAgZGF0YTogcXVlcnlcbiAgICAgICAgICB9LFxuICAgICAgICAgIHBhcmFtc1xuICAgICAgICApXG4gICAgICApXG4gICAgfVxuICB9XG59XG4iXX0=
