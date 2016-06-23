var fibra;
(function (fibra) {
    'use strict';
    var m = angular.module('fibra', ['http-auth-interceptor', 'ngStorage', 'ui.router', 'ui.bootstrap', 'ui.bootstrap.tpls']);
    m.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/author');
        $stateProvider.state('author', {
            url: '/author',
            template: '<author></author>'
        }).state('configuration', {
            url: '/configuration',
            template: '<configurations></configurations>'
        });
    });
    m.config(function ($localStorageProvider) {
        $localStorageProvider.setKeyPrefix('fibra-');
    });
    m.value('workerServiceConfiguration', {
        appName: 'fibra',
        workerThreads: 8,
        importScripts: [
            'scripts/worker-f2f380001f.js'
            ]
    });
    m.run(function ($rootScope, $localStorage, $http, authService, workerService) {
        $rootScope.authInfo = {
            authOpen: false,
            username: undefined,
            password: undefined
        };
        if ($localStorage.authorization) {
            $http.defaults.headers.common['Authorization'] = $localStorage.authorization;
            workerService.$broadcast('main:auth-loginAuthInfo', $localStorage.authorization);
        }
        $rootScope.setAuth = function () {
            $rootScope.authInfo.authOpen = false;
            $localStorage.authorization = 'Basic ' + btoa($rootScope.authInfo.username + ':' + $rootScope.authInfo.password);
            $http.defaults.headers.common['Authorization'] = $localStorage.authorization;
            workerService.$broadcast('main:auth-loginAuthInfo', $localStorage.authorization);
            authService.loginConfirmed();
        };
        $rootScope.dismissAuth = function () {
            $rootScope.authInfo.authOpen = false;
            authService.loginCancelled({ status: 401 }, 'Authentication required');
        };
        $rootScope.$on('event:auth-loginRequired', function () { return $rootScope.authInfo.authOpen = true; });
    });
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,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LENBQUE7UUFDdEUsQ0FBQyxDQUFBO1FBQ0QsVUFBVSxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsRUFBRSxjQUFNLE9BQUEsVUFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsSUFBSSxFQUFuQyxDQUFtQyxDQUFDLENBQUE7SUFDdkYsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLEVBbkVTLEtBQUssS0FBTCxLQUFLLFFBbUVkIiwiZmlsZSI6InNjcmlwdHMvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIGZpYnJhIHtcbiAgJ3VzZSBzdHJpY3QnXG5cbiAgaW50ZXJmYWNlIElBdXRoZW50aWNhdGlvblJvb3RTY29wZVNlcnZpY2UgZXh0ZW5kcyBhbmd1bGFyLklSb290U2NvcGVTZXJ2aWNlIHtcbiAgICBzZXRBdXRoOiAoKSA9PiB2b2lkXG4gICAgZGlzbWlzc0F1dGg6ICgpID0+IHZvaWRcbiAgICBhdXRoSW5mbzoge1xuICAgICAgYXV0aE9wZW46IGJvb2xlYW5cbiAgICAgIHVzZXJuYW1lOiBzdHJpbmdcbiAgICAgIHBhc3N3b3JkOiBzdHJpbmdcbiAgICB9XG4gIH1cblxuICBsZXQgbTogYW5ndWxhci5JTW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2ZpYnJhJywgWyAnaHR0cC1hdXRoLWludGVyY2VwdG9yJywgJ25nU3RvcmFnZScsICd1aS5yb3V0ZXInLCAgJ3VpLmJvb3RzdHJhcCcsICd1aS5ib290c3RyYXAudHBscycgXSlcbiAgbS5jb25maWcoKCRzdGF0ZVByb3ZpZGVyOiBhbmd1bGFyLnVpLklTdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXI6IGFuZ3VsYXIudWkuSVVybFJvdXRlclByb3ZpZGVyKSA9PiB7XG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL2F1dGhvcicpXG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2F1dGhvcicsIHtcbiAgICAgICAgdXJsOiAnL2F1dGhvcicsXG4gICAgICAgIHRlbXBsYXRlOiAnPGF1dGhvcj48L2F1dGhvcj4nXG4gICAgICB9KS5zdGF0ZSgnY29uZmlndXJhdGlvbicsIHtcbiAgICAgICAgdXJsOiAnL2NvbmZpZ3VyYXRpb24nLFxuICAgICAgICB0ZW1wbGF0ZTogJzxjb25maWd1cmF0aW9ucz48L2NvbmZpZ3VyYXRpb25zPidcbiAgICAgIH0pXG4gIH0pXG4gIG0uY29uZmlnKCgkbG9jYWxTdG9yYWdlUHJvdmlkZXIpID0+IHtcbiAgICAkbG9jYWxTdG9yYWdlUHJvdmlkZXIuc2V0S2V5UHJlZml4KCdmaWJyYS0nKTtcbiAgfSlcbiAgbS52YWx1ZSgnd29ya2VyU2VydmljZUNvbmZpZ3VyYXRpb24nLCB7XG4gICAgYXBwTmFtZTogJ2ZpYnJhJyxcbiAgICB3b3JrZXJUaHJlYWRzOiA4LFxuICAgIGltcG9ydFNjcmlwdHM6IFtcbiAgICAgICdib3dlcl9jb21wb25lbnRzL2FuZ3VsYXIvYW5ndWxhci5taW4uanMnLFxuICAgICAgJ2Jvd2VyX2NvbXBvbmVudHMvYW5ndWxhci1odHRwLWF1dGgvc3JjL2h0dHAtYXV0aC1pbnRlcmNlcHRvci5qcycsXG4gICAgICAnYm93ZXJfY29tcG9uZW50cy9hbmd1bGFyLXNwYXJxbC1zZXJ2aWNlL2Rpc3Qvc3BhcnFsLXNlcnZpY2UuanMnLFxuICAgICAgJ3NjcmlwdHMvd29ya2VyLWFwcC5qcycsXG4gICAgICAnc2NyaXB0cy93b3JrZXItc2VydmljZS5qcycsXG4gICAgICAnc2NyaXB0cy9yZGYuanMnLFxuICAgICAgJ3NjcmlwdHMvc3BhcnFsLWl0ZW0tc2VydmljZS5qcycsXG4gICAgICAnc2NyaXB0cy9zcGFycWwtYXV0b2NvbXBsZXRlLXNlcnZpY2UuanMnLFxuICAgICAgJ3NjcmlwdHMvc3BhcnFsLXRyZWUtc2VydmljZS5qcycsXG4gICAgICAnc2NyaXB0cy9zcGFycWwtdXBkYXRlLXNlcnZpY2UuanMnLFxuICAgICAgJ3NjcmlwdHMvdHJlZS1jb21wb25lbnQuanMnXG4gICAgICBdXG4gIH0pXG4gIG0ucnVuKCgkcm9vdFNjb3BlOiBJQXV0aGVudGljYXRpb25Sb290U2NvcGVTZXJ2aWNlLCAkbG9jYWxTdG9yYWdlOiBhbnksICRodHRwOiBhbmd1bGFyLklIdHRwU2VydmljZSwgYXV0aFNlcnZpY2U6IGFuZ3VsYXIuaHR0cEF1dGguSUF1dGhTZXJ2aWNlLCB3b3JrZXJTZXJ2aWNlOiBXb3JrZXJTZXJ2aWNlKSA9PiB7XG4gICAgJHJvb3RTY29wZS5hdXRoSW5mbyA9IHtcbiAgICAgIGF1dGhPcGVuOiBmYWxzZSxcbiAgICAgIHVzZXJuYW1lOiB1bmRlZmluZWQsXG4gICAgICBwYXNzd29yZDogdW5kZWZpbmVkXG4gICAgfVxuICAgIGlmICgkbG9jYWxTdG9yYWdlLmF1dGhvcml6YXRpb24pIHtcbiAgICAgICRodHRwLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uWydBdXRob3JpemF0aW9uJ10gPSAkbG9jYWxTdG9yYWdlLmF1dGhvcml6YXRpb25cbiAgICAgIHdvcmtlclNlcnZpY2UuJGJyb2FkY2FzdCgnbWFpbjphdXRoLWxvZ2luQXV0aEluZm8nLCAkbG9jYWxTdG9yYWdlLmF1dGhvcml6YXRpb24pXG4gICAgfVxuICAgICRyb290U2NvcGUuc2V0QXV0aCA9ICgpID0+IHtcbiAgICAgICRyb290U2NvcGUuYXV0aEluZm8uYXV0aE9wZW4gPSBmYWxzZVxuICAgICAgJGxvY2FsU3RvcmFnZS5hdXRob3JpemF0aW9uID0gJ0Jhc2ljICcgKyBidG9hKCRyb290U2NvcGUuYXV0aEluZm8udXNlcm5hbWUgKyAnOicgKyAkcm9vdFNjb3BlLmF1dGhJbmZvLnBhc3N3b3JkKVxuICAgICAgJGh0dHAuZGVmYXVsdHMuaGVhZGVycy5jb21tb25bJ0F1dGhvcml6YXRpb24nXSA9ICRsb2NhbFN0b3JhZ2UuYXV0aG9yaXphdGlvblxuICAgICAgd29ya2VyU2VydmljZS4kYnJvYWRjYXN0KCdtYWluOmF1dGgtbG9naW5BdXRoSW5mbycsICRsb2NhbFN0b3JhZ2UuYXV0aG9yaXphdGlvbilcbiAgICAgIGF1dGhTZXJ2aWNlLmxvZ2luQ29uZmlybWVkKClcbiAgICB9XG4gICAgJHJvb3RTY29wZS5kaXNtaXNzQXV0aCA9ICgpID0+IHtcbiAgICAgICRyb290U2NvcGUuYXV0aEluZm8uYXV0aE9wZW4gPSBmYWxzZVxuICAgICAgYXV0aFNlcnZpY2UubG9naW5DYW5jZWxsZWQoe3N0YXR1czogNDAxfSwgJ0F1dGhlbnRpY2F0aW9uIHJlcXVpcmVkJylcbiAgICB9XG4gICAgJHJvb3RTY29wZS4kb24oJ2V2ZW50OmF1dGgtbG9naW5SZXF1aXJlZCcsICgpID0+ICRyb290U2NvcGUuYXV0aEluZm8uYXV0aE9wZW4gPSB0cnVlKVxuICB9KVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

