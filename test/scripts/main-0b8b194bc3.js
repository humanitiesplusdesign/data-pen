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
            'scripts/worker-47a6321741.js'
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

//# sourceMappingURL=data:application/json;base64,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R0FBRyxFQUFDLEVBQUUseUJBQXlCLENBQUMsQ0FBQTtRQUN0RSxDQUFDLENBQUE7UUFDRCxVQUFVLENBQUMsR0FBRyxDQUFDLDBCQUEwQixFQUFFLGNBQU0sT0FBQSxVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxJQUFJLEVBQW5DLENBQW1DLENBQUMsQ0FBQTtJQUN2RixDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsRUFyRVMsS0FBSyxLQUFMLEtBQUssUUFxRWQiLCJmaWxlIjoic2NyaXB0cy9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgZmlicmEge1xuICAndXNlIHN0cmljdCdcblxuICBpbnRlcmZhY2UgSUF1dGhlbnRpY2F0aW9uUm9vdFNjb3BlU2VydmljZSBleHRlbmRzIGFuZ3VsYXIuSVJvb3RTY29wZVNlcnZpY2Uge1xuICAgIHNldEF1dGg6ICgpID0+IHZvaWRcbiAgICBkaXNtaXNzQXV0aDogKCkgPT4gdm9pZFxuICAgIGF1dGhJbmZvOiB7XG4gICAgICBhdXRoT3BlbjogYm9vbGVhblxuICAgICAgdXNlcm5hbWU6IHN0cmluZ1xuICAgICAgcGFzc3dvcmQ6IHN0cmluZ1xuICAgIH1cbiAgfVxuXG4gIGxldCBtOiBhbmd1bGFyLklNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnZmlicmEnLCBbICdodHRwLWF1dGgtaW50ZXJjZXB0b3InLCAnbmdTdG9yYWdlJywgJ3VpLnJvdXRlcicsICAndWkuYm9vdHN0cmFwJywgJ3VpLmJvb3RzdHJhcC50cGxzJyBdKVxuICBtLmNvbmZpZygoJHN0YXRlUHJvdmlkZXI6IGFuZ3VsYXIudWkuSVN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcjogYW5ndWxhci51aS5JVXJsUm91dGVyUHJvdmlkZXIpID0+IHtcbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvYXV0aG9yJylcbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnYXV0aG9yJywge1xuICAgICAgICB1cmw6ICcvYXV0aG9yJyxcbiAgICAgICAgdGVtcGxhdGU6ICc8YXV0aG9yPjwvYXV0aG9yPidcbiAgICAgIH0pLnN0YXRlKCdjb25maWd1cmF0aW9uJywge1xuICAgICAgICB1cmw6ICcvY29uZmlndXJhdGlvbicsXG4gICAgICAgIHRlbXBsYXRlOiAnPGNvbmZpZ3VyYXRpb25zPjwvY29uZmlndXJhdGlvbnM+J1xuICAgICAgfSlcbiAgfSlcbiAgbS5jb25maWcoKCRsb2NhbFN0b3JhZ2VQcm92aWRlcikgPT4ge1xuICAgICRsb2NhbFN0b3JhZ2VQcm92aWRlci5zZXRLZXlQcmVmaXgoJ2ZpYnJhLScpO1xuICB9KVxuICBtLnZhbHVlKCd3b3JrZXJTZXJ2aWNlQ29uZmlndXJhdGlvbicsIHtcbiAgICBhcHBOYW1lOiAnZmlicmEnLFxuICAgIHdvcmtlclRocmVhZHM6IDgsXG4gICAgaW1wb3J0U2NyaXB0czogW1xuICAgICAgJ2Jvd2VyX2NvbXBvbmVudHMvYW5ndWxhci9hbmd1bGFyLm1pbi5qcycsXG4gICAgICAnYm93ZXJfY29tcG9uZW50cy9hbmd1bGFyLWh0dHAtYXV0aC9zcmMvaHR0cC1hdXRoLWludGVyY2VwdG9yLmpzJyxcbiAgICAgICdib3dlcl9jb21wb25lbnRzL2FuZ3VsYXItc3BhcnFsLXNlcnZpY2UvZGlzdC9zcGFycWwtc2VydmljZS5qcycsXG4gICAgICAnc2NyaXB0cy93b3JrZXItYXBwLmpzJyxcbiAgICAgICdzY3JpcHRzL3dvcmtlci1zZXJ2aWNlLmpzJyxcbiAgICAgICdzY3JpcHRzL2NvbmZpZ3VyYXRpb24tc2VydmljZS5qcycsXG4gICAgICAnc2NyaXB0cy9jb2xsZWN0aW9uLXV0aWxzLmpzJyxcbiAgICAgICdzY3JpcHRzL3JkZi5qcycsXG4gICAgICAnc2NyaXB0cy9zcGFycWwtaXRlbS1zZXJ2aWNlLmpzJyxcbiAgICAgICdzY3JpcHRzL3NwYXJxbC1hdXRvY29tcGxldGUtc2VydmljZS5qcycsXG4gICAgICAnc2NyaXB0cy9zcGFycWwtdHJlZS1zZXJ2aWNlLmpzJyxcbiAgICAgICdzY3JpcHRzL3NwYXJxbC11cGRhdGUtc2VydmljZS5qcycsXG4gICAgICAnc2NyaXB0cy90cmVlLWNvbXBvbmVudC5qcydcbiAgICAgIF1cbiAgfSlcbiAgbS5ydW4oKCRyb290U2NvcGU6IElBdXRoZW50aWNhdGlvblJvb3RTY29wZVNlcnZpY2UsICRsb2NhbFN0b3JhZ2U6IGFueSwgJGh0dHA6IGFuZ3VsYXIuSUh0dHBTZXJ2aWNlLCBhdXRoU2VydmljZTogYW5ndWxhci5odHRwQXV0aC5JQXV0aFNlcnZpY2UsIHdvcmtlclNlcnZpY2U6IFdvcmtlclNlcnZpY2UpID0+IHtcbiAgICAkcm9vdFNjb3BlLmF1dGhJbmZvID0ge1xuICAgICAgYXV0aE9wZW46IGZhbHNlLFxuICAgICAgdXNlcm5hbWU6IHVuZGVmaW5lZCxcbiAgICAgIHBhc3N3b3JkOiB1bmRlZmluZWRcbiAgICB9XG4gICAgaWYgKCRsb2NhbFN0b3JhZ2UuYXV0aG9yaXphdGlvbikge1xuICAgICAgJGh0dHAuZGVmYXVsdHMuaGVhZGVycy5jb21tb25bJ0F1dGhvcml6YXRpb24nXSA9ICRsb2NhbFN0b3JhZ2UuYXV0aG9yaXphdGlvblxuICAgICAgd29ya2VyU2VydmljZS4kYnJvYWRjYXN0KCdtYWluOmF1dGgtbG9naW5BdXRoSW5mbycsICRsb2NhbFN0b3JhZ2UuYXV0aG9yaXphdGlvbilcbiAgICB9XG4gICAgJHJvb3RTY29wZS5zZXRBdXRoID0gKCkgPT4ge1xuICAgICAgJHJvb3RTY29wZS5hdXRoSW5mby5hdXRoT3BlbiA9IGZhbHNlXG4gICAgICAkbG9jYWxTdG9yYWdlLmF1dGhvcml6YXRpb24gPSAnQmFzaWMgJyArIGJ0b2EoJHJvb3RTY29wZS5hdXRoSW5mby51c2VybmFtZSArICc6JyArICRyb290U2NvcGUuYXV0aEluZm8ucGFzc3dvcmQpXG4gICAgICAkaHR0cC5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vblsnQXV0aG9yaXphdGlvbiddID0gJGxvY2FsU3RvcmFnZS5hdXRob3JpemF0aW9uXG4gICAgICB3b3JrZXJTZXJ2aWNlLiRicm9hZGNhc3QoJ21haW46YXV0aC1sb2dpbkF1dGhJbmZvJywgJGxvY2FsU3RvcmFnZS5hdXRob3JpemF0aW9uKVxuICAgICAgYXV0aFNlcnZpY2UubG9naW5Db25maXJtZWQoKVxuICAgIH1cbiAgICAkcm9vdFNjb3BlLmRpc21pc3NBdXRoID0gKCkgPT4ge1xuICAgICAgJHJvb3RTY29wZS5hdXRoSW5mby5hdXRoT3BlbiA9IGZhbHNlXG4gICAgICBhdXRoU2VydmljZS5sb2dpbkNhbmNlbGxlZCh7c3RhdHVzOiA0MDF9LCAnQXV0aGVudGljYXRpb24gcmVxdWlyZWQnKVxuICAgIH1cbiAgICAkcm9vdFNjb3BlLiRvbignZXZlbnQ6YXV0aC1sb2dpblJlcXVpcmVkJywgKCkgPT4gJHJvb3RTY29wZS5hdXRoSW5mby5hdXRoT3BlbiA9IHRydWUpXG4gIH0pXG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

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
        function AuthorComponentController(configurationService, sparqlTreeService, sparqlItemService) {
            var _this = this;
            this.configurationService = configurationService;
            this.sparqlItemService = sparqlItemService;
            sparqlTreeService.getTree(this.configurationService.configurations[0].endpoint, fibra.SparqlTreeService.getClassTreeQuery).then(function (c) { return _this.classTree = c; });
        }/*<auto_generate>*/AuthorComponentController.$inject = ['configurationService','sparqlTreeService','sparqlItemService']; AuthorComponentController.$componentName = 'AuthorComponentController'/*</auto_generate>*/
        AuthorComponentController.prototype.createItem = function (item) {
            var _this = this;
            var prefLabel = new fibra.PropertyToValues(fibra.SKOS.prefLabel);
            prefLabel.values.push(item.prefLabel);
            var type = new fibra.PropertyToValues(fibra.RDF.type);
            type.values.push(new fibra.NodePlusLabel(item.additionalInformation['type'][0], item.additionalInformation['typeLabel'][0]));
            this.sparqlItemService.createNewItem(item.ids, [prefLabel, type]).then(function (itemId) { return _this.itemId = itemId; });
        };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvYXV0aG9yLWNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFVLEtBQUssQ0ErQmQ7QUEvQkQsV0FBVSxLQUFLLEVBQUMsQ0FBQztJQUNmLFlBQVksQ0FBQTtJQUVaO1FBQ0UsK0JBQW1CLFFBQWdCLEVBQVMsYUFBcUI7WUFBOUMsYUFBUSxHQUFSLFFBQVEsQ0FBUTtZQUFTLGtCQUFhLEdBQWIsYUFBYSxDQUFRO1FBQUcsQ0FBQztRQUN2RSw0QkFBQztJQUFELENBRkEsQUFFQyxJQUFBO0lBRUQ7UUFlRSxtQ0FBb0Isb0JBQTBDLEVBQUUsaUJBQW9DLEVBQVUsaUJBQW9DO1lBZnBKLGlCQWtCQztZQUhxQix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1lBQWdELHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7WUFDaEosaUJBQWlCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLHVCQUFpQixDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsS0FBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLEVBQWxCLENBQWtCLENBQUMsQ0FBQTtRQUNwSixDQUFDO1FBWk0sOENBQVUsR0FBakIsVUFBa0IsSUFBWTtZQUE5QixpQkFRQztZQVBDLElBQUksU0FBUyxHQUFxQixJQUFJLHNCQUFnQixDQUFDLFVBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtZQUN0RSxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7WUFDckMsSUFBSSxJQUFJLEdBQXFCLElBQUksc0JBQWdCLENBQUMsU0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQzNELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksbUJBQWEsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUN0SCxJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ3BFLFVBQUEsTUFBTSxJQUFJLE9BQUEsS0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLEVBQXBCLENBQW9CLENBQy9CLENBQUE7UUFDSCxDQUFDO1FBS0gsZ0NBQUM7SUFBRCxDQWxCQSxBQWtCQyxJQUFBO0lBbEJZLCtCQUF5Qiw0QkFrQnJDLENBQUE7SUFFRDtRQUFBO1lBQ1csZUFBVSxHQUFhLHlCQUF5QixDQUFBO1lBQ2hELGdCQUFXLEdBQVcsc0JBQXNCLENBQUE7UUFDdkQsQ0FBQztRQUFELHNCQUFDO0lBQUQsQ0FIQSxBQUdDLElBQUE7SUFIWSxxQkFBZSxrQkFHM0IsQ0FBQTtBQUNILENBQUMsRUEvQlMsS0FBSyxLQUFMLEtBQUssUUErQmQiLCJmaWxlIjoic2NyaXB0cy9hdXRob3ItY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIGZpYnJhIHtcbiAgJ3VzZSBzdHJpY3QnXG5cbiAgY2xhc3MgVHJlZVZpZXdDb25maWd1cmF0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZW5kcG9pbnQ6IHN0cmluZywgcHVibGljIHF1ZXJ5VGVtcGxhdGU6IHN0cmluZykge31cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBBdXRob3JDb21wb25lbnRDb250cm9sbGVyIHtcbiAgICBwdWJsaWMgaXRlbUlkOiBJTm9kZVxuXG4gICAgcHVibGljIGNsYXNzVHJlZTogVHJlZU5vZGVbXVxuXG4gICAgcHVibGljIGNyZWF0ZUl0ZW0oaXRlbTogUmVzdWx0KTogdm9pZCB7XG4gICAgICBsZXQgcHJlZkxhYmVsOiBQcm9wZXJ0eVRvVmFsdWVzID0gbmV3IFByb3BlcnR5VG9WYWx1ZXMoU0tPUy5wcmVmTGFiZWwpXG4gICAgICBwcmVmTGFiZWwudmFsdWVzLnB1c2goaXRlbS5wcmVmTGFiZWwpXG4gICAgICBsZXQgdHlwZTogUHJvcGVydHlUb1ZhbHVlcyA9IG5ldyBQcm9wZXJ0eVRvVmFsdWVzKFJERi50eXBlKVxuICAgICAgdHlwZS52YWx1ZXMucHVzaChuZXcgTm9kZVBsdXNMYWJlbChpdGVtLmFkZGl0aW9uYWxJbmZvcm1hdGlvblsndHlwZSddWzBdLCBpdGVtLmFkZGl0aW9uYWxJbmZvcm1hdGlvblsndHlwZUxhYmVsJ11bMF0pKVxuICAgICAgdGhpcy5zcGFycWxJdGVtU2VydmljZS5jcmVhdGVOZXdJdGVtKGl0ZW0uaWRzLCBbcHJlZkxhYmVsLCB0eXBlXSkudGhlbihcbiAgICAgICAgaXRlbUlkID0+IHRoaXMuaXRlbUlkID0gaXRlbUlkXG4gICAgICApXG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25maWd1cmF0aW9uU2VydmljZTogQ29uZmlndXJhdGlvblNlcnZpY2UsIHNwYXJxbFRyZWVTZXJ2aWNlOiBTcGFycWxUcmVlU2VydmljZSwgcHJpdmF0ZSBzcGFycWxJdGVtU2VydmljZTogU3BhcnFsSXRlbVNlcnZpY2UpIHtcbiAgICAgIHNwYXJxbFRyZWVTZXJ2aWNlLmdldFRyZWUodGhpcy5jb25maWd1cmF0aW9uU2VydmljZS5jb25maWd1cmF0aW9uc1swXS5lbmRwb2ludCwgU3BhcnFsVHJlZVNlcnZpY2UuZ2V0Q2xhc3NUcmVlUXVlcnkpLnRoZW4oYyA9PiB0aGlzLmNsYXNzVHJlZSA9IGMpXG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIEF1dGhvckNvbXBvbmVudCBpbXBsZW1lbnRzIGFuZ3VsYXIuSUNvbXBvbmVudE9wdGlvbnMge1xuICAgICAgcHVibGljIGNvbnRyb2xsZXI6IEZ1bmN0aW9uID0gQXV0aG9yQ29tcG9uZW50Q29udHJvbGxlclxuICAgICAgcHVibGljIHRlbXBsYXRlVXJsOiBzdHJpbmcgPSAncGFydGlhbHMvYXV0aG9yLmh0bWwnXG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

