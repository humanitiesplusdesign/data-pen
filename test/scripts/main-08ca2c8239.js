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
            'scripts/worker-fd147697d8.js'
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvYXBwLWNvbmZpZ3VyYXRpb24tdWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBVSxLQUFLLENBbUVkO0FBbkVELFdBQVUsS0FBSyxFQUFDLENBQUM7SUFDZixZQUFZLENBQUE7SUFZWixJQUFJLENBQUMsR0FBb0IsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBRSx1QkFBdUIsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFHLGNBQWMsRUFBRSxtQkFBbUIsQ0FBRSxDQUFDLENBQUE7SUFDN0ksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFDLGNBQXlDLEVBQUUsa0JBQWlEO1FBQ3BHLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUN2QyxjQUFjLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtZQUMzQixHQUFHLEVBQUUsU0FBUztZQUNkLFFBQVEsRUFBRSxtQkFBbUI7U0FDOUIsQ0FBQyxDQUFBO0lBQ04sQ0FBQyxDQUFDLENBQUE7SUFDRixDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUMscUJBQXFCO1FBQzdCLHFCQUFxQixDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMvQyxDQUFDLENBQUMsQ0FBQTtJQUNGLENBQUMsQ0FBQyxLQUFLLENBQUMsNEJBQTRCLEVBQUU7UUFDcEMsT0FBTyxFQUFFLE9BQU87UUFDaEIsYUFBYSxFQUFFLENBQUM7UUFDaEIsYUFBYSxFQUFFO1lBQ2IseUNBQXlDO1lBQ3pDLGlFQUFpRTtZQUNqRSxnRUFBZ0U7WUFDaEUscUNBQXFDO1lBQ3JDLHFDQUFxQztZQUNyQywyQkFBMkI7WUFDM0Isa0NBQWtDO1lBQ2xDLDZCQUE2QjtZQUM3QixnQkFBZ0I7WUFDaEIsZ0NBQWdDO1lBQ2hDLHdDQUF3QztZQUN4QyxnQ0FBZ0M7WUFDaEMsa0NBQWtDO1lBQ2xDLDJCQUEyQjtTQUMxQjtLQUNKLENBQUMsQ0FBQTtJQUNGLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxVQUEyQyxFQUFFLGFBQWtCLEVBQUUsS0FBMkIsRUFBRSxXQUEwQyxFQUFFLGFBQTRCO1FBQzNLLFVBQVUsQ0FBQyxRQUFRLEdBQUc7WUFDcEIsUUFBUSxFQUFFLEtBQUs7WUFDZixRQUFRLEVBQUUsU0FBUztZQUNuQixRQUFRLEVBQUUsU0FBUztTQUNwQixDQUFBO1FBQ0QsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDaEMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxhQUFhLENBQUE7WUFDNUUsYUFBYSxDQUFDLFVBQVUsQ0FBQyx5QkFBeUIsRUFBRSxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUE7UUFDbEYsQ0FBQztRQUNELFVBQVUsQ0FBQyxPQUFPLEdBQUc7WUFDbkIsVUFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFBO1lBQ3BDLGFBQWEsQ0FBQyxhQUFhLEdBQUcsUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxHQUFHLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUNoSCxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLEdBQUcsYUFBYSxDQUFDLGFBQWEsQ0FBQTtZQUM1RSxhQUFhLENBQUMsVUFBVSxDQUFDLHlCQUF5QixFQUFFLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQTtZQUNoRixXQUFXLENBQUMsY0FBYyxFQUFFLENBQUE7UUFDOUIsQ0FBQyxDQUFBO1FBQ0QsVUFBVSxDQUFDLFdBQVcsR0FBRztZQUN2QixVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUE7WUFDcEMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxFQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUMsRUFBRSx5QkFBeUIsQ0FBQyxDQUFBO1FBQ3RFLENBQUMsQ0FBQTtRQUNELFVBQVUsQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEVBQUUsY0FBTSxPQUFBLFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLElBQUksRUFBbkMsQ0FBbUMsQ0FBQyxDQUFBO0lBQ3ZGLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxFQW5FUyxLQUFLLEtBQUwsS0FBSyxRQW1FZCIsImZpbGUiOiJzY3JpcHRzL2FwcC1jb25maWd1cmF0aW9uLXVpLmpzIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIGZpYnJhIHtcbiAgJ3VzZSBzdHJpY3QnXG5cbiAgaW50ZXJmYWNlIElBdXRoZW50aWNhdGlvblJvb3RTY29wZVNlcnZpY2UgZXh0ZW5kcyBhbmd1bGFyLklSb290U2NvcGVTZXJ2aWNlIHtcbiAgICBzZXRBdXRoOiAoKSA9PiB2b2lkXG4gICAgZGlzbWlzc0F1dGg6ICgpID0+IHZvaWRcbiAgICBhdXRoSW5mbzoge1xuICAgICAgYXV0aE9wZW46IGJvb2xlYW5cbiAgICAgIHVzZXJuYW1lOiBzdHJpbmdcbiAgICAgIHBhc3N3b3JkOiBzdHJpbmdcbiAgICB9XG4gIH1cblxuICBsZXQgbTogYW5ndWxhci5JTW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2ZpYnJhJywgWyAnaHR0cC1hdXRoLWludGVyY2VwdG9yJywgJ25nU3RvcmFnZScsICd1aS5yb3V0ZXInLCAgJ3VpLmJvb3RzdHJhcCcsICd1aS5ib290c3RyYXAudHBscycgXSlcbiAgbS5jb25maWcoKCRzdGF0ZVByb3ZpZGVyOiBhbmd1bGFyLnVpLklTdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXI6IGFuZ3VsYXIudWkuSVVybFJvdXRlclByb3ZpZGVyKSA9PiB7XG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL2F1dGhvcicpXG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2F1dGhvcicsIHtcbiAgICAgICAgdXJsOiAnL2F1dGhvcicsXG4gICAgICAgIHRlbXBsYXRlOiAnPGF1dGhvcj48L2F1dGhvcj4nXG4gICAgICB9KVxuICB9KVxuICBtLmNvbmZpZygoJGxvY2FsU3RvcmFnZVByb3ZpZGVyKSA9PiB7XG4gICAgJGxvY2FsU3RvcmFnZVByb3ZpZGVyLnNldEtleVByZWZpeCgnZmlicmEtJyk7XG4gIH0pXG4gIG0udmFsdWUoJ3dvcmtlclNlcnZpY2VDb25maWd1cmF0aW9uJywge1xuICAgIGFwcE5hbWU6ICdmaWJyYScsXG4gICAgd29ya2VyVGhyZWFkczogOCxcbiAgICBpbXBvcnRTY3JpcHRzOiBbXG4gICAgICAnYm93ZXJfY29tcG9uZW50cy9hbmd1bGFyL2FuZ3VsYXIubWluLmpzJyxcbiAgICAgICdib3dlcl9jb21wb25lbnRzL2FuZ3VsYXItaHR0cC1hdXRoL3NyYy9odHRwLWF1dGgtaW50ZXJjZXB0b3IuanMnLFxuICAgICAgJ2Jvd2VyX2NvbXBvbmVudHMvYW5ndWxhci1zcGFycWwtc2VydmljZS9kaXN0L3NwYXJxbC1zZXJ2aWNlLmpzJyxcbiAgICAgICdzY3JpcHRzL2FwcC1jb25maWd1cmF0aW9uLXdvcmtlci5qcycsXG4gICAgICAnc2NyaXB0cy9hcHAtY29uZmlndXJhdGlvbi1jb21tb24uanMnLFxuICAgICAgJ3NjcmlwdHMvd29ya2VyLXNlcnZpY2UuanMnLFxuICAgICAgJ3NjcmlwdHMvY29uZmlndXJhdGlvbi1zZXJ2aWNlLmpzJyxcbiAgICAgICdzY3JpcHRzL2NvbGxlY3Rpb24tdXRpbHMuanMnLFxuICAgICAgJ3NjcmlwdHMvcmRmLmpzJyxcbiAgICAgICdzY3JpcHRzL3NwYXJxbC1pdGVtLXNlcnZpY2UuanMnLFxuICAgICAgJ3NjcmlwdHMvc3BhcnFsLWF1dG9jb21wbGV0ZS1zZXJ2aWNlLmpzJyxcbiAgICAgICdzY3JpcHRzL3NwYXJxbC10cmVlLXNlcnZpY2UuanMnLFxuICAgICAgJ3NjcmlwdHMvc3BhcnFsLXVwZGF0ZS1zZXJ2aWNlLmpzJyxcbiAgICAgICdzY3JpcHRzL3RyZWUtY29tcG9uZW50LmpzJ1xuICAgICAgXVxuICB9KVxuICBtLnJ1bigoJHJvb3RTY29wZTogSUF1dGhlbnRpY2F0aW9uUm9vdFNjb3BlU2VydmljZSwgJGxvY2FsU3RvcmFnZTogYW55LCAkaHR0cDogYW5ndWxhci5JSHR0cFNlcnZpY2UsIGF1dGhTZXJ2aWNlOiBhbmd1bGFyLmh0dHBBdXRoLklBdXRoU2VydmljZSwgd29ya2VyU2VydmljZTogV29ya2VyU2VydmljZSkgPT4ge1xuICAgICRyb290U2NvcGUuYXV0aEluZm8gPSB7XG4gICAgICBhdXRoT3BlbjogZmFsc2UsXG4gICAgICB1c2VybmFtZTogdW5kZWZpbmVkLFxuICAgICAgcGFzc3dvcmQ6IHVuZGVmaW5lZFxuICAgIH1cbiAgICBpZiAoJGxvY2FsU3RvcmFnZS5hdXRob3JpemF0aW9uKSB7XG4gICAgICAkaHR0cC5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vblsnQXV0aG9yaXphdGlvbiddID0gJGxvY2FsU3RvcmFnZS5hdXRob3JpemF0aW9uXG4gICAgICB3b3JrZXJTZXJ2aWNlLiRicm9hZGNhc3QoJ21haW46YXV0aC1sb2dpbkF1dGhJbmZvJywgJGxvY2FsU3RvcmFnZS5hdXRob3JpemF0aW9uKVxuICAgIH1cbiAgICAkcm9vdFNjb3BlLnNldEF1dGggPSAoKSA9PiB7XG4gICAgICAkcm9vdFNjb3BlLmF1dGhJbmZvLmF1dGhPcGVuID0gZmFsc2VcbiAgICAgICRsb2NhbFN0b3JhZ2UuYXV0aG9yaXphdGlvbiA9ICdCYXNpYyAnICsgYnRvYSgkcm9vdFNjb3BlLmF1dGhJbmZvLnVzZXJuYW1lICsgJzonICsgJHJvb3RTY29wZS5hdXRoSW5mby5wYXNzd29yZClcbiAgICAgICRodHRwLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uWydBdXRob3JpemF0aW9uJ10gPSAkbG9jYWxTdG9yYWdlLmF1dGhvcml6YXRpb25cbiAgICAgIHdvcmtlclNlcnZpY2UuJGJyb2FkY2FzdCgnbWFpbjphdXRoLWxvZ2luQXV0aEluZm8nLCAkbG9jYWxTdG9yYWdlLmF1dGhvcml6YXRpb24pXG4gICAgICBhdXRoU2VydmljZS5sb2dpbkNvbmZpcm1lZCgpXG4gICAgfVxuICAgICRyb290U2NvcGUuZGlzbWlzc0F1dGggPSAoKSA9PiB7XG4gICAgICAkcm9vdFNjb3BlLmF1dGhJbmZvLmF1dGhPcGVuID0gZmFsc2VcbiAgICAgIGF1dGhTZXJ2aWNlLmxvZ2luQ2FuY2VsbGVkKHtzdGF0dXM6IDQwMX0sICdBdXRoZW50aWNhdGlvbiByZXF1aXJlZCcpXG4gICAgfVxuICAgICRyb290U2NvcGUuJG9uKCdldmVudDphdXRoLWxvZ2luUmVxdWlyZWQnLCAoKSA9PiAkcm9vdFNjb3BlLmF1dGhJbmZvLmF1dGhPcGVuID0gdHJ1ZSlcbiAgfSlcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

var fibra;
(function (fibra) {
    'use strict';
    var m = angular.module('fibra');
    m.service('workerServicePrototypeMappingConfiguration', function () {
        return {
            'Object': Object.prototype,
            'Configuration': fibra.Configuration.prototype,
            'NamedNode': fibra.NamedNode.prototype,
            'SparqlBindingNode': fibra.SparqlBindingNode.prototype,
            'DataModelConfiguration': fibra.DataModelConfiguration.prototype,
            'Item': fibra.Item.prototype,
            'PropertyToValues': fibra.PropertyToValues.prototype,
            'NodePlusLabel': fibra.NodePlusLabel.prototype
        };
    });
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvYXBwLWNvbmZpZ3VyYXRpb24tY29tbW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQVUsS0FBSyxDQWdCZDtBQWhCRCxXQUFVLEtBQUssRUFBQyxDQUFDO0lBQ2YsWUFBWSxDQUFBO0lBQ1osSUFBSSxDQUFDLEdBQW9CLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7SUFFaEQsQ0FBQyxDQUFDLE9BQU8sQ0FBQyw0Q0FBNEMsRUFBRTtRQUN0RCxNQUFNLENBQUM7WUFDTCxRQUFRLEVBQUUsTUFBTSxDQUFDLFNBQVM7WUFDMUIsZUFBZSxFQUFFLG1CQUFhLENBQUMsU0FBUztZQUN4QyxXQUFXLEVBQUUsZUFBUyxDQUFDLFNBQVM7WUFDaEMsbUJBQW1CLEVBQUUsdUJBQWlCLENBQUMsU0FBUztZQUNoRCx3QkFBd0IsRUFBRSw0QkFBc0IsQ0FBQyxTQUFTO1lBQzFELE1BQU0sRUFBRSxVQUFJLENBQUMsU0FBUztZQUN0QixrQkFBa0IsRUFBRSxzQkFBZ0IsQ0FBQyxTQUFTO1lBQzlDLGVBQWUsRUFBRSxtQkFBYSxDQUFDLFNBQVM7U0FDekMsQ0FBQTtJQUNILENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxFQWhCUyxLQUFLLEtBQUwsS0FBSyxRQWdCZCIsImZpbGUiOiJzY3JpcHRzL2FwcC1jb25maWd1cmF0aW9uLWNvbW1vbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBmaWJyYSB7XG4gICd1c2Ugc3RyaWN0J1xuICBsZXQgbTogYW5ndWxhci5JTW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2ZpYnJhJylcblxuICBtLnNlcnZpY2UoJ3dvcmtlclNlcnZpY2VQcm90b3R5cGVNYXBwaW5nQ29uZmlndXJhdGlvbicsIGZ1bmN0aW9uKCk6IHt9IHtcbiAgICByZXR1cm4ge1xuICAgICAgJ09iamVjdCc6IE9iamVjdC5wcm90b3R5cGUsXG4gICAgICAnQ29uZmlndXJhdGlvbic6IENvbmZpZ3VyYXRpb24ucHJvdG90eXBlLFxuICAgICAgJ05hbWVkTm9kZSc6IE5hbWVkTm9kZS5wcm90b3R5cGUsXG4gICAgICAnU3BhcnFsQmluZGluZ05vZGUnOiBTcGFycWxCaW5kaW5nTm9kZS5wcm90b3R5cGUsXG4gICAgICAnRGF0YU1vZGVsQ29uZmlndXJhdGlvbic6IERhdGFNb2RlbENvbmZpZ3VyYXRpb24ucHJvdG90eXBlLFxuICAgICAgJ0l0ZW0nOiBJdGVtLnByb3RvdHlwZSxcbiAgICAgICdQcm9wZXJ0eVRvVmFsdWVzJzogUHJvcGVydHlUb1ZhbHVlcy5wcm90b3R5cGUsXG4gICAgICAnTm9kZVBsdXNMYWJlbCc6IE5vZGVQbHVzTGFiZWwucHJvdG90eXBlXG4gICAgfVxuICB9KVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

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
            var type = new fibra.PropertyToValues(fibra.RDF.type);
            type.values.push(new fibra.NodePlusLabel(item.additionalInformation['type'][0], item.additionalInformation['typeLabel'][0]));
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvYXV0aG9yLWNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFVLEtBQUssQ0E4Q2Q7QUE5Q0QsV0FBVSxLQUFLLEVBQUMsQ0FBQztJQUNmLFlBQVksQ0FBQTtJQUVaO1FBQ0UsK0JBQW1CLFFBQWdCLEVBQVMsYUFBcUI7WUFBOUMsYUFBUSxHQUFSLFFBQVEsQ0FBUTtZQUFTLGtCQUFhLEdBQWIsYUFBYSxDQUFRO1FBQUcsQ0FBQztRQUN2RSw0QkFBQztJQUFELENBRkEsQUFFQyxJQUFBO0lBRUQ7UUFrQkUsbUNBQW9CLG9CQUEwQyxFQUNsRCxpQkFBb0MsRUFDNUIsaUJBQW9DLEVBQ3BDLFlBQTBCO1lBckJoRCxpQkFpQ0M7WUFmcUIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtZQUUxQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1lBQ3BDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1lBQzVDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSx1QkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO1lBQzlKLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxLQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsRUFBbEIsQ0FBa0IsQ0FBQyxDQUFBO1lBRW5ELElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRTtnQkFDN0IsS0FBSSxDQUFDLGdCQUFnQixHQUFHLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxLQUFJLENBQUMsb0JBQW9CLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLHVCQUFpQixDQUFDLGlCQUFpQixDQUFDLENBQUE7Z0JBQzlKLE1BQU0sQ0FBQyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQztvQkFDakMsS0FBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUE7b0JBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUE7Z0JBQ2IsQ0FBQyxDQUFDLENBQUE7WUFDSixDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUM7UUExQk0sOENBQVUsR0FBakIsVUFBa0IsSUFBWTtZQUE5QixpQkFVQztZQVRDLElBQUksU0FBUyxHQUFxQixJQUFJLHNCQUFnQixDQUFDLFVBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtZQUN0RSxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7WUFDckMsSUFBSSxJQUFJLEdBQXFCLElBQUksc0JBQWdCLENBQUMsU0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQzNELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksbUJBQWEsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUN0SCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQTtZQUM1RSxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUNSLEtBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1lBQ3RDLENBQUMsQ0FBQyxDQUFBO1lBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQTtRQUNiLENBQUM7UUFpQkgsZ0NBQUM7SUFBRCxDQWpDQSxBQWlDQyxJQUFBO0lBakNZLCtCQUF5Qiw0QkFpQ3JDLENBQUE7SUFFRDtRQUFBO1lBQ1csZUFBVSxHQUFhLHlCQUF5QixDQUFBO1lBQ2hELGdCQUFXLEdBQVcsc0JBQXNCLENBQUE7UUFDdkQsQ0FBQztRQUFELHNCQUFDO0lBQUQsQ0FIQSxBQUdDLElBQUE7SUFIWSxxQkFBZSxrQkFHM0IsQ0FBQTtBQUNILENBQUMsRUE5Q1MsS0FBSyxLQUFMLEtBQUssUUE4Q2QiLCJmaWxlIjoic2NyaXB0cy9hdXRob3ItY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIGZpYnJhIHtcbiAgJ3VzZSBzdHJpY3QnXG5cbiAgY2xhc3MgVHJlZVZpZXdDb25maWd1cmF0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZW5kcG9pbnQ6IHN0cmluZywgcHVibGljIHF1ZXJ5VGVtcGxhdGU6IHN0cmluZykge31cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBBdXRob3JDb21wb25lbnRDb250cm9sbGVyIHtcblxuICAgIHB1YmxpYyBjbGFzc1RyZWU6IFRyZWVOb2RlW11cbiAgICBwdWJsaWMgY2xhc3NUcmVlUHJvbWlzZTogYW5ndWxhci5JUHJvbWlzZTxUcmVlTm9kZVtdPlxuICAgIHB1YmxpYyBzZWxlY3RlZEl0ZW06IElOb2RlXG5cbiAgICBwdWJsaWMgY3JlYXRlSXRlbShpdGVtOiBSZXN1bHQpOiBhbmd1bGFyLklQcm9taXNlPElOb2RlPiB7XG4gICAgICBsZXQgcHJlZkxhYmVsOiBQcm9wZXJ0eVRvVmFsdWVzID0gbmV3IFByb3BlcnR5VG9WYWx1ZXMoU0tPUy5wcmVmTGFiZWwpXG4gICAgICBwcmVmTGFiZWwudmFsdWVzLnB1c2goaXRlbS5wcmVmTGFiZWwpXG4gICAgICBsZXQgdHlwZTogUHJvcGVydHlUb1ZhbHVlcyA9IG5ldyBQcm9wZXJ0eVRvVmFsdWVzKFJERi50eXBlKVxuICAgICAgdHlwZS52YWx1ZXMucHVzaChuZXcgTm9kZVBsdXNMYWJlbChpdGVtLmFkZGl0aW9uYWxJbmZvcm1hdGlvblsndHlwZSddWzBdLCBpdGVtLmFkZGl0aW9uYWxJbmZvcm1hdGlvblsndHlwZUxhYmVsJ11bMF0pKVxuICAgICAgbGV0IHByb20gPSB0aGlzLnNwYXJxbEl0ZW1TZXJ2aWNlLmNyZWF0ZU5ld0l0ZW0oaXRlbS5pZHMsIFtwcmVmTGFiZWwsIHR5cGVdKVxuICAgICAgcHJvbS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5maWJyYVNlcnZpY2UuZGlzcGF0Y2goJ2NoYW5nZScpXG4gICAgICB9KVxuICAgICAgcmV0dXJuIHByb21cbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZ3VyYXRpb25TZXJ2aWNlOiBDb25maWd1cmF0aW9uU2VydmljZSxcbiAgICAgICAgICAgICAgICBzcGFycWxUcmVlU2VydmljZTogU3BhcnFsVHJlZVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBzcGFycWxJdGVtU2VydmljZTogU3BhcnFsSXRlbVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBmaWJyYVNlcnZpY2U6IEZpYnJhU2VydmljZSkge1xuICAgICAgdGhpcy5jbGFzc1RyZWVQcm9taXNlID0gc3BhcnFsVHJlZVNlcnZpY2UuZ2V0VHJlZSh0aGlzLmNvbmZpZ3VyYXRpb25TZXJ2aWNlLmNvbmZpZ3VyYXRpb24ucHJpbWFyeUVuZHBvaW50LmVuZHBvaW50LnZhbHVlLCBTcGFycWxUcmVlU2VydmljZS5nZXRDbGFzc1RyZWVRdWVyeSlcbiAgICAgIHRoaXMuY2xhc3NUcmVlUHJvbWlzZS50aGVuKGMgPT4gdGhpcy5jbGFzc1RyZWUgPSBjKVxuXG4gICAgICB0aGlzLmZpYnJhU2VydmljZS5vbignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgICB0aGlzLmNsYXNzVHJlZVByb21pc2UgPSBzcGFycWxUcmVlU2VydmljZS5nZXRUcmVlKHRoaXMuY29uZmlndXJhdGlvblNlcnZpY2UuY29uZmlndXJhdGlvbi5wcmltYXJ5RW5kcG9pbnQuZW5kcG9pbnQudmFsdWUsIFNwYXJxbFRyZWVTZXJ2aWNlLmdldENsYXNzVHJlZVF1ZXJ5KVxuICAgICAgICByZXR1cm4gdGhpcy5jbGFzc1RyZWVQcm9taXNlLnRoZW4oYyA9PiB7XG4gICAgICAgICAgdGhpcy5jbGFzc1RyZWUgPSBjXG4gICAgICAgICAgcmV0dXJuICdvaydcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIEF1dGhvckNvbXBvbmVudCBpbXBsZW1lbnRzIGFuZ3VsYXIuSUNvbXBvbmVudE9wdGlvbnMge1xuICAgICAgcHVibGljIGNvbnRyb2xsZXI6IEZ1bmN0aW9uID0gQXV0aG9yQ29tcG9uZW50Q29udHJvbGxlclxuICAgICAgcHVibGljIHRlbXBsYXRlVXJsOiBzdHJpbmcgPSAncGFydGlhbHMvYXV0aG9yLmh0bWwnXG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

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
            this.authorityEndpoints = [];
            this.archiveEndpoints = [];
            this.globalDataModelConfiguration = new DataModelConfiguration();
            this.deleteItemQuery = fibra.SparqlItemService.deleteItemQuery;
        }
        Configuration.prototype.allEndpoints = function () {
            var allEndpoints = this.archiveEndpoints.concat(this.authorityEndpoints);
            allEndpoints.push(this.primaryEndpoint);
            return allEndpoints;
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
            this.autocompletionQueryTemplate = fibra.SparqlAutocompleteService.queryTemplate;
            this.treeQueryTemplate = fibra.SparqlTreeService.getClassTreeQuery;
            this.itemQueryTemplate = fibra.SparqlItemService.getItemPropertiesQuery;
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
            c.authorityEndpoints = [
                // ULAN endpoint is not standards compliant, needs further tweaking new EndpointConfiguration('ulan', 'ULAN', new NamedNode('http://ldf.fi/corsproxy/vocab.getty.edu/sparql.json')),
                new EndpointConfiguration('geonames', 'GeoNames', new fibra.NamedNode('http://ldf.fi/geonames/sparql')),
                new EndpointConfiguration('viaf', 'VIAF', new fibra.NamedNode('http://ldf.fi/viaf-labels/sparql')),
            ];
            c.archiveEndpoints = [
                new EndpointConfiguration('sdfb', 'Six Degrees of Francis Bacon', new fibra.NamedNode('http://ldf.fi/sdfb/sparql'), [fibra.CIDOC.Person, fibra.CIDOC.Place]),
                new EndpointConfiguration('emlo', 'EMLO', new fibra.NamedNode('http://ldf.fi/emlo/sparql'), [fibra.CIDOC.Person, fibra.CIDOC.Place]),
                new EndpointConfiguration('procope', 'Procope', new fibra.NamedNode('http://ldf.fi/procope/sparql'), [fibra.CIDOC.Person, fibra.CIDOC.Place]),
                new EndpointConfiguration('schoenberg', 'Schoenberg', new fibra.NamedNode('http://ldf.fi/schoenberg/sparql'), [fibra.CIDOC.Person, fibra.CIDOC.Place]),
            ];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvY29uZmlndXJhdGlvbi1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBVSxLQUFLLENBeUZkO0FBekZELFdBQVUsS0FBSyxFQUFDLENBQUM7SUFDZixZQUFZLENBQUE7SUFFVjtRQUFBO1lBR1MsdUJBQWtCLEdBQTRCLEVBQUUsQ0FBQTtZQUNoRCxxQkFBZ0IsR0FBNEIsRUFBRSxDQUFBO1lBQzlDLGlDQUE0QixHQUEyQixJQUFJLHNCQUFzQixFQUFFLENBQUE7WUFLbkYsb0JBQWUsR0FBVyx1QkFBaUIsQ0FBQyxlQUFlLENBQUE7UUFNcEUsQ0FBQztRQUxRLG9DQUFZLEdBQW5CO1lBQ0UsSUFBSSxZQUFZLEdBQTRCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUE7WUFDakcsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUE7WUFDdkMsTUFBTSxDQUFDLFlBQVksQ0FBQTtRQUNyQixDQUFDO1FBQ0gsb0JBQUM7SUFBRCxDQWhCQSxBQWdCQyxJQUFBO0lBaEJZLG1CQUFhLGdCQWdCekIsQ0FBQTtJQUVEO1FBS0UsK0JBQW1CLEVBQVUsRUFBUyxLQUFhLEVBQVMsUUFBZSxFQUFFLGFBQTJCO1lBQTNCLDZCQUEyQixHQUEzQixrQkFBMkI7WUFBckYsT0FBRSxHQUFGLEVBQUUsQ0FBUTtZQUFTLFVBQUssR0FBTCxLQUFLLENBQVE7WUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFPO1lBSnBFLGdDQUEyQixHQUFXLCtCQUF5QixDQUFDLGFBQWEsQ0FBQTtZQUM3RSxzQkFBaUIsR0FBVyx1QkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQTtZQUMvRCxzQkFBaUIsR0FBVyx1QkFBaUIsQ0FBQyxzQkFBc0IsQ0FBQTtZQUNwRSwyQkFBc0IsR0FBMkIsSUFBSSxzQkFBc0IsRUFBRSxDQUFBO1lBRWxGLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsQ0FBQTtRQUM3RCxDQUFDO1FBQ0gsNEJBQUM7SUFBRCxDQVJBLEFBUUMsSUFBQTtJQVJZLDJCQUFxQix3QkFRakMsQ0FBQTtJQUVEO1FBQWtELGdEQUFxQjtRQUNyRSxzQ0FBWSxFQUFVLEVBQUUsS0FBYSxFQUFFLFFBQWUsRUFBUyxjQUFnQztZQUF2Qyw4QkFBdUMsR0FBdkMseUJBQXVDO1lBQzdGLGtCQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUE7WUFEbUMsbUJBQWMsR0FBZCxjQUFjLENBQWtCO1FBRS9GLENBQUM7UUFDSCxtQ0FBQztJQUFELENBSkEsQUFJQyxDQUppRCxxQkFBcUIsR0FJdEU7SUFKWSxrQ0FBNEIsK0JBSXhDLENBQUE7SUFFRDtRQUFBO1lBQ1Msb0JBQWUsR0FBVyxFQUFFLENBQUE7WUFDNUIsYUFBUSxHQUFlLEVBQUUsQ0FBQTtZQUN6QixrQkFBYSxHQUFZLEVBQUUsQ0FBQTtZQUMzQixlQUFVLEdBQVksRUFBRSxDQUFBO1lBQ3hCLHVCQUFrQixHQUFZLEVBQUUsQ0FBQTtZQUNoQyx3QkFBbUIsR0FBb0MsRUFBRSxDQUFBO1lBQ3pELGdCQUFXLEdBQW9DLEVBQUUsQ0FBQTtRQVcxRCxDQUFDO1FBVlEsaURBQWdCLEdBQXZCLFVBQXdCLGFBQXNCO1lBQzVDLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFBO1lBQ2xDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQTtRQUNyQixDQUFDO1FBQ08sNkNBQVksR0FBcEI7WUFDRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFBO1lBQzNCLElBQUk7Z0JBQ0YsSUFBSSxDQUFDLGVBQWUsR0FBRyx1QkFBdUIsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxVQUFBLEVBQUUsSUFBSSxPQUFBLEVBQUUsQ0FBQyxXQUFXLEVBQUUsRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUE7UUFDckgsQ0FBQztRQUNILDZCQUFDO0lBQUQsQ0FsQkEsQUFrQkMsSUFBQTtJQWxCWSw0QkFBc0IseUJBa0JsQyxDQUFBO0lBRUg7UUFFRSw4QkFBWSxhQUE0QjtZQURqQyxrQkFBYSxHQUFrQixJQUFJLGFBQWEsRUFBRSxDQUFBO1lBRXZELElBQUksQ0FBQyxHQUFrQixJQUFJLENBQUMsYUFBYSxDQUFBO1lBQ3pDLENBQUMsQ0FBQyxlQUFlLEdBQUcsSUFBSSw0QkFBNEIsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksZUFBUyxDQUFDLDRCQUE0QixDQUFDLEVBQUUsSUFBSSxlQUFTLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFBO1lBQ2hLLENBQUMsQ0FBQyxrQkFBa0IsR0FBRztnQkFDckIsb0xBQW9MO2dCQUNwTCxJQUFJLHFCQUFxQixDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsSUFBSSxlQUFTLENBQUMsK0JBQStCLENBQUMsQ0FBQztnQkFDakcsSUFBSSxxQkFBcUIsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksZUFBUyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7YUFFN0YsQ0FBQTtZQUNELENBQUMsQ0FBQyxnQkFBZ0IsR0FBRztnQkFDbkIsSUFBSSxxQkFBcUIsQ0FBQyxNQUFNLEVBQUUsOEJBQThCLEVBQUUsSUFBSSxlQUFTLENBQUMsMkJBQTJCLENBQUMsRUFBRSxDQUFDLFdBQUssQ0FBQyxNQUFNLEVBQUUsV0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMxSSxJQUFJLHFCQUFxQixDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxlQUFTLENBQUMsMkJBQTJCLENBQUMsRUFBRSxDQUFDLFdBQUssQ0FBQyxNQUFNLEVBQUUsV0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNsSCxJQUFJLHFCQUFxQixDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsSUFBSSxlQUFTLENBQUMsOEJBQThCLENBQUMsRUFBRSxDQUFDLFdBQUssQ0FBQyxNQUFNLEVBQUUsV0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMzSCxJQUFJLHFCQUFxQixDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsSUFBSSxlQUFTLENBQUMsaUNBQWlDLENBQUMsRUFBRSxDQUFDLFdBQUssQ0FBQyxNQUFNLEVBQUUsV0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3JJLENBQUE7WUFDRCxDQUFDLENBQUMsVUFBVSxHQUFHLHNCQUFzQixDQUFBO1lBQ3JDLENBQUMsQ0FBQyxhQUFhLEdBQUcsMkJBQTJCLENBQUE7WUFDN0MsQ0FBQyxDQUFDLFFBQVEsR0FBRyw2QkFBNkIsQ0FBQTtZQUMxQyxDQUFDLENBQUMsV0FBVyxHQUFHLDZCQUE2QixDQUFBO1lBQzdDLGFBQWEsQ0FBQyxPQUFPLENBQUMsNEJBQTRCLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzlFLENBQUM7UUFDSCwyQkFBQztJQUFELENBdkJBLEFBdUJDLElBQUE7SUF2QlksMEJBQW9CLHVCQXVCaEMsQ0FBQTtJQUVEO1FBQUE7UUFLQSxDQUFDO1FBSFEscURBQWdCLEdBQXZCLFVBQXdCLGFBQTRCO1lBQ2xELElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFBO1FBQ3BDLENBQUM7UUFDSCxpQ0FBQztJQUFELENBTEEsQUFLQyxJQUFBO0lBTFksZ0NBQTBCLDZCQUt0QyxDQUFBO0FBRUgsQ0FBQyxFQXpGUyxLQUFLLEtBQUwsS0FBSyxRQXlGZCIsImZpbGUiOiJzY3JpcHRzL2NvbmZpZ3VyYXRpb24tc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBmaWJyYSB7XG4gICd1c2Ugc3RyaWN0J1xuXG4gICAgZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRpb24ge1xuICAgICAgcHVibGljIHByZWZlcnJlZExhbmd1YWdlOiBzdHJpbmdcbiAgICAgIHB1YmxpYyBwcmltYXJ5RW5kcG9pbnQ6IFByaW1hcnlFbmRwb2ludENvbmZpZ3VyYXRpb25cbiAgICAgIHB1YmxpYyBhdXRob3JpdHlFbmRwb2ludHM6IEVuZHBvaW50Q29uZmlndXJhdGlvbltdID0gW11cbiAgICAgIHB1YmxpYyBhcmNoaXZlRW5kcG9pbnRzOiBFbmRwb2ludENvbmZpZ3VyYXRpb25bXSA9IFtdXG4gICAgICBwdWJsaWMgZ2xvYmFsRGF0YU1vZGVsQ29uZmlndXJhdGlvbjogRGF0YU1vZGVsQ29uZmlndXJhdGlvbiA9IG5ldyBEYXRhTW9kZWxDb25maWd1cmF0aW9uKClcbiAgICAgIHB1YmxpYyBpbnN0YW5jZU5TOiBzdHJpbmdcbiAgICAgIHB1YmxpYyBpbnN0YW5jZUdyYXBoOiBzdHJpbmdcbiAgICAgIHB1YmxpYyBzY2hlbWFOUzogc3RyaW5nXG4gICAgICBwdWJsaWMgc2NoZW1hR3JhcGg6IHN0cmluZ1xuICAgICAgcHVibGljIGRlbGV0ZUl0ZW1RdWVyeTogc3RyaW5nID0gU3BhcnFsSXRlbVNlcnZpY2UuZGVsZXRlSXRlbVF1ZXJ5XG4gICAgICBwdWJsaWMgYWxsRW5kcG9pbnRzKCk6IEVuZHBvaW50Q29uZmlndXJhdGlvbltdIHtcbiAgICAgICAgbGV0IGFsbEVuZHBvaW50czogRW5kcG9pbnRDb25maWd1cmF0aW9uW10gPSB0aGlzLmFyY2hpdmVFbmRwb2ludHMuY29uY2F0KHRoaXMuYXV0aG9yaXR5RW5kcG9pbnRzKVxuICAgICAgICBhbGxFbmRwb2ludHMucHVzaCh0aGlzLnByaW1hcnlFbmRwb2ludClcbiAgICAgICAgcmV0dXJuIGFsbEVuZHBvaW50c1xuICAgICAgfVxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBFbmRwb2ludENvbmZpZ3VyYXRpb24ge1xuICAgICAgcHVibGljIGF1dG9jb21wbGV0aW9uUXVlcnlUZW1wbGF0ZTogc3RyaW5nID0gU3BhcnFsQXV0b2NvbXBsZXRlU2VydmljZS5xdWVyeVRlbXBsYXRlXG4gICAgICBwdWJsaWMgdHJlZVF1ZXJ5VGVtcGxhdGU6IHN0cmluZyA9IFNwYXJxbFRyZWVTZXJ2aWNlLmdldENsYXNzVHJlZVF1ZXJ5XG4gICAgICBwdWJsaWMgaXRlbVF1ZXJ5VGVtcGxhdGU6IHN0cmluZyA9IFNwYXJxbEl0ZW1TZXJ2aWNlLmdldEl0ZW1Qcm9wZXJ0aWVzUXVlcnlcbiAgICAgIHB1YmxpYyBkYXRhTW9kZWxDb25maWd1cmF0aW9uOiBEYXRhTW9kZWxDb25maWd1cmF0aW9uID0gbmV3IERhdGFNb2RlbENvbmZpZ3VyYXRpb24oKVxuICAgICAgY29uc3RydWN0b3IocHVibGljIGlkOiBzdHJpbmcsIHB1YmxpYyB0aXRsZTogc3RyaW5nLCBwdWJsaWMgZW5kcG9pbnQ6IElOb2RlLCBzZWxlY3RlZFR5cGVzOiBJTm9kZVtdID0gW10pIHtcbiAgICAgICAgdGhpcy5kYXRhTW9kZWxDb25maWd1cmF0aW9uLnNldFNlbGVjdGVkVHlwZXMoc2VsZWN0ZWRUeXBlcylcbiAgICAgIH1cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgUHJpbWFyeUVuZHBvaW50Q29uZmlndXJhdGlvbiBleHRlbmRzIEVuZHBvaW50Q29uZmlndXJhdGlvbiB7XG4gICAgICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nLCB0aXRsZTogc3RyaW5nLCBlbmRwb2ludDogSU5vZGUsIHB1YmxpYyB1cGRhdGVFbmRwb2ludDogSU5vZGUgPSBlbmRwb2ludCkge1xuICAgICAgICBzdXBlcihpZCwgdGl0bGUsIGVuZHBvaW50KVxuICAgICAgfVxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBEYXRhTW9kZWxDb25maWd1cmF0aW9uIHtcbiAgICAgIHB1YmxpYyB0eXBlQ29uc3RyYWludHM6IHN0cmluZyA9ICcnXG4gICAgICBwdWJsaWMgdHlwZVRyZWU6IFRyZWVOb2RlW10gPSBbXVxuICAgICAgcHVibGljIHNlbGVjdGVkVHlwZXM6IElOb2RlW10gPSBbXVxuICAgICAgcHVibGljIHByb3BlcnRpZXM6IElOb2RlW10gPSBbXVxuICAgICAgcHVibGljIHNlbGVjdGVkUHJvcGVydGllczogSU5vZGVbXSA9IFtdXG4gICAgICBwdWJsaWMgcHJvcGVydHlQcm9wZXJ0eU1hcDoge1tpZDogc3RyaW5nXTogSVNvdXJjZWROb2RlW10gfSA9IHt9XG4gICAgICBwdWJsaWMgdHlwZVR5cGVNYXA6IHtbaWQ6IHN0cmluZ106IElTb3VyY2VkTm9kZVtdIH0gPSB7fVxuICAgICAgcHVibGljIHNldFNlbGVjdGVkVHlwZXMoc2VsZWN0ZWRUeXBlczogSU5vZGVbXSk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbGVjdGVkVHlwZXMgPSBzZWxlY3RlZFR5cGVzXG4gICAgICAgIHRoaXMudXBkYXRlRmlsdGVyKClcbiAgICAgIH1cbiAgICAgIHByaXZhdGUgdXBkYXRlRmlsdGVyKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFR5cGVzLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICB0aGlzLnR5cGVDb25zdHJhaW50cyA9ICcnXG4gICAgICAgIGVsc2VcbiAgICAgICAgICB0aGlzLnR5cGVDb25zdHJhaW50cyA9ICdGSUxURVIgKD9ncm91cElkIElOICgnICsgdGhpcy5zZWxlY3RlZFR5cGVzLm1hcChpZCA9PiBpZC50b0Nhbm9uaWNhbCgpKS5qb2luKCcsICcpICsgJykpJ1xuICAgICAgfVxuICAgIH1cblxuICBleHBvcnQgY2xhc3MgQ29uZmlndXJhdGlvblNlcnZpY2Uge1xuICAgIHB1YmxpYyBjb25maWd1cmF0aW9uOiBDb25maWd1cmF0aW9uID0gbmV3IENvbmZpZ3VyYXRpb24oKVxuICAgIGNvbnN0cnVjdG9yKHdvcmtlclNlcnZpY2U6IFdvcmtlclNlcnZpY2UpIHtcbiAgICAgIGxldCBjOiBDb25maWd1cmF0aW9uID0gdGhpcy5jb25maWd1cmF0aW9uXG4gICAgICBjLnByaW1hcnlFbmRwb2ludCA9IG5ldyBQcmltYXJ5RW5kcG9pbnRDb25maWd1cmF0aW9uKCdsb2NhbCcsICdMb2NhbCcsIG5ldyBOYW1lZE5vZGUoJ2h0dHA6Ly9sZGYuZmkvZmlicmEvc3BhcnFsJyksIG5ldyBOYW1lZE5vZGUoJ2h0dHA6Ly9sZGYuZmkvZmlicmEvc3BhcnFsJykpXG4gICAgICBjLmF1dGhvcml0eUVuZHBvaW50cyA9IFtcbiAgICAgICAgLy8gVUxBTiBlbmRwb2ludCBpcyBub3Qgc3RhbmRhcmRzIGNvbXBsaWFudCwgbmVlZHMgZnVydGhlciB0d2Vha2luZyBuZXcgRW5kcG9pbnRDb25maWd1cmF0aW9uKCd1bGFuJywgJ1VMQU4nLCBuZXcgTmFtZWROb2RlKCdodHRwOi8vbGRmLmZpL2NvcnNwcm94eS92b2NhYi5nZXR0eS5lZHUvc3BhcnFsLmpzb24nKSksXG4gICAgICAgIG5ldyBFbmRwb2ludENvbmZpZ3VyYXRpb24oJ2dlb25hbWVzJywgJ0dlb05hbWVzJywgbmV3IE5hbWVkTm9kZSgnaHR0cDovL2xkZi5maS9nZW9uYW1lcy9zcGFycWwnKSksXG4gICAgICAgIG5ldyBFbmRwb2ludENvbmZpZ3VyYXRpb24oJ3ZpYWYnLCAnVklBRicsIG5ldyBOYW1lZE5vZGUoJ2h0dHA6Ly9sZGYuZmkvdmlhZi1sYWJlbHMvc3BhcnFsJykpLCAvLyBiaXJ0aC9kZWF0aCBkYXRlcyBub3QgeWV0IGxvYWRlZFxuICAgICAgICAvLyBub3QgeWV0IGxvYWRlZCBuZXcgRW5kcG9pbnRDb25maWd1cmF0aW9uKCdsY25hbWVzJywgJ0xDIE5hbWVzJywgbmV3IE5hbWVkTm9kZSgnaHR0cDovL2xkZi5maS9sY25hbWVzL3NwYXJxbCcpKVxuICAgICAgXVxuICAgICAgYy5hcmNoaXZlRW5kcG9pbnRzID0gW1xuICAgICAgICBuZXcgRW5kcG9pbnRDb25maWd1cmF0aW9uKCdzZGZiJywgJ1NpeCBEZWdyZWVzIG9mIEZyYW5jaXMgQmFjb24nLCBuZXcgTmFtZWROb2RlKCdodHRwOi8vbGRmLmZpL3NkZmIvc3BhcnFsJyksIFtDSURPQy5QZXJzb24sIENJRE9DLlBsYWNlXSksXG4gICAgICAgIG5ldyBFbmRwb2ludENvbmZpZ3VyYXRpb24oJ2VtbG8nLCAnRU1MTycsIG5ldyBOYW1lZE5vZGUoJ2h0dHA6Ly9sZGYuZmkvZW1sby9zcGFycWwnKSwgW0NJRE9DLlBlcnNvbiwgQ0lET0MuUGxhY2VdKSxcbiAgICAgICAgbmV3IEVuZHBvaW50Q29uZmlndXJhdGlvbigncHJvY29wZScsICdQcm9jb3BlJywgbmV3IE5hbWVkTm9kZSgnaHR0cDovL2xkZi5maS9wcm9jb3BlL3NwYXJxbCcpLCBbQ0lET0MuUGVyc29uLCBDSURPQy5QbGFjZV0pLFxuICAgICAgICBuZXcgRW5kcG9pbnRDb25maWd1cmF0aW9uKCdzY2hvZW5iZXJnJywgJ1NjaG9lbmJlcmcnLCBuZXcgTmFtZWROb2RlKCdodHRwOi8vbGRmLmZpL3NjaG9lbmJlcmcvc3BhcnFsJyksIFtDSURPQy5QZXJzb24sIENJRE9DLlBsYWNlXSksXG4gICAgICBdXG4gICAgICBjLmluc3RhbmNlTlMgPSAnaHR0cDovL2xkZi5maS9maWJyYS8nXG4gICAgICBjLmluc3RhbmNlR3JhcGggPSAnaHR0cDovL2xkZi5maS9maWJyYS9tYWluLydcbiAgICAgIGMuc2NoZW1hTlMgPSAnaHR0cDovL2xkZi5maS9maWJyYS9zY2hlbWEjJ1xuICAgICAgYy5zY2hlbWFHcmFwaCA9ICdodHRwOi8vbGRmLmZpL2ZpYnJhL3NjaGVtYSMnXG4gICAgICB3b3JrZXJTZXJ2aWNlLmNhbGxBbGwoJ2NvbmZpZ3VyYXRpb25Xb3JrZXJTZXJ2aWNlJywgJ3NldENvbmZpZ3VyYXRpb24nLCBbY10pXG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRpb25Xb3JrZXJTZXJ2aWNlIHtcbiAgICBwdWJsaWMgY29uZmlndXJhdGlvbjogQ29uZmlndXJhdGlvblxuICAgIHB1YmxpYyBzZXRDb25maWd1cmF0aW9uKGNvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRpb24pOiB2b2lkIHtcbiAgICAgIHRoaXMuY29uZmlndXJhdGlvbiA9IGNvbmZpZ3VyYXRpb25cbiAgICB9XG4gIH1cblxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

var fibra;
(function (fibra) {
    'use strict';
    var ExploreComponentController = (function () {
        function ExploreComponentController($element, $window, $scope, $timeout, sparqlItemService, fibraService, $q) {
            var _this = this;
            this.$element = $element;
            this.$window = $window;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.sparqlItemService = sparqlItemService;
            this.fibraService = fibraService;
            this.$q = $q;
            this.items = [];
            this.$postLink = function () {
                _this.svgSel = _this.$window.d3.select(_this.$element[0]).select('svg');
                // Create link g
                _this.svgSel.append('g').attr("class", "links");
                _this.forceSim = _this.d3.forceSimulation()
                    .force("charge", _this.d3.forceCollide(20))
                    .force("link", _this.d3.forceLink().distance(40).strength(1).iterations(1).id(function (d) { return d.index; }));
                _this.queryAndBuild();
            };
            this.fibraService.on('change', function () {
                return _this.queryAndBuild();
            });
            this.itemService = sparqlItemService;
            this.d3 = this.$window.d3;
            this.links = [];
        }
        ExploreComponentController.prototype.queryAndBuild = function () {
            var _this = this;
            return this.classTreePromise.then(function (ct) {
                return _this.itemService.getAllItems().then(function (items) {
                    // Merge items
                    _this.items = _this.mergeItems(_this.items, items);
                    _this.$q.all(items.map(function (it) {
                        return _this.sparqlItemService.getItem(it);
                    })).then(function (its) {
                        _this.links = _this.mergeLinks(_this.links, its);
                        _this.updateExplore();
                    });
                    _this.properties = _this.items[0].properties.map(function (p) {
                        return { key: p.toCanonical(), value: p.label.value };
                    });
                    return 'ok';
                }).then(_this.updateExplore.bind(_this));
            });
        };
        ExploreComponentController.prototype.mergeItems = function (oldItems, newItems) {
            var items = [].concat(oldItems);
            var j, i;
            for (i = 0; i < oldItems.length; i++) {
                for (j = 0; j < newItems.length; j++) {
                    if (oldItems[i].value === newItems[j].value) {
                        break;
                    }
                }
                if (j === newItems.length) {
                    // Old item is not in new items. Remove.
                    items.splice(items.indexOf(oldItems[i]), 1);
                }
            }
            // New item is not in old items. Add.
            for (j = 0; j < newItems.length; j++) {
                for (i = 0; i < oldItems.length; i++) {
                    if (oldItems[i].value === newItems[j].value) {
                        break;
                    }
                }
                if (i === oldItems.length) {
                    items.push(newItems[j]);
                }
            }
            return items;
        };
        ExploreComponentController.prototype.mergeLinks = function (oldLinks, newItems) {
            var newLinks = [];
            // Build our external item -> internal item mapping array.
            // This is temporary until we manage additional properties internally
            var internalItems = [];
            var _loop_1 = function(i) {
                internalItems[i] = this_1.items.filter(function (it) {
                    return newItems[i].value === it.value;
                })[0];
            };
            var this_1 = this;
            for (var i = 0; i < newItems.length; i++) {
                _loop_1(i);
            }
            // First build our sameAs mapping from value -> Item
            var sameAs = {};
            var _loop_2 = function(i) {
                sameAs[newItems[i].value] = internalItems[i] ? internalItems[i] : newItems[i];
                var sameAsProp = newItems[i].properties.filter(function (p) {
                    return p.label.value === 'same As';
                })[0];
                if (sameAsProp && sameAsProp.values) {
                    sameAsProp.values.forEach(function (n) { sameAs[n.value] = internalItems[i] ? internalItems[i] : newItems[i]; });
                }
            };
            for (var i = 0; i < newItems.length; i++) {
                _loop_2(i);
            }
            // Iterate over item property values to see if they match the id of any
            // of the items displayed. Also check if they match sameAs values...
            var _loop_3 = function(i) {
                newItems[i].properties.forEach(function (p) {
                    p.values.forEach(function (v) {
                        if (sameAs[v.value] && internalItems[i]) {
                            // Don't self-link
                            if (newItems[i] !== sameAs[v.value]) {
                                newLinks.push({
                                    source: internalItems[i],
                                    target: sameAs[v.value],
                                    property: p
                                });
                            }
                        }
                    });
                });
            };
            for (var i = 0; i < newItems.length; i++) {
                _loop_3(i);
            }
            return newLinks;
        };
        ExploreComponentController.prototype.updateExplore = function () {
            var _this = this;
            // allow item_info_tip to expand somehow
            // add delete and alter ability to sparql-item.pug
            //fix how links sit on top of nodes
            var d3 = this.d3;
            var viewport_width = window.innerWidth;
            var viewport_height = window.innerHeight;
            var searchbarwidth = d3.select("#searchbar").style("width").replace('px', '');
            var drawmode = false;
            // add shift to enable draw mode - this can easily be changed to require shift to be held
            this.$window.addEventListener('keydown', function (event) {
                if (document.activeElement instanceof HTMLBodyElement) {
                    if (event.keyCode === 16) {
                        drawmode = drawmode ? false : true;
                        _this.svgSel.style("background-color", drawmode ? "#d9d9d9" : "#F2F2F2");
                        if (drawmode) {
                            _this.svgSel.append("text")
                                .attr("id", "drawmodetext")
                                .html("Draw Mode engaged; to link two nodes, drag from one to the other")
                                .style("stroke", "red")
                                .attr("y", 100);
                        }
                        else {
                            d3.select("#drawmodetext").remove();
                            d3.selectAll(".dragLine").remove();
                        }
                    }
                    else if (event.keyCode === 49) {
                        console.log(_this.links);
                    }
                    else if (event.keyCode === 50) {
                        console.log(_this.items);
                    }
                }
            });
            d3.select("#explorecontainer").style('width', viewport_width + "px")
                .style("height", viewport_height - 36 + "px");
            // dbl click to add - incomplete/broken
            this.svgSel.style('width', viewport_width + "px")
                .style("height", viewport_height - 36 + "px")
                .on("dblclick", function () {
                edittip.style("top", (_this.d3.event.pageY - 40) + "px")
                    .style("left", (_this.d3.event.pageX - 40) + "px")
                    .style("visibility", "visible")
                    .html("Enter a label: <input type='text' name='label'>")
                    .append("circle").attr("r", "4px").attr("fill", "red");
                //    this.$scope.$apply(() => {
                //      this.itemService.createNewItem([]);
                //      console.log(this.items)
                //    })
            });
            d3.select("#searchbar").style("top", viewport_height * 6 / 7 + "px")
                .style("left", viewport_width / 2 - searchbarwidth / 2 + "px")
                .style("display", "block");
            //move table down so top is at bottom of viewport
            d3.select("#exploretable").style('width', viewport_width + "px")
                .style("height", viewport_height - 50 + "px");
            var svg_width = +this.svgSel.style('width').replace("px", "");
            var svg_height = +this.svgSel.style('height').replace("px", "");
            this.forceSim.force("center", this.d3.forceCenter(svg_width / 2, svg_height / 2));
            this.forceSim.force("xposition", this.d3.forceX(svg_width / 2).strength(0.01));
            this.forceSim.force("yposition", this.d3.forceY(svg_height / 2).strength(0.01));
            var item_info_tip = d3.select("#right-column");
            var radius = 8;
            var tooltip = d3.select("body").append("div")
                .style("position", "absolute")
                .style("z-index", "20")
                .style("background-color", "gray")
                .style("color", "white")
                .style("padding", "3px")
                .style("border-radius", "2px")
                .style("visibility", "hidden");
            var edittip = d3.select("body").append("div")
                .attr("id", "edittip")
                .style("position", "absolute")
                .style("z-index", "40")
                .style("background-color", "white")
                .style("color", "gray")
                .style("border", "1px solid gray")
                .style("padding", "3px")
                .style("border-radius", "2px")
                .style("visibility", "hidden");
            var dragline;
            var linked = this.svgSel.select("g.links").selectAll("line")
                .data(this.links);
            linked.exit().remove();
            var link = linked
                .enter().append("line")
                .attr("id", function (d, i) { return "link-" + i; });
            link = link.merge(linked);
            var items = this.svgSel.selectAll("circle").data(this.items, function (d) { return d.value; });
            items.exit().remove();
            var node = items.enter().append("g")
                .attr("id", function (d, i) {
                return "node-" + i;
            })
                .attr("class", "node")
                .append("circle")
                .attr("class", "node-circle")
                .attr("id", function (d, i) { return "node-circle-" + i; })
                .style("stroke", "black")
                .attr("r", radius + "px")
                .call(d3.drag()
                .on("start", function (d, i) {
                if (!drawmode) {
                    if (!d3.event.active)
                        _this.forceSim.alphaTarget(.1).restart();
                    d.fx = d.x;
                    d.fy = d.y;
                }
                else {
                    dragline = _this.svgSel.append("line")
                        .attr("class", "dragLine");
                }
            })
                .on("drag", function (d, i) {
                if (!drawmode) {
                    d3.select("#node-circle-" + i).classed("fixed", true);
                    d.fx = d3.event.x;
                    d.fy = d3.event.y;
                    if (d3.select("#node-circle-" + i).classed("selected-circle")) {
                        item_info_tip.style("top", (d3.event.y + 30) + "px")
                            .style("left", (d3.event.x + 30) + "px");
                    }
                }
                else {
                    dragline.attr("x1", d.x)
                        .attr("y1", d.y)
                        .attr("x2", d3.event.x)
                        .attr("y2", d3.event.y);
                }
            })
                .on("end", function (d, i) {
                if (!drawmode) {
                    if (!d3.event.active)
                        _this.forceSim.alphaTarget(0);
                    if (!d3.select("#node-circle-" + i).classed("fixed")) {
                        d.fx = null;
                        d.fy = null;
                    }
                }
                else {
                    var lineX_1 = dragline.attr("x2");
                    var lineY_1 = dragline.attr("y2");
                    d3.selectAll(".node")
                        .each(function (f, j) {
                        if (Math.abs(lineX_1 - f.x) < radius && Math.abs(lineY_1 - f.y) < radius) {
                            _this.links.push({ "source": d, "target": f });
                            _this.svgSel.select(".links").remove();
                            var linkUpdate = _this.svgSel.append("g").attr("class", "links").selectAll("line").data(_this.links);
                            var linkExit = linkUpdate.exit().remove();
                            var linkEnter = linkUpdate.enter().append("line");
                            link = linkUpdate.merge(linkEnter);
                            _this.forceSim.force("link").links(_this.links);
                            linkEnter.attr("id", function (d, i) { return "link-" + i; })
                                .attr("x1", function (d) { return d.source.x; })
                                .attr("y1", function (d) { return d.source.y; })
                                .attr("x2", function (d) { return d.target.x; })
                                .attr("y2", function (d) { return d.target.y; });
                            dragline.remove();
                        }
                        else {
                            dragline.remove();
                        }
                    });
                }
            }))
                .on("mouseover", function (d, i) {
                _this.hightlightLinks(d, i);
                tooltip.style("top", (d3.event.pageY - 10) + "px")
                    .style("left", (d3.event.pageX + 10) + "px")
                    .style("visibility", "visible")
                    .text(d.label.value);
            })
                .on("mouseout", function (d, i) {
                d3.selectAll("line").classed("relevant", false);
                tooltip.style("visibility", "hidden");
            })
                .on('click', function (d, i) {
                d3.selectAll(".node").classed("selected-circle", false).attr("r", radius + "px");
                _this.d3.select("#node-circle-" + i).classed("selected-circle", true).attr("r", "11px");
                tooltip.style("visibility", "hidden");
                _this.hightlightLinks(d, i);
                _this.$scope.$apply(function () {
                    _this.selectItem(d);
                });
                item_info_tip.style("top", (d3.event.pageY - 10) + "px")
                    .style("left", (_this.d3.event.pageX + 17) + "px")
                    .style("visibility", "visible");
            });
            node = node.merge(items);
            var onTick = function () {
                node
                    .attr("transform", function (d, i) {
                    var x = d.x, y = d.y;
                    if (d.x > svg_width - radius)
                        x = svg_width - radius;
                    if (d.x < radius)
                        x = radius;
                    if (d.y > svg_height - radius)
                        y = svg_height - radius;
                    if (d.y < radius)
                        y = radius;
                    return "translate(" + x + ", " + y + ")";
                });
                link
                    .attr("x1", function (d) { return d.source.x; })
                    .attr("y1", function (d) { return d.source.y; })
                    .attr("x2", function (d) { return d.target.x; })
                    .attr("y2", function (d) { return d.target.y; });
            };
            this.forceSim.nodes(this.items)
                .on("tick", onTick);
            this.forceSim
                .force("link").links(this.links);
            this.forceSim.alpha(1).restart();
            return 'ok';
        };
        // currently broken on deleting a link
        ExploreComponentController.prototype.hightlightLinks = function (d, i) {
            this.d3.selectAll("line").classed("relevant", false);
            for (var j = 0; j < this.links.length; j++) {
                var linksource = this.links[j].source;
                var linktarget = this.links[j].target;
                if (linksource.index == i || linktarget.index == i) {
                    this.d3.select("#link-" + j).classed("relevant", true);
                }
            }
        };
        ExploreComponentController.prototype.selectItem = function (id) {
            this.selectedItem = id;
        };
        //BUG: after deleting item, links think nodes are in old locations and stationary, items are not getting rebound to new nodes
        ExploreComponentController.prototype.delete = function (id) {
            var _this = this;
            // remove any links from the item -
            for (var i = 0; i < this.links.length; i++) {
                if (this.links[i].source == id || this.links[i].target == id) {
                    this.links.splice(i, 1);
                }
            }
            // might need more to fully clear svg of deleted links
            var prom = this.itemService.deleteItem(id);
            prom.then(function () { return _this.fibraService.dispatch('change'); });
            return prom;
        };
        return ExploreComponentController;
    }());/*<auto_generate>*/angular.module('fibra').controller('ExploreComponentController',['$element','$window','$scope','$timeout','sparqlItemService','fibraService','$q',function(){return new (Function.prototype.bind.apply(ExploreComponentController,[null].concat(Array.prototype.slice.apply(arguments))));}]);/*</auto_generate>*/
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvZXhwbG9yZS1jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBVSxLQUFLLENBMmFkO0FBM2FELFdBQVUsS0FBSyxFQUFDLENBQUM7SUFDZixZQUFZLENBQUE7SUFVWjtRQXdZRSxvQ0FBb0IsUUFBYSxFQUNiLE9BQTRCLEVBQzVCLE1BQXNCLEVBQ3RCLFFBQWlDLEVBQ2pDLGlCQUFvQyxFQUNwQyxZQUEwQixFQUMxQixFQUFxQjtZQTlZM0MsaUJBc1pDO1lBZHFCLGFBQVEsR0FBUixRQUFRLENBQUs7WUFDYixZQUFPLEdBQVAsT0FBTyxDQUFxQjtZQUM1QixXQUFNLEdBQU4sTUFBTSxDQUFnQjtZQUN0QixhQUFRLEdBQVIsUUFBUSxDQUF5QjtZQUNqQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1lBQ3BDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1lBQzFCLE9BQUUsR0FBRixFQUFFLENBQW1CO1lBNVlsQyxVQUFLLEdBQVcsRUFBRSxDQUFBO1lBU2xCLGNBQVMsR0FBZTtnQkFDN0IsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtnQkFFcEUsZ0JBQWdCO2dCQUNoQixLQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFBO2dCQUU5QyxLQUFJLENBQUMsUUFBUSxHQUFHLEtBQUksQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFO3FCQUN0QyxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3FCQUN6QyxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxF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QyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7NEJBQ2xHLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQTs0QkFDekMsSUFBSSxTQUFTLEdBQUcsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQTs0QkFDakQsSUFBSSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUE7NEJBQ2xDLEtBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7NEJBQzdDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFVBQUMsQ0FBQyxFQUFDLENBQUMsSUFBTSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQSxDQUFBLENBQUMsQ0FBQztpQ0FDaEQsSUFBSSxDQUFDLElBQUksRUFBRSxVQUFDLENBQUMsSUFBTSxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUEsQ0FBQSxDQUFDLENBQUM7aUNBQ3RDLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBQyxDQUFDLElBQU0sTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBLENBQUEsQ0FBQyxDQUFDO2lDQUN0QyxJQUFJLENBQUMsSUFBSSxFQUFFLFVBQUMsQ0FBQyxJQUFNLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQSxDQUFBLENBQUMsQ0FBQztpQ0FDdEMsSUFBSSxDQUFDLElBQUksRUFBRSxVQUFDLENBQUMsSUFBTSxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUEsQ0FBQSxDQUFDLENBQUMsQ0FBQTs0QkFDdkMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO3dCQUN0QixD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QUcsTUFBTSxDQUFDO3dCQUFDLENBQUMsR0FBRyxNQUFNLENBQUE7b0JBQzVCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxHQUFHLE1BQU0sQ0FBQzt3QkFBQyxDQUFDLEdBQUcsVUFBVSxHQUFHLE1BQU0sQ0FBQTtvQkFDdEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUM7d0JBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQTtvQkFDNUIsTUFBTSxDQUFDLFlBQVksR0FBRyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUE7Z0JBQzFDLENBQUMsQ0FBQyxDQUFBO2dCQUVKLElBQUk7cUJBQ0QsSUFBSSxDQUFDLElBQUksRUFBRSxVQUFDLENBQUMsSUFBTSxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUEsQ0FBQSxDQUFDLENBQUM7cUJBQ3RDLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBQyxDQUFDLElBQU0sTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBLENBQUEsQ0FBQyxDQUFDO3FCQUN0QyxJQUFJLENBQUMsSUFBSSxFQUFFLFVBQUMsQ0FBQyxJQUFNLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQSxDQUFBLENBQUMsQ0FBQztxQkFDdEMsSUFBSSxDQUFDLElBQUksRUFBRSxVQUFDLENBQUMsSUFBTSxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUEsQ0FBQSxDQUFDLENBQUMsQ0FBQTtZQUMzQyxDQUFDLENBQUE7WUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2lCQUM1QixFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFBO1lBQ3JCLElBQUksQ0FBQyxRQUFRO2lCQUNWLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQ2xDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFBO1lBRWhDLE1BQU0sQ0FBQyxJQUFJLENBQUE7UUFDYixDQUFDO1FBRUQsc0NBQXNDO1FBQy9CLG9EQUFlLEdBQXRCLFVBQXVCLENBQUMsRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUE7WUFDbEQsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUN6QyxJQUFJLFVBQVUsR0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQTtnQkFDekMsSUFBSSxVQUFVLEdBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUE7Z0JBQ3pDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDakQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUE7Z0JBQzlELENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztRQUVNLCtDQUFVLEdBQWpCLFVBQWtCLEVBQVM7WUFDekIsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUE7UUFDeEIsQ0FBQztRQUVELDZIQUE2SDtRQUN0SCwyQ0FBTSxHQUFiLFVBQWMsRUFBUztZQUF2QixpQkFhQztZQVhDLG1DQUFtQztZQUNuQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQzNDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUM3RCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7Z0JBQ3pCLENBQUM7WUFDSCxDQUFDO1lBQ0Qsc0RBQXNEO1lBRXRELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFwQyxDQUFvQyxDQUFDLENBQUE7WUFDckQsTUFBTSxDQUFDLElBQUksQ0FBQTtRQUNiLENBQUM7UUFnQkgsaUNBQUM7SUFBRCxDQXRaQSxBQXNaQyxJQUFBO0lBRUQ7UUFBQTtZQUNTLGFBQVEsR0FBMkI7Z0JBQ3hDLGdCQUFnQixFQUFFLEdBQUc7Z0JBQ3JCLFlBQVksRUFBRSxHQUFHO2FBQ2xCLENBQUE7WUFDTSxlQUFVLEdBQWlDLDBCQUEwQixDQUFBO1lBQ3JFLGdCQUFXLEdBQVcsdUJBQXVCLENBQUE7UUFDdEQsQ0FBQztRQUFELHVCQUFDO0lBQUQsQ0FQQSxBQU9DLElBQUE7SUFQWSxzQkFBZ0IsbUJBTzVCLENBQUE7QUFDSCxDQUFDLEVBM2FTLEtBQUssS0FBTCxLQUFLLFFBMmFkIiwiZmlsZSI6InNjcmlwdHMvZXhwbG9yZS1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgZmlicmEge1xuICAndXNlIHN0cmljdCdcblxuICBpbnRlcmZhY2UgV2luZG93U2VydmljZVdpdGhEMyBleHRlbmRzIGFuZ3VsYXIuSVdpbmRvd1NlcnZpY2Uge1xuICAgIGQzOiBhbnlcbiAgfVxuXG4gIGludGVyZmFjZSBFeHBsb3JlQ29tcG9uZW50SW50ZXJmYWNlIGV4dGVuZHMgYW5ndWxhci5JQ29tcG9uZW50Q29udHJvbGxlciB7XG5cbiAgfVxuXG4gIGNsYXNzIEV4cGxvcmVDb21wb25lbnRDb250cm9sbGVyIHtcbiAgICBwdWJsaWMgaXRlbVNlcnZpY2U6IFNwYXJxbEl0ZW1TZXJ2aWNlXG4gICAgcHVibGljIGl0ZW1zOiBJdGVtW10gPSBbXVxuICAgIHB1YmxpYyBzZWxlY3RlZEl0ZW06IElOb2RlXG4gICAgcHVibGljIHByb3BlcnRpZXM6IHt9W11cbiAgICBwdWJsaWMgY2xhc3NUcmVlUHJvbWlzZTogYW5ndWxhci5JUHJvbWlzZTxUcmVlTm9kZVtdPlxuICAgIHByaXZhdGUgc3ZnU2VsOiBhbnlcbiAgICBwcml2YXRlIGQzOiBhbnlcbiAgICBwcml2YXRlIGxpbmtzOiB7c291cmNlOkl0ZW0sIHRhcmdldDpJdGVtfVtdXG4gICAgcHJpdmF0ZSBmb3JjZVNpbTogYW55XG5cbiAgICBwdWJsaWMgJHBvc3RMaW5rOiAoKSA9PiB2b2lkID0gKCkgPT4ge1xuICAgICAgdGhpcy5zdmdTZWwgPSB0aGlzLiR3aW5kb3cuZDMuc2VsZWN0KHRoaXMuJGVsZW1lbnRbMF0pLnNlbGVjdCgnc3ZnJylcblxuICAgICAgLy8gQ3JlYXRlIGxpbmsgZ1xuICAgICAgdGhpcy5zdmdTZWwuYXBwZW5kKCdnJykuYXR0cihcImNsYXNzXCIsIFwibGlua3NcIilcblxuICAgICAgdGhpcy5mb3JjZVNpbSA9IHRoaXMuZDMuZm9yY2VTaW11bGF0aW9uKClcbiAgICAgICAgLmZvcmNlKFwiY2hhcmdlXCIsIHRoaXMuZDMuZm9yY2VDb2xsaWRlKDIwKSlcbiAgICAgICAgLmZvcmNlKFwibGlua1wiLCB0aGlzLmQzLmZvcmNlTGluaygpLmRpc3RhbmNlKDQwKS5zdHJlbmd0aCgxKS5pdGVyYXRpb25zKDEpLmlkKGZ1bmN0aW9uKGQpIHtyZXR1cm4gZC5pbmRleH0pKVxuXG4gICAgICB0aGlzLnF1ZXJ5QW5kQnVpbGQoKVxuICAgIH1cblxuICAgIHB1YmxpYyBxdWVyeUFuZEJ1aWxkKCk6IGFuZ3VsYXIuSVByb21pc2U8U3RyaW5nPiB7XG4gICAgICByZXR1cm4gdGhpcy5jbGFzc1RyZWVQcm9taXNlLnRoZW4oY3QgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pdGVtU2VydmljZS5nZXRBbGxJdGVtcygpLnRoZW4oXG4gICAgICAgICAgKGl0ZW1zOiBJdGVtW10pID0+IHtcblxuICAgICAgICAgICAgLy8gTWVyZ2UgaXRlbXNcbiAgICAgICAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLm1lcmdlSXRlbXModGhpcy5pdGVtcywgaXRlbXMpXG4gICAgICAgICAgICB0aGlzLiRxLmFsbChpdGVtcy5tYXAoKGl0KSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLnNwYXJxbEl0ZW1TZXJ2aWNlLmdldEl0ZW0oaXQpXG4gICAgICAgICAgICB9KSkudGhlbigoaXRzKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMubGlua3MgPSB0aGlzLm1lcmdlTGlua3ModGhpcy5saW5rcywgaXRzKVxuICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUV4cGxvcmUoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHRoaXMucHJvcGVydGllcyA9IHRoaXMuaXRlbXNbMF0ucHJvcGVydGllcy5tYXAoKHApID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIHtrZXk6IHAudG9DYW5vbmljYWwoKSwgdmFsdWU6IHAubGFiZWwudmFsdWUgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybiAnb2snXG4gICAgICAgICAgfVxuICAgICAgICApLnRoZW4odGhpcy51cGRhdGVFeHBsb3JlLmJpbmQodGhpcykpXG4gICAgICB9KVxuICAgIH1cblxuICAgIHByaXZhdGUgbWVyZ2VJdGVtcyhvbGRJdGVtczpJdGVtW10sIG5ld0l0ZW1zOiBJdGVtW10pOiBJdGVtW10ge1xuICAgICAgbGV0IGl0ZW1zOiBJdGVtW10gPSBbXS5jb25jYXQob2xkSXRlbXMpXG4gICAgICBsZXQgaiwgaTogbnVtYmVyXG5cbiAgICAgIGZvcihpPTA7IGk8b2xkSXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZm9yKGo9MDsgajxuZXdJdGVtcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGlmKG9sZEl0ZW1zW2ldLnZhbHVlID09PSBuZXdJdGVtc1tqXS52YWx1ZSkge1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZihqID09PSBuZXdJdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAvLyBPbGQgaXRlbSBpcyBub3QgaW4gbmV3IGl0ZW1zLiBSZW1vdmUuXG4gICAgICAgICAgaXRlbXMuc3BsaWNlKGl0ZW1zLmluZGV4T2Yob2xkSXRlbXNbaV0pLDEpXG4gICAgICAgIH0gXG4gICAgICB9XG5cbiAgICAgIC8vIE5ldyBpdGVtIGlzIG5vdCBpbiBvbGQgaXRlbXMuIEFkZC5cbiAgICAgIGZvcihqPTA7IGo8bmV3SXRlbXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgZm9yKGk9MDsgaTxvbGRJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmKG9sZEl0ZW1zW2ldLnZhbHVlID09PSBuZXdJdGVtc1tqXS52YWx1ZSkge1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZihpID09PSBvbGRJdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICBpdGVtcy5wdXNoKG5ld0l0ZW1zW2pdKVxuICAgICAgICB9IFxuICAgICAgfVxuXG4gICAgICByZXR1cm4gaXRlbXNcbiAgICB9XG5cbiAgICBwcml2YXRlIG1lcmdlTGlua3Mob2xkTGlua3M6YW55W10sIG5ld0l0ZW1zOkl0ZW1bXSk6YW55W10ge1xuICAgICAgbGV0IG5ld0xpbmtzOiBhbnlbXSA9IFtdXG5cbiAgICAgIC8vIEJ1aWxkIG91ciBleHRlcm5hbCBpdGVtIC0+IGludGVybmFsIGl0ZW0gbWFwcGluZyBhcnJheS5cbiAgICAgIC8vIFRoaXMgaXMgdGVtcG9yYXJ5IHVudGlsIHdlIG1hbmFnZSBhZGRpdGlvbmFsIHByb3BlcnRpZXMgaW50ZXJuYWxseVxuICAgICAgbGV0IGludGVybmFsSXRlbXM6IEl0ZW1bXSA9IFtdIFxuICAgICAgZm9yKGxldCBpID0gMDsgaSA8IG5ld0l0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGludGVybmFsSXRlbXNbaV0gPSB0aGlzLml0ZW1zLmZpbHRlcigoaXQpID0+IHtcbiAgICAgICAgICByZXR1cm4gbmV3SXRlbXNbaV0udmFsdWUgPT09IGl0LnZhbHVlIFxuICAgICAgICB9KVswXVxuICAgICAgfVxuXG4gICAgICAvLyBGaXJzdCBidWlsZCBvdXIgc2FtZUFzIG1hcHBpbmcgZnJvbSB2YWx1ZSAtPiBJdGVtXG4gICAgICBsZXQgc2FtZUFzID0ge31cbiAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBuZXdJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBzYW1lQXNbbmV3SXRlbXNbaV0udmFsdWVdID0gaW50ZXJuYWxJdGVtc1tpXSA/IGludGVybmFsSXRlbXNbaV0gOiBuZXdJdGVtc1tpXVxuICAgICAgICBsZXQgc2FtZUFzUHJvcCA9IG5ld0l0ZW1zW2ldLnByb3BlcnRpZXMuZmlsdGVyKChwKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHAubGFiZWwudmFsdWUgPT09ICdzYW1lIEFzJ1xuICAgICAgICB9KVswXVxuICAgICAgICBpZihzYW1lQXNQcm9wICYmIHNhbWVBc1Byb3AudmFsdWVzKSB7XG4gICAgICAgICAgc2FtZUFzUHJvcC52YWx1ZXMuZm9yRWFjaCgobikgPT4geyBzYW1lQXNbbi52YWx1ZV0gPSBpbnRlcm5hbEl0ZW1zW2ldID8gaW50ZXJuYWxJdGVtc1tpXSA6IG5ld0l0ZW1zW2ldIH0pXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gSXRlcmF0ZSBvdmVyIGl0ZW0gcHJvcGVydHkgdmFsdWVzIHRvIHNlZSBpZiB0aGV5IG1hdGNoIHRoZSBpZCBvZiBhbnlcbiAgICAgIC8vIG9mIHRoZSBpdGVtcyBkaXNwbGF5ZWQuIEFsc28gY2hlY2sgaWYgdGhleSBtYXRjaCBzYW1lQXMgdmFsdWVzLi4uXG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgbmV3SXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbmV3SXRlbXNbaV0ucHJvcGVydGllcy5mb3JFYWNoKChwKSA9PiB7XG4gICAgICAgICAgcC52YWx1ZXMuZm9yRWFjaCgodikgPT4ge1xuICAgICAgICAgICAgaWYoc2FtZUFzW3YudmFsdWVdICYmIGludGVybmFsSXRlbXNbaV0pIHtcbiAgICAgICAgICAgICAgLy8gRG9uJ3Qgc2VsZi1saW5rXG4gICAgICAgICAgICAgIGlmKG5ld0l0ZW1zW2ldICE9PSBzYW1lQXNbdi52YWx1ZV0pIHtcbiAgICAgICAgICAgICAgICBuZXdMaW5rcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgIHNvdXJjZTogaW50ZXJuYWxJdGVtc1tpXSxcbiAgICAgICAgICAgICAgICAgIHRhcmdldDogc2FtZUFzW3YudmFsdWVdLFxuICAgICAgICAgICAgICAgICAgcHJvcGVydHk6IHBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIFxuICAgICAgcmV0dXJuIG5ld0xpbmtzO1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVFeHBsb3JlKCk6IHN0cmluZyB7XG5cbiAgICAgIC8vIGFsbG93IGl0ZW1faW5mb190aXAgdG8gZXhwYW5kIHNvbWVob3dcbiAgICAgIC8vIGFkZCBkZWxldGUgYW5kIGFsdGVyIGFiaWxpdHkgdG8gc3BhcnFsLWl0ZW0ucHVnXG4gICAgICAvL2ZpeCBob3cgbGlua3Mgc2l0IG9uIHRvcCBvZiBub2Rlc1xuICAgICAgbGV0IGQzID0gdGhpcy5kM1xuICAgICAgbGV0IHZpZXdwb3J0X3dpZHRoID0gd2luZG93LmlubmVyV2lkdGhcbiAgICAgIGxldCB2aWV3cG9ydF9oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICAgIGxldCBzZWFyY2hiYXJ3aWR0aCA9ICAgZDMuc2VsZWN0KFwiI3NlYXJjaGJhclwiKS5zdHlsZShcIndpZHRoXCIpLnJlcGxhY2UoJ3B4JywnJylcbiAgICAgIGxldCBkcmF3bW9kZSA9IGZhbHNlXG5cbiAgICAgIC8vIGFkZCBzaGlmdCB0byBlbmFibGUgZHJhdyBtb2RlIC0gdGhpcyBjYW4gZWFzaWx5IGJlIGNoYW5nZWQgdG8gcmVxdWlyZSBzaGlmdCB0byBiZSBoZWxkXG4gICAgICB0aGlzLiR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChldmVudCkgPT4ge1xuICAgICAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50IGluc3RhbmNlb2YgSFRNTEJvZHlFbGVtZW50KSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTYgKSB7XG4gICAgICAgICAgICAgIGRyYXdtb2RlID0gZHJhd21vZGUgPyBmYWxzZSA6IHRydWVcbiAgICAgICAgICAgICAgdGhpcy5zdmdTZWwuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIGRyYXdtb2RlID8gXCIjZDlkOWQ5XCIgOiBcIiNGMkYyRjJcIilcbiAgICAgICAgICAgICAgaWYgKGRyYXdtb2RlKSB7XG4gICAgICAgICAgICAgIHRoaXMuc3ZnU2VsLmFwcGVuZChcInRleHRcIilcbiAgICAgICAgICAgICAgICAgIC5hdHRyKFwiaWRcIiwgXCJkcmF3bW9kZXRleHRcIilcbiAgICAgICAgICAgICAgICAgIC5odG1sKFwiRHJhdyBNb2RlIGVuZ2FnZWQ7IHRvIGxpbmsgdHdvIG5vZGVzLCBkcmFnIGZyb20gb25lIHRvIHRoZSBvdGhlclwiKVxuICAgICAgICAgICAgICAgICAgLnN0eWxlKFwic3Ryb2tlXCIsIFwicmVkXCIpXG4gICAgICAgICAgICAgICAgICAuYXR0cihcInlcIiwgMTAwKVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGQzLnNlbGVjdChcIiNkcmF3bW9kZXRleHRcIikucmVtb3ZlKClcbiAgICAgICAgICAgICAgICBkMy5zZWxlY3RBbGwoXCIuZHJhZ0xpbmVcIikucmVtb3ZlKClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChldmVudC5rZXlDb2RlID09PSA0OSkge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmxpbmtzKVxuICAgICAgICAgICAgfSBlbHNlIGlmIChldmVudC5rZXlDb2RlID09PSA1MCkge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLml0ZW1zKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIGQzLnNlbGVjdChcIiNleHBsb3JlY29udGFpbmVyXCIpLnN0eWxlKCd3aWR0aCcsIHZpZXdwb3J0X3dpZHRoICsgXCJweFwiKVxuICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgdmlld3BvcnRfaGVpZ2h0IC0gMzYgKyBcInB4XCIpXG5cbiAgICAgIC8vIGRibCBjbGljayB0byBhZGQgLSBpbmNvbXBsZXRlL2Jyb2tlblxuICAgIHRoaXMuc3ZnU2VsLnN0eWxlKCd3aWR0aCcsIHZpZXdwb3J0X3dpZHRoICsgXCJweFwiKVxuICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgdmlld3BvcnRfaGVpZ2h0IC0gMzYgKyBcInB4XCIpXG4gICAgICAgIC8vIC5zdHlsZShcInRvcFwiLCAyNSArIFwicHhcIilcbiAgICAgICAgLm9uKFwiZGJsY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgZWRpdHRpcC5zdHlsZShcInRvcFwiLCAodGhpcy5kMy5ldmVudC5wYWdlWSAtIDQwKStcInB4XCIpXG4gICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsICh0aGlzLmQzLmV2ZW50LnBhZ2VYIC0gNDApK1wicHhcIilcbiAgICAgICAgICAgIC5zdHlsZShcInZpc2liaWxpdHlcIiwgXCJ2aXNpYmxlXCIpXG4gICAgICAgICAgICAuaHRtbChcIkVudGVyIGEgbGFiZWw6IDxpbnB1dCB0eXBlPSd0ZXh0JyBuYW1lPSdsYWJlbCc+XCIpXG4gICAgICAgICAgICAuYXBwZW5kKFwiY2lyY2xlXCIpLmF0dHIoXCJyXCIsIFwiNHB4XCIpLmF0dHIoXCJmaWxsXCIsIFwicmVkXCIpXG4gICAgICAvLyAgICB0aGlzLiRzY29wZS4kYXBwbHkoKCkgPT4ge1xuICAgICAgLy8gICAgICB0aGlzLml0ZW1TZXJ2aWNlLmNyZWF0ZU5ld0l0ZW0oW10pO1xuICAgICAgLy8gICAgICBjb25zb2xlLmxvZyh0aGlzLml0ZW1zKVxuICAgICAgLy8gICAgfSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZDMuc2VsZWN0KFwiI3NlYXJjaGJhclwiKS5zdHlsZShcInRvcFwiLCB2aWV3cG9ydF9oZWlnaHQgKiA2IC8gNyArIFwicHhcIilcbiAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIHZpZXdwb3J0X3dpZHRoIC8gMiAtIHNlYXJjaGJhcndpZHRoIC8gMiArIFwicHhcIilcbiAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIilcblxuICAgICAgLy9tb3ZlIHRhYmxlIGRvd24gc28gdG9wIGlzIGF0IGJvdHRvbSBvZiB2aWV3cG9ydFxuICAgICAgZDMuc2VsZWN0KFwiI2V4cGxvcmV0YWJsZVwiKS5zdHlsZSgnd2lkdGgnLCB2aWV3cG9ydF93aWR0aCArIFwicHhcIilcbiAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIHZpZXdwb3J0X2hlaWdodCAtIDUwICsgXCJweFwiKVxuXG4gICAgICBsZXQgc3ZnX3dpZHRoID0gK3RoaXMuc3ZnU2VsLnN0eWxlKCd3aWR0aCcpLnJlcGxhY2UoXCJweFwiLCBcIlwiKVxuICAgICAgbGV0IHN2Z19oZWlnaHQgPSArdGhpcy5zdmdTZWwuc3R5bGUoJ2hlaWdodCcpLnJlcGxhY2UoXCJweFwiLCBcIlwiKVxuXG4gICAgICB0aGlzLmZvcmNlU2ltLmZvcmNlKFwiY2VudGVyXCIsIHRoaXMuZDMuZm9yY2VDZW50ZXIoc3ZnX3dpZHRoLzIsIHN2Z19oZWlnaHQvMikpXG4gICAgICB0aGlzLmZvcmNlU2ltLmZvcmNlKFwieHBvc2l0aW9uXCIsIHRoaXMuZDMuZm9yY2VYKHN2Z193aWR0aC8yKS5zdHJlbmd0aCgwLjAxKSlcbiAgICAgIHRoaXMuZm9yY2VTaW0uZm9yY2UoXCJ5cG9zaXRpb25cIiwgdGhpcy5kMy5mb3JjZVkoc3ZnX2hlaWdodC8yKS5zdHJlbmd0aCgwLjAxKSlcblxuICAgICAgbGV0IGl0ZW1faW5mb190aXAgPSBkMy5zZWxlY3QoXCIjcmlnaHQtY29sdW1uXCIpXG5cbiAgICAgIGxldCByYWRpdXMgPSA4XG5cbiAgICAgIGxldCB0b29sdGlwID0gZDMuc2VsZWN0KFwiYm9keVwiKS5hcHBlbmQoXCJkaXZcIilcbiAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKVxuICAgICAgICAuc3R5bGUoXCJ6LWluZGV4XCIsIFwiMjBcIilcbiAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcImdyYXlcIilcbiAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCJ3aGl0ZVwiKVxuICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiM3B4XCIpXG4gICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCIycHhcIilcbiAgICAgICAgLnN0eWxlKFwidmlzaWJpbGl0eVwiLCBcImhpZGRlblwiKVxuXG4gICAgICBsZXQgZWRpdHRpcCA9IGQzLnNlbGVjdChcImJvZHlcIikuYXBwZW5kKFwiZGl2XCIpXG4gICAgICAgIC5hdHRyKFwiaWRcIiwgXCJlZGl0dGlwXCIpXG4gICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgLnN0eWxlKFwiei1pbmRleFwiLCBcIjQwXCIpXG4gICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCJ3aGl0ZVwiKVxuICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcImdyYXlcIilcbiAgICAgICAgLnN0eWxlKFwiYm9yZGVyXCIsIFwiMXB4IHNvbGlkIGdyYXlcIilcbiAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjNweFwiKVxuICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiMnB4XCIpXG4gICAgICAgIC5zdHlsZShcInZpc2liaWxpdHlcIiwgXCJoaWRkZW5cIilcblxuICAgICAgbGV0IGRyYWdsaW5lO1xuXG4gICAgICBsZXQgbGlua2VkID0gdGhpcy5zdmdTZWwuc2VsZWN0KFwiZy5saW5rc1wiKS5zZWxlY3RBbGwoXCJsaW5lXCIpXG4gICAgICAgIC5kYXRhKHRoaXMubGlua3MpXG4gICAgICBcbiAgICAgIGxpbmtlZC5leGl0KCkucmVtb3ZlKClcblxuICAgICAgbGV0IGxpbmsgPSBsaW5rZWRcbiAgICAgICAgLmVudGVyKCkuYXBwZW5kKFwibGluZVwiKVxuICAgICAgICAgIC5hdHRyKFwiaWRcIiwgKGQsaSkgPT4ge3JldHVybiBcImxpbmstXCIgKyBpfSlcbiAgICAgIGxpbmsgPSBsaW5rLm1lcmdlKGxpbmtlZClcblxuICAgICAgbGV0IGl0ZW1zID0gdGhpcy5zdmdTZWwuc2VsZWN0QWxsKFwiY2lyY2xlXCIpLmRhdGEodGhpcy5pdGVtcywgKGQpID0+ICB7cmV0dXJuIGQudmFsdWUgfSlcbiAgICAgIGl0ZW1zLmV4aXQoKS5yZW1vdmUoKVxuXG4gICAgICBsZXQgbm9kZSA9IGl0ZW1zLmVudGVyKCkuYXBwZW5kKFwiZ1wiKVxuICAgICAgICAgIC5hdHRyKFwiaWRcIiwgKGQsaSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIFwibm9kZS1cIiArIGlcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJub2RlXCIpXG4gICAgICAgIC5hcHBlbmQoXCJjaXJjbGVcIilcbiAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwibm9kZS1jaXJjbGVcIilcbiAgICAgICAgICAuYXR0cihcImlkXCIsIChkLGkpID0+IHsgcmV0dXJuIFwibm9kZS1jaXJjbGUtXCIgKyBpfSlcbiAgICAgICAgICAuc3R5bGUoXCJzdHJva2VcIiwgXCJibGFja1wiKVxuICAgICAgICAgIC5hdHRyKFwiclwiLCByYWRpdXMgKyBcInB4XCIpXG4gICAgICAgICAgLmNhbGwoZDMuZHJhZygpXG4gICAgICAgICAgICAgIC5vbihcInN0YXJ0XCIsIChkLGkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWRyYXdtb2RlKSB7XG4gICAgICAgICAgICAgICAgICBpZiAoIWQzLmV2ZW50LmFjdGl2ZSkgdGhpcy5mb3JjZVNpbS5hbHBoYVRhcmdldCguMSkucmVzdGFydCgpXG4gICAgICAgICAgICAgICAgICAgIGQuZnggPSBkLnhcbiAgICAgICAgICAgICAgICAgICAgZC5meSA9IGQueVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGRyYWdsaW5lID0gdGhpcy5zdmdTZWwuYXBwZW5kKFwibGluZVwiKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwiZHJhZ0xpbmVcIilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAub24oXCJkcmFnXCIsIChkLGkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWRyYXdtb2RlKSB7XG4gICAgICAgICAgICAgICAgICBkMy5zZWxlY3QoXCIjbm9kZS1jaXJjbGUtXCIgKyBpKS5jbGFzc2VkKFwiZml4ZWRcIiwgdHJ1ZSlcbiAgICAgICAgICAgICAgICAgIGQuZnggPSBkMy5ldmVudC54XG4gICAgICAgICAgICAgICAgICBkLmZ5ID0gZDMuZXZlbnQueVxuICAgICAgICAgICAgICAgICAgaWYgKGQzLnNlbGVjdChcIiNub2RlLWNpcmNsZS1cIiArIGkpLmNsYXNzZWQoXCJzZWxlY3RlZC1jaXJjbGVcIikpIHtcbiAgICAgICAgICAgICAgICAgIGl0ZW1faW5mb190aXAuc3R5bGUoXCJ0b3BcIiwgKGQzLmV2ZW50LnkgKyAzMCkrXCJweFwiKVxuICAgICAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCAoZDMuZXZlbnQueCArIDMwKStcInB4XCIpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZHJhZ2xpbmUuYXR0cihcIngxXCIsIGQueClcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoXCJ5MVwiLCBkLnkpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKFwieDJcIiwgZDMuZXZlbnQueClcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoXCJ5MlwiLCBkMy5ldmVudC55KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5vbihcImVuZFwiLCAgKGQsaSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghZHJhd21vZGUpIHtcbiAgICAgICAgICAgICAgICAgIGlmICghZDMuZXZlbnQuYWN0aXZlKSB0aGlzLmZvcmNlU2ltLmFscGhhVGFyZ2V0KDApXG4gICAgICAgICAgICAgICAgICBpZiAoIWQzLnNlbGVjdChcIiNub2RlLWNpcmNsZS1cIiArIGkpLmNsYXNzZWQoXCJmaXhlZFwiKSkge1xuICAgICAgICAgICAgICAgICAgICBkLmZ4ID0gbnVsbFxuICAgICAgICAgICAgICAgICAgICBkLmZ5ID0gbnVsbFxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBsZXQgbGluZVggPSBkcmFnbGluZS5hdHRyKFwieDJcIilcbiAgICAgICAgICAgICAgICAgIGxldCBsaW5lWSA9IGRyYWdsaW5lLmF0dHIoXCJ5MlwiKVxuXG4gICAgICAgICAgICAgICAgICBkMy5zZWxlY3RBbGwoXCIubm9kZVwiKVxuICAgICAgICAgICAgICAgICAgICAuZWFjaCgoZixqKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKGxpbmVYIC0gZi54KSA8IHJhZGl1cyAmJiBNYXRoLmFicyhsaW5lWSAtIGYueSkgPCByYWRpdXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGlua3MucHVzaCh7XCJzb3VyY2VcIjogZCwgXCJ0YXJnZXRcIjogZn0pXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN2Z1NlbC5zZWxlY3QoXCIubGlua3NcIikucmVtb3ZlKClcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsaW5rVXBkYXRlID0gdGhpcy5zdmdTZWwuYXBwZW5kKFwiZ1wiKS5hdHRyKFwiY2xhc3NcIiwgXCJsaW5rc1wiKS5zZWxlY3RBbGwoXCJsaW5lXCIpLmRhdGEodGhpcy5saW5rcylcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsaW5rRXhpdCA9IGxpbmtVcGRhdGUuZXhpdCgpLnJlbW92ZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGlua0VudGVyID0gbGlua1VwZGF0ZS5lbnRlcigpLmFwcGVuZChcImxpbmVcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmsgPSBsaW5rVXBkYXRlLm1lcmdlKGxpbmtFbnRlcilcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9yY2VTaW0uZm9yY2UoXCJsaW5rXCIpLmxpbmtzKHRoaXMubGlua3MpXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5rRW50ZXIuYXR0cihcImlkXCIsIChkLGkpID0+IHtyZXR1cm4gXCJsaW5rLVwiICsgaX0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKFwieDFcIiwgKGQpID0+IHtyZXR1cm4gZC5zb3VyY2UueH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKFwieTFcIiwgKGQpID0+IHtyZXR1cm4gZC5zb3VyY2UueX0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKFwieDJcIiwgKGQpID0+IHtyZXR1cm4gZC50YXJnZXQueH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKFwieTJcIiwgKGQpID0+IHtyZXR1cm4gZC50YXJnZXQueX0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRyYWdsaW5lLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkcmFnbGluZS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAub24oXCJtb3VzZW92ZXJcIiwgKGQsaSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5oaWdodGxpZ2h0TGlua3MoZCxpKVxuICAgICAgICAgICAgICB0b29sdGlwLnN0eWxlKFwidG9wXCIsIChkMy5ldmVudC5wYWdlWSAtIDEwKStcInB4XCIpXG4gICAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgKGQzLmV2ZW50LnBhZ2VYICsgMTApK1wicHhcIilcbiAgICAgICAgICAgICAgLnN0eWxlKFwidmlzaWJpbGl0eVwiLCBcInZpc2libGVcIilcbiAgICAgICAgICAgICAgLnRleHQoZC5sYWJlbC52YWx1ZSlcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5vbihcIm1vdXNlb3V0XCIsIChkLGkpID0+IHtcbiAgICAgICAgICAgIGQzLnNlbGVjdEFsbChcImxpbmVcIikuY2xhc3NlZChcInJlbGV2YW50XCIsIGZhbHNlKVxuICAgICAgICAgICAgdG9vbHRpcC5zdHlsZShcInZpc2liaWxpdHlcIiwgXCJoaWRkZW5cIilcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5vbignY2xpY2snLCAoZDpJTm9kZSwgaSkgPT4ge1xuICAgICAgICAgICAgZDMuc2VsZWN0QWxsKFwiLm5vZGVcIikuY2xhc3NlZChcInNlbGVjdGVkLWNpcmNsZVwiLCBmYWxzZSkuYXR0cihcInJcIiwgcmFkaXVzICsgXCJweFwiKVxuICAgICAgICAgICAgdGhpcy5kMy5zZWxlY3QoXCIjbm9kZS1jaXJjbGUtXCIgKyBpKS5jbGFzc2VkKFwic2VsZWN0ZWQtY2lyY2xlXCIsIHRydWUpLmF0dHIoXCJyXCIsIFwiMTFweFwiKVxuICAgICAgICAgICAgdG9vbHRpcC5zdHlsZShcInZpc2liaWxpdHlcIiwgXCJoaWRkZW5cIilcbiAgICAgICAgICAgIHRoaXMuaGlnaHRsaWdodExpbmtzKGQsIGkpXG5cbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLiRhcHBseSgoKSA9PiB7XG4gICAgICAgICAgICAgdGhpcy5zZWxlY3RJdGVtKGQpXG4gICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGl0ZW1faW5mb190aXAuc3R5bGUoXCJ0b3BcIiwgKGQzLmV2ZW50LnBhZ2VZIC0xMCkrXCJweFwiKVxuICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCAodGhpcy5kMy5ldmVudC5wYWdlWCArIDE3KStcInB4XCIpXG4gICAgICAgICAgICAuc3R5bGUoXCJ2aXNpYmlsaXR5XCIsIFwidmlzaWJsZVwiKVxuICAgICAgICAgIH0pXG5cbiAgICAgIG5vZGUgPSBub2RlLm1lcmdlKGl0ZW1zKVxuXG4gICAgICBsZXQgb25UaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFxuICAgICAgICBub2RlXG4gICAgICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgKGQsaSkgPT4ge1xuICAgICAgICAgICAgbGV0IHggPSBkLngsIHkgPSBkLnlcbiAgICAgICAgICAgIGlmIChkLnggPiBzdmdfd2lkdGggLSByYWRpdXMpIHggPSBzdmdfd2lkdGggLSByYWRpdXNcbiAgICAgICAgICAgIGlmIChkLnggPCByYWRpdXMpIHggPSByYWRpdXNcbiAgICAgICAgICAgIGlmIChkLnkgPiBzdmdfaGVpZ2h0IC0gcmFkaXVzKSB5ID0gc3ZnX2hlaWdodCAtIHJhZGl1c1xuICAgICAgICAgICAgaWYgKGQueSA8IHJhZGl1cykgeSA9IHJhZGl1c1xuICAgICAgICAgICAgcmV0dXJuIFwidHJhbnNsYXRlKFwiICsgeCArIFwiLCBcIiArIHkgKyBcIilcIlxuICAgICAgICAgIH0pXG5cbiAgICAgICAgbGlua1xuICAgICAgICAgIC5hdHRyKFwieDFcIiwgKGQpID0+IHtyZXR1cm4gZC5zb3VyY2UueH0pXG4gICAgICAgICAgLmF0dHIoXCJ5MVwiLCAoZCkgPT4ge3JldHVybiBkLnNvdXJjZS55fSlcbiAgICAgICAgICAuYXR0cihcIngyXCIsIChkKSA9PiB7cmV0dXJuIGQudGFyZ2V0Lnh9KVxuICAgICAgICAgIC5hdHRyKFwieTJcIiwgKGQpID0+IHtyZXR1cm4gZC50YXJnZXQueX0pXG4gICAgICB9XG5cbiAgICAgIHRoaXMuZm9yY2VTaW0ubm9kZXModGhpcy5pdGVtcylcbiAgICAgICAgLm9uKFwidGlja1wiLCBvblRpY2spXG4gICAgICB0aGlzLmZvcmNlU2ltXG4gICAgICAgIC5mb3JjZShcImxpbmtcIikubGlua3ModGhpcy5saW5rcylcbiAgICAgIHRoaXMuZm9yY2VTaW0uYWxwaGEoMSkucmVzdGFydCgpXG5cbiAgICAgIHJldHVybiAnb2snXG4gICAgfVxuXG4gICAgLy8gY3VycmVudGx5IGJyb2tlbiBvbiBkZWxldGluZyBhIGxpbmtcbiAgICBwdWJsaWMgaGlnaHRsaWdodExpbmtzKGQsIGkpOnZvaWQge1xuICAgICAgdGhpcy5kMy5zZWxlY3RBbGwoXCJsaW5lXCIpLmNsYXNzZWQoXCJyZWxldmFudFwiLCBmYWxzZSlcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmxpbmtzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBsZXQgbGlua3NvdXJjZTphbnkgPSB0aGlzLmxpbmtzW2pdLnNvdXJjZVxuICAgICAgICAgICAgbGV0IGxpbmt0YXJnZXQ6YW55ID0gdGhpcy5saW5rc1tqXS50YXJnZXRcbiAgICAgICAgICAgIGlmIChsaW5rc291cmNlLmluZGV4ID09IGkgfHwgbGlua3RhcmdldC5pbmRleCA9PSBpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kMy5zZWxlY3QoXCIjbGluay1cIiArIGopLmNsYXNzZWQoXCJyZWxldmFudFwiLCB0cnVlKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHNlbGVjdEl0ZW0oaWQ6IElOb2RlKTogdm9pZCB7XG4gICAgICB0aGlzLnNlbGVjdGVkSXRlbSA9IGlkXG4gICAgfVxuXG4gICAgLy9CVUc6IGFmdGVyIGRlbGV0aW5nIGl0ZW0sIGxpbmtzIHRoaW5rIG5vZGVzIGFyZSBpbiBvbGQgbG9jYXRpb25zIGFuZCBzdGF0aW9uYXJ5LCBpdGVtcyBhcmUgbm90IGdldHRpbmcgcmVib3VuZCB0byBuZXcgbm9kZXNcbiAgICBwdWJsaWMgZGVsZXRlKGlkOiBJTm9kZSk6IGFuZ3VsYXIuSVByb21pc2U8c3RyaW5nPiB7XG5cbiAgICAgIC8vIHJlbW92ZSBhbnkgbGlua3MgZnJvbSB0aGUgaXRlbSAtXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGlua3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRoaXMubGlua3NbaV0uc291cmNlID09IGlkIHx8IHRoaXMubGlua3NbaV0udGFyZ2V0ID09IGlkKSB7XG4gICAgICAgICAgdGhpcy5saW5rcy5zcGxpY2UoaSwgMSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gbWlnaHQgbmVlZCBtb3JlIHRvIGZ1bGx5IGNsZWFyIHN2ZyBvZiBkZWxldGVkIGxpbmtzXG5cbiAgICAgIGxldCBwcm9tID0gdGhpcy5pdGVtU2VydmljZS5kZWxldGVJdGVtKGlkKVxuICAgICAgcHJvbS50aGVuKCgpID0+IHRoaXMuZmlicmFTZXJ2aWNlLmRpc3BhdGNoKCdjaGFuZ2UnKSlcbiAgICAgIHJldHVybiBwcm9tXG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkZWxlbWVudDogYW55LFxuICAgICAgICAgICAgICAgIHByaXZhdGUgJHdpbmRvdzogV2luZG93U2VydmljZVdpdGhEMyxcbiAgICAgICAgICAgICAgICBwcml2YXRlICRzY29wZTogYW5ndWxhci5JU2NvcGUsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSAkdGltZW91dDogYW5ndWxhci5JVGltZW91dFNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBzcGFycWxJdGVtU2VydmljZTogU3BhcnFsSXRlbVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBmaWJyYVNlcnZpY2U6IEZpYnJhU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlICRxOiBhbmd1bGFyLklRU2VydmljZSkge1xuICAgICAgdGhpcy5maWJyYVNlcnZpY2Uub24oJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucXVlcnlBbmRCdWlsZCgpXG4gICAgICB9KVxuICAgICAgdGhpcy5pdGVtU2VydmljZSA9IHNwYXJxbEl0ZW1TZXJ2aWNlXG4gICAgICB0aGlzLmQzID0gdGhpcy4kd2luZG93LmQzXG4gICAgICB0aGlzLmxpbmtzID0gW11cbiAgICB9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgRXhwbG9yZUNvbXBvbmVudCBpbXBsZW1lbnRzIGFuZ3VsYXIuSUNvbXBvbmVudE9wdGlvbnMge1xuICAgIHB1YmxpYyBiaW5kaW5nczoge1tpZDogc3RyaW5nXTogc3RyaW5nfSA9IHtcbiAgICAgIGNsYXNzVHJlZVByb21pc2U6ICc8JyxcbiAgICAgIHNlbGVjdGVkSXRlbTogJz0nXG4gICAgfVxuICAgIHB1YmxpYyBjb250cm9sbGVyOiBhbmd1bGFyLklDb21wb25lbnRDb250cm9sbGVyID0gRXhwbG9yZUNvbXBvbmVudENvbnRyb2xsZXJcbiAgICBwdWJsaWMgdGVtcGxhdGVVcmw6IHN0cmluZyA9ICdwYXJ0aWFscy9leHBsb3JlLmh0bWwnXG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

var fibra;
(function (fibra) {
    var FibraService = (function () {
        function FibraService($q) {
            this.callbacks = {
                'change': Array()
            };
            this.q = $q;
        }
        // Returns a function that can be called to remove the callback
        FibraService.prototype.on = function (evnt, callback) {
            var _this = this;
            if (this.callbacks[evnt] === undefined) {
                this.callbacks[evnt] = Array();
            }
            this.callbacks[evnt].push(callback);
            return function () {
                if (_this.callbacks[evnt].indexOf(callback) !== -1) {
                    _this.callbacks[evnt].splice(_this.callbacks[evnt].indexOf(callback), 1);
                }
            };
        };
        FibraService.prototype.dispatch = function (evnt) {
            var proms = this.callbacks[evnt].map(function (cb) {
                return cb();
            });
            return this.q.all(proms);
        };
        return FibraService;
    }());/*<auto_generate>*/angular.module('fibra').service('fibraService',['$q',function(){return new (Function.prototype.bind.apply(FibraService,[null].concat(Array.prototype.slice.apply(arguments))));}]);/*</auto_generate>*/
    fibra.FibraService = FibraService;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvZmlicmEtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFVLEtBQUssQ0FvQ2Q7QUFwQ0QsV0FBVSxLQUFLLEVBQUMsQ0FBQztJQUlmO1FBNEJFLHNCQUFZLEVBQXFCO1lBeEJ6QixjQUFTLEdBQUc7Z0JBQ2xCLFFBQVEsRUFBRSxLQUFLLEVBQXFCO2FBQ3JDLENBQUE7WUF1QkMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUE7UUFDYixDQUFDO1FBdEJELCtEQUErRDtRQUN4RCx5QkFBRSxHQUFULFVBQVUsSUFBWSxFQUFFLFFBQTBCO1lBQWxELGlCQVVDO1lBVEMsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssRUFBcUIsQ0FBQTtZQUNuRCxDQUFDO1lBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7WUFDbkMsTUFBTSxDQUFDO2dCQUNMLEVBQUUsQ0FBQSxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDakQsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7Z0JBQ3hFLENBQUM7WUFDSCxDQUFDLENBQUE7UUFDSCxDQUFDO1FBRU0sK0JBQVEsR0FBZixVQUFnQixJQUFZO1lBQzFCLElBQUksS0FBSyxHQUFtQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLEVBQUU7Z0JBQ3RFLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQTtZQUNiLENBQUMsQ0FBQyxDQUFBO1lBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQzFCLENBQUM7UUFLSCxtQkFBQztJQUFELENBL0JBLEFBK0JDLElBQUE7SUEvQlksa0JBQVksZUErQnhCLENBQUE7QUFDSCxDQUFDLEVBcENTLEtBQUssS0FBTCxLQUFLLFFBb0NkIiwiZmlsZSI6InNjcmlwdHMvZmlicmEtc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBmaWJyYSB7IFxuICB0eXBlIENhbGxiYWNrRnVuY3Rpb24gPSAoKSA9PiBhbmd1bGFyLklQcm9taXNlPHN0cmluZz5cbiAgdHlwZSBSZW1vdmFsRnVuY3Rpb24gPSAoKSA9PiB2b2lkXG5cbiAgZXhwb3J0IGNsYXNzIEZpYnJhU2VydmljZSB7XG4gICAgLy8gTW9kZWxlZCBvbiBkMy5ldmVudFxuXG4gICAgcHJpdmF0ZSBxOiBhbmd1bGFyLklRU2VydmljZVxuICAgIHByaXZhdGUgY2FsbGJhY2tzID0ge1xuICAgICAgJ2NoYW5nZSc6IEFycmF5PENhbGxiYWNrRnVuY3Rpb24+ICgpXG4gICAgfVxuICAgIFxuICAgIC8vIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGNhbiBiZSBjYWxsZWQgdG8gcmVtb3ZlIHRoZSBjYWxsYmFja1xuICAgIHB1YmxpYyBvbihldm50OiBzdHJpbmcsIGNhbGxiYWNrOiBDYWxsYmFja0Z1bmN0aW9uKTpSZW1vdmFsRnVuY3Rpb24ge1xuICAgICAgaWYodGhpcy5jYWxsYmFja3NbZXZudF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmNhbGxiYWNrc1tldm50XSA9IEFycmF5PENhbGxiYWNrRnVuY3Rpb24+ICgpXG4gICAgICB9XG4gICAgICB0aGlzLmNhbGxiYWNrc1tldm50XS5wdXNoKGNhbGxiYWNrKVxuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgaWYodGhpcy5jYWxsYmFja3NbZXZudF0uaW5kZXhPZihjYWxsYmFjaykgIT09IC0xKSB7XG4gICAgICAgICAgdGhpcy5jYWxsYmFja3NbZXZudF0uc3BsaWNlKHRoaXMuY2FsbGJhY2tzW2V2bnRdLmluZGV4T2YoY2FsbGJhY2spLCAxKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGRpc3BhdGNoKGV2bnQ6IHN0cmluZyk6YW5ndWxhci5JUHJvbWlzZTxBcnJheTxzdHJpbmc+PiB7XG4gICAgICBsZXQgcHJvbXM6QXJyYXk8YW5ndWxhci5JUHJvbWlzZTxzdHJpbmc+PiA9IHRoaXMuY2FsbGJhY2tzW2V2bnRdLm1hcCgoY2IpID0+IHtcbiAgICAgICAgcmV0dXJuIGNiKClcbiAgICAgIH0pXG4gICAgICByZXR1cm4gdGhpcy5xLmFsbChwcm9tcylcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcigkcTogYW5ndWxhci5JUVNlcnZpY2UpIHtcbiAgICAgIHRoaXMucSA9ICRxXG4gICAgfVxuICB9XG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

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
            this.value = value;
            this.termType = termType;
            this.language = language;
            this.datatype = datatype;
        }
        Node.prototype.toCanonical = function () {
            switch (this.termType) {
                case 'NamedNode': return '<' + this.value + '>';
                case 'BlankNode': return '_:' + this.value;
                case 'Literal': return JSON.stringify(this.value) + (this.language ? '@' + this.language : (this.datatype.equals(XMLSchema.string) ? '' : '^^' + this.datatype.toCanonical()));
                case 'Variable': return '?' + this.value;
                case 'DefaultGraph': return '';
                default: throw 'Unknown term type ' + this.termType;
            }
        };
        Node.prototype.equals = function (other) {
            return this.termType === other.termType && this.value === other.value && (this.termType !== 'Literal' || (this.language === other.language && this.datatype === other.datatype));
        };
        return Node;
    }());
    fibra.Node = Node;
    var SparqlBindingNode = (function (_super) {
        __extends(SparqlBindingNode, _super);
        function SparqlBindingNode(binding) {
            _super.call(this);
            this.value = binding.value;
            switch (binding.type) {
                case 'literal':
                    this.termType = 'Literal';
                    this.language = binding['xml:lang'] ? binding['xml:lang'] : '';
                    this.datatype = binding.datatype ? new NamedNode(binding.datatype) : (this.language !== '' ? RDF.langString : XMLSchema.string);
                    break;
                case 'uri':
                    this.termType = 'NamedNode';
                    break;
                case 'bnode':
                    this.termType = 'BlankNode';
                    break;
                default: throw 'Unknown binding type ' + binding.type + ' for ' + binding;
            }
        }
        return SparqlBindingNode;
    }(Node));
    fibra.SparqlBindingNode = SparqlBindingNode;
    var NodeFromNode = (function (_super) {
        __extends(NodeFromNode, _super);
        function NodeFromNode(other) {
            _super.call(this, other.value, other.termType, other.language, other.datatype);
        }
        return NodeFromNode;
    }(Node));
    fibra.NodeFromNode = NodeFromNode;
    var CanonicalNode = (function (_super) {
        __extends(CanonicalNode, _super);
        function CanonicalNode(id) {
            _super.call(this);
            if (id.indexOf('<') === 0) {
                this.termType = 'NamedNode';
                this.value = id.substring(1, id.length - 1);
            }
            else if (id.indexOf('_:') === 0) {
                this.termType = 'BlankNode';
                this.value = id.substring(2);
            }
            else if (id.indexOf('"') === 0) {
                this.termType = 'Literal';
                this.value = id.substring(1, id.lastIndexOf('"'));
                if (id.lastIndexOf('@') === id.lastIndexOf('"') + 1) {
                    this.language = id.substring(id.lastIndexOf('@'));
                    this.datatype = RDF.langString;
                }
                else if (id.lastIndexOf('^^<') === id.lastIndexOf('"') + 1)
                    this.datatype = new NamedNode(id.substring(id.lastIndexOf('^^<'), id.length - 1));
                else
                    this.datatype = XMLSchema.string;
            }
        }
        return CanonicalNode;
    }(Node));
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
        }
        DataFactory.prototype.nodeFromBinding = function (binding) { return new SparqlBindingNode(binding); };
        DataFactory.prototype.nodeFromNode = function (other) { return new NodeFromNode(other); };
        DataFactory.prototype.namedNode = function (value) { return new NamedNode(value); };
        DataFactory.prototype.blankNode = function (value) { return new BlankNode(value); };
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
        return CIDOC;
    }());
    fibra.CIDOC = CIDOC;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvcmRmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBVSxLQUFLLENBc01kO0FBdE1ELFdBQVUsS0FBSyxFQUFDLENBQUM7SUFDZixZQUFZLENBQUE7SUFTWjtRQUNFLGNBQW1CLEtBQWMsRUFBUyxRQUE4RSxFQUFTLFFBQWlCLEVBQVMsUUFBcUI7WUFBN0osVUFBSyxHQUFMLEtBQUssQ0FBUztZQUFTLGFBQVEsR0FBUixRQUFRLENBQXNFO1lBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBUztZQUFTLGFBQVEsR0FBUixRQUFRLENBQWE7UUFBRyxDQUFDO1FBQzdLLDBCQUFXLEdBQWxCO1lBQ0UsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLEtBQUssV0FBVyxFQUFFLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUE7Z0JBQy9DLEtBQUssV0FBVyxFQUFFLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQTtnQkFDMUMsS0FBSyxTQUFTLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFBO2dCQUM5SyxLQUFLLFVBQVUsRUFBRSxNQUFNLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUE7Z0JBQ3hDLEtBQUssY0FBYyxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUE7Z0JBQzlCLFNBQVMsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFBO1lBQ3JELENBQUM7UUFDSCxDQUFDO1FBQ00scUJBQU0sR0FBYixVQUFjLEtBQVk7WUFDeEIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssS0FBSyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQWdCLEtBQU0sQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBZ0IsS0FBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUE7UUFDMU0sQ0FBQztRQUNILFdBQUM7SUFBRCxDQWZBLEFBZUMsSUFBQTtJQWZZLFVBQUksT0FlaEIsQ0FBQTtJQUVEO1FBQXVDLHFDQUFJO1FBRXpDLDJCQUFZLE9BQXlCO1lBQ25DLGlCQUFPLENBQUE7WUFDUCxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUE7WUFDMUIsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLEtBQUssU0FBUztvQkFDWixJQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQTtvQkFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtvQkFDOUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssRUFBRSxHQUFHLEdBQUcsQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFBO29CQUMvSCxLQUFLLENBQUE7Z0JBQ1AsS0FBSyxLQUFLO29CQUNSLElBQUksQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFBO29CQUMzQixLQUFLLENBQUE7Z0JBQ1AsS0FBSyxPQUFPO29CQUNWLElBQUksQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFBO29CQUMzQixLQUFLLENBQUE7Z0JBQ1AsU0FBUyxNQUFNLHVCQUF1QixHQUFHLE9BQU8sQ0FBQyxJQUFJLEdBQUcsT0FBTyxHQUFHLE9BQU8sQ0FBQTtZQUMzRSxDQUFDO1FBQ0gsQ0FBQztRQUNILHdCQUFDO0lBQUQsQ0FwQkEsQUFvQkMsQ0FwQnNDLElBQUksR0FvQjFDO0lBcEJZLHVCQUFpQixvQkFvQjdCLENBQUE7SUFFRDtRQUFrQyxnQ0FBSTtRQUNwQyxzQkFBWSxLQUFZO1lBQ3RCLGtCQUFNLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUNwRSxDQUFDO1FBQ0gsbUJBQUM7SUFBRCxDQUpBLEFBSUMsQ0FKaUMsSUFBSSxHQUlyQztJQUpZLGtCQUFZLGVBSXhCLENBQUE7SUFFRDtRQUE0QixpQ0FBSTtRQUc5Qix1QkFBWSxFQUFVO1lBQ3BCLGlCQUFPLENBQUE7WUFDUCxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFBO2dCQUMzQixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUE7WUFDN0MsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFBO2dCQUMzQixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDOUIsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLElBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFBO2dCQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtnQkFDakQsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3BELElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7b0JBQ2pELElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQTtnQkFDaEMsQ0FBQztnQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDM0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLFNBQVMsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUNuRixJQUFJO29CQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQTtZQUN2QyxDQUFDO1FBQ0gsQ0FBQztRQUNILG9CQUFDO0lBQUQsQ0F0QkEsQUFzQkMsQ0F0QjJCLElBQUksR0FzQi9CO0lBRUQ7UUFBa0MsZ0NBQUk7UUFLcEM7WUFBZ0Isa0JBQU0sRUFBRSxFQUFFLGNBQWMsQ0FBQyxDQUFBO1FBQUMsQ0FBQztRQUZwQyxrQ0FBVyxHQUFsQixjQUErQixNQUFNLENBQUMsRUFBRSxDQUFBLENBQUMsQ0FBQztRQUNuQyw2QkFBTSxHQUFiLFVBQWMsS0FBWSxJQUFhLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxLQUFLLGNBQWMsQ0FBQSxDQUFDLENBQUM7UUFIbkUscUJBQVEsR0FBa0IsSUFBSSxZQUFZLEVBQUUsQ0FBQTtRQUs1RCxtQkFBQztJQUFELENBTkEsQUFNQyxDQU5pQyxJQUFJLEdBTXJDO0lBTlksa0JBQVksZUFNeEIsQ0FBQTtJQUVEO1FBQThCLDRCQUFJO1FBRWhDLGtCQUFZLEtBQWE7WUFBSSxrQkFBTSxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUE7UUFBQyxDQUFDO1FBQ2hELDhCQUFXLEdBQWxCLGNBQStCLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQSxDQUFDLENBQUM7UUFDMUQsZUFBQztJQUFELENBSkEsQUFJQyxDQUo2QixJQUFJLEdBSWpDO0lBSlksY0FBUSxXQUlwQixDQUFBO0lBR0Q7UUFBK0IsNkJBQUk7UUFFakMsbUJBQVksS0FBYTtZQUFJLGtCQUFNLEtBQUssRUFBRSxXQUFXLENBQUMsQ0FBQTtRQUFDLENBQUM7UUFDakQsK0JBQVcsR0FBbEIsY0FBK0IsTUFBTSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQSxDQUFDLENBQUM7UUFDaEUsZ0JBQUM7SUFBRCxDQUpBLEFBSUMsQ0FKOEIsSUFBSSxHQUlsQztJQUpZLGVBQVMsWUFJckIsQ0FBQTtJQUVEO1FBQStCLDZCQUFJO1FBRWpDLG1CQUFZLEtBQWE7WUFBSSxrQkFBTSxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUE7UUFBQyxDQUFDO1FBQ2pELCtCQUFXLEdBQWxCLGNBQStCLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQSxDQUFDLENBQUM7UUFDMUQsZ0JBQUM7SUFBRCxDQUpBLEFBSUMsQ0FKOEIsSUFBSSxHQUlsQztJQUpZLGVBQVMsWUFJckIsQ0FBQTtJQUVEO1FBQTZCLDJCQUFJO1FBRS9CLGlCQUFZLEtBQWEsRUFBRSxRQUFxQixFQUFFLFFBQXFCO1lBQTVDLHdCQUFxQixHQUFyQixhQUFxQjtZQUM5QyxrQkFBTSxLQUFLLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxRQUFRLEdBQUcsUUFBUSxHQUFHLENBQUMsUUFBUSxLQUFLLEVBQUUsR0FBRyxHQUFHLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO1FBQ2hILENBQUM7UUFDSCxjQUFDO0lBQUQsQ0FMQSxBQUtDLENBTDRCLElBQUksR0FLaEM7SUFMWSxhQUFPLFVBS25CLENBQUE7SUFFRDtRQUNFLGNBQ1MsT0FBYyxFQUNkLFNBQWdCLEVBQ2hCLE1BQWEsRUFDYixLQUFZO1lBSFosWUFBTyxHQUFQLE9BQU8sQ0FBTztZQUNkLGNBQVMsR0FBVCxTQUFTLENBQU87WUFDaEIsV0FBTSxHQUFOLE1BQU0sQ0FBTztZQUNiLFVBQUssR0FBTCxLQUFLLENBQU87UUFDbEIsQ0FBQztRQUNHLDBCQUFXLEdBQWxCO1lBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsS0FBSyxjQUFjLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQzVMLENBQUM7UUFDTSxxQkFBTSxHQUFiLFVBQWMsS0FBWTtZQUN4QixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQzNKLENBQUM7UUFDSCxXQUFDO0lBQUQsQ0FiQSxBQWFDLElBQUE7SUFiWSxVQUFJLE9BYWhCLENBQUE7SUFFRDtRQUVFLGdCQUNTLE9BQWMsRUFDZCxTQUFnQixFQUNoQixNQUFhO1lBRmIsWUFBTyxHQUFQLE9BQU8sQ0FBTztZQUNkLGNBQVMsR0FBVCxTQUFTLENBQU87WUFDaEIsV0FBTSxHQUFOLE1BQU0sQ0FBTztZQUpmLFVBQUssR0FBa0IsWUFBWSxDQUFDLFFBQVEsQ0FBQTtRQUtoRCxDQUFDO1FBQ0csNEJBQVcsR0FBbEI7WUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQTtRQUN6RyxDQUFDO1FBQ00sdUJBQU0sR0FBYixVQUFjLEtBQVk7WUFDeEIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUMzSixDQUFDO1FBQ0gsYUFBQztJQUFELENBYkEsQUFhQyxJQUFBO0lBYlksWUFBTSxTQWFsQixDQUFBO0lBR0Q7UUFDRSxlQUNTLEtBQWEsRUFDYixPQUFxQjtZQUE1Qix1QkFBNEIsR0FBNUIsWUFBNEI7WUFEckIsVUFBSyxHQUFMLEtBQUssQ0FBUTtZQUNiLFlBQU8sR0FBUCxPQUFPLENBQWM7UUFDM0IsQ0FBQztRQUNOLFlBQUM7SUFBRCxDQUxBLEFBS0MsSUFBQTtJQUxZLFdBQUssUUFLakIsQ0FBQTtJQUVEO1FBQUE7UUFrQkEsQ0FBQztRQWhCUSxxQ0FBZSxHQUF0QixVQUF1QixPQUF5QixJQUFXLE1BQU0sQ0FBQyxJQUFJLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFBLENBQUMsQ0FBQztRQUMzRixrQ0FBWSxHQUFuQixVQUFvQixLQUFZLElBQVcsTUFBTSxDQUFDLElBQUksWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFBLENBQUMsQ0FBQztRQUNwRSwrQkFBUyxHQUFoQixVQUFpQixLQUFhLElBQWdCLE1BQU0sQ0FBQyxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQSxDQUFDLENBQUM7UUFDcEUsK0JBQVMsR0FBaEIsVUFBaUIsS0FBYyxJQUFnQixNQUFNLENBQUMsSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUEsQ0FBQyxDQUFDO1FBQ3JFLDZCQUFPLEdBQWQsVUFBZSxLQUFhLEVBQUUsa0JBQXFDO1lBQ2pFLEVBQUUsQ0FBQyxDQUFDLE9BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLFFBQVEsQ0FBQztnQkFBQyxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFVLGtCQUFrQixDQUFDLENBQUE7WUFDbEcsSUFBSTtnQkFBQyxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBYyxrQkFBa0IsQ0FBQyxDQUFBO1FBQzNFLENBQUM7UUFDTSw4QkFBUSxHQUFmLFVBQWdCLEtBQWEsSUFBZSxNQUFNLENBQUMsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUEsQ0FBQyxDQUFDO1FBQ2pFLGtDQUFZLEdBQW5CLGNBQXVDLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFBLENBQUMsQ0FBQztRQUM5RCw0QkFBTSxHQUFiLFVBQWMsT0FBYyxFQUFFLFNBQWdCLEVBQUUsTUFBYTtZQUMzRCxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQTtRQUMvQyxDQUFDO1FBQ00sMEJBQUksR0FBWCxVQUFZLE9BQWMsRUFBRSxTQUFnQixFQUFFLE1BQWEsRUFBRSxLQUFhO1lBQ3hFLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLEdBQUcsS0FBSyxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUNwRixDQUFDO1FBaEJhLG9CQUFRLEdBQWdCLElBQUksV0FBVyxFQUFFLENBQUE7UUFpQnpELGtCQUFDO0lBQUQsQ0FsQkEsQUFrQkMsSUFBQTtJQWxCWSxpQkFBVyxjQWtCdkIsQ0FBQTtJQUVEO1FBQUE7UUFHQSxDQUFDO1FBRmUsT0FBRSxHQUFXLHNDQUFzQyxDQUFBO1FBQ25ELGNBQVMsR0FBZSxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLFdBQVcsQ0FBQyxDQUFBO1FBQzVFLFdBQUM7SUFBRCxDQUhBLEFBR0MsSUFBQTtJQUhZLFVBQUksT0FHaEIsQ0FBQTtJQUVEO1FBQUE7UUFHQSxDQUFDO1FBRmUsTUFBRSxHQUFXLGdDQUFnQyxDQUFBO1FBQzdDLFVBQU0sR0FBZSxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLFFBQVEsQ0FBQyxDQUFBO1FBQ3JFLFVBQUM7SUFBRCxDQUhBLEFBR0MsSUFBQTtJQUhZLFNBQUcsTUFHZixDQUFBO0lBRUQ7UUFBQTtRQUlBLENBQUM7UUFIZSxNQUFFLEdBQVcsNkNBQTZDLENBQUE7UUFDMUQsUUFBSSxHQUFlLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUE7UUFDakQsY0FBVSxHQUFlLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsWUFBWSxDQUFDLENBQUE7UUFDN0UsVUFBQztJQUFELENBSkEsQUFJQyxJQUFBO0lBSlksU0FBRyxNQUlmLENBQUE7SUFFRDtRQUFBO1FBR0EsQ0FBQztRQUZlLFlBQUUsR0FBVyxtQ0FBbUMsQ0FBQTtRQUNoRCxnQkFBTSxHQUFlLElBQUksU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsUUFBUSxDQUFDLENBQUE7UUFDM0UsZ0JBQUM7SUFBRCxDQUhBLEFBR0MsSUFBQTtJQUhZLGVBQVMsWUFHckIsQ0FBQTtJQUVEO1FBQUE7UUFJQSxDQUFDO1FBSGUsUUFBRSxHQUFXLHFDQUFxQyxDQUFBO1FBQ2xELFlBQU0sR0FBZSxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLFlBQVksQ0FBQyxDQUFBO1FBQzNELFdBQUssR0FBZSxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLFdBQVcsQ0FBQyxDQUFBO1FBQ3pFLFlBQUM7SUFBRCxDQUpBLEFBSUMsSUFBQTtJQUpZLFdBQUssUUFJakIsQ0FBQTtBQUVILENBQUMsRUF0TVMsS0FBSyxLQUFMLEtBQUssUUFzTWQiLCJmaWxlIjoic2NyaXB0cy9yZGYuanMiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgZmlicmEge1xuICAndXNlIHN0cmljdCdcblxuICBpbXBvcnQgcyA9IGZpLnNlY28uc3BhcnFsXG5cbiAgZXhwb3J0IGludGVyZmFjZSBJTm9kZSBleHRlbmRzIElUZXJtIHtcbiAgICBsYW5ndWFnZT86IHN0cmluZ1xuICAgIGRhdGF0eXBlPzogSU5hbWVkTm9kZVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIE5vZGUgaW1wbGVtZW50cyBJTm9kZSB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHZhbHVlPzogc3RyaW5nLCBwdWJsaWMgdGVybVR5cGU/OiAnTmFtZWROb2RlJyB8ICdCbGFua05vZGUnIHwgJ0xpdGVyYWwnIHwgJ1ZhcmlhYmxlJyB8ICdEZWZhdWx0R3JhcGgnLCBwdWJsaWMgbGFuZ3VhZ2U/OiBzdHJpbmcsIHB1YmxpYyBkYXRhdHlwZT86IElOYW1lZE5vZGUpIHt9XG4gICAgcHVibGljIHRvQ2Fub25pY2FsKCk6IHN0cmluZyB7XG4gICAgICBzd2l0Y2ggKHRoaXMudGVybVR5cGUpIHtcbiAgICAgICAgY2FzZSAnTmFtZWROb2RlJzogcmV0dXJuICc8JyArIHRoaXMudmFsdWUgKyAnPidcbiAgICAgICAgY2FzZSAnQmxhbmtOb2RlJzogcmV0dXJuICdfOicgKyB0aGlzLnZhbHVlXG4gICAgICAgIGNhc2UgJ0xpdGVyYWwnOiByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy52YWx1ZSkgKyAodGhpcy5sYW5ndWFnZSA/ICdAJyArIHRoaXMubGFuZ3VhZ2UgOiAodGhpcy5kYXRhdHlwZS5lcXVhbHMoWE1MU2NoZW1hLnN0cmluZykgPyAnJyA6ICdeXicgKyB0aGlzLmRhdGF0eXBlLnRvQ2Fub25pY2FsKCkpKVxuICAgICAgICBjYXNlICdWYXJpYWJsZSc6IHJldHVybiAnPycgKyB0aGlzLnZhbHVlXG4gICAgICAgIGNhc2UgJ0RlZmF1bHRHcmFwaCc6IHJldHVybiAnJ1xuICAgICAgICBkZWZhdWx0OiB0aHJvdyAnVW5rbm93biB0ZXJtIHR5cGUgJyArIHRoaXMudGVybVR5cGVcbiAgICAgIH1cbiAgICB9XG4gICAgcHVibGljIGVxdWFscyhvdGhlcjogSVRlcm0pOiBib29sZWFuIHtcbiAgICAgIHJldHVybiB0aGlzLnRlcm1UeXBlID09PSBvdGhlci50ZXJtVHlwZSAmJiB0aGlzLnZhbHVlID09PSBvdGhlci52YWx1ZSAmJiAodGhpcy50ZXJtVHlwZSAhPT0gJ0xpdGVyYWwnIHx8ICh0aGlzLmxhbmd1YWdlID09PSAoPElMaXRlcmFsPm90aGVyKS5sYW5ndWFnZSAmJiB0aGlzLmRhdGF0eXBlID09PSAoPElMaXRlcmFsPm90aGVyKS5kYXRhdHlwZSkpXG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIFNwYXJxbEJpbmRpbmdOb2RlIGV4dGVuZHMgTm9kZSB7XG4gICAgcHVibGljIHRlcm1UeXBlOiAnTmFtZWROb2RlJyB8ICdCbGFua05vZGUnIHwgJ0xpdGVyYWwnXG4gICAgY29uc3RydWN0b3IoYmluZGluZzogcy5JU3BhcnFsQmluZGluZykge1xuICAgICAgc3VwZXIoKVxuICAgICAgdGhpcy52YWx1ZSA9IGJpbmRpbmcudmFsdWVcbiAgICAgIHN3aXRjaCAoYmluZGluZy50eXBlKSB7XG4gICAgICAgIGNhc2UgJ2xpdGVyYWwnOlxuICAgICAgICAgIHRoaXMudGVybVR5cGUgPSAnTGl0ZXJhbCdcbiAgICAgICAgICB0aGlzLmxhbmd1YWdlID0gYmluZGluZ1sneG1sOmxhbmcnXSA/IGJpbmRpbmdbJ3htbDpsYW5nJ10gOiAnJ1xuICAgICAgICAgIHRoaXMuZGF0YXR5cGUgPSBiaW5kaW5nLmRhdGF0eXBlID8gbmV3IE5hbWVkTm9kZShiaW5kaW5nLmRhdGF0eXBlKSA6ICh0aGlzLmxhbmd1YWdlICE9PSAnJyA/IFJERi5sYW5nU3RyaW5nIDogWE1MU2NoZW1hLnN0cmluZylcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICd1cmknOlxuICAgICAgICAgIHRoaXMudGVybVR5cGUgPSAnTmFtZWROb2RlJ1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJ2Jub2RlJzpcbiAgICAgICAgICB0aGlzLnRlcm1UeXBlID0gJ0JsYW5rTm9kZSdcbiAgICAgICAgICBicmVha1xuICAgICAgICBkZWZhdWx0OiB0aHJvdyAnVW5rbm93biBiaW5kaW5nIHR5cGUgJyArIGJpbmRpbmcudHlwZSArICcgZm9yICcgKyBiaW5kaW5nXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIE5vZGVGcm9tTm9kZSBleHRlbmRzIE5vZGUge1xuICAgIGNvbnN0cnVjdG9yKG90aGVyOiBJTm9kZSkge1xuICAgICAgc3VwZXIob3RoZXIudmFsdWUsIG90aGVyLnRlcm1UeXBlLCBvdGhlci5sYW5ndWFnZSwgb3RoZXIuZGF0YXR5cGUpXG4gICAgfVxuICB9XG5cbiAgY2xhc3MgQ2Fub25pY2FsTm9kZSBleHRlbmRzIE5vZGUge1xuICAgIHB1YmxpYyBkYXRhdHlwZTogSU5hbWVkTm9kZVxuICAgIHB1YmxpYyBsYW5ndWFnZTogc3RyaW5nXG4gICAgY29uc3RydWN0b3IoaWQ6IHN0cmluZykge1xuICAgICAgc3VwZXIoKVxuICAgICAgaWYgKGlkLmluZGV4T2YoJzwnKSA9PT0gMCkge1xuICAgICAgICB0aGlzLnRlcm1UeXBlID0gJ05hbWVkTm9kZSdcbiAgICAgICAgdGhpcy52YWx1ZSA9IGlkLnN1YnN0cmluZygxLCBpZC5sZW5ndGggLSAxKVxuICAgICAgfSBlbHNlIGlmIChpZC5pbmRleE9mKCdfOicpID09PSAwKSB7XG4gICAgICAgIHRoaXMudGVybVR5cGUgPSAnQmxhbmtOb2RlJ1xuICAgICAgICB0aGlzLnZhbHVlID0gaWQuc3Vic3RyaW5nKDIpXG4gICAgICB9IGVsc2UgaWYgKGlkLmluZGV4T2YoJ1wiJykgPT09IDApIHtcbiAgICAgICAgdGhpcy50ZXJtVHlwZSA9ICdMaXRlcmFsJ1xuICAgICAgICB0aGlzLnZhbHVlID0gaWQuc3Vic3RyaW5nKDEsIGlkLmxhc3RJbmRleE9mKCdcIicpKVxuICAgICAgICBpZiAoaWQubGFzdEluZGV4T2YoJ0AnKSA9PT0gaWQubGFzdEluZGV4T2YoJ1wiJykgKyAxKSB7XG4gICAgICAgICAgdGhpcy5sYW5ndWFnZSA9IGlkLnN1YnN0cmluZyhpZC5sYXN0SW5kZXhPZignQCcpKVxuICAgICAgICAgIHRoaXMuZGF0YXR5cGUgPSBSREYubGFuZ1N0cmluZ1xuICAgICAgICB9IGVsc2UgaWYgKGlkLmxhc3RJbmRleE9mKCdeXjwnKSA9PT0gaWQubGFzdEluZGV4T2YoJ1wiJykgKyAxKVxuICAgICAgICAgIHRoaXMuZGF0YXR5cGUgPSBuZXcgTmFtZWROb2RlKGlkLnN1YnN0cmluZyhpZC5sYXN0SW5kZXhPZignXl48JyksIGlkLmxlbmd0aCAtIDEpKVxuICAgICAgICBlbHNlIHRoaXMuZGF0YXR5cGUgPSBYTUxTY2hlbWEuc3RyaW5nXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIERlZmF1bHRHcmFwaCBleHRlbmRzIE5vZGUgaW1wbGVtZW50cyBJRGVmYXVsdEdyYXBoIHtcbiAgICBwdWJsaWMgc3RhdGljIGluc3RhbmNlOiBJRGVmYXVsdEdyYXBoID0gbmV3IERlZmF1bHRHcmFwaCgpXG4gICAgcHVibGljIHRlcm1UeXBlOiAnRGVmYXVsdEdyYXBoJ1xuICAgIHB1YmxpYyB0b0Nhbm9uaWNhbCgpOiBzdHJpbmcgeyByZXR1cm4gJycgfVxuICAgIHB1YmxpYyBlcXVhbHMob3RoZXI6IElUZXJtKTogYm9vbGVhbiB7IHJldHVybiBvdGhlci50ZXJtVHlwZSA9PT0gJ0RlZmF1bHRHcmFwaCcgfVxuICAgIGNvbnN0cnVjdG9yKCkgeyBzdXBlcignJywgJ0RlZmF1bHRHcmFwaCcpIH1cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBWYXJpYWJsZSBleHRlbmRzIE5vZGUgaW1wbGVtZW50cyBJVmFyaWFibGUge1xuICAgIHB1YmxpYyB0ZXJtVHlwZTogJ1ZhcmlhYmxlJ1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlOiBzdHJpbmcpIHsgc3VwZXIodmFsdWUsICdWYXJpYWJsZScpIH1cbiAgICBwdWJsaWMgdG9DYW5vbmljYWwoKTogc3RyaW5nIHsgcmV0dXJuICc/JyArIHRoaXMudmFsdWUgfVxuICB9XG5cblxuICBleHBvcnQgY2xhc3MgTmFtZWROb2RlIGV4dGVuZHMgTm9kZSBpbXBsZW1lbnRzIElOYW1lZE5vZGUge1xuICAgIHB1YmxpYyB0ZXJtVHlwZTogJ05hbWVkTm9kZSdcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZTogc3RyaW5nKSB7IHN1cGVyKHZhbHVlLCAnTmFtZWROb2RlJykgfVxuICAgIHB1YmxpYyB0b0Nhbm9uaWNhbCgpOiBzdHJpbmcgeyByZXR1cm4gJzwnICsgdGhpcy52YWx1ZSArICc+JyB9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgQmxhbmtOb2RlIGV4dGVuZHMgTm9kZSBpbXBsZW1lbnRzIElCbGFua05vZGUge1xuICAgIHB1YmxpYyB0ZXJtVHlwZTogJ0JsYW5rTm9kZSdcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZTogc3RyaW5nKSB7IHN1cGVyKHZhbHVlLCAnQmxhbmtOb2RlJykgfVxuICAgIHB1YmxpYyB0b0Nhbm9uaWNhbCgpOiBzdHJpbmcgeyByZXR1cm4gJz8nICsgdGhpcy52YWx1ZSB9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgTGl0ZXJhbCBleHRlbmRzIE5vZGUgaW1wbGVtZW50cyBJTGl0ZXJhbCB7XG4gICAgcHVibGljIHRlcm1UeXBlOiAnTGl0ZXJhbCdcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZTogc3RyaW5nLCBsYW5ndWFnZTogc3RyaW5nID0gJycsIGRhdGF0eXBlPzogSU5hbWVkTm9kZSkge1xuICAgICAgc3VwZXIodmFsdWUsICdMaXRlcmFsJywgbGFuZ3VhZ2UsIGRhdGF0eXBlID8gZGF0YXR5cGUgOiAobGFuZ3VhZ2UgIT09ICcnID8gUkRGLmxhbmdTdHJpbmcgOiBYTUxTY2hlbWEuc3RyaW5nKSlcbiAgICB9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgUXVhZCBpbXBsZW1lbnRzIElRdWFkIHtcbiAgICBjb25zdHJ1Y3RvciAoXG4gICAgICBwdWJsaWMgc3ViamVjdDogSU5vZGUsXG4gICAgICBwdWJsaWMgcHJlZGljYXRlOiBJTm9kZSxcbiAgICAgIHB1YmxpYyBvYmplY3Q6IElOb2RlLFxuICAgICAgcHVibGljIGdyYXBoOiBJTm9kZVxuICAgICkge31cbiAgICBwdWJsaWMgdG9DYW5vbmljYWwoKTogc3RyaW5nIHtcbiAgICAgcmV0dXJuIHRoaXMuc3ViamVjdC50b0Nhbm9uaWNhbCgpICsgJyAnICsgdGhpcy5wcmVkaWNhdGUudG9DYW5vbmljYWwoKSArICcgJyArIHRoaXMub2JqZWN0LnRvQ2Fub25pY2FsKCkgKyAodGhpcy5ncmFwaC50ZXJtVHlwZSA9PT0gJ0RlZmF1bHRHcmFwaCcgPyAnJyA6ICgnICcgKyB0aGlzLmdyYXBoLnRvQ2Fub25pY2FsKCkpKVxuICAgIH1cbiAgICBwdWJsaWMgZXF1YWxzKG90aGVyOiBJUXVhZCk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIHRoaXMuc3ViamVjdC5lcXVhbHMob3RoZXIuc3ViamVjdCkgJiYgdGhpcy5wcmVkaWNhdGUuZXF1YWxzKG90aGVyLnByZWRpY2F0ZSkgJiYgdGhpcy5vYmplY3QuZXF1YWxzKG90aGVyLm9iamVjdCkgJiYgdGhpcy5ncmFwaC5lcXVhbHMob3RoZXIuZ3JhcGgpXG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIFRyaXBsZSBpbXBsZW1lbnRzIElUcmlwbGUge1xuICAgIHB1YmxpYyBncmFwaDogSURlZmF1bHRHcmFwaCA9IERlZmF1bHRHcmFwaC5pbnN0YW5jZVxuICAgIGNvbnN0cnVjdG9yIChcbiAgICAgIHB1YmxpYyBzdWJqZWN0OiBJTm9kZSxcbiAgICAgIHB1YmxpYyBwcmVkaWNhdGU6IElOb2RlLFxuICAgICAgcHVibGljIG9iamVjdDogSU5vZGVcbiAgICApIHt9XG4gICAgcHVibGljIHRvQ2Fub25pY2FsKCk6IHN0cmluZyB7XG4gICAgIHJldHVybiB0aGlzLnN1YmplY3QudG9DYW5vbmljYWwoKSArICcgJyArIHRoaXMucHJlZGljYXRlLnRvQ2Fub25pY2FsKCkgKyAnICcgKyB0aGlzLm9iamVjdC50b0Nhbm9uaWNhbCgpXG4gICAgfVxuICAgIHB1YmxpYyBlcXVhbHMob3RoZXI6IElRdWFkKTogYm9vbGVhbiB7XG4gICAgICByZXR1cm4gdGhpcy5zdWJqZWN0LmVxdWFscyhvdGhlci5zdWJqZWN0KSAmJiB0aGlzLnByZWRpY2F0ZS5lcXVhbHMob3RoZXIucHJlZGljYXRlKSAmJiB0aGlzLm9iamVjdC5lcXVhbHMob3RoZXIub2JqZWN0KSAmJiB0aGlzLmdyYXBoLmVxdWFscyhvdGhlci5ncmFwaClcbiAgICB9XG4gIH1cblxuXG4gIGV4cG9ydCBjbGFzcyBHcmFwaCB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgZ3JhcGg/OiBJTm9kZSxcbiAgICAgIHB1YmxpYyB0cmlwbGVzOiBJUXVhZFtdID0gW11cbiAgICApIHt9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgRGF0YUZhY3RvcnkgaW1wbGVtZW50cyBJRGF0YUZhY3Rvcnkge1xuICAgIHB1YmxpYyBzdGF0aWMgaW5zdGFuY2U6IERhdGFGYWN0b3J5ID0gbmV3IERhdGFGYWN0b3J5KClcbiAgICBwdWJsaWMgbm9kZUZyb21CaW5kaW5nKGJpbmRpbmc6IHMuSVNwYXJxbEJpbmRpbmcpOiBJTm9kZSB7IHJldHVybiBuZXcgU3BhcnFsQmluZGluZ05vZGUoYmluZGluZykgfVxuICAgIHB1YmxpYyBub2RlRnJvbU5vZGUob3RoZXI6IElUZXJtKTogSU5vZGUgeyByZXR1cm4gbmV3IE5vZGVGcm9tTm9kZShvdGhlcikgfVxuICAgIHB1YmxpYyBuYW1lZE5vZGUodmFsdWU6IHN0cmluZyk6IElOYW1lZE5vZGUgeyByZXR1cm4gbmV3IE5hbWVkTm9kZSh2YWx1ZSkgfVxuICAgIHB1YmxpYyBibGFua05vZGUodmFsdWU/OiBzdHJpbmcpOiBJQmxhbmtOb2RlIHsgcmV0dXJuIG5ldyBCbGFua05vZGUodmFsdWUpIH1cbiAgICBwdWJsaWMgbGl0ZXJhbCh2YWx1ZTogc3RyaW5nLCBsYW5ndWFnZU9yRGF0YXR5cGU/OiBzdHJpbmd8TmFtZWROb2RlKTogSUxpdGVyYWwge1xuICAgICAgaWYgKHR5cGVvZihsYW5ndWFnZU9yRGF0YXR5cGUpID09PSAnc3RyaW5nJykgcmV0dXJuIG5ldyBMaXRlcmFsKHZhbHVlLCA8c3RyaW5nPmxhbmd1YWdlT3JEYXRhdHlwZSlcbiAgICAgIGVsc2UgcmV0dXJuIG5ldyBMaXRlcmFsKHZhbHVlLCB1bmRlZmluZWQgLCA8TmFtZWROb2RlPmxhbmd1YWdlT3JEYXRhdHlwZSlcbiAgICB9XG4gICAgcHVibGljIHZhcmlhYmxlKHZhbHVlOiBzdHJpbmcpOiBJVmFyaWFibGUgeyByZXR1cm4gbmV3IFZhcmlhYmxlKHZhbHVlKSB9XG4gICAgcHVibGljIGRlZmF1bHRHcmFwaCgpOiBJRGVmYXVsdEdyYXBoIHsgcmV0dXJuIERlZmF1bHRHcmFwaC5pbnN0YW5jZSB9XG4gICAgcHVibGljIHRyaXBsZShzdWJqZWN0OiBJVGVybSwgcHJlZGljYXRlOiBJVGVybSwgb2JqZWN0OiBJVGVybSk6IElRdWFkIHtcbiAgICAgIHJldHVybiBuZXcgVHJpcGxlKHN1YmplY3QsIHByZWRpY2F0ZSwgb2JqZWN0KVxuICAgIH1cbiAgICBwdWJsaWMgcXVhZChzdWJqZWN0OiBJVGVybSwgcHJlZGljYXRlOiBJVGVybSwgb2JqZWN0OiBJVGVybSwgZ3JhcGg/OiBJVGVybSk6IElRdWFkIHtcbiAgICAgIHJldHVybiBuZXcgUXVhZChzdWJqZWN0LCBwcmVkaWNhdGUsIG9iamVjdCwgZ3JhcGggPyBncmFwaCA6IERlZmF1bHRHcmFwaC5pbnN0YW5jZSlcbiAgICB9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgU0tPUyB7XG4gICAgcHVibGljIHN0YXRpYyBuczogc3RyaW5nID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDQvMDIvc2tvcy9jb3JlIydcbiAgICBwdWJsaWMgc3RhdGljIHByZWZMYWJlbDogSU5hbWVkTm9kZSA9IG5ldyBOYW1lZE5vZGUoU0tPUy5ucyArICdwcmVmTGFiZWwnKVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIE9XTCB7XG4gICAgcHVibGljIHN0YXRpYyBuczogc3RyaW5nID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDIvMDcvb3dsIydcbiAgICBwdWJsaWMgc3RhdGljIHNhbWVBczogSU5hbWVkTm9kZSA9IG5ldyBOYW1lZE5vZGUoT1dMLm5zICsgJ3NhbWVBcycpXG4gIH1cblxuICBleHBvcnQgY2xhc3MgUkRGIHtcbiAgICBwdWJsaWMgc3RhdGljIG5zOiBzdHJpbmcgPSAnaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIydcbiAgICBwdWJsaWMgc3RhdGljIHR5cGU6IElOYW1lZE5vZGUgPSBuZXcgTmFtZWROb2RlKFJERi5ucyArICd0eXBlJylcbiAgICBwdWJsaWMgc3RhdGljIGxhbmdTdHJpbmc6IElOYW1lZE5vZGUgPSBuZXcgTmFtZWROb2RlKFJERi5ucyArICdsYW5nU3RyaW5nJylcbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBYTUxTY2hlbWEge1xuICAgIHB1YmxpYyBzdGF0aWMgbnM6IHN0cmluZyA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYSMnXG4gICAgcHVibGljIHN0YXRpYyBzdHJpbmc6IElOYW1lZE5vZGUgPSBuZXcgTmFtZWROb2RlKFhNTFNjaGVtYS5ucyArICdzdHJpbmcnKVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIENJRE9DIHtcbiAgICBwdWJsaWMgc3RhdGljIG5zOiBzdHJpbmcgPSAnaHR0cDovL3d3dy5jaWRvYy1jcm0ub3JnL2NpZG9jLWNybS8nXG4gICAgcHVibGljIHN0YXRpYyBQZXJzb246IElOYW1lZE5vZGUgPSBuZXcgTmFtZWROb2RlKENJRE9DLm5zICsgJ0UyMV9QZXJzb24nKVxuICAgIHB1YmxpYyBzdGF0aWMgUGxhY2U6IElOYW1lZE5vZGUgPSBuZXcgTmFtZWROb2RlKENJRE9DLm5zICsgJ0U1M19QbGFjZScpXG4gIH1cblxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

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
        }
        return SparqlAutocompleteComponentController;
    }());/*<auto_generate>*/angular.module('fibra').controller('SparqlAutocompleteComponentController',['$q','sparqlAutocompleteService',function(){return new (Function.prototype.bind.apply(SparqlAutocompleteComponentController,[null].concat(Array.prototype.slice.apply(arguments))));}]);/*</auto_generate>*/
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
        }
        return SparqlAutocompleteComponent;
    }());/*<auto_generate>*/angular.module('fibra').component('sparqlAutocomplete',new SparqlAutocompleteComponent());/*</auto_generate>*/
    fibra.SparqlAutocompleteComponent = SparqlAutocompleteComponent;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvc3BhcnFsLWF1dG9jb21wbGV0ZS1jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBVSxLQUFLLENBcURkO0FBckRELFdBQVUsS0FBSyxFQUFDLENBQUM7SUFDZixZQUFZLENBQUE7SUFDWjtRQW9DRSwrQ0FBb0IsRUFBcUIsRUFBVSx5QkFBb0Q7WUFwQ3pHLGlCQXVDQztZQUhxQixPQUFFLEdBQUYsRUFBRSxDQUFtQjtZQUFVLDhCQUF5QixHQUF6Qix5QkFBeUIsQ0FBMkI7WUFoQ2hHLFVBQUssR0FBWSxLQUFLLENBQUE7WUFDdEIsT0FBRSxHQUEyQixZQUFZLENBQUE7WUFHekMsYUFBUSxHQUE0QixVQUFDLEtBQWE7Z0JBQ3ZELEtBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUE7Z0JBQ3hCLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtnQkFDaEMsS0FBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUE7Z0JBQ3hCLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO2dCQUNsQixFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsRUFBRSxLQUFLLFlBQVksQ0FBQztvQkFDM0IsS0FBSSxDQUFDLHlCQUF5QixDQUFDLHdCQUF3QixDQUFDLEtBQUssRUFBRSxLQUFJLENBQUMsS0FBSyxFQUFFLEtBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUNyRyxVQUFDLG1CQUEwQzt3QkFDekMsS0FBSSxDQUFDLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQTt3QkFDbEMsS0FBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUE7b0JBQzNCLENBQUMsRUFDRDt3QkFDRSxLQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQTt3QkFDekIsS0FBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUE7b0JBQ25CLENBQUMsQ0FDRixDQUFBO2dCQUNILElBQUk7b0JBQ0YsS0FBSSxDQUFDLHlCQUF5QixDQUFDLG1CQUFtQixDQUFDLEtBQUssRUFBRSxLQUFJLENBQUMsS0FBSyxFQUFFLEtBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUNoRyxVQUFDLGNBQTZCO3dCQUM1QixLQUFJLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQTt3QkFDN0IsS0FBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUE7b0JBQzNCLENBQUMsRUFDRDt3QkFDRSxLQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQTt3QkFDekIsS0FBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUE7b0JBQ25CLENBQUMsQ0FDRixDQUFBO1lBQ0wsQ0FBQyxDQUFBO1lBRUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUE7UUFDN0IsQ0FBQztRQUNILDRDQUFDO0lBQUQsQ0F2Q0EsQUF1Q0MsSUFBQTtJQUVEO1FBQUE7WUFDVyxhQUFRLEdBQTJCO2dCQUN4QyxXQUFXLEVBQUUsR0FBRztnQkFDaEIsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsUUFBUSxFQUFFLEdBQUc7Z0JBQ2IsRUFBRSxFQUFFLEdBQUc7YUFDUixDQUFBO1lBQ00sZUFBVSxHQUFhLHFDQUFxQyxDQUFBO1lBQzVELGdCQUFXLEdBQVcsbUNBQW1DLENBQUE7UUFDcEUsQ0FBQztRQUFELGtDQUFDO0lBQUQsQ0FUQSxBQVNDLElBQUE7SUFUWSxpQ0FBMkIsOEJBU3ZDLENBQUE7QUFDSCxDQUFDLEVBckRTLEtBQUssS0FBTCxLQUFLLFFBcURkIiwiZmlsZSI6InNjcmlwdHMvc3BhcnFsLWF1dG9jb21wbGV0ZS1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgZmlicmEge1xuICAndXNlIHN0cmljdCdcbiAgY2xhc3MgU3BhcnFsQXV0b2NvbXBsZXRlQ29tcG9uZW50Q29udHJvbGxlciB7XG4gICAgcHVibGljIGxpbWl0OiBudW1iZXJcbiAgICBwdWJsaWMgcXVlcnlSdW5uaW5nOiBib29sZWFuXG4gICAgcHVibGljIG9uU2VsZWN0OiAoc2VsZWN0aW9uOiBSZXN1bHQpID0+IHZvaWRcbiAgICBwdWJsaWMgZXJyb3I6IGJvb2xlYW4gPSBmYWxzZVxuICAgIHB1YmxpYyBieTogJ2RhdGFzb3VyY2UnIHwgJ2dyb3VwJyA9ICdkYXRhc291cmNlJ1xuICAgIHByaXZhdGUgcmVzdWx0czogKFJlc3VsdHNCeURhdGFzb3VyY2V8UmVzdWx0R3JvdXApW11cbiAgICBwcml2YXRlIGNhbmNlbGxlcjogYW5ndWxhci5JRGVmZXJyZWQ8YW55PlxuICAgIHB1YmxpYyBvbkNoYW5nZTogKHF1ZXJ5OiBzdHJpbmcpID0+IHZvaWQgPSAocXVlcnk6IHN0cmluZykgPT4ge1xuICAgICAgdGhpcy5jYW5jZWxsZXIucmVzb2x2ZSgpXG4gICAgICB0aGlzLmNhbmNlbGxlciA9IHRoaXMuJHEuZGVmZXIoKVxuICAgICAgdGhpcy5xdWVyeVJ1bm5pbmcgPSB0cnVlXG4gICAgICB0aGlzLmVycm9yID0gZmFsc2VcbiAgICAgIGlmICh0aGlzLmJ5ID09PSAnZGF0YXNvdXJjZScpXG4gICAgICAgIHRoaXMuc3BhcnFsQXV0b2NvbXBsZXRlU2VydmljZS5hdXRvY29tcGxldGVCeURhdGFzb3VyY2UocXVlcnksIHRoaXMubGltaXQsIHRoaXMuY2FuY2VsbGVyLnByb21pc2UpLnRoZW4oXG4gICAgICAgICAgKHJlc3VsdHNCeURhdGFzb3VyY2U6IFJlc3VsdHNCeURhdGFzb3VyY2VbXSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZXN1bHRzID0gcmVzdWx0c0J5RGF0YXNvdXJjZVxuICAgICAgICAgICAgdGhpcy5xdWVyeVJ1bm5pbmcgPSBmYWxzZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5xdWVyeVJ1bm5pbmcgPSBmYWxzZVxuICAgICAgICAgICAgdGhpcy5lcnJvciA9IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIClcbiAgICAgIGVsc2VcbiAgICAgICAgdGhpcy5zcGFycWxBdXRvY29tcGxldGVTZXJ2aWNlLmF1dG9jb21wbGV0ZUJ5R3JvdXAocXVlcnksIHRoaXMubGltaXQsIHRoaXMuY2FuY2VsbGVyLnByb21pc2UpLnRoZW4oXG4gICAgICAgICAgKHJlc3VsdHNCeUdyb3VwOiBSZXN1bHRHcm91cFtdKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlc3VsdHMgPSByZXN1bHRzQnlHcm91cFxuICAgICAgICAgICAgdGhpcy5xdWVyeVJ1bm5pbmcgPSBmYWxzZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5xdWVyeVJ1bm5pbmcgPSBmYWxzZVxuICAgICAgICAgICAgdGhpcy5lcnJvciA9IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIClcbiAgICB9XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkcTogYW5ndWxhci5JUVNlcnZpY2UsIHByaXZhdGUgc3BhcnFsQXV0b2NvbXBsZXRlU2VydmljZTogU3BhcnFsQXV0b2NvbXBsZXRlU2VydmljZSkge1xuICAgICAgdGhpcy5jYW5jZWxsZXIgPSAkcS5kZWZlcigpXG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIFNwYXJxbEF1dG9jb21wbGV0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIGFuZ3VsYXIuSUNvbXBvbmVudE9wdGlvbnMge1xuICAgICAgcHVibGljIGJpbmRpbmdzOiB7W2lkOiBzdHJpbmddOiBzdHJpbmd9ID0ge1xuICAgICAgICBjb25zdHJhaW50czogJzwnLFxuICAgICAgICBsaW1pdDogJ0AnLFxuICAgICAgICBvblNlbGVjdDogJyYnLFxuICAgICAgICBieTogJ0AnXG4gICAgICB9XG4gICAgICBwdWJsaWMgY29udHJvbGxlcjogRnVuY3Rpb24gPSBTcGFycWxBdXRvY29tcGxldGVDb21wb25lbnRDb250cm9sbGVyXG4gICAgICBwdWJsaWMgdGVtcGxhdGVVcmw6IHN0cmluZyA9ICdwYXJ0aWFscy9zcGFycWwtYXV0b2NvbXBsZXRlLmh0bWwnXG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

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
    var SparqlAutocompleteService = (function () {
        function SparqlAutocompleteService(workerService) {
            this.workerService = workerService;
        }
        SparqlAutocompleteService.prototype.autocompleteByDatasource = function (query, limit, canceller) {
            return this.workerService.call('sparqlAutocompleteWorkerService', 'autocompleteByDatasource', [query, limit], canceller);
        };
        SparqlAutocompleteService.prototype.autocompleteByGroup = function (query, limit, canceller) {
            return this.workerService.call('sparqlAutocompleteWorkerService', 'autocompleteByGroup', [query, limit], canceller);
        };
        SparqlAutocompleteService.queryTemplate = "\nPREFIX text: <http://jena.apache.org/text#>\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\nPREFIX skos: <http://www.w3.org/2004/02/skos/core#>\nPREFIX owl: <http://www.w3.org/2002/07/owl#>\nPREFIX sf: <http://ldf.fi/functions#>\n\nSELECT ?groupId ?groupLabel ?id ?matchedLabel ?prefLabel ?altLabel ?type ?typeLabel ?sameAs ?ifpWikipediaPage ?ifpODBNId {\n  {\n    SELECT ?groupId ?id (SAMPLE(?matchedLabelS) AS ?matchedLabel) {\n      {\n        SELECT ?groupId ?id (SUM(?sc) AS ?score) {\n          {\n            SELECT ?groupId ?id ?sc {\n              BIND(CONCAT(REPLACE(<QUERY>,\"([\\\\+\\\\-\\\\&\\\\|\\\\!\\\\(\\\\)\\\\{\\\\}\\\\[\\\\]\\\\^\\\\\\\"\\\\~\\\\*\\\\?\\\\:\\\\/\\\\\\\\])\",\"\\\\$1\"),\"*\") AS ?query)\n              (?id ?sc) text:query ?query .\n              ?id a ?groupId .\n              # CONSTRAINTS\n            } LIMIT <LIMIT>\n          } UNION {\n            BIND(CONCAT(\"\\\"\",REPLACE(<QUERY>,\"([\\\\+\\\\-\\\\&\\\\|\\\\!\\\\(\\\\)\\\\{\\\\}\\\\[\\\\]\\\\^\\\\\\\"\\\\~\\\\*\\\\?\\\\:\\\\/\\\\\\\\])\",\"\\\\$1\"),\"\\\"\") AS ?query)\n            (?id ?sc) text:query ?query .\n            ?id a ?groupId .\n            # CONSTRAINTS\n          }\n        }\n        GROUP BY ?groupId ?id\n      }\n      FILTER (?id!=<http://ldf.fi/schoenberg/actor_>) # SCHOENBERG BUG\n      ?id skos:prefLabel|rdfs:label|skos:altLabel ?matchedLabelS\n      FILTER (REGEX(LCASE(?matchedLabelS),CONCAT(\"\\\\b\",LCASE(<QUERY>))))\n    }\n    GROUP BY ?groupId ?id ?score\n    HAVING(BOUND(?id))\n    ORDER BY DESC(?score)\n  }\n  ?groupId sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?groupLabel) .\n  ?id sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?prefLabel) .\n  BIND(?groupId AS ?type)\n  BIND(?groupLabel AS ?typeLabel)\n  OPTIONAL {\n    ?id skos:altLabel ?altLabel .\n  }\n  OPTIONAL {\n    ?id owl:sameAs ?sameAs .\n  }\n  OPTIONAL {\n    {\n      ?id <http://emlo.bodleian.ox.ac.uk/schema#cofk_union_relationship_type-is_related_to> ?ref .\n      FILTER(REGEX(STR(?ref),'http://..\\\\.wikipedia\\\\.org/wiki/'))\n      BIND(?ref AS ?ifpWikipediaPage)\n    } UNION {\n      ?id <http://emlo.bodleian.ox.ac.uk/schema#cofk_union_relationship_type-is_related_to> ?ref .\n      FILTER(STRSTARTS(STR(?ref),'http://www.oxforddnb.com/view/article/'))\n      BIND(REPLACE(STR(?ref),'http://www.oxforddnb.com/view/article/([^?]*).*','$1') AS ?ifpODBNId)\n    } UNION {\n      ?id <http://ldf.fi/procope-schema#wikipediaUrl> ?ref .\n      BIND(IRI(?ref) AS ?ifpWikipediaPage)\n    } UNION {\n      ?id <http://ldf.fi/sdfb/schema#odbnId> ?ifpODBNId .\n    }\n  }\n}\n";
        return SparqlAutocompleteService;
    }());/*<auto_generate>*/angular.module('fibra').service('sparqlAutocompleteService',['workerService',function(){return new (Function.prototype.bind.apply(SparqlAutocompleteService,[null].concat(Array.prototype.slice.apply(arguments))));}]);/*</auto_generate>*/
    fibra.SparqlAutocompleteService = SparqlAutocompleteService;
    var SparqlAutocompleteWorkerService = (function () {
        function SparqlAutocompleteWorkerService($q, sparqlService, configurationWorkerService) {
            this.$q = $q;
            this.sparqlService = sparqlService;
            this.configurationWorkerService = configurationWorkerService;
        }
        SparqlAutocompleteWorkerService.prototype.autocompleteByDatasource = function (query, limit, canceller) {
            var _this = this;
            var configurations = this.configurationWorkerService.configuration.allEndpoints();
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
            var configurations = this.configurationWorkerService.configuration.allEndpoints();
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
                var result = idToResult[resultNode.toCanonical()];
                // FIXME refactor into something sensible. This even still does not guarantee unique results
                if (!result && binding['sameAs'])
                    result = idToResult[new fibra.SparqlBindingNode(binding['sameAs']).toCanonical()];
                if (!result)
                    ifpVars.forEach(function (ifpVar) {
                        if (binding[ifpVar])
                            result = idToResult[fibra.goc(ifpToId, ifpVar)[new fibra.SparqlBindingNode(binding[ifpVar]).toCanonical()]];
                    });
                if (!result) {
                    result = new Result(resultNode, rg, configuration, new fibra.SparqlBindingNode(binding['matchedLabel']), new fibra.SparqlBindingNode(binding['prefLabel']));
                    rg.results.push(result);
                    idToDatasource[resultNode.toCanonical()] = {};
                    idToDatasource[resultNode.toCanonical()][result.datasources[0].id] = configuration;
                    idToResult[resultNode.toCanonical()] = result;
                }
                else
                    fibra.cpush(result.datasources, fibra.goc(idToDatasource, resultNode.toCanonical()), configuration.id, configuration);
                if (binding['sameAs']) {
                    var otherNode = new fibra.SparqlBindingNode(binding['sameAs']);
                    if (!idToResult[otherNode.toCanonical()]) {
                        idToResult[otherNode.toCanonical()] = result;
                        result.ids.push(otherNode);
                    }
                    else {
                        var otherResult_1 = idToResult[otherNode.toCanonical()];
                        if (otherResult_1 !== result) {
                            otherResult_1.ids.forEach(function (otherNode) {
                                otherResult_1.datasources.forEach(function (dconfiguration) {
                                    return fibra.cpush(result.datasources, fibra.goc(idToDatasource, resultNode.toCanonical()), dconfiguration.id, dconfiguration);
                                });
                                var _loop_1 = function(varName) {
                                    otherResult_1.additionalInformation[varName].forEach(function (ai) {
                                        return fibra.cpush(fibra.goc(result.additionalInformation, varName, function () { return []; }), fibra.goc(fibra.goc(idToAdditionalInformation, resultNode.toCanonical()), varName), ai.toCanonical(), ai);
                                    });
                                };
                                for (var varName in otherResult_1.additionalInformation) {
                                    _loop_1(varName);
                                }
                                result.ids.push(otherNode);
                                idToResult[otherNode.toCanonical()] = result;
                            });
                            idToResult[otherNode.toCanonical()] = result;
                        }
                    }
                }
                ifpVars.forEach(function (ifpVar) {
                    if (binding[ifpVar]) {
                        var ifp = new fibra.SparqlBindingNode(binding[ifpVar]);
                        if (!fibra.goc(ifpToId, ifpVar)[ifp.toCanonical()]) {
                            ifpToId[ifpVar][ifp.toCanonical()] = resultNode.toCanonical();
                        }
                        else {
                            var otherResult_2 = idToResult[ifpToId[ifpVar][ifp.toCanonical()]];
                            if (otherResult_2 !== result) {
                                otherResult_2.ids.forEach(function (otherNode) {
                                    otherResult_2.datasources.forEach(function (dconfiguration) {
                                        return fibra.cpush(result.datasources, fibra.goc(idToDatasource, resultNode.toCanonical()), dconfiguration.id, dconfiguration);
                                    });
                                    var _loop_2 = function(varName) {
                                        otherResult_2.additionalInformation[varName].forEach(function (ai) {
                                            return fibra.cpush(fibra.goc(result.additionalInformation, varName, function () { return []; }), fibra.goc(fibra.goc(idToAdditionalInformation, resultNode.toCanonical()), varName), ai.toCanonical(), ai);
                                        });
                                    };
                                    for (var varName in otherResult_2.additionalInformation) {
                                        _loop_2(varName);
                                    }
                                    result.ids.push(otherNode);
                                    idToResult[otherNode.toCanonical()] = result;
                                });
                                ifpToId[ifpVar][ifp.toCanonical()] = resultNode.toCanonical();
                            }
                        }
                    }
                });
                additionalInformationVars.forEach(function (varName) {
                    if (binding[varName]) {
                        var ai = new fibra.SparqlBindingNode(binding[varName]);
                        fibra.cpush(fibra.goc(result.additionalInformation, varName, function () { return []; }), fibra.goc(fibra.goc(idToAdditionalInformation, resultNode.toCanonical()), varName), ai.toCanonical(), ai);
                    }
                });
            });
            return groupToResults;
        };
        SparqlAutocompleteWorkerService.prototype.query = function (query, limit, configurations, canceller) {
            var _this = this;
            return configurations.map(function (configuration) {
                var queryTemplate = configuration.autocompletionQueryTemplate;
                queryTemplate = queryTemplate.replace(/<QUERY>/g, s.SparqlService.stringToSPARQLString(query));
                queryTemplate = queryTemplate.replace(/# CONSTRAINTS/g, configuration.dataModelConfiguration.typeConstraints);
                queryTemplate = queryTemplate.replace(/<LIMIT>/g, '' + limit);
                return _this.sparqlService.query(configuration.endpoint.value, queryTemplate, { timeout: canceller });
            });
        };
        SparqlAutocompleteWorkerService.defaultVars = {
            'id': true, 'prefLabel': true, 'matchedLabel': true, 'groupId': true, 'groupLabel': true, 'sameAs': true
        };
        return SparqlAutocompleteWorkerService;
    }());/*<auto_generate>*/angular.module('fibra').service('sparqlAutocompleteWorkerService',['$q','sparqlService','configurationWorkerService',function(){return new (Function.prototype.bind.apply(SparqlAutocompleteWorkerService,[null].concat(Array.prototype.slice.apply(arguments))));}]);/*</auto_generate>*/
    fibra.SparqlAutocompleteWorkerService = SparqlAutocompleteWorkerService;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvc3BhcnFsLWF1dG9jb21wbGV0ZS1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQVUsS0FBSyxDQWtQZDtBQWxQRCxXQUFVLEtBQUssRUFBQyxDQUFDO0lBQ2YsWUFBWSxDQUFBO0lBRVosSUFBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUE7SUFFekI7UUFFRSw2QkFBbUIsYUFBb0M7WUFBcEMsa0JBQWEsR0FBYixhQUFhLENBQXVCO1lBRGhELG1CQUFjLEdBQWtCLEVBQUUsQ0FBQTtRQUNpQixDQUFDO1FBQzdELDBCQUFDO0lBQUQsQ0FIQSxBQUdDLElBQUE7SUFIWSx5QkFBbUIsc0JBRy9CLENBQUE7SUFFRDtRQUVFLHFCQUFtQixLQUFhO1lBQWIsVUFBSyxHQUFMLEtBQUssQ0FBUTtZQUR6QixZQUFPLEdBQWEsRUFBRSxDQUFBO1FBQ00sQ0FBQztRQUN0QyxrQkFBQztJQUFELENBSEEsQUFHQyxJQUFBO0lBSFksaUJBQVcsY0FHdkIsQ0FBQTtJQUVEO1FBSUUsZ0JBQVksRUFBUyxFQUFTLFdBQXdCLEVBQUUsVUFBaUMsRUFBUyxZQUFtQixFQUFTLFNBQWdCO1lBQWhILGdCQUFXLEdBQVgsV0FBVyxDQUFhO1lBQTRDLGlCQUFZLEdBQVosWUFBWSxDQUFPO1lBQVMsY0FBUyxHQUFULFNBQVMsQ0FBTztZQUh2SSxRQUFHLEdBQVksRUFBRSxDQUFBO1lBQ2pCLGdCQUFXLEdBQTRCLEVBQUUsQ0FBQTtZQUN6QywwQkFBcUIsR0FBaUMsRUFBRSxDQUFBO1lBRTdELElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBQ2pCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQ25DLENBQUM7UUFDSCxhQUFDO0lBQUQsQ0FSQSxBQVFDLElBQUE7SUFSWSxZQUFNLFNBUWxCLENBQUE7SUFFRDtRQW1FRSxtQ0FBb0IsYUFBNEI7WUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBRyxDQUFDO1FBQzdDLDREQUF3QixHQUEvQixVQUFnQyxLQUFhLEVBQUUsS0FBYSxFQUFFLFNBQWlDO1lBQzdGLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxpQ0FBaUMsRUFBRSwwQkFBMEIsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQTtRQUMxSCxDQUFDO1FBQ00sdURBQW1CLEdBQTFCLFVBQTJCLEtBQWEsRUFBRSxLQUFhLEVBQUUsU0FBaUM7WUFDeEYsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGlDQUFpQyxFQUFFLHFCQUFxQixFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFBO1FBQ3JILENBQUM7UUF2RWEsdUNBQWEsR0FBVyx5bUZBK0R6QyxDQUFBO1FBVUMsZ0NBQUM7SUFBRCxDQTNFQSxBQTJFQyxJQUFBO0lBM0VZLCtCQUF5Qiw0QkEyRXJDLENBQUE7SUFFRDtRQU1FLHlDQUFvQixFQUFxQixFQUFVLGFBQThCLEVBQVUsMEJBQXNEO1lBQTdILE9BQUUsR0FBRixFQUFFLENBQW1CO1lBQVUsa0JBQWEsR0FBYixhQUFhLENBQWlCO1lBQVUsK0JBQTBCLEdBQTFCLDBCQUEwQixDQUE0QjtRQUNqSixDQUFDO1FBRU0sa0VBQXdCLEdBQS9CLFVBQWdDLEtBQWEsRUFBRSxLQUFhLEVBQUUsU0FBaUM7WUFBL0YsaUJBUUM7WUFQQyxJQUFJLGNBQWMsR0FBNEIsSUFBSSxDQUFDLDBCQUEwQixDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQTtZQUMxRyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLGNBQWMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLE9BQU8sRUFBRSxLQUFLLElBQUssT0FBQSxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQUEsUUFBUTtnQkFDdkcsSUFBSSxFQUFFLEdBQXdCLElBQUksbUJBQW1CLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7Z0JBQzVFLElBQUksY0FBYyxHQUFnQyxLQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtnQkFDdEcsR0FBRyxDQUFDLENBQUMsSUFBSSxPQUFPLElBQUksY0FBYyxDQUFDO29CQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO2dCQUNuRixNQUFNLENBQUMsRUFBRSxDQUFBO1lBQ1gsQ0FBQyxDQUFDLEVBTGtGLENBS2xGLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQUVNLDZEQUFtQixHQUExQixVQUEyQixLQUFhLEVBQUUsS0FBYSxFQUFFLFNBQWlDO1lBQTFGLGlCQWNDO1lBYkMsSUFBSSxjQUFjLEdBQTRCLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUE7WUFDMUcsSUFBSSxjQUFjLEdBQWdDLEVBQUUsQ0FBQTtZQUNwRCxJQUFJLFVBQVUsR0FBMkIsRUFBRSxDQUFBO1lBQzNDLElBQUksY0FBYyxHQUEwRCxFQUFFLENBQUE7WUFDOUUsSUFBSSx5QkFBeUIsR0FBaUUsRUFBRSxDQUFBO1lBQ2hHLElBQUksT0FBTyxHQUFnRCxFQUFFLENBQUE7WUFDN0QsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxjQUFjLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxPQUFPLEVBQUUsS0FBSyxJQUFLLE9BQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFBLFFBQVE7Z0JBQ3ZHLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsY0FBYyxDQUFDLEtBQUssQ0FBQyxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSx5QkFBeUIsQ0FBQztZQUFwSSxDQUFvSSxDQUNySSxFQUZtRixDQUVuRixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ1AsSUFBSSxHQUFHLEdBQWtCLEVBQUUsQ0FBQTtnQkFDM0IsR0FBRyxDQUFDLENBQUMsSUFBSSxPQUFPLElBQUksY0FBYyxDQUFDO29CQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUE7Z0JBQ3JFLE1BQU0sQ0FBQyxHQUFHLENBQUE7WUFDWixDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUM7UUFFTyx3REFBYyxHQUF0QixVQUNFLFFBQW1HLEVBQ25HLGFBQW9DLEVBQ3BDLGNBQWdELEVBQ2hELFVBQXVDLEVBQ3ZDLE9BQXlELEVBQ3pELGNBQTBFLEVBQzFFLHlCQUE0RjtZQUo1Riw4QkFBZ0QsR0FBaEQsbUJBQWdEO1lBQ2hELDBCQUF1QyxHQUF2QyxlQUF1QztZQUN2Qyx1QkFBeUQsR0FBekQsWUFBeUQ7WUFDekQsOEJBQTBFLEdBQTFFLG1CQUEwRTtZQUMxRSx5Q0FBNEYsR0FBNUYsOEJBQTRGO1lBQzFGLElBQUkseUJBQXlCLEdBQWEsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLENBQUMsK0JBQStCLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFyRixDQUFxRixDQUFDLENBQUE7WUFDMUssSUFBSSxPQUFPLEdBQWEsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUE1QixDQUE0QixDQUFDLENBQUE7WUFDL0YsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLE9BQU87Z0JBQzVDLElBQUksRUFBRSxHQUFnQixTQUFHLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsY0FBTSxPQUFBLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBNUMsQ0FBNEMsQ0FBQyxDQUFBO2dCQUN2SCxJQUFJLFVBQVUsR0FBVSxJQUFJLHVCQUFpQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO2dCQUM1RCxJQUFJLE1BQU0sR0FBVyxVQUFVLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUE7Z0JBQ3pELDRGQUE0RjtnQkFDNUYsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUMvQixNQUFNLEdBQUcsVUFBVSxDQUFDLElBQUksdUJBQWlCLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQTtnQkFDN0UsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7b0JBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFBLE1BQU07d0JBQ2pDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQzs0QkFBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLFNBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsSUFBSSx1QkFBaUIsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUE7b0JBQ3RILENBQUMsQ0FBQyxDQUFBO2dCQUNGLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDWixNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsVUFBVSxFQUFFLEVBQUUsRUFBRSxhQUFhLEVBQUUsSUFBSSx1QkFBaUIsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxJQUFJLHVCQUFpQixDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUE7b0JBQy9JLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO29CQUN2QixjQUFjLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFBO29CQUM3QyxjQUFjLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxhQUFhLENBQUE7b0JBQ2xGLFVBQVUsQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUE7Z0JBQy9DLENBQUM7Z0JBQUMsSUFBSTtvQkFDSixXQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxTQUFHLENBQUMsY0FBYyxFQUFFLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxFQUFFLEVBQUUsYUFBYSxDQUFDLENBQUE7Z0JBQzNHLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3RCLElBQUksU0FBUyxHQUFVLElBQUksdUJBQWlCLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUE7b0JBQy9ELEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDekMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQTt3QkFDNUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7b0JBQzVCLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ04sSUFBSSxhQUFXLEdBQVcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFBO3dCQUM3RCxFQUFFLENBQUMsQ0FBQyxhQUFXLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQzs0QkFDM0IsYUFBVyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBQSxTQUFTO2dDQUMvQixhQUFXLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFBLGNBQWM7b0NBQzVDLE9BQUEsV0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsU0FBRyxDQUFDLGNBQWMsRUFBRSxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxjQUFjLENBQUMsRUFBRSxFQUFFLGNBQWMsQ0FBQztnQ0FBM0csQ0FBMkcsQ0FDNUcsQ0FBQTtnQ0FDRDtvQ0FDRSxhQUFXLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsRUFBRTt3Q0FDbkQsT0FBQSxXQUFLLENBQ0gsU0FBRyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSxPQUFPLEVBQUUsY0FBTSxPQUFBLEVBQUUsRUFBRixDQUFFLENBQUMsRUFDcEQsU0FBRyxDQUFDLFNBQUcsQ0FBQyx5QkFBeUIsRUFBRSxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFDdEUsRUFBRSxDQUFDLFdBQVcsRUFBRSxFQUFFLEVBQUUsQ0FBQztvQ0FIdkIsQ0FHdUIsQ0FDeEIsQ0FBQTs7Z0NBTkgsR0FBRyxDQUFDLENBQUMsSUFBSSxPQUFPLElBQUksYUFBVyxDQUFDLHFCQUFxQixDQUFDOztpQ0FNbkQ7Z0NBQ0gsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7Z0NBQzFCLFVBQVUsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUE7NEJBQzlDLENBQUMsQ0FBQyxDQUFBOzRCQUNGLFVBQVUsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUE7d0JBQzlDLENBQUM7b0JBQ0gsQ0FBQztnQkFDSCxDQUFDO2dCQUNELE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQSxNQUFNO29CQUNwQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNwQixJQUFJLEdBQUcsR0FBVSxJQUFJLHVCQUFpQixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO3dCQUN2RCxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUM3QyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFBO3dCQUMvRCxDQUFDO3dCQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNOLElBQUksYUFBVyxHQUFXLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQTs0QkFDeEUsRUFBRSxDQUFDLENBQUMsYUFBVyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0NBQzNCLGFBQVcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQUEsU0FBUztvQ0FDL0IsYUFBVyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBQSxjQUFjO3dDQUM1QyxPQUFBLFdBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLFNBQUcsQ0FBQyxjQUFjLEVBQUUsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUUsY0FBYyxDQUFDLEVBQUUsRUFBRSxjQUFjLENBQUM7b0NBQTNHLENBQTJHLENBQzVHLENBQUE7b0NBQ0Q7d0NBQ0UsYUFBVyxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEVBQUU7NENBQ25ELE9BQUEsV0FBSyxDQUNILFNBQUcsQ0FBQyxNQUFNLENBQUMscUJBQXFCLEVBQUUsT0FBTyxFQUFFLGNBQU0sT0FBQSxFQUFFLEVBQUYsQ0FBRSxDQUFDLEVBQ3BELFNBQUcsQ0FBQyxTQUFHLENBQUMseUJBQXlCLEVBQUUsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQ3RFLEVBQUUsQ0FBQyxXQUFXLEVBQUUsRUFBRSxFQUFFLENBQUM7d0NBSHZCLENBR3VCLENBQ3hCLENBQUE7O29DQU5ILEdBQUcsQ0FBQyxDQUFDLElBQUksT0FBTyxJQUFJLGFBQVcsQ0FBQyxxQkFBcUIsQ0FBQzs7cUNBTW5EO29DQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO29DQUMxQixVQUFVLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFBO2dDQUM5QyxDQUFDLENBQUMsQ0FBQTtnQ0FDRixPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFBOzRCQUMvRCxDQUFDO3dCQUNILENBQUM7b0JBQ0gsQ0FBQztnQkFDSCxDQUFDLENBQUMsQ0FBQTtnQkFDRix5QkFBeUIsQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPO29CQUN2QyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNyQixJQUFJLEVBQUUsR0FBVSxJQUFJLHVCQUFpQixDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO3dCQUN2RCxXQUFLLENBQ0gsU0FBRyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSxPQUFPLEVBQUUsY0FBTSxPQUFBLEVBQUUsRUFBRixDQUFFLENBQUMsRUFDcEQsU0FBRyxDQUFDLFNBQUcsQ0FBQyx5QkFBeUIsRUFBRSxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFDdEUsRUFBRSxDQUFDLFdBQVcsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO29CQUN6QixDQUFDO2dCQUNILENBQUMsQ0FBQyxDQUFBO1lBQ0osQ0FBQyxDQUFDLENBQUE7WUFDRixNQUFNLENBQUMsY0FBYyxDQUFBO1FBQ3pCLENBQUM7UUFFTywrQ0FBSyxHQUFiLFVBQWMsS0FBYSxFQUFFLEtBQWEsRUFBRSxjQUF1QyxFQUFFLFNBQWlDO1lBQXRILGlCQU9DO1lBTkMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsVUFBQSxhQUFhO2dCQUNyQyxJQUFJLGFBQWEsR0FBVyxhQUFhLENBQUMsMkJBQTJCLENBQUE7Z0JBQ3JFLGFBQWEsR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7Z0JBQzlGLGFBQWEsR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQyxlQUFlLENBQUMsQ0FBQTtnQkFDN0csYUFBYSxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQTtnQkFDN0QsTUFBTSxDQUFDLEtBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLGFBQWEsRUFBRSxFQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUMsQ0FBQyxDQUFBO1lBQUEsQ0FBQyxDQUFDLENBQUE7UUFDeEcsQ0FBQztRQXRJYywyQ0FBVyxHQUFpQztZQUN6RCxJQUFJLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUk7U0FDekcsQ0FBQTtRQXNJSCxzQ0FBQztJQUFELENBMUlBLEFBMElDLElBQUE7SUExSVkscUNBQStCLGtDQTBJM0MsQ0FBQTtBQUVILENBQUMsRUFsUFMsS0FBSyxLQUFMLEtBQUssUUFrUGQiLCJmaWxlIjoic2NyaXB0cy9zcGFycWwtYXV0b2NvbXBsZXRlLXNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgZmlicmEge1xuICAndXNlIHN0cmljdCdcblxuICBpbXBvcnQgcyA9IGZpLnNlY28uc3BhcnFsXG5cbiAgZXhwb3J0IGNsYXNzIFJlc3VsdHNCeURhdGFzb3VyY2Uge1xuICAgIHB1YmxpYyByZXN1bHRzQnlHcm91cDogUmVzdWx0R3JvdXBbXSA9IFtdXG4gICAgY29uc3RydWN0b3IocHVibGljIGNvbmZpZ3VyYXRpb246IEVuZHBvaW50Q29uZmlndXJhdGlvbikge31cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBSZXN1bHRHcm91cCB7XG4gICAgcHVibGljIHJlc3VsdHM6IFJlc3VsdFtdID0gW11cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbGFiZWw6IHN0cmluZykge31cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBSZXN1bHQge1xuICAgIHB1YmxpYyBpZHM6IElOb2RlW10gPSBbXVxuICAgIHB1YmxpYyBkYXRhc291cmNlczogRW5kcG9pbnRDb25maWd1cmF0aW9uW10gPSBbXVxuICAgIHB1YmxpYyBhZGRpdGlvbmFsSW5mb3JtYXRpb246IHtbdmFyTmFtZTogc3RyaW5nXTogSU5vZGVbXX0gPSB7fVxuICAgIGNvbnN0cnVjdG9yKGlkOiBJTm9kZSwgcHVibGljIHJlc3VsdEdyb3VwOiBSZXN1bHRHcm91cCwgZGF0YXNvdXJjZTogRW5kcG9pbnRDb25maWd1cmF0aW9uLCBwdWJsaWMgbWF0Y2hlZExhYmVsOiBJTm9kZSwgcHVibGljIHByZWZMYWJlbDogSU5vZGUpIHtcbiAgICAgIHRoaXMuaWRzLnB1c2goaWQpXG4gICAgICB0aGlzLmRhdGFzb3VyY2VzLnB1c2goZGF0YXNvdXJjZSlcbiAgICB9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgU3BhcnFsQXV0b2NvbXBsZXRlU2VydmljZSB7XG5cbiAgICBwdWJsaWMgc3RhdGljIHF1ZXJ5VGVtcGxhdGU6IHN0cmluZyA9IGBcblBSRUZJWCB0ZXh0OiA8aHR0cDovL2plbmEuYXBhY2hlLm9yZy90ZXh0Iz5cblBSRUZJWCByZGZzOiA8aHR0cDovL3d3dy53My5vcmcvMjAwMC8wMS9yZGYtc2NoZW1hIz5cblBSRUZJWCBza29zOiA8aHR0cDovL3d3dy53My5vcmcvMjAwNC8wMi9za29zL2NvcmUjPlxuUFJFRklYIG93bDogPGh0dHA6Ly93d3cudzMub3JnLzIwMDIvMDcvb3dsIz5cblBSRUZJWCBzZjogPGh0dHA6Ly9sZGYuZmkvZnVuY3Rpb25zIz5cblxuU0VMRUNUID9ncm91cElkID9ncm91cExhYmVsID9pZCA/bWF0Y2hlZExhYmVsID9wcmVmTGFiZWwgP2FsdExhYmVsID90eXBlID90eXBlTGFiZWwgP3NhbWVBcyA/aWZwV2lraXBlZGlhUGFnZSA/aWZwT0RCTklkIHtcbiAge1xuICAgIFNFTEVDVCA/Z3JvdXBJZCA/aWQgKFNBTVBMRSg/bWF0Y2hlZExhYmVsUykgQVMgP21hdGNoZWRMYWJlbCkge1xuICAgICAge1xuICAgICAgICBTRUxFQ1QgP2dyb3VwSWQgP2lkIChTVU0oP3NjKSBBUyA/c2NvcmUpIHtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBTRUxFQ1QgP2dyb3VwSWQgP2lkID9zYyB7XG4gICAgICAgICAgICAgIEJJTkQoQ09OQ0FUKFJFUExBQ0UoPFFVRVJZPixcIihbXFxcXFxcXFwrXFxcXFxcXFwtXFxcXFxcXFwmXFxcXFxcXFx8XFxcXFxcXFwhXFxcXFxcXFwoXFxcXFxcXFwpXFxcXFxcXFx7XFxcXFxcXFx9XFxcXFxcXFxbXFxcXFxcXFxdXFxcXFxcXFxeXFxcXFxcXFxcXFxcXCJcXFxcXFxcXH5cXFxcXFxcXCpcXFxcXFxcXD9cXFxcXFxcXDpcXFxcXFxcXC9cXFxcXFxcXFxcXFxcXFxcXSlcIixcIlxcXFxcXFxcJDFcIiksXCIqXCIpIEFTID9xdWVyeSlcbiAgICAgICAgICAgICAgKD9pZCA/c2MpIHRleHQ6cXVlcnkgP3F1ZXJ5IC5cbiAgICAgICAgICAgICAgP2lkIGEgP2dyb3VwSWQgLlxuICAgICAgICAgICAgICAjIENPTlNUUkFJTlRTXG4gICAgICAgICAgICB9IExJTUlUIDxMSU1JVD5cbiAgICAgICAgICB9IFVOSU9OIHtcbiAgICAgICAgICAgIEJJTkQoQ09OQ0FUKFwiXFxcXFwiXCIsUkVQTEFDRSg8UVVFUlk+LFwiKFtcXFxcXFxcXCtcXFxcXFxcXC1cXFxcXFxcXCZcXFxcXFxcXHxcXFxcXFxcXCFcXFxcXFxcXChcXFxcXFxcXClcXFxcXFxcXHtcXFxcXFxcXH1cXFxcXFxcXFtcXFxcXFxcXF1cXFxcXFxcXF5cXFxcXFxcXFxcXFxcIlxcXFxcXFxcflxcXFxcXFxcKlxcXFxcXFxcP1xcXFxcXFxcOlxcXFxcXFxcL1xcXFxcXFxcXFxcXFxcXFxdKVwiLFwiXFxcXFxcXFwkMVwiKSxcIlxcXFxcIlwiKSBBUyA/cXVlcnkpXG4gICAgICAgICAgICAoP2lkID9zYykgdGV4dDpxdWVyeSA/cXVlcnkgLlxuICAgICAgICAgICAgP2lkIGEgP2dyb3VwSWQgLlxuICAgICAgICAgICAgIyBDT05TVFJBSU5UU1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBHUk9VUCBCWSA/Z3JvdXBJZCA/aWRcbiAgICAgIH1cbiAgICAgIEZJTFRFUiAoP2lkIT08aHR0cDovL2xkZi5maS9zY2hvZW5iZXJnL2FjdG9yXz4pICMgU0NIT0VOQkVSRyBCVUdcbiAgICAgID9pZCBza29zOnByZWZMYWJlbHxyZGZzOmxhYmVsfHNrb3M6YWx0TGFiZWwgP21hdGNoZWRMYWJlbFNcbiAgICAgIEZJTFRFUiAoUkVHRVgoTENBU0UoP21hdGNoZWRMYWJlbFMpLENPTkNBVChcIlxcXFxcXFxcYlwiLExDQVNFKDxRVUVSWT4pKSkpXG4gICAgfVxuICAgIEdST1VQIEJZID9ncm91cElkID9pZCA/c2NvcmVcbiAgICBIQVZJTkcoQk9VTkQoP2lkKSlcbiAgICBPUkRFUiBCWSBERVNDKD9zY29yZSlcbiAgfVxuICA/Z3JvdXBJZCBzZjpwcmVmZXJyZWRMYW5ndWFnZUxpdGVyYWwgKHNrb3M6cHJlZkxhYmVsIHJkZnM6bGFiZWwgc2tvczphbHRMYWJlbCAnZW4nICcnID9ncm91cExhYmVsKSAuXG4gID9pZCBzZjpwcmVmZXJyZWRMYW5ndWFnZUxpdGVyYWwgKHNrb3M6cHJlZkxhYmVsIHJkZnM6bGFiZWwgc2tvczphbHRMYWJlbCAnZW4nICcnID9wcmVmTGFiZWwpIC5cbiAgQklORCg/Z3JvdXBJZCBBUyA/dHlwZSlcbiAgQklORCg/Z3JvdXBMYWJlbCBBUyA/dHlwZUxhYmVsKVxuICBPUFRJT05BTCB7XG4gICAgP2lkIHNrb3M6YWx0TGFiZWwgP2FsdExhYmVsIC5cbiAgfVxuICBPUFRJT05BTCB7XG4gICAgP2lkIG93bDpzYW1lQXMgP3NhbWVBcyAuXG4gIH1cbiAgT1BUSU9OQUwge1xuICAgIHtcbiAgICAgID9pZCA8aHR0cDovL2VtbG8uYm9kbGVpYW4ub3guYWMudWsvc2NoZW1hI2NvZmtfdW5pb25fcmVsYXRpb25zaGlwX3R5cGUtaXNfcmVsYXRlZF90bz4gP3JlZiAuXG4gICAgICBGSUxURVIoUkVHRVgoU1RSKD9yZWYpLCdodHRwOi8vLi5cXFxcXFxcXC53aWtpcGVkaWFcXFxcXFxcXC5vcmcvd2lraS8nKSlcbiAgICAgIEJJTkQoP3JlZiBBUyA/aWZwV2lraXBlZGlhUGFnZSlcbiAgICB9IFVOSU9OIHtcbiAgICAgID9pZCA8aHR0cDovL2VtbG8uYm9kbGVpYW4ub3guYWMudWsvc2NoZW1hI2NvZmtfdW5pb25fcmVsYXRpb25zaGlwX3R5cGUtaXNfcmVsYXRlZF90bz4gP3JlZiAuXG4gICAgICBGSUxURVIoU1RSU1RBUlRTKFNUUig/cmVmKSwnaHR0cDovL3d3dy5veGZvcmRkbmIuY29tL3ZpZXcvYXJ0aWNsZS8nKSlcbiAgICAgIEJJTkQoUkVQTEFDRShTVFIoP3JlZiksJ2h0dHA6Ly93d3cub3hmb3JkZG5iLmNvbS92aWV3L2FydGljbGUvKFteP10qKS4qJywnJDEnKSBBUyA/aWZwT0RCTklkKVxuICAgIH0gVU5JT04ge1xuICAgICAgP2lkIDxodHRwOi8vbGRmLmZpL3Byb2NvcGUtc2NoZW1hI3dpa2lwZWRpYVVybD4gP3JlZiAuXG4gICAgICBCSU5EKElSSSg/cmVmKSBBUyA/aWZwV2lraXBlZGlhUGFnZSlcbiAgICB9IFVOSU9OIHtcbiAgICAgID9pZCA8aHR0cDovL2xkZi5maS9zZGZiL3NjaGVtYSNvZGJuSWQ+ID9pZnBPREJOSWQgLlxuICAgIH1cbiAgfVxufVxuYFxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB3b3JrZXJTZXJ2aWNlOiBXb3JrZXJTZXJ2aWNlKSB7fVxuICAgIHB1YmxpYyBhdXRvY29tcGxldGVCeURhdGFzb3VyY2UocXVlcnk6IHN0cmluZywgbGltaXQ6IG51bWJlciwgY2FuY2VsbGVyPzogYW5ndWxhci5JUHJvbWlzZTxhbnk+KTogYW5ndWxhci5JUHJvbWlzZTxSZXN1bHRzQnlEYXRhc291cmNlW10+IHtcbiAgICAgIHJldHVybiB0aGlzLndvcmtlclNlcnZpY2UuY2FsbCgnc3BhcnFsQXV0b2NvbXBsZXRlV29ya2VyU2VydmljZScsICdhdXRvY29tcGxldGVCeURhdGFzb3VyY2UnLCBbcXVlcnksIGxpbWl0XSwgY2FuY2VsbGVyKVxuICAgIH1cbiAgICBwdWJsaWMgYXV0b2NvbXBsZXRlQnlHcm91cChxdWVyeTogc3RyaW5nLCBsaW1pdDogbnVtYmVyLCBjYW5jZWxsZXI/OiBhbmd1bGFyLklQcm9taXNlPGFueT4pOiBhbmd1bGFyLklQcm9taXNlPFJlc3VsdEdyb3VwW10+IHtcbiAgICAgIHJldHVybiB0aGlzLndvcmtlclNlcnZpY2UuY2FsbCgnc3BhcnFsQXV0b2NvbXBsZXRlV29ya2VyU2VydmljZScsICdhdXRvY29tcGxldGVCeUdyb3VwJywgW3F1ZXJ5LCBsaW1pdF0sIGNhbmNlbGxlcilcbiAgICB9XG5cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBTcGFycWxBdXRvY29tcGxldGVXb3JrZXJTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgc3RhdGljIGRlZmF1bHRWYXJzOiB7W3Zhck5hbWU6IHN0cmluZ106IGJvb2xlYW59ID0ge1xuICAgICAgJ2lkJzogdHJ1ZSwgJ3ByZWZMYWJlbCc6IHRydWUsICdtYXRjaGVkTGFiZWwnOiB0cnVlLCAnZ3JvdXBJZCc6IHRydWUsICdncm91cExhYmVsJzogdHJ1ZSwgJ3NhbWVBcyc6IHRydWVcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRxOiBhbmd1bGFyLklRU2VydmljZSwgcHJpdmF0ZSBzcGFycWxTZXJ2aWNlOiBzLlNwYXJxbFNlcnZpY2UsIHByaXZhdGUgY29uZmlndXJhdGlvbldvcmtlclNlcnZpY2U6IENvbmZpZ3VyYXRpb25Xb3JrZXJTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgcHVibGljIGF1dG9jb21wbGV0ZUJ5RGF0YXNvdXJjZShxdWVyeTogc3RyaW5nLCBsaW1pdDogbnVtYmVyLCBjYW5jZWxsZXI/OiBhbmd1bGFyLklQcm9taXNlPGFueT4pOiBhbmd1bGFyLklQcm9taXNlPFJlc3VsdHNCeURhdGFzb3VyY2VbXT4ge1xuICAgICAgbGV0IGNvbmZpZ3VyYXRpb25zOiBFbmRwb2ludENvbmZpZ3VyYXRpb25bXSA9IHRoaXMuY29uZmlndXJhdGlvbldvcmtlclNlcnZpY2UuY29uZmlndXJhdGlvbi5hbGxFbmRwb2ludHMoKVxuICAgICAgcmV0dXJuIHRoaXMuJHEuYWxsKHRoaXMucXVlcnkocXVlcnksIGxpbWl0LCBjb25maWd1cmF0aW9ucykubWFwKChwcm9taXNlLCBpbmRleCkgPT4gcHJvbWlzZS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgbGV0IGRzOiBSZXN1bHRzQnlEYXRhc291cmNlID0gbmV3IFJlc3VsdHNCeURhdGFzb3VyY2UoY29uZmlndXJhdGlvbnNbaW5kZXhdKVxuICAgICAgICBsZXQgZ3JvdXBUb1Jlc3VsdHM6IHtbaWQ6IHN0cmluZ106IFJlc3VsdEdyb3VwfSA9IHRoaXMucHJvY2Vzc1Jlc3VsdHMocmVzcG9uc2UsIGNvbmZpZ3VyYXRpb25zW2luZGV4XSlcbiAgICAgICAgZm9yIChsZXQgZ3JvdXBJZCBpbiBncm91cFRvUmVzdWx0cykgZHMucmVzdWx0c0J5R3JvdXAucHVzaChncm91cFRvUmVzdWx0c1tncm91cElkXSlcbiAgICAgICAgcmV0dXJuIGRzXG4gICAgICB9KSkpXG4gICAgfVxuXG4gICAgcHVibGljIGF1dG9jb21wbGV0ZUJ5R3JvdXAocXVlcnk6IHN0cmluZywgbGltaXQ6IG51bWJlciwgY2FuY2VsbGVyPzogYW5ndWxhci5JUHJvbWlzZTxhbnk+KTogYW5ndWxhci5JUHJvbWlzZTxSZXN1bHRHcm91cFtdPiB7XG4gICAgICBsZXQgY29uZmlndXJhdGlvbnM6IEVuZHBvaW50Q29uZmlndXJhdGlvbltdID0gdGhpcy5jb25maWd1cmF0aW9uV29ya2VyU2VydmljZS5jb25maWd1cmF0aW9uLmFsbEVuZHBvaW50cygpXG4gICAgICBsZXQgZ3JvdXBUb1Jlc3VsdHM6IHtbaWQ6IHN0cmluZ106IFJlc3VsdEdyb3VwfSA9IHt9XG4gICAgICBsZXQgaWRUb1Jlc3VsdDoge1tpZDogc3RyaW5nXTogUmVzdWx0fSA9IHt9XG4gICAgICBsZXQgaWRUb0RhdGFzb3VyY2U6IHtbaWQ6IHN0cmluZ106IHtbaWQ6IHN0cmluZ106IEVuZHBvaW50Q29uZmlndXJhdGlvbn19ID0ge31cbiAgICAgIGxldCBpZFRvQWRkaXRpb25hbEluZm9ybWF0aW9uOiB7W2lkOiBzdHJpbmddOiB7W3Zhck5hbWU6IHN0cmluZ106IHtbYWlJZDogc3RyaW5nXTogSU5vZGV9fX0gPSB7fVxuICAgICAgbGV0IGlmcFRvSWQ6IHtbdmFyTmFtZTogc3RyaW5nXToge1tpZDogc3RyaW5nXTogc3RyaW5nfX0gPSB7fVxuICAgICAgcmV0dXJuIHRoaXMuJHEuYWxsKHRoaXMucXVlcnkocXVlcnksIGxpbWl0LCBjb25maWd1cmF0aW9ucykubWFwKChwcm9taXNlLCBpbmRleCkgPT4gcHJvbWlzZS50aGVuKHJlc3BvbnNlID0+XG4gICAgICAgIHRoaXMucHJvY2Vzc1Jlc3VsdHMocmVzcG9uc2UsIGNvbmZpZ3VyYXRpb25zW2luZGV4XSwgZ3JvdXBUb1Jlc3VsdHMsIGlkVG9SZXN1bHQsIGlmcFRvSWQsIGlkVG9EYXRhc291cmNlLCBpZFRvQWRkaXRpb25hbEluZm9ybWF0aW9uKVxuICAgICAgKSkpLnRoZW4oKCkgPT4ge1xuICAgICAgICBsZXQgcmV0OiBSZXN1bHRHcm91cFtdID0gW11cbiAgICAgICAgZm9yIChsZXQgZ3JvdXBJZCBpbiBncm91cFRvUmVzdWx0cykgcmV0LnB1c2goZ3JvdXBUb1Jlc3VsdHNbZ3JvdXBJZF0pXG4gICAgICAgIHJldHVybiByZXRcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcm9jZXNzUmVzdWx0cyhcbiAgICAgIHJlc3BvbnNlOiBhbmd1bGFyLklIdHRwUHJvbWlzZUNhbGxiYWNrQXJnPHMuSVNwYXJxbEJpbmRpbmdSZXN1bHQ8e1tpZDogc3RyaW5nXTogcy5JU3BhcnFsQmluZGluZ30+PixcbiAgICAgIGNvbmZpZ3VyYXRpb246IEVuZHBvaW50Q29uZmlndXJhdGlvbixcbiAgICAgIGdyb3VwVG9SZXN1bHRzOiB7W2lkOiBzdHJpbmddOiBSZXN1bHRHcm91cH0gPSB7fSxcbiAgICAgIGlkVG9SZXN1bHQ6IHtbaWQ6IHN0cmluZ106IFJlc3VsdH0gPSB7fSxcbiAgICAgIGlmcFRvSWQ6IHtbdmFyTmFtZTogc3RyaW5nXToge1tpZDogc3RyaW5nXTogc3RyaW5nfX0gPSB7fSxcbiAgICAgIGlkVG9EYXRhc291cmNlOiB7W2lkOiBzdHJpbmddOiB7W2lkOiBzdHJpbmddOiBFbmRwb2ludENvbmZpZ3VyYXRpb259fSA9IHt9LFxuICAgICAgaWRUb0FkZGl0aW9uYWxJbmZvcm1hdGlvbjoge1tpZDogc3RyaW5nXToge1t2YXJOYW1lOiBzdHJpbmddOiB7W2FpSWQ6IHN0cmluZ106IElOb2RlfX19ID0ge30pOiB7W2lkOiBzdHJpbmddOiBSZXN1bHRHcm91cH0ge1xuICAgICAgICBsZXQgYWRkaXRpb25hbEluZm9ybWF0aW9uVmFyczogc3RyaW5nW10gPSByZXNwb25zZS5kYXRhLmhlYWQudmFycy5maWx0ZXIodmFyTmFtZSA9PiAhU3BhcnFsQXV0b2NvbXBsZXRlV29ya2VyU2VydmljZS5kZWZhdWx0VmFyc1t2YXJOYW1lXSAmJiB2YXJOYW1lLmluZGV4T2YoJ2lmcCcpICE9PSAwKVxuICAgICAgICBsZXQgaWZwVmFyczogc3RyaW5nW10gPSByZXNwb25zZS5kYXRhLmhlYWQudmFycy5maWx0ZXIodmFyTmFtZSA9PiB2YXJOYW1lLmluZGV4T2YoJ2lmcCcpID09PSAwKVxuICAgICAgICByZXNwb25zZS5kYXRhLnJlc3VsdHMuYmluZGluZ3MuZm9yRWFjaChiaW5kaW5nID0+IHtcbiAgICAgICAgICBsZXQgcmc6IFJlc3VsdEdyb3VwID0gZ29jKGdyb3VwVG9SZXN1bHRzLCBiaW5kaW5nWydncm91cElkJ10udmFsdWUsICgpID0+IG5ldyBSZXN1bHRHcm91cChiaW5kaW5nWydncm91cExhYmVsJ10udmFsdWUpKVxuICAgICAgICAgIGxldCByZXN1bHROb2RlOiBJTm9kZSA9IG5ldyBTcGFycWxCaW5kaW5nTm9kZShiaW5kaW5nWydpZCddKVxuICAgICAgICAgIGxldCByZXN1bHQ6IFJlc3VsdCA9IGlkVG9SZXN1bHRbcmVzdWx0Tm9kZS50b0Nhbm9uaWNhbCgpXVxuICAgICAgICAgIC8vIEZJWE1FIHJlZmFjdG9yIGludG8gc29tZXRoaW5nIHNlbnNpYmxlLiBUaGlzIGV2ZW4gc3RpbGwgZG9lcyBub3QgZ3VhcmFudGVlIHVuaXF1ZSByZXN1bHRzXG4gICAgICAgICAgaWYgKCFyZXN1bHQgJiYgYmluZGluZ1snc2FtZUFzJ10pXG4gICAgICAgICAgICByZXN1bHQgPSBpZFRvUmVzdWx0W25ldyBTcGFycWxCaW5kaW5nTm9kZShiaW5kaW5nWydzYW1lQXMnXSkudG9DYW5vbmljYWwoKV1cbiAgICAgICAgICBpZiAoIXJlc3VsdCkgaWZwVmFycy5mb3JFYWNoKGlmcFZhciA9PiB7XG4gICAgICAgICAgICBpZiAoYmluZGluZ1tpZnBWYXJdKSByZXN1bHQgPSBpZFRvUmVzdWx0W2dvYyhpZnBUb0lkLCBpZnBWYXIpW25ldyBTcGFycWxCaW5kaW5nTm9kZShiaW5kaW5nW2lmcFZhcl0pLnRvQ2Fub25pY2FsKCldXVxuICAgICAgICAgIH0pXG4gICAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IG5ldyBSZXN1bHQocmVzdWx0Tm9kZSwgcmcsIGNvbmZpZ3VyYXRpb24sIG5ldyBTcGFycWxCaW5kaW5nTm9kZShiaW5kaW5nWydtYXRjaGVkTGFiZWwnXSksIG5ldyBTcGFycWxCaW5kaW5nTm9kZShiaW5kaW5nWydwcmVmTGFiZWwnXSkpXG4gICAgICAgICAgICByZy5yZXN1bHRzLnB1c2gocmVzdWx0KVxuICAgICAgICAgICAgaWRUb0RhdGFzb3VyY2VbcmVzdWx0Tm9kZS50b0Nhbm9uaWNhbCgpXSA9IHt9XG4gICAgICAgICAgICBpZFRvRGF0YXNvdXJjZVtyZXN1bHROb2RlLnRvQ2Fub25pY2FsKCldW3Jlc3VsdC5kYXRhc291cmNlc1swXS5pZF0gPSBjb25maWd1cmF0aW9uXG4gICAgICAgICAgICBpZFRvUmVzdWx0W3Jlc3VsdE5vZGUudG9DYW5vbmljYWwoKV0gPSByZXN1bHRcbiAgICAgICAgICB9IGVsc2VcbiAgICAgICAgICAgIGNwdXNoKHJlc3VsdC5kYXRhc291cmNlcywgZ29jKGlkVG9EYXRhc291cmNlLCByZXN1bHROb2RlLnRvQ2Fub25pY2FsKCkpLCBjb25maWd1cmF0aW9uLmlkLCBjb25maWd1cmF0aW9uKVxuICAgICAgICAgIGlmIChiaW5kaW5nWydzYW1lQXMnXSkge1xuICAgICAgICAgICAgbGV0IG90aGVyTm9kZTogSU5vZGUgPSBuZXcgU3BhcnFsQmluZGluZ05vZGUoYmluZGluZ1snc2FtZUFzJ10pXG4gICAgICAgICAgICBpZiAoIWlkVG9SZXN1bHRbb3RoZXJOb2RlLnRvQ2Fub25pY2FsKCldKSB7XG4gICAgICAgICAgICAgIGlkVG9SZXN1bHRbb3RoZXJOb2RlLnRvQ2Fub25pY2FsKCldID0gcmVzdWx0XG4gICAgICAgICAgICAgIHJlc3VsdC5pZHMucHVzaChvdGhlck5vZGUpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBsZXQgb3RoZXJSZXN1bHQ6IFJlc3VsdCA9IGlkVG9SZXN1bHRbb3RoZXJOb2RlLnRvQ2Fub25pY2FsKCldXG4gICAgICAgICAgICAgIGlmIChvdGhlclJlc3VsdCAhPT0gcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgb3RoZXJSZXN1bHQuaWRzLmZvckVhY2gob3RoZXJOb2RlID0+IHtcbiAgICAgICAgICAgICAgICAgIG90aGVyUmVzdWx0LmRhdGFzb3VyY2VzLmZvckVhY2goZGNvbmZpZ3VyYXRpb24gPT5cbiAgICAgICAgICAgICAgICAgICAgY3B1c2gocmVzdWx0LmRhdGFzb3VyY2VzLCBnb2MoaWRUb0RhdGFzb3VyY2UsIHJlc3VsdE5vZGUudG9DYW5vbmljYWwoKSksIGRjb25maWd1cmF0aW9uLmlkLCBkY29uZmlndXJhdGlvbilcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIGZvciAobGV0IHZhck5hbWUgaW4gb3RoZXJSZXN1bHQuYWRkaXRpb25hbEluZm9ybWF0aW9uKVxuICAgICAgICAgICAgICAgICAgICBvdGhlclJlc3VsdC5hZGRpdGlvbmFsSW5mb3JtYXRpb25bdmFyTmFtZV0uZm9yRWFjaChhaSA9PlxuICAgICAgICAgICAgICAgICAgICAgIGNwdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgZ29jKHJlc3VsdC5hZGRpdGlvbmFsSW5mb3JtYXRpb24sIHZhck5hbWUsICgpID0+IFtdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdvYyhnb2MoaWRUb0FkZGl0aW9uYWxJbmZvcm1hdGlvbiwgcmVzdWx0Tm9kZS50b0Nhbm9uaWNhbCgpKSwgdmFyTmFtZSksXG4gICAgICAgICAgICAgICAgICAgICAgICBhaS50b0Nhbm9uaWNhbCgpLCBhaSlcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgcmVzdWx0Lmlkcy5wdXNoKG90aGVyTm9kZSlcbiAgICAgICAgICAgICAgICAgIGlkVG9SZXN1bHRbb3RoZXJOb2RlLnRvQ2Fub25pY2FsKCldID0gcmVzdWx0XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBpZFRvUmVzdWx0W290aGVyTm9kZS50b0Nhbm9uaWNhbCgpXSA9IHJlc3VsdFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmcFZhcnMuZm9yRWFjaChpZnBWYXIgPT4ge1xuICAgICAgICAgICAgaWYgKGJpbmRpbmdbaWZwVmFyXSkge1xuICAgICAgICAgICAgICBsZXQgaWZwOiBJTm9kZSA9IG5ldyBTcGFycWxCaW5kaW5nTm9kZShiaW5kaW5nW2lmcFZhcl0pXG4gICAgICAgICAgICAgIGlmICghZ29jKGlmcFRvSWQsIGlmcFZhcilbaWZwLnRvQ2Fub25pY2FsKCldKSB7XG4gICAgICAgICAgICAgICAgaWZwVG9JZFtpZnBWYXJdW2lmcC50b0Nhbm9uaWNhbCgpXSA9IHJlc3VsdE5vZGUudG9DYW5vbmljYWwoKVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBvdGhlclJlc3VsdDogUmVzdWx0ID0gaWRUb1Jlc3VsdFtpZnBUb0lkW2lmcFZhcl1baWZwLnRvQ2Fub25pY2FsKCldXVxuICAgICAgICAgICAgICAgIGlmIChvdGhlclJlc3VsdCAhPT0gcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICBvdGhlclJlc3VsdC5pZHMuZm9yRWFjaChvdGhlck5vZGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBvdGhlclJlc3VsdC5kYXRhc291cmNlcy5mb3JFYWNoKGRjb25maWd1cmF0aW9uID0+XG4gICAgICAgICAgICAgICAgICAgICAgY3B1c2gocmVzdWx0LmRhdGFzb3VyY2VzLCBnb2MoaWRUb0RhdGFzb3VyY2UsIHJlc3VsdE5vZGUudG9DYW5vbmljYWwoKSksIGRjb25maWd1cmF0aW9uLmlkLCBkY29uZmlndXJhdGlvbilcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB2YXJOYW1lIGluIG90aGVyUmVzdWx0LmFkZGl0aW9uYWxJbmZvcm1hdGlvbilcbiAgICAgICAgICAgICAgICAgICAgICBvdGhlclJlc3VsdC5hZGRpdGlvbmFsSW5mb3JtYXRpb25bdmFyTmFtZV0uZm9yRWFjaChhaSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgY3B1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGdvYyhyZXN1bHQuYWRkaXRpb25hbEluZm9ybWF0aW9uLCB2YXJOYW1lLCAoKSA9PiBbXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGdvYyhnb2MoaWRUb0FkZGl0aW9uYWxJbmZvcm1hdGlvbiwgcmVzdWx0Tm9kZS50b0Nhbm9uaWNhbCgpKSwgdmFyTmFtZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGFpLnRvQ2Fub25pY2FsKCksIGFpKVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0Lmlkcy5wdXNoKG90aGVyTm9kZSlcbiAgICAgICAgICAgICAgICAgICAgaWRUb1Jlc3VsdFtvdGhlck5vZGUudG9DYW5vbmljYWwoKV0gPSByZXN1bHRcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICBpZnBUb0lkW2lmcFZhcl1baWZwLnRvQ2Fub25pY2FsKCldID0gcmVzdWx0Tm9kZS50b0Nhbm9uaWNhbCgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICBhZGRpdGlvbmFsSW5mb3JtYXRpb25WYXJzLmZvckVhY2godmFyTmFtZSA9PiB7XG4gICAgICAgICAgICBpZiAoYmluZGluZ1t2YXJOYW1lXSkge1xuICAgICAgICAgICAgICBsZXQgYWk6IElOb2RlID0gbmV3IFNwYXJxbEJpbmRpbmdOb2RlKGJpbmRpbmdbdmFyTmFtZV0pXG4gICAgICAgICAgICAgIGNwdXNoKFxuICAgICAgICAgICAgICAgIGdvYyhyZXN1bHQuYWRkaXRpb25hbEluZm9ybWF0aW9uLCB2YXJOYW1lLCAoKSA9PiBbXSksXG4gICAgICAgICAgICAgICAgZ29jKGdvYyhpZFRvQWRkaXRpb25hbEluZm9ybWF0aW9uLCByZXN1bHROb2RlLnRvQ2Fub25pY2FsKCkpLCB2YXJOYW1lKSxcbiAgICAgICAgICAgICAgICBhaS50b0Nhbm9uaWNhbCgpLCBhaSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gZ3JvdXBUb1Jlc3VsdHNcbiAgICB9XG5cbiAgICBwcml2YXRlIHF1ZXJ5KHF1ZXJ5OiBzdHJpbmcsIGxpbWl0OiBudW1iZXIsIGNvbmZpZ3VyYXRpb25zOiBFbmRwb2ludENvbmZpZ3VyYXRpb25bXSwgY2FuY2VsbGVyPzogYW5ndWxhci5JUHJvbWlzZTxhbnk+KTogYW5ndWxhci5JUHJvbWlzZTxhbmd1bGFyLklIdHRwUHJvbWlzZUNhbGxiYWNrQXJnPHMuSVNwYXJxbEJpbmRpbmdSZXN1bHQ8e1tpZDogc3RyaW5nXTogcy5JU3BhcnFsQmluZGluZ30+Pj5bXSB7XG4gICAgICByZXR1cm4gY29uZmlndXJhdGlvbnMubWFwKGNvbmZpZ3VyYXRpb24gPT4ge1xuICAgICAgICBsZXQgcXVlcnlUZW1wbGF0ZTogc3RyaW5nID0gY29uZmlndXJhdGlvbi5hdXRvY29tcGxldGlvblF1ZXJ5VGVtcGxhdGVcbiAgICAgICAgcXVlcnlUZW1wbGF0ZSA9IHF1ZXJ5VGVtcGxhdGUucmVwbGFjZSgvPFFVRVJZPi9nLCBzLlNwYXJxbFNlcnZpY2Uuc3RyaW5nVG9TUEFSUUxTdHJpbmcocXVlcnkpKVxuICAgICAgICBxdWVyeVRlbXBsYXRlID0gcXVlcnlUZW1wbGF0ZS5yZXBsYWNlKC8jIENPTlNUUkFJTlRTL2csIGNvbmZpZ3VyYXRpb24uZGF0YU1vZGVsQ29uZmlndXJhdGlvbi50eXBlQ29uc3RyYWludHMpXG4gICAgICAgIHF1ZXJ5VGVtcGxhdGUgPSBxdWVyeVRlbXBsYXRlLnJlcGxhY2UoLzxMSU1JVD4vZywgJycgKyBsaW1pdClcbiAgICAgICAgcmV0dXJuIHRoaXMuc3BhcnFsU2VydmljZS5xdWVyeShjb25maWd1cmF0aW9uLmVuZHBvaW50LnZhbHVlLCBxdWVyeVRlbXBsYXRlLCB7dGltZW91dDogY2FuY2VsbGVyfSl9KVxuICAgIH1cblxuICB9XG5cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

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
                onSelect: '&'
            };
            this.controller = SparqlItemComponentController;
            this.templateUrl = 'partials/sparql-item.html';
        }
        return SparqlItemComponent;
    }());/*<auto_generate>*/angular.module('fibra').component('sparqlItem',new SparqlItemComponent());/*</auto_generate>*/
    fibra.SparqlItemComponent = SparqlItemComponent;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvc3BhcnFsLWl0ZW0tY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBVSxLQUFLLENBZ0NkO0FBaENELFdBQVUsS0FBSyxFQUFDLENBQUM7SUFDZixZQUFZLENBQUE7SUFFWjtRQUFBO1FBRUEsQ0FBQztRQUFELGtDQUFDO0lBQUQsQ0FGQSxBQUVDLElBQUE7SUFNRDtRQUE0QyxpREFBMkI7UUFRckUsdUNBQW9CLGlCQUFvQztZQVIxRCxpQkFXQztZQUZHLGlCQUFPLENBQUE7WUFEVyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1lBTmpELGVBQVUsR0FBMEQsVUFBQyxPQUEyQztnQkFDckgsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQztvQkFDZCxLQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQzlDLFVBQUMsSUFBVSxJQUFLLE9BQUEsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLEVBQWhCLENBQWdCLENBQ2pDLENBQUE7WUFDTCxDQUFDLENBQUE7UUFHRCxDQUFDO1FBQ0gsb0NBQUM7SUFBRCxDQVhBLEFBV0MsQ0FYMkMsMkJBQTJCLEdBV3RFO0lBRUQ7UUFBQTtZQUNXLGFBQVEsR0FBMkI7Z0JBQ3hDLE1BQU0sRUFBRSxHQUFHO2dCQUNYLFFBQVEsRUFBRSxHQUFHO2FBQ2QsQ0FBQTtZQUNNLGVBQVUsR0FBYSw2QkFBNkIsQ0FBQTtZQUNwRCxnQkFBVyxHQUFXLDJCQUEyQixDQUFBO1FBQzVELENBQUM7UUFBRCwwQkFBQztJQUFELENBUEEsQUFPQyxJQUFBO0lBUFkseUJBQW1CLHNCQU8vQixDQUFBO0FBQ0gsQ0FBQyxFQWhDUyxLQUFLLEtBQUwsS0FBSyxRQWdDZCIsImZpbGUiOiJzY3JpcHRzL3NwYXJxbC1pdGVtLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBmaWJyYSB7XG4gICd1c2Ugc3RyaWN0J1xuXG4gIGNsYXNzIFNwYXJxbEl0ZW1Db21wb25lbnRCaW5kaW5ncyB7XG4gICAgcHVibGljIGl0ZW1JZDogSU5vZGVcbiAgfVxuXG4gIGludGVyZmFjZSBJU3BhcnFsSXRlbUNvbXBvbmVudEJpbmRpbmdDaGFuZ2VzIHtcbiAgICBpdGVtSWQ/OiBhbmd1bGFyLklDaGFuZ2VzT2JqZWN0XG4gIH1cblxuICBjbGFzcyBTcGFycWxJdGVtQ29tcG9uZW50Q29udHJvbGxlciBleHRlbmRzIFNwYXJxbEl0ZW1Db21wb25lbnRCaW5kaW5ncyB7XG4gICAgcHJpdmF0ZSBpdGVtOiBJdGVtXG4gICAgcHVibGljICRvbkNoYW5nZXM6IChjaGFuZ2VzOiBJU3BhcnFsSXRlbUNvbXBvbmVudEJpbmRpbmdDaGFuZ2VzKSA9PiB2b2lkID0gKGNoYW5nZXM6IElTcGFycWxJdGVtQ29tcG9uZW50QmluZGluZ0NoYW5nZXMpID0+IHtcbiAgICAgIGlmICh0aGlzLml0ZW1JZClcbiAgICAgICAgdGhpcy5zcGFycWxJdGVtU2VydmljZS5nZXRJdGVtKHRoaXMuaXRlbUlkKS50aGVuKFxuICAgICAgICAgIChpdGVtOiBJdGVtKSA9PiB0aGlzLml0ZW0gPSBpdGVtXG4gICAgICAgIClcbiAgICB9XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzcGFycWxJdGVtU2VydmljZTogU3BhcnFsSXRlbVNlcnZpY2UpIHtcbiAgICAgIHN1cGVyKClcbiAgICB9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgU3BhcnFsSXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIGFuZ3VsYXIuSUNvbXBvbmVudE9wdGlvbnMge1xuICAgICAgcHVibGljIGJpbmRpbmdzOiB7W2lkOiBzdHJpbmddOiBzdHJpbmd9ID0ge1xuICAgICAgICBpdGVtSWQ6ICc8JyxcbiAgICAgICAgb25TZWxlY3Q6ICcmJ1xuICAgICAgfVxuICAgICAgcHVibGljIGNvbnRyb2xsZXI6IEZ1bmN0aW9uID0gU3BhcnFsSXRlbUNvbXBvbmVudENvbnRyb2xsZXJcbiAgICAgIHB1YmxpYyB0ZW1wbGF0ZVVybDogc3RyaW5nID0gJ3BhcnRpYWxzL3NwYXJxbC1pdGVtLmh0bWwnXG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var fibra;
(function (fibra) {
    'use strict';
    var s = fi.seco.sparql;
    var NodePlusLabel = (function (_super) {
        __extends(NodePlusLabel, _super);
        function NodePlusLabel(node, label) {
            _super.call(this, node);
            this.node = node;
            this.label = label;
        }
        return NodePlusLabel;
    }(fibra.NodeFromNode));
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
        SparqlItemService.prototype.getItem = function (id, canceller) {
            return this.workerService.call('sparqlItemWorkerService', 'getItem', [id], canceller);
        };
        SparqlItemService.prototype.getAllItems = function (canceller) {
            return this.workerService.call('sparqlItemWorkerService', 'getAllItems', [], canceller);
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
        SparqlItemService.getItemPropertiesQuery = "\nPREFIX skos: <http://www.w3.org/2004/02/skos/core#>\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\nPREFIX owl: <http://www.w3.org/2002/07/owl#>\nPREFIX sf: <http://ldf.fi/functions#>\nSELECT ?serviceId ?service ?itemLabel ?property ?propertyLabel ?object ?objectLabel {\n  <ID> owl:sameAs* ?id .\n  VALUES (?serviceId ?service) {\n    (<SERVICES>)\n  }\n  SERVICE ?service {\n    ?id sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?itemLabel) .\n    ?id ?property ?object .\n    OPTIONAL {\n      ?property sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?propertyLabelP)\n    }\n    BIND(COALESCE(?propertyLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?property),\".*/\",\"\"),\".*#\",\"\"),\"_\",\" \"),\"([A-Z\u00C5\u00C4\u00D6])\",\" $1\")) AS ?propertyLabel)\n    OPTIONAL {\n      ?object sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?objectLabelP) .\n    }\n    BIND (IF(ISIRI(?object),COALESCE(?objectLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?object),\".*/\",\"\"),\".*#\",\"\"),\"_\",\" \"),\"([A-Z\u00C5\u00C4\u00D6])\",\" $1\")),?object) AS ?objectLabel)\n  }\n}\n";
        SparqlItemService.getAllItemPropertiesQuery = "\nPREFIX skos: <http://www.w3.org/2004/02/skos/core#>\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\nPREFIX owl: <http://www.w3.org/2002/07/owl#>\nPREFIX sf: <http://ldf.fi/functions#>\nSELECT ?id ?itemLabel ?property ?propertyLabel ?object ?objectLabel {\n  ?id a ?type .\n  ?id sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?itemLabel) .\n  ?id ?property ?object .\n  OPTIONAL {\n    ?property sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?propertyLabelP)\n  }\n  BIND(COALESCE(?propertyLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?property),\".*/\",\"\"),\".*#\",\"\"),\"_\",\" \"),\"([A-Z\u00C5\u00C4\u00D6])\",\" $1\")) AS ?propertyLabel)\n  OPTIONAL {\n    ?object sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?objectLabelP) .\n  }\n  BIND (IF(ISIRI(?object),COALESCE(?objectLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?object),\".*/\",\"\"),\".*#\",\"\"),\"_\",\" \"),\"([A-Z\u00C5\u00C4\u00D6])\",\" $1\")),?object) AS ?objectLabel)\n}\n";
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
            var queryTemplate = SparqlItemService.getItemPropertiesQuery;
            queryTemplate = queryTemplate.replace(/<ID>/g, id.toCanonical());
            queryTemplate = queryTemplate.replace(/\(<SERVICES>\)/g, this.configurationWorkerService.configuration.allEndpoints().map(function (c) { return '(' + s.SparqlService.stringToSPARQLString(c.id) + c.endpoint.toCanonical() + ')'; }).join(''));
            return this.sparqlService.query(this.configurationWorkerService.configuration.primaryEndpoint.endpoint.value, queryTemplate, { timeout: canceller }).then(function (response) {
                var item = new Item(id);
                var propertyMap = {};
                response.data.results.bindings.forEach(function (b) {
                    if (b['itemLabel'])
                        item.label = new fibra.SparqlBindingNode(b['itemLabel']);
                    if (b['property']) {
                        var propertyToValues = propertyMap[b['property'].value];
                        if (!propertyToValues) {
                            propertyToValues = new PropertyToValues(new fibra.SparqlBindingNode(b['property']));
                            propertyMap[b['property'].value] = propertyToValues;
                            if (b['propertyLabel'])
                                propertyToValues.label = new fibra.SparqlBindingNode(b['propertyLabel']);
                            item.properties.push(propertyToValues);
                        }
                        var oNode = new NodePlusLabel(new fibra.SparqlBindingNode(b['object']));
                        if (b['objectLabel'])
                            oNode.label = new fibra.SparqlBindingNode(b['objectLabel']);
                        propertyToValues.values.push(oNode);
                    }
                });
                return item;
            });
        };
        SparqlItemWorkerService.prototype.getAllItems = function (canceller) {
            var queryTemplate = SparqlItemService.getAllItemPropertiesQuery;
            return this.sparqlService.query(this.configurationWorkerService.configuration.primaryEndpoint.endpoint.value, queryTemplate, { timeout: canceller }).then(function (response) {
                var items = new fibra.EnsuredOrderedMap();
                var itemPropertyMap = new fibra.EnsuredMap();
                response.data.results.bindings.forEach(function (b) {
                    var item = items.goc(b['id'].value, function () { return new Item(new fibra.SparqlBindingNode(b['id'])); });
                    if (b['itemLabel'])
                        item.label = new fibra.SparqlBindingNode(b['itemLabel']);
                    if (b['property']) {
                        var propertyToValues_1 = fibra.goc(itemPropertyMap.goc(item.toCanonical()), b['property'].value, function () {
                            propertyToValues_1 = new PropertyToValues(new fibra.SparqlBindingNode(b['property']));
                            if (b['propertyLabel'])
                                propertyToValues_1.label = new fibra.SparqlBindingNode(b['propertyLabel']);
                            item.properties.push(propertyToValues_1);
                            return propertyToValues_1;
                        });
                        var oNode = new NodePlusLabel(new fibra.SparqlBindingNode(b['object']));
                        if (b['objectLabel'])
                            oNode.label = new fibra.SparqlBindingNode(b['objectLabel']);
                        propertyToValues_1.values.push(oNode);
                    }
                });
                return items.array();
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
        return SparqlItemWorkerService;
    }());/*<auto_generate>*/angular.module('fibra').service('sparqlItemWorkerService',['sparqlService','$q','sparqlUpdateWorkerService','configurationWorkerService',function(){return new (Function.prototype.bind.apply(SparqlItemWorkerService,[null].concat(Array.prototype.slice.apply(arguments))));}]);/*</auto_generate>*/
    fibra.SparqlItemWorkerService = SparqlItemWorkerService;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvc3BhcnFsLWl0ZW0tc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLElBQVUsS0FBSyxDQXVQZDtBQXZQRCxXQUFVLEtBQUssRUFBQyxDQUFDO0lBQ2YsWUFBWSxDQUFBO0lBRVosSUFBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUE7SUFVekI7UUFBbUMsaUNBQVk7UUFDN0MsdUJBQW1CLElBQVcsRUFBUyxLQUFhO1lBQ2xELGtCQUFNLElBQUksQ0FBQyxDQUFBO1lBRE0sU0FBSSxHQUFKLElBQUksQ0FBTztZQUFTLFVBQUssR0FBTCxLQUFLLENBQVE7UUFFcEQsQ0FBQztRQUNILG9CQUFDO0lBQUQsQ0FKQSxBQUlDLENBSmtDLGtCQUFZLEdBSTlDO0lBSlksbUJBQWEsZ0JBSXpCLENBQUE7SUFNRDtRQUFzQyxvQ0FBYTtRQUVqRCwwQkFBWSxRQUFlO1lBQ3pCLGtCQUFNLFFBQVEsQ0FBQyxDQUFBO1lBRlYsV0FBTSxHQUE0QixFQUFFLENBQUE7UUFHM0MsQ0FBQztRQUNILHVCQUFDO0lBQUQsQ0FMQSxBQUtDLENBTHFDLGFBQWEsR0FLbEQ7SUFMWSxzQkFBZ0IsbUJBSzVCLENBQUE7SUFFRDtRQUEwQix3QkFBYTtRQUF2QztZQUEwQiw4QkFBYTtZQUM5QixlQUFVLEdBQXVCLEVBQUUsQ0FBQTtZQUNuQyxzQkFBaUIsR0FBdUIsRUFBRSxDQUFBO1FBQ25ELENBQUM7UUFBRCxXQUFDO0lBQUQsQ0FIQSxBQUdDLENBSHlCLGFBQWEsR0FHdEM7SUFIWSxVQUFJLE9BR2hCLENBQUE7SUFFRDtRQXFGRSwyQkFBb0IsYUFBNEI7WUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBRyxDQUFDO1FBYnRDLHNCQUFJLEdBQWxCO1lBQ0UsK0JBQStCO1lBQy9CLElBQUksRUFBRSxHQUFXLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxVQUFVLEdBQUcsQ0FBQyxDQUFBO1lBQy9DLElBQUksRUFBRSxHQUFXLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxVQUFVLEdBQUcsQ0FBQyxDQUFBO1lBQy9DLElBQUksRUFBRSxHQUFXLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxVQUFVLEdBQUcsQ0FBQyxDQUFBO1lBQy9DLElBQUksRUFBRSxHQUFXLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxVQUFVLEdBQUcsQ0FBQyxDQUFBO1lBQy9DLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUc7Z0JBQ3JLLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHO2dCQUM3SyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLEdB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QSxBQXNHQyxJQUFBO0lBdEdZLDZCQUF1QiwwQkFzR25DLENBQUE7QUFFSCxDQUFDLEVBdlBTLEtBQUssS0FBTCxLQUFLLFFBdVBkIiwiZmlsZSI6InNjcmlwdHMvc3BhcnFsLWl0ZW0tc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBmaWJyYSB7XG4gICd1c2Ugc3RyaWN0J1xuXG4gIGltcG9ydCBzID0gZmkuc2Vjby5zcGFycWxcblxuICBleHBvcnQgaW50ZXJmYWNlIElTb3VyY2VkTm9kZSBleHRlbmRzIElOb2RlIHtcbiAgICBzb3VyY2VFbmRwb2ludHM6IHN0cmluZ1tdXG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIElOb2RlUGx1c0xhYmVsIGV4dGVuZHMgSU5vZGUge1xuICAgIGxhYmVsOiBJTm9kZVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIE5vZGVQbHVzTGFiZWwgZXh0ZW5kcyBOb2RlRnJvbU5vZGUgaW1wbGVtZW50cyBJTm9kZVBsdXNMYWJlbCB7XG4gICAgY29uc3RydWN0b3IocHVibGljIG5vZGU6IElOb2RlLCBwdWJsaWMgbGFiZWw/OiBJTm9kZSkge1xuICAgICAgc3VwZXIobm9kZSlcbiAgICB9XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIElQcm9wZXJ0eVRvVmFsdWVzIGV4dGVuZHMgSU5vZGVQbHVzTGFiZWwge1xuICAgIHZhbHVlczogKElOb2RlfE5vZGVQbHVzTGFiZWwpW11cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBQcm9wZXJ0eVRvVmFsdWVzIGV4dGVuZHMgTm9kZVBsdXNMYWJlbCB7XG4gICAgcHVibGljIHZhbHVlczogKElOb2RlfE5vZGVQbHVzTGFiZWwpW10gPSBbXVxuICAgIGNvbnN0cnVjdG9yKHByb3BlcnR5OiBJTm9kZSkge1xuICAgICAgc3VwZXIocHJvcGVydHkpXG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIEl0ZW0gZXh0ZW5kcyBOb2RlUGx1c0xhYmVsIHtcbiAgICBwdWJsaWMgcHJvcGVydGllczogUHJvcGVydHlUb1ZhbHVlc1tdID0gW11cbiAgICBwdWJsaWMgaW52ZXJzZVByb3BlcnRpZXM6IFByb3BlcnR5VG9WYWx1ZXNbXSA9IFtdXG4gIH1cblxuICBleHBvcnQgY2xhc3MgU3BhcnFsSXRlbVNlcnZpY2Uge1xuXG4gICAgcHVibGljIHN0YXRpYyBuczogc3RyaW5nID0gJ2h0dHA6Ly9sZGYuZmkvZmlicmEvJ1xuICAgIHB1YmxpYyBzdGF0aWMgc2NoZW1hR3JhcGg6IElOb2RlID0gbmV3IE5hbWVkTm9kZShTcGFycWxJdGVtU2VydmljZS5ucyArICdzY2hlbWEjJylcbiAgICBwdWJsaWMgc3RhdGljIGluc3RhbmNlR3JhcGg6IElOb2RlID0gbmV3IE5hbWVkTm9kZShTcGFycWxJdGVtU2VydmljZS5ucyArICdtYWluLycpXG5cbiAgICBwdWJsaWMgc3RhdGljIGdldEl0ZW1Qcm9wZXJ0aWVzUXVlcnk6IHN0cmluZyA9IGBcblBSRUZJWCBza29zOiA8aHR0cDovL3d3dy53My5vcmcvMjAwNC8wMi9za29zL2NvcmUjPlxuUFJFRklYIHJkZnM6IDxodHRwOi8vd3d3LnczLm9yZy8yMDAwLzAxL3JkZi1zY2hlbWEjPlxuUFJFRklYIG93bDogPGh0dHA6Ly93d3cudzMub3JnLzIwMDIvMDcvb3dsIz5cblBSRUZJWCBzZjogPGh0dHA6Ly9sZGYuZmkvZnVuY3Rpb25zIz5cblNFTEVDVCA/c2VydmljZUlkID9zZXJ2aWNlID9pdGVtTGFiZWwgP3Byb3BlcnR5ID9wcm9wZXJ0eUxhYmVsID9vYmplY3QgP29iamVjdExhYmVsIHtcbiAgPElEPiBvd2w6c2FtZUFzKiA/aWQgLlxuICBWQUxVRVMgKD9zZXJ2aWNlSWQgP3NlcnZpY2UpIHtcbiAgICAoPFNFUlZJQ0VTPilcbiAgfVxuICBTRVJWSUNFID9zZXJ2aWNlIHtcbiAgICA/aWQgc2Y6cHJlZmVycmVkTGFuZ3VhZ2VMaXRlcmFsIChza29zOnByZWZMYWJlbCByZGZzOmxhYmVsIHNrb3M6YWx0TGFiZWwgJ2VuJyAnJyA/aXRlbUxhYmVsKSAuXG4gICAgP2lkID9wcm9wZXJ0eSA/b2JqZWN0IC5cbiAgICBPUFRJT05BTCB7XG4gICAgICA/cHJvcGVydHkgc2Y6cHJlZmVycmVkTGFuZ3VhZ2VMaXRlcmFsIChza29zOnByZWZMYWJlbCByZGZzOmxhYmVsIHNrb3M6YWx0TGFiZWwgJ2VuJyAnJyA/cHJvcGVydHlMYWJlbFApXG4gICAgfVxuICAgIEJJTkQoQ09BTEVTQ0UoP3Byb3BlcnR5TGFiZWxQLFJFUExBQ0UoUkVQTEFDRShSRVBMQUNFKFJFUExBQ0UoU1RSKD9wcm9wZXJ0eSksXCIuKi9cIixcIlwiKSxcIi4qI1wiLFwiXCIpLFwiX1wiLFwiIFwiKSxcIihbQS1aw4XDhMOWXSlcIixcIiAkMVwiKSkgQVMgP3Byb3BlcnR5TGFiZWwpXG4gICAgT1BUSU9OQUwge1xuICAgICAgP29iamVjdCBzZjpwcmVmZXJyZWRMYW5ndWFnZUxpdGVyYWwgKHNrb3M6cHJlZkxhYmVsIHJkZnM6bGFiZWwgc2tvczphbHRMYWJlbCAnZW4nICcnID9vYmplY3RMYWJlbFApIC5cbiAgICB9XG4gICAgQklORCAoSUYoSVNJUkkoP29iamVjdCksQ09BTEVTQ0UoP29iamVjdExhYmVsUCxSRVBMQUNFKFJFUExBQ0UoUkVQTEFDRShSRVBMQUNFKFNUUig/b2JqZWN0KSxcIi4qL1wiLFwiXCIpLFwiLiojXCIsXCJcIiksXCJfXCIsXCIgXCIpLFwiKFtBLVrDhcOEw5ZdKVwiLFwiICQxXCIpKSw/b2JqZWN0KSBBUyA/b2JqZWN0TGFiZWwpXG4gIH1cbn1cbmBcblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0QWxsSXRlbVByb3BlcnRpZXNRdWVyeTogc3RyaW5nID0gYFxuUFJFRklYIHNrb3M6IDxodHRwOi8vd3d3LnczLm9yZy8yMDA0LzAyL3Nrb3MvY29yZSM+XG5QUkVGSVggcmRmczogPGh0dHA6Ly93d3cudzMub3JnLzIwMDAvMDEvcmRmLXNjaGVtYSM+XG5QUkVGSVggb3dsOiA8aHR0cDovL3d3dy53My5vcmcvMjAwMi8wNy9vd2wjPlxuUFJFRklYIHNmOiA8aHR0cDovL2xkZi5maS9mdW5jdGlvbnMjPlxuU0VMRUNUID9pZCA/aXRlbUxhYmVsID9wcm9wZXJ0eSA/cHJvcGVydHlMYWJlbCA/b2JqZWN0ID9vYmplY3RMYWJlbCB7XG4gID9pZCBhID90eXBlIC5cbiAgP2lkIHNmOnByZWZlcnJlZExhbmd1YWdlTGl0ZXJhbCAoc2tvczpwcmVmTGFiZWwgcmRmczpsYWJlbCBza29zOmFsdExhYmVsICdlbicgJycgP2l0ZW1MYWJlbCkgLlxuICA/aWQgP3Byb3BlcnR5ID9vYmplY3QgLlxuICBPUFRJT05BTCB7XG4gICAgP3Byb3BlcnR5IHNmOnByZWZlcnJlZExhbmd1YWdlTGl0ZXJhbCAoc2tvczpwcmVmTGFiZWwgcmRmczpsYWJlbCBza29zOmFsdExhYmVsICdlbicgJycgP3Byb3BlcnR5TGFiZWxQKVxuICB9XG4gIEJJTkQoQ09BTEVTQ0UoP3Byb3BlcnR5TGFiZWxQLFJFUExBQ0UoUkVQTEFDRShSRVBMQUNFKFJFUExBQ0UoU1RSKD9wcm9wZXJ0eSksXCIuKi9cIixcIlwiKSxcIi4qI1wiLFwiXCIpLFwiX1wiLFwiIFwiKSxcIihbQS1aw4XDhMOWXSlcIixcIiAkMVwiKSkgQVMgP3Byb3BlcnR5TGFiZWwpXG4gIE9QVElPTkFMIHtcbiAgICA/b2JqZWN0IHNmOnByZWZlcnJlZExhbmd1YWdlTGl0ZXJhbCAoc2tvczpwcmVmTGFiZWwgcmRmczpsYWJlbCBza29zOmFsdExhYmVsICdlbicgJycgP29iamVjdExhYmVsUCkgLlxuICB9XG4gIEJJTkQgKElGKElTSVJJKD9vYmplY3QpLENPQUxFU0NFKD9vYmplY3RMYWJlbFAsUkVQTEFDRShSRVBMQUNFKFJFUExBQ0UoUkVQTEFDRShTVFIoP29iamVjdCksXCIuKi9cIixcIlwiKSxcIi4qI1wiLFwiXCIpLFwiX1wiLFwiIFwiKSxcIihbQS1aw4XDhMOWXSlcIixcIiAkMVwiKSksP29iamVjdCkgQVMgP29iamVjdExhYmVsKVxufVxuYFxuXG4gICAgcHVibGljIHN0YXRpYyBkZWxldGVJdGVtUXVlcnk6IHN0cmluZyA9IGBcbkRFTEVURSB7XG4gIEdSQVBIID9nIHtcbiAgICA8SUQ+ID9wID9vIC5cbiAgICA/cyA/cCA8SUQ+IC5cbiAgfVxufVxuV0hFUkUge1xuICBHUkFQSCA/ZyB7XG4gICAgeyA8SUQ+ID9wID9vIH0gVU5JT04geyA/cyA/cCA8SUQ+IH1cbiAgfVxufVxuYFxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgbHV0OiBzdHJpbmdbXSA9ICgoKSA9PiB7XG4gICAgICBsZXQgbHV0OiBzdHJpbmdbXSA9IFtdXG4gICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgMjU2OyBpKyspXG4gICAgICAgIGx1dFtpXSA9IChpIDwgMTYgPyAnMCcgOiAnJykgKyBpLnRvU3RyaW5nKDE2KVxuICAgICAgcmV0dXJuIGx1dFxuICAgIH0pKClcblxuICAgIHB1YmxpYyBzdGF0aWMgVVVJRCgpOiBzdHJpbmcge1xuICAgICAgLyogdHNsaW50OmRpc2FibGU6bm8tYml0d2lzZSAqL1xuICAgICAgbGV0IGQwOiBudW1iZXIgPSBNYXRoLnJhbmRvbSgpICogMHhmZmZmZmZmZiB8IDBcbiAgICAgIGxldCBkMTogbnVtYmVyID0gTWF0aC5yYW5kb20oKSAqIDB4ZmZmZmZmZmYgfCAwXG4gICAgICBsZXQgZDI6IG51bWJlciA9IE1hdGgucmFuZG9tKCkgKiAweGZmZmZmZmZmIHwgMFxuICAgICAgbGV0IGQzOiBudW1iZXIgPSBNYXRoLnJhbmRvbSgpICogMHhmZmZmZmZmZiB8IDBcbiAgICAgIHJldHVybiBTcGFycWxJdGVtU2VydmljZS5sdXRbZDAgJiAweGZmXSArIFNwYXJxbEl0ZW1TZXJ2aWNlLmx1dFtkMCA+PiA4ICYgMHhmZl0gKyBTcGFycWxJdGVtU2VydmljZS5sdXRbZDAgPj4gMTYgJiAweGZmXSArIFNwYXJxbEl0ZW1TZXJ2aWNlLmx1dFtkMCA+PiAyNCAmIDB4ZmZdICsgJy0nICtcbiAgICAgICAgU3BhcnFsSXRlbVNlcnZpY2UubHV0W2QxICYgMHhmZl0gKyBTcGFycWxJdGVtU2VydmljZS5sdXRbZDEgPj4gOCAmIDB4ZmZdICsgJy0nICsgU3BhcnFsSXRlbVNlcnZpY2UubHV0W2QxID4+IDE2ICYgMHgwZiB8IDB4NDBdICsgU3BhcnFsSXRlbVNlcnZpY2UubHV0W2QxID4+IDI0ICYgMHhmZl0gKyAnLScgK1xuICAgICAgICBTcGFycWxJdGVtU2VydmljZS5sdXRbZDIgJiAweDNmIHwgMHg4MF0gKyBTcGFycWxJdGVtU2VydmljZS5sdXRbZDIgPj4gOCAmIDB4ZmZdICsgJy0nICsgU3BhcnFsSXRlbVNlcnZpY2UubHV0W2QyID4+IDE2ICYgMHhmZl0gKyBTcGFycWxJdGVtU2VydmljZS5sdXRbZDIgPj4gMjQgJiAweGZmXSArXG4gICAgICAgIFNwYXJxbEl0ZW1TZXJ2aWNlLmx1dFtkMyAmIDB4ZmZdICsgU3BhcnFsSXRlbVNlcnZpY2UubHV0W2QzID4+IDggJiAweGZmXSArIFNwYXJxbEl0ZW1TZXJ2aWNlLmx1dFtkMyA+PiAxNiAmIDB4ZmZdICsgU3BhcnFsSXRlbVNlcnZpY2UubHV0W2QzID4+IDI0ICYgMHhmZl1cbiAgICAgIC8qIHRzbGludDplbmFibGU6bm8tYml0d2lzZSAqL1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgd29ya2VyU2VydmljZTogV29ya2VyU2VydmljZSkge31cblxuICAgIHB1YmxpYyBnZXRJdGVtKGlkOiBJTm9kZSwgY2FuY2VsbGVyPzogYW5ndWxhci5JUHJvbWlzZTxhbnk+KTogYW5ndWxhci5JUHJvbWlzZTxJdGVtPiB7XG4gICAgICByZXR1cm4gdGhpcy53b3JrZXJTZXJ2aWNlLmNhbGwoJ3NwYXJxbEl0ZW1Xb3JrZXJTZXJ2aWNlJywgJ2dldEl0ZW0nLCBbaWRdLCBjYW5jZWxsZXIpXG4gICAgfVxuXG4gICAgcHVibGljIGdldEFsbEl0ZW1zKGNhbmNlbGxlcj86IGFuZ3VsYXIuSVByb21pc2U8YW55Pik6IGFuZ3VsYXIuSVByb21pc2U8SXRlbVtdPiB7XG4gICAgICByZXR1cm4gdGhpcy53b3JrZXJTZXJ2aWNlLmNhbGwoJ3NwYXJxbEl0ZW1Xb3JrZXJTZXJ2aWNlJywgJ2dldEFsbEl0ZW1zJywgW10sIGNhbmNlbGxlcilcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlTmV3SXRlbShlcXVpdmFsZW50Tm9kZXM6IElOb2RlW10gPSBbXSwgcHJvcGVydGllczogSVByb3BlcnR5VG9WYWx1ZXNbXSA9IFtdKTogYW5ndWxhci5JUHJvbWlzZTxJTm9kZT4ge1xuICAgICAgcmV0dXJuIHRoaXMud29ya2VyU2VydmljZS5jYWxsKCdzcGFycWxJdGVtV29ya2VyU2VydmljZScsICdjcmVhdGVOZXdJdGVtJywgW2VxdWl2YWxlbnROb2RlcywgcHJvcGVydGllc10pXG4gICAgfVxuXG4gICAgcHVibGljIGFsdGVySXRlbShpZDogSU5vZGUsIHByb3BlcnRpZXNUb0FkZDogSVByb3BlcnR5VG9WYWx1ZXNbXSwgcHJvcGVydGllc1RvUmVtb3ZlOiBJUHJvcGVydHlUb1ZhbHVlc1tdID0gW10pOiBhbmd1bGFyLklQcm9taXNlPHN0cmluZz4ge1xuICAgICAgcmV0dXJuIHRoaXMud29ya2VyU2VydmljZS5jYWxsKCdzcGFycWxJdGVtV29ya2VyU2VydmljZScsICdhbHRlckl0ZW0nLCBbaWQsIHByb3BlcnRpZXNUb0FkZCwgcHJvcGVydGllc1RvUmVtb3ZlXSlcbiAgICB9XG5cbiAgICBwdWJsaWMgZGVsZXRlSXRlbShpZDogSU5vZGUpOiBhbmd1bGFyLklQcm9taXNlPHN0cmluZz4ge1xuICAgICAgcmV0dXJuIHRoaXMud29ya2VyU2VydmljZS5jYWxsKCdzcGFycWxJdGVtV29ya2VyU2VydmljZScsICdkZWxldGVJdGVtJywgW2lkXSlcbiAgICB9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgU3BhcnFsSXRlbVdvcmtlclNlcnZpY2Uge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzcGFycWxTZXJ2aWNlOiBzLlNwYXJxbFNlcnZpY2UsIHByaXZhdGUgJHE6IGFuZ3VsYXIuSVFTZXJ2aWNlLCBwcml2YXRlIHNwYXJxbFVwZGF0ZVdvcmtlclNlcnZpY2U6IFNwYXJxbFVwZGF0ZVdvcmtlclNlcnZpY2UsIHByaXZhdGUgY29uZmlndXJhdGlvbldvcmtlclNlcnZpY2U6IENvbmZpZ3VyYXRpb25Xb3JrZXJTZXJ2aWNlKSB7fVxuXG4gICAgcHVibGljIGdldEl0ZW0oaWQ6IElOb2RlLCBjYW5jZWxsZXI/OiBhbmd1bGFyLklQcm9taXNlPGFueT4pOiBhbmd1bGFyLklQcm9taXNlPEl0ZW0+IHtcbiAgICAgIGxldCBxdWVyeVRlbXBsYXRlOiBzdHJpbmcgPSBTcGFycWxJdGVtU2VydmljZS5nZXRJdGVtUHJvcGVydGllc1F1ZXJ5XG4gICAgICBxdWVyeVRlbXBsYXRlID0gcXVlcnlUZW1wbGF0ZS5yZXBsYWNlKC88SUQ+L2csIGlkLnRvQ2Fub25pY2FsKCkpXG4gICAgICBxdWVyeVRlbXBsYXRlID0gcXVlcnlUZW1wbGF0ZS5yZXBsYWNlKC9cXCg8U0VSVklDRVM+XFwpL2csIHRoaXMuY29uZmlndXJhdGlvbldvcmtlclNlcnZpY2UuY29uZmlndXJhdGlvbi5hbGxFbmRwb2ludHMoKS5tYXAoYyA9PiAnKCcgKyBzLlNwYXJxbFNlcnZpY2Uuc3RyaW5nVG9TUEFSUUxTdHJpbmcoYy5pZCkgKyBjLmVuZHBvaW50LnRvQ2Fub25pY2FsKCkgKyAnKScpLmpvaW4oJycpKVxuICAgICAgcmV0dXJuIHRoaXMuc3BhcnFsU2VydmljZS5xdWVyeSh0aGlzLmNvbmZpZ3VyYXRpb25Xb3JrZXJTZXJ2aWNlLmNvbmZpZ3VyYXRpb24ucHJpbWFyeUVuZHBvaW50LmVuZHBvaW50LnZhbHVlLCBxdWVyeVRlbXBsYXRlLCB7dGltZW91dDogY2FuY2VsbGVyfSkudGhlbihcbiAgICAgICAgKHJlc3BvbnNlOiBhbmd1bGFyLklIdHRwUHJvbWlzZUNhbGxiYWNrQXJnPHMuSVNwYXJxbEJpbmRpbmdSZXN1bHQ8e1tpZDogc3RyaW5nXTogcy5JU3BhcnFsQmluZGluZ30+PikgPT4ge1xuICAgICAgICAgIGxldCBpdGVtOiBJdGVtID0gbmV3IEl0ZW0oaWQpXG4gICAgICAgICAgbGV0IHByb3BlcnR5TWFwOiB7W3Byb3BlcnR5OiBzdHJpbmddOiBQcm9wZXJ0eVRvVmFsdWVzfSA9IHt9XG4gICAgICAgICAgcmVzcG9uc2UuZGF0YS5yZXN1bHRzLmJpbmRpbmdzLmZvckVhY2goYiA9PiB7XG4gICAgICAgICAgICBpZiAoYlsnaXRlbUxhYmVsJ10pIGl0ZW0ubGFiZWwgPSBuZXcgU3BhcnFsQmluZGluZ05vZGUoYlsnaXRlbUxhYmVsJ10pXG4gICAgICAgICAgICBpZiAoYlsncHJvcGVydHknXSkge1xuICAgICAgICAgICAgICBsZXQgcHJvcGVydHlUb1ZhbHVlczogUHJvcGVydHlUb1ZhbHVlcyA9IHByb3BlcnR5TWFwW2JbJ3Byb3BlcnR5J10udmFsdWVdXG4gICAgICAgICAgICAgIGlmICghcHJvcGVydHlUb1ZhbHVlcykge1xuICAgICAgICAgICAgICAgIHByb3BlcnR5VG9WYWx1ZXMgPSBuZXcgUHJvcGVydHlUb1ZhbHVlcyhuZXcgU3BhcnFsQmluZGluZ05vZGUoYlsncHJvcGVydHknXSkpXG4gICAgICAgICAgICAgICAgcHJvcGVydHlNYXBbYlsncHJvcGVydHknXS52YWx1ZV0gPSBwcm9wZXJ0eVRvVmFsdWVzXG4gICAgICAgICAgICAgICAgaWYgKGJbJ3Byb3BlcnR5TGFiZWwnXSkgcHJvcGVydHlUb1ZhbHVlcy5sYWJlbCA9IG5ldyBTcGFycWxCaW5kaW5nTm9kZShiWydwcm9wZXJ0eUxhYmVsJ10pXG4gICAgICAgICAgICAgICAgaXRlbS5wcm9wZXJ0aWVzLnB1c2gocHJvcGVydHlUb1ZhbHVlcylcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBsZXQgb05vZGU6IE5vZGVQbHVzTGFiZWwgPSBuZXcgTm9kZVBsdXNMYWJlbChuZXcgU3BhcnFsQmluZGluZ05vZGUoYlsnb2JqZWN0J10pKVxuICAgICAgICAgICAgICBpZiAoYlsnb2JqZWN0TGFiZWwnXSkgb05vZGUubGFiZWwgPSBuZXcgU3BhcnFsQmluZGluZ05vZGUoYlsnb2JqZWN0TGFiZWwnXSlcbiAgICAgICAgICAgICAgcHJvcGVydHlUb1ZhbHVlcy52YWx1ZXMucHVzaChvTm9kZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIHJldHVybiBpdGVtXG4gICAgICAgIH1cbiAgICAgIClcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0QWxsSXRlbXMoY2FuY2VsbGVyPzogYW5ndWxhci5JUHJvbWlzZTxhbnk+KTogYW5ndWxhci5JUHJvbWlzZTxJdGVtW10+IHtcbiAgICAgIGxldCBxdWVyeVRlbXBsYXRlOiBzdHJpbmcgPSBTcGFycWxJdGVtU2VydmljZS5nZXRBbGxJdGVtUHJvcGVydGllc1F1ZXJ5XG4gICAgICByZXR1cm4gdGhpcy5zcGFycWxTZXJ2aWNlLnF1ZXJ5KHRoaXMuY29uZmlndXJhdGlvbldvcmtlclNlcnZpY2UuY29uZmlndXJhdGlvbi5wcmltYXJ5RW5kcG9pbnQuZW5kcG9pbnQudmFsdWUsIHF1ZXJ5VGVtcGxhdGUsIHt0aW1lb3V0OiBjYW5jZWxsZXJ9KS50aGVuKFxuICAgICAgICAocmVzcG9uc2U6IGFuZ3VsYXIuSUh0dHBQcm9taXNlQ2FsbGJhY2tBcmc8cy5JU3BhcnFsQmluZGluZ1Jlc3VsdDx7W2lkOiBzdHJpbmddOiBzLklTcGFycWxCaW5kaW5nfT4+KSA9PiB7XG4gICAgICAgICAgbGV0IGl0ZW1zOiBFbnN1cmVkT3JkZXJlZE1hcDxJdGVtPiA9IG5ldyBFbnN1cmVkT3JkZXJlZE1hcDxJdGVtPigpXG4gICAgICAgICAgbGV0IGl0ZW1Qcm9wZXJ0eU1hcDogRW5zdXJlZE1hcDx7W3Byb3BlcnR5OiBzdHJpbmddOiBQcm9wZXJ0eVRvVmFsdWVzfT4gPSBuZXcgRW5zdXJlZE1hcDx7W3Byb3BlcnR5OiBzdHJpbmddOiBQcm9wZXJ0eVRvVmFsdWVzfT4oKVxuICAgICAgICAgIHJlc3BvbnNlLmRhdGEucmVzdWx0cy5iaW5kaW5ncy5mb3JFYWNoKGIgPT4ge1xuICAgICAgICAgICAgbGV0IGl0ZW06IEl0ZW0gPSBpdGVtcy5nb2MoYlsnaWQnXS52YWx1ZSwgKCkgPT4gbmV3IEl0ZW0obmV3IFNwYXJxbEJpbmRpbmdOb2RlKGJbJ2lkJ10pKSlcbiAgICAgICAgICAgIGlmIChiWydpdGVtTGFiZWwnXSkgaXRlbS5sYWJlbCA9IG5ldyBTcGFycWxCaW5kaW5nTm9kZShiWydpdGVtTGFiZWwnXSlcbiAgICAgICAgICAgIGlmIChiWydwcm9wZXJ0eSddKSB7XG4gICAgICAgICAgICAgIGxldCBwcm9wZXJ0eVRvVmFsdWVzOiBQcm9wZXJ0eVRvVmFsdWVzID0gZ29jKGl0ZW1Qcm9wZXJ0eU1hcC5nb2MoaXRlbS50b0Nhbm9uaWNhbCgpKSwgYlsncHJvcGVydHknXS52YWx1ZSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHByb3BlcnR5VG9WYWx1ZXMgPSBuZXcgUHJvcGVydHlUb1ZhbHVlcyhuZXcgU3BhcnFsQmluZGluZ05vZGUoYlsncHJvcGVydHknXSkpXG4gICAgICAgICAgICAgICAgaWYgKGJbJ3Byb3BlcnR5TGFiZWwnXSkgcHJvcGVydHlUb1ZhbHVlcy5sYWJlbCA9IG5ldyBTcGFycWxCaW5kaW5nTm9kZShiWydwcm9wZXJ0eUxhYmVsJ10pXG4gICAgICAgICAgICAgICAgaXRlbS5wcm9wZXJ0aWVzLnB1c2gocHJvcGVydHlUb1ZhbHVlcylcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvcGVydHlUb1ZhbHVlc1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICBsZXQgb05vZGU6IE5vZGVQbHVzTGFiZWwgPSBuZXcgTm9kZVBsdXNMYWJlbChuZXcgU3BhcnFsQmluZGluZ05vZGUoYlsnb2JqZWN0J10pKVxuICAgICAgICAgICAgICBpZiAoYlsnb2JqZWN0TGFiZWwnXSkgb05vZGUubGFiZWwgPSBuZXcgU3BhcnFsQmluZGluZ05vZGUoYlsnb2JqZWN0TGFiZWwnXSlcbiAgICAgICAgICAgICAgcHJvcGVydHlUb1ZhbHVlcy52YWx1ZXMucHVzaChvTm9kZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIHJldHVybiBpdGVtcy5hcnJheSgpXG4gICAgICAgIH1cbiAgICAgIClcbiAgICB9XG5cbiAgICBwdWJsaWMgZGVsZXRlSXRlbShpZDogSU5vZGUpOiBhbmd1bGFyLklQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgIHJldHVybiB0aGlzLnNwYXJxbFNlcnZpY2UudXBkYXRlKHRoaXMuY29uZmlndXJhdGlvbldvcmtlclNlcnZpY2UuY29uZmlndXJhdGlvbi5wcmltYXJ5RW5kcG9pbnQudXBkYXRlRW5kcG9pbnQudmFsdWUsIHRoaXMuY29uZmlndXJhdGlvbldvcmtlclNlcnZpY2UuY29uZmlndXJhdGlvbi5kZWxldGVJdGVtUXVlcnkucmVwbGFjZSgvPElEPi9nLCBpZC50b0Nhbm9uaWNhbCgpKSkudGhlbihcbiAgICAgICAgKHIpID0+IHIuc3RhdHVzID09PSAyMDQsXG4gICAgICAgIChyKSA9PiBmYWxzZVxuICAgICAgKVxuICAgIH1cblxuICAgIHB1YmxpYyBhbHRlckl0ZW0oaWQ6IElOb2RlLCBwcm9wZXJ0aWVzVG9BZGQ6IElQcm9wZXJ0eVRvVmFsdWVzW10sIHByb3BlcnRpZXNUb1JlbW92ZTogSVByb3BlcnR5VG9WYWx1ZXNbXSA9IFtdKTogYW5ndWxhci5JUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICBsZXQgaW5zdGFuY2VUcmlwbGVzVG9BZGQ6IElUcmlwbGVbXSA9IFtdXG4gICAgICBsZXQgc2NoZW1hVHJpcGxlc1RvQWRkOiBJVHJpcGxlW10gPSBbXVxuICAgICAgbGV0IGluc3RhbmNlVHJpcGxlc1RvUmVtb3ZlOiBJVHJpcGxlW10gPSBbXVxuICAgICAgcHJvcGVydGllc1RvQWRkLmZvckVhY2gocHJvcGVydHkgPT4ge1xuICAgICAgICBpZiAocHJvcGVydHkubGFiZWwpIHNjaGVtYVRyaXBsZXNUb0FkZC5wdXNoKG5ldyBUcmlwbGUocHJvcGVydHksIFNLT1MucHJlZkxhYmVsLCBwcm9wZXJ0eS5sYWJlbCkpXG4gICAgICAgIHByb3BlcnR5LnZhbHVlcy5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgICAgICBpbnN0YW5jZVRyaXBsZXNUb0FkZC5wdXNoKG5ldyBUcmlwbGUoaWQsIHByb3BlcnR5LCB2YWx1ZSkpXG4gICAgICAgICAgaWYgKCg8Tm9kZVBsdXNMYWJlbD52YWx1ZSkubGFiZWwpIGluc3RhbmNlVHJpcGxlc1RvQWRkLnB1c2gobmV3IFRyaXBsZSh2YWx1ZSwgU0tPUy5wcmVmTGFiZWwsICg8Tm9kZVBsdXNMYWJlbD52YWx1ZSkubGFiZWwpKVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICAgIHByb3BlcnRpZXNUb1JlbW92ZS5mb3JFYWNoKHByb3BlcnR5ID0+IHByb3BlcnR5LnZhbHVlcy5mb3JFYWNoKHZhbHVlID0+IGluc3RhbmNlVHJpcGxlc1RvUmVtb3ZlLnB1c2gobmV3IFRyaXBsZShpZCwgcHJvcGVydHksIHZhbHVlKSkpKVxuICAgICAgcmV0dXJuIHRoaXMuc3BhcnFsVXBkYXRlV29ya2VyU2VydmljZS51cGRhdGVHcmFwaHModGhpcy5jb25maWd1cmF0aW9uV29ya2VyU2VydmljZS5jb25maWd1cmF0aW9uLnByaW1hcnlFbmRwb2ludC51cGRhdGVFbmRwb2ludC52YWx1ZSwgW25ldyBHcmFwaChTcGFycWxJdGVtU2VydmljZS5zY2hlbWFHcmFwaCwgc2NoZW1hVHJpcGxlc1RvQWRkKSwgbmV3IEdyYXBoKFNwYXJxbEl0ZW1TZXJ2aWNlLmluc3RhbmNlR3JhcGgsIGluc3RhbmNlVHJpcGxlc1RvQWRkKV0pXG4gICAgfVxuXG4gICAgcHVibGljIGNyZWF0ZU5ld0l0ZW0oZXF1aXZhbGVudE5vZGVzOiBJTm9kZVtdID0gW10sIHByb3BlcnRpZXM6IFByb3BlcnR5VG9WYWx1ZXNbXSA9IFtdKTogYW5ndWxhci5JUHJvbWlzZTxJTm9kZT4ge1xuICAgICAgbGV0IGRlZmVycmVkOiBhbmd1bGFyLklEZWZlcnJlZDxJTm9kZT4gPSB0aGlzLiRxLmRlZmVyKClcbiAgICAgIGxldCBzdWJqZWN0OiBJTm9kZSA9IG5ldyBOYW1lZE5vZGUoU3BhcnFsSXRlbVNlcnZpY2UubnMgKyBTcGFycWxJdGVtU2VydmljZS5VVUlEKCkpXG4gICAgICBkZWZlcnJlZC5ub3RpZnkoc3ViamVjdClcbiAgICAgIGxldCBzY2hlbWFUcmlwbGVzVG9BZGQ6IFRyaXBsZVtdID0gW11cbiAgICAgIGxldCBpbnN0YW5jZVRyaXBsZXNUb0FkZDogVHJpcGxlW10gPSBbXVxuICAgICAgZXF1aXZhbGVudE5vZGVzLmZvckVhY2gobm9kZSA9PiBpbnN0YW5jZVRyaXBsZXNUb0FkZC5wdXNoKG5ldyBUcmlwbGUoc3ViamVjdCwgT1dMLnNhbWVBcywgbm9kZSkpKVxuICAgICAgcHJvcGVydGllcy5mb3JFYWNoKHByb3BlcnR5ID0+IHtcbiAgICAgICAgaWYgKHByb3BlcnR5LmxhYmVsKSBzY2hlbWFUcmlwbGVzVG9BZGQucHVzaChuZXcgVHJpcGxlKHByb3BlcnR5LCBTS09TLnByZWZMYWJlbCwgcHJvcGVydHkubGFiZWwpKVxuICAgICAgICBwcm9wZXJ0eS52YWx1ZXMuZm9yRWFjaCh2YWx1ZSA9PiB7XG4gICAgICAgICAgaW5zdGFuY2VUcmlwbGVzVG9BZGQucHVzaChuZXcgVHJpcGxlKHN1YmplY3QsIHByb3BlcnR5LCB2YWx1ZSkpXG4gICAgICAgICAgaWYgKCg8Tm9kZVBsdXNMYWJlbD52YWx1ZSkubGFiZWwpIGluc3RhbmNlVHJpcGxlc1RvQWRkLnB1c2gobmV3IFRyaXBsZSh2YWx1ZSwgU0tPUy5wcmVmTGFiZWwsICg8Tm9kZVBsdXNMYWJlbD52YWx1ZSkubGFiZWwpKVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICAgIHRoaXMuc3BhcnFsVXBkYXRlV29ya2VyU2VydmljZS51cGRhdGVHcmFwaHModGhpcy5jb25maWd1cmF0aW9uV29ya2VyU2VydmljZS5jb25maWd1cmF0aW9uLnByaW1hcnlFbmRwb2ludC51cGRhdGVFbmRwb2ludC52YWx1ZSwgW25ldyBHcmFwaChTcGFycWxJdGVtU2VydmljZS5zY2hlbWFHcmFwaCwgc2NoZW1hVHJpcGxlc1RvQWRkKSwgbmV3IEdyYXBoKFNwYXJxbEl0ZW1TZXJ2aWNlLmluc3RhbmNlR3JhcGgsIGluc3RhbmNlVHJpcGxlc1RvQWRkKV0pLnRoZW4oXG4gICAgICAgICgpID0+IGRlZmVycmVkLnJlc29sdmUoc3ViamVjdCksXG4gICAgICAgIGRlZmVycmVkLnJlamVjdCxcbiAgICAgICAgZGVmZXJyZWQubm90aWZ5XG4gICAgICApXG4gICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZVxuICAgIH1cblxuICB9XG5cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvc3BhcnFsLXRyZWUtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFVLEtBQUssQ0FvRWQ7QUFwRUQsV0FBVSxLQUFLLEVBQUMsQ0FBQztJQUNmLFlBQVksQ0FBQTtJQUlaO1FBc0JFLDJCQUFvQixhQUE0QjtZQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFHLENBQUM7UUFDN0MsbUNBQU8sR0FBZCxVQUFlLFFBQWdCLEVBQUUsS0FBYSxFQUFFLFNBQWlDO1lBQy9FLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxTQUFTLEVBQUUsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUE7UUFDcEcsQ0FBQztRQXhCYSxtQ0FBaUIsR0FBVywraUJBb0I3QyxDQUFBO1FBS0Msd0JBQUM7SUFBRCxDQTFCQSxBQTBCQyxJQUFBO0lBMUJZLHVCQUFpQixvQkEwQjdCLENBQUE7SUFFRDtRQUNFLGlDQUFvQixhQUE4QjtZQUE5QixrQkFBYSxHQUFiLGFBQWEsQ0FBaUI7UUFBRyxDQUFDO1FBRS9DLHlDQUFPLEdBQWQsVUFBZSxRQUFnQixFQUFFLEtBQWEsRUFBRSxTQUFpQztZQUMvRSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FDekUsVUFBQyxRQUFtRztnQkFDbEcsSUFBSSxPQUFPLEdBQTRDLEVBQUUsQ0FBQTtnQkFDekQsSUFBSSxPQUFPLEdBQTZCLEVBQUUsQ0FBQTtnQkFDMUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLE9BQU87b0JBQzVDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQzt3QkFDeEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLGNBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtvQkFDckcsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO3dCQUN2QixPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQTtvQkFDdEYsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDeEIsSUFBSSxRQUFRLEdBQVcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQTt3QkFDaEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7NEJBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQTt3QkFDOUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUE7b0JBQ2xELENBQUM7b0JBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDMUIsSUFBSSxRQUFRLEdBQVcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQTt3QkFDN0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7NEJBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQTt3QkFDOUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUE7b0JBQ3ZELENBQUM7Z0JBQ0gsQ0FBQyxDQUFDLENBQUE7Z0JBQ0YsSUFBSSxHQUFHLEdBQWUsRUFBRSxDQUFBO2dCQUN4QixHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUN2QixFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUFDLElBQUk7d0JBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDOzRCQUN0RSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtnQkFDN0MsQ0FBQztnQkFDRCxNQUFNLENBQUMsR0FBRyxDQUFBO1lBQ1osQ0FBQyxDQUNGLENBQUE7UUFDSCxDQUFDO1FBQ0gsOEJBQUM7SUFBRCxDQWpDQSxBQWlDQyxJQUFBO0lBakNZLDZCQUF1QiwwQkFpQ25DLENBQUE7QUFFSCxDQUFDLEVBcEVTLEtBQUssS0FBTCxLQUFLLFFBb0VkIiwiZmlsZSI6InNjcmlwdHMvc3BhcnFsLXRyZWUtc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBmaWJyYSB7XG4gICd1c2Ugc3RyaWN0J1xuXG4gIGltcG9ydCBzID0gZmkuc2Vjby5zcGFycWxcblxuICBleHBvcnQgY2xhc3MgU3BhcnFsVHJlZVNlcnZpY2Uge1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0Q2xhc3NUcmVlUXVlcnk6IHN0cmluZyA9IGBcblBSRUZJWCBza29zOiA8aHR0cDovL3d3dy53My5vcmcvMjAwNC8wMi9za29zL2NvcmUjPlxuUFJFRklYIHJkZnM6IDxodHRwOi8vd3d3LnczLm9yZy8yMDAwLzAxL3JkZi1zY2hlbWEjPlxuUFJFRklYIHNmOiA8aHR0cDovL2xkZi5maS9mdW5jdGlvbnMjPlxuU0VMRUNUID9zdWJDbGFzcyA/c3VwZXJDbGFzcyA/Y2xhc3MgP2NsYXNzTGFiZWwgP2luc3RhbmNlcyB7XG4gIHtcbiAgICA/c3ViQ2xhc3MgcmRmczpzdWJDbGFzc09mID9jbGFzcyAuXG4gICAgRklMVEVSIEVYSVNUUyB7XG4gICAgICA/cCBhID9zdWJDbGFzcyAuXG4gICAgfVxuICB9IFVOSU9OIHtcbiAgICB7XG4gICAgICBTRUxFQ1QgP2NsYXNzIChDT1VOVChESVNUSU5DVCA/cCkgQVMgP2luc3RhbmNlcykge1xuICAgICAgICA/cCBhID9jbGFzcyAuXG4gICAgICB9XG4gICAgICBHUk9VUCBCWSA/Y2xhc3NcbiAgICB9XG4gIH1cbiAgP2NsYXNzIHNmOnByZWZlcnJlZExhbmd1YWdlTGl0ZXJhbCAoc2tvczpwcmVmTGFiZWwgcmRmczpsYWJlbCBza29zOmFsdExhYmVsICdlbicgJycgP2NsYXNzTGFiZWwpIC5cbn1cbmBcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHdvcmtlclNlcnZpY2U6IFdvcmtlclNlcnZpY2UpIHt9XG4gICAgcHVibGljIGdldFRyZWUoZW5kcG9pbnQ6IHN0cmluZywgcXVlcnk6IHN0cmluZywgY2FuY2VsbGVyPzogYW5ndWxhci5JUHJvbWlzZTxhbnk+KTogYW5ndWxhci5JUHJvbWlzZTxUcmVlTm9kZVtdPiB7XG4gICAgICByZXR1cm4gdGhpcy53b3JrZXJTZXJ2aWNlLmNhbGwoJ3NwYXJxbFRyZWVXb3JrZXJTZXJ2aWNlJywgJ2dldFRyZWUnLCBbZW5kcG9pbnQsIHF1ZXJ5XSwgY2FuY2VsbGVyKVxuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBTcGFycWxUcmVlV29ya2VyU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzcGFycWxTZXJ2aWNlOiBzLlNwYXJxbFNlcnZpY2UpIHt9XG5cbiAgICBwdWJsaWMgZ2V0VHJlZShlbmRwb2ludDogc3RyaW5nLCBxdWVyeTogc3RyaW5nLCBjYW5jZWxsZXI/OiBhbmd1bGFyLklQcm9taXNlPGFueT4pOiBhbmd1bGFyLklQcm9taXNlPFRyZWVOb2RlW10+IHtcbiAgICAgIHJldHVybiB0aGlzLnNwYXJxbFNlcnZpY2UucXVlcnkoZW5kcG9pbnQsIHF1ZXJ5LCB7dGltZW91dDogY2FuY2VsbGVyfSkudGhlbihcbiAgICAgICAgKHJlc3BvbnNlOiBhbmd1bGFyLklIdHRwUHJvbWlzZUNhbGxiYWNrQXJnPHMuSVNwYXJxbEJpbmRpbmdSZXN1bHQ8e1tpZDogc3RyaW5nXTogcy5JU3BhcnFsQmluZGluZ30+PikgPT4ge1xuICAgICAgICAgIGxldCBwYXJlbnRzOiB7W2lkOiBzdHJpbmddOiB7W2lkOiBzdHJpbmddOiBib29sZWFufX0gPSB7fVxuICAgICAgICAgIGxldCBjbGFzc2VzOiB7W2lkOiBzdHJpbmddOiBUcmVlTm9kZX0gPSB7fVxuICAgICAgICAgIHJlc3BvbnNlLmRhdGEucmVzdWx0cy5iaW5kaW5ncy5mb3JFYWNoKGJpbmRpbmcgPT4ge1xuICAgICAgICAgICAgaWYgKGJpbmRpbmdbJ2NsYXNzTGFiZWwnXSlcbiAgICAgICAgICAgICAgY2xhc3Nlc1tiaW5kaW5nWydjbGFzcyddLnZhbHVlXSA9IG5ldyBUcmVlTm9kZShiaW5kaW5nWydjbGFzcyddLnZhbHVlLCBiaW5kaW5nWydjbGFzc0xhYmVsJ10udmFsdWUpXG4gICAgICAgICAgICBpZiAoYmluZGluZ1snaW5zdGFuY2VzJ10pXG4gICAgICAgICAgICAgIGNsYXNzZXNbYmluZGluZ1snY2xhc3MnXS52YWx1ZV0uaW5zdGFuY2VzID0gcGFyc2VJbnQoYmluZGluZ1snaW5zdGFuY2VzJ10udmFsdWUsIDEwKVxuICAgICAgICAgICAgaWYgKGJpbmRpbmdbJ3N1YkNsYXNzJ10pIHtcbiAgICAgICAgICAgICAgbGV0IHN1YkNsYXNzOiBzdHJpbmcgPSBiaW5kaW5nWydzdWJDbGFzcyddLnZhbHVlXG4gICAgICAgICAgICAgIGlmICghcGFyZW50c1tzdWJDbGFzc10pIHBhcmVudHNbc3ViQ2xhc3NdID0ge31cbiAgICAgICAgICAgICAgcGFyZW50c1tzdWJDbGFzc11bYmluZGluZ1snY2xhc3MnXS52YWx1ZV0gPSB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYmluZGluZ1snc3VwZXJDbGFzcyddKSB7XG4gICAgICAgICAgICAgIGxldCBzdWJDbGFzczogc3RyaW5nID0gYmluZGluZ1snY2xhc3MnXS52YWx1ZVxuICAgICAgICAgICAgICBpZiAoIXBhcmVudHNbc3ViQ2xhc3NdKSBwYXJlbnRzW3N1YkNsYXNzXSA9IHt9XG4gICAgICAgICAgICAgIHBhcmVudHNbc3ViQ2xhc3NdW2JpbmRpbmdbJ3N1cGVyQ2xhc3MnXS52YWx1ZV0gPSB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICBsZXQgcmV0OiBUcmVlTm9kZVtdID0gW11cbiAgICAgICAgICBmb3IgKGxldCBpZCBpbiBjbGFzc2VzKSB7XG4gICAgICAgICAgICBpZiAoIXBhcmVudHNbaWRdKSByZXQucHVzaChjbGFzc2VzW2lkXSk7IGVsc2UgZm9yIChsZXQgcGlkIGluIHBhcmVudHNbaWRdKVxuICAgICAgICAgICAgICAgIGNsYXNzZXNbcGlkXS5jaGlsZHJlbi5wdXNoKGNsYXNzZXNbaWRdKVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmV0XG4gICAgICAgIH1cbiAgICAgIClcbiAgICB9XG4gIH1cblxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

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
            var addString = graphsToAdd.map(function (graph) { return 'GRAPH' + graph.graph.toCanonical() + '{' + graph.triples.map(function (g) { return g.toCanonical(); }).join(' . ') + '}'; }).join('');
            var removeString = graphsToRemove.map(function (graph) { return 'GRAPH' + graph.graph.toCanonical() + '{' + graph.triples.map(function (g) { return g.toCanonical(); }).join(' . ') + '}'; }).join('');
            return this.sparqlService.update(endpoint, SparqlUpdateWorkerService.queryTemplate.replace(/<DELETE>/g, removeString).replace(/<INSERT>/g, addString)).then(function (r) { return r.status === 204; }, function (r) { return false; });
        };
        SparqlUpdateWorkerService.queryTemplate = "DELETE{<DELETE>}INSERT{<INSERT>}WHERE {}";
        return SparqlUpdateWorkerService;
    }());/*<auto_generate>*/angular.module('fibra').service('sparqlUpdateWorkerService',['sparqlService',function(){return new (Function.prototype.bind.apply(SparqlUpdateWorkerService,[null].concat(Array.prototype.slice.apply(arguments))));}]);/*</auto_generate>*/
    fibra.SparqlUpdateWorkerService = SparqlUpdateWorkerService;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvc3BhcnFsLXVwZGF0ZS1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQVUsS0FBSyxDQTREZDtBQTVERCxXQUFVLEtBQUssRUFBQyxDQUFDO0lBQ2YsWUFBWSxDQUFBO0lBSVo7UUFFRSw2QkFBb0IsYUFBNEI7WUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBRyxDQUFDO1FBRTdDLHlDQUFXLEdBQWxCLFVBQW1CLFFBQWdCLEVBQUUsVUFBa0IsRUFBRSxhQUFxQjtZQUM1RSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFBO1FBQzlHLENBQUM7UUFFTSwwQ0FBWSxHQUFuQixVQUFvQixRQUFnQixFQUFFLFdBQW9CLEVBQUUsY0FBdUI7WUFDakYsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLDJCQUEyQixFQUFFLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQTtRQUNoSCxDQUFDO1FBRUgsMEJBQUM7SUFBRCxDQVpBLEFBWUMsSUFBQTtJQVpZLHlCQUFtQixzQkFZL0IsQ0FBQTtJQUVEO1FBR0UsbUNBQW9CLGFBQThCO1lBQTlCLGtCQUFhLEdBQWIsYUFBYSxDQUFpQjtRQUFHLENBQUM7UUFFL0MsK0NBQVcsR0FBbEIsVUFBbUIsUUFBZ0IsRUFBRSxVQUF1QixFQUFFLGFBQTBCO1lBQW5ELDBCQUF1QixHQUF2QixlQUF1QjtZQUFFLDZCQUEwQixHQUExQixrQkFBMEI7WUFDdEYsSUFBSSxjQUFjLEdBQStCLEVBQUUsQ0FBQTtZQUNuRCxJQUFJLGlCQUFpQixHQUErQixFQUFFLENBQUE7WUFDdEQsSUFBSSxXQUFXLEdBQVksRUFBRSxDQUFBO1lBQzdCLElBQUksY0FBYyxHQUFZLEVBQUUsQ0FB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QUFLLENBQ2IsQ0FBQTtRQUNILENBQUM7UUFyQ2MsdUNBQWEsR0FBVywwQ0FBMEMsQ0FBQTtRQXVDbkYsZ0NBQUM7SUFBRCxDQXhDQSxBQXdDQyxJQUFBO0lBeENZLCtCQUF5Qiw0QkF3Q3JDLENBQUE7QUFDSCxDQUFDLEVBNURTLEtBQUssS0FBTCxLQUFLLFFBNERkIiwiZmlsZSI6InNjcmlwdHMvc3BhcnFsLXVwZGF0ZS1zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIGZpYnJhIHtcbiAgJ3VzZSBzdHJpY3QnXG5cbiAgaW1wb3J0IHMgPSBmaS5zZWNvLnNwYXJxbFxuXG4gIGV4cG9ydCBjbGFzcyBTcGFycWxVcGRhdGVTZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgd29ya2VyU2VydmljZTogV29ya2VyU2VydmljZSkge31cblxuICAgIHB1YmxpYyB1cGRhdGVRdWFkcyhlbmRwb2ludDogc3RyaW5nLCBxdWFkc1RvQWRkOiBRdWFkW10sIHF1YWRzVG9SZW1vdmU6IFF1YWRbXSk6IGFuZ3VsYXIuSVByb21pc2U8YW55PiB7XG4gICAgICByZXR1cm4gdGhpcy53b3JrZXJTZXJ2aWNlLmNhbGwoJ3NwYXJxbFVwZGF0ZVdvcmtlclNlcnZpY2UnLCAndXBkYXRlJywgW2VuZHBvaW50LCBxdWFkc1RvQWRkLCBxdWFkc1RvUmVtb3ZlXSlcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlR3JhcGhzKGVuZHBvaW50OiBzdHJpbmcsIGdyYXBoc1RvQWRkOiBHcmFwaFtdLCBncmFwaHNUb1JlbW92ZTogR3JhcGhbXSk6IGFuZ3VsYXIuSVByb21pc2U8YW55PiB7XG4gICAgICByZXR1cm4gdGhpcy53b3JrZXJTZXJ2aWNlLmNhbGwoJ3NwYXJxbFVwZGF0ZVdvcmtlclNlcnZpY2UnLCAndXBkYXRlJywgW2VuZHBvaW50LCBncmFwaHNUb0FkZCwgZ3JhcGhzVG9SZW1vdmVdKVxuICAgIH1cblxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIFNwYXJxbFVwZGF0ZVdvcmtlclNlcnZpY2Uge1xuICAgIHByaXZhdGUgc3RhdGljIHF1ZXJ5VGVtcGxhdGU6IHN0cmluZyA9IGBERUxFVEV7PERFTEVURT59SU5TRVJUezxJTlNFUlQ+fVdIRVJFIHt9YFxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzcGFycWxTZXJ2aWNlOiBzLlNwYXJxbFNlcnZpY2UpIHt9XG5cbiAgICBwdWJsaWMgdXBkYXRlUXVhZHMoZW5kcG9pbnQ6IHN0cmluZywgcXVhZHNUb0FkZDogUXVhZFtdID0gW10sIHF1YWRzVG9SZW1vdmU6IFF1YWRbXSA9IFtdKTogYW5ndWxhci5JUHJvbWlzZTxhbnk+IHtcbiAgICAgIGxldCBncmFwaHNUb0FkZE1hcDoge1tncmFwaElkOiBzdHJpbmddOiBHcmFwaH0gPSB7fVxuICAgICAgbGV0IGdyYXBoc1RvUmVtb3ZlTWFwOiB7W2dyYXBoSWQ6IHN0cmluZ106IEdyYXBofSA9IHt9XG4gICAgICBsZXQgZ3JhcGhzVG9BZGQ6IEdyYXBoW10gPSBbXVxuICAgICAgbGV0IGdyYXBoc1RvUmVtb3ZlOiBHcmFwaFtdID0gW11cbiAgICAgIHF1YWRzVG9BZGQuZm9yRWFjaChxID0+IHtcbiAgICAgICAgbGV0IGdyYXBoOiBHcmFwaCA9IGdyYXBoc1RvQWRkTWFwW3EuZ3JhcGgudmFsdWVdXG4gICAgICAgIGlmICghZ3JhcGgpIHtcbiAgICAgICAgICBncmFwaCA9IG5ldyBHcmFwaChxLmdyYXBoKVxuICAgICAgICAgIGdyYXBoc1RvQWRkTWFwW3EuZ3JhcGgudmFsdWVdID0gZ3JhcGhcbiAgICAgICAgICBncmFwaHNUb0FkZC5wdXNoKGdyYXBoKVxuICAgICAgICB9XG4gICAgICAgIGdyYXBoLnRyaXBsZXMucHVzaChxKVxuICAgICAgfSlcbiAgICAgIHF1YWRzVG9SZW1vdmUuZm9yRWFjaChxID0+IHtcbiAgICAgICAgbGV0IGdyYXBoOiBHcmFwaCA9IGdyYXBoc1RvUmVtb3ZlTWFwW3EuZ3JhcGgudmFsdWVdXG4gICAgICAgIGlmICghZ3JhcGgpIHtcbiAgICAgICAgICBncmFwaCA9IG5ldyBHcmFwaChxLmdyYXBoKVxuICAgICAgICAgIGdyYXBoc1RvUmVtb3ZlTWFwW3EuZ3JhcGgudmFsdWVdID0gZ3JhcGhcbiAgICAgICAgICBncmFwaHNUb1JlbW92ZS5wdXNoKGdyYXBoKVxuICAgICAgICB9XG4gICAgICAgIGdyYXBoLnRyaXBsZXMucHVzaChxKVxuICAgICAgfSlcbiAgICAgIHJldHVybiB0aGlzLnVwZGF0ZUdyYXBocyhlbmRwb2ludCwgZ3JhcGhzVG9BZGQsIGdyYXBoc1RvUmVtb3ZlKVxuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVHcmFwaHMoZW5kcG9pbnQ6IHN0cmluZywgZ3JhcGhzVG9BZGQ6IEdyYXBoW10gPSBbXSwgZ3JhcGhzVG9SZW1vdmU6IEdyYXBoW10gPSBbXSk6IGFuZ3VsYXIuSVByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgbGV0IGFkZFN0cmluZzogc3RyaW5nID0gZ3JhcGhzVG9BZGQubWFwKGdyYXBoID0+ICdHUkFQSCcgKyBncmFwaC5ncmFwaC50b0Nhbm9uaWNhbCgpICsgJ3snICsgZ3JhcGgudHJpcGxlcy5tYXAoZyA9PiBnLnRvQ2Fub25pY2FsKCkpLmpvaW4oJyAuICcpICsgJ30nKS5qb2luKCcnKVxuICAgICAgbGV0IHJlbW92ZVN0cmluZzogc3RyaW5nID0gZ3JhcGhzVG9SZW1vdmUubWFwKGdyYXBoID0+ICdHUkFQSCcgKyBncmFwaC5ncmFwaC50b0Nhbm9uaWNhbCgpICsgJ3snICsgZ3JhcGgudHJpcGxlcy5tYXAoZyA9PiBnLnRvQ2Fub25pY2FsKCkpLmpvaW4oJyAuICcpICsgJ30nKS5qb2luKCcnKVxuICAgICAgcmV0dXJuIHRoaXMuc3BhcnFsU2VydmljZS51cGRhdGUoZW5kcG9pbnQsIFNwYXJxbFVwZGF0ZVdvcmtlclNlcnZpY2UucXVlcnlUZW1wbGF0ZS5yZXBsYWNlKC88REVMRVRFPi9nLCByZW1vdmVTdHJpbmcpLnJlcGxhY2UoLzxJTlNFUlQ+L2csIGFkZFN0cmluZykpLnRoZW4oXG4gICAgICAgIChyKSA9PiByLnN0YXR1cyA9PT0gMjA0LFxuICAgICAgICAocikgPT4gZmFsc2VcbiAgICAgIClcbiAgICB9XG5cbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvd29ya2VyLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBVSxLQUFLLENBb1FkO0FBcFFELFdBQVUsS0FBSyxFQUFDLENBQUM7SUFDZixZQUFZLENBQUE7SUFFWjtRQUNFLG9DQUFtQixPQUFlLEVBQVMsYUFBcUIsRUFBUyxhQUF1QjtZQUE3RSxZQUFPLEdBQVAsT0FBTyxDQUFRO1lBQVMsa0JBQWEsR0FBYixhQUFhLENBQVE7WUFBUyxrQkFBYSxHQUFiLGFBQWEsQ0FBVTtRQUFHLENBQUM7UUFDdEcsaUNBQUM7SUFBRCxDQUZBLEFBRUMsSUFBQTtJQUZZLGdDQUEwQiw2QkFFdEMsQ0FBQTtJQUVEO1FBZ0VFLHVCQUFZLDBCQUFzRCxFQUFVLDBDQUF5RSxFQUFFLFVBQXFDLEVBQUUsT0FBK0IsRUFBVSxFQUFxQjtZQWhFOVAsaUJBa0tDO1lBbEc2RSwrQ0FBMEMsR0FBMUMsMENBQTBDLENBQStCO1lBQWtGLE9BQUUsR0FBRixFQUFFLENBQW1CO1lBdkNwUCxrQkFBYSxHQUFXLENBQUMsQ0FBQTtZQUN6QixjQUFTLEdBQTZCLEVBQUUsQ0FBQTtZQXVDOUMsSUFBSSxJQUFJLEdBQVcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsSUFBSSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFBO1lBQzNFLElBQUksYUFBYSxHQUFhLDBCQUEwQixDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDO2dCQUMxRSxPQUFBLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO1lBQWhHLENBQWdHLENBQ2pHLENBQUE7WUFDRCxJQUFJLE9BQU8sR0FBVyxD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QSxBQTRFQyxJQUFBO0lBNUVZLHlCQUFtQixzQkE0RS9CLENBQUE7QUFFSCxDQUFDLEVBcFFTLEtBQUssS0FBTCxLQUFLLFFBb1FkIiwiZmlsZSI6InNjcmlwdHMvd29ya2VyLXNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgZmlicmEge1xuICAndXNlIHN0cmljdCdcblxuICBleHBvcnQgY2xhc3MgV29ya2VyU2VydmljZUNvbmZpZ3VyYXRpb24ge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBhcHBOYW1lOiBzdHJpbmcsIHB1YmxpYyB3b3JrZXJUaHJlYWRzOiBudW1iZXIsIHB1YmxpYyBpbXBvcnRTY3JpcHRzOiBzdHJpbmdbXSkge31cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBXb3JrZXJTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgc3RhdGljIHdvcmtlclRlbXBsYXRlOiBzdHJpbmcgPSBgXG4gICAgICB2YXIgd2luZG93ID0gc2VsZlxuICAgICAgc2VsZi5oaXN0b3J5ID0ge31cbiAgICAgIHNlbGYuTm9kZSA9IGZ1bmN0aW9uICgpIHt9XG4gICAgICB2YXIgZG9jdW1lbnQgPSB7XG4gICAgICAgIHJlYWR5U3RhdGU6ICdjb21wbGV0ZScsXG4gICAgICAgIGNvb2tpZTogJycsXG4gICAgICAgIHF1ZXJ5U2VsZWN0b3I6IGZ1bmN0aW9uICgpIHt9LFxuICAgICAgICBjcmVhdGVFbGVtZW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcGF0aG5hbWU6ICcnLFxuICAgICAgICAgICAgc2V0QXR0cmlidXRlOiBmdW5jdGlvbigpIHt9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICBpbXBvcnRTY3JpcHRzKCc8SU1QT1JUX1NDUklQVFM+JylcbiAgICAgIHdpbmRvdy5hbmd1bGFyLm1vZHVsZSgnPEFQUF9OQU1FPicpLnJ1bihbJ3dvcmtlcldvcmtlclNlcnZpY2UnLCBmdW5jdGlvbih3b3JrZXJXb3JrZXJTZXJ2aWNlKSB7XG4gICAgICAgIHNlbGYuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGZ1bmN0aW9uKGUpIHsgd29ya2VyV29ya2VyU2VydmljZS5vbk1lc3NhZ2UoZS5kYXRhKSB9KVxuICAgICAgfV0pXG4gICAgICB3aW5kb3cuYW5ndWxhci5ib290c3RyYXAobnVsbCwgWyc8QVBQX05BTUU+J10pXG4gICAgYFxuXG4gICAgcHJpdmF0ZSB3b3JrZXJzOiBXb3JrZXJbXVxuICAgIHByaXZhdGUgY3VycmVudFdvcmtlcjogbnVtYmVyID0gMFxuICAgIHByaXZhdGUgZGVmZXJyZWRzOiBhbmd1bGFyLklEZWZlcnJlZDxhbnk+W10gPSBbXVxuXG4gICAgcHVibGljIHN0YXRpYyBzdHJpcE1hcmtzKGFyZ3M6IGFueSk6IHZvaWQge1xuICAgICAgaWYgKCFhcmdzIHx8ICFhcmdzLl9fbWFyayB8fCB0eXBlb2YgYXJncyAhPT0gJ29iamVjdCcpIHJldHVyblxuICAgICAgZGVsZXRlIGFyZ3MuX19tYXJrXG4gICAgICBpZiAoYXJncyBpbnN0YW5jZW9mIEFycmF5KSBhcmdzLmZvckVhY2goYXJnID0+IFdvcmtlclNlcnZpY2Uuc3RyaXBNYXJrcyhhcmcpKVxuICAgICAgZWxzZSB7XG4gICAgICAgIGZvciAobGV0IGtleSBpbiBhcmdzKSBpZiAoYXJncy5oYXNPd25Qcm9wZXJ0eShrZXkpKVxuICAgICAgICAgIFdvcmtlclNlcnZpY2Uuc3RyaXBNYXJrcyhhcmdzW2tleV0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBzYXZlUHJvdG90eXBlcyhhcmdzOiBhbnkpOiBhbnkge1xuICAgICAgdGhpcy5zYXZlUHJvdG90eXBlc0ludGVybmFsKGFyZ3MpXG4gICAgICByZXR1cm4gYXJnc1xuICAgIH1cbiAgICBwcml2YXRlIHN0YXRpYyBzYXZlUHJvdG90eXBlc0ludGVybmFsKGFyZ3M6IGFueSk6IHZvaWQge1xuICAgICAgaWYgKCFhcmdzIHx8IGFyZ3MuX19jbGFzc05hbWUgfHwgdHlwZW9mIGFyZ3MgIT09ICdvYmplY3QnKSByZXR1cm5cbiAgICAgIGlmIChhcmdzIGluc3RhbmNlb2YgQXJyYXkpIGFyZ3MuZm9yRWFjaChhcmcgPT4gV29ya2VyU2VydmljZS5zYXZlUHJvdG90eXBlcyhhcmcpKVxuICAgICAgZWxzZSB7XG4gICAgICAgIGlmIChhcmdzLmNvbnN0cnVjdG9yLm5hbWUgIT09ICdPYmplY3QnKSB7XG4gICAgICAgICAgbGV0IGN1cnJlbnRQcm90b3R5cGU6IHt9ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGFyZ3MpXG4gICAgICAgICAgb3V0OiB3aGlsZSAoY3VycmVudFByb3RvdHlwZSAhPT0gT2JqZWN0LnByb3RvdHlwZSkge1xuICAgICAgICAgICAgZm9yIChsZXQgcHJvcCBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhjdXJyZW50UHJvdG90eXBlKSkge1xuICAgICAgICAgICAgICBpZiAocHJvcCAhPT0gJ2NvbnN0cnVjdG9yJyAmJiB0eXBlb2YoYXJncy5fX3Byb3RvX19bcHJvcF0pID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgYXJncy5fX2NsYXNzTmFtZSA9IGFyZ3MuY29uc3RydWN0b3IubmFtZVxuICAgICAgICAgICAgICAgIGJyZWFrIG91dFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdXJyZW50UHJvdG90eXBlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGN1cnJlbnRQcm90b3R5cGUpXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghYXJncy5fX2NsYXNzTmFtZSkgYXJncy5fX2NsYXNzTmFtZSA9ICdPYmplY3QnXG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQga2V5IGluIGFyZ3MpIGlmIChhcmdzLmhhc093blByb3BlcnR5KGtleSkpXG4gICAgICAgICAgV29ya2VyU2VydmljZS5zYXZlUHJvdG90eXBlcyhhcmdzW2tleV0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3Iod29ya2VyU2VydmljZUNvbmZpZ3VyYXRpb246IFdvcmtlclNlcnZpY2VDb25maWd1cmF0aW9uLCBwcml2YXRlIHdvcmtlclNlcnZpY2VQcm90b3R5cGVNYXBwaW5nQ29uZmlndXJhdGlvbjoge1tjbGFzc05hbWU6IHN0cmluZ106IE9iamVjdH0sICRyb290U2NvcGU6IGFuZ3VsYXIuSVJvb3RTY29wZVNlcnZpY2UsICR3aW5kb3c6IGFuZ3VsYXIuSVdpbmRvd1NlcnZpY2UsIHByaXZhdGUgJHE6IGFuZ3VsYXIuSVFTZXJ2aWNlKSB7XG4gICAgICBsZXQgcGF0aDogc3RyaW5nID0gJHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArICcvLycgKyAkd2luZG93LmxvY2F0aW9uLmhvc3RcbiAgICAgIGxldCBpbXBvcnRTY3JpcHRzOiBzdHJpbmdbXSA9IHdvcmtlclNlcnZpY2VDb25maWd1cmF0aW9uLmltcG9ydFNjcmlwdHMubWFwKHMgPT5cbiAgICAgICAgcy5pbmRleE9mKCdodHRwJykgIT09IDAgPyBwYXRoICsgKHMuaW5kZXhPZignLycpICE9PSAwID8gJHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA6ICcnKSArIHMgOiBzXG4gICAgICApXG4gICAgICBsZXQgYmxvYlVSTDogc3RyaW5nID0gKCR3aW5kb3cuVVJMKS5jcmVhdGVPYmplY3RVUkwobmV3IEJsb2IoW1dvcmtlclNlcnZpY2Uud29ya2VyVGVtcGxhdGUucmVwbGFjZSgvPEFQUF9OQU1FPi9nLCB3b3JrZXJTZXJ2aWNlQ29uZmlndXJhdGlvbi5hcHBOYW1lKS5yZXBsYWNlKC88SU1QT1JUX1NDUklQVFM+L2csIGltcG9ydFNjcmlwdHMuam9pbignXFwnLFxcJycpKV0sIHsgdHlwZTogJ2FwcGxpY2F0aW9uL2phdmFzY3JpcHQnIH0pKTtcbiAgICAgIHRoaXMud29ya2VycyA9IFtdXG4gICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgd29ya2VyU2VydmljZUNvbmZpZ3VyYXRpb24ud29ya2VyVGhyZWFkczsgaSsrKSB7XG4gICAgICAgIHRoaXMud29ya2Vycy5wdXNoKG5ldyBXb3JrZXIoYmxvYlVSTCkpXG4gICAgICAgIHRoaXMud29ya2Vyc1tpXS5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgKGU6IE1lc3NhZ2VFdmVudCkgPT4ge1xuICAgICAgICAgIGxldCBldmVudElkOiBzdHJpbmcgPSBlLmRhdGEuZXZlbnQ7XG4gICAgICAgICAgaWYgKGV2ZW50SWQgPT09ICdicm9hZGNhc3QnKSB7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoZS5kYXRhLm5hbWUsIHRoaXMucmVzdG9yZVByb3RvdHlwZXMoZS5kYXRhLmFyZ3MpKVxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgZGVmZXJyZWQ6IGFuZ3VsYXIuSURlZmVycmVkPGFueT4gPSB0aGlzLmRlZmVycmVkc1tlLmRhdGEuaWRdXG4gICAgICAgICAgICBpZiAoZGVmZXJyZWQpIHtcbiAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuZGVmZXJyZWRzW2UuZGF0YS5pZF1cbiAgICAgICAgICAgICAgaWYgKGV2ZW50SWQgPT09ICdzdWNjZXNzJylcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHRoaXMucmVzdG9yZVByb3RvdHlwZXMoZS5kYXRhLmRhdGEpKVxuICAgICAgICAgICAgICBlbHNlIGlmIChldmVudElkID09PSAnZmFpbHVyZScpXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHRoaXMucmVzdG9yZVByb3RvdHlwZXMoZS5kYXRhLmRhdGEpKVxuICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQubm90aWZ5KHRoaXMucmVzdG9yZVByb3RvdHlwZXMoZS5kYXRhLmRhdGEpKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgJGJyb2FkY2FzdChuYW1lOiBzdHJpbmcsIGFyZ3M6IGFueVtdKTogdm9pZCB7XG4gICAgICB0aGlzLndvcmtlcnMuZm9yRWFjaCh3ID0+IHcucG9zdE1lc3NhZ2Uoe25hbWU6IG5hbWUsIGFyZ3M6IFdvcmtlclNlcnZpY2Uuc2F2ZVByb3RvdHlwZXMoYXJncyl9KSlcbiAgICB9XG5cbiAgICBwdWJsaWMgY2FsbEFsbDxUPihzZXJ2aWNlOiBzdHJpbmcsIG1ldGhvZDogc3RyaW5nLCBhcmdzOiBhbnlbXSA9IFtdLCBjYW5jZWxsZXI/OiBhbmd1bGFyLklQcm9taXNlPGFueT4pOiBhbmd1bGFyLklQcm9taXNlPFQ+IHtcbiAgICAgIGxldCBkZWZlcnJlZDogYW5ndWxhci5JRGVmZXJyZWQ8VD4gPSB0aGlzLiRxLmRlZmVyKClcbiAgICAgIHRoaXMuZGVmZXJyZWRzLnB1c2goZGVmZXJyZWQpXG4gICAgICBsZXQgaWQ6IG51bWJlciA9IHRoaXMuZGVmZXJyZWRzLmxlbmd0aCAtIDFcbiAgICAgIGxldCBtZXNzYWdlOiBJTWVzc2FnZSA9IHtcbiAgICAgICAgaWQ6IGlkLFxuICAgICAgICBzZXJ2aWNlOiBzZXJ2aWNlLFxuICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgYXJnczogV29ya2VyU2VydmljZS5zYXZlUHJvdG90eXBlcyhhcmdzKVxuICAgICAgfVxuICAgICAgaWYgKGNhbmNlbGxlcikgY2FuY2VsbGVyLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLndvcmtlcnMuZm9yRWFjaCh3b3JrZXIgPT4gd29ya2VyLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgY2FuY2VsOiB0cnVlXG4gICAgICAgIH0pKVxuICAgICAgICBkZWxldGUgdGhpcy5kZWZlcnJlZHNbaWRdXG4gICAgICB9KVxuICAgICAgdGhpcy53b3JrZXJzLmZvckVhY2god29ya2VyID0+IHdvcmtlci5wb3N0TWVzc2FnZShtZXNzYWdlKSlcbiAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlXG4gICAgfVxuICAgIHB1YmxpYyBjYWxsPFQ+KHNlcnZpY2U6IHN0cmluZywgbWV0aG9kOiBzdHJpbmcsIGFyZ3M6IGFueVtdID0gW10sIGNhbmNlbGxlcj86IGFuZ3VsYXIuSVByb21pc2U8YW55Pik6IGFuZ3VsYXIuSVByb21pc2U8VD4ge1xuICAgICAgbGV0IGRlZmVycmVkOiBhbmd1bGFyLklEZWZlcnJlZDxUPiA9IHRoaXMuJHEuZGVmZXIoKVxuICAgICAgdGhpcy5kZWZlcnJlZHMucHVzaChkZWZlcnJlZClcbiAgICAgIGxldCBpZDogbnVtYmVyID0gdGhpcy5kZWZlcnJlZHMubGVuZ3RoIC0gMVxuICAgICAgbGV0IHdvcmtlcjogV29ya2VyID0gdGhpcy53b3JrZXJzW3RoaXMuY3VycmVudFdvcmtlcl1cbiAgICAgIHRoaXMuY3VycmVudFdvcmtlciA9ICh0aGlzLmN1cnJlbnRXb3JrZXIgKyAxKSAlIHRoaXMud29ya2Vycy5sZW5ndGhcbiAgICAgIGlmIChjYW5jZWxsZXIpIGNhbmNlbGxlci50aGVuKCgpID0+IHtcbiAgICAgICAgd29ya2VyLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgY2FuY2VsOiB0cnVlXG4gICAgICAgIH0pXG4gICAgICAgIGRlbGV0ZSB0aGlzLmRlZmVycmVkc1tpZF1cbiAgICAgIH0pXG4gICAgICB3b3JrZXIucG9zdE1lc3NhZ2Uoe1xuICAgICAgICBpZDogaWQsXG4gICAgICAgIHNlcnZpY2U6IHNlcnZpY2UsXG4gICAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgICBhcmdzOiBXb3JrZXJTZXJ2aWNlLnNhdmVQcm90b3R5cGVzKGFyZ3MpXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2VcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc3RvcmVQcm90b3R5cGVzKGFyZ3M6IGFueSk6IGFueSB7XG4gICAgICB0aGlzLnJlc3RvcmVQcm90b3R5cGVzSW50ZXJuYWwoYXJncylcbiAgICAgIFdvcmtlclNlcnZpY2Uuc3RyaXBNYXJrcyhhcmdzKVxuICAgICAgcmV0dXJuIGFyZ3NcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc3RvcmVQcm90b3R5cGVzSW50ZXJuYWwoYXJnczogYW55KTogdm9pZCB7XG4gICAgICBpZiAoIWFyZ3MgfHwgYXJncy5fX21hcmsgfHwgdHlwZW9mIGFyZ3MgIT09ICdvYmplY3QnKSByZXR1cm5cbiAgICAgIGFyZ3MuX19tYXJrID0gdHJ1ZVxuICAgICAgaWYgKGFyZ3MgaW5zdGFuY2VvZiBBcnJheSkgYXJncy5mb3JFYWNoKGFyZyA9PiB0aGlzLnJlc3RvcmVQcm90b3R5cGVzSW50ZXJuYWwoYXJnKSlcbiAgICAgIGVsc2Uge1xuICAgICAgICBpZiAoYXJncy5fX2NsYXNzTmFtZSkge1xuICAgICAgICAgIGxldCBwcm90b3R5cGU6IE9iamVjdCA9IHRoaXMud29ya2VyU2VydmljZVByb3RvdHlwZU1hcHBpbmdDb25maWd1cmF0aW9uW2FyZ3MuX19jbGFzc05hbWVdXG4gICAgICAgICAgaWYgKCFwcm90b3R5cGUpIHRocm93ICdVbmtub3duIHByb3RvdHlwZSAnICsgYXJncy5fX2NsYXNzTmFtZVxuICAgICAgICAgIGFyZ3MuX19wcm90b19fID0gIHByb3RvdHlwZVxuICAgICAgICAgIGRlbGV0ZSBhcmdzLl9fY2xhc3NOYW1lXG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQga2V5IGluIGFyZ3MpIGlmIChhcmdzLmhhc093blByb3BlcnR5KGtleSkpXG4gICAgICAgICAgdGhpcy5yZXN0b3JlUHJvdG90eXBlc0ludGVybmFsKGFyZ3Nba2V5XSlcbiAgICAgIH1cbiAgICB9XG5cbiAgfVxuXG4gIGRlY2xhcmUgdmFyIHNlbGY6IGFueVxuXG4gIGludGVyZmFjZSBJTWVzc2FnZSB7XG4gICAgaWQ/OiBudW1iZXJcbiAgICBuYW1lPzogc3RyaW5nXG4gICAgYXJncz86IGFueVxuICAgIGNhbmNlbD86IGJvb2xlYW5cbiAgICBzZXJ2aWNlPzogc3RyaW5nXG4gICAgbWV0aG9kPzogc3RyaW5nXG4gIH1cblxuICBleHBvcnQgY2xhc3MgV29ya2VyV29ya2VyU2VydmljZSB7XG4gICAgcHJpdmF0ZSBjYW5jZWxsZXJzOiBhbmd1bGFyLklEZWZlcnJlZDxhbnk+W10gPSBbXVxuXG4gICAgcHVibGljIHN0YXRpYyBzdHJpcEZ1bmN0aW9ucyhvYmopOiBhbnkge1xuICAgICAgbGV0IHJldDoge30gPSB7fVxuICAgICAgZm9yIChsZXQga2V5IGluIG9iailcbiAgICAgICAgaWYgKHR5cGVvZiBvYmpba2V5XSA9PT0gJ29iamVjdCcpIHJldFtrZXldID0gV29ya2VyV29ya2VyU2VydmljZS5zdHJpcEZ1bmN0aW9ucyhvYmpba2V5XSlcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIG9ialtrZXldICE9PSAnZnVuY3Rpb24nKSByZXRba2V5XSA9IG9ialtrZXldXG4gICAgICByZXR1cm4gcmV0XG4gICAgfVxuICAgIHB1YmxpYyAkYnJvYWRjYXN0KG5hbWU6IHN0cmluZywgYXJncz86IGFueSk6IHZvaWQge1xuICAgICAgdHJ5IHtcbiAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7ZXZlbnQ6ICdicm9hZGNhc3QnLCBuYW1lOiBuYW1lLCBhcmdzOiBXb3JrZXJTZXJ2aWNlLnNhdmVQcm90b3R5cGVzKGFyZ3MpfSlcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coYXJncywgZSlcbiAgICAgICAgdGhyb3cgZVxuICAgICAgfVxuICAgIH1cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHdvcmtlclNlcnZpY2VQcm90b3R5cGVNYXBwaW5nQ29uZmlndXJhdGlvbjogIHtbY2xhc3NOYW1lOiBzdHJpbmddOiBPYmplY3R9LCBwcml2YXRlICRpbmplY3RvcjogYW5ndWxhci5hdXRvLklJbmplY3RvclNlcnZpY2UsIHByaXZhdGUgJHE6IGFuZ3VsYXIuSVFTZXJ2aWNlLCBwcml2YXRlICRyb290U2NvcGU6IGFuZ3VsYXIuSVJvb3RTY29wZVNlcnZpY2UpIHt9XG4gICAgcHVibGljIG9uTWVzc2FnZShtZXNzYWdlOiBJTWVzc2FnZSk6IHZvaWQge1xuICAgICAgaWYgKG1lc3NhZ2UuaWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLiRyb290U2NvcGUuJGJyb2FkY2FzdChtZXNzYWdlLm5hbWUsIHRoaXMucmVzdG9yZVByb3RvdHlwZXMobWVzc2FnZS5hcmdzKSlcbiAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRhcHBseSgpXG4gICAgICB9IGVsc2UgaWYgKG1lc3NhZ2UuY2FuY2VsKSB7XG4gICAgICAgIGxldCBjYW5jZWxsZXI6IGFuZ3VsYXIuSURlZmVycmVkPGFueT4gPSB0aGlzLmNhbmNlbGxlcnNbbWVzc2FnZS5pZF07XG4gICAgICAgIGRlbGV0ZSB0aGlzLmNhbmNlbGxlcnNbbWVzc2FnZS5pZF07XG4gICAgICAgIGlmIChjYW5jZWxsZXIpIGNhbmNlbGxlci5yZXNvbHZlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgc2VydmljZTogYW55ID0gdGhpcy4kaW5qZWN0b3IuZ2V0KG1lc3NhZ2Uuc2VydmljZSlcbiAgICAgICAgbGV0IGNhbmNlbGxlcjogYW5ndWxhci5JRGVmZXJyZWQ8YW55PiA9IHRoaXMuJHEuZGVmZXIoKTtcbiAgICAgICAgdGhpcy5jYW5jZWxsZXJzW21lc3NhZ2UuaWRdID0gY2FuY2VsbGVyO1xuICAgICAgICBsZXQgcHJvbWlzZTogYW55ID0gc2VydmljZVttZXNzYWdlLm1ldGhvZF0uYXBwbHkoc2VydmljZSwgdGhpcy5yZXN0b3JlUHJvdG90eXBlcyhtZXNzYWdlLmFyZ3MpLmNvbmNhdChjYW5jZWxsZXIucHJvbWlzZSkpXG4gICAgICAgIGlmICghcHJvbWlzZSB8fCAhcHJvbWlzZS50aGVuKSB7XG4gICAgICAgICAgbGV0IGRlZmVycmVkOiBhbmd1bGFyLklEZWZlcnJlZDxhbnk+ID0gdGhpcy4kcS5kZWZlcigpXG4gICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShwcm9taXNlKVxuICAgICAgICAgIHByb21pc2UgPSBkZWZlcnJlZC5wcm9taXNlXG4gICAgICAgIH1cbiAgICAgICAgcHJvbWlzZS50aGVuKFxuICAgICAgICAgIChzdWNjZXNzKSA9PiB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5jYW5jZWxsZXJzW21lc3NhZ2UuaWRdXG4gICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHtldmVudDogJ3N1Y2Nlc3MnLCBpZDogbWVzc2FnZS5pZCwgZGF0YTogV29ya2VyU2VydmljZS5zYXZlUHJvdG90eXBlcyhzdWNjZXNzKX0pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5jYW5jZWxsZXJzW21lc3NhZ2UuaWRdXG4gICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHtldmVudDogJ2ZhaWx1cmUnLCBpZDogbWVzc2FnZS5pZCwgZGF0YTogV29ya2VyU2VydmljZS5zYXZlUHJvdG90eXBlcyhXb3JrZXJXb3JrZXJTZXJ2aWNlLnN0cmlwRnVuY3Rpb25zKGVycm9yKSl9KVxuICAgICAgICAgIH0sXG4gICAgICAgICAgKHVwZGF0ZSkgPT4ge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuY2FuY2VsbGVyc1ttZXNzYWdlLmlkXVxuICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7ZXZlbnQ6ICd1cGRhdGUnLCBpZDogbWVzc2FnZS5pZCwgZGF0YTogV29ya2VyU2VydmljZS5zYXZlUHJvdG90eXBlcyh1cGRhdGUpfSk7XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXN0b3JlUHJvdG90eXBlcyhhcmdzOiBhbnkpOiBhbnkge1xuICAgICAgdGhpcy5yZXN0b3JlUHJvdG90eXBlc0ludGVybmFsKGFyZ3MpXG4gICAgICBXb3JrZXJTZXJ2aWNlLnN0cmlwTWFya3MoYXJncylcbiAgICAgIHJldHVybiBhcmdzXG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXN0b3JlUHJvdG90eXBlc0ludGVybmFsKGFyZ3M6IGFueSk6IHZvaWQge1xuICAgICAgaWYgKCFhcmdzIHx8IGFyZ3MuX19tYXJrIHx8IHR5cGVvZiBhcmdzICE9PSAnb2JqZWN0JykgcmV0dXJuXG4gICAgICBhcmdzLl9fbWFyayA9IHRydWVcbiAgICAgIGlmIChhcmdzIGluc3RhbmNlb2YgQXJyYXkpIGFyZ3MuZm9yRWFjaChhcmcgPT4gdGhpcy5yZXN0b3JlUHJvdG90eXBlc0ludGVybmFsKGFyZykpXG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKGFyZ3MuX19jbGFzc05hbWUpIHtcbiAgICAgICAgICBsZXQgcHJvdG90eXBlOiBPYmplY3QgPSB0aGlzLndvcmtlclNlcnZpY2VQcm90b3R5cGVNYXBwaW5nQ29uZmlndXJhdGlvblthcmdzLl9fY2xhc3NOYW1lXVxuICAgICAgICAgIGlmICghcHJvdG90eXBlKSB0aHJvdyAnVW5rbm93biBwcm90b3R5cGUgJyArIGFyZ3MuX19jbGFzc05hbWVcbiAgICAgICAgICBhcmdzLl9fcHJvdG9fXyA9ICBwcm90b3R5cGVcbiAgICAgICAgICBkZWxldGUgYXJncy5fX2NsYXNzTmFtZVxuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGtleSBpbiBhcmdzKSBpZiAoYXJncy5oYXNPd25Qcm9wZXJ0eShrZXkpKVxuICAgICAgICAgIHRoaXMucmVzdG9yZVByb3RvdHlwZXNJbnRlcm5hbChhcmdzW2tleV0pXG4gICAgICB9XG4gICAgfVxuXG5cbiAgfVxuXG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

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
    '          <tree tree="$ctrl.classTree" on-select="$ctrl.alterSelection(treeNode)"></tree>\n' +
    '        </div>\n' +
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
    '  <svg id="explore"></svg>\n' +
    '</div>\n' +
    '<div>\n' +
    '  <table id="exploretable">\n' +
    '    <tr>\n' +
    '      <th>Label</th>\n' +
    '      <th ng-repeat="p in $ctrl.properties">{{ p.value }}</th>\n' +
    '      <th>Actions</th>\n' +
    '    </tr>\n' +
    '    <tr ng-repeat="item in $ctrl.items">\n' +
    '      <td ng-click="$ctrl.selectItem(item)">{{ item.label.value }}</td>\n' +
    '      <td ng-repeat="p in item.properties" ng-click="$ctrl.selectItem(item)">{{ p.values[0].label.value }}</td>\n' +
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
    '  <sparql-item item-id="result.ids[0]"></sparql-item>\n' +
    '</script>\n' +
    '<div class="form-group has-feedback">\n' +
    '  <input class="form-control" ng-model="query" ng-model-options="{ debounce: 500 }" ng-change="$ctrl.onChange(query)"/><span class="glyphicon glyphicon-refresh fa-spin form-control-feedback" ng-show="$ctrl.queryRunning"></span><span class="danger glyphicon glyphicon-alert form-control-feedback" ng-show="$ctrl.error"></span>\n' +
    '</div>\n' +
    '<div ng-repeat="result in $ctrl.results track by $index">\n' +
    '  <h4>{{result.configuration.title || result.label }}</h4>\n' +
    '  <ul>\n' +
    '    <li ng-repeat="result in result.results track by $index" ng-click="$ctrl.onSelect({result:result})" uib-popover-template="\'sparql-autocomplete-item-popover\'" popover-trigger="mouseenter" popover-placement="center">{{result.matchedLabel.value}}<span ng-if="result.matchedLabel.value !== result.prefLabel.value">-&gt; {{result.prefLabel.value}}</span><span ng-if="result.additionalInformation[\'altLabel\']">&nbsp;(<span ng-repeat="altLabel in result.additionalInformation[\'altLabel\']">{{$last ? altLabel.value : altLabel.value+\', \'}}</span>)</span>&nbsp;[<span ng-repeat="datasource in result.datasources track by $index">{{$last ? datasource.id : datasource.id+\', \'}}</span>]</li>\n' +
    '  </ul>\n' +
    '  <ul>\n' +
    '    <li ng-repeat="group in result.resultsByGroup track by $index"><span class="group-label">{{group.label}}</span>\n' +
    '      <ul>\n' +
    '        <li ng-repeat="result in group.results track by $index" ng-click="$ctrl.onSelect({result:result})" uib-popover-template="\'sparql-autocomplete-item-popover\'" popover-trigger="mouseenter" popover-placement="center">{{result.matchedLabel.value}}<span ng-if="result.matchedLabel.value !== result.prefLabel.value">-&gt; {{result.prefLabel.value}}</span><span ng-if="result.additionalInformation[\'altLabel\']">&nbsp;(<span ng-repeat="altLabel in result.additionalInformation[\'altLabel\']">{{$last ? altLabel.value : altLabel.value+\', \'}}</span>)</span></li>\n' +
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
    '<h4>{{$ctrl.item.label.value}}</h4>\n' +
    '<table class="table table-striped">\n' +
    '  <tr ng-repeat="property in $ctrl.item.properties">\n' +
    '    <th>{{property.label ? property.label.value : property.value}}</th>\n' +
    '    <td><span ng-repeat="value in property.values" ng-click="$ctrl.onSelect({value: value})" uib-popover-template="\'sparql-item-popover\'" popover-trigger="mouseenter" popover-placement="right">{{value.label ? value.label.value : value.value}}{{ $last ? \'\' : \', \' }}</span></td>\n' +
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