var fibra;
(function (fibra) {
    'use strict';
    var TreeViewConfiguration = (function () {
        function TreeViewConfiguration(endpoint, queryTemplate) {
            this.endpoint = endpoint;
            this.queryTemplate = queryTemplate;
        }
        return TreeViewConfiguration;
    }());
    var AuthorComponentController = (function () {
        function AuthorComponentController(configurationService) {
            var _this = this;
            this.configurationService = configurationService;
            this.setItem = function (itemId, itemEndpoint) {
                _this.itemId = itemId;
                _this.itemEndpoint = itemEndpoint;
            };
        }/*<auto_generate>*/AuthorComponentController.$inject = ['configurationService']; AuthorComponentController.$componentName = 'AuthorComponentController'/*</auto_generate>*/
        return AuthorComponentController;
    }());/*<auto_generate>*/angular.module('fibra').controller('AuthorComponentController',AuthorComponentController);/*</auto_generate>*/
    fibra.AuthorComponentController = AuthorComponentController;
    var AuthorComponent = (function () {
        function AuthorComponent() {
            this.controller = AuthorComponentController;
            this.templateUrl = 'partials/author.html';
        }/*<auto_generate>*/AuthorComponent.$inject = []; AuthorComponent.$componentName = 'author'/*</auto_generate>*/
        return AuthorComponent;
    }());/*<auto_generate>*/angular.module('fibra').component('author',new AuthorComponent());/*</auto_generate>*/
    fibra.AuthorComponent = AuthorComponent;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvYXV0aG9yLWNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFVLEtBQUssQ0F1QmQ7QUF2QkQsV0FBVSxLQUFLLEVBQUMsQ0FBQztJQUNmLFlBQVksQ0FBQTtJQUVaO1FBQ0UsK0JBQW1CLFFBQWdCLEVBQVMsYUFBcUI7WUFBOUMsYUFBUSxHQUFSLFFBQVEsQ0FBUTtZQUFTLGtCQUFhLEdBQWIsYUFBYSxDQUFRO1FBQUcsQ0FBQztRQUN2RSw0QkFBQztJQUFELENBRkEsQUFFQyxJQUFBO0lBRUQ7UUFTRSxtQ0FBb0Isb0JBQTBDO1lBVGhFLGlCQVVDO1lBRHFCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7WUFMdkQsWUFBTyxHQUFtRCxVQUFDLE1BQWMsRUFBRSxZQUFvQjtnQkFDcEcsS0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7Z0JBQ3BCLEtBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFBO1lBQ2xDLENBQUMsQ0FBQTtRQUVnRSxDQUFDO1FBQ3BFLGdDQUFDO0lBQUQsQ0FWQSxBQVVDLElBQUE7SUFWWSwrQkFBeUIsNEJBVXJDLENBQUE7SUFFRDtRQUFBO1lBQ1csZUFBVSxHQUFhLHlCQUF5QixDQUFBO1lBQ2hELGdCQUFXLEdBQVcsc0JBQXNCLENBQUE7UUFDdkQsQ0FBQztRQUFELHNCQUFDO0lBQUQsQ0FIQSxBQUdDLElBQUE7SUFIWSxxQkFBZSxrQkFHM0IsQ0FBQTtBQUNILENBQUMsRUF2QlMsS0FBSyxLQUFMLEtBQUssUUF1QmQiLCJmaWxlIjoic2NyaXB0cy9hdXRob3ItY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIGZpYnJhIHtcbiAgJ3VzZSBzdHJpY3QnXG5cbiAgY2xhc3MgVHJlZVZpZXdDb25maWd1cmF0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZW5kcG9pbnQ6IHN0cmluZywgcHVibGljIHF1ZXJ5VGVtcGxhdGU6IHN0cmluZykge31cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBBdXRob3JDb21wb25lbnRDb250cm9sbGVyIHtcbiAgICBwdWJsaWMgaXRlbUlkOiBzdHJpbmdcbiAgICBwdWJsaWMgaXRlbUVuZHBvaW50OiBzdHJpbmdcblxuICAgIHB1YmxpYyBzZXRJdGVtOiAoaXRlbUlkOiBzdHJpbmcsIGl0ZW1FbmRwb2ludDogc3RyaW5nKSA9PiB2b2lkID0gKGl0ZW1JZDogc3RyaW5nLCBpdGVtRW5kcG9pbnQ6IHN0cmluZykgPT4ge1xuICAgICAgdGhpcy5pdGVtSWQgPSBpdGVtSWRcbiAgICAgIHRoaXMuaXRlbUVuZHBvaW50ID0gaXRlbUVuZHBvaW50XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25maWd1cmF0aW9uU2VydmljZTogQ29uZmlndXJhdGlvblNlcnZpY2UpIHt9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgQXV0aG9yQ29tcG9uZW50IGltcGxlbWVudHMgYW5ndWxhci5JQ29tcG9uZW50T3B0aW9ucyB7XG4gICAgICBwdWJsaWMgY29udHJvbGxlcjogRnVuY3Rpb24gPSBBdXRob3JDb21wb25lbnRDb250cm9sbGVyXG4gICAgICBwdWJsaWMgdGVtcGxhdGVVcmw6IHN0cmluZyA9ICdwYXJ0aWFscy9hdXRob3IuaHRtbCdcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

var fibra;
(function (fibra) {
    'use strict';
    var ConfigurationService = (function () {
        function ConfigurationService() {
            this.configurations = [
                new Configuration('local', 'Local', 'http://ldf.fi/fibra/sparql'),
                new Configuration('sdfb', 'Six Degrees of Francis Bacon', 'http://ldf.fi/sdfb/sparql'),
                new Configuration('emlo', 'EMLO', 'http://ldf.fi/emlo/sparql'),
                new Configuration('procope', 'Procope', 'http://ldf.fi/procope/sparql'),
                new Configuration('schoenberg', 'Schoenberg', 'http://ldf.fi/schoenberg/sparql'),
            ];
        }/*<auto_generate>*/ConfigurationService.$inject = []; ConfigurationService.$componentName = 'configurationService'/*</auto_generate>*/
        return ConfigurationService;
    }());/*<auto_generate>*/angular.module('fibra').service('configurationService',ConfigurationService);/*</auto_generate>*/
    fibra.ConfigurationService = ConfigurationService;
    var Configuration = (function () {
        function Configuration(id, title, endpoint) {
            var _this = this;
            this.id = id;
            this.title = title;
            this.endpoint = endpoint;
            this.allowed = [];
            this.disallowed = [];
            this.allSelected = true;
            this.setClassTree = function (classTree) {
                classTree.forEach(function (tree2) { return fibra.TreeNode.recursivelyProcess(tree2, function (treeNode) {
                    treeNode.selected = true;
                    _this.allowed.push(treeNode.id);
                }); });
                _this.classTree = classTree;
                _this.allSelected = true;
            };
            this.alterSelection = function (node) {
                node.children.forEach(function (cn) { return fibra.TreeNode.recursivelyProcess(cn, function (n) {
                    n.selected = node.selected;
                    _this.setAllowedDisallowed(n);
                }); });
                _this.setAllowedDisallowed(node);
                _this.updateFilter();
            };
            this.setAllowedDisallowed = function (node) {
                if (node.selected) {
                    _this.removeDisallowed(node);
                    _this.addAllowed(node);
                }
                else {
                    _this.allSelected = false;
                    _this.removeAllowed(node);
                    _this.addDisallowed(node);
                }
            };
            this.addAllowed = function (node) {
                if (_this.allowed.indexOf(node.id) === -1) {
                    _this.allowed.push(node.id);
                }
            };
            this.removeAllowed = function (node) {
                if (_this.allowed.indexOf(node.id) !== -1) {
                    _this.allowed.splice(_this.allowed.indexOf(node.id), 1);
                }
            };
            this.addDisallowed = function (node) {
                if (_this.disallowed.indexOf(node.id) === -1) {
                    _this.disallowed.push(node.id);
                }
            };
            this.removeDisallowed = function (node) {
                if (_this.disallowed.indexOf(node.id) !== -1) {
                    _this.disallowed.splice(_this.disallowed.indexOf(node.id), 1);
                }
            };
            this.toggleAll = function () {
                _this.classTree.forEach(function (node) { return fibra.TreeNode.recursivelyProcess(node, function (n) {
                    n.selected = _this.allSelected;
                    _this.setAllowedDisallowed(n);
                }); });
                _this.updateFilter();
            };
            this.updateFilter = function () {
                if (_this.disallowed.length === 0)
                    _this.autocompletionConfiguration.constraints = '';
                else if (_this.disallowed.length < _this.allowed.length)
                    _this.autocompletionConfiguration.constraints = 'FILTER (?groupId NOT IN (' + _this.disallowed.map(function (id) { return '<' + id + '>'; }).join(', ') + '))';
                else
                    _this.autocompletionConfiguration.constraints = 'FILTER (?groupId IN (' + _this.allowed.map(function (id) { return '<' + id + '>'; }).join(', ') + '))';
            };
            this.autocompletionConfiguration = new fibra.SparqlAutocompletionConfiguration(id, title, endpoint, fibra.SparqlAutocompleteService.queryTemplate);
        }
        return Configuration;
    }());
    fibra.Configuration = Configuration;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvY29uZmlndXJhdGlvbi1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQVUsS0FBSyxDQTJGZDtBQTNGRCxXQUFVLEtBQUssRUFBQyxDQUFDO0lBQ2YsWUFBWSxDQUFBO0lBRVo7UUFBQTtZQUNTLG1CQUFjLEdBQW9CO2dCQUN2QyxJQUFJLGFBQWEsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLDRCQUE0QixDQUFDO2dCQUNqRSxJQUFJLGFBQWEsQ0FBQyxNQUFNLEVBQUUsOEJBQThCLEVBQUUsMkJBQTJCLENBQUM7Z0JBQ3RGLElBQUksYUFBYSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsMkJBQTJCLENBQUM7Z0JBQzlELElBQUksYUFBYSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsOEJBQThCLENBQUM7Z0JBQ3ZFLElBQUksYUFBYSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsaUNBQWlDLENBQUM7YUFDakYsQ0FBQTtRQUNILENBQUM7UUFBRCwyQkFBQztJQUFELENBUkEsQUFRQyxJQUFBO0lBUlksMEJBQW9CLHVCQVFoQyxDQUFBO0lBRUQ7UUFnRUUsdUJBQW1CLEVBQVUsRUFBUyxLQUFhLEVBQVMsUUFBZ0I7WUFoRTlFLGlCQTZFQztZQWJvQixPQUFFLEdBQUYsRUFBRSxDQUFRO1lBQVMsVUFBSyxHQUFMLEtBQUssQ0FBUTtZQUFTLGFBQVEsR0FBUixRQUFRLENBQVE7WUEzRHBFLFlBQU8sR0FBYSxFQUFFLENBQUE7WUFDdEIsZUFBVSxHQUFhLEVBQUUsQ0FBQTtZQUV6QixnQkFBVyxHQUFZLElBQUksQ0FBQTtZQUU1QixpQkFBWSxHQUFvQyxVQUFDLFNBQXFCO2dCQUMzRSxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsY0FBUSxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxVQUFBLFFBQVE7b0JBQ3BFLFFBQVEsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFBO29CQUN4QixLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUE7Z0JBQ2hDLENBQUMsQ0FBQyxFQUh5QixDQUd6QixDQUFDLENBQUE7Z0JBQ0gsS0FBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUE7Z0JBQzFCLEtBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFBO1lBQ3pCLENBQUMsQ0FBQTtZQUNNLG1CQUFjLEdBQXVCLFVBQUMsSUFBYztnQkFDekQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxFQUFFLElBQUksT0FBQSxjQUFRLENBQUMsa0JBQWtCLENBQUMsRUFBRSxFQUFFLFVBQUEsQ0FBQztvQkFDM0QsQ0FBQyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFBO29CQUMxQixLQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQzlCLENBQUMsQ0FBQyxFQUgwQixDQUcxQixDQUFDLENBQUE7Z0JBQ0gsS0FBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUMvQixLQUFJLENBQUMsWUFBWSxFQUFFLENBQUE7WUFDckIsQ0FBQyxDQUFBO1lBQ00seUJBQW9CLEdBQXVCLFVBQUMsSUFBYztnQkFDL0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQ2xCLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQTtvQkFDM0IsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDdkIsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDTixLQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQTtvQkFDeEIsS0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtvQkFDeEIsS0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDMUIsQ0FBQztZQUNILENBQUMsQ0FBQTtZQUNNLGVBQVUsR0FBdUIsVUFBQyxJQUFjO2dCQUNyRCxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN6QyxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7Z0JBQzVCLENBQUM7WUFDSCxDQUFDLENBQUE7WUFDTSxrQkFBYSxHQUF1QixVQUFDLElBQWM7Z0JBQ3hELEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3pDLEtBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtnQkFDdkQsQ0FBQztZQUNILENBQUMsQ0FBQTtZQUNNLGtCQUFhLEdBQXVCLFVBQUMsSUFBYztnQkFDeEQsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDNUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO2dCQUMvQixDQUFDO1lBQ0gsQ0FBQyxDQUFBO1lBQ00scUJBQWdCLEdBQXVCLFVBQUMsSUFBYztnQkFDM0QsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDNUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO2dCQUM3RCxDQUFDO1lBQ0gsQ0FBQyxDQUFBO1lBQ00sY0FBUyxHQUFlO2dCQUM3QixLQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLGNBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsVUFBQSxDQUFDO29CQUNoRSxDQUFDLENBQUMsUUFBUSxHQUFHLEtBQUksQ0FBQyxXQUFXLENBQUE7b0JBQzdCLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDOUIsQ0FBQyxDQUFDLEVBSDZCLENBRzdCLENBQUMsQ0FBQTtnQkFDSCxLQUFJLENBQUMsWUFBWSxFQUFFLENBQUE7WUFDckIsQ0FBQyxDQUFBO1lBTU8saUJBQVksR0FBZTtnQkFDakMsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO29CQUMvQixLQUFJLENBQUMsMkJBQTJCLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQTtnQkFDbkQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO29CQUNwRCxLQUFJLENBQUMsMkJBQTJCLENBQUMsV0FBVyxHQUFHLDJCQUEyQixHQUFHLEtBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFVBQUEsRUFBRSxJQUFJLE9BQUEsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEVBQWQsQ0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQTtnQkFDMUksSUFBSTtvQkFDRixLQUFJLENBQUMsMkJBQTJCLENBQUMsV0FBVyxHQUFHLHVCQUF1QixHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUEsRUFBRSxJQUFJLE9BQUEsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEVBQWQsQ0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQTtZQUNySSxDQUFDLENBQUE7WUFWQyxJQUFJLENBQUMsMkJBQTJCLEdBQUcsSUFBSSx1Q0FBaUMsQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSwrQkFBeUIsQ0FBQyxhQUFhLENBQUMsQ0FBQTtRQUN4SSxDQUFDO1FBV0gsb0JBQUM7SUFBRCxDQTdFQSxBQTZFQyxJQUFBO0lBN0VZLG1CQUFhLGdCQTZFekIsQ0FBQTtBQUNILENBQUMsRUEzRlMsS0FBSyxLQUFMLEtBQUssUUEyRmQiLCJmaWxlIjoic2NyaXB0cy9jb25maWd1cmF0aW9uLXNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgZmlicmEge1xuICAndXNlIHN0cmljdCdcblxuICBleHBvcnQgY2xhc3MgQ29uZmlndXJhdGlvblNlcnZpY2Uge1xuICAgIHB1YmxpYyBjb25maWd1cmF0aW9uczogQ29uZmlndXJhdGlvbltdID0gW1xuICAgICAgbmV3IENvbmZpZ3VyYXRpb24oJ2xvY2FsJywgJ0xvY2FsJywgJ2h0dHA6Ly9sZGYuZmkvZmlicmEvc3BhcnFsJyksXG4gICAgICBuZXcgQ29uZmlndXJhdGlvbignc2RmYicsICdTaXggRGVncmVlcyBvZiBGcmFuY2lzIEJhY29uJywgJ2h0dHA6Ly9sZGYuZmkvc2RmYi9zcGFycWwnKSxcbiAgICAgIG5ldyBDb25maWd1cmF0aW9uKCdlbWxvJywgJ0VNTE8nLCAnaHR0cDovL2xkZi5maS9lbWxvL3NwYXJxbCcpLFxuICAgICAgbmV3IENvbmZpZ3VyYXRpb24oJ3Byb2NvcGUnLCAnUHJvY29wZScsICdodHRwOi8vbGRmLmZpL3Byb2NvcGUvc3BhcnFsJyksXG4gICAgICBuZXcgQ29uZmlndXJhdGlvbignc2Nob2VuYmVyZycsICdTY2hvZW5iZXJnJywgJ2h0dHA6Ly9sZGYuZmkvc2Nob2VuYmVyZy9zcGFycWwnKSxcbiAgICBdXG4gIH1cblxuICBleHBvcnQgY2xhc3MgQ29uZmlndXJhdGlvbiB7XG4gICAgcHVibGljIGF1dG9jb21wbGV0aW9uQ29uZmlndXJhdGlvbjogU3BhcnFsQXV0b2NvbXBsZXRpb25Db25maWd1cmF0aW9uXG5cbiAgICBwdWJsaWMgY2xhc3NUcmVlOiBUcmVlTm9kZVtdXG5cbiAgICBwcml2YXRlIGFsbG93ZWQ6IHN0cmluZ1tdID0gW11cbiAgICBwcml2YXRlIGRpc2FsbG93ZWQ6IHN0cmluZ1tdID0gW11cblxuICAgIHByaXZhdGUgYWxsU2VsZWN0ZWQ6IGJvb2xlYW4gPSB0cnVlXG5cbiAgICBwdWJsaWMgc2V0Q2xhc3NUcmVlOiAoY2xhc3NUcmVlOiBUcmVlTm9kZVtdKSA9PiB2b2lkID0gKGNsYXNzVHJlZTogVHJlZU5vZGVbXSkgPT4ge1xuICAgICAgY2xhc3NUcmVlLmZvckVhY2godHJlZTIgPT4gVHJlZU5vZGUucmVjdXJzaXZlbHlQcm9jZXNzKHRyZWUyLCB0cmVlTm9kZSA9PiB7XG4gICAgICAgIHRyZWVOb2RlLnNlbGVjdGVkID0gdHJ1ZVxuICAgICAgICB0aGlzLmFsbG93ZWQucHVzaCh0cmVlTm9kZS5pZClcbiAgICAgIH0pKVxuICAgICAgdGhpcy5jbGFzc1RyZWUgPSBjbGFzc1RyZWVcbiAgICAgIHRoaXMuYWxsU2VsZWN0ZWQgPSB0cnVlXG4gICAgfVxuICAgIHB1YmxpYyBhbHRlclNlbGVjdGlvbjogKFRyZWVOb2RlKSA9PiB2b2lkID0gKG5vZGU6IFRyZWVOb2RlKSA9PiB7XG4gICAgICBub2RlLmNoaWxkcmVuLmZvckVhY2goY24gPT4gVHJlZU5vZGUucmVjdXJzaXZlbHlQcm9jZXNzKGNuLCBuID0+IHtcbiAgICAgICAgbi5zZWxlY3RlZCA9IG5vZGUuc2VsZWN0ZWRcbiAgICAgICAgdGhpcy5zZXRBbGxvd2VkRGlzYWxsb3dlZChuKVxuICAgICAgfSkpXG4gICAgICB0aGlzLnNldEFsbG93ZWREaXNhbGxvd2VkKG5vZGUpXG4gICAgICB0aGlzLnVwZGF0ZUZpbHRlcigpXG4gICAgfVxuICAgIHB1YmxpYyBzZXRBbGxvd2VkRGlzYWxsb3dlZDogKFRyZWVOb2RlKSA9PiB2b2lkID0gKG5vZGU6IFRyZWVOb2RlKSA9PiB7XG4gICAgICBpZiAobm9kZS5zZWxlY3RlZCkge1xuICAgICAgICB0aGlzLnJlbW92ZURpc2FsbG93ZWQobm9kZSlcbiAgICAgICAgdGhpcy5hZGRBbGxvd2VkKG5vZGUpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFsbFNlbGVjdGVkID0gZmFsc2VcbiAgICAgICAgdGhpcy5yZW1vdmVBbGxvd2VkKG5vZGUpXG4gICAgICAgIHRoaXMuYWRkRGlzYWxsb3dlZChub2RlKVxuICAgICAgfVxuICAgIH1cbiAgICBwdWJsaWMgYWRkQWxsb3dlZDogKFRyZWVOb2RlKSA9PiB2b2lkID0gKG5vZGU6IFRyZWVOb2RlKSA9PiB7XG4gICAgICBpZiAodGhpcy5hbGxvd2VkLmluZGV4T2Yobm9kZS5pZCkgPT09IC0xKSB7XG4gICAgICAgIHRoaXMuYWxsb3dlZC5wdXNoKG5vZGUuaWQpXG4gICAgICB9XG4gICAgfVxuICAgIHB1YmxpYyByZW1vdmVBbGxvd2VkOiAoVHJlZU5vZGUpID0+IHZvaWQgPSAobm9kZTogVHJlZU5vZGUpID0+IHtcbiAgICAgIGlmICh0aGlzLmFsbG93ZWQuaW5kZXhPZihub2RlLmlkKSAhPT0gLTEpIHtcbiAgICAgICAgdGhpcy5hbGxvd2VkLnNwbGljZSh0aGlzLmFsbG93ZWQuaW5kZXhPZihub2RlLmlkKSwgMSlcbiAgICAgIH1cbiAgICB9XG4gICAgcHVibGljIGFkZERpc2FsbG93ZWQ6IChUcmVlTm9kZSkgPT4gdm9pZCA9IChub2RlOiBUcmVlTm9kZSkgPT4ge1xuICAgICAgaWYgKHRoaXMuZGlzYWxsb3dlZC5pbmRleE9mKG5vZGUuaWQpID09PSAtMSkge1xuICAgICAgICB0aGlzLmRpc2FsbG93ZWQucHVzaChub2RlLmlkKVxuICAgICAgfVxuICAgIH1cbiAgICBwdWJsaWMgcmVtb3ZlRGlzYWxsb3dlZDogKFRyZWVOb2RlKSA9PiB2b2lkID0gKG5vZGU6IFRyZWVOb2RlKSA9PiB7XG4gICAgICBpZiAodGhpcy5kaXNhbGxvd2VkLmluZGV4T2Yobm9kZS5pZCkgIT09IC0xKSB7XG4gICAgICAgIHRoaXMuZGlzYWxsb3dlZC5zcGxpY2UodGhpcy5kaXNhbGxvd2VkLmluZGV4T2Yobm9kZS5pZCksIDEpXG4gICAgICB9XG4gICAgfVxuICAgIHB1YmxpYyB0b2dnbGVBbGw6ICgpID0+IHZvaWQgPSAoKSA9PiB7XG4gICAgICB0aGlzLmNsYXNzVHJlZS5mb3JFYWNoKG5vZGUgPT4gVHJlZU5vZGUucmVjdXJzaXZlbHlQcm9jZXNzKG5vZGUsIG4gPT4ge1xuICAgICAgICBuLnNlbGVjdGVkID0gdGhpcy5hbGxTZWxlY3RlZFxuICAgICAgICB0aGlzLnNldEFsbG93ZWREaXNhbGxvd2VkKG4pXG4gICAgICB9KSlcbiAgICAgIHRoaXMudXBkYXRlRmlsdGVyKClcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgaWQ6IHN0cmluZywgcHVibGljIHRpdGxlOiBzdHJpbmcsIHB1YmxpYyBlbmRwb2ludDogc3RyaW5nKSB7XG4gICAgICB0aGlzLmF1dG9jb21wbGV0aW9uQ29uZmlndXJhdGlvbiA9IG5ldyBTcGFycWxBdXRvY29tcGxldGlvbkNvbmZpZ3VyYXRpb24oaWQsIHRpdGxlLCBlbmRwb2ludCwgU3BhcnFsQXV0b2NvbXBsZXRlU2VydmljZS5xdWVyeVRlbXBsYXRlKVxuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlRmlsdGVyOiAoKSA9PiB2b2lkID0gKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuZGlzYWxsb3dlZC5sZW5ndGggPT09IDApXG4gICAgICAgIHRoaXMuYXV0b2NvbXBsZXRpb25Db25maWd1cmF0aW9uLmNvbnN0cmFpbnRzID0gJydcbiAgICAgIGVsc2UgaWYgKHRoaXMuZGlzYWxsb3dlZC5sZW5ndGggPCB0aGlzLmFsbG93ZWQubGVuZ3RoKVxuICAgICAgICB0aGlzLmF1dG9jb21wbGV0aW9uQ29uZmlndXJhdGlvbi5jb25zdHJhaW50cyA9ICdGSUxURVIgKD9ncm91cElkIE5PVCBJTiAoJyArIHRoaXMuZGlzYWxsb3dlZC5tYXAoaWQgPT4gJzwnICsgaWQgKyAnPicpLmpvaW4oJywgJykgKyAnKSknXG4gICAgICBlbHNlXG4gICAgICAgIHRoaXMuYXV0b2NvbXBsZXRpb25Db25maWd1cmF0aW9uLmNvbnN0cmFpbnRzID0gJ0ZJTFRFUiAoP2dyb3VwSWQgSU4gKCcgKyB0aGlzLmFsbG93ZWQubWFwKGlkID0+ICc8JyArIGlkICsgJz4nKS5qb2luKCcsICcpICsgJykpJ1xuICAgIH1cblxuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

var fibra;
(function (fibra) {
    'use strict';
    var ConfigurationsComponentController = (function () {
        function ConfigurationsComponentController(sparqlTreeService, configurationService) {
            var _this = this;
            this.sparqlTreeService = sparqlTreeService;
            this.configurationService = configurationService;
            this.selectConfiguration = function (c) {
                _this.selectedConfiguration = c;
                if (!c.classTree)
                    _this.sparqlTreeService.getTree(c.endpoint, fibra.SparqlTreeService.getClassTreeQuery).then(c.setClassTree);
            };
            this.configurations = configurationService.configurations;
        }/*<auto_generate>*/ConfigurationsComponentController.$inject = ['sparqlTreeService','configurationService']; ConfigurationsComponentController.$componentName = 'ConfigurationsComponentController'/*</auto_generate>*/
        return ConfigurationsComponentController;
    }());/*<auto_generate>*/angular.module('fibra').controller('ConfigurationsComponentController',ConfigurationsComponentController);/*</auto_generate>*/
    fibra.ConfigurationsComponentController = ConfigurationsComponentController;
    var ConfigurationsComponent = (function () {
        function ConfigurationsComponent() {
            this.controller = ConfigurationsComponentController;
            this.templateUrl = 'partials/configurations.html';
        }/*<auto_generate>*/ConfigurationsComponent.$inject = []; ConfigurationsComponent.$componentName = 'configurations'/*</auto_generate>*/
        return ConfigurationsComponent;
    }());/*<auto_generate>*/angular.module('fibra').component('configurations',new ConfigurationsComponent());/*</auto_generate>*/
    fibra.ConfigurationsComponent = ConfigurationsComponent;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvY29uZmlndXJhdGlvbnMtY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQVUsS0FBSyxDQXVCZDtBQXZCRCxXQUFVLEtBQUssRUFBQyxDQUFDO0lBQ2YsWUFBWSxDQUFBO0lBRVo7UUFXRSwyQ0FBb0IsaUJBQW9DLEVBQVUsb0JBQTBDO1lBWDlHLGlCQWNDO1lBSHFCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7WUFBVSx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1lBTnJHLHdCQUFtQixHQUE0QixVQUFDLENBQWdCO2dCQUNyRSxLQUFJLENBQUMscUJBQXFCLEdBQUcsQ0FBQyxDQUFBO2dCQUM5QixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7b0JBQ2YsS0FBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLHVCQUFpQixDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQTtZQUN4RyxDQUFDLENBQUE7WUFHQyxJQUFJLENBQUMsY0FBYyxHQUFHLG9CQUFvQixDQUFDLGNBQWMsQ0FBQTtRQUMzRCxDQUFDO1FBQ0gsd0NBQUM7SUFBRCxDQWRBLEFBY0MsSUFBQTtJQWRZLHVDQUFpQyxvQ0FjN0MsQ0FBQTtJQUVEO1FBQUE7WUFDVyxlQUFVLEdBQWEsaUNBQWlDLENBQUE7WUFDeEQsZ0JBQVcsR0FBVyw4QkFBOEIsQ0FBQTtRQUMvRCxDQUFDO1FBQUQsOEJBQUM7SUFBRCxDQUhBLEFBR0MsSUFBQTtJQUhZLDZCQUF1QiwwQkFHbkMsQ0FBQTtBQUNILENBQUMsRUF2QlMsS0FBSyxLQUFMLEtBQUssUUF1QmQiLCJmaWxlIjoic2NyaXB0cy9jb25maWd1cmF0aW9ucy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgZmlicmEge1xuICAndXNlIHN0cmljdCdcblxuICBleHBvcnQgY2xhc3MgQ29uZmlndXJhdGlvbnNDb21wb25lbnRDb250cm9sbGVyIHtcbiAgICBwdWJsaWMgY29uZmlndXJhdGlvbnM6IENvbmZpZ3VyYXRpb25bXVxuXG4gICAgcHVibGljIHNlbGVjdGVkQ29uZmlndXJhdGlvbjogQ29uZmlndXJhdGlvblxuXG4gICAgcHVibGljIHNlbGVjdENvbmZpZ3VyYXRpb246IChDb25maWd1cmF0aW9uKSA9PiB2b2lkID0gKGM6IENvbmZpZ3VyYXRpb24pID0+IHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRDb25maWd1cmF0aW9uID0gY1xuICAgICAgaWYgKCFjLmNsYXNzVHJlZSlcbiAgICAgICAgdGhpcy5zcGFycWxUcmVlU2VydmljZS5nZXRUcmVlKGMuZW5kcG9pbnQsIFNwYXJxbFRyZWVTZXJ2aWNlLmdldENsYXNzVHJlZVF1ZXJ5KS50aGVuKGMuc2V0Q2xhc3NUcmVlKVxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc3BhcnFsVHJlZVNlcnZpY2U6IFNwYXJxbFRyZWVTZXJ2aWNlLCBwcml2YXRlIGNvbmZpZ3VyYXRpb25TZXJ2aWNlOiBDb25maWd1cmF0aW9uU2VydmljZSkge1xuICAgICAgdGhpcy5jb25maWd1cmF0aW9ucyA9IGNvbmZpZ3VyYXRpb25TZXJ2aWNlLmNvbmZpZ3VyYXRpb25zXG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRpb25zQ29tcG9uZW50IGltcGxlbWVudHMgYW5ndWxhci5JQ29tcG9uZW50T3B0aW9ucyB7XG4gICAgICBwdWJsaWMgY29udHJvbGxlcjogRnVuY3Rpb24gPSBDb25maWd1cmF0aW9uc0NvbXBvbmVudENvbnRyb2xsZXJcbiAgICAgIHB1YmxpYyB0ZW1wbGF0ZVVybDogc3RyaW5nID0gJ3BhcnRpYWxzL2NvbmZpZ3VyYXRpb25zLmh0bWwnXG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var fibra;
(function (fibra) {
    'use strict';
    var s = fi.seco.sparql;
    (function (NodeType) {
        NodeType[NodeType["Literal"] = 0] = "Literal";
        NodeType[NodeType["IRI"] = 1] = "IRI";
        NodeType[NodeType["BlankNode"] = 2] = "BlankNode";
    })(fibra.NodeType || (fibra.NodeType = {}));
    var NodeType = fibra.NodeType;
    var SparqlBindingNode = (function () {
        function SparqlBindingNode(binding) {
            this.id = s.SparqlService.bindingToString(binding);
            this.value = binding.value;
            switch (binding.type) {
                case 'literal':
                    this.type = NodeType.Literal;
                    this.lang = binding['xml:lang'];
                    this.datatype = binding.datatype;
                    break;
                case 'uri':
                    this.type = NodeType.IRI;
                    break;
                case 'bnode':
                    this.type = NodeType.BlankNode;
                    break;
                default: throw 'Unknown binding type ' + binding.type + ' for ' + binding;
            }
        }
        return SparqlBindingNode;
    }());
    fibra.SparqlBindingNode = SparqlBindingNode;
    var NodeNode = (function () {
        function NodeNode(other) {
            this.other = other;
            this.id = other.id;
            this.type = other.type;
            this.value = other.value;
            this.lang = other.lang;
            this.datatype = other.datatype;
        }
        return NodeNode;
    }());
    fibra.NodeNode = NodeNode;
    var IdNode = (function () {
        function IdNode(id) {
            this.id = id;
            if (id.indexOf('<') === 0) {
                this.type = NodeType.IRI;
                this.value = id.substring(1, id.length - 1);
            }
            else if (id.indexOf('_:') === 0) {
                this.type = NodeType.BlankNode;
                this.value = id.substring(2);
            }
            else if (id.indexOf('"') === 0) {
                this.type = NodeType.Literal;
                this.value = id.substring(1, id.lastIndexOf('"'));
                if (id.lastIndexOf('@') === id.lastIndexOf('"') + 1)
                    this.lang = id.substring(id.lastIndexOf('@'));
                else if (id.lastIndexOf('^^<') === id.lastIndexOf('"') + 1)
                    this.datatype = id.substring(id.lastIndexOf('^^<'), id.length - 1);
            }
            else {
                throw 'Number datatypes not done yet';
            }
        }
        return IdNode;
    }());
    fibra.IdNode = IdNode;
    var IRI = (function () {
        function IRI(value) {
            this.value = value;
            this.type = NodeType.IRI;
            this.id = '<' + value + '>';
        }
        return IRI;
    }());
    fibra.IRI = IRI;
    var BlankNode = (function () {
        function BlankNode(value) {
            this.value = value;
            this.type = NodeType.BlankNode;
            this.id = '_:' + value;
        }
        return BlankNode;
    }());
    fibra.BlankNode = BlankNode;
    var Literal = (function () {
        function Literal(value, lang, datatype) {
            this.value = value;
            this.lang = lang;
            this.datatype = datatype;
            this.type = NodeType.Literal;
            if (datatype)
                switch (datatype) {
                    case 'http://www.w3.org/2001/XMLSchema#integer':
                    case 'http://www.w3.org/2001/XMLSchema#decimal':
                    case 'http://www.w3.org/2001/XMLSchema#double':
                    case 'http://www.w3.org/2001/XMLSchema#boolean':
                        this.id = value;
                        break;
                    case 'http://www.w3.org/2001/XMLSchema#string':
                        this.id = '"' + value + '"';
                        break;
                    default:
                        this.id = '"' + value + '"^^<' + datatype + '>';
                        break;
                }
            else if (lang)
                this.id = '"' + value + '"@' + lang;
            else
                this.id = '"' + value + '"';
        }
        return Literal;
    }());
    fibra.Literal = Literal;
    var NodePlusLabel = (function (_super) {
        __extends(NodePlusLabel, _super);
        function NodePlusLabel(node, label) {
            _super.call(this, node);
            this.node = node;
            this.label = label;
        }
        return NodePlusLabel;
    }(NodeNode));
    fibra.NodePlusLabel = NodePlusLabel;
    var PropertyToValues = (function (_super) {
        __extends(PropertyToValues, _super);
        function PropertyToValues(property) {
            _super.call(this, new SparqlBindingNode(property));
            this.values = [];
        }
        return PropertyToValues;
    }(NodePlusLabel));
    fibra.PropertyToValues = PropertyToValues;
    var Item = (function (_super) {
        __extends(Item, _super);
        function Item() {
            _super.apply(this, arguments);
            this.properties = [];
            this.inverseProperties = [];
        }
        return Item;
    }(NodePlusLabel));
    fibra.Item = Item;
    var Triple = (function () {
        function Triple(subject, property, object) {
            this.subject = subject;
            this.property = property;
            this.object = object;
        }
        return Triple;
    }());
    fibra.Triple = Triple;
    var Quad = (function (_super) {
        __extends(Quad, _super);
        function Quad(subject, property, object, graph) {
            _super.call(this, subject, property, object);
            this.graph = graph;
        }
        return Quad;
    }(Triple));
    fibra.Quad = Quad;
    var Graph = (function () {
        function Graph(graph, triples) {
            if (triples === void 0) { triples = []; }
            this.graph = graph;
            this.triples = triples;
        }
        return Graph;
    }());
    fibra.Graph = Graph;
    var SKOS = (function () {
        function SKOS() {
        }
        SKOS.ns = 'http://www.w3.org/2004/02/skos/core#';
        SKOS.prefLabel = new IRI(SKOS.ns + 'prefLabel');
        return SKOS;
    }());
    fibra.SKOS = SKOS;
    var OWL = (function () {
        function OWL() {
        }
        OWL.ns = 'http://www.w3.org/2002/07/owl#';
        OWL.sameAs = new IRI(OWL.ns + 'sameAs');
        return OWL;
    }());
    fibra.OWL = OWL;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,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U0FNbEIsQ0FBQTtJQUVEO1FBQTBCLHdCQUFNO1FBQzlCLGNBQ0UsT0FBYyxFQUNkLFFBQWUsRUFDZixNQUFhLEVBQ04sS0FBWTtZQUNqQixrQkFBTSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFBO1lBRDNCLFVBQUssR0FBTCxLQUFLLENBQU87UUFDZ0IsQ0FBQztRQUN4QyxXQUFDO0lBQUQsQ0FQQSxBQU9DLENBUHlCLE1BQU0sR0FPL0I7SUFQWSxVQUFJLE9BT2hCLENBQUE7SUFFRDtRQUNFLGVBQ1MsS0FBYSxFQUNiLE9BQXNCO1lBQTdCLHVCQUE2QixHQUE3QixZQUE2QjtZQUR0QixVQUFLLEdBQUwsS0FBSyxDQUFRO1lBQ2IsWUFBTyxHQUFQLE9BQU8sQ0FBZTtRQUM1QixDQUFDO1FBQ04sWUFBQztJQUFELENBTEEsQUFLQyxJQUFBO0lBTFksV0FBSyxRQUtqQixDQUFBO0lBRUQ7UUFBQTtRQUdBLENBQUM7UUFGZSxPQUFFLEdBQVcsc0NBQXNDLENBQUE7UUFDbkQsY0FBUyxHQUFRLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsV0FBVyxDQUFDLENBQUE7UUFDL0QsV0FBQztJQUFELENBSEEsQUFHQyxJQUFBO0lBSFksVUFBSSxPQUdoQixDQUFBO0lBRUQ7UUFBQTtRQUdBLENBQUM7UUFGZSxNQUFFLEdBQVcsZ0NBQWdDLENBQUE7UUFDN0MsVUFBTSxHQUFRLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsUUFBUSxDQUFDLENBQUE7UUFDeEQsVUFBQztJQUFELENBSEEsQUFHQyxJQUFBO0lBSFksU0FBRyxNQUdmLENBQUE7QUFFSCxDQUFDLEVBOUtTLEtBQUssS0FBTCxLQUFLLFFBOEtkIiwiZmlsZSI6InNjcmlwdHMvcmRmLmpzIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIGZpYnJhIHtcbiAgJ3VzZSBzdHJpY3QnXG5cbiAgaW1wb3J0IHMgPSBmaS5zZWNvLnNwYXJxbFxuXG4gIGV4cG9ydCBlbnVtIE5vZGVUeXBlIHtcbiAgICBMaXRlcmFsLFxuICAgIElSSSxcbiAgICBCbGFua05vZGVcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgSU5vZGUge1xuICAgIGlkOiBzdHJpbmdcbiAgICB2YWx1ZTogc3RyaW5nXG4gICAgdHlwZTogTm9kZVR5cGVcbiAgICBsYW5nPzogc3RyaW5nXG4gICAgZGF0YXR5cGU/OiBzdHJpbmdcbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBTcGFycWxCaW5kaW5nTm9kZSBpbXBsZW1lbnRzIElOb2RlIHtcbiAgICBwdWJsaWMgaWQ6IHN0cmluZ1xuICAgIHB1YmxpYyB2YWx1ZTogc3RyaW5nXG4gICAgcHVibGljIHR5cGU6IE5vZGVUeXBlXG4gICAgcHVibGljIGxhbmc6IHN0cmluZ1xuICAgIHB1YmxpYyBkYXRhdHlwZTogc3RyaW5nXG4gICAgY29uc3RydWN0b3IoYmluZGluZzogcy5JU3BhcnFsQmluZGluZykge1xuICAgICAgdGhpcy5pZCA9IHMuU3BhcnFsU2VydmljZS5iaW5kaW5nVG9TdHJpbmcoYmluZGluZylcbiAgICAgIHRoaXMudmFsdWUgPSBiaW5kaW5nLnZhbHVlXG4gICAgICBzd2l0Y2ggKGJpbmRpbmcudHlwZSkge1xuICAgICAgICBjYXNlICdsaXRlcmFsJzpcbiAgICAgICAgICB0aGlzLnR5cGUgPSBOb2RlVHlwZS5MaXRlcmFsXG4gICAgICAgICAgdGhpcy5sYW5nID0gYmluZGluZ1sneG1sOmxhbmcnXVxuICAgICAgICAgIHRoaXMuZGF0YXR5cGUgPSBiaW5kaW5nLmRhdGF0eXBlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAndXJpJzpcbiAgICAgICAgICB0aGlzLnR5cGUgPSBOb2RlVHlwZS5JUklcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICdibm9kZSc6XG4gICAgICAgICAgdGhpcy50eXBlID0gTm9kZVR5cGUuQmxhbmtOb2RlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgZGVmYXVsdDogdGhyb3cgJ1Vua25vd24gYmluZGluZyB0eXBlICcgKyBiaW5kaW5nLnR5cGUgKyAnIGZvciAnICsgYmluZGluZ1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBOb2RlTm9kZSBpbXBsZW1lbnRzIElOb2RlIHtcbiAgICBwdWJsaWMgaWQ6IHN0cmluZ1xuICAgIHB1YmxpYyB0eXBlOiBOb2RlVHlwZVxuICAgIHB1YmxpYyB2YWx1ZTogc3RyaW5nXG4gICAgcHVibGljIGxhbmc6IHN0cmluZ1xuICAgIHB1YmxpYyBkYXRhdHlwZTogc3RyaW5nXG4gICAgY29uc3RydWN0b3IocHVibGljIG90aGVyOiBJTm9kZSkge1xuICAgICAgdGhpcy5pZCA9IG90aGVyLmlkXG4gICAgICB0aGlzLnR5cGUgPSBvdGhlci50eXBlXG4gICAgICB0aGlzLnZhbHVlID0gb3RoZXIudmFsdWVcbiAgICAgIHRoaXMubGFuZyA9IG90aGVyLmxhbmdcbiAgICAgIHRoaXMuZGF0YXR5cGUgPSBvdGhlci5kYXRhdHlwZVxuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBJZE5vZGUgaW1wbGVtZW50cyBJTm9kZSB7XG4gICAgcHVibGljIHR5cGU6IE5vZGVUeXBlXG4gICAgcHVibGljIHZhbHVlOiBzdHJpbmdcbiAgICBwdWJsaWMgbGFuZzogc3RyaW5nXG4gICAgcHVibGljIGRhdGF0eXBlOiBzdHJpbmdcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgaWQ6IHN0cmluZykge1xuICAgICAgaWYgKGlkLmluZGV4T2YoJzwnKSA9PT0gMCkge1xuICAgICAgICB0aGlzLnR5cGUgPSBOb2RlVHlwZS5JUklcbiAgICAgICAgdGhpcy52YWx1ZSA9IGlkLnN1YnN0cmluZygxLCBpZC5sZW5ndGggLSAxKVxuICAgICAgfSBlbHNlIGlmIChpZC5pbmRleE9mKCdfOicpID09PSAwKSB7XG4gICAgICAgIHRoaXMudHlwZSA9IE5vZGVUeXBlLkJsYW5rTm9kZVxuICAgICAgICB0aGlzLnZhbHVlID0gaWQuc3Vic3RyaW5nKDIpXG4gICAgICB9IGVsc2UgaWYgKGlkLmluZGV4T2YoJ1wiJykgPT09IDApIHtcbiAgICAgICAgdGhpcy50eXBlID0gTm9kZVR5cGUuTGl0ZXJhbFxuICAgICAgICB0aGlzLnZhbHVlID0gaWQuc3Vic3RyaW5nKDEsIGlkLmxhc3RJbmRleE9mKCdcIicpKVxuICAgICAgICBpZiAoaWQubGFzdEluZGV4T2YoJ0AnKSA9PT0gaWQubGFzdEluZGV4T2YoJ1wiJykgKyAxKVxuICAgICAgICAgIHRoaXMubGFuZyA9IGlkLnN1YnN0cmluZyhpZC5sYXN0SW5kZXhPZignQCcpKVxuICAgICAgICBlbHNlIGlmIChpZC5sYXN0SW5kZXhPZignXl48JykgPT09IGlkLmxhc3RJbmRleE9mKCdcIicpICsgMSlcbiAgICAgICAgICB0aGlzLmRhdGF0eXBlID0gaWQuc3Vic3RyaW5nKGlkLmxhc3RJbmRleE9mKCdeXjwnKSwgaWQubGVuZ3RoIC0gMSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93ICdOdW1iZXIgZGF0YXR5cGVzIG5vdCBkb25lIHlldCdcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgSVJJIGltcGxlbWVudHMgSU5vZGUge1xuICAgIHB1YmxpYyB0eXBlOiBOb2RlVHlwZSA9IE5vZGVUeXBlLklSSVxuICAgIHB1YmxpYyBpZDogc3RyaW5nXG4gICAgY29uc3RydWN0b3IocHVibGljIHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgIHRoaXMuaWQgPSAnPCcgKyB2YWx1ZSArICc+J1xuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBCbGFua05vZGUgaW1wbGVtZW50cyBJTm9kZSB7XG4gICAgcHVibGljIHR5cGU6IE5vZGVUeXBlID0gTm9kZVR5cGUuQmxhbmtOb2RlXG4gICAgcHVibGljIGlkOiBzdHJpbmdcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdmFsdWU6IHN0cmluZykge1xuICAgICAgdGhpcy5pZCA9ICdfOicgKyB2YWx1ZVxuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBMaXRlcmFsIGltcGxlbWVudHMgSU5vZGUge1xuICAgIHB1YmxpYyB0eXBlOiBOb2RlVHlwZSA9IE5vZGVUeXBlLkxpdGVyYWxcbiAgICBwdWJsaWMgaWQ6IHN0cmluZ1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB2YWx1ZTogc3RyaW5nLCBwdWJsaWMgbGFuZz86IHN0cmluZywgcHVibGljIGRhdGF0eXBlPzogc3RyaW5nKSB7XG4gICAgICBpZiAoZGF0YXR5cGUpIHN3aXRjaCAoZGF0YXR5cGUpIHtcbiAgICAgICAgY2FzZSAnaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEjaW50ZWdlcic6XG4gICAgICAgIGNhc2UgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDEvWE1MU2NoZW1hI2RlY2ltYWwnOlxuICAgICAgICBjYXNlICdodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYSNkb3VibGUnOlxuICAgICAgICBjYXNlICdodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYSNib29sZWFuJzogdGhpcy5pZCA9IHZhbHVlOyBicmVha1xuICAgICAgICBjYXNlICdodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYSNzdHJpbmcnOiB0aGlzLmlkID0gJ1wiJyArIHZhbHVlICsgJ1wiJzsgYnJlYWtcbiAgICAgICAgZGVmYXVsdDogdGhpcy5pZCA9ICdcIicgKyB2YWx1ZSArICdcIl5ePCcgKyBkYXRhdHlwZSArICc+JzsgYnJlYWtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGxhbmcpIHRoaXMuaWQgPSAnXCInICsgdmFsdWUgKyAnXCJAJyArIGxhbmdcbiAgICAgIGVsc2UgdGhpcy5pZCA9ICdcIicgKyB2YWx1ZSArICdcIidcbiAgICB9XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIElOb2RlUGx1c0xhYmVsIGV4dGVuZHMgSU5vZGUge1xuICAgIGxhYmVsOiBJTm9kZVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIE5vZGVQbHVzTGFiZWwgZXh0ZW5kcyBOb2RlTm9kZSBpbXBsZW1lbnRzIElOb2RlUGx1c0xhYmVsIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbm9kZTogSU5vZGUsIHB1YmxpYyBsYWJlbD86IElOb2RlKSB7XG4gICAgICBzdXBlcihub2RlKVxuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBQcm9wZXJ0eVRvVmFsdWVzIGV4dGVuZHMgTm9kZVBsdXNMYWJlbCB7XG4gICAgcHVibGljIHZhbHVlczogTm9kZVBsdXNMYWJlbFtdID0gW11cbiAgICBjb25zdHJ1Y3Rvcihwcm9wZXJ0eTogcy5JU3BhcnFsQmluZGluZykge1xuICAgICAgc3VwZXIobmV3IFNwYXJxbEJpbmRpbmdOb2RlKHByb3BlcnR5KSlcbiAgICB9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgSXRlbSBleHRlbmRzIE5vZGVQbHVzTGFiZWwge1xuICAgIHB1YmxpYyBwcm9wZXJ0aWVzOiBQcm9wZXJ0eVRvVmFsdWVzW10gPSBbXVxuICAgIHB1YmxpYyBpbnZlcnNlUHJvcGVydGllczogUHJvcGVydHlUb1ZhbHVlc1tdID0gW11cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBUcmlwbGUge1xuICAgIGNvbnN0cnVjdG9yIChcbiAgICAgIHB1YmxpYyBzdWJqZWN0OiBJTm9kZSxcbiAgICAgIHB1YmxpYyBwcm9wZXJ0eTogSU5vZGUsXG4gICAgICBwdWJsaWMgb2JqZWN0OiBJTm9kZVxuICAgICkge31cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBRdWFkIGV4dGVuZHMgVHJpcGxlIHtcbiAgICBjb25zdHJ1Y3RvciAoXG4gICAgICBzdWJqZWN0OiBJTm9kZSxcbiAgICAgIHByb3BlcnR5OiBJTm9kZSxcbiAgICAgIG9iamVjdDogSU5vZGUsXG4gICAgICBwdWJsaWMgZ3JhcGg6IElOb2RlXG4gICAgKSB7IHN1cGVyKHN1YmplY3QsIHByb3BlcnR5LCBvYmplY3QpIH1cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBHcmFwaCB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgZ3JhcGg/OiBJTm9kZSxcbiAgICAgIHB1YmxpYyB0cmlwbGVzOiBUcmlwbGVbXSA9IFtdXG4gICAgKSB7fVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIFNLT1Mge1xuICAgIHB1YmxpYyBzdGF0aWMgbnM6IHN0cmluZyA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDA0LzAyL3Nrb3MvY29yZSMnXG4gICAgcHVibGljIHN0YXRpYyBwcmVmTGFiZWw6IElSSSA9IG5ldyBJUkkoU0tPUy5ucyArICdwcmVmTGFiZWwnKVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIE9XTCB7XG4gICAgcHVibGljIHN0YXRpYyBuczogc3RyaW5nID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDIvMDcvb3dsIydcbiAgICBwdWJsaWMgc3RhdGljIHNhbWVBczogSVJJID0gbmV3IElSSShPV0wubnMgKyAnc2FtZUFzJylcbiAgfVxuXG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

var fibra;
(function (fibra) {
    'use strict';
    var SparqlAutocompleteComponentController = (function () {
        function SparqlAutocompleteComponentController($q, sparqlAutocompleteService, configurationService) {
            var _this = this;
            this.$q = $q;
            this.sparqlAutocompleteService = sparqlAutocompleteService;
            this.configurationService = configurationService;
            this.configurations = this.configurationService.configurations.map(function (c) { return c.autocompletionConfiguration; });
            this.error = false;
            this.onChange = function (query) {
                _this.canceller.resolve();
                _this.canceller = _this.$q.defer();
                _this.queryRunning = true;
                _this.error = false;
                _this.sparqlAutocompleteService.autocomplete(query, _this.limit, _this.configurations, _this.canceller.promise).then(function (resultsByDatasource) {
                    _this.resultsByDatasource = resultsByDatasource;
                    _this.queryRunning = false;
                }, function () {
                    _this.queryRunning = false;
                    _this.error = true;
                });
            };
            this.canceller = $q.defer();
        }/*<auto_generate>*/SparqlAutocompleteComponentController.$inject = ['$q','sparqlAutocompleteService','configurationService']; SparqlAutocompleteComponentController.$componentName = 'SparqlAutocompleteComponentController'/*</auto_generate>*/
        return SparqlAutocompleteComponentController;
    }());/*<auto_generate>*/angular.module('fibra').controller('SparqlAutocompleteComponentController',SparqlAutocompleteComponentController);/*</auto_generate>*/
    var SparqlAutocompleteComponent = (function () {
        function SparqlAutocompleteComponent() {
            this.bindings = {
                constraints: '<',
                limit: '@',
                onSelect: '&'
            };
            this.controller = SparqlAutocompleteComponentController;
            this.templateUrl = 'partials/sparql-autocomplete.html';
        }/*<auto_generate>*/SparqlAutocompleteComponent.$inject = []; SparqlAutocompleteComponent.$componentName = 'sparqlAutocomplete'/*</auto_generate>*/
        return SparqlAutocompleteComponent;
    }());/*<auto_generate>*/angular.module('fibra').component('sparqlAutocomplete',new SparqlAutocompleteComponent());/*</auto_generate>*/
    fibra.SparqlAutocompleteComponent = SparqlAutocompleteComponent;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvc3BhcnFsLWF1dG9jb21wbGV0ZS1jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBVSxLQUFLLENBd0NkO0FBeENELFdBQVUsS0FBSyxFQUFDLENBQUM7SUFDZixZQUFZLENBQUE7SUFDWjtRQXdCRSwrQ0FBb0IsRUFBcUIsRUFBVSx5QkFBb0QsRUFBVSxvQkFBMEM7WUF4QjdKLGlCQTJCQztZQUhxQixPQUFFLEdBQUYsRUFBRSxDQUFtQjtZQUFVLDhCQUF5QixHQUF6Qix5QkFBeUIsQ0FBMkI7WUFBVSx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1lBdkJwSixtQkFBYyxHQUF3QyxJQUFJLENBQUMsb0JBQW9CLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQywyQkFBMkIsRUFBN0IsQ0FBNkIsQ0FBQyxDQUFBO1lBSXRJLFVBQUssR0FBWSxLQUFLLENBQUE7WUFHdEIsYUFBUSxHQUE0QixVQUFDLEtBQWE7Z0JBQ3ZELEtBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUE7Z0JBQ3hCLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtnQkFDaEMsS0FBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUE7Z0JBQ3hCLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO2dCQUNsQixLQUFJLENBQUMseUJBQXlCLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxLQUFJLENBQUMsS0FBSyxFQUFFLEtBQUksQ0FBQyxjQUFjLEVBQUUsS0FBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQzlHLFVBQUMsbUJBQTBDO29CQUN6QyxLQUFJLENBQUMsbUJBQW1CLEdBQUcsbUJBQW1CLENBQUE7b0JBQzlDLEtBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFBO2dCQUMzQixDQUFDLEVBQ0Q7b0JBQ0UsS0FBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUE7b0JBQ3pCLEtBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFBO2dCQUNuQixDQUFDLENBQ0YsQ0FBQTtZQUNILENBQUMsQ0FBQTtZQUVDLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFBO1FBQzdCLENBQUM7UUFDSCw0Q0FBQztJQUFELENBM0JBLEFBMkJDLElBQUE7SUFFRDtRQUFBO1lBQ1csYUFBUSxHQUEyQjtnQkFDeEMsV0FBVyxFQUFFLEdBQUc7Z0JBQ2hCLEtBQUssRUFBRSxHQUFHO2dCQUNWLFFBQVEsRUFBRSxHQUFHO2FBQ2QsQ0FBQTtZQUNNLGVBQVUsR0FBYSxxQ0FBcUMsQ0FBQTtZQUM1RCxnQkFBVyxHQUFXLG1DQUFtQyxDQUFBO1FBQ3BFLENBQUM7UUFBRCxrQ0FBQztJQUFELENBUkEsQUFRQyxJQUFBO0lBUlksaUNBQTJCLDhCQVF2QyxDQUFBO0FBQ0gsQ0FBQyxFQXhDUyxLQUFLLEtBQUwsS0FBSyxRQXdDZCIsImZpbGUiOiJzY3JpcHRzL3NwYXJxbC1hdXRvY29tcGxldGUtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIGZpYnJhIHtcbiAgJ3VzZSBzdHJpY3QnXG4gIGNsYXNzIFNwYXJxbEF1dG9jb21wbGV0ZUNvbXBvbmVudENvbnRyb2xsZXIge1xuICAgIHB1YmxpYyBjb25maWd1cmF0aW9uczogU3BhcnFsQXV0b2NvbXBsZXRpb25Db25maWd1cmF0aW9uW10gPSB0aGlzLmNvbmZpZ3VyYXRpb25TZXJ2aWNlLmNvbmZpZ3VyYXRpb25zLm1hcChjID0+IGMuYXV0b2NvbXBsZXRpb25Db25maWd1cmF0aW9uKVxuICAgIHB1YmxpYyBsaW1pdDogbnVtYmVyXG4gICAgcHVibGljIHF1ZXJ5UnVubmluZzogYm9vbGVhblxuICAgIHB1YmxpYyBvblNlbGVjdDogKHNlbGVjdGlvbjogUmVzdWx0KSA9PiB2b2lkXG4gICAgcHVibGljIGVycm9yOiBib29sZWFuID0gZmFsc2VcbiAgICBwcml2YXRlIHJlc3VsdHNCeURhdGFzb3VyY2U6IFJlc3VsdHNCeURhdGFzb3VyY2VbXVxuICAgIHByaXZhdGUgY2FuY2VsbGVyOiBhbmd1bGFyLklEZWZlcnJlZDxhbnk+XG4gICAgcHVibGljIG9uQ2hhbmdlOiAocXVlcnk6IHN0cmluZykgPT4gdm9pZCA9IChxdWVyeTogc3RyaW5nKSA9PiB7XG4gICAgICB0aGlzLmNhbmNlbGxlci5yZXNvbHZlKClcbiAgICAgIHRoaXMuY2FuY2VsbGVyID0gdGhpcy4kcS5kZWZlcigpXG4gICAgICB0aGlzLnF1ZXJ5UnVubmluZyA9IHRydWVcbiAgICAgIHRoaXMuZXJyb3IgPSBmYWxzZVxuICAgICAgdGhpcy5zcGFycWxBdXRvY29tcGxldGVTZXJ2aWNlLmF1dG9jb21wbGV0ZShxdWVyeSwgdGhpcy5saW1pdCwgdGhpcy5jb25maWd1cmF0aW9ucywgdGhpcy5jYW5jZWxsZXIucHJvbWlzZSkudGhlbihcbiAgICAgICAgKHJlc3VsdHNCeURhdGFzb3VyY2U6IFJlc3VsdHNCeURhdGFzb3VyY2VbXSkgPT4ge1xuICAgICAgICAgIHRoaXMucmVzdWx0c0J5RGF0YXNvdXJjZSA9IHJlc3VsdHNCeURhdGFzb3VyY2VcbiAgICAgICAgICB0aGlzLnF1ZXJ5UnVubmluZyA9IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICB0aGlzLnF1ZXJ5UnVubmluZyA9IGZhbHNlXG4gICAgICAgICAgdGhpcy5lcnJvciA9IHRydWVcbiAgICAgICAgfVxuICAgICAgKVxuICAgIH1cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRxOiBhbmd1bGFyLklRU2VydmljZSwgcHJpdmF0ZSBzcGFycWxBdXRvY29tcGxldGVTZXJ2aWNlOiBTcGFycWxBdXRvY29tcGxldGVTZXJ2aWNlLCBwcml2YXRlIGNvbmZpZ3VyYXRpb25TZXJ2aWNlOiBDb25maWd1cmF0aW9uU2VydmljZSkge1xuICAgICAgdGhpcy5jYW5jZWxsZXIgPSAkcS5kZWZlcigpXG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIFNwYXJxbEF1dG9jb21wbGV0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIGFuZ3VsYXIuSUNvbXBvbmVudE9wdGlvbnMge1xuICAgICAgcHVibGljIGJpbmRpbmdzOiB7W2lkOiBzdHJpbmddOiBzdHJpbmd9ID0ge1xuICAgICAgICBjb25zdHJhaW50czogJzwnLFxuICAgICAgICBsaW1pdDogJ0AnLFxuICAgICAgICBvblNlbGVjdDogJyYnXG4gICAgICB9XG4gICAgICBwdWJsaWMgY29udHJvbGxlcjogRnVuY3Rpb24gPSBTcGFycWxBdXRvY29tcGxldGVDb21wb25lbnRDb250cm9sbGVyXG4gICAgICBwdWJsaWMgdGVtcGxhdGVVcmw6IHN0cmluZyA9ICdwYXJ0aWFscy9zcGFycWwtYXV0b2NvbXBsZXRlLmh0bWwnXG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

var fibra;
(function (fibra) {
    'use strict';
    var s = fi.seco.sparql;
    var ResultsByDatasource = (function () {
        function ResultsByDatasource(configuration) {
            this.configuration = configuration;
            this.resultsByGroup = [];
        }
        return ResultsByDatasource;
    }());
    fibra.ResultsByDatasource = ResultsByDatasource;
    var ResultGroup = (function () {
        function ResultGroup(label) {
            this.label = label;
            this.results = [];
        }
        return ResultGroup;
    }());
    fibra.ResultGroup = ResultGroup;
    var Result = (function () {
        function Result(id, resultGroup, datasource, matchedLabel, prefLabel, additionalInformation) {
            this.id = id;
            this.resultGroup = resultGroup;
            this.datasource = datasource;
            this.matchedLabel = matchedLabel;
            this.prefLabel = prefLabel;
            this.additionalInformation = additionalInformation;
        }
        return Result;
    }());
    fibra.Result = Result;
    var SparqlAutocompletionConfiguration = (function () {
        function SparqlAutocompletionConfiguration(id, title, endpoint, queryTemplate) {
            this.id = id;
            this.title = title;
            this.endpoint = endpoint;
            this.queryTemplate = queryTemplate;
            this.constraints = '';
        }
        return SparqlAutocompletionConfiguration;
    }());
    fibra.SparqlAutocompletionConfiguration = SparqlAutocompletionConfiguration;
    var SparqlAutocompleteService = (function () {
        function SparqlAutocompleteService(workerService) {
            this.workerService = workerService;
        }/*<auto_generate>*/SparqlAutocompleteService.$inject = ['workerService']; SparqlAutocompleteService.$componentName = 'sparqlAutocompleteService'/*</auto_generate>*/
        SparqlAutocompleteService.prototype.autocomplete = function (query, limit, configurations, canceller) {
            return this.workerService.call('sparqlAutocompleteWorkerService', 'autocomplete', [query, limit, configurations], canceller);
        };
        SparqlAutocompleteService.queryTemplate = "\nPREFIX text: <http://jena.apache.org/text#>\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\nPREFIX skos: <http://www.w3.org/2004/02/skos/core#>\nPREFIX sf: <http://ldf.fi/functions#>\nSELECT ?groupId ?groupLabel ?id (SAMPLE(?matchedLabelS) AS ?matchedLabel) ?prefLabel (GROUP_CONCAT(?altLabel;SEPARATOR=', ') AS ?additionalInformation) {\n  {\n    SELECT DISTINCT ?groupId ?id {\n      {\n        SELECT DISTINCT ?groupId ?id {\n          BIND(CONCAT(\"\\\"\",REPLACE(<QUERY>,\"([\\\\+\\\\-\\\\&\\\\|\\\\!\\\\(\\\\)\\\\{\\\\}\\\\[\\\\]\\\\^\\\\\\\"\\\\~\\\\*\\\\?\\\\:\\\\/\\\\\\\\])\",\"\\\\$1\"),\"\\\"\") AS ?query)\n          ?id text:query ?query .\n          ?id a ?groupId .\n          FILTER EXISTS {\n            ?groupId skos:prefLabel|rdfs:label ?groupLabel\n          }\n          # CONSTRAINTS\n        } LIMIT <LIMIT>\n      } UNION {\n        BIND(CONCAT(REPLACE(<QUERY>,\"([\\\\+\\\\-\\\\&\\\\|\\\\!\\\\(\\\\)\\\\{\\\\}\\\\[\\\\]\\\\^\\\\\\\"\\\\~\\\\*\\\\?\\\\:\\\\/\\\\\\\\])\",\"\\\\$1\"),\"*\") AS ?query)\n        ?id text:query ?query .\n        ?id a ?groupId .\n        FILTER EXISTS {\n          ?groupId skos:prefLabel|rdfs:label ?groupLabel\n        }\n        # CONSTRAINTS\n      }\n    }\n  }\n  ?id skos:prefLabel|rdfs:label|skos:altLabel ?matchedLabelS\n  FILTER (REGEX(LCASE(?matchedLabelS),CONCAT(\"\\\\b\",LCASE(<QUERY>))))\n  ?groupId sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?groupLabel) .\n  ?id sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?prefLabel) .\n  OPTIONAL {\n    ?id skos:altLabel ?altLabel .\n  }\n}\nGROUP BY ?groupId ?groupLabel ?id ?prefLabel\nHAVING(BOUND(?id) && COUNT(?altLabel)<10) # workaround for Schoenberg bug\n";
        return SparqlAutocompleteService;
    }());/*<auto_generate>*/angular.module('fibra').service('sparqlAutocompleteService',SparqlAutocompleteService);/*</auto_generate>*/
    fibra.SparqlAutocompleteService = SparqlAutocompleteService;
    var SparqlAutocompleteWorkerService = (function () {
        function SparqlAutocompleteWorkerService($q, sparqlService) {
            this.$q = $q;
            this.sparqlService = sparqlService;
        }/*<auto_generate>*/SparqlAutocompleteWorkerService.$inject = ['$q','sparqlService']; SparqlAutocompleteWorkerService.$componentName = 'sparqlAutocompleteWorkerService'/*</auto_generate>*/
        SparqlAutocompleteWorkerService.prototype.autocomplete = function (query, limit, configurations, canceller) {
            var _this = this;
            return this.$q.all(configurations.map(function (configuration) {
                var queryTemplate = configuration.queryTemplate;
                queryTemplate = queryTemplate.replace(/<QUERY>/g, s.SparqlService.stringToSPARQLString(query));
                queryTemplate = queryTemplate.replace(/# CONSTRAINTS/g, configuration.constraints);
                queryTemplate = queryTemplate.replace(/<LIMIT>/g, '' + limit);
                return _this.sparqlService.query(configuration.endpoint, queryTemplate, { timeout: canceller }).then(function (response) {
                    var ds = new ResultsByDatasource(configuration);
                    var groupToResults = {};
                    response.data.results.bindings.forEach(function (binding) {
                        if (!groupToResults[binding['groupId'].value])
                            groupToResults[binding['groupId'].value] = new ResultGroup(binding['groupLabel'].value);
                        groupToResults[binding['groupId'].value].results.push(new Result(new fibra.SparqlBindingNode(binding['id']), groupToResults[binding['groupId'].value], ds, binding['matchedLabel'].value, binding['prefLabel'].value, binding['additionalInformation'] ? binding['additionalInformation'].value : ''));
                    });
                    for (var groupId in groupToResults)
                        ds.resultsByGroup.push(groupToResults[groupId]);
                    return ds;
                });
            }));
        };
        return SparqlAutocompleteWorkerService;
    }());/*<auto_generate>*/angular.module('fibra').service('sparqlAutocompleteWorkerService',SparqlAutocompleteWorkerService);/*</auto_generate>*/
    fibra.SparqlAutocompleteWorkerService = SparqlAutocompleteWorkerService;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvc3BhcnFsLWF1dG9jb21wbGV0ZS1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQVUsS0FBSyxDQXlHZDtBQXpHRCxXQUFVLEtBQUssRUFBQyxDQUFDO0lBQ2YsWUFBWSxDQUFBO0lBRVosSUFBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUE7SUFFekI7UUFFRSw2QkFBbUIsYUFBZ0Q7WUFBaEQsa0JBQWEsR0FBYixhQUFhLENBQW1DO1lBRDVELG1CQUFjLEdBQWtCLEVBQUUsQ0FBQTtRQUM2QixDQUFDO1FBQ3pFLDBCQUFDO0lBQUQsQ0FIQSxBQUdDLElBQUE7SUFIWSx5QkFBbUIsc0JBRy9CLENBQUE7SUFFRDtRQUVFLHFCQUFtQixLQUFhO1lBQWIsVUFBSyxHQUFMLEtBQUssQ0FBUTtZQUR6QixZQUFPLEdBQWEsRUFBRSxDQUFBO1FBQ00sQ0FBQztRQUN0QyxrQkFBQztJQUFELENBSEEsQUFHQyxJQUFBO0lBSFksaUJBQVcsY0FHdkIsQ0FBQTtJQUVEO1FBQ0UsZ0JBQW1CLEVBQVMsRUFBUyxXQUF3QixFQUFTLFVBQStCLEVBQVMsWUFBb0IsRUFBUyxTQUFpQixFQUFTLHFCQUE2QjtZQUEvSyxPQUFFLEdBQUYsRUFBRSxDQUFPO1lBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7WUFBUyxlQUFVLEdBQVYsVUFBVSxDQUFxQjtZQUFTLGlCQUFZLEdBQVosWUFBWSxDQUFRO1lBQVMsY0FBUyxHQUFULFNBQVMsQ0FBUTtZQUFTLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBUTtRQUFHLENBQUM7UUFDeE0sYUFBQztJQUFELENBRkEsQUFFQyxJQUFBO0lBRlksWUFBTSxTQUVsQixDQUFBO0lBRUQ7UUFJRSwyQ0FDUyxFQUFVLEVBQ1YsS0FBYSxFQUNiLFFBQWdCLEVBQ2hCLGFBQXFCO1lBSHJCLE9BQUUsR0FBRixFQUFFLENBQVE7WUFDVixVQUFLLEdBQUwsS0FBSyxDQUFRO1lBQ2IsYUFBUSxH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QUF1QixDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUE7b0JBQ2xTLENBQUMsQ0FBQyxDQUFBO29CQUNGLEdBQUcsQ0FBQyxDQUFDLElBQUksT0FBTyxJQUFJLGNBQWMsQ0FBQzt3QkFBQyxFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtvQkFDbkYsTUFBTSxDQUFDLEVBQUUsQ0FBQTtnQkFDWCxDQUFDLENBQ0YsQ0FBQTtZQUNILENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDTCxDQUFDO1FBQ0gsc0NBQUM7SUFBRCxDQXZCQSxBQXVCQyxJQUFBO0lBdkJZLHFDQUErQixrQ0F1QjNDLENBQUE7QUFFSCxDQUFDLEVBekdTLEtBQUssS0FBTCxLQUFLLFFBeUdkIiwiZmlsZSI6InNjcmlwdHMvc3BhcnFsLWF1dG9jb21wbGV0ZS1zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIGZpYnJhIHtcbiAgJ3VzZSBzdHJpY3QnXG5cbiAgaW1wb3J0IHMgPSBmaS5zZWNvLnNwYXJxbFxuXG4gIGV4cG9ydCBjbGFzcyBSZXN1bHRzQnlEYXRhc291cmNlIHtcbiAgICBwdWJsaWMgcmVzdWx0c0J5R3JvdXA6IFJlc3VsdEdyb3VwW10gPSBbXVxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBjb25maWd1cmF0aW9uOiBTcGFycWxBdXRvY29tcGxldGlvbkNvbmZpZ3VyYXRpb24pIHt9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgUmVzdWx0R3JvdXAge1xuICAgIHB1YmxpYyByZXN1bHRzOiBSZXN1bHRbXSA9IFtdXG4gICAgY29uc3RydWN0b3IocHVibGljIGxhYmVsOiBzdHJpbmcpIHt9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgUmVzdWx0IHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgaWQ6IElOb2RlLCBwdWJsaWMgcmVzdWx0R3JvdXA6IFJlc3VsdEdyb3VwLCBwdWJsaWMgZGF0YXNvdXJjZTogUmVzdWx0c0J5RGF0YXNvdXJjZSwgcHVibGljIG1hdGNoZWRMYWJlbDogc3RyaW5nLCBwdWJsaWMgcHJlZkxhYmVsOiBzdHJpbmcsIHB1YmxpYyBhZGRpdGlvbmFsSW5mb3JtYXRpb246IHN0cmluZykge31cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBTcGFycWxBdXRvY29tcGxldGlvbkNvbmZpZ3VyYXRpb24ge1xuXG4gICAgcHVibGljIGNvbnN0cmFpbnRzOiBzdHJpbmcgPSAnJ1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgaWQ6IHN0cmluZyxcbiAgICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nLFxuICAgICAgcHVibGljIGVuZHBvaW50OiBzdHJpbmcsXG4gICAgICBwdWJsaWMgcXVlcnlUZW1wbGF0ZTogc3RyaW5nXG4gICAgKSB7fVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIFNwYXJxbEF1dG9jb21wbGV0ZVNlcnZpY2Uge1xuXG4gICAgcHVibGljIHN0YXRpYyBxdWVyeVRlbXBsYXRlOiBzdHJpbmcgPSBgXG5QUkVGSVggdGV4dDogPGh0dHA6Ly9qZW5hLmFwYWNoZS5vcmcvdGV4dCM+XG5QUkVGSVggcmRmczogPGh0dHA6Ly93d3cudzMub3JnLzIwMDAvMDEvcmRmLXNjaGVtYSM+XG5QUkVGSVggc2tvczogPGh0dHA6Ly93d3cudzMub3JnLzIwMDQvMDIvc2tvcy9jb3JlIz5cblBSRUZJWCBzZjogPGh0dHA6Ly9sZGYuZmkvZnVuY3Rpb25zIz5cblNFTEVDVCA/Z3JvdXBJZCA/Z3JvdXBMYWJlbCA/aWQgKFNBTVBMRSg/bWF0Y2hlZExhYmVsUykgQVMgP21hdGNoZWRMYWJlbCkgP3ByZWZMYWJlbCAoR1JPVVBfQ09OQ0FUKD9hbHRMYWJlbDtTRVBBUkFUT1I9JywgJykgQVMgP2FkZGl0aW9uYWxJbmZvcm1hdGlvbikge1xuICB7XG4gICAgU0VMRUNUIERJU1RJTkNUID9ncm91cElkID9pZCB7XG4gICAgICB7XG4gICAgICAgIFNFTEVDVCBESVNUSU5DVCA/Z3JvdXBJZCA/aWQge1xuICAgICAgICAgIEJJTkQoQ09OQ0FUKFwiXFxcXFwiXCIsUkVQTEFDRSg8UVVFUlk+LFwiKFtcXFxcXFxcXCtcXFxcXFxcXC1cXFxcXFxcXCZcXFxcXFxcXHxcXFxcXFxcXCFcXFxcXFxcXChcXFxcXFxcXClcXFxcXFxcXHtcXFxcXFxcXH1cXFxcXFxcXFtcXFxcXFxcXF1cXFxcXFxcXF5cXFxcXFxcXFxcXFxcIlxcXFxcXFxcflxcXFxcXFxcKlxcXFxcXFxcP1xcXFxcXFxcOlxcXFxcXFxcL1xcXFxcXFxcXFxcXFxcXFxdKVwiLFwiXFxcXFxcXFwkMVwiKSxcIlxcXFxcIlwiKSBBUyA/cXVlcnkpXG4gICAgICAgICAgP2lkIHRleHQ6cXVlcnkgP3F1ZXJ5IC5cbiAgICAgICAgICA/aWQgYSA/Z3JvdXBJZCAuXG4gICAgICAgICAgRklMVEVSIEVYSVNUUyB7XG4gICAgICAgICAgICA/Z3JvdXBJZCBza29zOnByZWZMYWJlbHxyZGZzOmxhYmVsID9ncm91cExhYmVsXG4gICAgICAgICAgfVxuICAgICAgICAgICMgQ09OU1RSQUlOVFNcbiAgICAgICAgfSBMSU1JVCA8TElNSVQ+XG4gICAgICB9IFVOSU9OIHtcbiAgICAgICAgQklORChDT05DQVQoUkVQTEFDRSg8UVVFUlk+LFwiKFtcXFxcXFxcXCtcXFxcXFxcXC1cXFxcXFxcXCZcXFxcXFxcXHxcXFxcXFxcXCFcXFxcXFxcXChcXFxcXFxcXClcXFxcXFxcXHtcXFxcXFxcXH1cXFxcXFxcXFtcXFxcXFxcXF1cXFxcXFxcXF5cXFxcXFxcXFxcXFxcIlxcXFxcXFxcflxcXFxcXFxcKlxcXFxcXFxcP1xcXFxcXFxcOlxcXFxcXFxcL1xcXFxcXFxcXFxcXFxcXFxdKVwiLFwiXFxcXFxcXFwkMVwiKSxcIipcIikgQVMgP3F1ZXJ5KVxuICAgICAgICA/aWQgdGV4dDpxdWVyeSA/cXVlcnkgLlxuICAgICAgICA/aWQgYSA/Z3JvdXBJZCAuXG4gICAgICAgIEZJTFRFUiBFWElTVFMge1xuICAgICAgICAgID9ncm91cElkIHNrb3M6cHJlZkxhYmVsfHJkZnM6bGFiZWwgP2dyb3VwTGFiZWxcbiAgICAgICAgfVxuICAgICAgICAjIENPTlNUUkFJTlRTXG4gICAgICB9XG4gICAgfVxuICB9XG4gID9pZCBza29zOnByZWZMYWJlbHxyZGZzOmxhYmVsfHNrb3M6YWx0TGFiZWwgP21hdGNoZWRMYWJlbFNcbiAgRklMVEVSIChSRUdFWChMQ0FTRSg/bWF0Y2hlZExhYmVsUyksQ09OQ0FUKFwiXFxcXFxcXFxiXCIsTENBU0UoPFFVRVJZPikpKSlcbiAgP2dyb3VwSWQgc2Y6cHJlZmVycmVkTGFuZ3VhZ2VMaXRlcmFsIChza29zOnByZWZMYWJlbCByZGZzOmxhYmVsIHNrb3M6YWx0TGFiZWwgJ2VuJyAnJyA/Z3JvdXBMYWJlbCkgLlxuICA/aWQgc2Y6cHJlZmVycmVkTGFuZ3VhZ2VMaXRlcmFsIChza29zOnByZWZMYWJlbCByZGZzOmxhYmVsIHNrb3M6YWx0TGFiZWwgJ2VuJyAnJyA/cHJlZkxhYmVsKSAuXG4gIE9QVElPTkFMIHtcbiAgICA/aWQgc2tvczphbHRMYWJlbCA/YWx0TGFiZWwgLlxuICB9XG59XG5HUk9VUCBCWSA/Z3JvdXBJZCA/Z3JvdXBMYWJlbCA/aWQgP3ByZWZMYWJlbFxuSEFWSU5HKEJPVU5EKD9pZCkgJiYgQ09VTlQoP2FsdExhYmVsKTwxMCkgIyB3b3JrYXJvdW5kIGZvciBTY2hvZW5iZXJnIGJ1Z1xuYFxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB3b3JrZXJTZXJ2aWNlOiBXb3JrZXJTZXJ2aWNlKSB7fVxuICAgIHB1YmxpYyBhdXRvY29tcGxldGUocXVlcnk6IHN0cmluZywgbGltaXQ6IG51bWJlciwgY29uZmlndXJhdGlvbnM6IFNwYXJxbEF1dG9jb21wbGV0aW9uQ29uZmlndXJhdGlvbltdLCBjYW5jZWxsZXI/OiBhbmd1bGFyLklQcm9taXNlPGFueT4pOiBhbmd1bGFyLklQcm9taXNlPFJlc3VsdHNCeURhdGFzb3VyY2VbXT4ge1xuICAgICAgcmV0dXJuIHRoaXMud29ya2VyU2VydmljZS5jYWxsKCdzcGFycWxBdXRvY29tcGxldGVXb3JrZXJTZXJ2aWNlJywgJ2F1dG9jb21wbGV0ZScsIFtxdWVyeSwgbGltaXQsIGNvbmZpZ3VyYXRpb25zXSwgY2FuY2VsbGVyKVxuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBTcGFycWxBdXRvY29tcGxldGVXb3JrZXJTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRxOiBhbmd1bGFyLklRU2VydmljZSwgcHJpdmF0ZSBzcGFycWxTZXJ2aWNlOiBzLlNwYXJxbFNlcnZpY2UpIHsgfVxuXG4gICAgcHVibGljIGF1dG9jb21wbGV0ZShxdWVyeTogc3RyaW5nLCBsaW1pdDogbnVtYmVyLCBjb25maWd1cmF0aW9uczogU3BhcnFsQXV0b2NvbXBsZXRpb25Db25maWd1cmF0aW9uW10sIGNhbmNlbGxlcj86IGFuZ3VsYXIuSVByb21pc2U8YW55Pik6IGFuZ3VsYXIuSVByb21pc2U8UmVzdWx0c0J5RGF0YXNvdXJjZVtdPiB7XG4gICAgICByZXR1cm4gdGhpcy4kcS5hbGwoY29uZmlndXJhdGlvbnMubWFwKGNvbmZpZ3VyYXRpb24gPT4ge1xuICAgICAgICBsZXQgcXVlcnlUZW1wbGF0ZTogc3RyaW5nID0gY29uZmlndXJhdGlvbi5xdWVyeVRlbXBsYXRlXG4gICAgICAgIHF1ZXJ5VGVtcGxhdGUgPSBxdWVyeVRlbXBsYXRlLnJlcGxhY2UoLzxRVUVSWT4vZywgcy5TcGFycWxTZXJ2aWNlLnN0cmluZ1RvU1BBUlFMU3RyaW5nKHF1ZXJ5KSlcbiAgICAgICAgcXVlcnlUZW1wbGF0ZSA9IHF1ZXJ5VGVtcGxhdGUucmVwbGFjZSgvIyBDT05TVFJBSU5UUy9nLCBjb25maWd1cmF0aW9uLmNvbnN0cmFpbnRzKVxuICAgICAgICBxdWVyeVRlbXBsYXRlID0gcXVlcnlUZW1wbGF0ZS5yZXBsYWNlKC88TElNSVQ+L2csICcnICsgbGltaXQpXG4gICAgICAgIHJldHVybiB0aGlzLnNwYXJxbFNlcnZpY2UucXVlcnkoY29uZmlndXJhdGlvbi5lbmRwb2ludCwgcXVlcnlUZW1wbGF0ZSwge3RpbWVvdXQ6IGNhbmNlbGxlcn0pLnRoZW4oXG4gICAgICAgICAgKHJlc3BvbnNlOiBhbmd1bGFyLklIdHRwUHJvbWlzZUNhbGxiYWNrQXJnPHMuSVNwYXJxbEJpbmRpbmdSZXN1bHQ8e1tpZDogc3RyaW5nXTogcy5JU3BhcnFsQmluZGluZ30+PikgPT4ge1xuICAgICAgICAgICAgbGV0IGRzOiBSZXN1bHRzQnlEYXRhc291cmNlID0gbmV3IFJlc3VsdHNCeURhdGFzb3VyY2UoY29uZmlndXJhdGlvbilcbiAgICAgICAgICAgIGxldCBncm91cFRvUmVzdWx0czoge1tncm91cElkOiBzdHJpbmddOiBSZXN1bHRHcm91cH0gPSB7fVxuICAgICAgICAgICAgcmVzcG9uc2UuZGF0YS5yZXN1bHRzLmJpbmRpbmdzLmZvckVhY2goYmluZGluZyA9PiB7XG4gICAgICAgICAgICAgIGlmICghZ3JvdXBUb1Jlc3VsdHNbYmluZGluZ1snZ3JvdXBJZCddLnZhbHVlXSkgZ3JvdXBUb1Jlc3VsdHNbYmluZGluZ1snZ3JvdXBJZCddLnZhbHVlXSA9IG5ldyBSZXN1bHRHcm91cChiaW5kaW5nWydncm91cExhYmVsJ10udmFsdWUpXG4gICAgICAgICAgICAgIGdyb3VwVG9SZXN1bHRzW2JpbmRpbmdbJ2dyb3VwSWQnXS52YWx1ZV0ucmVzdWx0cy5wdXNoKG5ldyBSZXN1bHQobmV3IFNwYXJxbEJpbmRpbmdOb2RlKGJpbmRpbmdbJ2lkJ10pLCBncm91cFRvUmVzdWx0c1tiaW5kaW5nWydncm91cElkJ10udmFsdWVdLCBkcywgYmluZGluZ1snbWF0Y2hlZExhYmVsJ10udmFsdWUsIGJpbmRpbmdbJ3ByZWZMYWJlbCddLnZhbHVlLCBiaW5kaW5nWydhZGRpdGlvbmFsSW5mb3JtYXRpb24nXSA/IGJpbmRpbmdbJ2FkZGl0aW9uYWxJbmZvcm1hdGlvbiddLnZhbHVlIDogJycpKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGZvciAobGV0IGdyb3VwSWQgaW4gZ3JvdXBUb1Jlc3VsdHMpIGRzLnJlc3VsdHNCeUdyb3VwLnB1c2goZ3JvdXBUb1Jlc3VsdHNbZ3JvdXBJZF0pXG4gICAgICAgICAgICByZXR1cm4gZHNcbiAgICAgICAgICB9XG4gICAgICAgIClcbiAgICAgIH0pKVxuICAgIH1cbiAgfVxuXG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var fibra;
(function (fibra) {
    'use strict';
    var SparqlItemComponentBindings = (function () {
        function SparqlItemComponentBindings() {
        }
        return SparqlItemComponentBindings;
    }());
    var SparqlItemComponentController = (function (_super) {
        __extends(SparqlItemComponentController, _super);
        function SparqlItemComponentController(sparqlItemService) {
            var _this = this;
            _super.call(this);
            this.sparqlItemService = sparqlItemService;
            this.$onChanges = function (changes) {
                if (_this.endpoint && _this.itemId)
                    _this.sparqlItemService.getItem(_this.endpoint, _this.itemId).then(function (item) { return _this.item = item; });
            };
        }/*<auto_generate>*/SparqlItemComponentController.$inject = ['sparqlItemService']; SparqlItemComponentController.$componentName = 'SparqlItemComponentController'/*</auto_generate>*/
        return SparqlItemComponentController;
    }(SparqlItemComponentBindings));/*<auto_generate>*/angular.module('fibra').controller('SparqlItemComponentController',SparqlItemComponentController);/*</auto_generate>*/
    var SparqlItemComponent = (function () {
        function SparqlItemComponent() {
            this.bindings = {
                endpoint: '<',
                itemId: '<',
                onSelect: '&'
            };
            this.controller = SparqlItemComponentController;
            this.templateUrl = 'partials/sparql-item.html';
        }/*<auto_generate>*/SparqlItemComponent.$inject = []; SparqlItemComponent.$componentName = 'sparqlItem'/*</auto_generate>*/
        return SparqlItemComponent;
    }());/*<auto_generate>*/angular.module('fibra').component('sparqlItem',new SparqlItemComponent());/*</auto_generate>*/
    fibra.SparqlItemComponent = SparqlItemComponent;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvc3BhcnFsLWl0ZW0tY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBVSxLQUFLLENBeUNkO0FBekNELFdBQVUsS0FBSyxFQUFDLENBQUM7SUFDZixZQUFZLENBQUE7SUFRWjtRQUFBO1FBR0EsQ0FBQztRQUFELGtDQUFDO0lBQUQsQ0FIQSxBQUdDLElBQUE7SUFPRDtRQUE0QyxpREFBMkI7UUFRckUsdUNBQW9CLGlCQUFvQztZQVIxRCxpQkFXQztZQUZHLGlCQUFPLENBQUE7WUFEVyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1lBTmpELGVBQVUsR0FBMEQsVUFBQyxPQUEyQztnQkFDckgsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLFFBQVEsSUFBSSxLQUFJLENBQUMsTUFBTSxDQUFDO29CQUMvQixLQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLEtBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FDN0QsVUFBQyxJQUFVLElBQUssT0FBQSxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksRUFBaEIsQ0FBZ0IsQ0FDakMsQ0FBQTtZQUNMLENBQUMsQ0FBQTtRQUdELENBQUM7UUFDSCxvQ0FBQztJQUFELENBWEEsQUFXQyxDQVgyQywyQkFBMkIsR0FXdEU7SUFFRDtRQUFBO1lBQ1csYUFBUSxHQUEyQjtnQkFDeEMsUUFBUSxFQUFFLEdBQUc7Z0JBQ2IsTUFBTSxFQUFFLEdBQUc7Z0JBQ1gsUUFBUSxFQUFFLEdBQUc7YUFDZCxDQUFBO1lBQ00sZUFBVSxHQUFhLDZCQUE2QixDQUFBO1lBQ3BELGdCQUFXLEdBQVcsMkJBQTJCLENBQUE7UUFDNUQsQ0FBQztRQUFELDBCQUFDO0lBQUQsQ0FSQSxBQVFDLElBQUE7SUFSWSx5QkFBbUIsc0JBUS9CLENBQUE7QUFDSCxDQUFDLEVBekNTLEtBQUssS0FBTCxLQUFLLFFBeUNkIiwiZmlsZSI6InNjcmlwdHMvc3BhcnFsLWl0ZW0tY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIGZpYnJhIHtcbiAgJ3VzZSBzdHJpY3QnXG5cbiAgaW50ZXJmYWNlIElDaGFuZ2VPYmplY3Q8VD4ge1xuICAgIGN1cnJlbnRWYWx1ZTogVFxuICAgIHByZXZpb3VzVmFsdWU6IFRcbiAgICBpc0ZpcnN0Q2hhbmdlOiAoKSA9PiBib29sZWFuXG4gIH1cblxuICBjbGFzcyBTcGFycWxJdGVtQ29tcG9uZW50QmluZGluZ3Mge1xuICAgIHB1YmxpYyBlbmRwb2ludDogc3RyaW5nXG4gICAgcHVibGljIGl0ZW1JZDogSU5vZGVcbiAgfVxuXG4gIGludGVyZmFjZSBJU3BhcnFsSXRlbUNvbXBvbmVudEJpbmRpbmdDaGFuZ2VzIHtcbiAgICBlbmRwb2ludD86IElDaGFuZ2VPYmplY3Q8c3RyaW5nPlxuICAgIGl0ZW1JZD86IElDaGFuZ2VPYmplY3Q8SU5vZGU+XG4gIH1cblxuICBjbGFzcyBTcGFycWxJdGVtQ29tcG9uZW50Q29udHJvbGxlciBleHRlbmRzIFNwYXJxbEl0ZW1Db21wb25lbnRCaW5kaW5ncyB7XG4gICAgcHJpdmF0ZSBpdGVtOiBJdGVtXG4gICAgcHVibGljICRvbkNoYW5nZXM6IChjaGFuZ2VzOiBJU3BhcnFsSXRlbUNvbXBvbmVudEJpbmRpbmdDaGFuZ2VzKSA9PiB2b2lkID0gKGNoYW5nZXM6IElTcGFycWxJdGVtQ29tcG9uZW50QmluZGluZ0NoYW5nZXMpID0+IHtcbiAgICAgIGlmICh0aGlzLmVuZHBvaW50ICYmIHRoaXMuaXRlbUlkKVxuICAgICAgICB0aGlzLnNwYXJxbEl0ZW1TZXJ2aWNlLmdldEl0ZW0odGhpcy5lbmRwb2ludCwgdGhpcy5pdGVtSWQpLnRoZW4oXG4gICAgICAgICAgKGl0ZW06IEl0ZW0pID0+IHRoaXMuaXRlbSA9IGl0ZW1cbiAgICAgICAgKVxuICAgIH1cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNwYXJxbEl0ZW1TZXJ2aWNlOiBTcGFycWxJdGVtU2VydmljZSkge1xuICAgICAgc3VwZXIoKVxuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBTcGFycWxJdGVtQ29tcG9uZW50IGltcGxlbWVudHMgYW5ndWxhci5JQ29tcG9uZW50T3B0aW9ucyB7XG4gICAgICBwdWJsaWMgYmluZGluZ3M6IHtbaWQ6IHN0cmluZ106IHN0cmluZ30gPSB7XG4gICAgICAgIGVuZHBvaW50OiAnPCcsXG4gICAgICAgIGl0ZW1JZDogJzwnLFxuICAgICAgICBvblNlbGVjdDogJyYnXG4gICAgICB9XG4gICAgICBwdWJsaWMgY29udHJvbGxlcjogRnVuY3Rpb24gPSBTcGFycWxJdGVtQ29tcG9uZW50Q29udHJvbGxlclxuICAgICAgcHVibGljIHRlbXBsYXRlVXJsOiBzdHJpbmcgPSAncGFydGlhbHMvc3BhcnFsLWl0ZW0uaHRtbCdcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

var fibra;
(function (fibra) {
    'use strict';
    var SparqlItemService = (function () {
        function SparqlItemService(workerService) {
            this.workerService = workerService;
        }/*<auto_generate>*/SparqlItemService.$inject = ['workerService']; SparqlItemService.$componentName = 'sparqlItemService'/*</auto_generate>*/
        SparqlItemService.UUID = function () {
            /* tslint:disable:no-bitwise */
            var d0 = Math.random() * 0xffffffff | 0;
            var d1 = Math.random() * 0xffffffff | 0;
            var d2 = Math.random() * 0xffffffff | 0;
            var d3 = Math.random() * 0xffffffff | 0;
            return SparqlItemService.lut[d0 & 0xff] + SparqlItemService.lut[d0 >> 8 & 0xff] + SparqlItemService.lut[d0 >> 16 & 0xff] + SparqlItemService.lut[d0 >> 24 & 0xff] + '-' +
                SparqlItemService.lut[d1 & 0xff] + SparqlItemService.lut[d1 >> 8 & 0xff] + '-' + SparqlItemService.lut[d1 >> 16 & 0x0f | 0x40] + SparqlItemService.lut[d1 >> 24 & 0xff] + '-' +
                SparqlItemService.lut[d2 & 0x3f | 0x80] + SparqlItemService.lut[d2 >> 8 & 0xff] + '-' + SparqlItemService.lut[d2 >> 16 & 0xff] + SparqlItemService.lut[d2 >> 24 & 0xff] +
                SparqlItemService.lut[d3 & 0xff] + SparqlItemService.lut[d3 >> 8 & 0xff] + SparqlItemService.lut[d3 >> 16 & 0xff] + SparqlItemService.lut[d3 >> 24 & 0xff];
            /* tslint:enable:no-bitwise */
        };
        SparqlItemService.prototype.getItem = function (endpoint, id, canceller) {
            return this.workerService.call('sparqlItemWorkerService', 'getItem', [endpoint, id], canceller);
        };
        SparqlItemService.prototype.createNewItem = function (endpoint, equivalentNodes, properties) {
            if (equivalentNodes === void 0) { equivalentNodes = []; }
            if (properties === void 0) { properties = []; }
            return this.workerService.call('sparqlItemWorkerService', 'createNewItem', [endpoint, equivalentNodes, properties]);
        };
        SparqlItemService.ns = 'http://ldf.fi/fibra/';
        SparqlItemService.schemaGraph = new fibra.IRI(SparqlItemService.ns + 'schema#');
        SparqlItemService.instanceGraph = new fibra.IRI(SparqlItemService.ns + 'main/');
        SparqlItemService.getItemPropertiesQuery = "\nPREFIX skos: <http://www.w3.org/2004/02/skos/core#>\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\nPREFIX sf: <http://ldf.fi/functions#>\nSELECT ?itemLabel ?property ?propertyLabel ?object ?objectLabel {\n  <ID> sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?itemLabel) .\n  <ID> ?property ?object .\n  OPTIONAL {\n    ?property sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?propertyLabelP)\n  }\n  BIND(COALESCE(?propertyLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?property),\".*/\",\"\"),\".*#\",\"\"),\"_\",\" \"),\"([A-Z\u00C5\u00C4\u00D6])\",\" $1\")) AS ?propertyLabel)\n  OPTIONAL {\n    ?object sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?objectLabelP) .\n  }\n  BIND (IF(ISIRI(?object),COALESCE(?objectLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?object),\".*/\",\"\"),\".*#\",\"\"),\"_\",\" \"),\"([A-Z\u00C5\u00C4\u00D6])\",\" $1\")),?object) AS ?objectLabel)\n}\n";
        SparqlItemService.lut = (function () {
            var lut = [];
            for (var i = 0; i < 256; i++)
                lut[i] = (i < 16 ? '0' : '') + i.toString(16);
            return lut;
        })();
        return SparqlItemService;
    }());/*<auto_generate>*/angular.module('fibra').service('sparqlItemService',SparqlItemService);/*</auto_generate>*/
    fibra.SparqlItemService = SparqlItemService;
    var SparqlItemWorkerService = (function () {
        function SparqlItemWorkerService(sparqlService, $q, sparqlUpdateWorkerService) {
            this.sparqlService = sparqlService;
            this.$q = $q;
            this.sparqlUpdateWorkerService = sparqlUpdateWorkerService;
        }/*<auto_generate>*/SparqlItemWorkerService.$inject = ['sparqlService','$q','sparqlUpdateWorkerService']; SparqlItemWorkerService.$componentName = 'sparqlItemWorkerService'/*</auto_generate>*/
        SparqlItemWorkerService.prototype.getItem = function (endpoint, id, canceller) {
            return this.sparqlService.query(endpoint, SparqlItemService.getItemPropertiesQuery.replace(/<ID>/g, id.id), { timeout: canceller }).then(function (response) {
                var item = new fibra.Item(id);
                var propertyMap = {};
                response.data.results.bindings.forEach(function (b) {
                    if (b['itemLabel'])
                        item.label = new fibra.SparqlBindingNode(b['itemLabel']);
                    if (b['property']) {
                        var propertyToValues = propertyMap[b['property'].value];
                        if (!propertyToValues) {
                            propertyToValues = new fibra.PropertyToValues(b['property']);
                            propertyMap[b['property'].value] = propertyToValues;
                            if (b['propertyLabel'])
                                propertyToValues.label = new fibra.SparqlBindingNode(b['propertyLabel']);
                            item.properties.push(propertyToValues);
                        }
                        var oNode = new fibra.NodePlusLabel(new fibra.SparqlBindingNode(b['object']));
                        if (b['objectLabel'])
                            oNode.label = new fibra.SparqlBindingNode(b['objectLabel']);
                        propertyToValues.values.push(oNode);
                    }
                });
                return item;
            });
        };
        SparqlItemWorkerService.prototype.createNewItem = function (endpoint, equivalentNodes, properties) {
            if (equivalentNodes === void 0) { equivalentNodes = []; }
            if (properties === void 0) { properties = []; }
            var deferred = this.$q.defer();
            var subject = new fibra.IRI(SparqlItemService.ns + SparqlItemService.UUID());
            deferred.notify(subject.id);
            var schemaTriplesToAdd = [];
            var instanceTriplesToAdd = [];
            equivalentNodes.forEach(function (node) { return instanceTriplesToAdd.push(new fibra.Triple(subject, fibra.OWL.sameAs, node)); });
            properties.forEach(function (property) {
                if (property.label)
                    schemaTriplesToAdd.push(new fibra.Triple(property, fibra.SKOS.prefLabel, property.label));
                property.values.forEach(function (value) { return instanceTriplesToAdd.push(new fibra.Triple(subject, property, value)); });
            });
            this.sparqlUpdateWorkerService.updateGraphs(endpoint, [new fibra.Graph(SparqlItemService.schemaGraph, schemaTriplesToAdd), new fibra.Graph(SparqlItemService.instanceGraph, instanceTriplesToAdd)]).then(function () { return deferred.resolve(subject.id); }, deferred.reject, deferred.notify);
            return deferred.promise;
        };
        return SparqlItemWorkerService;
    }());/*<auto_generate>*/angular.module('fibra').service('sparqlItemWorkerService',SparqlItemWorkerService);/*</auto_generate>*/
    fibra.SparqlItemWorkerService = SparqlItemWorkerService;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvc3BhcnFsLWl0ZW0tc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFVLEtBQUssQ0ErR2Q7QUEvR0QsV0FBVSxLQUFLLEVBQUMsQ0FBQztJQUNmLFlBQVksQ0FBQTtJQUlaO1FBNENFLDJCQUFvQixhQUE0QjtZQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFHLENBQUM7UUFidEMsc0JBQUksR0FBbEI7WUFDRSwrQkFBK0I7WUFDL0IsSUFBSSxFQUFFLEdBQVcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLFVBQVUsR0FBRyxDQUFDLENBQUE7WUFDL0MsSUFBSSxFQUFFLEdBQVcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLFVBQVUsR0FBRyxDQUFDLENBQUE7WUFDL0MsSUFBSSxFQUFFLEdBQVcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLFVBQVUsR0FBRyxDQUFDLENBQUE7WUFDL0MsSUFBSSxFQUFFLEdBQVcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLFVBQVUsR0FBRyxDQUFDLENBQUE7WUFDL0MsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRztnQkFDckssaUJBQWlCLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcs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QUMsUUFBUSxDQUFDLEtBQUssQ0FBQztvQkFBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxZQUFNLENBQUMsUUFBUSxFQUFFLFVBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7Z0JBQ2pHLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksWUFBTSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBL0QsQ0FBK0QsQ0FBQyxDQUFBO1lBQ25HLENBQUMsQ0FBQyxDQUFBO1lBQ0YsSUFBSSxDQUFDLHlCQUF5QixDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLFdBQUssQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsa0JBQWtCLENBQUMsRUFBRSxJQUFJLFdBQUssQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUUsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUMxTCxjQUFNLE9BQUEsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQTVCLENBQTRCLEVBQ2xDLFFBQVEsQ0FBQyxNQUFNLEVBQ2YsUUFBUSxDQUFDLE1BQU0sQ0FDaEIsQ0FBQTtZQUNELE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFBO1FBQ3pCLENBQUM7UUFFSCw4QkFBQztJQUFELENBaERBLEFBZ0RDLElBQUE7SUFoRFksNkJBQXVCLDBCQWdEbkMsQ0FBQTtBQUVILENBQUMsRUEvR1MsS0FBSyxLQUFMLEtBQUssUUErR2QiLCJmaWxlIjoic2NyaXB0cy9zcGFycWwtaXRlbS1zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIGZpYnJhIHtcbiAgJ3VzZSBzdHJpY3QnXG5cbiAgaW1wb3J0IHMgPSBmaS5zZWNvLnNwYXJxbFxuXG4gIGV4cG9ydCBjbGFzcyBTcGFycWxJdGVtU2VydmljZSB7XG5cbiAgICBwdWJsaWMgc3RhdGljIG5zOiBzdHJpbmcgPSAnaHR0cDovL2xkZi5maS9maWJyYS8nXG4gICAgcHVibGljIHN0YXRpYyBzY2hlbWFHcmFwaDogSU5vZGUgPSBuZXcgSVJJKFNwYXJxbEl0ZW1TZXJ2aWNlLm5zICsgJ3NjaGVtYSMnKVxuICAgIHB1YmxpYyBzdGF0aWMgaW5zdGFuY2VHcmFwaDogSU5vZGUgPSBuZXcgSVJJKFNwYXJxbEl0ZW1TZXJ2aWNlLm5zICsgJ21haW4vJylcblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SXRlbVByb3BlcnRpZXNRdWVyeTogc3RyaW5nID0gYFxuUFJFRklYIHNrb3M6IDxodHRwOi8vd3d3LnczLm9yZy8yMDA0LzAyL3Nrb3MvY29yZSM+XG5QUkVGSVggcmRmczogPGh0dHA6Ly93d3cudzMub3JnLzIwMDAvMDEvcmRmLXNjaGVtYSM+XG5QUkVGSVggc2Y6IDxodHRwOi8vbGRmLmZpL2Z1bmN0aW9ucyM+XG5TRUxFQ1QgP2l0ZW1MYWJlbCA/cHJvcGVydHkgP3Byb3BlcnR5TGFiZWwgP29iamVjdCA/b2JqZWN0TGFiZWwge1xuICA8SUQ+IHNmOnByZWZlcnJlZExhbmd1YWdlTGl0ZXJhbCAoc2tvczpwcmVmTGFiZWwgcmRmczpsYWJlbCBza29zOmFsdExhYmVsICdlbicgJycgP2l0ZW1MYWJlbCkgLlxuICA8SUQ+ID9wcm9wZXJ0eSA/b2JqZWN0IC5cbiAgT1BUSU9OQUwge1xuICAgID9wcm9wZXJ0eSBzZjpwcmVmZXJyZWRMYW5ndWFnZUxpdGVyYWwgKHNrb3M6cHJlZkxhYmVsIHJkZnM6bGFiZWwgc2tvczphbHRMYWJlbCAnZW4nICcnID9wcm9wZXJ0eUxhYmVsUClcbiAgfVxuICBCSU5EKENPQUxFU0NFKD9wcm9wZXJ0eUxhYmVsUCxSRVBMQUNFKFJFUExBQ0UoUkVQTEFDRShSRVBMQUNFKFNUUig/cHJvcGVydHkpLFwiLiovXCIsXCJcIiksXCIuKiNcIixcIlwiKSxcIl9cIixcIiBcIiksXCIoW0EtWsOFw4TDll0pXCIsXCIgJDFcIikpIEFTID9wcm9wZXJ0eUxhYmVsKVxuICBPUFRJT05BTCB7XG4gICAgP29iamVjdCBzZjpwcmVmZXJyZWRMYW5ndWFnZUxpdGVyYWwgKHNrb3M6cHJlZkxhYmVsIHJkZnM6bGFiZWwgc2tvczphbHRMYWJlbCAnZW4nICcnID9vYmplY3RMYWJlbFApIC5cbiAgfVxuICBCSU5EIChJRihJU0lSSSg/b2JqZWN0KSxDT0FMRVNDRSg/b2JqZWN0TGFiZWxQLFJFUExBQ0UoUkVQTEFDRShSRVBMQUNFKFJFUExBQ0UoU1RSKD9vYmplY3QpLFwiLiovXCIsXCJcIiksXCIuKiNcIixcIlwiKSxcIl9cIixcIiBcIiksXCIoW0EtWsOFw4TDll0pXCIsXCIgJDFcIikpLD9vYmplY3QpIEFTID9vYmplY3RMYWJlbClcbn1cbmBcblxuICAgIHByaXZhdGUgc3RhdGljIGx1dDogc3RyaW5nW10gPSAoKCkgPT4ge1xuICAgICAgbGV0IGx1dDogc3RyaW5nW10gPSBbXVxuICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IDI1NjsgaSsrKVxuICAgICAgICBsdXRbaV0gPSAoaSA8IDE2ID8gJzAnIDogJycpICsgaS50b1N0cmluZygxNilcbiAgICAgIHJldHVybiBsdXRcbiAgICB9KSgpXG5cbiAgICBwdWJsaWMgc3RhdGljIFVVSUQoKTogc3RyaW5nIHtcbiAgICAgIC8qIHRzbGludDpkaXNhYmxlOm5vLWJpdHdpc2UgKi9cbiAgICAgIGxldCBkMDogbnVtYmVyID0gTWF0aC5yYW5kb20oKSAqIDB4ZmZmZmZmZmYgfCAwXG4gICAgICBsZXQgZDE6IG51bWJlciA9IE1hdGgucmFuZG9tKCkgKiAweGZmZmZmZmZmIHwgMFxuICAgICAgbGV0IGQyOiBudW1iZXIgPSBNYXRoLnJhbmRvbSgpICogMHhmZmZmZmZmZiB8IDBcbiAgICAgIGxldCBkMzogbnVtYmVyID0gTWF0aC5yYW5kb20oKSAqIDB4ZmZmZmZmZmYgfCAwXG4gICAgICByZXR1cm4gU3BhcnFsSXRlbVNlcnZpY2UubHV0W2QwICYgMHhmZl0gKyBTcGFycWxJdGVtU2VydmljZS5sdXRbZDAgPj4gOCAmIDB4ZmZdICsgU3BhcnFsSXRlbVNlcnZpY2UubHV0W2QwID4+IDE2ICYgMHhmZl0gKyBTcGFycWxJdGVtU2VydmljZS5sdXRbZDAgPj4gMjQgJiAweGZmXSArICctJyArXG4gICAgICAgIFNwYXJxbEl0ZW1TZXJ2aWNlLmx1dFtkMSAmIDB4ZmZdICsgU3BhcnFsSXRlbVNlcnZpY2UubHV0W2QxID4+IDggJiAweGZmXSArICctJyArIFNwYXJxbEl0ZW1TZXJ2aWNlLmx1dFtkMSA+PiAxNiAmIDB4MGYgfCAweDQwXSArIFNwYXJxbEl0ZW1TZXJ2aWNlLmx1dFtkMSA+PiAyNCAmIDB4ZmZdICsgJy0nICtcbiAgICAgICAgU3BhcnFsSXRlbVNlcnZpY2UubHV0W2QyICYgMHgzZiB8IDB4ODBdICsgU3BhcnFsSXRlbVNlcnZpY2UubHV0W2QyID4+IDggJiAweGZmXSArICctJyArIFNwYXJxbEl0ZW1TZXJ2aWNlLmx1dFtkMiA+PiAxNiAmIDB4ZmZdICsgU3BhcnFsSXRlbVNlcnZpY2UubHV0W2QyID4+IDI0ICYgMHhmZl0gK1xuICAgICAgICBTcGFycWxJdGVtU2VydmljZS5sdXRbZDMgJiAweGZmXSArIFNwYXJxbEl0ZW1TZXJ2aWNlLmx1dFtkMyA+PiA4ICYgMHhmZl0gKyBTcGFycWxJdGVtU2VydmljZS5sdXRbZDMgPj4gMTYgJiAweGZmXSArIFNwYXJxbEl0ZW1TZXJ2aWNlLmx1dFtkMyA+PiAyNCAmIDB4ZmZdXG4gICAgICAvKiB0c2xpbnQ6ZW5hYmxlOm5vLWJpdHdpc2UgKi9cbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHdvcmtlclNlcnZpY2U6IFdvcmtlclNlcnZpY2UpIHt9XG5cbiAgICBwdWJsaWMgZ2V0SXRlbShlbmRwb2ludDogc3RyaW5nLCBpZDogSU5vZGUsIGNhbmNlbGxlcj86IGFuZ3VsYXIuSVByb21pc2U8YW55Pik6IGFuZ3VsYXIuSVByb21pc2U8SXRlbT4ge1xuICAgICAgcmV0dXJuIHRoaXMud29ya2VyU2VydmljZS5jYWxsKCdzcGFycWxJdGVtV29ya2VyU2VydmljZScsICdnZXRJdGVtJywgW2VuZHBvaW50LCBpZF0sIGNhbmNlbGxlcilcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlTmV3SXRlbShlbmRwb2ludDogc3RyaW5nLCBlcXVpdmFsZW50Tm9kZXM6IElOb2RlW10gPSBbXSwgcHJvcGVydGllczogUHJvcGVydHlUb1ZhbHVlc1tdID0gW10pOiBhbmd1bGFyLklQcm9taXNlPHN0cmluZz4ge1xuICAgICAgcmV0dXJuIHRoaXMud29ya2VyU2VydmljZS5jYWxsKCdzcGFycWxJdGVtV29ya2VyU2VydmljZScsICdjcmVhdGVOZXdJdGVtJywgW2VuZHBvaW50LCBlcXVpdmFsZW50Tm9kZXMsIHByb3BlcnRpZXNdKVxuICAgIH1cblxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIFNwYXJxbEl0ZW1Xb3JrZXJTZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc3BhcnFsU2VydmljZTogcy5TcGFycWxTZXJ2aWNlLCBwcml2YXRlICRxOiBhbmd1bGFyLklRU2VydmljZSwgcHJpdmF0ZSBzcGFycWxVcGRhdGVXb3JrZXJTZXJ2aWNlOiBTcGFycWxVcGRhdGVXb3JrZXJTZXJ2aWNlKSB7fVxuXG4gICAgcHVibGljIGdldEl0ZW0oZW5kcG9pbnQ6IHN0cmluZywgaWQ6IElOb2RlLCBjYW5jZWxsZXI/OiBhbmd1bGFyLklQcm9taXNlPGFueT4pOiBhbmd1bGFyLklQcm9taXNlPEl0ZW0+IHtcbiAgICAgIHJldHVybiB0aGlzLnNwYXJxbFNlcnZpY2UucXVlcnkoZW5kcG9pbnQsIFNwYXJxbEl0ZW1TZXJ2aWNlLmdldEl0ZW1Qcm9wZXJ0aWVzUXVlcnkucmVwbGFjZSgvPElEPi9nLCBpZC5pZCksIHt0aW1lb3V0OiBjYW5jZWxsZXJ9KS50aGVuKFxuICAgICAgICAocmVzcG9uc2U6IGFuZ3VsYXIuSUh0dHBQcm9taXNlQ2FsbGJhY2tBcmc8cy5JU3BhcnFsQmluZGluZ1Jlc3VsdDx7W2lkOiBzdHJpbmddOiBzLklTcGFycWxCaW5kaW5nfT4+KSA9PiB7XG4gICAgICAgICAgbGV0IGl0ZW06IEl0ZW0gPSBuZXcgSXRlbShpZClcbiAgICAgICAgICBsZXQgcHJvcGVydHlNYXA6IHtbcHJvcGVydHk6IHN0cmluZ106IFByb3BlcnR5VG9WYWx1ZXN9ID0ge31cbiAgICAgICAgICByZXNwb25zZS5kYXRhLnJlc3VsdHMuYmluZGluZ3MuZm9yRWFjaChiID0+IHtcbiAgICAgICAgICAgIGlmIChiWydpdGVtTGFiZWwnXSkgaXRlbS5sYWJlbCA9IG5ldyBTcGFycWxCaW5kaW5nTm9kZShiWydpdGVtTGFiZWwnXSlcbiAgICAgICAgICAgIGlmIChiWydwcm9wZXJ0eSddKSB7XG4gICAgICAgICAgICAgIGxldCBwcm9wZXJ0eVRvVmFsdWVzOiBQcm9wZXJ0eVRvVmFsdWVzID0gcHJvcGVydHlNYXBbYlsncHJvcGVydHknXS52YWx1ZV1cbiAgICAgICAgICAgICAgaWYgKCFwcm9wZXJ0eVRvVmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgcHJvcGVydHlUb1ZhbHVlcyA9IG5ldyBQcm9wZXJ0eVRvVmFsdWVzKGJbJ3Byb3BlcnR5J10pXG4gICAgICAgICAgICAgICAgcHJvcGVydHlNYXBbYlsncHJvcGVydHknXS52YWx1ZV0gPSBwcm9wZXJ0eVRvVmFsdWVzXG4gICAgICAgICAgICAgICAgaWYgKGJbJ3Byb3BlcnR5TGFiZWwnXSkgcHJvcGVydHlUb1ZhbHVlcy5sYWJlbCA9IG5ldyBTcGFycWxCaW5kaW5nTm9kZShiWydwcm9wZXJ0eUxhYmVsJ10pXG4gICAgICAgICAgICAgICAgaXRlbS5wcm9wZXJ0aWVzLnB1c2gocHJvcGVydHlUb1ZhbHVlcylcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBsZXQgb05vZGU6IE5vZGVQbHVzTGFiZWwgPSBuZXcgTm9kZVBsdXNMYWJlbChuZXcgU3BhcnFsQmluZGluZ05vZGUoYlsnb2JqZWN0J10pKVxuICAgICAgICAgICAgICBpZiAoYlsnb2JqZWN0TGFiZWwnXSkgb05vZGUubGFiZWwgPSBuZXcgU3BhcnFsQmluZGluZ05vZGUoYlsnb2JqZWN0TGFiZWwnXSlcbiAgICAgICAgICAgICAgcHJvcGVydHlUb1ZhbHVlcy52YWx1ZXMucHVzaChvTm9kZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIHJldHVybiBpdGVtXG4gICAgICAgIH1cbiAgICAgIClcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlTmV3SXRlbShlbmRwb2ludDogc3RyaW5nLCBlcXVpdmFsZW50Tm9kZXM6IElOb2RlW10gPSBbXSwgcHJvcGVydGllczogUHJvcGVydHlUb1ZhbHVlc1tdID0gW10pOiBhbmd1bGFyLklQcm9taXNlPHN0cmluZz4ge1xuICAgICAgbGV0IGRlZmVycmVkOiBhbmd1bGFyLklEZWZlcnJlZDxzdHJpbmc+ID0gdGhpcy4kcS5kZWZlcigpXG4gICAgICBsZXQgc3ViamVjdDogSU5vZGUgPSBuZXcgSVJJKFNwYXJxbEl0ZW1TZXJ2aWNlLm5zICsgU3BhcnFsSXRlbVNlcnZpY2UuVVVJRCgpKVxuICAgICAgZGVmZXJyZWQubm90aWZ5KHN1YmplY3QuaWQpXG4gICAgICBsZXQgc2NoZW1hVHJpcGxlc1RvQWRkOiBUcmlwbGVbXSA9IFtdXG4gICAgICBsZXQgaW5zdGFuY2VUcmlwbGVzVG9BZGQ6IFRyaXBsZVtdID0gW11cbiAgICAgIGVxdWl2YWxlbnROb2Rlcy5mb3JFYWNoKG5vZGUgPT4gaW5zdGFuY2VUcmlwbGVzVG9BZGQucHVzaChuZXcgVHJpcGxlKHN1YmplY3QsIE9XTC5zYW1lQXMsIG5vZGUpKSlcbiAgICAgIHByb3BlcnRpZXMuZm9yRWFjaChwcm9wZXJ0eSA9PiB7XG4gICAgICAgIGlmIChwcm9wZXJ0eS5sYWJlbCkgc2NoZW1hVHJpcGxlc1RvQWRkLnB1c2gobmV3IFRyaXBsZShwcm9wZXJ0eSwgU0tPUy5wcmVmTGFiZWwsIHByb3BlcnR5LmxhYmVsKSlcbiAgICAgICAgcHJvcGVydHkudmFsdWVzLmZvckVhY2godmFsdWUgPT4gaW5zdGFuY2VUcmlwbGVzVG9BZGQucHVzaChuZXcgVHJpcGxlKHN1YmplY3QsIHByb3BlcnR5LCB2YWx1ZSkpKVxuICAgICAgfSlcbiAgICAgIHRoaXMuc3BhcnFsVXBkYXRlV29ya2VyU2VydmljZS51cGRhdGVHcmFwaHMoZW5kcG9pbnQsIFtuZXcgR3JhcGgoU3BhcnFsSXRlbVNlcnZpY2Uuc2NoZW1hR3JhcGgsIHNjaGVtYVRyaXBsZXNUb0FkZCksIG5ldyBHcmFwaChTcGFycWxJdGVtU2VydmljZS5pbnN0YW5jZUdyYXBoLCBpbnN0YW5jZVRyaXBsZXNUb0FkZCldKS50aGVuKFxuICAgICAgICAoKSA9PiBkZWZlcnJlZC5yZXNvbHZlKHN1YmplY3QuaWQpLFxuICAgICAgICBkZWZlcnJlZC5yZWplY3QsXG4gICAgICAgIGRlZmVycmVkLm5vdGlmeVxuICAgICAgKVxuICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2VcbiAgICB9XG5cbiAgfVxuXG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

var fibra;
(function (fibra) {
    'use strict';
    var SparqlTreeService = (function () {
        function SparqlTreeService(workerService) {
            this.workerService = workerService;
        }/*<auto_generate>*/SparqlTreeService.$inject = ['workerService']; SparqlTreeService.$componentName = 'sparqlTreeService'/*</auto_generate>*/
        SparqlTreeService.prototype.getTree = function (endpoint, query, canceller) {
            return this.workerService.call('sparqlTreeWorkerService', 'getTree', [endpoint, query], canceller);
        };
        SparqlTreeService.getClassTreeQuery = "\nPREFIX skos: <http://www.w3.org/2004/02/skos/core#>\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\nPREFIX sf: <http://ldf.fi/functions#>\nSELECT ?subClass ?superClass ?class ?classLabel ?instances {\n  {\n    ?subClass rdfs:subClassOf ?class .\n    FILTER EXISTS {\n      ?p a ?subClass .\n    }\n  } UNION {\n    {\n      SELECT ?class (COUNT(DISTINCT ?p) AS ?instances) {\n        ?p a ?class .\n      }\n      GROUP BY ?class\n    }\n  }\n  ?class sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?classLabel) .\n}\n";
        return SparqlTreeService;
    }());/*<auto_generate>*/angular.module('fibra').service('sparqlTreeService',SparqlTreeService);/*</auto_generate>*/
    fibra.SparqlTreeService = SparqlTreeService;
    var SparqlTreeWorkerService = (function () {
        function SparqlTreeWorkerService(sparqlService) {
            this.sparqlService = sparqlService;
        }/*<auto_generate>*/SparqlTreeWorkerService.$inject = ['sparqlService']; SparqlTreeWorkerService.$componentName = 'sparqlTreeWorkerService'/*</auto_generate>*/
        SparqlTreeWorkerService.prototype.getTree = function (endpoint, query, canceller) {
            return this.sparqlService.query(endpoint, query, { timeout: canceller }).then(function (response) {
                var parents = {};
                var classes = {};
                response.data.results.bindings.forEach(function (binding) {
                    if (binding['classLabel'])
                        classes[binding['class'].value] = new fibra.TreeNode(binding['class'].value, binding['classLabel'].value);
                    if (binding['instances'])
                        classes[binding['class'].value].instances = parseInt(binding['instances'].value, 10);
                    if (binding['subClass']) {
                        var subClass = binding['subClass'].value;
                        if (!parents[subClass])
                            parents[subClass] = {};
                        parents[subClass][binding['class'].value] = true;
                    }
                    if (binding['superClass']) {
                        var subClass = binding['class'].value;
                        if (!parents[subClass])
                            parents[subClass] = {};
                        parents[subClass][binding['superClass'].value] = true;
                    }
                });
                var ret = [];
                for (var id in classes) {
                    if (!parents[id])
                        ret.push(classes[id]);
                    else
                        for (var pid in parents[id])
                            classes[pid].children.push(classes[id]);
                }
                return ret;
            });
        };
        return SparqlTreeWorkerService;
    }());/*<auto_generate>*/angular.module('fibra').service('sparqlTreeWorkerService',SparqlTreeWorkerService);/*</auto_generate>*/
    fibra.SparqlTreeWorkerService = SparqlTreeWorkerService;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvc3BhcnFsLXRyZWUtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFVLEtBQUssQ0FvRWQ7QUFwRUQsV0FBVSxLQUFLLEVBQUMsQ0FBQztJQUNmLFlBQVksQ0FBQTtJQUlaO1FBc0JFLDJCQUFvQixhQUE0QjtZQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFHLENBQUM7UUFDN0MsbUNBQU8sR0FBZCxVQUFlLFFBQWdCLEVBQUUsS0FBYSxFQUFFLFNBQWlDO1lBQy9FLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxTQUFTLEVBQUUsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUE7UUFDcEcsQ0FBQztRQXhCYSxtQ0FBaUIsR0FBVywraUJBb0I3QyxDQUFBO1FBS0Msd0JBQUM7SUFBRCxDQTFCQSxBQTBCQyxJQUFBO0lBMUJZLHVCQUFpQixvQkEwQjdCLENBQUE7SUFFRDtRQUNFLGlDQUFvQixhQUE4QjtZQUE5QixrQkFBYSxHQUFiLGFBQWEsQ0FBaUI7UUFBRyxDQUFDO1FBRS9DLHlDQUFPLEdBQWQsVUFBZSxRQUFnQixFQUFFLEtBQWEsRUFBRSxTQUFpQztZQUMvRSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FDekUsVUFBQyxRQUFtRztnQkFDbEcsSUFBSSxPQUFPLEdBQTRDLEVBQUUsQ0FBQTtnQkFDekQsSUFBSSxPQUFPLEdBQTZCLEVBQUUsQ0FBQTtnQkFDMUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLE9BQU87b0JBQzVDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQzt3QkFDeEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLGNBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtvQkFDckcsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO3dCQUN2QixPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQTtvQkFDdEYsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDeEIsSUFBSSxRQUFRLEdBQVcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQTt3QkFDaEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7NEJBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQTt3QkFDOUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUE7b0JBQ2xELENBQUM7b0JBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDMUIsSUFBSSxRQUFRLEdBQVcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQTt3QkFDN0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7NEJBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQTt3QkFDOUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUE7b0JBQ3ZELENBQUM7Z0JBQ0gsQ0FBQyxDQUFDLENBQUE7Z0JBQ0YsSUFBSSxHQUFHLEdBQWUsRUFBRSxDQUFBO2dCQUN4QixHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUN2QixFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUFDLElBQUk7d0JBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDOzRCQUN0RSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtnQkFDN0MsQ0FBQztnQkFDRCxNQUFNLENBQUMsR0FBRyxDQUFBO1lBQ1osQ0FBQyxDQUNGLENBQUE7UUFDSCxDQUFDO1FBQ0gsOEJBQUM7SUFBRCxDQWpDQSxBQWlDQyxJQUFBO0lBakNZLDZCQUF1QiwwQkFpQ25DLENBQUE7QUFFSCxDQUFDLEVBcEVTLEtBQUssS0FBTCxLQUFLLFFBb0VkIiwiZmlsZSI6InNjcmlwdHMvc3BhcnFsLXRyZWUtc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBmaWJyYSB7XG4gICd1c2Ugc3RyaWN0J1xuXG4gIGltcG9ydCBzID0gZmkuc2Vjby5zcGFycWxcblxuICBleHBvcnQgY2xhc3MgU3BhcnFsVHJlZVNlcnZpY2Uge1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0Q2xhc3NUcmVlUXVlcnk6IHN0cmluZyA9IGBcblBSRUZJWCBza29zOiA8aHR0cDovL3d3dy53My5vcmcvMjAwNC8wMi9za29zL2NvcmUjPlxuUFJFRklYIHJkZnM6IDxodHRwOi8vd3d3LnczLm9yZy8yMDAwLzAxL3JkZi1zY2hlbWEjPlxuUFJFRklYIHNmOiA8aHR0cDovL2xkZi5maS9mdW5jdGlvbnMjPlxuU0VMRUNUID9zdWJDbGFzcyA/c3VwZXJDbGFzcyA/Y2xhc3MgP2NsYXNzTGFiZWwgP2luc3RhbmNlcyB7XG4gIHtcbiAgICA/c3ViQ2xhc3MgcmRmczpzdWJDbGFzc09mID9jbGFzcyAuXG4gICAgRklMVEVSIEVYSVNUUyB7XG4gICAgICA/cCBhID9zdWJDbGFzcyAuXG4gICAgfVxuICB9IFVOSU9OIHtcbiAgICB7XG4gICAgICBTRUxFQ1QgP2NsYXNzIChDT1VOVChESVNUSU5DVCA/cCkgQVMgP2luc3RhbmNlcykge1xuICAgICAgICA/cCBhID9jbGFzcyAuXG4gICAgICB9XG4gICAgICBHUk9VUCBCWSA/Y2xhc3NcbiAgICB9XG4gIH1cbiAgP2NsYXNzIHNmOnByZWZlcnJlZExhbmd1YWdlTGl0ZXJhbCAoc2tvczpwcmVmTGFiZWwgcmRmczpsYWJlbCBza29zOmFsdExhYmVsICdlbicgJycgP2NsYXNzTGFiZWwpIC5cbn1cbmBcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHdvcmtlclNlcnZpY2U6IFdvcmtlclNlcnZpY2UpIHt9XG4gICAgcHVibGljIGdldFRyZWUoZW5kcG9pbnQ6IHN0cmluZywgcXVlcnk6IHN0cmluZywgY2FuY2VsbGVyPzogYW5ndWxhci5JUHJvbWlzZTxhbnk+KTogYW5ndWxhci5JUHJvbWlzZTxUcmVlTm9kZVtdPiB7XG4gICAgICByZXR1cm4gdGhpcy53b3JrZXJTZXJ2aWNlLmNhbGwoJ3NwYXJxbFRyZWVXb3JrZXJTZXJ2aWNlJywgJ2dldFRyZWUnLCBbZW5kcG9pbnQsIHF1ZXJ5XSwgY2FuY2VsbGVyKVxuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBTcGFycWxUcmVlV29ya2VyU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzcGFycWxTZXJ2aWNlOiBzLlNwYXJxbFNlcnZpY2UpIHt9XG5cbiAgICBwdWJsaWMgZ2V0VHJlZShlbmRwb2ludDogc3RyaW5nLCBxdWVyeTogc3RyaW5nLCBjYW5jZWxsZXI/OiBhbmd1bGFyLklQcm9taXNlPGFueT4pOiBhbmd1bGFyLklQcm9taXNlPFRyZWVOb2RlW10+IHtcbiAgICAgIHJldHVybiB0aGlzLnNwYXJxbFNlcnZpY2UucXVlcnkoZW5kcG9pbnQsIHF1ZXJ5LCB7dGltZW91dDogY2FuY2VsbGVyfSkudGhlbihcbiAgICAgICAgKHJlc3BvbnNlOiBhbmd1bGFyLklIdHRwUHJvbWlzZUNhbGxiYWNrQXJnPHMuSVNwYXJxbEJpbmRpbmdSZXN1bHQ8e1tpZDogc3RyaW5nXTogcy5JU3BhcnFsQmluZGluZ30+PikgPT4ge1xuICAgICAgICAgIGxldCBwYXJlbnRzOiB7W2lkOiBzdHJpbmddOiB7W2lkOiBzdHJpbmddOiBib29sZWFufX0gPSB7fVxuICAgICAgICAgIGxldCBjbGFzc2VzOiB7W2lkOiBzdHJpbmddOiBUcmVlTm9kZX0gPSB7fVxuICAgICAgICAgIHJlc3BvbnNlLmRhdGEucmVzdWx0cy5iaW5kaW5ncy5mb3JFYWNoKGJpbmRpbmcgPT4ge1xuICAgICAgICAgICAgaWYgKGJpbmRpbmdbJ2NsYXNzTGFiZWwnXSlcbiAgICAgICAgICAgICAgY2xhc3Nlc1tiaW5kaW5nWydjbGFzcyddLnZhbHVlXSA9IG5ldyBUcmVlTm9kZShiaW5kaW5nWydjbGFzcyddLnZhbHVlLCBiaW5kaW5nWydjbGFzc0xhYmVsJ10udmFsdWUpXG4gICAgICAgICAgICBpZiAoYmluZGluZ1snaW5zdGFuY2VzJ10pXG4gICAgICAgICAgICAgIGNsYXNzZXNbYmluZGluZ1snY2xhc3MnXS52YWx1ZV0uaW5zdGFuY2VzID0gcGFyc2VJbnQoYmluZGluZ1snaW5zdGFuY2VzJ10udmFsdWUsIDEwKVxuICAgICAgICAgICAgaWYgKGJpbmRpbmdbJ3N1YkNsYXNzJ10pIHtcbiAgICAgICAgICAgICAgbGV0IHN1YkNsYXNzOiBzdHJpbmcgPSBiaW5kaW5nWydzdWJDbGFzcyddLnZhbHVlXG4gICAgICAgICAgICAgIGlmICghcGFyZW50c1tzdWJDbGFzc10pIHBhcmVudHNbc3ViQ2xhc3NdID0ge31cbiAgICAgICAgICAgICAgcGFyZW50c1tzdWJDbGFzc11bYmluZGluZ1snY2xhc3MnXS52YWx1ZV0gPSB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYmluZGluZ1snc3VwZXJDbGFzcyddKSB7XG4gICAgICAgICAgICAgIGxldCBzdWJDbGFzczogc3RyaW5nID0gYmluZGluZ1snY2xhc3MnXS52YWx1ZVxuICAgICAgICAgICAgICBpZiAoIXBhcmVudHNbc3ViQ2xhc3NdKSBwYXJlbnRzW3N1YkNsYXNzXSA9IHt9XG4gICAgICAgICAgICAgIHBhcmVudHNbc3ViQ2xhc3NdW2JpbmRpbmdbJ3N1cGVyQ2xhc3MnXS52YWx1ZV0gPSB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICBsZXQgcmV0OiBUcmVlTm9kZVtdID0gW11cbiAgICAgICAgICBmb3IgKGxldCBpZCBpbiBjbGFzc2VzKSB7XG4gICAgICAgICAgICBpZiAoIXBhcmVudHNbaWRdKSByZXQucHVzaChjbGFzc2VzW2lkXSk7IGVsc2UgZm9yIChsZXQgcGlkIGluIHBhcmVudHNbaWRdKVxuICAgICAgICAgICAgICAgIGNsYXNzZXNbcGlkXS5jaGlsZHJlbi5wdXNoKGNsYXNzZXNbaWRdKVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmV0XG4gICAgICAgIH1cbiAgICAgIClcbiAgICB9XG4gIH1cblxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

var fibra;
(function (fibra) {
    'use strict';
    var SparqlUpdateService = (function () {
        function SparqlUpdateService(workerService) {
            this.workerService = workerService;
        }/*<auto_generate>*/SparqlUpdateService.$inject = ['workerService']; SparqlUpdateService.$componentName = 'sparqlUpdateService'/*</auto_generate>*/
        SparqlUpdateService.serialize = function (s) {
            return s.subject.id + ' ' + s.property.id + ' ' + s.object.id;
        };
        SparqlUpdateService.prototype.updateQuads = function (endpoint, quadsToAdd, quadsToRemove) {
            return this.workerService.call('sparqlUpdateWorkerService', 'update', [endpoint, quadsToAdd, quadsToRemove]);
        };
        SparqlUpdateService.prototype.updateGraphs = function (endpoint, graphsToAdd, graphsToRemove) {
            return this.workerService.call('sparqlUpdateWorkerService', 'update', [endpoint, graphsToAdd, graphsToRemove]);
        };
        return SparqlUpdateService;
    }());/*<auto_generate>*/angular.module('fibra').service('sparqlUpdateService',SparqlUpdateService);/*</auto_generate>*/
    fibra.SparqlUpdateService = SparqlUpdateService;
    var SparqlUpdateWorkerService = (function () {
        function SparqlUpdateWorkerService(sparqlService, workerWorkerService) {
            this.sparqlService = sparqlService;
            this.workerWorkerService = workerWorkerService;
        }/*<auto_generate>*/SparqlUpdateWorkerService.$inject = ['sparqlService','workerWorkerService']; SparqlUpdateWorkerService.$componentName = 'sparqlUpdateWorkerService'/*</auto_generate>*/
        SparqlUpdateWorkerService.prototype.updateQuads = function (endpoint, quadsToAdd, quadsToRemove) {
            if (quadsToAdd === void 0) { quadsToAdd = []; }
            if (quadsToRemove === void 0) { quadsToRemove = []; }
            var graphsToAddMap = {};
            var graphsToRemoveMap = {};
            var graphsToAdd = [];
            var graphsToRemove = [];
            quadsToAdd.forEach(function (q) {
                var graph = graphsToAddMap[q.graph.id];
                if (!graph) {
                    graph = new fibra.Graph(q.graph);
                    graphsToAddMap[q.graph.id] = graph;
                    graphsToAdd.push(graph);
                }
                graph.triples.push(q);
            });
            quadsToRemove.forEach(function (q) {
                var graph = graphsToRemoveMap[q.graph.id];
                if (!graph) {
                    graph = new fibra.Graph(q.graph);
                    graphsToRemoveMap[q.graph.id] = graph;
                    graphsToRemove.push(graph);
                }
                graph.triples.push(q);
            });
            return this.updateGraphs(endpoint, graphsToAdd, graphsToRemove);
        };
        SparqlUpdateWorkerService.prototype.updateGraphs = function (endpoint, graphsToAdd, graphsToRemove) {
            var _this = this;
            if (graphsToAdd === void 0) { graphsToAdd = []; }
            if (graphsToRemove === void 0) { graphsToRemove = []; }
            var addString = graphsToAdd.map(function (graph) { return 'GRAPH' + graph.graph.id + '{' + graph.triples.map(SparqlUpdateService.serialize).join(' . ') + '}'; }).join();
            var removeString = graphsToRemove.map(function (graph) { return 'GRAPH' + graph.graph.id + '{' + graph.triples.map(SparqlUpdateService.serialize).join(' . ') + '}'; }).join();
            return this.sparqlService.update(endpoint, SparqlUpdateWorkerService.queryTemplate.replace(/<DELETE>/g, removeString).replace(/<INSERT>/g, addString)).then(function (r) { return _this.workerWorkerService.stripFunctions(r); });
        };
        SparqlUpdateWorkerService.queryTemplate = "DELETE{<DELETE>}INSERT{<INSERT>}WHERE {}";
        return SparqlUpdateWorkerService;
    }());/*<auto_generate>*/angular.module('fibra').service('sparqlUpdateWorkerService',SparqlUpdateWorkerService);/*</auto_generate>*/
    fibra.SparqlUpdateWorkerService = SparqlUpdateWorkerService;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvc3BhcnFsLXVwZGF0ZS1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQVUsS0FBSyxDQStEZDtBQS9ERCxXQUFVLEtBQUssRUFBQyxDQUFDO0lBQ2YsWUFBWSxDQUFBO0lBSVo7UUFNRSw2QkFBb0IsYUFBNEI7WUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBRyxDQUFDO1FBSnRDLDZCQUFTLEdBQXZCLFVBQXdCLENBQVM7WUFDL0IsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUE7UUFDL0QsQ0FBQztRQUlNLHlDQUFXLEdBQWxCLFVBQW1CLFFBQWdCLEVBQUUsVUFBa0IsRUFBRSxhQUFxQjtZQUM1RSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFBO1FBQzlHLENBQUM7UUFFTSwwQ0FBWSxHQUFuQixVQUFvQixRQUFnQixFQUFFLFdBQW9CLEVBQUUsY0FBdUI7WUFDakYsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLDJCQUEyQixFQUFFLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQTtRQUNoSCxDQUFDO1FBRUgsMEJBQUM7SUFBRCxDQWhCQSxBQWdCQyxJQUFBO0lBaEJZLHlCQUFtQixzQkFnQi9CLENBQUE7SUFFRDtRQUdFLG1DQUFvQixhQUE4QixFQUFVLG1CQUF3QztZQUFoRixrQkFBYSxHQUFiLGFBQWEsQ0FBaUI7WUFBVSx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQUksQ0FBQztRQUVsRywrQ0FBVyxHQUFs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QUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ3pKLFVBQUMsQ0FBQyxJQUFLLE9BQUEsS0FBSSxDQUFDLG1CQUFtQixDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBMUMsQ0FBMEMsQ0FDbEQsQ0FBQTtRQUNILENBQUM7UUFwQ2MsdUNBQWEsR0FBVywwQ0FBMEMsQ0FBQTtRQXNDbkYsZ0NBQUM7SUFBRCxDQXZDQSxBQXVDQyxJQUFBO0lBdkNZLCtCQUF5Qiw0QkF1Q3JDLENBQUE7QUFDSCxDQUFDLEVBL0RTLEtBQUssS0FBTCxLQUFLLFFBK0RkIiwiZmlsZSI6InNjcmlwdHMvc3BhcnFsLXVwZGF0ZS1zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIGZpYnJhIHtcbiAgJ3VzZSBzdHJpY3QnXG5cbiAgaW1wb3J0IHMgPSBmaS5zZWNvLnNwYXJxbFxuXG4gIGV4cG9ydCBjbGFzcyBTcGFycWxVcGRhdGVTZXJ2aWNlIHtcblxuICAgIHB1YmxpYyBzdGF0aWMgc2VyaWFsaXplKHM6IFRyaXBsZSk6IHN0cmluZyB7XG4gICAgICByZXR1cm4gcy5zdWJqZWN0LmlkICsgJyAnICsgcy5wcm9wZXJ0eS5pZCArICcgJyArIHMub2JqZWN0LmlkXG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB3b3JrZXJTZXJ2aWNlOiBXb3JrZXJTZXJ2aWNlKSB7fVxuXG4gICAgcHVibGljIHVwZGF0ZVF1YWRzKGVuZHBvaW50OiBzdHJpbmcsIHF1YWRzVG9BZGQ6IFF1YWRbXSwgcXVhZHNUb1JlbW92ZTogUXVhZFtdKTogYW5ndWxhci5JUHJvbWlzZTxhbnk+IHtcbiAgICAgIHJldHVybiB0aGlzLndvcmtlclNlcnZpY2UuY2FsbCgnc3BhcnFsVXBkYXRlV29ya2VyU2VydmljZScsICd1cGRhdGUnLCBbZW5kcG9pbnQsIHF1YWRzVG9BZGQsIHF1YWRzVG9SZW1vdmVdKVxuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVHcmFwaHMoZW5kcG9pbnQ6IHN0cmluZywgZ3JhcGhzVG9BZGQ6IEdyYXBoW10sIGdyYXBoc1RvUmVtb3ZlOiBHcmFwaFtdKTogYW5ndWxhci5JUHJvbWlzZTxhbnk+IHtcbiAgICAgIHJldHVybiB0aGlzLndvcmtlclNlcnZpY2UuY2FsbCgnc3BhcnFsVXBkYXRlV29ya2VyU2VydmljZScsICd1cGRhdGUnLCBbZW5kcG9pbnQsIGdyYXBoc1RvQWRkLCBncmFwaHNUb1JlbW92ZV0pXG4gICAgfVxuXG4gIH1cblxuICBleHBvcnQgY2xhc3MgU3BhcnFsVXBkYXRlV29ya2VyU2VydmljZSB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgcXVlcnlUZW1wbGF0ZTogc3RyaW5nID0gYERFTEVURXs8REVMRVRFPn1JTlNFUlR7PElOU0VSVD59V0hFUkUge31gXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNwYXJxbFNlcnZpY2U6IHMuU3BhcnFsU2VydmljZSwgcHJpdmF0ZSB3b3JrZXJXb3JrZXJTZXJ2aWNlOiBXb3JrZXJXb3JrZXJTZXJ2aWNlICkge31cblxuICAgIHB1YmxpYyB1cGRhdGVRdWFkcyhlbmRwb2ludDogc3RyaW5nLCBxdWFkc1RvQWRkOiBRdWFkW10gPSBbXSwgcXVhZHNUb1JlbW92ZTogUXVhZFtdID0gW10pOiBhbmd1bGFyLklQcm9taXNlPGFueT4ge1xuICAgICAgbGV0IGdyYXBoc1RvQWRkTWFwOiB7W2dyYXBoSWQ6IHN0cmluZ106IEdyYXBofSA9IHt9XG4gICAgICBsZXQgZ3JhcGhzVG9SZW1vdmVNYXA6IHtbZ3JhcGhJZDogc3RyaW5nXTogR3JhcGh9ID0ge31cbiAgICAgIGxldCBncmFwaHNUb0FkZDogR3JhcGhbXSA9IFtdXG4gICAgICBsZXQgZ3JhcGhzVG9SZW1vdmU6IEdyYXBoW10gPSBbXVxuICAgICAgcXVhZHNUb0FkZC5mb3JFYWNoKHEgPT4ge1xuICAgICAgICBsZXQgZ3JhcGg6IEdyYXBoID0gZ3JhcGhzVG9BZGRNYXBbcS5ncmFwaC5pZF1cbiAgICAgICAgaWYgKCFncmFwaCkge1xuICAgICAgICAgIGdyYXBoID0gbmV3IEdyYXBoKHEuZ3JhcGgpXG4gICAgICAgICAgZ3JhcGhzVG9BZGRNYXBbcS5ncmFwaC5pZF0gPSBncmFwaFxuICAgICAgICAgIGdyYXBoc1RvQWRkLnB1c2goZ3JhcGgpXG4gICAgICAgIH1cbiAgICAgICAgZ3JhcGgudHJpcGxlcy5wdXNoKHEpXG4gICAgICB9KVxuICAgICAgcXVhZHNUb1JlbW92ZS5mb3JFYWNoKHEgPT4ge1xuICAgICAgICBsZXQgZ3JhcGg6IEdyYXBoID0gZ3JhcGhzVG9SZW1vdmVNYXBbcS5ncmFwaC5pZF1cbiAgICAgICAgaWYgKCFncmFwaCkge1xuICAgICAgICAgIGdyYXBoID0gbmV3IEdyYXBoKHEuZ3JhcGgpXG4gICAgICAgICAgZ3JhcGhzVG9SZW1vdmVNYXBbcS5ncmFwaC5pZF0gPSBncmFwaFxuICAgICAgICAgIGdyYXBoc1RvUmVtb3ZlLnB1c2goZ3JhcGgpXG4gICAgICAgIH1cbiAgICAgICAgZ3JhcGgudHJpcGxlcy5wdXNoKHEpXG4gICAgICB9KVxuICAgICAgcmV0dXJuIHRoaXMudXBkYXRlR3JhcGhzKGVuZHBvaW50LCBncmFwaHNUb0FkZCwgZ3JhcGhzVG9SZW1vdmUpXG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZUdyYXBocyhlbmRwb2ludDogc3RyaW5nLCBncmFwaHNUb0FkZDogR3JhcGhbXSA9IFtdLCBncmFwaHNUb1JlbW92ZTogR3JhcGhbXSA9IFtdKTogYW5ndWxhci5JUHJvbWlzZTxhbnk+IHtcbiAgICAgIGxldCBhZGRTdHJpbmc6IHN0cmluZyA9IGdyYXBoc1RvQWRkLm1hcChncmFwaCA9PiAnR1JBUEgnICsgZ3JhcGguZ3JhcGguaWQgKyAneycgKyBncmFwaC50cmlwbGVzLm1hcChTcGFycWxVcGRhdGVTZXJ2aWNlLnNlcmlhbGl6ZSkuam9pbignIC4gJykgKyAnfScpLmpvaW4oKVxuICAgICAgbGV0IHJlbW92ZVN0cmluZzogc3RyaW5nID0gZ3JhcGhzVG9SZW1vdmUubWFwKGdyYXBoID0+ICdHUkFQSCcgKyBncmFwaC5ncmFwaC5pZCArICd7JyArIGdyYXBoLnRyaXBsZXMubWFwKFNwYXJxbFVwZGF0ZVNlcnZpY2Uuc2VyaWFsaXplKS5qb2luKCcgLiAnKSArICd9Jykuam9pbigpXG4gICAgICByZXR1cm4gdGhpcy5zcGFycWxTZXJ2aWNlLnVwZGF0ZShlbmRwb2ludCwgU3BhcnFsVXBkYXRlV29ya2VyU2VydmljZS5xdWVyeVRlbXBsYXRlLnJlcGxhY2UoLzxERUxFVEU+L2csIHJlbW92ZVN0cmluZykucmVwbGFjZSgvPElOU0VSVD4vZywgYWRkU3RyaW5nKSkudGhlbihcbiAgICAgICAgKHIpID0+IHRoaXMud29ya2VyV29ya2VyU2VydmljZS5zdHJpcEZ1bmN0aW9ucyhyKVxuICAgICAgKVxuICAgIH1cblxuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

var fibra;
(function (fibra) {
    'use strict';
    var TreeNode = (function () {
        function TreeNode(id, label) {
            this.id = id;
            this.label = label;
            this.children = [];
            this.selected = true;
            this.open = true;
        }
        TreeNode.recursivelyProcess = function (node, f) {
            f(node);
            node.children.forEach(function (n) { return TreeNode.recursivelyProcess(n, f); });
        };
        return TreeNode;
    }());
    fibra.TreeNode = TreeNode;
    var TreeComponent = (function () {
        function TreeComponent() {
            this.bindings = {
                tree: '<',
                onSelect: '&',
            };
            this.templateUrl = 'partials/tree.html';
        }/*<auto_generate>*/TreeComponent.$inject = []; TreeComponent.$componentName = 'tree'/*</auto_generate>*/
        return TreeComponent;
    }());/*<auto_generate>*/angular.module('fibra').component('tree',new TreeComponent());/*</auto_generate>*/
    fibra.TreeComponent = TreeComponent;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvdHJlZS1jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBVSxLQUFLLENBdUJkO0FBdkJELFdBQVUsS0FBSyxFQUFDLENBQUM7SUFDZixZQUFZLENBQUE7SUFFWjtRQVVFLGtCQUFtQixFQUFVLEVBQVMsS0FBYTtZQUFoQyxPQUFFLEdBQUYsRUFBRSxDQUFRO1lBQVMsVUFBSyxHQUFMLEtBQUssQ0FBUTtZQVQ1QyxhQUFRLEdBQWUsRUFBRSxDQUFBO1lBR3pCLGFBQVEsR0FBWSxJQUFJLENBQUE7WUFDeEIsU0FBSSxHQUFZLElBQUksQ0FBQTtRQUsyQixDQUFDO1FBSnpDLDJCQUFrQixHQUFvRCxVQUFDLElBQWMsRUFBRSxDQUFxQjtZQUN4SCxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDUCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQWpDLENBQWlDLENBQUMsQ0FBQTtRQUMvRCxDQUFDLENBQUE7UUFFSCxlQUFDO0lBQUQsQ0FYQSxBQVdDLElBQUE7SUFYWSxjQUFRLFdBV3BCLENBQUE7SUFFRDtRQUFBO1lBQ1csYUFBUSxHQUEyQjtnQkFDeEMsSUFBSSxFQUFFLEdBQUc7Z0JBQ1QsUUFBUSxFQUFFLEdBQUc7YUFDZCxDQUFBO1lBQ00sZ0JBQVcsR0FBVyxvQkFBb0IsQ0FBQTtRQUNyRCxDQUFDO1FBQUQsb0JBQUM7SUFBRCxDQU5BLEFBTUMsSUFBQTtJQU5ZLG1CQUFhLGdCQU16QixDQUFBO0FBQ0gsQ0FBQyxFQXZCUyxLQUFLLEtBQUwsS0FBSyxRQXVCZCIsImZpbGUiOiJzY3JpcHRzL3RyZWUtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIGZpYnJhIHtcbiAgJ3VzZSBzdHJpY3QnXG5cbiAgZXhwb3J0IGNsYXNzIFRyZWVOb2RlIHtcbiAgICBwdWJsaWMgY2hpbGRyZW46IFRyZWVOb2RlW10gPSBbXVxuICAgIHB1YmxpYyBpbnN0YW5jZXM6IG51bWJlclxuICAgIHB1YmxpYyBtYXRjaGluZ0luc3RhbmNlczogbnVtYmVyXG4gICAgcHVibGljIHNlbGVjdGVkOiBib29sZWFuID0gdHJ1ZVxuICAgIHB1YmxpYyBvcGVuOiBib29sZWFuID0gdHJ1ZVxuICAgIHB1YmxpYyBzdGF0aWMgcmVjdXJzaXZlbHlQcm9jZXNzOiAobm9kZTogVHJlZU5vZGUsIGY6IChUcmVlTm9kZSkgPT4gdm9pZCkgPT4gdm9pZCA9IChub2RlOiBUcmVlTm9kZSwgZjogKFRyZWVOb2RlKSA9PiB2b2lkKSA9PiB7XG4gICAgICBmKG5vZGUpXG4gICAgICBub2RlLmNoaWxkcmVuLmZvckVhY2gobiA9PiBUcmVlTm9kZS5yZWN1cnNpdmVseVByb2Nlc3MobiwgZikpXG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBpZDogc3RyaW5nLCBwdWJsaWMgbGFiZWw6IHN0cmluZykge31cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBUcmVlQ29tcG9uZW50IGltcGxlbWVudHMgYW5ndWxhci5JQ29tcG9uZW50T3B0aW9ucyB7XG4gICAgICBwdWJsaWMgYmluZGluZ3M6IHtbaWQ6IHN0cmluZ106IHN0cmluZ30gPSB7XG4gICAgICAgIHRyZWU6ICc8JyxcbiAgICAgICAgb25TZWxlY3Q6ICcmJyxcbiAgICAgIH1cbiAgICAgIHB1YmxpYyB0ZW1wbGF0ZVVybDogc3RyaW5nID0gJ3BhcnRpYWxzL3RyZWUuaHRtbCdcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

var fibra;
(function (fibra) {
    'use strict';
    var WorkerServiceConfiguration = (function () {
        function WorkerServiceConfiguration(appName, workerThreads, importScripts) {
            this.appName = appName;
            this.workerThreads = workerThreads;
            this.importScripts = importScripts;
        }
        return WorkerServiceConfiguration;
    }());
    fibra.WorkerServiceConfiguration = WorkerServiceConfiguration;
    var WorkerService = (function () {
        function WorkerService(workerServiceConfiguration, $rootScope, $window, $q) {
            var _this = this;
            this.$q = $q;
            this.currentWorker = 0;
            this.deferreds = [];
            var path = $window.location.protocol + '//' + $window.location.host;
            var importScripts = workerServiceConfiguration.importScripts.map(function (s) {
                return s.indexOf('http') !== 0 ? path + (s.indexOf('/') !== 0 ? $window.location.pathname : '') + s : s;
            });
            var blobURL = ($window.URL).createObjectURL(new Blob([WorkerService.workerTemplate.replace(/<APP_NAME>/g, workerServiceConfiguration.appName).replace(/<IMPORT_SCRIPTS>/g, importScripts.join('\',\''))], { type: 'application/javascript' }));
            this.workers = [];
            for (var i = 0; i < workerServiceConfiguration.workerThreads; i++) {
                this.workers.push(new Worker(blobURL));
                this.workers[i].addEventListener('message', function (e) {
                    var eventId = e.data.event;
                    if (eventId === 'broadcast') {
                        $rootScope.$broadcast(e.data.name, e.data.args);
                        $rootScope.$apply();
                    }
                    else {
                        var deferred = _this.deferreds[e.data.id];
                        if (deferred) {
                            delete _this.deferreds[e.data.id];
                            if (eventId === 'success')
                                deferred.resolve(e.data.data);
                            else if (eventId === 'failure')
                                deferred.reject(e.data.data);
                            else
                                deferred.notify(e.data.data);
                        }
                    }
                });
            }
        }/*<auto_generate>*/WorkerService.$inject = ['workerServiceConfiguration','$rootScope','$window','$q']; WorkerService.$componentName = 'workerService'/*</auto_generate>*/
        WorkerService.prototype.$broadcast = function (name, args) {
            this.workers.forEach(function (w) { return w.postMessage({ name: name, args: args }); });
        };
        WorkerService.prototype.call = function (service, method, args, canceller) {
            var _this = this;
            var deferred = this.$q.defer();
            this.deferreds.push(deferred);
            var id = this.deferreds.length - 1;
            var worker = this.workers[this.currentWorker];
            this.currentWorker = (this.currentWorker + 1) % this.workers.length;
            if (canceller)
                canceller.then(function () {
                    worker.postMessage({
                        id: id,
                        cancel: true
                    });
                    delete _this.deferreds[id];
                });
            worker.postMessage({
                id: id,
                service: service,
                method: method,
                args: args
            });
            return deferred.promise;
        };
        WorkerService.workerTemplate = "\n      var window = self\n      self.history = {}\n      self.Node = function () {}\n      var document = {\n        readyState: 'complete',\n        cookie: '',\n        querySelector: function () {},\n        createElement: function() {\n          return {\n            pathname: '',\n            setAttribute: function() {}\n          };\n        },\n      };\n      importScripts('<IMPORT_SCRIPTS>')\n      window.angular.module('<APP_NAME>').run(['workerWorkerService', function(workerWorkerService) {\n        self.addEventListener('message', function(e) { workerWorkerService.onMessage(e.data) })\n      }])\n      window.angular.bootstrap(null, ['<APP_NAME>'])\n    ";
        return WorkerService;
    }());/*<auto_generate>*/angular.module('fibra').service('workerService',WorkerService);/*</auto_generate>*/
    fibra.WorkerService = WorkerService;
    var WorkerWorkerService = (function () {
        function WorkerWorkerService($injector, $q, $rootScope) {
            this.$injector = $injector;
            this.$q = $q;
            this.$rootScope = $rootScope;
            this.cancellers = [];
        }/*<auto_generate>*/WorkerWorkerService.$inject = ['$injector','$q','$rootScope']; WorkerWorkerService.$componentName = 'workerWorkerService'/*</auto_generate>*/
        WorkerWorkerService.prototype.stripFunctions = function (obj) {
            var ret = {};
            for (var key in obj)
                if (typeof obj[key] === 'object')
                    ret[key] = this.stripFunctions(obj[key]);
                else if (typeof obj[key] !== 'function')
                    ret[key] = obj[key];
            return ret;
        };
        WorkerWorkerService.prototype.$broadcast = function (name, args) {
            try {
                self.postMessage({ event: 'broadcast', name: name, args: args });
            }
            catch (e) {
                console.log(args, e);
                throw e;
            }
        };
        WorkerWorkerService.prototype.onMessage = function (message) {
            var _this = this;
            if (message.id === undefined) {
                this.$rootScope.$broadcast(message.name, message.args);
                this.$rootScope.$apply();
            }
            else if (message.cancel) {
                var canceller = this.cancellers[message.id];
                delete this.cancellers[message.id];
                if (canceller)
                    canceller.resolve();
            }
            else {
                var service = this.$injector.get(message.service);
                var canceller = this.$q.defer();
                this.cancellers[message.id] = canceller;
                service[message.method].apply(service, message.args.concat(canceller.promise)).then(function (success) {
                    delete _this.cancellers[message.id];
                    self.postMessage({ event: 'success', id: message.id, data: success });
                }, function (error) {
                    delete _this.cancellers[message.id];
                    self.postMessage({ event: 'failure', id: message.id, data: _this.stripFunctions(error) });
                }, function (update) {
                    delete _this.cancellers[message.id];
                    self.postMessage({ event: 'update', id: message.id, data: update });
                });
            }
        };
        return WorkerWorkerService;
    }());/*<auto_generate>*/angular.module('fibra').service('workerWorkerService',WorkerWorkerService);/*</auto_generate>*/
    fibra.WorkerWorkerService = WorkerWorkerService;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvd29ya2VyLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBVSxLQUFLLENBc0pkO0FBdEpELFdBQVUsS0FBSyxFQUFDLENBQUM7SUFDZixZQUFZLENBQUE7SUFFWjtRQUNFLG9DQUFtQixPQUFlLEVBQVMsYUFBcUIsRUFBUyxhQUF1QjtZQUE3RSxZQUFPLEdBQVAsT0FBTyxDQUFRO1lBQVMsa0JBQWEsR0FBYixhQUFhLENBQVE7WUFBUyxrQkFBYSxHQUFiLGFBQWEsQ0FBVTtRQUFHLENBQUM7UUFDdEcsaUNBQUM7SUFBRCxDQUZBLEFBRUMsSUFBQTtJQUZZLGdDQUEwQiw2QkFFdEMsQ0FBQTtJQUVEO1FBNEJFLHVCQUFZLDBCQUFzRCxFQUFFLFVBQXFDLEVBQUUsT0FBK0IsRUFBVSxFQUFxQjtZQTVCM0ssaUJBbUZDO1lBdkRxSixPQUFFLEdBQUYsRUFBRSxDQUFtQjtZQUhqSyxrQkFBYSxHQUFXLENBQUMsQ0FBQTtZQUN6QixjQUFTLEdBQTZCLEVBQUUsQ0FBQTtZQUc5QyxJQUFJLElBQUksR0FBVyxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxJQUFJLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUE7WUFDM0UsSUFBSSxhQUFhLEdBQWEsMEJBQTBCLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUM7Z0JBQzFFLE9BQUEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFBaEcsQ0FBZ0csQ0FDakcsQ0FBQTtZQUNELElBQUksT0FBTyxHQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxJQUFJLElB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S0FBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUE7b0JBQ2xDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDO2dCQUN0RSxDQUFDLENBQUMsQ0FBQTtZQUNKLENBQUM7UUFDSCxDQUFDO1FBQ0gsMEJBQUM7SUFBRCxDQTdDQSxBQTZDQyxJQUFBO0lBN0NZLHlCQUFtQixzQkE2Qy9CLENBQUE7QUFFSCxDQUFDLEVBdEpTLEtBQUssS0FBTCxLQUFLLFFBc0pkIiwiZmlsZSI6InNjcmlwdHMvd29ya2VyLXNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgZmlicmEge1xuICAndXNlIHN0cmljdCdcblxuICBleHBvcnQgY2xhc3MgV29ya2VyU2VydmljZUNvbmZpZ3VyYXRpb24ge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBhcHBOYW1lOiBzdHJpbmcsIHB1YmxpYyB3b3JrZXJUaHJlYWRzOiBudW1iZXIsIHB1YmxpYyBpbXBvcnRTY3JpcHRzOiBzdHJpbmdbXSkge31cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBXb3JrZXJTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgc3RhdGljIHdvcmtlclRlbXBsYXRlOiBzdHJpbmcgPSBgXG4gICAgICB2YXIgd2luZG93ID0gc2VsZlxuICAgICAgc2VsZi5oaXN0b3J5ID0ge31cbiAgICAgIHNlbGYuTm9kZSA9IGZ1bmN0aW9uICgpIHt9XG4gICAgICB2YXIgZG9jdW1lbnQgPSB7XG4gICAgICAgIHJlYWR5U3RhdGU6ICdjb21wbGV0ZScsXG4gICAgICAgIGNvb2tpZTogJycsXG4gICAgICAgIHF1ZXJ5U2VsZWN0b3I6IGZ1bmN0aW9uICgpIHt9LFxuICAgICAgICBjcmVhdGVFbGVtZW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcGF0aG5hbWU6ICcnLFxuICAgICAgICAgICAgc2V0QXR0cmlidXRlOiBmdW5jdGlvbigpIHt9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICBpbXBvcnRTY3JpcHRzKCc8SU1QT1JUX1NDUklQVFM+JylcbiAgICAgIHdpbmRvdy5hbmd1bGFyLm1vZHVsZSgnPEFQUF9OQU1FPicpLnJ1bihbJ3dvcmtlcldvcmtlclNlcnZpY2UnLCBmdW5jdGlvbih3b3JrZXJXb3JrZXJTZXJ2aWNlKSB7XG4gICAgICAgIHNlbGYuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGZ1bmN0aW9uKGUpIHsgd29ya2VyV29ya2VyU2VydmljZS5vbk1lc3NhZ2UoZS5kYXRhKSB9KVxuICAgICAgfV0pXG4gICAgICB3aW5kb3cuYW5ndWxhci5ib290c3RyYXAobnVsbCwgWyc8QVBQX05BTUU+J10pXG4gICAgYFxuXG4gICAgcHJpdmF0ZSB3b3JrZXJzOiBXb3JrZXJbXVxuICAgIHByaXZhdGUgY3VycmVudFdvcmtlcjogbnVtYmVyID0gMFxuICAgIHByaXZhdGUgZGVmZXJyZWRzOiBhbmd1bGFyLklEZWZlcnJlZDxhbnk+W10gPSBbXVxuXG4gICAgY29uc3RydWN0b3Iod29ya2VyU2VydmljZUNvbmZpZ3VyYXRpb246IFdvcmtlclNlcnZpY2VDb25maWd1cmF0aW9uLCAkcm9vdFNjb3BlOiBhbmd1bGFyLklSb290U2NvcGVTZXJ2aWNlLCAkd2luZG93OiBhbmd1bGFyLklXaW5kb3dTZXJ2aWNlLCBwcml2YXRlICRxOiBhbmd1bGFyLklRU2VydmljZSkge1xuICAgICAgbGV0IHBhdGg6IHN0cmluZyA9ICR3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgKyAnLy8nICsgJHdpbmRvdy5sb2NhdGlvbi5ob3N0XG4gICAgICBsZXQgaW1wb3J0U2NyaXB0czogc3RyaW5nW10gPSB3b3JrZXJTZXJ2aWNlQ29uZmlndXJhdGlvbi5pbXBvcnRTY3JpcHRzLm1hcChzID0+XG4gICAgICAgIHMuaW5kZXhPZignaHR0cCcpICE9PSAwID8gcGF0aCArIChzLmluZGV4T2YoJy8nKSAhPT0gMCA/ICR3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgOiAnJykgKyBzIDogc1xuICAgICAgKVxuICAgICAgbGV0IGJsb2JVUkw6IHN0cmluZyA9ICgkd2luZG93LlVSTCkuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKFtXb3JrZXJTZXJ2aWNlLndvcmtlclRlbXBsYXRlLnJlcGxhY2UoLzxBUFBfTkFNRT4vZywgd29ya2VyU2VydmljZUNvbmZpZ3VyYXRpb24uYXBwTmFtZSkucmVwbGFjZSgvPElNUE9SVF9TQ1JJUFRTPi9nLCBpbXBvcnRTY3JpcHRzLmpvaW4oJ1xcJyxcXCcnKSldLCB7IHR5cGU6ICdhcHBsaWNhdGlvbi9qYXZhc2NyaXB0JyB9KSk7XG4gICAgICB0aGlzLndvcmtlcnMgPSBbXVxuICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IHdvcmtlclNlcnZpY2VDb25maWd1cmF0aW9uLndvcmtlclRocmVhZHM7IGkrKykge1xuICAgICAgICB0aGlzLndvcmtlcnMucHVzaChuZXcgV29ya2VyKGJsb2JVUkwpKVxuICAgICAgICB0aGlzLndvcmtlcnNbaV0uYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIChlOiBNZXNzYWdlRXZlbnQpID0+IHtcbiAgICAgICAgICBsZXQgZXZlbnRJZDogc3RyaW5nID0gZS5kYXRhLmV2ZW50O1xuICAgICAgICAgIGlmIChldmVudElkID09PSAnYnJvYWRjYXN0Jykge1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KGUuZGF0YS5uYW1lLCBlLmRhdGEuYXJncylcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KClcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGRlZmVycmVkOiBhbmd1bGFyLklEZWZlcnJlZDxhbnk+ID0gdGhpcy5kZWZlcnJlZHNbZS5kYXRhLmlkXVxuICAgICAgICAgICAgaWYgKGRlZmVycmVkKSB7XG4gICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmRlZmVycmVkc1tlLmRhdGEuaWRdXG4gICAgICAgICAgICAgIGlmIChldmVudElkID09PSAnc3VjY2VzcycpXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShlLmRhdGEuZGF0YSk7XG4gICAgICAgICAgICAgIGVsc2UgaWYgKGV2ZW50SWQgPT09ICdmYWlsdXJlJylcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoZS5kYXRhLmRhdGEpO1xuICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQubm90aWZ5KGUuZGF0YS5kYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljICRicm9hZGNhc3QobmFtZTogc3RyaW5nLCBhcmdzOiBhbnlbXSk6IHZvaWQge1xuICAgICAgdGhpcy53b3JrZXJzLmZvckVhY2godyA9PiB3LnBvc3RNZXNzYWdlKHtuYW1lOiBuYW1lLCBhcmdzOiBhcmdzfSkpXG4gICAgfVxuXG4gICAgcHVibGljIGNhbGw8VD4oc2VydmljZTogc3RyaW5nLCBtZXRob2Q6IHN0cmluZywgYXJnczogYW55W10sIGNhbmNlbGxlcj86IGFuZ3VsYXIuSVByb21pc2U8YW55Pik6IGFuZ3VsYXIuSVByb21pc2U8VD4ge1xuICAgICAgbGV0IGRlZmVycmVkOiBhbmd1bGFyLklEZWZlcnJlZDxUPiA9IHRoaXMuJHEuZGVmZXIoKVxuICAgICAgdGhpcy5kZWZlcnJlZHMucHVzaChkZWZlcnJlZClcbiAgICAgIGxldCBpZDogbnVtYmVyID0gdGhpcy5kZWZlcnJlZHMubGVuZ3RoIC0gMVxuICAgICAgbGV0IHdvcmtlcjogV29ya2VyID0gdGhpcy53b3JrZXJzW3RoaXMuY3VycmVudFdvcmtlcl1cbiAgICAgIHRoaXMuY3VycmVudFdvcmtlciA9ICh0aGlzLmN1cnJlbnRXb3JrZXIgKyAxKSAlIHRoaXMud29ya2Vycy5sZW5ndGhcbiAgICAgIGlmIChjYW5jZWxsZXIpIGNhbmNlbGxlci50aGVuKCgpID0+IHtcbiAgICAgICAgd29ya2VyLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgY2FuY2VsOiB0cnVlXG4gICAgICAgIH0pXG4gICAgICAgIGRlbGV0ZSB0aGlzLmRlZmVycmVkc1tpZF1cbiAgICAgIH0pXG4gICAgICB3b3JrZXIucG9zdE1lc3NhZ2Uoe1xuICAgICAgICBpZDogaWQsXG4gICAgICAgIHNlcnZpY2U6IHNlcnZpY2UsXG4gICAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgICBhcmdzOiBhcmdzXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2VcbiAgICB9XG4gIH1cblxuICBkZWNsYXJlIHZhciBzZWxmOiBhbnlcblxuICBpbnRlcmZhY2UgSU1lc3NhZ2Uge1xuICAgIGlkPzogbnVtYmVyXG4gICAgbmFtZT86IHN0cmluZ1xuICAgIGFyZ3M/OiBhbnlbXVxuICAgIGNhbmNlbD86IGJvb2xlYW5cbiAgICBzZXJ2aWNlPzogc3RyaW5nXG4gICAgbWV0aG9kPzogc3RyaW5nXG4gIH1cblxuICBleHBvcnQgY2xhc3MgV29ya2VyV29ya2VyU2VydmljZSB7XG4gICAgcHJpdmF0ZSBjYW5jZWxsZXJzOiBhbmd1bGFyLklEZWZlcnJlZDxhbnk+W10gPSBbXVxuICAgIHB1YmxpYyBzdHJpcEZ1bmN0aW9ucyhvYmopOiBhbnkge1xuICAgICAgbGV0IHJldDoge30gPSB7fVxuICAgICAgZm9yIChsZXQga2V5IGluIG9iailcbiAgICAgICAgaWYgKHR5cGVvZiBvYmpba2V5XSA9PT0gJ29iamVjdCcpIHJldFtrZXldID0gdGhpcy5zdHJpcEZ1bmN0aW9ucyhvYmpba2V5XSlcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIG9ialtrZXldICE9PSAnZnVuY3Rpb24nKSByZXRba2V5XSA9IG9ialtrZXldXG4gICAgICByZXR1cm4gcmV0XG4gICAgfVxuICAgIHB1YmxpYyAkYnJvYWRjYXN0KG5hbWU6IHN0cmluZywgYXJncz86IGFueSk6IHZvaWQge1xuICAgICAgdHJ5IHtcbiAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHtldmVudDogJ2Jyb2FkY2FzdCcsIG5hbWU6IG5hbWUsIGFyZ3M6IGFyZ3N9KVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhhcmdzLCBlKVxuICAgICAgICB0aHJvdyBlXG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGluamVjdG9yOiBhbmd1bGFyLmF1dG8uSUluamVjdG9yU2VydmljZSwgcHJpdmF0ZSAkcTogYW5ndWxhci5JUVNlcnZpY2UsIHByaXZhdGUgJHJvb3RTY29wZTogYW5ndWxhci5JUm9vdFNjb3BlU2VydmljZSkge31cbiAgICBwdWJsaWMgb25NZXNzYWdlKG1lc3NhZ2U6IElNZXNzYWdlKTogdm9pZCB7XG4gICAgICBpZiAobWVzc2FnZS5pZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuJHJvb3RTY29wZS4kYnJvYWRjYXN0KG1lc3NhZ2UubmFtZSwgbWVzc2FnZS5hcmdzKVxuICAgICAgICB0aGlzLiRyb290U2NvcGUuJGFwcGx5KClcbiAgICAgIH0gZWxzZSBpZiAobWVzc2FnZS5jYW5jZWwpIHtcbiAgICAgICAgbGV0IGNhbmNlbGxlcjogYW5ndWxhci5JRGVmZXJyZWQ8YW55PiA9IHRoaXMuY2FuY2VsbGVyc1ttZXNzYWdlLmlkXTtcbiAgICAgICAgZGVsZXRlIHRoaXMuY2FuY2VsbGVyc1ttZXNzYWdlLmlkXTtcbiAgICAgICAgaWYgKGNhbmNlbGxlcikgY2FuY2VsbGVyLnJlc29sdmUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBzZXJ2aWNlOiBhbnkgPSB0aGlzLiRpbmplY3Rvci5nZXQobWVzc2FnZS5zZXJ2aWNlKVxuICAgICAgICBsZXQgY2FuY2VsbGVyOiBhbmd1bGFyLklEZWZlcnJlZDxhbnk+ID0gdGhpcy4kcS5kZWZlcigpO1xuICAgICAgICB0aGlzLmNhbmNlbGxlcnNbbWVzc2FnZS5pZF0gPSBjYW5jZWxsZXI7XG4gICAgICAgIHNlcnZpY2VbbWVzc2FnZS5tZXRob2RdLmFwcGx5KHNlcnZpY2UsIG1lc3NhZ2UuYXJncy5jb25jYXQoY2FuY2VsbGVyLnByb21pc2UpKS50aGVuKFxuICAgICAgICAgIChzdWNjZXNzKSA9PiB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5jYW5jZWxsZXJzW21lc3NhZ2UuaWRdXG4gICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHtldmVudDogJ3N1Y2Nlc3MnLCBpZDogbWVzc2FnZS5pZCwgZGF0YTogc3VjY2Vzc30pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5jYW5jZWxsZXJzW21lc3NhZ2UuaWRdXG4gICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHtldmVudDogJ2ZhaWx1cmUnLCBpZDogbWVzc2FnZS5pZCwgZGF0YTogdGhpcy5zdHJpcEZ1bmN0aW9ucyhlcnJvcil9KVxuICAgICAgICAgIH0sXG4gICAgICAgICAgKHVwZGF0ZSkgPT4ge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuY2FuY2VsbGVyc1ttZXNzYWdlLmlkXVxuICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7ZXZlbnQ6ICd1cGRhdGUnLCBpZDogbWVzc2FnZS5pZCwgZGF0YTogdXBkYXRlfSk7XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICB9XG5cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

(function(module) {
try {
  module = angular.module('fibra');
} catch (e) {
  module = angular.module('fibra', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('partials/author.html',
    '\n' +
    '<div class="container-fluid main">\n' +
    '  <div class="row main no-gutter">\n' +
    '    <div class="col-md-3" id="left-column"></div>\n' +
    '    <div class="col-md-4" id="middle-column">\n' +
    '      <h4>Autocompletion</h4>\n' +
    '      <sparql-autocomplete limit="30" on-select="$ctrl.setItem(result.id,result.datasource.configuration.endpoint)"></sparql-autocomplete>\n' +
    '    </div>\n' +
    '    <div class="col-md-5" id="right-column">\n' +
    '      <h4>Item</h4>\n' +
    '      <sparql-item endpoint="$ctrl.itemEndpoint" item-id="$ctrl.itemId" on-select="$ctrl.setItem(value,$ctrl.itemEndpoint)"></sparql-item>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('fibra');
} catch (e) {
  module = angular.module('fibra', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('partials/configurations.html',
    '\n' +
    '<div class="container-fluid main">\n' +
    '  <div class="row main no-gutter">\n' +
    '    <div class="col-md-3" id="left-column">\n' +
    '      <h4>Configure autocompletion for</h4>\n' +
    '      <uib-dropdown class="btn-group" dropdown-append-to-body="dropdown-append-to-body">\n' +
    '        <button class="btn btn-primary" id="btn-append-to-body" uib-dropdown-toggle="uib-dropdown-toggle" type="button">{{$ctrl.selectedConfiguration.title || "Select a provider"}}&nbsp;<span class="caret"></span></button>\n' +
    '        <ul class="dropdown-menu" uib-dropdown-menu="uib-dropdown-menu" role="menu" aria-labelledby="btn-append-to-body">\n' +
    '          <li role="menuitem" ng-repeat="configuration in $ctrl.configurations" ng-click="$ctrl.selectConfiguration(configuration)"><a>{{configuration.title}}</a></li>\n' +
    '        </ul>\n' +
    '      </uib-dropdown>\n' +
    '      <div><span class="glyphicon glyphicon-refresh fa-spin" ng-show="$ctrl.selectedConfiguration &amp;&amp; !$ctrl.selectedConfiguration.classTree"></span></div>\n' +
    '      <div ng-show="$ctrl.selectedConfiguration.classTree">\n' +
    '        <div class="checkbox">\n' +
    '          <label>\n' +
    '            <input type="checkbox" ng-model="$ctrl.selectedConfiguration.allSelected" ng-click="$ctrl.selectedConfiguration.toggleAll();$event.stopPropagation()"/>all\n' +
    '          </label>\n' +
    '        </div>\n' +
    '      </div>\n' +
    '      <tree tree="$ctrl.selectedConfiguration.classTree" on-select="$ctrl.selectedConfiguration.alterSelection(treeNode)" ng-show="$ctrl.selectedConfiguration.classTree"></tree>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('fibra');
} catch (e) {
  module = angular.module('fibra', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('partials/sparql-autocomplete.html',
    '\n' +
    '<script type="text/ng-template" id="sparql-item-popover">\n' +
    '  <sparql-item endpoint="datasource.configuration.endpoint" item-id="result.id"></sparql-item>\n' +
    '</script>\n' +
    '<div class="form-group has-feedback">\n' +
    '  <input class="form-control" ng-model="query" ng-model-options="{ debounce: 500 }" ng-change="$ctrl.onChange(query)"/><span class="glyphicon glyphicon-refresh fa-spin form-control-feedback" ng-show="$ctrl.queryRunning"></span><span class="danger glyphicon glyphicon-alert form-control-feedback" ng-show="$ctrl.error"></span>\n' +
    '</div>\n' +
    '<div ng-repeat="datasource in $ctrl.resultsByDatasource track by $index">\n' +
    '  <h4>{{datasource.configuration.title}}</h4>\n' +
    '  <ul>\n' +
    '    <li ng-repeat="group in datasource.resultsByGroup track by $index"><span class="group-label">{{group.label}}</span>\n' +
    '      <ul>\n' +
    '        <li ng-repeat="result in group.results track by $index" ng-click="$ctrl.onSelect({result:result})" uib-popover-template="\'sparql-item-popover\'" popover-trigger="mouseenter" popover-placement="right">{{result.matchedLabel}}<span ng-if="result.matchedLabel !== result.prefLabel">-&gt; {{result.prefLabel}}</span><span ng-if="result.additionalInformation!=\'\'">&nbsp;({{result.additionalInformation}})</span></li>\n' +
    '      </ul>\n' +
    '    </li>\n' +
    '  </ul>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('fibra');
} catch (e) {
  module = angular.module('fibra', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('partials/sparql-item.html',
    '\n' +
    '<h4>{{$ctrl.item.label.value}} ({{$ctrl.item.id}})</h4>\n' +
    '<table class="table table-striped">\n' +
    '  <tr ng-repeat="property in $ctrl.item.properties">\n' +
    '    <th>{{property.label ? property.label.value : property.value}}</th>\n' +
    '    <td><span ng-repeat="value in property.values" ng-click="$ctrl.onSelect({value: value})">{{value.label ? value.label.value : value.value}}{{ $last ? \'\' : \', \' }}</span></td>\n' +
    '  </tr>\n' +
    '</table>');
}]);
})();

(function(module) {
try {
  module = angular.module('fibra');
} catch (e) {
  module = angular.module('fibra', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('partials/tree.html',
    '\n' +
    '<script type="text/ng-template" id="treenode.html">\n' +
    '  <div class="checkbox">\n' +
    '    <label>\n' +
    '      <input type="checkbox" ng-model="node.selected" ng-change="$ctrl.onSelect({treeNode:node})"/>{{node.label}}\n' +
    '    </label><span class="pull-right">{{node.matchingInstances != node.matchingInstances ? node.matchingInstances+\'/\'+node.instances : node.instances}}</span>\n' +
    '  </div>\n' +
    '  <ul>\n' +
    '    <li ng-repeat="node in node.children" ng-include="\'treenode.html\'" ng-class="{selected:node.selected}"></li>\n' +
    '  </ul>\n' +
    '</script>\n' +
    '<ul>\n' +
    '  <li ng-repeat="node in $ctrl.tree" ng-include="\'treenode.html\'" ng-class="{selected:node.selected}"></li>\n' +
    '</ul>');
}]);
})();