var fibra;
(function (fibra) {
    'use strict';
    var EnsuredMap = (function () {
        function EnsuredMap() {
            this._set = {};
        }
        EnsuredMap.prototype.get = function (key) {
            return this._set[key];
        };
        EnsuredMap.prototype.contains = function (key) {
            return this._set[key] !== undefined;
        };
        EnsuredMap.prototype.goc = function (key, create) {
            if (this._set[key] === undefined)
                this._set[key] = create ? create(key) : {};
            return this._set[key];
        };
        return EnsuredMap;
    }());
    fibra.EnsuredMap = EnsuredMap;
    var EnsuredOrderedMap = (function () {
        function EnsuredOrderedMap() {
            this._set = {};
            this._array = [];
        }
        EnsuredOrderedMap.prototype.get = function (key) {
            return this._set[key];
        };
        EnsuredOrderedMap.prototype.contains = function (key) {
            return this._set[key] !== undefined;
        };
        EnsuredOrderedMap.prototype.goc = function (key, create) {
            if (this._set[key] === undefined) {
                this._set[key] = create ? create(key) : {};
                this._array.push(this._set[key]);
            }
            return this._set[key];
        };
        EnsuredOrderedMap.prototype.cpush = function (key, value) {
            if (this._set[key] === undefined) {
                this._set[key] = value;
                this._array.push(value);
            }
        };
        EnsuredOrderedMap.prototype.array = function () {
            return this._array;
        };
        return EnsuredOrderedMap;
    }());
    fibra.EnsuredOrderedMap = EnsuredOrderedMap;
    function goc(obj, key, create) {
        if (obj[key] === undefined)
            obj[key] = create ? create(key) : {};
        return obj[key];
    }
    fibra.goc = goc;
    function ogoc(obj, key, arr, create) {
        if (obj[key] === undefined) {
            obj[key] = create ? create(key) : {};
            arr.push(obj[key]);
        }
        return obj[key];
    }
    fibra.ogoc = ogoc;
    function cpush(arr, obj, key, value) {
        if (obj[key] === undefined) {
            obj[key] = value;
            arr.push(value);
        }
    }
    fibra.cpush = cpush;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvY29sbGVjdGlvbi11dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFVLEtBQUssQ0FrRWQ7QUFsRUQsV0FBVSxLQUFLLEVBQUMsQ0FBQztJQUNmLFlBQVksQ0FBQTtJQUVaO1FBQUE7WUFDVSxTQUFJLEdBQXNCLEVBQUUsQ0FBQTtRQVl0QyxDQUFDO1FBWFEsd0JBQUcsR0FBVixVQUFXLEdBQVc7WUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDdkIsQ0FBQztRQUNNLDZCQUFRLEdBQWYsVUFBZ0IsR0FBVztZQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxTQUFTLENBQUE7UUFDckMsQ0FBQztRQUNNLHdCQUFHLEdBQVYsVUFBVyxHQUFXLEVBQUUsTUFBNEI7WUFDbEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxTQUFTLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBTSxFQUFFLENBQUE7WUFDL0MsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDdkIsQ0FBQztRQUNILGlCQUFDO0lBQUQsQ0FiQSxBQWFDLElBQUE7SUFiWSxnQkFBVSxhQWF0QixDQUFBO0lBRUQ7UUFBQTtZQUNVLFNBQUksR0FBc0IsRUFBRSxDQUFBO1lBQzVCLFdBQU0sR0FBUSxFQUFFLENBQUE7UUF1QjFCLENBQUM7UUF0QlEsK0JBQUcsR0FBVixVQUFXLEdBQVc7WUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDdkIsQ0FBQztRQUNNLG9DQUFRLEdBQWYsVUFBZ0IsR0FBVztZQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxTQUFTLENBQUE7UUFDckMsQ0FBQztRQUNNLCtCQUFHLEdBQVYsVUFBVyxHQUFXLEVBQUUsTUFBNEI7WUFDbEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQU0sRUFBRSxDQUFBO2dCQUM3QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7WUFDbEMsQ0FBQztZQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ3ZCLENBQUM7UUFDTSxpQ0FBSyxHQUFaLFVBQWEsR0FBVyxFQUFFLEtBQVE7WUFDaEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQTtnQkFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDekIsQ0FBQztRQUNILENBQUM7UUFDTSxpQ0FBSyxHQUFaO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUE7UUFDcEIsQ0FBQztRQUNILHdCQUFDO0lBQUQsQ0F6QkEsQUF5QkMsSUFBQTtJQXpCWSx1QkFBaUIsb0JBeUI3QixDQUFBO0lBRUQsYUFBdUIsR0FBc0IsRUFBRSxHQUFXLEVBQUUsTUFBNEI7UUFDdEYsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVMsQ0FBQztZQUN6QixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBTSxFQUFFLENBQUE7UUFDekMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNqQixDQUFDO0lBSmUsU0FBRyxNQUlsQixDQUFBO0lBRUQsY0FBd0IsR0FBc0IsRUFBRSxHQUFXLEVBQUUsR0FBUSxFQUFFLE1BQTRCO1FBQ2pHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQzNCLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFNLEVBQUUsQ0FBQTtZQUN2QyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1FBQ3BCLENBQUM7UUFDRCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ2pCLENBQUM7SUFOZSxVQUFJLE9BTW5CLENBQUE7SUFFRCxlQUF5QixHQUFRLEVBQUUsR0FBc0IsRUFBRSxHQUFXLEVBQUUsS0FBUTtRQUM5RSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUMzQixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFBO1lBQ2hCLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDakIsQ0FBQztJQUNILENBQUM7SUFMZSxXQUFLLFFBS3BCLENBQUE7QUFFSCxDQUFDLEVBbEVTLEtBQUssS0FBTCxLQUFLLFFBa0VkIiwiZmlsZSI6InNjcmlwdHMvY29sbGVjdGlvbi11dGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBmaWJyYSB7XG4gICd1c2Ugc3RyaWN0J1xuXG4gIGV4cG9ydCBjbGFzcyBFbnN1cmVkTWFwPFQ+IHtcbiAgICBwcml2YXRlIF9zZXQ6IHtbaWQ6IHN0cmluZ106IFR9ID0ge31cbiAgICBwdWJsaWMgZ2V0KGtleTogc3RyaW5nKTogVCB7XG4gICAgICByZXR1cm4gdGhpcy5fc2V0W2tleV1cbiAgICB9XG4gICAgcHVibGljIGNvbnRhaW5zKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICByZXR1cm4gdGhpcy5fc2V0W2tleV0gIT09IHVuZGVmaW5lZFxuICAgIH1cbiAgICBwdWJsaWMgZ29jKGtleTogc3RyaW5nLCBjcmVhdGU/OiAoa2V5Pzogc3RyaW5nKSA9PiBUKTogVCB7XG4gICAgICBpZiAodGhpcy5fc2V0W2tleV0gPT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5fc2V0W2tleV0gPSBjcmVhdGUgPyBjcmVhdGUoa2V5KSA6IDxUPnt9XG4gICAgICByZXR1cm4gdGhpcy5fc2V0W2tleV1cbiAgICB9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgRW5zdXJlZE9yZGVyZWRNYXA8VD4ge1xuICAgIHByaXZhdGUgX3NldDoge1tpZDogc3RyaW5nXTogVH0gPSB7fVxuICAgIHByaXZhdGUgX2FycmF5OiBUW10gPSBbXVxuICAgIHB1YmxpYyBnZXQoa2V5OiBzdHJpbmcpOiBUIHtcbiAgICAgIHJldHVybiB0aGlzLl9zZXRba2V5XVxuICAgIH1cbiAgICBwdWJsaWMgY29udGFpbnMoa2V5OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgIHJldHVybiB0aGlzLl9zZXRba2V5XSAhPT0gdW5kZWZpbmVkXG4gICAgfVxuICAgIHB1YmxpYyBnb2Moa2V5OiBzdHJpbmcsIGNyZWF0ZT86IChrZXk/OiBzdHJpbmcpID0+IFQpOiBUIHtcbiAgICAgIGlmICh0aGlzLl9zZXRba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX3NldFtrZXldID0gY3JlYXRlID8gY3JlYXRlKGtleSkgOiA8VD57fVxuICAgICAgICB0aGlzLl9hcnJheS5wdXNoKHRoaXMuX3NldFtrZXldKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuX3NldFtrZXldXG4gICAgfVxuICAgIHB1YmxpYyBjcHVzaChrZXk6IHN0cmluZywgdmFsdWU6IFQpOiB2b2lkIHtcbiAgICAgIGlmICh0aGlzLl9zZXRba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX3NldFtrZXldID0gdmFsdWVcbiAgICAgICAgdGhpcy5fYXJyYXkucHVzaCh2YWx1ZSlcbiAgICAgIH1cbiAgICB9XG4gICAgcHVibGljIGFycmF5KCk6IFRbXSB7XG4gICAgICByZXR1cm4gdGhpcy5fYXJyYXlcbiAgICB9XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gZ29jPFQ+KG9iajoge1tpZDogc3RyaW5nXTogVH0sIGtleTogc3RyaW5nLCBjcmVhdGU/OiAoa2V5Pzogc3RyaW5nKSA9PiBUKTogVCB7XG4gICAgaWYgKG9ialtrZXldID09PSB1bmRlZmluZWQpXG4gICAgICBvYmpba2V5XSA9IGNyZWF0ZSA/IGNyZWF0ZShrZXkpIDogPFQ+e31cbiAgICByZXR1cm4gb2JqW2tleV1cbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBvZ29jPFQ+KG9iajoge1tpZDogc3RyaW5nXTogVH0sIGtleTogc3RyaW5nLCBhcnI6IFRbXSwgY3JlYXRlPzogKGtleT86IHN0cmluZykgPT4gVCk6IFQge1xuICAgIGlmIChvYmpba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBvYmpba2V5XSA9IGNyZWF0ZSA/IGNyZWF0ZShrZXkpIDogPFQ+e31cbiAgICAgIGFyci5wdXNoKG9ialtrZXldKVxuICAgIH1cbiAgICByZXR1cm4gb2JqW2tleV1cbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBjcHVzaDxUPihhcnI6IFRbXSwgb2JqOiB7W2lkOiBzdHJpbmddOiBUfSwga2V5OiBzdHJpbmcsIHZhbHVlOiBUKTogdm9pZCB7XG4gICAgaWYgKG9ialtrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG9ialtrZXldID0gdmFsdWVcbiAgICAgIGFyci5wdXNoKHZhbHVlKVxuICAgIH1cbiAgfVxuXG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

var fibra;
(function (fibra) {
    'use strict';
    var ConfigurationService = (function () {
        function ConfigurationService() {
            this.configurations = [
                new Configuration('local', 'Local', 'http://ldf.fi/fibra/sparql'),
                new Configuration('sdfb', 'Six Degrees of Francis Bacon', 'http://ldf.fi/sdfb/sparql', ['http://www.cidoc-crm.org/cidoc-crm/E21_Person']),
                new Configuration('emlo', 'EMLO', 'http://ldf.fi/emlo/sparql', ['http://www.cidoc-crm.org/cidoc-crm/E21_Person']),
                new Configuration('procope', 'Procope', 'http://ldf.fi/procope/sparql', ['http://www.cidoc-crm.org/cidoc-crm/E21_Person']),
                new Configuration('schoenberg', 'Schoenberg', 'http://ldf.fi/schoenberg/sparql', ['http://www.cidoc-crm.org/cidoc-crm/E21_Person']),
            ];
        }/*<auto_generate>*/ConfigurationService.$inject = []; ConfigurationService.$componentName = 'configurationService'/*</auto_generate>*/
        return ConfigurationService;
    }());/*<auto_generate>*/angular.module('fibra').service('configurationService',ConfigurationService);/*</auto_generate>*/
    fibra.ConfigurationService = ConfigurationService;
    var ConfigurationWorkerService = (function () {
        function ConfigurationWorkerService() {
            // FIXME these are now not synced, needs a watch or explicit update functions
            this.configurations = [
                new Configuration('local', 'Local', 'http://ldf.fi/fibra/sparql'),
                new Configuration('sdfb', 'Six Degrees of Francis Bacon', 'http://ldf.fi/sdfb/sparql', ['http://www.cidoc-crm.org/cidoc-crm/E21_Person']),
                new Configuration('emlo', 'EMLO', 'http://ldf.fi/emlo/sparql', ['http://www.cidoc-crm.org/cidoc-crm/E21_Person']),
                new Configuration('procope', 'Procope', 'http://ldf.fi/procope/sparql', ['http://www.cidoc-crm.org/cidoc-crm/E21_Person']),
                new Configuration('schoenberg', 'Schoenberg', 'http://ldf.fi/schoenberg/sparql', ['http://www.cidoc-crm.org/cidoc-crm/E21_Person']),
            ];
        }/*<auto_generate>*/ConfigurationWorkerService.$inject = []; ConfigurationWorkerService.$componentName = 'configurationWorkerService'/*</auto_generate>*/
        return ConfigurationWorkerService;
    }());/*<auto_generate>*/angular.module('fibra').service('configurationWorkerService',ConfigurationWorkerService);/*</auto_generate>*/
    fibra.ConfigurationWorkerService = ConfigurationWorkerService;
    var Configuration = (function () {
        function Configuration(id, title, endpoint, allowed) {
            var _this = this;
            if (allowed === void 0) { allowed = []; }
            this.id = id;
            this.title = title;
            this.endpoint = endpoint;
            this.allowed = allowed;
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
                if (_this.disallowed.length === 0 && _this.allowed.length === 0)
                    _this.autocompletionConfiguration.constraints = '';
                else if (_this.disallowed.length !== 0 && _this.disallowed.length < _this.allowed.length)
                    _this.autocompletionConfiguration.constraints = 'FILTER (?groupId NOT IN (' + _this.disallowed.map(function (id) { return '<' + id + '>'; }).join(', ') + '))';
                else
                    _this.autocompletionConfiguration.constraints = 'FILTER (?groupId IN (' + _this.allowed.map(function (id) { return '<' + id + '>'; }).join(', ') + '))';
            };
            this.autocompletionConfiguration = new fibra.SparqlAutocompletionConfiguration(id, title, endpoint, fibra.SparqlAutocompleteService.queryTemplate);
            this.updateFilter();
        }
        return Configuration;
    }());
    fibra.Configuration = Configuration;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvY29uZmlndXJhdGlvbi1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQVUsS0FBSyxDQXNHZDtBQXRHRCxXQUFVLEtBQUssRUFBQyxDQUFDO0lBQ2YsWUFBWSxDQUFBO0lBRVo7UUFBQTtZQUNTLG1CQUFjLEdBQW9CO2dCQUN2QyxJQUFJLGFBQWEsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLDRCQUE0QixDQUFDO2dCQUNqRSxJQUFJLGFBQWEsQ0FBQyxNQUFNLEVBQUUsOEJBQThCLEVBQUUsMkJBQTJCLEVBQUUsQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO2dCQUN6SSxJQUFJLGFBQWEsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLDJCQUEyQixFQUFFLENBQUMsK0NBQStDLENBQUMsQ0FBQztnQkFDakgsSUFBSSxhQUFhLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSw4QkFBOEIsRUFBRSxDQUFDLCtDQUErQyxDQUFDLENBQUM7Z0JBQzFILElBQUksYUFBYSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsaUNBQWlDLEVBQUUsQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO2FBQ3BJLENBQUE7UUFDSCxDQUFDO1FBQUQsMkJBQUM7SUFBRCxDQVJBLEFBUUMsSUFBQTtJQVJZLDBCQUFvQix1QkFRaEMsQ0FBQTtJQUVEO1FBQUE7WUFDRSw2RUFBNkU7WUFDdEUsbUJBQWMsR0FBb0I7Z0JBQ3ZDLElBQUksYUFBYSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsNEJBQTRCLENBQUM7Z0JBQ2pFLElBQUksYUFBYSxDQUFDLE1BQU0sRUFBRSw4QkFBOEIsRUFBRSwyQkFBMkIsRUFBRSxDQUFDLCtDQUErQyxDQUFDLENBQUM7Z0JBQ3pJLElBQUksYUFBYSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsMkJBQTJCLEVBQUUsQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO2dCQUNqSCxJQUFJLGFBQWEsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLDhC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Z0JBNkV6QixDQUFBO0FBQ0gsQ0FBQyxFQXRHUyxLQUFLLEtBQUwsS0FBSyxRQXNHZCIsImZpbGUiOiJzY3JpcHRzL2NvbmZpZ3VyYXRpb24tc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBmaWJyYSB7XG4gICd1c2Ugc3RyaWN0J1xuXG4gIGV4cG9ydCBjbGFzcyBDb25maWd1cmF0aW9uU2VydmljZSB7XG4gICAgcHVibGljIGNvbmZpZ3VyYXRpb25zOiBDb25maWd1cmF0aW9uW10gPSBbXG4gICAgICBuZXcgQ29uZmlndXJhdGlvbignbG9jYWwnLCAnTG9jYWwnLCAnaHR0cDovL2xkZi5maS9maWJyYS9zcGFycWwnKSxcbiAgICAgIG5ldyBDb25maWd1cmF0aW9uKCdzZGZiJywgJ1NpeCBEZWdyZWVzIG9mIEZyYW5jaXMgQmFjb24nLCAnaHR0cDovL2xkZi5maS9zZGZiL3NwYXJxbCcsIFsnaHR0cDovL3d3dy5jaWRvYy1jcm0ub3JnL2NpZG9jLWNybS9FMjFfUGVyc29uJ10pLFxuICAgICAgbmV3IENvbmZpZ3VyYXRpb24oJ2VtbG8nLCAnRU1MTycsICdodHRwOi8vbGRmLmZpL2VtbG8vc3BhcnFsJywgWydodHRwOi8vd3d3LmNpZG9jLWNybS5vcmcvY2lkb2MtY3JtL0UyMV9QZXJzb24nXSksXG4gICAgICBuZXcgQ29uZmlndXJhdGlvbigncHJvY29wZScsICdQcm9jb3BlJywgJ2h0dHA6Ly9sZGYuZmkvcHJvY29wZS9zcGFycWwnLCBbJ2h0dHA6Ly93d3cuY2lkb2MtY3JtLm9yZy9jaWRvYy1jcm0vRTIxX1BlcnNvbiddKSxcbiAgICAgIG5ldyBDb25maWd1cmF0aW9uKCdzY2hvZW5iZXJnJywgJ1NjaG9lbmJlcmcnLCAnaHR0cDovL2xkZi5maS9zY2hvZW5iZXJnL3NwYXJxbCcsIFsnaHR0cDovL3d3dy5jaWRvYy1jcm0ub3JnL2NpZG9jLWNybS9FMjFfUGVyc29uJ10pLFxuICAgIF1cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBDb25maWd1cmF0aW9uV29ya2VyU2VydmljZSB7XG4gICAgLy8gRklYTUUgdGhlc2UgYXJlIG5vdyBub3Qgc3luY2VkLCBuZWVkcyBhIHdhdGNoIG9yIGV4cGxpY2l0IHVwZGF0ZSBmdW5jdGlvbnNcbiAgICBwdWJsaWMgY29uZmlndXJhdGlvbnM6IENvbmZpZ3VyYXRpb25bXSA9IFtcbiAgICAgIG5ldyBDb25maWd1cmF0aW9uKCdsb2NhbCcsICdMb2NhbCcsICdodHRwOi8vbGRmLmZpL2ZpYnJhL3NwYXJxbCcpLFxuICAgICAgbmV3IENvbmZpZ3VyYXRpb24oJ3NkZmInLCAnU2l4IERlZ3JlZXMgb2YgRnJhbmNpcyBCYWNvbicsICdodHRwOi8vbGRmLmZpL3NkZmIvc3BhcnFsJywgWydodHRwOi8vd3d3LmNpZG9jLWNybS5vcmcvY2lkb2MtY3JtL0UyMV9QZXJzb24nXSksXG4gICAgICBuZXcgQ29uZmlndXJhdGlvbignZW1sbycsICdFTUxPJywgJ2h0dHA6Ly9sZGYuZmkvZW1sby9zcGFycWwnLCBbJ2h0dHA6Ly93d3cuY2lkb2MtY3JtLm9yZy9jaWRvYy1jcm0vRTIxX1BlcnNvbiddKSxcbiAgICAgIG5ldyBDb25maWd1cmF0aW9uKCdwcm9jb3BlJywgJ1Byb2NvcGUnLCAnaHR0cDovL2xkZi5maS9wcm9jb3BlL3NwYXJxbCcsIFsnaHR0cDovL3d3dy5jaWRvYy1jcm0ub3JnL2NpZG9jLWNybS9FMjFfUGVyc29uJ10pLFxuICAgICAgbmV3IENvbmZpZ3VyYXRpb24oJ3NjaG9lbmJlcmcnLCAnU2Nob2VuYmVyZycsICdodHRwOi8vbGRmLmZpL3NjaG9lbmJlcmcvc3BhcnFsJywgWydodHRwOi8vd3d3LmNpZG9jLWNybS5vcmcvY2lkb2MtY3JtL0UyMV9QZXJzb24nXSksXG4gICAgXVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRpb24ge1xuICAgIHB1YmxpYyBhdXRvY29tcGxldGlvbkNvbmZpZ3VyYXRpb246IFNwYXJxbEF1dG9jb21wbGV0aW9uQ29uZmlndXJhdGlvblxuXG4gICAgcHVibGljIGNsYXNzVHJlZTogVHJlZU5vZGVbXVxuXG4gICAgcHJpdmF0ZSBkaXNhbGxvd2VkOiBzdHJpbmdbXSA9IFtdXG5cbiAgICBwcml2YXRlIGFsbFNlbGVjdGVkOiBib29sZWFuID0gdHJ1ZVxuXG4gICAgcHVibGljIHNldENsYXNzVHJlZTogKGNsYXNzVHJlZTogVHJlZU5vZGVbXSkgPT4gdm9pZCA9IChjbGFzc1RyZWU6IFRyZWVOb2RlW10pID0+IHtcbiAgICAgIGNsYXNzVHJlZS5mb3JFYWNoKHRyZWUyID0+IFRyZWVOb2RlLnJlY3Vyc2l2ZWx5UHJvY2Vzcyh0cmVlMiwgdHJlZU5vZGUgPT4ge1xuICAgICAgICB0cmVlTm9kZS5zZWxlY3RlZCA9IHRydWVcbiAgICAgICAgdGhpcy5hbGxvd2VkLnB1c2godHJlZU5vZGUuaWQpXG4gICAgICB9KSlcbiAgICAgIHRoaXMuY2xhc3NUcmVlID0gY2xhc3NUcmVlXG4gICAgICB0aGlzLmFsbFNlbGVjdGVkID0gdHJ1ZVxuICAgIH1cbiAgICBwdWJsaWMgYWx0ZXJTZWxlY3Rpb246IChUcmVlTm9kZSkgPT4gdm9pZCA9IChub2RlOiBUcmVlTm9kZSkgPT4ge1xuICAgICAgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKGNuID0+IFRyZWVOb2RlLnJlY3Vyc2l2ZWx5UHJvY2VzcyhjbiwgbiA9PiB7XG4gICAgICAgIG4uc2VsZWN0ZWQgPSBub2RlLnNlbGVjdGVkXG4gICAgICAgIHRoaXMuc2V0QWxsb3dlZERpc2FsbG93ZWQobilcbiAgICAgIH0pKVxuICAgICAgdGhpcy5zZXRBbGxvd2VkRGlzYWxsb3dlZChub2RlKVxuICAgICAgdGhpcy51cGRhdGVGaWx0ZXIoKVxuICAgIH1cbiAgICBwdWJsaWMgc2V0QWxsb3dlZERpc2FsbG93ZWQ6IChUcmVlTm9kZSkgPT4gdm9pZCA9IChub2RlOiBUcmVlTm9kZSkgPT4ge1xuICAgICAgaWYgKG5vZGUuc2VsZWN0ZWQpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVEaXNhbGxvd2VkKG5vZGUpXG4gICAgICAgIHRoaXMuYWRkQWxsb3dlZChub2RlKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hbGxTZWxlY3RlZCA9IGZhbHNlXG4gICAgICAgIHRoaXMucmVtb3ZlQWxsb3dlZChub2RlKVxuICAgICAgICB0aGlzLmFkZERpc2FsbG93ZWQobm9kZSlcbiAgICAgIH1cbiAgICB9XG4gICAgcHVibGljIGFkZEFsbG93ZWQ6IChUcmVlTm9kZSkgPT4gdm9pZCA9IChub2RlOiBUcmVlTm9kZSkgPT4ge1xuICAgICAgaWYgKHRoaXMuYWxsb3dlZC5pbmRleE9mKG5vZGUuaWQpID09PSAtMSkge1xuICAgICAgICB0aGlzLmFsbG93ZWQucHVzaChub2RlLmlkKVxuICAgICAgfVxuICAgIH1cbiAgICBwdWJsaWMgcmVtb3ZlQWxsb3dlZDogKFRyZWVOb2RlKSA9PiB2b2lkID0gKG5vZGU6IFRyZWVOb2RlKSA9PiB7XG4gICAgICBpZiAodGhpcy5hbGxvd2VkLmluZGV4T2Yobm9kZS5pZCkgIT09IC0xKSB7XG4gICAgICAgIHRoaXMuYWxsb3dlZC5zcGxpY2UodGhpcy5hbGxvd2VkLmluZGV4T2Yobm9kZS5pZCksIDEpXG4gICAgICB9XG4gICAgfVxuICAgIHB1YmxpYyBhZGREaXNhbGxvd2VkOiAoVHJlZU5vZGUpID0+IHZvaWQgPSAobm9kZTogVHJlZU5vZGUpID0+IHtcbiAgICAgIGlmICh0aGlzLmRpc2FsbG93ZWQuaW5kZXhPZihub2RlLmlkKSA9PT0gLTEpIHtcbiAgICAgICAgdGhpcy5kaXNhbGxvd2VkLnB1c2gobm9kZS5pZClcbiAgICAgIH1cbiAgICB9XG4gICAgcHVibGljIHJlbW92ZURpc2FsbG93ZWQ6IChUcmVlTm9kZSkgPT4gdm9pZCA9IChub2RlOiBUcmVlTm9kZSkgPT4ge1xuICAgICAgaWYgKHRoaXMuZGlzYWxsb3dlZC5pbmRleE9mKG5vZGUuaWQpICE9PSAtMSkge1xuICAgICAgICB0aGlzLmRpc2FsbG93ZWQuc3BsaWNlKHRoaXMuZGlzYWxsb3dlZC5pbmRleE9mKG5vZGUuaWQpLCAxKVxuICAgICAgfVxuICAgIH1cbiAgICBwdWJsaWMgdG9nZ2xlQWxsOiAoKSA9PiB2b2lkID0gKCkgPT4ge1xuICAgICAgdGhpcy5jbGFzc1RyZWUuZm9yRWFjaChub2RlID0+IFRyZWVOb2RlLnJlY3Vyc2l2ZWx5UHJvY2Vzcyhub2RlLCBuID0+IHtcbiAgICAgICAgbi5zZWxlY3RlZCA9IHRoaXMuYWxsU2VsZWN0ZWRcbiAgICAgICAgdGhpcy5zZXRBbGxvd2VkRGlzYWxsb3dlZChuKVxuICAgICAgfSkpXG4gICAgICB0aGlzLnVwZGF0ZUZpbHRlcigpXG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHVibGljIGlkOiBzdHJpbmcsIHB1YmxpYyB0aXRsZTogc3RyaW5nLCBwdWJsaWMgZW5kcG9pbnQ6IHN0cmluZywgcHVibGljIGFsbG93ZWQ6IHN0cmluZ1tdID0gW10pIHtcbiAgICAgIHRoaXMuYXV0b2NvbXBsZXRpb25Db25maWd1cmF0aW9uID0gbmV3IFNwYXJxbEF1dG9jb21wbGV0aW9uQ29uZmlndXJhdGlvbihpZCwgdGl0bGUsIGVuZHBvaW50LCBTcGFycWxBdXRvY29tcGxldGVTZXJ2aWNlLnF1ZXJ5VGVtcGxhdGUpXG4gICAgICB0aGlzLnVwZGF0ZUZpbHRlcigpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVGaWx0ZXI6ICgpID0+IHZvaWQgPSAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5kaXNhbGxvd2VkLmxlbmd0aCA9PT0gMCAmJiB0aGlzLmFsbG93ZWQubGVuZ3RoID09PSAwKVxuICAgICAgICB0aGlzLmF1dG9jb21wbGV0aW9uQ29uZmlndXJhdGlvbi5jb25zdHJhaW50cyA9ICcnXG4gICAgICBlbHNlIGlmICh0aGlzLmRpc2FsbG93ZWQubGVuZ3RoICE9PSAwICYmIHRoaXMuZGlzYWxsb3dlZC5sZW5ndGggPCB0aGlzLmFsbG93ZWQubGVuZ3RoKVxuICAgICAgICB0aGlzLmF1dG9jb21wbGV0aW9uQ29uZmlndXJhdGlvbi5jb25zdHJhaW50cyA9ICdGSUxURVIgKD9ncm91cElkIE5PVCBJTiAoJyArIHRoaXMuZGlzYWxsb3dlZC5tYXAoaWQgPT4gJzwnICsgaWQgKyAnPicpLmpvaW4oJywgJykgKyAnKSknXG4gICAgICBlbHNlXG4gICAgICAgIHRoaXMuYXV0b2NvbXBsZXRpb25Db25maWd1cmF0aW9uLmNvbnN0cmFpbnRzID0gJ0ZJTFRFUiAoP2dyb3VwSWQgSU4gKCcgKyB0aGlzLmFsbG93ZWQubWFwKGlkID0+ICc8JyArIGlkICsgJz4nKS5qb2luKCcsICcpICsgJykpJ1xuICAgIH1cblxuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

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
            _super.call(this, property);
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
    var RDF = (function () {
        function RDF() {
        }
        RDF.ns = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
        RDF.type = new IRI(RDF.ns + 'type');
        return RDF;
    }());
    fibra.RDF = RDF;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvcmRmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBVSxLQUFLLENBdUxkO0FBdkxELFdBQVUsS0FBSyxFQUFDLENBQUM7SUFDZixZQUFZLENBQUE7SUFFWixJQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQTtJQUV6QixXQUFZLFFBQVE7UUFDbEIsNkNBQU8sQ0FBQTtRQUNQLHFDQUFHLENBQUE7UUFDSCxpREFBUyxDQUFBO0lBQ1gsQ0FBQyxFQUpXLGNBQVEsS0FBUixjQUFRLFFBSW5CO0lBSkQsSUFBWSxRQUFRLEdBQVIsY0FJWCxDQUFBO0lBVUQ7UUFNRSwyQkFBWSxPQUF5QjtZQUNuQyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQ2xELElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQTtZQUMxQixNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDckIsS0FBSyxTQUFTO29CQUNaLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQTtvQkFDNUIsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUE7b0JBQy9CLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQTtvQkFDaEMsS0FBSyxDQUFBO2dCQUNQLEtBQUssS0FBSztvQkFDUixJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUE7b0JBQ3hCLEtBQUssQ0FBQTtnQkFDUCxLQUFLLE9BQU87b0JBQ1YsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFBO29CQUM5QixLQUFLLENBQUE7Z0JBQ1AsU0FBUyxNQUFNLHVCQUF1QixHQUFHLE9BQU8sQ0FBQyxJQUFJLEdBQUcsT0FBTyxHQUFHLE9BQU8sQ0FBQTtZQUMzRSxDQUFDO1FBQ0gsQ0FBQztRQUNILHdCQUFDO0lBQUQsQ0F4QkEsQUF3QkMsSUFBQTtJQXhCWSx1QkFBaUIsb0JBd0I3QixDQUFBO0lBRUQ7UUFNRSxrQkFBbUIsS0FBWTtZQUFaLFVBQUssR0FBTCxLQUFLLENBQU87WUFDN0IsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFBO1lBQ2xCLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQTtZQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUE7WUFDeEIsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFBO1lBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQTtRQUNoQyxDQUFDO1FBQ0gsZUFBQztJQUFELENBYkEsQUFhQyxJQUFBO0lBYlksY0FBUSxXQWFwQixDQUFBO0lBRUQ7UUFLRSxnQkFBbUIsRUFBVTtZQUFWLE9BQUUsR0FBRixFQUFFLENBQVE7WUFDM0IsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUE7Z0JBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQTtZQUM3QyxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFBO2dCQUM5QixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDOUIsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQTtnQkFDNUIsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7Z0JBQ2pELEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2xELElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7Z0JBQy9DLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUN6RCxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFBO1lBQ3RFLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixNQUFNLCtCQUErQixDQUFBO1lBQ3ZDLENBQUM7UUFDSCxDQUFDO1FBQ0gsYUFBQztJQUFELENBdkJBLEFBdUJDLElBQUE7SUF2QlksWUFBTSxTQXVCbEIsQ0FBQTtJQUVEO1FBR0UsYUFBbUIsS0FBYTtZQUFiLFVBQUssR0FBTCxLQUFLLENBQVE7WUFGekIsU0FBSSxHQUFhLFFBQVEsQ0FBQyxHQUFHLENBQUE7WUFHbEMsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLEdBQUcsS0FBSyxHQUFHLEdBQUcsQ0FBQTtRQUM3QixDQUFDO1FBQ0gsVUFBQztJQUFELENBTkEsQUFNQyxJQUFBO0lBTlksU0FBRyxNQU1mLENBQUE7SUFFRDtRQUdFLG1CQUFtQixLQUFhO1lBQWIsVUFBSyxHQUFMLEtBQUssQ0FBUTtZQUZ6QixTQUFJLEdBQWEsUUFBUSxDQUFDLFNBQVMsQ0FBQTtZQUd4QyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksR0FBRyxLQUFLLENBQUE7UUFDeEIsQ0FBQztRQUNILGdCQUFDO0lBQUQsQ0FOQSxBQU1DLElBQUE7SUFOWSxlQUFTLFlBTXJCLENBQUE7SUFFRDtRQUdFLGlCQUFtQixLQUFhLEVBQVMsSUFBYSxFQUFTLFFBQWlCO1lBQTdELFVBQUssR0FBTCxLQUFLLENBQVE7WUFBUyxTQUFJLEdBQUosSUFBSSxDQUFTO1lBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBUztZQUZ6RSxTQUFJLEdBQWEsUUFBUSxDQUFDLE9BQU8sQ0FBQTtZQUd0QyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUM7Z0JBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDL0IsS0FBSywwQ0FBMEMsQ0FBQztvQkFDaEQsS0FBSywwQ0FBMEMsQ0FBQztvQkFDaEQsS0FBSyx5Q0FBeUMsQ0FBQztvQkFDL0MsS0FBSywwQ0FBMEM7d0JBQUUsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUM7d0JBQUMsS0FBSyxDQUFBO29CQUN2RSxLQUFLLHlDQUF5Qzt3QkFBRSxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsR0FBRyxLQUFLLEdBQUcsR0FBRyxDQUFDO3dCQUFDLEtBQUssQ0FBQTtvQkFDbEY7d0JBQVMsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLEdBQUcsS0FBSyxHQUFHLE1BQU0sR0FBRyxRQUFRLEdBQUcsR0FBRyxDQUFDO3dCQUFDLEtBQUssQ0FBQTtnQkFDakUsQ0FBQztZQUNELElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLEdBQUcsS0FBSyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUE7WUFDbEQsSUFBSTtnQkFBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsR0FBRyxLQUFLLEdBQUcsR0FBRyxDQUFBO1FBQ2xDLENBQUM7UUFDSCxjQUFDO0lBQUQsQ0FmQSxBQWVDLElBQUE7SUFmWSxhQUFPLFVBZW5CLENBQUE7SUFVRDtRQUFtQyxpQ0FBUTtRQUN6Qyx1QkFBbUIsSUFBVyxFQUFTLEtBQWE7WUFDbEQsa0JBQU0sSUFBSSxDQUFDLENBQUE7WUFETSxTQUFJLEdBQUosSUFBSSxDQUFPO1lBQVMsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUVwRCxDQUFDO1FBQ0gsb0JBQUM7SUFBRCxDQUpBLEFBSUMsQ0FKa0MsUUFBUSxHQUkxQztJQUpZLG1CQUFhLGdCQUl6QixDQUFBO0lBRUQ7UUFBc0Msb0NBQWE7UUFFakQsMEJBQVksUUFBZTtZQUN6QixrQkFBTSxRQUFRLENBQUMsQ0FBQTtZQUZWLFdBQU0sR0FBNEIsRUFBRSxDQUFBO1FBRzNDLENBQUM7UUFDSCx1QkFBQztJQUFELENBTEEsQUFLQyxDQUxxQyxhQUFhLEdBS2xEO0lBTFksc0JBQWdCLG1CQUs1QixDQUFBO0lBRUQ7UUFBMEIsd0JBQWE7UUFBdkM7WUFBMEIsOEJBQWE7WUFDOUIsZUFBVSxHQUF1QixFQUFFLENBQUE7WUFDbkMsc0JBQWlCLEdBQXVCLEVBQUUsQ0FBQTtRQUNuRCxDQUFDO1FBQUQsV0FBQztJQUFELENBSEEsQUFHQyxDQUh5QixhQUFhLEdBR3RDO0lBSFksVUFBSSxPQUdoQixDQUFBO0lBRUQ7UUFDRSxnQkFDUyxPQUFjLEVBQ2QsUUFBZSxFQUNmLE1BQWE7WUFGYixZQUFPLEdBQVAsT0FBTyxDQUFPO1lBQ2QsYUFBUSxHQUFSLFFBQVEsQ0FBTztZQUNmLFdBQU0sR0FBTixNQUFNLENBQU87UUFDbkIsQ0FBQztRQUNOLGFBQUM7SUFBRCxDQU5BLEFBTUMsSUFBQTtJQU5ZLFlBQU0sU0FNbEIsQ0FBQTtJQUVEO1FBQTBCLHdCQUFNO1FBQzlCLGNBQ0UsT0FBYyxFQUNkLFFBQWUsRUFDZixNQUFhLEVBQ04sS0FBWTtZQUNqQixrQkFBTSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFBO1lBRDNCLFVBQUssR0FBTCxLQUFLLENBQU87UUFDZ0IsQ0FBQztRQUN4QyxXQUFDO0lBQUQsQ0FQQSxBQU9DLENBUHlCLE1BQU0sR0FPL0I7SUFQWSxVQUFJLE9BT2hCLENBQUE7SUFFRDtRQUNFLGVBQ1MsS0FBYSxFQUNiLE9BQXNCO1lBQTdCLHVCQUE2QixHQUE3QixZQUE2QjtZQUR0QixVQUFLLEdBQUwsS0FBSyxDQUFRO1lBQ2IsWUFBTyxHQUFQLE9BQU8sQ0FBZTtRQUM1QixDQUFDO1FBQ04sWUFBQztJQUFELENBTEEsQUFLQyxJQUFBO0lBTFksV0FBSyxRQUtqQixDQUFBO0lBRUQ7UUFBQTtRQUdBLENBQUM7UUFGZSxPQUFFLEdBQVcsc0NBQXNDLENBQUE7UUFDbkQsY0FBUyxHQUFRLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsV0FBVyxDQUFDLENBQUE7UUFDL0QsV0FBQztJQUFELENBSEEsQUFHQyxJQUFBO0lBSFksVUFBSSxPQUdoQixDQUFBO0lBRUQ7UUFBQTtRQUdBLENBQUM7UUFGZSxNQUFFLEdBQVcsZ0NBQWdDLENBQUE7UUFDN0MsVUFBTSxHQUFRLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsUUFBUSxDQUFDLENBQUE7UUFDeEQsVUFBQztJQUFELENBSEEsQUFHQyxJQUFBO0lBSFksU0FBRyxNQUdmLENBQUE7SUFFRDtRQUFBO1FBR0EsQ0FBQztRQUZlLE1BQUUsR0FBVyw2Q0FBNkMsQ0FBQTtRQUMxRCxRQUFJLEdBQVEsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQTtRQUNwRCxVQUFDO0lBQUQsQ0FIQSxBQUdDLElBQUE7SUFIWSxTQUFHLE1BR2YsQ0FBQTtBQUVILENBQUMsRUF2TFMsS0FBSyxLQUFMLEtBQUssUUF1TGQiLCJmaWxlIjoic2NyaXB0cy9yZGYuanMiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgZmlicmEge1xuICAndXNlIHN0cmljdCdcblxuICBpbXBvcnQgcyA9IGZpLnNlY28uc3BhcnFsXG5cbiAgZXhwb3J0IGVudW0gTm9kZVR5cGUge1xuICAgIExpdGVyYWwsXG4gICAgSVJJLFxuICAgIEJsYW5rTm9kZVxuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBJTm9kZSB7XG4gICAgaWQ6IHN0cmluZ1xuICAgIHZhbHVlOiBzdHJpbmdcbiAgICB0eXBlOiBOb2RlVHlwZVxuICAgIGxhbmc/OiBzdHJpbmdcbiAgICBkYXRhdHlwZT86IHN0cmluZ1xuICB9XG5cbiAgZXhwb3J0IGNsYXNzIFNwYXJxbEJpbmRpbmdOb2RlIGltcGxlbWVudHMgSU5vZGUge1xuICAgIHB1YmxpYyBpZDogc3RyaW5nXG4gICAgcHVibGljIHZhbHVlOiBzdHJpbmdcbiAgICBwdWJsaWMgdHlwZTogTm9kZVR5cGVcbiAgICBwdWJsaWMgbGFuZzogc3RyaW5nXG4gICAgcHVibGljIGRhdGF0eXBlOiBzdHJpbmdcbiAgICBjb25zdHJ1Y3RvcihiaW5kaW5nOiBzLklTcGFycWxCaW5kaW5nKSB7XG4gICAgICB0aGlzLmlkID0gcy5TcGFycWxTZXJ2aWNlLmJpbmRpbmdUb1N0cmluZyhiaW5kaW5nKVxuICAgICAgdGhpcy52YWx1ZSA9IGJpbmRpbmcudmFsdWVcbiAgICAgIHN3aXRjaCAoYmluZGluZy50eXBlKSB7XG4gICAgICAgIGNhc2UgJ2xpdGVyYWwnOlxuICAgICAgICAgIHRoaXMudHlwZSA9IE5vZGVUeXBlLkxpdGVyYWxcbiAgICAgICAgICB0aGlzLmxhbmcgPSBiaW5kaW5nWyd4bWw6bGFuZyddXG4gICAgICAgICAgdGhpcy5kYXRhdHlwZSA9IGJpbmRpbmcuZGF0YXR5cGVcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICd1cmknOlxuICAgICAgICAgIHRoaXMudHlwZSA9IE5vZGVUeXBlLklSSVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJ2Jub2RlJzpcbiAgICAgICAgICB0aGlzLnR5cGUgPSBOb2RlVHlwZS5CbGFua05vZGVcbiAgICAgICAgICBicmVha1xuICAgICAgICBkZWZhdWx0OiB0aHJvdyAnVW5rbm93biBiaW5kaW5nIHR5cGUgJyArIGJpbmRpbmcudHlwZSArICcgZm9yICcgKyBiaW5kaW5nXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIE5vZGVOb2RlIGltcGxlbWVudHMgSU5vZGUge1xuICAgIHB1YmxpYyBpZDogc3RyaW5nXG4gICAgcHVibGljIHR5cGU6IE5vZGVUeXBlXG4gICAgcHVibGljIHZhbHVlOiBzdHJpbmdcbiAgICBwdWJsaWMgbGFuZzogc3RyaW5nXG4gICAgcHVibGljIGRhdGF0eXBlOiBzdHJpbmdcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgb3RoZXI6IElOb2RlKSB7XG4gICAgICB0aGlzLmlkID0gb3RoZXIuaWRcbiAgICAgIHRoaXMudHlwZSA9IG90aGVyLnR5cGVcbiAgICAgIHRoaXMudmFsdWUgPSBvdGhlci52YWx1ZVxuICAgICAgdGhpcy5sYW5nID0gb3RoZXIubGFuZ1xuICAgICAgdGhpcy5kYXRhdHlwZSA9IG90aGVyLmRhdGF0eXBlXG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIElkTm9kZSBpbXBsZW1lbnRzIElOb2RlIHtcbiAgICBwdWJsaWMgdHlwZTogTm9kZVR5cGVcbiAgICBwdWJsaWMgdmFsdWU6IHN0cmluZ1xuICAgIHB1YmxpYyBsYW5nOiBzdHJpbmdcbiAgICBwdWJsaWMgZGF0YXR5cGU6IHN0cmluZ1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBpZDogc3RyaW5nKSB7XG4gICAgICBpZiAoaWQuaW5kZXhPZignPCcpID09PSAwKSB7XG4gICAgICAgIHRoaXMudHlwZSA9IE5vZGVUeXBlLklSSVxuICAgICAgICB0aGlzLnZhbHVlID0gaWQuc3Vic3RyaW5nKDEsIGlkLmxlbmd0aCAtIDEpXG4gICAgICB9IGVsc2UgaWYgKGlkLmluZGV4T2YoJ186JykgPT09IDApIHtcbiAgICAgICAgdGhpcy50eXBlID0gTm9kZVR5cGUuQmxhbmtOb2RlXG4gICAgICAgIHRoaXMudmFsdWUgPSBpZC5zdWJzdHJpbmcoMilcbiAgICAgIH0gZWxzZSBpZiAoaWQuaW5kZXhPZignXCInKSA9PT0gMCkge1xuICAgICAgICB0aGlzLnR5cGUgPSBOb2RlVHlwZS5MaXRlcmFsXG4gICAgICAgIHRoaXMudmFsdWUgPSBpZC5zdWJzdHJpbmcoMSwgaWQubGFzdEluZGV4T2YoJ1wiJykpXG4gICAgICAgIGlmIChpZC5sYXN0SW5kZXhPZignQCcpID09PSBpZC5sYXN0SW5kZXhPZignXCInKSArIDEpXG4gICAgICAgICAgdGhpcy5sYW5nID0gaWQuc3Vic3RyaW5nKGlkLmxhc3RJbmRleE9mKCdAJykpXG4gICAgICAgIGVsc2UgaWYgKGlkLmxhc3RJbmRleE9mKCdeXjwnKSA9PT0gaWQubGFzdEluZGV4T2YoJ1wiJykgKyAxKVxuICAgICAgICAgIHRoaXMuZGF0YXR5cGUgPSBpZC5zdWJzdHJpbmcoaWQubGFzdEluZGV4T2YoJ15ePCcpLCBpZC5sZW5ndGggLSAxKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgJ051bWJlciBkYXRhdHlwZXMgbm90IGRvbmUgeWV0J1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBJUkkgaW1wbGVtZW50cyBJTm9kZSB7XG4gICAgcHVibGljIHR5cGU6IE5vZGVUeXBlID0gTm9kZVR5cGUuSVJJXG4gICAgcHVibGljIGlkOiBzdHJpbmdcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdmFsdWU6IHN0cmluZykge1xuICAgICAgdGhpcy5pZCA9ICc8JyArIHZhbHVlICsgJz4nXG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIEJsYW5rTm9kZSBpbXBsZW1lbnRzIElOb2RlIHtcbiAgICBwdWJsaWMgdHlwZTogTm9kZVR5cGUgPSBOb2RlVHlwZS5CbGFua05vZGVcbiAgICBwdWJsaWMgaWQ6IHN0cmluZ1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB2YWx1ZTogc3RyaW5nKSB7XG4gICAgICB0aGlzLmlkID0gJ186JyArIHZhbHVlXG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIExpdGVyYWwgaW1wbGVtZW50cyBJTm9kZSB7XG4gICAgcHVibGljIHR5cGU6IE5vZGVUeXBlID0gTm9kZVR5cGUuTGl0ZXJhbFxuICAgIHB1YmxpYyBpZDogc3RyaW5nXG4gICAgY29uc3RydWN0b3IocHVibGljIHZhbHVlOiBzdHJpbmcsIHB1YmxpYyBsYW5nPzogc3RyaW5nLCBwdWJsaWMgZGF0YXR5cGU/OiBzdHJpbmcpIHtcbiAgICAgIGlmIChkYXRhdHlwZSkgc3dpdGNoIChkYXRhdHlwZSkge1xuICAgICAgICBjYXNlICdodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYSNpbnRlZ2VyJzpcbiAgICAgICAgY2FzZSAnaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEjZGVjaW1hbCc6XG4gICAgICAgIGNhc2UgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDEvWE1MU2NoZW1hI2RvdWJsZSc6XG4gICAgICAgIGNhc2UgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDEvWE1MU2NoZW1hI2Jvb2xlYW4nOiB0aGlzLmlkID0gdmFsdWU7IGJyZWFrXG4gICAgICAgIGNhc2UgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDEvWE1MU2NoZW1hI3N0cmluZyc6IHRoaXMuaWQgPSAnXCInICsgdmFsdWUgKyAnXCInOyBicmVha1xuICAgICAgICBkZWZhdWx0OiB0aGlzLmlkID0gJ1wiJyArIHZhbHVlICsgJ1wiXl48JyArIGRhdGF0eXBlICsgJz4nOyBicmVha1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAobGFuZykgdGhpcy5pZCA9ICdcIicgKyB2YWx1ZSArICdcIkAnICsgbGFuZ1xuICAgICAgZWxzZSB0aGlzLmlkID0gJ1wiJyArIHZhbHVlICsgJ1wiJ1xuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgSVNvdXJjZWROb2RlIGV4dGVuZHMgSU5vZGUge1xuICAgIHNvdXJjZUVuZHBvaW50czogc3RyaW5nW11cbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgSU5vZGVQbHVzTGFiZWwgZXh0ZW5kcyBJTm9kZSB7XG4gICAgbGFiZWw6IElOb2RlXG4gIH1cblxuICBleHBvcnQgY2xhc3MgTm9kZVBsdXNMYWJlbCBleHRlbmRzIE5vZGVOb2RlIGltcGxlbWVudHMgSU5vZGVQbHVzTGFiZWwge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBub2RlOiBJTm9kZSwgcHVibGljIGxhYmVsPzogSU5vZGUpIHtcbiAgICAgIHN1cGVyKG5vZGUpXG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIFByb3BlcnR5VG9WYWx1ZXMgZXh0ZW5kcyBOb2RlUGx1c0xhYmVsIHtcbiAgICBwdWJsaWMgdmFsdWVzOiAoSU5vZGV8Tm9kZVBsdXNMYWJlbClbXSA9IFtdXG4gICAgY29uc3RydWN0b3IocHJvcGVydHk6IElOb2RlKSB7XG4gICAgICBzdXBlcihwcm9wZXJ0eSlcbiAgICB9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgSXRlbSBleHRlbmRzIE5vZGVQbHVzTGFiZWwge1xuICAgIHB1YmxpYyBwcm9wZXJ0aWVzOiBQcm9wZXJ0eVRvVmFsdWVzW10gPSBbXVxuICAgIHB1YmxpYyBpbnZlcnNlUHJvcGVydGllczogUHJvcGVydHlUb1ZhbHVlc1tdID0gW11cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBUcmlwbGUge1xuICAgIGNvbnN0cnVjdG9yIChcbiAgICAgIHB1YmxpYyBzdWJqZWN0OiBJTm9kZSxcbiAgICAgIHB1YmxpYyBwcm9wZXJ0eTogSU5vZGUsXG4gICAgICBwdWJsaWMgb2JqZWN0OiBJTm9kZVxuICAgICkge31cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBRdWFkIGV4dGVuZHMgVHJpcGxlIHtcbiAgICBjb25zdHJ1Y3RvciAoXG4gICAgICBzdWJqZWN0OiBJTm9kZSxcbiAgICAgIHByb3BlcnR5OiBJTm9kZSxcbiAgICAgIG9iamVjdDogSU5vZGUsXG4gICAgICBwdWJsaWMgZ3JhcGg6IElOb2RlXG4gICAgKSB7IHN1cGVyKHN1YmplY3QsIHByb3BlcnR5LCBvYmplY3QpIH1cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBHcmFwaCB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgZ3JhcGg/OiBJTm9kZSxcbiAgICAgIHB1YmxpYyB0cmlwbGVzOiBUcmlwbGVbXSA9IFtdXG4gICAgKSB7fVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIFNLT1Mge1xuICAgIHB1YmxpYyBzdGF0aWMgbnM6IHN0cmluZyA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDA0LzAyL3Nrb3MvY29yZSMnXG4gICAgcHVibGljIHN0YXRpYyBwcmVmTGFiZWw6IElSSSA9IG5ldyBJUkkoU0tPUy5ucyArICdwcmVmTGFiZWwnKVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIE9XTCB7XG4gICAgcHVibGljIHN0YXRpYyBuczogc3RyaW5nID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDIvMDcvb3dsIydcbiAgICBwdWJsaWMgc3RhdGljIHNhbWVBczogSVJJID0gbmV3IElSSShPV0wubnMgKyAnc2FtZUFzJylcbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBSREYge1xuICAgIHB1YmxpYyBzdGF0aWMgbnM6IHN0cmluZyA9ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjJ1xuICAgIHB1YmxpYyBzdGF0aWMgdHlwZTogSVJJID0gbmV3IElSSShSREYubnMgKyAndHlwZScpXG4gIH1cblxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

var fibra;
(function (fibra) {
    'use strict';
    var SparqlAutocompleteComponentController = (function () {
        function SparqlAutocompleteComponentController($q, sparqlAutocompleteService, configurationService) {
            var _this = this;
            this.$q = $q;
            this.sparqlAutocompleteService = sparqlAutocompleteService;
            this.configurationService = configurationService;
            this.error = false;
            this.by = 'datasource';
            this.onChange = function (query) {
                _this.canceller.resolve();
                _this.canceller = _this.$q.defer();
                _this.queryRunning = true;
                _this.error = false;
                if (_this.by === 'datasource')
                    _this.sparqlAutocompleteService.autocompleteByDatasource(query, _this.limit, _this.canceller.promise).then(function (resultsByDatasource) {
                        _this.results = resultsByDatasource;
                        _this.queryRunning = false;
                    }, function () {
                        _this.queryRunning = false;
                        _this.error = true;
                    });
                else
                    _this.sparqlAutocompleteService.autocompleteByGroup(query, _this.limit, _this.canceller.promise).then(function (resultsByGroup) {
                        _this.results = resultsByGroup;
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
                onSelect: '&',
                by: '@'
            };
            this.controller = SparqlAutocompleteComponentController;
            this.templateUrl = 'partials/sparql-autocomplete.html';
        }/*<auto_generate>*/SparqlAutocompleteComponent.$inject = []; SparqlAutocompleteComponent.$componentName = 'sparqlAutocomplete'/*</auto_generate>*/
        return SparqlAutocompleteComponent;
    }());/*<auto_generate>*/angular.module('fibra').component('sparqlAutocomplete',new SparqlAutocompleteComponent());/*</auto_generate>*/
    fibra.SparqlAutocompleteComponent = SparqlAutocompleteComponent;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvc3BhcnFsLWF1dG9jb21wbGV0ZS1jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBVSxLQUFLLENBcURkO0FBckRELFdBQVUsS0FBSyxFQUFDLENBQUM7SUFDZixZQUFZLENBQUE7SUFDWjtRQW9DRSwrQ0FBb0IsRUFBcUIsRUFBVSx5QkFBb0QsRUFBVSxvQkFBMEM7WUFwQzdKLGlCQXVDQztZQUhxQixPQUFFLEdBQUYsRUFBRSxDQUFtQjtZQUFVLDhCQUF5QixHQUF6Qix5QkFBeUIsQ0FBMkI7WUFBVSx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1lBaENwSixVQUFLLEdBQVksS0FBSyxDQUFBO1lBQ3RCLE9BQUUsR0FBMkIsWUFBWSxDQUFBO1lBR3pDLGFBQVEsR0FBNEIsVUFBQyxLQUFhO2dCQUN2RCxLQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFBO2dCQUN4QixLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUE7Z0JBQ2hDLEtBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFBO2dCQUN4QixLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtnQkFDbEIsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLEVBQUUsS0FBSyxZQUFZLENBQUM7b0JBQzNCLEtBQUksQ0FBQyx5QkFBeUIsQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLEVBQUUsS0FBSSxDQUFDLEtBQUssRUFBRSxLQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FDckcsVUFBQyxtQkFBMEM7d0JBQ3pDLEtBQUksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUE7d0JBQ2xDLEtBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFBO29CQUMzQixDQUFDLEVBQ0Q7d0JBQ0UsS0FBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUE7d0JBQ3pCLEtBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFBO29CQUNuQixDQUFDLENBQ0YsQ0FBQTtnQkFDSCxJQUFJO29CQUNGLEtBQUksQ0FBQyx5QkFBeUIsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsS0FBSSxDQUFDLEtBQUssRUFBRSxLQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FDaEcsVUFBQyxjQUE2Qjt3QkFDNUIsS0FBSSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUE7d0JBQzdCLEtBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFBO29CQUMzQixDQUFDLEVBQ0Q7d0JBQ0UsS0FBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUE7d0JBQ3pCLEtBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFBO29CQUNuQixDQUFDLENBQ0YsQ0FBQTtZQUNMLENBQUMsQ0FBQTtZQUVDLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFBO1FBQzdCLENBQUM7UUFDSCw0Q0FBQztJQUFELENBdkNBLEFBdUNDLElBQUE7SUFFRDtRQUFBO1lBQ1csYUFBUSxHQUEyQjtnQkFDeEMsV0FBVyxFQUFFLEdBQUc7Z0JBQ2hCLEtBQUssRUFBRSxHQUFHO2dCQUNWLFFBQVEsRUFBRSxHQUFHO2dCQUNiLEVBQUUsRUFBRSxHQUFHO2FBQ1IsQ0FBQTtZQUNNLGVBQVUsR0FBYSxxQ0FBcUMsQ0FBQTtZQUM1RCxnQkFBVyxHQUFXLG1DQUFtQyxDQUFBO1FBQ3BFLENBQUM7UUFBRCxrQ0FBQztJQUFELENBVEEsQUFTQyxJQUFBO0lBVFksaUNBQTJCLDhCQVN2QyxDQUFBO0FBQ0gsQ0FBQyxFQXJEUyxLQUFLLEtBQUwsS0FBSyxRQXFEZCIsImZpbGUiOiJzY3JpcHRzL3NwYXJxbC1hdXRvY29tcGxldGUtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIGZpYnJhIHtcbiAgJ3VzZSBzdHJpY3QnXG4gIGNsYXNzIFNwYXJxbEF1dG9jb21wbGV0ZUNvbXBvbmVudENvbnRyb2xsZXIge1xuICAgIHB1YmxpYyBsaW1pdDogbnVtYmVyXG4gICAgcHVibGljIHF1ZXJ5UnVubmluZzogYm9vbGVhblxuICAgIHB1YmxpYyBvblNlbGVjdDogKHNlbGVjdGlvbjogUmVzdWx0KSA9PiB2b2lkXG4gICAgcHVibGljIGVycm9yOiBib29sZWFuID0gZmFsc2VcbiAgICBwdWJsaWMgYnk6ICdkYXRhc291cmNlJyB8ICdncm91cCcgPSAnZGF0YXNvdXJjZSdcbiAgICBwcml2YXRlIHJlc3VsdHM6IChSZXN1bHRzQnlEYXRhc291cmNlfFJlc3VsdEdyb3VwKVtdXG4gICAgcHJpdmF0ZSBjYW5jZWxsZXI6IGFuZ3VsYXIuSURlZmVycmVkPGFueT5cbiAgICBwdWJsaWMgb25DaGFuZ2U6IChxdWVyeTogc3RyaW5nKSA9PiB2b2lkID0gKHF1ZXJ5OiBzdHJpbmcpID0+IHtcbiAgICAgIHRoaXMuY2FuY2VsbGVyLnJlc29sdmUoKVxuICAgICAgdGhpcy5jYW5jZWxsZXIgPSB0aGlzLiRxLmRlZmVyKClcbiAgICAgIHRoaXMucXVlcnlSdW5uaW5nID0gdHJ1ZVxuICAgICAgdGhpcy5lcnJvciA9IGZhbHNlXG4gICAgICBpZiAodGhpcy5ieSA9PT0gJ2RhdGFzb3VyY2UnKVxuICAgICAgICB0aGlzLnNwYXJxbEF1dG9jb21wbGV0ZVNlcnZpY2UuYXV0b2NvbXBsZXRlQnlEYXRhc291cmNlKHF1ZXJ5LCB0aGlzLmxpbWl0LCB0aGlzLmNhbmNlbGxlci5wcm9taXNlKS50aGVuKFxuICAgICAgICAgIChyZXN1bHRzQnlEYXRhc291cmNlOiBSZXN1bHRzQnlEYXRhc291cmNlW10pID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVzdWx0cyA9IHJlc3VsdHNCeURhdGFzb3VyY2VcbiAgICAgICAgICAgIHRoaXMucXVlcnlSdW5uaW5nID0gZmFsc2VcbiAgICAgICAgICB9LFxuICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucXVlcnlSdW5uaW5nID0gZmFsc2VcbiAgICAgICAgICAgIHRoaXMuZXJyb3IgPSB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICApXG4gICAgICBlbHNlXG4gICAgICAgIHRoaXMuc3BhcnFsQXV0b2NvbXBsZXRlU2VydmljZS5hdXRvY29tcGxldGVCeUdyb3VwKHF1ZXJ5LCB0aGlzLmxpbWl0LCB0aGlzLmNhbmNlbGxlci5wcm9taXNlKS50aGVuKFxuICAgICAgICAgIChyZXN1bHRzQnlHcm91cDogUmVzdWx0R3JvdXBbXSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZXN1bHRzID0gcmVzdWx0c0J5R3JvdXBcbiAgICAgICAgICAgIHRoaXMucXVlcnlSdW5uaW5nID0gZmFsc2VcbiAgICAgICAgICB9LFxuICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucXVlcnlSdW5uaW5nID0gZmFsc2VcbiAgICAgICAgICAgIHRoaXMuZXJyb3IgPSB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICApXG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHE6IGFuZ3VsYXIuSVFTZXJ2aWNlLCBwcml2YXRlIHNwYXJxbEF1dG9jb21wbGV0ZVNlcnZpY2U6IFNwYXJxbEF1dG9jb21wbGV0ZVNlcnZpY2UsIHByaXZhdGUgY29uZmlndXJhdGlvblNlcnZpY2U6IENvbmZpZ3VyYXRpb25TZXJ2aWNlKSB7XG4gICAgICB0aGlzLmNhbmNlbGxlciA9ICRxLmRlZmVyKClcbiAgICB9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgU3BhcnFsQXV0b2NvbXBsZXRlQ29tcG9uZW50IGltcGxlbWVudHMgYW5ndWxhci5JQ29tcG9uZW50T3B0aW9ucyB7XG4gICAgICBwdWJsaWMgYmluZGluZ3M6IHtbaWQ6IHN0cmluZ106IHN0cmluZ30gPSB7XG4gICAgICAgIGNvbnN0cmFpbnRzOiAnPCcsXG4gICAgICAgIGxpbWl0OiAnQCcsXG4gICAgICAgIG9uU2VsZWN0OiAnJicsXG4gICAgICAgIGJ5OiAnQCdcbiAgICAgIH1cbiAgICAgIHB1YmxpYyBjb250cm9sbGVyOiBGdW5jdGlvbiA9IFNwYXJxbEF1dG9jb21wbGV0ZUNvbXBvbmVudENvbnRyb2xsZXJcbiAgICAgIHB1YmxpYyB0ZW1wbGF0ZVVybDogc3RyaW5nID0gJ3BhcnRpYWxzL3NwYXJxbC1hdXRvY29tcGxldGUuaHRtbCdcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

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
        function Result(id, resultGroup, datasource, matchedLabel, prefLabel) {
            this.resultGroup = resultGroup;
            this.matchedLabel = matchedLabel;
            this.prefLabel = prefLabel;
            this.ids = [];
            this.datasources = [];
            this.additionalInformation = {};
            this.ids.push(id);
            this.datasources.push(datasource);
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
        SparqlAutocompleteService.prototype.autocompleteByDatasource = function (query, limit, canceller) {
            return this.workerService.call('sparqlAutocompleteWorkerService', 'autocompleteByDatasource', [query, limit], canceller);
        };
        SparqlAutocompleteService.prototype.autocompleteByGroup = function (query, limit, canceller) {
            return this.workerService.call('sparqlAutocompleteWorkerService', 'autocompleteByGroup', [query, limit], canceller);
        };
        SparqlAutocompleteService.queryTemplate = "\nPREFIX text: <http://jena.apache.org/text#>\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\nPREFIX skos: <http://www.w3.org/2004/02/skos/core#>\nPREFIX owl: <http://www.w3.org/2002/07/owl#>\nPREFIX sf: <http://ldf.fi/functions#>\nSELECT ?groupId ?groupLabel ?id ?matchedLabel ?prefLabel ?altLabel ?type ?typeLabel ?sameAs ?ifpWikipediaPage ?ifpODBNId {\n  {\n    SELECT ?groupId ?id (SAMPLE(?matchedLabelS) AS ?matchedLabel) {\n      {\n        SELECT ?groupId ?id (SUM(?sc) AS ?score) {\n          {\n            SELECT ?groupId ?id ?sc {\n              BIND(CONCAT(REPLACE(<QUERY>,\"([\\\\+\\\\-\\\\&\\\\|\\\\!\\\\(\\\\)\\\\{\\\\}\\\\[\\\\]\\\\^\\\\\\\"\\\\~\\\\*\\\\?\\\\:\\\\/\\\\\\\\])\",\"\\\\$1\"),\"*\") AS ?query)\n              (?id ?sc) text:query ?query .\n              ?id a ?groupId .\n              # CONSTRAINTS\n            } LIMIT <LIMIT>\n          } UNION {\n            BIND(CONCAT(\"\\\"\",REPLACE(<QUERY>,\"([\\\\+\\\\-\\\\&\\\\|\\\\!\\\\(\\\\)\\\\{\\\\}\\\\[\\\\]\\\\^\\\\\\\"\\\\~\\\\*\\\\?\\\\:\\\\/\\\\\\\\])\",\"\\\\$1\"),\"\\\"\") AS ?query)\n            (?id ?sc) text:query ?query .\n            ?id a ?groupId .\n            # CONSTRAINTS\n          }\n        }\n        GROUP BY ?groupId ?id\n      }\n      FILTER (?id!=<http://ldf.fi/schoenberg/actor_>) # SCHOENBERG BUG\n      ?id skos:prefLabel|rdfs:label|skos:altLabel ?matchedLabelS\n      FILTER (REGEX(LCASE(?matchedLabelS),CONCAT(\"\\\\b\",LCASE(<QUERY>))))\n    }\n    GROUP BY ?groupId ?id ?score\n    HAVING(BOUND(?id))\n    ORDER BY DESC(?score)\n  }\n  ?groupId sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?groupLabel) .\n  ?id sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?prefLabel) .\n  BIND(?groupId AS ?type)\n  BIND(?groupLabel AS ?typeLabel)\n  OPTIONAL {\n    ?id skos:altLabel ?altLabel .\n  }\n  OPTIONAL {\n    ?id owl:sameAs ?sameAs .\n  }\n  OPTIONAL {\n    {\n      ?id <http://emlo.bodleian.ox.ac.uk/schema#cofk_union_relationship_type-is_related_to> ?ref .\n      FILTER(REGEX(STR(?ref),'http://..\\\\.wikipedia\\\\.org/wiki/'))\n      BIND(?ref AS ?ifpWikipediaPage)\n    } UNION {\n      ?id <http://emlo.bodleian.ox.ac.uk/schema#cofk_union_relationship_type-is_related_to> ?ref .\n      FILTER(STRSTARTS(STR(?ref),'http://www.oxforddnb.com/view/article/'))\n      BIND(REPLACE(STR(?ref),'http://www.oxforddnb.com/view/article/([^?]*).*','$1') AS ?ifpODBNId)\n    } UNION {\n      ?id <http://ldf.fi/procope-schema#wikipediaUrl> ?ref .\n      BIND(IRI(?ref) AS ?ifpWikipediaPage)\n    } UNION {\n      ?id <http://ldf.fi/sdfb/schema#odbnId> ?ifpODBNId .\n    }\n  }\n}\n";
        return SparqlAutocompleteService;
    }());/*<auto_generate>*/angular.module('fibra').service('sparqlAutocompleteService',SparqlAutocompleteService);/*</auto_generate>*/
    fibra.SparqlAutocompleteService = SparqlAutocompleteService;
    var SparqlAutocompleteWorkerService = (function () {
        function SparqlAutocompleteWorkerService($q, sparqlService, configurationWorkerService) {
            this.$q = $q;
            this.sparqlService = sparqlService;
            this.configurationWorkerService = configurationWorkerService;
        }/*<auto_generate>*/SparqlAutocompleteWorkerService.$inject = ['$q','sparqlService','configurationWorkerService']; SparqlAutocompleteWorkerService.$componentName = 'sparqlAutocompleteWorkerService'/*</auto_generate>*/
        SparqlAutocompleteWorkerService.prototype.autocompleteByDatasource = function (query, limit, canceller) {
            var _this = this;
            var configurations = this.configurationWorkerService.configurations.map(function (c) { return c.autocompletionConfiguration; });
            return this.$q.all(this.query(query, limit, configurations).map(function (promise, index) { return promise.then(function (response) {
                var ds = new ResultsByDatasource(configurations[index]);
                var groupToResults = _this.processResults(response, configurations[index]);
                for (var groupId in groupToResults)
                    ds.resultsByGroup.push(groupToResults[groupId]);
                return ds;
            }); }));
        };
        SparqlAutocompleteWorkerService.prototype.autocompleteByGroup = function (query, limit, canceller) {
            var _this = this;
            var configurations = this.configurationWorkerService.configurations.map(function (c) { return c.autocompletionConfiguration; });
            var groupToResults = {};
            var idToResult = {};
            var idToDatasource = {};
            var idToAdditionalInformation = {};
            var ifpToId = {};
            return this.$q.all(this.query(query, limit, configurations).map(function (promise, index) { return promise.then(function (response) {
                return _this.processResults(response, configurations[index], groupToResults, idToResult, ifpToId, idToDatasource, idToAdditionalInformation);
            }); })).then(function () {
                var ret = [];
                for (var groupId in groupToResults)
                    ret.push(groupToResults[groupId]);
                return ret;
            });
        };
        SparqlAutocompleteWorkerService.prototype.processResults = function (response, configuration, groupToResults, idToResult, ifpToId, idToDatasource, idToAdditionalInformation) {
            if (groupToResults === void 0) { groupToResults = {}; }
            if (idToResult === void 0) { idToResult = {}; }
            if (ifpToId === void 0) { ifpToId = {}; }
            if (idToDatasource === void 0) { idToDatasource = {}; }
            if (idToAdditionalInformation === void 0) { idToAdditionalInformation = {}; }
            var additionalInformationVars = response.data.head.vars.filter(function (varName) { return !SparqlAutocompleteWorkerService.defaultVars[varName] && varName.indexOf('ifp') !== 0; });
            var ifpVars = response.data.head.vars.filter(function (varName) { return varName.indexOf('ifp') === 0; });
            response.data.results.bindings.forEach(function (binding) {
                var rg = fibra.goc(groupToResults, binding['groupId'].value, function () { return new ResultGroup(binding['groupLabel'].value); });
                var resultNode = new fibra.SparqlBindingNode(binding['id']);
                var result = idToResult[resultNode.id];
                // FIXME refactor into something sensible. This even still does not guarantee unique results
                if (!result && binding['sameAs'])
                    result = idToResult[new fibra.SparqlBindingNode(binding['sameAs']).id];
                if (!result)
                    ifpVars.forEach(function (ifpVar) {
                        if (binding[ifpVar])
                            result = idToResult[fibra.goc(ifpToId, ifpVar)[new fibra.SparqlBindingNode(binding[ifpVar]).id]];
                    });
                if (!result) {
                    result = new Result(resultNode, rg, configuration, new fibra.SparqlBindingNode(binding['matchedLabel']), new fibra.SparqlBindingNode(binding['prefLabel']));
                    rg.results.push(result);
                    idToDatasource[resultNode.id] = {};
                    idToDatasource[resultNode.id][result.datasources[0].id] = configuration;
                    idToResult[resultNode.id] = result;
                }
                else
                    fibra.cpush(result.datasources, fibra.goc(idToDatasource, resultNode.id), configuration.id, configuration);
                if (binding['sameAs']) {
                    var otherNode = new fibra.SparqlBindingNode(binding['sameAs']);
                    if (!idToResult[otherNode.id]) {
                        idToResult[otherNode.id] = result;
                        result.ids.push(otherNode);
                    }
                    else {
                        var otherResult_1 = idToResult[otherNode.id];
                        if (otherResult_1 !== result) {
                            otherResult_1.ids.forEach(function (otherNode) {
                                otherResult_1.datasources.forEach(function (dconfiguration) {
                                    return fibra.cpush(result.datasources, fibra.goc(idToDatasource, resultNode.id), dconfiguration.id, dconfiguration);
                                });
                                var _loop_1 = function(varName) {
                                    otherResult_1.additionalInformation[varName].forEach(function (ai) {
                                        return fibra.cpush(fibra.goc(result.additionalInformation, varName, function () { return []; }), fibra.goc(fibra.goc(idToAdditionalInformation, resultNode.id), varName), ai.id, ai);
                                    });
                                };
                                for (var varName in otherResult_1.additionalInformation) {
                                    _loop_1(varName);
                                }
                                result.ids.push(otherNode);
                                idToResult[otherNode.id] = result;
                            });
                            idToResult[otherNode.id] = result;
                        }
                    }
                }
                ifpVars.forEach(function (ifpVar) {
                    if (binding[ifpVar]) {
                        var ifp = new fibra.SparqlBindingNode(binding[ifpVar]);
                        if (!fibra.goc(ifpToId, ifpVar)[ifp.id]) {
                            ifpToId[ifpVar][ifp.id] = resultNode.id;
                        }
                        else {
                            var otherResult_2 = idToResult[ifpToId[ifpVar][ifp.id]];
                            if (otherResult_2 !== result) {
                                otherResult_2.ids.forEach(function (otherNode) {
                                    otherResult_2.datasources.forEach(function (dconfiguration) {
                                        return fibra.cpush(result.datasources, fibra.goc(idToDatasource, resultNode.id), dconfiguration.id, dconfiguration);
                                    });
                                    var _loop_2 = function(varName) {
                                        otherResult_2.additionalInformation[varName].forEach(function (ai) {
                                            return fibra.cpush(fibra.goc(result.additionalInformation, varName, function () { return []; }), fibra.goc(fibra.goc(idToAdditionalInformation, resultNode.id), varName), ai.id, ai);
                                        });
                                    };
                                    for (var varName in otherResult_2.additionalInformation) {
                                        _loop_2(varName);
                                    }
                                    result.ids.push(otherNode);
                                    idToResult[otherNode.id] = result;
                                });
                                ifpToId[ifpVar][ifp.id] = resultNode.id;
                            }
                        }
                    }
                });
                additionalInformationVars.forEach(function (varName) {
                    if (binding[varName]) {
                        var ai = new fibra.SparqlBindingNode(binding[varName]);
                        fibra.cpush(fibra.goc(result.additionalInformation, varName, function () { return []; }), fibra.goc(fibra.goc(idToAdditionalInformation, resultNode.id), varName), ai.id, ai);
                    }
                });
            });
            return groupToResults;
        };
        SparqlAutocompleteWorkerService.prototype.query = function (query, limit, configurations, canceller) {
            var _this = this;
            return configurations.map(function (configuration) {
                var queryTemplate = configuration.queryTemplate;
                queryTemplate = queryTemplate.replace(/<QUERY>/g, s.SparqlService.stringToSPARQLString(query));
                queryTemplate = queryTemplate.replace(/# CONSTRAINTS/g, configuration.constraints);
                queryTemplate = queryTemplate.replace(/<LIMIT>/g, '' + limit);
                return _this.sparqlService.query(configuration.endpoint, queryTemplate, { timeout: canceller });
            });
        };
        SparqlAutocompleteWorkerService.defaultVars = {
            'id': true, 'prefLabel': true, 'matchedLabel': true, 'groupId': true, 'groupLabel': true, 'sameAs': true
        };
        return SparqlAutocompleteWorkerService;
    }());/*<auto_generate>*/angular.module('fibra').service('sparqlAutocompleteWorkerService',SparqlAutocompleteWorkerService);/*</auto_generate>*/
    fibra.SparqlAutocompleteWorkerService = SparqlAutocompleteWorkerService;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvc3BhcnFsLWF1dG9jb21wbGV0ZS1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQVUsS0FBSyxDQTZQZDtBQTdQRCxXQUFVLEtBQUssRUFBQyxDQUFDO0lBQ2YsWUFBWSxDQUFBO0lBRVosSUFBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUE7SUFFekI7UUFFRSw2QkFBbUIsYUFBZ0Q7WUFBaEQsa0JBQWEsR0FBYixhQUFhLENBQW1DO1lBRDVELG1CQUFjLEdBQWtCLEVBQUUsQ0FBQTtRQUM2QixDQUFDO1FBQ3pFLDBCQUFDO0lBQUQsQ0FIQSxBQUdDLElBQUE7SUFIWSx5QkFBbUIsc0JBRy9CLENBQUE7SUFFRDtRQUVFLHFCQUFtQixLQUFhO1lBQWIsVUFBSyxHQUFMLEtBQUssQ0FBUTtZQUR6QixZQUFPLEdBQWEsRUFBRSxDQUFBO1FBQ00sQ0FBQztRQUN0QyxrQkFBQztJQUFELENBSEEsQUFHQyxJQUFBO0lBSFksaUJBQVcsY0FHdkIsQ0FBQTtJQUVEO1FBSUUsZ0JBQVksRUFBUyxFQUFTLFdBQXdCLEVBQUUsVUFBNkMsRUFBUyxZQUFtQixFQUFTLFNBQWdCO1lBQTVILGdCQUFXLEdBQVgsV0FBVyxDQUFhO1lBQXdELGlCQUFZLEdBQVosWUFBWSxDQUFPO1lBQVMsY0FBUyxHQUFULFNBQVMsQ0FBTztZQUhuSixRQUFHLEdBQVksRUFBRSxDQUFBO1lBQ2pCLGdCQUFXLEdBQXdDLEVBQUUsQ0FBQTtZQUNyRCwwQkFBcUIsR0FBaUMsRUFBRSxDQUFBO1lBRTdELElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBQ2pCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQ25DLENBQUM7UUFDSCxhQUFDO0lBQUQsQ0FSQSxBQVFDLElBQUE7SUFSWSxZQUFNLFNBUWxCLENBQUE7SUFFRDtRQUlFLDJDQUNTLEVBQVUsRUFD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QUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUk7U0FDekcsQ0FBQTtRQXNJSCxzQ0FBQztJQUFELENBMUlBLEFBMElDLElBQUE7SUExSVkscUNBQStCLGtDQTBJM0MsQ0FBQTtBQUVILENBQUMsRUE3UFMsS0FBSyxLQUFMLEtBQUssUUE2UGQiLCJmaWxlIjoic2NyaXB0cy9zcGFycWwtYXV0b2NvbXBsZXRlLXNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgZmlicmEge1xuICAndXNlIHN0cmljdCdcblxuICBpbXBvcnQgcyA9IGZpLnNlY28uc3BhcnFsXG5cbiAgZXhwb3J0IGNsYXNzIFJlc3VsdHNCeURhdGFzb3VyY2Uge1xuICAgIHB1YmxpYyByZXN1bHRzQnlHcm91cDogUmVzdWx0R3JvdXBbXSA9IFtdXG4gICAgY29uc3RydWN0b3IocHVibGljIGNvbmZpZ3VyYXRpb246IFNwYXJxbEF1dG9jb21wbGV0aW9uQ29uZmlndXJhdGlvbikge31cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBSZXN1bHRHcm91cCB7XG4gICAgcHVibGljIHJlc3VsdHM6IFJlc3VsdFtdID0gW11cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbGFiZWw6IHN0cmluZykge31cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBSZXN1bHQge1xuICAgIHB1YmxpYyBpZHM6IElOb2RlW10gPSBbXVxuICAgIHB1YmxpYyBkYXRhc291cmNlczogU3BhcnFsQXV0b2NvbXBsZXRpb25Db25maWd1cmF0aW9uW10gPSBbXVxuICAgIHB1YmxpYyBhZGRpdGlvbmFsSW5mb3JtYXRpb246IHtbdmFyTmFtZTogc3RyaW5nXTogSU5vZGVbXX0gPSB7fVxuICAgIGNvbnN0cnVjdG9yKGlkOiBJTm9kZSwgcHVibGljIHJlc3VsdEdyb3VwOiBSZXN1bHRHcm91cCwgZGF0YXNvdXJjZTogU3BhcnFsQXV0b2NvbXBsZXRpb25Db25maWd1cmF0aW9uLCBwdWJsaWMgbWF0Y2hlZExhYmVsOiBJTm9kZSwgcHVibGljIHByZWZMYWJlbDogSU5vZGUpIHtcbiAgICAgIHRoaXMuaWRzLnB1c2goaWQpXG4gICAgICB0aGlzLmRhdGFzb3VyY2VzLnB1c2goZGF0YXNvdXJjZSlcbiAgICB9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgU3BhcnFsQXV0b2NvbXBsZXRpb25Db25maWd1cmF0aW9uIHtcblxuICAgIHB1YmxpYyBjb25zdHJhaW50czogc3RyaW5nID0gJydcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIGlkOiBzdHJpbmcsXG4gICAgICBwdWJsaWMgdGl0bGU6IHN0cmluZyxcbiAgICAgIHB1YmxpYyBlbmRwb2ludDogc3RyaW5nLFxuICAgICAgcHVibGljIHF1ZXJ5VGVtcGxhdGU6IHN0cmluZ1xuICAgICkge31cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBTcGFycWxBdXRvY29tcGxldGVTZXJ2aWNlIHtcblxuICAgIHB1YmxpYyBzdGF0aWMgcXVlcnlUZW1wbGF0ZTogc3RyaW5nID0gYFxuUFJFRklYIHRleHQ6IDxodHRwOi8vamVuYS5hcGFjaGUub3JnL3RleHQjPlxuUFJFRklYIHJkZnM6IDxodHRwOi8vd3d3LnczLm9yZy8yMDAwLzAxL3JkZi1zY2hlbWEjPlxuUFJFRklYIHNrb3M6IDxodHRwOi8vd3d3LnczLm9yZy8yMDA0LzAyL3Nrb3MvY29yZSM+XG5QUkVGSVggb3dsOiA8aHR0cDovL3d3dy53My5vcmcvMjAwMi8wNy9vd2wjPlxuUFJFRklYIHNmOiA8aHR0cDovL2xkZi5maS9mdW5jdGlvbnMjPlxuU0VMRUNUID9ncm91cElkID9ncm91cExhYmVsID9pZCA/bWF0Y2hlZExhYmVsID9wcmVmTGFiZWwgP2FsdExhYmVsID90eXBlID90eXBlTGFiZWwgP3NhbWVBcyA/aWZwV2lraXBlZGlhUGFnZSA/aWZwT0RCTklkIHtcbiAge1xuICAgIFNFTEVDVCA/Z3JvdXBJZCA/aWQgKFNBTVBMRSg/bWF0Y2hlZExhYmVsUykgQVMgP21hdGNoZWRMYWJlbCkge1xuICAgICAge1xuICAgICAgICBTRUxFQ1QgP2dyb3VwSWQgP2lkIChTVU0oP3NjKSBBUyA/c2NvcmUpIHtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBTRUxFQ1QgP2dyb3VwSWQgP2lkID9zYyB7XG4gICAgICAgICAgICAgIEJJTkQoQ09OQ0FUKFJFUExBQ0UoPFFVRVJZPixcIihbXFxcXFxcXFwrXFxcXFxcXFwtXFxcXFxcXFwmXFxcXFxcXFx8XFxcXFxcXFwhXFxcXFxcXFwoXFxcXFxcXFwpXFxcXFxcXFx7XFxcXFxcXFx9XFxcXFxcXFxbXFxcXFxcXFxdXFxcXFxcXFxeXFxcXFxcXFxcXFxcXCJcXFxcXFxcXH5cXFxcXFxcXCpcXFxcXFxcXD9cXFxcXFxcXDpcXFxcXFxcXC9cXFxcXFxcXFxcXFxcXFxcXSlcIixcIlxcXFxcXFxcJDFcIiksXCIqXCIpIEFTID9xdWVyeSlcbiAgICAgICAgICAgICAgKD9pZCA/c2MpIHRleHQ6cXVlcnkgP3F1ZXJ5IC5cbiAgICAgICAgICAgICAgP2lkIGEgP2dyb3VwSWQgLlxuICAgICAgICAgICAgICAjIENPTlNUUkFJTlRTXG4gICAgICAgICAgICB9IExJTUlUIDxMSU1JVD5cbiAgICAgICAgICB9IFVOSU9OIHtcbiAgICAgICAgICAgIEJJTkQoQ09OQ0FUKFwiXFxcXFwiXCIsUkVQTEFDRSg8UVVFUlk+LFwiKFtcXFxcXFxcXCtcXFxcXFxcXC1cXFxcXFxcXCZcXFxcXFxcXHxcXFxcXFxcXCFcXFxcXFxcXChcXFxcXFxcXClcXFxcXFxcXHtcXFxcXFxcXH1cXFxcXFxcXFtcXFxcXFxcXF1cXFxcXFxcXF5cXFxcXFxcXFxcXFxcIlxcXFxcXFxcflxcXFxcXFxcKlxcXFxcXFxcP1xcXFxcXFxcOlxcXFxcXFxcL1xcXFxcXFxcXFxcXFxcXFxdKVwiLFwiXFxcXFxcXFwkMVwiKSxcIlxcXFxcIlwiKSBBUyA/cXVlcnkpXG4gICAgICAgICAgICAoP2lkID9zYykgdGV4dDpxdWVyeSA/cXVlcnkgLlxuICAgICAgICAgICAgP2lkIGEgP2dyb3VwSWQgLlxuICAgICAgICAgICAgIyBDT05TVFJBSU5UU1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBHUk9VUCBCWSA/Z3JvdXBJZCA/aWRcbiAgICAgIH1cbiAgICAgIEZJTFRFUiAoP2lkIT08aHR0cDovL2xkZi5maS9zY2hvZW5iZXJnL2FjdG9yXz4pICMgU0NIT0VOQkVSRyBCVUdcbiAgICAgID9pZCBza29zOnByZWZMYWJlbHxyZGZzOmxhYmVsfHNrb3M6YWx0TGFiZWwgP21hdGNoZWRMYWJlbFNcbiAgICAgIEZJTFRFUiAoUkVHRVgoTENBU0UoP21hdGNoZWRMYWJlbFMpLENPTkNBVChcIlxcXFxcXFxcYlwiLExDQVNFKDxRVUVSWT4pKSkpXG4gICAgfVxuICAgIEdST1VQIEJZID9ncm91cElkID9pZCA/c2NvcmVcbiAgICBIQVZJTkcoQk9VTkQoP2lkKSlcbiAgICBPUkRFUiBCWSBERVNDKD9zY29yZSlcbiAgfVxuICA/Z3JvdXBJZCBzZjpwcmVmZXJyZWRMYW5ndWFnZUxpdGVyYWwgKHNrb3M6cHJlZkxhYmVsIHJkZnM6bGFiZWwgc2tvczphbHRMYWJlbCAnZW4nICcnID9ncm91cExhYmVsKSAuXG4gID9pZCBzZjpwcmVmZXJyZWRMYW5ndWFnZUxpdGVyYWwgKHNrb3M6cHJlZkxhYmVsIHJkZnM6bGFiZWwgc2tvczphbHRMYWJlbCAnZW4nICcnID9wcmVmTGFiZWwpIC5cbiAgQklORCg/Z3JvdXBJZCBBUyA/dHlwZSlcbiAgQklORCg/Z3JvdXBMYWJlbCBBUyA/dHlwZUxhYmVsKVxuICBPUFRJT05BTCB7XG4gICAgP2lkIHNrb3M6YWx0TGFiZWwgP2FsdExhYmVsIC5cbiAgfVxuICBPUFRJT05BTCB7XG4gICAgP2lkIG93bDpzYW1lQXMgP3NhbWVBcyAuXG4gIH1cbiAgT1BUSU9OQUwge1xuICAgIHtcbiAgICAgID9pZCA8aHR0cDovL2VtbG8uYm9kbGVpYW4ub3guYWMudWsvc2NoZW1hI2NvZmtfdW5pb25fcmVsYXRpb25zaGlwX3R5cGUtaXNfcmVsYXRlZF90bz4gP3JlZiAuXG4gICAgICBGSUxURVIoUkVHRVgoU1RSKD9yZWYpLCdodHRwOi8vLi5cXFxcXFxcXC53aWtpcGVkaWFcXFxcXFxcXC5vcmcvd2lraS8nKSlcbiAgICAgIEJJTkQoP3JlZiBBUyA/aWZwV2lraXBlZGlhUGFnZSlcbiAgICB9IFVOSU9OIHtcbiAgICAgID9pZCA8aHR0cDovL2VtbG8uYm9kbGVpYW4ub3guYWMudWsvc2NoZW1hI2NvZmtfdW5pb25fcmVsYXRpb25zaGlwX3R5cGUtaXNfcmVsYXRlZF90bz4gP3JlZiAuXG4gICAgICBGSUxURVIoU1RSU1RBUlRTKFNUUig/cmVmKSwnaHR0cDovL3d3dy5veGZvcmRkbmIuY29tL3ZpZXcvYXJ0aWNsZS8nKSlcbiAgICAgIEJJTkQoUkVQTEFDRShTVFIoP3JlZiksJ2h0dHA6Ly93d3cub3hmb3JkZG5iLmNvbS92aWV3L2FydGljbGUvKFteP10qKS4qJywnJDEnKSBBUyA/aWZwT0RCTklkKVxuICAgIH0gVU5JT04ge1xuICAgICAgP2lkIDxodHRwOi8vbGRmLmZpL3Byb2NvcGUtc2NoZW1hI3dpa2lwZWRpYVVybD4gP3JlZiAuXG4gICAgICBCSU5EKElSSSg/cmVmKSBBUyA/aWZwV2lraXBlZGlhUGFnZSlcbiAgICB9IFVOSU9OIHtcbiAgICAgID9pZCA8aHR0cDovL2xkZi5maS9zZGZiL3NjaGVtYSNvZGJuSWQ+ID9pZnBPREJOSWQgLlxuICAgIH1cbiAgfVxufVxuYFxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB3b3JrZXJTZXJ2aWNlOiBXb3JrZXJTZXJ2aWNlKSB7fVxuICAgIHB1YmxpYyBhdXRvY29tcGxldGVCeURhdGFzb3VyY2UocXVlcnk6IHN0cmluZywgbGltaXQ6IG51bWJlciwgY2FuY2VsbGVyPzogYW5ndWxhci5JUHJvbWlzZTxhbnk+KTogYW5ndWxhci5JUHJvbWlzZTxSZXN1bHRzQnlEYXRhc291cmNlW10+IHtcbiAgICAgIHJldHVybiB0aGlzLndvcmtlclNlcnZpY2UuY2FsbCgnc3BhcnFsQXV0b2NvbXBsZXRlV29ya2VyU2VydmljZScsICdhdXRvY29tcGxldGVCeURhdGFzb3VyY2UnLCBbcXVlcnksIGxpbWl0XSwgY2FuY2VsbGVyKVxuICAgIH1cbiAgICBwdWJsaWMgYXV0b2NvbXBsZXRlQnlHcm91cChxdWVyeTogc3RyaW5nLCBsaW1pdDogbnVtYmVyLCBjYW5jZWxsZXI/OiBhbmd1bGFyLklQcm9taXNlPGFueT4pOiBhbmd1bGFyLklQcm9taXNlPFJlc3VsdEdyb3VwW10+IHtcbiAgICAgIHJldHVybiB0aGlzLndvcmtlclNlcnZpY2UuY2FsbCgnc3BhcnFsQXV0b2NvbXBsZXRlV29ya2VyU2VydmljZScsICdhdXRvY29tcGxldGVCeUdyb3VwJywgW3F1ZXJ5LCBsaW1pdF0sIGNhbmNlbGxlcilcbiAgICB9XG5cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBTcGFycWxBdXRvY29tcGxldGVXb3JrZXJTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgc3RhdGljIGRlZmF1bHRWYXJzOiB7W3Zhck5hbWU6IHN0cmluZ106IGJvb2xlYW59ID0ge1xuICAgICAgJ2lkJzogdHJ1ZSwgJ3ByZWZMYWJlbCc6IHRydWUsICdtYXRjaGVkTGFiZWwnOiB0cnVlLCAnZ3JvdXBJZCc6IHRydWUsICdncm91cExhYmVsJzogdHJ1ZSwgJ3NhbWVBcyc6IHRydWVcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRxOiBhbmd1bGFyLklRU2VydmljZSwgcHJpdmF0ZSBzcGFycWxTZXJ2aWNlOiBzLlNwYXJxbFNlcnZpY2UsIHByaXZhdGUgY29uZmlndXJhdGlvbldvcmtlclNlcnZpY2U6IENvbmZpZ3VyYXRpb25Xb3JrZXJTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgcHVibGljIGF1dG9jb21wbGV0ZUJ5RGF0YXNvdXJjZShxdWVyeTogc3RyaW5nLCBsaW1pdDogbnVtYmVyLCBjYW5jZWxsZXI/OiBhbmd1bGFyLklQcm9taXNlPGFueT4pOiBhbmd1bGFyLklQcm9taXNlPFJlc3VsdHNCeURhdGFzb3VyY2VbXT4ge1xuICAgICAgbGV0IGNvbmZpZ3VyYXRpb25zOiBTcGFycWxBdXRvY29tcGxldGlvbkNvbmZpZ3VyYXRpb25bXSA9IHRoaXMuY29uZmlndXJhdGlvbldvcmtlclNlcnZpY2UuY29uZmlndXJhdGlvbnMubWFwKGMgPT4gYy5hdXRvY29tcGxldGlvbkNvbmZpZ3VyYXRpb24pXG4gICAgICByZXR1cm4gdGhpcy4kcS5hbGwodGhpcy5xdWVyeShxdWVyeSwgbGltaXQsIGNvbmZpZ3VyYXRpb25zKS5tYXAoKHByb21pc2UsIGluZGV4KSA9PiBwcm9taXNlLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICBsZXQgZHM6IFJlc3VsdHNCeURhdGFzb3VyY2UgPSBuZXcgUmVzdWx0c0J5RGF0YXNvdXJjZShjb25maWd1cmF0aW9uc1tpbmRleF0pXG4gICAgICAgIGxldCBncm91cFRvUmVzdWx0czoge1tpZDogc3RyaW5nXTogUmVzdWx0R3JvdXB9ID0gdGhpcy5wcm9jZXNzUmVzdWx0cyhyZXNwb25zZSwgY29uZmlndXJhdGlvbnNbaW5kZXhdKVxuICAgICAgICBmb3IgKGxldCBncm91cElkIGluIGdyb3VwVG9SZXN1bHRzKSBkcy5yZXN1bHRzQnlHcm91cC5wdXNoKGdyb3VwVG9SZXN1bHRzW2dyb3VwSWRdKVxuICAgICAgICByZXR1cm4gZHNcbiAgICAgIH0pKSlcbiAgICB9XG5cbiAgICBwdWJsaWMgYXV0b2NvbXBsZXRlQnlHcm91cChxdWVyeTogc3RyaW5nLCBsaW1pdDogbnVtYmVyLCBjYW5jZWxsZXI/OiBhbmd1bGFyLklQcm9taXNlPGFueT4pOiBhbmd1bGFyLklQcm9taXNlPFJlc3VsdEdyb3VwW10+IHtcbiAgICAgIGxldCBjb25maWd1cmF0aW9uczogU3BhcnFsQXV0b2NvbXBsZXRpb25Db25maWd1cmF0aW9uW10gPSB0aGlzLmNvbmZpZ3VyYXRpb25Xb3JrZXJTZXJ2aWNlLmNvbmZpZ3VyYXRpb25zLm1hcChjID0+IGMuYXV0b2NvbXBsZXRpb25Db25maWd1cmF0aW9uKVxuICAgICAgbGV0IGdyb3VwVG9SZXN1bHRzOiB7W2lkOiBzdHJpbmddOiBSZXN1bHRHcm91cH0gPSB7fVxuICAgICAgbGV0IGlkVG9SZXN1bHQ6IHtbaWQ6IHN0cmluZ106IFJlc3VsdH0gPSB7fVxuICAgICAgbGV0IGlkVG9EYXRhc291cmNlOiB7W2lkOiBzdHJpbmddOiB7W2lkOiBzdHJpbmddOiBTcGFycWxBdXRvY29tcGxldGlvbkNvbmZpZ3VyYXRpb259fSA9IHt9XG4gICAgICBsZXQgaWRUb0FkZGl0aW9uYWxJbmZvcm1hdGlvbjoge1tpZDogc3RyaW5nXToge1t2YXJOYW1lOiBzdHJpbmddOiB7W2FpSWQ6IHN0cmluZ106IElOb2RlfX19ID0ge31cbiAgICAgIGxldCBpZnBUb0lkOiB7W3Zhck5hbWU6IHN0cmluZ106IHtbaWQ6IHN0cmluZ106IHN0cmluZ319ID0ge31cbiAgICAgIHJldHVybiB0aGlzLiRxLmFsbCh0aGlzLnF1ZXJ5KHF1ZXJ5LCBsaW1pdCwgY29uZmlndXJhdGlvbnMpLm1hcCgocHJvbWlzZSwgaW5kZXgpID0+IHByb21pc2UudGhlbihyZXNwb25zZSA9PlxuICAgICAgICB0aGlzLnByb2Nlc3NSZXN1bHRzKHJlc3BvbnNlLCBjb25maWd1cmF0aW9uc1tpbmRleF0sIGdyb3VwVG9SZXN1bHRzLCBpZFRvUmVzdWx0LCBpZnBUb0lkLCBpZFRvRGF0YXNvdXJjZSwgaWRUb0FkZGl0aW9uYWxJbmZvcm1hdGlvbilcbiAgICAgICkpKS50aGVuKCgpID0+IHtcbiAgICAgICAgbGV0IHJldDogUmVzdWx0R3JvdXBbXSA9IFtdXG4gICAgICAgIGZvciAobGV0IGdyb3VwSWQgaW4gZ3JvdXBUb1Jlc3VsdHMpIHJldC5wdXNoKGdyb3VwVG9SZXN1bHRzW2dyb3VwSWRdKVxuICAgICAgICByZXR1cm4gcmV0XG4gICAgICB9KVxuICAgIH1cblxuICAgIHByaXZhdGUgcHJvY2Vzc1Jlc3VsdHMoXG4gICAgICByZXNwb25zZTogYW5ndWxhci5JSHR0cFByb21pc2VDYWxsYmFja0FyZzxzLklTcGFycWxCaW5kaW5nUmVzdWx0PHtbaWQ6IHN0cmluZ106IHMuSVNwYXJxbEJpbmRpbmd9Pj4sXG4gICAgICBjb25maWd1cmF0aW9uOiBTcGFycWxBdXRvY29tcGxldGlvbkNvbmZpZ3VyYXRpb24sXG4gICAgICBncm91cFRvUmVzdWx0czoge1tpZDogc3RyaW5nXTogUmVzdWx0R3JvdXB9ID0ge30sXG4gICAgICBpZFRvUmVzdWx0OiB7W2lkOiBzdHJpbmddOiBSZXN1bHR9ID0ge30sXG4gICAgICBpZnBUb0lkOiB7W3Zhck5hbWU6IHN0cmluZ106IHtbaWQ6IHN0cmluZ106IHN0cmluZ319ID0ge30sXG4gICAgICBpZFRvRGF0YXNvdXJjZToge1tpZDogc3RyaW5nXToge1tpZDogc3RyaW5nXTogU3BhcnFsQXV0b2NvbXBsZXRpb25Db25maWd1cmF0aW9ufX0gPSB7fSxcbiAgICAgIGlkVG9BZGRpdGlvbmFsSW5mb3JtYXRpb246IHtbaWQ6IHN0cmluZ106IHtbdmFyTmFtZTogc3RyaW5nXToge1thaUlkOiBzdHJpbmddOiBJTm9kZX19fSA9IHt9KToge1tpZDogc3RyaW5nXTogUmVzdWx0R3JvdXB9IHtcbiAgICAgICAgbGV0IGFkZGl0aW9uYWxJbmZvcm1hdGlvblZhcnM6IHN0cmluZ1tdID0gcmVzcG9uc2UuZGF0YS5oZWFkLnZhcnMuZmlsdGVyKHZhck5hbWUgPT4gIVNwYXJxbEF1dG9jb21wbGV0ZVdvcmtlclNlcnZpY2UuZGVmYXVsdFZhcnNbdmFyTmFtZV0gJiYgdmFyTmFtZS5pbmRleE9mKCdpZnAnKSAhPT0gMClcbiAgICAgICAgbGV0IGlmcFZhcnM6IHN0cmluZ1tdID0gcmVzcG9uc2UuZGF0YS5oZWFkLnZhcnMuZmlsdGVyKHZhck5hbWUgPT4gdmFyTmFtZS5pbmRleE9mKCdpZnAnKSA9PT0gMClcbiAgICAgICAgcmVzcG9uc2UuZGF0YS5yZXN1bHRzLmJpbmRpbmdzLmZvckVhY2goYmluZGluZyA9PiB7XG4gICAgICAgICAgbGV0IHJnOiBSZXN1bHRHcm91cCA9IGdvYyhncm91cFRvUmVzdWx0cywgYmluZGluZ1snZ3JvdXBJZCddLnZhbHVlLCAoKSA9PiBuZXcgUmVzdWx0R3JvdXAoYmluZGluZ1snZ3JvdXBMYWJlbCddLnZhbHVlKSlcbiAgICAgICAgICBsZXQgcmVzdWx0Tm9kZTogSU5vZGUgPSBuZXcgU3BhcnFsQmluZGluZ05vZGUoYmluZGluZ1snaWQnXSlcbiAgICAgICAgICBsZXQgcmVzdWx0OiBSZXN1bHQgPSBpZFRvUmVzdWx0W3Jlc3VsdE5vZGUuaWRdXG4gICAgICAgICAgLy8gRklYTUUgcmVmYWN0b3IgaW50byBzb21ldGhpbmcgc2Vuc2libGUuIFRoaXMgZXZlbiBzdGlsbCBkb2VzIG5vdCBndWFyYW50ZWUgdW5pcXVlIHJlc3VsdHNcbiAgICAgICAgICBpZiAoIXJlc3VsdCAmJiBiaW5kaW5nWydzYW1lQXMnXSlcbiAgICAgICAgICAgIHJlc3VsdCA9IGlkVG9SZXN1bHRbbmV3IFNwYXJxbEJpbmRpbmdOb2RlKGJpbmRpbmdbJ3NhbWVBcyddKS5pZF1cbiAgICAgICAgICBpZiAoIXJlc3VsdCkgaWZwVmFycy5mb3JFYWNoKGlmcFZhciA9PiB7XG4gICAgICAgICAgICBpZiAoYmluZGluZ1tpZnBWYXJdKSByZXN1bHQgPSBpZFRvUmVzdWx0W2dvYyhpZnBUb0lkLCBpZnBWYXIpW25ldyBTcGFycWxCaW5kaW5nTm9kZShiaW5kaW5nW2lmcFZhcl0pLmlkXV1cbiAgICAgICAgICB9KVxuICAgICAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgICAgICByZXN1bHQgPSBuZXcgUmVzdWx0KHJlc3VsdE5vZGUsIHJnLCBjb25maWd1cmF0aW9uLCBuZXcgU3BhcnFsQmluZGluZ05vZGUoYmluZGluZ1snbWF0Y2hlZExhYmVsJ10pLCBuZXcgU3BhcnFsQmluZGluZ05vZGUoYmluZGluZ1sncHJlZkxhYmVsJ10pKVxuICAgICAgICAgICAgcmcucmVzdWx0cy5wdXNoKHJlc3VsdClcbiAgICAgICAgICAgIGlkVG9EYXRhc291cmNlW3Jlc3VsdE5vZGUuaWRdID0ge31cbiAgICAgICAgICAgIGlkVG9EYXRhc291cmNlW3Jlc3VsdE5vZGUuaWRdW3Jlc3VsdC5kYXRhc291cmNlc1swXS5pZF0gPSBjb25maWd1cmF0aW9uXG4gICAgICAgICAgICBpZFRvUmVzdWx0W3Jlc3VsdE5vZGUuaWRdID0gcmVzdWx0XG4gICAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICBjcHVzaChyZXN1bHQuZGF0YXNvdXJjZXMsIGdvYyhpZFRvRGF0YXNvdXJjZSwgcmVzdWx0Tm9kZS5pZCksIGNvbmZpZ3VyYXRpb24uaWQsIGNvbmZpZ3VyYXRpb24pXG4gICAgICAgICAgaWYgKGJpbmRpbmdbJ3NhbWVBcyddKSB7XG4gICAgICAgICAgICBsZXQgb3RoZXJOb2RlOiBJTm9kZSA9IG5ldyBTcGFycWxCaW5kaW5nTm9kZShiaW5kaW5nWydzYW1lQXMnXSlcbiAgICAgICAgICAgIGlmICghaWRUb1Jlc3VsdFtvdGhlck5vZGUuaWRdKSB7XG4gICAgICAgICAgICAgIGlkVG9SZXN1bHRbb3RoZXJOb2RlLmlkXSA9IHJlc3VsdFxuICAgICAgICAgICAgICByZXN1bHQuaWRzLnB1c2gob3RoZXJOb2RlKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbGV0IG90aGVyUmVzdWx0OiBSZXN1bHQgPSBpZFRvUmVzdWx0W290aGVyTm9kZS5pZF1cbiAgICAgICAgICAgICAgaWYgKG90aGVyUmVzdWx0ICE9PSByZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBvdGhlclJlc3VsdC5pZHMuZm9yRWFjaChvdGhlck5vZGUgPT4ge1xuICAgICAgICAgICAgICAgICAgb3RoZXJSZXN1bHQuZGF0YXNvdXJjZXMuZm9yRWFjaChkY29uZmlndXJhdGlvbiA9PlxuICAgICAgICAgICAgICAgICAgICBjcHVzaChyZXN1bHQuZGF0YXNvdXJjZXMsIGdvYyhpZFRvRGF0YXNvdXJjZSwgcmVzdWx0Tm9kZS5pZCksIGRjb25maWd1cmF0aW9uLmlkLCBkY29uZmlndXJhdGlvbilcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIGZvciAobGV0IHZhck5hbWUgaW4gb3RoZXJSZXN1bHQuYWRkaXRpb25hbEluZm9ybWF0aW9uKVxuICAgICAgICAgICAgICAgICAgICBvdGhlclJlc3VsdC5hZGRpdGlvbmFsSW5mb3JtYXRpb25bdmFyTmFtZV0uZm9yRWFjaChhaSA9PlxuICAgICAgICAgICAgICAgICAgICAgIGNwdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgZ29jKHJlc3VsdC5hZGRpdGlvbmFsSW5mb3JtYXRpb24sIHZhck5hbWUsICgpID0+IFtdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdvYyhnb2MoaWRUb0FkZGl0aW9uYWxJbmZvcm1hdGlvbiwgcmVzdWx0Tm9kZS5pZCksIHZhck5hbWUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWkuaWQsIGFpKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICByZXN1bHQuaWRzLnB1c2gob3RoZXJOb2RlKVxuICAgICAgICAgICAgICAgICAgaWRUb1Jlc3VsdFtvdGhlck5vZGUuaWRdID0gcmVzdWx0XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBpZFRvUmVzdWx0W290aGVyTm9kZS5pZF0gPSByZXN1bHRcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZnBWYXJzLmZvckVhY2goaWZwVmFyID0+IHtcbiAgICAgICAgICAgIGlmIChiaW5kaW5nW2lmcFZhcl0pIHtcbiAgICAgICAgICAgICAgbGV0IGlmcDogSU5vZGUgPSBuZXcgU3BhcnFsQmluZGluZ05vZGUoYmluZGluZ1tpZnBWYXJdKVxuICAgICAgICAgICAgICBpZiAoIWdvYyhpZnBUb0lkLCBpZnBWYXIpW2lmcC5pZF0pIHtcbiAgICAgICAgICAgICAgICBpZnBUb0lkW2lmcFZhcl1baWZwLmlkXSA9IHJlc3VsdE5vZGUuaWRcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgb3RoZXJSZXN1bHQ6IFJlc3VsdCA9IGlkVG9SZXN1bHRbaWZwVG9JZFtpZnBWYXJdW2lmcC5pZF1dXG4gICAgICAgICAgICAgICAgaWYgKG90aGVyUmVzdWx0ICE9PSByZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgIG90aGVyUmVzdWx0Lmlkcy5mb3JFYWNoKG90aGVyTm9kZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG90aGVyUmVzdWx0LmRhdGFzb3VyY2VzLmZvckVhY2goZGNvbmZpZ3VyYXRpb24gPT5cbiAgICAgICAgICAgICAgICAgICAgICBjcHVzaChyZXN1bHQuZGF0YXNvdXJjZXMsIGdvYyhpZFRvRGF0YXNvdXJjZSwgcmVzdWx0Tm9kZS5pZCksIGRjb25maWd1cmF0aW9uLmlkLCBkY29uZmlndXJhdGlvbilcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB2YXJOYW1lIGluIG90aGVyUmVzdWx0LmFkZGl0aW9uYWxJbmZvcm1hdGlvbilcbiAgICAgICAgICAgICAgICAgICAgICBvdGhlclJlc3VsdC5hZGRpdGlvbmFsSW5mb3JtYXRpb25bdmFyTmFtZV0uZm9yRWFjaChhaSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgY3B1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGdvYyhyZXN1bHQuYWRkaXRpb25hbEluZm9ybWF0aW9uLCB2YXJOYW1lLCAoKSA9PiBbXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGdvYyhnb2MoaWRUb0FkZGl0aW9uYWxJbmZvcm1hdGlvbiwgcmVzdWx0Tm9kZS5pZCksIHZhck5hbWUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBhaS5pZCwgYWkpXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICByZXN1bHQuaWRzLnB1c2gob3RoZXJOb2RlKVxuICAgICAgICAgICAgICAgICAgICBpZFRvUmVzdWx0W290aGVyTm9kZS5pZF0gPSByZXN1bHRcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICBpZnBUb0lkW2lmcFZhcl1baWZwLmlkXSA9IHJlc3VsdE5vZGUuaWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIGFkZGl0aW9uYWxJbmZvcm1hdGlvblZhcnMuZm9yRWFjaCh2YXJOYW1lID0+IHtcbiAgICAgICAgICAgIGlmIChiaW5kaW5nW3Zhck5hbWVdKSB7XG4gICAgICAgICAgICAgIGxldCBhaTogSU5vZGUgPSBuZXcgU3BhcnFsQmluZGluZ05vZGUoYmluZGluZ1t2YXJOYW1lXSlcbiAgICAgICAgICAgICAgY3B1c2goXG4gICAgICAgICAgICAgICAgZ29jKHJlc3VsdC5hZGRpdGlvbmFsSW5mb3JtYXRpb24sIHZhck5hbWUsICgpID0+IFtdKSxcbiAgICAgICAgICAgICAgICBnb2MoZ29jKGlkVG9BZGRpdGlvbmFsSW5mb3JtYXRpb24sIHJlc3VsdE5vZGUuaWQpLCB2YXJOYW1lKSxcbiAgICAgICAgICAgICAgICBhaS5pZCwgYWkpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIGdyb3VwVG9SZXN1bHRzXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBxdWVyeShxdWVyeTogc3RyaW5nLCBsaW1pdDogbnVtYmVyLCBjb25maWd1cmF0aW9uczogU3BhcnFsQXV0b2NvbXBsZXRpb25Db25maWd1cmF0aW9uW10sIGNhbmNlbGxlcj86IGFuZ3VsYXIuSVByb21pc2U8YW55Pik6IGFuZ3VsYXIuSVByb21pc2U8YW5ndWxhci5JSHR0cFByb21pc2VDYWxsYmFja0FyZzxzLklTcGFycWxCaW5kaW5nUmVzdWx0PHtbaWQ6IHN0cmluZ106IHMuSVNwYXJxbEJpbmRpbmd9Pj4+W10ge1xuICAgICAgcmV0dXJuIGNvbmZpZ3VyYXRpb25zLm1hcChjb25maWd1cmF0aW9uID0+IHtcbiAgICAgICAgbGV0IHF1ZXJ5VGVtcGxhdGU6IHN0cmluZyA9IGNvbmZpZ3VyYXRpb24ucXVlcnlUZW1wbGF0ZVxuICAgICAgICBxdWVyeVRlbXBsYXRlID0gcXVlcnlUZW1wbGF0ZS5yZXBsYWNlKC88UVVFUlk+L2csIHMuU3BhcnFsU2VydmljZS5zdHJpbmdUb1NQQVJRTFN0cmluZyhxdWVyeSkpXG4gICAgICAgIHF1ZXJ5VGVtcGxhdGUgPSBxdWVyeVRlbXBsYXRlLnJlcGxhY2UoLyMgQ09OU1RSQUlOVFMvZywgY29uZmlndXJhdGlvbi5jb25zdHJhaW50cylcbiAgICAgICAgcXVlcnlUZW1wbGF0ZSA9IHF1ZXJ5VGVtcGxhdGUucmVwbGFjZSgvPExJTUlUPi9nLCAnJyArIGxpbWl0KVxuICAgICAgICByZXR1cm4gdGhpcy5zcGFycWxTZXJ2aWNlLnF1ZXJ5KGNvbmZpZ3VyYXRpb24uZW5kcG9pbnQsIHF1ZXJ5VGVtcGxhdGUsIHt0aW1lb3V0OiBjYW5jZWxsZXJ9KX0pXG4gICAgfVxuXG4gIH1cblxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

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
                if (_this.itemId)
                    _this.sparqlItemService.getItem(_this.itemId).then(function (item) { return _this.item = item; });
            };
        }/*<auto_generate>*/SparqlItemComponentController.$inject = ['sparqlItemService']; SparqlItemComponentController.$componentName = 'SparqlItemComponentController'/*</auto_generate>*/
        return SparqlItemComponentController;
    }(SparqlItemComponentBindings));/*<auto_generate>*/angular.module('fibra').controller('SparqlItemComponentController',SparqlItemComponentController);/*</auto_generate>*/
    var SparqlItemComponent = (function () {
        function SparqlItemComponent() {
            this.bindings = {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvc3BhcnFsLWl0ZW0tY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBVSxLQUFLLENBZ0NkO0FBaENELFdBQVUsS0FBSyxFQUFDLENBQUM7SUFDZixZQUFZLENBQUE7SUFFWjtRQUFBO1FBRUEsQ0FBQztRQUFELGtDQUFDO0lBQUQsQ0FGQSxBQUVDLElBQUE7SUFNRDtRQUE0QyxpREFBMkI7UUFRckUsdUNBQW9CLGlCQUFvQztZQVIxRCxpQkFXQztZQUZHLGlCQUFPLENBQUE7WUFEVyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1lBTmpELGVBQVUsR0FBMEQsVUFBQyxPQUEyQztnQkFDckgsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQztvQkFDZCxLQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQzlDLFVBQUMsSUFBVSxJQUFLLE9BQUEsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLEVBQWhCLENBQWdCLENBQ2pDLENBQUE7WUFDTCxDQUFDLENBQUE7UUFHRCxDQUFDO1FBQ0gsb0NBQUM7SUFBRCxDQVhBLEFBV0MsQ0FYMkMsMkJBQTJCLEdBV3RFO0lBRUQ7UUFBQTtZQUNXLGFBQVEsR0FBMkI7Z0JBQ3hDLE1BQU0sRUFBRSxHQUFHO2dCQUNYLFFBQVEsRUFBRSxHQUFHO2FBQ2QsQ0FBQTtZQUNNLGVBQVUsR0FBYSw2QkFBNkIsQ0FBQTtZQUNwRCxnQkFBVyxHQUFXLDJCQUEyQixDQUFBO1FBQzVELENBQUM7UUFBRCwwQkFBQztJQUFELENBUEEsQUFPQyxJQUFBO0lBUFkseUJBQW1CLHNCQU8vQixDQUFBO0FBQ0gsQ0FBQyxFQWhDUyxLQUFLLEtBQUwsS0FBSyxRQWdDZCIsImZpbGUiOiJzY3JpcHRzL3NwYXJxbC1pdGVtLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBmaWJyYSB7XG4gICd1c2Ugc3RyaWN0J1xuXG4gIGNsYXNzIFNwYXJxbEl0ZW1Db21wb25lbnRCaW5kaW5ncyB7XG4gICAgcHVibGljIGl0ZW1JZDogSU5vZGVcbiAgfVxuXG4gIGludGVyZmFjZSBJU3BhcnFsSXRlbUNvbXBvbmVudEJpbmRpbmdDaGFuZ2VzIHtcbiAgICBpdGVtSWQ/OiBhbmd1bGFyLklDaGFuZ2VzT2JqZWN0XG4gIH1cblxuICBjbGFzcyBTcGFycWxJdGVtQ29tcG9uZW50Q29udHJvbGxlciBleHRlbmRzIFNwYXJxbEl0ZW1Db21wb25lbnRCaW5kaW5ncyB7XG4gICAgcHJpdmF0ZSBpdGVtOiBJdGVtXG4gICAgcHVibGljICRvbkNoYW5nZXM6IChjaGFuZ2VzOiBJU3BhcnFsSXRlbUNvbXBvbmVudEJpbmRpbmdDaGFuZ2VzKSA9PiB2b2lkID0gKGNoYW5nZXM6IElTcGFycWxJdGVtQ29tcG9uZW50QmluZGluZ0NoYW5nZXMpID0+IHtcbiAgICAgIGlmICh0aGlzLml0ZW1JZClcbiAgICAgICAgdGhpcy5zcGFycWxJdGVtU2VydmljZS5nZXRJdGVtKHRoaXMuaXRlbUlkKS50aGVuKFxuICAgICAgICAgIChpdGVtOiBJdGVtKSA9PiB0aGlzLml0ZW0gPSBpdGVtXG4gICAgICAgIClcbiAgICB9XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzcGFycWxJdGVtU2VydmljZTogU3BhcnFsSXRlbVNlcnZpY2UpIHtcbiAgICAgIHN1cGVyKClcbiAgICB9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgU3BhcnFsSXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIGFuZ3VsYXIuSUNvbXBvbmVudE9wdGlvbnMge1xuICAgICAgcHVibGljIGJpbmRpbmdzOiB7W2lkOiBzdHJpbmddOiBzdHJpbmd9ID0ge1xuICAgICAgICBpdGVtSWQ6ICc8JyxcbiAgICAgICAgb25TZWxlY3Q6ICcmJ1xuICAgICAgfVxuICAgICAgcHVibGljIGNvbnRyb2xsZXI6IEZ1bmN0aW9uID0gU3BhcnFsSXRlbUNvbXBvbmVudENvbnRyb2xsZXJcbiAgICAgIHB1YmxpYyB0ZW1wbGF0ZVVybDogc3RyaW5nID0gJ3BhcnRpYWxzL3NwYXJxbC1pdGVtLmh0bWwnXG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

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
        SparqlItemService.prototype.getItem = function (id, canceller) {
            return this.workerService.call('sparqlItemWorkerService', 'getItem', [id], canceller);
        };
        SparqlItemService.prototype.createNewItem = function (equivalentNodes, properties) {
            if (equivalentNodes === void 0) { equivalentNodes = []; }
            if (properties === void 0) { properties = []; }
            return this.workerService.call('sparqlItemWorkerService', 'createNewItem', [equivalentNodes, properties]);
        };
        SparqlItemService.ns = 'http://ldf.fi/fibra/';
        SparqlItemService.schemaGraph = new fibra.IRI(SparqlItemService.ns + 'schema#');
        SparqlItemService.instanceGraph = new fibra.IRI(SparqlItemService.ns + 'main/');
        SparqlItemService.getItemPropertiesQuery = "\nPREFIX skos: <http://www.w3.org/2004/02/skos/core#>\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\nPREFIX owl: <http://www.w3.org/2002/07/owl#>\nPREFIX sf: <http://ldf.fi/functions#>\nSELECT ?service ?itemLabel ?property ?propertyLabel ?object ?objectLabel {\n  <ID> owl:sameAs* ?id .\n  VALUES ?service {\n    <SERVICES>\n  }\n  SERVICE ?service {\n    ?id sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?itemLabel) .\n    ?id ?property ?object .\n    OPTIONAL {\n      ?property sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?propertyLabelP)\n    }\n    BIND(COALESCE(?propertyLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?property),\".*/\",\"\"),\".*#\",\"\"),\"_\",\" \"),\"([A-Z\u00C5\u00C4\u00D6])\",\" $1\")) AS ?propertyLabel)\n    OPTIONAL {\n      ?object sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?objectLabelP) .\n    }\n    BIND (IF(ISIRI(?object),COALESCE(?objectLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?object),\".*/\",\"\"),\".*#\",\"\"),\"_\",\" \"),\"([A-Z\u00C5\u00C4\u00D6])\",\" $1\")),?object) AS ?objectLabel)\n  }\n}\n";
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
        function SparqlItemWorkerService(sparqlService, $q, sparqlUpdateWorkerService, configurationWorkerService) {
            this.sparqlService = sparqlService;
            this.$q = $q;
            this.sparqlUpdateWorkerService = sparqlUpdateWorkerService;
            this.configurationWorkerService = configurationWorkerService;
        }/*<auto_generate>*/SparqlItemWorkerService.$inject = ['sparqlService','$q','sparqlUpdateWorkerService','configurationWorkerService']; SparqlItemWorkerService.$componentName = 'sparqlItemWorkerService'/*</auto_generate>*/
        SparqlItemWorkerService.prototype.getItem = function (id, canceller) {
            var queryTemplate = SparqlItemService.getItemPropertiesQuery;
            queryTemplate = queryTemplate.replace(/<ID>/g, id.id);
            queryTemplate = queryTemplate.replace(/<SERVICES>/g, this.configurationWorkerService.configurations.map(function (c) { return '<' + c.endpoint + '>'; }).join(''));
            return this.sparqlService.query(this.configurationWorkerService.configurations[0].endpoint, queryTemplate, { timeout: canceller }).then(function (response) {
                var item = new fibra.Item(id);
                var propertyMap = {};
                response.data.results.bindings.forEach(function (b) {
                    if (b['itemLabel'])
                        item.label = new fibra.SparqlBindingNode(b['itemLabel']);
                    if (b['property']) {
                        var propertyToValues = propertyMap[b['property'].value];
                        if (!propertyToValues) {
                            propertyToValues = new fibra.PropertyToValues(new fibra.SparqlBindingNode(b['property']));
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
        SparqlItemWorkerService.prototype.createNewItem = function (equivalentNodes, properties) {
            if (equivalentNodes === void 0) { equivalentNodes = []; }
            if (properties === void 0) { properties = []; }
            var deferred = this.$q.defer();
            var subject = new fibra.IRI(SparqlItemService.ns + SparqlItemService.UUID());
            deferred.notify(subject);
            var schemaTriplesToAdd = [];
            var instanceTriplesToAdd = [];
            equivalentNodes.forEach(function (node) { return instanceTriplesToAdd.push(new fibra.Triple(subject, fibra.OWL.sameAs, node)); });
            properties.forEach(function (property) {
                if (property.label)
                    schemaTriplesToAdd.push(new fibra.Triple(property, fibra.SKOS.prefLabel, property.label));
                property.values.forEach(function (value) {
                    instanceTriplesToAdd.push(new fibra.Triple(subject, property, value));
                    if (value.label)
                        instanceTriplesToAdd.push(new fibra.Triple(value, fibra.SKOS.prefLabel, value.label));
                });
            });
            this.sparqlUpdateWorkerService.updateGraphs(this.configurationWorkerService.configurations[0].endpoint, [new fibra.Graph(SparqlItemService.schemaGraph, schemaTriplesToAdd), new fibra.Graph(SparqlItemService.instanceGraph, instanceTriplesToAdd)]).then(function () { return deferred.resolve(subject); }, deferred.reject, deferred.notify);
            return deferred.promise;
        };
        return SparqlItemWorkerService;
    }());/*<auto_generate>*/angular.module('fibra').service('sparqlItemWorkerService',SparqlItemWorkerService);/*</auto_generate>*/
    fibra.SparqlItemWorkerService = SparqlItemWorkerService;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvc3BhcnFsLWl0ZW0tc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFVLEtBQUssQ0E0SGQ7QUE1SEQsV0FBVSxLQUFLLEVBQUMsQ0FBQztJQUNmLFlBQVksQ0FBQTtJQUlaO1FBbURFLDJCQUFvQixhQUE0QjtZQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFHLENBQUM7UUFidEMsc0JBQUksR0FBbEI7WUFDRSwrQkFBK0I7WUFDL0IsSUFBSSxFQUFFLEdBQVcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLFVBQVUsR0FBRyxDQUFDLENBQUE7WUFDL0MsSUFBSSxFQUFFLEdBQVcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLFVBQVUsR0FBRyxDQUFDLENBQUE7WUFDL0MsSUFBSSxFQUFFLEdBQVcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLFVBQVUsR0FBRyxDQUFDLENBQUE7WUFDL0MsSUFBSSxFQUFFLEdBQVcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLFVBQVUsR0FBRyxDQUFDLENBQUE7WUFDL0MsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRztnQkFDckssaUJBQWlCLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcs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QUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQzVPLGNBQU0sT0FBQSxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUF6QixDQUF5QixFQUMvQixRQUFRLENBQUMsTUFBTSxFQUNmLFFBQVEsQ0FBQyxNQUFNLENBQ2hCLENBQUE7WUFDRCxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQTtRQUN6QixDQUFDO1FBRUgsOEJBQUM7SUFBRCxDQXREQSxBQXNEQyxJQUFBO0lBdERZLDZCQUF1QiwwQkFzRG5DLENBQUE7QUFFSCxDQUFDLEVBNUhTLEtBQUssS0FBTCxLQUFLLFFBNEhkIiwiZmlsZSI6InNjcmlwdHMvc3BhcnFsLWl0ZW0tc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBmaWJyYSB7XG4gICd1c2Ugc3RyaWN0J1xuXG4gIGltcG9ydCBzID0gZmkuc2Vjby5zcGFycWxcblxuICBleHBvcnQgY2xhc3MgU3BhcnFsSXRlbVNlcnZpY2Uge1xuXG4gICAgcHVibGljIHN0YXRpYyBuczogc3RyaW5nID0gJ2h0dHA6Ly9sZGYuZmkvZmlicmEvJ1xuICAgIHB1YmxpYyBzdGF0aWMgc2NoZW1hR3JhcGg6IElOb2RlID0gbmV3IElSSShTcGFycWxJdGVtU2VydmljZS5ucyArICdzY2hlbWEjJylcbiAgICBwdWJsaWMgc3RhdGljIGluc3RhbmNlR3JhcGg6IElOb2RlID0gbmV3IElSSShTcGFycWxJdGVtU2VydmljZS5ucyArICdtYWluLycpXG5cbiAgICBwdWJsaWMgc3RhdGljIGdldEl0ZW1Qcm9wZXJ0aWVzUXVlcnk6IHN0cmluZyA9IGBcblBSRUZJWCBza29zOiA8aHR0cDovL3d3dy53My5vcmcvMjAwNC8wMi9za29zL2NvcmUjPlxuUFJFRklYIHJkZnM6IDxodHRwOi8vd3d3LnczLm9yZy8yMDAwLzAxL3JkZi1zY2hlbWEjPlxuUFJFRklYIG93bDogPGh0dHA6Ly93d3cudzMub3JnLzIwMDIvMDcvb3dsIz5cblBSRUZJWCBzZjogPGh0dHA6Ly9sZGYuZmkvZnVuY3Rpb25zIz5cblNFTEVDVCA/c2VydmljZSA/aXRlbUxhYmVsID9wcm9wZXJ0eSA/cHJvcGVydHlMYWJlbCA/b2JqZWN0ID9vYmplY3RMYWJlbCB7XG4gIDxJRD4gb3dsOnNhbWVBcyogP2lkIC5cbiAgVkFMVUVTID9zZXJ2aWNlIHtcbiAgICA8U0VSVklDRVM+XG4gIH1cbiAgU0VSVklDRSA/c2VydmljZSB7XG4gICAgP2lkIHNmOnByZWZlcnJlZExhbmd1YWdlTGl0ZXJhbCAoc2tvczpwcmVmTGFiZWwgcmRmczpsYWJlbCBza29zOmFsdExhYmVsICdlbicgJycgP2l0ZW1MYWJlbCkgLlxuICAgID9pZCA/cHJvcGVydHkgP29iamVjdCAuXG4gICAgT1BUSU9OQUwge1xuICAgICAgP3Byb3BlcnR5IHNmOnByZWZlcnJlZExhbmd1YWdlTGl0ZXJhbCAoc2tvczpwcmVmTGFiZWwgcmRmczpsYWJlbCBza29zOmFsdExhYmVsICdlbicgJycgP3Byb3BlcnR5TGFiZWxQKVxuICAgIH1cbiAgICBCSU5EKENPQUxFU0NFKD9wcm9wZXJ0eUxhYmVsUCxSRVBMQUNFKFJFUExBQ0UoUkVQTEFDRShSRVBMQUNFKFNUUig/cHJvcGVydHkpLFwiLiovXCIsXCJcIiksXCIuKiNcIixcIlwiKSxcIl9cIixcIiBcIiksXCIoW0EtWsOFw4TDll0pXCIsXCIgJDFcIikpIEFTID9wcm9wZXJ0eUxhYmVsKVxuICAgIE9QVElPTkFMIHtcbiAgICAgID9vYmplY3Qgc2Y6cHJlZmVycmVkTGFuZ3VhZ2VMaXRlcmFsIChza29zOnByZWZMYWJlbCByZGZzOmxhYmVsIHNrb3M6YWx0TGFiZWwgJ2VuJyAnJyA/b2JqZWN0TGFiZWxQKSAuXG4gICAgfVxuICAgIEJJTkQgKElGKElTSVJJKD9vYmplY3QpLENPQUxFU0NFKD9vYmplY3RMYWJlbFAsUkVQTEFDRShSRVBMQUNFKFJFUExBQ0UoUkVQTEFDRShTVFIoP29iamVjdCksXCIuKi9cIixcIlwiKSxcIi4qI1wiLFwiXCIpLFwiX1wiLFwiIFwiKSxcIihbQS1aw4XDhMOWXSlcIixcIiAkMVwiKSksP29iamVjdCkgQVMgP29iamVjdExhYmVsKVxuICB9XG59XG5gXG5cbiAgICBwcml2YXRlIHN0YXRpYyBsdXQ6IHN0cmluZ1tdID0gKCgpID0+IHtcbiAgICAgIGxldCBsdXQ6IHN0cmluZ1tdID0gW11cbiAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCAyNTY7IGkrKylcbiAgICAgICAgbHV0W2ldID0gKGkgPCAxNiA/ICcwJyA6ICcnKSArIGkudG9TdHJpbmcoMTYpXG4gICAgICByZXR1cm4gbHV0XG4gICAgfSkoKVxuXG4gICAgcHVibGljIHN0YXRpYyBVVUlEKCk6IHN0cmluZyB7XG4gICAgICAvKiB0c2xpbnQ6ZGlzYWJsZTpuby1iaXR3aXNlICovXG4gICAgICBsZXQgZDA6IG51bWJlciA9IE1hdGgucmFuZG9tKCkgKiAweGZmZmZmZmZmIHwgMFxuICAgICAgbGV0IGQxOiBudW1iZXIgPSBNYXRoLnJhbmRvbSgpICogMHhmZmZmZmZmZiB8IDBcbiAgICAgIGxldCBkMjogbnVtYmVyID0gTWF0aC5yYW5kb20oKSAqIDB4ZmZmZmZmZmYgfCAwXG4gICAgICBsZXQgZDM6IG51bWJlciA9IE1hdGgucmFuZG9tKCkgKiAweGZmZmZmZmZmIHwgMFxuICAgICAgcmV0dXJuIFNwYXJxbEl0ZW1TZXJ2aWNlLmx1dFtkMCAmIDB4ZmZdICsgU3BhcnFsSXRlbVNlcnZpY2UubHV0W2QwID4+IDggJiAweGZmXSArIFNwYXJxbEl0ZW1TZXJ2aWNlLmx1dFtkMCA+PiAxNiAmIDB4ZmZdICsgU3BhcnFsSXRlbVNlcnZpY2UubHV0W2QwID4+IDI0ICYgMHhmZl0gKyAnLScgK1xuICAgICAgICBTcGFycWxJdGVtU2VydmljZS5sdXRbZDEgJiAweGZmXSArIFNwYXJxbEl0ZW1TZXJ2aWNlLmx1dFtkMSA+PiA4ICYgMHhmZl0gKyAnLScgKyBTcGFycWxJdGVtU2VydmljZS5sdXRbZDEgPj4gMTYgJiAweDBmIHwgMHg0MF0gKyBTcGFycWxJdGVtU2VydmljZS5sdXRbZDEgPj4gMjQgJiAweGZmXSArICctJyArXG4gICAgICAgIFNwYXJxbEl0ZW1TZXJ2aWNlLmx1dFtkMiAmIDB4M2YgfCAweDgwXSArIFNwYXJxbEl0ZW1TZXJ2aWNlLmx1dFtkMiA+PiA4ICYgMHhmZl0gKyAnLScgKyBTcGFycWxJdGVtU2VydmljZS5sdXRbZDIgPj4gMTYgJiAweGZmXSArIFNwYXJxbEl0ZW1TZXJ2aWNlLmx1dFtkMiA+PiAyNCAmIDB4ZmZdICtcbiAgICAgICAgU3BhcnFsSXRlbVNlcnZpY2UubHV0W2QzICYgMHhmZl0gKyBTcGFycWxJdGVtU2VydmljZS5sdXRbZDMgPj4gOCAmIDB4ZmZdICsgU3BhcnFsSXRlbVNlcnZpY2UubHV0W2QzID4+IDE2ICYgMHhmZl0gKyBTcGFycWxJdGVtU2VydmljZS5sdXRbZDMgPj4gMjQgJiAweGZmXVxuICAgICAgLyogdHNsaW50OmVuYWJsZTpuby1iaXR3aXNlICovXG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB3b3JrZXJTZXJ2aWNlOiBXb3JrZXJTZXJ2aWNlKSB7fVxuXG4gICAgcHVibGljIGdldEl0ZW0oaWQ6IElOb2RlLCBjYW5jZWxsZXI/OiBhbmd1bGFyLklQcm9taXNlPGFueT4pOiBhbmd1bGFyLklQcm9taXNlPEl0ZW0+IHtcbiAgICAgIHJldHVybiB0aGlzLndvcmtlclNlcnZpY2UuY2FsbCgnc3BhcnFsSXRlbVdvcmtlclNlcnZpY2UnLCAnZ2V0SXRlbScsIFtpZF0sIGNhbmNlbGxlcilcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlTmV3SXRlbShlcXVpdmFsZW50Tm9kZXM6IElOb2RlW10gPSBbXSwgcHJvcGVydGllczogUHJvcGVydHlUb1ZhbHVlc1tdID0gW10pOiBhbmd1bGFyLklQcm9taXNlPElOb2RlPiB7XG4gICAgICByZXR1cm4gdGhpcy53b3JrZXJTZXJ2aWNlLmNhbGwoJ3NwYXJxbEl0ZW1Xb3JrZXJTZXJ2aWNlJywgJ2NyZWF0ZU5ld0l0ZW0nLCBbZXF1aXZhbGVudE5vZGVzLCBwcm9wZXJ0aWVzXSlcbiAgICB9XG5cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBTcGFycWxJdGVtV29ya2VyU2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNwYXJxbFNlcnZpY2U6IHMuU3BhcnFsU2VydmljZSwgcHJpdmF0ZSAkcTogYW5ndWxhci5JUVNlcnZpY2UsIHByaXZhdGUgc3BhcnFsVXBkYXRlV29ya2VyU2VydmljZTogU3BhcnFsVXBkYXRlV29ya2VyU2VydmljZSwgcHJpdmF0ZSBjb25maWd1cmF0aW9uV29ya2VyU2VydmljZTogQ29uZmlndXJhdGlvbldvcmtlclNlcnZpY2UpIHt9XG5cbiAgICBwdWJsaWMgZ2V0SXRlbShpZDogSU5vZGUsIGNhbmNlbGxlcj86IGFuZ3VsYXIuSVByb21pc2U8YW55Pik6IGFuZ3VsYXIuSVByb21pc2U8SXRlbT4ge1xuICAgICAgbGV0IHF1ZXJ5VGVtcGxhdGU6IHN0cmluZyA9IFNwYXJxbEl0ZW1TZXJ2aWNlLmdldEl0ZW1Qcm9wZXJ0aWVzUXVlcnlcbiAgICAgIHF1ZXJ5VGVtcGxhdGUgPSBxdWVyeVRlbXBsYXRlLnJlcGxhY2UoLzxJRD4vZywgaWQuaWQpXG4gICAgICBxdWVyeVRlbXBsYXRlID0gcXVlcnlUZW1wbGF0ZS5yZXBsYWNlKC88U0VSVklDRVM+L2csIHRoaXMuY29uZmlndXJhdGlvbldvcmtlclNlcnZpY2UuY29uZmlndXJhdGlvbnMubWFwKGMgPT4gJzwnICsgYy5lbmRwb2ludCArICc+Jykuam9pbignJykpXG4gICAgICByZXR1cm4gdGhpcy5zcGFycWxTZXJ2aWNlLnF1ZXJ5KHRoaXMuY29uZmlndXJhdGlvbldvcmtlclNlcnZpY2UuY29uZmlndXJhdGlvbnNbMF0uZW5kcG9pbnQsIHF1ZXJ5VGVtcGxhdGUsIHt0aW1lb3V0OiBjYW5jZWxsZXJ9KS50aGVuKFxuICAgICAgICAocmVzcG9uc2U6IGFuZ3VsYXIuSUh0dHBQcm9taXNlQ2FsbGJhY2tBcmc8cy5JU3BhcnFsQmluZGluZ1Jlc3VsdDx7W2lkOiBzdHJpbmddOiBzLklTcGFycWxCaW5kaW5nfT4+KSA9PiB7XG4gICAgICAgICAgbGV0IGl0ZW06IEl0ZW0gPSBuZXcgSXRlbShpZClcbiAgICAgICAgICBsZXQgcHJvcGVydHlNYXA6IHtbcHJvcGVydHk6IHN0cmluZ106IFByb3BlcnR5VG9WYWx1ZXN9ID0ge31cbiAgICAgICAgICByZXNwb25zZS5kYXRhLnJlc3VsdHMuYmluZGluZ3MuZm9yRWFjaChiID0+IHtcbiAgICAgICAgICAgIGlmIChiWydpdGVtTGFiZWwnXSkgaXRlbS5sYWJlbCA9IG5ldyBTcGFycWxCaW5kaW5nTm9kZShiWydpdGVtTGFiZWwnXSlcbiAgICAgICAgICAgIGlmIChiWydwcm9wZXJ0eSddKSB7XG4gICAgICAgICAgICAgIGxldCBwcm9wZXJ0eVRvVmFsdWVzOiBQcm9wZXJ0eVRvVmFsdWVzID0gcHJvcGVydHlNYXBbYlsncHJvcGVydHknXS52YWx1ZV1cbiAgICAgICAgICAgICAgaWYgKCFwcm9wZXJ0eVRvVmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgcHJvcGVydHlUb1ZhbHVlcyA9IG5ldyBQcm9wZXJ0eVRvVmFsdWVzKG5ldyBTcGFycWxCaW5kaW5nTm9kZShiWydwcm9wZXJ0eSddKSlcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eU1hcFtiWydwcm9wZXJ0eSddLnZhbHVlXSA9IHByb3BlcnR5VG9WYWx1ZXNcbiAgICAgICAgICAgICAgICBpZiAoYlsncHJvcGVydHlMYWJlbCddKSBwcm9wZXJ0eVRvVmFsdWVzLmxhYmVsID0gbmV3IFNwYXJxbEJpbmRpbmdOb2RlKGJbJ3Byb3BlcnR5TGFiZWwnXSlcbiAgICAgICAgICAgICAgICBpdGVtLnByb3BlcnRpZXMucHVzaChwcm9wZXJ0eVRvVmFsdWVzKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGxldCBvTm9kZTogTm9kZVBsdXNMYWJlbCA9IG5ldyBOb2RlUGx1c0xhYmVsKG5ldyBTcGFycWxCaW5kaW5nTm9kZShiWydvYmplY3QnXSkpXG4gICAgICAgICAgICAgIGlmIChiWydvYmplY3RMYWJlbCddKSBvTm9kZS5sYWJlbCA9IG5ldyBTcGFycWxCaW5kaW5nTm9kZShiWydvYmplY3RMYWJlbCddKVxuICAgICAgICAgICAgICBwcm9wZXJ0eVRvVmFsdWVzLnZhbHVlcy5wdXNoKG9Ob2RlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgcmV0dXJuIGl0ZW1cbiAgICAgICAgfVxuICAgICAgKVxuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGVOZXdJdGVtKGVxdWl2YWxlbnROb2RlczogSU5vZGVbXSA9IFtdLCBwcm9wZXJ0aWVzOiBQcm9wZXJ0eVRvVmFsdWVzW10gPSBbXSk6IGFuZ3VsYXIuSVByb21pc2U8SU5vZGU+IHtcbiAgICAgIGxldCBkZWZlcnJlZDogYW5ndWxhci5JRGVmZXJyZWQ8SU5vZGU+ID0gdGhpcy4kcS5kZWZlcigpXG4gICAgICBsZXQgc3ViamVjdDogSU5vZGUgPSBuZXcgSVJJKFNwYXJxbEl0ZW1TZXJ2aWNlLm5zICsgU3BhcnFsSXRlbVNlcnZpY2UuVVVJRCgpKVxuICAgICAgZGVmZXJyZWQubm90aWZ5KHN1YmplY3QpXG4gICAgICBsZXQgc2NoZW1hVHJpcGxlc1RvQWRkOiBUcmlwbGVbXSA9IFtdXG4gICAgICBsZXQgaW5zdGFuY2VUcmlwbGVzVG9BZGQ6IFRyaXBsZVtdID0gW11cbiAgICAgIGVxdWl2YWxlbnROb2Rlcy5mb3JFYWNoKG5vZGUgPT4gaW5zdGFuY2VUcmlwbGVzVG9BZGQucHVzaChuZXcgVHJpcGxlKHN1YmplY3QsIE9XTC5zYW1lQXMsIG5vZGUpKSlcbiAgICAgIHByb3BlcnRpZXMuZm9yRWFjaChwcm9wZXJ0eSA9PiB7XG4gICAgICAgIGlmIChwcm9wZXJ0eS5sYWJlbCkgc2NoZW1hVHJpcGxlc1RvQWRkLnB1c2gobmV3IFRyaXBsZShwcm9wZXJ0eSwgU0tPUy5wcmVmTGFiZWwsIHByb3BlcnR5LmxhYmVsKSlcbiAgICAgICAgcHJvcGVydHkudmFsdWVzLmZvckVhY2godmFsdWUgPT4ge1xuICAgICAgICAgIGluc3RhbmNlVHJpcGxlc1RvQWRkLnB1c2gobmV3IFRyaXBsZShzdWJqZWN0LCBwcm9wZXJ0eSwgdmFsdWUpKVxuICAgICAgICAgIGlmICgoPE5vZGVQbHVzTGFiZWw+dmFsdWUpLmxhYmVsKSBpbnN0YW5jZVRyaXBsZXNUb0FkZC5wdXNoKG5ldyBUcmlwbGUodmFsdWUsIFNLT1MucHJlZkxhYmVsLCAoPE5vZGVQbHVzTGFiZWw+dmFsdWUpLmxhYmVsKSlcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgICB0aGlzLnNwYXJxbFVwZGF0ZVdvcmtlclNlcnZpY2UudXBkYXRlR3JhcGhzKHRoaXMuY29uZmlndXJhdGlvbldvcmtlclNlcnZpY2UuY29uZmlndXJhdGlvbnNbMF0uZW5kcG9pbnQsIFtuZXcgR3JhcGgoU3BhcnFsSXRlbVNlcnZpY2Uuc2NoZW1hR3JhcGgsIHNjaGVtYVRyaXBsZXNUb0FkZCksIG5ldyBHcmFwaChTcGFycWxJdGVtU2VydmljZS5pbnN0YW5jZUdyYXBoLCBpbnN0YW5jZVRyaXBsZXNUb0FkZCldKS50aGVuKFxuICAgICAgICAoKSA9PiBkZWZlcnJlZC5yZXNvbHZlKHN1YmplY3QpLFxuICAgICAgICBkZWZlcnJlZC5yZWplY3QsXG4gICAgICAgIGRlZmVycmVkLm5vdGlmeVxuICAgICAgKVxuICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2VcbiAgICB9XG5cbiAgfVxuXG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

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
            var addString = graphsToAdd.map(function (graph) { return 'GRAPH' + graph.graph.id + '{' + graph.triples.map(SparqlUpdateService.serialize).join(' . ') + '}'; }).join('');
            var removeString = graphsToRemove.map(function (graph) { return 'GRAPH' + graph.graph.id + '{' + graph.triples.map(SparqlUpdateService.serialize).join(' . ') + '}'; }).join('');
            return this.sparqlService.update(endpoint, SparqlUpdateWorkerService.queryTemplate.replace(/<DELETE>/g, removeString).replace(/<INSERT>/g, addString)).then(function (r) { return _this.workerWorkerService.stripFunctions(r); });
        };
        SparqlUpdateWorkerService.queryTemplate = "DELETE{<DELETE>}INSERT{<INSERT>}WHERE {}";
        return SparqlUpdateWorkerService;
    }());/*<auto_generate>*/angular.module('fibra').service('sparqlUpdateWorkerService',SparqlUpdateWorkerService);/*</auto_generate>*/
    fibra.SparqlUpdateWorkerService = SparqlUpdateWorkerService;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvc3BhcnFsLXVwZGF0ZS1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQVUsS0FBSyxDQStEZDtBQS9ERCxXQUFVLEtBQUssRUFBQyxDQUFDO0lBQ2YsWUFBWSxDQUFBO0lBSVo7UUFNRSw2QkFBb0IsYUFBNEI7WUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBRyxDQUFDO1FBSnRDLDZCQUFTLEdBQXZCLFVBQXdCLENBQVM7WUFDL0IsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUE7UUFDL0QsQ0FBQztRQUlNLHlDQUFXLEdBQWxCLFVBQW1CLFFBQWdCLEVBQUUsVUFBa0IsRUFBRSxhQUFxQjtZQUM1RSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFBO1FBQzlHLENBQUM7UUFFTSwwQ0FBWSxHQUFuQixVQUFvQixRQUFnQixFQUFFLFdBQW9CLEVBQUUsY0FBdUI7WUFDakYsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLDJCQUEyQixFQUFFLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQTtRQUNoSCxDQUFDO1FBRUgsMEJBQUM7SUFBRCxDQWhCQSxBQWdCQyxJQUFBO0lBaEJZLHlCQUFtQixzQkFnQi9CLENBQUE7SUFFRDtRQUdFLG1DQUFvQixhQUE4QixFQUFVLG1CQUF3QztZQUFoRixrQkFBYSxHQUFiLGFBQWEsQ0FBaUI7WUFBVSx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQUksQ0FBQztRQUVsRywrQ0FBVyxHQUFs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QUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDekosVUFBQyxDQUFDLElBQUssT0FBQSxLQUFJLENBQUMsbUJBQW1CLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUExQyxDQUEwQyxDQUNsRCxDQUFBO1FBQ0gsQ0FBQztRQXBDYyx1Q0FBYSxHQUFXLDBDQUEwQyxDQUFBO1FBc0NuRixnQ0FBQztJQUFELENBdkNBLEFBdUNDLElBQUE7SUF2Q1ksK0JBQXlCLDRCQXVDckMsQ0FBQTtBQUNILENBQUMsRUEvRFMsS0FBSyxLQUFMLEtBQUssUUErRGQiLCJmaWxlIjoic2NyaXB0cy9zcGFycWwtdXBkYXRlLXNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgZmlicmEge1xuICAndXNlIHN0cmljdCdcblxuICBpbXBvcnQgcyA9IGZpLnNlY28uc3BhcnFsXG5cbiAgZXhwb3J0IGNsYXNzIFNwYXJxbFVwZGF0ZVNlcnZpY2Uge1xuXG4gICAgcHVibGljIHN0YXRpYyBzZXJpYWxpemUoczogVHJpcGxlKTogc3RyaW5nIHtcbiAgICAgIHJldHVybiBzLnN1YmplY3QuaWQgKyAnICcgKyBzLnByb3BlcnR5LmlkICsgJyAnICsgcy5vYmplY3QuaWRcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHdvcmtlclNlcnZpY2U6IFdvcmtlclNlcnZpY2UpIHt9XG5cbiAgICBwdWJsaWMgdXBkYXRlUXVhZHMoZW5kcG9pbnQ6IHN0cmluZywgcXVhZHNUb0FkZDogUXVhZFtdLCBxdWFkc1RvUmVtb3ZlOiBRdWFkW10pOiBhbmd1bGFyLklQcm9taXNlPGFueT4ge1xuICAgICAgcmV0dXJuIHRoaXMud29ya2VyU2VydmljZS5jYWxsKCdzcGFycWxVcGRhdGVXb3JrZXJTZXJ2aWNlJywgJ3VwZGF0ZScsIFtlbmRwb2ludCwgcXVhZHNUb0FkZCwgcXVhZHNUb1JlbW92ZV0pXG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZUdyYXBocyhlbmRwb2ludDogc3RyaW5nLCBncmFwaHNUb0FkZDogR3JhcGhbXSwgZ3JhcGhzVG9SZW1vdmU6IEdyYXBoW10pOiBhbmd1bGFyLklQcm9taXNlPGFueT4ge1xuICAgICAgcmV0dXJuIHRoaXMud29ya2VyU2VydmljZS5jYWxsKCdzcGFycWxVcGRhdGVXb3JrZXJTZXJ2aWNlJywgJ3VwZGF0ZScsIFtlbmRwb2ludCwgZ3JhcGhzVG9BZGQsIGdyYXBoc1RvUmVtb3ZlXSlcbiAgICB9XG5cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBTcGFycWxVcGRhdGVXb3JrZXJTZXJ2aWNlIHtcbiAgICBwcml2YXRlIHN0YXRpYyBxdWVyeVRlbXBsYXRlOiBzdHJpbmcgPSBgREVMRVRFezxERUxFVEU+fUlOU0VSVHs8SU5TRVJUPn1XSEVSRSB7fWBcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc3BhcnFsU2VydmljZTogcy5TcGFycWxTZXJ2aWNlLCBwcml2YXRlIHdvcmtlcldvcmtlclNlcnZpY2U6IFdvcmtlcldvcmtlclNlcnZpY2UgKSB7fVxuXG4gICAgcHVibGljIHVwZGF0ZVF1YWRzKGVuZHBvaW50OiBzdHJpbmcsIHF1YWRzVG9BZGQ6IFF1YWRbXSA9IFtdLCBxdWFkc1RvUmVtb3ZlOiBRdWFkW10gPSBbXSk6IGFuZ3VsYXIuSVByb21pc2U8YW55PiB7XG4gICAgICBsZXQgZ3JhcGhzVG9BZGRNYXA6IHtbZ3JhcGhJZDogc3RyaW5nXTogR3JhcGh9ID0ge31cbiAgICAgIGxldCBncmFwaHNUb1JlbW92ZU1hcDoge1tncmFwaElkOiBzdHJpbmddOiBHcmFwaH0gPSB7fVxuICAgICAgbGV0IGdyYXBoc1RvQWRkOiBHcmFwaFtdID0gW11cbiAgICAgIGxldCBncmFwaHNUb1JlbW92ZTogR3JhcGhbXSA9IFtdXG4gICAgICBxdWFkc1RvQWRkLmZvckVhY2gocSA9PiB7XG4gICAgICAgIGxldCBncmFwaDogR3JhcGggPSBncmFwaHNUb0FkZE1hcFtxLmdyYXBoLmlkXVxuICAgICAgICBpZiAoIWdyYXBoKSB7XG4gICAgICAgICAgZ3JhcGggPSBuZXcgR3JhcGgocS5ncmFwaClcbiAgICAgICAgICBncmFwaHNUb0FkZE1hcFtxLmdyYXBoLmlkXSA9IGdyYXBoXG4gICAgICAgICAgZ3JhcGhzVG9BZGQucHVzaChncmFwaClcbiAgICAgICAgfVxuICAgICAgICBncmFwaC50cmlwbGVzLnB1c2gocSlcbiAgICAgIH0pXG4gICAgICBxdWFkc1RvUmVtb3ZlLmZvckVhY2gocSA9PiB7XG4gICAgICAgIGxldCBncmFwaDogR3JhcGggPSBncmFwaHNUb1JlbW92ZU1hcFtxLmdyYXBoLmlkXVxuICAgICAgICBpZiAoIWdyYXBoKSB7XG4gICAgICAgICAgZ3JhcGggPSBuZXcgR3JhcGgocS5ncmFwaClcbiAgICAgICAgICBncmFwaHNUb1JlbW92ZU1hcFtxLmdyYXBoLmlkXSA9IGdyYXBoXG4gICAgICAgICAgZ3JhcGhzVG9SZW1vdmUucHVzaChncmFwaClcbiAgICAgICAgfVxuICAgICAgICBncmFwaC50cmlwbGVzLnB1c2gocSlcbiAgICAgIH0pXG4gICAgICByZXR1cm4gdGhpcy51cGRhdGVHcmFwaHMoZW5kcG9pbnQsIGdyYXBoc1RvQWRkLCBncmFwaHNUb1JlbW92ZSlcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlR3JhcGhzKGVuZHBvaW50OiBzdHJpbmcsIGdyYXBoc1RvQWRkOiBHcmFwaFtdID0gW10sIGdyYXBoc1RvUmVtb3ZlOiBHcmFwaFtdID0gW10pOiBhbmd1bGFyLklQcm9taXNlPGFueT4ge1xuICAgICAgbGV0IGFkZFN0cmluZzogc3RyaW5nID0gZ3JhcGhzVG9BZGQubWFwKGdyYXBoID0+ICdHUkFQSCcgKyBncmFwaC5ncmFwaC5pZCArICd7JyArIGdyYXBoLnRyaXBsZXMubWFwKFNwYXJxbFVwZGF0ZVNlcnZpY2Uuc2VyaWFsaXplKS5qb2luKCcgLiAnKSArICd9Jykuam9pbignJylcbiAgICAgIGxldCByZW1vdmVTdHJpbmc6IHN0cmluZyA9IGdyYXBoc1RvUmVtb3ZlLm1hcChncmFwaCA9PiAnR1JBUEgnICsgZ3JhcGguZ3JhcGguaWQgKyAneycgKyBncmFwaC50cmlwbGVzLm1hcChTcGFycWxVcGRhdGVTZXJ2aWNlLnNlcmlhbGl6ZSkuam9pbignIC4gJykgKyAnfScpLmpvaW4oJycpXG4gICAgICByZXR1cm4gdGhpcy5zcGFycWxTZXJ2aWNlLnVwZGF0ZShlbmRwb2ludCwgU3BhcnFsVXBkYXRlV29ya2VyU2VydmljZS5xdWVyeVRlbXBsYXRlLnJlcGxhY2UoLzxERUxFVEU+L2csIHJlbW92ZVN0cmluZykucmVwbGFjZSgvPElOU0VSVD4vZywgYWRkU3RyaW5nKSkudGhlbihcbiAgICAgICAgKHIpID0+IHRoaXMud29ya2VyV29ya2VyU2VydmljZS5zdHJpcEZ1bmN0aW9ucyhyKVxuICAgICAgKVxuICAgIH1cblxuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

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
    '    <div class="col-md-3" id="left-column">\n' +
    '      <h4>Overview</h4>\n' +
    '      <tree tree="$ctrl.classTree" on-select="$ctrl.alterSelection(treeNode)"></tree>\n' +
    '    </div>\n' +
    '    <div class="col-md-4" id="middle-column">\n' +
    '      <h4>Search</h4>\n' +
    '      <sparql-autocomplete limit="30" by="group" on-select="$ctrl.createItem(result)"></sparql-autocomplete>\n' +
    '    </div>\n' +
    '    <div class="col-md-5" id="right-column">\n' +
    '      <h4>Item</h4>\n' +
    '      <sparql-item item-id="$ctrl.itemId" on-select="$ctrl.setItem(value)"></sparql-item>\n' +
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
    '<script type="text/ng-template" id="sparql-autocomplete-item-popover">\n' +
    '  <sparql-item endpoint="result.datasources[0].endpoint" item-id="result.ids[0]"></sparql-item>\n' +
    '</script>\n' +
    '<div class="form-group has-feedback">\n' +
    '  <input class="form-control" ng-model="query" ng-model-options="{ debounce: 500 }" ng-change="$ctrl.onChange(query)"/><span class="glyphicon glyphicon-refresh fa-spin form-control-feedback" ng-show="$ctrl.queryRunning"></span><span class="danger glyphicon glyphicon-alert form-control-feedback" ng-show="$ctrl.error"></span>\n' +
    '</div>\n' +
    '<div ng-repeat="result in $ctrl.results track by $index">\n' +
    '  <h4>{{result.configuration.title || result.label }}</h4>\n' +
    '  <ul>\n' +
    '    <li ng-repeat="result in result.results track by $index" ng-click="$ctrl.onSelect({result:result})" uib-popover-template="\'sparql-autocomplete-item-popover\'" popover-trigger="mouseenter" popover-placement="right">{{result.matchedLabel.value}}<span ng-if="result.matchedLabel.value !== result.prefLabel.value">-&gt; {{result.prefLabel.value}}</span><span ng-if="result.additionalInformation[\'altLabel\']">&nbsp;(<span ng-repeat="altLabel in result.additionalInformation[\'altLabel\']">{{$last ? altLabel.value : altLabel.value+\', \'}}</span>)</span>&nbsp;[<span ng-repeat="datasource in result.datasources track by $index">{{$last ? datasource.id : datasource.id+\', \'}}</span>]</li>\n' +
    '  </ul>\n' +
    '  <ul>\n' +
    '    <li ng-repeat="group in result.resultsByGroup track by $index"><span class="group-label">{{group.label}}</span>\n' +
    '      <ul>\n' +
    '        <li ng-repeat="result in group.results track by $index" ng-click="$ctrl.onSelect({result:result})" uib-popover-template="\'sparql-autocomplete-item-popover\'" popover-trigger="mouseenter" popover-placement="right">{{result.matchedLabel.value}}<span ng-if="result.matchedLabel.value !== result.prefLabel.value">-&gt; {{result.prefLabel.value}}</span><span ng-if="result.additionalInformation[\'altLabel\']">&nbsp;(<span ng-repeat="altLabel in result.additionalInformation[\'altLabel\']">{{$last ? altLabel.value : altLabel.value+\', \'}}</span>)</span></li>\n' +
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
    '<script type="text/ng-template" id="sparql-item-popover">\n' +
    '  <sparql-item endpoint="$ctrl.endpoint" item-id="value"></sparql-item>\n' +
    '</script>\n' +
    '<h4>{{$ctrl.item.label.value}} ({{$ctrl.item.id}})</h4>\n' +
    '<table class="table table-striped">\n' +
    '  <tr ng-repeat="property in $ctrl.item.properties">\n' +
    '    <th>{{property.label ? property.label.value : property.value}}</th>\n' +
    '    <td><span ng-repeat="value in property.values" ng-click="$ctrl.onSelect({value: value})" uib-popover-template="\'sparql-item-popover\'" popover-trigger="mouseenter" popover-placement="left">{{value.label ? value.label.value : value.value}}{{ $last ? \'\' : \', \' }}</span></td>\n' +
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
