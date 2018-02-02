webpackJsonp([1],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = angular;

/***/ }),

/***/ 581:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _angular = __webpack_require__(0);

var angular = _interopRequireWildcard(_angular);

var _workerWorkerService = __webpack_require__(582);

var _projectWorkerService = __webpack_require__(583);

var _fibraSparqlService = __webpack_require__(215);

var _sparqlItemService = __webpack_require__(30);

var _sparqlUpdateService = __webpack_require__(584);

var _sparqlAutocompleteService = __webpack_require__(73);

__webpack_require__(74);

__webpack_require__(71);

__webpack_require__(155);

__webpack_require__(216);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// Register modules
var m = angular.module('fibra', ['fi.seco.sparql', 'http-auth-interceptor', 'fibra.services.serialization-service', 'fibra.services.sparql-statistics-service']);
m.config(['$provide', function ($provide) {
    $provide.service('fibraSparqlService', _fibraSparqlService.FibraSparqlService);
    $provide.service('projectWorkerService', _projectWorkerService.ProjectWorkerService);
    $provide.service('stateWorkerService', _workerWorkerService.StateWorkerService);
    $provide.service('workerWorkerService', _workerWorkerService.WorkerWorkerService);
    $provide.service('sparqlItemWorkerService', _sparqlItemService.SparqlItemWorkerService);
    $provide.service('sparqlUpdateWorkerService', _sparqlUpdateService.SparqlUpdateWorkerService);
    $provide.service('sparqlAutocompleteWorkerService', _sparqlAutocompleteService.SparqlAutocompleteWorkerService);
}]);
// if we get a loginRequired event, broadcast it to the UI thread
m.run(['$rootScope', 'workerWorkerService', function ($rootScope, workerWorkerService) {
    $rootScope.$on('event:auth-loginRequired', function (rejection) {
        return workerWorkerService.$broadcast('event:auth-loginRequired', rejection);
    });
}]);
var auths = {};
m.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push(function () {
        return {
            request: function request(_request) {
                if (auths[_request.url]) _request.headers['Authorization'] = auths[_request.url];
                return _request;
            }
        };
    });
}]);
m.run(['$rootScope', 'authService', '$http', function ($rootScope, authService, $http) {
    $rootScope.$on('main:auth-loginAuthInfo', function (event, authorizations) {
        auths = authorizations;
        authService.loginConfirmed();
    });
}]);

/***/ }),

/***/ 582:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StateWorkerService = exports.WorkerWorkerService = undefined;

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _angular = __webpack_require__(0);

var angular = _interopRequireWildcard(_angular);

var _serializationService = __webpack_require__(71);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WorkerWorkerService = exports.WorkerWorkerService = function () {
    WorkerWorkerService.$inject = ['serializationService', '$injector', '$q', '$rootScope'];

    /* @ngInject */
    function WorkerWorkerService(serializationService, $injector, $q, $rootScope) {
        (0, _classCallCheck3.default)(this, WorkerWorkerService);

        this.serializationService = serializationService;
        this.$injector = $injector;
        this.$q = $q;
        this.$rootScope = $rootScope;
        this.cancellers = [];
    }

    (0, _createClass3.default)(WorkerWorkerService, [{
        key: '$broadcast',
        value: function $broadcast(name, args) {
            try {
                self.postMessage({ event: 'broadcast', name: name, args: args });
            } catch (e) {
                console.log(args, e);
                throw e;
            }
        }
    }, {
        key: 'onMessage',
        value: function onMessage(message) {
            var _this = this;

            if (message.id === undefined) {
                this.$rootScope.$broadcast(message.name, this.serializationService.restorePrototypes(message.args));
                this.$rootScope.$apply();
            } else if (message.cancel) {
                var canceller = this.cancellers[message.id];
                delete this.cancellers[message.id];
                if (canceller) canceller.resolve();
            } else {
                var service = this.$injector.get(message.service);
                var _canceller = this.$q.defer();
                this.cancellers[message.id] = _canceller;
                var promise = service[message.method].apply(service, this.serializationService.restorePrototypes(message.args).concat(_canceller.promise));
                if (!promise || !promise.then) {
                    var deferred = this.$q.defer();
                    deferred.resolve(promise);
                    promise = deferred.promise;
                }
                promise.then(function (success) {
                    delete _this.cancellers[message.id];
                    self.postMessage({ event: 'success', id: message.id, data: success });
                }, function (error) {
                    delete _this.cancellers[message.id];
                    if (error instanceof Error) {
                        self.postMessage({ event: 'failure', id: message.id, data: { name: error.name, message: error.message, stack: error.stack } });
                        throw error;
                    }
                    self.postMessage({ event: 'failure', id: message.id, data: _serializationService.SerializationService.stripFunctions(error) });
                }, function (update) {
                    return self.postMessage({ event: 'update', id: message.id, data: update });
                });
            }
        }
    }]);
    return WorkerWorkerService;
}();

