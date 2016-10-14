var fibra;
(function (fibra) {
    'use strict';
    var m = angular.module('fibra', ['http-auth-interceptor', 'ngStorage', 'ui.router', 'ui.bootstrap', 'ui.bootstrap.tpls']);
    m.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/author');
        $stateProvider.state('author', {
            url: '/author',
            template: '<author></author>'
        });
    });
    m.config(function ($localStorageProvider) {
        $localStorageProvider.setKeyPrefix('fibra-');
    });
    m.value('workerServiceConfiguration', {
        appName: 'fibra',
        workerThreads: 8,
        importScripts: [
            'scripts/worker-025cf6b052.js'
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvYXBwLWNvbmZpZ3VyYXRpb24tdWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBVSxLQUFLLENBbUVkO0FBbkVELFdBQVUsS0FBSyxFQUFDLENBQUM7SUFDZixZQUFZLENBQUE7SUFZWixJQUFJLENBQUMsR0FBb0IsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBRSx1QkFBdUIsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFHLGNBQWMsRUFBRSxtQkFBbUIsQ0FBRSxDQUFDLENBQUE7SUFDN0ksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFDLGNBQXlDLEVBQUUsa0JBQWlEO1FBQ3BHLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUN2QyxjQUFjLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtZQUMzQixHQUFHLEVBQUUsU0FBUztZQUNkLFFBQVEsRUFBRSxtQkFBbUI7U0FDOUIsQ0FBQyxDQUFBO0lBQ04sQ0FBQyxDQUFDLENBQUE7SUFDRixDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUMscUJBQXFCO1FBQzdCLHFCQUFxQixDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMvQyxDQUFDLENBQUMsQ0FBQTtJQUNGLENBQUMsQ0FBQyxLQUFLLENBQUMsNEJBQTRCLEVBQUU7UUFDcEMsT0FBTyxFQUFFLE9BQU87UUFDaEIsYUFBYSxFQUFFLENBQUM7UUFDaEIsYUFBYSxFQUFFO1lBQ2IseUNBQXlDO1lBQ3pDLGlFQUFpRTtZQUNqRSxnRUFBZ0U7WUFDaEUscUNBQXFDO1lBQ3JDLHFDQUFxQztZQUNyQywyQkFBMkI7WUFDM0Isa0NBQWtDO1lBQ2xDLDZCQUE2QjtZQUM3QixnQkFBZ0I7WUFDaEIsZ0NBQWdDO1lBQ2hDLHdDQUF3QztZQUN4QyxnQ0FBZ0M7WUFDaEMsa0NBQWtDO1lBQ2xDLDJCQUEyQjtTQUMxQjtLQUNKLENBQUMsQ0FBQTtJQUNGLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxVQUEyQyxFQUFFLGFBQWtCLEVBQUUsS0FBMkIsRUFBRSxXQUEwQyxFQUFFLGFBQTRCO1FBQzNLLFVBQVUsQ0FBQyxRQUFRLEdBQUc7WUFDcEIsUUFBUSxFQUFFLEtBQUs7WUFDZixRQUFRLEVBQUUsU0FBUztZQUNuQixRQUFRLEVBQUUsU0FBUztTQUNwQixDQUFBO1FBQ0QsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDaEMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFRLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxhQUFhLENBQUE7WUFDN0UsYUFBYSxDQUFDLFVBQVUsQ0FBQyx5QkFBeUIsRUFBRSxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUE7UUFDbEYsQ0FBQztRQUNELFVBQVUsQ0FBQyxPQUFPLEdBQUc7WUFDbkIsVUFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFBO1lBQ3BDLGFBQWEsQ0FBQyxhQUFhLEdBQUcsUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxHQUFHLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUNoSCxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQVEsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLEdBQUcsYUFBYSxDQUFDLGFBQWEsQ0FBQTtZQUM3RSxhQUFhLENBQUMsVUFBVSxDQUFDLHlCQUF5QixFQUFFLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQTtZQUNoRixXQUFXLENBQUMsY0FBYyxFQUFFLENBQUE7UUFDOUIsQ0FBQyxDQUFBO1FBQ0QsVUFBVSxDQUFDLFdBQVcsR0FBRztZQUN2QixVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUE7WUFDcEMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxFQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUMsRUFBRSx5QkFBeUIsQ0FBQyxDQUFBO1FBQ3RFLENBQUMsQ0FBQTtRQUNELFVBQVUsQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEVBQUUsY0FBTSxPQUFBLFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLElBQUksRUFBbkMsQ0FBbUMsQ0FBQyxDQUFBO0lBQ3ZGLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxFQW5FUyxLQUFLLEtBQUwsS0FBSyxRQW1FZCIsImZpbGUiOiJzY3JpcHRzL2FwcC1jb25maWd1cmF0aW9uLXVpLmpzIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIGZpYnJhIHtcbiAgJ3VzZSBzdHJpY3QnXG5cbiAgaW50ZXJmYWNlIElBdXRoZW50aWNhdGlvblJvb3RTY29wZVNlcnZpY2UgZXh0ZW5kcyBhbmd1bGFyLklSb290U2NvcGVTZXJ2aWNlIHtcbiAgICBzZXRBdXRoOiAoKSA9PiB2b2lkXG4gICAgZGlzbWlzc0F1dGg6ICgpID0+IHZvaWRcbiAgICBhdXRoSW5mbzoge1xuICAgICAgYXV0aE9wZW46IGJvb2xlYW5cbiAgICAgIHVzZXJuYW1lOiBzdHJpbmcgfCB1bmRlZmluZWRcbiAgICAgIHBhc3N3b3JkOiBzdHJpbmcgfCB1bmRlZmluZWRcbiAgICB9XG4gIH1cblxuICBsZXQgbTogYW5ndWxhci5JTW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2ZpYnJhJywgWyAnaHR0cC1hdXRoLWludGVyY2VwdG9yJywgJ25nU3RvcmFnZScsICd1aS5yb3V0ZXInLCAgJ3VpLmJvb3RzdHJhcCcsICd1aS5ib290c3RyYXAudHBscycgXSlcbiAgbS5jb25maWcoKCRzdGF0ZVByb3ZpZGVyOiBhbmd1bGFyLnVpLklTdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXI6IGFuZ3VsYXIudWkuSVVybFJvdXRlclByb3ZpZGVyKSA9PiB7XG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL2F1dGhvcicpXG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2F1dGhvcicsIHtcbiAgICAgICAgdXJsOiAnL2F1dGhvcicsXG4gICAgICAgIHRlbXBsYXRlOiAnPGF1dGhvcj48L2F1dGhvcj4nXG4gICAgICB9KVxuICB9KVxuICBtLmNvbmZpZygoJGxvY2FsU3RvcmFnZVByb3ZpZGVyKSA9PiB7XG4gICAgJGxvY2FsU3RvcmFnZVByb3ZpZGVyLnNldEtleVByZWZpeCgnZmlicmEtJyk7XG4gIH0pXG4gIG0udmFsdWUoJ3dvcmtlclNlcnZpY2VDb25maWd1cmF0aW9uJywge1xuICAgIGFwcE5hbWU6ICdmaWJyYScsXG4gICAgd29ya2VyVGhyZWFkczogOCxcbiAgICBpbXBvcnRTY3JpcHRzOiBbXG4gICAgICAnYm93ZXJfY29tcG9uZW50cy9hbmd1bGFyL2FuZ3VsYXIubWluLmpzJyxcbiAgICAgICdib3dlcl9jb21wb25lbnRzL2FuZ3VsYXItaHR0cC1hdXRoL3NyYy9odHRwLWF1dGgtaW50ZXJjZXB0b3IuanMnLFxuICAgICAgJ2Jvd2VyX2NvbXBvbmVudHMvYW5ndWxhci1zcGFycWwtc2VydmljZS9kaXN0L3NwYXJxbC1zZXJ2aWNlLmpzJyxcbiAgICAgICdzY3JpcHRzL2FwcC1jb25maWd1cmF0aW9uLXdvcmtlci5qcycsXG4gICAgICAnc2NyaXB0cy9hcHAtY29uZmlndXJhdGlvbi1jb21tb24uanMnLFxuICAgICAgJ3NjcmlwdHMvd29ya2VyLXNlcnZpY2UuanMnLFxuICAgICAgJ3NjcmlwdHMvY29uZmlndXJhdGlvbi1zZXJ2aWNlLmpzJyxcbiAgICAgICdzY3JpcHRzL2NvbGxlY3Rpb24tdXRpbHMuanMnLFxuICAgICAgJ3NjcmlwdHMvcmRmLmpzJyxcbiAgICAgICdzY3JpcHRzL3NwYXJxbC1pdGVtLXNlcnZpY2UuanMnLFxuICAgICAgJ3NjcmlwdHMvc3BhcnFsLWF1dG9jb21wbGV0ZS1zZXJ2aWNlLmpzJyxcbiAgICAgICdzY3JpcHRzL3NwYXJxbC10cmVlLXNlcnZpY2UuanMnLFxuICAgICAgJ3NjcmlwdHMvc3BhcnFsLXVwZGF0ZS1zZXJ2aWNlLmpzJyxcbiAgICAgICdzY3JpcHRzL3RyZWUtY29tcG9uZW50LmpzJ1xuICAgICAgXVxuICB9KVxuICBtLnJ1bigoJHJvb3RTY29wZTogSUF1dGhlbnRpY2F0aW9uUm9vdFNjb3BlU2VydmljZSwgJGxvY2FsU3RvcmFnZTogYW55LCAkaHR0cDogYW5ndWxhci5JSHR0cFNlcnZpY2UsIGF1dGhTZXJ2aWNlOiBhbmd1bGFyLmh0dHBBdXRoLklBdXRoU2VydmljZSwgd29ya2VyU2VydmljZTogV29ya2VyU2VydmljZSkgPT4ge1xuICAgICRyb290U2NvcGUuYXV0aEluZm8gPSB7XG4gICAgICBhdXRoT3BlbjogZmFsc2UsXG4gICAgICB1c2VybmFtZTogdW5kZWZpbmVkLFxuICAgICAgcGFzc3dvcmQ6IHVuZGVmaW5lZFxuICAgIH1cbiAgICBpZiAoJGxvY2FsU3RvcmFnZS5hdXRob3JpemF0aW9uKSB7XG4gICAgICAkaHR0cC5kZWZhdWx0cy5oZWFkZXJzIS5jb21tb25bJ0F1dGhvcml6YXRpb24nXSA9ICRsb2NhbFN0b3JhZ2UuYXV0aG9yaXphdGlvblxuICAgICAgd29ya2VyU2VydmljZS4kYnJvYWRjYXN0KCdtYWluOmF1dGgtbG9naW5BdXRoSW5mbycsICRsb2NhbFN0b3JhZ2UuYXV0aG9yaXphdGlvbilcbiAgICB9XG4gICAgJHJvb3RTY29wZS5zZXRBdXRoID0gKCkgPT4ge1xuICAgICAgJHJvb3RTY29wZS5hdXRoSW5mby5hdXRoT3BlbiA9IGZhbHNlXG4gICAgICAkbG9jYWxTdG9yYWdlLmF1dGhvcml6YXRpb24gPSAnQmFzaWMgJyArIGJ0b2EoJHJvb3RTY29wZS5hdXRoSW5mby51c2VybmFtZSArICc6JyArICRyb290U2NvcGUuYXV0aEluZm8ucGFzc3dvcmQpXG4gICAgICAkaHR0cC5kZWZhdWx0cy5oZWFkZXJzIS5jb21tb25bJ0F1dGhvcml6YXRpb24nXSA9ICRsb2NhbFN0b3JhZ2UuYXV0aG9yaXphdGlvblxuICAgICAgd29ya2VyU2VydmljZS4kYnJvYWRjYXN0KCdtYWluOmF1dGgtbG9naW5BdXRoSW5mbycsICRsb2NhbFN0b3JhZ2UuYXV0aG9yaXphdGlvbilcbiAgICAgIGF1dGhTZXJ2aWNlLmxvZ2luQ29uZmlybWVkKClcbiAgICB9XG4gICAgJHJvb3RTY29wZS5kaXNtaXNzQXV0aCA9ICgpID0+IHtcbiAgICAgICRyb290U2NvcGUuYXV0aEluZm8uYXV0aE9wZW4gPSBmYWxzZVxuICAgICAgYXV0aFNlcnZpY2UubG9naW5DYW5jZWxsZWQoe3N0YXR1czogNDAxfSwgJ0F1dGhlbnRpY2F0aW9uIHJlcXVpcmVkJylcbiAgICB9XG4gICAgJHJvb3RTY29wZS4kb24oJ2V2ZW50OmF1dGgtbG9naW5SZXF1aXJlZCcsICgpID0+ICRyb290U2NvcGUuYXV0aEluZm8uYXV0aE9wZW4gPSB0cnVlKVxuICB9KVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

var fibra;
(function (fibra) {
    'use strict';
    var m = angular.module('fibra');
    m.service('workerServicePrototypeMappingConfiguration', function () {
        return {
            'Object': Object.prototype,
            'Configuration': fibra.Configuration.prototype,
            'NamedNode': fibra.NamedNode.prototype,
            'Node': fibra.Node.prototype,
            'DataModelConfiguration': fibra.DataModelConfiguration.prototype,
            'Item': fibra.Item.prototype,
            'PropertyToValues': fibra.PropertyToValues.prototype,
            'SourcedNodePlusLabel': fibra.SourcedNodePlusLabel.prototype
        };
    });
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvYXBwLWNvbmZpZ3VyYXRpb24tY29tbW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQVUsS0FBSyxDQWdCZDtBQWhCRCxXQUFVLEtBQUssRUFBQyxDQUFDO0lBQ2YsWUFBWSxDQUFBO0lBQ1osSUFBSSxDQUFDLEdBQW9CLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7SUFFaEQsQ0FBQyxDQUFDLE9BQU8sQ0FBQyw0Q0FBNEMsRUFBRTtRQUN0RCxNQUFNLENBQUM7WUFDTCxRQUFRLEVBQUUsTUFBTSxDQUFDLFNBQVM7WUFDMUIsZUFBZSxFQUFFLG1CQUFhLENBQUMsU0FBUztZQUN4QyxXQUFXLEVBQUUsZUFBUyxDQUFDLFNBQVM7WUFDaEMsTUFBTSxFQUFFLFVBQUksQ0FBQyxTQUFTO1lBQ3RCLHdCQUF3QixFQUFFLDRCQUFzQixDQUFDLFNBQVM7WUFDMUQsTUFBTSxFQUFFLFVBQUksQ0FBQyxTQUFTO1lBQ3RCLGtCQUFrQixFQUFFLHNCQUFnQixDQUFDLFNBQVM7WUFDOUMsc0JBQXNCLEVBQUUsMEJBQW9CLENBQUMsU0FBUztTQUN2RCxDQUFBO0lBQ0gsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLEVBaEJTLEtBQUssS0FBTCxLQUFLLFFBZ0JkIiwiZmlsZSI6InNjcmlwdHMvYXBwLWNvbmZpZ3VyYXRpb24tY29tbW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIGZpYnJhIHtcbiAgJ3VzZSBzdHJpY3QnXG4gIGxldCBtOiBhbmd1bGFyLklNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnZmlicmEnKVxuXG4gIG0uc2VydmljZSgnd29ya2VyU2VydmljZVByb3RvdHlwZU1hcHBpbmdDb25maWd1cmF0aW9uJywgZnVuY3Rpb24oKToge30ge1xuICAgIHJldHVybiB7XG4gICAgICAnT2JqZWN0JzogT2JqZWN0LnByb3RvdHlwZSxcbiAgICAgICdDb25maWd1cmF0aW9uJzogQ29uZmlndXJhdGlvbi5wcm90b3R5cGUsXG4gICAgICAnTmFtZWROb2RlJzogTmFtZWROb2RlLnByb3RvdHlwZSxcbiAgICAgICdOb2RlJzogTm9kZS5wcm90b3R5cGUsXG4gICAgICAnRGF0YU1vZGVsQ29uZmlndXJhdGlvbic6IERhdGFNb2RlbENvbmZpZ3VyYXRpb24ucHJvdG90eXBlLFxuICAgICAgJ0l0ZW0nOiBJdGVtLnByb3RvdHlwZSxcbiAgICAgICdQcm9wZXJ0eVRvVmFsdWVzJzogUHJvcGVydHlUb1ZhbHVlcy5wcm90b3R5cGUsXG4gICAgICAnU291cmNlZE5vZGVQbHVzTGFiZWwnOiBTb3VyY2VkTm9kZVBsdXNMYWJlbC5wcm90b3R5cGVcbiAgICB9XG4gIH0pXG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

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
        function AuthorComponentController(configurationService, sparqlTreeService, sparqlItemService, fibraService) {
            var _this = this;
            this.configurationService = configurationService;
            this.sparqlItemService = sparqlItemService;
            this.fibraService = fibraService;
            this.endpoints = configurationService.configuration.remoteEndpoints();
            this.classTreePromise = sparqlTreeService.getTree(this.configurationService.configuration.primaryEndpoint.endpoint.value, fibra.SparqlTreeService.getClassTreeQuery);
            this.classTreePromise.then(function (c) { return _this.classTree = c; });
            this.fibraService.on('change', function () {
                _this.classTreePromise = sparqlTreeService.getTree(_this.configurationService.configuration.primaryEndpoint.endpoint.value, fibra.SparqlTreeService.getClassTreeQuery);
                return _this.classTreePromise.then(function (c) {
                    _this.classTree = c;
                    return 'ok';
                });
            });
        }
        AuthorComponentController.prototype.createItem = function (item) {
            var _this = this;
            var prefLabel = new fibra.PropertyToValues(fibra.SKOS.prefLabel);
            prefLabel.values.push(item.prefLabel);
            console.log(item);
            var type = new fibra.PropertyToValues(fibra.RDF.type);
            var typeWithLabel = new fibra.SourcedNodePlusLabel(item.additionalInformation['type'][0], item.additionalInformation['typeLabel'][0]);
            type.values.push(typeWithLabel);
            var prom = this.sparqlItemService.createNewItem(item.ids, [prefLabel, type]);
            prom.then(function () {
                _this.fibraService.dispatch('change');
            });
            return prom;
        };
        return AuthorComponentController;
    }());/*<auto_generate>*/angular.module('fibra').controller('AuthorComponentController',['configurationService','sparqlTreeService','sparqlItemService','fibraService',function(){return new (Function.prototype.bind.apply(AuthorComponentController,[null].concat(Array.prototype.slice.apply(arguments))));}]);/*</auto_generate>*/
    fibra.AuthorComponentController = AuthorComponentController;
    var AuthorComponent = (function () {
        function AuthorComponent() {
            this.controller = AuthorComponentController;
            this.templateUrl = 'partials/author.html';
        }
        return AuthorComponent;
    }());/*<auto_generate>*/angular.module('fibra').component('author',new AuthorComponent());/*</auto_generate>*/
    fibra.AuthorComponent = AuthorComponent;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvYXV0aG9yLWNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFVLEtBQUssQ0FrRGQ7QUFsREQsV0FBVSxLQUFLLEVBQUMsQ0FBQztJQUNmLFlBQVksQ0FBQTtJQUVaO1FBQ0UsK0JBQW1CLFFBQWdCLEVBQVMsYUFBcUI7WUFBOUMsYUFBUSxHQUFSLFFBQVEsQ0FBUTtZQUFTLGtCQUFhLEdBQWIsYUFBYSxDQUFRO1FBQUcsQ0FBQztRQUN2RSw0QkFBQztJQUFELENBRkEsQUFFQyxJQUFBO0lBRUQ7UUFxQkUsbUNBQW9CLG9CQUEwQyxFQUNsRCxpQkFBb0MsRUFDNUIsaUJBQW9DLEVBQ3BDLFlBQTBCO1lBeEJoRCxpQkFxQ0M7WUFoQnFCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7WUFFMUMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtZQUNwQyxpQkFBWSxHQUFaLFlBQVksQ0FBYztZQUM1QyxJQUFJLENBQUMsU0FBUyxHQUFHLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxlQUFlLEVBQUUsQ0FBQTtZQUNyRSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsdUJBQWlCLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtZQUM5SixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsS0FBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLEVBQWxCLENBQWtCLENBQUMsQ0FBQTtZQUVuRCxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUU7Z0JBQzdCLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsS0FBSSxDQUFDLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSx1QkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO2dCQUM5SixNQUFNLENBQUMsS0FBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxVQUFBLENBQUM7b0JBQ2pDLEtBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFBO29CQUNsQixNQUFNLENBQUMsSUFBSSxDQUFBO2dCQUNiLENBQUMsQ0FBQyxDQUFBO1lBQ0osQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDO1FBN0JNLDhDQUFVLEdBQWpCLFVBQWtCLElBQVk7WUFBOUIsaUJBWUM7WUFYQyxJQUFJLFNBQVMsR0FBNEIsSUFBSSxzQkFBZ0IsQ0FBQyxVQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7WUFDN0UsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1lBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDakIsSUFBSSxJQUFJLEdBQTRCLElBQUksc0JBQWdCLENBQUMsU0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ2xFLElBQUksYUFBYSxHQUFtQixJQUFJLDBCQUFvQixDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUMvSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtZQUMvQixJQUFJLElBQUksR0FBNEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUE7WUFDckcsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDUixLQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUN0QyxDQUFDLENBQUMsQ0FBQTtZQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUE7UUFDYixDQUFDO1FBa0JILGdDQUFDO0lBQUQsQ0FyQ0EsQUFxQ0MsSUFBQTtJQXJDWSwrQkFBeUIsNEJBcUNyQyxDQUFBO0lBRUQ7UUFBQTtZQUNXLGVBQVUsR0FBRyx5QkFBeUIsQ0FBQTtZQUN0QyxnQkFBVyxHQUFXLHNCQUFzQixDQUFBO1FBQ3ZELENBQUM7UUFBRCxzQkFBQztJQUFELENBSEEsQUFHQyxJQUFBO0lBSFkscUJBQWUsa0JBRzNCLENBQUE7QUFDSCxDQUFDLEVBbERTLEtBQUssS0FBTCxLQUFLLFFBa0RkIiwiZmlsZSI6InNjcmlwdHMvYXV0aG9yLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBmaWJyYSB7XG4gICd1c2Ugc3RyaWN0J1xuXG4gIGNsYXNzIFRyZWVWaWV3Q29uZmlndXJhdGlvbiB7XG4gICAgY29uc3RydWN0b3IocHVibGljIGVuZHBvaW50OiBzdHJpbmcsIHB1YmxpYyBxdWVyeVRlbXBsYXRlOiBzdHJpbmcpIHt9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgQXV0aG9yQ29tcG9uZW50Q29udHJvbGxlciB7XG5cbiAgICBwdWJsaWMgZW5kcG9pbnRzOiBFbmRwb2ludENvbmZpZ3VyYXRpb25bXVxuICAgIHB1YmxpYyBjbGFzc1RyZWU6IFRyZWVOb2RlW11cbiAgICBwdWJsaWMgY2xhc3NUcmVlUHJvbWlzZTogYW5ndWxhci5JUHJvbWlzZTxUcmVlTm9kZVtdPlxuICAgIHB1YmxpYyBzZWxlY3RlZEl0ZW06IElOb2RlXG5cbiAgICBwdWJsaWMgY3JlYXRlSXRlbShpdGVtOiBSZXN1bHQpOiBhbmd1bGFyLklQcm9taXNlPElOb2RlPiB7XG4gICAgICBsZXQgcHJlZkxhYmVsOiBQcm9wZXJ0eVRvVmFsdWVzPElOb2RlPiA9IG5ldyBQcm9wZXJ0eVRvVmFsdWVzKFNLT1MucHJlZkxhYmVsKVxuICAgICAgcHJlZkxhYmVsLnZhbHVlcy5wdXNoKGl0ZW0ucHJlZkxhYmVsKVxuICAgICAgY29uc29sZS5sb2coaXRlbSlcbiAgICAgIGxldCB0eXBlOiBQcm9wZXJ0eVRvVmFsdWVzPElOb2RlPiA9IG5ldyBQcm9wZXJ0eVRvVmFsdWVzKFJERi50eXBlKVxuICAgICAgbGV0IHR5cGVXaXRoTGFiZWw6IElOb2RlUGx1c0xhYmVsID0gbmV3IFNvdXJjZWROb2RlUGx1c0xhYmVsKGl0ZW0uYWRkaXRpb25hbEluZm9ybWF0aW9uWyd0eXBlJ11bMF0sIGl0ZW0uYWRkaXRpb25hbEluZm9ybWF0aW9uWyd0eXBlTGFiZWwnXVswXSlcbiAgICAgIHR5cGUudmFsdWVzLnB1c2godHlwZVdpdGhMYWJlbClcbiAgICAgIGxldCBwcm9tOiBhbmd1bGFyLklQcm9taXNlPElOb2RlPiA9IHRoaXMuc3BhcnFsSXRlbVNlcnZpY2UuY3JlYXRlTmV3SXRlbShpdGVtLmlkcywgW3ByZWZMYWJlbCwgdHlwZV0pXG4gICAgICBwcm9tLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLmZpYnJhU2VydmljZS5kaXNwYXRjaCgnY2hhbmdlJylcbiAgICAgIH0pXG4gICAgICByZXR1cm4gcHJvbVxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uZmlndXJhdGlvblNlcnZpY2U6IENvbmZpZ3VyYXRpb25TZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHNwYXJxbFRyZWVTZXJ2aWNlOiBTcGFycWxUcmVlU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHNwYXJxbEl0ZW1TZXJ2aWNlOiBTcGFycWxJdGVtU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGZpYnJhU2VydmljZTogRmlicmFTZXJ2aWNlKSB7XG4gICAgICB0aGlzLmVuZHBvaW50cyA9IGNvbmZpZ3VyYXRpb25TZXJ2aWNlLmNvbmZpZ3VyYXRpb24ucmVtb3RlRW5kcG9pbnRzKClcbiAgICAgIHRoaXMuY2xhc3NUcmVlUHJvbWlzZSA9IHNwYXJxbFRyZWVTZXJ2aWNlLmdldFRyZWUodGhpcy5jb25maWd1cmF0aW9uU2VydmljZS5jb25maWd1cmF0aW9uLnByaW1hcnlFbmRwb2ludC5lbmRwb2ludC52YWx1ZSwgU3BhcnFsVHJlZVNlcnZpY2UuZ2V0Q2xhc3NUcmVlUXVlcnkpXG4gICAgICB0aGlzLmNsYXNzVHJlZVByb21pc2UudGhlbihjID0+IHRoaXMuY2xhc3NUcmVlID0gYylcblxuICAgICAgdGhpcy5maWJyYVNlcnZpY2Uub24oJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICAgdGhpcy5jbGFzc1RyZWVQcm9taXNlID0gc3BhcnFsVHJlZVNlcnZpY2UuZ2V0VHJlZSh0aGlzLmNvbmZpZ3VyYXRpb25TZXJ2aWNlLmNvbmZpZ3VyYXRpb24ucHJpbWFyeUVuZHBvaW50LmVuZHBvaW50LnZhbHVlLCBTcGFycWxUcmVlU2VydmljZS5nZXRDbGFzc1RyZWVRdWVyeSlcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xhc3NUcmVlUHJvbWlzZS50aGVuKGMgPT4ge1xuICAgICAgICAgIHRoaXMuY2xhc3NUcmVlID0gY1xuICAgICAgICAgIHJldHVybiAnb2snXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBBdXRob3JDb21wb25lbnQgaW1wbGVtZW50cyBhbmd1bGFyLklDb21wb25lbnRPcHRpb25zIHtcbiAgICAgIHB1YmxpYyBjb250cm9sbGVyID0gQXV0aG9yQ29tcG9uZW50Q29udHJvbGxlclxuICAgICAgcHVibGljIHRlbXBsYXRlVXJsOiBzdHJpbmcgPSAncGFydGlhbHMvYXV0aG9yLmh0bWwnXG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var fibra;
(function (fibra) {
    'use strict';
    var EMap = (function () {
        function EMap(create) {
            if (create === void 0) { create = function () { return {}; }; }
            this.create = create;
            this.s = {};
        }
        EMap.prototype.has = function (key) {
            return this.s[key] !== undefined;
        };
        EMap.prototype.goc = function (key, create) {
            if (!this.has(key))
                this.set(key, create ? create(key) : this.create(key));
            return this.get(key);
        };
        EMap.prototype.set = function (key, value) {
            this.s[key] = value;
            return this;
        };
        EMap.prototype.get = function (key) {
            return this.s[key];
        };
        EMap.prototype.remove = function (key) {
            var contained = this.has(key);
            delete this.s[key];
            return contained;
        };
        EMap.prototype.sets = function (obj) {
            for (var key in obj)
                this.set(key, obj[key]);
            return this;
        };
        EMap.prototype.setm = function (obj) {
            for (var key in obj)
                this.set(key, obj[key]);
            return this;
        };
        EMap.prototype.clear = function () {
            this.s = {};
            return this;
        };
        EMap.prototype.keys = function () {
            var ret = [];
            for (var key in this.s)
                ret.push(key);
            return ret;
        };
        EMap.prototype.values = function () {
            var ret = [];
            for (var key in this.s)
                ret.push(this.s[key]);
            return ret;
        };
        EMap.prototype.entries = function () {
            var ret = [];
            for (var key in this.s)
                ret.push({ key: key, value: this.s[key] });
            return ret;
        };
        EMap.prototype.each = function (func) {
            for (var key in this.s)
                func(this.s[key], key, this);
            return undefined;
        };
        EMap.prototype.size = function () {
            var size = 0;
            /*tslint:disable no-unused-variable*/
            for (var key in this.s)
                size++;
            /*tslint:enable no-unused-variable*/
            return size;
        };
        EMap.prototype.empty = function () {
            return this.size() === 0;
        };
        return EMap;
    }());
    fibra.EMap = EMap;
    var IdentitySet = (function () {
        function IdentitySet() {
            this.a = [];
        }
        IdentitySet.prototype.clear = function () {
            this.a = [];
            return this;
        };
        IdentitySet.prototype.has = function (key) {
            return this.a.indexOf(key) !== -1;
        };
        IdentitySet.prototype.add = function (key) {
            if (this.has(key))
                return this;
            this.a.push(key);
            return this;
        };
        IdentitySet.prototype.adda = function (arr) {
            var _this = this;
            arr.forEach(function (v) { return _this.add(v); });
            return this;
        };
        IdentitySet.prototype.adds = function (oset) {
            var _this = this;
            oset.each(function (v) { return _this.add(v); });
            return this;
        };
        IdentitySet.prototype.remove = function (key) {
            var index = this.a.indexOf(key);
            if (index === -1)
                return false;
            this.a.splice(index, 1);
            return true;
        };
        IdentitySet.prototype.each = function (func) {
            for (var _i = 0, _a = this.a; _i < _a.length; _i++) {
                var value = _a[_i];
                func(value, value, this);
            }
            return undefined;
        };
        IdentitySet.prototype.size = function () {
            return this.a.length;
        };
        IdentitySet.prototype.empty = function () {
            return this.size() === 0;
        };
        IdentitySet.prototype.values = function () {
            return this.a;
        };
        return IdentitySet;
    }());
    fibra.IdentitySet = IdentitySet;
    var StringSet = (function () {
        function StringSet() {
            this.s = {};
        }
        StringSet.prototype.clear = function () {
            this.s = {};
            return this;
        };
        StringSet.prototype.has = function (key) {
            return this.s[key] !== undefined;
        };
        StringSet.prototype.add = function (key) {
            this.s[key] = key;
            return this;
        };
        StringSet.prototype.adda = function (arr) {
            var _this = this;
            arr.forEach(function (str) { return _this.add(str); });
            return this;
        };
        StringSet.prototype.adds = function (oset) {
            var _this = this;
            oset.each(function (str) { return _this.add(str); });
            return this;
        };
        StringSet.prototype.remove = function (key) {
            var contained = this.has(key);
            delete this.s[key];
            return contained;
        };
        StringSet.prototype.each = function (func) {
            for (var key in this.s)
                func(this.s[key], key, this);
            return undefined;
        };
        StringSet.prototype.size = function () {
            var size = 0;
            /*tslint:disable no-unused-variable*/
            for (var key in this.s)
                size++;
            /*tslint:enable no-unused-variable*/
            return size;
        };
        StringSet.prototype.empty = function () {
            return this.size() === 0;
        };
        StringSet.prototype.values = function () {
            var ret = [];
            for (var key in this.s)
                ret.push(key);
            return ret;
        };
        return StringSet;
    }());
    fibra.StringSet = StringSet;
    var EOMap = (function (_super) {
        __extends(EOMap, _super);
        function EOMap(create) {
            _super.call(this, create);
            this.a = [];
        }
        EOMap.prototype.goc = function (key, create) {
            if (!this.has(key))
                this.set(key, create ? create(key) : this.create(key));
            return this.get(key);
        };
        EOMap.prototype.set = function (key, value) {
            if (!this.has(key)) {
                _super.prototype.set.call(this, key, value);
                this.a.push(value);
            }
            return this;
        };
        EOMap.prototype.remove = function (key) {
            var value = this.get(key);
            if (value !== undefined) {
                _super.prototype.remove.call(this, key);
                this.a.splice(this.a.indexOf(value), 1);
            }
            return value !== undefined;
        };
        EOMap.prototype.size = function () {
            return this.a.length;
        };
        EOMap.prototype.values = function () {
            return this.a;
        };
        EOMap.prototype.clear = function () {
            _super.prototype.clear.call(this);
            this.a = [];
            return this;
        };
        return EOMap;
    }(EMap));
    fibra.EOMap = EOMap;
    var OStringSet = (function (_super) {
        __extends(OStringSet, _super);
        function OStringSet() {
            _super.apply(this, arguments);
            this.a = [];
        }
        OStringSet.prototype.add = function (key) {
            if (!this.has(key)) {
                _super.prototype.add.call(this, key);
                this.a.push(key);
            }
            return this;
        };
        OStringSet.prototype.remove = function (key) {
            var contained = _super.prototype.remove.call(this, key);
            if (contained)
                this.a.splice(this.a.indexOf(key), 1);
            return contained;
        };
        OStringSet.prototype.size = function () {
            return this.a.length;
        };
        OStringSet.prototype.values = function () {
            return this.a;
        };
        OStringSet.prototype.clear = function () {
            _super.prototype.clear.call(this);
            this.a = [];
            return this;
        };
        return OStringSet;
    }(StringSet));
    fibra.OStringSet = OStringSet;
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
    function cpushs(arr, obj, obj2) {
        for (var key in obj2)
            cpush(arr, obj, key, obj2[key]);
    }
    fibra.cpushs = cpushs;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvY29sbGVjdGlvbi11dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLElBQVUsS0FBSyxDQWtRZDtBQWxRRCxXQUFVLEtBQUssRUFBQyxDQUFDO0lBQ2YsWUFBWSxDQUFBO0lBRVo7UUFJRSxjQUFzQixNQUFvRDtZQUE5RCxzQkFBOEQsR0FBOUQsU0FBd0MsY0FBUSxNQUFNLENBQUksRUFBRSxDQUFBLENBQUMsQ0FBQztZQUFwRCxXQUFNLEdBQU4sTUFBTSxDQUE4QztZQUZuRSxNQUFDLEdBQXNCLEVBQUUsQ0FBQTtRQUU2QyxDQUFDO1FBRXZFLGtCQUFHLEdBQVYsVUFBVyxHQUFXO1lBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVMsQ0FBQTtRQUNsQyxDQUFDO1FBQ00sa0JBQUcsR0FBVixVQUFXLEdBQVcsRUFBRSxNQUE0QjtZQUNsRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1lBQ3hELE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ3RCLENBQUM7UUFDTSxrQkFBRyxHQUFWLFVBQVcsR0FBVyxFQUFFLEtBQVE7WUFDOUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUE7WUFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQTtRQUNiLENBQUM7UUFDTSxrQkFBRyxHQUFWLFVBQVcsR0FBVztZQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNwQixDQUFDO1FBQ00scUJBQU0sR0FBYixVQUFjLEdBQVc7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QUFFLEdBQVEsRUFBRSxNQUE0QjtRQUNqRyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUMzQixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBTSxFQUFFLENBQUE7WUFDdkMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUNwQixDQUFDO1FBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNqQixDQUFDO0lBTmUsVUFBSSxPQU1uQixDQUFBO0lBRUQsZUFBeUIsR0FBUSxFQUFFLEdBQXNCLEVBQUUsR0FBVyxFQUFFLEtBQVE7UUFDOUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQTtZQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ2pCLENBQUM7SUFDSCxDQUFDO0lBTGUsV0FBSyxRQUtwQixDQUFBO0lBRUQsZ0JBQTBCLEdBQVEsRUFBRSxHQUFzQixFQUFFLElBQXVCO1FBQ2pGLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQztZQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUN2RCxDQUFDO0lBRmUsWUFBTSxTQUVyQixDQUFBO0FBRUgsQ0FBQyxFQWxRUyxLQUFLLEtBQUwsS0FBSyxRQWtRZCIsImZpbGUiOiJzY3JpcHRzL2NvbGxlY3Rpb24tdXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgZmlicmEge1xuICAndXNlIHN0cmljdCdcblxuICBleHBvcnQgY2xhc3MgRU1hcDxWPiBpbXBsZW1lbnRzIGQzLk1hcDxWPiB7XG5cbiAgICBwdWJsaWMgczoge1tpZDogc3RyaW5nXTogVn0gPSB7fVxuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIGNyZWF0ZTogKGtleT86IHN0cmluZykgPT4gViA9ICgpID0+IHsgcmV0dXJuIDxWPnt9IH0pIHt9XG5cbiAgICBwdWJsaWMgaGFzKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICByZXR1cm4gdGhpcy5zW2tleV0gIT09IHVuZGVmaW5lZFxuICAgIH1cbiAgICBwdWJsaWMgZ29jKGtleTogc3RyaW5nLCBjcmVhdGU/OiAoa2V5Pzogc3RyaW5nKSA9PiBWKTogViB7XG4gICAgICBpZiAoIXRoaXMuaGFzKGtleSkpXG4gICAgICAgIHRoaXMuc2V0KGtleSwgY3JlYXRlID8gY3JlYXRlKGtleSkgOiB0aGlzLmNyZWF0ZShrZXkpKVxuICAgICAgcmV0dXJuIHRoaXMuZ2V0KGtleSlcbiAgICB9XG4gICAgcHVibGljIHNldChrZXk6IHN0cmluZywgdmFsdWU6IFYpOiB0aGlzIHtcbiAgICAgIHRoaXMuc1trZXldID0gdmFsdWVcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICAgIHB1YmxpYyBnZXQoa2V5OiBzdHJpbmcpOiBWIHtcbiAgICAgIHJldHVybiB0aGlzLnNba2V5XVxuICAgIH1cbiAgICBwdWJsaWMgcmVtb3ZlKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICBsZXQgY29udGFpbmVkOiBib29sZWFuID0gdGhpcy5oYXMoa2V5KVxuICAgICAgZGVsZXRlIHRoaXMuc1trZXldXG4gICAgICByZXR1cm4gY29udGFpbmVkXG4gICAgfVxuICAgIHB1YmxpYyBzZXRzKG9iajoge1tpZDogc3RyaW5nXTogVn0pOiB0aGlzIHtcbiAgICAgIGZvciAobGV0IGtleSBpbiBvYmopIHRoaXMuc2V0KGtleSwgb2JqW2tleV0pXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgICBwdWJsaWMgc2V0bShvYmo6IGQzLk1hcDxWPik6IHRoaXMge1xuICAgICAgZm9yIChsZXQga2V5IGluIG9iaikgdGhpcy5zZXQoa2V5LCBvYmpba2V5XSlcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICAgIHB1YmxpYyBjbGVhcigpOiB0aGlzIHtcbiAgICAgIHRoaXMucyA9IHt9XG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgICBwdWJsaWMga2V5cygpOiBzdHJpbmdbXSB7XG4gICAgICBsZXQgcmV0OiBzdHJpbmdbXSA9IFtdXG4gICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5zKSByZXQucHVzaChrZXkpXG4gICAgICByZXR1cm4gcmV0XG4gICAgfVxuICAgIHB1YmxpYyB2YWx1ZXMoKTogVltdIHtcbiAgICAgIGxldCByZXQ6IFZbXSA9IFtdXG4gICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5zKSByZXQucHVzaCh0aGlzLnNba2V5XSlcbiAgICAgIHJldHVybiByZXRcbiAgICB9XG4gICAgcHVibGljIGVudHJpZXMoKTogeyBrZXk6IHN0cmluZywgdmFsdWU6IFYgfVtdIHtcbiAgICAgIGxldCByZXQ6IHsga2V5OiBzdHJpbmcsIHZhbHVlOiBWIH1bXSA9IFtdXG4gICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5zKSByZXQucHVzaCh7IGtleSwgdmFsdWU6IHRoaXMuc1trZXldIH0pXG4gICAgICByZXR1cm4gcmV0XG4gICAgfVxuICAgIHB1YmxpYyBlYWNoKGZ1bmM6ICh2YWx1ZTogViwga2V5OiBzdHJpbmcsIG1hcDogRU1hcDxWPikgPT4gdm9pZCk6IHVuZGVmaW5lZCB7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5zKVxuICAgICAgICBmdW5jKHRoaXMuc1trZXldLCBrZXksIHRoaXMpXG4gICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgfVxuICAgIHB1YmxpYyBzaXplKCk6IG51bWJlciB7XG4gICAgICBsZXQgc2l6ZTogbnVtYmVyID0gMFxuICAgICAgLyp0c2xpbnQ6ZGlzYWJsZSBuby11bnVzZWQtdmFyaWFibGUqL1xuICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMucykgc2l6ZSsrXG4gICAgICAvKnRzbGludDplbmFibGUgbm8tdW51c2VkLXZhcmlhYmxlKi9cbiAgICAgIHJldHVybiBzaXplXG4gICAgfVxuICAgIHB1YmxpYyBlbXB0eSgpOiBib29sZWFuIHtcbiAgICAgIHJldHVybiB0aGlzLnNpemUoKSA9PT0gMFxuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBJZGVudGl0eVNldDxWPiB7XG4gICAgcHVibGljIGE6IFZbXSA9IFtdXG4gICAgcHVibGljIGNsZWFyKCk6IHRoaXMge1xuICAgICAgdGhpcy5hID0gW11cbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICAgIHB1YmxpYyBoYXMoa2V5OiBWKTogYm9vbGVhbiB7XG4gICAgICByZXR1cm4gdGhpcy5hLmluZGV4T2Yoa2V5KSAhPT0gLTFcbiAgICB9XG4gICAgcHVibGljIGFkZChrZXk6IFYpOiB0aGlzIHtcbiAgICAgIGlmICh0aGlzLmhhcyhrZXkpKSByZXR1cm4gdGhpc1xuICAgICAgdGhpcy5hLnB1c2goa2V5KVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gICAgcHVibGljIGFkZGEoYXJyOiBWW10pOiB0aGlzIHtcbiAgICAgIGFyci5mb3JFYWNoKHYgPT4gdGhpcy5hZGQodikpXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgICBwdWJsaWMgYWRkcyhvc2V0OiBJZGVudGl0eVNldDxWPik6IHRoaXMge1xuICAgICAgb3NldC5lYWNoKHYgPT4gdGhpcy5hZGQodikpXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgICBwdWJsaWMgcmVtb3ZlKGtleTogVik6IGJvb2xlYW4ge1xuICAgICAgbGV0IGluZGV4OiBudW1iZXIgPSB0aGlzLmEuaW5kZXhPZihrZXkpXG4gICAgICBpZiAoaW5kZXggPT09IC0xKSByZXR1cm4gZmFsc2VcbiAgICAgIHRoaXMuYS5zcGxpY2UoaW5kZXgsIDEpXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICBwdWJsaWMgZWFjaChmdW5jOiAodmFsdWU6IFYsIHZhbHVlUmVwZWF0OiBWLCBzZXQ6IElkZW50aXR5U2V0PFY+KSA9PiB2b2lkKTogdW5kZWZpbmVkIHtcbiAgICAgIGZvciAobGV0IHZhbHVlIG9mIHRoaXMuYSlcbiAgICAgICAgZnVuYyh2YWx1ZSwgdmFsdWUsIHRoaXMpXG4gICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgfVxuICAgIHB1YmxpYyBzaXplKCk6IG51bWJlciB7XG4gICAgICByZXR1cm4gdGhpcy5hLmxlbmd0aFxuICAgIH1cbiAgICBwdWJsaWMgZW1wdHkoKTogYm9vbGVhbiB7XG4gICAgICByZXR1cm4gdGhpcy5zaXplKCkgPT09IDBcbiAgICB9XG4gICAgcHVibGljIHZhbHVlcygpOiBWW10ge1xuICAgICAgcmV0dXJuIHRoaXMuYVxuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBTdHJpbmdTZXQgaW1wbGVtZW50cyBkMy5TZXQge1xuICAgIHB1YmxpYyBzOiB7W2lkOiBzdHJpbmddOiBzdHJpbmd9ID0ge31cbiAgICBwdWJsaWMgY2xlYXIoKTogdGhpcyB7XG4gICAgICB0aGlzLnMgPSB7fVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gICAgcHVibGljIGhhcyhrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIHRoaXMuc1trZXldICE9PSB1bmRlZmluZWRcbiAgICB9XG4gICAgcHVibGljIGFkZChrZXk6IHN0cmluZyk6IHRoaXMge1xuICAgICAgdGhpcy5zW2tleV0gPSBrZXlcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICAgIHB1YmxpYyBhZGRhKGFycjogc3RyaW5nW10pOiB0aGlzIHtcbiAgICAgIGFyci5mb3JFYWNoKHN0ciA9PiB0aGlzLmFkZChzdHIpKVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gICAgcHVibGljIGFkZHMob3NldDogZDMuU2V0KTogdGhpcyB7XG4gICAgICBvc2V0LmVhY2goc3RyID0+IHRoaXMuYWRkKHN0cikpXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgICBwdWJsaWMgcmVtb3ZlKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICBsZXQgY29udGFpbmVkOiBib29sZWFuID0gdGhpcy5oYXMoa2V5KVxuICAgICAgZGVsZXRlIHRoaXMuc1trZXldXG4gICAgICByZXR1cm4gY29udGFpbmVkXG4gICAgfVxuICAgIHB1YmxpYyBlYWNoKGZ1bmM6ICh2YWx1ZTogc3RyaW5nLCB2YWx1ZVJlcGVhdDogc3RyaW5nLCBzZXQ6IFN0cmluZ1NldCkgPT4gdm9pZCk6IHVuZGVmaW5lZCB7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5zKVxuICAgICAgICBmdW5jKHRoaXMuc1trZXldLCBrZXksIHRoaXMpXG4gICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgfVxuICAgIHB1YmxpYyBzaXplKCk6IG51bWJlciB7XG4gICAgICBsZXQgc2l6ZTogbnVtYmVyID0gMFxuICAgICAgLyp0c2xpbnQ6ZGlzYWJsZSBuby11bnVzZWQtdmFyaWFibGUqL1xuICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMucykgc2l6ZSsrXG4gICAgICAvKnRzbGludDplbmFibGUgbm8tdW51c2VkLXZhcmlhYmxlKi9cbiAgICAgIHJldHVybiBzaXplXG4gICAgfVxuICAgIHB1YmxpYyBlbXB0eSgpOiBib29sZWFuIHtcbiAgICAgIHJldHVybiB0aGlzLnNpemUoKSA9PT0gMFxuICAgIH1cbiAgICBwdWJsaWMgdmFsdWVzKCk6IHN0cmluZ1tdIHtcbiAgICAgIGxldCByZXQ6IHN0cmluZ1tdID0gW11cbiAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLnMpIHJldC5wdXNoKGtleSlcbiAgICAgIHJldHVybiByZXRcbiAgICB9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgRU9NYXA8Vj4gZXh0ZW5kcyBFTWFwPFY+IHtcbiAgICBwdWJsaWMgYTogVltdID0gW11cbiAgICBjb25zdHJ1Y3RvcihjcmVhdGU/OiAoa2V5Pzogc3RyaW5nKSA9PiBWKSB7XG4gICAgICBzdXBlcihjcmVhdGUpXG4gICAgfVxuXG4gICAgcHVibGljIGdvYyhrZXk6IHN0cmluZywgY3JlYXRlPzogKGtleT86IHN0cmluZykgPT4gVik6IFYge1xuICAgICAgaWYgKCF0aGlzLmhhcyhrZXkpKVxuICAgICAgICB0aGlzLnNldChrZXksIGNyZWF0ZSA/IGNyZWF0ZShrZXkpIDogdGhpcy5jcmVhdGUoa2V5KSlcbiAgICAgIHJldHVybiB0aGlzLmdldChrZXkpXG4gICAgfVxuICAgIHB1YmxpYyBzZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBWKTogdGhpcyB7XG4gICAgICBpZiAoIXRoaXMuaGFzKGtleSkpIHtcbiAgICAgICAgc3VwZXIuc2V0KGtleSwgdmFsdWUpXG4gICAgICAgIHRoaXMuYS5wdXNoKHZhbHVlKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gICAgcHVibGljIHJlbW92ZShrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgbGV0IHZhbHVlOiBWID0gdGhpcy5nZXQoa2V5KVxuICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgc3VwZXIucmVtb3ZlKGtleSlcbiAgICAgICAgdGhpcy5hLnNwbGljZSh0aGlzLmEuaW5kZXhPZih2YWx1ZSksIDEpXG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZFxuICAgIH1cbiAgICBwdWJsaWMgc2l6ZSgpOiBudW1iZXIge1xuICAgICAgcmV0dXJuIHRoaXMuYS5sZW5ndGhcbiAgICB9XG4gICAgcHVibGljIHZhbHVlcygpOiBWW10ge1xuICAgICAgcmV0dXJuIHRoaXMuYVxuICAgIH1cbiAgICBwdWJsaWMgY2xlYXIoKTogdGhpcyB7XG4gICAgICBzdXBlci5jbGVhcigpXG4gICAgICB0aGlzLmEgPSBbXVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgT1N0cmluZ1NldCBleHRlbmRzIFN0cmluZ1NldCB7XG4gICAgcHVibGljIGE6IHN0cmluZ1tdID0gW11cblxuICAgIHB1YmxpYyBhZGQoa2V5OiBzdHJpbmcpOiB0aGlzIHtcbiAgICAgIGlmICghdGhpcy5oYXMoa2V5KSkge1xuICAgICAgICBzdXBlci5hZGQoa2V5KVxuICAgICAgICB0aGlzLmEucHVzaChrZXkpXG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgICBwdWJsaWMgcmVtb3ZlKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICBsZXQgY29udGFpbmVkOiBib29sZWFuID0gc3VwZXIucmVtb3ZlKGtleSlcbiAgICAgIGlmIChjb250YWluZWQpXG4gICAgICAgIHRoaXMuYS5zcGxpY2UodGhpcy5hLmluZGV4T2Yoa2V5KSwgMSlcbiAgICAgIHJldHVybiBjb250YWluZWRcbiAgICB9XG4gICAgcHVibGljIHNpemUoKTogbnVtYmVyIHtcbiAgICAgIHJldHVybiB0aGlzLmEubGVuZ3RoXG4gICAgfVxuICAgIHB1YmxpYyB2YWx1ZXMoKTogc3RyaW5nW10ge1xuICAgICAgcmV0dXJuIHRoaXMuYVxuICAgIH1cbiAgICBwdWJsaWMgY2xlYXIoKTogdGhpcyB7XG4gICAgICBzdXBlci5jbGVhcigpXG4gICAgICB0aGlzLmEgPSBbXVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gZ29jPFY+KG9iajoge1tpZDogc3RyaW5nXTogVn0sIGtleTogc3RyaW5nLCBjcmVhdGU/OiAoa2V5Pzogc3RyaW5nKSA9PiBWKTogViB7XG4gICAgaWYgKG9ialtrZXldID09PSB1bmRlZmluZWQpXG4gICAgICBvYmpba2V5XSA9IGNyZWF0ZSA/IGNyZWF0ZShrZXkpIDogPFY+e31cbiAgICByZXR1cm4gb2JqW2tleV1cbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBvZ29jPFY+KG9iajoge1tpZDogc3RyaW5nXTogVn0sIGtleTogc3RyaW5nLCBhcnI6IFZbXSwgY3JlYXRlPzogKGtleT86IHN0cmluZykgPT4gVik6IFYge1xuICAgIGlmIChvYmpba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBvYmpba2V5XSA9IGNyZWF0ZSA/IGNyZWF0ZShrZXkpIDogPFY+e31cbiAgICAgIGFyci5wdXNoKG9ialtrZXldKVxuICAgIH1cbiAgICByZXR1cm4gb2JqW2tleV1cbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBjcHVzaDxWPihhcnI6IFZbXSwgb2JqOiB7W2lkOiBzdHJpbmddOiBWfSwga2V5OiBzdHJpbmcsIHZhbHVlOiBWKTogdm9pZCB7XG4gICAgaWYgKG9ialtrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG9ialtrZXldID0gdmFsdWVcbiAgICAgIGFyci5wdXNoKHZhbHVlKVxuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBjcHVzaHM8Vj4oYXJyOiBWW10sIG9iajoge1tpZDogc3RyaW5nXTogVn0sIG9iajI6IHtbaWQ6IHN0cmluZ106IFZ9KTogdm9pZCB7XG4gICAgZm9yIChsZXQga2V5IGluIG9iajIpIGNwdXNoKGFyciwgb2JqLCBrZXksIG9iajJba2V5XSlcbiAgfVxuXG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var fibra;
(function (fibra) {
    'use strict';
    var Configuration = (function () {
        function Configuration() {
            this.preferredLanguage = '"en"';
            this.authorityEndpoints = [];
            this.archiveEndpoints = [];
            this.globalDataModelConfiguration = new DataModelConfiguration();
            this.deleteItemQuery = fibra.SparqlItemService.deleteItemQuery;
            this.prefixes = '';
        }
        Configuration.prototype.allEndpoints = function () {
            var allEndpoints = this.archiveEndpoints.concat(this.authorityEndpoints);
            allEndpoints.push(this.primaryEndpoint);
            return allEndpoints;
        };
        Configuration.prototype.remoteEndpoints = function () {
            return this.archiveEndpoints.concat(this.authorityEndpoints);
        };
        return Configuration;
    }());
    fibra.Configuration = Configuration;
    var EndpointConfiguration = (function () {
        function EndpointConfiguration(id, title, endpoint, selectedTypes) {
            if (selectedTypes === void 0) { selectedTypes = []; }
            this.id = id;
            this.title = title;
            this.endpoint = endpoint;
            this.class = '';
            this.autocompletionTextMatchQueryTemplate = fibra.SparqlAutocompleteService.defaultMatchQueryTemplate;
            this.treeQueryTemplate = fibra.SparqlTreeService.getClassTreeQuery;
            this.localItemQueryTemplate = fibra.SparqlItemService.getLocalItemPropertiesQuery;
            this.remoteItemQueryTemplate = fibra.SparqlItemService.getRemoteItemPropertiesQuery;
            this.dataModelConfiguration = new DataModelConfiguration();
            this.dataModelConfiguration.setSelectedTypes(selectedTypes);
        }
        return EndpointConfiguration;
    }());
    fibra.EndpointConfiguration = EndpointConfiguration;
    var PrimaryEndpointConfiguration = (function (_super) {
        __extends(PrimaryEndpointConfiguration, _super);
        function PrimaryEndpointConfiguration(id, title, endpoint, updateEndpoint) {
            if (updateEndpoint === void 0) { updateEndpoint = endpoint; }
            _super.call(this, id, title, endpoint);
            this.updateEndpoint = updateEndpoint;
        }
        return PrimaryEndpointConfiguration;
    }(EndpointConfiguration));
    fibra.PrimaryEndpointConfiguration = PrimaryEndpointConfiguration;
    var DataModelConfiguration = (function () {
        function DataModelConfiguration() {
            this.typeConstraints = '';
            this.typeTree = [];
            this.selectedTypes = [];
            this.properties = [];
            this.selectedProperties = [];
            this.propertyPropertyMap = {};
            this.typeTypeMap = {};
        }
        DataModelConfiguration.prototype.setSelectedTypes = function (selectedTypes) {
            this.selectedTypes = selectedTypes;
            this.updateFilter();
        };
        DataModelConfiguration.prototype.updateFilter = function () {
            if (this.selectedTypes.length === 0)
                this.typeConstraints = '';
            else
                this.typeConstraints = 'FILTER (?groupId IN (' + this.selectedTypes.map(function (id) { return id.toCanonical(); }).join(', ') + '))';
        };
        return DataModelConfiguration;
    }());
    fibra.DataModelConfiguration = DataModelConfiguration;
    var ConfigurationService = (function () {
        function ConfigurationService(workerService) {
            this.configuration = new Configuration();
            var c = this.configuration;
            c.primaryEndpoint = new PrimaryEndpointConfiguration('local', 'Local', new fibra.NamedNode('http://ldf.fi/fibra/sparql'), new fibra.NamedNode('http://ldf.fi/fibra/sparql'));
            var gettyAutocompletionQueryTemplate = "PREFIX skos: <http://www.w3.org/2004/02/skos/core#>\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\nPREFIX luc: <http://www.ontotext.com/owlim/lucene#>\nPREFIX gvp: <http://vocab.getty.edu/ontology#>\nPREFIX aat: <http://vocab.getty.edu/aat/>\nPREFIX tgn: <http://vocab.getty.edu/tgn/>\nSELECT ?groupId ?groupLabel ?id ?prefLabel ?matchedLabel ?sameAs ?altLabel {\n  {\n    SELECT ?id ?matchedLabel {\n      BIND(CONCAT(REPLACE(<QUERY>,\"([\\\\+\\\\-\\\\&\\\\|\\\\!\\\\(\\\\)\\\\{\\\\}\\\\[\\\\]\\\\^\\\\\\\"\\\\~\\\\*\\\\?\\\\:\\\\/\\\\\\\\])\",\"\\\\$1\"),\"*\") AS ?query)\n      ?id luc:term ?query .\n      # CONSTRAINTS\n      ?id rdfs:label ?matchedLabel .\n    } LIMIT <LIMIT>\n  } UNION {\n    BIND(CONCAT(\"\\\"\",REPLACE(<QUERY>,\"([\\\\+\\\\-\\\\&\\\\|\\\\!\\\\(\\\\)\\\\{\\\\}\\\\[\\\\]\\\\^\\\\\\\"\\\\~\\\\*\\\\?\\\\:\\\\/\\\\\\\\])\",\"\\\\$1\"),\"\\\"\") AS ?query)\n    ?id luc:term ?query .\n    # CONSTRAINTS\n    ?id rdfs:label ?matchedLabel .\n    FILTER (LCASE(?matchedLabel)=LCASE(<QUERY>))\n  }\n  ?id skos:inScheme <SCHEME> .\n  FILTER (REGEX(LCASE(?matchedLabel),CONCAT(\"\\\\b\",LCASE(<QUERY>))))\n  ?id a ?groupId .\n  ?groupId rdfs:label ?groupLabel .\n  {\n    ?id gvp:prefLabelGVP [xl:literalForm ?prefLabel] .\n  } UNION {\n    ?id skos:exactMatch ?sameAs .\n  }\n}";
            var ulanConfiguration = new EndpointConfiguration('ulan', 'ULAN', new fibra.NamedNode('http://ldf.fi/corsproxy/vocab.getty.edu/sparql'), [fibra.GETTY.PersonConcept, fibra.GETTY.GroupConcept]);
            ulanConfiguration.autocompletionTextMatchQueryTemplate = gettyAutocompletionQueryTemplate.replace(/<SCHEME>/g, 'ulan:');
            var tgnConfiguration = new EndpointConfiguration('tgn', 'TGN', new fibra.NamedNode('http://ldf.fi/corsproxy/vocab.getty.edu/sparql'), [fibra.GETTY.AdminPlaceConcept, fibra.GETTY.PhysAdminPlaceConcept]);
            tgnConfiguration.autocompletionTextMatchQueryTemplate = gettyAutocompletionQueryTemplate.replace(/<SCHEME>/g, 'tgn:');
            var viafConfiguration = new EndpointConfiguration('viaf', 'VIAF', new fibra.NamedNode('http://ldf.fi/viaf/sparql'));
            viafConfiguration.autocompletionTextMatchQueryTemplate = viafConfiguration.autocompletionTextMatchQueryTemplate.replace(/# ADDITIONALSELECT/g, "\nUNION {\n  ?id dcterms:identifier ?rid .\n  FILTER(STRSTARTS(?rid,\"LC|n\"))\n  BIND(IRI(REPLACE(?rid, \"^LC\\\\|n *\",\"http://id.loc.gov/authorities/names/n\")) AS ?sameAs)\n}");
            c.authorityEndpoints = [
                ulanConfiguration,
                new EndpointConfiguration('lcnames', 'LC Names', new fibra.NamedNode('http://ldf.fi/lcnames/sparql')),
                viafConfiguration,
                tgnConfiguration,
                new EndpointConfiguration('geonames', 'GeoNames', new fibra.NamedNode('http://ldf.fi/geonames/sparql'))
            ];
            c.authorityEndpoints.forEach(function (e, i) { return e.class = 'source' + i; });
            var emloConfiguration = new EndpointConfiguration('emlo', 'EMLO', new fibra.NamedNode('http://ldf.fi/emlo/sparql'), [fibra.CIDOC.Person, fibra.CIDOC.Place, fibra.CIDOC.Group]);
            emloConfiguration.autocompletionTextMatchQueryTemplate = emloConfiguration.autocompletionTextMatchQueryTemplate.replace(/\{ # ADDITIONALVARIABLES/g, '?ifpWikipediaPage ?ifpODBNId {').replace(/# ADDITIONALSELECT/g, "\nUNION {\n  {\n    ?id <http://emlo.bodleian.ox.ac.uk/schema#cofk_union_relationship_type-is_related_to> ?ref .\n    FILTER(REGEX(STR(?ref),'http://..\\\\.wikipedia\\\\.org/wiki/'))\n    BIND(?ref AS ?ifpWikipediaPage)\n  } UNION {\n    ?id <http://emlo.bodleian.ox.ac.uk/schema#cofk_union_relationship_type-is_related_to> ?ref .\n    FILTER(STRSTARTS(STR(?ref),'http://www.oxforddnb.com/view/article/'))\n    BIND(REPLACE(STR(?ref),'http://www.oxforddnb.com/view/article/([^?]*).*','$1') AS ?ifpODBNId)\n  }\n}");
            var sdfbConfiguration = new EndpointConfiguration('sdfb', 'SDFB', new fibra.NamedNode('http://ldf.fi/sdfb/sparql'), [fibra.CIDOC.Person, fibra.CIDOC.Place, fibra.CIDOC.Group]);
            sdfbConfiguration.autocompletionTextMatchQueryTemplate = sdfbConfiguration.autocompletionTextMatchQueryTemplate.replace(/\{ # ADDITIONALVARIABLES/g, '?ifpODBNId {').replace(/# ADDITIONALSELECT/g, "\nUNION {\n  ?id <http://ldf.fi/sdfb/schema#odbnId> ?ifpODBNId .\n}\n");
            var procopeConfiguration = new EndpointConfiguration('procope', 'Procope', new fibra.NamedNode('http://ldf.fi/procope/sparql'), [fibra.CIDOC.Person, fibra.CIDOC.Place, fibra.CIDOC.Group]);
            procopeConfiguration.autocompletionTextMatchQueryTemplate = procopeConfiguration.autocompletionTextMatchQueryTemplate.replace(/\{ # ADDITIONALVARIABLES/g, '?ifpWikipediaPage {').replace(/# ADDITIONALSELECT/g, "\nUNION {\n  ?id <http://ldf.fi/procope-schema#wikipediaUrl> ?ref .\n  BIND(IRI(?ref) AS ?ifpWikipediaPage)\n}\n");
            c.archiveEndpoints = [
                sdfbConfiguration,
                emloConfiguration,
                procopeConfiguration,
                new EndpointConfiguration('fbtee', 'FBTEE', new fibra.NamedNode('http://ldf.fi/fbtee/sparql'), [fibra.CIDOC.Person, fibra.CIDOC.Place, fibra.CIDOC.Group]),
                new EndpointConfiguration('schoenberg', 'Schoenberg', new fibra.NamedNode('http://ldf.fi/schoenberg/sparql'), [fibra.CIDOC.Person, fibra.CIDOC.Place, fibra.CIDOC.Group])
            ];
            c.archiveEndpoints.forEach(function (e, i) { return e.class = 'source' + (c.authorityEndpoints.length + i); });
            c.instanceNS = 'http://ldf.fi/fibra/';
            c.instanceGraph = 'http://ldf.fi/fibra/main/';
            c.schemaNS = 'http://ldf.fi/fibra/schema#';
            c.schemaGraph = 'http://ldf.fi/fibra/schema#';
            workerService.callAll('configurationWorkerService', 'setConfiguration', [c]);
        }
        return ConfigurationService;
    }());/*<auto_generate>*/angular.module('fibra').service('configurationService',['workerService',function(){return new (Function.prototype.bind.apply(ConfigurationService,[null].concat(Array.prototype.slice.apply(arguments))));}]);/*</auto_generate>*/
    fibra.ConfigurationService = ConfigurationService;
    var ConfigurationWorkerService = (function () {
        function ConfigurationWorkerService() {
        }
        ConfigurationWorkerService.prototype.setConfiguration = function (configuration) {
            this.configuration = configuration;
        };
        return ConfigurationWorkerService;
    }());/*<auto_generate>*/angular.module('fibra').service('configurationWorkerService',[function(){return new (Function.prototype.bind.apply(ConfigurationWorkerService,[null].concat(Array.prototype.slice.apply(arguments))));}]);/*</auto_generate>*/
    fibra.ConfigurationWorkerService = ConfigurationWorkerService;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvY29uZmlndXJhdGlvbi1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBVSxLQUFLLENBdUtkO0FBdktELFdBQVUsS0FBSyxFQUFDLENBQUM7SUFDZixZQUFZLENBQUE7SUFFVjtRQUFBO1lBQ1Msc0JBQWlCLEdBQVcsTUFBTSxDQUFBO1lBRWxDLHVCQUFrQixHQUE0QixFQUFFLENBQUE7WUFDaEQscUJBQWdCLEdBQTRCLEVBQUUsQ0FBQTtZQUM5QyxpQ0FBNEIsR0FBMkIsSUFBSSxzQkFBc0IsRUFBRSxDQUFBO1lBS25GLG9CQUFlLEdBQVcsdUJBQWlCLENBQUMsZUFBZSxDQUFBO1lBQzNELGFBQVEsR0FBVyxFQUFFLENBQUE7UUFTOUIsQ0FBQztRQVJRLG9DQUFZLEdBQW5CO1lBQ0UsSUFBSSxZQUFZLEdBQTRCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUE7WUFDakcsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUE7WUFDdkMsTUFBTSxDQUFDLFlBQVksQ0FBQTtRQUNyQixDQUFDO1FBQ00sdUNBQWUsR0FBdEI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtRQUM5RCxDQUFDO1FBQ0gsb0JBQUM7SUFBRCxDQXBCQSxBQW9CQyxJQUFBO0lBcEJZLG1CQUFhLGdCQW9CekIsQ0FBQTtJQUVEO1FBT0UsK0JBQW1CLEVBQVUsRUFBUyxLQUFhLEVBQVMsUUFBZSxFQUFFLGFBQTJCO1lBQTNCLDZCQUEyQixHQUEzQixrQkFBMkI7WUFBckYsT0FBRSxHQUFGLEVBQUUsQ0FBUTtZQUFTLFVBQUssR0FBTCxLQUFLLENBQVE7WUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFPO1lBTnBFLFVBQUssR0FBVyxFQUFFLENBQUE7WUFDbEIseUNBQW9D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bWVzcGFjZSBmaWJyYSB7XG4gICd1c2Ugc3RyaWN0J1xuXG4gICAgZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRpb24ge1xuICAgICAgcHVibGljIHByZWZlcnJlZExhbmd1YWdlOiBzdHJpbmcgPSAnXCJlblwiJ1xuICAgICAgcHVibGljIHByaW1hcnlFbmRwb2ludDogUHJpbWFyeUVuZHBvaW50Q29uZmlndXJhdGlvblxuICAgICAgcHVibGljIGF1dGhvcml0eUVuZHBvaW50czogRW5kcG9pbnRDb25maWd1cmF0aW9uW10gPSBbXVxuICAgICAgcHVibGljIGFyY2hpdmVFbmRwb2ludHM6IEVuZHBvaW50Q29uZmlndXJhdGlvbltdID0gW11cbiAgICAgIHB1YmxpYyBnbG9iYWxEYXRhTW9kZWxDb25maWd1cmF0aW9uOiBEYXRhTW9kZWxDb25maWd1cmF0aW9uID0gbmV3IERhdGFNb2RlbENvbmZpZ3VyYXRpb24oKVxuICAgICAgcHVibGljIGluc3RhbmNlTlM6IHN0cmluZ1xuICAgICAgcHVibGljIGluc3RhbmNlR3JhcGg6IHN0cmluZ1xuICAgICAgcHVibGljIHNjaGVtYU5TOiBzdHJpbmdcbiAgICAgIHB1YmxpYyBzY2hlbWFHcmFwaDogc3RyaW5nXG4gICAgICBwdWJsaWMgZGVsZXRlSXRlbVF1ZXJ5OiBzdHJpbmcgPSBTcGFycWxJdGVtU2VydmljZS5kZWxldGVJdGVtUXVlcnlcbiAgICAgIHB1YmxpYyBwcmVmaXhlczogc3RyaW5nID0gJydcbiAgICAgIHB1YmxpYyBhbGxFbmRwb2ludHMoKTogRW5kcG9pbnRDb25maWd1cmF0aW9uW10ge1xuICAgICAgICBsZXQgYWxsRW5kcG9pbnRzOiBFbmRwb2ludENvbmZpZ3VyYXRpb25bXSA9IHRoaXMuYXJjaGl2ZUVuZHBvaW50cy5jb25jYXQodGhpcy5hdXRob3JpdHlFbmRwb2ludHMpXG4gICAgICAgIGFsbEVuZHBvaW50cy5wdXNoKHRoaXMucHJpbWFyeUVuZHBvaW50KVxuICAgICAgICByZXR1cm4gYWxsRW5kcG9pbnRzXG4gICAgICB9XG4gICAgICBwdWJsaWMgcmVtb3RlRW5kcG9pbnRzKCk6IEVuZHBvaW50Q29uZmlndXJhdGlvbltdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXJjaGl2ZUVuZHBvaW50cy5jb25jYXQodGhpcy5hdXRob3JpdHlFbmRwb2ludHMpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIEVuZHBvaW50Q29uZmlndXJhdGlvbiB7XG4gICAgICBwdWJsaWMgY2xhc3M6IHN0cmluZyA9ICcnXG4gICAgICBwdWJsaWMgYXV0b2NvbXBsZXRpb25UZXh0TWF0Y2hRdWVyeVRlbXBsYXRlOiBzdHJpbmcgPSBTcGFycWxBdXRvY29tcGxldGVTZXJ2aWNlLmRlZmF1bHRNYXRjaFF1ZXJ5VGVtcGxhdGVcbiAgICAgIHB1YmxpYyB0cmVlUXVlcnlUZW1wbGF0ZTogc3RyaW5nID0gU3BhcnFsVHJlZVNlcnZpY2UuZ2V0Q2xhc3NUcmVlUXVlcnlcbiAgICAgIHB1YmxpYyBsb2NhbEl0ZW1RdWVyeVRlbXBsYXRlOiBzdHJpbmcgPSBTcGFycWxJdGVtU2VydmljZS5nZXRMb2NhbEl0ZW1Qcm9wZXJ0aWVzUXVlcnlcbiAgICAgIHB1YmxpYyByZW1vdGVJdGVtUXVlcnlUZW1wbGF0ZTogc3RyaW5nID0gU3BhcnFsSXRlbVNlcnZpY2UuZ2V0UmVtb3RlSXRlbVByb3BlcnRpZXNRdWVyeVxuICAgICAgcHVibGljIGRhdGFNb2RlbENvbmZpZ3VyYXRpb246IERhdGFNb2RlbENvbmZpZ3VyYXRpb24gPSBuZXcgRGF0YU1vZGVsQ29uZmlndXJhdGlvbigpXG4gICAgICBjb25zdHJ1Y3RvcihwdWJsaWMgaWQ6IHN0cmluZywgcHVibGljIHRpdGxlOiBzdHJpbmcsIHB1YmxpYyBlbmRwb2ludDogSU5vZGUsIHNlbGVjdGVkVHlwZXM6IElOb2RlW10gPSBbXSkge1xuICAgICAgICB0aGlzLmRhdGFNb2RlbENvbmZpZ3VyYXRpb24uc2V0U2VsZWN0ZWRUeXBlcyhzZWxlY3RlZFR5cGVzKVxuICAgICAgfVxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBQcmltYXJ5RW5kcG9pbnRDb25maWd1cmF0aW9uIGV4dGVuZHMgRW5kcG9pbnRDb25maWd1cmF0aW9uIHtcbiAgICAgIGNvbnN0cnVjdG9yKGlkOiBzdHJpbmcsIHRpdGxlOiBzdHJpbmcsIGVuZHBvaW50OiBJTm9kZSwgcHVibGljIHVwZGF0ZUVuZHBvaW50OiBJTm9kZSA9IGVuZHBvaW50KSB7XG4gICAgICAgIHN1cGVyKGlkLCB0aXRsZSwgZW5kcG9pbnQpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIERhdGFNb2RlbENvbmZpZ3VyYXRpb24ge1xuICAgICAgcHVibGljIHR5cGVDb25zdHJhaW50czogc3RyaW5nID0gJydcbiAgICAgIHB1YmxpYyB0eXBlVHJlZTogVHJlZU5vZGVbXSA9IFtdXG4gICAgICBwdWJsaWMgc2VsZWN0ZWRUeXBlczogSU5vZGVbXSA9IFtdXG4gICAgICBwdWJsaWMgcHJvcGVydGllczogSU5vZGVbXSA9IFtdXG4gICAgICBwdWJsaWMgc2VsZWN0ZWRQcm9wZXJ0aWVzOiBJTm9kZVtdID0gW11cbiAgICAgIHB1YmxpYyBwcm9wZXJ0eVByb3BlcnR5TWFwOiB7W2lkOiBzdHJpbmddOiBJU291cmNlZE5vZGVbXSB9ID0ge31cbiAgICAgIHB1YmxpYyB0eXBlVHlwZU1hcDoge1tpZDogc3RyaW5nXTogSVNvdXJjZWROb2RlW10gfSA9IHt9XG4gICAgICBwdWJsaWMgc2V0U2VsZWN0ZWRUeXBlcyhzZWxlY3RlZFR5cGVzOiBJTm9kZVtdKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUeXBlcyA9IHNlbGVjdGVkVHlwZXNcbiAgICAgICAgdGhpcy51cGRhdGVGaWx0ZXIoKVxuICAgICAgfVxuICAgICAgcHJpdmF0ZSB1cGRhdGVGaWx0ZXIoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkVHlwZXMubGVuZ3RoID09PSAwKVxuICAgICAgICAgIHRoaXMudHlwZUNvbnN0cmFpbnRzID0gJydcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHRoaXMudHlwZUNvbnN0cmFpbnRzID0gJ0ZJTFRFUiAoP2dyb3VwSWQgSU4gKCcgKyB0aGlzLnNlbGVjdGVkVHlwZXMubWFwKGlkID0+IGlkLnRvQ2Fub25pY2FsKCkpLmpvaW4oJywgJykgKyAnKSknXG4gICAgICB9XG4gICAgfVxuXG4gIGV4cG9ydCBjbGFzcyBDb25maWd1cmF0aW9uU2VydmljZSB7XG4gICAgcHVibGljIGNvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRpb24gPSBuZXcgQ29uZmlndXJhdGlvbigpXG4gICAgY29uc3RydWN0b3Iod29ya2VyU2VydmljZTogV29ya2VyU2VydmljZSkge1xuICAgICAgbGV0IGM6IENvbmZpZ3VyYXRpb24gPSB0aGlzLmNvbmZpZ3VyYXRpb25cbiAgICAgIGMucHJpbWFyeUVuZHBvaW50ID0gbmV3IFByaW1hcnlFbmRwb2ludENvbmZpZ3VyYXRpb24oJ2xvY2FsJywgJ0xvY2FsJywgbmV3IE5hbWVkTm9kZSgnaHR0cDovL2xkZi5maS9maWJyYS9zcGFycWwnKSwgbmV3IE5hbWVkTm9kZSgnaHR0cDovL2xkZi5maS9maWJyYS9zcGFycWwnKSlcbiAgICAgIGxldCBnZXR0eUF1dG9jb21wbGV0aW9uUXVlcnlUZW1wbGF0ZTogc3RyaW5nID0gYFBSRUZJWCBza29zOiA8aHR0cDovL3d3dy53My5vcmcvMjAwNC8wMi9za29zL2NvcmUjPlxuUFJFRklYIHJkZnM6IDxodHRwOi8vd3d3LnczLm9yZy8yMDAwLzAxL3JkZi1zY2hlbWEjPlxuUFJFRklYIGx1YzogPGh0dHA6Ly93d3cub250b3RleHQuY29tL293bGltL2x1Y2VuZSM+XG5QUkVGSVggZ3ZwOiA8aHR0cDovL3ZvY2FiLmdldHR5LmVkdS9vbnRvbG9neSM+XG5QUkVGSVggYWF0OiA8aHR0cDovL3ZvY2FiLmdldHR5LmVkdS9hYXQvPlxuUFJFRklYIHRnbjogPGh0dHA6Ly92b2NhYi5nZXR0eS5lZHUvdGduLz5cblNFTEVDVCA/Z3JvdXBJZCA/Z3JvdXBMYWJlbCA/aWQgP3ByZWZMYWJlbCA/bWF0Y2hlZExhYmVsID9zYW1lQXMgP2FsdExhYmVsIHtcbiAge1xuICAgIFNFTEVDVCA/aWQgP21hdGNoZWRMYWJlbCB7XG4gICAgICBCSU5EKENPTkNBVChSRVBMQUNFKDxRVUVSWT4sXCIoW1xcXFxcXFxcK1xcXFxcXFxcLVxcXFxcXFxcJlxcXFxcXFxcfFxcXFxcXFxcIVxcXFxcXFxcKFxcXFxcXFxcKVxcXFxcXFxce1xcXFxcXFxcfVxcXFxcXFxcW1xcXFxcXFxcXVxcXFxcXFxcXlxcXFxcXFxcXFxcXFwiXFxcXFxcXFx+XFxcXFxcXFwqXFxcXFxcXFw/XFxcXFxcXFw6XFxcXFxcXFwvXFxcXFxcXFxcXFxcXFxcXF0pXCIsXCJcXFxcXFxcXCQxXCIpLFwiKlwiKSBBUyA/cXVlcnkpXG4gICAgICA/aWQgbHVjOnRlcm0gP3F1ZXJ5IC5cbiAgICAgICMgQ09OU1RSQUlOVFNcbiAgICAgID9pZCByZGZzOmxhYmVsID9tYXRjaGVkTGFiZWwgLlxuICAgIH0gTElNSVQgPExJTUlUPlxuICB9IFVOSU9OIHtcbiAgICBCSU5EKENPTkNBVChcIlxcXFxcIlwiLFJFUExBQ0UoPFFVRVJZPixcIihbXFxcXFxcXFwrXFxcXFxcXFwtXFxcXFxcXFwmXFxcXFxcXFx8XFxcXFxcXFwhXFxcXFxcXFwoXFxcXFxcXFwpXFxcXFxcXFx7XFxcXFxcXFx9XFxcXFxcXFxbXFxcXFxcXFxdXFxcXFxcXFxeXFxcXFxcXFxcXFxcXCJcXFxcXFxcXH5cXFxcXFxcXCpcXFxcXFxcXD9cXFxcXFxcXDpcXFxcXFxcXC9cXFxcXFxcXFxcXFxcXFxcXSlcIixcIlxcXFxcXFxcJDFcIiksXCJcXFxcXCJcIikgQVMgP3F1ZXJ5KVxuICAgID9pZCBsdWM6dGVybSA/cXVlcnkgLlxuICAgICMgQ09OU1RSQUlOVFNcbiAgICA/aWQgcmRmczpsYWJlbCA/bWF0Y2hlZExhYmVsIC5cbiAgICBGSUxURVIgKExDQVNFKD9tYXRjaGVkTGFiZWwpPUxDQVNFKDxRVUVSWT4pKVxuICB9XG4gID9pZCBza29zOmluU2NoZW1lIDxTQ0hFTUU+IC5cbiAgRklMVEVSIChSRUdFWChMQ0FTRSg/bWF0Y2hlZExhYmVsKSxDT05DQVQoXCJcXFxcXFxcXGJcIixMQ0FTRSg8UVVFUlk+KSkpKVxuICA/aWQgYSA/Z3JvdXBJZCAuXG4gID9ncm91cElkIHJkZnM6bGFiZWwgP2dyb3VwTGFiZWwgLlxuICB7XG4gICAgP2lkIGd2cDpwcmVmTGFiZWxHVlAgW3hsOmxpdGVyYWxGb3JtID9wcmVmTGFiZWxdIC5cbiAgfSBVTklPTiB7XG4gICAgP2lkIHNrb3M6ZXhhY3RNYXRjaCA/c2FtZUFzIC5cbiAgfVxufWBcbiAgICAgIGxldCB1bGFuQ29uZmlndXJhdGlvbjogRW5kcG9pbnRDb25maWd1cmF0aW9uID0gbmV3IEVuZHBvaW50Q29uZmlndXJhdGlvbigndWxhbicsICdVTEFOJywgbmV3IE5hbWVkTm9kZSgnaHR0cDovL2xkZi5maS9jb3JzcHJveHkvdm9jYWIuZ2V0dHkuZWR1L3NwYXJxbCcpLCBbR0VUVFkuUGVyc29uQ29uY2VwdCwgR0VUVFkuR3JvdXBDb25jZXB0XSlcbiAgICAgIHVsYW5Db25maWd1cmF0aW9uLmF1dG9jb21wbGV0aW9uVGV4dE1hdGNoUXVlcnlUZW1wbGF0ZSA9IGdldHR5QXV0b2NvbXBsZXRpb25RdWVyeVRlbXBsYXRlLnJlcGxhY2UoLzxTQ0hFTUU+L2csICd1bGFuOicpXG4gICAgICBsZXQgdGduQ29uZmlndXJhdGlvbjogRW5kcG9pbnRDb25maWd1cmF0aW9uID0gbmV3IEVuZHBvaW50Q29uZmlndXJhdGlvbigndGduJywgJ1RHTicsIG5ldyBOYW1lZE5vZGUoJ2h0dHA6Ly9sZGYuZmkvY29yc3Byb3h5L3ZvY2FiLmdldHR5LmVkdS9zcGFycWwnKSwgW0dFVFRZLkFkbWluUGxhY2VDb25jZXB0LCBHRVRUWS5QaHlzQWRtaW5QbGFjZUNvbmNlcHRdKVxuICAgICAgdGduQ29uZmlndXJhdGlvbi5hdXRvY29tcGxldGlvblRleHRNYXRjaFF1ZXJ5VGVtcGxhdGUgPSBnZXR0eUF1dG9jb21wbGV0aW9uUXVlcnlUZW1wbGF0ZS5yZXBsYWNlKC88U0NIRU1FPi9nLCAndGduOicpXG4gICAgICBsZXQgdmlhZkNvbmZpZ3VyYXRpb246IEVuZHBvaW50Q29uZmlndXJhdGlvbiA9IG5ldyBFbmRwb2ludENvbmZpZ3VyYXRpb24oJ3ZpYWYnLCAnVklBRicsIG5ldyBOYW1lZE5vZGUoJ2h0dHA6Ly9sZGYuZmkvdmlhZi9zcGFycWwnKSlcbiAgICAgIHZpYWZDb25maWd1cmF0aW9uLmF1dG9jb21wbGV0aW9uVGV4dE1hdGNoUXVlcnlUZW1wbGF0ZSA9IHZpYWZDb25maWd1cmF0aW9uLmF1dG9jb21wbGV0aW9uVGV4dE1hdGNoUXVlcnlUZW1wbGF0ZS5yZXBsYWNlKC8jIEFERElUSU9OQUxTRUxFQ1QvZywgYFxuVU5JT04ge1xuICA/aWQgZGN0ZXJtczppZGVudGlmaWVyID9yaWQgLlxuICBGSUxURVIoU1RSU1RBUlRTKD9yaWQsXCJMQ3xuXCIpKVxuICBCSU5EKElSSShSRVBMQUNFKD9yaWQsIFwiXkxDXFxcXFxcXFx8biAqXCIsXCJodHRwOi8vaWQubG9jLmdvdi9hdXRob3JpdGllcy9uYW1lcy9uXCIpKSBBUyA/c2FtZUFzKVxufWApXG4gICAgICBjLmF1dGhvcml0eUVuZHBvaW50cyA9IFtcbiAgICAgICAgdWxhbkNvbmZpZ3VyYXRpb24sXG4gICAgICAgIG5ldyBFbmRwb2ludENvbmZpZ3VyYXRpb24oJ2xjbmFtZXMnLCAnTEMgTmFtZXMnLCBuZXcgTmFtZWROb2RlKCdodHRwOi8vbGRmLmZpL2xjbmFtZXMvc3BhcnFsJykpLFxuICAgICAgICB2aWFmQ29uZmlndXJhdGlvbixcbiAgICAgICAgdGduQ29uZmlndXJhdGlvbixcbiAgICAgICAgbmV3IEVuZHBvaW50Q29uZmlndXJhdGlvbignZ2VvbmFtZXMnLCAnR2VvTmFtZXMnLCBuZXcgTmFtZWROb2RlKCdodHRwOi8vbGRmLmZpL2dlb25hbWVzL3NwYXJxbCcpKVxuICAgICAgXVxuICAgICAgYy5hdXRob3JpdHlFbmRwb2ludHMuZm9yRWFjaCgoZSwgaSkgPT4gZS5jbGFzcyA9ICAnc291cmNlJyArIGkpXG4gICAgICBsZXQgZW1sb0NvbmZpZ3VyYXRpb246IEVuZHBvaW50Q29uZmlndXJhdGlvbiA9IG5ldyBFbmRwb2ludENvbmZpZ3VyYXRpb24oJ2VtbG8nLCAnRU1MTycsIG5ldyBOYW1lZE5vZGUoJ2h0dHA6Ly9sZGYuZmkvZW1sby9zcGFycWwnKSwgW0NJRE9DLlBlcnNvbiwgQ0lET0MuUGxhY2UsIENJRE9DLkdyb3VwXSlcbiAgICAgIGVtbG9Db25maWd1cmF0aW9uLmF1dG9jb21wbGV0aW9uVGV4dE1hdGNoUXVlcnlUZW1wbGF0ZSA9IGVtbG9Db25maWd1cmF0aW9uLmF1dG9jb21wbGV0aW9uVGV4dE1hdGNoUXVlcnlUZW1wbGF0ZS5yZXBsYWNlKC9cXHvCoCMgQURESVRJT05BTFZBUklBQkxFUy9nLCAnP2lmcFdpa2lwZWRpYVBhZ2UgP2lmcE9EQk5JZCB7JykucmVwbGFjZSgvIyBBRERJVElPTkFMU0VMRUNUL2csIGBcblVOSU9OIHtcbiAge1xuICAgID9pZCA8aHR0cDovL2VtbG8uYm9kbGVpYW4ub3guYWMudWsvc2NoZW1hI2NvZmtfdW5pb25fcmVsYXRpb25zaGlwX3R5cGUtaXNfcmVsYXRlZF90bz4gP3JlZiAuXG4gICAgRklMVEVSKFJFR0VYKFNUUig/cmVmKSwnaHR0cDovLy4uXFxcXFxcXFwud2lraXBlZGlhXFxcXFxcXFwub3JnL3dpa2kvJykpXG4gICAgQklORCg/cmVmIEFTID9pZnBXaWtpcGVkaWFQYWdlKVxuICB9IFVOSU9OIHtcbiAgICA/aWQgPGh0dHA6Ly9lbWxvLmJvZGxlaWFuLm94LmFjLnVrL3NjaGVtYSNjb2ZrX3VuaW9uX3JlbGF0aW9uc2hpcF90eXBlLWlzX3JlbGF0ZWRfdG8+ID9yZWYgLlxuICAgIEZJTFRFUihTVFJTVEFSVFMoU1RSKD9yZWYpLCdodHRwOi8vd3d3Lm94Zm9yZGRuYi5jb20vdmlldy9hcnRpY2xlLycpKVxuICAgIEJJTkQoUkVQTEFDRShTVFIoP3JlZiksJ2h0dHA6Ly93d3cub3hmb3JkZG5iLmNvbS92aWV3L2FydGljbGUvKFteP10qKS4qJywnJDEnKSBBUyA/aWZwT0RCTklkKVxuICB9XG59YClcbiAgICAgIGxldCBzZGZiQ29uZmlndXJhdGlvbjogRW5kcG9pbnRDb25maWd1cmF0aW9uID0gbmV3IEVuZHBvaW50Q29uZmlndXJhdGlvbignc2RmYicsICdTREZCJywgbmV3IE5hbWVkTm9kZSgnaHR0cDovL2xkZi5maS9zZGZiL3NwYXJxbCcpLCBbQ0lET0MuUGVyc29uLCBDSURPQy5QbGFjZSwgQ0lET0MuR3JvdXBdKVxuICAgICAgc2RmYkNvbmZpZ3VyYXRpb24uYXV0b2NvbXBsZXRpb25UZXh0TWF0Y2hRdWVyeVRlbXBsYXRlID0gc2RmYkNvbmZpZ3VyYXRpb24uYXV0b2NvbXBsZXRpb25UZXh0TWF0Y2hRdWVyeVRlbXBsYXRlLnJlcGxhY2UoL1xceyAjIEFERElUSU9OQUxWQVJJQUJMRVMvZywgJz9pZnBPREJOSWQgeycpLnJlcGxhY2UoLyMgQURESVRJT05BTFNFTEVDVC9nLCBgXG5VTklPTiB7XG4gID9pZCA8aHR0cDovL2xkZi5maS9zZGZiL3NjaGVtYSNvZGJuSWQ+ID9pZnBPREJOSWQgLlxufVxuYClcbiAgICAgIGxldCBwcm9jb3BlQ29uZmlndXJhdGlvbjogRW5kcG9pbnRDb25maWd1cmF0aW9uID0gbmV3IEVuZHBvaW50Q29uZmlndXJhdGlvbigncHJvY29wZScsICdQcm9jb3BlJywgbmV3IE5hbWVkTm9kZSgnaHR0cDovL2xkZi5maS9wcm9jb3BlL3NwYXJxbCcpLCBbQ0lET0MuUGVyc29uLCBDSURPQy5QbGFjZSwgQ0lET0MuR3JvdXBdKVxuICAgICAgcHJvY29wZUNvbmZpZ3VyYXRpb24uYXV0b2NvbXBsZXRpb25UZXh0TWF0Y2hRdWVyeVRlbXBsYXRlID0gcHJvY29wZUNvbmZpZ3VyYXRpb24uYXV0b2NvbXBsZXRpb25UZXh0TWF0Y2hRdWVyeVRlbXBsYXRlLnJlcGxhY2UoL1xceyAjIEFERElUSU9OQUxWQVJJQUJMRVMvZywgJz9pZnBXaWtpcGVkaWFQYWdlIHsnKS5yZXBsYWNlKC8jIEFERElUSU9OQUxTRUxFQ1QvZywgYFxuVU5JT04ge1xuICA/aWQgPGh0dHA6Ly9sZGYuZmkvcHJvY29wZS1zY2hlbWEjd2lraXBlZGlhVXJsPiA/cmVmIC5cbiAgQklORChJUkkoP3JlZikgQVMgP2lmcFdpa2lwZWRpYVBhZ2UpXG59XG5gKVxuICAgICAgYy5hcmNoaXZlRW5kcG9pbnRzID0gW1xuICAgICAgICBzZGZiQ29uZmlndXJhdGlvbixcbiAgICAgICAgZW1sb0NvbmZpZ3VyYXRpb24sXG4gICAgICAgIHByb2NvcGVDb25maWd1cmF0aW9uLFxuICAgICAgICBuZXcgRW5kcG9pbnRDb25maWd1cmF0aW9uKCdmYnRlZScsICdGQlRFRScsIG5ldyBOYW1lZE5vZGUoJ2h0dHA6Ly9sZGYuZmkvZmJ0ZWUvc3BhcnFsJyksIFtDSURPQy5QZXJzb24sIENJRE9DLlBsYWNlLCBDSURPQy5Hcm91cF0pLFxuICAgICAgICBuZXcgRW5kcG9pbnRDb25maWd1cmF0aW9uKCdzY2hvZW5iZXJnJywgJ1NjaG9lbmJlcmcnLCBuZXcgTmFtZWROb2RlKCdodHRwOi8vbGRmLmZpL3NjaG9lbmJlcmcvc3BhcnFsJyksIFtDSURPQy5QZXJzb24sIENJRE9DLlBsYWNlLCBDSURPQy5Hcm91cF0pXG4gICAgICBdXG4gICAgICBjLmFyY2hpdmVFbmRwb2ludHMuZm9yRWFjaCgoZSwgaSkgPT4gZS5jbGFzcyA9ICAnc291cmNlJyArIChjLmF1dGhvcml0eUVuZHBvaW50cy5sZW5ndGggKyBpKSlcbiAgICAgIGMuaW5zdGFuY2VOUyA9ICdodHRwOi8vbGRmLmZpL2ZpYnJhLydcbiAgICAgIGMuaW5zdGFuY2VHcmFwaCA9ICdodHRwOi8vbGRmLmZpL2ZpYnJhL21haW4vJ1xuICAgICAgYy5zY2hlbWFOUyA9ICdodHRwOi8vbGRmLmZpL2ZpYnJhL3NjaGVtYSMnXG4gICAgICBjLnNjaGVtYUdyYXBoID0gJ2h0dHA6Ly9sZGYuZmkvZmlicmEvc2NoZW1hIydcbiAgICAgIHdvcmtlclNlcnZpY2UuY2FsbEFsbCgnY29uZmlndXJhdGlvbldvcmtlclNlcnZpY2UnLCAnc2V0Q29uZmlndXJhdGlvbicsIFtjXSlcbiAgICB9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgQ29uZmlndXJhdGlvbldvcmtlclNlcnZpY2Uge1xuICAgIHB1YmxpYyBjb25maWd1cmF0aW9uOiBDb25maWd1cmF0aW9uXG4gICAgcHVibGljIHNldENvbmZpZ3VyYXRpb24oY29uZmlndXJhdGlvbjogQ29uZmlndXJhdGlvbik6IHZvaWQge1xuICAgICAgdGhpcy5jb25maWd1cmF0aW9uID0gY29uZmlndXJhdGlvblxuICAgIH1cbiAgfVxuXG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

var fibra;
(function (fibra) {
    'use strict';
    var ExploreComponentController = (function () {
        function ExploreComponentController($element, $compile, $window, $scope, $timeout, sparqlItemService, fibraService, $q) {
            var _this = this;
            this.$element = $element;
            this.$compile = $compile;
            this.$window = $window;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.sparqlItemService = sparqlItemService;
            this.fibraService = fibraService;
            this.$q = $q;
            this.orderedTypes = ['http://www.cidoc-crm.org/cidoc-crm/E21_Person', 'http://www.cidoc-crm.org/cidoc-crm/E53_Place', 'http://www.cidoc-crm.org/cidoc-crm/E74_Group'];
            this.primaryItems = [];
            this.secondaryItems = [];
            this.tertiaryItems = [];
            this.radius = 8;
            this.gridOffset = 50; // Should be even
            this.chargeForce = d3.forceCollide(20);
            this.drawmode = false;
            this.fibraService.on('change', function () { return _this.queryAndBuild(); });
            this.itemService = sparqlItemService;
            this.links = [];
            this.$scope.layout = {
                'choice': 'force'
            };
            this.$scope.$watch('layout.choice', this.updateExplore.bind(this, false));
            // add shift to enable draw mode - this can easily be changed to require shift to be held
            this.$window.addEventListener('keydown', function (event) {
                if (document.activeElement instanceof HTMLBodyElement) {
                    if (event.keyCode === 16) {
                        _this.drawmode = _this.drawmode ? false : true;
                        _this.svgSel.style('background-color', _this.drawmode ? '#d9d9d9' : '#F2F2F2');
                        if (_this.drawmode) {
                            _this.svgSel.append('text')
                                .attr('id', 'drawmodetext')
                                .html('Draw Mode engaged; to link two nodes, drag from one to the other')
                                .style('stroke', 'red')
                                .attr('y', 100);
                        }
                        else {
                            d3.select('#drawmodetext').remove();
                            d3.selectAll('.dragLine').remove();
                        }
                    }
                    else if (event.keyCode === 49) {
                        console.log(_this.links);
                    }
                    else if (event.keyCode === 50) {
                    }
                }
            });
        }
        ExploreComponentController.prototype.$postLink = function () {
            this.svgSel = d3.select(this.$element[0]).select('svg');
            // Create link g
            this.svgSel.append('g').attr('class', 'links');
            this.forceSim = d3.forceSimulation()
                .force('charge', this.chargeForce)
                .force('link', d3.forceLink().distance(40).strength(1).iterations(1).id(function (d) { return '' + d.index; }));
            this.item_info_tip = d3.select('body').append('div')
                .attr('id', 'item_info_tip')
                .style('position', 'absolute')
                .style('z-index', '20')
                .style('background-color', 'white')
                .style('padding', '3px')
                .style('visibility', 'hidden');
            this.radius = 8;
            this.tooltip = d3.select('body').append('div')
                .style('position', 'absolute')
                .style('z-index', '20')
                .style('background-color', 'gray')
                .style('color', 'white')
                .style('padding', '3px')
                .style('border-radius', '2px')
                .style('visibility', 'hidden');
            this.edittip = d3.select('body').append('div')
                .attr('id', 'edittip')
                .style('position', 'absolute')
                .style('z-index', '40')
                .style('background-color', 'white')
                .style('color', 'gray')
                .style('border', '1px solid gray')
                .style('padding', '3px')
                .style('border-radius', '2px')
                .style('visibility', 'hidden');
            this.updateSizing();
            this.queryAndBuild();
        };
        ExploreComponentController.prototype.queryAndBuild = function () {
            var _this = this;
            return this.classTreePromise.then(function (ct) { return _this.itemService.getItemsForExplore().then(function (items) {
                _this.primaryItems = _this.filterItemsByType(items, _this.orderedTypes[0]);
                _this.secondaryItems = _this.filterItemsByType(items, _this.orderedTypes[1]);
                _this.tertiaryItems = _this.filterItemsByType(items, _this.orderedTypes[2]);
                _this.properties = [];
                for (var _i = 0, _a = _this.primaryItems[0].localProperties; _i < _a.length; _i++) {
                    var p = _a[_i];
                    _this.properties.push({ key: p.toCanonical(), value: p.label.value });
                }
                _this.links = _this.mergeLinks(_this.links);
                return 'ok';
            }); }).then(function () { return _this.updateExplore(); });
        };
        ExploreComponentController.prototype.filterItemsByType = function (items, type) {
            return items.filter(function (it) {
                var typeProp = it.localProperties.filter(function (pr) {
                    return pr.value === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type';
                });
                if (typeProp[0]) {
                    return typeProp[0].values.map(function (v) { return v.value; }).indexOf(type) !== -1;
                }
                else {
                    return false;
                }
            });
        };
        ExploreComponentController.prototype.updateSizing = function () {
            // allow item_info_tip to expand somehow
            // add delete and alter ability to sparql-item.pug
            // fix how links sit on top of nodes
            var viewport_width = window.innerWidth;
            var viewport_height = window.innerHeight;
            var searchbarwidth = +d3.select('#searchbar').style('width').replace('px', '');
            this.exploreWidth = viewport_width;
            this.exploreHeight = viewport_height - 36;
            d3.select(this.$element[0]).select('#explorecontainer')
                .style('width', this.exploreWidth + 'px')
                .style('height', this.exploreHeight + 'px');
            d3.select(this.$element[0].parentElement).select('#searchbar')
                .style('top', viewport_height * 6 / 7 + 'px')
                .style('left', viewport_width / 2 - searchbarwidth / 2 + 'px')
                .style('display', 'block');
            // move table down so top is at bottom of viewport
            d3.select(this.$element[0]).select('#exploretable')
                .style('width', viewport_width + 'px')
                .style('height', viewport_height - 50 + 'px');
            this.svgSel.style('width', viewport_width + 'px')
                .style('height', viewport_height - 36 + 'px');
            // .style('top', 25 + 'px')
            var svg_width = +this.svgSel.style('width').replace('px', '');
            var svg_height = +this.svgSel.style('height').replace('px', '');
            this.forceSim.force('center', d3.forceCenter(svg_width / 2, svg_height / 2));
            this.forceSim.force('xposition', d3.forceX(svg_width / 2).strength(0.01));
            this.forceSim.force('yposition', d3.forceY(svg_height / 2).strength(0.01));
            // Build grids
        };
        ExploreComponentController.prototype.appendNodes = function (enterSelection, className) {
            var _this = this;
            return enterSelection.append('g')
                .attr('id', function (d, i) { return 'node-' + i + '-' + className; })
                .attr('class', 'node')
                .append('circle')
                .classed('node-circle', true)
                .classed(className, true)
                .attr('id', function (d, i) { return 'node-circle-' + i + '-' + className; })
                .style('stroke', 'black')
                .attr('r', this.radius + 'px')
                .call(d3.drag()
                .on('start', function (d, i) {
                if (!_this.drawmode) {
                    if (!d3.event.active)
                        _this.forceSim.alphaTarget(.1).restart();
                    d.fx = d.x;
                    d.fy = d.y;
                }
                else {
                    _this.dragline = _this.svgSel.append('line')
                        .attr('class', 'dragLine');
                }
            })
                .on('drag', function (d, i, group) {
                if (!_this.drawmode) {
                    d3.select(group[i]).classed('fixed', true);
                    d.fx = d3.event.x;
                    d.fy = d3.event.y;
                    if (d3.select(group[i]).classed('selected-circle')) {
                        _this.item_info_tip.style('top', (d3.event.y + 30) + 'px')
                            .style('left', (d3.event.x + 30) + 'px');
                    }
                }
                else {
                    _this.dragline.attr('x1', d.x)
                        .attr('y1', d.y)
                        .attr('x2', d3.event.x)
                        .attr('y2', d3.event.y);
                }
            })
                .on('end', function (d, i, group) {
                if (!_this.drawmode) {
                    if (!d3.event.active)
                        _this.forceSim.alphaTarget(0);
                    if (!d3.select(group[i]).classed('fixed')) {
                        d.fx = undefined;
                        d.fy = undefined;
                    }
                }
                else {
                    var lineX_1 = +_this.dragline.attr('x2');
                    var lineY_1 = +_this.dragline.attr('y2');
                    d3.selectAll('.node')
                        .each(function (f, j) {
                        if (Math.abs(lineX_1 - f.x) < _this.radius && Math.abs(lineY_1 - f.y) < _this.radius) {
                            _this.links.push({ 'source': d, 'target': f, 'property': undefined });
                            _this.updateExplore();
                        }
                    });
                    _this.dragline.remove();
                }
            }))
                .on('mouseover', function (d, i) {
                _this.highlightLinks(d, i);
                _this.tooltip.style('top', (d3.event.pageY - 10) + 'px')
                    .style('left', (d3.event.pageX + 10) + 'px')
                    .style('visibility', 'visible')
                    .text(d.label.value);
            })
                .on('mouseout', function (d, i) {
                _this.svgSel.selectAll('line').classed('relevant', false);
                _this.tooltip.style('visibility', 'hidden');
            })
                .on('click', function (d, i, group) {
                console.log(_this.svgSel.selectAll('.node'));
                _this.svgSel.selectAll('.node')
                    .classed('selected-circle', false)
                    .attr('r', _this.radius + 'px');
                d3.select(group[i])
                    .classed('selected-circle', true)
                    .attr('r', _this.radius + 3 + 'px');
                _this.tooltip.style('visibility', 'hidden');
                _this.highlightLinks(d, i);
                _this.$scope.$apply(function () { return _this.selectItem(d); });
                _this.item_info_tip.style('top', (d3.event.pageY - 10) + 'px')
                    .style('left', (d3.event.pageX + 17) + 'px')
                    .style('visibility', 'visible');
                var cscope = _this.$scope.$new(true);
                cscope['node'] = d;
                _this.item_info_tip.selectAll('*').remove();
                _this.item_info_tip.node().appendChild(_this.$compile('<sparql-item item-id="node"></sparql-item>')(cscope)[0]);
            });
        };
        ExploreComponentController.prototype.snapToGrid = function (x, y, primary) {
            if (primary === void 0) { primary = true; }
            var sx, sy;
            // Snap to gridOffset with further offset for multiples
            if (primary) {
                sx = Math.round(x / this.gridOffset) * this.gridOffset;
                sy = Math.round(y / this.gridOffset) * this.gridOffset;
            }
            else {
                sx = Math.round(x / this.gridOffset) * this.gridOffset - this.gridOffset / 2;
                sy = Math.round(y / this.gridOffset) * this.gridOffset - this.gridOffset / 2;
            }
            return [sx, sy];
        };
        ExploreComponentController.prototype.tickTransformNodes = function (sel, primary) {
            var _this = this;
            if (primary === void 0) { primary = true; }
            sel.attr('transform', function (d, i) {
                var x = d.x, y = d.y;
                if (d.x < _this.radius)
                    x = _this.radius;
                if (d.y < _this.radius)
                    y = _this.radius;
                var _a = [x, y], gx = _a[0], gy = _a[1];
                if (_this.$scope.layout.choice === 'forcegrid') {
                    _b = _this.snapToGrid(x, y, primary), gx = _b[0], gy = _b[1];
                }
                d.gx = gx;
                d.gy = gy;
                return 'translate(' + gx + ', ' + gy + ')';
                var _b;
            });
        };
        ExploreComponentController.prototype.genericTick = function (primaryNodes, secondaryNodes, linkLines, transition) {
            if (transition === void 0) { transition = false; }
            var lPrimaryNodes = primaryNodes;
            var lSecondaryNodes = secondaryNodes;
            var lLinkLines = linkLines;
            if (transition) {
                lPrimaryNodes = lPrimaryNodes.transition();
                lSecondaryNodes = lSecondaryNodes.transition();
                lLinkLines = lLinkLines.transition();
            }
            this.tickTransformNodes(lPrimaryNodes, true);
            this.tickTransformNodes(lSecondaryNodes, false);
            lLinkLines
                .attr('x1', function (d) { return d.source.gx; })
                .attr('y1', function (d) { return d.source.gy; })
                .attr('x2', function (d) { return d.target.gx; })
                .attr('y2', function (d) { return d.target.gy; });
        };
        ExploreComponentController.prototype.updateExplore = function (runSim) {
            if (runSim === void 0) { runSim = true; }
            var primaryNodes = this.svgSel
                .selectAll('circle.primary')
                .data(this.primaryItems, function (d) { return d.value; });
            var secondaryNodes = this.svgSel
                .selectAll('circle.secondary')
                .data(this.secondaryItems, function (d) { return d.value; });
            primaryNodes.exit().remove();
            secondaryNodes.exit().remove();
            primaryNodes = primaryNodes.merge(this.appendNodes(primaryNodes.enter(), 'primary'));
            secondaryNodes = secondaryNodes.merge(this.appendNodes(secondaryNodes.enter(), 'secondary'));
            var linkLines = this.svgSel
                .select('g.links')
                .selectAll('line')
                .data(this.links);
            linkLines.exit().remove();
            linkLines = linkLines
                .enter().append('line')
                .attr('id', function (d, i) { return 'link-' + i; })
                .merge(linkLines);
            this.forceSim.stop();
            var onTick = this.genericTick.bind(this, primaryNodes, secondaryNodes, linkLines, false);
            this.forceSim.nodes(this.primaryItems.concat(this.secondaryItems))
                .on('tick', onTick);
            this.forceSim
                .force('link').links(this.links);
            var collide = this.forceSim.force('charge');
            if (collide.initialize)
                collide.initialize(this.primaryItems);
            if (runSim) {
                this.forceSim.alpha(1).restart();
            }
            else {
                this.genericTick(primaryNodes, secondaryNodes, linkLines, true);
            }
            return this.$q.resolve('ok');
        };
        // currently broken on deleting a link
        ExploreComponentController.prototype.highlightLinks = function (d, i) {
            d3.selectAll('line').classed('relevant', false);
            for (var j = 0; j < this.links.length; j++) {
                var linksource = this.links[j].source;
                var linktarget = this.links[j].target;
                if (linksource.index === i || linktarget.index === i)
                    d3.select('#link-' + j).classed('relevant', true);
            }
        };
        ExploreComponentController.prototype.selectItem = function (id) {
            this.selectedItem = id;
        };
        // BUG: after deleting item, links think nodes are in old locations and stationary, items are not getting rebound to new nodes
        ExploreComponentController.prototype.delete = function (id) {
            var _this = this;
            // remove any links from the item -
            for (var i = 0; i < this.links.length; i++) {
                if (this.links[i].source === id || this.links[i].target === id) {
                    this.links.splice(i, 1);
                }
            }
            // might need more to fully clear svg of deleted links
            var prom = this.itemService.deleteItem(id);
            prom.then(function () { return _this.fibraService.dispatch('change'); });
            return prom;
        };
        ExploreComponentController.prototype.mergeLinks = function (oldLinks) {
            var newLinks = [];
            var items = this.primaryItems.concat(this.secondaryItems);
            var sameAs = new fibra.ENodeMap();
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var item = items_1[_i];
                sameAs.set(item, item);
                var sameAsProp = item.localProperties.filter(function (p) {
                    return fibra.OWL.sameAs.equals(p);
                })[0];
                if (sameAsProp && sameAsProp.values)
                    for (var _a = 0, _b = sameAsProp.values; _a < _b.length; _a++) {
                        var n = _b[_a];
                        sameAs.set(n, item);
                    }
            }
            // Iterate over item property values to see if they match the id of any
            // of the items displayed. Also check if they match sameAs values...
            for (var _c = 0, items_2 = items; _c < items_2.length; _c++) {
                var item = items_2[_c];
                for (var _d = 0, _e = item.localProperties; _d < _e.length; _d++) {
                    var p = _e[_d];
                    for (var _f = 0, _g = p.values; _f < _g.length; _f++) {
                        var v = _g[_f];
                        if (sameAs.has(v) && item !== sameAs.get(v) && items.indexOf(sameAs.get(v)) !== -1) {
                            newLinks.push({
                                source: item,
                                target: sameAs.get(v),
                                property: p
                            });
                        }
                    }
                }
            }
            return newLinks;
        };
        return ExploreComponentController;
    }());/*<auto_generate>*/angular.module('fibra').controller('ExploreComponentController',['$element','$compile','$window','$scope','$timeout','sparqlItemService','fibraService','$q',function(){return new (Function.prototype.bind.apply(ExploreComponentController,[null].concat(Array.prototype.slice.apply(arguments))));}]);/*</auto_generate>*/
    var ExploreComponent = (function () {
        function ExploreComponent() {
            this.bindings = {
                classTreePromise: '<',
                selectedItem: '='
            };
            this.controller = ExploreComponentController;
            this.templateUrl = 'partials/explore.html';
        }
        return ExploreComponent;
    }());/*<auto_generate>*/angular.module('fibra').component('explore',new ExploreComponent());/*</auto_generate>*/
    fibra.ExploreComponent = ExploreComponent;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvZXhwbG9yZS1jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBVSxLQUFLLENBZ2RkO0FBaGRELFdBQVUsS0FBSyxFQUFDLENBQUM7SUFDZixZQUFZLENBQUE7SUFxQlo7UUFzV0Usb0NBQW9CLFFBQWtDLEVBQ2xDLFFBQWlDLEVBQ2pDLE9BQStCLEVBQy9CLE1BQXFCLEVBQ3JCLFFBQWlDLEVBQ2pDLGlCQUFvQyxFQUNwQyxZQUEwQixFQUMxQixFQUFxQjtZQTdXM0MsaUJBZ2JDO1lBMUVxQixhQUFRLEdBQVIsUUFBUSxDQUEwQjtZQUNsQyxhQUFRLEdBQVIsUUFBUSxDQUF5QjtZQUNqQyxZQUFPLEdBQVAsT0FBTyxDQUF3QjtZQUMvQixXQUFNLEdBQU4sTUFBTSxDQUFlO1lBQ3JCLGFBQVEsR0FBUixRQUFRLENBQXlCO1lBQ2pDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7WUFDcEMsaUJBQVksR0FBWixZQUFZLENBQWM7WUFDMUIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7WUFwV2pDLGlCQUFZLEdBQWEsQ0FBQywrQ0FBK0MsRUFBRSw4Q0FBOEMsRUFBRSw4Q0FBOEMsQ0FBQyxDQUFBO1lBQzFLLGlCQUFZLEdBQVcsRUFBRSxDQUFBO1lBQ3pCLG1CQUFjLEdBQVcsRUFBRSxDQUFBO1lBQzNCLGtCQUFhLEdBQVcsRUFBRSxDQUFBO1lBRTFCLFdBQU0sR0FBVyxDQUFDLENBQUE7WUFNbEIsZUFBVSxHQUFXLEVBQUUsQ0FBQSxDQUFDLGlCQUFpQjtZQUN6QyxnQkFBVyxHQUFrQyxFQUFFLENBQUMsWUFBWSxDQUFlLEVBQUUsQ0FBQyxDQUFBO1lBRTlFLGFBQVEsR0FBWSxLQUFLLENBQUE7WUF3Vi9CLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxjQUFNLE9BQUEsS0FBSSxDQUFDLGFBQWEsRUFBRSxFQUFwQixDQUFvQixDQUFDLENBQUE7WUFDMUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxp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QkFBZ0IsRUFBRSxHQUFHO2dCQUNyQixZQUFZLEVBQUUsR0FBRzthQUNsQixDQUFBO1lBQ00sZUFBVSxHQUFHLDBCQUEwQixDQUFBO1lBQ3ZDLGdCQUFXLEdBQVcsdUJBQXVCLENBQUE7UUFDdEQsQ0FBQztRQUFELHVCQUFDO0lBQUQsQ0FQQSxBQU9DLElBQUE7SUFQWSxzQkFBZ0IsbUJBTzVCLENBQUE7QUFDSCxDQUFDLEVBaGRTLEtBQUssS0FBTCxLQUFLLFFBZ2RkIiwiZmlsZSI6InNjcmlwdHMvZXhwbG9yZS1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgZmlicmEge1xuICAndXNlIHN0cmljdCdcblxuICBpbnRlcmZhY2UgSUV4cGxvcmVDb21wb25lbnRJbnRlcmZhY2UgZXh0ZW5kcyBhbmd1bGFyLklDb21wb25lbnRDb250cm9sbGVyIHtcbiAgfVxuXG4gIGludGVyZmFjZSBJRXhwbG9yZVNjb3BlIGV4dGVuZHMgYW5ndWxhci5JU2NvcGUge1xuICAgIGxheW91dDogeyBjaG9pY2U6IHN0cmluZyB9XG4gIH1cblxuICBpbnRlcmZhY2UgSUdyaWROb2RlIGV4dGVuZHMgZDMuU2ltdWxhdGlvbk5vZGVEYXR1bSB7XG4gICAgZ3g/OiBudW1iZXJcbiAgICBneT86IG51bWJlclxuICB9XG5cbiAgaW50ZXJmYWNlIElFeHBsb3JlSXRlbSBleHRlbmRzIEl0ZW0sIElHcmlkTm9kZSB7XG4gIH1cblxuICBpbnRlcmZhY2UgSUV4cGxvcmVJdGVtTGluayBleHRlbmRzIGQzLlNpbXVsYXRpb25MaW5rRGF0dW08SUV4cGxvcmVJdGVtPiB7XG4gICAgcHJvcGVydHk/OiBQcm9wZXJ0eVRvVmFsdWVzPElOb2RlUGx1c0xhYmVsPlxuICB9XG5cbiAgY2xhc3MgRXhwbG9yZUNvbXBvbmVudENvbnRyb2xsZXIge1xuICAgIHB1YmxpYyBpdGVtU2VydmljZTogU3BhcnFsSXRlbVNlcnZpY2VcbiAgICAvLyBwdWJsaWMgaXRlbXM6IEl0ZW1bXSA9IFtdXG4gICAgcHVibGljIHNlbGVjdGVkSXRlbTogSU5vZGVcbiAgICBwdWJsaWMgcHJvcGVydGllczoge31bXVxuICAgIHB1YmxpYyBjbGFzc1RyZWVQcm9taXNlOiBhbmd1bGFyLklQcm9taXNlPFRyZWVOb2RlW10+XG4gICAgcHJpdmF0ZSBzdmdTZWw6IGQzLlNlbGVjdGlvbjxTVkdTVkdFbGVtZW50LCB7fSwgbnVsbCwgdW5kZWZpbmVkPlxuICAgIHByaXZhdGUgbGlua3M6IElFeHBsb3JlSXRlbUxpbmtbXVxuICAgIHByaXZhdGUgZm9yY2VTaW06IGQzLlNpbXVsYXRpb248SUV4cGxvcmVJdGVtLCBJRXhwbG9yZUl0ZW1MaW5rPlxuICAgIHByaXZhdGUgb3JkZXJlZFR5cGVzOiBzdHJpbmdbXSA9IFsnaHR0cDovL3d3dy5jaWRvYy1jcm0ub3JnL2NpZG9jLWNybS9FMjFfUGVyc29uJywgJ2h0dHA6Ly93d3cuY2lkb2MtY3JtLm9yZy9jaWRvYy1jcm0vRTUzX1BsYWNlJywgJ2h0dHA6Ly93d3cuY2lkb2MtY3JtLm9yZy9jaWRvYy1jcm0vRTc0X0dyb3VwJ11cbiAgICBwcml2YXRlIHByaW1hcnlJdGVtczogSXRlbVtdID0gW11cbiAgICBwcml2YXRlIHNlY29uZGFyeUl0ZW1zOiBJdGVtW10gPSBbXVxuICAgIHByaXZhdGUgdGVydGlhcnlJdGVtczogSXRlbVtdID0gW11cbiAgICBwcml2YXRlIGl0ZW1faW5mb190aXA6IGQzLlNlbGVjdGlvbjxIVE1MRGl2RWxlbWVudCwge30sIEhUTUxCb2R5RWxlbWVudCwgdW5kZWZpbmVkPlxuICAgIHByaXZhdGUgcmFkaXVzOiBudW1iZXIgPSA4XG4gICAgcHJpdmF0ZSB0b29sdGlwOiBkMy5TZWxlY3Rpb248SFRNTERpdkVsZW1lbnQsIHt9LCBIVE1MQm9keUVsZW1lbnQsIHVuZGVmaW5lZD5cbiAgICBwcml2YXRlIGVkaXR0aXA6IGQzLlNlbGVjdGlvbjxIVE1MRGl2RWxlbWVudCwge30sIEhUTUxCb2R5RWxlbWVudCwgdW5kZWZpbmVkPlxuICAgIHByaXZhdGUgZHJhZ2xpbmU6IGQzLlNlbGVjdGlvbjxTVkdMaW5lRWxlbWVudCwge30sIG51bGwsIHVuZGVmaW5lZD5cbiAgICBwcml2YXRlIGV4cGxvcmVXaWR0aDogbnVtYmVyXG4gICAgcHJpdmF0ZSBleHBsb3JlSGVpZ2h0OiBudW1iZXJcbiAgICBwcml2YXRlIGdyaWRPZmZzZXQ6IG51bWJlciA9IDUwIC8vIFNob3VsZCBiZSBldmVuXG4gICAgcHJpdmF0ZSBjaGFyZ2VGb3JjZTogZDMuRm9yY2VDb2xsaWRlPElFeHBsb3JlSXRlbT4gPSBkMy5mb3JjZUNvbGxpZGU8SUV4cGxvcmVJdGVtPigyMClcblxuICAgIHByaXZhdGUgZHJhd21vZGU6IGJvb2xlYW4gPSBmYWxzZVxuXG4gICAgcHVibGljICRwb3N0TGluaygpOiB2b2lkIHtcbiAgICAgIHRoaXMuc3ZnU2VsID0gZDMuc2VsZWN0KHRoaXMuJGVsZW1lbnRbMF0pLnNlbGVjdDxTVkdTVkdFbGVtZW50Pignc3ZnJylcbiAgICAgIC8vIENyZWF0ZSBsaW5rIGdcbiAgICAgIHRoaXMuc3ZnU2VsLmFwcGVuZCgnZycpLmF0dHIoJ2NsYXNzJywgJ2xpbmtzJylcblxuICAgICAgdGhpcy5mb3JjZVNpbSA9IGQzLmZvcmNlU2ltdWxhdGlvbjxJRXhwbG9yZUl0ZW0sIElFeHBsb3JlSXRlbUxpbms+KClcbiAgICAgICAgLmZvcmNlKCdjaGFyZ2UnLCB0aGlzLmNoYXJnZUZvcmNlKVxuICAgICAgICAuZm9yY2UoJ2xpbmsnLCBkMy5mb3JjZUxpbmsoKS5kaXN0YW5jZSg0MCkuc3RyZW5ndGgoMSkuaXRlcmF0aW9ucygxKS5pZCgoZDogSUV4cGxvcmVJdGVtKSA9PiAnJyArIGQuaW5kZXgpKVxuXG4gICAgICB0aGlzLml0ZW1faW5mb190aXAgPSBkMy5zZWxlY3QoJ2JvZHknKS5hcHBlbmQ8SFRNTERpdkVsZW1lbnQ+KCdkaXYnKVxuICAgICAgICAuYXR0cignaWQnLCAnaXRlbV9pbmZvX3RpcCcpXG4gICAgICAgIC5zdHlsZSgncG9zaXRpb24nLCAnYWJzb2x1dGUnKVxuICAgICAgICAuc3R5bGUoJ3otaW5kZXgnLCAnMjAnKVxuICAgICAgICAuc3R5bGUoJ2JhY2tncm91bmQtY29sb3InLCAnd2hpdGUnKVxuICAgICAgICAuc3R5bGUoJ3BhZGRpbmcnLCAnM3B4JylcbiAgICAgICAgLnN0eWxlKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpXG5cbiAgICAgIHRoaXMucmFkaXVzID0gOFxuXG4gICAgICB0aGlzLnRvb2x0aXAgPSBkMy5zZWxlY3QoJ2JvZHknKS5hcHBlbmQ8SFRNTERpdkVsZW1lbnQ+KCdkaXYnKVxuICAgICAgICAuc3R5bGUoJ3Bvc2l0aW9uJywgJ2Fic29sdXRlJylcbiAgICAgICAgLnN0eWxlKCd6LWluZGV4JywgJzIwJylcbiAgICAgICAgLnN0eWxlKCdiYWNrZ3JvdW5kLWNvbG9yJywgJ2dyYXknKVxuICAgICAgICAuc3R5bGUoJ2NvbG9yJywgJ3doaXRlJylcbiAgICAgICAgLnN0eWxlKCdwYWRkaW5nJywgJzNweCcpXG4gICAgICAgIC5zdHlsZSgnYm9yZGVyLXJhZGl1cycsICcycHgnKVxuICAgICAgICAuc3R5bGUoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJylcblxuICAgICAgdGhpcy5lZGl0dGlwID0gZDMuc2VsZWN0KCdib2R5JykuYXBwZW5kPEhUTUxEaXZFbGVtZW50PignZGl2JylcbiAgICAgICAgLmF0dHIoJ2lkJywgJ2VkaXR0aXAnKVxuICAgICAgICAuc3R5bGUoJ3Bvc2l0aW9uJywgJ2Fic29sdXRlJylcbiAgICAgICAgLnN0eWxlKCd6LWluZGV4JywgJzQwJylcbiAgICAgICAgLnN0eWxlKCdiYWNrZ3JvdW5kLWNvbG9yJywgJ3doaXRlJylcbiAgICAgICAgLnN0eWxlKCdjb2xvcicsICdncmF5JylcbiAgICAgICAgLnN0eWxlKCdib3JkZXInLCAnMXB4IHNvbGlkIGdyYXknKVxuICAgICAgICAuc3R5bGUoJ3BhZGRpbmcnLCAnM3B4JylcbiAgICAgICAgLnN0eWxlKCdib3JkZXItcmFkaXVzJywgJzJweCcpXG4gICAgICAgIC5zdHlsZSgndmlzaWJpbGl0eScsICdoaWRkZW4nKVxuXG4gICAgICB0aGlzLnVwZGF0ZVNpemluZygpO1xuXG4gICAgICB0aGlzLnF1ZXJ5QW5kQnVpbGQoKVxuICAgIH1cblxuICAgIHB1YmxpYyBxdWVyeUFuZEJ1aWxkKCk6IGFuZ3VsYXIuSVByb21pc2U8c3RyaW5nPiB7XG4gICAgICByZXR1cm4gdGhpcy5jbGFzc1RyZWVQcm9taXNlLnRoZW4oY3QgPT4gdGhpcy5pdGVtU2VydmljZS5nZXRJdGVtc0ZvckV4cGxvcmUoKS50aGVuKFxuICAgICAgICAoaXRlbXM6IEl0ZW1bXSkgPT4ge1xuICAgICAgICAgIHRoaXMucHJpbWFyeUl0ZW1zID0gdGhpcy5maWx0ZXJJdGVtc0J5VHlwZShpdGVtcywgdGhpcy5vcmRlcmVkVHlwZXNbMF0pXG4gICAgICAgICAgdGhpcy5zZWNvbmRhcnlJdGVtcyA9IHRoaXMuZmlsdGVySXRlbXNCeVR5cGUoaXRlbXMsIHRoaXMub3JkZXJlZFR5cGVzWzFdKVxuICAgICAgICAgIHRoaXMudGVydGlhcnlJdGVtcyA9IHRoaXMuZmlsdGVySXRlbXNCeVR5cGUoaXRlbXMsIHRoaXMub3JkZXJlZFR5cGVzWzJdKVxuICAgICAgICAgIHRoaXMucHJvcGVydGllcyA9IFtdXG4gICAgICAgICAgZm9yIChsZXQgcCBvZiB0aGlzLnByaW1hcnlJdGVtc1swXS5sb2NhbFByb3BlcnRpZXMpXG4gICAgICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaCh7a2V5OiBwLnRvQ2Fub25pY2FsKCksIHZhbHVlOiBwLmxhYmVsLnZhbHVlIH0pXG4gICAgICAgICAgdGhpcy5saW5rcyA9IHRoaXMubWVyZ2VMaW5rcyh0aGlzLmxpbmtzKVxuICAgICAgICAgIHJldHVybiAnb2snO1xuICAgICAgICB9KVxuICAgICAgKS50aGVuKCgpID0+IHRoaXMudXBkYXRlRXhwbG9yZSgpKVxuICAgIH1cblxuICAgIHByaXZhdGUgZmlsdGVySXRlbXNCeVR5cGUoaXRlbXM6IEl0ZW1bXSwgdHlwZTogc3RyaW5nKTogSXRlbVtdIHtcbiAgICAgIHJldHVybiBpdGVtcy5maWx0ZXIoKGl0KSA9PiB7XG4gICAgICAgIGxldCB0eXBlUHJvcCA9IGl0LmxvY2FsUHJvcGVydGllcy5maWx0ZXIoKHByKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHByLnZhbHVlID09PSAnaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zI3R5cGUnXG4gICAgICAgIH0pXG4gICAgICAgIGlmKHR5cGVQcm9wWzBdKSB7XG4gICAgICAgICAgcmV0dXJuIHR5cGVQcm9wWzBdLnZhbHVlcy5tYXAoKHYpID0+IHsgcmV0dXJuIHYudmFsdWU7IH0pLmluZGV4T2YodHlwZSkgIT09IC0xXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlU2l6aW5nKCk6IHZvaWQge1xuICAgICAgLy8gYWxsb3cgaXRlbV9pbmZvX3RpcCB0byBleHBhbmQgc29tZWhvd1xuICAgICAgLy8gYWRkIGRlbGV0ZSBhbmQgYWx0ZXIgYWJpbGl0eSB0byBzcGFycWwtaXRlbS5wdWdcbiAgICAgIC8vIGZpeCBob3cgbGlua3Mgc2l0IG9uIHRvcCBvZiBub2Rlc1xuICAgICAgbGV0IHZpZXdwb3J0X3dpZHRoOiBudW1iZXIgPSB3aW5kb3cuaW5uZXJXaWR0aFxuICAgICAgbGV0IHZpZXdwb3J0X2hlaWdodDogbnVtYmVyID0gd2luZG93LmlubmVySGVpZ2h0XG4gICAgICBsZXQgc2VhcmNoYmFyd2lkdGg6IG51bWJlciA9ICtkMy5zZWxlY3QoJyNzZWFyY2hiYXInKS5zdHlsZSgnd2lkdGgnKS5yZXBsYWNlKCdweCcsICcnKVxuICAgICAgdGhpcy5leHBsb3JlV2lkdGggPSB2aWV3cG9ydF93aWR0aFxuICAgICAgdGhpcy5leHBsb3JlSGVpZ2h0ID0gdmlld3BvcnRfaGVpZ2h0IC0gMzZcblxuICAgICAgZDMuc2VsZWN0KHRoaXMuJGVsZW1lbnRbMF0pLnNlbGVjdCgnI2V4cGxvcmVjb250YWluZXInKVxuICAgICAgICAuc3R5bGUoJ3dpZHRoJywgdGhpcy5leHBsb3JlV2lkdGggKyAncHgnKVxuICAgICAgICAuc3R5bGUoJ2hlaWdodCcsIHRoaXMuZXhwbG9yZUhlaWdodCArICdweCcpXG5cbiAgICAgIGQzLnNlbGVjdCh0aGlzLiRlbGVtZW50WzBdLnBhcmVudEVsZW1lbnQpLnNlbGVjdCgnI3NlYXJjaGJhcicpXG4gICAgICAgIC5zdHlsZSgndG9wJywgdmlld3BvcnRfaGVpZ2h0ICogNiAvIDcgKyAncHgnKVxuICAgICAgICAuc3R5bGUoJ2xlZnQnLCB2aWV3cG9ydF93aWR0aCAvIDIgLSBzZWFyY2hiYXJ3aWR0aCAvIDIgKyAncHgnKVxuICAgICAgICAuc3R5bGUoJ2Rpc3BsYXknLCAnYmxvY2snKVxuXG4gICAgICAvLyBtb3ZlIHRhYmxlIGRvd24gc28gdG9wIGlzIGF0IGJvdHRvbSBvZiB2aWV3cG9ydFxuICAgICAgZDMuc2VsZWN0KHRoaXMuJGVsZW1lbnRbMF0pLnNlbGVjdCgnI2V4cGxvcmV0YWJsZScpXG4gICAgICAgIC5zdHlsZSgnd2lkdGgnLCB2aWV3cG9ydF93aWR0aCArICdweCcpXG4gICAgICAgIC5zdHlsZSgnaGVpZ2h0Jywgdmlld3BvcnRfaGVpZ2h0IC0gNTAgKyAncHgnKVxuICAgICAgXG4gICAgICB0aGlzLnN2Z1NlbC5zdHlsZSgnd2lkdGgnLCB2aWV3cG9ydF93aWR0aCArICdweCcpXG4gICAgICAgIC5zdHlsZSgnaGVpZ2h0Jywgdmlld3BvcnRfaGVpZ2h0IC0gMzYgKyAncHgnKVxuICAgICAgICAvLyAuc3R5bGUoJ3RvcCcsIDI1ICsgJ3B4JylcblxuICAgICAgbGV0IHN2Z193aWR0aDogbnVtYmVyID0gK3RoaXMuc3ZnU2VsLnN0eWxlKCd3aWR0aCcpLnJlcGxhY2UoJ3B4JywgJycpXG4gICAgICBsZXQgc3ZnX2hlaWdodDogbnVtYmVyID0gK3RoaXMuc3ZnU2VsLnN0eWxlKCdoZWlnaHQnKS5yZXBsYWNlKCdweCcsICcnKVxuXG4gICAgICB0aGlzLmZvcmNlU2ltLmZvcmNlKCdjZW50ZXInLCBkMy5mb3JjZUNlbnRlcihzdmdfd2lkdGggLyAyLCBzdmdfaGVpZ2h0IC8gMikpXG4gICAgICB0aGlzLmZvcmNlU2ltLmZvcmNlKCd4cG9zaXRpb24nLCBkMy5mb3JjZVgoc3ZnX3dpZHRoIC8gMikuc3RyZW5ndGgoMC4wMSkpXG4gICAgICB0aGlzLmZvcmNlU2ltLmZvcmNlKCd5cG9zaXRpb24nLCBkMy5mb3JjZVkoc3ZnX2hlaWdodCAvIDIpLnN0cmVuZ3RoKDAuMDEpKVxuXG4gICAgICAvLyBCdWlsZCBncmlkc1xuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhcHBlbmROb2RlcyhlbnRlclNlbGVjdGlvbjogZDMuU2VsZWN0aW9uPGQzLkJhc2VUeXBlLCB7fSwgU1ZHU1ZHRWxlbWVudCwge30+LCBjbGFzc05hbWU6IHN0cmluZykge1xuICAgICAgcmV0dXJuIGVudGVyU2VsZWN0aW9uLmFwcGVuZCgnZycpXG4gICAgICAgICAgLmF0dHIoJ2lkJywgKGQsIGk6IG51bWJlcikgPT4gJ25vZGUtJyArIGkgKyAnLScgKyBjbGFzc05hbWUpXG4gICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ25vZGUnKVxuICAgICAgICAuYXBwZW5kKCdjaXJjbGUnKVxuICAgICAgICAgIC5jbGFzc2VkKCdub2RlLWNpcmNsZScsIHRydWUpXG4gICAgICAgICAgLmNsYXNzZWQoY2xhc3NOYW1lLCB0cnVlKVxuICAgICAgICAgIC5hdHRyKCdpZCcsIChkLCBpOiBudW1iZXIpID0+ICdub2RlLWNpcmNsZS0nICsgaSArICctJyArIGNsYXNzTmFtZSlcbiAgICAgICAgICAuc3R5bGUoJ3N0cm9rZScsICdibGFjaycpXG4gICAgICAgICAgLmF0dHIoJ3InLCB0aGlzLnJhZGl1cyArICdweCcpXG4gICAgICAgICAgLmNhbGwoZDMuZHJhZygpXG4gICAgICAgICAgICAgIC5vbignc3RhcnQnLCAoZDogSUV4cGxvcmVJdGVtLCBpOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZHJhd21vZGUpIHtcbiAgICAgICAgICAgICAgICAgIGlmICghZDMuZXZlbnQuYWN0aXZlKSB0aGlzLmZvcmNlU2ltLmFscGhhVGFyZ2V0KC4xKS5yZXN0YXJ0KClcbiAgICAgICAgICAgICAgICAgIGQuZnggPSBkLnhcbiAgICAgICAgICAgICAgICAgIGQuZnkgPSBkLnlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYWdsaW5lID0gdGhpcy5zdmdTZWwuYXBwZW5kPFNWR0xpbmVFbGVtZW50PignbGluZScpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdkcmFnTGluZScpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLm9uKCdkcmFnJywgKGQ6IElFeHBsb3JlSXRlbSwgaTogbnVtYmVyLCBncm91cCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5kcmF3bW9kZSkge1xuICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KGdyb3VwW2ldKS5jbGFzc2VkKCdmaXhlZCcsIHRydWUpXG4gICAgICAgICAgICAgICAgICBkLmZ4ID0gZDMuZXZlbnQueFxuICAgICAgICAgICAgICAgICAgZC5meSA9IGQzLmV2ZW50LnlcbiAgICAgICAgICAgICAgICAgIGlmIChkMy5zZWxlY3QoZ3JvdXBbaV0pLmNsYXNzZWQoJ3NlbGVjdGVkLWNpcmNsZScpKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLml0ZW1faW5mb190aXAuc3R5bGUoJ3RvcCcsIChkMy5ldmVudC55ICsgMzApICsgJ3B4JylcbiAgICAgICAgICAgICAgICAgIC5zdHlsZSgnbGVmdCcsIChkMy5ldmVudC54ICsgMzApICsgJ3B4JylcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgdGhpcy5kcmFnbGluZS5hdHRyKCd4MScsIGQueCEpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5MScsIGQueSEpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4MicsIGQzLmV2ZW50LngpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5MicsIGQzLmV2ZW50LnkpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLm9uKCdlbmQnLCAgKGQ6IElFeHBsb3JlSXRlbSwgaTogbnVtYmVyLCBncm91cCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5kcmF3bW9kZSkge1xuICAgICAgICAgICAgICAgICAgaWYgKCFkMy5ldmVudC5hY3RpdmUpIHRoaXMuZm9yY2VTaW0uYWxwaGFUYXJnZXQoMClcbiAgICAgICAgICAgICAgICAgIGlmICghZDMuc2VsZWN0KGdyb3VwW2ldKS5jbGFzc2VkKCdmaXhlZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIGQuZnggPSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgZC5meSA9IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBsZXQgbGluZVg6IG51bWJlciA9ICt0aGlzLmRyYWdsaW5lLmF0dHIoJ3gyJylcbiAgICAgICAgICAgICAgICAgIGxldCBsaW5lWTogbnVtYmVyID0gK3RoaXMuZHJhZ2xpbmUuYXR0cigneTInKVxuXG4gICAgICAgICAgICAgICAgICBkMy5zZWxlY3RBbGwoJy5ub2RlJylcbiAgICAgICAgICAgICAgICAgICAgLmVhY2goKGY6IElFeHBsb3JlSXRlbSwgaikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhsaW5lWCAtIGYueCkgPCB0aGlzLnJhZGl1cyAmJiBNYXRoLmFicyhsaW5lWSAtIGYueSkgPCB0aGlzLnJhZGl1cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5saW5rcy5wdXNoKHsnc291cmNlJzogZCwgJ3RhcmdldCc6IGYsICdwcm9wZXJ0eSc6IHVuZGVmaW5lZH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUV4cGxvcmUoKVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIHRoaXMuZHJhZ2xpbmUucmVtb3ZlKClcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgIH0pKVxuICAgICAgICAgIC5vbignbW91c2VvdmVyJywgKGQ6IElFeHBsb3JlSXRlbSwgaTogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmhpZ2hsaWdodExpbmtzKGQsIGkpXG4gICAgICAgICAgICB0aGlzLnRvb2x0aXAuc3R5bGUoJ3RvcCcsIChkMy5ldmVudC5wYWdlWSAtIDEwKSArICdweCcpXG4gICAgICAgICAgICAgIC5zdHlsZSgnbGVmdCcsIChkMy5ldmVudC5wYWdlWCArIDEwKSArICdweCcpXG4gICAgICAgICAgICAgIC5zdHlsZSgndmlzaWJpbGl0eScsICd2aXNpYmxlJylcbiAgICAgICAgICAgICAgLnRleHQoZC5sYWJlbC52YWx1ZSlcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5vbignbW91c2VvdXQnLCAoZDogSUV4cGxvcmVJdGVtLCBpOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3ZnU2VsLnNlbGVjdEFsbCgnbGluZScpLmNsYXNzZWQoJ3JlbGV2YW50JywgZmFsc2UpXG4gICAgICAgICAgICB0aGlzLnRvb2x0aXAuc3R5bGUoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJylcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5vbignY2xpY2snLCAoZDogSUV4cGxvcmVJdGVtLCBpLCBncm91cCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5zdmdTZWwuc2VsZWN0QWxsKCcubm9kZScpKVxuICAgICAgICAgICAgdGhpcy5zdmdTZWwuc2VsZWN0QWxsKCcubm9kZScpXG4gICAgICAgICAgICAgIC5jbGFzc2VkKCdzZWxlY3RlZC1jaXJjbGUnLCBmYWxzZSlcbiAgICAgICAgICAgICAgLmF0dHIoJ3InLCB0aGlzLnJhZGl1cyArICdweCcpXG4gICAgICAgICAgICBkMy5zZWxlY3QoZ3JvdXBbaV0pXG4gICAgICAgICAgICAgIC5jbGFzc2VkKCdzZWxlY3RlZC1jaXJjbGUnLCB0cnVlKVxuICAgICAgICAgICAgICAuYXR0cigncicsIHRoaXMucmFkaXVzICsgMyArICdweCcpXG4gICAgICAgICAgICB0aGlzLnRvb2x0aXAuc3R5bGUoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJylcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0TGlua3MoZCwgaSlcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLiRhcHBseSgoKSA9PiB0aGlzLnNlbGVjdEl0ZW0oZCkpXG4gICAgICAgICAgICB0aGlzLml0ZW1faW5mb190aXAuc3R5bGUoJ3RvcCcsIChkMy5ldmVudC5wYWdlWSAtIDEwKSArICdweCcpXG4gICAgICAgICAgICAuc3R5bGUoJ2xlZnQnLCAoZDMuZXZlbnQucGFnZVggKyAxNykgKyAncHgnKVxuICAgICAgICAgICAgLnN0eWxlKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKVxuICAgICAgICAgICAgbGV0IGNzY29wZTogYW5ndWxhci5JU2NvcGUgPSB0aGlzLiRzY29wZS4kbmV3KHRydWUpXG4gICAgICAgICAgICBjc2NvcGVbJ25vZGUnXSA9IGRcbiAgICAgICAgICAgIHRoaXMuaXRlbV9pbmZvX3RpcC5zZWxlY3RBbGwoJyonKS5yZW1vdmUoKVxuICAgICAgICAgICAgdGhpcy5pdGVtX2luZm9fdGlwLm5vZGUoKS5hcHBlbmRDaGlsZCh0aGlzLiRjb21waWxlKCc8c3BhcnFsLWl0ZW0gaXRlbS1pZD1cIm5vZGVcIj48L3NwYXJxbC1pdGVtPicpKGNzY29wZSlbMF0pXG4gICAgICAgICAgfSlcbiAgICB9XG5cbiAgICBwcml2YXRlIHNuYXBUb0dyaWQoeDogbnVtYmVyLCB5OiBudW1iZXIsIHByaW1hcnk6IGJvb2xlYW4gPSB0cnVlKTogbnVtYmVyW10ge1xuICAgICAgbGV0IHN4OiBudW1iZXIsIHN5OiBudW1iZXJcbiAgICAgIC8vIFNuYXAgdG8gZ3JpZE9mZnNldCB3aXRoIGZ1cnRoZXIgb2Zmc2V0IGZvciBtdWx0aXBsZXNcbiAgICAgIGlmKHByaW1hcnkpIHtcbiAgICAgICAgc3ggPSBNYXRoLnJvdW5kKHggLyB0aGlzLmdyaWRPZmZzZXQpICogdGhpcy5ncmlkT2Zmc2V0XG4gICAgICAgIHN5ID0gTWF0aC5yb3VuZCh5IC8gdGhpcy5ncmlkT2Zmc2V0KSAqIHRoaXMuZ3JpZE9mZnNldFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3ggPSBNYXRoLnJvdW5kKHggLyB0aGlzLmdyaWRPZmZzZXQpICogdGhpcy5ncmlkT2Zmc2V0IC0gdGhpcy5ncmlkT2Zmc2V0LzJcbiAgICAgICAgc3kgPSBNYXRoLnJvdW5kKHkgLyB0aGlzLmdyaWRPZmZzZXQpICogdGhpcy5ncmlkT2Zmc2V0IC0gdGhpcy5ncmlkT2Zmc2V0LzJcbiAgICAgIH1cbiAgICAgIHJldHVybiBbc3gsc3ldXG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0aWNrVHJhbnNmb3JtTm9kZXMoc2VsOiBkMy5TZWxlY3Rpb248ZDMuQmFzZVR5cGUsIHt9LCBTVkdTVkdFbGVtZW50LCB7fT58ZDMuVHJhbnNpdGlvbjxkMy5CYXNlVHlwZSwge30sIFNWR1NWR0VsZW1lbnQsIHt9PixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpbWFyeTogYm9vbGVhbiA9IHRydWUgKSB7XG4gICAgICBzZWwuYXR0cigndHJhbnNmb3JtJywgKGQ6IElFeHBsb3JlSXRlbSwgaSkgPT4ge1xuICAgICAgICBsZXQgeDogbnVtYmVyID0gZC54ISwgeTogbnVtYmVyID0gZC55IVxuICAgICAgICBpZiAoZC54IDwgdGhpcy5yYWRpdXMpIHggPSB0aGlzLnJhZGl1c1xuICAgICAgICBpZiAoZC55IDwgdGhpcy5yYWRpdXMpIHkgPSB0aGlzLnJhZGl1c1xuXG4gICAgICAgIGxldCBbZ3gsZ3ldID0gW3gseV1cbiAgICAgICAgaWYodGhpcy4kc2NvcGUubGF5b3V0LmNob2ljZSA9PT0gJ2ZvcmNlZ3JpZCcpIHtcbiAgICAgICAgICBbZ3gsZ3ldID0gdGhpcy5zbmFwVG9HcmlkKHgseSxwcmltYXJ5KVxuICAgICAgICB9XG4gICAgICAgIGQuZ3ggPSBneFxuICAgICAgICBkLmd5ID0gZ3lcblxuICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgnICsgZ3ggKyAnLCAnICsgZ3kgKyAnKSdcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZW5lcmljVGljayhwcmltYXJ5Tm9kZXM6IGQzLlNlbGVjdGlvbjxkMy5CYXNlVHlwZSwge30sIFNWR1NWR0VsZW1lbnQsIHt9PixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZGFyeU5vZGVzOiBkMy5TZWxlY3Rpb248ZDMuQmFzZVR5cGUsIHt9LCBTVkdTVkdFbGVtZW50LCB7fT4sXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5rTGluZXM6IGQzLlNlbGVjdGlvbjxTVkdMaW5lRWxlbWVudCwgSUV4cGxvcmVJdGVtTGluaywgU1ZHR0VsZW1lbnQsIHt9PixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb246IGJvb2xlYW4gPSBmYWxzZSkge1xuXG4gICAgICBsZXQgbFByaW1hcnlOb2RlczogZDMuU2VsZWN0aW9uPGQzLkJhc2VUeXBlLCB7fSwgU1ZHU1ZHRWxlbWVudCwge30+fGQzLlRyYW5zaXRpb248ZDMuQmFzZVR5cGUsIHt9LCBTVkdTVkdFbGVtZW50LCB7fT4gPSBwcmltYXJ5Tm9kZXNcbiAgICAgIGxldCBsU2Vjb25kYXJ5Tm9kZXM6IGQzLlNlbGVjdGlvbjxkMy5CYXNlVHlwZSwge30sIFNWR1NWR0VsZW1lbnQsIHt9PnxkMy5UcmFuc2l0aW9uPGQzLkJhc2VUeXBlLCB7fSwgU1ZHU1ZHRWxlbWVudCwge30+ID0gc2Vjb25kYXJ5Tm9kZXNcbiAgICAgIGxldCBsTGlua0xpbmVzOiBkMy5TZWxlY3Rpb248U1ZHTGluZUVsZW1lbnQsIElFeHBsb3JlSXRlbUxpbmssIFNWR0dFbGVtZW50LCB7fT58ZDMuVHJhbnNpdGlvbjxTVkdMaW5lRWxlbWVudCwgSUV4cGxvcmVJdGVtTGluaywgU1ZHR0VsZW1lbnQsIHt9PiA9IGxpbmtMaW5lc1xuICAgICAgaWYodHJhbnNpdGlvbikge1xuICAgICAgICBsUHJpbWFyeU5vZGVzID0gbFByaW1hcnlOb2Rlcy50cmFuc2l0aW9uKClcbiAgICAgICAgbFNlY29uZGFyeU5vZGVzID0gbFNlY29uZGFyeU5vZGVzLnRyYW5zaXRpb24oKVxuICAgICAgICBsTGlua0xpbmVzID0gbExpbmtMaW5lcy50cmFuc2l0aW9uKClcbiAgICAgIH1cblxuICAgICAgdGhpcy50aWNrVHJhbnNmb3JtTm9kZXMobFByaW1hcnlOb2RlcywgdHJ1ZSlcbiAgICAgIHRoaXMudGlja1RyYW5zZm9ybU5vZGVzKGxTZWNvbmRhcnlOb2RlcywgZmFsc2UpICAgICAgICAgIFxuXG4gICAgICBsTGlua0xpbmVzXG4gICAgICAgIC5hdHRyKCd4MScsIChkOiBJRXhwbG9yZUl0ZW1MaW5rKSA9PiAoPElFeHBsb3JlSXRlbT5kLnNvdXJjZSkuZ3ghKVxuICAgICAgICAuYXR0cigneTEnLCAoZDogSUV4cGxvcmVJdGVtTGluaykgPT4gKDxJRXhwbG9yZUl0ZW0+ZC5zb3VyY2UpLmd5ISlcbiAgICAgICAgLmF0dHIoJ3gyJywgKGQ6IElFeHBsb3JlSXRlbUxpbmspID0+ICg8SUV4cGxvcmVJdGVtPmQudGFyZ2V0KS5neCEpXG4gICAgICAgIC5hdHRyKCd5MicsIChkOiBJRXhwbG9yZUl0ZW1MaW5rKSA9PiAoPElFeHBsb3JlSXRlbT5kLnRhcmdldCkuZ3khKVxuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlRXhwbG9yZShydW5TaW06IGJvb2xlYW4gPSB0cnVlKTogYW5ndWxhci5JUHJvbWlzZTxzdHJpbmc+IHtcblxuICAgICAgbGV0IHByaW1hcnlOb2RlczogZDMuU2VsZWN0aW9uPGQzLkJhc2VUeXBlLCB7fSwgU1ZHU1ZHRWxlbWVudCwge30+ID0gdGhpcy5zdmdTZWxcbiAgICAgICAgICAuc2VsZWN0QWxsPFNWR0VsZW1lbnQsIElFeHBsb3JlSXRlbT4oJ2NpcmNsZS5wcmltYXJ5JylcbiAgICAgICAgLmRhdGEodGhpcy5wcmltYXJ5SXRlbXMsIChkOiBJdGVtKSA9PiBkLnZhbHVlKVxuICAgICAgbGV0IHNlY29uZGFyeU5vZGVzOiBkMy5TZWxlY3Rpb248ZDMuQmFzZVR5cGUsIHt9LCBTVkdTVkdFbGVtZW50LCB7fT4gPSB0aGlzLnN2Z1NlbFxuICAgICAgICAgIC5zZWxlY3RBbGw8U1ZHRWxlbWVudCwgSUV4cGxvcmVJdGVtPignY2lyY2xlLnNlY29uZGFyeScpXG4gICAgICAgIC5kYXRhKHRoaXMuc2Vjb25kYXJ5SXRlbXMsIChkOiBJdGVtKSA9PiBkLnZhbHVlKVxuXG4gICAgICBwcmltYXJ5Tm9kZXMuZXhpdCgpLnJlbW92ZSgpXG4gICAgICBzZWNvbmRhcnlOb2Rlcy5leGl0KCkucmVtb3ZlKClcblxuICAgICAgcHJpbWFyeU5vZGVzID0gcHJpbWFyeU5vZGVzLm1lcmdlKHRoaXMuYXBwZW5kTm9kZXMocHJpbWFyeU5vZGVzLmVudGVyKCksICdwcmltYXJ5JykpXG4gICAgICBzZWNvbmRhcnlOb2RlcyA9IHNlY29uZGFyeU5vZGVzLm1lcmdlKHRoaXMuYXBwZW5kTm9kZXMoc2Vjb25kYXJ5Tm9kZXMuZW50ZXIoKSwgJ3NlY29uZGFyeScpKVxuXG4gICAgICBsZXQgbGlua0xpbmVzOiBkMy5TZWxlY3Rpb248U1ZHTGluZUVsZW1lbnQsIElFeHBsb3JlSXRlbUxpbmssIFNWR0dFbGVtZW50LCB7fT4gPSB0aGlzLnN2Z1NlbFxuICAgICAgICAgIC5zZWxlY3Q8U1ZHR0VsZW1lbnQ+KCdnLmxpbmtzJylcbiAgICAgICAgICAuc2VsZWN0QWxsPFNWR0xpbmVFbGVtZW50LCBJRXhwbG9yZUl0ZW1MaW5rPignbGluZScpXG4gICAgICAgIC5kYXRhKHRoaXMubGlua3MpXG5cbiAgICAgIGxpbmtMaW5lcy5leGl0KCkucmVtb3ZlKClcblxuICAgICAgbGlua0xpbmVzPSBsaW5rTGluZXNcbiAgICAgICAgLmVudGVyKCkuYXBwZW5kPFNWR0xpbmVFbGVtZW50PignbGluZScpXG4gICAgICAgICAgLmF0dHIoJ2lkJywgKGQ6IElFeHBsb3JlSXRlbUxpbmssIGk6IG51bWJlcikgPT4gJ2xpbmstJyArIGkpXG4gICAgICAgIC5tZXJnZShsaW5rTGluZXMpXG5cbiAgICAgIHRoaXMuZm9yY2VTaW0uc3RvcCgpXG4gICAgICBsZXQgb25UaWNrID0gdGhpcy5nZW5lcmljVGljay5iaW5kKHRoaXMsIHByaW1hcnlOb2Rlcywgc2Vjb25kYXJ5Tm9kZXMsIGxpbmtMaW5lcywgZmFsc2UpXG4gICAgICB0aGlzLmZvcmNlU2ltLm5vZGVzKHRoaXMucHJpbWFyeUl0ZW1zLmNvbmNhdCh0aGlzLnNlY29uZGFyeUl0ZW1zKSlcbiAgICAgICAgLm9uKCd0aWNrJywgb25UaWNrKVxuICAgICAgdGhpcy5mb3JjZVNpbVxuICAgICAgICAuZm9yY2U8ZDMuRm9yY2VMaW5rPElFeHBsb3JlSXRlbSwgSUV4cGxvcmVJdGVtTGluaz4+KCdsaW5rJykubGlua3ModGhpcy5saW5rcylcbiAgICAgIGxldCBjb2xsaWRlID0gdGhpcy5mb3JjZVNpbS5mb3JjZSgnY2hhcmdlJylcbiAgICAgIGlmKGNvbGxpZGUuaW5pdGlhbGl6ZSkgY29sbGlkZS5pbml0aWFsaXplKHRoaXMucHJpbWFyeUl0ZW1zKVxuXG4gICAgICBpZihydW5TaW0pIHtcbiAgICAgICAgdGhpcy5mb3JjZVNpbS5hbHBoYSgxKS5yZXN0YXJ0KClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZ2VuZXJpY1RpY2socHJpbWFyeU5vZGVzLCBzZWNvbmRhcnlOb2RlcywgbGlua0xpbmVzLCB0cnVlKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy4kcS5yZXNvbHZlKCdvaycpXG4gICAgfVxuXG4gICAgLy8gY3VycmVudGx5IGJyb2tlbiBvbiBkZWxldGluZyBhIGxpbmtcbiAgICBwdWJsaWMgaGlnaGxpZ2h0TGlua3MoZDogSUV4cGxvcmVJdGVtLCBpOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgIGQzLnNlbGVjdEFsbCgnbGluZScpLmNsYXNzZWQoJ3JlbGV2YW50JywgZmFsc2UpXG4gICAgICBmb3IgKGxldCBqOiBudW1iZXIgPSAwOyBqIDwgdGhpcy5saW5rcy5sZW5ndGg7IGorKykge1xuICAgICAgICBsZXQgbGlua3NvdXJjZTogSUV4cGxvcmVJdGVtID0gPElFeHBsb3JlSXRlbT50aGlzLmxpbmtzW2pdLnNvdXJjZVxuICAgICAgICBsZXQgbGlua3RhcmdldDogSUV4cGxvcmVJdGVtID0gPElFeHBsb3JlSXRlbT50aGlzLmxpbmtzW2pdLnRhcmdldFxuICAgICAgICBpZiAobGlua3NvdXJjZS5pbmRleCA9PT0gaSB8fCBsaW5rdGFyZ2V0LmluZGV4ID09PSBpKVxuICAgICAgICAgICAgZDMuc2VsZWN0KCcjbGluay0nICsgaikuY2xhc3NlZCgncmVsZXZhbnQnLCB0cnVlKVxuICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzZWxlY3RJdGVtKGlkOiBJTm9kZSk6IHZvaWQge1xuICAgICAgdGhpcy5zZWxlY3RlZEl0ZW0gPSBpZFxuICAgIH1cblxuICAgIC8vIEJVRzogYWZ0ZXIgZGVsZXRpbmcgaXRlbSwgbGlua3MgdGhpbmsgbm9kZXMgYXJlIGluIG9sZCBsb2NhdGlvbnMgYW5kIHN0YXRpb25hcnksIGl0ZW1zIGFyZSBub3QgZ2V0dGluZyByZWJvdW5kIHRvIG5ldyBub2Rlc1xuICAgIHB1YmxpYyBkZWxldGUoaWQ6IElOb2RlKTogYW5ndWxhci5JUHJvbWlzZTxzdHJpbmc+IHtcblxuICAgICAgLy8gcmVtb3ZlIGFueSBsaW5rcyBmcm9tIHRoZSBpdGVtIC1cbiAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCB0aGlzLmxpbmtzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLmxpbmtzW2ldLnNvdXJjZSA9PT0gaWQgfHwgdGhpcy5saW5rc1tpXS50YXJnZXQgPT09IGlkKSB7XG4gICAgICAgICAgdGhpcy5saW5rcy5zcGxpY2UoaSwgMSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gbWlnaHQgbmVlZCBtb3JlIHRvIGZ1bGx5IGNsZWFyIHN2ZyBvZiBkZWxldGVkIGxpbmtzXG5cbiAgICAgIGxldCBwcm9tOiBhbmd1bGFyLklQcm9taXNlPHN0cmluZz4gPSB0aGlzLml0ZW1TZXJ2aWNlLmRlbGV0ZUl0ZW0oaWQpXG4gICAgICBwcm9tLnRoZW4oKCkgPT4gdGhpcy5maWJyYVNlcnZpY2UuZGlzcGF0Y2goJ2NoYW5nZScpKVxuICAgICAgcmV0dXJuIHByb21cbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRlbGVtZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnksXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSAkY29tcGlsZTogYW5ndWxhci5JQ29tcGlsZVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSAkd2luZG93OiBhbmd1bGFyLklXaW5kb3dTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgJHNjb3BlOiBJRXhwbG9yZVNjb3BlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgJHRpbWVvdXQ6IGFuZ3VsYXIuSVRpbWVvdXRTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgc3BhcnFsSXRlbVNlcnZpY2U6IFNwYXJxbEl0ZW1TZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZmlicmFTZXJ2aWNlOiBGaWJyYVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSAkcTogYW5ndWxhci5JUVNlcnZpY2UpIHtcblxuICAgICAgdGhpcy5maWJyYVNlcnZpY2Uub24oJ2NoYW5nZScsICgpID0+IHRoaXMucXVlcnlBbmRCdWlsZCgpKVxuICAgICAgdGhpcy5pdGVtU2VydmljZSA9IHNwYXJxbEl0ZW1TZXJ2aWNlXG4gICAgICB0aGlzLmxpbmtzID0gW11cbiAgICAgIHRoaXMuJHNjb3BlLmxheW91dCA9IHtcbiAgICAgICAgJ2Nob2ljZSc6ICdmb3JjZScgXG4gICAgICB9XG5cbiAgICAgIHRoaXMuJHNjb3BlLiR3YXRjaCgnbGF5b3V0LmNob2ljZScsIHRoaXMudXBkYXRlRXhwbG9yZS5iaW5kKHRoaXMsIGZhbHNlKSkgXG5cbiAgICAgIC8vIGFkZCBzaGlmdCB0byBlbmFibGUgZHJhdyBtb2RlIC0gdGhpcyBjYW4gZWFzaWx5IGJlIGNoYW5nZWQgdG8gcmVxdWlyZSBzaGlmdCB0byBiZSBoZWxkXG4gICAgICB0aGlzLiR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChldmVudCkgPT4ge1xuICAgICAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50IGluc3RhbmNlb2YgSFRNTEJvZHlFbGVtZW50KSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTYgKSB7XG4gICAgICAgICAgICAgIHRoaXMuZHJhd21vZGUgPSB0aGlzLmRyYXdtb2RlID8gZmFsc2UgOiB0cnVlXG4gICAgICAgICAgICAgIHRoaXMuc3ZnU2VsLnN0eWxlKCdiYWNrZ3JvdW5kLWNvbG9yJywgdGhpcy5kcmF3bW9kZSA/ICcjZDlkOWQ5JyA6ICcjRjJGMkYyJylcbiAgICAgICAgICAgICAgaWYgKHRoaXMuZHJhd21vZGUpIHtcbiAgICAgICAgICAgICAgdGhpcy5zdmdTZWwuYXBwZW5kKCd0ZXh0JylcbiAgICAgICAgICAgICAgICAgIC5hdHRyKCdpZCcsICdkcmF3bW9kZXRleHQnKVxuICAgICAgICAgICAgICAgICAgLmh0bWwoJ0RyYXcgTW9kZSBlbmdhZ2VkOyB0byBsaW5rIHR3byBub2RlcywgZHJhZyBmcm9tIG9uZSB0byB0aGUgb3RoZXInKVxuICAgICAgICAgICAgICAgICAgLnN0eWxlKCdzdHJva2UnLCAncmVkJylcbiAgICAgICAgICAgICAgICAgIC5hdHRyKCd5JywgMTAwKVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnI2RyYXdtb2RldGV4dCcpLnJlbW92ZSgpXG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0QWxsKCcuZHJhZ0xpbmUnKS5yZW1vdmUoKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT09IDQ5KSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubGlua3MpXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT09IDUwKSB7XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuaXRlbXMpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBwcml2YXRlIG1lcmdlTGlua3Mob2xkTGlua3M6IElFeHBsb3JlSXRlbUxpbmtbXSk6IElFeHBsb3JlSXRlbUxpbmtbXSB7XG4gICAgICBsZXQgbmV3TGlua3M6IElFeHBsb3JlSXRlbUxpbmtbXSA9IFtdXG4gICAgICBsZXQgaXRlbXMgPSB0aGlzLnByaW1hcnlJdGVtcy5jb25jYXQodGhpcy5zZWNvbmRhcnlJdGVtcylcblxuICAgICAgbGV0IHNhbWVBczogRU5vZGVNYXA8SXRlbT4gPSBuZXcgRU5vZGVNYXA8SXRlbT4oKVxuICAgICAgZm9yIChsZXQgaXRlbSBvZiBpdGVtcykge1xuICAgICAgICBzYW1lQXMuc2V0KGl0ZW0sIGl0ZW0pXG4gICAgICAgIGxldCBzYW1lQXNQcm9wOiBQcm9wZXJ0eVRvVmFsdWVzPElOb2RlUGx1c0xhYmVsPiA9IGl0ZW0ubG9jYWxQcm9wZXJ0aWVzLmZpbHRlcigocCkgPT5cbiAgICAgICAgICBPV0wuc2FtZUFzLmVxdWFscyhwKVxuICAgICAgICApWzBdXG4gICAgICAgIGlmIChzYW1lQXNQcm9wICYmIHNhbWVBc1Byb3AudmFsdWVzKSBmb3IgKGxldCBuIG9mIHNhbWVBc1Byb3AudmFsdWVzKSBzYW1lQXMuc2V0KG4sIGl0ZW0pXG4gICAgICB9XG5cbiAgICAgIC8vIEl0ZXJhdGUgb3ZlciBpdGVtIHByb3BlcnR5IHZhbHVlcyB0byBzZWUgaWYgdGhleSBtYXRjaCB0aGUgaWQgb2YgYW55XG4gICAgICAvLyBvZiB0aGUgaXRlbXMgZGlzcGxheWVkLiBBbHNvIGNoZWNrIGlmIHRoZXkgbWF0Y2ggc2FtZUFzIHZhbHVlcy4uLlxuICAgICAgZm9yIChsZXQgaXRlbSBvZiBpdGVtcykge1xuICAgICAgICBmb3IgKGxldCBwIG9mIGl0ZW0ubG9jYWxQcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgZm9yIChsZXQgdiBvZiBwLnZhbHVlcykge1xuICAgICAgICAgICAgaWYgKHNhbWVBcy5oYXModikgJiYgaXRlbSAhPT0gc2FtZUFzLmdldCh2KSAmJiBpdGVtcy5pbmRleE9mKHNhbWVBcy5nZXQodikpICE9PSAtMSkge1xuICAgICAgICAgICAgICBuZXdMaW5rcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBzb3VyY2U6IDxJRXhwbG9yZUl0ZW0+aXRlbSxcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IDxJRXhwbG9yZUl0ZW0+c2FtZUFzLmdldCh2KSxcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eTogcFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3TGlua3NcbiAgICB9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgRXhwbG9yZUNvbXBvbmVudCBpbXBsZW1lbnRzIGFuZ3VsYXIuSUNvbXBvbmVudE9wdGlvbnMge1xuICAgIHB1YmxpYyBiaW5kaW5nczoge1tpZDogc3RyaW5nXTogc3RyaW5nfSA9IHtcbiAgICAgIGNsYXNzVHJlZVByb21pc2U6ICc8JyxcbiAgICAgIHNlbGVjdGVkSXRlbTogJz0nXG4gICAgfVxuICAgIHB1YmxpYyBjb250cm9sbGVyID0gRXhwbG9yZUNvbXBvbmVudENvbnRyb2xsZXJcbiAgICBwdWJsaWMgdGVtcGxhdGVVcmw6IHN0cmluZyA9ICdwYXJ0aWFscy9leHBsb3JlLmh0bWwnXG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

var fibra;
(function (fibra) {
    'use strict';
    var FibraService = (function () {
        function FibraService($q) {
            this.callbacks = {};
            this.q = $q;
        }
        // Returns a function that can be called to remove the callback
        FibraService.prototype.on = function (evnt, callback) {
            var _this = this;
            if (this.callbacks[evnt] === undefined)
                this.callbacks[evnt] = Array();
            this.callbacks[evnt].push(callback);
            return function () {
                if (_this.callbacks[evnt].indexOf(callback) !== -1)
                    _this.callbacks[evnt].splice(_this.callbacks[evnt].indexOf(callback), 1);
            };
        };
        FibraService.prototype.dispatch = function (evnt) {
            var proms = this.callbacks[evnt].map(function (cb) { return cb(); });
            return this.q.all(proms);
        };
        return FibraService;
    }());/*<auto_generate>*/angular.module('fibra').service('fibraService',['$q',function(){return new (Function.prototype.bind.apply(FibraService,[null].concat(Array.prototype.slice.apply(arguments))));}]);/*</auto_generate>*/
    fibra.FibraService = FibraService;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvZmlicmEtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFVLEtBQUssQ0ErQmQ7QUEvQkQsV0FBVSxLQUFLLEVBQUMsQ0FBQztJQUNmLFlBQVksQ0FBQTtJQUlaO1FBc0JFLHNCQUFZLEVBQXFCO1lBbEJ6QixjQUFTLEdBQU8sRUFBRSxDQUFBO1lBbUJ4QixJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtRQUNiLENBQUM7UUFsQkQsK0RBQStEO1FBQ3hELHlCQUFFLEdBQVQsVUFBVSxJQUFZLEVBQUUsUUFBMEI7WUFBbEQsaUJBUUM7WUFQQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLFNBQVMsQ0FBQztnQkFDckMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLEVBQXFCLENBQUE7WUFDbkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7WUFDbkMsTUFBTSxDQUFDO2dCQUNMLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNoRCxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtZQUMxRSxDQUFDLENBQUE7UUFDSCxDQUFDO1FBRU0sK0JBQVEsR0FBZixVQUFnQixJQUFZO1lBQzFCLElBQUksS0FBSyxHQUFvQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLEVBQUUsSUFBSyxPQUFBLEVBQUUsRUFBRSxFQUFKLENBQUksQ0FBQyxDQUFBO1lBQ25GLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUMxQixDQUFDO1FBS0gsbUJBQUM7SUFBRCxDQXpCQSxBQXlCQyxJQUFBO0lBekJZLGtCQUFZLGVBeUJ4QixDQUFBO0FBQ0gsQ0FBQyxFQS9CUyxLQUFLLEtBQUwsS0FBSyxRQStCZCIsImZpbGUiOiJzY3JpcHRzL2ZpYnJhLXNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgZmlicmEge1xuICAndXNlIHN0cmljdCdcbiAgdHlwZSBDYWxsYmFja0Z1bmN0aW9uID0gKCkgPT4gYW5ndWxhci5JUHJvbWlzZTxzdHJpbmc+XG4gIHR5cGUgUmVtb3ZhbEZ1bmN0aW9uID0gKCkgPT4gdm9pZFxuXG4gIGV4cG9ydCBjbGFzcyBGaWJyYVNlcnZpY2Uge1xuICAgIC8vIE1vZGVsZWQgb24gZDMuZXZlbnRcblxuICAgIHByaXZhdGUgcTogYW5ndWxhci5JUVNlcnZpY2VcbiAgICBwcml2YXRlIGNhbGxiYWNrczoge30gPSB7fVxuXG4gICAgLy8gUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgY2FuIGJlIGNhbGxlZCB0byByZW1vdmUgdGhlIGNhbGxiYWNrXG4gICAgcHVibGljIG9uKGV2bnQ6IHN0cmluZywgY2FsbGJhY2s6IENhbGxiYWNrRnVuY3Rpb24pOiBSZW1vdmFsRnVuY3Rpb24ge1xuICAgICAgaWYgKHRoaXMuY2FsbGJhY2tzW2V2bnRdID09PSB1bmRlZmluZWQpXG4gICAgICAgIHRoaXMuY2FsbGJhY2tzW2V2bnRdID0gQXJyYXk8Q2FsbGJhY2tGdW5jdGlvbj4gKClcbiAgICAgIHRoaXMuY2FsbGJhY2tzW2V2bnRdLnB1c2goY2FsbGJhY2spXG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5jYWxsYmFja3NbZXZudF0uaW5kZXhPZihjYWxsYmFjaykgIT09IC0xKVxuICAgICAgICAgIHRoaXMuY2FsbGJhY2tzW2V2bnRdLnNwbGljZSh0aGlzLmNhbGxiYWNrc1tldm50XS5pbmRleE9mKGNhbGxiYWNrKSwgMSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZGlzcGF0Y2goZXZudDogc3RyaW5nKTogYW5ndWxhci5JUHJvbWlzZTxBcnJheTxzdHJpbmc+PiB7XG4gICAgICBsZXQgcHJvbXM6IEFycmF5PGFuZ3VsYXIuSVByb21pc2U8c3RyaW5nPj4gPSB0aGlzLmNhbGxiYWNrc1tldm50XS5tYXAoKGNiKSA9PiBjYigpKVxuICAgICAgcmV0dXJuIHRoaXMucS5hbGwocHJvbXMpXG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoJHE6IGFuZ3VsYXIuSVFTZXJ2aWNlKSB7XG4gICAgICB0aGlzLnEgPSAkcVxuICAgIH1cbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var fibra;
(function (fibra) {
    'use strict';
    var Node = (function () {
        function Node(value, termType, language, datatype) {
            if (language === void 0) { language = undefined; }
            if (datatype === void 0) { datatype = undefined; }
            this.value = value;
            this.termType = termType;
            this.language = language;
            this.datatype = datatype;
        }
        Node.prototype.toCanonical = function () {
            switch (this.termType) {
                case 'NamedNode': return '<' + this.value + '>';
                case 'BlankNode': return '_:' + this.value;
                case 'Literal': return JSON.stringify(this.value) + (this.language ? '@' + this.language : (XMLSchema.string.equals(this.datatype) ? '' : '^^' + this.datatype.toCanonical()));
                case 'Variable': return '?' + this.value;
                case 'DefaultGraph': return '';
                default: throw 'Unknown term type ' + this;
            }
        };
        Node.prototype.equals = function (other) {
            return this.termType === other.termType && this.value === other.value && (this.termType !== 'Literal' || (this.language === other.language && this.datatype === other.datatype));
        };
        return Node;
    }());
    fibra.Node = Node;
    var NodeFromNode = (function (_super) {
        __extends(NodeFromNode, _super);
        function NodeFromNode(other) {
            _super.call(this, other.value, other.termType, other.language, other.datatype);
        }
        return NodeFromNode;
    }(Node));
    fibra.NodeFromNode = NodeFromNode;
    var DefaultGraph = (function (_super) {
        __extends(DefaultGraph, _super);
        function DefaultGraph() {
            _super.call(this, '', 'DefaultGraph');
        }
        DefaultGraph.prototype.toCanonical = function () { return ''; };
        DefaultGraph.prototype.equals = function (other) { return other.termType === 'DefaultGraph'; };
        DefaultGraph.instance = new DefaultGraph();
        return DefaultGraph;
    }(Node));
    fibra.DefaultGraph = DefaultGraph;
    var Variable = (function (_super) {
        __extends(Variable, _super);
        function Variable(value) {
            _super.call(this, value, 'Variable');
        }
        Variable.prototype.toCanonical = function () { return '?' + this.value; };
        return Variable;
    }(Node));
    fibra.Variable = Variable;
    var NamedNode = (function (_super) {
        __extends(NamedNode, _super);
        function NamedNode(value) {
            _super.call(this, value, 'NamedNode');
        }
        NamedNode.prototype.toCanonical = function () { return '<' + this.value + '>'; };
        return NamedNode;
    }(Node));
    fibra.NamedNode = NamedNode;
    var BlankNode = (function (_super) {
        __extends(BlankNode, _super);
        function BlankNode(value) {
            _super.call(this, value, 'BlankNode');
        }
        BlankNode.prototype.toCanonical = function () { return '?' + this.value; };
        return BlankNode;
    }(Node));
    fibra.BlankNode = BlankNode;
    var Literal = (function (_super) {
        __extends(Literal, _super);
        function Literal(value, language, datatype) {
            if (language === void 0) { language = ''; }
            _super.call(this, value, 'Literal', language, datatype ? datatype : (language !== '' ? RDF.langString : XMLSchema.string));
        }
        return Literal;
    }(Node));
    fibra.Literal = Literal;
    var Quad = (function () {
        function Quad(subject, predicate, object, graph) {
            this.subject = subject;
            this.predicate = predicate;
            this.object = object;
            this.graph = graph;
        }
        Quad.prototype.toCanonical = function () {
            return this.subject.toCanonical() + ' ' + this.predicate.toCanonical() + ' ' + this.object.toCanonical() + (this.graph.termType === 'DefaultGraph' ? '' : (' ' + this.graph.toCanonical()));
        };
        Quad.prototype.equals = function (other) {
            return this.subject.equals(other.subject) && this.predicate.equals(other.predicate) && this.object.equals(other.object) && this.graph.equals(other.graph);
        };
        return Quad;
    }());
    fibra.Quad = Quad;
    var Triple = (function () {
        function Triple(subject, predicate, object) {
            this.subject = subject;
            this.predicate = predicate;
            this.object = object;
            this.graph = DefaultGraph.instance;
        }
        Triple.prototype.toCanonical = function () {
            return this.subject.toCanonical() + ' ' + this.predicate.toCanonical() + ' ' + this.object.toCanonical();
        };
        Triple.prototype.equals = function (other) {
            return this.subject.equals(other.subject) && this.predicate.equals(other.predicate) && this.object.equals(other.object) && this.graph.equals(other.graph);
        };
        return Triple;
    }());
    fibra.Triple = Triple;
    var Graph = (function () {
        function Graph(graph, triples) {
            if (triples === void 0) { triples = []; }
            this.graph = graph;
            this.triples = triples;
        }
        return Graph;
    }());
    fibra.Graph = Graph;
    var DataFactory = (function () {
        function DataFactory() {
            this.nextBlankNodeId = 0;
        }
        DataFactory.prototype.nodeFromBinding = function (binding) {
            var n = new Node(binding.value, binding.type === 'literal' ? 'Literal' : (binding.type === 'uri' ? 'NamedNode' : 'BlankNode'));
            if (binding.type === 'literal') {
                n.language = binding['xml:lang'] ? binding['xml:lang'] : '';
                n.datatype = binding.datatype ? new NamedNode(binding.datatype) : (n.language !== '' ? RDF.langString : XMLSchema.string);
            }
            return n;
        };
        DataFactory.prototype.nodeFromNode = function (other) {
            if (other.termType === 'Literal')
                return new Literal(other.value, other.language, other.datatype);
            else
                return new Node(other.value, other.termType);
        };
        DataFactory.prototype.nodeFromCanonicalRepresentation = function (id) {
            if (id.indexOf('<') === 0)
                return new NamedNode(id.substring(1, id.length - 1));
            else if (id.indexOf('_:') === 0)
                return new BlankNode(id.substring(2));
            else {
                var value = id.substring(1, id.lastIndexOf('"'));
                if (id.lastIndexOf('@') === id.lastIndexOf('"') + 1)
                    return new Literal(value, id.substring(id.lastIndexOf('@')));
                else if (id.lastIndexOf('^^<') === id.lastIndexOf('"') + 1)
                    return new Literal(value, '', new NamedNode(id.substring(id.lastIndexOf('^^<'), id.length - 1)));
                else
                    return new Literal(value);
            }
        };
        DataFactory.prototype.namedNode = function (value) { return new NamedNode(value); };
        DataFactory.prototype.blankNode = function (value) { return new BlankNode(value ? value : ('b' + ++this.nextBlankNodeId)); };
        DataFactory.prototype.literal = function (value, languageOrDatatype) {
            if (typeof (languageOrDatatype) === 'string')
                return new Literal(value, languageOrDatatype);
            else
                return new Literal(value, undefined, languageOrDatatype);
        };
        DataFactory.prototype.variable = function (value) { return new Variable(value); };
        DataFactory.prototype.defaultGraph = function () { return DefaultGraph.instance; };
        DataFactory.prototype.triple = function (subject, predicate, object) {
            return new Triple(subject, predicate, object);
        };
        DataFactory.prototype.quad = function (subject, predicate, object, graph) {
            return new Quad(subject, predicate, object, graph ? graph : DefaultGraph.instance);
        };
        DataFactory.instance = new DataFactory();
        return DataFactory;
    }());
    fibra.DataFactory = DataFactory;
    var SKOS = (function () {
        function SKOS() {
        }
        SKOS.ns = 'http://www.w3.org/2004/02/skos/core#';
        SKOS.prefLabel = new NamedNode(SKOS.ns + 'prefLabel');
        return SKOS;
    }());
    fibra.SKOS = SKOS;
    var OWL = (function () {
        function OWL() {
        }
        OWL.ns = 'http://www.w3.org/2002/07/owl#';
        OWL.sameAs = new NamedNode(OWL.ns + 'sameAs');
        return OWL;
    }());
    fibra.OWL = OWL;
    var RDF = (function () {
        function RDF() {
        }
        RDF.ns = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
        RDF.type = new NamedNode(RDF.ns + 'type');
        RDF.langString = new NamedNode(RDF.ns + 'langString');
        return RDF;
    }());
    fibra.RDF = RDF;
    var XMLSchema = (function () {
        function XMLSchema() {
        }
        XMLSchema.ns = 'http://www.w3.org/2001/XMLSchema#';
        XMLSchema.string = new NamedNode(XMLSchema.ns + 'string');
        return XMLSchema;
    }());
    fibra.XMLSchema = XMLSchema;
    var CIDOC = (function () {
        function CIDOC() {
        }
        CIDOC.ns = 'http://www.cidoc-crm.org/cidoc-crm/';
        CIDOC.Person = new NamedNode(CIDOC.ns + 'E21_Person');
        CIDOC.Place = new NamedNode(CIDOC.ns + 'E53_Place');
        CIDOC.Group = new NamedNode(CIDOC.ns + 'E74_Group');
        return CIDOC;
    }());
    fibra.CIDOC = CIDOC;
    var GETTY = (function () {
        function GETTY() {
        }
        GETTY.ns = 'http://vocab.getty.edu/ontology#';
        GETTY.AdminPlaceConcept = new NamedNode(GETTY.ns + 'AdminPlaceConcept');
        GETTY.PhysicalPlaceConcept = new NamedNode(GETTY.ns + 'PhysicalPlaceConcept');
        GETTY.PhysAdminPlaceConcept = new NamedNode(GETTY.ns + 'PhysAdminPlaceConcept');
        GETTY.PersonConcept = new NamedNode(GETTY.ns + 'PersonConcept');
        GETTY.GroupConcept = new NamedNode(GETTY.ns + 'GroupConcept');
        return GETTY;
    }());
    fibra.GETTY = GETTY;
    var ENodeMap = (function () {
        function ENodeMap(create, map) {
            if (create === void 0) { create = function () { return {}; }; }
            if (map === void 0) { map = new fibra.EMap(); }
            this.create = create;
            this.map = map;
        }
        ENodeMap.prototype.goc = function (key, create) {
            if (!this.has(key))
                this.set(key, create ? create(key) : this.create(key));
            return this.get(key);
        };
        ENodeMap.prototype.get = function (key) {
            return this.map.get(key.toCanonical());
        };
        ENodeMap.prototype.remove = function (key) {
            return this.map.remove(key.toCanonical());
        };
        ENodeMap.prototype.each = function (f) {
            var _this = this;
            this.map.each(function (value, key, map) { return f(value, DataFactory.instance.nodeFromCanonicalRepresentation(key), _this); });
        };
        ENodeMap.prototype.has = function (key) {
            return this.map.has(key.toCanonical());
        };
        ENodeMap.prototype.set = function (key, value) {
            this.map.set(key.toCanonical(), value);
            return this;
        };
        Object.defineProperty(ENodeMap.prototype, "size", {
            get: function () {
                return this.map.size();
            },
            enumerable: true,
            configurable: true
        });
        ENodeMap.prototype.values = function () {
            return this.map.values();
        };
        ENodeMap.prototype.keys = function () {
            return this.map.keys().map(function (k) { return DataFactory.instance.nodeFromCanonicalRepresentation(k); });
        };
        ENodeMap.prototype.entries = function () {
            return this.map.entries().map(function (o) { return { key: DataFactory.instance.nodeFromCanonicalRepresentation(o.key), value: o.value }; });
        };
        ENodeMap.prototype.clear = function () {
            this.map.clear();
            return this;
        };
        return ENodeMap;
    }());
    fibra.ENodeMap = ENodeMap;
    var EONodeMap = (function (_super) {
        __extends(EONodeMap, _super);
        function EONodeMap(create) {
            _super.call(this, create, new fibra.EOMap());
        }
        return EONodeMap;
    }(ENodeMap));
    fibra.EONodeMap = EONodeMap;
    var NodeSet = (function () {
        function NodeSet(map) {
            if (map === void 0) { map = new fibra.EMap(); }
            this.m = new ENodeMap(undefined, map);
        }
        NodeSet.prototype.add = function (value) {
            this.m.set(value, value);
            return this;
        };
        NodeSet.prototype.adda = function (arr) {
            var _this = this;
            arr.forEach(function (n) { return _this.add(n); });
            return this;
        };
        NodeSet.prototype.adds = function (oset) {
            var _this = this;
            oset.each(function (n) { return _this.add(n); });
            return this;
        };
        NodeSet.prototype.has = function (value) {
            return this.m.has(value);
        };
        NodeSet.prototype.get = function (value) {
            return this.m.get(value);
        };
        NodeSet.prototype.clear = function () {
            this.m.clear();
            return this;
        };
        NodeSet.prototype.remove = function (value) {
            return this.m.remove(value);
        };
        NodeSet.prototype.values = function () {
            return this.m.values();
        };
        Object.defineProperty(NodeSet.prototype, "size", {
            get: function () {
                return this.m.size;
            },
            enumerable: true,
            configurable: true
        });
        NodeSet.prototype.each = function (f) {
            var _this = this;
            this.m.each(function (value, key, map) { return f(value, value, _this); });
        };
        return NodeSet;
    }());
    fibra.NodeSet = NodeSet;
    var ONodeSet = (function (_super) {
        __extends(ONodeSet, _super);
        function ONodeSet() {
            _super.call(this, new fibra.EOMap());
        }
        return ONodeSet;
    }(NodeSet));
    fibra.ONodeSet = ONodeSet;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvcmRmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBVSxLQUFLLENBb1NkO0FBcFNELFdBQVUsS0FBSyxFQUFDLENBQUM7SUFDZixZQUFZLENBQUE7SUFTWjtRQUNFLGNBQW1CLEtBQWEsRUFBUyxRQUE2RSxFQUFTLFFBQXdDLEVBQVMsUUFBNEM7WUFBcEcsd0JBQStDLEdBQS9DLG9CQUErQztZQUFFLHdCQUFtRCxHQUFuRCxvQkFBbUQ7WUFBek0sVUFBSyxHQUFMLEtBQUssQ0FBUTtZQUFTLGFBQVEsR0FBUixRQUFRLENBQXFFO1lBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBZ0M7WUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFvQztRQUFHLENBQUM7UUFDek4sMEJBQVcsR0FBbEI7WUFDRSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDdEIsS0FBSyxXQUFXLEVBQUUsTUFBTSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQTtnQkFDL0MsS0FBSyxXQUFXLEVBQUUsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFBO2dCQUMxQyxLQUFLLFNBQVMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUE7Z0JBQ2hMLEtBQUssVUFBVSxFQUFFLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQTtnQkFDeEMsS0FBSyxjQUFjLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQTtnQkFDOUIsU0FBUyxNQUFNLG9CQUFvQixHQUFHLElBQUksQ0FBQTtZQUM1QyxDQUFDO1FBQ0gsQ0FBQztRQUNNLHFCQUFNLEdBQWIsVUFBYyxLQUFZO1lBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLEtBQUssQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFnQixLQUFNLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQWdCLEtBQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFBO1FBQzFNLENBQUM7UUFDSCxXQUFDO0lBQUQsQ0FmQSxBQWVDLElBQUE7SUFmWSxVQUFJLE9BZWhCLENBQUE7SUFFQTtRQUFrQyxnQ0FBSTtRQUNyQyxzQkFBWSxLQUFZO1lBQ3RCLGtCQUFNLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUNwRSxDQUFDO1FBQ0gsbUJBQUM7SUFBRCxDQUpDLEFBSUEsQ0FKa0MsSUFBSSxHQUl0QztJQUphLGtCQUFZLGVBSXpCLENBQUE7SUFFRDtRQUFrQyxnQ0FBSTtRQUtwQztZQUFnQixrQkFBTSxFQUFFLEVBQUUsY0FBYyxDQUFDLENBQUE7UUFBQyxDQUFDO1FBRnBDLGtDQUFXLEdBQWxCLGNBQStCLE1BQU0sQ0FBQyxFQUFFLENBQUEsQ0FBQyxDQUFDO1FBQ25DLDZCQUFNLEdBQWIsVUFBYyxLQUFZLElBQWEsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEtBQUssY0FBYyxDQUFBLENBQUMsQ0FBQztRQUhuRSxxQkFBUSxHQUFrQixJQUFJLFlBQVksRUFBRSxDQUFBO1FBSzVELG1CQUFDO0lBQUQsQ0FOQSxBQU1DLENBTmlDLElBQUksR0FNckM7SUFOWSxrQkFBWSxlQU14QixDQUFBO0lBRUQ7UUFBOEIsNEJBQUk7UUFFaEMsa0JBQVksS0FBYTtZQUFJLGtCQUFNLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQTtRQUFDLENBQUM7UUFDaEQsOEJBQVcsR0FBbEIsY0FBK0IsTUFBTSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFBLENBQUMsQ0FBQztRQUMxRCxlQUFDO0lBQUQsQ0FKQSxBQUlDLENBSjZCLElBQUksR0FJakM7SUFKWSxjQUFRLFdBSXBCLENBQUE7SUFFRDtRQUErQiw2QkFBSTtRQUVqQyxtQkFBWSxLQUFhO1lBQUksa0JBQU0sS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFBO1FBQUMsQ0FBQztRQUNqRCwrQkFBVyxHQUFsQixjQUErQixNQUFNLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFBLENBQUMsQ0FBQztRQUNoRSxnQkFBQztJQUFELENBSkEsQUFJQyxDQUo4QixJQUFJLEdBSWxDO0lBSlksZUFBUyxZQUlyQixDQUFBO0lBRUQ7UUFBK0IsNkJBQUk7UUFFakMsbUJBQVksS0FBYTtZQUFJLGtCQUFNLEtBQUssRUFBRSxXQUFXLENBQUMsQ0FBQTtRQUFDLENBQUM7UUFDakQsK0JBQVcsR0FBbEIsY0FBK0IsTUFBTSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFBLENBQUMsQ0FBQztRQUMxRCxnQkFBQztJQUFELENBSkEsQUFJQyxDQUo4QixJQUFJLEdBSWxDO0lBSlksZUFBUyxZQUlyQixDQUFBO0lBRUQ7UUFBNkIsMkJBQUk7UUFJL0IsaUJBQVksS0FBYSxFQUFFLFFBQXFCLEVBQUUsUUFBcUI7WUFBNUMsd0JBQXFCLEdBQXJCLGFBQXFCO1lBQzlDLGtCQUFNLEtBQUssRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFFBQVEsR0FBRyxRQUFRLEdBQUcsQ0FBQyxRQUFRLEtBQUssRUFBRSxHQUFHLEdBQUcsQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7UUFDaEgsQ0FBQztRQUNILGNBQUM7SUFBRCxDQVBBLEFBT0MsQ0FQNEIsSUFBSSxHQU9oQztJQVBZLGFBQU8sVUFPbkIsQ0FBQTtJQUVEO1FBQ0UsY0FDUyxPQUFjLEVBQ2QsU0FBZ0IsRUFDaEIsTUFBYSxFQUNiLEtBQVk7WUFIWixZQUFPLEdBQVAsT0FBTyxDQUFPO1lBQ2QsY0FBUyxHQUFULFNBQVMsQ0FBTztZQUNoQixXQUFNLEdBQU4sTUFBTSxDQUFPO1lBQ2IsVUFBSyxHQUFMLEtBQUssQ0FBTztRQUNsQixDQUFDO1FBQ0csMEJBQVcsR0FBbEI7WUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxLQUFLLGNBQWMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDNUwsQ0FBQztRQUNNLHFCQUFNLEdBQWIsVUFBYyxLQUFZO1lBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDM0osQ0FBQztRQUNILFdBQUM7SUFBRCxDQWJBLEFBYUMsSUFBQTtJQWJZLFVBQUksT0FhaEIsQ0FBQTtJQUVEO1FBRUUsZ0JBQ1MsT0FBYyxFQUNkLFNBQWdCLEVBQ2hCLE1BQWE7WUFGYixZQUFPLEdBQVAsT0FBTyxDQUFPO1lBQ2QsY0FBUyxHQUFULFNBQVMsQ0FBTztZQUNoQixXQUFNLEdBQU4sTUFBTSxDQUFPO1lBSmYsVUFBSyxHQUFrQixZQUFZLENBQUMsUUFBUSxDQUFBO1FBS2hELENBQUM7UUFDRyw0QkFBVyxHQUFsQjtZQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBQ3pHLENBQUM7UUFDTSx1QkFBTSxHQUFiLFVBQWMsS0FBWTtZQUN4QixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQzNKLENBQUM7UUFDSCxhQUFDO0lBQUQsQ0FiQSxBQWFDLElBQUE7SUFiWSxZQUFNLFNBYWxCLENBQUE7SUFHRDtRQUNFLGVBQ1MsS0FBWSxFQUNaLE9BQXFCO1lBQTVCLHVCQUE0QixHQUE1QixZQUE0QjtZQURyQixVQUFLLEdBQUwsS0FBSyxDQUFPO1lBQ1osWUFBTyxHQUFQLE9BQU8sQ0FBYztRQUMzQixDQUFDO1FBQ04sWUFBQztJQUFELENBTEEsQUFLQyxJQUFBO0lBTFksV0FBSyxRQUtqQixDQUFBO0lBRUQ7UUFBQTtZQUlVLG9CQUFlLEdBQVcsQ0FBQyxDQUFBO1FBMkNyQyxDQUFDO1FBekNRLHFDQUFlLEdBQXRCLFVBQXVCLE9BQXlCO1lBQzlDLElBQUksQ0FBQyxHQUFTLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLElBQUksS0FBSyxTQUFTLEdBQUcsU0FBUyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxLQUFLLEdBQUcsV0FBVyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUE7WUFDcEksRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixDQUFDLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFBO2dCQUMzRCxDQUFDLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsS0FBSyxFQUFFLEdBQUcsR0FBRyxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDM0gsQ0FBQztZQUNELE1BQU0sQ0FBQyxDQUFDLENBQUE7UUFDVixDQUFDO1FBRU0sa0NBQVksR0FBbkIsVUFBb0IsS0FBWTtZQUM5QixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FBQztnQkFBQyxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBYSxLQUFNLENBQUMsUUFBUSxFQUFhLEtBQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUN6SCxJQUFJO2dCQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUNuRCxDQUFDO1FBQ00scURBQStCLEdBQXRDLFVBQXVDLEVBQVU7WUFDL0MsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3hCLE1BQU0sQ0FBQyxJQUFJLFNBQVMsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDdEQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM5QixNQUFNLENBQUMsSUFBSSxTQUFTLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ3ZDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksS0FBSyxHQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtnQkFDeEQsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDbEQsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUM5RCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDekQsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxTQUFTLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUNsRyxJQUFJO29CQUFDLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUNoQyxDQUFDO1FBQ0gsQ0FBQztRQUNNLCtCQUFTLEdBQWhCLFVBQWlCLEtBQWEsSUFBZ0IsTUFBTSxDQUFDLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFBLENBQUMsQ0FBQztRQUNwRSwrQkFBUyxHQUFoQixVQUFpQixLQUFjLElBQWdCLE1BQU0sQ0FBQyxJQUFJLFNBQVMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDO1FBQzlHLDZCQUFPLEdBQWQsVUFBZSxLQUFhLEVBQUUsa0JBQXFDO1lBQ2pFLEVBQUUsQ0FBQyxDQUFDLE9BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLFFBQVEsQ0FBQztnQkFBQyxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFVLGtCQUFrQixDQUFDLENBQUE7WUFDbEcsSUFBSTtnQkFBQyxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBYyxrQkFBa0IsQ0FBQyxDQUFBO1FBQzNFLENBQUM7UUFDTSw4QkFBUSxHQUFmLFVBQWdCLEtBQWEsSUFBZSxNQUFNLENBQUMsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUEsQ0FBQyxDQUFDO1FBQ2pFLGtDQUFZLEdBQW5CLGNBQXVDLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFBLENBQUMsQ0FBQztRQUM5RCw0QkFBTSxHQUFiLFVBQWMsT0FBYyxFQUFFLFNBQWdCLEVBQUUsTUFBYTtZQUMzRCxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQTtRQUMvQyxDQUFDO1FBQ00sMEJBQUksR0FBWCxVQUFZLE9BQWMsRUFBRSxTQUFnQixFQUFFLE1BQWEsRUFBRSxLQUFhO1lBQ3hFLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLEdBQUcsS0FBSyxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUNwRixDQUFDO1FBNUNhLG9CQUFRLEdBQWdCLElBQUksV0FBVyxFQUFFLENBQUE7UUE2Q3pELGtCQUFDO0lBQUQsQ0EvQ0EsQUErQ0MsSUFBQTtJQS9DWSxpQkFBVyxjQStDdkIsQ0FBQTtJQUVEO1FBQUE7UUFHQSxDQUFDO1FBRmUsT0FBRSxHQUFXLHNDQUFzQyxDQUFBO1FBQ25ELGNBQVMsR0FBZSxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLFdBQVcsQ0FBQyxDQUFBO1FBQzVFLFdBQUM7SUFBRCxDQUhBLEFBR0MsSUFBQTtJQUhZLFVBQUksT0FHaEIsQ0FBQTtJQUVEO1FBQUE7UUFHQSxDQUFDO1FBRmUsTUFBRSxHQUFXLGdDQUFnQyxDQUFBO1FBQzdDLFVBQU0sR0FBZSxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLFFBQVEsQ0FBQyxDQUFBO1FBQ3JFLFVBQUM7SUFBRCxDQUhBLEFBR0MsSUFBQTtJQUhZLFNBQUcsTUFHZixDQUFBO0lBRUQ7UUFBQTtRQUlBLENBQUM7UUFIZSxNQUFFLEdBQVcsNkNBQTZDLENBQUE7UUFDMUQsUUFBSSxHQUFlLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUE7UUFDakQsY0FBVSxHQUFlLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsWUFBWSxDQUFDLENBQUE7UUFDN0UsVUFBQztJQUFELENBSkEsQUFJQyxJQUFBO0lBSlksU0FBRyxNQUlmLENBQUE7SUFFRDtRQUFBO1FBR0EsQ0FBQztRQUZlLFlBQUUsR0FBVyxtQ0FBbUMsQ0FBQTtRQUNoRCxnQkFBTSxHQUFlLElBQUksU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsUUFBUSxDQUFDLENBQUE7UUFDM0UsZ0JBQUM7SUFBRCxDQUhBLEFBR0MsSUFBQTtJQUhZLGVBQVMsWUFHckIsQ0FBQTtJQUVEO1FBQUE7UUFLQSxDQUFDO1FBSmUsUUFBRSxHQUFXLHFDQUFxQyxDQUFBO1FBQ2xELFlBQU0sR0FBZSxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLFlBQVksQ0FBQyxDQUFBO1FBQzNELFdBQUssR0FBZSxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLFdBQVcsQ0FBQyxDQUFBO1FBQ3pELFdBQUssR0FBZSxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLFdBQVcsQ0FBQyxDQUFBO1FBQ3pFLFlBQUM7SUFBRCxDQUxBLEFBS0MsSUFBQTtJQUxZLFdBQUssUUFLakIsQ0FBQTtJQUVEO1FBQUE7UUFPQSxDQUFDO1FBTmUsUUFBRSxHQUFXLGtDQUFrQyxDQUFBO1FBQy9DLHVCQUFpQixHQUFlLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsbUJBQW1CLENBQUMsQ0FBQTtRQUM3RSwwQkFBb0IsR0FBZSxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLHNCQUFzQixDQUFDLENBQUE7UUFDbkYsMkJBQXFCLEdBQWUsSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyx1QkFBdUIsQ0FBQyxDQUFBO1FBQ3JGLG1CQUFhLEdBQWUsSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxlQUFlLENBQUMsQ0FBQTtRQUNyRSxrQkFBWSxHQUFlLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsY0FBYyxDQUFDLENBQUE7UUFDbkYsWUFBQztJQUFELENBUEEsQUFPQyxJQUFBO0lBUFksV0FBSyxRQU9qQixDQUFBO0lBRUQ7UUFDRSxrQkFBb0IsTUFBa0QsRUFBVSxHQUE0QjtZQUFoRyxzQkFBMEQsR0FBMUQsU0FBcUMsY0FBUSxNQUFNLENBQUksRUFBRSxDQUFBLENBQUEsQ0FBQztZQUFFLG1CQUFvQyxHQUFwQyxVQUEyQixVQUFJLEVBQUs7WUFBeEYsV0FBTSxHQUFOLE1BQU0sQ0FBNEM7WUFBVSxRQUFHLEdBQUgsR0FBRyxDQUF5QjtRQUFHLENBQUM7UUFDekcsc0JBQUcsR0FBVixVQUFXLEdBQVUsRUFBRSxNQUEyQjtZQUNoRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1lBQ3hELE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ3RCLENBQUM7UUFDTSxzQkFBRyxHQUFWLFVBQVcsR0FBVTtZQUNuQixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUE7UUFDeEMsQ0FBQztRQUNNLHlCQUFNLEdBQWIsVUFBYyxHQUFVO1lBQ3RCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQTtRQUMzQyxDQUFDO1FBQ00sdUJBQUksR0FBWCxVQUFZLENBQW1EO1lBQS9ELGlCQUVDO1lBREMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSyxPQUFBLENBQUMsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLFFBQVEsQ0FBQywrQkFBK0IsQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFJLENBQUMsRUFBekUsQ0FBeUUsQ0FBQyxDQUFBO1FBQy9HLENBQUM7UUFDTSxzQkFBRyxHQUFWLFVBQVcsR0FBVTtZQUNuQixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUE7UUFDeEMsQ0FBQztRQUNNLHNCQUFHLEdBQVYsVUFBVyxHQUFVLEVBQUUsS0FBUTtZQUM3QixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUE7WUFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQTtRQUNiLENBQUM7UUFDRCxzQkFBSSwwQkFBSTtpQkFBUjtnQkFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtZQUN4QixDQUFDOzs7V0FBQTtRQUNNLHlCQUFNLEdBQWI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtRQUMxQixDQUFDO1FBQ00sdUJBQUksR0FBWDtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLFdBQVcsQ0FBQyxRQUFRLENBQUMsK0JBQStCLENBQUMsQ0FBQyxDQUFDLEVBQXZELENBQXVELENBQUMsQ0FBQTtRQUMxRixDQUFDO1FBQ00sMEJBQU8sR0FBZDtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBTSxNQUFNLENBQUMsRUFBRSxHQUFHLEVBQUUsV0FBVyxDQUFDLFFBQVEsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQSxDQUFBLENBQUMsQ0FBQyxDQUFBO1FBQ3BJLENBQUM7UUFDTSx3QkFBSyxHQUFaO1lBQ0UsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtZQUNoQixNQUFNLENBQUMsSUFBSSxDQUFBO1FBQ2IsQ0FBQztRQUNILGVBQUM7SUFBRCxDQXZDQSxBQXVDQyxJQUFBO0lBdkNZLGNBQVEsV0F1Q3BCLENBQUE7SUFFRDtRQUFrQyw2QkFBVztRQUMzQyxtQkFBWSxNQUEyQjtZQUNyQyxrQkFBTSxNQUFNLEVBQUUsSUFBSSxXQUFLLEVBQUssQ0FBQyxDQUFBO1FBQy9CLENBQUM7UUFDSCxnQkFBQztJQUFELENBSkEsQUFJQyxDQUppQyxRQUFRLEdBSXpDO0lBSlksZUFBUyxZQUlyQixDQUFBO0lBRUQ7UUFFRSxpQkFBWSxHQUE0QjtZQUE1QixtQkFBNEIsR0FBNUIsVUFBbUIsVUFBSSxFQUFLO1lBQ3RDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxRQUFRLENBQUksU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQzFDLENBQUM7UUFDTSxxQkFBRyxHQUFWLFVBQVcsS0FBUTtZQUNqQixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUE7WUFDeEIsTUFBTSxDQUFDLElBQUksQ0FBQTtRQUNiLENBQUM7UUFDTSxzQkFBSSxHQUFYLFVBQVksR0FBUTtZQUFwQixpQkFHQztZQUZDLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxLQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFYLENBQVcsQ0FBQyxDQUFBO1lBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUE7UUFDYixDQUFDO1FBQ00sc0JBQUksR0FBWCxVQUFZLElBQWdCO1lBQTVCLGlCQUdDO1lBRkMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQVgsQ0FBVyxDQUFDLENBQUE7WUFDM0IsTUFBTSxDQUFDLElBQUksQ0FBQTtRQUNiLENBQUM7UUFDTSxxQkFBRyxHQUFWLFVBQVcsS0FBUTtZQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDMUIsQ0FBQztRQUNNLHFCQUFHLEdBQVYsVUFBVyxLQUFRO1lBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUMxQixDQUFDO1FBQ00sdUJBQUssR0FBWjtZQUNFLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUE7WUFDZCxNQUFNLENBQUMsSUFBSSxDQUFBO1FBQ2IsQ0FBQztRQUVNLHdCQUFNLEdBQWIsVUFBYyxLQUFRO1lBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUM3QixDQUFDO1FBRU0sd0JBQU0sR0FBYjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFBO1FBQ3hCLENBQUM7UUFFRCxzQkFBSSx5QkFBSTtpQkFBUjtnQkFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUE7WUFDcEIsQ0FBQzs7O1dBQUE7UUFFTSxzQkFBSSxHQUFYLFVBQVksQ0FBOEM7WUFBMUQsaUJBRUM7WUFEQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFLLE9BQUEsQ0FBQyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSSxDQUFDLEVBQXJCLENBQXFCLENBQUMsQ0FBQTtRQUN6RCxDQUFDO1FBQ0gsY0FBQztJQUFELENBM0NBLEFBMkNDLElBQUE7SUEzQ1ksYUFBTyxVQTJDbkIsQ0FBQTtJQUVEO1FBQStDLDRCQUFVO1FBQ3ZEO1lBQ0Usa0JBQU0sSUFBSSxXQUFLLEVBQUssQ0FBQyxDQUFBO1FBQ3ZCLENBQUM7UUFDSCxlQUFDO0lBQUQsQ0FKQSxBQUlDLENBSjhDLE9BQU8sR0FJckQ7SUFKWSxjQUFRLFdBSXBCLENBQUE7QUFJSCxDQUFDLEVBcFNTLEtBQUssS0FBTCxLQUFLLFFBb1NkIiwiZmlsZSI6InNjcmlwdHMvcmRmLmpzIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIGZpYnJhIHtcbiAgJ3VzZSBzdHJpY3QnXG5cbiAgaW1wb3J0IHMgPSBmaS5zZWNvLnNwYXJxbFxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgSU5vZGUgZXh0ZW5kcyBJVGVybSB7XG4gICAgbGFuZ3VhZ2U/OiBzdHJpbmdcbiAgICBkYXRhdHlwZT86IElOYW1lZE5vZGVcbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBOb2RlIGltcGxlbWVudHMgSU5vZGUge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB2YWx1ZTogc3RyaW5nLCBwdWJsaWMgdGVybVR5cGU6ICdOYW1lZE5vZGUnIHwgJ0JsYW5rTm9kZScgfCAnTGl0ZXJhbCcgfCAnVmFyaWFibGUnIHwgJ0RlZmF1bHRHcmFwaCcsIHB1YmxpYyBsYW5ndWFnZTogc3RyaW5nIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkLCBwdWJsaWMgZGF0YXR5cGU6IElOYW1lZE5vZGUgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQpIHt9XG4gICAgcHVibGljIHRvQ2Fub25pY2FsKCk6IHN0cmluZyB7XG4gICAgICBzd2l0Y2ggKHRoaXMudGVybVR5cGUpIHtcbiAgICAgICAgY2FzZSAnTmFtZWROb2RlJzogcmV0dXJuICc8JyArIHRoaXMudmFsdWUgKyAnPidcbiAgICAgICAgY2FzZSAnQmxhbmtOb2RlJzogcmV0dXJuICdfOicgKyB0aGlzLnZhbHVlXG4gICAgICAgIGNhc2UgJ0xpdGVyYWwnOiByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy52YWx1ZSkgKyAodGhpcy5sYW5ndWFnZSA/ICdAJyArIHRoaXMubGFuZ3VhZ2UgOiAoWE1MU2NoZW1hLnN0cmluZy5lcXVhbHModGhpcy5kYXRhdHlwZSEpID8gJycgOiAnXl4nICsgdGhpcy5kYXRhdHlwZSEudG9DYW5vbmljYWwoKSkpXG4gICAgICAgIGNhc2UgJ1ZhcmlhYmxlJzogcmV0dXJuICc/JyArIHRoaXMudmFsdWVcbiAgICAgICAgY2FzZSAnRGVmYXVsdEdyYXBoJzogcmV0dXJuICcnXG4gICAgICAgIGRlZmF1bHQ6IHRocm93ICdVbmtub3duIHRlcm0gdHlwZSAnICsgdGhpc1xuICAgICAgfVxuICAgIH1cbiAgICBwdWJsaWMgZXF1YWxzKG90aGVyOiBJVGVybSk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIHRoaXMudGVybVR5cGUgPT09IG90aGVyLnRlcm1UeXBlICYmIHRoaXMudmFsdWUgPT09IG90aGVyLnZhbHVlICYmICh0aGlzLnRlcm1UeXBlICE9PSAnTGl0ZXJhbCcgfHwgKHRoaXMubGFuZ3VhZ2UgPT09ICg8SUxpdGVyYWw+b3RoZXIpLmxhbmd1YWdlICYmIHRoaXMuZGF0YXR5cGUgPT09ICg8SUxpdGVyYWw+b3RoZXIpLmRhdGF0eXBlKSlcbiAgICB9XG4gIH1cblxuICAgZXhwb3J0IGNsYXNzIE5vZGVGcm9tTm9kZSBleHRlbmRzIE5vZGUge1xuICAgIGNvbnN0cnVjdG9yKG90aGVyOiBJTm9kZSkge1xuICAgICAgc3VwZXIob3RoZXIudmFsdWUsIG90aGVyLnRlcm1UeXBlLCBvdGhlci5sYW5ndWFnZSwgb3RoZXIuZGF0YXR5cGUpXG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIERlZmF1bHRHcmFwaCBleHRlbmRzIE5vZGUgaW1wbGVtZW50cyBJRGVmYXVsdEdyYXBoIHtcbiAgICBwdWJsaWMgc3RhdGljIGluc3RhbmNlOiBJRGVmYXVsdEdyYXBoID0gbmV3IERlZmF1bHRHcmFwaCgpXG4gICAgcHVibGljIHRlcm1UeXBlOiAnRGVmYXVsdEdyYXBoJ1xuICAgIHB1YmxpYyB0b0Nhbm9uaWNhbCgpOiBzdHJpbmcgeyByZXR1cm4gJycgfVxuICAgIHB1YmxpYyBlcXVhbHMob3RoZXI6IElUZXJtKTogYm9vbGVhbiB7IHJldHVybiBvdGhlci50ZXJtVHlwZSA9PT0gJ0RlZmF1bHRHcmFwaCcgfVxuICAgIGNvbnN0cnVjdG9yKCkgeyBzdXBlcignJywgJ0RlZmF1bHRHcmFwaCcpIH1cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBWYXJpYWJsZSBleHRlbmRzIE5vZGUgaW1wbGVtZW50cyBJVmFyaWFibGUge1xuICAgIHB1YmxpYyB0ZXJtVHlwZTogJ1ZhcmlhYmxlJ1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlOiBzdHJpbmcpIHsgc3VwZXIodmFsdWUsICdWYXJpYWJsZScpIH1cbiAgICBwdWJsaWMgdG9DYW5vbmljYWwoKTogc3RyaW5nIHsgcmV0dXJuICc/JyArIHRoaXMudmFsdWUgfVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIE5hbWVkTm9kZSBleHRlbmRzIE5vZGUgaW1wbGVtZW50cyBJTmFtZWROb2RlIHtcbiAgICBwdWJsaWMgdGVybVR5cGU6ICdOYW1lZE5vZGUnXG4gICAgY29uc3RydWN0b3IodmFsdWU6IHN0cmluZykgeyBzdXBlcih2YWx1ZSwgJ05hbWVkTm9kZScpIH1cbiAgICBwdWJsaWMgdG9DYW5vbmljYWwoKTogc3RyaW5nIHsgcmV0dXJuICc8JyArIHRoaXMudmFsdWUgKyAnPicgfVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIEJsYW5rTm9kZSBleHRlbmRzIE5vZGUgaW1wbGVtZW50cyBJQmxhbmtOb2RlIHtcbiAgICBwdWJsaWMgdGVybVR5cGU6ICdCbGFua05vZGUnXG4gICAgY29uc3RydWN0b3IodmFsdWU6IHN0cmluZykgeyBzdXBlcih2YWx1ZSwgJ0JsYW5rTm9kZScpIH1cbiAgICBwdWJsaWMgdG9DYW5vbmljYWwoKTogc3RyaW5nIHsgcmV0dXJuICc/JyArIHRoaXMudmFsdWUgfVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIExpdGVyYWwgZXh0ZW5kcyBOb2RlIGltcGxlbWVudHMgSUxpdGVyYWwge1xuICAgIHB1YmxpYyB0ZXJtVHlwZTogJ0xpdGVyYWwnXG4gICAgcHVibGljIGxhbmd1YWdlOiBzdHJpbmdcbiAgICBwdWJsaWMgZGF0YXR5cGU6IElOYW1lZE5vZGVcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZTogc3RyaW5nLCBsYW5ndWFnZTogc3RyaW5nID0gJycsIGRhdGF0eXBlPzogSU5hbWVkTm9kZSkge1xuICAgICAgc3VwZXIodmFsdWUsICdMaXRlcmFsJywgbGFuZ3VhZ2UsIGRhdGF0eXBlID8gZGF0YXR5cGUgOiAobGFuZ3VhZ2UgIT09ICcnID8gUkRGLmxhbmdTdHJpbmcgOiBYTUxTY2hlbWEuc3RyaW5nKSlcbiAgICB9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgUXVhZCBpbXBsZW1lbnRzIElRdWFkIHtcbiAgICBjb25zdHJ1Y3RvciAoXG4gICAgICBwdWJsaWMgc3ViamVjdDogSU5vZGUsXG4gICAgICBwdWJsaWMgcHJlZGljYXRlOiBJTm9kZSxcbiAgICAgIHB1YmxpYyBvYmplY3Q6IElOb2RlLFxuICAgICAgcHVibGljIGdyYXBoOiBJTm9kZVxuICAgICkge31cbiAgICBwdWJsaWMgdG9DYW5vbmljYWwoKTogc3RyaW5nIHtcbiAgICAgcmV0dXJuIHRoaXMuc3ViamVjdC50b0Nhbm9uaWNhbCgpICsgJyAnICsgdGhpcy5wcmVkaWNhdGUudG9DYW5vbmljYWwoKSArICcgJyArIHRoaXMub2JqZWN0LnRvQ2Fub25pY2FsKCkgKyAodGhpcy5ncmFwaC50ZXJtVHlwZSA9PT0gJ0RlZmF1bHRHcmFwaCcgPyAnJyA6ICgnICcgKyB0aGlzLmdyYXBoLnRvQ2Fub25pY2FsKCkpKVxuICAgIH1cbiAgICBwdWJsaWMgZXF1YWxzKG90aGVyOiBJUXVhZCk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIHRoaXMuc3ViamVjdC5lcXVhbHMob3RoZXIuc3ViamVjdCkgJiYgdGhpcy5wcmVkaWNhdGUuZXF1YWxzKG90aGVyLnByZWRpY2F0ZSkgJiYgdGhpcy5vYmplY3QuZXF1YWxzKG90aGVyLm9iamVjdCkgJiYgdGhpcy5ncmFwaC5lcXVhbHMob3RoZXIuZ3JhcGgpXG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIFRyaXBsZSBpbXBsZW1lbnRzIElUcmlwbGUge1xuICAgIHB1YmxpYyBncmFwaDogSURlZmF1bHRHcmFwaCA9IERlZmF1bHRHcmFwaC5pbnN0YW5jZVxuICAgIGNvbnN0cnVjdG9yIChcbiAgICAgIHB1YmxpYyBzdWJqZWN0OiBJTm9kZSxcbiAgICAgIHB1YmxpYyBwcmVkaWNhdGU6IElOb2RlLFxuICAgICAgcHVibGljIG9iamVjdDogSU5vZGVcbiAgICApIHt9XG4gICAgcHVibGljIHRvQ2Fub25pY2FsKCk6IHN0cmluZyB7XG4gICAgIHJldHVybiB0aGlzLnN1YmplY3QudG9DYW5vbmljYWwoKSArICcgJyArIHRoaXMucHJlZGljYXRlLnRvQ2Fub25pY2FsKCkgKyAnICcgKyB0aGlzLm9iamVjdC50b0Nhbm9uaWNhbCgpXG4gICAgfVxuICAgIHB1YmxpYyBlcXVhbHMob3RoZXI6IElRdWFkKTogYm9vbGVhbiB7XG4gICAgICByZXR1cm4gdGhpcy5zdWJqZWN0LmVxdWFscyhvdGhlci5zdWJqZWN0KSAmJiB0aGlzLnByZWRpY2F0ZS5lcXVhbHMob3RoZXIucHJlZGljYXRlKSAmJiB0aGlzLm9iamVjdC5lcXVhbHMob3RoZXIub2JqZWN0KSAmJiB0aGlzLmdyYXBoLmVxdWFscyhvdGhlci5ncmFwaClcbiAgICB9XG4gIH1cblxuXG4gIGV4cG9ydCBjbGFzcyBHcmFwaCB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgZ3JhcGg6IElOb2RlLFxuICAgICAgcHVibGljIHRyaXBsZXM6IElRdWFkW10gPSBbXVxuICAgICkge31cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBEYXRhRmFjdG9yeSBpbXBsZW1lbnRzIElEYXRhRmFjdG9yeSB7XG5cbiAgICBwdWJsaWMgc3RhdGljIGluc3RhbmNlOiBEYXRhRmFjdG9yeSA9IG5ldyBEYXRhRmFjdG9yeSgpXG5cbiAgICBwcml2YXRlIG5leHRCbGFua05vZGVJZDogbnVtYmVyID0gMFxuXG4gICAgcHVibGljIG5vZGVGcm9tQmluZGluZyhiaW5kaW5nOiBzLklTcGFycWxCaW5kaW5nKTogSU5vZGUge1xuICAgICAgbGV0IG46IE5vZGUgPSBuZXcgTm9kZShiaW5kaW5nLnZhbHVlLCBiaW5kaW5nLnR5cGUgPT09ICdsaXRlcmFsJyA/ICdMaXRlcmFsJyA6IChiaW5kaW5nLnR5cGUgPT09ICd1cmknID8gJ05hbWVkTm9kZScgOiAnQmxhbmtOb2RlJykpXG4gICAgICBpZiAoYmluZGluZy50eXBlID09PSAnbGl0ZXJhbCcpIHtcbiAgICAgICAgbi5sYW5ndWFnZSA9IGJpbmRpbmdbJ3htbDpsYW5nJ10gPyBiaW5kaW5nWyd4bWw6bGFuZyddIDogJydcbiAgICAgICAgbi5kYXRhdHlwZSA9IGJpbmRpbmcuZGF0YXR5cGUgPyBuZXcgTmFtZWROb2RlKGJpbmRpbmcuZGF0YXR5cGUpIDogKG4ubGFuZ3VhZ2UgIT09ICcnID8gUkRGLmxhbmdTdHJpbmcgOiBYTUxTY2hlbWEuc3RyaW5nKVxuICAgICAgfVxuICAgICAgcmV0dXJuIG5cbiAgICB9XG5cbiAgICBwdWJsaWMgbm9kZUZyb21Ob2RlKG90aGVyOiBJVGVybSk6IElOb2RlIHtcbiAgICAgIGlmIChvdGhlci50ZXJtVHlwZSA9PT0gJ0xpdGVyYWwnKSByZXR1cm4gbmV3IExpdGVyYWwob3RoZXIudmFsdWUsICg8SUxpdGVyYWw+b3RoZXIpLmxhbmd1YWdlLCAoPElMaXRlcmFsPm90aGVyKS5kYXRhdHlwZSlcbiAgICAgIGVsc2UgcmV0dXJuIG5ldyBOb2RlKG90aGVyLnZhbHVlLCBvdGhlci50ZXJtVHlwZSlcbiAgICB9XG4gICAgcHVibGljIG5vZGVGcm9tQ2Fub25pY2FsUmVwcmVzZW50YXRpb24oaWQ6IHN0cmluZyk6IElOb2RlIHtcbiAgICAgIGlmIChpZC5pbmRleE9mKCc8JykgPT09IDApXG4gICAgICAgIHJldHVybiBuZXcgTmFtZWROb2RlKGlkLnN1YnN0cmluZygxLCBpZC5sZW5ndGggLSAxKSlcbiAgICAgIGVsc2UgaWYgKGlkLmluZGV4T2YoJ186JykgPT09IDApXG4gICAgICAgIHJldHVybiBuZXcgQmxhbmtOb2RlKGlkLnN1YnN0cmluZygyKSlcbiAgICAgIGVsc2Uge1xuICAgICAgICBsZXQgdmFsdWU6IHN0cmluZyA9IGlkLnN1YnN0cmluZygxLCBpZC5sYXN0SW5kZXhPZignXCInKSlcbiAgICAgICAgaWYgKGlkLmxhc3RJbmRleE9mKCdAJykgPT09IGlkLmxhc3RJbmRleE9mKCdcIicpICsgMSlcbiAgICAgICAgICByZXR1cm4gbmV3IExpdGVyYWwodmFsdWUsIGlkLnN1YnN0cmluZyhpZC5sYXN0SW5kZXhPZignQCcpKSlcbiAgICAgICAgZWxzZSBpZiAoaWQubGFzdEluZGV4T2YoJ15ePCcpID09PSBpZC5sYXN0SW5kZXhPZignXCInKSArIDEpXG4gICAgICAgICAgcmV0dXJuIG5ldyBMaXRlcmFsKHZhbHVlLCAnJywgbmV3IE5hbWVkTm9kZShpZC5zdWJzdHJpbmcoaWQubGFzdEluZGV4T2YoJ15ePCcpLCBpZC5sZW5ndGggLSAxKSkpXG4gICAgICAgIGVsc2UgcmV0dXJuIG5ldyBMaXRlcmFsKHZhbHVlKVxuICAgICAgfVxuICAgIH1cbiAgICBwdWJsaWMgbmFtZWROb2RlKHZhbHVlOiBzdHJpbmcpOiBJTmFtZWROb2RlIHsgcmV0dXJuIG5ldyBOYW1lZE5vZGUodmFsdWUpIH1cbiAgICBwdWJsaWMgYmxhbmtOb2RlKHZhbHVlPzogc3RyaW5nKTogSUJsYW5rTm9kZSB7IHJldHVybiBuZXcgQmxhbmtOb2RlKHZhbHVlID8gdmFsdWUgOiAoJ2InICsgKyt0aGlzLm5leHRCbGFua05vZGVJZCkpIH1cbiAgICBwdWJsaWMgbGl0ZXJhbCh2YWx1ZTogc3RyaW5nLCBsYW5ndWFnZU9yRGF0YXR5cGU/OiBzdHJpbmd8TmFtZWROb2RlKTogSUxpdGVyYWwge1xuICAgICAgaWYgKHR5cGVvZihsYW5ndWFnZU9yRGF0YXR5cGUpID09PSAnc3RyaW5nJykgcmV0dXJuIG5ldyBMaXRlcmFsKHZhbHVlLCA8c3RyaW5nPmxhbmd1YWdlT3JEYXRhdHlwZSlcbiAgICAgIGVsc2UgcmV0dXJuIG5ldyBMaXRlcmFsKHZhbHVlLCB1bmRlZmluZWQgLCA8TmFtZWROb2RlPmxhbmd1YWdlT3JEYXRhdHlwZSlcbiAgICB9XG4gICAgcHVibGljIHZhcmlhYmxlKHZhbHVlOiBzdHJpbmcpOiBJVmFyaWFibGUgeyByZXR1cm4gbmV3IFZhcmlhYmxlKHZhbHVlKSB9XG4gICAgcHVibGljIGRlZmF1bHRHcmFwaCgpOiBJRGVmYXVsdEdyYXBoIHsgcmV0dXJuIERlZmF1bHRHcmFwaC5pbnN0YW5jZSB9XG4gICAgcHVibGljIHRyaXBsZShzdWJqZWN0OiBJVGVybSwgcHJlZGljYXRlOiBJVGVybSwgb2JqZWN0OiBJVGVybSk6IElRdWFkIHtcbiAgICAgIHJldHVybiBuZXcgVHJpcGxlKHN1YmplY3QsIHByZWRpY2F0ZSwgb2JqZWN0KVxuICAgIH1cbiAgICBwdWJsaWMgcXVhZChzdWJqZWN0OiBJVGVybSwgcHJlZGljYXRlOiBJVGVybSwgb2JqZWN0OiBJVGVybSwgZ3JhcGg/OiBJVGVybSk6IElRdWFkIHtcbiAgICAgIHJldHVybiBuZXcgUXVhZChzdWJqZWN0LCBwcmVkaWNhdGUsIG9iamVjdCwgZ3JhcGggPyBncmFwaCA6IERlZmF1bHRHcmFwaC5pbnN0YW5jZSlcbiAgICB9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgU0tPUyB7XG4gICAgcHVibGljIHN0YXRpYyBuczogc3RyaW5nID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDQvMDIvc2tvcy9jb3JlIydcbiAgICBwdWJsaWMgc3RhdGljIHByZWZMYWJlbDogSU5hbWVkTm9kZSA9IG5ldyBOYW1lZE5vZGUoU0tPUy5ucyArICdwcmVmTGFiZWwnKVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIE9XTCB7XG4gICAgcHVibGljIHN0YXRpYyBuczogc3RyaW5nID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDIvMDcvb3dsIydcbiAgICBwdWJsaWMgc3RhdGljIHNhbWVBczogSU5hbWVkTm9kZSA9IG5ldyBOYW1lZE5vZGUoT1dMLm5zICsgJ3NhbWVBcycpXG4gIH1cblxuICBleHBvcnQgY2xhc3MgUkRGIHtcbiAgICBwdWJsaWMgc3RhdGljIG5zOiBzdHJpbmcgPSAnaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIydcbiAgICBwdWJsaWMgc3RhdGljIHR5cGU6IElOYW1lZE5vZGUgPSBuZXcgTmFtZWROb2RlKFJERi5ucyArICd0eXBlJylcbiAgICBwdWJsaWMgc3RhdGljIGxhbmdTdHJpbmc6IElOYW1lZE5vZGUgPSBuZXcgTmFtZWROb2RlKFJERi5ucyArICdsYW5nU3RyaW5nJylcbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBYTUxTY2hlbWEge1xuICAgIHB1YmxpYyBzdGF0aWMgbnM6IHN0cmluZyA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYSMnXG4gICAgcHVibGljIHN0YXRpYyBzdHJpbmc6IElOYW1lZE5vZGUgPSBuZXcgTmFtZWROb2RlKFhNTFNjaGVtYS5ucyArICdzdHJpbmcnKVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIENJRE9DIHtcbiAgICBwdWJsaWMgc3RhdGljIG5zOiBzdHJpbmcgPSAnaHR0cDovL3d3dy5jaWRvYy1jcm0ub3JnL2NpZG9jLWNybS8nXG4gICAgcHVibGljIHN0YXRpYyBQZXJzb246IElOYW1lZE5vZGUgPSBuZXcgTmFtZWROb2RlKENJRE9DLm5zICsgJ0UyMV9QZXJzb24nKVxuICAgIHB1YmxpYyBzdGF0aWMgUGxhY2U6IElOYW1lZE5vZGUgPSBuZXcgTmFtZWROb2RlKENJRE9DLm5zICsgJ0U1M19QbGFjZScpXG4gICAgcHVibGljIHN0YXRpYyBHcm91cDogSU5hbWVkTm9kZSA9IG5ldyBOYW1lZE5vZGUoQ0lET0MubnMgKyAnRTc0X0dyb3VwJylcbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBHRVRUWSB7XG4gICAgcHVibGljIHN0YXRpYyBuczogc3RyaW5nID0gJ2h0dHA6Ly92b2NhYi5nZXR0eS5lZHUvb250b2xvZ3kjJ1xuICAgIHB1YmxpYyBzdGF0aWMgQWRtaW5QbGFjZUNvbmNlcHQ6IElOYW1lZE5vZGUgPSBuZXcgTmFtZWROb2RlKEdFVFRZLm5zICsgJ0FkbWluUGxhY2VDb25jZXB0JylcbiAgICBwdWJsaWMgc3RhdGljIFBoeXNpY2FsUGxhY2VDb25jZXB0OiBJTmFtZWROb2RlID0gbmV3IE5hbWVkTm9kZShHRVRUWS5ucyArICdQaHlzaWNhbFBsYWNlQ29uY2VwdCcpXG4gICAgcHVibGljIHN0YXRpYyBQaHlzQWRtaW5QbGFjZUNvbmNlcHQ6IElOYW1lZE5vZGUgPSBuZXcgTmFtZWROb2RlKEdFVFRZLm5zICsgJ1BoeXNBZG1pblBsYWNlQ29uY2VwdCcpXG4gICAgcHVibGljIHN0YXRpYyBQZXJzb25Db25jZXB0OiBJTmFtZWROb2RlID0gbmV3IE5hbWVkTm9kZShHRVRUWS5ucyArICdQZXJzb25Db25jZXB0JylcbiAgICBwdWJsaWMgc3RhdGljIEdyb3VwQ29uY2VwdDogSU5hbWVkTm9kZSA9IG5ldyBOYW1lZE5vZGUoR0VUVFkubnMgKyAnR3JvdXBDb25jZXB0JylcbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBFTm9kZU1hcDxWPiB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjcmVhdGU6IChrZXk/OiBJTm9kZSkgPT4gViA9ICgpID0+IHsgcmV0dXJuIDxWPnt9fSwgcHJpdmF0ZSBtYXA6IEVNYXA8Vj4gPSBuZXcgRU1hcDxWPigpKSB7fVxuICAgIHB1YmxpYyBnb2Moa2V5OiBJTm9kZSwgY3JlYXRlPzogKGtleT86IElOb2RlKSA9PiBWKTogViB7XG4gICAgICBpZiAoIXRoaXMuaGFzKGtleSkpXG4gICAgICAgIHRoaXMuc2V0KGtleSwgY3JlYXRlID8gY3JlYXRlKGtleSkgOiB0aGlzLmNyZWF0ZShrZXkpKVxuICAgICAgcmV0dXJuIHRoaXMuZ2V0KGtleSlcbiAgICB9XG4gICAgcHVibGljIGdldChrZXk6IElOb2RlKTogViB7XG4gICAgICByZXR1cm4gdGhpcy5tYXAuZ2V0KGtleS50b0Nhbm9uaWNhbCgpKVxuICAgIH1cbiAgICBwdWJsaWMgcmVtb3ZlKGtleTogSU5vZGUpOiBib29sZWFuIHtcbiAgICAgIHJldHVybiB0aGlzLm1hcC5yZW1vdmUoa2V5LnRvQ2Fub25pY2FsKCkpXG4gICAgfVxuICAgIHB1YmxpYyBlYWNoKGY6ICh2YWx1ZTogViwga2V5OiBJTm9kZSwgbWFwOiBFTm9kZU1hcDxWPikgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgdGhpcy5tYXAuZWFjaCgodmFsdWUsIGtleSwgbWFwKSA9PiBmKHZhbHVlLCBEYXRhRmFjdG9yeS5pbnN0YW5jZS5ub2RlRnJvbUNhbm9uaWNhbFJlcHJlc2VudGF0aW9uKGtleSksIHRoaXMpKVxuICAgIH1cbiAgICBwdWJsaWMgaGFzKGtleTogSU5vZGUpOiBib29sZWFuIHtcbiAgICAgIHJldHVybiB0aGlzLm1hcC5oYXMoa2V5LnRvQ2Fub25pY2FsKCkpXG4gICAgfVxuICAgIHB1YmxpYyBzZXQoa2V5OiBJTm9kZSwgdmFsdWU6IFYpOiBFTm9kZU1hcDxWPiB7XG4gICAgICB0aGlzLm1hcC5zZXQoa2V5LnRvQ2Fub25pY2FsKCksIHZhbHVlKVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gICAgZ2V0IHNpemUoKTogbnVtYmVyIHtcbiAgICAgIHJldHVybiB0aGlzLm1hcC5zaXplKClcbiAgICB9XG4gICAgcHVibGljIHZhbHVlcygpOiBWW10ge1xuICAgICAgcmV0dXJuIHRoaXMubWFwLnZhbHVlcygpXG4gICAgfVxuICAgIHB1YmxpYyBrZXlzKCk6IElOb2RlW10ge1xuICAgICAgcmV0dXJuIHRoaXMubWFwLmtleXMoKS5tYXAoayA9PiBEYXRhRmFjdG9yeS5pbnN0YW5jZS5ub2RlRnJvbUNhbm9uaWNhbFJlcHJlc2VudGF0aW9uKGspKVxuICAgIH1cbiAgICBwdWJsaWMgZW50cmllcygpOiB7a2V5OiBJTm9kZSwgdmFsdWU6IFZ9W10ge1xuICAgICAgcmV0dXJuIHRoaXMubWFwLmVudHJpZXMoKS5tYXAobyA9PiB7IHJldHVybiB7IGtleTogRGF0YUZhY3RvcnkuaW5zdGFuY2Uubm9kZUZyb21DYW5vbmljYWxSZXByZXNlbnRhdGlvbihvLmtleSksIHZhbHVlOiBvLnZhbHVlIH19KVxuICAgIH1cbiAgICBwdWJsaWMgY2xlYXIoKTogRU5vZGVNYXA8Vj4ge1xuICAgICAgdGhpcy5tYXAuY2xlYXIoKVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgRU9Ob2RlTWFwPFY+IGV4dGVuZHMgRU5vZGVNYXA8Vj4ge1xuICAgIGNvbnN0cnVjdG9yKGNyZWF0ZT86IChrZXk/OiBJTm9kZSkgPT4gViApIHtcbiAgICAgIHN1cGVyKGNyZWF0ZSwgbmV3IEVPTWFwPFY+KCkpXG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIE5vZGVTZXQ8TiBleHRlbmRzIElOb2RlPiB7XG4gICAgcHVibGljIG06IEVOb2RlTWFwPE4+XG4gICAgY29uc3RydWN0b3IobWFwOiBFTWFwPE4+ID0gbmV3IEVNYXA8Tj4oKSkge1xuICAgICAgdGhpcy5tID0gbmV3IEVOb2RlTWFwPE4+KHVuZGVmaW5lZCwgbWFwKVxuICAgIH1cbiAgICBwdWJsaWMgYWRkKHZhbHVlOiBOKTogTm9kZVNldDxOPiB7XG4gICAgICB0aGlzLm0uc2V0KHZhbHVlLCB2YWx1ZSlcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICAgIHB1YmxpYyBhZGRhKGFycjogTltdKTogdGhpcyB7XG4gICAgICBhcnIuZm9yRWFjaChuID0+IHRoaXMuYWRkKG4pKVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gICAgcHVibGljIGFkZHMob3NldDogTm9kZVNldDxOPik6IHRoaXMge1xuICAgICAgb3NldC5lYWNoKG4gPT4gdGhpcy5hZGQobikpXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgICBwdWJsaWMgaGFzKHZhbHVlOiBOKTogYm9vbGVhbiB7XG4gICAgICByZXR1cm4gdGhpcy5tLmhhcyh2YWx1ZSlcbiAgICB9XG4gICAgcHVibGljIGdldCh2YWx1ZTogTik6IE4ge1xuICAgICAgcmV0dXJuIHRoaXMubS5nZXQodmFsdWUpXG4gICAgfVxuICAgIHB1YmxpYyBjbGVhcigpOiBOb2RlU2V0PE4+IHtcbiAgICAgIHRoaXMubS5jbGVhcigpXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmUodmFsdWU6IE4pOiBib29sZWFuIHtcbiAgICAgIHJldHVybiB0aGlzLm0ucmVtb3ZlKHZhbHVlKVxuICAgIH1cblxuICAgIHB1YmxpYyB2YWx1ZXMoKTogTltdIHtcbiAgICAgIHJldHVybiB0aGlzLm0udmFsdWVzKClcbiAgICB9XG5cbiAgICBnZXQgc2l6ZSgpOiBudW1iZXIge1xuICAgICAgcmV0dXJuIHRoaXMubS5zaXplXG4gICAgfVxuXG4gICAgcHVibGljIGVhY2goZjogKHZhbHVlOiBOLCBrZXk6IE4sIHNldDogTm9kZVNldDxOPikgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgdGhpcy5tLmVhY2goKHZhbHVlLCBrZXksIG1hcCkgPT4gZih2YWx1ZSwgdmFsdWUsIHRoaXMpKVxuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBPTm9kZVNldDxOIGV4dGVuZHMgSU5vZGU+IGV4dGVuZHMgTm9kZVNldDxOPiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICBzdXBlcihuZXcgRU9NYXA8Tj4oKSlcbiAgICB9XG4gIH1cblxuXG5cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

var fibra;
(function (fibra) {
    'use strict';
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvcmRmanMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBVSxLQUFLLENBd0RkO0FBeERELFdBQVUsS0FBSyxFQUFDLENBQUM7SUFDZixZQUFZLENBQUE7QUF1RGQsQ0FBQyxFQXhEUyxLQUFLLEtBQUwsS0FBSyxRQXdEZCIsImZpbGUiOiJzY3JpcHRzL3JkZmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIGZpYnJhIHtcbiAgJ3VzZSBzdHJpY3QnXG5cbiAgZXhwb3J0IGludGVyZmFjZSBJVGVybSB7XG4gICAgdGVybVR5cGU6ICdOYW1lZE5vZGUnIHwgJ0JsYW5rTm9kZScgfCAnTGl0ZXJhbCcgfCAnVmFyaWFibGUnIHwgJ0RlZmF1bHRHcmFwaCdcbiAgICB2YWx1ZTogc3RyaW5nXG4gICAgZXF1YWxzKG90aGVyOiBJVGVybSk6IGJvb2xlYW5cbiAgICB0b0Nhbm9uaWNhbCgpOiBzdHJpbmdcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgSU5hbWVkTm9kZSBleHRlbmRzIElUZXJtIHtcbiAgICB0ZXJtVHlwZTogJ05hbWVkTm9kZSdcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgSUJsYW5rTm9kZSBleHRlbmRzIElUZXJtIHtcbiAgICB0ZXJtVHlwZTogJ0JsYW5rTm9kZSdcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgSUxpdGVyYWwgZXh0ZW5kcyBJVGVybSB7XG4gICAgdGVybVR5cGU6ICdMaXRlcmFsJ1xuICAgIGxhbmd1YWdlOiBzdHJpbmdcbiAgICBkYXRhdHlwZTogSU5hbWVkTm9kZVxuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBJVmFyaWFibGUgZXh0ZW5kcyBJVGVybSB7XG4gICAgdGVybVR5cGU6ICdWYXJpYWJsZSdcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgSURlZmF1bHRHcmFwaCBleHRlbmRzIElUZXJtIHtcbiAgICB0ZXJtVHlwZTogJ0RlZmF1bHRHcmFwaCdcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgSVF1YWQge1xuICAgIHN1YmplY3Q6IElUZXJtXG4gICAgcHJlZGljYXRlOiBJVGVybVxuICAgIG9iamVjdDogSVRlcm1cbiAgICBncmFwaDogSVRlcm1cbiAgICB0b0Nhbm9uaWNhbCgpOiBzdHJpbmdcbiAgICBlcXVhbHMob3RoZXI6IElRdWFkKTogYm9vbGVhblxuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBJVHJpcGxlIGV4dGVuZHMgSVF1YWQge1xuICAgIGdyYXBoOiBJRGVmYXVsdEdyYXBoXG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIElEYXRhRmFjdG9yeSB7XG4gICAgbmFtZWROb2RlKHZhbHVlOiBzdHJpbmcpOiBJTmFtZWROb2RlXG4gICAgYmxhbmtOb2RlKHZhbHVlPzogc3RyaW5nKTogSUJsYW5rTm9kZVxuICAgIGxpdGVyYWwodmFsdWU6IHN0cmluZywgbGFuZ3VhZ2VPckRhdGF0eXBlPzogc3RyaW5nfE5hbWVkTm9kZSk6IElMaXRlcmFsXG4gICAgdmFyaWFibGUodmFsdWU6IHN0cmluZyk6IElWYXJpYWJsZVxuICAgIGRlZmF1bHRHcmFwaCgpOiBJRGVmYXVsdEdyYXBoXG4gICAgdHJpcGxlKHN1YmplY3Q6IElUZXJtLCBwcmVkaWNhdGU6IElUZXJtLCBvYmplY3Q6IElUZXJtKTogSVF1YWRcbiAgICBxdWFkKHN1YmplY3Q6IElUZXJtLCBwcmVkaWNhdGU6IElUZXJtLCBvYmplY3Q6IElUZXJtKTogSVF1YWRcbiAgfVxuXG5cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

var fibra;
(function (fibra) {
    'use strict';
    var SparqlAutocompleteComponentController = (function () {
        function SparqlAutocompleteComponentController($q, sparqlAutocompleteService) {
            var _this = this;
            this.$q = $q;
            this.sparqlAutocompleteService = sparqlAutocompleteService;
            this.error = false;
            this.clearResults = function () {
                _this.results = [];
                _this.query = '';
            };
            this.onChange = function (query) {
                _this.canceller.resolve();
                _this.canceller = _this.$q.defer();
                _this.queryRunning = true;
                _this.error = false;
                _this.sparqlAutocompleteService.autocomplete(query, _this.limit, _this.canceller.promise).then(function (resultsByGroup) {
                    _this.results = resultsByGroup;
                    _this.queryRunning = false;
                }, function () {
                    _this.queryRunning = false;
                    _this.error = true;
                });
            };
            this.canceller = $q.defer();
        }
        return SparqlAutocompleteComponentController;
    }());/*<auto_generate>*/angular.module('fibra').controller('SparqlAutocompleteComponentController',['$q','sparqlAutocompleteService',function(){return new (Function.prototype.bind.apply(SparqlAutocompleteComponentController,[null].concat(Array.prototype.slice.apply(arguments))));}]);/*</auto_generate>*/
    var SparqlAutocompleteComponent = (function () {
        function SparqlAutocompleteComponent() {
            this.bindings = {
                constraints: '<',
                limit: '@',
                onSelect: '&',
            };
            this.controller = SparqlAutocompleteComponentController;
            this.templateUrl = 'partials/sparql-autocomplete.html';
        }
        return SparqlAutocompleteComponent;
    }());/*<auto_generate>*/angular.module('fibra').component('sparqlAutocomplete',new SparqlAutocompleteComponent());/*</auto_generate>*/
    fibra.SparqlAutocompleteComponent = SparqlAutocompleteComponent;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvc3BhcnFsLWF1dG9jb21wbGV0ZS1jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBVSxLQUFLLENBNENkO0FBNUNELFdBQVUsS0FBSyxFQUFDLENBQUM7SUFDZixZQUFZLENBQUE7SUFDWjtRQTRCRSwrQ0FBb0IsRUFBcUIsRUFBVSx5QkFBb0Q7WUE1QnpHLGlCQStCQztZQUhxQixPQUFFLEdBQUYsRUFBRSxDQUFtQjtZQUFVLDhCQUF5QixHQUF6Qix5QkFBeUIsQ0FBMkI7WUF4QmhHLFVBQUssR0FBWSxLQUFLLENBQUE7WUFJdEIsaUJBQVksR0FBZTtnQkFDaEMsS0FBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUE7Z0JBQ2pCLEtBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFBO1lBQ2pCLENBQUMsQ0FBQTtZQUNNLGFBQVEsR0FBNEIsVUFBQyxLQUFhO2dCQUN2RCxLQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFBO2dCQUN4QixLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUE7Z0JBQ2hDLEtBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFBO2dCQUN4QixLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtnQkFDbEIsS0FBSSxDQUFDLHlCQUF5QixDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsS0FBSSxDQUFDLEtBQUssRUFBRSxLQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FDekYsVUFBQyxjQUE2QjtvQkFDNUIsS0FBSSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUE7b0JBQzdCLEtBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFBO2dCQUMzQixDQUFDLEVBQ0Q7b0JBQ0UsS0FBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUE7b0JBQ3pCLEtBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFBO2dCQUNuQixDQUFDLENBQ0YsQ0FBQTtZQUNILENBQUMsQ0FBQTtZQUVDLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFBO1FBQzdCLENBQUM7UUFDSCw0Q0FBQztJQUFELENBL0JBLEFBK0JDLElBQUE7SUFFRDtRQUFBO1lBQ1csYUFBUSxHQUEyQjtnQkFDeEMsV0FBVyxFQUFFLEdBQUc7Z0JBQ2hCLEtBQUssRUFBRSxHQUFHO2dCQUNWLFFBQVEsRUFBRSxHQUFHO2FBQ2QsQ0FBQTtZQUNNLGVBQVUsR0FBRyxxQ0FBcUMsQ0FBQTtZQUNsRCxnQkFBVyxHQUFXLG1DQUFtQyxDQUFBO1FBQ3BFLENBQUM7UUFBRCxrQ0FBQztJQUFELENBUkEsQUFRQyxJQUFBO0lBUlksaUNBQTJCLDhCQVF2QyxDQUFBO0FBQ0gsQ0FBQyxFQTVDUyxLQUFLLEtBQUwsS0FBSyxRQTRDZCIsImZpbGUiOiJzY3JpcHRzL3NwYXJxbC1hdXRvY29tcGxldGUtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIGZpYnJhIHtcbiAgJ3VzZSBzdHJpY3QnXG4gIGNsYXNzIFNwYXJxbEF1dG9jb21wbGV0ZUNvbXBvbmVudENvbnRyb2xsZXIge1xuICAgIHB1YmxpYyBsaW1pdDogbnVtYmVyXG4gICAgcHVibGljIHF1ZXJ5UnVubmluZzogYm9vbGVhblxuICAgIHB1YmxpYyBvblNlbGVjdDogKHNlbGVjdGlvbjogUmVzdWx0KSA9PiB2b2lkXG4gICAgcHVibGljIGVycm9yOiBib29sZWFuID0gZmFsc2VcbiAgICBwdWJsaWMgcXVlcnk6IHN0cmluZ1xuICAgIHByaXZhdGUgcmVzdWx0czogUmVzdWx0R3JvdXBbXVxuICAgIHByaXZhdGUgY2FuY2VsbGVyOiBhbmd1bGFyLklEZWZlcnJlZDxhbnk+XG4gICAgcHVibGljIGNsZWFyUmVzdWx0czogKCkgPT4gdm9pZCA9ICgpID0+IHtcbiAgICAgIHRoaXMucmVzdWx0cyA9IFtdXG4gICAgICB0aGlzLnF1ZXJ5ID0gJydcbiAgICB9XG4gICAgcHVibGljIG9uQ2hhbmdlOiAocXVlcnk6IHN0cmluZykgPT4gdm9pZCA9IChxdWVyeTogc3RyaW5nKSA9PiB7XG4gICAgICB0aGlzLmNhbmNlbGxlci5yZXNvbHZlKClcbiAgICAgIHRoaXMuY2FuY2VsbGVyID0gdGhpcy4kcS5kZWZlcigpXG4gICAgICB0aGlzLnF1ZXJ5UnVubmluZyA9IHRydWVcbiAgICAgIHRoaXMuZXJyb3IgPSBmYWxzZVxuICAgICAgdGhpcy5zcGFycWxBdXRvY29tcGxldGVTZXJ2aWNlLmF1dG9jb21wbGV0ZShxdWVyeSwgdGhpcy5saW1pdCwgdGhpcy5jYW5jZWxsZXIucHJvbWlzZSkudGhlbihcbiAgICAgICAgKHJlc3VsdHNCeUdyb3VwOiBSZXN1bHRHcm91cFtdKSA9PiB7XG4gICAgICAgICAgdGhpcy5yZXN1bHRzID0gcmVzdWx0c0J5R3JvdXBcbiAgICAgICAgICB0aGlzLnF1ZXJ5UnVubmluZyA9IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICB0aGlzLnF1ZXJ5UnVubmluZyA9IGZhbHNlXG4gICAgICAgICAgdGhpcy5lcnJvciA9IHRydWVcbiAgICAgICAgfVxuICAgICAgKVxuICAgIH1cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRxOiBhbmd1bGFyLklRU2VydmljZSwgcHJpdmF0ZSBzcGFycWxBdXRvY29tcGxldGVTZXJ2aWNlOiBTcGFycWxBdXRvY29tcGxldGVTZXJ2aWNlKSB7XG4gICAgICB0aGlzLmNhbmNlbGxlciA9ICRxLmRlZmVyKClcbiAgICB9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgU3BhcnFsQXV0b2NvbXBsZXRlQ29tcG9uZW50IGltcGxlbWVudHMgYW5ndWxhci5JQ29tcG9uZW50T3B0aW9ucyB7XG4gICAgICBwdWJsaWMgYmluZGluZ3M6IHtbaWQ6IHN0cmluZ106IHN0cmluZ30gPSB7XG4gICAgICAgIGNvbnN0cmFpbnRzOiAnPCcsXG4gICAgICAgIGxpbWl0OiAnQCcsXG4gICAgICAgIG9uU2VsZWN0OiAnJicsXG4gICAgICB9XG4gICAgICBwdWJsaWMgY29udHJvbGxlciA9IFNwYXJxbEF1dG9jb21wbGV0ZUNvbXBvbmVudENvbnRyb2xsZXJcbiAgICAgIHB1YmxpYyB0ZW1wbGF0ZVVybDogc3RyaW5nID0gJ3BhcnRpYWxzL3NwYXJxbC1hdXRvY29tcGxldGUuaHRtbCdcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

var fibra;
(function (fibra) {
    'use strict';
    var s = fi.seco.sparql;
    var ResultGroup = (function () {
        function ResultGroup(label) {
            this.label = label;
            this.results = [];
        }
        return ResultGroup;
    }());
    fibra.ResultGroup = ResultGroup;
    var Result = (function () {
        function Result(ids, datasources, matchedLabel, prefLabel) {
            this.ids = ids;
            this.datasources = datasources;
            this.matchedLabel = matchedLabel;
            this.prefLabel = prefLabel;
            this.additionalInformation = {};
        }
        return Result;
    }());
    fibra.Result = Result;
    var SparqlAutocompleteService = (function () {
        function SparqlAutocompleteService(workerService) {
            this.workerService = workerService;
        }
        SparqlAutocompleteService.prototype.autocomplete = function (query, limit, canceller) {
            return this.workerService.call('sparqlAutocompleteWorkerService', 'autocomplete', [query, limit], canceller);
        };
        SparqlAutocompleteService.defaultMatchQueryTemplate = "\nPREFIX text: <http://jena.apache.org/text#>\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\nPREFIX skos: <http://www.w3.org/2004/02/skos/core#>\nPREFIX owl: <http://www.w3.org/2002/07/owl#>\nPREFIX sf: <http://ldf.fi/functions#>\nPREFIX fibra: <http://ldf.fi/fibra/schema#>\nPREFIX dcterms: <http://purl.org/dc/terms/>\nSELECT ?groupId ?groupLabel ?id ?prefLabel ?matchedLabel ?sameAs ?altLabel { # ADDITIONALVARIABLES\n  {\n    SELECT ?groupId ?id (SUM(?sc) AS ?score) {\n      {\n        SELECT ?groupId ?id ?sc {\n          BIND(CONCAT(REPLACE(<QUERY>,\"([\\\\+\\\\-\\\\&\\\\|\\\\!\\\\(\\\\)\\\\{\\\\}\\\\[\\\\]\\\\^\\\\\\\"\\\\~\\\\*\\\\?\\\\:\\\\/\\\\\\\\])\",\"\\\\$1\"),\"*\") AS ?query)\n          (?id ?sc) text:query ?query .\n          ?id a ?groupId .\n          # CONSTRAINTS\n        } LIMIT <LIMIT>\n      } UNION {\n        BIND(CONCAT(\"\\\"\",REPLACE(<QUERY>,\"([\\\\+\\\\-\\\\&\\\\|\\\\!\\\\(\\\\)\\\\{\\\\}\\\\[\\\\]\\\\^\\\\\\\"\\\\~\\\\*\\\\?\\\\:\\\\/\\\\\\\\])\",\"\\\\$1\"),\"\\\"\") AS ?query)\n        (?id ?sc) text:query ?query .\n        ?id skos:prefLabel|rdfs:label|skos:altLabel ?matchedLabel\n        FILTER (LCASE(?matchedLabel)=LCASE(<QUERY>))\n        ?id a ?groupId .\n        # CONSTRAINTS\n      }\n    }\n    GROUP BY ?groupId ?id\n    HAVING(BOUND(?id))\n  }\n  ?id skos:prefLabel|rdfs:label|skos:altLabel ?matchedLabel\n  FILTER (REGEX(LCASE(?matchedLabel),CONCAT(\"\\\\b\",LCASE(<QUERY>))))\n  {\n    ?groupId sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel <PREFLANG> '' ?groupLabel) .\n  } UNION {\n    ?id sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel <PREFLANG> '' ?prefLabel) .\n  } UNION {\n    ?id owl:sameAs ?sameAs .\n  } UNION {\n    ?id skos:altLabel ?altLabel .\n  }\n  # ADDITIONALSELECT\n}\n";
        return SparqlAutocompleteService;
    }());/*<auto_generate>*/angular.module('fibra').service('sparqlAutocompleteService',['workerService',function(){return new (Function.prototype.bind.apply(SparqlAutocompleteService,[null].concat(Array.prototype.slice.apply(arguments))));}]);/*</auto_generate>*/
    fibra.SparqlAutocompleteService = SparqlAutocompleteService;
    var SparqlAutocompleteWorkerService = (function () {
        function SparqlAutocompleteWorkerService($q, sparqlService, configurationWorkerService) {
            this.$q = $q;
            this.sparqlService = sparqlService;
            this.configurationWorkerService = configurationWorkerService;
        }
        SparqlAutocompleteWorkerService.prototype.autocomplete = function (query, limit, canceller) {
            var _this = this;
            var idToIdSet = new fibra.EMap(function () { return new fibra.StringSet(); });
            var idToGroupIdSet = new fibra.EMap(function () { return new fibra.StringSet(); });
            var ifpVarPlusValueToIdSet = new fibra.EMap(function () { return new fibra.EMap(function () { return new fibra.StringSet(); }); });
            var idToPrefLabelSet = new fibra.EMap(function () { return new fibra.ONodeSet(); });
            var idToMatchedLabelSet = new fibra.EMap(function () { return new fibra.ONodeSet(); });
            var idToAltLabelSet = new fibra.EMap(function () { return new fibra.ONodeSet(); });
            var idToDatasourceSet = new fibra.EMap(function () { return new fibra.IdentitySet(); });
            return this.$q.all(this.configurationWorkerService.configuration.allEndpoints().map(function (endpointConfiguration) {
                var queryTemplate = endpointConfiguration.autocompletionTextMatchQueryTemplate;
                queryTemplate = queryTemplate.replace(/<QUERY>/g, s.SparqlService.stringToSPARQLString(query));
                queryTemplate = queryTemplate.replace(/# CONSTRAINTS/g, endpointConfiguration.dataModelConfiguration.typeConstraints);
                queryTemplate = queryTemplate.replace(/<LIMIT>/g, '' + limit);
                queryTemplate = queryTemplate.replace(/<PREFLANG>/g, _this.configurationWorkerService.configuration.preferredLanguage);
                return _this.sparqlService.query(endpointConfiguration.endpoint.value, queryTemplate, { timeout: canceller }).then(function (response) { return response.data.results.bindings.forEach(function (binding) {
                    var id = binding['id'].value;
                    idToIdSet.goc(id).add(id);
                    idToDatasourceSet.goc(id).add(endpointConfiguration);
                    if (binding['prefLabel'])
                        idToPrefLabelSet.goc(id).add(fibra.DataFactory.instance.nodeFromBinding(binding['prefLabel']));
                    if (binding['altLabel'])
                        idToAltLabelSet.goc(id).add(fibra.DataFactory.instance.nodeFromBinding(binding['altLabel']));
                    if (binding['matchedLabel'])
                        idToMatchedLabelSet.goc(id).add(fibra.DataFactory.instance.nodeFromBinding(binding['matchedLabel']));
                    if (binding['groupId']) {
                        idToGroupIdSet.goc(id).add(binding['groupId'].value);
                        if (binding['groupLabel'])
                            idToPrefLabelSet.goc(binding['groupId'].value).add(fibra.DataFactory.instance.nodeFromBinding(binding['groupLabel']));
                    }
                    if (binding['sameAs']) {
                        idToIdSet.get(id).add(binding['sameAs'].value);
                        idToIdSet.goc(binding['sameAs'].value).add(id);
                    }
                    for (var _i = 0, _a = response.data.head.vars; _i < _a.length; _i++) {
                        var v = _a[_i];
                        if (v.indexOf('ifp') === 0 && binding[v])
                            ifpVarPlusValueToIdSet.goc(v.substring(3)).goc(binding[v].value).add(id);
                    }
                }); }).catch(function () { return undefined; });
            })).then(function () {
                // create sameAses for all objects sharing same inverse functional property values
                ifpVarPlusValueToIdSet.each(function (valueToIdSet) { return valueToIdSet.each(function (ids) { return ids.each(function (id) { return idToIdSet.goc(id).adds(ids); }); }); });
                // consolidate id sets as well as all id -related information
                idToIdSet.each(function (idSet, id) {
                    idSet.each(function (oid) {
                        var oidSet = idToIdSet.get(oid);
                        if (idSet !== oidSet) {
                            idToIdSet.set(oid, idSet);
                            idSet.adds(oidSet);
                            var datasourceSet = idToDatasourceSet.get(id);
                            var oDatasourceSet = idToDatasourceSet.get(oid);
                            if (datasourceSet) {
                                if (oDatasourceSet)
                                    datasourceSet.adds(oDatasourceSet);
                                idToDatasourceSet.set(oid, datasourceSet);
                            }
                            else if (oDatasourceSet)
                                idToDatasourceSet.set(id, oDatasourceSet);
                            var groupIdSet = idToGroupIdSet.get(id);
                            var oGroupIdSet = idToGroupIdSet.get(oid);
                            if (groupIdSet) {
                                if (oGroupIdSet)
                                    groupIdSet.adds(oGroupIdSet);
                                idToGroupIdSet.set(oid, groupIdSet);
                            }
                            else if (oGroupIdSet)
                                idToGroupIdSet.set(id, oGroupIdSet);
                            var mSet = idToPrefLabelSet.get(id);
                            var oSet = idToPrefLabelSet.get(oid);
                            if (mSet) {
                                if (oSet)
                                    mSet.adds(oSet);
                                idToPrefLabelSet.set(oid, mSet);
                            }
                            else if (oSet)
                                idToPrefLabelSet.set(id, oSet);
                            mSet = idToMatchedLabelSet.get(id);
                            oSet = idToMatchedLabelSet.get(oid);
                            if (mSet) {
                                if (oSet)
                                    mSet.adds(oSet);
                                idToMatchedLabelSet.set(oid, mSet);
                            }
                            else if (oSet)
                                idToMatchedLabelSet.set(id, oSet);
                            mSet = idToAltLabelSet.get(id);
                            oSet = idToAltLabelSet.get(oid);
                            if (mSet) {
                                if (oSet)
                                    mSet.adds(oSet);
                                idToAltLabelSet.set(oid, mSet);
                            }
                            else if (oSet)
                                idToAltLabelSet.set(id, oSet);
                        }
                    });
                });
                var ret = [];
                var groupIdToGroup = new fibra.EMap();
                var seen = new fibra.StringSet();
                idToIdSet.each(function (idSet, id) {
                    if (!seen.has(id)) {
                        seen.adds(idSet);
                        var result_1 = new Result(idSet.values().map(function (oid) { return fibra.DataFactory.instance.namedNode(oid); }), idToDatasourceSet.get(id).values(), idToMatchedLabelSet.get(id).values()[0], idToPrefLabelSet.get(id).values()[0]);
                        if (idToAltLabelSet.has(id))
                            result_1.additionalInformation['altLabel'] = idToAltLabelSet.get(id).values();
                        result_1.additionalInformation['type'] = idToGroupIdSet.get(id).values().map(function (v) { return fibra.DataFactory.instance.namedNode(v); });
                        result_1.additionalInformation['typeLabel'] = idToGroupIdSet.get(id).values().map(function (v) { return idToPrefLabelSet.get(v).values()[0]; });
                        idToGroupIdSet.get(id).each(function (gid) {
                            var resultGroup = groupIdToGroup.get(gid);
                            if (!resultGroup) {
                                resultGroup = new ResultGroup(idToPrefLabelSet.get(gid).values()[0].value);
                                groupIdToGroup.set(gid, resultGroup);
                                ret.push(resultGroup);
                            }
                            resultGroup.results.push(result_1);
                        });
                    }
                });
                return ret;
            });
        };
        return SparqlAutocompleteWorkerService;
    }());/*<auto_generate>*/angular.module('fibra').service('sparqlAutocompleteWorkerService',['$q','sparqlService','configurationWorkerService',function(){return new (Function.prototype.bind.apply(SparqlAutocompleteWorkerService,[null].concat(Array.prototype.slice.apply(arguments))));}]);/*</auto_generate>*/
    fibra.SparqlAutocompleteWorkerService = SparqlAutocompleteWorkerService;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvc3BhcnFsLWF1dG9jb21wbGV0ZS1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQVUsS0FBSyxDQXFMZDtBQXJMRCxXQUFVLEtBQUssRUFBQyxDQUFDO0lBQ2YsWUFBWSxDQUFBO0lBRVosSUFBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUE7SUFFekI7UUFFRSxxQkFBbUIsS0FBYTtZQUFiLFVBQUssR0FBTCxLQUFLLENBQVE7WUFEekIsWUFBTyxHQUFhLEVBQUUsQ0FBQTtRQUNNLENBQUM7UUFDdEMsa0JBQUM7SUFBRCxDQUhBLEFBR0MsSUFBQTtJQUhZLGlCQUFXLGNBR3ZCLENBQUE7SUFFRDtRQUVFLGdCQUFtQixHQUFZLEVBQVMsV0FBb0MsRUFBUyxZQUFtQixFQUFTLFNBQWdCO1lBQTlHLFFBQUcsR0FBSCxHQUFHLENBQVM7WUFBUyxnQkFBVyxHQUFYLFdBQVcsQ0FBeUI7WUFBUyxpQkFBWSxHQUFaLFlBQVksQ0FBTztZQUFTLGNBQVMsR0FBVCxTQUFTLENBQU87WUFEMUgsMEJBQXFCLEdBQWlDLEVBQUUsQ0FBQTtRQUNxRSxDQUFDO1FBQ3ZJLGFBQUM7SUFBRCxDQUhBLEFBR0MsSUFBQTtJQUhZLFlBQU0sU0FHbEIsQ0FBQTtJQUVEO1FBK0NFLG1DQUFvQixhQUE0QjtZQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFHLENBQUM7UUFFN0MsZ0RBQVksR0FBbkIsVUFBb0IsS0FBYSxFQUFFLEtBQWEsRUFBRSxTQUFpQztZQUNqRixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsaUNBQWlDLEVBQUUsY0FBYyxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFBO1FBQzlHLENBQUM7UUFqRGEsbURBQXlCLEdBQVcsNHdEQTJDckQsQ0FBQTtRQVFDLGdDQUFDO0lBQUQsQ0FyREEsQUFxREMsSUFBQTtJQXJEWSwrQkFB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OzRCQUN0RCxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0NBQ2pCLFdBQVcsR0FBRyxJQUFJLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUE7Z0NBQzFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQyxDQUFBO2dDQUNwQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBOzRCQUN2QixDQUFDOzRCQUNELFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQU0sQ0FBQyxDQUFBO3dCQUNsQyxDQUFDLENBQUMsQ0FBQTtvQkFDSixDQUFDO2dCQUNILENBQUMsQ0FBQyxDQUFBO2dCQUNGLE1BQU0sQ0FBQyxHQUFHLENBQUE7WUFDWixDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUM7UUFDSCxzQ0FBQztJQUFELENBN0dBLEFBNkdDLElBQUE7SUE3R1kscUNBQStCLGtDQTZHM0MsQ0FBQTtBQUVILENBQUMsRUFyTFMsS0FBSyxLQUFMLEtBQUssUUFxTGQiLCJmaWxlIjoic2NyaXB0cy9zcGFycWwtYXV0b2NvbXBsZXRlLXNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgZmlicmEge1xuICAndXNlIHN0cmljdCdcblxuICBpbXBvcnQgcyA9IGZpLnNlY28uc3BhcnFsXG5cbiAgZXhwb3J0IGNsYXNzIFJlc3VsdEdyb3VwIHtcbiAgICBwdWJsaWMgcmVzdWx0czogUmVzdWx0W10gPSBbXVxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBsYWJlbDogc3RyaW5nKSB7fVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIFJlc3VsdCB7XG4gICAgcHVibGljIGFkZGl0aW9uYWxJbmZvcm1hdGlvbjoge1t2YXJOYW1lOiBzdHJpbmddOiBJTm9kZVtdfSA9IHt9XG4gICAgY29uc3RydWN0b3IocHVibGljIGlkczogSU5vZGVbXSwgcHVibGljIGRhdGFzb3VyY2VzOiBFbmRwb2ludENvbmZpZ3VyYXRpb25bXSwgcHVibGljIG1hdGNoZWRMYWJlbDogSU5vZGUsIHB1YmxpYyBwcmVmTGFiZWw6IElOb2RlKSB7fVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIFNwYXJxbEF1dG9jb21wbGV0ZVNlcnZpY2Uge1xuXG4gICAgcHVibGljIHN0YXRpYyBkZWZhdWx0TWF0Y2hRdWVyeVRlbXBsYXRlOiBzdHJpbmcgPSBgXG5QUkVGSVggdGV4dDogPGh0dHA6Ly9qZW5hLmFwYWNoZS5vcmcvdGV4dCM+XG5QUkVGSVggcmRmczogPGh0dHA6Ly93d3cudzMub3JnLzIwMDAvMDEvcmRmLXNjaGVtYSM+XG5QUkVGSVggc2tvczogPGh0dHA6Ly93d3cudzMub3JnLzIwMDQvMDIvc2tvcy9jb3JlIz5cblBSRUZJWCBvd2w6IDxodHRwOi8vd3d3LnczLm9yZy8yMDAyLzA3L293bCM+XG5QUkVGSVggc2Y6IDxodHRwOi8vbGRmLmZpL2Z1bmN0aW9ucyM+XG5QUkVGSVggZmlicmE6IDxodHRwOi8vbGRmLmZpL2ZpYnJhL3NjaGVtYSM+XG5QUkVGSVggZGN0ZXJtczogPGh0dHA6Ly9wdXJsLm9yZy9kYy90ZXJtcy8+XG5TRUxFQ1QgP2dyb3VwSWQgP2dyb3VwTGFiZWwgP2lkID9wcmVmTGFiZWwgP21hdGNoZWRMYWJlbCA/c2FtZUFzID9hbHRMYWJlbCB7ICMgQURESVRJT05BTFZBUklBQkxFU1xuICB7XG4gICAgU0VMRUNUID9ncm91cElkID9pZCAoU1VNKD9zYykgQVMgP3Njb3JlKSB7XG4gICAgICB7XG4gICAgICAgIFNFTEVDVCA/Z3JvdXBJZCA/aWQgP3NjIHtcbiAgICAgICAgICBCSU5EKENPTkNBVChSRVBMQUNFKDxRVUVSWT4sXCIoW1xcXFxcXFxcK1xcXFxcXFxcLVxcXFxcXFxcJlxcXFxcXFxcfFxcXFxcXFxcIVxcXFxcXFxcKFxcXFxcXFxcKVxcXFxcXFxce1xcXFxcXFxcfVxcXFxcXFxcW1xcXFxcXFxcXVxcXFxcXFxcXlxcXFxcXFxcXFxcXFwiXFxcXFxcXFx+XFxcXFxcXFwqXFxcXFxcXFw/XFxcXFxcXFw6XFxcXFxcXFwvXFxcXFxcXFxcXFxcXFxcXF0pXCIsXCJcXFxcXFxcXCQxXCIpLFwiKlwiKSBBUyA/cXVlcnkpXG4gICAgICAgICAgKD9pZCA/c2MpIHRleHQ6cXVlcnkgP3F1ZXJ5IC5cbiAgICAgICAgICA/aWQgYSA/Z3JvdXBJZCAuXG4gICAgICAgICAgIyBDT05TVFJBSU5UU1xuICAgICAgICB9IExJTUlUIDxMSU1JVD5cbiAgICAgIH0gVU5JT04ge1xuICAgICAgICBCSU5EKENPTkNBVChcIlxcXFxcIlwiLFJFUExBQ0UoPFFVRVJZPixcIihbXFxcXFxcXFwrXFxcXFxcXFwtXFxcXFxcXFwmXFxcXFxcXFx8XFxcXFxcXFwhXFxcXFxcXFwoXFxcXFxcXFwpXFxcXFxcXFx7XFxcXFxcXFx9XFxcXFxcXFxbXFxcXFxcXFxdXFxcXFxcXFxeXFxcXFxcXFxcXFxcXCJcXFxcXFxcXH5cXFxcXFxcXCpcXFxcXFxcXD9cXFxcXFxcXDpcXFxcXFxcXC9cXFxcXFxcXFxcXFxcXFxcXSlcIixcIlxcXFxcXFxcJDFcIiksXCJcXFxcXCJcIikgQVMgP3F1ZXJ5KVxuICAgICAgICAoP2lkID9zYykgdGV4dDpxdWVyeSA/cXVlcnkgLlxuICAgICAgICA/aWQgc2tvczpwcmVmTGFiZWx8cmRmczpsYWJlbHxza29zOmFsdExhYmVsID9tYXRjaGVkTGFiZWxcbiAgICAgICAgRklMVEVSIChMQ0FTRSg/bWF0Y2hlZExhYmVsKT1MQ0FTRSg8UVVFUlk+KSlcbiAgICAgICAgP2lkIGEgP2dyb3VwSWQgLlxuICAgICAgICAjIENPTlNUUkFJTlRTXG4gICAgICB9XG4gICAgfVxuICAgIEdST1VQIEJZID9ncm91cElkID9pZFxuICAgIEhBVklORyhCT1VORCg/aWQpKVxuICB9XG4gID9pZCBza29zOnByZWZMYWJlbHxyZGZzOmxhYmVsfHNrb3M6YWx0TGFiZWwgP21hdGNoZWRMYWJlbFxuICBGSUxURVIgKFJFR0VYKExDQVNFKD9tYXRjaGVkTGFiZWwpLENPTkNBVChcIlxcXFxcXFxcYlwiLExDQVNFKDxRVUVSWT4pKSkpXG4gIHtcbiAgICA/Z3JvdXBJZCBzZjpwcmVmZXJyZWRMYW5ndWFnZUxpdGVyYWwgKHNrb3M6cHJlZkxhYmVsIHJkZnM6bGFiZWwgc2tvczphbHRMYWJlbCA8UFJFRkxBTkc+ICcnID9ncm91cExhYmVsKSAuXG4gIH0gVU5JT04ge1xuICAgID9pZCBzZjpwcmVmZXJyZWRMYW5ndWFnZUxpdGVyYWwgKHNrb3M6cHJlZkxhYmVsIHJkZnM6bGFiZWwgc2tvczphbHRMYWJlbCA8UFJFRkxBTkc+ICcnID9wcmVmTGFiZWwpIC5cbiAgfSBVTklPTiB7XG4gICAgP2lkIG93bDpzYW1lQXMgP3NhbWVBcyAuXG4gIH0gVU5JT04ge1xuICAgID9pZCBza29zOmFsdExhYmVsID9hbHRMYWJlbCAuXG4gIH1cbiAgIyBBRERJVElPTkFMU0VMRUNUXG59XG5gXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHdvcmtlclNlcnZpY2U6IFdvcmtlclNlcnZpY2UpIHt9XG5cbiAgICBwdWJsaWMgYXV0b2NvbXBsZXRlKHF1ZXJ5OiBzdHJpbmcsIGxpbWl0OiBudW1iZXIsIGNhbmNlbGxlcj86IGFuZ3VsYXIuSVByb21pc2U8YW55Pik6IGFuZ3VsYXIuSVByb21pc2U8UmVzdWx0R3JvdXBbXT4ge1xuICAgICAgcmV0dXJuIHRoaXMud29ya2VyU2VydmljZS5jYWxsKCdzcGFycWxBdXRvY29tcGxldGVXb3JrZXJTZXJ2aWNlJywgJ2F1dG9jb21wbGV0ZScsIFtxdWVyeSwgbGltaXRdLCBjYW5jZWxsZXIpXG4gICAgfVxuXG4gIH1cblxuICBleHBvcnQgY2xhc3MgU3BhcnFsQXV0b2NvbXBsZXRlV29ya2VyU2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRxOiBhbmd1bGFyLklRU2VydmljZSwgcHJpdmF0ZSBzcGFycWxTZXJ2aWNlOiBzLlNwYXJxbFNlcnZpY2UsIHByaXZhdGUgY29uZmlndXJhdGlvbldvcmtlclNlcnZpY2U6IENvbmZpZ3VyYXRpb25Xb3JrZXJTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgcHVibGljIGF1dG9jb21wbGV0ZShxdWVyeTogc3RyaW5nLCBsaW1pdDogbnVtYmVyLCBjYW5jZWxsZXI/OiBhbmd1bGFyLklQcm9taXNlPGFueT4pOiBhbmd1bGFyLklQcm9taXNlPFJlc3VsdEdyb3VwW10+IHtcbiAgICAgIGxldCBpZFRvSWRTZXQ6IEVNYXA8U3RyaW5nU2V0PiA9IG5ldyBFTWFwPFN0cmluZ1NldD4oKCkgPT4gbmV3IFN0cmluZ1NldCgpKVxuICAgICAgbGV0IGlkVG9Hcm91cElkU2V0OiBFTWFwPFN0cmluZ1NldD4gPSBuZXcgRU1hcDxTdHJpbmdTZXQ+KCgpID0+IG5ldyBTdHJpbmdTZXQoKSlcbiAgICAgIGxldCBpZnBWYXJQbHVzVmFsdWVUb0lkU2V0OiBFTWFwPEVNYXA8U3RyaW5nU2V0Pj4gPSBuZXcgRU1hcDxFTWFwPFN0cmluZ1NldD4+KCgpID0+IG5ldyBFTWFwPFN0cmluZ1NldD4oKCkgPT4gbmV3IFN0cmluZ1NldCgpKSlcbiAgICAgIGxldCBpZFRvUHJlZkxhYmVsU2V0OiBFTWFwPE9Ob2RlU2V0PElOb2RlPj4gPSBuZXcgRU1hcDxPTm9kZVNldDxJTm9kZT4+KCgpID0+IG5ldyBPTm9kZVNldDxJTm9kZT4oKSlcbiAgICAgIGxldCBpZFRvTWF0Y2hlZExhYmVsU2V0OiBFTWFwPE9Ob2RlU2V0PElOb2RlPj4gPSBuZXcgRU1hcDxPTm9kZVNldDxJTm9kZT4+KCgpID0+IG5ldyBPTm9kZVNldDxJTm9kZT4oKSlcbiAgICAgIGxldCBpZFRvQWx0TGFiZWxTZXQ6IEVNYXA8T05vZGVTZXQ8SU5vZGU+PiA9IG5ldyBFTWFwPE9Ob2RlU2V0PElOb2RlPj4oKCkgPT4gbmV3IE9Ob2RlU2V0PElOb2RlPigpKVxuICAgICAgbGV0IGlkVG9EYXRhc291cmNlU2V0OiBFTWFwPElkZW50aXR5U2V0PEVuZHBvaW50Q29uZmlndXJhdGlvbj4+ID0gbmV3IEVNYXA8SWRlbnRpdHlTZXQ8RW5kcG9pbnRDb25maWd1cmF0aW9uPj4oKCkgPT4gbmV3IElkZW50aXR5U2V0PEVuZHBvaW50Q29uZmlndXJhdGlvbj4oKSlcbiAgICAgIHJldHVybiB0aGlzLiRxLmFsbCh0aGlzLmNvbmZpZ3VyYXRpb25Xb3JrZXJTZXJ2aWNlLmNvbmZpZ3VyYXRpb24uYWxsRW5kcG9pbnRzKCkubWFwKGVuZHBvaW50Q29uZmlndXJhdGlvbiA9PiB7XG4gICAgICAgIGxldCBxdWVyeVRlbXBsYXRlOiBzdHJpbmcgPSBlbmRwb2ludENvbmZpZ3VyYXRpb24uYXV0b2NvbXBsZXRpb25UZXh0TWF0Y2hRdWVyeVRlbXBsYXRlXG4gICAgICAgIHF1ZXJ5VGVtcGxhdGUgPSBxdWVyeVRlbXBsYXRlLnJlcGxhY2UoLzxRVUVSWT4vZywgcy5TcGFycWxTZXJ2aWNlLnN0cmluZ1RvU1BBUlFMU3RyaW5nKHF1ZXJ5KSlcbiAgICAgICAgcXVlcnlUZW1wbGF0ZSA9IHF1ZXJ5VGVtcGxhdGUucmVwbGFjZSgvIyBDT05TVFJBSU5UUy9nLCBlbmRwb2ludENvbmZpZ3VyYXRpb24uZGF0YU1vZGVsQ29uZmlndXJhdGlvbi50eXBlQ29uc3RyYWludHMpXG4gICAgICAgIHF1ZXJ5VGVtcGxhdGUgPSBxdWVyeVRlbXBsYXRlLnJlcGxhY2UoLzxMSU1JVD4vZywgJycgKyBsaW1pdClcbiAgICAgICAgcXVlcnlUZW1wbGF0ZSA9IHF1ZXJ5VGVtcGxhdGUucmVwbGFjZSgvPFBSRUZMQU5HPi9nLCB0aGlzLmNvbmZpZ3VyYXRpb25Xb3JrZXJTZXJ2aWNlLmNvbmZpZ3VyYXRpb24ucHJlZmVycmVkTGFuZ3VhZ2UpXG4gICAgICAgIHJldHVybiB0aGlzLnNwYXJxbFNlcnZpY2UucXVlcnkoZW5kcG9pbnRDb25maWd1cmF0aW9uLmVuZHBvaW50LnZhbHVlLCBxdWVyeVRlbXBsYXRlLCB7dGltZW91dDogY2FuY2VsbGVyfSkudGhlbihcbiAgICAgICAgICAocmVzcG9uc2UpID0+IHJlc3BvbnNlLmRhdGEhLnJlc3VsdHMuYmluZGluZ3MuZm9yRWFjaChiaW5kaW5nID0+IHtcbiAgICAgICAgICAgIGxldCBpZDogc3RyaW5nID0gYmluZGluZ1snaWQnXS52YWx1ZVxuICAgICAgICAgICAgaWRUb0lkU2V0LmdvYyhpZCkuYWRkKGlkKVxuICAgICAgICAgICAgaWRUb0RhdGFzb3VyY2VTZXQuZ29jKGlkKS5hZGQoZW5kcG9pbnRDb25maWd1cmF0aW9uKVxuICAgICAgICAgICAgaWYgKGJpbmRpbmdbJ3ByZWZMYWJlbCddKVxuICAgICAgICAgICAgICBpZFRvUHJlZkxhYmVsU2V0LmdvYyhpZCkuYWRkKERhdGFGYWN0b3J5Lmluc3RhbmNlLm5vZGVGcm9tQmluZGluZyhiaW5kaW5nWydwcmVmTGFiZWwnXSkpXG4gICAgICAgICAgICBpZiAoYmluZGluZ1snYWx0TGFiZWwnXSlcbiAgICAgICAgICAgICAgaWRUb0FsdExhYmVsU2V0LmdvYyhpZCkuYWRkKERhdGFGYWN0b3J5Lmluc3RhbmNlLm5vZGVGcm9tQmluZGluZyhiaW5kaW5nWydhbHRMYWJlbCddKSlcbiAgICAgICAgICAgIGlmIChiaW5kaW5nWydtYXRjaGVkTGFiZWwnXSlcbiAgICAgICAgICAgICAgaWRUb01hdGNoZWRMYWJlbFNldC5nb2MoaWQpLmFkZChEYXRhRmFjdG9yeS5pbnN0YW5jZS5ub2RlRnJvbUJpbmRpbmcoYmluZGluZ1snbWF0Y2hlZExhYmVsJ10pKVxuICAgICAgICAgICAgaWYgKGJpbmRpbmdbJ2dyb3VwSWQnXSkge1xuICAgICAgICAgICAgICBpZFRvR3JvdXBJZFNldC5nb2MoaWQpLmFkZChiaW5kaW5nWydncm91cElkJ10udmFsdWUpXG4gICAgICAgICAgICAgIGlmIChiaW5kaW5nWydncm91cExhYmVsJ10pXG4gICAgICAgICAgICAgICAgaWRUb1ByZWZMYWJlbFNldC5nb2MoYmluZGluZ1snZ3JvdXBJZCddLnZhbHVlKS5hZGQoRGF0YUZhY3RvcnkuaW5zdGFuY2Uubm9kZUZyb21CaW5kaW5nKGJpbmRpbmdbJ2dyb3VwTGFiZWwnXSkpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYmluZGluZ1snc2FtZUFzJ10pIHtcbiAgICAgICAgICAgICAgaWRUb0lkU2V0LmdldChpZCkuYWRkKGJpbmRpbmdbJ3NhbWVBcyddLnZhbHVlKVxuICAgICAgICAgICAgICBpZFRvSWRTZXQuZ29jKGJpbmRpbmdbJ3NhbWVBcyddLnZhbHVlKS5hZGQoaWQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCB2IG9mIHJlc3BvbnNlLmRhdGEhLmhlYWQudmFycykgaWYgKHYuaW5kZXhPZignaWZwJykgPT09IDAgJiYgYmluZGluZ1t2XSkgaWZwVmFyUGx1c1ZhbHVlVG9JZFNldC5nb2Modi5zdWJzdHJpbmcoMykpLmdvYyhiaW5kaW5nW3ZdLnZhbHVlKS5hZGQoaWQpXG4gICAgICAgICAgfSlcbiAgICAgICAgKS5jYXRjaCgoKSA9PiB1bmRlZmluZWQpXG4gICAgICB9KSkudGhlbigoKSA9PiB7XG4gICAgICAgIC8vIGNyZWF0ZSBzYW1lQXNlcyBmb3IgYWxsIG9iamVjdHMgc2hhcmluZyBzYW1lIGludmVyc2UgZnVuY3Rpb25hbCBwcm9wZXJ0eSB2YWx1ZXNcbiAgICAgICAgaWZwVmFyUGx1c1ZhbHVlVG9JZFNldC5lYWNoKHZhbHVlVG9JZFNldCA9PiB2YWx1ZVRvSWRTZXQuZWFjaChpZHMgPT4gaWRzLmVhY2goaWQgPT4gaWRUb0lkU2V0LmdvYyhpZCkuYWRkcyhpZHMpKSkpXG4gICAgICAgIC8vIGNvbnNvbGlkYXRlIGlkIHNldHMgYXMgd2VsbCBhcyBhbGwgaWQgLXJlbGF0ZWQgaW5mb3JtYXRpb25cbiAgICAgICAgaWRUb0lkU2V0LmVhY2goKGlkU2V0OiBTdHJpbmdTZXQsIGlkOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICBpZFNldC5lYWNoKG9pZCA9PiB7XG4gICAgICAgICAgICBsZXQgb2lkU2V0OiBTdHJpbmdTZXQgPSBpZFRvSWRTZXQuZ2V0KG9pZClcbiAgICAgICAgICAgIGlmIChpZFNldCAhPT0gb2lkU2V0KSB7XG4gICAgICAgICAgICAgIGlkVG9JZFNldC5zZXQob2lkLCBpZFNldClcbiAgICAgICAgICAgICAgaWRTZXQuYWRkcyhvaWRTZXQpXG4gICAgICAgICAgICAgIGxldCBkYXRhc291cmNlU2V0OiBJZGVudGl0eVNldDxFbmRwb2ludENvbmZpZ3VyYXRpb24+ID0gaWRUb0RhdGFzb3VyY2VTZXQuZ2V0KGlkKVxuICAgICAgICAgICAgICBsZXQgb0RhdGFzb3VyY2VTZXQ6IElkZW50aXR5U2V0PEVuZHBvaW50Q29uZmlndXJhdGlvbj4gPSBpZFRvRGF0YXNvdXJjZVNldC5nZXQob2lkKVxuICAgICAgICAgICAgICBpZiAoZGF0YXNvdXJjZVNldCkge1xuICAgICAgICAgICAgICAgIGlmIChvRGF0YXNvdXJjZVNldCkgZGF0YXNvdXJjZVNldC5hZGRzKG9EYXRhc291cmNlU2V0KVxuICAgICAgICAgICAgICAgIGlkVG9EYXRhc291cmNlU2V0LnNldChvaWQsIGRhdGFzb3VyY2VTZXQpXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAob0RhdGFzb3VyY2VTZXQpIGlkVG9EYXRhc291cmNlU2V0LnNldChpZCwgb0RhdGFzb3VyY2VTZXQpXG4gICAgICAgICAgICAgIGxldCBncm91cElkU2V0OiBTdHJpbmdTZXQgPSBpZFRvR3JvdXBJZFNldC5nZXQoaWQpXG4gICAgICAgICAgICAgIGxldCBvR3JvdXBJZFNldDogU3RyaW5nU2V0ID0gaWRUb0dyb3VwSWRTZXQuZ2V0KG9pZClcbiAgICAgICAgICAgICAgaWYgKGdyb3VwSWRTZXQpIHtcbiAgICAgICAgICAgICAgICBpZiAob0dyb3VwSWRTZXQpIGdyb3VwSWRTZXQuYWRkcyhvR3JvdXBJZFNldClcbiAgICAgICAgICAgICAgICBpZFRvR3JvdXBJZFNldC5zZXQob2lkLCBncm91cElkU2V0KVxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKG9Hcm91cElkU2V0KSBpZFRvR3JvdXBJZFNldC5zZXQoaWQsIG9Hcm91cElkU2V0KVxuICAgICAgICAgICAgICBsZXQgbVNldDogT05vZGVTZXQ8SU5vZGU+ID0gaWRUb1ByZWZMYWJlbFNldC5nZXQoaWQpXG4gICAgICAgICAgICAgIGxldCBvU2V0OiBPTm9kZVNldDxJTm9kZT4gPSBpZFRvUHJlZkxhYmVsU2V0LmdldChvaWQpXG4gICAgICAgICAgICAgIGlmIChtU2V0KSB7XG4gICAgICAgICAgICAgICAgaWYgKG9TZXQpIG1TZXQuYWRkcyhvU2V0KVxuICAgICAgICAgICAgICAgIGlkVG9QcmVmTGFiZWxTZXQuc2V0KG9pZCwgbVNldClcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChvU2V0KSBpZFRvUHJlZkxhYmVsU2V0LnNldChpZCwgb1NldClcbiAgICAgICAgICAgICAgbVNldCA9IGlkVG9NYXRjaGVkTGFiZWxTZXQuZ2V0KGlkKVxuICAgICAgICAgICAgICBvU2V0ID0gaWRUb01hdGNoZWRMYWJlbFNldC5nZXQob2lkKVxuICAgICAgICAgICAgICBpZiAobVNldCkge1xuICAgICAgICAgICAgICAgIGlmIChvU2V0KSBtU2V0LmFkZHMob1NldClcbiAgICAgICAgICAgICAgICBpZFRvTWF0Y2hlZExhYmVsU2V0LnNldChvaWQsIG1TZXQpXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAob1NldCkgaWRUb01hdGNoZWRMYWJlbFNldC5zZXQoaWQsIG9TZXQpXG4gICAgICAgICAgICAgIG1TZXQgPSBpZFRvQWx0TGFiZWxTZXQuZ2V0KGlkKVxuICAgICAgICAgICAgICBvU2V0ID0gaWRUb0FsdExhYmVsU2V0LmdldChvaWQpXG4gICAgICAgICAgICAgIGlmIChtU2V0KSB7XG4gICAgICAgICAgICAgICAgaWYgKG9TZXQpIG1TZXQuYWRkcyhvU2V0KVxuICAgICAgICAgICAgICAgIGlkVG9BbHRMYWJlbFNldC5zZXQob2lkLCBtU2V0KVxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKG9TZXQpIGlkVG9BbHRMYWJlbFNldC5zZXQoaWQsIG9TZXQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgbGV0IHJldDogUmVzdWx0R3JvdXBbXSA9IFtdXG4gICAgICAgIGxldCBncm91cElkVG9Hcm91cDogRU1hcDxSZXN1bHRHcm91cD4gPSBuZXcgRU1hcDxSZXN1bHRHcm91cD4oKVxuICAgICAgICBsZXQgc2VlbjogU3RyaW5nU2V0ID0gbmV3IFN0cmluZ1NldCgpXG4gICAgICAgIGlkVG9JZFNldC5lYWNoKChpZFNldDogU3RyaW5nU2V0LCBpZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgaWYgKCFzZWVuLmhhcyhpZCkpIHtcbiAgICAgICAgICAgIHNlZW4uYWRkcyhpZFNldClcbiAgICAgICAgICAgIGxldCByZXN1bHQ6IFJlc3VsdCA9IG5ldyBSZXN1bHQoaWRTZXQudmFsdWVzKCkubWFwKG9pZCA9PiBEYXRhRmFjdG9yeS5pbnN0YW5jZS5uYW1lZE5vZGUob2lkKSksIGlkVG9EYXRhc291cmNlU2V0LmdldChpZCkudmFsdWVzKCksIGlkVG9NYXRjaGVkTGFiZWxTZXQuZ2V0KGlkKS52YWx1ZXMoKVswXSwgaWRUb1ByZWZMYWJlbFNldC5nZXQoaWQpLnZhbHVlcygpWzBdKVxuICAgICAgICAgICAgaWYgKGlkVG9BbHRMYWJlbFNldC5oYXMoaWQpKSByZXN1bHQuYWRkaXRpb25hbEluZm9ybWF0aW9uWydhbHRMYWJlbCddID0gaWRUb0FsdExhYmVsU2V0LmdldChpZCkudmFsdWVzKClcbiAgICAgICAgICAgIHJlc3VsdC5hZGRpdGlvbmFsSW5mb3JtYXRpb25bJ3R5cGUnXSA9IGlkVG9Hcm91cElkU2V0LmdldChpZCkudmFsdWVzKCkubWFwKHYgPT4gRGF0YUZhY3RvcnkuaW5zdGFuY2UubmFtZWROb2RlKHYpKVxuICAgICAgICAgICAgcmVzdWx0LmFkZGl0aW9uYWxJbmZvcm1hdGlvblsndHlwZUxhYmVsJ10gPSBpZFRvR3JvdXBJZFNldC5nZXQoaWQpLnZhbHVlcygpLm1hcCh2ID0+IGlkVG9QcmVmTGFiZWxTZXQuZ2V0KHYpLnZhbHVlcygpWzBdKVxuICAgICAgICAgICAgaWRUb0dyb3VwSWRTZXQuZ2V0KGlkKS5lYWNoKGdpZCA9PiB7XG4gICAgICAgICAgICAgIGxldCByZXN1bHRHcm91cDogUmVzdWx0R3JvdXAgPSBncm91cElkVG9Hcm91cC5nZXQoZ2lkKVxuICAgICAgICAgICAgICBpZiAoIXJlc3VsdEdyb3VwKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0R3JvdXAgPSBuZXcgUmVzdWx0R3JvdXAoaWRUb1ByZWZMYWJlbFNldC5nZXQoZ2lkKS52YWx1ZXMoKVswXS52YWx1ZSlcbiAgICAgICAgICAgICAgICBncm91cElkVG9Hcm91cC5zZXQoZ2lkLCByZXN1bHRHcm91cClcbiAgICAgICAgICAgICAgICByZXQucHVzaChyZXN1bHRHcm91cClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXN1bHRHcm91cC5yZXN1bHRzLnB1c2gocmVzdWx0KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiByZXRcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

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
        }
        return SparqlItemComponentController;
    }(SparqlItemComponentBindings));/*<auto_generate>*/angular.module('fibra').controller('SparqlItemComponentController',['sparqlItemService',function(){return new (Function.prototype.bind.apply(SparqlItemComponentController,[null].concat(Array.prototype.slice.apply(arguments))));}]);/*</auto_generate>*/
    var SparqlItemComponent = (function () {
        function SparqlItemComponent() {
            this.bindings = {
                itemId: '<',
                onSelect: '&',
                showRemoteProperties: '@'
            };
            this.controller = SparqlItemComponentController;
            this.templateUrl = 'partials/sparql-item.html';
        }
        return SparqlItemComponent;
    }());/*<auto_generate>*/angular.module('fibra').component('sparqlItem',new SparqlItemComponent());/*</auto_generate>*/
    fibra.SparqlItemComponent = SparqlItemComponent;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvc3BhcnFsLWl0ZW0tY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBVSxLQUFLLENBaUNkO0FBakNELFdBQVUsS0FBSyxFQUFDLENBQUM7SUFDZixZQUFZLENBQUE7SUFFWjtRQUFBO1FBRUEsQ0FBQztRQUFELGtDQUFDO0lBQUQsQ0FGQSxBQUVDLElBQUE7SUFNRDtRQUE0QyxpREFBMkI7UUFRckUsdUNBQW9CLGlCQUFvQztZQVIxRCxpQkFXQztZQUZHLGlCQUFPLENBQUE7WUFEVyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1lBTmpELGVBQVUsR0FBMEQsVUFBQyxPQUEyQztnQkFDckgsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQztvQkFDZCxLQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQzlDLFVBQUMsSUFBVSxJQUFLLE9BQUEsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLEVBQWhCLENBQWdCLENBQ2pDLENBQUE7WUFDTCxDQUFDLENBQUE7UUFHRCxDQUFDO1FBQ0gsb0NBQUM7SUFBRCxDQVhBLEFBV0MsQ0FYMkMsMkJBQTJCLEdBV3RFO0lBRUQ7UUFBQTtZQUNXLGFBQVEsR0FBMkI7Z0JBQ3hDLE1BQU0sRUFBRSxHQUFHO2dCQUNYLFFBQVEsRUFBRSxHQUFHO2dCQUNiLG9CQUFvQixFQUFFLEdBQUc7YUFDMUIsQ0FBQTtZQUNNLGVBQVUsR0FBRyw2QkFBNkIsQ0FBQTtZQUMxQyxnQkFBVyxHQUFXLDJCQUEyQixDQUFBO1FBQzVELENBQUM7UUFBRCwwQkFBQztJQUFELENBUkEsQUFRQyxJQUFBO0lBUlkseUJBQW1CLHNCQVEvQixDQUFBO0FBQ0gsQ0FBQyxFQWpDUyxLQUFLLEtBQUwsS0FBSyxRQWlDZCIsImZpbGUiOiJzY3JpcHRzL3NwYXJxbC1pdGVtLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBmaWJyYSB7XG4gICd1c2Ugc3RyaWN0J1xuXG4gIGNsYXNzIFNwYXJxbEl0ZW1Db21wb25lbnRCaW5kaW5ncyB7XG4gICAgcHVibGljIGl0ZW1JZDogSU5vZGVcbiAgfVxuXG4gIGludGVyZmFjZSBJU3BhcnFsSXRlbUNvbXBvbmVudEJpbmRpbmdDaGFuZ2VzIHtcbiAgICBpdGVtSWQ/OiBhbmd1bGFyLklDaGFuZ2VzT2JqZWN0PEl0ZW0+XG4gIH1cblxuICBjbGFzcyBTcGFycWxJdGVtQ29tcG9uZW50Q29udHJvbGxlciBleHRlbmRzIFNwYXJxbEl0ZW1Db21wb25lbnRCaW5kaW5ncyB7XG4gICAgcHJpdmF0ZSBpdGVtOiBJdGVtXG4gICAgcHVibGljICRvbkNoYW5nZXM6IChjaGFuZ2VzOiBJU3BhcnFsSXRlbUNvbXBvbmVudEJpbmRpbmdDaGFuZ2VzKSA9PiB2b2lkID0gKGNoYW5nZXM6IElTcGFycWxJdGVtQ29tcG9uZW50QmluZGluZ0NoYW5nZXMpID0+IHtcbiAgICAgIGlmICh0aGlzLml0ZW1JZClcbiAgICAgICAgdGhpcy5zcGFycWxJdGVtU2VydmljZS5nZXRJdGVtKHRoaXMuaXRlbUlkKS50aGVuKFxuICAgICAgICAgIChpdGVtOiBJdGVtKSA9PiB0aGlzLml0ZW0gPSBpdGVtXG4gICAgICAgIClcbiAgICB9XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzcGFycWxJdGVtU2VydmljZTogU3BhcnFsSXRlbVNlcnZpY2UpIHtcbiAgICAgIHN1cGVyKClcbiAgICB9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgU3BhcnFsSXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIGFuZ3VsYXIuSUNvbXBvbmVudE9wdGlvbnMge1xuICAgICAgcHVibGljIGJpbmRpbmdzOiB7W2lkOiBzdHJpbmddOiBzdHJpbmd9ID0ge1xuICAgICAgICBpdGVtSWQ6ICc8JyxcbiAgICAgICAgb25TZWxlY3Q6ICcmJyxcbiAgICAgICAgc2hvd1JlbW90ZVByb3BlcnRpZXM6ICdAJ1xuICAgICAgfVxuICAgICAgcHVibGljIGNvbnRyb2xsZXIgPSBTcGFycWxJdGVtQ29tcG9uZW50Q29udHJvbGxlclxuICAgICAgcHVibGljIHRlbXBsYXRlVXJsOiBzdHJpbmcgPSAncGFydGlhbHMvc3BhcnFsLWl0ZW0uaHRtbCdcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var fibra;
(function (fibra) {
    'use strict';
    var NodePlusLabel = (function (_super) {
        __extends(NodePlusLabel, _super);
        function NodePlusLabel(node, label) {
            _super.call(this, node);
            if (label)
                this.label = label;
        }
        return NodePlusLabel;
    }(fibra.NodeFromNode));
    fibra.NodePlusLabel = NodePlusLabel;
    var SourcedNodePlusLabel = (function (_super) {
        __extends(SourcedNodePlusLabel, _super);
        function SourcedNodePlusLabel(node, label, sourceEndpoints) {
            if (sourceEndpoints === void 0) { sourceEndpoints = []; }
            _super.call(this, node, label);
            this.sourceEndpoints = sourceEndpoints;
        }
        return SourcedNodePlusLabel;
    }(NodePlusLabel));
    fibra.SourcedNodePlusLabel = SourcedNodePlusLabel;
    var PropertyToValues = (function (_super) {
        __extends(PropertyToValues, _super);
        function PropertyToValues(property) {
            _super.call(this, property);
            this.values = [];
        }
        return PropertyToValues;
    }(NodePlusLabel));
    fibra.PropertyToValues = PropertyToValues;
    var SourcePlusProperties = (function () {
        function SourcePlusProperties(source) {
            this.source = source;
            this.properties = [];
        }
        return SourcePlusProperties;
    }());
    fibra.SourcePlusProperties = SourcePlusProperties;
    var Item = (function (_super) {
        __extends(Item, _super);
        function Item() {
            _super.apply(this, arguments);
            this.localProperties = [];
            this.remoteProperties = [];
            this.localInverseProperties = [];
            this.remoteInverseProperties = [];
        }
        return Item;
    }(NodePlusLabel));
    fibra.Item = Item;
    var SimpleConstraint = (function () {
        function SimpleConstraint(constraintString, priority) {
            if (priority === void 0) { priority = 0; }
            this.constraintString = constraintString;
            this.priority = priority;
        }
        return SimpleConstraint;
    }());
    fibra.SimpleConstraint = SimpleConstraint;
    var SparqlItemService = (function () {
        function SparqlItemService(workerService) {
            this.workerService = workerService;
        }
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
        /**
         * Get a single item from the local store
         * @param canceller promise that can be resolved to cancel a remote fetch
         */
        SparqlItemService.prototype.getItem = function (id, canceller) {
            return this.workerService.call('sparqlItemWorkerService', 'getItem', [id], canceller);
        };
        SparqlItemService.prototype.getItemsForExplore = function (canceller) {
            return this.workerService.call('sparqlItemWorkerService', 'getItemsForExplore', [], canceller);
        };
        SparqlItemService.prototype.createNewItem = function (equivalentNodes, properties) {
            if (equivalentNodes === void 0) { equivalentNodes = []; }
            if (properties === void 0) { properties = []; }
            return this.workerService.call('sparqlItemWorkerService', 'createNewItem', [equivalentNodes, properties]);
        };
        SparqlItemService.prototype.alterItem = function (id, propertiesToAdd, propertiesToRemove) {
            if (propertiesToRemove === void 0) { propertiesToRemove = []; }
            return this.workerService.call('sparqlItemWorkerService', 'alterItem', [id, propertiesToAdd, propertiesToRemove]);
        };
        SparqlItemService.prototype.deleteItem = function (id) {
            return this.workerService.call('sparqlItemWorkerService', 'deleteItem', [id]);
        };
        SparqlItemService.ns = 'http://ldf.fi/fibra/';
        SparqlItemService.schemaGraph = new fibra.NamedNode(SparqlItemService.ns + 'schema#');
        SparqlItemService.instanceGraph = new fibra.NamedNode(SparqlItemService.ns + 'main/');
        SparqlItemService.getLocalItemPropertiesQuery = "\nPREFIX skos: <http://www.w3.org/2004/02/skos/core#>\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\nPREFIX owl: <http://www.w3.org/2002/07/owl#>\nPREFIX sf: <http://ldf.fi/functions#>\nSELECT ?itemLabel ?property ?propertyLabel ?object ?objectLabel {\n  {\n    <ID> sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?itemLabel) .\n  } UNION {\n    <ID> ?property ?object .\n    OPTIONAL {\n      ?property sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?propertyLabelP)\n    }\n    BIND(COALESCE(?propertyLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?property),\".*/\",\"\"),\".*#\",\"\"),\"_\",\" \"),\"([A-Z\u00C5\u00C4\u00D6])\",\" $1\")) AS ?propertyLabel)\n    OPTIONAL {\n      ?object sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?objectLabelP) .\n    }\n    BIND (IF(ISIRI(?object),COALESCE(?objectLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?object),\".*/\",\"\"),\".*#\",\"\"),\"_\",\" \"),\"([A-Z\u00C5\u00C4\u00D6])\",\" $1\")),?object) AS ?objectLabel)\n  }\n}";
        SparqlItemService.getItemInversePropertiesQuery = "\nPREFIX skos: <http://www.w3.org/2004/02/skos/core#>\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\nPREFIX owl: <http://www.w3.org/2002/07/owl#>\nPREFIX sf: <http://ldf.fi/functions#>\nSELECT ?property ?propertyLabel ?object ?objectLabel {\n  VALUES ?id { <IDS> }\n  ?object ?property ?id .\n  ?id ?property ?object .\n  OPTIONAL {\n    ?property sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?propertyLabelP)\n  }\n  BIND(COALESCE(?propertyLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?property),\".*/\",\"\"),\".*#\",\"\"),\"_\",\" \"),\"([A-Z\u00C5\u00C4\u00D6])\",\" $1\")) AS ?propertyLabel)\n  OPTIONAL {\n    ?object sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?objectLabelP) .\n  }\n  BIND (IF(ISIRI(?object),COALESCE(?objectLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?object),\".*/\",\"\"),\".*#\",\"\"),\"_\",\" \"),\"([A-Z\u00C5\u00C4\u00D6])\",\" $1\")),?object) AS ?objectLabel)\n}\n";
        SparqlItemService.getRemoteItemPropertiesQuery = "\nPREFIX skos: <http://www.w3.org/2004/02/skos/core#>\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\nPREFIX owl: <http://www.w3.org/2002/07/owl#>\nPREFIX sf: <http://ldf.fi/functions#>\nSELECT ?property ?propertyLabel ?object ?objectLabel {\n  VALUES ?id { <IDS> }\n  ?id ?property ?object .\n  OPTIONAL {\n    ?property sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?propertyLabelP)\n  }\n  BIND(COALESCE(?propertyLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?property),\".*/\",\"\"),\".*#\",\"\"),\"_\",\" \"),\"([A-Z\u00C5\u00C4\u00D6])\",\" $1\")) AS ?propertyLabel)\n  OPTIONAL {\n    ?object sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?objectLabelP) .\n  }\n  BIND (IF(ISIRI(?object),COALESCE(?objectLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?object),\".*/\",\"\"),\".*#\",\"\"),\"_\",\" \"),\"([A-Z\u00C5\u00C4\u00D6])\",\" $1\")),?object) AS ?objectLabel)\n}\n";
        SparqlItemService.getItemsForExploreQuery = "\nPREFIX skos: <http://www.w3.org/2004/02/skos/core#>\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\nPREFIX owl: <http://www.w3.org/2002/07/owl#>\nPREFIX sf: <http://ldf.fi/functions#>\nSELECT ?id ?itemLabel ?property ?propertyLabel ?object ?objectLabel {\n  ?id a ?type .\n  {\n    ?id owl:sameAs ?oid .\n    VALUES ?service {\n      <SERVICES>\n    }\n    SERVICE ?service {\n      ?oid ?property ?object .\n      OPTIONAL {\n        ?property sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?propertyLabelP)\n      }\n      BIND(COALESCE(?propertyLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?property),\".*/\",\"\"),\".*#\",\"\"),\"_\",\" \"),\"([A-Z\u00C5\u00C4\u00D6])\",\" $1\")) AS ?propertyLabel)\n      OPTIONAL {\n        ?object sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?objectLabelP) .\n      }\n      BIND (IF(ISIRI(?object),COALESCE(?objectLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?object),\".*/\",\"\"),\".*#\",\"\"),\"_\",\" \"),\"([A-Z\u00C5\u00C4\u00D6])\",\" $1\")),?object) AS ?objectLabel)\n    }\n  } UNION {\n    ?id sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?itemLabel) .\n  } UNION {\n    ?id ?property ?object .\n    OPTIONAL {\n      ?property sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?propertyLabelP)\n    }\n    BIND(COALESCE(?propertyLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?property),\".*/\",\"\"),\".*#\",\"\"),\"_\",\" \"),\"([A-Z\u00C5\u00C4\u00D6])\",\" $1\")) AS ?propertyLabel)\n    OPTIONAL {\n      ?object sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?objectLabelP) .\n    }\n    BIND (IF(ISIRI(?object),COALESCE(?objectLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?object),\".*/\",\"\"),\".*#\",\"\"),\"_\",\" \"),\"([A-Z\u00C5\u00C4\u00D6])\",\" $1\")),?object) AS ?objectLabel)\n  }\n}\n";
        SparqlItemService.deleteItemQuery = "\nDELETE {\n  GRAPH ?g {\n    <ID> ?p ?o .\n    ?s ?p <ID> .\n  }\n}\nWHERE {\n  GRAPH ?g {\n    { <ID> ?p ?o } UNION { ?s ?p <ID> }\n  }\n}\n";
        SparqlItemService.lut = (function () {
            var lut = [];
            for (var i = 0; i < 256; i++)
                lut[i] = (i < 16 ? '0' : '') + i.toString(16);
            return lut;
        })();
        return SparqlItemService;
    }());/*<auto_generate>*/angular.module('fibra').service('sparqlItemService',['workerService',function(){return new (Function.prototype.bind.apply(SparqlItemService,[null].concat(Array.prototype.slice.apply(arguments))));}]);/*</auto_generate>*/
    fibra.SparqlItemService = SparqlItemService;
    var SparqlItemWorkerService = (function () {
        function SparqlItemWorkerService(sparqlService, $q, sparqlUpdateWorkerService, configurationWorkerService) {
            this.sparqlService = sparqlService;
            this.$q = $q;
            this.sparqlUpdateWorkerService = sparqlUpdateWorkerService;
            this.configurationWorkerService = configurationWorkerService;
        }
        SparqlItemWorkerService.prototype.getItem = function (id, canceller) {
            var _this = this;
            var queryTemplate = this.configurationWorkerService.configuration.primaryEndpoint.localItemQueryTemplate;
            queryTemplate = queryTemplate.replace(/<ID>/g, id.toCanonical());
            var item = new Item(id);
            return this.sparqlService.query(this.configurationWorkerService.configuration.primaryEndpoint.endpoint.value, queryTemplate, { timeout: canceller }).then(function (response) {
                var propertyMap = new fibra.EMap();
                var propertyValueMap = new fibra.EMap(function () { return new fibra.EMap(); });
                for (var _i = 0, _a = response.data.results.bindings; _i < _a.length; _i++) {
                    var b = _a[_i];
                    if (b['itemLabel'])
                        item.label = fibra.DataFactory.instance.nodeFromBinding(b['itemLabel']);
                    _this.processItemResult(item.localProperties, propertyMap, propertyValueMap, _this.configurationWorkerService.configuration.primaryEndpoint, b);
                }
                var sameAses = item.localProperties.filter(function (p) { return fibra.OWL.sameAs.equals(p); })[0];
                var ids = [item.toCanonical()];
                if (sameAses)
                    for (var _b = 0, _c = sameAses.values; _b < _c.length; _b++) {
                        var v = _c[_b];
                        ids.push(v.toCanonical());
                    }
                return _this.$q.all(_this.configurationWorkerService.configuration.remoteEndpoints().map(function (endpoint) {
                    return _this.sparqlService.query(endpoint.endpoint.value, SparqlItemService.getRemoteItemPropertiesQuery.replace(/<IDS>/g, ids.join('')), { timeout: canceller }).then(function (response2) {
                        for (var _i = 0, _a = response2.data.results.bindings; _i < _a.length; _i++) {
                            var b = _a[_i];
                            _this.processItemResult(item.remoteProperties, propertyMap, propertyValueMap, endpoint, b);
                        }
                    });
                })).then(function () { return item; });
            });
        };
        SparqlItemWorkerService.prototype.getItemsForExplore = function (canceller) {
            var _this = this;
            var queryTemplate = SparqlItemService.getItemsForExploreQuery;
            queryTemplate = queryTemplate.replace(/<SERVICES>/g, this.configurationWorkerService.configuration.remoteEndpoints().map(function (p) { return p.endpoint.toCanonical(); }).join(''));
            return this.sparqlService.query(this.configurationWorkerService.configuration.primaryEndpoint.endpoint.value, queryTemplate, { timeout: canceller }).then(function (response) {
                var items = new fibra.EOMap();
                var itemPropertyMap = new fibra.EMap(function () { return new fibra.EMap(); });
                var itemPropertyValueMap = new fibra.EMap(function () { return new fibra.EMap(function () { return new fibra.EMap(); }); });
                var _loop_1 = function(b) {
                    var item = items.goc(b['id'].value, function () { return new Item(fibra.DataFactory.instance.nodeFromBinding(b['id'])); });
                    if (b['itemLabel'])
                        item.label = fibra.DataFactory.instance.nodeFromBinding(b['itemLabel']);
                    _this.processItemResult(item.localProperties, itemPropertyMap.goc(b['id'].value), itemPropertyValueMap.goc(b['id'].value), _this.configurationWorkerService.configuration.primaryEndpoint, b);
                };
                for (var _i = 0, _a = response.data.results.bindings; _i < _a.length; _i++) {
                    var b = _a[_i];
                    _loop_1(b);
                }
                return items.values();
            });
        };
        SparqlItemWorkerService.prototype.deleteItem = function (id) {
            return this.sparqlService.update(this.configurationWorkerService.configuration.primaryEndpoint.updateEndpoint.value, this.configurationWorkerService.configuration.deleteItemQuery.replace(/<ID>/g, id.toCanonical())).then(function (r) { return r.status === 204; }, function (r) { return false; });
        };
        SparqlItemWorkerService.prototype.alterItem = function (id, propertiesToAdd, propertiesToRemove) {
            if (propertiesToRemove === void 0) { propertiesToRemove = []; }
            var instanceTriplesToAdd = [];
            var schemaTriplesToAdd = [];
            var instanceTriplesToRemove = [];
            propertiesToAdd.forEach(function (property) {
                if (property.label)
                    schemaTriplesToAdd.push(new fibra.Triple(property, fibra.SKOS.prefLabel, property.label));
                property.values.forEach(function (value) {
                    instanceTriplesToAdd.push(new fibra.Triple(id, property, value));
                    if (value.label)
                        instanceTriplesToAdd.push(new fibra.Triple(value, fibra.SKOS.prefLabel, value.label));
                });
            });
            propertiesToRemove.forEach(function (property) { return property.values.forEach(function (value) { return instanceTriplesToRemove.push(new fibra.Triple(id, property, value)); }); });
            return this.sparqlUpdateWorkerService.updateGraphs(this.configurationWorkerService.configuration.primaryEndpoint.updateEndpoint.value, [new fibra.Graph(SparqlItemService.schemaGraph, schemaTriplesToAdd), new fibra.Graph(SparqlItemService.instanceGraph, instanceTriplesToAdd)]);
        };
        SparqlItemWorkerService.prototype.createNewItem = function (equivalentNodes, properties) {
            if (equivalentNodes === void 0) { equivalentNodes = []; }
            if (properties === void 0) { properties = []; }
            var deferred = this.$q.defer();
            var subject = new fibra.NamedNode(SparqlItemService.ns + SparqlItemService.UUID());
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
            this.sparqlUpdateWorkerService.updateGraphs(this.configurationWorkerService.configuration.primaryEndpoint.updateEndpoint.value, [new fibra.Graph(SparqlItemService.schemaGraph, schemaTriplesToAdd), new fibra.Graph(SparqlItemService.instanceGraph, instanceTriplesToAdd)]).then(function () { return deferred.resolve(subject); }, deferred.reject, deferred.notify);
            return deferred.promise;
        };
        SparqlItemWorkerService.prototype.processItemResult = function (properties, propertyMap, propertyValueMap, endpoint, b) {
            if (b['property']) {
                var n = propertyValueMap.goc(b['property'].value).goc(b['object'].value, function () {
                    var propertyToValues = propertyMap.goc(b['property'].value, function () {
                        var ret = new PropertyToValues(fibra.DataFactory.instance.nodeFromBinding(b['property']));
                        if (b['propertyLabel'])
                            ret.label = fibra.DataFactory.instance.nodeFromBinding(b['propertyLabel']);
                        properties.push(ret);
                        return ret;
                    });
                    var oNode = new SourcedNodePlusLabel(fibra.DataFactory.instance.nodeFromBinding(b['object']));
                    propertyToValues.values.push(oNode);
                    return oNode;
                });
                n.sourceEndpoints.push(endpoint);
                if (b['objectLabel'] && !n.label)
                    n.label = fibra.DataFactory.instance.nodeFromBinding(b['objectLabel']);
            }
        };
        return SparqlItemWorkerService;
    }());/*<auto_generate>*/angular.module('fibra').service('sparqlItemWorkerService',['sparqlService','$q','sparqlUpdateWorkerService','configurationWorkerService',function(){return new (Function.prototype.bind.apply(SparqlItemWorkerService,[null].concat(Array.prototype.slice.apply(arguments))));}]);/*</auto_generate>*/
    fibra.SparqlItemWorkerService = SparqlItemWorkerService;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvc3BhcnFsLWl0ZW0tc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLElBQVUsS0FBSyxDQXNWZDtBQXRWRCxXQUFVLEtBQUssRUFBQyxDQUFDO0lBQ2YsWUFBWSxDQUFBO0lBY1o7UUFBbUMsaUNBQVk7UUFFN0MsdUJBQVksSUFBVyxFQUFFLEtBQWE7WUFDcEMsa0JBQU0sSUFBSSxDQUFDLENBQUE7WUFDWCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7UUFDL0IsQ0FBQztRQUNILG9CQUFDO0lBQUQsQ0FOQSxBQU1DLENBTmtDLGtCQUFZLEdBTTlDO0lBTlksbUJBQWEsZ0JBTXpCLENBQUE7SUFFRDtRQUEwQyx3Q0FBYTtRQUNyRCw4QkFBWSxJQUFXLEVBQUUsS0FBYSxFQUFTLGVBQTZDO1lBQXBELCtCQUFvRCxHQUFwRCxvQkFBb0Q7WUFDMUYsa0JBQU0sSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFBO1lBRDJCLG9CQUFlLEdBQWYsZUFBZSxDQUE4QjtRQUU1RixDQUFDO1FBQ0gsMkJBQUM7SUFBRCxDQUpBLEFBSUMsQ0FKeUMsYUFBYSxHQUl0RDtJQUpZLDBCQUFvQix1QkFJaEMsQ0FBQTtJQU1EO1FBQXVELG9DQUFhO1FBRWxFLDBCQUFZLFFBQWU7WUFDekIsa0JBQU0sUUFBUSxDQUFDLENBQUE7WUFGVixXQUFNLEdBQVEsRUFBRSxDQUFBO1FBR3ZCLENBQUM7UUFDSCx1QkFBQztJQUFELENBTEEsQUFLQyxDQUxzRCxhQUFhLEdBS25FO0lBTFksc0JBQWdCLG1CQUs1QixDQUFBO0lBRUQ7UUFFRSw4QkFBbUIsTUFBNkI7WUFBN0IsV0FBTSxHQUFOLE1BQU0sQ0FBdUI7WUFEekMsZUFBVSxHQUF1QyxFQUFFLENBQUE7UUFDUCxDQUFDO1FBQ3RELDJCQUFDO0lBQUQsQ0FIQSxBQUdDLElBQUE7SUFIWSwwQkFBb0IsdUJBR2hDLENBQUE7SUFFRDtR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LENBQUMsQ0FBQyxLQUFLLENBQUM7b0JBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxpQkFBVyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUE7WUFDcEcsQ0FBQztRQUNILENBQUM7UUFFSCw4QkFBQztJQUFELENBOUdBLEFBOEdDLElBQUE7SUE5R1ksNkJBQXVCLDBCQThHbkMsQ0FBQTtBQUVILENBQUMsRUF0VlMsS0FBSyxLQUFMLEtBQUssUUFzVmQiLCJmaWxlIjoic2NyaXB0cy9zcGFycWwtaXRlbS1zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIGZpYnJhIHtcbiAgJ3VzZSBzdHJpY3QnXG5cbiAgaW1wb3J0IHMgPSBmaS5zZWNvLnNwYXJxbFxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgSVNvdXJjZWROb2RlIGV4dGVuZHMgSU5vZGUge1xuICAgIHNvdXJjZUVuZHBvaW50czogRW5kcG9pbnRDb25maWd1cmF0aW9uW11cbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgSU5vZGVQbHVzTGFiZWwgZXh0ZW5kcyBJTm9kZSB7XG4gICAgbGFiZWw6IElOb2RlXG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIElTb3VyY2VkTm9kZVBsdXNMYWJlbCBleHRlbmRzIElOb2RlUGx1c0xhYmVsLCBJU291cmNlZE5vZGUge31cblxuICBleHBvcnQgY2xhc3MgTm9kZVBsdXNMYWJlbCBleHRlbmRzIE5vZGVGcm9tTm9kZSBpbXBsZW1lbnRzIElOb2RlUGx1c0xhYmVsIHtcbiAgICBwdWJsaWMgbGFiZWw6IElOb2RlXG4gICAgY29uc3RydWN0b3Iobm9kZTogSU5vZGUsIGxhYmVsPzogSU5vZGUpIHtcbiAgICAgIHN1cGVyKG5vZGUpXG4gICAgICBpZiAobGFiZWwpIHRoaXMubGFiZWwgPSBsYWJlbFxuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBTb3VyY2VkTm9kZVBsdXNMYWJlbCBleHRlbmRzIE5vZGVQbHVzTGFiZWwgaW1wbGVtZW50cyBJU291cmNlZE5vZGVQbHVzTGFiZWwge1xuICAgIGNvbnN0cnVjdG9yKG5vZGU6IElOb2RlLCBsYWJlbD86IElOb2RlLCBwdWJsaWMgc291cmNlRW5kcG9pbnRzOiBFbmRwb2ludENvbmZpZ3VyYXRpb25bXSA9IFtdKSB7XG4gICAgICBzdXBlcihub2RlLCBsYWJlbClcbiAgICB9XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIElQcm9wZXJ0eVRvVmFsdWVzPFQgZXh0ZW5kcyBJTm9kZT4gZXh0ZW5kcyBJTm9kZVBsdXNMYWJlbCB7XG4gICAgdmFsdWVzOiBUW11cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBQcm9wZXJ0eVRvVmFsdWVzPFQgZXh0ZW5kcyBJTm9kZT4gZXh0ZW5kcyBOb2RlUGx1c0xhYmVsIGltcGxlbWVudHMgSVByb3BlcnR5VG9WYWx1ZXM8VD4ge1xuICAgIHB1YmxpYyB2YWx1ZXM6IFRbXSA9IFtdXG4gICAgY29uc3RydWN0b3IocHJvcGVydHk6IElOb2RlKSB7XG4gICAgICBzdXBlcihwcm9wZXJ0eSlcbiAgICB9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgU291cmNlUGx1c1Byb3BlcnRpZXMge1xuICAgIHB1YmxpYyBwcm9wZXJ0aWVzOiBQcm9wZXJ0eVRvVmFsdWVzPElOb2RlUGx1c0xhYmVsPltdID0gW11cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgc291cmNlOiBFbmRwb2ludENvbmZpZ3VyYXRpb24pIHt9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgSXRlbSBleHRlbmRzIE5vZGVQbHVzTGFiZWwge1xuICAgIHB1YmxpYyBsb2NhbFByb3BlcnRpZXM6IFByb3BlcnR5VG9WYWx1ZXM8SU5vZGVQbHVzTGFiZWw+W10gPSBbXVxuICAgIHB1YmxpYyByZW1vdGVQcm9wZXJ0aWVzOiBQcm9wZXJ0eVRvVmFsdWVzPElOb2RlUGx1c0xhYmVsPltdID0gW11cbiAgICBwdWJsaWMgbG9jYWxJbnZlcnNlUHJvcGVydGllczogUHJvcGVydHlUb1ZhbHVlczxJTm9kZVBsdXNMYWJlbD5bXSA9IFtdXG4gICAgcHVibGljIHJlbW90ZUludmVyc2VQcm9wZXJ0aWVzOiBQcm9wZXJ0eVRvVmFsdWVzPElOb2RlUGx1c0xhYmVsPltdID0gW11cbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgSUNvbnN0cmFpbnQge1xuICAgIC8qKlxuICAgICAqIENvbnN0cmFpbnQgYXMgZXhwcmVzc2VkIGFzIGEgU1BBUlFMIGV4cHJlc3Npb25cbiAgICAgKi9cbiAgICBjb25zdHJhaW50U3RyaW5nOiBzdHJpbmdcbiAgICAvKipcbiAgICAgKiBPcmRlcmluZyBoaW50IGZvciBvcmRlcmluZyBjb25zdHJhaW50cyBpbiB0aGUgU1BBUlFMIHF1ZXJ5LiBUaGUgbGFyZ2VyLCB0aGUgbW9yZSBpbXBvcnRhbnQgKHdoZXJlIGl0IG1hdHRlcnMpXG4gICAgICovXG4gICAgcHJpb3JpdHk6IG51bWJlclxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIFNpbXBsZUNvbnN0cmFpbnQgaW1wbGVtZW50cyBJQ29uc3RyYWludCB7XG4gICAgY29uc3RydWN0b3IocHVibGljIGNvbnN0cmFpbnRTdHJpbmc6IHN0cmluZywgcHVibGljIHByaW9yaXR5OiBudW1iZXIgPSAwKSB7fVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIFNwYXJxbEl0ZW1TZXJ2aWNlIHtcblxuICAgIHB1YmxpYyBzdGF0aWMgbnM6IHN0cmluZyA9ICdodHRwOi8vbGRmLmZpL2ZpYnJhLydcbiAgICBwdWJsaWMgc3RhdGljIHNjaGVtYUdyYXBoOiBJTm9kZSA9IG5ldyBOYW1lZE5vZGUoU3BhcnFsSXRlbVNlcnZpY2UubnMgKyAnc2NoZW1hIycpXG4gICAgcHVibGljIHN0YXRpYyBpbnN0YW5jZUdyYXBoOiBJTm9kZSA9IG5ldyBOYW1lZE5vZGUoU3BhcnFsSXRlbVNlcnZpY2UubnMgKyAnbWFpbi8nKVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRMb2NhbEl0ZW1Qcm9wZXJ0aWVzUXVlcnk6IHN0cmluZyA9IGBcblBSRUZJWCBza29zOiA8aHR0cDovL3d3dy53My5vcmcvMjAwNC8wMi9za29zL2NvcmUjPlxuUFJFRklYIHJkZnM6IDxodHRwOi8vd3d3LnczLm9yZy8yMDAwLzAxL3JkZi1zY2hlbWEjPlxuUFJFRklYIG93bDogPGh0dHA6Ly93d3cudzMub3JnLzIwMDIvMDcvb3dsIz5cblBSRUZJWCBzZjogPGh0dHA6Ly9sZGYuZmkvZnVuY3Rpb25zIz5cblNFTEVDVCA/aXRlbUxhYmVsID9wcm9wZXJ0eSA/cHJvcGVydHlMYWJlbCA/b2JqZWN0ID9vYmplY3RMYWJlbCB7XG4gIHtcbiAgICA8SUQ+IHNmOnByZWZlcnJlZExhbmd1YWdlTGl0ZXJhbCAoc2tvczpwcmVmTGFiZWwgcmRmczpsYWJlbCBza29zOmFsdExhYmVsICdlbicgJycgP2l0ZW1MYWJlbCkgLlxuICB9IFVOSU9OIHtcbiAgICA8SUQ+ID9wcm9wZXJ0eSA/b2JqZWN0IC5cbiAgICBPUFRJT05BTCB7XG4gICAgICA/cHJvcGVydHkgc2Y6cHJlZmVycmVkTGFuZ3VhZ2VMaXRlcmFsIChza29zOnByZWZMYWJlbCByZGZzOmxhYmVsIHNrb3M6YWx0TGFiZWwgJ2VuJyAnJyA/cHJvcGVydHlMYWJlbFApXG4gICAgfVxuICAgIEJJTkQoQ09BTEVTQ0UoP3Byb3BlcnR5TGFiZWxQLFJFUExBQ0UoUkVQTEFDRShSRVBMQUNFKFJFUExBQ0UoU1RSKD9wcm9wZXJ0eSksXCIuKi9cIixcIlwiKSxcIi4qI1wiLFwiXCIpLFwiX1wiLFwiIFwiKSxcIihbQS1aw4XDhMOWXSlcIixcIiAkMVwiKSkgQVMgP3Byb3BlcnR5TGFiZWwpXG4gICAgT1BUSU9OQUwge1xuICAgICAgP29iamVjdCBzZjpwcmVmZXJyZWRMYW5ndWFnZUxpdGVyYWwgKHNrb3M6cHJlZkxhYmVsIHJkZnM6bGFiZWwgc2tvczphbHRMYWJlbCAnZW4nICcnID9vYmplY3RMYWJlbFApIC5cbiAgICB9XG4gICAgQklORCAoSUYoSVNJUkkoP29iamVjdCksQ09BTEVTQ0UoP29iamVjdExhYmVsUCxSRVBMQUNFKFJFUExBQ0UoUkVQTEFDRShSRVBMQUNFKFNUUig/b2JqZWN0KSxcIi4qL1wiLFwiXCIpLFwiLiojXCIsXCJcIiksXCJfXCIsXCIgXCIpLFwiKFtBLVrDhcOEw5ZdKVwiLFwiICQxXCIpKSw/b2JqZWN0KSBBUyA/b2JqZWN0TGFiZWwpXG4gIH1cbn1gXG4gICAgcHVibGljIHN0YXRpYyBnZXRJdGVtSW52ZXJzZVByb3BlcnRpZXNRdWVyeTogc3RyaW5nID0gYFxuUFJFRklYIHNrb3M6IDxodHRwOi8vd3d3LnczLm9yZy8yMDA0LzAyL3Nrb3MvY29yZSM+XG5QUkVGSVggcmRmczogPGh0dHA6Ly93d3cudzMub3JnLzIwMDAvMDEvcmRmLXNjaGVtYSM+XG5QUkVGSVggb3dsOiA8aHR0cDovL3d3dy53My5vcmcvMjAwMi8wNy9vd2wjPlxuUFJFRklYIHNmOiA8aHR0cDovL2xkZi5maS9mdW5jdGlvbnMjPlxuU0VMRUNUID9wcm9wZXJ0eSA/cHJvcGVydHlMYWJlbCA/b2JqZWN0ID9vYmplY3RMYWJlbCB7XG4gIFZBTFVFUyA/aWQgeyA8SURTPiB9XG4gID9vYmplY3QgP3Byb3BlcnR5ID9pZCAuXG4gID9pZCA/cHJvcGVydHkgP29iamVjdCAuXG4gIE9QVElPTkFMIHtcbiAgICA/cHJvcGVydHkgc2Y6cHJlZmVycmVkTGFuZ3VhZ2VMaXRlcmFsIChza29zOnByZWZMYWJlbCByZGZzOmxhYmVsIHNrb3M6YWx0TGFiZWwgJ2VuJyAnJyA/cHJvcGVydHlMYWJlbFApXG4gIH1cbiAgQklORChDT0FMRVNDRSg/cHJvcGVydHlMYWJlbFAsUkVQTEFDRShSRVBMQUNFKFJFUExBQ0UoUkVQTEFDRShTVFIoP3Byb3BlcnR5KSxcIi4qL1wiLFwiXCIpLFwiLiojXCIsXCJcIiksXCJfXCIsXCIgXCIpLFwiKFtBLVrDhcOEw5ZdKVwiLFwiICQxXCIpKSBBUyA/cHJvcGVydHlMYWJlbClcbiAgT1BUSU9OQUwge1xuICAgID9vYmplY3Qgc2Y6cHJlZmVycmVkTGFuZ3VhZ2VMaXRlcmFsIChza29zOnByZWZMYWJlbCByZGZzOmxhYmVsIHNrb3M6YWx0TGFiZWwgJ2VuJyAnJyA/b2JqZWN0TGFiZWxQKSAuXG4gIH1cbiAgQklORCAoSUYoSVNJUkkoP29iamVjdCksQ09BTEVTQ0UoP29iamVjdExhYmVsUCxSRVBMQUNFKFJFUExBQ0UoUkVQTEFDRShSRVBMQUNFKFNUUig/b2JqZWN0KSxcIi4qL1wiLFwiXCIpLFwiLiojXCIsXCJcIiksXCJfXCIsXCIgXCIpLFwiKFtBLVrDhcOEw5ZdKVwiLFwiICQxXCIpKSw/b2JqZWN0KSBBUyA/b2JqZWN0TGFiZWwpXG59XG5gXG4gICAgcHVibGljIHN0YXRpYyBnZXRSZW1vdGVJdGVtUHJvcGVydGllc1F1ZXJ5OiBzdHJpbmcgPSBgXG5QUkVGSVggc2tvczogPGh0dHA6Ly93d3cudzMub3JnLzIwMDQvMDIvc2tvcy9jb3JlIz5cblBSRUZJWCByZGZzOiA8aHR0cDovL3d3dy53My5vcmcvMjAwMC8wMS9yZGYtc2NoZW1hIz5cblBSRUZJWCBvd2w6IDxodHRwOi8vd3d3LnczLm9yZy8yMDAyLzA3L293bCM+XG5QUkVGSVggc2Y6IDxodHRwOi8vbGRmLmZpL2Z1bmN0aW9ucyM+XG5TRUxFQ1QgP3Byb3BlcnR5ID9wcm9wZXJ0eUxhYmVsID9vYmplY3QgP29iamVjdExhYmVsIHtcbiAgVkFMVUVTID9pZCB7IDxJRFM+IH1cbiAgP2lkID9wcm9wZXJ0eSA/b2JqZWN0IC5cbiAgT1BUSU9OQUwge1xuICAgID9wcm9wZXJ0eSBzZjpwcmVmZXJyZWRMYW5ndWFnZUxpdGVyYWwgKHNrb3M6cHJlZkxhYmVsIHJkZnM6bGFiZWwgc2tvczphbHRMYWJlbCAnZW4nICcnID9wcm9wZXJ0eUxhYmVsUClcbiAgfVxuICBCSU5EKENPQUxFU0NFKD9wcm9wZXJ0eUxhYmVsUCxSRVBMQUNFKFJFUExBQ0UoUkVQTEFDRShSRVBMQUNFKFNUUig/cHJvcGVydHkpLFwiLiovXCIsXCJcIiksXCIuKiNcIixcIlwiKSxcIl9cIixcIiBcIiksXCIoW0EtWsOFw4TDll0pXCIsXCIgJDFcIikpIEFTID9wcm9wZXJ0eUxhYmVsKVxuICBPUFRJT05BTCB7XG4gICAgP29iamVjdCBzZjpwcmVmZXJyZWRMYW5ndWFnZUxpdGVyYWwgKHNrb3M6cHJlZkxhYmVsIHJkZnM6bGFiZWwgc2tvczphbHRMYWJlbCAnZW4nICcnID9vYmplY3RMYWJlbFApIC5cbiAgfVxuICBCSU5EIChJRihJU0lSSSg/b2JqZWN0KSxDT0FMRVNDRSg/b2JqZWN0TGFiZWxQLFJFUExBQ0UoUkVQTEFDRShSRVBMQUNFKFJFUExBQ0UoU1RSKD9vYmplY3QpLFwiLiovXCIsXCJcIiksXCIuKiNcIixcIlwiKSxcIl9cIixcIiBcIiksXCIoW0EtWsOFw4TDll0pXCIsXCIgJDFcIikpLD9vYmplY3QpIEFTID9vYmplY3RMYWJlbClcbn1cbmBcbiAgICBwdWJsaWMgc3RhdGljIGdldEl0ZW1zRm9yRXhwbG9yZVF1ZXJ5OiBzdHJpbmcgPSBgXG5QUkVGSVggc2tvczogPGh0dHA6Ly93d3cudzMub3JnLzIwMDQvMDIvc2tvcy9jb3JlIz5cblBSRUZJWCByZGZzOiA8aHR0cDovL3d3dy53My5vcmcvMjAwMC8wMS9yZGYtc2NoZW1hIz5cblBSRUZJWCBvd2w6IDxodHRwOi8vd3d3LnczLm9yZy8yMDAyLzA3L293bCM+XG5QUkVGSVggc2Y6IDxodHRwOi8vbGRmLmZpL2Z1bmN0aW9ucyM+XG5TRUxFQ1QgP2lkID9pdGVtTGFiZWwgP3Byb3BlcnR5ID9wcm9wZXJ0eUxhYmVsID9vYmplY3QgP29iamVjdExhYmVsIHtcbiAgP2lkIGEgP3R5cGUgLlxuICB7XG4gICAgP2lkIG93bDpzYW1lQXMgP29pZCAuXG4gICAgVkFMVUVTID9zZXJ2aWNlIHtcbiAgICAgIDxTRVJWSUNFUz5cbiAgICB9XG4gICAgU0VSVklDRSA/c2VydmljZSB7XG4gICAgICA/b2lkID9wcm9wZXJ0eSA/b2JqZWN0IC5cbiAgICAgIE9QVElPTkFMIHtcbiAgICAgICAgP3Byb3BlcnR5IHNmOnByZWZlcnJlZExhbmd1YWdlTGl0ZXJhbCAoc2tvczpwcmVmTGFiZWwgcmRmczpsYWJlbCBza29zOmFsdExhYmVsICdlbicgJycgP3Byb3BlcnR5TGFiZWxQKVxuICAgICAgfVxuICAgICAgQklORChDT0FMRVNDRSg/cHJvcGVydHlMYWJlbFAsUkVQTEFDRShSRVBMQUNFKFJFUExBQ0UoUkVQTEFDRShTVFIoP3Byb3BlcnR5KSxcIi4qL1wiLFwiXCIpLFwiLiojXCIsXCJcIiksXCJfXCIsXCIgXCIpLFwiKFtBLVrDhcOEw5ZdKVwiLFwiICQxXCIpKSBBUyA/cHJvcGVydHlMYWJlbClcbiAgICAgIE9QVElPTkFMIHtcbiAgICAgICAgP29iamVjdCBzZjpwcmVmZXJyZWRMYW5ndWFnZUxpdGVyYWwgKHNrb3M6cHJlZkxhYmVsIHJkZnM6bGFiZWwgc2tvczphbHRMYWJlbCAnZW4nICcnID9vYmplY3RMYWJlbFApIC5cbiAgICAgIH1cbiAgICAgIEJJTkQgKElGKElTSVJJKD9vYmplY3QpLENPQUxFU0NFKD9vYmplY3RMYWJlbFAsUkVQTEFDRShSRVBMQUNFKFJFUExBQ0UoUkVQTEFDRShTVFIoP29iamVjdCksXCIuKi9cIixcIlwiKSxcIi4qI1wiLFwiXCIpLFwiX1wiLFwiIFwiKSxcIihbQS1aw4XDhMOWXSlcIixcIiAkMVwiKSksP29iamVjdCkgQVMgP29iamVjdExhYmVsKVxuICAgIH1cbiAgfSBVTklPTiB7XG4gICAgP2lkIHNmOnByZWZlcnJlZExhbmd1YWdlTGl0ZXJhbCAoc2tvczpwcmVmTGFiZWwgcmRmczpsYWJlbCBza29zOmFsdExhYmVsICdlbicgJycgP2l0ZW1MYWJlbCkgLlxuICB9IFVOSU9OIHtcbiAgICA/aWQgP3Byb3BlcnR5ID9vYmplY3QgLlxuICAgIE9QVElPTkFMIHtcbiAgICAgID9wcm9wZXJ0eSBzZjpwcmVmZXJyZWRMYW5ndWFnZUxpdGVyYWwgKHNrb3M6cHJlZkxhYmVsIHJkZnM6bGFiZWwgc2tvczphbHRMYWJlbCAnZW4nICcnID9wcm9wZXJ0eUxhYmVsUClcbiAgICB9XG4gICAgQklORChDT0FMRVNDRSg/cHJvcGVydHlMYWJlbFAsUkVQTEFDRShSRVBMQUNFKFJFUExBQ0UoUkVQTEFDRShTVFIoP3Byb3BlcnR5KSxcIi4qL1wiLFwiXCIpLFwiLiojXCIsXCJcIiksXCJfXCIsXCIgXCIpLFwiKFtBLVrDhcOEw5ZdKVwiLFwiICQxXCIpKSBBUyA/cHJvcGVydHlMYWJlbClcbiAgICBPUFRJT05BTCB7XG4gICAgICA/b2JqZWN0IHNmOnByZWZlcnJlZExhbmd1YWdlTGl0ZXJhbCAoc2tvczpwcmVmTGFiZWwgcmRmczpsYWJlbCBza29zOmFsdExhYmVsICdlbicgJycgP29iamVjdExhYmVsUCkgLlxuICAgIH1cbiAgICBCSU5EIChJRihJU0lSSSg/b2JqZWN0KSxDT0FMRVNDRSg/b2JqZWN0TGFiZWxQLFJFUExBQ0UoUkVQTEFDRShSRVBMQUNFKFJFUExBQ0UoU1RSKD9vYmplY3QpLFwiLiovXCIsXCJcIiksXCIuKiNcIixcIlwiKSxcIl9cIixcIiBcIiksXCIoW0EtWsOFw4TDll0pXCIsXCIgJDFcIikpLD9vYmplY3QpIEFTID9vYmplY3RMYWJlbClcbiAgfVxufVxuYFxuXG4gICAgcHVibGljIHN0YXRpYyBkZWxldGVJdGVtUXVlcnk6IHN0cmluZyA9IGBcbkRFTEVURSB7XG4gIEdSQVBIID9nIHtcbiAgICA8SUQ+ID9wID9vIC5cbiAgICA/cyA/cCA8SUQ+IC5cbiAgfVxufVxuV0hFUkUge1xuICBHUkFQSCA/ZyB7XG4gICAgeyA8SUQ+ID9wID9vIH0gVU5JT04geyA/cyA/cCA8SUQ+IH1cbiAgfVxufVxuYFxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgbHV0OiBzdHJpbmdbXSA9ICgoKSA9PiB7XG4gICAgICBsZXQgbHV0OiBzdHJpbmdbXSA9IFtdXG4gICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgMjU2OyBpKyspXG4gICAgICAgIGx1dFtpXSA9IChpIDwgMTYgPyAnMCcgOiAnJykgKyBpLnRvU3RyaW5nKDE2KVxuICAgICAgcmV0dXJuIGx1dFxuICAgIH0pKClcblxuICAgIHB1YmxpYyBzdGF0aWMgVVVJRCgpOiBzdHJpbmcge1xuICAgICAgLyogdHNsaW50OmRpc2FibGU6bm8tYml0d2lzZSAqL1xuICAgICAgbGV0IGQwOiBudW1iZXIgPSBNYXRoLnJhbmRvbSgpICogMHhmZmZmZmZmZiB8IDBcbiAgICAgIGxldCBkMTogbnVtYmVyID0gTWF0aC5yYW5kb20oKSAqIDB4ZmZmZmZmZmYgfCAwXG4gICAgICBsZXQgZDI6IG51bWJlciA9IE1hdGgucmFuZG9tKCkgKiAweGZmZmZmZmZmIHwgMFxuICAgICAgbGV0IGQzOiBudW1iZXIgPSBNYXRoLnJhbmRvbSgpICogMHhmZmZmZmZmZiB8IDBcbiAgICAgIHJldHVybiBTcGFycWxJdGVtU2VydmljZS5sdXRbZDAgJiAweGZmXSArIFNwYXJxbEl0ZW1TZXJ2aWNlLmx1dFtkMCA+PiA4ICYgMHhmZl0gKyBTcGFycWxJdGVtU2VydmljZS5sdXRbZDAgPj4gMTYgJiAweGZmXSArIFNwYXJxbEl0ZW1TZXJ2aWNlLmx1dFtkMCA+PiAyNCAmIDB4ZmZdICsgJy0nICtcbiAgICAgICAgU3BhcnFsSXRlbVNlcnZpY2UubHV0W2QxICYgMHhmZl0gKyBTcGFycWxJdGVtU2VydmljZS5sdXRbZDEgPj4gOCAmIDB4ZmZdICsgJy0nICsgU3BhcnFsSXRlbVNlcnZpY2UubHV0W2QxID4+IDE2ICYgMHgwZiB8IDB4NDBdICsgU3BhcnFsSXRlbVNlcnZpY2UubHV0W2QxID4+IDI0ICYgMHhmZl0gKyAnLScgK1xuICAgICAgICBTcGFycWxJdGVtU2VydmljZS5sdXRbZDIgJiAweDNmIHwgMHg4MF0gKyBTcGFycWxJdGVtU2VydmljZS5sdXRbZDIgPj4gOCAmIDB4ZmZdICsgJy0nICsgU3BhcnFsSXRlbVNlcnZpY2UubHV0W2QyID4+IDE2ICYgMHhmZl0gKyBTcGFycWxJdGVtU2VydmljZS5sdXRbZDIgPj4gMjQgJiAweGZmXSArXG4gICAgICAgIFNwYXJxbEl0ZW1TZXJ2aWNlLmx1dFtkMyAmIDB4ZmZdICsgU3BhcnFsSXRlbVNlcnZpY2UubHV0W2QzID4+IDggJiAweGZmXSArIFNwYXJxbEl0ZW1TZXJ2aWNlLmx1dFtkMyA+PiAxNiAmIDB4ZmZdICsgU3BhcnFsSXRlbVNlcnZpY2UubHV0W2QzID4+IDI0ICYgMHhmZl1cbiAgICAgIC8qIHRzbGludDplbmFibGU6bm8tYml0d2lzZSAqL1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgd29ya2VyU2VydmljZTogV29ya2VyU2VydmljZSkge31cblxuICAgIC8qKlxuICAgICAqIEdldCBhIHNpbmdsZSBpdGVtIGZyb20gdGhlIGxvY2FsIHN0b3JlXG4gICAgICogQHBhcmFtIGNhbmNlbGxlciBwcm9taXNlIHRoYXQgY2FuIGJlIHJlc29sdmVkIHRvIGNhbmNlbCBhIHJlbW90ZSBmZXRjaFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRJdGVtKGlkOiBJTm9kZSwgY2FuY2VsbGVyPzogYW5ndWxhci5JUHJvbWlzZTxhbnk+KTogYW5ndWxhci5JUHJvbWlzZTxJdGVtPiB7XG4gICAgICByZXR1cm4gdGhpcy53b3JrZXJTZXJ2aWNlLmNhbGwoJ3NwYXJxbEl0ZW1Xb3JrZXJTZXJ2aWNlJywgJ2dldEl0ZW0nLCBbaWRdLCBjYW5jZWxsZXIpXG4gICAgfVxuXG4gICAgcHVibGljIGdldEl0ZW1zRm9yRXhwbG9yZShjYW5jZWxsZXI/OiBhbmd1bGFyLklQcm9taXNlPGFueT4pOiBhbmd1bGFyLklQcm9taXNlPEl0ZW1bXT4ge1xuICAgICAgcmV0dXJuIHRoaXMud29ya2VyU2VydmljZS5jYWxsKCdzcGFycWxJdGVtV29ya2VyU2VydmljZScsICdnZXRJdGVtc0ZvckV4cGxvcmUnLCBbXSwgY2FuY2VsbGVyKVxuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGVOZXdJdGVtKGVxdWl2YWxlbnROb2RlczogSU5vZGVbXSA9IFtdLCBwcm9wZXJ0aWVzOiBJUHJvcGVydHlUb1ZhbHVlczxJTm9kZT5bXSA9IFtdKTogYW5ndWxhci5JUHJvbWlzZTxJTm9kZT4ge1xuICAgICAgcmV0dXJuIHRoaXMud29ya2VyU2VydmljZS5jYWxsKCdzcGFycWxJdGVtV29ya2VyU2VydmljZScsICdjcmVhdGVOZXdJdGVtJywgW2VxdWl2YWxlbnROb2RlcywgcHJvcGVydGllc10pXG4gICAgfVxuXG4gICAgcHVibGljIGFsdGVySXRlbShpZDogSU5vZGUsIHByb3BlcnRpZXNUb0FkZDogSVByb3BlcnR5VG9WYWx1ZXM8SU5vZGU+W10sIHByb3BlcnRpZXNUb1JlbW92ZTogSVByb3BlcnR5VG9WYWx1ZXM8SU5vZGU+W10gPSBbXSk6IGFuZ3VsYXIuSVByb21pc2U8c3RyaW5nPiB7XG4gICAgICByZXR1cm4gdGhpcy53b3JrZXJTZXJ2aWNlLmNhbGwoJ3NwYXJxbEl0ZW1Xb3JrZXJTZXJ2aWNlJywgJ2FsdGVySXRlbScsIFtpZCwgcHJvcGVydGllc1RvQWRkLCBwcm9wZXJ0aWVzVG9SZW1vdmVdKVxuICAgIH1cblxuICAgIHB1YmxpYyBkZWxldGVJdGVtKGlkOiBJTm9kZSk6IGFuZ3VsYXIuSVByb21pc2U8c3RyaW5nPiB7XG4gICAgICByZXR1cm4gdGhpcy53b3JrZXJTZXJ2aWNlLmNhbGwoJ3NwYXJxbEl0ZW1Xb3JrZXJTZXJ2aWNlJywgJ2RlbGV0ZUl0ZW0nLCBbaWRdKVxuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBTcGFycWxJdGVtV29ya2VyU2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNwYXJxbFNlcnZpY2U6IHMuU3BhcnFsU2VydmljZSwgcHJpdmF0ZSAkcTogYW5ndWxhci5JUVNlcnZpY2UsIHByaXZhdGUgc3BhcnFsVXBkYXRlV29ya2VyU2VydmljZTogU3BhcnFsVXBkYXRlV29ya2VyU2VydmljZSwgcHJpdmF0ZSBjb25maWd1cmF0aW9uV29ya2VyU2VydmljZTogQ29uZmlndXJhdGlvbldvcmtlclNlcnZpY2UpIHt9XG5cbiAgICBwdWJsaWMgZ2V0SXRlbShpZDogSU5vZGUsIGNhbmNlbGxlcj86IGFuZ3VsYXIuSVByb21pc2U8YW55Pik6IGFuZ3VsYXIuSVByb21pc2U8SXRlbT4ge1xuICAgICAgbGV0IHF1ZXJ5VGVtcGxhdGU6IHN0cmluZyA9IHRoaXMuY29uZmlndXJhdGlvbldvcmtlclNlcnZpY2UuY29uZmlndXJhdGlvbi5wcmltYXJ5RW5kcG9pbnQubG9jYWxJdGVtUXVlcnlUZW1wbGF0ZVxuICAgICAgcXVlcnlUZW1wbGF0ZSA9IHF1ZXJ5VGVtcGxhdGUucmVwbGFjZSgvPElEPi9nLCBpZC50b0Nhbm9uaWNhbCgpKVxuICAgICAgbGV0IGl0ZW06IEl0ZW0gPSBuZXcgSXRlbShpZClcbiAgICAgIHJldHVybiB0aGlzLnNwYXJxbFNlcnZpY2UucXVlcnkodGhpcy5jb25maWd1cmF0aW9uV29ya2VyU2VydmljZS5jb25maWd1cmF0aW9uLnByaW1hcnlFbmRwb2ludC5lbmRwb2ludC52YWx1ZSwgcXVlcnlUZW1wbGF0ZSwge3RpbWVvdXQ6IGNhbmNlbGxlcn0pLnRoZW4oXG4gICAgICAgIChyZXNwb25zZTogYW5ndWxhci5JSHR0cFByb21pc2VDYWxsYmFja0FyZzxzLklTcGFycWxCaW5kaW5nUmVzdWx0PHtbaWQ6IHN0cmluZ106IHMuSVNwYXJxbEJpbmRpbmd9Pj4pID0+IHtcbiAgICAgICAgICBsZXQgcHJvcGVydHlNYXA6IEVNYXA8UHJvcGVydHlUb1ZhbHVlczxJTm9kZVBsdXNMYWJlbD4+ID0gbmV3IEVNYXA8UHJvcGVydHlUb1ZhbHVlczxJTm9kZVBsdXNMYWJlbD4+KClcbiAgICAgICAgICBsZXQgcHJvcGVydHlWYWx1ZU1hcDogRU1hcDxFTWFwPElTb3VyY2VkTm9kZVBsdXNMYWJlbD4+ID0gbmV3IEVNYXA8RU1hcDxJU291cmNlZE5vZGVQbHVzTGFiZWw+PigoKSA9PiBuZXcgRU1hcDxJU291cmNlZE5vZGVQbHVzTGFiZWw+KCkpXG4gICAgICAgICAgZm9yIChsZXQgYiBvZiByZXNwb25zZS5kYXRhIS5yZXN1bHRzLmJpbmRpbmdzKSB7XG4gICAgICAgICAgICBpZiAoYlsnaXRlbUxhYmVsJ10pIGl0ZW0ubGFiZWwgPSBEYXRhRmFjdG9yeS5pbnN0YW5jZS5ub2RlRnJvbUJpbmRpbmcoYlsnaXRlbUxhYmVsJ10pXG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NJdGVtUmVzdWx0KGl0ZW0ubG9jYWxQcm9wZXJ0aWVzLCBwcm9wZXJ0eU1hcCwgcHJvcGVydHlWYWx1ZU1hcCwgdGhpcy5jb25maWd1cmF0aW9uV29ya2VyU2VydmljZS5jb25maWd1cmF0aW9uLnByaW1hcnlFbmRwb2ludCwgYilcbiAgICAgICAgICB9XG4gICAgICAgICAgbGV0IHNhbWVBc2VzOiBQcm9wZXJ0eVRvVmFsdWVzPElOb2RlUGx1c0xhYmVsPiA9IGl0ZW0ubG9jYWxQcm9wZXJ0aWVzLmZpbHRlcihwID0+IE9XTC5zYW1lQXMuZXF1YWxzKHApKVswXVxuICAgICAgICAgIGxldCBpZHM6IHN0cmluZ1tdID0gW2l0ZW0udG9DYW5vbmljYWwoKV1cbiAgICAgICAgICBpZiAoc2FtZUFzZXMpIGZvciAobGV0IHYgb2Ygc2FtZUFzZXMudmFsdWVzKSBpZHMucHVzaCh2LnRvQ2Fub25pY2FsKCkpXG4gICAgICAgICAgcmV0dXJuIHRoaXMuJHEuYWxsKHRoaXMuY29uZmlndXJhdGlvbldvcmtlclNlcnZpY2UuY29uZmlndXJhdGlvbi5yZW1vdGVFbmRwb2ludHMoKS5tYXAoZW5kcG9pbnQgPT5cbiAgICAgICAgICAgIHRoaXMuc3BhcnFsU2VydmljZS5xdWVyeShlbmRwb2ludC5lbmRwb2ludC52YWx1ZSwgU3BhcnFsSXRlbVNlcnZpY2UuZ2V0UmVtb3RlSXRlbVByb3BlcnRpZXNRdWVyeS5yZXBsYWNlKC88SURTPi9nLCBpZHMuam9pbignJykpLCB7dGltZW91dDogY2FuY2VsbGVyfSkudGhlbihcbiAgICAgICAgICAgICAgKHJlc3BvbnNlMjogYW5ndWxhci5JSHR0cFByb21pc2VDYWxsYmFja0FyZzxzLklTcGFycWxCaW5kaW5nUmVzdWx0PHtbaWQ6IHN0cmluZ106IHMuSVNwYXJxbEJpbmRpbmd9Pj4pID0+IHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBiIG9mIHJlc3BvbnNlMi5kYXRhIS5yZXN1bHRzLmJpbmRpbmdzKVxuICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzSXRlbVJlc3VsdChpdGVtLnJlbW90ZVByb3BlcnRpZXMsIHByb3BlcnR5TWFwLCBwcm9wZXJ0eVZhbHVlTWFwLCBlbmRwb2ludCwgYilcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICApKS50aGVuKCgpID0+IGl0ZW0pXG4gICAgICAgIH1cbiAgICAgIClcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0SXRlbXNGb3JFeHBsb3JlKGNhbmNlbGxlcj86IGFuZ3VsYXIuSVByb21pc2U8YW55Pik6IGFuZ3VsYXIuSVByb21pc2U8SXRlbVtdPiB7XG4gICAgICBsZXQgcXVlcnlUZW1wbGF0ZTogc3RyaW5nID0gU3BhcnFsSXRlbVNlcnZpY2UuZ2V0SXRlbXNGb3JFeHBsb3JlUXVlcnlcbiAgICAgIHF1ZXJ5VGVtcGxhdGUgPSBxdWVyeVRlbXBsYXRlLnJlcGxhY2UoLzxTRVJWSUNFUz4vZywgdGhpcy5jb25maWd1cmF0aW9uV29ya2VyU2VydmljZS5jb25maWd1cmF0aW9uLnJlbW90ZUVuZHBvaW50cygpLm1hcChwID0+IHAuZW5kcG9pbnQudG9DYW5vbmljYWwoKSkuam9pbignJykpXG4gICAgICByZXR1cm4gdGhpcy5zcGFycWxTZXJ2aWNlLnF1ZXJ5KHRoaXMuY29uZmlndXJhdGlvbldvcmtlclNlcnZpY2UuY29uZmlndXJhdGlvbi5wcmltYXJ5RW5kcG9pbnQuZW5kcG9pbnQudmFsdWUsIHF1ZXJ5VGVtcGxhdGUsIHt0aW1lb3V0OiBjYW5jZWxsZXJ9KS50aGVuKFxuICAgICAgICAocmVzcG9uc2U6IGFuZ3VsYXIuSUh0dHBQcm9taXNlQ2FsbGJhY2tBcmc8cy5JU3BhcnFsQmluZGluZ1Jlc3VsdDx7W2lkOiBzdHJpbmddOiBzLklTcGFycWxCaW5kaW5nfT4+KSA9PiB7XG4gICAgICAgICAgbGV0IGl0ZW1zOiBFT01hcDxJdGVtPiA9IG5ldyBFT01hcDxJdGVtPigpXG4gICAgICAgICAgbGV0IGl0ZW1Qcm9wZXJ0eU1hcDogRU1hcDxFTWFwPFByb3BlcnR5VG9WYWx1ZXM8SU5vZGVQbHVzTGFiZWw+Pj4gPSBuZXcgRU1hcDxFTWFwPFByb3BlcnR5VG9WYWx1ZXM8SU5vZGVQbHVzTGFiZWw+Pj4oKCkgPT4gbmV3IEVNYXA8UHJvcGVydHlUb1ZhbHVlczxJTm9kZVBsdXNMYWJlbD4+KCkpXG4gICAgICAgICAgbGV0IGl0ZW1Qcm9wZXJ0eVZhbHVlTWFwOiBFTWFwPEVNYXA8RU1hcDxJU291cmNlZE5vZGVQbHVzTGFiZWw+Pj4gPSBuZXcgRU1hcDxFTWFwPEVNYXA8SVNvdXJjZWROb2RlUGx1c0xhYmVsPj4+KCgpID0+IG5ldyBFTWFwPEVNYXA8SVNvdXJjZWROb2RlUGx1c0xhYmVsPj4oKCkgPT4gbmV3IEVNYXA8SVNvdXJjZWROb2RlUGx1c0xhYmVsPigpKSlcbiAgICAgICAgICBmb3IgKGxldCBiIG9mIHJlc3BvbnNlLmRhdGEhLnJlc3VsdHMuYmluZGluZ3MpIHtcbiAgICAgICAgICAgIGxldCBpdGVtOiBJdGVtID0gaXRlbXMuZ29jKGJbJ2lkJ10udmFsdWUsICgpID0+IG5ldyBJdGVtKERhdGFGYWN0b3J5Lmluc3RhbmNlLm5vZGVGcm9tQmluZGluZyhiWydpZCddKSkpXG4gICAgICAgICAgICBpZiAoYlsnaXRlbUxhYmVsJ10pIGl0ZW0ubGFiZWwgPSBEYXRhRmFjdG9yeS5pbnN0YW5jZS5ub2RlRnJvbUJpbmRpbmcoYlsnaXRlbUxhYmVsJ10pXG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NJdGVtUmVzdWx0KGl0ZW0ubG9jYWxQcm9wZXJ0aWVzLCBpdGVtUHJvcGVydHlNYXAuZ29jKGJbJ2lkJ10udmFsdWUpLCBpdGVtUHJvcGVydHlWYWx1ZU1hcC5nb2MoYlsnaWQnXS52YWx1ZSksIHRoaXMuY29uZmlndXJhdGlvbldvcmtlclNlcnZpY2UuY29uZmlndXJhdGlvbi5wcmltYXJ5RW5kcG9pbnQsIGIpXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBpdGVtcy52YWx1ZXMoKVxuICAgICAgICB9XG4gICAgICApXG4gICAgfVxuXG4gICAgcHVibGljIGRlbGV0ZUl0ZW0oaWQ6IElOb2RlKTogYW5ndWxhci5JUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICByZXR1cm4gdGhpcy5zcGFycWxTZXJ2aWNlLnVwZGF0ZSh0aGlzLmNvbmZpZ3VyYXRpb25Xb3JrZXJTZXJ2aWNlLmNvbmZpZ3VyYXRpb24ucHJpbWFyeUVuZHBvaW50LnVwZGF0ZUVuZHBvaW50LnZhbHVlLCB0aGlzLmNvbmZpZ3VyYXRpb25Xb3JrZXJTZXJ2aWNlLmNvbmZpZ3VyYXRpb24uZGVsZXRlSXRlbVF1ZXJ5LnJlcGxhY2UoLzxJRD4vZywgaWQudG9DYW5vbmljYWwoKSkpLnRoZW4oXG4gICAgICAgIChyKSA9PiByLnN0YXR1cyA9PT0gMjA0LFxuICAgICAgICAocikgPT4gZmFsc2VcbiAgICAgIClcbiAgICB9XG5cbiAgICBwdWJsaWMgYWx0ZXJJdGVtKGlkOiBJTm9kZSwgcHJvcGVydGllc1RvQWRkOiBJUHJvcGVydHlUb1ZhbHVlczxJTm9kZT5bXSwgcHJvcGVydGllc1RvUmVtb3ZlOiBJUHJvcGVydHlUb1ZhbHVlczxJTm9kZT5bXSA9IFtdKTogYW5ndWxhci5JUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICBsZXQgaW5zdGFuY2VUcmlwbGVzVG9BZGQ6IElUcmlwbGVbXSA9IFtdXG4gICAgICBsZXQgc2NoZW1hVHJpcGxlc1RvQWRkOiBJVHJpcGxlW10gPSBbXVxuICAgICAgbGV0IGluc3RhbmNlVHJpcGxlc1RvUmVtb3ZlOiBJVHJpcGxlW10gPSBbXVxuICAgICAgcHJvcGVydGllc1RvQWRkLmZvckVhY2gocHJvcGVydHkgPT4ge1xuICAgICAgICBpZiAocHJvcGVydHkubGFiZWwpIHNjaGVtYVRyaXBsZXNUb0FkZC5wdXNoKG5ldyBUcmlwbGUocHJvcGVydHksIFNLT1MucHJlZkxhYmVsLCBwcm9wZXJ0eS5sYWJlbCkpXG4gICAgICAgIHByb3BlcnR5LnZhbHVlcy5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgICAgICBpbnN0YW5jZVRyaXBsZXNUb0FkZC5wdXNoKG5ldyBUcmlwbGUoaWQsIHByb3BlcnR5LCB2YWx1ZSkpXG4gICAgICAgICAgaWYgKCg8Tm9kZVBsdXNMYWJlbD52YWx1ZSkubGFiZWwpIGluc3RhbmNlVHJpcGxlc1RvQWRkLnB1c2gobmV3IFRyaXBsZSh2YWx1ZSwgU0tPUy5wcmVmTGFiZWwsICg8Tm9kZVBsdXNMYWJlbD52YWx1ZSkubGFiZWwpKVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICAgIHByb3BlcnRpZXNUb1JlbW92ZS5mb3JFYWNoKHByb3BlcnR5ID0+IHByb3BlcnR5LnZhbHVlcy5mb3JFYWNoKHZhbHVlID0+IGluc3RhbmNlVHJpcGxlc1RvUmVtb3ZlLnB1c2gobmV3IFRyaXBsZShpZCwgcHJvcGVydHksIHZhbHVlKSkpKVxuICAgICAgcmV0dXJuIHRoaXMuc3BhcnFsVXBkYXRlV29ya2VyU2VydmljZS51cGRhdGVHcmFwaHModGhpcy5jb25maWd1cmF0aW9uV29ya2VyU2VydmljZS5jb25maWd1cmF0aW9uLnByaW1hcnlFbmRwb2ludC51cGRhdGVFbmRwb2ludC52YWx1ZSwgW25ldyBHcmFwaChTcGFycWxJdGVtU2VydmljZS5zY2hlbWFHcmFwaCwgc2NoZW1hVHJpcGxlc1RvQWRkKSwgbmV3IEdyYXBoKFNwYXJxbEl0ZW1TZXJ2aWNlLmluc3RhbmNlR3JhcGgsIGluc3RhbmNlVHJpcGxlc1RvQWRkKV0pXG4gICAgfVxuXG4gICAgcHVibGljIGNyZWF0ZU5ld0l0ZW0oZXF1aXZhbGVudE5vZGVzOiBJTm9kZVtdID0gW10sIHByb3BlcnRpZXM6IFByb3BlcnR5VG9WYWx1ZXM8SU5vZGU+W10gPSBbXSk6IGFuZ3VsYXIuSVByb21pc2U8SU5vZGU+IHtcbiAgICAgIGxldCBkZWZlcnJlZDogYW5ndWxhci5JRGVmZXJyZWQ8SU5vZGU+ID0gdGhpcy4kcS5kZWZlcigpXG4gICAgICBsZXQgc3ViamVjdDogSU5vZGUgPSBuZXcgTmFtZWROb2RlKFNwYXJxbEl0ZW1TZXJ2aWNlLm5zICsgU3BhcnFsSXRlbVNlcnZpY2UuVVVJRCgpKVxuICAgICAgZGVmZXJyZWQubm90aWZ5KHN1YmplY3QpXG4gICAgICBsZXQgc2NoZW1hVHJpcGxlc1RvQWRkOiBUcmlwbGVbXSA9IFtdXG4gICAgICBsZXQgaW5zdGFuY2VUcmlwbGVzVG9BZGQ6IFRyaXBsZVtdID0gW11cbiAgICAgIGVxdWl2YWxlbnROb2Rlcy5mb3JFYWNoKG5vZGUgPT4gaW5zdGFuY2VUcmlwbGVzVG9BZGQucHVzaChuZXcgVHJpcGxlKHN1YmplY3QsIE9XTC5zYW1lQXMsIG5vZGUpKSlcbiAgICAgIHByb3BlcnRpZXMuZm9yRWFjaChwcm9wZXJ0eSA9PiB7XG4gICAgICAgIGlmIChwcm9wZXJ0eS5sYWJlbCkgc2NoZW1hVHJpcGxlc1RvQWRkLnB1c2gobmV3IFRyaXBsZShwcm9wZXJ0eSwgU0tPUy5wcmVmTGFiZWwsIHByb3BlcnR5LmxhYmVsKSlcbiAgICAgICAgcHJvcGVydHkudmFsdWVzLmZvckVhY2godmFsdWUgPT4ge1xuICAgICAgICAgIGluc3RhbmNlVHJpcGxlc1RvQWRkLnB1c2gobmV3IFRyaXBsZShzdWJqZWN0LCBwcm9wZXJ0eSwgdmFsdWUpKVxuICAgICAgICAgIGlmICgoPE5vZGVQbHVzTGFiZWw+dmFsdWUpLmxhYmVsKSBpbnN0YW5jZVRyaXBsZXNUb0FkZC5wdXNoKG5ldyBUcmlwbGUodmFsdWUsIFNLT1MucHJlZkxhYmVsLCAoPE5vZGVQbHVzTGFiZWw+dmFsdWUpLmxhYmVsKSlcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgICB0aGlzLnNwYXJxbFVwZGF0ZVdvcmtlclNlcnZpY2UudXBkYXRlR3JhcGhzKHRoaXMuY29uZmlndXJhdGlvbldvcmtlclNlcnZpY2UuY29uZmlndXJhdGlvbi5wcmltYXJ5RW5kcG9pbnQudXBkYXRlRW5kcG9pbnQudmFsdWUsIFtuZXcgR3JhcGgoU3BhcnFsSXRlbVNlcnZpY2Uuc2NoZW1hR3JhcGgsIHNjaGVtYVRyaXBsZXNUb0FkZCksIG5ldyBHcmFwaChTcGFycWxJdGVtU2VydmljZS5pbnN0YW5jZUdyYXBoLCBpbnN0YW5jZVRyaXBsZXNUb0FkZCldKS50aGVuKFxuICAgICAgICAoKSA9PiBkZWZlcnJlZC5yZXNvbHZlKHN1YmplY3QpLFxuICAgICAgICBkZWZlcnJlZC5yZWplY3QsXG4gICAgICAgIGRlZmVycmVkLm5vdGlmeVxuICAgICAgKVxuICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2VcbiAgICB9XG5cbiAgICBwcml2YXRlIHByb2Nlc3NJdGVtUmVzdWx0KHByb3BlcnRpZXM6IFByb3BlcnR5VG9WYWx1ZXM8SU5vZGVQbHVzTGFiZWw+W10sIHByb3BlcnR5TWFwOiBFTWFwPFByb3BlcnR5VG9WYWx1ZXM8SU5vZGVQbHVzTGFiZWw+PiwgcHJvcGVydHlWYWx1ZU1hcDogRU1hcDxFTWFwPElTb3VyY2VkTm9kZVBsdXNMYWJlbD4+LCBlbmRwb2ludDogRW5kcG9pbnRDb25maWd1cmF0aW9uLCBiOiB7W3ZhcklkOiBzdHJpbmddOiBzLklTcGFycWxCaW5kaW5nfSk6IHZvaWQge1xuICAgICAgaWYgKGJbJ3Byb3BlcnR5J10pIHtcbiAgICAgICAgbGV0IG46IElTb3VyY2VkTm9kZVBsdXNMYWJlbCA9IHByb3BlcnR5VmFsdWVNYXAuZ29jKGJbJ3Byb3BlcnR5J10udmFsdWUpLmdvYyhiWydvYmplY3QnXS52YWx1ZSwgKCkgPT4ge1xuICAgICAgICAgIGxldCBwcm9wZXJ0eVRvVmFsdWVzOiBQcm9wZXJ0eVRvVmFsdWVzPElOb2RlUGx1c0xhYmVsPiA9IHByb3BlcnR5TWFwLmdvYyhiWydwcm9wZXJ0eSddLnZhbHVlLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcmV0OiBQcm9wZXJ0eVRvVmFsdWVzPElOb2RlUGx1c0xhYmVsPiA9IG5ldyBQcm9wZXJ0eVRvVmFsdWVzPElOb2RlUGx1c0xhYmVsPihEYXRhRmFjdG9yeS5pbnN0YW5jZS5ub2RlRnJvbUJpbmRpbmcoYlsncHJvcGVydHknXSkpXG4gICAgICAgICAgICBpZiAoYlsncHJvcGVydHlMYWJlbCddKSByZXQubGFiZWwgPSBEYXRhRmFjdG9yeS5pbnN0YW5jZS5ub2RlRnJvbUJpbmRpbmcoYlsncHJvcGVydHlMYWJlbCddKVxuICAgICAgICAgICAgcHJvcGVydGllcy5wdXNoKHJldClcbiAgICAgICAgICAgIHJldHVybiByZXRcbiAgICAgICAgICB9KVxuICAgICAgICAgIGxldCBvTm9kZTogSVNvdXJjZWROb2RlUGx1c0xhYmVsID0gbmV3IFNvdXJjZWROb2RlUGx1c0xhYmVsKERhdGFGYWN0b3J5Lmluc3RhbmNlLm5vZGVGcm9tQmluZGluZyhiWydvYmplY3QnXSkpXG4gICAgICAgICAgcHJvcGVydHlUb1ZhbHVlcy52YWx1ZXMucHVzaChvTm9kZSlcbiAgICAgICAgICByZXR1cm4gb05vZGVcbiAgICAgICAgfSlcbiAgICAgICAgbi5zb3VyY2VFbmRwb2ludHMucHVzaChlbmRwb2ludClcbiAgICAgICAgaWYgKGJbJ29iamVjdExhYmVsJ10gJiYgIW4ubGFiZWwpIG4ubGFiZWwgPSBEYXRhRmFjdG9yeS5pbnN0YW5jZS5ub2RlRnJvbUJpbmRpbmcoYlsnb2JqZWN0TGFiZWwnXSlcbiAgICAgIH1cbiAgICB9XG5cbiAgfVxuXG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

var fibra;
(function (fibra) {
    'use strict';
    var SparqlTreeService = (function () {
        function SparqlTreeService(workerService) {
            this.workerService = workerService;
        }
        SparqlTreeService.prototype.getTree = function (endpoint, query, canceller) {
            return this.workerService.call('sparqlTreeWorkerService', 'getTree', [endpoint, query], canceller);
        };
        SparqlTreeService.getClassTreeQuery = "\nPREFIX skos: <http://www.w3.org/2004/02/skos/core#>\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\nPREFIX sf: <http://ldf.fi/functions#>\nSELECT ?subClass ?superClass ?class ?classLabel ?instances {\n  {\n    ?subClass rdfs:subClassOf ?class .\n    FILTER EXISTS {\n      ?p a ?subClass .\n    }\n  } UNION {\n    {\n      SELECT ?class (COUNT(DISTINCT ?p) AS ?instances) {\n        ?p a ?class .\n      }\n      GROUP BY ?class\n    }\n  }\n  ?class sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?classLabel) .\n}\n";
        return SparqlTreeService;
    }());/*<auto_generate>*/angular.module('fibra').service('sparqlTreeService',['workerService',function(){return new (Function.prototype.bind.apply(SparqlTreeService,[null].concat(Array.prototype.slice.apply(arguments))));}]);/*</auto_generate>*/
    fibra.SparqlTreeService = SparqlTreeService;
    var SparqlTreeWorkerService = (function () {
        function SparqlTreeWorkerService(sparqlService) {
            this.sparqlService = sparqlService;
        }
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
    }());/*<auto_generate>*/angular.module('fibra').service('sparqlTreeWorkerService',['sparqlService',function(){return new (Function.prototype.bind.apply(SparqlTreeWorkerService,[null].concat(Array.prototype.slice.apply(arguments))));}]);/*</auto_generate>*/
    fibra.SparqlTreeWorkerService = SparqlTreeWorkerService;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvc3BhcnFsLXRyZWUtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFVLEtBQUssQ0FvRWQ7QUFwRUQsV0FBVSxLQUFLLEVBQUMsQ0FBQztJQUNmLFlBQVksQ0FBQTtJQUlaO1FBc0JFLDJCQUFvQixhQUE0QjtZQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFHLENBQUM7UUFDN0MsbUNBQU8sR0FBZCxVQUFlLFFBQWdCLEVBQUUsS0FBYSxFQUFFLFNBQWlDO1lBQy9FLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxTQUFTLEVBQUUsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUE7UUFDcEcsQ0FBQztRQXhCYSxtQ0FBaUIsR0FBVywraUJBb0I3QyxDQUFBO1FBS0Msd0JBQUM7SUFBRCxDQTFCQSxBQTBCQyxJQUFBO0lBMUJZLHVCQUFpQixvQkEwQjdCLENBQUE7SUFFRDtRQUNFLGlDQUFvQixhQUE4QjtZQUE5QixrQkFBYSxHQUFiLGFBQWEsQ0FBaUI7UUFBRyxDQUFDO1FBRS9DLHlDQUFPLEdBQWQsVUFBZSxRQUFnQixFQUFFLEtBQWEsRUFBRSxTQUFpQztZQUMvRSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FDekUsVUFBQyxRQUFtRztnQkFDbEcsSUFBSSxPQUFPLEdBQTRDLEVBQUUsQ0FBQTtnQkFDekQsSUFBSSxPQUFPLEdBQTZCLEVBQUUsQ0FBQTtnQkFDMUMsUUFBUSxDQUFDLElBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLE9BQU87b0JBQzdDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQzt3QkFDeEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLGNBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtvQkFDckcsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO3dCQUN2QixPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQTtvQkFDdEYsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDeEIsSUFBSSxRQUFRLEdBQVcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQTt3QkFDaEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7NEJBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQTt3QkFDOUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUE7b0JBQ2xELENBQUM7b0JBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDMUIsSUFBSSxRQUFRLEdBQVcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQTt3QkFDN0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7NEJBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQTt3QkFDOUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUE7b0JBQ3ZELENBQUM7Z0JBQ0gsQ0FBQyxDQUFDLENBQUE7Z0JBQ0YsSUFBSSxHQUFHLEdBQWUsRUFBRSxDQUFBO2dCQUN4QixHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUN2QixFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUFDLElBQUk7d0JBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDOzRCQUN0RSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtnQkFDN0MsQ0FBQztnQkFDRCxNQUFNLENBQUMsR0FBRyxDQUFBO1lBQ1osQ0FBQyxDQUNGLENBQUE7UUFDSCxDQUFDO1FBQ0gsOEJBQUM7SUFBRCxDQWpDQSxBQWlDQyxJQUFBO0lBakNZLDZCQUF1QiwwQkFpQ25DLENBQUE7QUFFSCxDQUFDLEVBcEVTLEtBQUssS0FBTCxLQUFLLFFBb0VkIiwiZmlsZSI6InNjcmlwdHMvc3BhcnFsLXRyZWUtc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBmaWJyYSB7XG4gICd1c2Ugc3RyaWN0J1xuXG4gIGltcG9ydCBzID0gZmkuc2Vjby5zcGFycWxcblxuICBleHBvcnQgY2xhc3MgU3BhcnFsVHJlZVNlcnZpY2Uge1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0Q2xhc3NUcmVlUXVlcnk6IHN0cmluZyA9IGBcblBSRUZJWCBza29zOiA8aHR0cDovL3d3dy53My5vcmcvMjAwNC8wMi9za29zL2NvcmUjPlxuUFJFRklYIHJkZnM6IDxodHRwOi8vd3d3LnczLm9yZy8yMDAwLzAxL3JkZi1zY2hlbWEjPlxuUFJFRklYIHNmOiA8aHR0cDovL2xkZi5maS9mdW5jdGlvbnMjPlxuU0VMRUNUID9zdWJDbGFzcyA/c3VwZXJDbGFzcyA/Y2xhc3MgP2NsYXNzTGFiZWwgP2luc3RhbmNlcyB7XG4gIHtcbiAgICA/c3ViQ2xhc3MgcmRmczpzdWJDbGFzc09mID9jbGFzcyAuXG4gICAgRklMVEVSIEVYSVNUUyB7XG4gICAgICA/cCBhID9zdWJDbGFzcyAuXG4gICAgfVxuICB9IFVOSU9OIHtcbiAgICB7XG4gICAgICBTRUxFQ1QgP2NsYXNzIChDT1VOVChESVNUSU5DVCA/cCkgQVMgP2luc3RhbmNlcykge1xuICAgICAgICA/cCBhID9jbGFzcyAuXG4gICAgICB9XG4gICAgICBHUk9VUCBCWSA/Y2xhc3NcbiAgICB9XG4gIH1cbiAgP2NsYXNzIHNmOnByZWZlcnJlZExhbmd1YWdlTGl0ZXJhbCAoc2tvczpwcmVmTGFiZWwgcmRmczpsYWJlbCBza29zOmFsdExhYmVsICdlbicgJycgP2NsYXNzTGFiZWwpIC5cbn1cbmBcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHdvcmtlclNlcnZpY2U6IFdvcmtlclNlcnZpY2UpIHt9XG4gICAgcHVibGljIGdldFRyZWUoZW5kcG9pbnQ6IHN0cmluZywgcXVlcnk6IHN0cmluZywgY2FuY2VsbGVyPzogYW5ndWxhci5JUHJvbWlzZTxhbnk+KTogYW5ndWxhci5JUHJvbWlzZTxUcmVlTm9kZVtdPiB7XG4gICAgICByZXR1cm4gdGhpcy53b3JrZXJTZXJ2aWNlLmNhbGwoJ3NwYXJxbFRyZWVXb3JrZXJTZXJ2aWNlJywgJ2dldFRyZWUnLCBbZW5kcG9pbnQsIHF1ZXJ5XSwgY2FuY2VsbGVyKVxuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBTcGFycWxUcmVlV29ya2VyU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzcGFycWxTZXJ2aWNlOiBzLlNwYXJxbFNlcnZpY2UpIHt9XG5cbiAgICBwdWJsaWMgZ2V0VHJlZShlbmRwb2ludDogc3RyaW5nLCBxdWVyeTogc3RyaW5nLCBjYW5jZWxsZXI/OiBhbmd1bGFyLklQcm9taXNlPGFueT4pOiBhbmd1bGFyLklQcm9taXNlPFRyZWVOb2RlW10+IHtcbiAgICAgIHJldHVybiB0aGlzLnNwYXJxbFNlcnZpY2UucXVlcnkoZW5kcG9pbnQsIHF1ZXJ5LCB7dGltZW91dDogY2FuY2VsbGVyfSkudGhlbihcbiAgICAgICAgKHJlc3BvbnNlOiBhbmd1bGFyLklIdHRwUHJvbWlzZUNhbGxiYWNrQXJnPHMuSVNwYXJxbEJpbmRpbmdSZXN1bHQ8e1tpZDogc3RyaW5nXTogcy5JU3BhcnFsQmluZGluZ30+PikgPT4ge1xuICAgICAgICAgIGxldCBwYXJlbnRzOiB7W2lkOiBzdHJpbmddOiB7W2lkOiBzdHJpbmddOiBib29sZWFufX0gPSB7fVxuICAgICAgICAgIGxldCBjbGFzc2VzOiB7W2lkOiBzdHJpbmddOiBUcmVlTm9kZX0gPSB7fVxuICAgICAgICAgIHJlc3BvbnNlLmRhdGEhLnJlc3VsdHMuYmluZGluZ3MuZm9yRWFjaChiaW5kaW5nID0+IHtcbiAgICAgICAgICAgIGlmIChiaW5kaW5nWydjbGFzc0xhYmVsJ10pXG4gICAgICAgICAgICAgIGNsYXNzZXNbYmluZGluZ1snY2xhc3MnXS52YWx1ZV0gPSBuZXcgVHJlZU5vZGUoYmluZGluZ1snY2xhc3MnXS52YWx1ZSwgYmluZGluZ1snY2xhc3NMYWJlbCddLnZhbHVlKVxuICAgICAgICAgICAgaWYgKGJpbmRpbmdbJ2luc3RhbmNlcyddKVxuICAgICAgICAgICAgICBjbGFzc2VzW2JpbmRpbmdbJ2NsYXNzJ10udmFsdWVdLmluc3RhbmNlcyA9IHBhcnNlSW50KGJpbmRpbmdbJ2luc3RhbmNlcyddLnZhbHVlLCAxMClcbiAgICAgICAgICAgIGlmIChiaW5kaW5nWydzdWJDbGFzcyddKSB7XG4gICAgICAgICAgICAgIGxldCBzdWJDbGFzczogc3RyaW5nID0gYmluZGluZ1snc3ViQ2xhc3MnXS52YWx1ZVxuICAgICAgICAgICAgICBpZiAoIXBhcmVudHNbc3ViQ2xhc3NdKSBwYXJlbnRzW3N1YkNsYXNzXSA9IHt9XG4gICAgICAgICAgICAgIHBhcmVudHNbc3ViQ2xhc3NdW2JpbmRpbmdbJ2NsYXNzJ10udmFsdWVdID0gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGJpbmRpbmdbJ3N1cGVyQ2xhc3MnXSkge1xuICAgICAgICAgICAgICBsZXQgc3ViQ2xhc3M6IHN0cmluZyA9IGJpbmRpbmdbJ2NsYXNzJ10udmFsdWVcbiAgICAgICAgICAgICAgaWYgKCFwYXJlbnRzW3N1YkNsYXNzXSkgcGFyZW50c1tzdWJDbGFzc10gPSB7fVxuICAgICAgICAgICAgICBwYXJlbnRzW3N1YkNsYXNzXVtiaW5kaW5nWydzdXBlckNsYXNzJ10udmFsdWVdID0gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgbGV0IHJldDogVHJlZU5vZGVbXSA9IFtdXG4gICAgICAgICAgZm9yIChsZXQgaWQgaW4gY2xhc3Nlcykge1xuICAgICAgICAgICAgaWYgKCFwYXJlbnRzW2lkXSkgcmV0LnB1c2goY2xhc3Nlc1tpZF0pOyBlbHNlIGZvciAobGV0IHBpZCBpbiBwYXJlbnRzW2lkXSlcbiAgICAgICAgICAgICAgICBjbGFzc2VzW3BpZF0uY2hpbGRyZW4ucHVzaChjbGFzc2VzW2lkXSlcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJldFxuICAgICAgICB9XG4gICAgICApXG4gICAgfVxuICB9XG5cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

var fibra;
(function (fibra) {
    'use strict';
    var SparqlUpdateService = (function () {
        function SparqlUpdateService(workerService) {
            this.workerService = workerService;
        }
        SparqlUpdateService.prototype.updateQuads = function (endpoint, quadsToAdd, quadsToRemove) {
            return this.workerService.call('sparqlUpdateWorkerService', 'update', [endpoint, quadsToAdd, quadsToRemove]);
        };
        SparqlUpdateService.prototype.updateGraphs = function (endpoint, graphsToAdd, graphsToRemove) {
            return this.workerService.call('sparqlUpdateWorkerService', 'update', [endpoint, graphsToAdd, graphsToRemove]);
        };
        return SparqlUpdateService;
    }());/*<auto_generate>*/angular.module('fibra').service('sparqlUpdateService',['workerService',function(){return new (Function.prototype.bind.apply(SparqlUpdateService,[null].concat(Array.prototype.slice.apply(arguments))));}]);/*</auto_generate>*/
    fibra.SparqlUpdateService = SparqlUpdateService;
    var SparqlUpdateWorkerService = (function () {
        function SparqlUpdateWorkerService(sparqlService) {
            this.sparqlService = sparqlService;
        }
        SparqlUpdateWorkerService.prototype.updateQuads = function (endpoint, quadsToAdd, quadsToRemove) {
            if (quadsToAdd === void 0) { quadsToAdd = []; }
            if (quadsToRemove === void 0) { quadsToRemove = []; }
            var graphsToAddMap = {};
            var graphsToRemoveMap = {};
            var graphsToAdd = [];
            var graphsToRemove = [];
            quadsToAdd.forEach(function (q) {
                var graph = graphsToAddMap[q.graph.value];
                if (!graph) {
                    graph = new fibra.Graph(q.graph);
                    graphsToAddMap[q.graph.value] = graph;
                    graphsToAdd.push(graph);
                }
                graph.triples.push(q);
            });
            quadsToRemove.forEach(function (q) {
                var graph = graphsToRemoveMap[q.graph.value];
                if (!graph) {
                    graph = new fibra.Graph(q.graph);
                    graphsToRemoveMap[q.graph.value] = graph;
                    graphsToRemove.push(graph);
                }
                graph.triples.push(q);
            });
            return this.updateGraphs(endpoint, graphsToAdd, graphsToRemove);
        };
        SparqlUpdateWorkerService.prototype.updateGraphs = function (endpoint, graphsToAdd, graphsToRemove) {
            if (graphsToAdd === void 0) { graphsToAdd = []; }
            if (graphsToRemove === void 0) { graphsToRemove = []; }
            var addString = graphsToAdd.map(function (graph) { return (fibra.DefaultGraph.instance.equals(graph.graph) ? '' : 'GRAPH' + graph.graph.toCanonical()) + '{' + graph.triples.map(function (g) { return g.toCanonical(); }).join(' . ') + '}'; }).join('');
            var removeString = graphsToRemove.map(function (graph) { return (fibra.DefaultGraph.instance.equals(graph.graph) ? '' : 'GRAPH' + graph.graph.toCanonical()) + '{' + graph.triples.map(function (g) { return g.toCanonical(); }).join(' . ') + '}'; }).join('');
            return this.sparqlService.update(endpoint, SparqlUpdateWorkerService.queryTemplate.replace(/<DELETE>/g, removeString).replace(/<INSERT>/g, addString)).then(function (r) { return r.status === 204; }, function (r) { return false; });
        };
        SparqlUpdateWorkerService.queryTemplate = "DELETE{<DELETE>}INSERT{<INSERT>}WHERE {}";
        return SparqlUpdateWorkerService;
    }());/*<auto_generate>*/angular.module('fibra').service('sparqlUpdateWorkerService',['sparqlService',function(){return new (Function.prototype.bind.apply(SparqlUpdateWorkerService,[null].concat(Array.prototype.slice.apply(arguments))));}]);/*</auto_generate>*/
    fibra.SparqlUpdateWorkerService = SparqlUpdateWorkerService;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvc3BhcnFsLXVwZGF0ZS1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQVUsS0FBSyxDQTREZDtBQTVERCxXQUFVLEtBQUssRUFBQyxDQUFDO0lBQ2YsWUFBWSxDQUFBO0lBSVo7UUFFRSw2QkFBb0IsYUFBNEI7WUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBRyxDQUFDO1FBRTdDLHlDQUFXLEdBQWxCLFVBQW1CLFFBQWdCLEVBQUUsVUFBa0IsRUFBRSxhQUFxQjtZQUM1RSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFBO1FBQzlHLENBQUM7UUFFTSwwQ0FBWSxHQUFuQixVQUFvQixRQUFnQixFQUFFLFdBQW9CLEVBQUUsY0FBdUI7WUFDakYsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLDJCQUEyQixFQUFFLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQTtRQUNoSCxDQUFDO1FBRUgsMEJBQUM7SUFBRCxDQVpBLEFBWUMsSUFBQTtJQVpZLHlCQUFtQixzQkFZL0IsQ0FBQTtJQUVEO1FBR0UsbUNBQW9CLGFBQThCO1lBQTlCLGtCQUFhLEdBQWIsYUFBYSxDQUFpQjtRQUFHLENBQUM7UUFFL0MsK0NBQVcsR0FBbEIsVUFBbUIsUUFBZ0IsRUFBRSxVQUF1QixFQUFFLGFBQTBCO1lBQW5ELDBCQUF1QixHQUF2QixlQUF1QjtZQUFFLDZCQUEwQixHQUExQixrQkFBMEI7WUFDdEYsSUFBSSxjQUFjLEdBQStCLEVBQUUsQ0FBQTtZQUNuRCxJQUFJLGlCQUFpQixHQUErQixFQUFFLENBQUE7WUFDdEQsSUFBSSxXQUFXLEdBQVksRUFBRSxDQUFBO1lBQzdCLElBQUksY0FBYyxHQUFZLEVBQUUsQ0FB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QyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ3pKLFVBQUMsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQWhCLENBQWdCLEVBQ3ZCLFVBQUMsQ0FBQyxJQUFLLE9BQUEsS0FBSyxFQUFMLENBQUssQ0FDYixDQUFBO1FBQ0gsQ0FBQztRQXJDYyx1Q0FBYSxHQUFXLDBDQUEwQyxDQUFBO1FBdUNuRixnQ0FBQztJQUFELENBeENBLEFBd0NDLElBQUE7SUF4Q1ksK0JBQXlCLDRCQXdDckMsQ0FBQTtBQUNILENBQUMsRUE1RFMsS0FBSyxLQUFMLEtBQUssUUE0RGQiLCJmaWxlIjoic2NyaXB0cy9zcGFycWwtdXBkYXRlLXNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgZmlicmEge1xuICAndXNlIHN0cmljdCdcblxuICBpbXBvcnQgcyA9IGZpLnNlY28uc3BhcnFsXG5cbiAgZXhwb3J0IGNsYXNzIFNwYXJxbFVwZGF0ZVNlcnZpY2Uge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB3b3JrZXJTZXJ2aWNlOiBXb3JrZXJTZXJ2aWNlKSB7fVxuXG4gICAgcHVibGljIHVwZGF0ZVF1YWRzKGVuZHBvaW50OiBzdHJpbmcsIHF1YWRzVG9BZGQ6IFF1YWRbXSwgcXVhZHNUb1JlbW92ZTogUXVhZFtdKTogYW5ndWxhci5JUHJvbWlzZTxhbnk+IHtcbiAgICAgIHJldHVybiB0aGlzLndvcmtlclNlcnZpY2UuY2FsbCgnc3BhcnFsVXBkYXRlV29ya2VyU2VydmljZScsICd1cGRhdGUnLCBbZW5kcG9pbnQsIHF1YWRzVG9BZGQsIHF1YWRzVG9SZW1vdmVdKVxuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVHcmFwaHMoZW5kcG9pbnQ6IHN0cmluZywgZ3JhcGhzVG9BZGQ6IEdyYXBoW10sIGdyYXBoc1RvUmVtb3ZlOiBHcmFwaFtdKTogYW5ndWxhci5JUHJvbWlzZTxhbnk+IHtcbiAgICAgIHJldHVybiB0aGlzLndvcmtlclNlcnZpY2UuY2FsbCgnc3BhcnFsVXBkYXRlV29ya2VyU2VydmljZScsICd1cGRhdGUnLCBbZW5kcG9pbnQsIGdyYXBoc1RvQWRkLCBncmFwaHNUb1JlbW92ZV0pXG4gICAgfVxuXG4gIH1cblxuICBleHBvcnQgY2xhc3MgU3BhcnFsVXBkYXRlV29ya2VyU2VydmljZSB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgcXVlcnlUZW1wbGF0ZTogc3RyaW5nID0gYERFTEVURXs8REVMRVRFPn1JTlNFUlR7PElOU0VSVD59V0hFUkUge31gXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNwYXJxbFNlcnZpY2U6IHMuU3BhcnFsU2VydmljZSkge31cblxuICAgIHB1YmxpYyB1cGRhdGVRdWFkcyhlbmRwb2ludDogc3RyaW5nLCBxdWFkc1RvQWRkOiBRdWFkW10gPSBbXSwgcXVhZHNUb1JlbW92ZTogUXVhZFtdID0gW10pOiBhbmd1bGFyLklQcm9taXNlPGFueT4ge1xuICAgICAgbGV0IGdyYXBoc1RvQWRkTWFwOiB7W2dyYXBoSWQ6IHN0cmluZ106IEdyYXBofSA9IHt9XG4gICAgICBsZXQgZ3JhcGhzVG9SZW1vdmVNYXA6IHtbZ3JhcGhJZDogc3RyaW5nXTogR3JhcGh9ID0ge31cbiAgICAgIGxldCBncmFwaHNUb0FkZDogR3JhcGhbXSA9IFtdXG4gICAgICBsZXQgZ3JhcGhzVG9SZW1vdmU6IEdyYXBoW10gPSBbXVxuICAgICAgcXVhZHNUb0FkZC5mb3JFYWNoKHEgPT4ge1xuICAgICAgICBsZXQgZ3JhcGg6IEdyYXBoID0gZ3JhcGhzVG9BZGRNYXBbcS5ncmFwaC52YWx1ZV1cbiAgICAgICAgaWYgKCFncmFwaCkge1xuICAgICAgICAgIGdyYXBoID0gbmV3IEdyYXBoKHEuZ3JhcGgpXG4gICAgICAgICAgZ3JhcGhzVG9BZGRNYXBbcS5ncmFwaC52YWx1ZV0gPSBncmFwaFxuICAgICAgICAgIGdyYXBoc1RvQWRkLnB1c2goZ3JhcGgpXG4gICAgICAgIH1cbiAgICAgICAgZ3JhcGgudHJpcGxlcy5wdXNoKHEpXG4gICAgICB9KVxuICAgICAgcXVhZHNUb1JlbW92ZS5mb3JFYWNoKHEgPT4ge1xuICAgICAgICBsZXQgZ3JhcGg6IEdyYXBoID0gZ3JhcGhzVG9SZW1vdmVNYXBbcS5ncmFwaC52YWx1ZV1cbiAgICAgICAgaWYgKCFncmFwaCkge1xuICAgICAgICAgIGdyYXBoID0gbmV3IEdyYXBoKHEuZ3JhcGgpXG4gICAgICAgICAgZ3JhcGhzVG9SZW1vdmVNYXBbcS5ncmFwaC52YWx1ZV0gPSBncmFwaFxuICAgICAgICAgIGdyYXBoc1RvUmVtb3ZlLnB1c2goZ3JhcGgpXG4gICAgICAgIH1cbiAgICAgICAgZ3JhcGgudHJpcGxlcy5wdXNoKHEpXG4gICAgICB9KVxuICAgICAgcmV0dXJuIHRoaXMudXBkYXRlR3JhcGhzKGVuZHBvaW50LCBncmFwaHNUb0FkZCwgZ3JhcGhzVG9SZW1vdmUpXG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZUdyYXBocyhlbmRwb2ludDogc3RyaW5nLCBncmFwaHNUb0FkZDogR3JhcGhbXSA9IFtdLCBncmFwaHNUb1JlbW92ZTogR3JhcGhbXSA9IFtdKTogYW5ndWxhci5JUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICBsZXQgYWRkU3RyaW5nOiBzdHJpbmcgPSBncmFwaHNUb0FkZC5tYXAoZ3JhcGggPT4gKERlZmF1bHRHcmFwaC5pbnN0YW5jZS5lcXVhbHMoZ3JhcGguZ3JhcGgpID8gJycgOiAnR1JBUEgnICsgZ3JhcGguZ3JhcGgudG9DYW5vbmljYWwoKSkgKyAneycgKyBncmFwaC50cmlwbGVzLm1hcChnID0+IGcudG9DYW5vbmljYWwoKSkuam9pbignIC4gJykgKyAnfScpLmpvaW4oJycpXG4gICAgICBsZXQgcmVtb3ZlU3RyaW5nOiBzdHJpbmcgPSBncmFwaHNUb1JlbW92ZS5tYXAoZ3JhcGggPT4gKERlZmF1bHRHcmFwaC5pbnN0YW5jZS5lcXVhbHMoZ3JhcGguZ3JhcGgpID8gJycgOiAnR1JBUEgnICsgZ3JhcGguZ3JhcGgudG9DYW5vbmljYWwoKSkgKyAneycgKyBncmFwaC50cmlwbGVzLm1hcChnID0+IGcudG9DYW5vbmljYWwoKSkuam9pbignIC4gJykgKyAnfScpLmpvaW4oJycpXG4gICAgICByZXR1cm4gdGhpcy5zcGFycWxTZXJ2aWNlLnVwZGF0ZShlbmRwb2ludCwgU3BhcnFsVXBkYXRlV29ya2VyU2VydmljZS5xdWVyeVRlbXBsYXRlLnJlcGxhY2UoLzxERUxFVEU+L2csIHJlbW92ZVN0cmluZykucmVwbGFjZSgvPElOU0VSVD4vZywgYWRkU3RyaW5nKSkudGhlbihcbiAgICAgICAgKHIpID0+IHIuc3RhdHVzID09PSAyMDQsXG4gICAgICAgIChyKSA9PiBmYWxzZVxuICAgICAgKVxuICAgIH1cblxuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

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
        }
        return TreeComponent;
    }());/*<auto_generate>*/angular.module('fibra').component('tree',new TreeComponent());/*</auto_generate>*/
    fibra.TreeComponent = TreeComponent;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvdHJlZS1jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBVSxLQUFLLENBdUJkO0FBdkJELFdBQVUsS0FBSyxFQUFDLENBQUM7SUFDZixZQUFZLENBQUE7SUFFWjtRQVVFLGtCQUFtQixFQUFVLEVBQVMsS0FBYTtZQUFoQyxPQUFFLEdBQUYsRUFBRSxDQUFRO1lBQVMsVUFBSyxHQUFMLEtBQUssQ0FBUTtZQVQ1QyxhQUFRLEdBQWUsRUFBRSxDQUFBO1lBR3pCLGFBQVEsR0FBWSxJQUFJLENBQUE7WUFDeEIsU0FBSSxHQUFZLElBQUksQ0FBQTtRQUsyQixDQUFDO1FBSnpDLDJCQUFrQixHQUFvRCxVQUFDLElBQWMsRUFBRSxDQUFxQjtZQUN4SCxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDUCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQWpDLENBQWlDLENBQUMsQ0FBQTtRQUMvRCxDQUFDLENBQUE7UUFFSCxlQUFDO0lBQUQsQ0FYQSxBQVdDLElBQUE7SUFYWSxjQUFRLFdBV3BCLENBQUE7SUFFRDtRQUFBO1lBQ1csYUFBUSxHQUEyQjtnQkFDeEMsSUFBSSxFQUFFLEdBQUc7Z0JBQ1QsUUFBUSxFQUFFLEdBQUc7YUFDZCxDQUFBO1lBQ00sZ0JBQVcsR0FBVyxvQkFBb0IsQ0FBQTtRQUNyRCxDQUFDO1FBQUQsb0JBQUM7SUFBRCxDQU5BLEFBTUMsSUFBQTtJQU5ZLG1CQUFhLGdCQU16QixDQUFBO0FBQ0gsQ0FBQyxFQXZCUyxLQUFLLEtBQUwsS0FBSyxRQXVCZCIsImZpbGUiOiJzY3JpcHRzL3RyZWUtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIGZpYnJhIHtcbiAgJ3VzZSBzdHJpY3QnXG5cbiAgZXhwb3J0IGNsYXNzIFRyZWVOb2RlIHtcbiAgICBwdWJsaWMgY2hpbGRyZW46IFRyZWVOb2RlW10gPSBbXVxuICAgIHB1YmxpYyBpbnN0YW5jZXM6IG51bWJlclxuICAgIHB1YmxpYyBtYXRjaGluZ0luc3RhbmNlczogbnVtYmVyXG4gICAgcHVibGljIHNlbGVjdGVkOiBib29sZWFuID0gdHJ1ZVxuICAgIHB1YmxpYyBvcGVuOiBib29sZWFuID0gdHJ1ZVxuICAgIHB1YmxpYyBzdGF0aWMgcmVjdXJzaXZlbHlQcm9jZXNzOiAobm9kZTogVHJlZU5vZGUsIGY6IChUcmVlTm9kZSkgPT4gdm9pZCkgPT4gdm9pZCA9IChub2RlOiBUcmVlTm9kZSwgZjogKFRyZWVOb2RlKSA9PiB2b2lkKSA9PiB7XG4gICAgICBmKG5vZGUpXG4gICAgICBub2RlLmNoaWxkcmVuLmZvckVhY2gobiA9PiBUcmVlTm9kZS5yZWN1cnNpdmVseVByb2Nlc3MobiwgZikpXG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBpZDogc3RyaW5nLCBwdWJsaWMgbGFiZWw6IHN0cmluZykge31cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBUcmVlQ29tcG9uZW50IGltcGxlbWVudHMgYW5ndWxhci5JQ29tcG9uZW50T3B0aW9ucyB7XG4gICAgICBwdWJsaWMgYmluZGluZ3M6IHtbaWQ6IHN0cmluZ106IHN0cmluZ30gPSB7XG4gICAgICAgIHRyZWU6ICc8JyxcbiAgICAgICAgb25TZWxlY3Q6ICcmJyxcbiAgICAgIH1cbiAgICAgIHB1YmxpYyB0ZW1wbGF0ZVVybDogc3RyaW5nID0gJ3BhcnRpYWxzL3RyZWUuaHRtbCdcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

var fibra;
(function (fibra) {
    'use strict';
    var TypeSelectComponent = (function () {
        function TypeSelectComponent() {
            this.bindings = {
                tree: '<',
                onSelect: '&',
            };
            this.templateUrl = 'partials/type-select.html';
        }
        return TypeSelectComponent;
    }());/*<auto_generate>*/angular.module('fibra').component('typeSelect',new TypeSelectComponent());/*</auto_generate>*/
    fibra.TypeSelectComponent = TypeSelectComponent;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvdHlwZS1zZWxlY3QtY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQVUsS0FBSyxDQVVkO0FBVkQsV0FBVSxLQUFLLEVBQUMsQ0FBQztJQUNmLFlBQVksQ0FBQTtJQUVaO1FBQUE7WUFDVyxhQUFRLEdBQTJCO2dCQUN4QyxJQUFJLEVBQUUsR0FBRztnQkFDVCxRQUFRLEVBQUUsR0FBRzthQUNkLENBQUE7WUFDTSxnQkFBVyxHQUFXLDJCQUEyQixDQUFBO1FBQzVELENBQUM7UUFBRCwwQkFBQztJQUFELENBTkEsQUFNQyxJQUFBO0lBTlkseUJBQW1CLHNCQU0vQixDQUFBO0FBQ0gsQ0FBQyxFQVZTLEtBQUssS0FBTCxLQUFLLFFBVWQiLCJmaWxlIjoic2NyaXB0cy90eXBlLXNlbGVjdC1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgZmlicmEge1xuICAndXNlIHN0cmljdCdcblxuICBleHBvcnQgY2xhc3MgVHlwZVNlbGVjdENvbXBvbmVudCBpbXBsZW1lbnRzIGFuZ3VsYXIuSUNvbXBvbmVudE9wdGlvbnMge1xuICAgICAgcHVibGljIGJpbmRpbmdzOiB7W2lkOiBzdHJpbmddOiBzdHJpbmd9ID0ge1xuICAgICAgICB0cmVlOiAnPCcsXG4gICAgICAgIG9uU2VsZWN0OiAnJicsXG4gICAgICB9XG4gICAgICBwdWJsaWMgdGVtcGxhdGVVcmw6IHN0cmluZyA9ICdwYXJ0aWFscy90eXBlLXNlbGVjdC5odG1sJ1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

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
        function WorkerService(workerServiceConfiguration, workerServicePrototypeMappingConfiguration, $rootScope, $window, $q) {
            var _this = this;
            this.workerServicePrototypeMappingConfiguration = workerServicePrototypeMappingConfiguration;
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
                        $rootScope.$broadcast(e.data.name, _this.restorePrototypes(e.data.args));
                        $rootScope.$apply();
                    }
                    else {
                        var deferred = _this.deferreds[e.data.id];
                        if (deferred) {
                            delete _this.deferreds[e.data.id];
                            if (eventId === 'success')
                                deferred.resolve(_this.restorePrototypes(e.data.data));
                            else if (eventId === 'failure')
                                deferred.reject(_this.restorePrototypes(e.data.data));
                            else
                                deferred.notify(_this.restorePrototypes(e.data.data));
                        }
                    }
                });
            }
        }
        WorkerService.stripMarks = function (args) {
            if (!args || !args.__mark || typeof args !== 'object')
                return;
            delete args.__mark;
            if (args instanceof Array)
                args.forEach(function (arg) { return WorkerService.stripMarks(arg); });
            else {
                for (var key in args)
                    if (args.hasOwnProperty(key))
                        WorkerService.stripMarks(args[key]);
            }
        };
        WorkerService.savePrototypes = function (args) {
            this.savePrototypesInternal(args);
            return args;
        };
        WorkerService.savePrototypesInternal = function (args) {
            if (!args || args.__className || typeof args !== 'object')
                return;
            if (args instanceof Array)
                args.forEach(function (arg) { return WorkerService.savePrototypes(arg); });
            else {
                if (args.constructor.name !== 'Object') {
                    var currentPrototype = Object.getPrototypeOf(args);
                    out: while (currentPrototype !== Object.prototype) {
                        for (var _i = 0, _a = Object.getOwnPropertyNames(currentPrototype); _i < _a.length; _i++) {
                            var prop = _a[_i];
                            if (prop !== 'constructor' && typeof (args.__proto__[prop]) === 'function') {
                                args.__className = args.constructor.name;
                                break out;
                            }
                        }
                        currentPrototype = Object.getPrototypeOf(currentPrototype);
                    }
                    if (!args.__className)
                        args.__className = 'Object';
                }
                for (var key in args)
                    if (args.hasOwnProperty(key))
                        WorkerService.savePrototypes(args[key]);
            }
        };
        WorkerService.prototype.$broadcast = function (name, args) {
            this.workers.forEach(function (w) { return w.postMessage({ name: name, args: WorkerService.savePrototypes(args) }); });
        };
        WorkerService.prototype.callAll = function (service, method, args, canceller) {
            var _this = this;
            if (args === void 0) { args = []; }
            var deferred = this.$q.defer();
            this.deferreds.push(deferred);
            var id = this.deferreds.length - 1;
            var message = {
                id: id,
                service: service,
                method: method,
                args: WorkerService.savePrototypes(args)
            };
            if (canceller)
                canceller.then(function () {
                    _this.workers.forEach(function (worker) { return worker.postMessage({
                        id: id,
                        cancel: true
                    }); });
                    delete _this.deferreds[id];
                });
            this.workers.forEach(function (worker) { return worker.postMessage(message); });
            return deferred.promise;
        };
        WorkerService.prototype.call = function (service, method, args, canceller) {
            var _this = this;
            if (args === void 0) { args = []; }
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
                args: WorkerService.savePrototypes(args)
            });
            return deferred.promise;
        };
        WorkerService.prototype.restorePrototypes = function (args) {
            this.restorePrototypesInternal(args);
            WorkerService.stripMarks(args);
            return args;
        };
        WorkerService.prototype.restorePrototypesInternal = function (args) {
            var _this = this;
            if (!args || args.__mark || typeof args !== 'object')
                return;
            args.__mark = true;
            if (args instanceof Array)
                args.forEach(function (arg) { return _this.restorePrototypesInternal(arg); });
            else {
                if (args.__className) {
                    var prototype = this.workerServicePrototypeMappingConfiguration[args.__className];
                    if (!prototype)
                        throw 'Unknown prototype ' + args.__className;
                    args.__proto__ = prototype;
                    delete args.__className;
                }
                for (var key in args)
                    if (args.hasOwnProperty(key))
                        this.restorePrototypesInternal(args[key]);
            }
        };
        WorkerService.workerTemplate = "\n      var window = self\n      self.history = {}\n      self.Node = function () {}\n      var document = {\n        readyState: 'complete',\n        cookie: '',\n        querySelector: function () {},\n        createElement: function() {\n          return {\n            pathname: '',\n            setAttribute: function() {}\n          };\n        },\n      };\n      importScripts('<IMPORT_SCRIPTS>')\n      window.angular.module('<APP_NAME>').run(['workerWorkerService', function(workerWorkerService) {\n        self.addEventListener('message', function(e) { workerWorkerService.onMessage(e.data) })\n      }])\n      window.angular.bootstrap(null, ['<APP_NAME>'])\n    ";
        return WorkerService;
    }());/*<auto_generate>*/angular.module('fibra').service('workerService',['workerServiceConfiguration','workerServicePrototypeMappingConfiguration','$rootScope','$window','$q',function(){return new (Function.prototype.bind.apply(WorkerService,[null].concat(Array.prototype.slice.apply(arguments))));}]);/*</auto_generate>*/
    fibra.WorkerService = WorkerService;
    var WorkerWorkerService = (function () {
        function WorkerWorkerService(workerServicePrototypeMappingConfiguration, $injector, $q, $rootScope) {
            this.workerServicePrototypeMappingConfiguration = workerServicePrototypeMappingConfiguration;
            this.$injector = $injector;
            this.$q = $q;
            this.$rootScope = $rootScope;
            this.cancellers = [];
        }
        WorkerWorkerService.stripFunctions = function (obj) {
            var ret = {};
            for (var key in obj)
                if (typeof obj[key] === 'object')
                    ret[key] = WorkerWorkerService.stripFunctions(obj[key]);
                else if (typeof obj[key] !== 'function')
                    ret[key] = obj[key];
            return ret;
        };
        WorkerWorkerService.prototype.$broadcast = function (name, args) {
            try {
                self.postMessage({ event: 'broadcast', name: name, args: WorkerService.savePrototypes(args) });
            }
            catch (e) {
                console.log(args, e);
                throw e;
            }
        };
        WorkerWorkerService.prototype.onMessage = function (message) {
            var _this = this;
            if (message.id === undefined) {
                this.$rootScope.$broadcast(message.name, this.restorePrototypes(message.args));
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
                var promise = service[message.method].apply(service, this.restorePrototypes(message.args).concat(canceller.promise));
                if (!promise || !promise.then) {
                    var deferred = this.$q.defer();
                    deferred.resolve(promise);
                    promise = deferred.promise;
                }
                promise.then(function (success) {
                    delete _this.cancellers[message.id];
                    self.postMessage({ event: 'success', id: message.id, data: WorkerService.savePrototypes(success) });
                }, function (error) {
                    delete _this.cancellers[message.id];
                    self.postMessage({ event: 'failure', id: message.id, data: WorkerService.savePrototypes(WorkerWorkerService.stripFunctions(error)) });
                }, function (update) {
                    delete _this.cancellers[message.id];
                    self.postMessage({ event: 'update', id: message.id, data: WorkerService.savePrototypes(update) });
                });
            }
        };
        WorkerWorkerService.prototype.restorePrototypes = function (args) {
            this.restorePrototypesInternal(args);
            WorkerService.stripMarks(args);
            return args;
        };
        WorkerWorkerService.prototype.restorePrototypesInternal = function (args) {
            var _this = this;
            if (!args || args.__mark || typeof args !== 'object')
                return;
            args.__mark = true;
            if (args instanceof Array)
                args.forEach(function (arg) { return _this.restorePrototypesInternal(arg); });
            else {
                if (args.__className) {
                    var prototype = this.workerServicePrototypeMappingConfiguration[args.__className];
                    if (!prototype)
                        throw 'Unknown prototype ' + args.__className;
                    args.__proto__ = prototype;
                    delete args.__className;
                }
                for (var key in args)
                    if (args.hasOwnProperty(key))
                        this.restorePrototypesInternal(args[key]);
            }
        };
        return WorkerWorkerService;
    }());/*<auto_generate>*/angular.module('fibra').service('workerWorkerService',['workerServicePrototypeMappingConfiguration','$injector','$q','$rootScope',function(){return new (Function.prototype.bind.apply(WorkerWorkerService,[null].concat(Array.prototype.slice.apply(arguments))));}]);/*</auto_generate>*/
    fibra.WorkerWorkerService = WorkerWorkerService;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvd29ya2VyLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBVSxLQUFLLENBb1FkO0FBcFFELFdBQVUsS0FBSyxFQUFDLENBQUM7SUFDZixZQUFZLENBQUE7SUFFWjtRQUNFLG9DQUFtQixPQUFlLEVBQVMsYUFBcUIsRUFBUyxhQUF1QjtZQUE3RSxZQUFPLEdBQVAsT0FBTyxDQUFRO1lBQVMsa0JBQWEsR0FBYixhQUFhLENBQVE7WUFBUyxrQkFBYSxHQUFiLGFBQWEsQ0FBVTtRQUFHLENBQUM7UUFDdEcsaUNBQUM7SUFBRCxDQUZBLEFBRUMsSUFBQTtJQUZZLGdDQUEwQiw2QkFFdEMsQ0FBQTtJQUVEO1FBZ0VFLHVCQUFZLDBCQUFzRCxFQUFVLDBDQUF5RSxFQUFFLFVBQXFDLEVBQUUsT0FBK0IsRUFBVSxFQUFxQjtZQWhFOVAsaUJBa0tDO1lBbEc2RSwrQ0FBMEMsR0FBMUMsMENBQTBDLENBQStCO1lBQWtGLE9BQUUsR0FBRixFQUFFLENBQW1CO1lBdkNwUCxrQkFBYSxHQUFXLENBQUMsQ0FBQTtZQUN6QixjQUFTLEdBQTZCLEVBQUUsQ0FBQTtZQXVDOUMsSUFBSSxJQUFJLEdBQVcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsSUFBSSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFBO1lBQzNFLElBQUksYUFBYSxHQUFhLDBCQUEwQixDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDO2dCQUMxRSxPQUFBLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO1lBQWhHLENBQWdHLENBQ2pHLENBQUE7WUFDRCxJQUFJLE9BQU8sR0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxlQUFlLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsMEJBQTBCLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLHdCQUF3QixFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3ZQLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFBO1lBQ2pCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFXLENBQUMsRUFBRSxDQUFDLEdBQUcsMEJBQTBCLENBQUMsYUFBYSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQzFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUE7Z0JBQ3RDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFVBQUMsQ0FBZTtvQkFDMUQsSUFBSSxPQUFPLEdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7b0JBQ25DLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO3dCQUM1QixVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7d0JBQ3ZFLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtvQkFDckIsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDTixJQUFJLFFBQVEsR0FBMkIsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO3dCQUNoRSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOzRCQUNiLE9BQU8sS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBOzRCQUNoQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssU0FBUyxDQUFDO2dDQUN4QixRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7NEJBQ3ZELElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssU0FBUyxDQUFDO2dDQUM3QixRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7NEJBQ3RELElBQUk7Z0NBQ0YsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO3dCQUN4RCxDQUFDO29CQUNILENBQUM7Z0JBQ0gsQ0FBQyxDQUFDLENBQUE7WUFDSixDQUFDO1FBQ0gsQ0FBQztRQWhFYSx3QkFBVSxHQUF4QixVQUF5QixJQUFTO1lBQ2hDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLENBQUM7Z0JBQUMsTUFBTSxDQUFBO1lBQzdELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQTtZQUNsQixFQUFFLENBQUMsQ0FBQyxJQUFJLFlBQVksS0FBSyxDQUFDO2dCQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxhQUFhLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUE3QixDQUE2QixDQUFDLENBQUE7WUFDN0UsSUFBSSxDQUFDLENBQUM7Z0JBQ0osR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDO29CQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ2pELGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7WUFDdkMsQ0FBQztRQUNILENBQUM7UUFFYSw0QkFBYyxHQUE1QixVQUE2QixJQUFTO1lBQ3BDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFBO1FBQ2IsQ0FBQztRQUNjLG9DQUFzQixHQUFyQyxVQUFzQyxJQUFTO1lBQzdDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxDQUFDO2dCQUFDLE1BQU0sQ0FBQTtZQUNqRSxFQUFFLENBQUMsQ0FBQyxJQUFJLFlBQVksS0FBSyxDQUFDO2dCQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxhQUFhLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFqQyxDQUFpQyxDQUFDLENBQUE7WUFDakYsSUFBSSxDQUFDLENBQUM7Z0JBQ0osRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDdkMsSUFBSSxnQkFBZ0IsR0FBTyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFBO29CQUN0RCxHQUFHLEVBQUUsT0FBTyxnQkFBZ0IsS0FBSyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7d0JBQ2xELEdBQUcsQ0FBQyxDQUFhLFVBQTRDLEVBQTVDLEtBQUEsTUFBTSxDQUFDLG1CQUFtQixDQUFDLGdCQUFnQixDQUFDLEVBQTVDLGNBQTRDLEVBQTVDLElBQTRDLENBQUM7NEJBQXpELElBQUksSUFBSSxTQUFBOzRCQUNYLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxhQUFhLElBQUksT0FBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dDQUMxRSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFBO2dDQUN4QyxLQUFLLENBQUMsR0FBRyxDQUFBOzRCQUNYLENBQUM7eUJBQ0Y7d0JBQ0QsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO29CQUM1RCxDQUFDO29CQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQzt3QkFBQyxJQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQTtnQkFDcEQsQ0FBQztnQkFDRCxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUM7b0JBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDakQsYUFBYSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtZQUMzQyxDQUFDO1FBQ0gsQ0FBQztRQWdDTSxrQ0FBVSxHQUFqQixVQUFrQixJQUFZLEVBQUUsSUFBVztZQUN6QyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxXQUFXLENBQUMsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFDLENBQUMsRUFBckUsQ0FBcUUsQ0FBQyxDQUFBO1FBQ2xHLENBQUM7UUFFTSwrQkFBTyxHQUFkLFVBQWtCLE9BQWUsRUFBRSxNQUFjLEVBQUUsSUFBZ0IsRUFBRSxTQUFpQztZQUF0RyxpQkFtQkM7WUFuQmtELG9CQUFnQixHQUFoQixTQUFnQjtZQUNqRSxJQUFJLFFBQVEsR0FBeUIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtZQUNwRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUM3QixJQUFJLEVBQUUsR0FBVyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7WUFDMUMsSUFBSSxPQUFPLEdBQWE7Z0JBQ3RCLEVBQUUsRUFBRSxFQUFFO2dCQUNOLE9BQU8sRUFBRSxPQUFPO2dCQUNoQixNQUFNLEVBQUUsTUFBTTtnQkFDZCxJQUFJLEVBQUUsYUFBYSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUM7YUFDekMsQ0FBQTtZQUNELEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQztnQkFBQyxTQUFTLENBQUMsSUFBSSxDQUFDO29CQUM1QixLQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUM7d0JBQ2hELEVBQUUsRUFBRSxFQUFFO3dCQUNOLE1BQU0sRUFBRSxJQUFJO3FCQUNiLENBQUMsRUFINkIsQ0FHN0IsQ0FBQyxDQUFBO29CQUNILE9BQU8sS0FBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQTtnQkFDM0IsQ0FBQyxDQUFDLENBQUE7WUFDRixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQTNCLENBQTJCLENBQUMsQ0FBQTtZQUMzRCxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQTtRQUN6QixDQUFDO1FBQ00sNEJBQUksR0FBWCxVQUFlLE9BQWUsRUFBRSxNQUFjLEVBQUUsSUFBZ0IsRUFBRSxTQUFpQztZQUFuRyxpQkFvQkM7WUFwQitDLG9CQUFnQixHQUFoQixTQUFnQjtZQUM5RCxJQUFJLFFBQVEsR0FBeUIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtZQUNwRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUM3QixJQUFJLEVBQUUsR0FBVyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7WUFDMUMsSUFBSSxNQUFNLEdBQVcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7WUFDckQsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUE7WUFDbkUsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDO2dCQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7b0JBQzVCLE1BQU0sQ0FBQyxXQUFXLENBQUM7d0JBQ2pCLEVBQUUsRUFBRSxFQUFFO3dCQUNOLE1BQU0sRUFBRSxJQUFJO3FCQUNiLENBQUMsQ0FBQTtvQkFDRixPQUFPLEtBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUE7Z0JBQzNCLENBQUMsQ0FBQyxDQUFBO1lBQ0YsTUFBTSxDQUFDLFdBQVcsQ0FBQztnQkFDakIsRUFBRSxFQUFFLEVBQUU7Z0JBQ04sT0FBTyxFQUFFLE9BQU87Z0JBQ2hCLE1BQU0sRUFBRSxNQUFNO2dCQUNkLElBQUksRUFBRSxhQUFhLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQzthQUN6QyxDQUFDLENBQUE7WUFDRixNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQTtRQUN6QixDQUFDO1FBRU8seUNBQWlCLEdBQXpCLFVBQTBCLElBQVM7WUFDakMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ3BDLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQTtRQUNiLENBQUM7UUFFTyxpREFBeUIsR0FBakMsVUFBa0MsSUFBUztZQUEzQyxpQkFjQztZQWJDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxDQUFDO2dCQUFDLE1BQU0sQ0FBQTtZQUM1RCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQTtZQUNsQixFQUFFLENBQUMsQ0FBQyxJQUFJLFlBQVksS0FBSyxDQUFDO2dCQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxLQUFJLENBQUMseUJBQXlCLENBQUMsR0FBRyxDQUFDLEVBQW5DLENBQW1DLENBQUMsQ0FBQTtZQUNuRixJQUFJLENBQUMsQ0FBQztnQkFDSixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztvQkFDckIsSUFBSSxTQUFTLEdBQVcsSUFBSSxDQUFDLDBDQUEwQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQTtvQkFDekYsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7d0JBQUMsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFBO29CQUM3RCxJQUFJLENBQUMsU0FBUyxHQUFJLFNBQVMsQ0FBQTtvQkFDM0IsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFBO2dCQUN6QixDQUFDO2dCQUNELEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQztvQkFBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNqRCxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7WUFDN0MsQ0FBQztRQUNILENBQUM7UUE5SmMsNEJBQWMsR0FBVyxxcUJBb0J2QyxDQUFBO1FBNElILG9CQUFDO0lBQUQsQ0FsS0EsQUFrS0MsSUFBQTtJQWxLWSxtQkFBYSxnQkFrS3pCLENBQUE7SUFhRDtRQWtCRSw2QkFBb0IsMENBQTBFLEVBQVUsU0FBd0MsRUFBVSxFQUFxQixFQUFVLFVBQXFDO1lBQTFNLCtDQUEwQyxHQUExQywwQ0FBMEMsQ0FBZ0M7WUFBVSxjQUFTLEdBQVQsU0FBUyxDQUErQjtZQUFVLE9BQUUsR0FBRixFQUFFLENBQW1CO1lBQVUsZUFBVSxHQUFWLFVBQVUsQ0FBMkI7WUFqQnROLGVBQVUsR0FBNkIsRUFBRSxDQUFBO1FBaUJnTCxDQUFDO1FBZnBOLGtDQUFjLEdBQTVCLFVBQTZCLEdBQUc7WUFDOUIsSUFBSSxHQUFHLEdBQU8sRUFBRSxDQUFBO1lBQ2hCLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQztnQkFDbEIsRUFBRSxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssUUFBUSxDQUFDO29CQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxtQkFBbUIsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7Z0JBQ3pGLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxVQUFVLENBQUM7b0JBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUM5RCxNQUFNLENBQUMsR0FBRyxDQUFBO1FBQ1osQ0FBQztRQUNNLHdDQUFVLEdBQWpCLFVBQWtCLElBQVksRUFBRSxJQUFVO1lBQ3hDLElBQUksQ0FBQztnQkFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUMsS0FBSyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFDLENBQUMsQ0FBQTtZQUM5RixDQUFFO1lBQUEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQTtnQkFDcEIsTUFBTSxDQUFDLENBQUE7WUFDVCxDQUFDO1FBQ0gsQ0FBQztRQUVNLHVDQUFTLEdBQWhCLFVBQWlCLE9BQWlCO1lBQWxDLGlCQWdDQztZQS9CQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFLLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO2dCQUMvRSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFBO1lBQzFCLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLElBQUksU0FBUyxHQUEyQixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDcEUsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDbkMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDO29CQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNyQyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sSUFBSSxPQUFPLEdBQVEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQVEsQ0FBQyxDQUFBO2dCQUN2RCxJQUFJLFNBQVMsR0FBMkIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDeEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDO2dCQUN4QyxJQUFJLE9BQU8sR0FBUSxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUE7Z0JBQzFILEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQzlCLElBQUksUUFBUSxHQUEyQixJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFBO29CQUN0RCxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO29CQUN6QixPQUFPLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQTtnQkFDNUIsQ0FBQztnQkFDRCxPQUFPLENBQUMsSUFBSSxDQUNWLFVBQUMsT0FBTztvQkFDTixPQUFPLEtBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUcsQ0FBQyxDQUFBO29CQUNuQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsRUFBQyxDQUFDLENBQUM7Z0JBQ3BHLENBQUMsRUFDRCxVQUFDLEtBQUs7b0JBQ0osT0FBTyxLQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFHLENBQUMsQ0FBQTtvQkFDbkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFBO2dCQUNySSxDQUFDLEVBQ0QsVUFBQyxNQUFNO29CQUNMLE9BQU8sS0FBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRyxDQUFDLENBQUE7b0JBQ25DLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUMsQ0FBQztnQkFDcEcsQ0FBQyxDQUFDLENBQUE7WUFDSixDQUFDO1FBQ0gsQ0FBQztRQUVPLCtDQUFpQixHQUF6QixVQUEwQixJQUFTO1lBQ2pDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNwQyxhQUFhLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUE7UUFDYixDQUFDO1FBRU8sdURBQXlCLEdBQWpDLFVBQWtDLElBQVM7WUFBM0MsaUJBY0M7WUFiQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsQ0FBQztnQkFBQyxNQUFNLENBQUE7WUFDNUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUE7WUFDbEIsRUFBRSxDQUFDLENBQUMsSUFBSSxZQUFZLEtBQUssQ0FBQztnQkFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsS0FBSSxDQUFDLHlCQUF5QixDQUFDLEdBQUcsQ0FBQyxFQUFuQyxDQUFtQyxDQUFDLENBQUE7WUFDbkYsSUFBSSxDQUFDLENBQUM7Z0JBQ0osRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7b0JBQ3JCLElBQUksU0FBUyxHQUFXLElBQUksQ0FBQywwQ0FBMEMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUE7b0JBQ3pGLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO3dCQUFDLE1BQU0sb0JBQW9CLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQTtvQkFDN0QsSUFBSSxDQUFDLFNBQVMsR0FBSSxTQUFTLENBQUE7b0JBQzNCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQTtnQkFDekIsQ0FBQztnQkFDRCxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUM7b0JBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDakQsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1lBQzdDLENBQUM7UUFDSCxDQUFDO1FBR0gsMEJBQUM7SUFBRCxDQTVFQSxBQTRFQyxJQUFBO0lBNUVZLHlCQUFtQixzQkE0RS9CLENBQUE7QUFFSCxDQUFDLEVBcFFTLEtBQUssS0FBTCxLQUFLLFFBb1FkIiwiZmlsZSI6InNjcmlwdHMvd29ya2VyLXNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgZmlicmEge1xuICAndXNlIHN0cmljdCdcblxuICBleHBvcnQgY2xhc3MgV29ya2VyU2VydmljZUNvbmZpZ3VyYXRpb24ge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBhcHBOYW1lOiBzdHJpbmcsIHB1YmxpYyB3b3JrZXJUaHJlYWRzOiBudW1iZXIsIHB1YmxpYyBpbXBvcnRTY3JpcHRzOiBzdHJpbmdbXSkge31cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBXb3JrZXJTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgc3RhdGljIHdvcmtlclRlbXBsYXRlOiBzdHJpbmcgPSBgXG4gICAgICB2YXIgd2luZG93ID0gc2VsZlxuICAgICAgc2VsZi5oaXN0b3J5ID0ge31cbiAgICAgIHNlbGYuTm9kZSA9IGZ1bmN0aW9uICgpIHt9XG4gICAgICB2YXIgZG9jdW1lbnQgPSB7XG4gICAgICAgIHJlYWR5U3RhdGU6ICdjb21wbGV0ZScsXG4gICAgICAgIGNvb2tpZTogJycsXG4gICAgICAgIHF1ZXJ5U2VsZWN0b3I6IGZ1bmN0aW9uICgpIHt9LFxuICAgICAgICBjcmVhdGVFbGVtZW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcGF0aG5hbWU6ICcnLFxuICAgICAgICAgICAgc2V0QXR0cmlidXRlOiBmdW5jdGlvbigpIHt9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICBpbXBvcnRTY3JpcHRzKCc8SU1QT1JUX1NDUklQVFM+JylcbiAgICAgIHdpbmRvdy5hbmd1bGFyLm1vZHVsZSgnPEFQUF9OQU1FPicpLnJ1bihbJ3dvcmtlcldvcmtlclNlcnZpY2UnLCBmdW5jdGlvbih3b3JrZXJXb3JrZXJTZXJ2aWNlKSB7XG4gICAgICAgIHNlbGYuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGZ1bmN0aW9uKGUpIHsgd29ya2VyV29ya2VyU2VydmljZS5vbk1lc3NhZ2UoZS5kYXRhKSB9KVxuICAgICAgfV0pXG4gICAgICB3aW5kb3cuYW5ndWxhci5ib290c3RyYXAobnVsbCwgWyc8QVBQX05BTUU+J10pXG4gICAgYFxuXG4gICAgcHJpdmF0ZSB3b3JrZXJzOiBXb3JrZXJbXVxuICAgIHByaXZhdGUgY3VycmVudFdvcmtlcjogbnVtYmVyID0gMFxuICAgIHByaXZhdGUgZGVmZXJyZWRzOiBhbmd1bGFyLklEZWZlcnJlZDxhbnk+W10gPSBbXVxuXG4gICAgcHVibGljIHN0YXRpYyBzdHJpcE1hcmtzKGFyZ3M6IGFueSk6IHZvaWQge1xuICAgICAgaWYgKCFhcmdzIHx8ICFhcmdzLl9fbWFyayB8fCB0eXBlb2YgYXJncyAhPT0gJ29iamVjdCcpIHJldHVyblxuICAgICAgZGVsZXRlIGFyZ3MuX19tYXJrXG4gICAgICBpZiAoYXJncyBpbnN0YW5jZW9mIEFycmF5KSBhcmdzLmZvckVhY2goYXJnID0+IFdvcmtlclNlcnZpY2Uuc3RyaXBNYXJrcyhhcmcpKVxuICAgICAgZWxzZSB7XG4gICAgICAgIGZvciAobGV0IGtleSBpbiBhcmdzKSBpZiAoYXJncy5oYXNPd25Qcm9wZXJ0eShrZXkpKVxuICAgICAgICAgIFdvcmtlclNlcnZpY2Uuc3RyaXBNYXJrcyhhcmdzW2tleV0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBzYXZlUHJvdG90eXBlcyhhcmdzOiBhbnkpOiBhbnkge1xuICAgICAgdGhpcy5zYXZlUHJvdG90eXBlc0ludGVybmFsKGFyZ3MpXG4gICAgICByZXR1cm4gYXJnc1xuICAgIH1cbiAgICBwcml2YXRlIHN0YXRpYyBzYXZlUHJvdG90eXBlc0ludGVybmFsKGFyZ3M6IGFueSk6IHZvaWQge1xuICAgICAgaWYgKCFhcmdzIHx8IGFyZ3MuX19jbGFzc05hbWUgfHwgdHlwZW9mIGFyZ3MgIT09ICdvYmplY3QnKSByZXR1cm5cbiAgICAgIGlmIChhcmdzIGluc3RhbmNlb2YgQXJyYXkpIGFyZ3MuZm9yRWFjaChhcmcgPT4gV29ya2VyU2VydmljZS5zYXZlUHJvdG90eXBlcyhhcmcpKVxuICAgICAgZWxzZSB7XG4gICAgICAgIGlmIChhcmdzLmNvbnN0cnVjdG9yLm5hbWUgIT09ICdPYmplY3QnKSB7XG4gICAgICAgICAgbGV0IGN1cnJlbnRQcm90b3R5cGU6IHt9ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGFyZ3MpXG4gICAgICAgICAgb3V0OiB3aGlsZSAoY3VycmVudFByb3RvdHlwZSAhPT0gT2JqZWN0LnByb3RvdHlwZSkge1xuICAgICAgICAgICAgZm9yIChsZXQgcHJvcCBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhjdXJyZW50UHJvdG90eXBlKSkge1xuICAgICAgICAgICAgICBpZiAocHJvcCAhPT0gJ2NvbnN0cnVjdG9yJyAmJiB0eXBlb2YoYXJncy5fX3Byb3RvX19bcHJvcF0pID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgYXJncy5fX2NsYXNzTmFtZSA9IGFyZ3MuY29uc3RydWN0b3IubmFtZVxuICAgICAgICAgICAgICAgIGJyZWFrIG91dFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdXJyZW50UHJvdG90eXBlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGN1cnJlbnRQcm90b3R5cGUpXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghYXJncy5fX2NsYXNzTmFtZSkgYXJncy5fX2NsYXNzTmFtZSA9ICdPYmplY3QnXG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQga2V5IGluIGFyZ3MpIGlmIChhcmdzLmhhc093blByb3BlcnR5KGtleSkpXG4gICAgICAgICAgV29ya2VyU2VydmljZS5zYXZlUHJvdG90eXBlcyhhcmdzW2tleV0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3Iod29ya2VyU2VydmljZUNvbmZpZ3VyYXRpb246IFdvcmtlclNlcnZpY2VDb25maWd1cmF0aW9uLCBwcml2YXRlIHdvcmtlclNlcnZpY2VQcm90b3R5cGVNYXBwaW5nQ29uZmlndXJhdGlvbjoge1tjbGFzc05hbWU6IHN0cmluZ106IE9iamVjdH0sICRyb290U2NvcGU6IGFuZ3VsYXIuSVJvb3RTY29wZVNlcnZpY2UsICR3aW5kb3c6IGFuZ3VsYXIuSVdpbmRvd1NlcnZpY2UsIHByaXZhdGUgJHE6IGFuZ3VsYXIuSVFTZXJ2aWNlKSB7XG4gICAgICBsZXQgcGF0aDogc3RyaW5nID0gJHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArICcvLycgKyAkd2luZG93LmxvY2F0aW9uLmhvc3RcbiAgICAgIGxldCBpbXBvcnRTY3JpcHRzOiBzdHJpbmdbXSA9IHdvcmtlclNlcnZpY2VDb25maWd1cmF0aW9uLmltcG9ydFNjcmlwdHMubWFwKHMgPT5cbiAgICAgICAgcy5pbmRleE9mKCdodHRwJykgIT09IDAgPyBwYXRoICsgKHMuaW5kZXhPZignLycpICE9PSAwID8gJHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA6ICcnKSArIHMgOiBzXG4gICAgICApXG4gICAgICBsZXQgYmxvYlVSTDogc3RyaW5nID0gKCR3aW5kb3cuVVJMKS5jcmVhdGVPYmplY3RVUkwobmV3IEJsb2IoW1dvcmtlclNlcnZpY2Uud29ya2VyVGVtcGxhdGUucmVwbGFjZSgvPEFQUF9OQU1FPi9nLCB3b3JrZXJTZXJ2aWNlQ29uZmlndXJhdGlvbi5hcHBOYW1lKS5yZXBsYWNlKC88SU1QT1JUX1NDUklQVFM+L2csIGltcG9ydFNjcmlwdHMuam9pbignXFwnLFxcJycpKV0sIHsgdHlwZTogJ2FwcGxpY2F0aW9uL2phdmFzY3JpcHQnIH0pKTtcbiAgICAgIHRoaXMud29ya2VycyA9IFtdXG4gICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgd29ya2VyU2VydmljZUNvbmZpZ3VyYXRpb24ud29ya2VyVGhyZWFkczsgaSsrKSB7XG4gICAgICAgIHRoaXMud29ya2Vycy5wdXNoKG5ldyBXb3JrZXIoYmxvYlVSTCkpXG4gICAgICAgIHRoaXMud29ya2Vyc1tpXS5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgKGU6IE1lc3NhZ2VFdmVudCkgPT4ge1xuICAgICAgICAgIGxldCBldmVudElkOiBzdHJpbmcgPSBlLmRhdGEuZXZlbnQ7XG4gICAgICAgICAgaWYgKGV2ZW50SWQgPT09ICdicm9hZGNhc3QnKSB7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoZS5kYXRhLm5hbWUsIHRoaXMucmVzdG9yZVByb3RvdHlwZXMoZS5kYXRhLmFyZ3MpKVxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgZGVmZXJyZWQ6IGFuZ3VsYXIuSURlZmVycmVkPGFueT4gPSB0aGlzLmRlZmVycmVkc1tlLmRhdGEuaWRdXG4gICAgICAgICAgICBpZiAoZGVmZXJyZWQpIHtcbiAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuZGVmZXJyZWRzW2UuZGF0YS5pZF1cbiAgICAgICAgICAgICAgaWYgKGV2ZW50SWQgPT09ICdzdWNjZXNzJylcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHRoaXMucmVzdG9yZVByb3RvdHlwZXMoZS5kYXRhLmRhdGEpKVxuICAgICAgICAgICAgICBlbHNlIGlmIChldmVudElkID09PSAnZmFpbHVyZScpXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHRoaXMucmVzdG9yZVByb3RvdHlwZXMoZS5kYXRhLmRhdGEpKVxuICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQubm90aWZ5KHRoaXMucmVzdG9yZVByb3RvdHlwZXMoZS5kYXRhLmRhdGEpKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgJGJyb2FkY2FzdChuYW1lOiBzdHJpbmcsIGFyZ3M6IGFueVtdKTogdm9pZCB7XG4gICAgICB0aGlzLndvcmtlcnMuZm9yRWFjaCh3ID0+IHcucG9zdE1lc3NhZ2Uoe25hbWU6IG5hbWUsIGFyZ3M6IFdvcmtlclNlcnZpY2Uuc2F2ZVByb3RvdHlwZXMoYXJncyl9KSlcbiAgICB9XG5cbiAgICBwdWJsaWMgY2FsbEFsbDxUPihzZXJ2aWNlOiBzdHJpbmcsIG1ldGhvZDogc3RyaW5nLCBhcmdzOiBhbnlbXSA9IFtdLCBjYW5jZWxsZXI/OiBhbmd1bGFyLklQcm9taXNlPGFueT4pOiBhbmd1bGFyLklQcm9taXNlPFQ+IHtcbiAgICAgIGxldCBkZWZlcnJlZDogYW5ndWxhci5JRGVmZXJyZWQ8VD4gPSB0aGlzLiRxLmRlZmVyKClcbiAgICAgIHRoaXMuZGVmZXJyZWRzLnB1c2goZGVmZXJyZWQpXG4gICAgICBsZXQgaWQ6IG51bWJlciA9IHRoaXMuZGVmZXJyZWRzLmxlbmd0aCAtIDFcbiAgICAgIGxldCBtZXNzYWdlOiBJTWVzc2FnZSA9IHtcbiAgICAgICAgaWQ6IGlkLFxuICAgICAgICBzZXJ2aWNlOiBzZXJ2aWNlLFxuICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgYXJnczogV29ya2VyU2VydmljZS5zYXZlUHJvdG90eXBlcyhhcmdzKVxuICAgICAgfVxuICAgICAgaWYgKGNhbmNlbGxlcikgY2FuY2VsbGVyLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLndvcmtlcnMuZm9yRWFjaCh3b3JrZXIgPT4gd29ya2VyLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgY2FuY2VsOiB0cnVlXG4gICAgICAgIH0pKVxuICAgICAgICBkZWxldGUgdGhpcy5kZWZlcnJlZHNbaWRdXG4gICAgICB9KVxuICAgICAgdGhpcy53b3JrZXJzLmZvckVhY2god29ya2VyID0+IHdvcmtlci5wb3N0TWVzc2FnZShtZXNzYWdlKSlcbiAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlXG4gICAgfVxuICAgIHB1YmxpYyBjYWxsPFQ+KHNlcnZpY2U6IHN0cmluZywgbWV0aG9kOiBzdHJpbmcsIGFyZ3M6IGFueVtdID0gW10sIGNhbmNlbGxlcj86IGFuZ3VsYXIuSVByb21pc2U8YW55Pik6IGFuZ3VsYXIuSVByb21pc2U8VD4ge1xuICAgICAgbGV0IGRlZmVycmVkOiBhbmd1bGFyLklEZWZlcnJlZDxUPiA9IHRoaXMuJHEuZGVmZXIoKVxuICAgICAgdGhpcy5kZWZlcnJlZHMucHVzaChkZWZlcnJlZClcbiAgICAgIGxldCBpZDogbnVtYmVyID0gdGhpcy5kZWZlcnJlZHMubGVuZ3RoIC0gMVxuICAgICAgbGV0IHdvcmtlcjogV29ya2VyID0gdGhpcy53b3JrZXJzW3RoaXMuY3VycmVudFdvcmtlcl1cbiAgICAgIHRoaXMuY3VycmVudFdvcmtlciA9ICh0aGlzLmN1cnJlbnRXb3JrZXIgKyAxKSAlIHRoaXMud29ya2Vycy5sZW5ndGhcbiAgICAgIGlmIChjYW5jZWxsZXIpIGNhbmNlbGxlci50aGVuKCgpID0+IHtcbiAgICAgICAgd29ya2VyLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgY2FuY2VsOiB0cnVlXG4gICAgICAgIH0pXG4gICAgICAgIGRlbGV0ZSB0aGlzLmRlZmVycmVkc1tpZF1cbiAgICAgIH0pXG4gICAgICB3b3JrZXIucG9zdE1lc3NhZ2Uoe1xuICAgICAgICBpZDogaWQsXG4gICAgICAgIHNlcnZpY2U6IHNlcnZpY2UsXG4gICAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgICBhcmdzOiBXb3JrZXJTZXJ2aWNlLnNhdmVQcm90b3R5cGVzKGFyZ3MpXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2VcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc3RvcmVQcm90b3R5cGVzKGFyZ3M6IGFueSk6IGFueSB7XG4gICAgICB0aGlzLnJlc3RvcmVQcm90b3R5cGVzSW50ZXJuYWwoYXJncylcbiAgICAgIFdvcmtlclNlcnZpY2Uuc3RyaXBNYXJrcyhhcmdzKVxuICAgICAgcmV0dXJuIGFyZ3NcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc3RvcmVQcm90b3R5cGVzSW50ZXJuYWwoYXJnczogYW55KTogdm9pZCB7XG4gICAgICBpZiAoIWFyZ3MgfHwgYXJncy5fX21hcmsgfHwgdHlwZW9mIGFyZ3MgIT09ICdvYmplY3QnKSByZXR1cm5cbiAgICAgIGFyZ3MuX19tYXJrID0gdHJ1ZVxuICAgICAgaWYgKGFyZ3MgaW5zdGFuY2VvZiBBcnJheSkgYXJncy5mb3JFYWNoKGFyZyA9PiB0aGlzLnJlc3RvcmVQcm90b3R5cGVzSW50ZXJuYWwoYXJnKSlcbiAgICAgIGVsc2Uge1xuICAgICAgICBpZiAoYXJncy5fX2NsYXNzTmFtZSkge1xuICAgICAgICAgIGxldCBwcm90b3R5cGU6IE9iamVjdCA9IHRoaXMud29ya2VyU2VydmljZVByb3RvdHlwZU1hcHBpbmdDb25maWd1cmF0aW9uW2FyZ3MuX19jbGFzc05hbWVdXG4gICAgICAgICAgaWYgKCFwcm90b3R5cGUpIHRocm93ICdVbmtub3duIHByb3RvdHlwZSAnICsgYXJncy5fX2NsYXNzTmFtZVxuICAgICAgICAgIGFyZ3MuX19wcm90b19fID0gIHByb3RvdHlwZVxuICAgICAgICAgIGRlbGV0ZSBhcmdzLl9fY2xhc3NOYW1lXG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQga2V5IGluIGFyZ3MpIGlmIChhcmdzLmhhc093blByb3BlcnR5KGtleSkpXG4gICAgICAgICAgdGhpcy5yZXN0b3JlUHJvdG90eXBlc0ludGVybmFsKGFyZ3Nba2V5XSlcbiAgICAgIH1cbiAgICB9XG5cbiAgfVxuXG4gIGRlY2xhcmUgdmFyIHNlbGY6IGFueVxuXG4gIGludGVyZmFjZSBJTWVzc2FnZSB7XG4gICAgaWQ/OiBudW1iZXJcbiAgICBuYW1lPzogc3RyaW5nXG4gICAgYXJncz86IGFueVxuICAgIGNhbmNlbD86IGJvb2xlYW5cbiAgICBzZXJ2aWNlPzogc3RyaW5nXG4gICAgbWV0aG9kPzogc3RyaW5nXG4gIH1cblxuICBleHBvcnQgY2xhc3MgV29ya2VyV29ya2VyU2VydmljZSB7XG4gICAgcHJpdmF0ZSBjYW5jZWxsZXJzOiBhbmd1bGFyLklEZWZlcnJlZDxhbnk+W10gPSBbXVxuXG4gICAgcHVibGljIHN0YXRpYyBzdHJpcEZ1bmN0aW9ucyhvYmopOiBhbnkge1xuICAgICAgbGV0IHJldDoge30gPSB7fVxuICAgICAgZm9yIChsZXQga2V5IGluIG9iailcbiAgICAgICAgaWYgKHR5cGVvZiBvYmpba2V5XSA9PT0gJ29iamVjdCcpIHJldFtrZXldID0gV29ya2VyV29ya2VyU2VydmljZS5zdHJpcEZ1bmN0aW9ucyhvYmpba2V5XSlcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIG9ialtrZXldICE9PSAnZnVuY3Rpb24nKSByZXRba2V5XSA9IG9ialtrZXldXG4gICAgICByZXR1cm4gcmV0XG4gICAgfVxuICAgIHB1YmxpYyAkYnJvYWRjYXN0KG5hbWU6IHN0cmluZywgYXJncz86IGFueSk6IHZvaWQge1xuICAgICAgdHJ5IHtcbiAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7ZXZlbnQ6ICdicm9hZGNhc3QnLCBuYW1lOiBuYW1lLCBhcmdzOiBXb3JrZXJTZXJ2aWNlLnNhdmVQcm90b3R5cGVzKGFyZ3MpfSlcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coYXJncywgZSlcbiAgICAgICAgdGhyb3cgZVxuICAgICAgfVxuICAgIH1cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHdvcmtlclNlcnZpY2VQcm90b3R5cGVNYXBwaW5nQ29uZmlndXJhdGlvbjogIHtbY2xhc3NOYW1lOiBzdHJpbmddOiBPYmplY3R9LCBwcml2YXRlICRpbmplY3RvcjogYW5ndWxhci5hdXRvLklJbmplY3RvclNlcnZpY2UsIHByaXZhdGUgJHE6IGFuZ3VsYXIuSVFTZXJ2aWNlLCBwcml2YXRlICRyb290U2NvcGU6IGFuZ3VsYXIuSVJvb3RTY29wZVNlcnZpY2UpIHt9XG4gICAgcHVibGljIG9uTWVzc2FnZShtZXNzYWdlOiBJTWVzc2FnZSk6IHZvaWQge1xuICAgICAgaWYgKG1lc3NhZ2UuaWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLiRyb290U2NvcGUuJGJyb2FkY2FzdChtZXNzYWdlLm5hbWUhLCB0aGlzLnJlc3RvcmVQcm90b3R5cGVzKG1lc3NhZ2UuYXJncykpXG4gICAgICAgIHRoaXMuJHJvb3RTY29wZS4kYXBwbHkoKVxuICAgICAgfSBlbHNlIGlmIChtZXNzYWdlLmNhbmNlbCkge1xuICAgICAgICBsZXQgY2FuY2VsbGVyOiBhbmd1bGFyLklEZWZlcnJlZDxhbnk+ID0gdGhpcy5jYW5jZWxsZXJzW21lc3NhZ2UuaWRdO1xuICAgICAgICBkZWxldGUgdGhpcy5jYW5jZWxsZXJzW21lc3NhZ2UuaWRdO1xuICAgICAgICBpZiAoY2FuY2VsbGVyKSBjYW5jZWxsZXIucmVzb2x2ZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHNlcnZpY2U6IGFueSA9IHRoaXMuJGluamVjdG9yLmdldChtZXNzYWdlLnNlcnZpY2UhKVxuICAgICAgICBsZXQgY2FuY2VsbGVyOiBhbmd1bGFyLklEZWZlcnJlZDxhbnk+ID0gdGhpcy4kcS5kZWZlcigpO1xuICAgICAgICB0aGlzLmNhbmNlbGxlcnNbbWVzc2FnZS5pZF0gPSBjYW5jZWxsZXI7XG4gICAgICAgIGxldCBwcm9taXNlOiBhbnkgPSBzZXJ2aWNlW21lc3NhZ2UubWV0aG9kIV0uYXBwbHkoc2VydmljZSwgdGhpcy5yZXN0b3JlUHJvdG90eXBlcyhtZXNzYWdlLmFyZ3MpLmNvbmNhdChjYW5jZWxsZXIucHJvbWlzZSkpXG4gICAgICAgIGlmICghcHJvbWlzZSB8fCAhcHJvbWlzZS50aGVuKSB7XG4gICAgICAgICAgbGV0IGRlZmVycmVkOiBhbmd1bGFyLklEZWZlcnJlZDxhbnk+ID0gdGhpcy4kcS5kZWZlcigpXG4gICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShwcm9taXNlKVxuICAgICAgICAgIHByb21pc2UgPSBkZWZlcnJlZC5wcm9taXNlXG4gICAgICAgIH1cbiAgICAgICAgcHJvbWlzZS50aGVuKFxuICAgICAgICAgIChzdWNjZXNzKSA9PiB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5jYW5jZWxsZXJzW21lc3NhZ2UuaWQhXVxuICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7ZXZlbnQ6ICdzdWNjZXNzJywgaWQ6IG1lc3NhZ2UuaWQsIGRhdGE6IFdvcmtlclNlcnZpY2Uuc2F2ZVByb3RvdHlwZXMoc3VjY2Vzcyl9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuY2FuY2VsbGVyc1ttZXNzYWdlLmlkIV1cbiAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2Uoe2V2ZW50OiAnZmFpbHVyZScsIGlkOiBtZXNzYWdlLmlkLCBkYXRhOiBXb3JrZXJTZXJ2aWNlLnNhdmVQcm90b3R5cGVzKFdvcmtlcldvcmtlclNlcnZpY2Uuc3RyaXBGdW5jdGlvbnMoZXJyb3IpKX0pXG4gICAgICAgICAgfSxcbiAgICAgICAgICAodXBkYXRlKSA9PiB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5jYW5jZWxsZXJzW21lc3NhZ2UuaWQhXVxuICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7ZXZlbnQ6ICd1cGRhdGUnLCBpZDogbWVzc2FnZS5pZCwgZGF0YTogV29ya2VyU2VydmljZS5zYXZlUHJvdG90eXBlcyh1cGRhdGUpfSk7XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXN0b3JlUHJvdG90eXBlcyhhcmdzOiBhbnkpOiBhbnkge1xuICAgICAgdGhpcy5yZXN0b3JlUHJvdG90eXBlc0ludGVybmFsKGFyZ3MpXG4gICAgICBXb3JrZXJTZXJ2aWNlLnN0cmlwTWFya3MoYXJncylcbiAgICAgIHJldHVybiBhcmdzXG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXN0b3JlUHJvdG90eXBlc0ludGVybmFsKGFyZ3M6IGFueSk6IHZvaWQge1xuICAgICAgaWYgKCFhcmdzIHx8IGFyZ3MuX19tYXJrIHx8IHR5cGVvZiBhcmdzICE9PSAnb2JqZWN0JykgcmV0dXJuXG4gICAgICBhcmdzLl9fbWFyayA9IHRydWVcbiAgICAgIGlmIChhcmdzIGluc3RhbmNlb2YgQXJyYXkpIGFyZ3MuZm9yRWFjaChhcmcgPT4gdGhpcy5yZXN0b3JlUHJvdG90eXBlc0ludGVybmFsKGFyZykpXG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKGFyZ3MuX19jbGFzc05hbWUpIHtcbiAgICAgICAgICBsZXQgcHJvdG90eXBlOiBPYmplY3QgPSB0aGlzLndvcmtlclNlcnZpY2VQcm90b3R5cGVNYXBwaW5nQ29uZmlndXJhdGlvblthcmdzLl9fY2xhc3NOYW1lXVxuICAgICAgICAgIGlmICghcHJvdG90eXBlKSB0aHJvdyAnVW5rbm93biBwcm90b3R5cGUgJyArIGFyZ3MuX19jbGFzc05hbWVcbiAgICAgICAgICBhcmdzLl9fcHJvdG9fXyA9ICBwcm90b3R5cGVcbiAgICAgICAgICBkZWxldGUgYXJncy5fX2NsYXNzTmFtZVxuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGtleSBpbiBhcmdzKSBpZiAoYXJncy5oYXNPd25Qcm9wZXJ0eShrZXkpKVxuICAgICAgICAgIHRoaXMucmVzdG9yZVByb3RvdHlwZXNJbnRlcm5hbChhcmdzW2tleV0pXG4gICAgICB9XG4gICAgfVxuXG5cbiAgfVxuXG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

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
    '    <div class="col-md-12">\n' +
    '      <div class="row no-gutter">\n' +
    '        <div class="col-md-12" id="type-bar">\n' +
    '          <type-select tree="$ctrl.classTree" on-select="$ctrl.alterSelection(treeNode)"></type-select>\n' +
    '        </div>\n' +
    '        <div class="pull-right"><span ng-repeat="endpoint in $ctrl.endpoints"><i class="glyphicon glyphicon-triangle-top" ng-class="endpoint.class"></i>{{endpoint.title}}</span></div>\n' +
    '      </div>\n' +
    '      <div class="row no-gutter">\n' +
    '        <div class="col-md-12" id="middle-column">\n' +
    '          <explore class-tree-promise="$ctrl.classTreePromise" selected-item="$ctrl.selectedItem"></explore>\n' +
    '          <sparql-autocomplete limit="5" by="group" on-select="$ctrl.createItem(result)" id="searchbar"></sparql-autocomplete>\n' +
    '        </div>\n' +
    '      </div>\n' +
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
  $templateCache.put('partials/explore.html',
    '\n' +
    '<div id="explorecontainer">\n' +
    '  <div id="layout-choice">\n' +
    '    <label>Force\n' +
    '      <input type="radio" ng-model="layout.choice" value="force"/>\n' +
    '    </label>\n' +
    '    <label>Force Grid\n' +
    '      <input type="radio" ng-model="layout.choice" value="forcegrid"/>\n' +
    '    </label>\n' +
    '  </div>\n' +
    '  <svg id="explore"></svg>\n' +
    '</div>\n' +
    '<div>\n' +
    '  <table id="exploretable">\n' +
    '    <tr>\n' +
    '      <th>Label</th>\n' +
    '      <th ng-repeat="p in $ctrl.properties">{{ p.value }}</th>\n' +
    '      <th>Actions</th>\n' +
    '    </tr>\n' +
    '    <tr ng-repeat="item in $ctrl.primaryItems.concat($ctrl.secondaryItems)">\n' +
    '      <td ng-click="$ctrl.selectItem(item)">{{ item.label.value }}</td>\n' +
    '      <td ng-repeat="p in item.localProperties" ng-click="$ctrl.selectItem(item)">{{ p.values[0].label.value }}</td>\n' +
    '      <td><a ng-click="$ctrl.delete(item)">Delete</a></td>\n' +
    '    </tr>\n' +
    '  </table>\n' +
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
    '  <sparql-item item-id="result.ids[0]" show-remote-properties="true"></sparql-item>\n' +
    '</script>\n' +
    '<div class="form-group has-feedback">\n' +
    '  <input class="form-control" ng-model="$ctrl.query" ng-model-options="{ debounce: 500 }" ng-change="$ctrl.onChange($ctrl.query)"/><span class="glyphicon glyphicon-refresh fa-spin form-control-feedback" ng-show="$ctrl.queryRunning"></span><span class="danger glyphicon glyphicon-alert form-control-feedback" ng-show="$ctrl.error"></span><span class="glyphicon glyphicon-remove form-control-feedback" ng-show="$ctrl.results" ng-click="$ctrl.clearResults()" style="pointer-events: auto"></span>\n' +
    '</div>\n' +
    '<div ng-repeat="result in $ctrl.results track by $index">\n' +
    '  <h4>{{result.configuration.title || result.label }}</h4>\n' +
    '  <ul>\n' +
    '    <li ng-repeat="result in result.results track by $index" ng-click="$ctrl.onSelect({result:result})" uib-popover-template="\'sparql-autocomplete-item-popover\'" popover-trigger="mouseenter" popover-placement="center">{{result.matchedLabel.value}}<span ng-if="result.matchedLabel.value !== result.prefLabel.value">-&gt; {{result.prefLabel.value}}</span><span ng-if="result.additionalInformation[\'altLabel\']">&nbsp;(<span ng-repeat="altLabel in result.additionalInformation[\'altLabel\'] | limitTo:5">{{$last ? altLabel.value : altLabel.value+\', \'}}</span><span ng-if="result.additionalInformation[\'altLabel\'].length&gt;5">, &hellip;</span>)</span>&nbsp;[<span ng-repeat="datasource in result.datasources track by $index">{{$last ? datasource.id : datasource.id+\', \'}}</span>]</li>\n' +
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
    '  <sparql-item endpoint="$ctrl.endpoint" item-id="value" show-remote-properties="true"></sparql-item>\n' +
    '</script>\n' +
    '<h4>{{$ctrl.item.label.value}}</h4>\n' +
    '<table class="table table-striped">\n' +
    '  <tr ng-repeat="property in $ctrl.item.localProperties">\n' +
    '    <th>{{property.label ? property.label.value : property.value}}</th>\n' +
    '    <td><span ng-repeat="value in property.values" ng-click="$ctrl.onSelect({value: value})" uib-popover-template="\'sparql-item-popover\'" popover-trigger="mouseenter" popover-placement="right">{{value.label ? value.label.value : value.value}}<i class="glyphicon glyphicon-triangle-top" ng-repeat="endpoint in value.sourceEndpoints" ng-class="endpoint.class"></i>{{ $last ? \'\' : \', \' }}</span></td>\n' +
    '  </tr>\n' +
    '</table><i class="glyphicon glyphicon-chevron-down" ng-click="$ctrl.showRemoteProperties=!$ctrl.showRemoteProperties"></i>\n' +
    '<table class="table table-striped" ng-show="$ctrl.showRemoteProperties">\n' +
    '  <tr ng-repeat="property in $ctrl.item.remoteProperties">\n' +
    '    <th>{{property.label ? property.label.value : property.value}}</th>\n' +
    '    <td><span ng-repeat="value in property.values" ng-click="$ctrl.onSelect({value: value})" uib-popover-template="\'sparql-item-popover\'" popover-trigger="mouseenter" popover-placement="right">{{value.label ? value.label.value : value.value}}<i class="glyphicon glyphicon-triangle-top" ng-repeat="endpoint in value.sourceEndpoints" ng-class="endpoint.class"></i>{{ $last ? \'\' : \', \' }}</span></td>\n' +
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
    '    </label><span class="pull-left">{{node.matchingInstances != node.matchingInstances ? node.matchingInstances+\'/\'+node.instances : node.instances}}</span>\n' +
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

(function(module) {
try {
  module = angular.module('fibra');
} catch (e) {
  module = angular.module('fibra', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('partials/type-select.html',
    '\n' +
    '<script type="text/ng-template" id="type-pill.html">\n' +
    '  <div class="checkbox">\n' +
    '    <label>\n' +
    '      <input type="checkbox" ng-model="node.selected" ng-change="$ctrl.onSelect({treeNode:node})"/>{{node.label}}\n' +
    '    </label><span class="pull-left">{{node.matchingInstances != node.matchingInstances ? node.matchingInstances+\'/\'+node.instances : node.instances}}</span>\n' +
    '  </div>\n' +
    '  <ul>\n' +
    '    <li ng-repeat="node in node.children" ng-include="\'tree-pill.html\'" ng-class="{selected:node.selected}"></li>\n' +
    '  </ul>\n' +
    '</script>\n' +
    '<ul>\n' +
    '  <li ng-repeat="node in $ctrl.tree" ng-include="\'type-pill.html\'" ng-class="{selected:node.selected}"></li>\n' +
    '</ul>');
}]);
})();
