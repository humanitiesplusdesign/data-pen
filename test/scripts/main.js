var fibra;
(function (fibra) {
    'use strict';
    var m = angular.module('fibra', ['http-auth-interceptor', 'ngStorage', 'ui.router', 'ui.bootstrap', 'ui.bootstrap.tpls', 'fi.seco.sparql']);
    m.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('main', {
            url: '/',
            template: '<main></main>'
        });
    });
    m.config(function ($localStorageProvider) {
        $localStorageProvider.setKeyPrefix('fibra-');
    });
    m.run(function ($rootScope, $localStorage, $http, authService) {
        $rootScope.authInfo = {
            authOpen: false,
            username: undefined,
            password: undefined
        };
        if ($localStorage.authorization)
            $http.defaults.headers.common['Authorization'] = $localStorage.authorization;
        $rootScope.setAuth = function () {
            $rootScope.authInfo.authOpen = false;
            $localStorage.authorization = 'Basic ' + btoa($rootScope.authInfo.username + ':' + $rootScope.authInfo.password);
            $http.defaults.headers.common['Authorization'] = $localStorage.authorization;
            authService.loginConfirmed();
        };
        $rootScope.dismissAuth = function () {
            $rootScope.authInfo.authOpen = false;
            authService.loginCancelled({ status: 401 }, 'Authentication required');
        };
        $rootScope.$on('event:auth-loginRequired', function () { return $rootScope.authInfo.authOpen = true; });
    });
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQVUsS0FBSyxDQTJDZDtBQTNDRCxXQUFVLEtBQUssRUFBQyxDQUFDO0lBQ2YsWUFBWSxDQUFBO0lBWVosSUFBSSxDQUFDLEdBQW9CLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUUsdUJBQXVCLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRyxjQUFjLEVBQUUsbUJBQW1CLEVBQUUsZ0JBQWdCLENBQUUsQ0FBQyxDQUFBO0lBQy9KLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxjQUF5QyxFQUFFLGtCQUFpRDtRQUNwRyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDakMsY0FBYyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDM0IsR0FBRyxFQUFFLEdBQUc7WUFDUixRQUFRLEVBQUUsZUFBZTtTQUN4QixDQUFDLENBQUE7SUFDTixDQUFDLENBQUMsQ0FBQTtJQUNGLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxxQkFBcUI7UUFDN0IscUJBQXFCLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9DLENBQUMsQ0FBQyxDQUFBO0lBQ0YsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLFVBQTJDLEVBQUUsYUFBa0IsRUFBRSxLQUEyQixFQUFFLFdBQTBDO1FBQzdJLFVBQVUsQ0FBQyxRQUFRLEdBQUc7WUFDcEIsUUFBUSxFQUFFLEtBQUs7WUFDZixRQUFRLEVBQUUsU0FBUztZQUNuQixRQUFRLEVBQUUsU0FBUztTQUNwQixDQUFBO1FBQ0QsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQztZQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsR0FBRyxhQUFhLENBQUMsYUFBYSxDQUFBO1FBQzdHLFVBQVUsQ0FBQyxPQUFPLEdBQUc7WUFDbkIsVUFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFBO1lBQ3BDLGFBQWEsQ0FBQyxhQUFhLEdBQUcsUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxHQUFHLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUNoSCxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLEdBQUcsYUFBYSxDQUFDLGFBQWEsQ0FBQTtZQUM1RSxXQUFXLENBQUMsY0FBYyxFQUFFLENBQUE7UUFDOUIsQ0FBQyxDQUFBO1FBQ0QsVUFBVSxDQUFDLFdBQVcsR0FBRztZQUN2QixVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUE7WUFDcEMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxFQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUMsRUFBRSx5QkFBeUIsQ0FBQyxDQUFBO1FBQ3RFLENBQUMsQ0FBQTtRQUNELFVBQVUsQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEVBQUUsY0FBTSxPQUFBLFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLElBQUksRUFBbkMsQ0FBbUMsQ0FBQyxDQUFBO0lBQ3ZGLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxFQTNDUyxLQUFLLEtBQUwsS0FBSyxRQTJDZCIsImZpbGUiOiJzY3JpcHRzL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBmaWJyYSB7XG4gICd1c2Ugc3RyaWN0J1xuXG4gIGludGVyZmFjZSBJQXV0aGVudGljYXRpb25Sb290U2NvcGVTZXJ2aWNlIGV4dGVuZHMgYW5ndWxhci5JUm9vdFNjb3BlU2VydmljZSB7XG4gICAgc2V0QXV0aDogKCkgPT4gdm9pZFxuICAgIGRpc21pc3NBdXRoOiAoKSA9PiB2b2lkXG4gICAgYXV0aEluZm86IHtcbiAgICAgIGF1dGhPcGVuOiBib29sZWFuXG4gICAgICB1c2VybmFtZTogc3RyaW5nXG4gICAgICBwYXNzd29yZDogc3RyaW5nXG4gICAgfVxuICB9XG5cbiAgbGV0IG06IGFuZ3VsYXIuSU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdmaWJyYScsIFsgJ2h0dHAtYXV0aC1pbnRlcmNlcHRvcicsICduZ1N0b3JhZ2UnLCAndWkucm91dGVyJywgICd1aS5ib290c3RyYXAnLCAndWkuYm9vdHN0cmFwLnRwbHMnLCAnZmkuc2Vjby5zcGFycWwnIF0pXG4gIG0uY29uZmlnKCgkc3RhdGVQcm92aWRlcjogYW5ndWxhci51aS5JU3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyOiBhbmd1bGFyLnVpLklVcmxSb3V0ZXJQcm92aWRlcikgPT4ge1xuICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKVxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdtYWluJywge1xuICAgICAgdXJsOiAnLycsXG4gICAgICB0ZW1wbGF0ZTogJzxtYWluPjwvbWFpbj4nXG4gICAgICB9KVxuICB9KVxuICBtLmNvbmZpZygoJGxvY2FsU3RvcmFnZVByb3ZpZGVyKSA9PiB7XG4gICAgJGxvY2FsU3RvcmFnZVByb3ZpZGVyLnNldEtleVByZWZpeCgnZmlicmEtJyk7XG4gIH0pXG4gIG0ucnVuKCgkcm9vdFNjb3BlOiBJQXV0aGVudGljYXRpb25Sb290U2NvcGVTZXJ2aWNlLCAkbG9jYWxTdG9yYWdlOiBhbnksICRodHRwOiBhbmd1bGFyLklIdHRwU2VydmljZSwgYXV0aFNlcnZpY2U6IGFuZ3VsYXIuaHR0cEF1dGguSUF1dGhTZXJ2aWNlKSA9PiB7XG4gICAgJHJvb3RTY29wZS5hdXRoSW5mbyA9IHtcbiAgICAgIGF1dGhPcGVuOiBmYWxzZSxcbiAgICAgIHVzZXJuYW1lOiB1bmRlZmluZWQsXG4gICAgICBwYXNzd29yZDogdW5kZWZpbmVkXG4gICAgfVxuICAgIGlmICgkbG9jYWxTdG9yYWdlLmF1dGhvcml6YXRpb24pICRodHRwLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uWydBdXRob3JpemF0aW9uJ10gPSAkbG9jYWxTdG9yYWdlLmF1dGhvcml6YXRpb25cbiAgICAkcm9vdFNjb3BlLnNldEF1dGggPSAoKSA9PiB7XG4gICAgICAkcm9vdFNjb3BlLmF1dGhJbmZvLmF1dGhPcGVuID0gZmFsc2VcbiAgICAgICRsb2NhbFN0b3JhZ2UuYXV0aG9yaXphdGlvbiA9ICdCYXNpYyAnICsgYnRvYSgkcm9vdFNjb3BlLmF1dGhJbmZvLnVzZXJuYW1lICsgJzonICsgJHJvb3RTY29wZS5hdXRoSW5mby5wYXNzd29yZClcbiAgICAgICRodHRwLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uWydBdXRob3JpemF0aW9uJ10gPSAkbG9jYWxTdG9yYWdlLmF1dGhvcml6YXRpb25cbiAgICAgIGF1dGhTZXJ2aWNlLmxvZ2luQ29uZmlybWVkKClcbiAgICB9XG4gICAgJHJvb3RTY29wZS5kaXNtaXNzQXV0aCA9ICgpID0+IHtcbiAgICAgICRyb290U2NvcGUuYXV0aEluZm8uYXV0aE9wZW4gPSBmYWxzZVxuICAgICAgYXV0aFNlcnZpY2UubG9naW5DYW5jZWxsZWQoe3N0YXR1czogNDAxfSwgJ0F1dGhlbnRpY2F0aW9uIHJlcXVpcmVkJylcbiAgICB9XG4gICAgJHJvb3RTY29wZS4kb24oJ2V2ZW50OmF1dGgtbG9naW5SZXF1aXJlZCcsICgpID0+ICRyb290U2NvcGUuYXV0aEluZm8uYXV0aE9wZW4gPSB0cnVlKVxuICB9KVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

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
                classTree.forEach(function (tree2) { return tree2.recursivelyProcess(function (treeNode) {
                    treeNode.selected = true;
                    _this.allowed.push(treeNode.id);
                }); });
                _this.classTree = classTree;
                _this.allSelected = true;
            };
            this.alterSelection = function (node) {
                node.selected = !node.selected;
                node.recursivelyProcess(function (n) { return n.selected = node.selected; });
                if (node.selected) {
                    _this.disallowed.splice(_this.disallowed.indexOf(node.id), 1);
                    _this.allowed.push(node.id);
                }
                else {
                    _this.allSelected = false;
                    _this.allowed.splice(_this.allowed.indexOf(node.id), 1);
                    _this.disallowed.push(node.id);
                }
                _this.updateFilter();
            };
            this.toggleAll = function () {
                _this.classTree.forEach(function (tree) { return tree.recursivelyProcess(function (tree2) { return tree2.selected = _this.allSelected; }); });
                if (_this.allSelected) {
                    _this.allowed = _this.allowed.concat(_this.disallowed);
                    _this.disallowed = [];
                }
                else {
                    _this.disallowed = _this.disallowed.concat(_this.allowed);
                    _this.allowed = [];
                }
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
    var MainComponentController = (function () {
        function MainComponentController(sparqlTreeService) {
            var _this = this;
            this.sparqlTreeService = sparqlTreeService;
            this.configurations = [
                new Configuration('sdfb', 'Six Degrees of Francis Bacon', 'http://ldf.fi/sdfb/sparql'),
                new Configuration('emlo', 'EMLO', 'http://ldf.fi/emlo/sparql'),
                new Configuration('procope', 'Procope', 'http://ldf.fi/procope/sparql'),
                new Configuration('schoenberg', 'Schoenberg', 'http://ldf.fi/schoenberg/sparql'),
            ];
            this.autocompletionConfigurations = this.configurations.map(function (c) { return c.autocompletionConfiguration; });
            this.setItem = function (itemId, itemEndpoint) {
                _this.itemId = itemId;
                _this.itemEndpoint = itemEndpoint;
            };
            this.selectTab = function (c) {
                if (!c.classTree)
                    _this.sparqlTreeService.getTree(c.endpoint, fibra.SparqlTreeService.getClassTreeQuery).then(c.setClassTree);
            };
        }/*<auto_generate>*/MainComponentController.$inject = ['sparqlTreeService']; MainComponentController.$componentName = 'MainComponentController'/*</auto_generate>*/
        return MainComponentController;
    }());/*<auto_generate>*/angular.module('fibra').controller('MainComponentController',MainComponentController);/*</auto_generate>*/
    fibra.MainComponentController = MainComponentController;
    var MainComponent = (function () {
        function MainComponent() {
            this.controller = MainComponentController;
            this.templateUrl = 'partials/main.html';
        }/*<auto_generate>*/MainComponent.$inject = []; MainComponent.$componentName = 'main'/*</auto_generate>*/
        return MainComponent;
    }());/*<auto_generate>*/angular.module('fibra').component('main',new MainComponent());/*</auto_generate>*/
    fibra.MainComponent = MainComponent;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvbWFpbi1jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBVSxLQUFLLENBZ0dkO0FBaEdELFdBQVUsS0FBSyxFQUFDLENBQUM7SUFDZixZQUFZLENBQUE7SUFFWjtRQUNFLCtCQUFtQixRQUFnQixFQUFTLGFBQXFCO1lBQTlDLGFBQVEsR0FBUixRQUFRLENBQVE7WUFBUyxrQkFBYSxHQUFiLGFBQWEsQ0FBUTtRQUFHLENBQUM7UUFDdkUsNEJBQUM7SUFBRCxDQUZBLEFBRUMsSUFBQTtJQUVEO1FBMkNFLHVCQUFtQixFQUFVLEVBQVMsS0FBYSxFQUFTLFFBQWdCO1lBM0M5RSxpQkF3REM7WUFib0IsT0FBRSxHQUFGLEVBQUUsQ0FBUTtZQUFTLFVBQUssR0FBTCxLQUFLLENBQVE7WUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFRO1lBdENwRSxZQUFPLEdBQWEsRUFBRSxDQUFBO1lBQ3RCLGVBQVUsR0FBYSxFQUFFLENBQUE7WUFFekIsZ0JBQVcsR0FBWSxJQUFJLENBQUE7WUFFNUIsaUJBQVksR0FBb0MsVUFBQyxTQUFxQjtnQkFDM0UsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxVQUFBLFFBQVE7b0JBQzFELFFBQVEsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFBO29CQUN4QixLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUE7Z0JBQ2hDLENBQUMsQ0FBQyxFQUh5QixDQUd6QixDQUFDLENBQUE7Z0JBQ0gsS0FBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUE7Z0JBQzFCLEtBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFBO1lBQ3pCLENBQUMsQ0FBQTtZQUNNLG1CQUFjLEdBQXVCLFVBQUMsSUFBYztnQkFDekQsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUE7Z0JBQzlC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LENBQUE7UUFFMEQsQ0FBQztRQUU5RCw4QkFBQztJQUFELENBekJBLEFBeUJDLElBQUE7SUF6QlksNkJBQXVCLDBCQXlCbkMsQ0FBQTtJQUVEO1FBQUE7WUFDVyxlQUFVLEdBQWEsdUJBQXVCLENBQUE7WUFDOUMsZ0JBQVcsR0FBVyxvQkFBb0IsQ0FBQTtRQUNyRCxDQUFDO1FBQUQsb0JBQUM7SUFBRCxDQUhBLEFBR0MsSUFBQTtJQUhZLG1CQUFhLGdCQUd6QixDQUFBO0FBQ0gsQ0FBQyxFQWhHUyxLQUFLLEtBQUwsS0FBSyxRQWdHZCIsImZpbGUiOiJzY3JpcHRzL21haW4tY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIGZpYnJhIHtcbiAgJ3VzZSBzdHJpY3QnXG5cbiAgY2xhc3MgVHJlZVZpZXdDb25maWd1cmF0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZW5kcG9pbnQ6IHN0cmluZywgcHVibGljIHF1ZXJ5VGVtcGxhdGU6IHN0cmluZykge31cbiAgfVxuXG4gIGNsYXNzIENvbmZpZ3VyYXRpb24ge1xuICAgIHB1YmxpYyBhdXRvY29tcGxldGlvbkNvbmZpZ3VyYXRpb246IFNwYXJxbEF1dG9jb21wbGV0aW9uQ29uZmlndXJhdGlvblxuXG4gICAgcHVibGljIGNsYXNzVHJlZTogVHJlZU5vZGVbXVxuXG4gICAgcHJpdmF0ZSBhbGxvd2VkOiBzdHJpbmdbXSA9IFtdXG4gICAgcHJpdmF0ZSBkaXNhbGxvd2VkOiBzdHJpbmdbXSA9IFtdXG5cbiAgICBwcml2YXRlIGFsbFNlbGVjdGVkOiBib29sZWFuID0gdHJ1ZVxuXG4gICAgcHVibGljIHNldENsYXNzVHJlZTogKGNsYXNzVHJlZTogVHJlZU5vZGVbXSkgPT4gdm9pZCA9IChjbGFzc1RyZWU6IFRyZWVOb2RlW10pID0+IHtcbiAgICAgIGNsYXNzVHJlZS5mb3JFYWNoKHRyZWUyID0+IHRyZWUyLnJlY3Vyc2l2ZWx5UHJvY2Vzcyh0cmVlTm9kZSA9PiB7XG4gICAgICAgIHRyZWVOb2RlLnNlbGVjdGVkID0gdHJ1ZVxuICAgICAgICB0aGlzLmFsbG93ZWQucHVzaCh0cmVlTm9kZS5pZClcbiAgICAgIH0pKVxuICAgICAgdGhpcy5jbGFzc1RyZWUgPSBjbGFzc1RyZWVcbiAgICAgIHRoaXMuYWxsU2VsZWN0ZWQgPSB0cnVlXG4gICAgfVxuICAgIHB1YmxpYyBhbHRlclNlbGVjdGlvbjogKFRyZWVOb2RlKSA9PiB2b2lkID0gKG5vZGU6IFRyZWVOb2RlKSA9PiB7XG4gICAgICBub2RlLnNlbGVjdGVkID0gIW5vZGUuc2VsZWN0ZWRcbiAgICAgIG5vZGUucmVjdXJzaXZlbHlQcm9jZXNzKG4gPT4gbi5zZWxlY3RlZCA9IG5vZGUuc2VsZWN0ZWQpXG4gICAgICBpZiAobm9kZS5zZWxlY3RlZCkge1xuICAgICAgICB0aGlzLmRpc2FsbG93ZWQuc3BsaWNlKHRoaXMuZGlzYWxsb3dlZC5pbmRleE9mKG5vZGUuaWQpLCAxKVxuICAgICAgICB0aGlzLmFsbG93ZWQucHVzaChub2RlLmlkKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hbGxTZWxlY3RlZCA9IGZhbHNlXG4gICAgICAgIHRoaXMuYWxsb3dlZC5zcGxpY2UodGhpcy5hbGxvd2VkLmluZGV4T2Yobm9kZS5pZCksIDEpXG4gICAgICAgIHRoaXMuZGlzYWxsb3dlZC5wdXNoKG5vZGUuaWQpXG4gICAgICB9XG4gICAgICB0aGlzLnVwZGF0ZUZpbHRlcigpXG4gICAgfVxuICAgIHB1YmxpYyB0b2dnbGVBbGw6ICgpID0+IHZvaWQgPSAoKSA9PiB7XG4gICAgICB0aGlzLmNsYXNzVHJlZS5mb3JFYWNoKHRyZWUgPT4gdHJlZS5yZWN1cnNpdmVseVByb2Nlc3ModHJlZTIgPT4gdHJlZTIuc2VsZWN0ZWQgPSB0aGlzLmFsbFNlbGVjdGVkKSlcbiAgICAgIGlmICh0aGlzLmFsbFNlbGVjdGVkKSB7XG4gICAgICAgIHRoaXMuYWxsb3dlZCA9IHRoaXMuYWxsb3dlZC5jb25jYXQodGhpcy5kaXNhbGxvd2VkKVxuICAgICAgICB0aGlzLmRpc2FsbG93ZWQgPSBbXVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5kaXNhbGxvd2VkID0gdGhpcy5kaXNhbGxvd2VkLmNvbmNhdCh0aGlzLmFsbG93ZWQpXG4gICAgICAgIHRoaXMuYWxsb3dlZCA9IFtdXG4gICAgICB9XG4gICAgICB0aGlzLnVwZGF0ZUZpbHRlcigpXG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHVibGljIGlkOiBzdHJpbmcsIHB1YmxpYyB0aXRsZTogc3RyaW5nLCBwdWJsaWMgZW5kcG9pbnQ6IHN0cmluZykge1xuICAgICAgdGhpcy5hdXRvY29tcGxldGlvbkNvbmZpZ3VyYXRpb24gPSBuZXcgU3BhcnFsQXV0b2NvbXBsZXRpb25Db25maWd1cmF0aW9uKGlkLCB0aXRsZSwgZW5kcG9pbnQsIFNwYXJxbEF1dG9jb21wbGV0ZVNlcnZpY2UucXVlcnlUZW1wbGF0ZSlcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZUZpbHRlcjogKCkgPT4gdm9pZCA9ICgpID0+IHtcbiAgICAgIGlmICh0aGlzLmRpc2FsbG93ZWQubGVuZ3RoID09PSAwKVxuICAgICAgICB0aGlzLmF1dG9jb21wbGV0aW9uQ29uZmlndXJhdGlvbi5jb25zdHJhaW50cyA9ICcnXG4gICAgICBlbHNlIGlmICh0aGlzLmRpc2FsbG93ZWQubGVuZ3RoIDwgdGhpcy5hbGxvd2VkLmxlbmd0aClcbiAgICAgICAgdGhpcy5hdXRvY29tcGxldGlvbkNvbmZpZ3VyYXRpb24uY29uc3RyYWludHMgPSAnRklMVEVSICg/Z3JvdXBJZCBOT1QgSU4gKCcgKyB0aGlzLmRpc2FsbG93ZWQubWFwKGlkID0+ICc8JyArIGlkICsgJz4nKS5qb2luKCcsICcpICsgJykpJ1xuICAgICAgZWxzZVxuICAgICAgICB0aGlzLmF1dG9jb21wbGV0aW9uQ29uZmlndXJhdGlvbi5jb25zdHJhaW50cyA9ICdGSUxURVIgKD9ncm91cElkIElOICgnICsgdGhpcy5hbGxvd2VkLm1hcChpZCA9PiAnPCcgKyBpZCArICc+Jykuam9pbignLCAnKSArICcpKSdcbiAgICB9XG5cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBNYWluQ29tcG9uZW50Q29udHJvbGxlciB7XG4gICAgcHVibGljIGNvbmZpZ3VyYXRpb25zOiBDb25maWd1cmF0aW9uW10gPSBbXG4gICAgICBuZXcgQ29uZmlndXJhdGlvbignc2RmYicsICdTaXggRGVncmVlcyBvZiBGcmFuY2lzIEJhY29uJywgJ2h0dHA6Ly9sZGYuZmkvc2RmYi9zcGFycWwnKSxcbiAgICAgIG5ldyBDb25maWd1cmF0aW9uKCdlbWxvJywgJ0VNTE8nLCAnaHR0cDovL2xkZi5maS9lbWxvL3NwYXJxbCcpLFxuICAgICAgbmV3IENvbmZpZ3VyYXRpb24oJ3Byb2NvcGUnLCAnUHJvY29wZScsICdodHRwOi8vbGRmLmZpL3Byb2NvcGUvc3BhcnFsJyksXG4gICAgICBuZXcgQ29uZmlndXJhdGlvbignc2Nob2VuYmVyZycsICdTY2hvZW5iZXJnJywgJ2h0dHA6Ly9sZGYuZmkvc2Nob2VuYmVyZy9zcGFycWwnKSxcbiAgICBdXG5cbiAgICBwdWJsaWMgYXV0b2NvbXBsZXRpb25Db25maWd1cmF0aW9uczogU3BhcnFsQXV0b2NvbXBsZXRpb25Db25maWd1cmF0aW9uW10gPSB0aGlzLmNvbmZpZ3VyYXRpb25zLm1hcChjID0+IGMuYXV0b2NvbXBsZXRpb25Db25maWd1cmF0aW9uKVxuXG4gICAgcHVibGljIGl0ZW1JZDogc3RyaW5nXG4gICAgcHVibGljIGl0ZW1FbmRwb2ludDogc3RyaW5nXG5cbiAgICBwdWJsaWMgc2V0SXRlbTogKGl0ZW1JZDogc3RyaW5nLCBpdGVtRW5kcG9pbnQ6IHN0cmluZykgPT4gdm9pZCA9IChpdGVtSWQ6IHN0cmluZywgaXRlbUVuZHBvaW50OiBzdHJpbmcpID0+IHtcbiAgICAgIHRoaXMuaXRlbUlkID0gaXRlbUlkXG4gICAgICB0aGlzLml0ZW1FbmRwb2ludCA9IGl0ZW1FbmRwb2ludFxuICAgIH1cblxuICAgIHB1YmxpYyBzZWxlY3RUYWI6IChDb25maWd1cmF0aW9uKSA9PiB2b2lkID0gKGM6IENvbmZpZ3VyYXRpb24pID0+IHtcbiAgICAgIGlmICghYy5jbGFzc1RyZWUpXG4gICAgICAgIHRoaXMuc3BhcnFsVHJlZVNlcnZpY2UuZ2V0VHJlZShjLmVuZHBvaW50LCBTcGFycWxUcmVlU2VydmljZS5nZXRDbGFzc1RyZWVRdWVyeSkudGhlbihjLnNldENsYXNzVHJlZSlcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNwYXJxbFRyZWVTZXJ2aWNlOiBTcGFycWxUcmVlU2VydmljZSkge31cblxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIE1haW5Db21wb25lbnQgaW1wbGVtZW50cyBhbmd1bGFyLklDb21wb25lbnRPcHRpb25zIHtcbiAgICAgIHB1YmxpYyBjb250cm9sbGVyOiBGdW5jdGlvbiA9IE1haW5Db21wb25lbnRDb250cm9sbGVyXG4gICAgICBwdWJsaWMgdGVtcGxhdGVVcmw6IHN0cmluZyA9ICdwYXJ0aWFscy9tYWluLmh0bWwnXG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

var fibra;
(function (fibra) {
    'use strict';
    var SparqlTreeService = (function () {
        function SparqlTreeService(sparqlService) {
            this.sparqlService = sparqlService;
        }/*<auto_generate>*/SparqlTreeService.$inject = ['sparqlService']; SparqlTreeService.$componentName = 'sparqlTreeService'/*</auto_generate>*/
        SparqlTreeService.prototype.getTree = function (endpoint, query, canceller) {
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
        SparqlTreeService.getClassTreeQuery = "\nPREFIX skos: <http://www.w3.org/2004/02/skos/core#>\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\nPREFIX sf: <http://ldf.fi/functions#>\nSELECT ?subClass ?superClass ?class ?classLabel ?instances {\n  {\n    ?subClass rdfs:subClassOf ?class .\n    FILTER EXISTS {\n      ?p a ?subClass .\n    }\n  } UNION {\n    {\n      SELECT ?class (COUNT(DISTINCT ?p) AS ?instances) {\n        ?p a ?class .\n      }\n      GROUP BY ?class\n    }\n  }\n  ?class sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?classLabel) .\n}\n";
        return SparqlTreeService;
    }());/*<auto_generate>*/angular.module('fibra').service('sparqlTreeService',SparqlTreeService);/*</auto_generate>*/
    fibra.SparqlTreeService = SparqlTreeService;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvc3BhcnFsLXRyZWUtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFVLEtBQUssQ0E4RGQ7QUE5REQsV0FBVSxLQUFLLEVBQUMsQ0FBQztJQUNmLFlBQVksQ0FBQTtJQUlaO1FBdUJFLDJCQUFvQixhQUE4QjtZQUE5QixrQkFBYSxHQUFiLGFBQWEsQ0FBaUI7UUFBRyxDQUFDO1FBRS9DLG1DQUFPLEdBQWQsVUFBZSxRQUFnQixFQUFFLEtBQWEsRUFBRSxTQUFpQztZQUMvRSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FDekUsVUFBQyxRQUFtRztnQkFDbEcsSUFBSSxPQUFPLEdBQTRDLEVBQUUsQ0FBQTtnQkFDekQsSUFBSSxPQUFPLEdBQTZCLEVBQUUsQ0FBQTtnQkFDMUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLE9BQU87b0JBQzVDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQzt3QkFDeEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLGNBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtvQkFDckcsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO3dCQUN2QixPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQTtvQkFDdEYsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDeEIsSUFBSSxRQUFRLEdBQVcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQTt3QkFDaEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7NEJBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQTt3QkFDOUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUE7b0JBQ2xELENBQUM7b0JBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDMUIsSUFBSSxRQUFRLEdBQVcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQTt3QkFDN0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7NEJBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQTt3QkFDOUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUE7b0JBQ3ZELENBQUM7Z0JBQ0gsQ0FBQyxDQUFDLENBQUE7Z0JBQ0YsSUFBSSxHQUFHLEdBQWUsRUFBRSxDQUFBO2dCQUN4QixHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUN2QixFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUFDLElBQUk7d0JBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDOzRCQUN0RSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtnQkFDN0MsQ0FBQztnQkFDRCxNQUFNLENBQUMsR0FBRyxDQUFBO1lBQ1osQ0FBQyxDQUNGLENBQUE7UUFDSCxDQUFDO1FBckRhLG1DQUFpQixHQUFXLCtpQkFvQjdDLENBQUE7UUFrQ0Msd0JBQUM7SUFBRCxDQXZEQSxBQXVEQyxJQUFBO0lBdkRZLHVCQUFpQixvQkF1RDdCLENBQUE7QUFFSCxDQUFDLEVBOURTLEtBQUssS0FBTCxLQUFLLFFBOERkIiwiZmlsZSI6InNjcmlwdHMvc3BhcnFsLXRyZWUtc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBmaWJyYSB7XG4gICd1c2Ugc3RyaWN0J1xuXG4gIGltcG9ydCBzID0gZmkuc2Vjby5zcGFycWxcblxuICBleHBvcnQgY2xhc3MgU3BhcnFsVHJlZVNlcnZpY2Uge1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0Q2xhc3NUcmVlUXVlcnk6IHN0cmluZyA9IGBcblBSRUZJWCBza29zOiA8aHR0cDovL3d3dy53My5vcmcvMjAwNC8wMi9za29zL2NvcmUjPlxuUFJFRklYIHJkZnM6IDxodHRwOi8vd3d3LnczLm9yZy8yMDAwLzAxL3JkZi1zY2hlbWEjPlxuUFJFRklYIHNmOiA8aHR0cDovL2xkZi5maS9mdW5jdGlvbnMjPlxuU0VMRUNUID9zdWJDbGFzcyA/c3VwZXJDbGFzcyA/Y2xhc3MgP2NsYXNzTGFiZWwgP2luc3RhbmNlcyB7XG4gIHtcbiAgICA/c3ViQ2xhc3MgcmRmczpzdWJDbGFzc09mID9jbGFzcyAuXG4gICAgRklMVEVSIEVYSVNUUyB7XG4gICAgICA/cCBhID9zdWJDbGFzcyAuXG4gICAgfVxuICB9IFVOSU9OIHtcbiAgICB7XG4gICAgICBTRUxFQ1QgP2NsYXNzIChDT1VOVChESVNUSU5DVCA/cCkgQVMgP2luc3RhbmNlcykge1xuICAgICAgICA/cCBhID9jbGFzcyAuXG4gICAgICB9XG4gICAgICBHUk9VUCBCWSA/Y2xhc3NcbiAgICB9XG4gIH1cbiAgP2NsYXNzIHNmOnByZWZlcnJlZExhbmd1YWdlTGl0ZXJhbCAoc2tvczpwcmVmTGFiZWwgcmRmczpsYWJlbCBza29zOmFsdExhYmVsICdlbicgJycgP2NsYXNzTGFiZWwpIC5cbn1cbmBcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc3BhcnFsU2VydmljZTogcy5TcGFycWxTZXJ2aWNlKSB7fVxuXG4gICAgcHVibGljIGdldFRyZWUoZW5kcG9pbnQ6IHN0cmluZywgcXVlcnk6IHN0cmluZywgY2FuY2VsbGVyPzogYW5ndWxhci5JUHJvbWlzZTxhbnk+KTogYW5ndWxhci5JUHJvbWlzZTxUcmVlTm9kZVtdPiB7XG4gICAgICByZXR1cm4gdGhpcy5zcGFycWxTZXJ2aWNlLnF1ZXJ5KGVuZHBvaW50LCBxdWVyeSwge3RpbWVvdXQ6IGNhbmNlbGxlcn0pLnRoZW4oXG4gICAgICAgIChyZXNwb25zZTogYW5ndWxhci5JSHR0cFByb21pc2VDYWxsYmFja0FyZzxzLklTcGFycWxCaW5kaW5nUmVzdWx0PHtbaWQ6IHN0cmluZ106IHMuSVNwYXJxbEJpbmRpbmd9Pj4pID0+IHtcbiAgICAgICAgICBsZXQgcGFyZW50czoge1tpZDogc3RyaW5nXToge1tpZDogc3RyaW5nXTogYm9vbGVhbn19ID0ge31cbiAgICAgICAgICBsZXQgY2xhc3Nlczoge1tpZDogc3RyaW5nXTogVHJlZU5vZGV9ID0ge31cbiAgICAgICAgICByZXNwb25zZS5kYXRhLnJlc3VsdHMuYmluZGluZ3MuZm9yRWFjaChiaW5kaW5nID0+IHtcbiAgICAgICAgICAgIGlmIChiaW5kaW5nWydjbGFzc0xhYmVsJ10pXG4gICAgICAgICAgICAgIGNsYXNzZXNbYmluZGluZ1snY2xhc3MnXS52YWx1ZV0gPSBuZXcgVHJlZU5vZGUoYmluZGluZ1snY2xhc3MnXS52YWx1ZSwgYmluZGluZ1snY2xhc3NMYWJlbCddLnZhbHVlKVxuICAgICAgICAgICAgaWYgKGJpbmRpbmdbJ2luc3RhbmNlcyddKVxuICAgICAgICAgICAgICBjbGFzc2VzW2JpbmRpbmdbJ2NsYXNzJ10udmFsdWVdLmluc3RhbmNlcyA9IHBhcnNlSW50KGJpbmRpbmdbJ2luc3RhbmNlcyddLnZhbHVlLCAxMClcbiAgICAgICAgICAgIGlmIChiaW5kaW5nWydzdWJDbGFzcyddKSB7XG4gICAgICAgICAgICAgIGxldCBzdWJDbGFzczogc3RyaW5nID0gYmluZGluZ1snc3ViQ2xhc3MnXS52YWx1ZVxuICAgICAgICAgICAgICBpZiAoIXBhcmVudHNbc3ViQ2xhc3NdKSBwYXJlbnRzW3N1YkNsYXNzXSA9IHt9XG4gICAgICAgICAgICAgIHBhcmVudHNbc3ViQ2xhc3NdW2JpbmRpbmdbJ2NsYXNzJ10udmFsdWVdID0gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGJpbmRpbmdbJ3N1cGVyQ2xhc3MnXSkge1xuICAgICAgICAgICAgICBsZXQgc3ViQ2xhc3M6IHN0cmluZyA9IGJpbmRpbmdbJ2NsYXNzJ10udmFsdWVcbiAgICAgICAgICAgICAgaWYgKCFwYXJlbnRzW3N1YkNsYXNzXSkgcGFyZW50c1tzdWJDbGFzc10gPSB7fVxuICAgICAgICAgICAgICBwYXJlbnRzW3N1YkNsYXNzXVtiaW5kaW5nWydzdXBlckNsYXNzJ10udmFsdWVdID0gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgbGV0IHJldDogVHJlZU5vZGVbXSA9IFtdXG4gICAgICAgICAgZm9yIChsZXQgaWQgaW4gY2xhc3Nlcykge1xuICAgICAgICAgICAgaWYgKCFwYXJlbnRzW2lkXSkgcmV0LnB1c2goY2xhc3Nlc1tpZF0pOyBlbHNlIGZvciAobGV0IHBpZCBpbiBwYXJlbnRzW2lkXSlcbiAgICAgICAgICAgICAgICBjbGFzc2VzW3BpZF0uY2hpbGRyZW4ucHVzaChjbGFzc2VzW2lkXSlcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJldFxuICAgICAgICB9XG4gICAgICApXG4gICAgfVxuICB9XG5cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

var fibra;
(function (fibra) {
    'use strict';
    var TreeNode = (function () {
        function TreeNode(id, label) {
            var _this = this;
            this.id = id;
            this.label = label;
            this.children = [];
            this.selected = false;
            this.open = true;
            this.recursivelyProcess = function (f) {
                f(_this);
                _this.children.forEach(function (n) { return n.recursivelyProcess(f); });
            };
        }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvdHJlZS1jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBVSxLQUFLLENBdUJkO0FBdkJELFdBQVUsS0FBSyxFQUFDLENBQUM7SUFDZixZQUFZLENBQUE7SUFFWjtRQVVFLGtCQUFtQixFQUFVLEVBQVMsS0FBYTtZQVZyRCxpQkFXQztZQURvQixPQUFFLEdBQUYsRUFBRSxDQUFRO1lBQVMsVUFBSyxHQUFMLEtBQUssQ0FBUTtZQVQ1QyxhQUFRLEdBQWUsRUFBRSxDQUFBO1lBR3pCLGFBQVEsR0FBWSxLQUFLLENBQUE7WUFDekIsU0FBSSxHQUFZLElBQUksQ0FBQTtZQUNwQix1QkFBa0IsR0FBb0MsVUFBQyxDQUFxQjtnQkFDakYsQ0FBQyxDQUFDLEtBQUksQ0FBQyxDQUFBO2dCQUNQLEtBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxFQUF2QixDQUF1QixDQUFDLENBQUE7WUFDckQsQ0FBQyxDQUFBO1FBQ3FELENBQUM7UUFDekQsZUFBQztJQUFELENBWEEsQUFXQyxJQUFBO0lBWFksY0FBUSxXQVdwQixDQUFBO0lBRUQ7UUFBQTtZQUNXLGFBQVEsR0FBMkI7Z0JBQ3hDLElBQUksRUFBRSxHQUFHO2dCQUNULFFBQVEsRUFBRSxHQUFHO2FBQ2QsQ0FBQTtZQUNNLGdCQUFXLEdBQVcsb0JBQW9CLENBQUE7UUFDckQsQ0FBQztRQUFELG9CQUFDO0lBQUQsQ0FOQSxBQU1DLElBQUE7SUFOWSxtQkFBYSxnQkFNekIsQ0FBQTtBQUNILENBQUMsRUF2QlMsS0FBSyxLQUFMLEtBQUssUUF1QmQiLCJmaWxlIjoic2NyaXB0cy90cmVlLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBmaWJyYSB7XG4gICd1c2Ugc3RyaWN0J1xuXG4gIGV4cG9ydCBjbGFzcyBUcmVlTm9kZSB7XG4gICAgcHVibGljIGNoaWxkcmVuOiBUcmVlTm9kZVtdID0gW11cbiAgICBwdWJsaWMgaW5zdGFuY2VzOiBudW1iZXJcbiAgICBwdWJsaWMgbWF0Y2hpbmdJbnN0YW5jZXM6IG51bWJlclxuICAgIHB1YmxpYyBzZWxlY3RlZDogYm9vbGVhbiA9IGZhbHNlXG4gICAgcHVibGljIG9wZW46IGJvb2xlYW4gPSB0cnVlXG4gICAgcHVibGljIHJlY3Vyc2l2ZWx5UHJvY2VzczogKGY6IChUcmVlTm9kZSkgPT4gdm9pZCkgPT4gdm9pZCA9IChmOiAoVHJlZU5vZGUpID0+IHZvaWQpID0+IHtcbiAgICAgIGYodGhpcylcbiAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChuID0+IG4ucmVjdXJzaXZlbHlQcm9jZXNzKGYpKVxuICAgIH1cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgaWQ6IHN0cmluZywgcHVibGljIGxhYmVsOiBzdHJpbmcpIHt9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgVHJlZUNvbXBvbmVudCBpbXBsZW1lbnRzIGFuZ3VsYXIuSUNvbXBvbmVudE9wdGlvbnMge1xuICAgICAgcHVibGljIGJpbmRpbmdzOiB7W2lkOiBzdHJpbmddOiBzdHJpbmd9ID0ge1xuICAgICAgICB0cmVlOiAnPCcsXG4gICAgICAgIG9uU2VsZWN0OiAnJicsXG4gICAgICB9XG4gICAgICBwdWJsaWMgdGVtcGxhdGVVcmw6IHN0cmluZyA9ICdwYXJ0aWFscy90cmVlLmh0bWwnXG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

var fibra;
(function (fibra) {
    'use strict';
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
        function SparqlAutocompleteService($q, sparqlService) {
            this.$q = $q;
            this.sparqlService = sparqlService;
        }/*<auto_generate>*/SparqlAutocompleteService.$inject = ['$q','sparqlService']; SparqlAutocompleteService.$componentName = 'sparqlAutocompleteService'/*</auto_generate>*/
        SparqlAutocompleteService.prototype.autocomplete = function (query, limit, configurations, canceller) {
            var _this = this;
            return this.$q.all(configurations.map(function (configuration) {
                var queryTemplate = configuration.queryTemplate;
                queryTemplate = queryTemplate.replace(/<QUERY>/g, _this.sparqlService.stringToSPARQLString(query));
                queryTemplate = queryTemplate.replace(/# CONSTRAINTS/g, configuration.constraints);
                queryTemplate = queryTemplate.replace(/<LIMIT>/g, '' + limit);
                return _this.sparqlService.query(configuration.endpoint, queryTemplate, { timeout: canceller }).then(function (response) {
                    var ds = new ResultsByDatasource(configuration);
                    var groupToResults = {};
                    response.data.results.bindings.forEach(function (binding) {
                        if (!groupToResults[binding['groupId'].value])
                            groupToResults[binding['groupId'].value] = new ResultGroup(binding['groupLabel'].value);
                        groupToResults[binding['groupId'].value].results.push(new Result(binding['id'].value, groupToResults[binding['groupId'].value], ds, binding['matchedLabel'].value, binding['prefLabel'].value, binding['additionalInformation'] ? binding['additionalInformation'].value : ''));
                    });
                    for (var groupId in groupToResults)
                        ds.resultsByGroup.push(groupToResults[groupId]);
                    return ds;
                });
            }));
        };
        SparqlAutocompleteService.queryTemplate = "\n  PREFIX text: <http://jena.apache.org/text#>\n  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>\n  PREFIX sf: <http://ldf.fi/functions#>\n  SELECT ?groupId ?groupLabel ?id ?matchedLabel ?prefLabel (GROUP_CONCAT(?altLabel;SEPARATOR=', ') AS ?additionalInformation) {\n    {\n      SELECT DISTINCT ?groupId ?id ?matchedLabel {\n        BIND(CONCAT(<QUERY>,\" \",REPLACE(<QUERY>,\"([\\\\+\\\\-\\\\&\\\\|\\\\!\\\\(\\\\)\\\\{\\\\}\\\\[\\\\]\\\\^\\\\\\\"\\\\~\\\\*\\\\?\\\\:\\\\/\\\\\\\\])\",\"\\\\$1\"),\"*\") AS ?query)\n        ?id text:query ?query .\n        ?id skos:prefLabel|rdfs:label|skos:altLabel ?matchedLabel\n        FILTER (REGEX(LCASE(?matchedLabel),CONCAT(\"\\\\b\",LCASE(<QUERY>))))\n        ?id a ?groupId .\n        FILTER EXISTS {\n          ?groupId skos:prefLabel|rdfs:label ?groupLabel\n        }\n        # CONSTRAINTS\n      } LIMIT <LIMIT>\n    }\n    ?groupId sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?groupLabel) .\n    ?id sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?prefLabel) .\n    OPTIONAL {\n      ?id skos:altLabel ?altLabel .\n    }\n  }\n  GROUP BY ?groupId ?groupLabel ?id ?matchedLabel ?prefLabel\n  HAVING(BOUND(?id) && COUNT(?altLabel)<10) # workaround for Schoenberg bug\n  ";
        return SparqlAutocompleteService;
    }());/*<auto_generate>*/angular.module('fibra').service('sparqlAutocompleteService',SparqlAutocompleteService);/*</auto_generate>*/
    fibra.SparqlAutocompleteService = SparqlAutocompleteService;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvc3BhcnFsLWF1dG9jb21wbGV0ZS1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQVUsS0FBSyxDQXNGZDtBQXRGRCxXQUFVLEtBQUssRUFBQyxDQUFDO0lBQ2YsWUFBWSxDQUFBO0lBSVo7UUFFRSw2QkFBbUIsYUFBZ0Q7WUFBaEQsa0JBQWEsR0FBYixhQUFhLENBQW1DO1lBRDVELG1CQUFjLEdBQWtCLEVBQUUsQ0FBQTtRQUM2QixDQUFDO1FBQ3pFLDBCQUFDO0lBQUQsQ0FIQSxBQUdDLElBQUE7SUFIWSx5QkFBbUIsc0JBRy9CLENBQUE7SUFFRDtRQUVFLHFCQUFtQixLQUFhO1lBQWIsVUFBSyxHQUFMLEtBQUssQ0FBUTtZQUR6QixZQUFPLEdBQWEsRUFBRSxDQUFBO1FBQ00sQ0FBQztRQUN0QyxrQkFBQztJQUFELENBSEEsQUFHQyxJQUFBO0lBSFksaUJBQVcsY0FHdkIsQ0FBQTtJQUVEO1FBQ0UsZ0JBQW1CLEVBQVUsRUFBUyxXQUF3QixFQUFTLFVBQStCLEVBQVMsWUFBb0IsRUFBUyxTQUFpQixFQUFTLHFCQUE2QjtZQUFoTCxPQUFFLEdBQUYsRUFBRSxDQUFRO1lBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7WUFBUyxlQUFVLEdBQVYsVUFBVSxDQUFxQjtZQUFTLGlCQUFZLEdBQVosWUFBWSxDQUFRO1lBQVMsY0FBUyxHQUFULFNBQVMsQ0FBUTtZQUFTLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBUTtRQUFHLENBQUM7UUFDek0sYUFBQztJQUFELENBRkEsQUFFQyxJQUFBO0lBRlksWUFBTSxTQUVsQixDQUFBO0lBRUQ7UUFJRSwyQ0FDUyxFQUFVLEVBQ1YsS0FBYSxFQUNiLFFBQWdCLEVBQ2hCLGFBQXFCO1lBSHJCLE9BQUUsR0FBRixFQUFFLENBQVE7WUFDVixVQUFLLEdBQUwsS0FBSyxDQUFRO1lBQ2IsYUFBUSxHQUFSLFFBQVEsQ0FBUTtZQUNoQixrQkFBYSxHQUFiLGFBQWEsQ0FBUTtZQU52QixnQkFB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cGFycWwtYXV0b2NvbXBsZXRlLXNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgZmlicmEge1xuICAndXNlIHN0cmljdCdcblxuICBpbXBvcnQgcyA9IGZpLnNlY28uc3BhcnFsXG5cbiAgZXhwb3J0IGNsYXNzIFJlc3VsdHNCeURhdGFzb3VyY2Uge1xuICAgIHB1YmxpYyByZXN1bHRzQnlHcm91cDogUmVzdWx0R3JvdXBbXSA9IFtdXG4gICAgY29uc3RydWN0b3IocHVibGljIGNvbmZpZ3VyYXRpb246IFNwYXJxbEF1dG9jb21wbGV0aW9uQ29uZmlndXJhdGlvbikge31cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBSZXN1bHRHcm91cCB7XG4gICAgcHVibGljIHJlc3VsdHM6IFJlc3VsdFtdID0gW11cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbGFiZWw6IHN0cmluZykge31cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBSZXN1bHQge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBpZDogc3RyaW5nLCBwdWJsaWMgcmVzdWx0R3JvdXA6IFJlc3VsdEdyb3VwLCBwdWJsaWMgZGF0YXNvdXJjZTogUmVzdWx0c0J5RGF0YXNvdXJjZSwgcHVibGljIG1hdGNoZWRMYWJlbDogc3RyaW5nLCBwdWJsaWMgcHJlZkxhYmVsOiBzdHJpbmcsIHB1YmxpYyBhZGRpdGlvbmFsSW5mb3JtYXRpb246IHN0cmluZykge31cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBTcGFycWxBdXRvY29tcGxldGlvbkNvbmZpZ3VyYXRpb24ge1xuXG4gICAgcHVibGljIGNvbnN0cmFpbnRzOiBzdHJpbmcgPSAnJ1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgaWQ6IHN0cmluZyxcbiAgICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nLFxuICAgICAgcHVibGljIGVuZHBvaW50OiBzdHJpbmcsXG4gICAgICBwdWJsaWMgcXVlcnlUZW1wbGF0ZTogc3RyaW5nXG4gICAgKSB7fVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIFNwYXJxbEF1dG9jb21wbGV0ZVNlcnZpY2Uge1xuXG4gICAgcHVibGljIHN0YXRpYyBxdWVyeVRlbXBsYXRlOiBzdHJpbmcgPSBgXG4gIFBSRUZJWCB0ZXh0OiA8aHR0cDovL2plbmEuYXBhY2hlLm9yZy90ZXh0Iz5cbiAgUFJFRklYIHJkZnM6IDxodHRwOi8vd3d3LnczLm9yZy8yMDAwLzAxL3JkZi1zY2hlbWEjPlxuICBQUkVGSVggc2tvczogPGh0dHA6Ly93d3cudzMub3JnLzIwMDQvMDIvc2tvcy9jb3JlIz5cbiAgUFJFRklYIHNmOiA8aHR0cDovL2xkZi5maS9mdW5jdGlvbnMjPlxuICBTRUxFQ1QgP2dyb3VwSWQgP2dyb3VwTGFiZWwgP2lkID9tYXRjaGVkTGFiZWwgP3ByZWZMYWJlbCAoR1JPVVBfQ09OQ0FUKD9hbHRMYWJlbDtTRVBBUkFUT1I9JywgJykgQVMgP2FkZGl0aW9uYWxJbmZvcm1hdGlvbikge1xuICAgIHtcbiAgICAgIFNFTEVDVCBESVNUSU5DVCA/Z3JvdXBJZCA/aWQgP21hdGNoZWRMYWJlbCB7XG4gICAgICAgIEJJTkQoQ09OQ0FUKDxRVUVSWT4sXCIgXCIsUkVQTEFDRSg8UVVFUlk+LFwiKFtcXFxcXFxcXCtcXFxcXFxcXC1cXFxcXFxcXCZcXFxcXFxcXHxcXFxcXFxcXCFcXFxcXFxcXChcXFxcXFxcXClcXFxcXFxcXHtcXFxcXFxcXH1cXFxcXFxcXFtcXFxcXFxcXF1cXFxcXFxcXF5cXFxcXFxcXFxcXFxcIlxcXFxcXFxcflxcXFxcXFxcKlxcXFxcXFxcP1xcXFxcXFxcOlxcXFxcXFxcL1xcXFxcXFxcXFxcXFxcXFxdKVwiLFwiXFxcXFxcXFwkMVwiKSxcIipcIikgQVMgP3F1ZXJ5KVxuICAgICAgICA/aWQgdGV4dDpxdWVyeSA/cXVlcnkgLlxuICAgICAgICA/aWQgc2tvczpwcmVmTGFiZWx8cmRmczpsYWJlbHxza29zOmFsdExhYmVsID9tYXRjaGVkTGFiZWxcbiAgICAgICAgRklMVEVSIChSRUdFWChMQ0FTRSg/bWF0Y2hlZExhYmVsKSxDT05DQVQoXCJcXFxcXFxcXGJcIixMQ0FTRSg8UVVFUlk+KSkpKVxuICAgICAgICA/aWQgYSA/Z3JvdXBJZCAuXG4gICAgICAgIEZJTFRFUiBFWElTVFMge1xuICAgICAgICAgID9ncm91cElkIHNrb3M6cHJlZkxhYmVsfHJkZnM6bGFiZWwgP2dyb3VwTGFiZWxcbiAgICAgICAgfVxuICAgICAgICAjIENPTlNUUkFJTlRTXG4gICAgICB9IExJTUlUIDxMSU1JVD5cbiAgICB9XG4gICAgP2dyb3VwSWQgc2Y6cHJlZmVycmVkTGFuZ3VhZ2VMaXRlcmFsIChza29zOnByZWZMYWJlbCByZGZzOmxhYmVsIHNrb3M6YWx0TGFiZWwgJ2VuJyAnJyA/Z3JvdXBMYWJlbCkgLlxuICAgID9pZCBzZjpwcmVmZXJyZWRMYW5ndWFnZUxpdGVyYWwgKHNrb3M6cHJlZkxhYmVsIHJkZnM6bGFiZWwgc2tvczphbHRMYWJlbCAnZW4nICcnID9wcmVmTGFiZWwpIC5cbiAgICBPUFRJT05BTCB7XG4gICAgICA/aWQgc2tvczphbHRMYWJlbCA/YWx0TGFiZWwgLlxuICAgIH1cbiAgfVxuICBHUk9VUCBCWSA/Z3JvdXBJZCA/Z3JvdXBMYWJlbCA/aWQgP21hdGNoZWRMYWJlbCA/cHJlZkxhYmVsXG4gIEhBVklORyhCT1VORCg/aWQpICYmIENPVU5UKD9hbHRMYWJlbCk8MTApICMgd29ya2Fyb3VuZCBmb3IgU2Nob2VuYmVyZyBidWdcbiAgYFxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkcTogYW5ndWxhci5JUVNlcnZpY2UsIHByaXZhdGUgc3BhcnFsU2VydmljZTogcy5TcGFycWxTZXJ2aWNlKSB7IH1cblxuICAgIHB1YmxpYyBhdXRvY29tcGxldGUocXVlcnk6IHN0cmluZywgbGltaXQ6IG51bWJlciwgY29uZmlndXJhdGlvbnM6IFNwYXJxbEF1dG9jb21wbGV0aW9uQ29uZmlndXJhdGlvbltdLCBjYW5jZWxsZXI/OiBhbmd1bGFyLklQcm9taXNlPGFueT4pOiBhbmd1bGFyLklQcm9taXNlPFJlc3VsdHNCeURhdGFzb3VyY2VbXT4ge1xuICAgICAgcmV0dXJuIHRoaXMuJHEuYWxsKGNvbmZpZ3VyYXRpb25zLm1hcChjb25maWd1cmF0aW9uID0+IHtcbiAgICAgICAgbGV0IHF1ZXJ5VGVtcGxhdGU6IHN0cmluZyA9IGNvbmZpZ3VyYXRpb24ucXVlcnlUZW1wbGF0ZVxuICAgICAgICBxdWVyeVRlbXBsYXRlID0gcXVlcnlUZW1wbGF0ZS5yZXBsYWNlKC88UVVFUlk+L2csIHRoaXMuc3BhcnFsU2VydmljZS5zdHJpbmdUb1NQQVJRTFN0cmluZyhxdWVyeSkpXG4gICAgICAgIHF1ZXJ5VGVtcGxhdGUgPSBxdWVyeVRlbXBsYXRlLnJlcGxhY2UoLyMgQ09OU1RSQUlOVFMvZywgY29uZmlndXJhdGlvbi5jb25zdHJhaW50cylcbiAgICAgICAgcXVlcnlUZW1wbGF0ZSA9IHF1ZXJ5VGVtcGxhdGUucmVwbGFjZSgvPExJTUlUPi9nLCAnJyArIGxpbWl0KVxuICAgICAgICByZXR1cm4gdGhpcy5zcGFycWxTZXJ2aWNlLnF1ZXJ5KGNvbmZpZ3VyYXRpb24uZW5kcG9pbnQsIHF1ZXJ5VGVtcGxhdGUsIHt0aW1lb3V0OiBjYW5jZWxsZXJ9KS50aGVuKFxuICAgICAgICAgIChyZXNwb25zZTogYW5ndWxhci5JSHR0cFByb21pc2VDYWxsYmFja0FyZzxzLklTcGFycWxCaW5kaW5nUmVzdWx0PHtbaWQ6IHN0cmluZ106IHMuSVNwYXJxbEJpbmRpbmd9Pj4pID0+IHtcbiAgICAgICAgICAgIGxldCBkczogUmVzdWx0c0J5RGF0YXNvdXJjZSA9IG5ldyBSZXN1bHRzQnlEYXRhc291cmNlKGNvbmZpZ3VyYXRpb24pXG4gICAgICAgICAgICBsZXQgZ3JvdXBUb1Jlc3VsdHM6IHtbZ3JvdXBJZDogc3RyaW5nXTogUmVzdWx0R3JvdXB9ID0ge31cbiAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEucmVzdWx0cy5iaW5kaW5ncy5mb3JFYWNoKGJpbmRpbmcgPT4ge1xuICAgICAgICAgICAgICBpZiAoIWdyb3VwVG9SZXN1bHRzW2JpbmRpbmdbJ2dyb3VwSWQnXS52YWx1ZV0pIGdyb3VwVG9SZXN1bHRzW2JpbmRpbmdbJ2dyb3VwSWQnXS52YWx1ZV0gPSBuZXcgUmVzdWx0R3JvdXAoYmluZGluZ1snZ3JvdXBMYWJlbCddLnZhbHVlKVxuICAgICAgICAgICAgICBncm91cFRvUmVzdWx0c1tiaW5kaW5nWydncm91cElkJ10udmFsdWVdLnJlc3VsdHMucHVzaChuZXcgUmVzdWx0KGJpbmRpbmdbJ2lkJ10udmFsdWUsIGdyb3VwVG9SZXN1bHRzW2JpbmRpbmdbJ2dyb3VwSWQnXS52YWx1ZV0sIGRzLCBiaW5kaW5nWydtYXRjaGVkTGFiZWwnXS52YWx1ZSwgYmluZGluZ1sncHJlZkxhYmVsJ10udmFsdWUsIGJpbmRpbmdbJ2FkZGl0aW9uYWxJbmZvcm1hdGlvbiddID8gYmluZGluZ1snYWRkaXRpb25hbEluZm9ybWF0aW9uJ10udmFsdWUgOiAnJykpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgZm9yIChsZXQgZ3JvdXBJZCBpbiBncm91cFRvUmVzdWx0cykgZHMucmVzdWx0c0J5R3JvdXAucHVzaChncm91cFRvUmVzdWx0c1tncm91cElkXSlcbiAgICAgICAgICAgIHJldHVybiBkc1xuICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgICAgfSkpXG4gICAgfVxuICB9XG5cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

var fibra;
(function (fibra) {
    'use strict';
    var SparqlAutocompleteComponentController = (function () {
        function SparqlAutocompleteComponentController($q, sparqlAutocompleteService) {
            var _this = this;
            this.$q = $q;
            this.sparqlAutocompleteService = sparqlAutocompleteService;
            this.onChange = function (query) {
                _this.queryRunning = true;
                _this.canceller.resolve();
                _this.canceller = _this.$q.defer();
                _this.sparqlAutocompleteService.autocomplete(query, _this.limit, _this.configurations, _this.canceller.promise).then(function (resultsByDatasource) {
                    _this.resultsByDatasource = resultsByDatasource;
                    _this.queryRunning = false;
                });
            };
            this.canceller = $q.defer();
        }/*<auto_generate>*/SparqlAutocompleteComponentController.$inject = ['$q','sparqlAutocompleteService']; SparqlAutocompleteComponentController.$componentName = 'SparqlAutocompleteComponentController'/*</auto_generate>*/
        return SparqlAutocompleteComponentController;
    }());/*<auto_generate>*/angular.module('fibra').controller('SparqlAutocompleteComponentController',SparqlAutocompleteComponentController);/*</auto_generate>*/
    var SparqlAutocompleteComponent = (function () {
        function SparqlAutocompleteComponent() {
            this.bindings = {
                configurations: '<',
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvc3BhcnFsLWF1dG9jb21wbGV0ZS1jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBVSxLQUFLLENBbUNkO0FBbkNELFdBQVUsS0FBSyxFQUFDLENBQUM7SUFDZixZQUFZLENBQUE7SUFDWjtRQWtCRSwrQ0FBb0IsRUFBcUIsRUFBVSx5QkFBb0Q7WUFsQnpHLGlCQXFCQztZQUhxQixPQUFFLEdBQUYsRUFBRSxDQUFtQjtZQUFVLDhCQUF5QixHQUF6Qix5QkFBeUIsQ0FBMkI7WUFYaEcsYUFBUSxHQUE0QixVQUFDLEtBQWE7Z0JBQ3ZELEtBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFBO2dCQUN4QixLQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFBO2dCQUN4QixLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUE7Z0JBQ2hDLEtBQUksQ0FBQyx5QkFBeUIsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEtBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSSxDQUFDLGNBQWMsRUFBRSxLQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FDOUcsVUFBQyxtQkFBMEM7b0JBQ3pDLEtBQUksQ0FBQyxtQkFBbUIsR0FBRyxtQkFBbUIsQ0FBQTtvQkFDOUMsS0FBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUE7Z0JBQzNCLENBQUMsQ0FDRixDQUFBO1lBQ0gsQ0FBQyxDQUFBO1lBRUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUE7UUFDN0IsQ0FBQztRQUNILDRDQUFDO0lBQUQsQ0FyQkEsQUFxQkMsSUFBQTtJQUVEO1FBQUE7WUFDVyxhQUFRLEdBQTJCO2dCQUN4QyxjQUFjLEVBQUUsR0FBRztnQkFDbkIsV0FBVyxFQUFFLEdBQUc7Z0JBQ2hCLEtBQUssRUFBRSxHQUFHO2dCQUNWLFFBQVEsRUFBRSxHQUFHO2FBQ2QsQ0FBQTtZQUNNLGVBQVUsR0FBYSxxQ0FBcUMsQ0FBQTtZQUM1RCxnQkFBVyxHQUFXLG1DQUFtQyxDQUFBO1FBQ3BFLENBQUM7UUFBRCxrQ0FBQztJQUFELENBVEEsQUFTQyxJQUFBO0lBVFksaUNBQTJCLDhCQVN2QyxDQUFBO0FBQ0gsQ0FBQyxFQW5DUyxLQUFLLEtBQUwsS0FBSyxRQW1DZCIsImZpbGUiOiJzY3JpcHRzL3NwYXJxbC1hdXRvY29tcGxldGUtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIGZpYnJhIHtcbiAgJ3VzZSBzdHJpY3QnXG4gIGNsYXNzIFNwYXJxbEF1dG9jb21wbGV0ZUNvbXBvbmVudENvbnRyb2xsZXIge1xuICAgIHB1YmxpYyBjb25maWd1cmF0aW9uczogU3BhcnFsQXV0b2NvbXBsZXRpb25Db25maWd1cmF0aW9uW11cbiAgICBwdWJsaWMgbGltaXQ6IG51bWJlclxuICAgIHB1YmxpYyBxdWVyeVJ1bm5pbmc6IGJvb2xlYW5cbiAgICBwdWJsaWMgb25TZWxlY3Q6IChzZWxlY3Rpb246IFJlc3VsdCkgPT4gdm9pZFxuICAgIHByaXZhdGUgcmVzdWx0c0J5RGF0YXNvdXJjZTogUmVzdWx0c0J5RGF0YXNvdXJjZVtdXG4gICAgcHJpdmF0ZSBjYW5jZWxsZXI6IGFuZ3VsYXIuSURlZmVycmVkPGFueT5cbiAgICBwdWJsaWMgb25DaGFuZ2U6IChxdWVyeTogc3RyaW5nKSA9PiB2b2lkID0gKHF1ZXJ5OiBzdHJpbmcpID0+IHtcbiAgICAgIHRoaXMucXVlcnlSdW5uaW5nID0gdHJ1ZVxuICAgICAgdGhpcy5jYW5jZWxsZXIucmVzb2x2ZSgpXG4gICAgICB0aGlzLmNhbmNlbGxlciA9IHRoaXMuJHEuZGVmZXIoKVxuICAgICAgdGhpcy5zcGFycWxBdXRvY29tcGxldGVTZXJ2aWNlLmF1dG9jb21wbGV0ZShxdWVyeSwgdGhpcy5saW1pdCwgdGhpcy5jb25maWd1cmF0aW9ucywgdGhpcy5jYW5jZWxsZXIucHJvbWlzZSkudGhlbihcbiAgICAgICAgKHJlc3VsdHNCeURhdGFzb3VyY2U6IFJlc3VsdHNCeURhdGFzb3VyY2VbXSkgPT4ge1xuICAgICAgICAgIHRoaXMucmVzdWx0c0J5RGF0YXNvdXJjZSA9IHJlc3VsdHNCeURhdGFzb3VyY2VcbiAgICAgICAgICB0aGlzLnF1ZXJ5UnVubmluZyA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgIClcbiAgICB9XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkcTogYW5ndWxhci5JUVNlcnZpY2UsIHByaXZhdGUgc3BhcnFsQXV0b2NvbXBsZXRlU2VydmljZTogU3BhcnFsQXV0b2NvbXBsZXRlU2VydmljZSkge1xuICAgICAgdGhpcy5jYW5jZWxsZXIgPSAkcS5kZWZlcigpXG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIFNwYXJxbEF1dG9jb21wbGV0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIGFuZ3VsYXIuSUNvbXBvbmVudE9wdGlvbnMge1xuICAgICAgcHVibGljIGJpbmRpbmdzOiB7W2lkOiBzdHJpbmddOiBzdHJpbmd9ID0ge1xuICAgICAgICBjb25maWd1cmF0aW9uczogJzwnLFxuICAgICAgICBjb25zdHJhaW50czogJzwnLFxuICAgICAgICBsaW1pdDogJ0AnLFxuICAgICAgICBvblNlbGVjdDogJyYnXG4gICAgICB9XG4gICAgICBwdWJsaWMgY29udHJvbGxlcjogRnVuY3Rpb24gPSBTcGFycWxBdXRvY29tcGxldGVDb21wb25lbnRDb250cm9sbGVyXG4gICAgICBwdWJsaWMgdGVtcGxhdGVVcmw6IHN0cmluZyA9ICdwYXJ0aWFscy9zcGFycWwtYXV0b2NvbXBsZXRlLmh0bWwnXG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var fibra;
(function (fibra) {
    'use strict';
    (function (NodeType) {
        NodeType[NodeType["Literal"] = 0] = "Literal";
        NodeType[NodeType["IRI"] = 1] = "IRI";
        NodeType[NodeType["BlankNode"] = 2] = "BlankNode";
    })(fibra.NodeType || (fibra.NodeType = {}));
    var NodeType = fibra.NodeType;
    var SparqlBindingNode = (function () {
        function SparqlBindingNode(binding) {
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
    var IRI = (function () {
        function IRI(value) {
            this.value = value;
            this.type = NodeType.IRI;
        }
        return IRI;
    }());
    fibra.IRI = IRI;
    var BlankNode = (function () {
        function BlankNode(value) {
            this.value = value;
            this.type = NodeType.BlankNode;
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
        }
        return Literal;
    }());
    fibra.Literal = Literal;
    var NodePlusLabel = (function () {
        function NodePlusLabel(node, label) {
            this.node = node;
            this.label = label;
        }
        return NodePlusLabel;
    }());
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
    var Item = (function () {
        function Item(node) {
            this.node = node;
            this.properties = [];
            this.inverseProperties = [];
        }
        return Item;
    }());
    fibra.Item = Item;
    var SparqlItemService = (function () {
        function SparqlItemService(sparqlService) {
            this.sparqlService = sparqlService;
        }/*<auto_generate>*/SparqlItemService.$inject = ['sparqlService']; SparqlItemService.$componentName = 'sparqlItemService'/*</auto_generate>*/
        SparqlItemService.prototype.getItem = function (endpoint, iri, canceller) {
            return this.sparqlService.query(endpoint, SparqlItemService.getItemPropertiesQuery.replace(/<ID>/g, '<' + iri + '>'), { timeout: canceller }).then(function (response) {
                var item = new Item(new IRI(iri));
                var propertyMap = {};
                response.data.results.bindings.forEach(function (b) {
                    if (b['itemLabel'])
                        item.label = b['itemLabel'].value;
                    if (b['property']) {
                        var propertyToValues = propertyMap[b['property'].value];
                        if (!propertyToValues) {
                            propertyToValues = new PropertyToValues(b['property']);
                            if (b['propertyLabel'])
                                propertyToValues.label = b['propertyLabel'].value;
                            item.properties.push(propertyToValues);
                        }
                        var oNode = new NodePlusLabel(new SparqlBindingNode(b['object']));
                        if (b['objectLabel'])
                            oNode.label = b['objectLabel'].value;
                        propertyToValues.values.push(oNode);
                    }
                });
                return item;
            });
        };
        SparqlItemService.getItemPropertiesQuery = "\nPREFIX skos: <http://www.w3.org/2004/02/skos/core#>\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\nPREFIX sf: <http://ldf.fi/functions#>\nSELECT ?itemLabel ?property ?propertyLabel ?object ?objectLabel {\n  <ID> sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?itemLabel) .\n  <ID> ?property ?object .\n  OPTIONAL {\n    ?property sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?propertyLabelP)\n  }\n  BIND(COALESCE(?propertyLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?property),\".*/\",\"\"),\".*#\",\"\"),\"_\",\" \"),\"([A-Z\u00C5\u00C4\u00D6])\",\" $1\")) AS ?propertyLabel)\n  OPTIONAL {\n    ?object sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?objectLabelP) .\n  }\n  BIND (IF(ISIRI(?object),COALESCE(?objectLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?object),\".*/\",\"\"),\".*#\",\"\"),\"_\",\" \"),\"([A-Z\u00C5\u00C4\u00D6])\",\" $1\")),?object) AS ?objectLabel)\n}\n";
        return SparqlItemService;
    }());/*<auto_generate>*/angular.module('fibra').service('sparqlItemService',SparqlItemService);/*</auto_generate>*/
    fibra.SparqlItemService = SparqlItemService;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvc3BhcnFsLWl0ZW0tc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLElBQVUsS0FBSyxDQTRIZDtBQTVIRCxXQUFVLEtBQUssRUFBQyxDQUFDO0lBQ2YsWUFBWSxDQUFBO0lBSVosV0FBWSxRQUFRO1FBQ2xCLDZDQUFPLENBQUE7UUFDUCxxQ0FBRyxDQUFBO1FBQ0gsaURBQVMsQ0FBQTtJQUNYLENBQUMsRUFKVyxjQUFRLEtBQVIsY0FBUSxRQUluQjtJQUpELElBQVksUUFBUSxHQUFSLGNBSVgsQ0FBQTtJQVNEO1FBS0UsMkJBQVksT0FBeUI7WUFDbkMsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFBO1lBQzFCLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixLQUFLLFNBQVM7b0JBQ1osSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFBO29CQUM1QixJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQTtvQkFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFBO29CQUNoQyxLQUFLLENBQUE7Z0JBQ1AsS0FBSyxLQUFLO29CQUNSLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQTtvQkFDeEIsS0FBSyxDQUFBO2dCQUNQLEtBQUssT0FBTztvQkFDVixJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUE7b0JBQzlCLEtBQUssQ0FBQTtnQkFDUCxTQUFTLE1BQU0sdUJBQXVCLEdBQUcsT0FBTyxDQUFDLElBQUksR0FBRyxPQUFPLEdBQUcsT0FBTyxDQUFBO1lBQzNFLENBQUM7UUFDSCxDQUFDO1FBQ0gsd0JBQUM7SUFBRCxDQXRCQSxBQXNCQyxJQUFBO0lBdEJZLHVCQUFpQixvQkFzQjdCLENBQUE7SUFFRDtRQUVFLGFBQW1CLEtB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QyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQTs0QkFDdEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dDQUFDLGdCQUFnQixDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsS0FBSyxDQUFBOzRCQUN6RSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO3dCQUN4QyxDQUFDO3dCQUNELElBQUksS0FBSyxHQUFrQixJQUFJLGFBQWEsQ0FBQyxJQUFJLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUE7d0JBQ2hGLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQzs0QkFBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLENBQUE7d0JBQzFELGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7b0JBQ3JDLENBQUM7Z0JBQ0gsQ0FBQyxDQUFDLENBQUE7Z0JBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQTtZQUNiLENBQUMsQ0FDRixDQUFBO1FBQ0gsQ0FBQztRQXpDYSx3Q0FBc0IsR0FBVyx1OUJBZ0JsRCxDQUFBO1FBMkJDLHdCQUFDO0lBQUQsQ0E1Q0EsQUE0Q0MsSUFBQTtJQTVDWSx1QkFBaUIsb0JBNEM3QixDQUFBO0FBRUgsQ0FBQyxFQTVIUyxLQUFLLEtBQUwsS0FBSyxRQTRIZCIsImZpbGUiOiJzY3JpcHRzL3NwYXJxbC1pdGVtLXNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgZmlicmEge1xuICAndXNlIHN0cmljdCdcblxuICBpbXBvcnQgcyA9IGZpLnNlY28uc3BhcnFsXG5cbiAgZXhwb3J0IGVudW0gTm9kZVR5cGUge1xuICAgIExpdGVyYWwsXG4gICAgSVJJLFxuICAgIEJsYW5rTm9kZVxuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBJTm9kZSB7XG4gICAgdmFsdWU6IHN0cmluZ1xuICAgIHR5cGU6IE5vZGVUeXBlXG4gICAgbGFuZz86IHN0cmluZ1xuICAgIGRhdGF0eXBlPzogc3RyaW5nXG4gIH1cblxuICBleHBvcnQgY2xhc3MgU3BhcnFsQmluZGluZ05vZGUgaW1wbGVtZW50cyBJTm9kZSB7XG4gICAgcHVibGljIHZhbHVlOiBzdHJpbmdcbiAgICBwdWJsaWMgdHlwZTogTm9kZVR5cGVcbiAgICBwdWJsaWMgbGFuZzogc3RyaW5nXG4gICAgcHVibGljIGRhdGF0eXBlOiBzdHJpbmdcbiAgICBjb25zdHJ1Y3RvcihiaW5kaW5nOiBzLklTcGFycWxCaW5kaW5nKSB7XG4gICAgICB0aGlzLnZhbHVlID0gYmluZGluZy52YWx1ZVxuICAgICAgc3dpdGNoIChiaW5kaW5nLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnbGl0ZXJhbCc6XG4gICAgICAgICAgdGhpcy50eXBlID0gTm9kZVR5cGUuTGl0ZXJhbFxuICAgICAgICAgIHRoaXMubGFuZyA9IGJpbmRpbmdbJ3htbDpsYW5nJ11cbiAgICAgICAgICB0aGlzLmRhdGF0eXBlID0gYmluZGluZy5kYXRhdHlwZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJ3VyaSc6XG4gICAgICAgICAgdGhpcy50eXBlID0gTm9kZVR5cGUuSVJJXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAnYm5vZGUnOlxuICAgICAgICAgIHRoaXMudHlwZSA9IE5vZGVUeXBlLkJsYW5rTm9kZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGRlZmF1bHQ6IHRocm93ICdVbmtub3duIGJpbmRpbmcgdHlwZSAnICsgYmluZGluZy50eXBlICsgJyBmb3IgJyArIGJpbmRpbmdcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgSVJJIGltcGxlbWVudHMgSU5vZGUge1xuICAgIHB1YmxpYyB0eXBlOiBOb2RlVHlwZSA9IE5vZGVUeXBlLklSSVxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB2YWx1ZTogc3RyaW5nKSB7fVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIEJsYW5rTm9kZSBpbXBsZW1lbnRzIElOb2RlIHtcbiAgICBwdWJsaWMgdHlwZTogTm9kZVR5cGUgPSBOb2RlVHlwZS5CbGFua05vZGVcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdmFsdWU6IHN0cmluZykge31cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBMaXRlcmFsIGltcGxlbWVudHMgSU5vZGUge1xuICAgIHB1YmxpYyB0eXBlOiBOb2RlVHlwZSA9IE5vZGVUeXBlLkxpdGVyYWxcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdmFsdWU6IHN0cmluZywgcHVibGljIGxhbmc/OiBzdHJpbmcsIHB1YmxpYyBkYXRhdHlwZT86IHN0cmluZykge31cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBOb2RlUGx1c0xhYmVsIHtcbiAgICBwdWJsaWMgbGFiZWw6IHN0cmluZ1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBub2RlOiBJTm9kZSwgbGFiZWw/OiBzdHJpbmcpIHtcbiAgICAgIHRoaXMubGFiZWwgPSBsYWJlbFxuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBQcm9wZXJ0eVRvVmFsdWVzIGV4dGVuZHMgTm9kZVBsdXNMYWJlbCB7XG4gICAgcHVibGljIHZhbHVlczogTm9kZVBsdXNMYWJlbFtdID0gW11cbiAgICBjb25zdHJ1Y3Rvcihwcm9wZXJ0eTogcy5JU3BhcnFsQmluZGluZykge1xuICAgICAgc3VwZXIobmV3IFNwYXJxbEJpbmRpbmdOb2RlKHByb3BlcnR5KSlcbiAgICB9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgSXRlbSB7XG4gICAgcHVibGljIHByb3BlcnRpZXM6IFByb3BlcnR5VG9WYWx1ZXNbXSA9IFtdXG4gICAgcHVibGljIGludmVyc2VQcm9wZXJ0aWVzOiBQcm9wZXJ0eVRvVmFsdWVzW10gPSBbXVxuICAgIHB1YmxpYyBsYWJlbDogc3RyaW5nXG4gICAgY29uc3RydWN0b3IocHVibGljIG5vZGU6IElOb2RlKSB7fVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIFNwYXJxbEl0ZW1TZXJ2aWNlIHtcbiAgICBwdWJsaWMgc3RhdGljIGdldEl0ZW1Qcm9wZXJ0aWVzUXVlcnk6IHN0cmluZyA9IGBcblBSRUZJWCBza29zOiA8aHR0cDovL3d3dy53My5vcmcvMjAwNC8wMi9za29zL2NvcmUjPlxuUFJFRklYIHJkZnM6IDxodHRwOi8vd3d3LnczLm9yZy8yMDAwLzAxL3JkZi1zY2hlbWEjPlxuUFJFRklYIHNmOiA8aHR0cDovL2xkZi5maS9mdW5jdGlvbnMjPlxuU0VMRUNUID9pdGVtTGFiZWwgP3Byb3BlcnR5ID9wcm9wZXJ0eUxhYmVsID9vYmplY3QgP29iamVjdExhYmVsIHtcbiAgPElEPiBzZjpwcmVmZXJyZWRMYW5ndWFnZUxpdGVyYWwgKHNrb3M6cHJlZkxhYmVsIHJkZnM6bGFiZWwgc2tvczphbHRMYWJlbCAnZW4nICcnID9pdGVtTGFiZWwpIC5cbiAgPElEPiA/cHJvcGVydHkgP29iamVjdCAuXG4gIE9QVElPTkFMIHtcbiAgICA/cHJvcGVydHkgc2Y6cHJlZmVycmVkTGFuZ3VhZ2VMaXRlcmFsIChza29zOnByZWZMYWJlbCByZGZzOmxhYmVsIHNrb3M6YWx0TGFiZWwgJ2VuJyAnJyA/cHJvcGVydHlMYWJlbFApXG4gIH1cbiAgQklORChDT0FMRVNDRSg/cHJvcGVydHlMYWJlbFAsUkVQTEFDRShSRVBMQUNFKFJFUExBQ0UoUkVQTEFDRShTVFIoP3Byb3BlcnR5KSxcIi4qL1wiLFwiXCIpLFwiLiojXCIsXCJcIiksXCJfXCIsXCIgXCIpLFwiKFtBLVrDhcOEw5ZdKVwiLFwiICQxXCIpKSBBUyA/cHJvcGVydHlMYWJlbClcbiAgT1BUSU9OQUwge1xuICAgID9vYmplY3Qgc2Y6cHJlZmVycmVkTGFuZ3VhZ2VMaXRlcmFsIChza29zOnByZWZMYWJlbCByZGZzOmxhYmVsIHNrb3M6YWx0TGFiZWwgJ2VuJyAnJyA/b2JqZWN0TGFiZWxQKSAuXG4gIH1cbiAgQklORCAoSUYoSVNJUkkoP29iamVjdCksQ09BTEVTQ0UoP29iamVjdExhYmVsUCxSRVBMQUNFKFJFUExBQ0UoUkVQTEFDRShSRVBMQUNFKFNUUig/b2JqZWN0KSxcIi4qL1wiLFwiXCIpLFwiLiojXCIsXCJcIiksXCJfXCIsXCIgXCIpLFwiKFtBLVrDhcOEw5ZdKVwiLFwiICQxXCIpKSw/b2JqZWN0KSBBUyA/b2JqZWN0TGFiZWwpXG59XG5gXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzcGFycWxTZXJ2aWNlOiBzLlNwYXJxbFNlcnZpY2UpIHt9XG5cbiAgICBwdWJsaWMgZ2V0SXRlbShlbmRwb2ludDogc3RyaW5nLCBpcmk6IHN0cmluZywgY2FuY2VsbGVyPzogYW5ndWxhci5JUHJvbWlzZTxhbnk+KTogYW5ndWxhci5JUHJvbWlzZTxJdGVtPiB7XG4gICAgICByZXR1cm4gdGhpcy5zcGFycWxTZXJ2aWNlLnF1ZXJ5KGVuZHBvaW50LCBTcGFycWxJdGVtU2VydmljZS5nZXRJdGVtUHJvcGVydGllc1F1ZXJ5LnJlcGxhY2UoLzxJRD4vZywgJzwnICsgaXJpICsgJz4nKSwge3RpbWVvdXQ6IGNhbmNlbGxlcn0pLnRoZW4oXG4gICAgICAgIChyZXNwb25zZTogYW5ndWxhci5JSHR0cFByb21pc2VDYWxsYmFja0FyZzxzLklTcGFycWxCaW5kaW5nUmVzdWx0PHtbaWQ6IHN0cmluZ106IHMuSVNwYXJxbEJpbmRpbmd9Pj4pID0+IHtcbiAgICAgICAgICBsZXQgaXRlbTogSXRlbSA9IG5ldyBJdGVtKG5ldyBJUkkoaXJpKSlcbiAgICAgICAgICBsZXQgcHJvcGVydHlNYXA6IHtbcHJvcGVydHk6IHN0cmluZ106IFByb3BlcnR5VG9WYWx1ZXN9ID0ge31cbiAgICAgICAgICByZXNwb25zZS5kYXRhLnJlc3VsdHMuYmluZGluZ3MuZm9yRWFjaChiID0+IHtcbiAgICAgICAgICAgIGlmIChiWydpdGVtTGFiZWwnXSkgaXRlbS5sYWJlbCA9IGJbJ2l0ZW1MYWJlbCddLnZhbHVlXG4gICAgICAgICAgICBpZiAoYlsncHJvcGVydHknXSkge1xuICAgICAgICAgICAgICBsZXQgcHJvcGVydHlUb1ZhbHVlczogUHJvcGVydHlUb1ZhbHVlcyA9IHByb3BlcnR5TWFwW2JbJ3Byb3BlcnR5J10udmFsdWVdXG4gICAgICAgICAgICAgIGlmICghcHJvcGVydHlUb1ZhbHVlcykge1xuICAgICAgICAgICAgICAgIHByb3BlcnR5VG9WYWx1ZXMgPSBuZXcgUHJvcGVydHlUb1ZhbHVlcyhiWydwcm9wZXJ0eSddKVxuICAgICAgICAgICAgICAgIGlmIChiWydwcm9wZXJ0eUxhYmVsJ10pIHByb3BlcnR5VG9WYWx1ZXMubGFiZWwgPSBiWydwcm9wZXJ0eUxhYmVsJ10udmFsdWVcbiAgICAgICAgICAgICAgICBpdGVtLnByb3BlcnRpZXMucHVzaChwcm9wZXJ0eVRvVmFsdWVzKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGxldCBvTm9kZTogTm9kZVBsdXNMYWJlbCA9IG5ldyBOb2RlUGx1c0xhYmVsKG5ldyBTcGFycWxCaW5kaW5nTm9kZShiWydvYmplY3QnXSkpXG4gICAgICAgICAgICAgIGlmIChiWydvYmplY3RMYWJlbCddKSBvTm9kZS5sYWJlbCA9IGJbJ29iamVjdExhYmVsJ10udmFsdWVcbiAgICAgICAgICAgICAgcHJvcGVydHlUb1ZhbHVlcy52YWx1ZXMucHVzaChvTm9kZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIHJldHVybiBpdGVtXG4gICAgICAgIH1cbiAgICAgIClcbiAgICB9XG5cbiAgfVxuXG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvc3BhcnFsLWl0ZW0tY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBVSxLQUFLLENBeUNkO0FBekNELFdBQVUsS0FBSyxFQUFDLENBQUM7SUFDZixZQUFZLENBQUE7SUFRWjtRQUFBO1FBR0EsQ0FBQztRQUFELGtDQUFDO0lBQUQsQ0FIQSxBQUdDLElBQUE7SUFPRDtRQUE0QyxpREFBMkI7UUFRckUsdUNBQW9CLGlCQUFvQztZQVIxRCxpQkFXQztZQUZHLGlCQUFPLENBQUE7WUFEVyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1lBTmpELGVBQVUsR0FBMEQsVUFBQyxPQUEyQztnQkFDckgsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLFFBQVEsSUFBSSxLQUFJLENBQUMsTUFBTSxDQUFDO29CQUMvQixLQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLEtBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FDN0QsVUFBQyxJQUFVLElBQUssT0FBQSxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksRUFBaEIsQ0FBZ0IsQ0FDakMsQ0FBQTtZQUNMLENBQUMsQ0FBQTtRQUdELENBQUM7UUFDSCxvQ0FBQztJQUFELENBWEEsQUFXQyxDQVgyQywyQkFBMkIsR0FXdEU7SUFFRDtRQUFBO1lBQ1csYUFBUSxHQUEyQjtnQkFDeEMsUUFBUSxFQUFFLEdBQUc7Z0JBQ2IsTUFBTSxFQUFFLEdBQUc7Z0JBQ1gsUUFBUSxFQUFFLEdBQUc7YUFDZCxDQUFBO1lBQ00sZUFBVSxHQUFhLDZCQUE2QixDQUFBO1lBQ3BELGdCQUFXLEdBQVcsMkJBQTJCLENBQUE7UUFDNUQsQ0FBQztRQUFELDBCQUFDO0lBQUQsQ0FSQSxBQVFDLElBQUE7SUFSWSx5QkFBbUIsc0JBUS9CLENBQUE7QUFDSCxDQUFDLEVBekNTLEtBQUssS0FBTCxLQUFLLFFBeUNkIiwiZmlsZSI6InNjcmlwdHMvc3BhcnFsLWl0ZW0tY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIGZpYnJhIHtcbiAgJ3VzZSBzdHJpY3QnXG5cbiAgaW50ZXJmYWNlIElDaGFuZ2VPYmplY3Q8VD4ge1xuICAgIGN1cnJlbnRWYWx1ZTogVFxuICAgIHByZXZpb3VzVmFsdWU6IFRcbiAgICBpc0ZpcnN0Q2hhbmdlOiAoKSA9PiBib29sZWFuXG4gIH1cblxuICBjbGFzcyBTcGFycWxJdGVtQ29tcG9uZW50QmluZGluZ3Mge1xuICAgIHB1YmxpYyBlbmRwb2ludDogc3RyaW5nXG4gICAgcHVibGljIGl0ZW1JZDogc3RyaW5nXG4gIH1cblxuICBpbnRlcmZhY2UgSVNwYXJxbEl0ZW1Db21wb25lbnRCaW5kaW5nQ2hhbmdlcyB7XG4gICAgZW5kcG9pbnQ/OiBJQ2hhbmdlT2JqZWN0PHN0cmluZz5cbiAgICBpdGVtSWQ/OiBJQ2hhbmdlT2JqZWN0PHN0cmluZz5cbiAgfVxuXG4gIGNsYXNzIFNwYXJxbEl0ZW1Db21wb25lbnRDb250cm9sbGVyIGV4dGVuZHMgU3BhcnFsSXRlbUNvbXBvbmVudEJpbmRpbmdzIHtcbiAgICBwcml2YXRlIGl0ZW06IEl0ZW1cbiAgICBwdWJsaWMgJG9uQ2hhbmdlczogKGNoYW5nZXM6IElTcGFycWxJdGVtQ29tcG9uZW50QmluZGluZ0NoYW5nZXMpID0+IHZvaWQgPSAoY2hhbmdlczogSVNwYXJxbEl0ZW1Db21wb25lbnRCaW5kaW5nQ2hhbmdlcykgPT4ge1xuICAgICAgaWYgKHRoaXMuZW5kcG9pbnQgJiYgdGhpcy5pdGVtSWQpXG4gICAgICAgIHRoaXMuc3BhcnFsSXRlbVNlcnZpY2UuZ2V0SXRlbSh0aGlzLmVuZHBvaW50LCB0aGlzLml0ZW1JZCkudGhlbihcbiAgICAgICAgICAoaXRlbTogSXRlbSkgPT4gdGhpcy5pdGVtID0gaXRlbVxuICAgICAgICApXG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc3BhcnFsSXRlbVNlcnZpY2U6IFNwYXJxbEl0ZW1TZXJ2aWNlKSB7XG4gICAgICBzdXBlcigpXG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIFNwYXJxbEl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBhbmd1bGFyLklDb21wb25lbnRPcHRpb25zIHtcbiAgICAgIHB1YmxpYyBiaW5kaW5nczoge1tpZDogc3RyaW5nXTogc3RyaW5nfSA9IHtcbiAgICAgICAgZW5kcG9pbnQ6ICc8JyxcbiAgICAgICAgaXRlbUlkOiAnPCcsXG4gICAgICAgIG9uU2VsZWN0OiAnJidcbiAgICAgIH1cbiAgICAgIHB1YmxpYyBjb250cm9sbGVyOiBGdW5jdGlvbiA9IFNwYXJxbEl0ZW1Db21wb25lbnRDb250cm9sbGVyXG4gICAgICBwdWJsaWMgdGVtcGxhdGVVcmw6IHN0cmluZyA9ICdwYXJ0aWFscy9zcGFycWwtaXRlbS5odG1sJ1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

(function(module) {
try {
  module = angular.module('fibra');
} catch (e) {
  module = angular.module('fibra', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('partials/main.html',
    '\n' +
    '<html>\n' +
    '  <body ng-app="fibra">\n' +
    '    <nav class="navbar navbar-inverse navbar-fixed-top">\n' +
    '      <div class="container-fluid">\n' +
    '        <div class="navbar-header">\n' +
    '          <div class="navbar-brand"><img src="images/fibra.png" height="23px"/></div>\n' +
    '        </div>\n' +
    '      </div>\n' +
    '    </nav>\n' +
    '    <div class="container-fluid main">\n' +
    '      <div class="row main no-gutter">\n' +
    '        <div class="col-md-3" id="left-column">\n' +
    '          <h4>Configure autocompletion</h4>\n' +
    '          <uib-tabset vertical="true">\n' +
    '            <uib-tab ng-repeat="configuration in $ctrl.configurations" heading="{{configuration.title}}" select="$ctrl.selectTab(configuration)"><span class="glyphicon glyphicon-refresh fa-spin" ng-show="!configuration.classTree"></span>\n' +
    '              <div class="checkbox">\n' +
    '                <label>\n' +
    '                  <input type="checkbox" ng-model="configuration.allSelected" ng-click="configuration.toggleAll();$event.stopPropagation()"/>all\n' +
    '                </label>\n' +
    '              </div>\n' +
    '              <tree tree="configuration.classTree" on-select="configuration.alterSelection(treeNode)"></tree>\n' +
    '            </uib-tab>\n' +
    '          </uib-tabset>\n' +
    '        </div>\n' +
    '        <div class="col-md-4" id="middle-column">\n' +
    '          <h4>Autocompletion</h4>\n' +
    '          <sparql-autocomplete configurations="$ctrl.autocompletionConfigurations" limit="30" on-select="$ctrl.setItem(result.id,result.datasource.configuration.endpoint)"></sparql-autocomplete>\n' +
    '        </div>\n' +
    '        <div class="col-md-5" id="right-column">\n' +
    '          <h4>Item</h4>\n' +
    '          <sparql-item endpoint="$ctrl.itemEndpoint" item-id="$ctrl.itemId" on-select="$ctrl.setItem(value.node.value,$ctrl.itemEndpoint)"></sparql-item>\n' +
    '        </div>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </body>\n' +
    '</html>');
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
    '  <input class="form-control" ng-model="query" ng-model-options="{ debounce: 500 }" ng-change="$ctrl.onChange(query)"/><span class="glyphicon glyphicon-refresh fa-spin form-control-feedback" ng-show="$ctrl.queryRunning"></span>\n' +
    '</div>\n' +
    '<div ng-repeat="datasource in $ctrl.resultsByDatasource track by $index">\n' +
    '  <h4>{{datasource.configuration.title}}</h4>\n' +
    '  <ul>\n' +
    '    <li ng-repeat="group in datasource.resultsByGroup track by $index">{{group.label}}\n' +
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
    '<h4>{{$ctrl.item.label}} ({{$ctrl.item.node.value}})</h4>\n' +
    '<table class="table table-striped">\n' +
    '  <tr ng-repeat="property in $ctrl.item.properties">\n' +
    '    <th>{{property.label ? property.label : property.node.value}}</th>\n' +
    '    <td><span ng-repeat="value in property.values" ng-click="$ctrl.onSelect({value: value})">{{value.label ? value.label : value.node.value}}</span></td>\n' +
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
    '      <input type="checkbox" ng-model="node.selected" ng-click="$ctrl.onSelect({treeNode:node});$event.stopPropagation()"/>{{node.label}}\n' +
    '    </label><span class="pull-right">{{node.matchingInstances != node.matchingInstances ? node.matchingInstances+\'/\'+node.instances : node.instances}}</span>\n' +
    '  </div>\n' +
    '  <ul>\n' +
    '    <li ng-repeat="node in node.children" ng-include="\'treenode.html\'" ng-click="$ctrl.onSelect({treeNode:node})" ng-class="{selected:node.selected}"></li>\n' +
    '  </ul>\n' +
    '</script>\n' +
    '<ul>\n' +
    '  <li ng-repeat="node in $ctrl.tree" ng-include="\'treenode.html\'" ng-click="$ctrl.onSelect({treeNode:node})" ng-class="{selected:node.selected}"></li>\n' +
    '</ul>');
}]);
})();