var StateWorkerService = exports.StateWorkerService = function () {
    function StateWorkerService() {
        (0, _classCallCheck3.default)(this, StateWorkerService);
    }

    (0, _createClass3.default)(StateWorkerService, [{
        key: 'setState',
        value: function setState(state) {
            this.state = state;
        }
    }]);
    return StateWorkerService;
}();

angular.module('fibra.services.worker-service', ['fibra.services.serialization-service']).config(['$provide', function ($provide) {
    $provide.service('stateWorkerService', StateWorkerService);
    $provide.service('workerWorkerService', WorkerWorkerService);
}]);

/***/ }),

/***/ 583:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ProjectWorkerService = undefined;

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _angular = __webpack_require__(0);

var angular = _interopRequireWildcard(_angular);

var _citable = __webpack_require__(31);

var _project = __webpack_require__(72);

var _angularSparqlService = __webpack_require__(37);

var _primaryEndpointConfiguration = __webpack_require__(97);

var _remoteEndpointConfiguration = __webpack_require__(136);

var _schema = __webpack_require__(137);

var _collectionUtils = __webpack_require__(22);

var _rdf = __webpack_require__(7);

var _dataModel = __webpack_require__(28);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProjectWorkerService = exports.ProjectWorkerService = function () {
    ProjectWorkerService.$inject = ['fibraSparqlService', 'serializationService', '$q'];

    function ProjectWorkerService(fibraSparqlService, serializationService, $q) {
        (0, _classCallCheck3.default)(this, ProjectWorkerService);

        this.fibraSparqlService = fibraSparqlService;
        this.serializationService = serializationService;
        this.$q = $q;
    }

    (0, _createClass3.default)(ProjectWorkerService, [{
        key: 'loadPrimaryEndpointConfiguration',
        value: function loadPrimaryEndpointConfiguration(source, templateId) {
            return this.runSingleQuery(source, _primaryEndpointConfiguration.PrimaryEndpointConfiguration.listPrimaryEndpointConfigurationsQuery, templateId, new _primaryEndpointConfiguration.PrimaryEndpointConfiguration(templateId, source));
        }
    }, {
        key: 'listPrimaryEndpointConfigurations',
        value: function listPrimaryEndpointConfigurations(source) {
            return this.runListQuery(source, _primaryEndpointConfiguration.PrimaryEndpointConfiguration.listPrimaryEndpointConfigurationsQuery, function (id) {
                return new _primaryEndpointConfiguration.PrimaryEndpointConfiguration(id, source);
            });
        }
    }, {
        key: 'loadRemoteEndpointConfiguration',
        value: function loadRemoteEndpointConfiguration(source, templateId) {
            return this.runSingleQuery(source, _remoteEndpointConfiguration.RemoteEndpointConfiguration.listRemoteEndpointConfigurationsQuery, templateId, new _remoteEndpointConfiguration.RemoteEndpointConfiguration(templateId, source));
        }
    }, {
        key: 'listArchiveEndpointConfigurations',
        value: function listArchiveEndpointConfigurations(source) {
            return this.runListQuery(source, _remoteEndpointConfiguration.RemoteEndpointConfiguration.listRemoteEndpointConfigurationsQuery.replace(/# TYPELIMIT/g, '?id a fibra:ArchiveEndpointConfiguration'), function (id) {
                return new _remoteEndpointConfiguration.RemoteEndpointConfiguration(id, source);
            });
        }
    }, {
        key: 'listAuthorityEndpointConfigurations',
        value: function listAuthorityEndpointConfigurations(source) {
            return this.runListQuery(source, _remoteEndpointConfiguration.RemoteEndpointConfiguration.listRemoteEndpointConfigurationsQuery.replace(/# TYPELIMIT/g, '?id a fibra:AuthorityEndpointConfiguration'), function (id) {
                return new _remoteEndpointConfiguration.RemoteEndpointConfiguration(id, source);
            });
        }
    }, {
        key: 'listProjects',
        value: function listProjects(source) {
            return this.runListQuery(source, _project.Project.listProjectsQuery, function (id) {
                return new _project.Project(id, source);
            });
        }
    }, {
        key: 'listSchemas',
        value: function listSchemas(source) {
            return this.runListQuery(source, _schema.Schema.listSchemasQuery, function (id) {
                return new _schema.Schema(id, source);
            });
        }
    }, {
        key: 'loadSchema',
        value: function loadSchema(source, id) {
            return this.runSingleQuery(source, _schema.Schema.listSchemasQuery, id, new _schema.Schema(id, source));
        }
    }, {
        key: 'loadDataModel',
        value: function loadDataModel(schemas, endpoints) {
            var _this = this;

            var dataModel = new _dataModel.DataModel();
            var classes = new _collectionUtils.EMap(function (id) {
                var cl = new _dataModel.Class(_rdf.DataFactory.namedNode(id));
                dataModel.classMap.set(id, cl);
                return cl;
            });
            var properties = new _collectionUtils.EMap(function (id) {
                var pr = new _dataModel.Property(_rdf.DataFactory.namedNode(id));
                dataModel.propertyMap.set(id, pr);
                return pr;
            });
            var classConf = {
                bindingConverters: {
                    superClasses: function superClasses(binding) {
                        return classes.goc(binding.value);
                    },
                    subClasses: function subClasses(binding) {
                        return classes.goc(binding.value);
                    },
                    types: function types(binding) {
                        return classes.goc(binding.value);
                    },
                    labels: function labels(binding) {
                        return _rdf.DataFactory.nodeFromBinding(binding);
                    },
                    descriptions: function descriptions(binding) {
                        return _rdf.DataFactory.nodeFromBinding(binding);
                    }
                },
                bindingHandlers: {
                    types: function types(obj, prop, val) {
                        return obj[prop].add(val);
                    },
                    labels: function labels(obj, prop, val) {
                        return obj[prop].add(val);
                    },
                    descriptions: function descriptions(obj, prop, val) {
                        return obj[prop].add(val);
                    },
                    superClasses: function superClasses(obj, prop, val) {
                        return obj[prop].add(val);
                    },
                    subClasses: function subClasses(obj, prop, val) {
                        return obj[prop].add(val);
                    }
                }
            };
            var propertyConf = {
                bindingConverters: {
                    superProperties: function superProperties(binding) {
                        return properties.goc(binding.value);
                    },
                    subProperties: function subProperties(binding) {
                        return properties.goc(binding.value);
                    },
                    inverseProperty: function inverseProperty(binding) {
                        return properties.goc(binding.value);
                    },
                    types: function types(binding) {
                        return classes.goc(binding.value);
                    },
                    domains: function domains(binding) {
                        return classes.goc(binding.value);
                    },
                    ranges: function ranges(binding) {
                        return classes.goc(binding.value);
                    },
                    labels: function labels(binding) {
                        return _rdf.DataFactory.nodeFromBinding(binding);
                    },
                    descriptions: function descriptions(binding) {
                        return _rdf.DataFactory.nodeFromBinding(binding);
                    }
                },
                bindingHandlers: {
                    superProperties: function superProperties(obj, prop, val) {
                        return obj[prop].add(val);
                    },
                    subProperties: function subProperties(obj, prop, val) {
                        return obj[prop].add(val);
                    },
                    types: function types(obj, prop, val) {
                        return obj[prop].add(val);
                    },
                    domains: function domains(obj, prop, val) {
                        return obj[prop].add(val);
                    },
                    ranges: function ranges(obj, prop, val) {
                        return obj[prop].add(val);
                    },
                    labels: function labels(obj, prop, val) {
                        return obj[prop].add(val);
                    },
                    descriptions: function descriptions(obj, prop, val) {
                        return obj[prop].add(val);
                    }
                }
            };
            var promises = [];
            schemas.forEach(function (schema) {
                endpoints.forEach(function (ep) {
                    if (ep.schemaEndpoint && ep.classQuery) {
                        promises.push(_this.fibraSparqlService.query(ep.schemaEndpoint, ep.classQuery).then(function (response) {
                            var tracker = new _angularSparqlService.UniqueObjectTracker();
                            response.results.bindings.forEach(function (binding) {
                                return _angularSparqlService.SparqlService.bindingsToObject(binding, classes.goc(binding['id'].value), classConf, binding['id'].value, tracker);
                            });
                        }));
                        promises.push(_this.fibraSparqlService.query(ep.schemaEndpoint, ep.propertyQuery).then(function (response) {
                            var tracker = new _angularSparqlService.UniqueObjectTracker();
                            response.results.bindings.forEach(function (binding) {
                                return _angularSparqlService.SparqlService.bindingsToObject(binding, properties.goc(binding['id'].value), propertyConf, binding['id'].value, tracker);
                            });
                        }));
                    }
                });
                promises.push(_this.fibraSparqlService.query(schema.endpoint, schema.classQuery).then(function (response) {
                    var tracker = new _angularSparqlService.UniqueObjectTracker();
                    response.results.bindings.forEach(function (binding) {
                        return _angularSparqlService.SparqlService.bindingsToObject(binding, classes.goc(binding['id'].value), classConf, binding['id'].value, tracker);
                    });
                }));
                promises.push(_this.fibraSparqlService.query(schema.endpoint, schema.propertyQuery).then(function (response) {
                    var tracker = new _angularSparqlService.UniqueObjectTracker();
                    response.results.bindings.forEach(function (binding) {
                        return _angularSparqlService.SparqlService.bindingsToObject(binding, properties.goc(binding['id'].value), propertyConf, binding['id'].value, tracker);
                    });
                }));
            });
            return this.$q.all(promises).then(function () {
                classes.values().forEach(function (cl) {
                    cl.superClasses.values().filter(function (spr) {
                        return !spr.subClasses.find(function (opr) {
                            return opr === cl;
                        });
                    }).forEach(function (spr) {
                        return spr.subClasses.add(cl);
                    });
                    cl.subClasses.values().filter(function (spr) {
                        return !spr.superClasses.find(function (opr) {
                            return opr === cl;
                        });
                    }).forEach(function (spr) {
                        return spr.superClasses.add(cl);
                    });
                });
                classes.values().forEach(function (cl) {
                    if (cl.superClasses.empty()) dataModel.rootClasses.push(cl);
                });
                properties.values().forEach(function (pr) {
                    if (pr.inverseProperty) pr.inverseProperty.inverseProperty = pr;
                    pr.superProperties.values().filter(function (spr) {
                        return !spr.subProperties.find(function (opr) {
                            return opr === pr;
                        });
                    }).forEach(function (spr) {
                        return spr.subProperties.add(pr);
                    });
                    pr.subProperties.values().filter(function (spr) {
                        return !spr.superProperties.find(function (opr) {
                            return opr === pr;
                        });
                    }).forEach(function (spr) {
                        return spr.superProperties.add(pr);
                    });
                    pr.domains.each(function (dc) {
                        return dc.properties.add(pr);
                    });
                    pr.ranges.each(function (rc) {
                        return rc.inverseProperties.add(pr);
                    });
                });
                properties.values().forEach(function (pr) {
                    if (pr.superProperties.empty()) dataModel.rootProperties.push(pr);
                });
                return dataModel;
            });
        }
    }, {
        key: 'loadProject',
        value: function loadProject(source, id, loadFull) {
            var _this2 = this;

            var q = this.runSingleQuery(source, _project.Project.listProjectsQuery, id, new _project.Project(id, source));
            if (!loadFull) return q;else return q.then(function (p) {
                var promises = [];
                promises.push(_this2.$q.all(p.schemas.map(function (schema) {
                    return _this2.loadSchema(schema.source, schema.id);
                })).then(function (schemas) {
                    return p.schemas = schemas;
                }));
                promises.push(_this2.$q.all(p.archiveEndpoints.map(function (ae) {
                    return _this2.loadRemoteEndpointConfiguration(ae.source, ae.id);
                })).then(function (aes) {
                    return p.archiveEndpoints = aes;
                }));
                promises.push(_this2.$q.all(p.authorityEndpoints.map(function (ae) {
                    return _this2.loadRemoteEndpointConfiguration(ae.source, ae.id);
                })).then(function (aes) {
                    return p.authorityEndpoints = aes;
                }));
                return _this2.$q.all(promises).then(function () {
                    return _this2.loadDataModel(p.schemas, p.archiveEndpoints.concat(p.authorityEndpoints)).then(function (dm) {
                        return p.dataModel = dm;
                    }).then(function () {
                        p.init();
                        return p;
                    });
                });
            });
        }
    }, {
        key: 'runSingleQuery',
        value: function runSingleQuery(source, tq, id, ps) {
            return this.runQuery(source, tq, id, function () {
                return ps;
            }).then(function (a) {
                return a[0];
            });
        }
    }, {
        key: 'runListQuery',
        value: function runListQuery(source, lq, oc) {
            return this.runQuery(source, lq, null, oc);
        }
    }, {
        key: 'runQuery',
        value: function runQuery(source, lq, id, oc) {
            var _this3 = this;

            lq = source.graph ? lq.replace(/# STARTGRAPH/g, 'GRAPH <' + source.graph + '> {').replace(/# ENDGRAPH/g, '}') : lq.replace(/.*# STARTGRAPH\n/g, '').replace(/.*# ENDGRAPH\n/g, '');
            if (id) lq = lq.replace(/# VALUE/g, 'VALUES ?id { <' + id + '> }').replace(/<ID>/g, '<' + id + '>');
            return this.fibraSparqlService.query(source.sparqlEndpoint, lq).then(function (response) {
                var projects = new _collectionUtils.EMap(oc);
                var conf = {
                    bindingTypes: { rightsHolders: 'uniqueArray', sourceClassSettings: 'single', layouts: 'single', dateBoundaryStart: 'single', dateBoundaryEnd: 'single', schemas: 'uniqueArray', authorityEndpoints: 'uniqueArray', archiveEndpoints: 'uniqueArray' },
                    bindingConverters: {
                        dateCreated: function dateCreated(binding) {
                            return new Date(binding.value);
                        },
                        types: function types(binding) {
                            return _rdf.DataFactory.nodeFromBinding(binding);
                        },
                        labels: function labels(binding) {
                            return _rdf.DataFactory.nodeFromBinding(binding);
                        },
                        descriptions: function descriptions(binding) {
                            return _rdf.DataFactory.nodeFromBinding(binding);
                        },
                        schemas: function schemas(binding) {
                            return new _schema.Schema(binding.value, angular.copy(source));
                        },
                        authorityEndpoints: function authorityEndpoints(binding) {
                            return new _remoteEndpointConfiguration.RemoteEndpointConfiguration(binding.value, angular.copy(source));
                        },
                        archiveEndpoints: function archiveEndpoints(binding) {
                            return new _remoteEndpointConfiguration.RemoteEndpointConfiguration(binding.value, angular.copy(source));
                        },
                        rightsHolders_labels: function rightsHolders_labels(binding) {
                            return _rdf.DataFactory.nodeFromBinding(binding);
                        },
                        rightsHolders_descriptions: function rightsHolders_descriptions(binding) {
                            return _rdf.DataFactory.nodeFromBinding(binding);
                        },
                        rightsHolders: function rightsHolders(binding) {
                            return new _citable.Citable(binding.value, angular.copy(source));
                        },
                        compatibleSchemas: function compatibleSchemas(binding) {
                            return _rdf.DataFactory.nodeFromBinding(binding);
                        },
                        sourceClassSettings: function sourceClassSettings(binding) {
                            return _this3.serializationService.fromJson(binding.value);
                        },
                        layouts: function layouts(binding) {
                            return _this3.serializationService.fromJson(binding.value);
                        },
                        dateBoundaryStart: function dateBoundaryStart(binding) {
                            return _this3.serializationService.fromJson(binding.value);
                        },
                        dateBoundaryEnd: function dateBoundaryEnd(binding) {
                            return _this3.serializationService.fromJson(binding.value);
                        }
                    },
                    bindingHandlers: {
                        types: function types(obj, prop, value) {
                            return obj[prop].add(value);
                        },
                        labels: function labels(obj, prop, value) {
                            return obj[prop].add(value);
                        },
                        descriptions: function descriptions(obj, prop, value) {
                            return obj[prop].add(value);
                        }
                    }
                };
                var tracker = new _angularSparqlService.UniqueObjectTracker();
                response.results.bindings.forEach(function (binding) {
                    return _angularSparqlService.SparqlService.bindingsToObject(binding, projects.goc(binding['id'].value), conf, binding['id'].value, tracker);
                });
                projects.values().forEach(function (p) {
                    return ProjectWorkerService.orderCitables(p.rightsHolders);
                });
                return projects.values();
            });
        }
    }], [{
        key: 'orderCitables',
        value: function orderCitables(citables) {
            citables.sort(function (a, b) {
                return (a['order'] ? a['order'] : Number.MAX_VALUE) - (b['order'] ? b['order'] : Number.MAX_VALUE);
            });
            citables.forEach(function (rh) {
                return delete rh['order'];
            });
        }
    }]);
    return ProjectWorkerService;
}();

angular.module('fibra.services.project-service', ['fibra.services.fibra-sparql-service']).config(['$provide', function ($provide) {
    $provide.service('projectWorkerService', ProjectWorkerService);
}]);

/***/ }),

/***/ 584:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SparqlUpdateWorkerService = exports.SparqlUpdateService = undefined;

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _rdf = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SparqlUpdateService = exports.SparqlUpdateService = function () {
    SparqlUpdateService.$inject = ['workerService'];

    /* @ngInject */
    function SparqlUpdateService(workerService) {
        (0, _classCallCheck3.default)(this, SparqlUpdateService);

        this.workerService = workerService;
    }

    (0, _createClass3.default)(SparqlUpdateService, [{
        key: 'updateQuads',
        value: function updateQuads(endpoint, quadsToAdd, quadsToRemove) {
            return this.workerService.call('sparqlUpdateWorkerService', 'updateQuads', [endpoint, quadsToAdd, quadsToRemove]);
        }
    }, {
        key: 'updateGraphs',
        value: function updateGraphs(endpoint, graphsToAdd, graphsToRemove) {
            return this.workerService.call('sparqlUpdateWorkerService', 'updateGraphs', [endpoint, graphsToAdd, graphsToRemove]);
        }
    }]);
    return SparqlUpdateService;
}();

var SparqlUpdateWorkerService = exports.SparqlUpdateWorkerService = function () {
    SparqlUpdateWorkerService.$inject = ['fibraSparqlService'];

    /* @ngInject */
    function SparqlUpdateWorkerService(fibraSparqlService) {
        (0, _classCallCheck3.default)(this, SparqlUpdateWorkerService);

        this.fibraSparqlService = fibraSparqlService;
    }

    (0, _createClass3.default)(SparqlUpdateWorkerService, [{
        key: 'updateQuads',
        value: function updateQuads(endpoint) {
            var quadsToAdd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
            var quadsToRemove = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

            var graphsToAddMap = {};
            var graphsToRemoveMap = {};
            var graphsToAdd = [];
            var graphsToRemove = [];
            quadsToAdd.forEach(function (q) {
                var graph = graphsToAddMap[q.graph.value];
                if (!graph) {
                    graph = new _rdf.Graph(q.graph);
                    graphsToAddMap[q.graph.value] = graph;
                    graphsToAdd.push(graph);
                }
                graph.triples.push(_rdf.DataFactory.triple(q.subject, q.predicate, q.object));
            });
            quadsToRemove.forEach(function (q) {
                var graph = graphsToRemoveMap[q.graph.value];
                if (!graph) {
                    graph = new _rdf.Graph(q.graph);
                    graphsToRemoveMap[q.graph.value] = graph;
                    graphsToRemove.push(graph);
                }
                graph.triples.push(_rdf.DataFactory.triple(q.subject, q.predicate, q.object));
            });
            return this.updateGraphs(endpoint, graphsToAdd, graphsToRemove);
        }
    }, {
        key: 'updateGraphs',
        value: function updateGraphs(endpoint) {
            var graphsToAdd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
            var graphsToRemove = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

            var addString = graphsToAdd.map(function (graph) {
                return (_rdf.DefaultGraph.instance.equals(graph.graph) ? '' : 'GRAPH' + graph.graph.toCanonical()) + '{' + graph.triples.map(function (g) {
                    return g.toCanonical();
                }).join(' . ') + '}';
            }).join('');
            var removeString = graphsToRemove.map(function (graph) {
                return (_rdf.DefaultGraph.instance.equals(graph.graph) ? '' : 'GRAPH' + graph.graph.toCanonical()) + '{' + graph.triples.map(function (g) {
                    return g.toCanonical();
                }).join(' . ') + '}';
            }).join('');
            return this.fibraSparqlService.update(endpoint, SparqlUpdateWorkerService.queryTemplate.replace(/<DELETE>/g, removeString).replace(/<INSERT>/g, addString)).then(function (r) {
                return true;
            }, function (r) {
                return false;
            });
        }
    }]);
    return SparqlUpdateWorkerService;
}();

SparqlUpdateWorkerService.queryTemplate = 'DELETE{<DELETE>}INSERT{<INSERT>}WHERE {}';

/***/ })

},[581]);
//# sourceMappingURL=worker-bundle.js.map