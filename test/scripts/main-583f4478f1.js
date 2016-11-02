var fibra;
(function (fibra) {
    'use strict';
    var m = angular.module('fibra', ['http-auth-interceptor', 'ngStorage', 'ui.router', 'ui.bootstrap', 'ui.bootstrap.tpls']);
    m.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/configure');
        $stateProvider.state('configure', {
            url: '/configure',
            template: '<configure-view></configure-view>'
        });
        $stateProvider.state('select', {
            url: '/select',
            template: '<select-view></select-view>'
        });
        $stateProvider.state('construct', {
            url: '/construct',
            template: '<construct-view></construct-view>'
        });
        $stateProvider.state('author', {
            url: '/author',
            template: '<author-view></author-view>'
        });
    });
    m.config(function ($localStorageProvider) {
        $localStorageProvider.setKeyPrefix('fibra-');
    });
    m.value('workerServiceConfiguration', {
        appName: 'fibra',
        workerThreads: 8,
        importScripts: [
            'scripts/worker-65b4082664.js'
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2FwcC9zY3JpcHRzL2FwcC1jb25maWd1cmF0aW9uLXVpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQVUsS0FBSyxDQStFZDtBQS9FRCxXQUFVLEtBQUssRUFBQyxDQUFDO0lBQ2YsWUFBWSxDQUFBO0lBWVosSUFBSSxDQUFDLEdBQW9CLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUUsdUJBQXVCLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRyxjQUFjLEVBQUUsbUJBQW1CLENBQUUsQ0FBQyxDQUFBO0lBQzdJLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxjQUF5QyxFQUFFLGtCQUFpRDtRQUNwRyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDMUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUU7WUFDaEMsR0FBRyxFQUFFLFlBQVk7WUFDakIsUUFBUSxFQUFFLG1DQUFtQztTQUM5QyxDQUFDLENBQUE7UUFDRixjQUFjLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtZQUM3QixHQUFHLEVBQUUsU0FBUztZQUNkLFFBQVEsRUFBRSw2QkFBNkI7U0FDeEMsQ0FBQyxDQUFBO1FBQ0YsY0FBYyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUU7WUFDaEMsR0FBRyxFQUFFLFlBQVk7WUFDakIsUUFBUSxFQUFFLG1DQUFtQztTQUM5QyxDQUFDLENBQUE7UUFDRixjQUFjLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtZQUM3QixHQUFHLEVBQUUsU0FBUztZQUNkLFFBQVEsRUFBRSw2QkFBNkI7U0FDeEMsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFDLENBQUE7SUFDRixDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUMscUJBQXFCO1FBQzdCLHFCQUFxQixDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMvQyxDQUFDLENBQUMsQ0FBQTtJQUNGLENBQUMsQ0FBQyxLQUFLLENBQUMsNEJBQTRCLEVBQUU7UUFDcEMsT0FBTyxFQUFFLE9BQU87UUFDaEIsYUFBYSxFQUFFLENBQUM7UUFDaEIsYUFBYSxFQUFFO1lBQ2IseUNBQXlDO1lBQ3pDLGlFQUFpRTtZQUNqRSxnRUFBZ0U7WUFDaEUscUNBQXFDO1lBQ3JDLHFDQUFxQztZQUNyQywyQkFBMkI7WUFDM0Isa0NBQWtDO1lBQ2xDLDZCQUE2QjtZQUM3QixnQkFBZ0I7WUFDaEIsZ0NBQWdDO1lBQ2hDLHdDQUF3QztZQUN4QyxnQ0FBZ0M7WUFDaEMsa0NBQWtDO1lBQ2xDLDJCQUEyQjtTQUMxQjtLQUNKLENBQUMsQ0FBQTtJQUNGLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxVQUEyQyxFQUFFLGFBQWtCLEVBQUUsS0FBMkIsRUFBRSxXQUEwQyxFQUFFLGFBQTRCO1FBQzNLLFVBQVUsQ0FBQyxRQUFRLEdBQUc7WUFDcEIsUUFBUSxFQUFFLEtBQUs7WUFDZixRQUFRLEVBQUUsU0FBUztZQUNuQixRQUFRLEVBQUUsU0FBUztTQUNwQixDQUFBO1FBQ0QsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDaEMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFRLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxhQUFhLENBQUE7WUFDN0UsYUFBYSxDQUFDLFVBQVUsQ0FBQyx5QkFBeUIsRUFBRSxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUE7UUFDbEYsQ0FBQztRQUNELFVBQVUsQ0FBQyxPQUFPLEdBQUc7WUFDbkIsVUFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFBO1lBQ3BDLGFBQWEsQ0FBQyxhQUFhLEdBQUcsUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxHQUFHLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUNoSCxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQVEsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLEdBQUcsYUFBYSxDQUFDLGFBQWEsQ0FBQTtZQUM3RSxhQUFhLENBQUMsVUFBVSxDQUFDLHlCQUF5QixFQUFFLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQTtZQUNoRixXQUFXLENBQUMsY0FBYyxFQUFFLENBQUE7UUFDOUIsQ0FBQyxDQUFBO1FBQ0QsVUFBVSxDQUFDLFdBQVcsR0FBRztZQUN2QixVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUE7WUFDcEMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxFQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUMsRUFBRSx5QkFBeUIsQ0FBQyxDQUFBO1FBQ3RFLENBQUMsQ0FBQTtRQUNELFVBQVUsQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEVBQUUsY0FBTSxPQUFBLFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLElBQUksRUFBbkMsQ0FBbUMsQ0FBQyxDQUFBO0lBQ3ZGLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxFQS9FUyxLQUFLLEtBQUwsS0FBSyxRQStFZCIsImZpbGUiOiJzY3JpcHRzL2FwcC1jb25maWd1cmF0aW9uLXVpLmpzIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIGZpYnJhIHtcbiAgJ3VzZSBzdHJpY3QnXG5cbiAgaW50ZXJmYWNlIElBdXRoZW50aWNhdGlvblJvb3RTY29wZVNlcnZpY2UgZXh0ZW5kcyBhbmd1bGFyLklSb290U2NvcGVTZXJ2aWNlIHtcbiAgICBzZXRBdXRoOiAoKSA9PiB2b2lkXG4gICAgZGlzbWlzc0F1dGg6ICgpID0+IHZvaWRcbiAgICBhdXRoSW5mbzoge1xuICAgICAgYXV0aE9wZW46IGJvb2xlYW5cbiAgICAgIHVzZXJuYW1lOiBzdHJpbmcgfCB1bmRlZmluZWRcbiAgICAgIHBhc3N3b3JkOiBzdHJpbmcgfCB1bmRlZmluZWRcbiAgICB9XG4gIH1cblxuICBsZXQgbTogYW5ndWxhci5JTW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2ZpYnJhJywgWyAnaHR0cC1hdXRoLWludGVyY2VwdG9yJywgJ25nU3RvcmFnZScsICd1aS5yb3V0ZXInLCAgJ3VpLmJvb3RzdHJhcCcsICd1aS5ib290c3RyYXAudHBscycgXSlcbiAgbS5jb25maWcoKCRzdGF0ZVByb3ZpZGVyOiBhbmd1bGFyLnVpLklTdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXI6IGFuZ3VsYXIudWkuSVVybFJvdXRlclByb3ZpZGVyKSA9PiB7XG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL2NvbmZpZ3VyZScpXG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2NvbmZpZ3VyZScsIHtcbiAgICAgIHVybDogJy9jb25maWd1cmUnLFxuICAgICAgdGVtcGxhdGU6ICc8Y29uZmlndXJlLXZpZXc+PC9jb25maWd1cmUtdmlldz4nXG4gICAgfSlcbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnc2VsZWN0Jywge1xuICAgICAgdXJsOiAnL3NlbGVjdCcsXG4gICAgICB0ZW1wbGF0ZTogJzxzZWxlY3Qtdmlldz48L3NlbGVjdC12aWV3PidcbiAgICB9KVxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdjb25zdHJ1Y3QnLCB7XG4gICAgICB1cmw6ICcvY29uc3RydWN0JyxcbiAgICAgIHRlbXBsYXRlOiAnPGNvbnN0cnVjdC12aWV3PjwvY29uc3RydWN0LXZpZXc+J1xuICAgIH0pXG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2F1dGhvcicsIHtcbiAgICAgIHVybDogJy9hdXRob3InLFxuICAgICAgdGVtcGxhdGU6ICc8YXV0aG9yLXZpZXc+PC9hdXRob3Itdmlldz4nXG4gICAgfSlcbiAgfSlcbiAgbS5jb25maWcoKCRsb2NhbFN0b3JhZ2VQcm92aWRlcikgPT4ge1xuICAgICRsb2NhbFN0b3JhZ2VQcm92aWRlci5zZXRLZXlQcmVmaXgoJ2ZpYnJhLScpO1xuICB9KVxuICBtLnZhbHVlKCd3b3JrZXJTZXJ2aWNlQ29uZmlndXJhdGlvbicsIHtcbiAgICBhcHBOYW1lOiAnZmlicmEnLFxuICAgIHdvcmtlclRocmVhZHM6IDgsXG4gICAgaW1wb3J0U2NyaXB0czogW1xuICAgICAgJ2Jvd2VyX2NvbXBvbmVudHMvYW5ndWxhci9hbmd1bGFyLm1pbi5qcycsXG4gICAgICAnYm93ZXJfY29tcG9uZW50cy9hbmd1bGFyLWh0dHAtYXV0aC9zcmMvaHR0cC1hdXRoLWludGVyY2VwdG9yLmpzJyxcbiAgICAgICdib3dlcl9jb21wb25lbnRzL2FuZ3VsYXItc3BhcnFsLXNlcnZpY2UvZGlzdC9zcGFycWwtc2VydmljZS5qcycsXG4gICAgICAnc2NyaXB0cy9hcHAtY29uZmlndXJhdGlvbi13b3JrZXIuanMnLFxuICAgICAgJ3NjcmlwdHMvYXBwLWNvbmZpZ3VyYXRpb24tY29tbW9uLmpzJyxcbiAgICAgICdzY3JpcHRzL3dvcmtlci1zZXJ2aWNlLmpzJyxcbiAgICAgICdzY3JpcHRzL2NvbmZpZ3VyYXRpb24tc2VydmljZS5qcycsXG4gICAgICAnc2NyaXB0cy9jb2xsZWN0aW9uLXV0aWxzLmpzJyxcbiAgICAgICdzY3JpcHRzL3JkZi5qcycsXG4gICAgICAnc2NyaXB0cy9zcGFycWwtaXRlbS1zZXJ2aWNlLmpzJyxcbiAgICAgICdzY3JpcHRzL3NwYXJxbC1hdXRvY29tcGxldGUtc2VydmljZS5qcycsXG4gICAgICAnc2NyaXB0cy9zcGFycWwtdHJlZS1zZXJ2aWNlLmpzJyxcbiAgICAgICdzY3JpcHRzL3NwYXJxbC11cGRhdGUtc2VydmljZS5qcycsXG4gICAgICAnc2NyaXB0cy90cmVlLWNvbXBvbmVudC5qcydcbiAgICAgIF1cbiAgfSlcbiAgbS5ydW4oKCRyb290U2NvcGU6IElBdXRoZW50aWNhdGlvblJvb3RTY29wZVNlcnZpY2UsICRsb2NhbFN0b3JhZ2U6IGFueSwgJGh0dHA6IGFuZ3VsYXIuSUh0dHBTZXJ2aWNlLCBhdXRoU2VydmljZTogYW5ndWxhci5odHRwQXV0aC5JQXV0aFNlcnZpY2UsIHdvcmtlclNlcnZpY2U6IFdvcmtlclNlcnZpY2UpID0+IHtcbiAgICAkcm9vdFNjb3BlLmF1dGhJbmZvID0ge1xuICAgICAgYXV0aE9wZW46IGZhbHNlLFxuICAgICAgdXNlcm5hbWU6IHVuZGVmaW5lZCxcbiAgICAgIHBhc3N3b3JkOiB1bmRlZmluZWRcbiAgICB9XG4gICAgaWYgKCRsb2NhbFN0b3JhZ2UuYXV0aG9yaXphdGlvbikge1xuICAgICAgJGh0dHAuZGVmYXVsdHMuaGVhZGVycyEuY29tbW9uWydBdXRob3JpemF0aW9uJ10gPSAkbG9jYWxTdG9yYWdlLmF1dGhvcml6YXRpb25cbiAgICAgIHdvcmtlclNlcnZpY2UuJGJyb2FkY2FzdCgnbWFpbjphdXRoLWxvZ2luQXV0aEluZm8nLCAkbG9jYWxTdG9yYWdlLmF1dGhvcml6YXRpb24pXG4gICAgfVxuICAgICRyb290U2NvcGUuc2V0QXV0aCA9ICgpID0+IHtcbiAgICAgICRyb290U2NvcGUuYXV0aEluZm8uYXV0aE9wZW4gPSBmYWxzZVxuICAgICAgJGxvY2FsU3RvcmFnZS5hdXRob3JpemF0aW9uID0gJ0Jhc2ljICcgKyBidG9hKCRyb290U2NvcGUuYXV0aEluZm8udXNlcm5hbWUgKyAnOicgKyAkcm9vdFNjb3BlLmF1dGhJbmZvLnBhc3N3b3JkKVxuICAgICAgJGh0dHAuZGVmYXVsdHMuaGVhZGVycyEuY29tbW9uWydBdXRob3JpemF0aW9uJ10gPSAkbG9jYWxTdG9yYWdlLmF1dGhvcml6YXRpb25cbiAgICAgIHdvcmtlclNlcnZpY2UuJGJyb2FkY2FzdCgnbWFpbjphdXRoLWxvZ2luQXV0aEluZm8nLCAkbG9jYWxTdG9yYWdlLmF1dGhvcml6YXRpb24pXG4gICAgICBhdXRoU2VydmljZS5sb2dpbkNvbmZpcm1lZCgpXG4gICAgfVxuICAgICRyb290U2NvcGUuZGlzbWlzc0F1dGggPSAoKSA9PiB7XG4gICAgICAkcm9vdFNjb3BlLmF1dGhJbmZvLmF1dGhPcGVuID0gZmFsc2VcbiAgICAgIGF1dGhTZXJ2aWNlLmxvZ2luQ2FuY2VsbGVkKHtzdGF0dXM6IDQwMX0sICdBdXRoZW50aWNhdGlvbiByZXF1aXJlZCcpXG4gICAgfVxuICAgICRyb290U2NvcGUuJG9uKCdldmVudDphdXRoLWxvZ2luUmVxdWlyZWQnLCAoKSA9PiAkcm9vdFNjb3BlLmF1dGhJbmZvLmF1dGhPcGVuID0gdHJ1ZSlcbiAgfSlcbn1cbiJdfQ==

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
            'SourcedNodePlusLabel': fibra.SourcedNodePlusLabel.prototype,
            'UNDEF': fibra.UNDEF.prototype
        };
    });
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2FwcC9zY3JpcHRzL2FwcC1jb25maWd1cmF0aW9uLWNvbW1vbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFVLEtBQUssQ0FpQmQ7QUFqQkQsV0FBVSxLQUFLLEVBQUMsQ0FBQztJQUNmLFlBQVksQ0FBQTtJQUNaLElBQUksQ0FBQyxHQUFvQixPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBRWhELENBQUMsQ0FBQyxPQUFPLENBQUMsNENBQTRDLEVBQUU7UUFDdEQsTUFBTSxDQUFDO1lBQ0wsUUFBUSxFQUFFLE1BQU0sQ0FBQyxTQUFTO1lBQzFCLGVBQWUsRUFBRSxtQkFBYSxDQUFDLFNBQVM7WUFDeEMsV0FBVyxFQUFFLGVBQVMsQ0FBQyxTQUFTO1lBQ2hDLE1BQU0sRUFBRSxVQUFJLENBQUMsU0FBUztZQUN0Qix3QkFBd0IsRUFBRSw0QkFBc0IsQ0FBQyxTQUFTO1lBQzFELE1BQU0sRUFBRSxVQUFJLENBQUMsU0FBUztZQUN0QixrQkFBa0IsRUFBRSxzQkFBZ0IsQ0FBQyxTQUFTO1lBQzlDLHNCQUFzQixFQUFFLDBCQUFvQixDQUFDLFNBQVM7WUFDdEQsT0FBTyxFQUFFLFdBQUssQ0FBQyxTQUFTO1NBQ3pCLENBQUE7SUFDSCxDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsRUFqQlMsS0FBSyxLQUFMLEtBQUssUUFpQmQiLCJmaWxlIjoic2NyaXB0cy9hcHAtY29uZmlndXJhdGlvbi1jb21tb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgZmlicmEge1xuICAndXNlIHN0cmljdCdcbiAgbGV0IG06IGFuZ3VsYXIuSU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdmaWJyYScpXG5cbiAgbS5zZXJ2aWNlKCd3b3JrZXJTZXJ2aWNlUHJvdG90eXBlTWFwcGluZ0NvbmZpZ3VyYXRpb24nLCBmdW5jdGlvbigpOiB7fSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdPYmplY3QnOiBPYmplY3QucHJvdG90eXBlLFxuICAgICAgJ0NvbmZpZ3VyYXRpb24nOiBDb25maWd1cmF0aW9uLnByb3RvdHlwZSxcbiAgICAgICdOYW1lZE5vZGUnOiBOYW1lZE5vZGUucHJvdG90eXBlLFxuICAgICAgJ05vZGUnOiBOb2RlLnByb3RvdHlwZSxcbiAgICAgICdEYXRhTW9kZWxDb25maWd1cmF0aW9uJzogRGF0YU1vZGVsQ29uZmlndXJhdGlvbi5wcm90b3R5cGUsXG4gICAgICAnSXRlbSc6IEl0ZW0ucHJvdG90eXBlLFxuICAgICAgJ1Byb3BlcnR5VG9WYWx1ZXMnOiBQcm9wZXJ0eVRvVmFsdWVzLnByb3RvdHlwZSxcbiAgICAgICdTb3VyY2VkTm9kZVBsdXNMYWJlbCc6IFNvdXJjZWROb2RlUGx1c0xhYmVsLnByb3RvdHlwZSxcbiAgICAgICdVTkRFRic6IFVOREVGLnByb3RvdHlwZVxuICAgIH1cbiAgfSlcbn1cbiJdfQ==

var fibra;
(function (fibra) {
    'use strict';
    var AuthorComponentController = (function () {
        function AuthorComponentController(sparqlItemService) {
            this.sparqlItemService = sparqlItemService;
            this.items = [];
        }
        return AuthorComponentController;
    }());/*<auto_generate>*/angular.module('fibra').controller('AuthorComponentController',['sparqlItemService',function(){return new (Function.prototype.bind.apply(AuthorComponentController,[null].concat(Array.prototype.slice.apply(arguments))));}]);/*</auto_generate>*/
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2FwcC9zY3JpcHRzL2F1dGhvci12aWV3LWNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFVLEtBQUssQ0FjZDtBQWRELFdBQVUsS0FBSyxFQUFDLENBQUM7SUFDZixZQUFZLENBQUE7SUFFWjtRQUVFLG1DQUFvQixpQkFBb0M7WUFBcEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtZQURqRCxVQUFLLEdBQVcsRUFBRSxDQUFBO1FBR3pCLENBQUM7UUFDSCxnQ0FBQztJQUFELENBTEEsQUFLQyxJQUFBO0lBTFksK0JBQXlCLDRCQUtyQyxDQUFBO0lBRUQ7UUFBQTtZQUNXLGVBQVUsR0FBa0QseUJBQXlCLENBQUE7WUFDckYsZ0JBQVcsR0FBVyxzQkFBc0IsQ0FBQTtRQUN2RCxDQUFDO1FBQUQsc0JBQUM7SUFBRCxDQUhBLEFBR0MsSUFBQTtJQUhZLHFCQUFlLGtCQUczQixDQUFBO0FBQ0gsQ0FBQyxFQWRTLEtBQUssS0FBTCxLQUFLLFFBY2QiLCJmaWxlIjoic2NyaXB0cy9hdXRob3Itdmlldy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgZmlicmEge1xuICAndXNlIHN0cmljdCdcblxuICBleHBvcnQgY2xhc3MgQXV0aG9yQ29tcG9uZW50Q29udHJvbGxlciBpbXBsZW1lbnRzIGFuZ3VsYXIuSUNvbXBvbmVudENvbnRyb2xsZXIge1xuICAgIHB1YmxpYyBpdGVtczogSXRlbVtdID0gW11cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNwYXJxbEl0ZW1TZXJ2aWNlOiBTcGFycWxJdGVtU2VydmljZSkge1xuXG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIEF1dGhvckNvbXBvbmVudCBpbXBsZW1lbnRzIGFuZ3VsYXIuSUNvbXBvbmVudE9wdGlvbnMge1xuICAgICAgcHVibGljIGNvbnRyb2xsZXI6IChuZXcgKC4uLmFyZ3M6IGFueVtdKSA9PiBhbmd1bGFyLklDb250cm9sbGVyKSA9IEF1dGhvckNvbXBvbmVudENvbnRyb2xsZXJcbiAgICAgIHB1YmxpYyB0ZW1wbGF0ZVVybDogc3RyaW5nID0gJ3BhcnRpYWxzL2F1dGhvci5odG1sJ1xuICB9XG59XG4iXX0=

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2FwcC9zY3JpcHRzL2NvbGxlY3Rpb24tdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxJQUFVLEtBQUssQ0FrUWQ7QUFsUUQsV0FBVSxLQUFLLEVBQUMsQ0FBQztJQUNmLFlBQVksQ0FBQTtJQUVaO1FBSUUsY0FBc0IsTUFBb0Q7WUFBOUQsc0JBQThELEdBQTlELFNBQXdDLGNBQVEsTUFBTSxDQUFJLEVBQUUsQ0FBQSxDQUFDLENBQUM7WUFBcEQsV0FBTSxHQUFOLE1BQU0sQ0FBOEM7WUFGbkUsTUFBQyxHQUFzQixFQUFFLENBQUE7UUFFNkMsQ0FBQztRQUV2RSxrQkFBRyxHQUFWLFVBQVcsR0FBVztZQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxTQUFTLENBQUE7UUFDbEMsQ0FBQztRQUNNLGtCQUFHLEdBQVYsVUFBVyxHQUFXLEVBQUUsTUFBNEI7WUFDbEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNqQixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtZQUN4RCxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUN0QixDQUFDO1FBQ00sa0JBQUcsR0FBVixVQUFXLEdBQVcsRUFBRSxLQUFRO1lBQzlCLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFBO1lBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUE7UUFDYixDQUFDO1FBQ00sa0JBQUcsR0FBVixVQUFXLEdBQVc7WUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDcEIsQ0FBQztRQUNNLHFCQUFNLEdBQWIsVUFBYyxHQUFXO1lBQ3ZCLElBQUksU0FBUyxHQUFZLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDdEMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ2xCLE1BQU0sQ0FBQyxTQUFTLENBQUE7UUFDbEIsQ0FBQztRQUNNLG1CQUFJLEdBQVgsVUFBWSxHQUFzQjtZQUNoQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUM7Z0JBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7WUFDNUMsTUFBTSxDQUFDLElBQUksQ0FBQTtRQUNiLENBQUM7UUFDTSxtQkFBSSxHQUFYLFVBQVksR0FBYztZQUN4QixHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUM7Z0JBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7WUFDNUMsTUFBTSxDQUFDLElBQUksQ0FBQTtRQUNiLENBQUM7UUFDTSxvQkFBSyxHQUFaO1lBQ0UsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUE7WUFDWCxNQUFNLENBQUMsSUFBSSxDQUFBO1FBQ2IsQ0FBQztRQUNNLG1CQUFJLEdBQVg7WUFDRSxJQUFJLEdBQUcsR0FBYSxFQUFFLENBQUE7WUFDdEIsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ3JDLE1BQU0sQ0FBQyxHQUFHLENBQUE7UUFDWixDQUFDO1FBQ00scUJBQU0sR0FBYjtZQUNFLElBQUksR0FBRyxHQUFRLEVBQUUsQ0FBQTtZQUNqQixHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1lBQzdDLE1BQU0sQ0FBQyxHQUFHLENBQUE7UUFDWixDQUFDO1FBQ00sc0JBQU8sR0FBZDtZQUNFLElBQUksR0FBRyxHQUFnQyxFQUFFLENBQUE7WUFDekMsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBRyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtZQUM3RCxNQUFNLENBQUMsR0FBRyxDQUFBO1FBQ1osQ0FBQztRQUNNLG1CQUFJLEdBQVgsVUFBWSxJQUFtRDtZQUM3RCxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFDOUIsTUFBTSxDQUFDLFNBQVMsQ0FBQTtRQUNsQixDQUFDO1FBQ00sbUJBQUksR0FBWDtZQUNFLElBQUksSUFBSSxHQUFXLENBQUMsQ0FBQTtZQUNwQixxQ0FBcUM7WUFDckMsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFBQyxJQUFJLEVBQUUsQ0FBQTtZQUM5QixvQ0FBb0M7WUFDcEMsTUFBTSxDQUFDLElBQUksQ0FBQTtRQUNiLENBQUM7UUFDTSxvQkFBSyxHQUFaO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFDMUIsQ0FBQztRQUNILFdBQUM7SUFBRCxDQXBFQSxBQW9FQyxJQUFBO0lBcEVZLFVBQUksT0FvRWhCLENBQUE7SUFFRDtRQUFBO1lBQ1MsTUFBQyxHQUFRLEVBQUUsQ0FBQTtRQXlDcEIsQ0FBQztRQXhDUSwyQkFBSyxHQUFaO1lBQ0UsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUE7WUFDWCxNQUFNLENBQUMsSUFBSSxDQUFBO1FBQ2IsQ0FBQztRQUNNLHlCQUFHLEdBQVYsVUFBVyxHQUFNO1lBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO1FBQ25DLENBQUM7UUFDTSx5QkFBRyxHQUFWLFVBQVcsR0FBTTtZQUNmLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQUMsTUFBTSxDQUFDLElBQUksQ0FBQTtZQUM5QixJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUNoQixNQUFNLENBQUMsSUFBSSxDQUFBO1FBQ2IsQ0FBQztRQUNNLDBCQUFJLEdBQVgsVUFBWSxHQUFRO1lBQXBCLGlCQUdDO1lBRkMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQVgsQ0FBVyxDQUFDLENBQUE7WUFDN0IsTUFBTSxDQUFDLElBQUksQ0FBQTtRQUNiLENBQUM7UUFDTSwwQkFBSSxHQUFYLFVBQVksSUFBb0I7WUFBaEMsaUJBR0M7WUFGQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsS0FBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBWCxDQUFXLENBQUMsQ0FBQTtZQUMzQixNQUFNLENBQUMsSUFBSSxDQUFBO1FBQ2IsQ0FBQztRQUNNLDRCQUFNLEdBQWIsVUFBYyxHQUFNO1lBQ2xCLElBQUksS0FBSyxHQUFXLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ3ZDLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFBQyxNQUFNLENBQUMsS0FBSyxDQUFBO1lBQzlCLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQTtZQUN2QixNQUFNLENBQUMsSUFBSSxDQUFBO1FBQ2IsQ0FBQztRQUNNLDBCQUFJLEdBQVgsVUFBWSxJQUE2RDtZQUN2RSxHQUFHLENBQUMsQ0FBYyxVQUFNLEVBQU4sS0FBQSxJQUFJLENBQUMsQ0FBQyxFQUFOLGNBQU0sRUFBTixJQUFNLENBQUM7Z0JBQXBCLElBQUksS0FBSyxTQUFBO2dCQUNaLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFBO2FBQUE7WUFDMUIsTUFBTSxDQUFDLFNBQVMsQ0FBQTtRQUNsQixDQUFDO1FBQ00sMEJBQUksR0FBWDtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQTtRQUN0QixDQUFDO1FBQ00sMkJBQUssR0FBWjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFBO1FBQzFCLENBQUM7UUFDTSw0QkFBTSxHQUFiO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7UUFDZixDQUFDO1FBQ0gsa0JBQUM7SUFBRCxDQTFDQSxBQTBDQyxJQUFBO0lBMUNZLGlCQUFXLGNBMEN2QixDQUFBO0lBRUQ7UUFBQTtZQUNTLE1BQUMsR0FBMkIsRUFBRSxDQUFBO1FBNkN2QyxDQUFDO1FBNUNRLHlCQUFLLEdBQVo7WUFDRSxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtZQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUE7UUFDYixDQUFDO1FBQ00sdUJBQUcsR0FBVixVQUFXLEdBQVc7WUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUyxDQUFBO1FBQ2xDLENBQUM7UUFDTSx1QkFBRyxHQUFWLFVBQVcsR0FBVztZQUNwQixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQTtZQUNqQixNQUFNLENBQUMsSUFBSSxDQUFBO1FBQ2IsQ0FBQztRQUNNLHdCQUFJLEdBQVgsVUFBWSxHQUFhO1lBQXpCLGlCQUdDO1lBRkMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEtBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQWIsQ0FBYSxDQUFDLENBQUE7WUFDakMsTUFBTSxDQUFDLElBQUksQ0FBQTtRQUNiLENBQUM7UUFDTSx3QkFBSSxHQUFYLFVBQVksSUFBWTtZQUF4QixpQkFHQztZQUZDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxLQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFiLENBQWEsQ0FBQyxDQUFBO1lBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUE7UUFDYixDQUFDO1FBQ00sMEJBQU0sR0FBYixVQUFjLEdBQVc7WUFDdkIsSUFBSSxTQUFTLEdBQVksSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUN0QyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDbEIsTUFBTSxDQUFDLFNBQVMsQ0FBQTtRQUNsQixDQUFDO1FBQ00sd0JBQUksR0FBWCxVQUFZLElBQWtFO1lBQzVFLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQTtZQUM5QixNQUFNLENBQUMsU0FBUyxDQUFBO1FBQ2xCLENBQUM7UUFDTSx3QkFBSSxHQUFYO1lBQ0UsSUFBSSxJQUFJLEdBQVcsQ0FBQyxDQUFBO1lBQ3BCLHFDQUFxQztZQUNyQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUFDLElBQUksRUFBRSxDQUFBO1lBQzlCLG9DQUFvQztZQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFBO1FBQ2IsQ0FBQztRQUNNLHlCQUFLLEdBQVo7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUMxQixDQUFDO1FBQ00sMEJBQU0sR0FBYjtZQUNFLElBQUksR0FBRyxHQUFhLEVBQUUsQ0FBQTtZQUN0QixHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDckMsTUFBTSxDQUFDLEdBQUcsQ0FBQTtRQUNaLENBQUM7UUFDSCxnQkFBQztJQUFELENBOUNBLEFBOENDLElBQUE7SUE5Q1ksZUFBUyxZQThDckIsQ0FBQTtJQUVEO1FBQThCLHlCQUFPO1FBRW5DLGVBQVksTUFBNEI7WUFDdEMsa0JBQU0sTUFBTSxDQUFDLENBQUE7WUFGUixNQUFDLEdBQVEsRUFBRSxDQUFBO1FBR2xCLENBQUM7UUFFTSxtQkFBRyxHQUFWLFVBQVcsR0FBVyxFQUFFLE1BQTRCO1lBQ2xELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDakIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7WUFDeEQsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDdEIsQ0FBQztRQUNNLG1CQUFHLEdBQVYsVUFBVyxHQUFXLEVBQUUsS0FBUTtZQUM5QixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixnQkFBSyxDQUFDLEdBQUcsWUFBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUE7Z0JBQ3JCLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQ3BCLENBQUM7WUFDRCxNQUFNLENBQUMsSUFBSSxDQUFBO1FBQ2IsQ0FBQztRQUNNLHNCQUFNLEdBQWIsVUFBYyxHQUFXO1lBQ3ZCLElBQUksS0FBSyxHQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDNUIsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLGdCQUFLLENBQUMsTUFBTSxZQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUNqQixJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtZQUN6QyxDQUFDO1lBQ0QsTUFBTSxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUE7UUFDNUIsQ0FBQztRQUNNLG9CQUFJLEdBQVg7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUE7UUFDdEIsQ0FBQztRQUNNLHNCQUFNLEdBQWI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtRQUNmLENBQUM7UUFDTSxxQkFBSyxHQUFaO1lBQ0UsZ0JBQUssQ0FBQyxLQUFLLFdBQUUsQ0FBQTtZQUNiLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFBO1lBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQTtRQUNiLENBQUM7UUFDSCxZQUFDO0lBQUQsQ0FyQ0EsQUFxQ0MsQ0FyQzZCLElBQUksR0FxQ2pDO0lBckNZLFdBQUssUUFxQ2pCLENBQUE7SUFFRDtRQUFnQyw4QkFBUztRQUF6QztZQUFnQyw4QkFBUztZQUNoQyxNQUFDLEdBQWEsRUFBRSxDQUFBO1FBMEJ6QixDQUFDO1FBeEJRLHdCQUFHLEdBQVYsVUFBVyxHQUFXO1lBQ3BCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLGdCQUFLLENBQUMsR0FBRyxZQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUNkLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ2xCLENBQUM7WUFDRCxNQUFNLENBQUMsSUFBSSxDQUFBO1FBQ2IsQ0FBQztRQUNNLDJCQUFNLEdBQWIsVUFBYyxHQUFXO1lBQ3ZCLElBQUksU0FBUyxHQUFZLGdCQUFLLENBQUMsTUFBTSxZQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQzFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQztnQkFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtZQUN2QyxNQUFNLENBQUMsU0FBUyxDQUFBO1FBQ2xCLENBQUM7UUFDTSx5QkFBSSxHQUFYO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFBO1FBQ3RCLENBQUM7UUFDTSwyQkFBTSxHQUFiO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7UUFDZixDQUFDO1FBQ00sMEJBQUssR0FBWjtZQUNFLGdCQUFLLENBQUMsS0FBSyxXQUFFLENBQUE7WUFDYixJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtZQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUE7UUFDYixDQUFDO1FBQ0gsaUJBQUM7SUFBRCxDQTNCQSxBQTJCQyxDQTNCK0IsU0FBUyxHQTJCeEM7SUEzQlksZ0JBQVUsYUEyQnRCLENBQUE7SUFFRCxhQUF1QixHQUFzQixFQUFFLEdBQVcsRUFBRSxNQUE0QjtRQUN0RixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUyxDQUFDO1lBQ3pCLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFNLEVBQUUsQ0FBQTtRQUN6QyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ2pCLENBQUM7SUFKZSxTQUFHLE1BSWxCLENBQUE7SUFFRCxjQUF3QixHQUFzQixFQUFFLEdBQVcsRUFBRSxHQUFRLEVBQUUsTUFBNEI7UUFDakcsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQU0sRUFBRSxDQUFBO1lBQ3ZDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDcEIsQ0FBQztRQUNELE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDakIsQ0FBQztJQU5lLFVBQUksT0FNbkIsQ0FBQTtJQUVELGVBQXlCLEdBQVEsRUFBRSxHQUFzQixFQUFFLEdBQVcsRUFBRSxLQUFRO1FBQzlFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQzNCLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUE7WUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNqQixDQUFDO0lBQ0gsQ0FBQztJQUxlLFdBQUssUUFLcEIsQ0FBQTtJQUVELGdCQUEwQixHQUFRLEVBQUUsR0FBc0IsRUFBRSxJQUF1QjtRQUNqRixHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUM7WUFBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDdkQsQ0FBQztJQUZlLFlBQU0sU0FFckIsQ0FBQTtBQUVILENBQUMsRUFsUVMsS0FBSyxLQUFMLEtBQUssUUFrUWQiLCJmaWxlIjoic2NyaXB0cy9jb2xsZWN0aW9uLXV0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIGZpYnJhIHtcbiAgJ3VzZSBzdHJpY3QnXG5cbiAgZXhwb3J0IGNsYXNzIEVNYXA8Vj4gaW1wbGVtZW50cyBkMy5NYXA8Vj4ge1xuXG4gICAgcHVibGljIHM6IHtbaWQ6IHN0cmluZ106IFZ9ID0ge31cblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBjcmVhdGU6IChrZXk/OiBzdHJpbmcpID0+IFYgPSAoKSA9PiB7IHJldHVybiA8Vj57fSB9KSB7fVxuXG4gICAgcHVibGljIGhhcyhrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIHRoaXMuc1trZXldICE9PSB1bmRlZmluZWRcbiAgICB9XG4gICAgcHVibGljIGdvYyhrZXk6IHN0cmluZywgY3JlYXRlPzogKGtleT86IHN0cmluZykgPT4gVik6IFYge1xuICAgICAgaWYgKCF0aGlzLmhhcyhrZXkpKVxuICAgICAgICB0aGlzLnNldChrZXksIGNyZWF0ZSA/IGNyZWF0ZShrZXkpIDogdGhpcy5jcmVhdGUoa2V5KSlcbiAgICAgIHJldHVybiB0aGlzLmdldChrZXkpXG4gICAgfVxuICAgIHB1YmxpYyBzZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBWKTogdGhpcyB7XG4gICAgICB0aGlzLnNba2V5XSA9IHZhbHVlXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgICBwdWJsaWMgZ2V0KGtleTogc3RyaW5nKTogViB7XG4gICAgICByZXR1cm4gdGhpcy5zW2tleV1cbiAgICB9XG4gICAgcHVibGljIHJlbW92ZShrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgbGV0IGNvbnRhaW5lZDogYm9vbGVhbiA9IHRoaXMuaGFzKGtleSlcbiAgICAgIGRlbGV0ZSB0aGlzLnNba2V5XVxuICAgICAgcmV0dXJuIGNvbnRhaW5lZFxuICAgIH1cbiAgICBwdWJsaWMgc2V0cyhvYmo6IHtbaWQ6IHN0cmluZ106IFZ9KTogdGhpcyB7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gb2JqKSB0aGlzLnNldChrZXksIG9ialtrZXldKVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gICAgcHVibGljIHNldG0ob2JqOiBkMy5NYXA8Vj4pOiB0aGlzIHtcbiAgICAgIGZvciAobGV0IGtleSBpbiBvYmopIHRoaXMuc2V0KGtleSwgb2JqW2tleV0pXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgICBwdWJsaWMgY2xlYXIoKTogdGhpcyB7XG4gICAgICB0aGlzLnMgPSB7fVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gICAgcHVibGljIGtleXMoKTogc3RyaW5nW10ge1xuICAgICAgbGV0IHJldDogc3RyaW5nW10gPSBbXVxuICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMucykgcmV0LnB1c2goa2V5KVxuICAgICAgcmV0dXJuIHJldFxuICAgIH1cbiAgICBwdWJsaWMgdmFsdWVzKCk6IFZbXSB7XG4gICAgICBsZXQgcmV0OiBWW10gPSBbXVxuICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMucykgcmV0LnB1c2godGhpcy5zW2tleV0pXG4gICAgICByZXR1cm4gcmV0XG4gICAgfVxuICAgIHB1YmxpYyBlbnRyaWVzKCk6IHsga2V5OiBzdHJpbmcsIHZhbHVlOiBWIH1bXSB7XG4gICAgICBsZXQgcmV0OiB7IGtleTogc3RyaW5nLCB2YWx1ZTogViB9W10gPSBbXVxuICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMucykgcmV0LnB1c2goeyBrZXksIHZhbHVlOiB0aGlzLnNba2V5XSB9KVxuICAgICAgcmV0dXJuIHJldFxuICAgIH1cbiAgICBwdWJsaWMgZWFjaChmdW5jOiAodmFsdWU6IFYsIGtleTogc3RyaW5nLCBtYXA6IEVNYXA8Vj4pID0+IHZvaWQpOiB1bmRlZmluZWQge1xuICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMucylcbiAgICAgICAgZnVuYyh0aGlzLnNba2V5XSwga2V5LCB0aGlzKVxuICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH1cbiAgICBwdWJsaWMgc2l6ZSgpOiBudW1iZXIge1xuICAgICAgbGV0IHNpemU6IG51bWJlciA9IDBcbiAgICAgIC8qdHNsaW50OmRpc2FibGUgbm8tdW51c2VkLXZhcmlhYmxlKi9cbiAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLnMpIHNpemUrK1xuICAgICAgLyp0c2xpbnQ6ZW5hYmxlIG5vLXVudXNlZC12YXJpYWJsZSovXG4gICAgICByZXR1cm4gc2l6ZVxuICAgIH1cbiAgICBwdWJsaWMgZW1wdHkoKTogYm9vbGVhbiB7XG4gICAgICByZXR1cm4gdGhpcy5zaXplKCkgPT09IDBcbiAgICB9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgSWRlbnRpdHlTZXQ8Vj4ge1xuICAgIHB1YmxpYyBhOiBWW10gPSBbXVxuICAgIHB1YmxpYyBjbGVhcigpOiB0aGlzIHtcbiAgICAgIHRoaXMuYSA9IFtdXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgICBwdWJsaWMgaGFzKGtleTogVik6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIHRoaXMuYS5pbmRleE9mKGtleSkgIT09IC0xXG4gICAgfVxuICAgIHB1YmxpYyBhZGQoa2V5OiBWKTogdGhpcyB7XG4gICAgICBpZiAodGhpcy5oYXMoa2V5KSkgcmV0dXJuIHRoaXNcbiAgICAgIHRoaXMuYS5wdXNoKGtleSlcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICAgIHB1YmxpYyBhZGRhKGFycjogVltdKTogdGhpcyB7XG4gICAgICBhcnIuZm9yRWFjaCh2ID0+IHRoaXMuYWRkKHYpKVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gICAgcHVibGljIGFkZHMob3NldDogSWRlbnRpdHlTZXQ8Vj4pOiB0aGlzIHtcbiAgICAgIG9zZXQuZWFjaCh2ID0+IHRoaXMuYWRkKHYpKVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gICAgcHVibGljIHJlbW92ZShrZXk6IFYpOiBib29sZWFuIHtcbiAgICAgIGxldCBpbmRleDogbnVtYmVyID0gdGhpcy5hLmluZGV4T2Yoa2V5KVxuICAgICAgaWYgKGluZGV4ID09PSAtMSkgcmV0dXJuIGZhbHNlXG4gICAgICB0aGlzLmEuc3BsaWNlKGluZGV4LCAxKVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgcHVibGljIGVhY2goZnVuYzogKHZhbHVlOiBWLCB2YWx1ZVJlcGVhdDogViwgc2V0OiBJZGVudGl0eVNldDxWPikgPT4gdm9pZCk6IHVuZGVmaW5lZCB7XG4gICAgICBmb3IgKGxldCB2YWx1ZSBvZiB0aGlzLmEpXG4gICAgICAgIGZ1bmModmFsdWUsIHZhbHVlLCB0aGlzKVxuICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH1cbiAgICBwdWJsaWMgc2l6ZSgpOiBudW1iZXIge1xuICAgICAgcmV0dXJuIHRoaXMuYS5sZW5ndGhcbiAgICB9XG4gICAgcHVibGljIGVtcHR5KCk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIHRoaXMuc2l6ZSgpID09PSAwXG4gICAgfVxuICAgIHB1YmxpYyB2YWx1ZXMoKTogVltdIHtcbiAgICAgIHJldHVybiB0aGlzLmFcbiAgICB9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgU3RyaW5nU2V0IGltcGxlbWVudHMgZDMuU2V0IHtcbiAgICBwdWJsaWMgczoge1tpZDogc3RyaW5nXTogc3RyaW5nfSA9IHt9XG4gICAgcHVibGljIGNsZWFyKCk6IHRoaXMge1xuICAgICAgdGhpcy5zID0ge31cbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICAgIHB1YmxpYyBoYXMoa2V5OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgIHJldHVybiB0aGlzLnNba2V5XSAhPT0gdW5kZWZpbmVkXG4gICAgfVxuICAgIHB1YmxpYyBhZGQoa2V5OiBzdHJpbmcpOiB0aGlzIHtcbiAgICAgIHRoaXMuc1trZXldID0ga2V5XG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgICBwdWJsaWMgYWRkYShhcnI6IHN0cmluZ1tdKTogdGhpcyB7XG4gICAgICBhcnIuZm9yRWFjaChzdHIgPT4gdGhpcy5hZGQoc3RyKSlcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICAgIHB1YmxpYyBhZGRzKG9zZXQ6IGQzLlNldCk6IHRoaXMge1xuICAgICAgb3NldC5lYWNoKHN0ciA9PiB0aGlzLmFkZChzdHIpKVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gICAgcHVibGljIHJlbW92ZShrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgbGV0IGNvbnRhaW5lZDogYm9vbGVhbiA9IHRoaXMuaGFzKGtleSlcbiAgICAgIGRlbGV0ZSB0aGlzLnNba2V5XVxuICAgICAgcmV0dXJuIGNvbnRhaW5lZFxuICAgIH1cbiAgICBwdWJsaWMgZWFjaChmdW5jOiAodmFsdWU6IHN0cmluZywgdmFsdWVSZXBlYXQ6IHN0cmluZywgc2V0OiBTdHJpbmdTZXQpID0+IHZvaWQpOiB1bmRlZmluZWQge1xuICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMucylcbiAgICAgICAgZnVuYyh0aGlzLnNba2V5XSwga2V5LCB0aGlzKVxuICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH1cbiAgICBwdWJsaWMgc2l6ZSgpOiBudW1iZXIge1xuICAgICAgbGV0IHNpemU6IG51bWJlciA9IDBcbiAgICAgIC8qdHNsaW50OmRpc2FibGUgbm8tdW51c2VkLXZhcmlhYmxlKi9cbiAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLnMpIHNpemUrK1xuICAgICAgLyp0c2xpbnQ6ZW5hYmxlIG5vLXVudXNlZC12YXJpYWJsZSovXG4gICAgICByZXR1cm4gc2l6ZVxuICAgIH1cbiAgICBwdWJsaWMgZW1wdHkoKTogYm9vbGVhbiB7XG4gICAgICByZXR1cm4gdGhpcy5zaXplKCkgPT09IDBcbiAgICB9XG4gICAgcHVibGljIHZhbHVlcygpOiBzdHJpbmdbXSB7XG4gICAgICBsZXQgcmV0OiBzdHJpbmdbXSA9IFtdXG4gICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5zKSByZXQucHVzaChrZXkpXG4gICAgICByZXR1cm4gcmV0XG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIEVPTWFwPFY+IGV4dGVuZHMgRU1hcDxWPiB7XG4gICAgcHVibGljIGE6IFZbXSA9IFtdXG4gICAgY29uc3RydWN0b3IoY3JlYXRlPzogKGtleT86IHN0cmluZykgPT4gVikge1xuICAgICAgc3VwZXIoY3JlYXRlKVxuICAgIH1cblxuICAgIHB1YmxpYyBnb2Moa2V5OiBzdHJpbmcsIGNyZWF0ZT86IChrZXk/OiBzdHJpbmcpID0+IFYpOiBWIHtcbiAgICAgIGlmICghdGhpcy5oYXMoa2V5KSlcbiAgICAgICAgdGhpcy5zZXQoa2V5LCBjcmVhdGUgPyBjcmVhdGUoa2V5KSA6IHRoaXMuY3JlYXRlKGtleSkpXG4gICAgICByZXR1cm4gdGhpcy5nZXQoa2V5KVxuICAgIH1cbiAgICBwdWJsaWMgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogVik6IHRoaXMge1xuICAgICAgaWYgKCF0aGlzLmhhcyhrZXkpKSB7XG4gICAgICAgIHN1cGVyLnNldChrZXksIHZhbHVlKVxuICAgICAgICB0aGlzLmEucHVzaCh2YWx1ZSlcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICAgIHB1YmxpYyByZW1vdmUoa2V5OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgIGxldCB2YWx1ZTogViA9IHRoaXMuZ2V0KGtleSlcbiAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHN1cGVyLnJlbW92ZShrZXkpXG4gICAgICAgIHRoaXMuYS5zcGxpY2UodGhpcy5hLmluZGV4T2YodmFsdWUpLCAxKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWRcbiAgICB9XG4gICAgcHVibGljIHNpemUoKTogbnVtYmVyIHtcbiAgICAgIHJldHVybiB0aGlzLmEubGVuZ3RoXG4gICAgfVxuICAgIHB1YmxpYyB2YWx1ZXMoKTogVltdIHtcbiAgICAgIHJldHVybiB0aGlzLmFcbiAgICB9XG4gICAgcHVibGljIGNsZWFyKCk6IHRoaXMge1xuICAgICAgc3VwZXIuY2xlYXIoKVxuICAgICAgdGhpcy5hID0gW11cbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIE9TdHJpbmdTZXQgZXh0ZW5kcyBTdHJpbmdTZXQge1xuICAgIHB1YmxpYyBhOiBzdHJpbmdbXSA9IFtdXG5cbiAgICBwdWJsaWMgYWRkKGtleTogc3RyaW5nKTogdGhpcyB7XG4gICAgICBpZiAoIXRoaXMuaGFzKGtleSkpIHtcbiAgICAgICAgc3VwZXIuYWRkKGtleSlcbiAgICAgICAgdGhpcy5hLnB1c2goa2V5KVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gICAgcHVibGljIHJlbW92ZShrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgbGV0IGNvbnRhaW5lZDogYm9vbGVhbiA9IHN1cGVyLnJlbW92ZShrZXkpXG4gICAgICBpZiAoY29udGFpbmVkKVxuICAgICAgICB0aGlzLmEuc3BsaWNlKHRoaXMuYS5pbmRleE9mKGtleSksIDEpXG4gICAgICByZXR1cm4gY29udGFpbmVkXG4gICAgfVxuICAgIHB1YmxpYyBzaXplKCk6IG51bWJlciB7XG4gICAgICByZXR1cm4gdGhpcy5hLmxlbmd0aFxuICAgIH1cbiAgICBwdWJsaWMgdmFsdWVzKCk6IHN0cmluZ1tdIHtcbiAgICAgIHJldHVybiB0aGlzLmFcbiAgICB9XG4gICAgcHVibGljIGNsZWFyKCk6IHRoaXMge1xuICAgICAgc3VwZXIuY2xlYXIoKVxuICAgICAgdGhpcy5hID0gW11cbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGdvYzxWPihvYmo6IHtbaWQ6IHN0cmluZ106IFZ9LCBrZXk6IHN0cmluZywgY3JlYXRlPzogKGtleT86IHN0cmluZykgPT4gVik6IFYge1xuICAgIGlmIChvYmpba2V5XSA9PT0gdW5kZWZpbmVkKVxuICAgICAgb2JqW2tleV0gPSBjcmVhdGUgPyBjcmVhdGUoa2V5KSA6IDxWPnt9XG4gICAgcmV0dXJuIG9ialtrZXldXG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gb2dvYzxWPihvYmo6IHtbaWQ6IHN0cmluZ106IFZ9LCBrZXk6IHN0cmluZywgYXJyOiBWW10sIGNyZWF0ZT86IChrZXk/OiBzdHJpbmcpID0+IFYpOiBWIHtcbiAgICBpZiAob2JqW2tleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgb2JqW2tleV0gPSBjcmVhdGUgPyBjcmVhdGUoa2V5KSA6IDxWPnt9XG4gICAgICBhcnIucHVzaChvYmpba2V5XSlcbiAgICB9XG4gICAgcmV0dXJuIG9ialtrZXldXG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gY3B1c2g8Vj4oYXJyOiBWW10sIG9iajoge1tpZDogc3RyaW5nXTogVn0sIGtleTogc3RyaW5nLCB2YWx1ZTogVik6IHZvaWQge1xuICAgIGlmIChvYmpba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBvYmpba2V5XSA9IHZhbHVlXG4gICAgICBhcnIucHVzaCh2YWx1ZSlcbiAgICB9XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gY3B1c2hzPFY+KGFycjogVltdLCBvYmo6IHtbaWQ6IHN0cmluZ106IFZ9LCBvYmoyOiB7W2lkOiBzdHJpbmddOiBWfSk6IHZvaWQge1xuICAgIGZvciAobGV0IGtleSBpbiBvYmoyKSBjcHVzaChhcnIsIG9iaiwga2V5LCBvYmoyW2tleV0pXG4gIH1cblxufVxuIl19

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var fibra;
(function (fibra) {
    'use strict';
    var Configuration = (function () {
        function Configuration(id, name) {
            this.id = id;
            this.name = name;
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
        function ConfigurationService(workerService, $localStorage) {
            this.workerService = workerService;
            this.$localStorage = $localStorage;
            this.configuration = $localStorage['configuration'];
            if (this.configuration) {
                this.configuration['__proto__'] = Configuration.prototype;
                this.workerService.callAll('configurationWorkerService', 'setConfiguration', [this.configuration]);
            }
        }
        ConfigurationService.prototype.setConfiguration = function (configuration) {
            this.$localStorage['configuration'] = configuration;
            this.configuration = configuration;
            this.workerService.callAll('configurationWorkerService', 'setConfiguration', [configuration]);
        };
        return ConfigurationService;
    }());/*<auto_generate>*/angular.module('fibra').service('configurationService',['workerService','$localStorage',function(){return new (Function.prototype.bind.apply(ConfigurationService,[null].concat(Array.prototype.slice.apply(arguments))));}]);/*</auto_generate>*/
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2FwcC9zY3JpcHRzL2NvbmZpZ3VyYXRpb24tc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLElBQVUsS0FBSyxDQXVGZDtBQXZGRCxXQUFVLEtBQUssRUFBQyxDQUFDO0lBQ2YsWUFBWSxDQUFBO0lBRVY7UUFZRSx1QkFBbUIsRUFBVSxFQUFTLElBQVk7WUFBL0IsT0FBRSxHQUFGLEVBQUUsQ0FBUTtZQUFTLFNBQUksR0FBSixJQUFJLENBQVE7WUFYM0Msc0JBQWlCLEdBQVcsTUFBTSxDQUFBO1lBRWxDLHVCQUFrQixHQUE0QixFQUFFLENBQUE7WUFDaEQscUJBQWdCLEdBQTRCLEVBQUUsQ0FBQTtZQUM5QyxpQ0FBNEIsR0FBMkIsSUFBSSxzQkFBc0IsRUFBRSxDQUFBO1lBS25GLG9CQUFlLEdBQVcsdUJBQWlCLENBQUMsZUFBZSxDQUFBO1lBQzNELGFBQVEsR0FBVyxFQUFFLENBQUE7UUFDeUIsQ0FBQztRQUMvQyxvQ0FBWSxHQUFuQjtZQUNFLElBQUksWUFBWSxHQUE0QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO1lBQ2pHLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFBO1lBQ3ZDLE1BQU0sQ0FBQyxZQUFZLENBQUE7UUFDckIsQ0FBQztRQUNNLHVDQUFlLEdBQXRCO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUE7UUFDOUQsQ0FBQztRQUNILG9CQUFDO0lBQUQsQ0FyQkEsQUFxQkMsSUFBQTtJQXJCWSxtQkFBYSxnQkFxQnpCLENBQUE7SUFFRDtRQU9FLCtCQUFtQixFQUFVLEVBQVMsS0FBYSxFQUFTLFFBQWUsRUFBRSxhQUEyQjtZQUEzQiw2QkFBMkIsR0FBM0Isa0JBQTJCO1lBQXJGLE9BQUUsR0FBRixFQUFFLENBQVE7WUFBUyxV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LGFBQWEsQ0FBQTtZQUNsQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyw0QkFBNEIsRUFBRSxrQkFBa0IsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUE7UUFDL0YsQ0FBQztRQVFILDJCQUFDO0lBQUQsQ0FkQSxBQWNDLElBQUE7SUFkWSwwQkFBb0IsdUJBY2hDLENBQUE7SUFFRDtRQUFBO1FBS0EsQ0FBQztRQUhRLHFEQUFnQixHQUF2QixVQUF3QixhQUE0QjtZQUNsRCxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQTtRQUNwQyxDQUFDO1FBQ0gsaUNBQUM7SUFBRCxDQUxBLEFBS0MsSUFBQTtJQUxZLGdDQUEwQiw2QkFLdEMsQ0FBQTtBQUVILENBQUMsRUF2RlMsS0FBSyxLQUFMLEtBQUssUUF1RmQiLCJmaWxlIjoic2NyaXB0cy9jb25maWd1cmF0aW9uLXNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgZmlicmEge1xuICAndXNlIHN0cmljdCdcblxuICAgIGV4cG9ydCBjbGFzcyBDb25maWd1cmF0aW9uIHtcbiAgICAgIHB1YmxpYyBwcmVmZXJyZWRMYW5ndWFnZTogc3RyaW5nID0gJ1wiZW5cIidcbiAgICAgIHB1YmxpYyBwcmltYXJ5RW5kcG9pbnQ6IFByaW1hcnlFbmRwb2ludENvbmZpZ3VyYXRpb25cbiAgICAgIHB1YmxpYyBhdXRob3JpdHlFbmRwb2ludHM6IEVuZHBvaW50Q29uZmlndXJhdGlvbltdID0gW11cbiAgICAgIHB1YmxpYyBhcmNoaXZlRW5kcG9pbnRzOiBFbmRwb2ludENvbmZpZ3VyYXRpb25bXSA9IFtdXG4gICAgICBwdWJsaWMgZ2xvYmFsRGF0YU1vZGVsQ29uZmlndXJhdGlvbjogRGF0YU1vZGVsQ29uZmlndXJhdGlvbiA9IG5ldyBEYXRhTW9kZWxDb25maWd1cmF0aW9uKClcbiAgICAgIHB1YmxpYyBpbnN0YW5jZU5TOiBzdHJpbmdcbiAgICAgIHB1YmxpYyBpbnN0YW5jZUdyYXBoOiBzdHJpbmdcbiAgICAgIHB1YmxpYyBzY2hlbWFOUzogc3RyaW5nXG4gICAgICBwdWJsaWMgc2NoZW1hR3JhcGg6IHN0cmluZ1xuICAgICAgcHVibGljIGRlbGV0ZUl0ZW1RdWVyeTogc3RyaW5nID0gU3BhcnFsSXRlbVNlcnZpY2UuZGVsZXRlSXRlbVF1ZXJ5XG4gICAgICBwdWJsaWMgcHJlZml4ZXM6IHN0cmluZyA9ICcnXG4gICAgICBjb25zdHJ1Y3RvcihwdWJsaWMgaWQ6IHN0cmluZywgcHVibGljIG5hbWU6IHN0cmluZykge31cbiAgICAgIHB1YmxpYyBhbGxFbmRwb2ludHMoKTogRW5kcG9pbnRDb25maWd1cmF0aW9uW10ge1xuICAgICAgICBsZXQgYWxsRW5kcG9pbnRzOiBFbmRwb2ludENvbmZpZ3VyYXRpb25bXSA9IHRoaXMuYXJjaGl2ZUVuZHBvaW50cy5jb25jYXQodGhpcy5hdXRob3JpdHlFbmRwb2ludHMpXG4gICAgICAgIGFsbEVuZHBvaW50cy5wdXNoKHRoaXMucHJpbWFyeUVuZHBvaW50KVxuICAgICAgICByZXR1cm4gYWxsRW5kcG9pbnRzXG4gICAgICB9XG4gICAgICBwdWJsaWMgcmVtb3RlRW5kcG9pbnRzKCk6IEVuZHBvaW50Q29uZmlndXJhdGlvbltdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXJjaGl2ZUVuZHBvaW50cy5jb25jYXQodGhpcy5hdXRob3JpdHlFbmRwb2ludHMpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIEVuZHBvaW50Q29uZmlndXJhdGlvbiB7XG4gICAgICBwdWJsaWMgY2xhc3M6IHN0cmluZyA9ICcnXG4gICAgICBwdWJsaWMgYXV0b2NvbXBsZXRpb25UZXh0TWF0Y2hRdWVyeVRlbXBsYXRlOiBzdHJpbmcgPSBTcGFycWxBdXRvY29tcGxldGVTZXJ2aWNlLmRlZmF1bHRNYXRjaFF1ZXJ5VGVtcGxhdGVcbiAgICAgIHB1YmxpYyB0cmVlUXVlcnlUZW1wbGF0ZTogc3RyaW5nID0gU3BhcnFsVHJlZVNlcnZpY2UuZ2V0Q2xhc3NUcmVlUXVlcnlcbiAgICAgIHB1YmxpYyBsb2NhbEl0ZW1RdWVyeVRlbXBsYXRlOiBzdHJpbmcgPSBTcGFycWxJdGVtU2VydmljZS5nZXRMb2NhbEl0ZW1Qcm9wZXJ0aWVzUXVlcnlcbiAgICAgIHB1YmxpYyByZW1vdGVJdGVtUXVlcnlUZW1wbGF0ZTogc3RyaW5nID0gU3BhcnFsSXRlbVNlcnZpY2UuZ2V0UmVtb3RlSXRlbVByb3BlcnRpZXNRdWVyeVxuICAgICAgcHVibGljIGRhdGFNb2RlbENvbmZpZ3VyYXRpb246IERhdGFNb2RlbENvbmZpZ3VyYXRpb24gPSBuZXcgRGF0YU1vZGVsQ29uZmlndXJhdGlvbigpXG4gICAgICBjb25zdHJ1Y3RvcihwdWJsaWMgaWQ6IHN0cmluZywgcHVibGljIHRpdGxlOiBzdHJpbmcsIHB1YmxpYyBlbmRwb2ludDogSU5vZGUsIHNlbGVjdGVkVHlwZXM6IElOb2RlW10gPSBbXSkge1xuICAgICAgICB0aGlzLmRhdGFNb2RlbENvbmZpZ3VyYXRpb24uc2V0U2VsZWN0ZWRUeXBlcyhzZWxlY3RlZFR5cGVzKVxuICAgICAgfVxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBQcmltYXJ5RW5kcG9pbnRDb25maWd1cmF0aW9uIGV4dGVuZHMgRW5kcG9pbnRDb25maWd1cmF0aW9uIHtcbiAgICAgIGNvbnN0cnVjdG9yKGlkOiBzdHJpbmcsIHRpdGxlOiBzdHJpbmcsIGVuZHBvaW50OiBJTm9kZSwgcHVibGljIHVwZGF0ZUVuZHBvaW50OiBJTm9kZSA9IGVuZHBvaW50KSB7XG4gICAgICAgIHN1cGVyKGlkLCB0aXRsZSwgZW5kcG9pbnQpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIERhdGFNb2RlbENvbmZpZ3VyYXRpb24ge1xuICAgICAgcHVibGljIHR5cGVDb25zdHJhaW50czogc3RyaW5nID0gJydcbiAgICAgIHB1YmxpYyB0eXBlVHJlZTogVHJlZU5vZGVbXSA9IFtdXG4gICAgICBwdWJsaWMgc2VsZWN0ZWRUeXBlczogSU5vZGVbXSA9IFtdXG4gICAgICBwdWJsaWMgcHJvcGVydGllczogSU5vZGVbXSA9IFtdXG4gICAgICBwdWJsaWMgc2VsZWN0ZWRQcm9wZXJ0aWVzOiBJTm9kZVtdID0gW11cbiAgICAgIHB1YmxpYyBwcm9wZXJ0eVByb3BlcnR5TWFwOiB7W2lkOiBzdHJpbmddOiBJU291cmNlZE5vZGVbXSB9ID0ge31cbiAgICAgIHB1YmxpYyB0eXBlVHlwZU1hcDoge1tpZDogc3RyaW5nXTogSVNvdXJjZWROb2RlW10gfSA9IHt9XG4gICAgICBwdWJsaWMgc2V0U2VsZWN0ZWRUeXBlcyhzZWxlY3RlZFR5cGVzOiBJTm9kZVtdKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUeXBlcyA9IHNlbGVjdGVkVHlwZXNcbiAgICAgICAgdGhpcy51cGRhdGVGaWx0ZXIoKVxuICAgICAgfVxuICAgICAgcHJpdmF0ZSB1cGRhdGVGaWx0ZXIoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkVHlwZXMubGVuZ3RoID09PSAwKVxuICAgICAgICAgIHRoaXMudHlwZUNvbnN0cmFpbnRzID0gJydcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHRoaXMudHlwZUNvbnN0cmFpbnRzID0gJ0ZJTFRFUiAoP2dyb3VwSWQgSU4gKCcgKyB0aGlzLnNlbGVjdGVkVHlwZXMubWFwKGlkID0+IGlkLnRvQ2Fub25pY2FsKCkpLmpvaW4oJywgJykgKyAnKSknXG4gICAgICB9XG4gICAgfVxuXG4gIGV4cG9ydCBjbGFzcyBDb25maWd1cmF0aW9uU2VydmljZSB7XG4gICAgcHVibGljIGNvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRpb25cbiAgICBwdWJsaWMgc2V0Q29uZmlndXJhdGlvbihjb25maWd1cmF0aW9uOiBDb25maWd1cmF0aW9uKTogdm9pZCB7XG4gICAgICB0aGlzLiRsb2NhbFN0b3JhZ2VbJ2NvbmZpZ3VyYXRpb24nXSA9IGNvbmZpZ3VyYXRpb25cbiAgICAgIHRoaXMuY29uZmlndXJhdGlvbiA9IGNvbmZpZ3VyYXRpb25cbiAgICAgIHRoaXMud29ya2VyU2VydmljZS5jYWxsQWxsKCdjb25maWd1cmF0aW9uV29ya2VyU2VydmljZScsICdzZXRDb25maWd1cmF0aW9uJywgW2NvbmZpZ3VyYXRpb25dKVxuICAgIH1cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHdvcmtlclNlcnZpY2U6IFdvcmtlclNlcnZpY2UsIHByaXZhdGUgJGxvY2FsU3RvcmFnZTogYW55KSB7XG4gICAgICB0aGlzLmNvbmZpZ3VyYXRpb24gPSAkbG9jYWxTdG9yYWdlWydjb25maWd1cmF0aW9uJ11cbiAgICAgIGlmICh0aGlzLmNvbmZpZ3VyYXRpb24pIHtcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uWydfX3Byb3RvX18nXSA9IENvbmZpZ3VyYXRpb24ucHJvdG90eXBlXG4gICAgICAgIHRoaXMud29ya2VyU2VydmljZS5jYWxsQWxsKCdjb25maWd1cmF0aW9uV29ya2VyU2VydmljZScsICdzZXRDb25maWd1cmF0aW9uJywgW3RoaXMuY29uZmlndXJhdGlvbl0pXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRpb25Xb3JrZXJTZXJ2aWNlIHtcbiAgICBwdWJsaWMgY29uZmlndXJhdGlvbjogQ29uZmlndXJhdGlvblxuICAgIHB1YmxpYyBzZXRDb25maWd1cmF0aW9uKGNvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRpb24pOiB2b2lkIHtcbiAgICAgIHRoaXMuY29uZmlndXJhdGlvbiA9IGNvbmZpZ3VyYXRpb25cbiAgICB9XG4gIH1cblxufVxuIl19

var fibra;
(function (fibra) {
    'use strict';
    var ConfigureViewComponentController = (function () {
        function ConfigureViewComponentController(configurationService, $state) {
            this.configurationService = configurationService;
            this.$state = $state;
            this.configurations = [];
            var c = new fibra.Configuration('all', 'All Datasources');
            c.primaryEndpoint = new fibra.PrimaryEndpointConfiguration('local', 'Local', new fibra.NamedNode('http://ldf.fi/fibra/sparql'), new fibra.NamedNode('http://ldf.fi/fibra/sparql'));
            c.primaryEndpoint.localItemQueryTemplate = c.primaryEndpoint.localItemQueryTemplate.replace(/GRAPH <GRAPH>/g, 'GRAPH <http://ldf.fi/fibra/all/>');
            c.primaryEndpoint.autocompletionTextMatchQueryTemplate = c.primaryEndpoint.autocompletionTextMatchQueryTemplate.replace(/GRAPH <GRAPH>/g, 'GRAPH <http://ldf.fi/fibra/all/>');
            var gettyAutocompletionQueryTemplate = "PREFIX skos: <http://www.w3.org/2004/02/skos/core#>\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\nPREFIX luc: <http://www.ontotext.com/owlim/lucene#>\nPREFIX gvp: <http://vocab.getty.edu/ontology#>\nPREFIX aat: <http://vocab.getty.edu/aat/>\nPREFIX tgn: <http://vocab.getty.edu/tgn/>\nSELECT ?groupId ?groupLabel ?id ?prefLabel ?matchedLabel ?sameAs ?altLabel {\n  {\n    SELECT ?id ?matchedLabel {\n      BIND(CONCAT(REPLACE(<QUERY>,\"([\\\\+\\\\-\\\\&\\\\|\\\\!\\\\(\\\\)\\\\{\\\\}\\\\[\\\\]\\\\^\\\\\\\"\\\\~\\\\*\\\\?\\\\:\\\\/\\\\\\\\])\",\"\\\\$1\"),\"*\") AS ?query)\n      ?id luc:term ?query .\n      # CONSTRAINTS\n      ?id rdfs:label ?matchedLabel .\n    } LIMIT <LIMIT>\n  } UNION {\n    BIND(CONCAT(\"\\\"\",REPLACE(<QUERY>,\"([\\\\+\\\\-\\\\&\\\\|\\\\!\\\\(\\\\)\\\\{\\\\}\\\\[\\\\]\\\\^\\\\\\\"\\\\~\\\\*\\\\?\\\\:\\\\/\\\\\\\\])\",\"\\\\$1\"),\"\\\"\") AS ?query)\n    ?id luc:term ?query .\n    # CONSTRAINTS\n    ?id rdfs:label ?matchedLabel .\n    FILTER (LCASE(?matchedLabel)=LCASE(<QUERY>))\n  }\n  ?id skos:inScheme <SCHEME> .\n  FILTER (REGEX(LCASE(?matchedLabel),CONCAT(\"\\\\b\",LCASE(<QUERY>))))\n  ?id a ?groupId .\n  ?groupId rdfs:label ?groupLabel .\n  {\n    ?id gvp:prefLabelGVP [xl:literalForm ?prefLabel] .\n  } UNION {\n    ?id skos:exactMatch ?sameAs .\n  }\n}";
            var ulanConfiguration = new fibra.EndpointConfiguration('ulan', 'ULAN', new fibra.NamedNode('http://ldf.fi/corsproxy/vocab.getty.edu/sparql'), [fibra.GETTY.PersonConcept, fibra.GETTY.GroupConcept]);
            ulanConfiguration.autocompletionTextMatchQueryTemplate = gettyAutocompletionQueryTemplate.replace(/<SCHEME>/g, 'ulan:');
            var tgnConfiguration = new fibra.EndpointConfiguration('tgn', 'TGN', new fibra.NamedNode('http://ldf.fi/corsproxy/vocab.getty.edu/sparql'), [fibra.GETTY.AdminPlaceConcept, fibra.GETTY.PhysAdminPlaceConcept]);
            tgnConfiguration.autocompletionTextMatchQueryTemplate = gettyAutocompletionQueryTemplate.replace(/<SCHEME>/g, 'tgn:');
            var viafConfiguration = new fibra.EndpointConfiguration('viaf', 'VIAF', new fibra.NamedNode('http://ldf.fi/viaf/sparql'));
            viafConfiguration.autocompletionTextMatchQueryTemplate = viafConfiguration.autocompletionTextMatchQueryTemplate.replace(/# ADDITIONALSELECT/g, "\nUNION {\n  ?id dcterms:identifier ?rid .\n  FILTER(STRSTARTS(?rid,\"LC|n\"))\n  BIND(IRI(REPLACE(?rid, \"^LC\\\\|n *\",\"http://id.loc.gov/authorities/names/n\")) AS ?sameAs)\n}");
            c.authorityEndpoints = [
                ulanConfiguration,
                new fibra.EndpointConfiguration('lcnames', 'LC Names', new fibra.NamedNode('http://ldf.fi/lcnames/sparql')),
                viafConfiguration,
                tgnConfiguration,
                new fibra.EndpointConfiguration('geonames', 'GeoNames', new fibra.NamedNode('http://ldf.fi/geonames/sparql'))
            ];
            c.authorityEndpoints.forEach(function (e, i) { return e.class = 'source' + i; });
            var emloConfiguration = new fibra.EndpointConfiguration('emlo', 'EMLO', new fibra.NamedNode('http://ldf.fi/emlo/sparql'), [fibra.CIDOC.Person, fibra.CIDOC.Place, fibra.CIDOC.Group]);
            emloConfiguration.autocompletionTextMatchQueryTemplate = emloConfiguration.autocompletionTextMatchQueryTemplate.replace(/\{ # ADDITIONALVARIABLES/g, '?ifpWikipediaPage ?ifpODBNId {').replace(/# ADDITIONALSELECT/g, "\nUNION {\n  {\n    ?id <http://emlo.bodleian.ox.ac.uk/schema#cofk_union_relationship_type-is_related_to> ?ref .\n    FILTER(REGEX(STR(?ref),'http://..\\\\.wikipedia\\\\.org/wiki/'))\n    BIND(?ref AS ?ifpWikipediaPage)\n  } UNION {\n    ?id <http://emlo.bodleian.ox.ac.uk/schema#cofk_union_relationship_type-is_related_to> ?ref .\n    FILTER(STRSTARTS(STR(?ref),'http://www.oxforddnb.com/view/article/'))\n    BIND(REPLACE(STR(?ref),'http://www.oxforddnb.com/view/article/([^?]*).*','$1') AS ?ifpODBNId)\n  }\n}");
            var sdfbConfiguration = new fibra.EndpointConfiguration('sdfb', 'SDFB', new fibra.NamedNode('http://ldf.fi/sdfb/sparql'), [fibra.CIDOC.Person, fibra.CIDOC.Place, fibra.CIDOC.Group]);
            sdfbConfiguration.autocompletionTextMatchQueryTemplate = sdfbConfiguration.autocompletionTextMatchQueryTemplate.replace(/\{ # ADDITIONALVARIABLES/g, '?ifpODBNId {').replace(/# ADDITIONALSELECT/g, "\nUNION {\n  ?id <http://ldf.fi/sdfb/schema#odbnId> ?ifpODBNId .\n}\n");
            var procopeConfiguration = new fibra.EndpointConfiguration('procope', 'Procope', new fibra.NamedNode('http://ldf.fi/procope/sparql'), [fibra.CIDOC.Person, fibra.CIDOC.Place, fibra.CIDOC.Group]);
            procopeConfiguration.autocompletionTextMatchQueryTemplate = procopeConfiguration.autocompletionTextMatchQueryTemplate.replace(/\{ # ADDITIONALVARIABLES/g, '?ifpWikipediaPage {').replace(/# ADDITIONALSELECT/g, "\nUNION {\n  ?id <http://ldf.fi/procope-schema#wikipediaUrl> ?ref .\n  BIND(IRI(?ref) AS ?ifpWikipediaPage)\n}\n");
            c.archiveEndpoints = [
                sdfbConfiguration,
                emloConfiguration,
                procopeConfiguration,
                new fibra.EndpointConfiguration('fbtee', 'FBTEE', new fibra.NamedNode('http://ldf.fi/fbtee/sparql'), [fibra.CIDOC.Person, fibra.CIDOC.Place, fibra.CIDOC.Group]),
                new fibra.EndpointConfiguration('schoenberg', 'Schoenberg', new fibra.NamedNode('http://ldf.fi/schoenberg/sparql'), [fibra.CIDOC.Person, fibra.CIDOC.Place, fibra.CIDOC.Group])
            ];
            c.archiveEndpoints.forEach(function (e, i) { return e.class = 'source' + (c.authorityEndpoints.length + i); });
            c.instanceNS = 'http://ldf.fi/fibra/';
            c.instanceGraph = 'http://ldf.fi/fibra/main/';
            c.schemaNS = 'http://ldf.fi/fibra/schema#';
            c.schemaGraph = 'http://ldf.fi/fibra/schema#';
            this.configurations.push(c);
            c = new fibra.Configuration('fbtee', 'French Book Trade in Enlightenment Europe');
            c.primaryEndpoint = new fibra.PrimaryEndpointConfiguration('local', 'Local', new fibra.NamedNode('http://ldf.fi/fibra/sparql'), new fibra.NamedNode('http://ldf.fi/fibra/sparql'));
            c.primaryEndpoint.localItemQueryTemplate = c.primaryEndpoint.localItemQueryTemplate.replace(/GRAPH <GRAPH>/g, 'GRAPH <http://ldf.fi/fibra/fbtee/>');
            c.primaryEndpoint.autocompletionTextMatchQueryTemplate = c.primaryEndpoint.autocompletionTextMatchQueryTemplate.replace(/GRAPH <GRAPH>/g, 'GRAPH <http://ldf.fi/fibra/fbtee/>');
            c.authorityEndpoints = [
                ulanConfiguration,
                viafConfiguration,
                tgnConfiguration,
                new fibra.EndpointConfiguration('geonames', 'GeoNames', new fibra.NamedNode('http://ldf.fi/geonames/sparql'))
            ];
            c.authorityEndpoints.forEach(function (e, i) { return e.class = 'source' + i; });
            c.archiveEndpoints = [
                new fibra.EndpointConfiguration('fbtee', 'FBTEE', new fibra.NamedNode('http://ldf.fi/fbtee/sparql'), [fibra.CIDOC.Person, fibra.CIDOC.Place, fibra.CIDOC.Group])
            ];
            c.archiveEndpoints.forEach(function (e, i) { return e.class = 'source' + (c.authorityEndpoints.length + i); });
            this.configurations.push(c);
        }
        ConfigureViewComponentController.prototype.setConfiguration = function (configuration) {
            this.configurationService.setConfiguration(configuration);
            this.$state.go('select');
        };
        return ConfigureViewComponentController;
    }());/*<auto_generate>*/angular.module('fibra').controller('ConfigureViewComponentController',['configurationService','$state',function(){return new (Function.prototype.bind.apply(ConfigureViewComponentController,[null].concat(Array.prototype.slice.apply(arguments))));}]);/*</auto_generate>*/
    fibra.ConfigureViewComponentController = ConfigureViewComponentController;
    var ConfigureViewComponent = (function () {
        function ConfigureViewComponent() {
            this.controller = ConfigureViewComponentController;
            this.templateUrl = 'partials/configure-view.html';
        }
        return ConfigureViewComponent;
    }());/*<auto_generate>*/angular.module('fibra').component('configureView',new ConfigureViewComponent());/*</auto_generate>*/
    fibra.ConfigureViewComponent = ConfigureViewComponent;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2FwcC9zY3JpcHRzL2NvbmZpZ3VyZS12aWV3LWNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFVLEtBQUssQ0E4SGQ7QUE5SEQsV0FBVSxLQUFLLEVBQUMsQ0FBQztJQUNmLFlBQVksQ0FBQTtJQUVaO1FBTUUsMENBQW9CLG9CQUEwQyxFQUFVLE1BQWdDO1lBQXBGLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7WUFBVSxXQUFNLEdBQU4sTUFBTSxDQUEwQjtZQUxqRyxtQkFBYyxHQUFvQixFQUFFLENBQUE7WUFNekMsSUFBSSxDQUFDLEdBQWtCLElBQUksbUJBQWEsQ0FBQyxLQUFLLEVBQUUsaUJBQWlCLENBQUMsQ0FBQTtZQUNsRSxDQUFDLENBQUMsZUFBZSxHQUFHLElBQUksa0NBQTRCLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLGVBQVMsQ0FBQyw0QkFBNEIsQ0FBQyxFQUFFLElBQUksZUFBUyxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQTtZQUNoSyxDQUFDLENBQUMsZUFBZSxDQUFDLHNCQUFzQixHQUFHLENBQUMsQ0FBQyxlQUFlLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLGtDQUFrQyxDQUFDLENBQUE7WUFDakosQ0FBQyxDQUFDLGVBQWUsQ0FBQyxvQ0FBb0MsR0FBRyxDQUFDLENBQUMsZUFBZSxDQUFDLG9DQUFvQyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxrQ0FBa0MsQ0FBQyxDQUFBO1lBQzdLLElBQUksZ0NBQWdDLEdBQVcsMnhDQThCbkQsQ0FBQTtZQUNJLElBQUksaUJBQWlCLEdBQTBCLElBQUksMkJBQXFCLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLGVBQVMsQ0FBQyxnREFBZ0QsQ0FBQyxFQUFFLENBQUMsV0FBSyxDQUFDLGFBQWEsRUFBRSxXQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQTtZQUNwTSxpQkFBaUIsQ0FBQyxvQ0FBb0Ms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WUFDbEQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxDQUFBO1lBQ3pELElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQzFCLENBQUM7UUFnSEgsdUNBQUM7SUFBRCxDQXJIQSxBQXFIQyxJQUFBO0lBckhZLHNDQUFnQyxtQ0FxSDVDLENBQUE7SUFFRDtRQUFBO1lBQ1csZUFBVSxHQUFrRCxnQ0FBZ0MsQ0FBQTtZQUM1RixnQkFBVyxHQUFXLDhCQUE4QixDQUFBO1FBQy9ELENBQUM7UUFBRCw2QkFBQztJQUFELENBSEEsQUFHQyxJQUFBO0lBSFksNEJBQXNCLHlCQUdsQyxDQUFBO0FBQ0gsQ0FBQyxFQTlIUyxLQUFLLEtBQUwsS0FBSyxRQThIZCIsImZpbGUiOiJzY3JpcHRzL2NvbmZpZ3VyZS12aWV3LWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBmaWJyYSB7XG4gICd1c2Ugc3RyaWN0J1xuXG4gIGV4cG9ydCBjbGFzcyBDb25maWd1cmVWaWV3Q29tcG9uZW50Q29udHJvbGxlciBpbXBsZW1lbnRzIGFuZ3VsYXIuSUNvbXBvbmVudENvbnRyb2xsZXIge1xuICAgIHB1YmxpYyBjb25maWd1cmF0aW9uczogQ29uZmlndXJhdGlvbltdID0gW11cbiAgICBwdWJsaWMgc2V0Q29uZmlndXJhdGlvbihjb25maWd1cmF0aW9uOiBDb25maWd1cmF0aW9uKTogdm9pZCB7XG4gICAgICB0aGlzLmNvbmZpZ3VyYXRpb25TZXJ2aWNlLnNldENvbmZpZ3VyYXRpb24oY29uZmlndXJhdGlvbilcbiAgICAgIHRoaXMuJHN0YXRlLmdvKCdzZWxlY3QnKVxuICAgIH1cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZ3VyYXRpb25TZXJ2aWNlOiBDb25maWd1cmF0aW9uU2VydmljZSwgcHJpdmF0ZSAkc3RhdGU6IGFuZ3VsYXIudWkuSVN0YXRlU2VydmljZSkge1xuICAgICAgbGV0IGM6IENvbmZpZ3VyYXRpb24gPSBuZXcgQ29uZmlndXJhdGlvbignYWxsJywgJ0FsbCBEYXRhc291cmNlcycpXG4gICAgICBjLnByaW1hcnlFbmRwb2ludCA9IG5ldyBQcmltYXJ5RW5kcG9pbnRDb25maWd1cmF0aW9uKCdsb2NhbCcsICdMb2NhbCcsIG5ldyBOYW1lZE5vZGUoJ2h0dHA6Ly9sZGYuZmkvZmlicmEvc3BhcnFsJyksIG5ldyBOYW1lZE5vZGUoJ2h0dHA6Ly9sZGYuZmkvZmlicmEvc3BhcnFsJykpXG4gICAgICBjLnByaW1hcnlFbmRwb2ludC5sb2NhbEl0ZW1RdWVyeVRlbXBsYXRlID0gYy5wcmltYXJ5RW5kcG9pbnQubG9jYWxJdGVtUXVlcnlUZW1wbGF0ZS5yZXBsYWNlKC9HUkFQSCA8R1JBUEg+L2csICdHUkFQSCA8aHR0cDovL2xkZi5maS9maWJyYS9hbGwvPicpXG4gICAgICBjLnByaW1hcnlFbmRwb2ludC5hdXRvY29tcGxldGlvblRleHRNYXRjaFF1ZXJ5VGVtcGxhdGUgPSBjLnByaW1hcnlFbmRwb2ludC5hdXRvY29tcGxldGlvblRleHRNYXRjaFF1ZXJ5VGVtcGxhdGUucmVwbGFjZSgvR1JBUEggPEdSQVBIPi9nLCAnR1JBUEggPGh0dHA6Ly9sZGYuZmkvZmlicmEvYWxsLz4nKVxuICAgICAgbGV0IGdldHR5QXV0b2NvbXBsZXRpb25RdWVyeVRlbXBsYXRlOiBzdHJpbmcgPSBgUFJFRklYIHNrb3M6IDxodHRwOi8vd3d3LnczLm9yZy8yMDA0LzAyL3Nrb3MvY29yZSM+XG5QUkVGSVggcmRmczogPGh0dHA6Ly93d3cudzMub3JnLzIwMDAvMDEvcmRmLXNjaGVtYSM+XG5QUkVGSVggbHVjOiA8aHR0cDovL3d3dy5vbnRvdGV4dC5jb20vb3dsaW0vbHVjZW5lIz5cblBSRUZJWCBndnA6IDxodHRwOi8vdm9jYWIuZ2V0dHkuZWR1L29udG9sb2d5Iz5cblBSRUZJWCBhYXQ6IDxodHRwOi8vdm9jYWIuZ2V0dHkuZWR1L2FhdC8+XG5QUkVGSVggdGduOiA8aHR0cDovL3ZvY2FiLmdldHR5LmVkdS90Z24vPlxuU0VMRUNUID9ncm91cElkID9ncm91cExhYmVsID9pZCA/cHJlZkxhYmVsID9tYXRjaGVkTGFiZWwgP3NhbWVBcyA/YWx0TGFiZWwge1xuICB7XG4gICAgU0VMRUNUID9pZCA/bWF0Y2hlZExhYmVsIHtcbiAgICAgIEJJTkQoQ09OQ0FUKFJFUExBQ0UoPFFVRVJZPixcIihbXFxcXFxcXFwrXFxcXFxcXFwtXFxcXFxcXFwmXFxcXFxcXFx8XFxcXFxcXFwhXFxcXFxcXFwoXFxcXFxcXFwpXFxcXFxcXFx7XFxcXFxcXFx9XFxcXFxcXFxbXFxcXFxcXFxdXFxcXFxcXFxeXFxcXFxcXFxcXFxcXCJcXFxcXFxcXH5cXFxcXFxcXCpcXFxcXFxcXD9cXFxcXFxcXDpcXFxcXFxcXC9cXFxcXFxcXFxcXFxcXFxcXSlcIixcIlxcXFxcXFxcJDFcIiksXCIqXCIpIEFTID9xdWVyeSlcbiAgICAgID9pZCBsdWM6dGVybSA/cXVlcnkgLlxuICAgICAgIyBDT05TVFJBSU5UU1xuICAgICAgP2lkIHJkZnM6bGFiZWwgP21hdGNoZWRMYWJlbCAuXG4gICAgfSBMSU1JVCA8TElNSVQ+XG4gIH0gVU5JT04ge1xuICAgIEJJTkQoQ09OQ0FUKFwiXFxcXFwiXCIsUkVQTEFDRSg8UVVFUlk+LFwiKFtcXFxcXFxcXCtcXFxcXFxcXC1cXFxcXFxcXCZcXFxcXFxcXHxcXFxcXFxcXCFcXFxcXFxcXChcXFxcXFxcXClcXFxcXFxcXHtcXFxcXFxcXH1cXFxcXFxcXFtcXFxcXFxcXF1cXFxcXFxcXF5cXFxcXFxcXFxcXFxcIlxcXFxcXFxcflxcXFxcXFxcKlxcXFxcXFxcP1xcXFxcXFxcOlxcXFxcXFxcL1xcXFxcXFxcXFxcXFxcXFxdKVwiLFwiXFxcXFxcXFwkMVwiKSxcIlxcXFxcIlwiKSBBUyA/cXVlcnkpXG4gICAgP2lkIGx1Yzp0ZXJtID9xdWVyeSAuXG4gICAgIyBDT05TVFJBSU5UU1xuICAgID9pZCByZGZzOmxhYmVsID9tYXRjaGVkTGFiZWwgLlxuICAgIEZJTFRFUiAoTENBU0UoP21hdGNoZWRMYWJlbCk9TENBU0UoPFFVRVJZPikpXG4gIH1cbiAgP2lkIHNrb3M6aW5TY2hlbWUgPFNDSEVNRT4gLlxuICBGSUxURVIgKFJFR0VYKExDQVNFKD9tYXRjaGVkTGFiZWwpLENPTkNBVChcIlxcXFxcXFxcYlwiLExDQVNFKDxRVUVSWT4pKSkpXG4gID9pZCBhID9ncm91cElkIC5cbiAgP2dyb3VwSWQgcmRmczpsYWJlbCA/Z3JvdXBMYWJlbCAuXG4gIHtcbiAgICA/aWQgZ3ZwOnByZWZMYWJlbEdWUCBbeGw6bGl0ZXJhbEZvcm0gP3ByZWZMYWJlbF0gLlxuICB9IFVOSU9OIHtcbiAgICA/aWQgc2tvczpleGFjdE1hdGNoID9zYW1lQXMgLlxuICB9XG59YFxuICAgICAgbGV0IHVsYW5Db25maWd1cmF0aW9uOiBFbmRwb2ludENvbmZpZ3VyYXRpb24gPSBuZXcgRW5kcG9pbnRDb25maWd1cmF0aW9uKCd1bGFuJywgJ1VMQU4nLCBuZXcgTmFtZWROb2RlKCdodHRwOi8vbGRmLmZpL2NvcnNwcm94eS92b2NhYi5nZXR0eS5lZHUvc3BhcnFsJyksIFtHRVRUWS5QZXJzb25Db25jZXB0LCBHRVRUWS5Hcm91cENvbmNlcHRdKVxuICAgICAgdWxhbkNvbmZpZ3VyYXRpb24uYXV0b2NvbXBsZXRpb25UZXh0TWF0Y2hRdWVyeVRlbXBsYXRlID0gZ2V0dHlBdXRvY29tcGxldGlvblF1ZXJ5VGVtcGxhdGUucmVwbGFjZSgvPFNDSEVNRT4vZywgJ3VsYW46JylcbiAgICAgIGxldCB0Z25Db25maWd1cmF0aW9uOiBFbmRwb2ludENvbmZpZ3VyYXRpb24gPSBuZXcgRW5kcG9pbnRDb25maWd1cmF0aW9uKCd0Z24nLCAnVEdOJywgbmV3IE5hbWVkTm9kZSgnaHR0cDovL2xkZi5maS9jb3JzcHJveHkvdm9jYWIuZ2V0dHkuZWR1L3NwYXJxbCcpLCBbR0VUVFkuQWRtaW5QbGFjZUNvbmNlcHQsIEdFVFRZLlBoeXNBZG1pblBsYWNlQ29uY2VwdF0pXG4gICAgICB0Z25Db25maWd1cmF0aW9uLmF1dG9jb21wbGV0aW9uVGV4dE1hdGNoUXVlcnlUZW1wbGF0ZSA9IGdldHR5QXV0b2NvbXBsZXRpb25RdWVyeVRlbXBsYXRlLnJlcGxhY2UoLzxTQ0hFTUU+L2csICd0Z246JylcbiAgICAgIGxldCB2aWFmQ29uZmlndXJhdGlvbjogRW5kcG9pbnRDb25maWd1cmF0aW9uID0gbmV3IEVuZHBvaW50Q29uZmlndXJhdGlvbigndmlhZicsICdWSUFGJywgbmV3IE5hbWVkTm9kZSgnaHR0cDovL2xkZi5maS92aWFmL3NwYXJxbCcpKVxuICAgICAgdmlhZkNvbmZpZ3VyYXRpb24uYXV0b2NvbXBsZXRpb25UZXh0TWF0Y2hRdWVyeVRlbXBsYXRlID0gdmlhZkNvbmZpZ3VyYXRpb24uYXV0b2NvbXBsZXRpb25UZXh0TWF0Y2hRdWVyeVRlbXBsYXRlLnJlcGxhY2UoLyMgQURESVRJT05BTFNFTEVDVC9nLCBgXG5VTklPTiB7XG4gID9pZCBkY3Rlcm1zOmlkZW50aWZpZXIgP3JpZCAuXG4gIEZJTFRFUihTVFJTVEFSVFMoP3JpZCxcIkxDfG5cIikpXG4gIEJJTkQoSVJJKFJFUExBQ0UoP3JpZCwgXCJeTENcXFxcXFxcXHxuICpcIixcImh0dHA6Ly9pZC5sb2MuZ292L2F1dGhvcml0aWVzL25hbWVzL25cIikpIEFTID9zYW1lQXMpXG59YClcbiAgICAgIGMuYXV0aG9yaXR5RW5kcG9pbnRzID0gW1xuICAgICAgICB1bGFuQ29uZmlndXJhdGlvbixcbiAgICAgICAgbmV3IEVuZHBvaW50Q29uZmlndXJhdGlvbignbGNuYW1lcycsICdMQyBOYW1lcycsIG5ldyBOYW1lZE5vZGUoJ2h0dHA6Ly9sZGYuZmkvbGNuYW1lcy9zcGFycWwnKSksXG4gICAgICAgIHZpYWZDb25maWd1cmF0aW9uLFxuICAgICAgICB0Z25Db25maWd1cmF0aW9uLFxuICAgICAgICBuZXcgRW5kcG9pbnRDb25maWd1cmF0aW9uKCdnZW9uYW1lcycsICdHZW9OYW1lcycsIG5ldyBOYW1lZE5vZGUoJ2h0dHA6Ly9sZGYuZmkvZ2VvbmFtZXMvc3BhcnFsJykpXG4gICAgICBdXG4gICAgICBjLmF1dGhvcml0eUVuZHBvaW50cy5mb3JFYWNoKChlLCBpKSA9PiBlLmNsYXNzID0gICdzb3VyY2UnICsgaSlcbiAgICAgIGxldCBlbWxvQ29uZmlndXJhdGlvbjogRW5kcG9pbnRDb25maWd1cmF0aW9uID0gbmV3IEVuZHBvaW50Q29uZmlndXJhdGlvbignZW1sbycsICdFTUxPJywgbmV3IE5hbWVkTm9kZSgnaHR0cDovL2xkZi5maS9lbWxvL3NwYXJxbCcpLCBbQ0lET0MuUGVyc29uLCBDSURPQy5QbGFjZSwgQ0lET0MuR3JvdXBdKVxuICAgICAgZW1sb0NvbmZpZ3VyYXRpb24uYXV0b2NvbXBsZXRpb25UZXh0TWF0Y2hRdWVyeVRlbXBsYXRlID0gZW1sb0NvbmZpZ3VyYXRpb24uYXV0b2NvbXBsZXRpb25UZXh0TWF0Y2hRdWVyeVRlbXBsYXRlLnJlcGxhY2UoL1xce8KgIyBBRERJVElPTkFMVkFSSUFCTEVTL2csICc/aWZwV2lraXBlZGlhUGFnZSA/aWZwT0RCTklkIHsnKS5yZXBsYWNlKC8jIEFERElUSU9OQUxTRUxFQ1QvZywgYFxuVU5JT04ge1xuICB7XG4gICAgP2lkIDxodHRwOi8vZW1sby5ib2RsZWlhbi5veC5hYy51ay9zY2hlbWEjY29ma191bmlvbl9yZWxhdGlvbnNoaXBfdHlwZS1pc19yZWxhdGVkX3RvPiA/cmVmIC5cbiAgICBGSUxURVIoUkVHRVgoU1RSKD9yZWYpLCdodHRwOi8vLi5cXFxcXFxcXC53aWtpcGVkaWFcXFxcXFxcXC5vcmcvd2lraS8nKSlcbiAgICBCSU5EKD9yZWYgQVMgP2lmcFdpa2lwZWRpYVBhZ2UpXG4gIH0gVU5JT04ge1xuICAgID9pZCA8aHR0cDovL2VtbG8uYm9kbGVpYW4ub3guYWMudWsvc2NoZW1hI2NvZmtfdW5pb25fcmVsYXRpb25zaGlwX3R5cGUtaXNfcmVsYXRlZF90bz4gP3JlZiAuXG4gICAgRklMVEVSKFNUUlNUQVJUUyhTVFIoP3JlZiksJ2h0dHA6Ly93d3cub3hmb3JkZG5iLmNvbS92aWV3L2FydGljbGUvJykpXG4gICAgQklORChSRVBMQUNFKFNUUig/cmVmKSwnaHR0cDovL3d3dy5veGZvcmRkbmIuY29tL3ZpZXcvYXJ0aWNsZS8oW14/XSopLionLCckMScpIEFTID9pZnBPREJOSWQpXG4gIH1cbn1gKVxuICAgICAgbGV0IHNkZmJDb25maWd1cmF0aW9uOiBFbmRwb2ludENvbmZpZ3VyYXRpb24gPSBuZXcgRW5kcG9pbnRDb25maWd1cmF0aW9uKCdzZGZiJywgJ1NERkInLCBuZXcgTmFtZWROb2RlKCdodHRwOi8vbGRmLmZpL3NkZmIvc3BhcnFsJyksIFtDSURPQy5QZXJzb24sIENJRE9DLlBsYWNlLCBDSURPQy5Hcm91cF0pXG4gICAgICBzZGZiQ29uZmlndXJhdGlvbi5hdXRvY29tcGxldGlvblRleHRNYXRjaFF1ZXJ5VGVtcGxhdGUgPSBzZGZiQ29uZmlndXJhdGlvbi5hdXRvY29tcGxldGlvblRleHRNYXRjaFF1ZXJ5VGVtcGxhdGUucmVwbGFjZSgvXFx7ICMgQURESVRJT05BTFZBUklBQkxFUy9nLCAnP2lmcE9EQk5JZCB7JykucmVwbGFjZSgvIyBBRERJVElPTkFMU0VMRUNUL2csIGBcblVOSU9OIHtcbiAgP2lkIDxodHRwOi8vbGRmLmZpL3NkZmIvc2NoZW1hI29kYm5JZD4gP2lmcE9EQk5JZCAuXG59XG5gKVxuICAgICAgbGV0IHByb2NvcGVDb25maWd1cmF0aW9uOiBFbmRwb2ludENvbmZpZ3VyYXRpb24gPSBuZXcgRW5kcG9pbnRDb25maWd1cmF0aW9uKCdwcm9jb3BlJywgJ1Byb2NvcGUnLCBuZXcgTmFtZWROb2RlKCdodHRwOi8vbGRmLmZpL3Byb2NvcGUvc3BhcnFsJyksIFtDSURPQy5QZXJzb24sIENJRE9DLlBsYWNlLCBDSURPQy5Hcm91cF0pXG4gICAgICBwcm9jb3BlQ29uZmlndXJhdGlvbi5hdXRvY29tcGxldGlvblRleHRNYXRjaFF1ZXJ5VGVtcGxhdGUgPSBwcm9jb3BlQ29uZmlndXJhdGlvbi5hdXRvY29tcGxldGlvblRleHRNYXRjaFF1ZXJ5VGVtcGxhdGUucmVwbGFjZSgvXFx7ICMgQURESVRJT05BTFZBUklBQkxFUy9nLCAnP2lmcFdpa2lwZWRpYVBhZ2UgeycpLnJlcGxhY2UoLyMgQURESVRJT05BTFNFTEVDVC9nLCBgXG5VTklPTiB7XG4gID9pZCA8aHR0cDovL2xkZi5maS9wcm9jb3BlLXNjaGVtYSN3aWtpcGVkaWFVcmw+ID9yZWYgLlxuICBCSU5EKElSSSg/cmVmKSBBUyA/aWZwV2lraXBlZGlhUGFnZSlcbn1cbmApXG4gICAgICBjLmFyY2hpdmVFbmRwb2ludHMgPSBbXG4gICAgICAgIHNkZmJDb25maWd1cmF0aW9uLFxuICAgICAgICBlbWxvQ29uZmlndXJhdGlvbixcbiAgICAgICAgcHJvY29wZUNvbmZpZ3VyYXRpb24sXG4gICAgICAgIG5ldyBFbmRwb2ludENvbmZpZ3VyYXRpb24oJ2ZidGVlJywgJ0ZCVEVFJywgbmV3IE5hbWVkTm9kZSgnaHR0cDovL2xkZi5maS9mYnRlZS9zcGFycWwnKSwgW0NJRE9DLlBlcnNvbiwgQ0lET0MuUGxhY2UsIENJRE9DLkdyb3VwXSksXG4gICAgICAgIG5ldyBFbmRwb2ludENvbmZpZ3VyYXRpb24oJ3NjaG9lbmJlcmcnLCAnU2Nob2VuYmVyZycsIG5ldyBOYW1lZE5vZGUoJ2h0dHA6Ly9sZGYuZmkvc2Nob2VuYmVyZy9zcGFycWwnKSwgW0NJRE9DLlBlcnNvbiwgQ0lET0MuUGxhY2UsIENJRE9DLkdyb3VwXSlcbiAgICAgIF1cbiAgICAgIGMuYXJjaGl2ZUVuZHBvaW50cy5mb3JFYWNoKChlLCBpKSA9PiBlLmNsYXNzID0gICdzb3VyY2UnICsgKGMuYXV0aG9yaXR5RW5kcG9pbnRzLmxlbmd0aCArIGkpKVxuICAgICAgYy5pbnN0YW5jZU5TID0gJ2h0dHA6Ly9sZGYuZmkvZmlicmEvJ1xuICAgICAgYy5pbnN0YW5jZUdyYXBoID0gJ2h0dHA6Ly9sZGYuZmkvZmlicmEvbWFpbi8nXG4gICAgICBjLnNjaGVtYU5TID0gJ2h0dHA6Ly9sZGYuZmkvZmlicmEvc2NoZW1hIydcbiAgICAgIGMuc2NoZW1hR3JhcGggPSAnaHR0cDovL2xkZi5maS9maWJyYS9zY2hlbWEjJ1xuICAgICAgdGhpcy5jb25maWd1cmF0aW9ucy5wdXNoKGMpXG4gICAgICBjID0gbmV3IENvbmZpZ3VyYXRpb24oJ2ZidGVlJywgJ0ZyZW5jaCBCb29rIFRyYWRlIGluIEVubGlnaHRlbm1lbnQgRXVyb3BlJylcbiAgICAgIGMucHJpbWFyeUVuZHBvaW50ID0gbmV3IFByaW1hcnlFbmRwb2ludENvbmZpZ3VyYXRpb24oJ2xvY2FsJywgJ0xvY2FsJywgbmV3IE5hbWVkTm9kZSgnaHR0cDovL2xkZi5maS9maWJyYS9zcGFycWwnKSwgbmV3IE5hbWVkTm9kZSgnaHR0cDovL2xkZi5maS9maWJyYS9zcGFycWwnKSlcbiAgICAgIGMucHJpbWFyeUVuZHBvaW50LmxvY2FsSXRlbVF1ZXJ5VGVtcGxhdGUgPSBjLnByaW1hcnlFbmRwb2ludC5sb2NhbEl0ZW1RdWVyeVRlbXBsYXRlLnJlcGxhY2UoL0dSQVBIIDxHUkFQSD4vZywgJ0dSQVBIIDxodHRwOi8vbGRmLmZpL2ZpYnJhL2ZidGVlLz4nKVxuICAgICAgYy5wcmltYXJ5RW5kcG9pbnQuYXV0b2NvbXBsZXRpb25UZXh0TWF0Y2hRdWVyeVRlbXBsYXRlID0gYy5wcmltYXJ5RW5kcG9pbnQuYXV0b2NvbXBsZXRpb25UZXh0TWF0Y2hRdWVyeVRlbXBsYXRlLnJlcGxhY2UoL0dSQVBIIDxHUkFQSD4vZywgJ0dSQVBIIDxodHRwOi8vbGRmLmZpL2ZpYnJhL2ZidGVlLz4nKVxuICAgICAgYy5hdXRob3JpdHlFbmRwb2ludHMgPSBbXG4gICAgICAgIHVsYW5Db25maWd1cmF0aW9uLFxuICAgICAgICB2aWFmQ29uZmlndXJhdGlvbixcbiAgICAgICAgdGduQ29uZmlndXJhdGlvbixcbiAgICAgICAgbmV3IEVuZHBvaW50Q29uZmlndXJhdGlvbignZ2VvbmFtZXMnLCAnR2VvTmFtZXMnLCBuZXcgTmFtZWROb2RlKCdodHRwOi8vbGRmLmZpL2dlb25hbWVzL3NwYXJxbCcpKVxuICAgICAgXVxuICAgICAgYy5hdXRob3JpdHlFbmRwb2ludHMuZm9yRWFjaCgoZSwgaSkgPT4gZS5jbGFzcyA9ICAnc291cmNlJyArIGkpXG4gICAgICBjLmFyY2hpdmVFbmRwb2ludHMgPSBbXG4gICAgICAgIG5ldyBFbmRwb2ludENvbmZpZ3VyYXRpb24oJ2ZidGVlJywgJ0ZCVEVFJywgbmV3IE5hbWVkTm9kZSgnaHR0cDovL2xkZi5maS9mYnRlZS9zcGFycWwnKSwgW0NJRE9DLlBlcnNvbiwgQ0lET0MuUGxhY2UsIENJRE9DLkdyb3VwXSlcbiAgICAgIF1cbiAgICAgIGMuYXJjaGl2ZUVuZHBvaW50cy5mb3JFYWNoKChlLCBpKSA9PiBlLmNsYXNzID0gICdzb3VyY2UnICsgKGMuYXV0aG9yaXR5RW5kcG9pbnRzLmxlbmd0aCArIGkpKVxuICAgICAgdGhpcy5jb25maWd1cmF0aW9ucy5wdXNoKGMpXG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIENvbmZpZ3VyZVZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBhbmd1bGFyLklDb21wb25lbnRPcHRpb25zIHtcbiAgICAgIHB1YmxpYyBjb250cm9sbGVyOiAobmV3ICguLi5hcmdzOiBhbnlbXSkgPT4gYW5ndWxhci5JQ29udHJvbGxlcikgPSBDb25maWd1cmVWaWV3Q29tcG9uZW50Q29udHJvbGxlclxuICAgICAgcHVibGljIHRlbXBsYXRlVXJsOiBzdHJpbmcgPSAncGFydGlhbHMvY29uZmlndXJlLXZpZXcuaHRtbCdcbiAgfVxufVxuIl19

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
    var ConstructViewComponentController = (function () {
        function ConstructViewComponentController(configurationService, sparqlTreeService, sparqlItemService, fibraService) {
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
        ConstructViewComponentController.prototype.createItem = function (item) {
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
        return ConstructViewComponentController;
    }());/*<auto_generate>*/angular.module('fibra').controller('ConstructViewComponentController',['configurationService','sparqlTreeService','sparqlItemService','fibraService',function(){return new (Function.prototype.bind.apply(ConstructViewComponentController,[null].concat(Array.prototype.slice.apply(arguments))));}]);/*</auto_generate>*/
    fibra.ConstructViewComponentController = ConstructViewComponentController;
    var ConstructViewComponent = (function () {
        function ConstructViewComponent() {
            this.controller = ConstructViewComponentController;
            this.templateUrl = 'partials/construct-view.html';
        }
        return ConstructViewComponent;
    }());/*<auto_generate>*/angular.module('fibra').component('constructView',new ConstructViewComponent());/*</auto_generate>*/
    fibra.ConstructViewComponent = ConstructViewComponent;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2FwcC9zY3JpcHRzL2NvbnN0cnVjdC12aWV3LWNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFVLEtBQUssQ0FrRGQ7QUFsREQsV0FBVSxLQUFLLEVBQUMsQ0FBQztJQUNmLFlBQVksQ0FBQTtJQUVaO1FBQ0UsK0JBQW1CLFFBQWdCLEVBQVMsYUFBcUI7WUFBOUMsYUFBUSxHQUFSLFFBQVEsQ0FBUTtZQUFTLGtCQUFhLEdBQWIsYUFBYSxDQUFRO1FBQUcsQ0FBQztRQUN2RSw0QkFBQztJQUFELENBRkEsQUFFQyxJQUFBO0lBRUQ7UUFxQkUsMENBQW9CLG9CQUEwQyxFQUNsRCxpQkFBb0MsRUFDNUIsaUJBQW9DLEVBQ3BDLFlBQTBCO1lBeEJoRCxpQkFxQ0M7WUFoQnFCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7WUFFMUMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtZQUNwQyxpQkFBWSxHQUFaLFlBQVksQ0FBYztZQUM1QyxJQUFJLENBQUMsU0FBUyxHQUFHLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxlQUFlLEVBQUUsQ0FBQTtZQUNyRSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsdUJBQWlCLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtZQUM5SixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsS0FBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLEVBQWxCLENBQWtCLENBQUMsQ0FBQTtZQUVuRCxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUU7Z0JBQzdCLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsS0FBSSxDQUFDLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSx1QkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO2dCQUM5SixNQUFNLENBQUMsS0FBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxVQUFBLENBQUM7b0JBQ2pDLEtBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFBO29CQUNsQixNQUFNLENBQUMsSUFBSSxDQUFBO2dCQUNiLENBQUMsQ0FBQyxDQUFBO1lBQ0osQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDO1FBN0JNLHFEQUFVLEdBQWpCLFVBQWtCLElBQVk7WUFBOUIsaUJBWUM7WUFYQyxJQUFJLFNBQVMsR0FBNEIsSUFBSSxzQkFBZ0IsQ0FBQyxVQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7WUFDN0UsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1lBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDakIsSUFBSSxJQUFJLEdBQTRCLElBQUksc0JBQWdCLENBQUMsU0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ2xFLElBQUksYUFBYSxHQUFtQixJQUFJLDBCQUFvQixDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUMvSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtZQUMvQixJQUFJLElBQUksR0FBNEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUE7WUFDckcsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDUixLQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUN0QyxDQUFDLENBQUMsQ0FBQTtZQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUE7UUFDYixDQUFDO1FBa0JILHVDQUFDO0lBQUQsQ0FyQ0EsQUFxQ0MsSUFBQTtJQXJDWSxzQ0FBZ0MsbUNBcUM1QyxDQUFBO0lBRUQ7UUFBQTtZQUNXLGVBQVUsR0FBa0QsZ0NBQWdDLENBQUE7WUFDNUYsZ0JBQVcsR0FBVyw4QkFBOEIsQ0FBQTtRQUMvRCxDQUFDO1FBQUQsNkJBQUM7SUFBRCxDQUhBLEFBR0MsSUFBQTtJQUhZLDRCQUFzQix5QkFHbEMsQ0FBQTtBQUNILENBQUMsRUFsRFMsS0FBSyxLQUFMLEtBQUssUUFrRGQiLCJmaWxlIjoic2NyaXB0cy9jb25zdHJ1Y3Qtdmlldy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgZmlicmEge1xuICAndXNlIHN0cmljdCdcblxuICBjbGFzcyBUcmVlVmlld0NvbmZpZ3VyYXRpb24ge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbmRwb2ludDogc3RyaW5nLCBwdWJsaWMgcXVlcnlUZW1wbGF0ZTogc3RyaW5nKSB7fVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIENvbnN0cnVjdFZpZXdDb21wb25lbnRDb250cm9sbGVyIHtcblxuICAgIHB1YmxpYyBlbmRwb2ludHM6IEVuZHBvaW50Q29uZmlndXJhdGlvbltdXG4gICAgcHVibGljIGNsYXNzVHJlZTogVHJlZU5vZGVbXVxuICAgIHB1YmxpYyBjbGFzc1RyZWVQcm9taXNlOiBhbmd1bGFyLklQcm9taXNlPFRyZWVOb2RlW10+XG4gICAgcHVibGljIHNlbGVjdGVkSXRlbTogSU5vZGVcblxuICAgIHB1YmxpYyBjcmVhdGVJdGVtKGl0ZW06IFJlc3VsdCk6IGFuZ3VsYXIuSVByb21pc2U8SU5vZGU+IHtcbiAgICAgIGxldCBwcmVmTGFiZWw6IFByb3BlcnR5VG9WYWx1ZXM8SU5vZGU+ID0gbmV3IFByb3BlcnR5VG9WYWx1ZXMoU0tPUy5wcmVmTGFiZWwpXG4gICAgICBwcmVmTGFiZWwudmFsdWVzLnB1c2goaXRlbS5wcmVmTGFiZWwpXG4gICAgICBjb25zb2xlLmxvZyhpdGVtKVxuICAgICAgbGV0IHR5cGU6IFByb3BlcnR5VG9WYWx1ZXM8SU5vZGU+ID0gbmV3IFByb3BlcnR5VG9WYWx1ZXMoUkRGLnR5cGUpXG4gICAgICBsZXQgdHlwZVdpdGhMYWJlbDogSU5vZGVQbHVzTGFiZWwgPSBuZXcgU291cmNlZE5vZGVQbHVzTGFiZWwoaXRlbS5hZGRpdGlvbmFsSW5mb3JtYXRpb25bJ3R5cGUnXVswXSwgaXRlbS5hZGRpdGlvbmFsSW5mb3JtYXRpb25bJ3R5cGVMYWJlbCddWzBdKVxuICAgICAgdHlwZS52YWx1ZXMucHVzaCh0eXBlV2l0aExhYmVsKVxuICAgICAgbGV0IHByb206IGFuZ3VsYXIuSVByb21pc2U8SU5vZGU+ID0gdGhpcy5zcGFycWxJdGVtU2VydmljZS5jcmVhdGVOZXdJdGVtKGl0ZW0uaWRzLCBbcHJlZkxhYmVsLCB0eXBlXSlcbiAgICAgIHByb20udGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuZmlicmFTZXJ2aWNlLmRpc3BhdGNoKCdjaGFuZ2UnKVxuICAgICAgfSlcbiAgICAgIHJldHVybiBwcm9tXG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25maWd1cmF0aW9uU2VydmljZTogQ29uZmlndXJhdGlvblNlcnZpY2UsXG4gICAgICAgICAgICAgICAgc3BhcnFsVHJlZVNlcnZpY2U6IFNwYXJxbFRyZWVTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgc3BhcnFsSXRlbVNlcnZpY2U6IFNwYXJxbEl0ZW1TZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZmlicmFTZXJ2aWNlOiBGaWJyYVNlcnZpY2UpIHtcbiAgICAgIHRoaXMuZW5kcG9pbnRzID0gY29uZmlndXJhdGlvblNlcnZpY2UuY29uZmlndXJhdGlvbi5yZW1vdGVFbmRwb2ludHMoKVxuICAgICAgdGhpcy5jbGFzc1RyZWVQcm9taXNlID0gc3BhcnFsVHJlZVNlcnZpY2UuZ2V0VHJlZSh0aGlzLmNvbmZpZ3VyYXRpb25TZXJ2aWNlLmNvbmZpZ3VyYXRpb24ucHJpbWFyeUVuZHBvaW50LmVuZHBvaW50LnZhbHVlLCBTcGFycWxUcmVlU2VydmljZS5nZXRDbGFzc1RyZWVRdWVyeSlcbiAgICAgIHRoaXMuY2xhc3NUcmVlUHJvbWlzZS50aGVuKGMgPT4gdGhpcy5jbGFzc1RyZWUgPSBjKVxuXG4gICAgICB0aGlzLmZpYnJhU2VydmljZS5vbignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgICB0aGlzLmNsYXNzVHJlZVByb21pc2UgPSBzcGFycWxUcmVlU2VydmljZS5nZXRUcmVlKHRoaXMuY29uZmlndXJhdGlvblNlcnZpY2UuY29uZmlndXJhdGlvbi5wcmltYXJ5RW5kcG9pbnQuZW5kcG9pbnQudmFsdWUsIFNwYXJxbFRyZWVTZXJ2aWNlLmdldENsYXNzVHJlZVF1ZXJ5KVxuICAgICAgICByZXR1cm4gdGhpcy5jbGFzc1RyZWVQcm9taXNlLnRoZW4oYyA9PiB7XG4gICAgICAgICAgdGhpcy5jbGFzc1RyZWUgPSBjXG4gICAgICAgICAgcmV0dXJuICdvaydcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIENvbnN0cnVjdFZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBhbmd1bGFyLklDb21wb25lbnRPcHRpb25zIHtcbiAgICAgIHB1YmxpYyBjb250cm9sbGVyOiAobmV3ICguLi5hcmdzOiBhbnlbXSkgPT4gYW5ndWxhci5JQ29udHJvbGxlcikgPSBDb25zdHJ1Y3RWaWV3Q29tcG9uZW50Q29udHJvbGxlclxuICAgICAgcHVibGljIHRlbXBsYXRlVXJsOiBzdHJpbmcgPSAncGFydGlhbHMvY29uc3RydWN0LXZpZXcuaHRtbCdcbiAgfVxufVxuIl19

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
            this.chargeForce = d3.forceCollide(this.gridOffset / 1.5);
            this.chargeForce2 = d3.forceCollide(this.gridOffset / 1.5);
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
                .force('charge2', this.chargeForce2)
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
                    d.x = d3.event.x;
                    d.y = d3.event.y;
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
                _this.updateExplore(false, false);
            })
                .on('end', function (d, i, group) {
                if (!_this.drawmode) {
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
                            _this.updateExplore(false);
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
                _this.svgSel.selectAll('.node-circle')
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
        ExploreComponentController.prototype.updateExplore = function (runSim, transition) {
            if (runSim === void 0) { runSim = true; }
            if (transition === void 0) { transition = false; }
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
            // Apply forces only to one set of items, depending on force.
            var collideForce = this.forceSim.force('charge');
            var collideForce2 = this.forceSim.force('charge2');
            var centerForce = this.forceSim.force('center');
            var xpositionForce = this.forceSim.force('xposition');
            var ypositionForce = this.forceSim.force('yposition');
            if (collideForce.initialize)
                collideForce.initialize(this.primaryItems);
            if (collideForce2.initialize)
                collideForce2.initialize(this.secondaryItems);
            // if(centerForce.initialize) centerForce.initialize(this.primaryItems)
            // if(xpositionForce.initialize) xpositionForce.initialize(this.primaryItems)
            // if(ypositionForce.initialize) ypositionForce.initialize(this.primaryItems)
            if (runSim) {
                this.forceSim.alpha(1).restart();
            }
            else {
                this.genericTick(primaryNodes, secondaryNodes, linkLines, transition);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2FwcC9zY3JpcHRzL2V4cGxvcmUtY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQVUsS0FBSyxDQTBkZDtBQTFkRCxXQUFVLEtBQUssRUFBQyxDQUFDO0lBQ2YsWUFBWSxDQUFBO0lBcUJaO1FBZ1hFLG9DQUFvQixRQUFrQyxFQUNsQyxRQUFpQyxFQUNqQyxPQUErQixFQUMvQixNQUFxQixFQUNyQixRQUFpQyxFQUNqQyxpQkFBb0MsRUFDcEMsWUFBMEIsRUFDMUIsRUFBcUI7WUF2WDNDLGlCQTBiQztZQTFFcUIsYUFBUSxHQUFSLFFBQVEsQ0FBMEI7WUFDbEMsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7WUFDakMsWUFBTyxHQUFQLE9BQU8sQ0FBd0I7WUFDL0IsV0FBTSxHQUFOLE1BQU0sQ0FBZTtZQUNyQixhQUFRLEdBQVIsUUFBUSxDQUF5QjtZQUNqQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1lBQ3BDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1lBQzFCLE9BQUUsR0FBRixFQUFFLENBQW1CO1lBOVdqQyxpQkFBWSxHQUFhLENBQUMsK0NBQStDLEVBQUUsOENBQThDLEVBQUUsOENBQThDLENBQUMsQ0FBQTtZQUMxSyxpQkFBWSxHQUFXLEVBQUUsQ0FBQTtZQUN6QixtQkFBYyxHQUFXLEVBQUUsQ0FBQTtZQUMzQixrQkFBYSxHQUFXLEVBQUUsQ0FBQTtZQUUxQixXQUFNLEdBQVcsQ0FBQyxDQUFBO1lBTWxCLGVBQVUsR0FBVyxFQUFFLENBQUEsQ0FBQyxpQkFBaUI7WUFDekMsZ0JBQVcsR0FBa0MsRUFBRSxDQUFDLFlBQVksQ0FBZSxJQUFJLENBQUMsVUFBVSxHQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQy9GLGlCQUFZLEdBQWtDLEVBQUUsQ0FBQyxZQUFZLENBQWUsSUFBSSxDQUFDLFVBQVUsR0FBQyxHQUFHLENBQUMsQ0FBQTtZQUVoRyxhQUFRLEdBQVksS0FBSyxDQUFBO1lBaVcvQixJQUFJLENBQUMsWUFBWSxDQUFD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QUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNuRixRQUFRLENBQUMsSUFBSSxDQUFDO2dDQUNaLE1BQU0sRUFBZ0IsSUFBSTtnQ0FDMUIsTUFBTSxFQUFnQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQ0FDbkMsUUFBUSxFQUFFLENBQUM7NkJBQ1osQ0FBQyxDQUFBO3dCQUNKLENBQUM7cUJBQ0Y7aUJBQ0Y7YUFDRjtZQUVELE1BQU0sQ0FBQyxRQUFRLENBQUE7UUFDakIsQ0FBQztRQUNILGlDQUFDO0lBQUQsQ0ExYkEsQUEwYkMsSUFBQTtJQUVEO1FBQUE7WUFDUyxhQUFRLEdBQTJCO2dCQUN4QyxnQkFBZ0IsRUFBRSxHQUFHO2dCQUNyQixZQUFZLEVBQUUsR0FBRzthQUNsQixDQUFBO1lBQ00sZUFBVSxHQUFrRCwwQkFBMEIsQ0FBQTtZQUN0RixnQkFBVyxHQUFXLHVCQUF1QixDQUFBO1FBQ3RELENBQUM7UUFBRCx1QkFBQztJQUFELENBUEEsQUFPQyxJQUFBO0lBUFksc0JBQWdCLG1CQU81QixDQUFBO0FBQ0gsQ0FBQyxFQTFkUyxLQUFLLEtBQUwsS0FBSyxRQTBkZCIsImZpbGUiOiJzY3JpcHRzL2V4cGxvcmUtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIGZpYnJhIHtcbiAgJ3VzZSBzdHJpY3QnXG5cbiAgaW50ZXJmYWNlIElFeHBsb3JlQ29tcG9uZW50SW50ZXJmYWNlIGV4dGVuZHMgYW5ndWxhci5JQ29tcG9uZW50Q29udHJvbGxlciB7XG4gIH1cblxuICBpbnRlcmZhY2UgSUV4cGxvcmVTY29wZSBleHRlbmRzIGFuZ3VsYXIuSVNjb3BlIHtcbiAgICBsYXlvdXQ6IHsgY2hvaWNlOiBzdHJpbmcgfVxuICB9XG5cbiAgaW50ZXJmYWNlIElHcmlkTm9kZSBleHRlbmRzIGQzLlNpbXVsYXRpb25Ob2RlRGF0dW0ge1xuICAgIGd4PzogbnVtYmVyXG4gICAgZ3k/OiBudW1iZXJcbiAgfVxuXG4gIGludGVyZmFjZSBJRXhwbG9yZUl0ZW0gZXh0ZW5kcyBJdGVtLCBJR3JpZE5vZGUge1xuICB9XG5cbiAgaW50ZXJmYWNlIElFeHBsb3JlSXRlbUxpbmsgZXh0ZW5kcyBkMy5TaW11bGF0aW9uTGlua0RhdHVtPElFeHBsb3JlSXRlbT4ge1xuICAgIHByb3BlcnR5PzogUHJvcGVydHlUb1ZhbHVlczxJTm9kZVBsdXNMYWJlbD5cbiAgfVxuXG4gIGNsYXNzIEV4cGxvcmVDb21wb25lbnRDb250cm9sbGVyIHtcbiAgICBwdWJsaWMgaXRlbVNlcnZpY2U6IFNwYXJxbEl0ZW1TZXJ2aWNlXG4gICAgLy8gcHVibGljIGl0ZW1zOiBJdGVtW10gPSBbXVxuICAgIHB1YmxpYyBzZWxlY3RlZEl0ZW06IElOb2RlXG4gICAgcHVibGljIHByb3BlcnRpZXM6IHt9W11cbiAgICBwdWJsaWMgY2xhc3NUcmVlUHJvbWlzZTogYW5ndWxhci5JUHJvbWlzZTxUcmVlTm9kZVtdPlxuICAgIHByaXZhdGUgc3ZnU2VsOiBkMy5TZWxlY3Rpb248U1ZHU1ZHRWxlbWVudCwge30sIG51bGwsIHVuZGVmaW5lZD5cbiAgICBwcml2YXRlIGxpbmtzOiBJRXhwbG9yZUl0ZW1MaW5rW11cbiAgICBwcml2YXRlIGZvcmNlU2ltOiBkMy5TaW11bGF0aW9uPElFeHBsb3JlSXRlbSwgSUV4cGxvcmVJdGVtTGluaz5cbiAgICBwcml2YXRlIG9yZGVyZWRUeXBlczogc3RyaW5nW10gPSBbJ2h0dHA6Ly93d3cuY2lkb2MtY3JtLm9yZy9jaWRvYy1jcm0vRTIxX1BlcnNvbicsICdodHRwOi8vd3d3LmNpZG9jLWNybS5vcmcvY2lkb2MtY3JtL0U1M19QbGFjZScsICdodHRwOi8vd3d3LmNpZG9jLWNybS5vcmcvY2lkb2MtY3JtL0U3NF9Hcm91cCddXG4gICAgcHJpdmF0ZSBwcmltYXJ5SXRlbXM6IEl0ZW1bXSA9IFtdXG4gICAgcHJpdmF0ZSBzZWNvbmRhcnlJdGVtczogSXRlbVtdID0gW11cbiAgICBwcml2YXRlIHRlcnRpYXJ5SXRlbXM6IEl0ZW1bXSA9IFtdXG4gICAgcHJpdmF0ZSBpdGVtX2luZm9fdGlwOiBkMy5TZWxlY3Rpb248SFRNTERpdkVsZW1lbnQsIHt9LCBIVE1MQm9keUVsZW1lbnQsIHVuZGVmaW5lZD5cbiAgICBwcml2YXRlIHJhZGl1czogbnVtYmVyID0gOFxuICAgIHByaXZhdGUgdG9vbHRpcDogZDMuU2VsZWN0aW9uPEhUTUxEaXZFbGVtZW50LCB7fSwgSFRNTEJvZHlFbGVtZW50LCB1bmRlZmluZWQ+XG4gICAgcHJpdmF0ZSBlZGl0dGlwOiBkMy5TZWxlY3Rpb248SFRNTERpdkVsZW1lbnQsIHt9LCBIVE1MQm9keUVsZW1lbnQsIHVuZGVmaW5lZD5cbiAgICBwcml2YXRlIGRyYWdsaW5lOiBkMy5TZWxlY3Rpb248U1ZHTGluZUVsZW1lbnQsIHt9LCBudWxsLCB1bmRlZmluZWQ+XG4gICAgcHJpdmF0ZSBleHBsb3JlV2lkdGg6IG51bWJlclxuICAgIHByaXZhdGUgZXhwbG9yZUhlaWdodDogbnVtYmVyXG4gICAgcHJpdmF0ZSBncmlkT2Zmc2V0OiBudW1iZXIgPSA1MCAvLyBTaG91bGQgYmUgZXZlblxuICAgIHByaXZhdGUgY2hhcmdlRm9yY2U6IGQzLkZvcmNlQ29sbGlkZTxJRXhwbG9yZUl0ZW0+ID0gZDMuZm9yY2VDb2xsaWRlPElFeHBsb3JlSXRlbT4odGhpcy5ncmlkT2Zmc2V0LzEuNSlcbiAgICBwcml2YXRlIGNoYXJnZUZvcmNlMjogZDMuRm9yY2VDb2xsaWRlPElFeHBsb3JlSXRlbT4gPSBkMy5mb3JjZUNvbGxpZGU8SUV4cGxvcmVJdGVtPih0aGlzLmdyaWRPZmZzZXQvMS41KVxuXG4gICAgcHJpdmF0ZSBkcmF3bW9kZTogYm9vbGVhbiA9IGZhbHNlXG5cbiAgICBwdWJsaWMgJHBvc3RMaW5rKCk6IHZvaWQge1xuICAgICAgdGhpcy5zdmdTZWwgPSBkMy5zZWxlY3QodGhpcy4kZWxlbWVudFswXSkuc2VsZWN0PFNWR1NWR0VsZW1lbnQ+KCdzdmcnKVxuICAgICAgLy8gQ3JlYXRlIGxpbmsgZ1xuICAgICAgdGhpcy5zdmdTZWwuYXBwZW5kKCdnJykuYXR0cignY2xhc3MnLCAnbGlua3MnKVxuXG4gICAgICB0aGlzLmZvcmNlU2ltID0gZDMuZm9yY2VTaW11bGF0aW9uPElFeHBsb3JlSXRlbSwgSUV4cGxvcmVJdGVtTGluaz4oKVxuICAgICAgICAuZm9yY2UoJ2NoYXJnZScsIHRoaXMuY2hhcmdlRm9yY2UpXG4gICAgICAgIC5mb3JjZSgnY2hhcmdlMicsIHRoaXMuY2hhcmdlRm9yY2UyKVxuICAgICAgICAuZm9yY2UoJ2xpbmsnLCBkMy5mb3JjZUxpbmsoKS5kaXN0YW5jZSg0MCkuc3RyZW5ndGgoMSkuaXRlcmF0aW9ucygxKS5pZCgoZDogSUV4cGxvcmVJdGVtKSA9PiAnJyArIGQuaW5kZXgpKVxuXG4gICAgICB0aGlzLml0ZW1faW5mb190aXAgPSBkMy5zZWxlY3QoJ2JvZHknKS5hcHBlbmQ8SFRNTERpdkVsZW1lbnQ+KCdkaXYnKVxuICAgICAgICAuYXR0cignaWQnLCAnaXRlbV9pbmZvX3RpcCcpXG4gICAgICAgIC5zdHlsZSgncG9zaXRpb24nLCAnYWJzb2x1dGUnKVxuICAgICAgICAuc3R5bGUoJ3otaW5kZXgnLCAnMjAnKVxuICAgICAgICAuc3R5bGUoJ2JhY2tncm91bmQtY29sb3InLCAnd2hpdGUnKVxuICAgICAgICAuc3R5bGUoJ3BhZGRpbmcnLCAnM3B4JylcbiAgICAgICAgLnN0eWxlKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpXG5cbiAgICAgIHRoaXMucmFkaXVzID0gOFxuXG4gICAgICB0aGlzLnRvb2x0aXAgPSBkMy5zZWxlY3QoJ2JvZHknKS5hcHBlbmQ8SFRNTERpdkVsZW1lbnQ+KCdkaXYnKVxuICAgICAgICAuc3R5bGUoJ3Bvc2l0aW9uJywgJ2Fic29sdXRlJylcbiAgICAgICAgLnN0eWxlKCd6LWluZGV4JywgJzIwJylcbiAgICAgICAgLnN0eWxlKCdiYWNrZ3JvdW5kLWNvbG9yJywgJ2dyYXknKVxuICAgICAgICAuc3R5bGUoJ2NvbG9yJywgJ3doaXRlJylcbiAgICAgICAgLnN0eWxlKCdwYWRkaW5nJywgJzNweCcpXG4gICAgICAgIC5zdHlsZSgnYm9yZGVyLXJhZGl1cycsICcycHgnKVxuICAgICAgICAuc3R5bGUoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJylcblxuICAgICAgdGhpcy5lZGl0dGlwID0gZDMuc2VsZWN0KCdib2R5JykuYXBwZW5kPEhUTUxEaXZFbGVtZW50PignZGl2JylcbiAgICAgICAgLmF0dHIoJ2lkJywgJ2VkaXR0aXAnKVxuICAgICAgICAuc3R5bGUoJ3Bvc2l0aW9uJywgJ2Fic29sdXRlJylcbiAgICAgICAgLnN0eWxlKCd6LWluZGV4JywgJzQwJylcbiAgICAgICAgLnN0eWxlKCdiYWNrZ3JvdW5kLWNvbG9yJywgJ3doaXRlJylcbiAgICAgICAgLnN0eWxlKCdjb2xvcicsICdncmF5JylcbiAgICAgICAgLnN0eWxlKCdib3JkZXInLCAnMXB4IHNvbGlkIGdyYXknKVxuICAgICAgICAuc3R5bGUoJ3BhZGRpbmcnLCAnM3B4JylcbiAgICAgICAgLnN0eWxlKCdib3JkZXItcmFkaXVzJywgJzJweCcpXG4gICAgICAgIC5zdHlsZSgndmlzaWJpbGl0eScsICdoaWRkZW4nKVxuXG4gICAgICB0aGlzLnVwZGF0ZVNpemluZygpO1xuXG4gICAgICB0aGlzLnF1ZXJ5QW5kQnVpbGQoKVxuICAgIH1cblxuICAgIHB1YmxpYyBxdWVyeUFuZEJ1aWxkKCk6IGFuZ3VsYXIuSVByb21pc2U8c3RyaW5nPiB7XG4gICAgICByZXR1cm4gdGhpcy5jbGFzc1RyZWVQcm9taXNlLnRoZW4oY3QgPT4gdGhpcy5pdGVtU2VydmljZS5nZXRJdGVtc0ZvckV4cGxvcmUoKS50aGVuKFxuICAgICAgICAoaXRlbXM6IEl0ZW1bXSkgPT4ge1xuICAgICAgICAgIHRoaXMucHJpbWFyeUl0ZW1zID0gdGhpcy5maWx0ZXJJdGVtc0J5VHlwZShpdGVtcywgdGhpcy5vcmRlcmVkVHlwZXNbMF0pXG4gICAgICAgICAgdGhpcy5zZWNvbmRhcnlJdGVtcyA9IHRoaXMuZmlsdGVySXRlbXNCeVR5cGUoaXRlbXMsIHRoaXMub3JkZXJlZFR5cGVzWzFdKVxuICAgICAgICAgIHRoaXMudGVydGlhcnlJdGVtcyA9IHRoaXMuZmlsdGVySXRlbXNCeVR5cGUoaXRlbXMsIHRoaXMub3JkZXJlZFR5cGVzWzJdKVxuICAgICAgICAgIHRoaXMucHJvcGVydGllcyA9IFtdXG4gICAgICAgICAgZm9yIChsZXQgcCBvZiB0aGlzLnByaW1hcnlJdGVtc1swXS5sb2NhbFByb3BlcnRpZXMpXG4gICAgICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaCh7a2V5OiBwLnRvQ2Fub25pY2FsKCksIHZhbHVlOiBwLmxhYmVsLnZhbHVlIH0pXG4gICAgICAgICAgdGhpcy5saW5rcyA9IHRoaXMubWVyZ2VMaW5rcyh0aGlzLmxpbmtzKVxuICAgICAgICAgIHJldHVybiAnb2snO1xuICAgICAgICB9KVxuICAgICAgKS50aGVuKCgpID0+IHRoaXMudXBkYXRlRXhwbG9yZSgpKVxuICAgIH1cblxuICAgIHByaXZhdGUgZmlsdGVySXRlbXNCeVR5cGUoaXRlbXM6IEl0ZW1bXSwgdHlwZTogc3RyaW5nKTogSXRlbVtdIHtcbiAgICAgIHJldHVybiBpdGVtcy5maWx0ZXIoKGl0KSA9PiB7XG4gICAgICAgIGxldCB0eXBlUHJvcCA9IGl0LmxvY2FsUHJvcGVydGllcy5maWx0ZXIoKHByKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHByLnZhbHVlID09PSAnaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zI3R5cGUnXG4gICAgICAgIH0pXG4gICAgICAgIGlmKHR5cGVQcm9wWzBdKSB7XG4gICAgICAgICAgcmV0dXJuIHR5cGVQcm9wWzBdLnZhbHVlcy5tYXAoKHYpID0+IHsgcmV0dXJuIHYudmFsdWU7IH0pLmluZGV4T2YodHlwZSkgIT09IC0xXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlU2l6aW5nKCk6IHZvaWQge1xuICAgICAgLy8gYWxsb3cgaXRlbV9pbmZvX3RpcCB0byBleHBhbmQgc29tZWhvd1xuICAgICAgLy8gYWRkIGRlbGV0ZSBhbmQgYWx0ZXIgYWJpbGl0eSB0byBzcGFycWwtaXRlbS5wdWdcbiAgICAgIC8vIGZpeCBob3cgbGlua3Mgc2l0IG9uIHRvcCBvZiBub2Rlc1xuICAgICAgbGV0IHZpZXdwb3J0X3dpZHRoOiBudW1iZXIgPSB3aW5kb3cuaW5uZXJXaWR0aFxuICAgICAgbGV0IHZpZXdwb3J0X2hlaWdodDogbnVtYmVyID0gd2luZG93LmlubmVySGVpZ2h0XG4gICAgICBsZXQgc2VhcmNoYmFyd2lkdGg6IG51bWJlciA9ICtkMy5zZWxlY3QoJyNzZWFyY2hiYXInKS5zdHlsZSgnd2lkdGgnKS5yZXBsYWNlKCdweCcsICcnKVxuICAgICAgdGhpcy5leHBsb3JlV2lkdGggPSB2aWV3cG9ydF93aWR0aFxuICAgICAgdGhpcy5leHBsb3JlSGVpZ2h0ID0gdmlld3BvcnRfaGVpZ2h0IC0gMzZcblxuICAgICAgZDMuc2VsZWN0KHRoaXMuJGVsZW1lbnRbMF0pLnNlbGVjdCgnI2V4cGxvcmVjb250YWluZXInKVxuICAgICAgICAuc3R5bGUoJ3dpZHRoJywgdGhpcy5leHBsb3JlV2lkdGggKyAncHgnKVxuICAgICAgICAuc3R5bGUoJ2hlaWdodCcsIHRoaXMuZXhwbG9yZUhlaWdodCArICdweCcpXG5cbiAgICAgIGQzLnNlbGVjdCh0aGlzLiRlbGVtZW50WzBdLnBhcmVudEVsZW1lbnQpLnNlbGVjdCgnI3NlYXJjaGJhcicpXG4gICAgICAgIC5zdHlsZSgndG9wJywgdmlld3BvcnRfaGVpZ2h0ICogNiAvIDcgKyAncHgnKVxuICAgICAgICAuc3R5bGUoJ2xlZnQnLCB2aWV3cG9ydF93aWR0aCAvIDIgLSBzZWFyY2hiYXJ3aWR0aCAvIDIgKyAncHgnKVxuICAgICAgICAuc3R5bGUoJ2Rpc3BsYXknLCAnYmxvY2snKVxuXG4gICAgICAvLyBtb3ZlIHRhYmxlIGRvd24gc28gdG9wIGlzIGF0IGJvdHRvbSBvZiB2aWV3cG9ydFxuICAgICAgZDMuc2VsZWN0KHRoaXMuJGVsZW1lbnRbMF0pLnNlbGVjdCgnI2V4cGxvcmV0YWJsZScpXG4gICAgICAgIC5zdHlsZSgnd2lkdGgnLCB2aWV3cG9ydF93aWR0aCArICdweCcpXG4gICAgICAgIC5zdHlsZSgnaGVpZ2h0Jywgdmlld3BvcnRfaGVpZ2h0IC0gNTAgKyAncHgnKVxuXG4gICAgICB0aGlzLnN2Z1NlbC5zdHlsZSgnd2lkdGgnLCB2aWV3cG9ydF93aWR0aCArICdweCcpXG4gICAgICAgIC5zdHlsZSgnaGVpZ2h0Jywgdmlld3BvcnRfaGVpZ2h0IC0gMzYgKyAncHgnKVxuICAgICAgICAvLyAuc3R5bGUoJ3RvcCcsIDI1ICsgJ3B4JylcblxuICAgICAgbGV0IHN2Z193aWR0aDogbnVtYmVyID0gK3RoaXMuc3ZnU2VsLnN0eWxlKCd3aWR0aCcpLnJlcGxhY2UoJ3B4JywgJycpXG4gICAgICBsZXQgc3ZnX2hlaWdodDogbnVtYmVyID0gK3RoaXMuc3ZnU2VsLnN0eWxlKCdoZWlnaHQnKS5yZXBsYWNlKCdweCcsICcnKVxuXG4gICAgICB0aGlzLmZvcmNlU2ltLmZvcmNlKCdjZW50ZXInLCBkMy5mb3JjZUNlbnRlcihzdmdfd2lkdGggLyAyLCBzdmdfaGVpZ2h0IC8gMikpXG4gICAgICB0aGlzLmZvcmNlU2ltLmZvcmNlKCd4cG9zaXRpb24nLCBkMy5mb3JjZVgoc3ZnX3dpZHRoIC8gMikuc3RyZW5ndGgoMC4wMSkpXG4gICAgICB0aGlzLmZvcmNlU2ltLmZvcmNlKCd5cG9zaXRpb24nLCBkMy5mb3JjZVkoc3ZnX2hlaWdodCAvIDIpLnN0cmVuZ3RoKDAuMDEpKVxuXG4gICAgICAvLyBCdWlsZCBncmlkc1xuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhcHBlbmROb2RlcyhlbnRlclNlbGVjdGlvbjogZDMuU2VsZWN0aW9uPGQzLkJhc2VUeXBlLCB7fSwgU1ZHU1ZHRWxlbWVudCwge30+LCBjbGFzc05hbWU6IHN0cmluZykge1xuICAgICAgcmV0dXJuIGVudGVyU2VsZWN0aW9uLmFwcGVuZCgnZycpXG4gICAgICAgICAgLmF0dHIoJ2lkJywgKGQsIGk6IG51bWJlcikgPT4gJ25vZGUtJyArIGkgKyAnLScgKyBjbGFzc05hbWUpXG4gICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ25vZGUnKVxuICAgICAgICAuYXBwZW5kKCdjaXJjbGUnKVxuICAgICAgICAgIC5jbGFzc2VkKCdub2RlLWNpcmNsZScsIHRydWUpXG4gICAgICAgICAgLmNsYXNzZWQoY2xhc3NOYW1lLCB0cnVlKVxuICAgICAgICAgIC5hdHRyKCdpZCcsIChkLCBpOiBudW1iZXIpID0+ICdub2RlLWNpcmNsZS0nICsgaSArICctJyArIGNsYXNzTmFtZSlcbiAgICAgICAgICAuc3R5bGUoJ3N0cm9rZScsICdibGFjaycpXG4gICAgICAgICAgLmF0dHIoJ3InLCB0aGlzLnJhZGl1cyArICdweCcpXG4gICAgICAgICAgLmNhbGwoZDMuZHJhZygpXG4gICAgICAgICAgICAgIC5vbignc3RhcnQnLCAoZDogSUV4cGxvcmVJdGVtLCBpOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZHJhd21vZGUpIHtcbiAgICAgICAgICAgICAgICAgIGQuZnggPSBkLnhcbiAgICAgICAgICAgICAgICAgIGQuZnkgPSBkLnlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYWdsaW5lID0gdGhpcy5zdmdTZWwuYXBwZW5kPFNWR0xpbmVFbGVtZW50PignbGluZScpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdkcmFnTGluZScpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLm9uKCdkcmFnJywgKGQ6IElFeHBsb3JlSXRlbSwgaTogbnVtYmVyLCBncm91cCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5kcmF3bW9kZSkge1xuICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KGdyb3VwW2ldKS5jbGFzc2VkKCdmaXhlZCcsIHRydWUpXG4gICAgICAgICAgICAgICAgICBkLnggPSBkMy5ldmVudC54XG4gICAgICAgICAgICAgICAgICBkLnkgPSBkMy5ldmVudC55XG4gICAgICAgICAgICAgICAgICBpZiAoZDMuc2VsZWN0KGdyb3VwW2ldKS5jbGFzc2VkKCdzZWxlY3RlZC1jaXJjbGUnKSkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtX2luZm9fdGlwLnN0eWxlKCd0b3AnLCAoZDMuZXZlbnQueSArIDMwKSArICdweCcpXG4gICAgICAgICAgICAgICAgICAuc3R5bGUoJ2xlZnQnLCAoZDMuZXZlbnQueCArIDMwKSArICdweCcpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuZHJhZ2xpbmUuYXR0cigneDEnLCBkLnghKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneTEnLCBkLnkhKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneDInLCBkMy5ldmVudC54KVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneTInLCBkMy5ldmVudC55KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUV4cGxvcmUoZmFsc2UsIGZhbHNlKVxuICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLm9uKCdlbmQnLCAgKGQ6IElFeHBsb3JlSXRlbSwgaTogbnVtYmVyLCBncm91cCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5kcmF3bW9kZSkge1xuICAgICAgICAgICAgICAgICAgaWYgKCFkMy5zZWxlY3QoZ3JvdXBbaV0pLmNsYXNzZWQoJ2ZpeGVkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgZC5meCA9IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICBkLmZ5ID0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGxldCBsaW5lWDogbnVtYmVyID0gK3RoaXMuZHJhZ2xpbmUuYXR0cigneDInKVxuICAgICAgICAgICAgICAgICAgbGV0IGxpbmVZOiBudW1iZXIgPSArdGhpcy5kcmFnbGluZS5hdHRyKCd5MicpXG5cbiAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdEFsbCgnLm5vZGUnKVxuICAgICAgICAgICAgICAgICAgICAuZWFjaCgoZjogSUV4cGxvcmVJdGVtLCBqKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKGxpbmVYIC0gZi54KSA8IHRoaXMucmFkaXVzICYmIE1hdGguYWJzKGxpbmVZIC0gZi55KSA8IHRoaXMucmFkaXVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxpbmtzLnB1c2goeydzb3VyY2UnOiBkLCAndGFyZ2V0JzogZiwgJ3Byb3BlcnR5JzogdW5kZWZpbmVkfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRXhwbG9yZShmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB0aGlzLmRyYWdsaW5lLnJlbW92ZSgpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAub24oJ21vdXNlb3ZlcicsIChkOiBJRXhwbG9yZUl0ZW0sIGk6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRMaW5rcyhkLCBpKVxuICAgICAgICAgICAgdGhpcy50b29sdGlwLnN0eWxlKCd0b3AnLCAoZDMuZXZlbnQucGFnZVkgLSAxMCkgKyAncHgnKVxuICAgICAgICAgICAgICAuc3R5bGUoJ2xlZnQnLCAoZDMuZXZlbnQucGFnZVggKyAxMCkgKyAncHgnKVxuICAgICAgICAgICAgICAuc3R5bGUoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpXG4gICAgICAgICAgICAgIC50ZXh0KGQubGFiZWwudmFsdWUpXG4gICAgICAgICAgfSlcbiAgICAgICAgICAub24oJ21vdXNlb3V0JywgKGQ6IElFeHBsb3JlSXRlbSwgaTogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN2Z1NlbC5zZWxlY3RBbGwoJ2xpbmUnKS5jbGFzc2VkKCdyZWxldmFudCcsIGZhbHNlKVxuICAgICAgICAgICAgdGhpcy50b29sdGlwLnN0eWxlKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpXG4gICAgICAgICAgfSlcbiAgICAgICAgICAub24oJ2NsaWNrJywgKGQ6IElFeHBsb3JlSXRlbSwgaSwgZ3JvdXApID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3ZnU2VsLnNlbGVjdEFsbCgnLm5vZGUtY2lyY2xlJylcbiAgICAgICAgICAgICAgLmNsYXNzZWQoJ3NlbGVjdGVkLWNpcmNsZScsIGZhbHNlKVxuICAgICAgICAgICAgICAuYXR0cigncicsIHRoaXMucmFkaXVzICsgJ3B4JylcbiAgICAgICAgICAgIGQzLnNlbGVjdChncm91cFtpXSlcbiAgICAgICAgICAgICAgLmNsYXNzZWQoJ3NlbGVjdGVkLWNpcmNsZScsIHRydWUpXG4gICAgICAgICAgICAgIC5hdHRyKCdyJywgdGhpcy5yYWRpdXMgKyAzICsgJ3B4JylcbiAgICAgICAgICAgIHRoaXMudG9vbHRpcC5zdHlsZSgndmlzaWJpbGl0eScsICdoaWRkZW4nKVxuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRMaW5rcyhkLCBpKVxuICAgICAgICAgICAgdGhpcy4kc2NvcGUuJGFwcGx5KCgpID0+IHRoaXMuc2VsZWN0SXRlbShkKSlcbiAgICAgICAgICAgIHRoaXMuaXRlbV9pbmZvX3RpcC5zdHlsZSgndG9wJywgKGQzLmV2ZW50LnBhZ2VZIC0gMTApICsgJ3B4JylcbiAgICAgICAgICAgIC5zdHlsZSgnbGVmdCcsIChkMy5ldmVudC5wYWdlWCArIDE3KSArICdweCcpXG4gICAgICAgICAgICAuc3R5bGUoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpXG4gICAgICAgICAgICBsZXQgY3Njb3BlOiBhbmd1bGFyLklTY29wZSA9IHRoaXMuJHNjb3BlLiRuZXcodHJ1ZSlcbiAgICAgICAgICAgIGNzY29wZVsnbm9kZSddID0gZFxuICAgICAgICAgICAgdGhpcy5pdGVtX2luZm9fdGlwLnNlbGVjdEFsbCgnKicpLnJlbW92ZSgpXG4gICAgICAgICAgICB0aGlzLml0ZW1faW5mb190aXAubm9kZSgpLmFwcGVuZENoaWxkKHRoaXMuJGNvbXBpbGUoJzxzcGFycWwtaXRlbSBpdGVtLWlkPVwibm9kZVwiPjwvc3BhcnFsLWl0ZW0+JykoY3Njb3BlKVswXSlcbiAgICAgICAgICB9KVxuICAgIH1cblxuICAgIHByaXZhdGUgc25hcFRvR3JpZCh4OiBudW1iZXIsIHk6IG51bWJlciwgcHJpbWFyeTogYm9vbGVhbiA9IHRydWUpOiBudW1iZXJbXSB7XG4gICAgICBsZXQgc3g6IG51bWJlciwgc3k6IG51bWJlclxuICAgICAgLy8gU25hcCB0byBncmlkT2Zmc2V0IHdpdGggZnVydGhlciBvZmZzZXQgZm9yIG11bHRpcGxlc1xuICAgICAgaWYocHJpbWFyeSkge1xuICAgICAgICBzeCA9IE1hdGgucm91bmQoeCAvIHRoaXMuZ3JpZE9mZnNldCkgKiB0aGlzLmdyaWRPZmZzZXRcbiAgICAgICAgc3kgPSBNYXRoLnJvdW5kKHkgLyB0aGlzLmdyaWRPZmZzZXQpICogdGhpcy5ncmlkT2Zmc2V0XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzeCA9IE1hdGgucm91bmQoeCAvIHRoaXMuZ3JpZE9mZnNldCkgKiB0aGlzLmdyaWRPZmZzZXQgLSB0aGlzLmdyaWRPZmZzZXQvMlxuICAgICAgICBzeSA9IE1hdGgucm91bmQoeSAvIHRoaXMuZ3JpZE9mZnNldCkgKiB0aGlzLmdyaWRPZmZzZXQgLSB0aGlzLmdyaWRPZmZzZXQvMlxuICAgICAgfVxuICAgICAgcmV0dXJuIFtzeCxzeV1cbiAgICB9XG5cbiAgICBwcml2YXRlIHRpY2tUcmFuc2Zvcm1Ob2RlcyhzZWw6IGQzLlNlbGVjdGlvbjxkMy5CYXNlVHlwZSwge30sIFNWR1NWR0VsZW1lbnQsIHt9PnxkMy5UcmFuc2l0aW9uPGQzLkJhc2VUeXBlLCB7fSwgU1ZHU1ZHRWxlbWVudCwge30+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmltYXJ5OiBib29sZWFuID0gdHJ1ZSApIHtcbiAgICAgIHNlbC5hdHRyKCd0cmFuc2Zvcm0nLCAoZDogSUV4cGxvcmVJdGVtLCBpKSA9PiB7XG4gICAgICAgIGxldCB4OiBudW1iZXIgPSBkLnghLCB5OiBudW1iZXIgPSBkLnkhXG4gICAgICAgIGlmIChkLnggPCB0aGlzLnJhZGl1cykgeCA9IHRoaXMucmFkaXVzXG4gICAgICAgIGlmIChkLnkgPCB0aGlzLnJhZGl1cykgeSA9IHRoaXMucmFkaXVzXG5cbiAgICAgICAgbGV0IFtneCxneV0gPSBbeCx5XVxuICAgICAgICBpZih0aGlzLiRzY29wZS5sYXlvdXQuY2hvaWNlID09PSAnZm9yY2VncmlkJykge1xuICAgICAgICAgIFtneCxneV0gPSB0aGlzLnNuYXBUb0dyaWQoeCx5LHByaW1hcnkpXG4gICAgICAgIH1cbiAgICAgICAgZC5neCA9IGd4XG4gICAgICAgIGQuZ3kgPSBneVxuXG4gICAgICAgIHJldHVybiAndHJhbnNsYXRlKCcgKyBneCArICcsICcgKyBneSArICcpJ1xuICAgICAgfSlcbiAgICB9XG5cbiAgICBwcml2YXRlIGdlbmVyaWNUaWNrKHByaW1hcnlOb2RlczogZDMuU2VsZWN0aW9uPGQzLkJhc2VUeXBlLCB7fSwgU1ZHU1ZHRWxlbWVudCwge30+LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kYXJ5Tm9kZXM6IGQzLlNlbGVjdGlvbjxkMy5CYXNlVHlwZSwge30sIFNWR1NWR0VsZW1lbnQsIHt9PixcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmtMaW5lczogZDMuU2VsZWN0aW9uPFNWR0xpbmVFbGVtZW50LCBJRXhwbG9yZUl0ZW1MaW5rLCBTVkdHRWxlbWVudCwge30+LFxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogYm9vbGVhbiA9IGZhbHNlKSB7XG5cbiAgICAgIGxldCBsUHJpbWFyeU5vZGVzOiBkMy5TZWxlY3Rpb248ZDMuQmFzZVR5cGUsIHt9LCBTVkdTVkdFbGVtZW50LCB7fT58ZDMuVHJhbnNpdGlvbjxkMy5CYXNlVHlwZSwge30sIFNWR1NWR0VsZW1lbnQsIHt9PiA9IHByaW1hcnlOb2Rlc1xuICAgICAgbGV0IGxTZWNvbmRhcnlOb2RlczogZDMuU2VsZWN0aW9uPGQzLkJhc2VUeXBlLCB7fSwgU1ZHU1ZHRWxlbWVudCwge30+fGQzLlRyYW5zaXRpb248ZDMuQmFzZVR5cGUsIHt9LCBTVkdTVkdFbGVtZW50LCB7fT4gPSBzZWNvbmRhcnlOb2Rlc1xuICAgICAgbGV0IGxMaW5rTGluZXM6IGQzLlNlbGVjdGlvbjxTVkdMaW5lRWxlbWVudCwgSUV4cGxvcmVJdGVtTGluaywgU1ZHR0VsZW1lbnQsIHt9PnxkMy5UcmFuc2l0aW9uPFNWR0xpbmVFbGVtZW50LCBJRXhwbG9yZUl0ZW1MaW5rLCBTVkdHRWxlbWVudCwge30+ID0gbGlua0xpbmVzXG4gICAgICBpZih0cmFuc2l0aW9uKSB7XG4gICAgICAgIGxQcmltYXJ5Tm9kZXMgPSBsUHJpbWFyeU5vZGVzLnRyYW5zaXRpb24oKVxuICAgICAgICBsU2Vjb25kYXJ5Tm9kZXMgPSBsU2Vjb25kYXJ5Tm9kZXMudHJhbnNpdGlvbigpXG4gICAgICAgIGxMaW5rTGluZXMgPSBsTGlua0xpbmVzLnRyYW5zaXRpb24oKVxuICAgICAgfVxuXG4gICAgICB0aGlzLnRpY2tUcmFuc2Zvcm1Ob2RlcyhsUHJpbWFyeU5vZGVzLCB0cnVlKVxuICAgICAgdGhpcy50aWNrVHJhbnNmb3JtTm9kZXMobFNlY29uZGFyeU5vZGVzLCBmYWxzZSlcblxuICAgICAgbExpbmtMaW5lc1xuICAgICAgICAuYXR0cigneDEnLCAoZDogSUV4cGxvcmVJdGVtTGluaykgPT4gKDxJRXhwbG9yZUl0ZW0+ZC5zb3VyY2UpLmd4ISlcbiAgICAgICAgLmF0dHIoJ3kxJywgKGQ6IElFeHBsb3JlSXRlbUxpbmspID0+ICg8SUV4cGxvcmVJdGVtPmQuc291cmNlKS5neSEpXG4gICAgICAgIC5hdHRyKCd4MicsIChkOiBJRXhwbG9yZUl0ZW1MaW5rKSA9PiAoPElFeHBsb3JlSXRlbT5kLnRhcmdldCkuZ3ghKVxuICAgICAgICAuYXR0cigneTInLCAoZDogSUV4cGxvcmVJdGVtTGluaykgPT4gKDxJRXhwbG9yZUl0ZW0+ZC50YXJnZXQpLmd5ISlcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZUV4cGxvcmUocnVuU2ltOiBib29sZWFuID0gdHJ1ZSwgdHJhbnNpdGlvbjogYm9vbGVhbiA9IGZhbHNlKTogYW5ndWxhci5JUHJvbWlzZTxzdHJpbmc+IHtcblxuICAgICAgbGV0IHByaW1hcnlOb2RlczogZDMuU2VsZWN0aW9uPGQzLkJhc2VUeXBlLCB7fSwgU1ZHU1ZHRWxlbWVudCwge30+ID0gdGhpcy5zdmdTZWxcbiAgICAgICAgICAuc2VsZWN0QWxsPFNWR0VsZW1lbnQsIElFeHBsb3JlSXRlbT4oJ2NpcmNsZS5wcmltYXJ5JylcbiAgICAgICAgLmRhdGEodGhpcy5wcmltYXJ5SXRlbXMsIChkOiBJdGVtKSA9PiBkLnZhbHVlKVxuICAgICAgbGV0IHNlY29uZGFyeU5vZGVzOiBkMy5TZWxlY3Rpb248ZDMuQmFzZVR5cGUsIHt9LCBTVkdTVkdFbGVtZW50LCB7fT4gPSB0aGlzLnN2Z1NlbFxuICAgICAgICAgIC5zZWxlY3RBbGw8U1ZHRWxlbWVudCwgSUV4cGxvcmVJdGVtPignY2lyY2xlLnNlY29uZGFyeScpXG4gICAgICAgIC5kYXRhKHRoaXMuc2Vjb25kYXJ5SXRlbXMsIChkOiBJdGVtKSA9PiBkLnZhbHVlKVxuXG4gICAgICBwcmltYXJ5Tm9kZXMuZXhpdCgpLnJlbW92ZSgpXG4gICAgICBzZWNvbmRhcnlOb2Rlcy5leGl0KCkucmVtb3ZlKClcblxuICAgICAgcHJpbWFyeU5vZGVzID0gcHJpbWFyeU5vZGVzLm1lcmdlKHRoaXMuYXBwZW5kTm9kZXMocHJpbWFyeU5vZGVzLmVudGVyKCksICdwcmltYXJ5JykpXG4gICAgICBzZWNvbmRhcnlOb2RlcyA9IHNlY29uZGFyeU5vZGVzLm1lcmdlKHRoaXMuYXBwZW5kTm9kZXMoc2Vjb25kYXJ5Tm9kZXMuZW50ZXIoKSwgJ3NlY29uZGFyeScpKVxuXG4gICAgICBsZXQgbGlua0xpbmVzOiBkMy5TZWxlY3Rpb248U1ZHTGluZUVsZW1lbnQsIElFeHBsb3JlSXRlbUxpbmssIFNWR0dFbGVtZW50LCB7fT4gPSB0aGlzLnN2Z1NlbFxuICAgICAgICAgIC5zZWxlY3Q8U1ZHR0VsZW1lbnQ+KCdnLmxpbmtzJylcbiAgICAgICAgICAuc2VsZWN0QWxsPFNWR0xpbmVFbGVtZW50LCBJRXhwbG9yZUl0ZW1MaW5rPignbGluZScpXG4gICAgICAgIC5kYXRhKHRoaXMubGlua3MpXG5cbiAgICAgIGxpbmtMaW5lcy5leGl0KCkucmVtb3ZlKClcblxuICAgICAgbGlua0xpbmVzPSBsaW5rTGluZXNcbiAgICAgICAgLmVudGVyKCkuYXBwZW5kPFNWR0xpbmVFbGVtZW50PignbGluZScpXG4gICAgICAgICAgLmF0dHIoJ2lkJywgKGQ6IElFeHBsb3JlSXRlbUxpbmssIGk6IG51bWJlcikgPT4gJ2xpbmstJyArIGkpXG4gICAgICAgIC5tZXJnZShsaW5rTGluZXMpXG5cbiAgICAgIHRoaXMuZm9yY2VTaW0uc3RvcCgpXG4gICAgICBsZXQgb25UaWNrID0gdGhpcy5nZW5lcmljVGljay5iaW5kKHRoaXMsIHByaW1hcnlOb2Rlcywgc2Vjb25kYXJ5Tm9kZXMsIGxpbmtMaW5lcywgZmFsc2UpXG4gICAgICB0aGlzLmZvcmNlU2ltLm5vZGVzKHRoaXMucHJpbWFyeUl0ZW1zLmNvbmNhdCh0aGlzLnNlY29uZGFyeUl0ZW1zKSlcbiAgICAgICAgLm9uKCd0aWNrJywgb25UaWNrKVxuICAgICAgdGhpcy5mb3JjZVNpbVxuICAgICAgICAuZm9yY2U8ZDMuRm9yY2VMaW5rPElFeHBsb3JlSXRlbSwgSUV4cGxvcmVJdGVtTGluaz4+KCdsaW5rJykubGlua3ModGhpcy5saW5rcylcblxuICAgICAgLy8gQXBwbHkgZm9yY2VzIG9ubHkgdG8gb25lIHNldCBvZiBpdGVtcywgZGVwZW5kaW5nIG9uIGZvcmNlLlxuICAgICAgbGV0IGNvbGxpZGVGb3JjZSA9IHRoaXMuZm9yY2VTaW0uZm9yY2UoJ2NoYXJnZScpXG4gICAgICBsZXQgY29sbGlkZUZvcmNlMiA9IHRoaXMuZm9yY2VTaW0uZm9yY2UoJ2NoYXJnZTInKVxuICAgICAgbGV0IGNlbnRlckZvcmNlID0gdGhpcy5mb3JjZVNpbS5mb3JjZSgnY2VudGVyJylcbiAgICAgIGxldCB4cG9zaXRpb25Gb3JjZSA9IHRoaXMuZm9yY2VTaW0uZm9yY2UoJ3hwb3NpdGlvbicpXG4gICAgICBsZXQgeXBvc2l0aW9uRm9yY2UgPSB0aGlzLmZvcmNlU2ltLmZvcmNlKCd5cG9zaXRpb24nKVxuICAgICAgaWYoY29sbGlkZUZvcmNlLmluaXRpYWxpemUpIGNvbGxpZGVGb3JjZS5pbml0aWFsaXplKHRoaXMucHJpbWFyeUl0ZW1zKVxuICAgICAgaWYoY29sbGlkZUZvcmNlMi5pbml0aWFsaXplKSBjb2xsaWRlRm9yY2UyLmluaXRpYWxpemUodGhpcy5zZWNvbmRhcnlJdGVtcylcbiAgICAgIC8vIGlmKGNlbnRlckZvcmNlLmluaXRpYWxpemUpIGNlbnRlckZvcmNlLmluaXRpYWxpemUodGhpcy5wcmltYXJ5SXRlbXMpXG4gICAgICAvLyBpZih4cG9zaXRpb25Gb3JjZS5pbml0aWFsaXplKSB4cG9zaXRpb25Gb3JjZS5pbml0aWFsaXplKHRoaXMucHJpbWFyeUl0ZW1zKVxuICAgICAgLy8gaWYoeXBvc2l0aW9uRm9yY2UuaW5pdGlhbGl6ZSkgeXBvc2l0aW9uRm9yY2UuaW5pdGlhbGl6ZSh0aGlzLnByaW1hcnlJdGVtcylcblxuICAgICAgaWYocnVuU2ltKSB7XG4gICAgICAgIHRoaXMuZm9yY2VTaW0uYWxwaGEoMSkucmVzdGFydCgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmdlbmVyaWNUaWNrKHByaW1hcnlOb2Rlcywgc2Vjb25kYXJ5Tm9kZXMsIGxpbmtMaW5lcywgdHJhbnNpdGlvbilcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuJHEucmVzb2x2ZSgnb2snKVxuICAgIH1cblxuICAgIC8vIGN1cnJlbnRseSBicm9rZW4gb24gZGVsZXRpbmcgYSBsaW5rXG4gICAgcHVibGljIGhpZ2hsaWdodExpbmtzKGQ6IElFeHBsb3JlSXRlbSwgaTogbnVtYmVyKTogdm9pZCB7XG4gICAgICBkMy5zZWxlY3RBbGwoJ2xpbmUnKS5jbGFzc2VkKCdyZWxldmFudCcsIGZhbHNlKVxuICAgICAgZm9yIChsZXQgajogbnVtYmVyID0gMDsgaiA8IHRoaXMubGlua3MubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgbGV0IGxpbmtzb3VyY2U6IElFeHBsb3JlSXRlbSA9IDxJRXhwbG9yZUl0ZW0+dGhpcy5saW5rc1tqXS5zb3VyY2VcbiAgICAgICAgbGV0IGxpbmt0YXJnZXQ6IElFeHBsb3JlSXRlbSA9IDxJRXhwbG9yZUl0ZW0+dGhpcy5saW5rc1tqXS50YXJnZXRcbiAgICAgICAgaWYgKGxpbmtzb3VyY2UuaW5kZXggPT09IGkgfHwgbGlua3RhcmdldC5pbmRleCA9PT0gaSlcbiAgICAgICAgICAgIGQzLnNlbGVjdCgnI2xpbmstJyArIGopLmNsYXNzZWQoJ3JlbGV2YW50JywgdHJ1ZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc2VsZWN0SXRlbShpZDogSU5vZGUpOiB2b2lkIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtID0gaWRcbiAgICB9XG5cbiAgICAvLyBCVUc6IGFmdGVyIGRlbGV0aW5nIGl0ZW0sIGxpbmtzIHRoaW5rIG5vZGVzIGFyZSBpbiBvbGQgbG9jYXRpb25zIGFuZCBzdGF0aW9uYXJ5LCBpdGVtcyBhcmUgbm90IGdldHRpbmcgcmVib3VuZCB0byBuZXcgbm9kZXNcbiAgICBwdWJsaWMgZGVsZXRlKGlkOiBJTm9kZSk6IGFuZ3VsYXIuSVByb21pc2U8c3RyaW5nPiB7XG5cbiAgICAgIC8vIHJlbW92ZSBhbnkgbGlua3MgZnJvbSB0aGUgaXRlbSAtXG4gICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgdGhpcy5saW5rcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodGhpcy5saW5rc1tpXS5zb3VyY2UgPT09IGlkIHx8IHRoaXMubGlua3NbaV0udGFyZ2V0ID09PSBpZCkge1xuICAgICAgICAgIHRoaXMubGlua3Muc3BsaWNlKGksIDEpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIG1pZ2h0IG5lZWQgbW9yZSB0byBmdWxseSBjbGVhciBzdmcgb2YgZGVsZXRlZCBsaW5rc1xuXG4gICAgICBsZXQgcHJvbTogYW5ndWxhci5JUHJvbWlzZTxzdHJpbmc+ID0gdGhpcy5pdGVtU2VydmljZS5kZWxldGVJdGVtKGlkKVxuICAgICAgcHJvbS50aGVuKCgpID0+IHRoaXMuZmlicmFTZXJ2aWNlLmRpc3BhdGNoKCdjaGFuZ2UnKSlcbiAgICAgIHJldHVybiBwcm9tXG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkZWxlbWVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5LFxuICAgICAgICAgICAgICAgIHByaXZhdGUgJGNvbXBpbGU6IGFuZ3VsYXIuSUNvbXBpbGVTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgJHdpbmRvdzogYW5ndWxhci5JV2luZG93U2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlICRzY29wZTogSUV4cGxvcmVTY29wZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBhbmd1bGFyLklUaW1lb3V0U2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHNwYXJxbEl0ZW1TZXJ2aWNlOiBTcGFycWxJdGVtU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGZpYnJhU2VydmljZTogRmlicmFTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgJHE6IGFuZ3VsYXIuSVFTZXJ2aWNlKSB7XG5cbiAgICAgIHRoaXMuZmlicmFTZXJ2aWNlLm9uKCdjaGFuZ2UnLCAoKSA9PiB0aGlzLnF1ZXJ5QW5kQnVpbGQoKSlcbiAgICAgIHRoaXMuaXRlbVNlcnZpY2UgPSBzcGFycWxJdGVtU2VydmljZVxuICAgICAgdGhpcy5saW5rcyA9IFtdXG4gICAgICB0aGlzLiRzY29wZS5sYXlvdXQgPSB7XG4gICAgICAgICdjaG9pY2UnOiAnZm9yY2UnXG4gICAgICB9XG5cbiAgICAgIHRoaXMuJHNjb3BlLiR3YXRjaCgnbGF5b3V0LmNob2ljZScsIHRoaXMudXBkYXRlRXhwbG9yZS5iaW5kKHRoaXMsIGZhbHNlKSlcblxuICAgICAgLy8gYWRkIHNoaWZ0IHRvIGVuYWJsZSBkcmF3IG1vZGUgLSB0aGlzIGNhbiBlYXNpbHkgYmUgY2hhbmdlZCB0byByZXF1aXJlIHNoaWZ0IHRvIGJlIGhlbGRcbiAgICAgIHRoaXMuJHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MQm9keUVsZW1lbnQpIHtcbiAgICAgICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAxNiApIHtcbiAgICAgICAgICAgICAgdGhpcy5kcmF3bW9kZSA9IHRoaXMuZHJhd21vZGUgPyBmYWxzZSA6IHRydWVcbiAgICAgICAgICAgICAgdGhpcy5zdmdTZWwuc3R5bGUoJ2JhY2tncm91bmQtY29sb3InLCB0aGlzLmRyYXdtb2RlID8gJyNkOWQ5ZDknIDogJyNGMkYyRjInKVxuICAgICAgICAgICAgICBpZiAodGhpcy5kcmF3bW9kZSkge1xuICAgICAgICAgICAgICB0aGlzLnN2Z1NlbC5hcHBlbmQoJ3RleHQnKVxuICAgICAgICAgICAgICAgICAgLmF0dHIoJ2lkJywgJ2RyYXdtb2RldGV4dCcpXG4gICAgICAgICAgICAgICAgICAuaHRtbCgnRHJhdyBNb2RlIGVuZ2FnZWQ7IHRvIGxpbmsgdHdvIG5vZGVzLCBkcmFnIGZyb20gb25lIHRvIHRoZSBvdGhlcicpXG4gICAgICAgICAgICAgICAgICAuc3R5bGUoJ3N0cm9rZScsICdyZWQnKVxuICAgICAgICAgICAgICAgICAgLmF0dHIoJ3knLCAxMDApXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcjZHJhd21vZGV0ZXh0JykucmVtb3ZlKClcbiAgICAgICAgICAgICAgICBkMy5zZWxlY3RBbGwoJy5kcmFnTGluZScpLnJlbW92ZSgpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gNDkpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5saW5rcylcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gNTApIHtcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5pdGVtcylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIHByaXZhdGUgbWVyZ2VMaW5rcyhvbGRMaW5rczogSUV4cGxvcmVJdGVtTGlua1tdKTogSUV4cGxvcmVJdGVtTGlua1tdIHtcbiAgICAgIGxldCBuZXdMaW5rczogSUV4cGxvcmVJdGVtTGlua1tdID0gW11cbiAgICAgIGxldCBpdGVtcyA9IHRoaXMucHJpbWFyeUl0ZW1zLmNvbmNhdCh0aGlzLnNlY29uZGFyeUl0ZW1zKVxuXG4gICAgICBsZXQgc2FtZUFzOiBFTm9kZU1hcDxJdGVtPiA9IG5ldyBFTm9kZU1hcDxJdGVtPigpXG4gICAgICBmb3IgKGxldCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICAgIHNhbWVBcy5zZXQoaXRlbSwgaXRlbSlcbiAgICAgICAgbGV0IHNhbWVBc1Byb3A6IFByb3BlcnR5VG9WYWx1ZXM8SU5vZGVQbHVzTGFiZWw+ID0gaXRlbS5sb2NhbFByb3BlcnRpZXMuZmlsdGVyKChwKSA9PlxuICAgICAgICAgIE9XTC5zYW1lQXMuZXF1YWxzKHApXG4gICAgICAgIClbMF1cbiAgICAgICAgaWYgKHNhbWVBc1Byb3AgJiYgc2FtZUFzUHJvcC52YWx1ZXMpIGZvciAobGV0IG4gb2Ygc2FtZUFzUHJvcC52YWx1ZXMpIHNhbWVBcy5zZXQobiwgaXRlbSlcbiAgICAgIH1cblxuICAgICAgLy8gSXRlcmF0ZSBvdmVyIGl0ZW0gcHJvcGVydHkgdmFsdWVzIHRvIHNlZSBpZiB0aGV5IG1hdGNoIHRoZSBpZCBvZiBhbnlcbiAgICAgIC8vIG9mIHRoZSBpdGVtcyBkaXNwbGF5ZWQuIEFsc28gY2hlY2sgaWYgdGhleSBtYXRjaCBzYW1lQXMgdmFsdWVzLi4uXG4gICAgICBmb3IgKGxldCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICAgIGZvciAobGV0IHAgb2YgaXRlbS5sb2NhbFByb3BlcnRpZXMpIHtcbiAgICAgICAgICBmb3IgKGxldCB2IG9mIHAudmFsdWVzKSB7XG4gICAgICAgICAgICBpZiAoc2FtZUFzLmhhcyh2KSAmJiBpdGVtICE9PSBzYW1lQXMuZ2V0KHYpICYmIGl0ZW1zLmluZGV4T2Yoc2FtZUFzLmdldCh2KSkgIT09IC0xKSB7XG4gICAgICAgICAgICAgIG5ld0xpbmtzLnB1c2goe1xuICAgICAgICAgICAgICAgIHNvdXJjZTogPElFeHBsb3JlSXRlbT5pdGVtLFxuICAgICAgICAgICAgICAgIHRhcmdldDogPElFeHBsb3JlSXRlbT5zYW1lQXMuZ2V0KHYpLFxuICAgICAgICAgICAgICAgIHByb3BlcnR5OiBwXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXdMaW5rc1xuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBFeHBsb3JlQ29tcG9uZW50IGltcGxlbWVudHMgYW5ndWxhci5JQ29tcG9uZW50T3B0aW9ucyB7XG4gICAgcHVibGljIGJpbmRpbmdzOiB7W2lkOiBzdHJpbmddOiBzdHJpbmd9ID0ge1xuICAgICAgY2xhc3NUcmVlUHJvbWlzZTogJzwnLFxuICAgICAgc2VsZWN0ZWRJdGVtOiAnPSdcbiAgICB9XG4gICAgcHVibGljIGNvbnRyb2xsZXI6IChuZXcgKC4uLmFyZ3M6IGFueVtdKSA9PiBhbmd1bGFyLklDb250cm9sbGVyKSA9IEV4cGxvcmVDb21wb25lbnRDb250cm9sbGVyXG4gICAgcHVibGljIHRlbXBsYXRlVXJsOiBzdHJpbmcgPSAncGFydGlhbHMvZXhwbG9yZS5odG1sJ1xuICB9XG59XG4iXX0=

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2FwcC9zY3JpcHRzL2ZpYnJhLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBVSxLQUFLLENBK0JkO0FBL0JELFdBQVUsS0FBSyxFQUFDLENBQUM7SUFDZixZQUFZLENBQUE7SUFJWjtRQXNCRSxzQkFBWSxFQUFxQjtZQWxCekIsY0FBUyxHQUFPLEVBQUUsQ0FBQTtZQW1CeEIsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUE7UUFDYixDQUFDO1FBbEJELCtEQUErRDtRQUN4RCx5QkFBRSxHQUFULFVBQVUsSUFBWSxFQUFFLFFBQTBCO1lBQWxELGlCQVFDO1lBUEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxTQUFTLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxFQUFxQixDQUFBO1lBQ25ELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1lBQ25DLE1BQU0sQ0FBQztnQkFDTCxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDaEQsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7WUFDMUUsQ0FBQyxDQUFBO1FBQ0gsQ0FBQztRQUVNLCtCQUFRLEdBQWYsVUFBZ0IsSUFBWTtZQUMxQixJQUFJLEtBQUssR0FBb0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxFQUFFLElBQUssT0FBQSxFQUFFLEVBQUUsRUFBSixDQUFJLENBQUMsQ0FBQTtZQUNuRixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDMUIsQ0FBQztRQUtILG1CQUFDO0lBQUQsQ0F6QkEsQUF5QkMsSUFBQTtJQXpCWSxrQkFBWSxlQXlCeEIsQ0FBQTtBQUNILENBQUMsRUEvQlMsS0FBSyxLQUFMLEtBQUssUUErQmQiLCJmaWxlIjoic2NyaXB0cy9maWJyYS1zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIGZpYnJhIHtcbiAgJ3VzZSBzdHJpY3QnXG4gIHR5cGUgQ2FsbGJhY2tGdW5jdGlvbiA9ICgpID0+IGFuZ3VsYXIuSVByb21pc2U8c3RyaW5nPlxuICB0eXBlIFJlbW92YWxGdW5jdGlvbiA9ICgpID0+IHZvaWRcblxuICBleHBvcnQgY2xhc3MgRmlicmFTZXJ2aWNlIHtcbiAgICAvLyBNb2RlbGVkIG9uIGQzLmV2ZW50XG5cbiAgICBwcml2YXRlIHE6IGFuZ3VsYXIuSVFTZXJ2aWNlXG4gICAgcHJpdmF0ZSBjYWxsYmFja3M6IHt9ID0ge31cblxuICAgIC8vIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGNhbiBiZSBjYWxsZWQgdG8gcmVtb3ZlIHRoZSBjYWxsYmFja1xuICAgIHB1YmxpYyBvbihldm50OiBzdHJpbmcsIGNhbGxiYWNrOiBDYWxsYmFja0Z1bmN0aW9uKTogUmVtb3ZhbEZ1bmN0aW9uIHtcbiAgICAgIGlmICh0aGlzLmNhbGxiYWNrc1tldm50XSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLmNhbGxiYWNrc1tldm50XSA9IEFycmF5PENhbGxiYWNrRnVuY3Rpb24+ICgpXG4gICAgICB0aGlzLmNhbGxiYWNrc1tldm50XS5wdXNoKGNhbGxiYWNrKVxuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuY2FsbGJhY2tzW2V2bnRdLmluZGV4T2YoY2FsbGJhY2spICE9PSAtMSlcbiAgICAgICAgICB0aGlzLmNhbGxiYWNrc1tldm50XS5zcGxpY2UodGhpcy5jYWxsYmFja3NbZXZudF0uaW5kZXhPZihjYWxsYmFjayksIDEpXG4gICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGRpc3BhdGNoKGV2bnQ6IHN0cmluZyk6IGFuZ3VsYXIuSVByb21pc2U8QXJyYXk8c3RyaW5nPj4ge1xuICAgICAgbGV0IHByb21zOiBBcnJheTxhbmd1bGFyLklQcm9taXNlPHN0cmluZz4+ID0gdGhpcy5jYWxsYmFja3NbZXZudF0ubWFwKChjYikgPT4gY2IoKSlcbiAgICAgIHJldHVybiB0aGlzLnEuYWxsKHByb21zKVxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKCRxOiBhbmd1bGFyLklRU2VydmljZSkge1xuICAgICAgdGhpcy5xID0gJHFcbiAgICB9XG4gIH1cbn1cbiJdfQ==

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
                case 'UNDEF': return 'UNDEF';
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
    var UNDEF = (function (_super) {
        __extends(UNDEF, _super);
        function UNDEF() {
            _super.call(this, '', 'UNDEF');
        }
        UNDEF.prototype.toCanonical = function () { return ''; };
        UNDEF.prototype.equals = function (other) { return other.termType === 'UNDEF'; };
        UNDEF.instance = new UNDEF();
        return UNDEF;
    }(Node));
    fibra.UNDEF = UNDEF;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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UUFDdkIsQ0FBQztRQUNILGVBQUM7SUFBRCxDQUpBLEFBSUMsQ0FKOEMsT0FBTyxHQUlyRDtJQUpZLGNBQVEsV0FJcEIsQ0FBQTtBQUlILENBQUMsRUE3U1MsS0FBSyxLQUFMLEtBQUssUUE2U2QiLCJmaWxlIjoic2NyaXB0cy9yZGYuanMiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgZmlicmEge1xuICAndXNlIHN0cmljdCdcblxuICBpbXBvcnQgcyA9IGZpLnNlY28uc3BhcnFsXG5cbiAgZXhwb3J0IGludGVyZmFjZSBJTm9kZSBleHRlbmRzIElUZXJtIHtcbiAgICBsYW5ndWFnZT86IHN0cmluZ1xuICAgIGRhdGF0eXBlPzogSU5hbWVkTm9kZVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIE5vZGUgaW1wbGVtZW50cyBJTm9kZSB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHZhbHVlOiBzdHJpbmcsIHB1YmxpYyB0ZXJtVHlwZTogJ05hbWVkTm9kZScgfCAnQmxhbmtOb2RlJyB8ICdMaXRlcmFsJyB8ICdWYXJpYWJsZScgfCAnRGVmYXVsdEdyYXBoJyB8ICdVTkRFRicsIHB1YmxpYyBsYW5ndWFnZTogc3RyaW5nIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkLCBwdWJsaWMgZGF0YXR5cGU6IElOYW1lZE5vZGUgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQpIHt9XG4gICAgcHVibGljIHRvQ2Fub25pY2FsKCk6IHN0cmluZyB7XG4gICAgICBzd2l0Y2ggKHRoaXMudGVybVR5cGUpIHtcbiAgICAgICAgY2FzZSAnTmFtZWROb2RlJzogcmV0dXJuICc8JyArIHRoaXMudmFsdWUgKyAnPidcbiAgICAgICAgY2FzZSAnQmxhbmtOb2RlJzogcmV0dXJuICdfOicgKyB0aGlzLnZhbHVlXG4gICAgICAgIGNhc2UgJ0xpdGVyYWwnOiByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy52YWx1ZSkgKyAodGhpcy5sYW5ndWFnZSA/ICdAJyArIHRoaXMubGFuZ3VhZ2UgOiAoWE1MU2NoZW1hLnN0cmluZy5lcXVhbHModGhpcy5kYXRhdHlwZSEpID8gJycgOiAnXl4nICsgdGhpcy5kYXRhdHlwZSEudG9DYW5vbmljYWwoKSkpXG4gICAgICAgIGNhc2UgJ1ZhcmlhYmxlJzogcmV0dXJuICc/JyArIHRoaXMudmFsdWVcbiAgICAgICAgY2FzZSAnRGVmYXVsdEdyYXBoJzogcmV0dXJuICcnXG4gICAgICAgIGNhc2UgJ1VOREVGJzogcmV0dXJuICdVTkRFRidcbiAgICAgICAgZGVmYXVsdDogdGhyb3cgJ1Vua25vd24gdGVybSB0eXBlICcgKyB0aGlzXG4gICAgICB9XG4gICAgfVxuICAgIHB1YmxpYyBlcXVhbHMob3RoZXI6IElUZXJtKTogYm9vbGVhbiB7XG4gICAgICByZXR1cm4gdGhpcy50ZXJtVHlwZSA9PT0gb3RoZXIudGVybVR5cGUgJiYgdGhpcy52YWx1ZSA9PT0gb3RoZXIudmFsdWUgJiYgKHRoaXMudGVybVR5cGUgIT09ICdMaXRlcmFsJyB8fCAodGhpcy5sYW5ndWFnZSA9PT0gKDxJTGl0ZXJhbD5vdGhlcikubGFuZ3VhZ2UgJiYgdGhpcy5kYXRhdHlwZSA9PT0gKDxJTGl0ZXJhbD5vdGhlcikuZGF0YXR5cGUpKVxuICAgIH1cbiAgfVxuXG4gICBleHBvcnQgY2xhc3MgTm9kZUZyb21Ob2RlIGV4dGVuZHMgTm9kZSB7XG4gICAgY29uc3RydWN0b3Iob3RoZXI6IElOb2RlKSB7XG4gICAgICBzdXBlcihvdGhlci52YWx1ZSwgb3RoZXIudGVybVR5cGUsIG90aGVyLmxhbmd1YWdlLCBvdGhlci5kYXRhdHlwZSlcbiAgICB9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgRGVmYXVsdEdyYXBoIGV4dGVuZHMgTm9kZSBpbXBsZW1lbnRzIElEZWZhdWx0R3JhcGgge1xuICAgIHB1YmxpYyBzdGF0aWMgaW5zdGFuY2U6IElEZWZhdWx0R3JhcGggPSBuZXcgRGVmYXVsdEdyYXBoKClcbiAgICBwdWJsaWMgdGVybVR5cGU6ICdEZWZhdWx0R3JhcGgnXG4gICAgcHVibGljIHRvQ2Fub25pY2FsKCk6IHN0cmluZyB7IHJldHVybiAnJyB9XG4gICAgcHVibGljIGVxdWFscyhvdGhlcjogSVRlcm0pOiBib29sZWFuIHsgcmV0dXJuIG90aGVyLnRlcm1UeXBlID09PSAnRGVmYXVsdEdyYXBoJyB9XG4gICAgY29uc3RydWN0b3IoKSB7IHN1cGVyKCcnLCAnRGVmYXVsdEdyYXBoJykgfVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIFVOREVGIGV4dGVuZHMgTm9kZSBpbXBsZW1lbnRzIElVTkRFRiB7XG4gICAgcHVibGljIHN0YXRpYyBpbnN0YW5jZTogSVVOREVGID0gbmV3IFVOREVGKClcbiAgICBwdWJsaWMgdGVybVR5cGU6ICdVTkRFRidcbiAgICBwdWJsaWMgdG9DYW5vbmljYWwoKTogc3RyaW5nIHsgcmV0dXJuICcnIH1cbiAgICBwdWJsaWMgZXF1YWxzKG90aGVyOiBJVGVybSk6IGJvb2xlYW4geyByZXR1cm4gb3RoZXIudGVybVR5cGUgPT09ICdVTkRFRicgfVxuICAgIGNvbnN0cnVjdG9yKCkgeyBzdXBlcignJywgJ1VOREVGJykgfVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIFZhcmlhYmxlIGV4dGVuZHMgTm9kZSBpbXBsZW1lbnRzIElWYXJpYWJsZSB7XG4gICAgcHVibGljIHRlcm1UeXBlOiAnVmFyaWFibGUnXG4gICAgY29uc3RydWN0b3IodmFsdWU6IHN0cmluZykgeyBzdXBlcih2YWx1ZSwgJ1ZhcmlhYmxlJykgfVxuICAgIHB1YmxpYyB0b0Nhbm9uaWNhbCgpOiBzdHJpbmcgeyByZXR1cm4gJz8nICsgdGhpcy52YWx1ZSB9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgTmFtZWROb2RlIGV4dGVuZHMgTm9kZSBpbXBsZW1lbnRzIElOYW1lZE5vZGUge1xuICAgIHB1YmxpYyB0ZXJtVHlwZTogJ05hbWVkTm9kZSdcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZTogc3RyaW5nKSB7IHN1cGVyKHZhbHVlLCAnTmFtZWROb2RlJykgfVxuICAgIHB1YmxpYyB0b0Nhbm9uaWNhbCgpOiBzdHJpbmcgeyByZXR1cm4gJzwnICsgdGhpcy52YWx1ZSArICc+JyB9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgQmxhbmtOb2RlIGV4dGVuZHMgTm9kZSBpbXBsZW1lbnRzIElCbGFua05vZGUge1xuICAgIHB1YmxpYyB0ZXJtVHlwZTogJ0JsYW5rTm9kZSdcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZTogc3RyaW5nKSB7IHN1cGVyKHZhbHVlLCAnQmxhbmtOb2RlJykgfVxuICAgIHB1YmxpYyB0b0Nhbm9uaWNhbCgpOiBzdHJpbmcgeyByZXR1cm4gJz8nICsgdGhpcy52YWx1ZSB9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgTGl0ZXJhbCBleHRlbmRzIE5vZGUgaW1wbGVtZW50cyBJTGl0ZXJhbCB7XG4gICAgcHVibGljIHRlcm1UeXBlOiAnTGl0ZXJhbCdcbiAgICBwdWJsaWMgbGFuZ3VhZ2U6IHN0cmluZ1xuICAgIHB1YmxpYyBkYXRhdHlwZTogSU5hbWVkTm9kZVxuICAgIGNvbnN0cnVjdG9yKHZhbHVlOiBzdHJpbmcsIGxhbmd1YWdlOiBzdHJpbmcgPSAnJywgZGF0YXR5cGU/OiBJTmFtZWROb2RlKSB7XG4gICAgICBzdXBlcih2YWx1ZSwgJ0xpdGVyYWwnLCBsYW5ndWFnZSwgZGF0YXR5cGUgPyBkYXRhdHlwZSA6IChsYW5ndWFnZSAhPT0gJycgPyBSREYubGFuZ1N0cmluZyA6IFhNTFNjaGVtYS5zdHJpbmcpKVxuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBRdWFkIGltcGxlbWVudHMgSVF1YWQge1xuICAgIGNvbnN0cnVjdG9yIChcbiAgICAgIHB1YmxpYyBzdWJqZWN0OiBJTm9kZSxcbiAgICAgIHB1YmxpYyBwcmVkaWNhdGU6IElOb2RlLFxuICAgICAgcHVibGljIG9iamVjdDogSU5vZGUsXG4gICAgICBwdWJsaWMgZ3JhcGg6IElOb2RlXG4gICAgKSB7fVxuICAgIHB1YmxpYyB0b0Nhbm9uaWNhbCgpOiBzdHJpbmcge1xuICAgICByZXR1cm4gdGhpcy5zdWJqZWN0LnRvQ2Fub25pY2FsKCkgKyAnICcgKyB0aGlzLnByZWRpY2F0ZS50b0Nhbm9uaWNhbCgpICsgJyAnICsgdGhpcy5vYmplY3QudG9DYW5vbmljYWwoKSArICh0aGlzLmdyYXBoLnRlcm1UeXBlID09PSAnRGVmYXVsdEdyYXBoJyA/ICcnIDogKCcgJyArIHRoaXMuZ3JhcGgudG9DYW5vbmljYWwoKSkpXG4gICAgfVxuICAgIHB1YmxpYyBlcXVhbHMob3RoZXI6IElRdWFkKTogYm9vbGVhbiB7XG4gICAgICByZXR1cm4gdGhpcy5zdWJqZWN0LmVxdWFscyhvdGhlci5zdWJqZWN0KSAmJiB0aGlzLnByZWRpY2F0ZS5lcXVhbHMob3RoZXIucHJlZGljYXRlKSAmJiB0aGlzLm9iamVjdC5lcXVhbHMob3RoZXIub2JqZWN0KSAmJiB0aGlzLmdyYXBoLmVxdWFscyhvdGhlci5ncmFwaClcbiAgICB9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgVHJpcGxlIGltcGxlbWVudHMgSVRyaXBsZSB7XG4gICAgcHVibGljIGdyYXBoOiBJRGVmYXVsdEdyYXBoID0gRGVmYXVsdEdyYXBoLmluc3RhbmNlXG4gICAgY29uc3RydWN0b3IgKFxuICAgICAgcHVibGljIHN1YmplY3Q6IElOb2RlLFxuICAgICAgcHVibGljIHByZWRpY2F0ZTogSU5vZGUsXG4gICAgICBwdWJsaWMgb2JqZWN0OiBJTm9kZVxuICAgICkge31cbiAgICBwdWJsaWMgdG9DYW5vbmljYWwoKTogc3RyaW5nIHtcbiAgICAgcmV0dXJuIHRoaXMuc3ViamVjdC50b0Nhbm9uaWNhbCgpICsgJyAnICsgdGhpcy5wcmVkaWNhdGUudG9DYW5vbmljYWwoKSArICcgJyArIHRoaXMub2JqZWN0LnRvQ2Fub25pY2FsKClcbiAgICB9XG4gICAgcHVibGljIGVxdWFscyhvdGhlcjogSVF1YWQpOiBib29sZWFuIHtcbiAgICAgIHJldHVybiB0aGlzLnN1YmplY3QuZXF1YWxzKG90aGVyLnN1YmplY3QpICYmIHRoaXMucHJlZGljYXRlLmVxdWFscyhvdGhlci5wcmVkaWNhdGUpICYmIHRoaXMub2JqZWN0LmVxdWFscyhvdGhlci5vYmplY3QpICYmIHRoaXMuZ3JhcGguZXF1YWxzKG90aGVyLmdyYXBoKVxuICAgIH1cbiAgfVxuXG5cbiAgZXhwb3J0IGNsYXNzIEdyYXBoIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBncmFwaDogSU5vZGUsXG4gICAgICBwdWJsaWMgdHJpcGxlczogSVF1YWRbXSA9IFtdXG4gICAgKSB7fVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIERhdGFGYWN0b3J5IGltcGxlbWVudHMgSURhdGFGYWN0b3J5IHtcblxuICAgIHB1YmxpYyBzdGF0aWMgaW5zdGFuY2U6IERhdGFGYWN0b3J5ID0gbmV3IERhdGFGYWN0b3J5KClcblxuICAgIHByaXZhdGUgbmV4dEJsYW5rTm9kZUlkOiBudW1iZXIgPSAwXG5cbiAgICBwdWJsaWMgbm9kZUZyb21CaW5kaW5nKGJpbmRpbmc6IHMuSVNwYXJxbEJpbmRpbmcpOiBJTm9kZSB7XG4gICAgICBsZXQgbjogTm9kZSA9IG5ldyBOb2RlKGJpbmRpbmcudmFsdWUsIGJpbmRpbmcudHlwZSA9PT0gJ2xpdGVyYWwnID8gJ0xpdGVyYWwnIDogKGJpbmRpbmcudHlwZSA9PT0gJ3VyaScgPyAnTmFtZWROb2RlJyA6ICdCbGFua05vZGUnKSlcbiAgICAgIGlmIChiaW5kaW5nLnR5cGUgPT09ICdsaXRlcmFsJykge1xuICAgICAgICBuLmxhbmd1YWdlID0gYmluZGluZ1sneG1sOmxhbmcnXSA/IGJpbmRpbmdbJ3htbDpsYW5nJ10gOiAnJ1xuICAgICAgICBuLmRhdGF0eXBlID0gYmluZGluZy5kYXRhdHlwZSA/IG5ldyBOYW1lZE5vZGUoYmluZGluZy5kYXRhdHlwZSkgOiAobi5sYW5ndWFnZSAhPT0gJycgPyBSREYubGFuZ1N0cmluZyA6IFhNTFNjaGVtYS5zdHJpbmcpXG4gICAgICB9XG4gICAgICByZXR1cm4gblxuICAgIH1cblxuICAgIHB1YmxpYyBub2RlRnJvbU5vZGUob3RoZXI6IElUZXJtKTogSU5vZGUge1xuICAgICAgaWYgKG90aGVyLnRlcm1UeXBlID09PSAnTGl0ZXJhbCcpIHJldHVybiBuZXcgTGl0ZXJhbChvdGhlci52YWx1ZSwgKDxJTGl0ZXJhbD5vdGhlcikubGFuZ3VhZ2UsICg8SUxpdGVyYWw+b3RoZXIpLmRhdGF0eXBlKVxuICAgICAgZWxzZSByZXR1cm4gbmV3IE5vZGUob3RoZXIudmFsdWUsIG90aGVyLnRlcm1UeXBlKVxuICAgIH1cbiAgICBwdWJsaWMgbm9kZUZyb21DYW5vbmljYWxSZXByZXNlbnRhdGlvbihpZDogc3RyaW5nKTogSU5vZGUge1xuICAgICAgaWYgKGlkLmluZGV4T2YoJzwnKSA9PT0gMClcbiAgICAgICAgcmV0dXJuIG5ldyBOYW1lZE5vZGUoaWQuc3Vic3RyaW5nKDEsIGlkLmxlbmd0aCAtIDEpKVxuICAgICAgZWxzZSBpZiAoaWQuaW5kZXhPZignXzonKSA9PT0gMClcbiAgICAgICAgcmV0dXJuIG5ldyBCbGFua05vZGUoaWQuc3Vic3RyaW5nKDIpKVxuICAgICAgZWxzZSB7XG4gICAgICAgIGxldCB2YWx1ZTogc3RyaW5nID0gaWQuc3Vic3RyaW5nKDEsIGlkLmxhc3RJbmRleE9mKCdcIicpKVxuICAgICAgICBpZiAoaWQubGFzdEluZGV4T2YoJ0AnKSA9PT0gaWQubGFzdEluZGV4T2YoJ1wiJykgKyAxKVxuICAgICAgICAgIHJldHVybiBuZXcgTGl0ZXJhbCh2YWx1ZSwgaWQuc3Vic3RyaW5nKGlkLmxhc3RJbmRleE9mKCdAJykpKVxuICAgICAgICBlbHNlIGlmIChpZC5sYXN0SW5kZXhPZignXl48JykgPT09IGlkLmxhc3RJbmRleE9mKCdcIicpICsgMSlcbiAgICAgICAgICByZXR1cm4gbmV3IExpdGVyYWwodmFsdWUsICcnLCBuZXcgTmFtZWROb2RlKGlkLnN1YnN0cmluZyhpZC5sYXN0SW5kZXhPZignXl48JyksIGlkLmxlbmd0aCAtIDEpKSlcbiAgICAgICAgZWxzZSByZXR1cm4gbmV3IExpdGVyYWwodmFsdWUpXG4gICAgICB9XG4gICAgfVxuICAgIHB1YmxpYyBuYW1lZE5vZGUodmFsdWU6IHN0cmluZyk6IElOYW1lZE5vZGUgeyByZXR1cm4gbmV3IE5hbWVkTm9kZSh2YWx1ZSkgfVxuICAgIHB1YmxpYyBibGFua05vZGUodmFsdWU/OiBzdHJpbmcpOiBJQmxhbmtOb2RlIHsgcmV0dXJuIG5ldyBCbGFua05vZGUodmFsdWUgPyB2YWx1ZSA6ICgnYicgKyArK3RoaXMubmV4dEJsYW5rTm9kZUlkKSkgfVxuICAgIHB1YmxpYyBsaXRlcmFsKHZhbHVlOiBzdHJpbmcsIGxhbmd1YWdlT3JEYXRhdHlwZT86IHN0cmluZ3xOYW1lZE5vZGUpOiBJTGl0ZXJhbCB7XG4gICAgICBpZiAodHlwZW9mKGxhbmd1YWdlT3JEYXRhdHlwZSkgPT09ICdzdHJpbmcnKSByZXR1cm4gbmV3IExpdGVyYWwodmFsdWUsIDxzdHJpbmc+bGFuZ3VhZ2VPckRhdGF0eXBlKVxuICAgICAgZWxzZSByZXR1cm4gbmV3IExpdGVyYWwodmFsdWUsIHVuZGVmaW5lZCAsIDxOYW1lZE5vZGU+bGFuZ3VhZ2VPckRhdGF0eXBlKVxuICAgIH1cbiAgICBwdWJsaWMgdmFyaWFibGUodmFsdWU6IHN0cmluZyk6IElWYXJpYWJsZSB7IHJldHVybiBuZXcgVmFyaWFibGUodmFsdWUpIH1cbiAgICBwdWJsaWMgZGVmYXVsdEdyYXBoKCk6IElEZWZhdWx0R3JhcGggeyByZXR1cm4gRGVmYXVsdEdyYXBoLmluc3RhbmNlIH1cbiAgICBwdWJsaWMgdHJpcGxlKHN1YmplY3Q6IElUZXJtLCBwcmVkaWNhdGU6IElUZXJtLCBvYmplY3Q6IElUZXJtKTogSVF1YWQge1xuICAgICAgcmV0dXJuIG5ldyBUcmlwbGUoc3ViamVjdCwgcHJlZGljYXRlLCBvYmplY3QpXG4gICAgfVxuICAgIHB1YmxpYyBxdWFkKHN1YmplY3Q6IElUZXJtLCBwcmVkaWNhdGU6IElUZXJtLCBvYmplY3Q6IElUZXJtLCBncmFwaD86IElUZXJtKTogSVF1YWQge1xuICAgICAgcmV0dXJuIG5ldyBRdWFkKHN1YmplY3QsIHByZWRpY2F0ZSwgb2JqZWN0LCBncmFwaCA/IGdyYXBoIDogRGVmYXVsdEdyYXBoLmluc3RhbmNlKVxuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBTS09TIHtcbiAgICBwdWJsaWMgc3RhdGljIG5zOiBzdHJpbmcgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwNC8wMi9za29zL2NvcmUjJ1xuICAgIHB1YmxpYyBzdGF0aWMgcHJlZkxhYmVsOiBJTmFtZWROb2RlID0gbmV3IE5hbWVkTm9kZShTS09TLm5zICsgJ3ByZWZMYWJlbCcpXG4gIH1cblxuICBleHBvcnQgY2xhc3MgT1dMIHtcbiAgICBwdWJsaWMgc3RhdGljIG5zOiBzdHJpbmcgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMi8wNy9vd2wjJ1xuICAgIHB1YmxpYyBzdGF0aWMgc2FtZUFzOiBJTmFtZWROb2RlID0gbmV3IE5hbWVkTm9kZShPV0wubnMgKyAnc2FtZUFzJylcbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBSREYge1xuICAgIHB1YmxpYyBzdGF0aWMgbnM6IHN0cmluZyA9ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjJ1xuICAgIHB1YmxpYyBzdGF0aWMgdHlwZTogSU5hbWVkTm9kZSA9IG5ldyBOYW1lZE5vZGUoUkRGLm5zICsgJ3R5cGUnKVxuICAgIHB1YmxpYyBzdGF0aWMgbGFuZ1N0cmluZzogSU5hbWVkTm9kZSA9IG5ldyBOYW1lZE5vZGUoUkRGLm5zICsgJ2xhbmdTdHJpbmcnKVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIFhNTFNjaGVtYSB7XG4gICAgcHVibGljIHN0YXRpYyBuczogc3RyaW5nID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDEvWE1MU2NoZW1hIydcbiAgICBwdWJsaWMgc3RhdGljIHN0cmluZzogSU5hbWVkTm9kZSA9IG5ldyBOYW1lZE5vZGUoWE1MU2NoZW1hLm5zICsgJ3N0cmluZycpXG4gIH1cblxuICBleHBvcnQgY2xhc3MgQ0lET0Mge1xuICAgIHB1YmxpYyBzdGF0aWMgbnM6IHN0cmluZyA9ICdodHRwOi8vd3d3LmNpZG9jLWNybS5vcmcvY2lkb2MtY3JtLydcbiAgICBwdWJsaWMgc3RhdGljIFBlcnNvbjogSU5hbWVkTm9kZSA9IG5ldyBOYW1lZE5vZGUoQ0lET0MubnMgKyAnRTIxX1BlcnNvbicpXG4gICAgcHVibGljIHN0YXRpYyBQbGFjZTogSU5hbWVkTm9kZSA9IG5ldyBOYW1lZE5vZGUoQ0lET0MubnMgKyAnRTUzX1BsYWNlJylcbiAgICBwdWJsaWMgc3RhdGljIEdyb3VwOiBJTmFtZWROb2RlID0gbmV3IE5hbWVkTm9kZShDSURPQy5ucyArICdFNzRfR3JvdXAnKVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIEdFVFRZIHtcbiAgICBwdWJsaWMgc3RhdGljIG5zOiBzdHJpbmcgPSAnaHR0cDovL3ZvY2FiLmdldHR5LmVkdS9vbnRvbG9neSMnXG4gICAgcHVibGljIHN0YXRpYyBBZG1pblBsYWNlQ29uY2VwdDogSU5hbWVkTm9kZSA9IG5ldyBOYW1lZE5vZGUoR0VUVFkubnMgKyAnQWRtaW5QbGFjZUNvbmNlcHQnKVxuICAgIHB1YmxpYyBzdGF0aWMgUGh5c2ljYWxQbGFjZUNvbmNlcHQ6IElOYW1lZE5vZGUgPSBuZXcgTmFtZWROb2RlKEdFVFRZLm5zICsgJ1BoeXNpY2FsUGxhY2VDb25jZXB0JylcbiAgICBwdWJsaWMgc3RhdGljIFBoeXNBZG1pblBsYWNlQ29uY2VwdDogSU5hbWVkTm9kZSA9IG5ldyBOYW1lZE5vZGUoR0VUVFkubnMgKyAnUGh5c0FkbWluUGxhY2VDb25jZXB0JylcbiAgICBwdWJsaWMgc3RhdGljIFBlcnNvbkNvbmNlcHQ6IElOYW1lZE5vZGUgPSBuZXcgTmFtZWROb2RlKEdFVFRZLm5zICsgJ1BlcnNvbkNvbmNlcHQnKVxuICAgIHB1YmxpYyBzdGF0aWMgR3JvdXBDb25jZXB0OiBJTmFtZWROb2RlID0gbmV3IE5hbWVkTm9kZShHRVRUWS5ucyArICdHcm91cENvbmNlcHQnKVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIEVOb2RlTWFwPFY+IHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNyZWF0ZTogKGtleT86IElOb2RlKSA9PiBWID0gKCkgPT4geyByZXR1cm4gPFY+e319LCBwcml2YXRlIG1hcDogRU1hcDxWPiA9IG5ldyBFTWFwPFY+KCkpIHt9XG4gICAgcHVibGljIGdvYyhrZXk6IElOb2RlLCBjcmVhdGU/OiAoa2V5PzogSU5vZGUpID0+IFYpOiBWIHtcbiAgICAgIGlmICghdGhpcy5oYXMoa2V5KSlcbiAgICAgICAgdGhpcy5zZXQoa2V5LCBjcmVhdGUgPyBjcmVhdGUoa2V5KSA6IHRoaXMuY3JlYXRlKGtleSkpXG4gICAgICByZXR1cm4gdGhpcy5nZXQoa2V5KVxuICAgIH1cbiAgICBwdWJsaWMgZ2V0KGtleTogSU5vZGUpOiBWIHtcbiAgICAgIHJldHVybiB0aGlzLm1hcC5nZXQoa2V5LnRvQ2Fub25pY2FsKCkpXG4gICAgfVxuICAgIHB1YmxpYyByZW1vdmUoa2V5OiBJTm9kZSk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIHRoaXMubWFwLnJlbW92ZShrZXkudG9DYW5vbmljYWwoKSlcbiAgICB9XG4gICAgcHVibGljIGVhY2goZjogKHZhbHVlOiBWLCBrZXk6IElOb2RlLCBtYXA6IEVOb2RlTWFwPFY+KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgICB0aGlzLm1hcC5lYWNoKCh2YWx1ZSwga2V5LCBtYXApID0+IGYodmFsdWUsIERhdGFGYWN0b3J5Lmluc3RhbmNlLm5vZGVGcm9tQ2Fub25pY2FsUmVwcmVzZW50YXRpb24oa2V5KSwgdGhpcykpXG4gICAgfVxuICAgIHB1YmxpYyBoYXMoa2V5OiBJTm9kZSk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIHRoaXMubWFwLmhhcyhrZXkudG9DYW5vbmljYWwoKSlcbiAgICB9XG4gICAgcHVibGljIHNldChrZXk6IElOb2RlLCB2YWx1ZTogVik6IEVOb2RlTWFwPFY+IHtcbiAgICAgIHRoaXMubWFwLnNldChrZXkudG9DYW5vbmljYWwoKSwgdmFsdWUpXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgICBnZXQgc2l6ZSgpOiBudW1iZXIge1xuICAgICAgcmV0dXJuIHRoaXMubWFwLnNpemUoKVxuICAgIH1cbiAgICBwdWJsaWMgdmFsdWVzKCk6IFZbXSB7XG4gICAgICByZXR1cm4gdGhpcy5tYXAudmFsdWVzKClcbiAgICB9XG4gICAgcHVibGljIGtleXMoKTogSU5vZGVbXSB7XG4gICAgICByZXR1cm4gdGhpcy5tYXAua2V5cygpLm1hcChrID0+IERhdGFGYWN0b3J5Lmluc3RhbmNlLm5vZGVGcm9tQ2Fub25pY2FsUmVwcmVzZW50YXRpb24oaykpXG4gICAgfVxuICAgIHB1YmxpYyBlbnRyaWVzKCk6IHtrZXk6IElOb2RlLCB2YWx1ZTogVn1bXSB7XG4gICAgICByZXR1cm4gdGhpcy5tYXAuZW50cmllcygpLm1hcChvID0+IHsgcmV0dXJuIHsga2V5OiBEYXRhRmFjdG9yeS5pbnN0YW5jZS5ub2RlRnJvbUNhbm9uaWNhbFJlcHJlc2VudGF0aW9uKG8ua2V5KSwgdmFsdWU6IG8udmFsdWUgfX0pXG4gICAgfVxuICAgIHB1YmxpYyBjbGVhcigpOiBFTm9kZU1hcDxWPiB7XG4gICAgICB0aGlzLm1hcC5jbGVhcigpXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBFT05vZGVNYXA8Vj4gZXh0ZW5kcyBFTm9kZU1hcDxWPiB7XG4gICAgY29uc3RydWN0b3IoY3JlYXRlPzogKGtleT86IElOb2RlKSA9PiBWICkge1xuICAgICAgc3VwZXIoY3JlYXRlLCBuZXcgRU9NYXA8Vj4oKSlcbiAgICB9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgTm9kZVNldDxOIGV4dGVuZHMgSU5vZGU+IHtcbiAgICBwdWJsaWMgbTogRU5vZGVNYXA8Tj5cbiAgICBjb25zdHJ1Y3RvcihtYXA6IEVNYXA8Tj4gPSBuZXcgRU1hcDxOPigpKSB7XG4gICAgICB0aGlzLm0gPSBuZXcgRU5vZGVNYXA8Tj4odW5kZWZpbmVkLCBtYXApXG4gICAgfVxuICAgIHB1YmxpYyBhZGQodmFsdWU6IE4pOiBOb2RlU2V0PE4+IHtcbiAgICAgIHRoaXMubS5zZXQodmFsdWUsIHZhbHVlKVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gICAgcHVibGljIGFkZGEoYXJyOiBOW10pOiB0aGlzIHtcbiAgICAgIGFyci5mb3JFYWNoKG4gPT4gdGhpcy5hZGQobikpXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgICBwdWJsaWMgYWRkcyhvc2V0OiBOb2RlU2V0PE4+KTogdGhpcyB7XG4gICAgICBvc2V0LmVhY2gobiA9PiB0aGlzLmFkZChuKSlcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICAgIHB1YmxpYyBoYXModmFsdWU6IE4pOiBib29sZWFuIHtcbiAgICAgIHJldHVybiB0aGlzLm0uaGFzKHZhbHVlKVxuICAgIH1cbiAgICBwdWJsaWMgZ2V0KHZhbHVlOiBOKTogTiB7XG4gICAgICByZXR1cm4gdGhpcy5tLmdldCh2YWx1ZSlcbiAgICB9XG4gICAgcHVibGljIGNsZWFyKCk6IE5vZGVTZXQ8Tj4ge1xuICAgICAgdGhpcy5tLmNsZWFyKClcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgcHVibGljIHJlbW92ZSh2YWx1ZTogTik6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIHRoaXMubS5yZW1vdmUodmFsdWUpXG4gICAgfVxuXG4gICAgcHVibGljIHZhbHVlcygpOiBOW10ge1xuICAgICAgcmV0dXJuIHRoaXMubS52YWx1ZXMoKVxuICAgIH1cblxuICAgIGdldCBzaXplKCk6IG51bWJlciB7XG4gICAgICByZXR1cm4gdGhpcy5tLnNpemVcbiAgICB9XG5cbiAgICBwdWJsaWMgZWFjaChmOiAodmFsdWU6IE4sIGtleTogTiwgc2V0OiBOb2RlU2V0PE4+KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgICB0aGlzLm0uZWFjaCgodmFsdWUsIGtleSwgbWFwKSA9PiBmKHZhbHVlLCB2YWx1ZSwgdGhpcykpXG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIE9Ob2RlU2V0PE4gZXh0ZW5kcyBJTm9kZT4gZXh0ZW5kcyBOb2RlU2V0PE4+IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHN1cGVyKG5ldyBFT01hcDxOPigpKVxuICAgIH1cbiAgfVxuXG5cblxufVxuIl19

var fibra;
(function (fibra) {
    'use strict';
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2FwcC9zY3JpcHRzL3JkZmpzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQVUsS0FBSyxDQTREZDtBQTVERCxXQUFVLEtBQUssRUFBQyxDQUFDO0lBQ2YsWUFBWSxDQUFBO0FBMkRkLENBQUMsRUE1RFMsS0FBSyxLQUFMLEtBQUssUUE0RGQiLCJmaWxlIjoic2NyaXB0cy9yZGZqcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBmaWJyYSB7XG4gICd1c2Ugc3RyaWN0J1xuXG4gIGV4cG9ydCBpbnRlcmZhY2UgSVRlcm0ge1xuICAgIHRlcm1UeXBlOiAnTmFtZWROb2RlJyB8ICdCbGFua05vZGUnIHwgJ0xpdGVyYWwnIHwgJ1ZhcmlhYmxlJyB8ICdEZWZhdWx0R3JhcGgnIHwgJ1VOREVGJ1xuICAgIHZhbHVlOiBzdHJpbmdcbiAgICBlcXVhbHMob3RoZXI6IElUZXJtKTogYm9vbGVhblxuICAgIHRvQ2Fub25pY2FsKCk6IHN0cmluZ1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBJTmFtZWROb2RlIGV4dGVuZHMgSVRlcm0ge1xuICAgIHRlcm1UeXBlOiAnTmFtZWROb2RlJ1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBJQmxhbmtOb2RlIGV4dGVuZHMgSVRlcm0ge1xuICAgIHRlcm1UeXBlOiAnQmxhbmtOb2RlJ1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBJTGl0ZXJhbCBleHRlbmRzIElUZXJtIHtcbiAgICB0ZXJtVHlwZTogJ0xpdGVyYWwnXG4gICAgbGFuZ3VhZ2U6IHN0cmluZ1xuICAgIGRhdGF0eXBlOiBJTmFtZWROb2RlXG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIElWYXJpYWJsZSBleHRlbmRzIElUZXJtIHtcbiAgICB0ZXJtVHlwZTogJ1ZhcmlhYmxlJ1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBJRGVmYXVsdEdyYXBoIGV4dGVuZHMgSVRlcm0ge1xuICAgIHRlcm1UeXBlOiAnRGVmYXVsdEdyYXBoJ1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBJVU5ERUYgZXh0ZW5kcyBJVGVybSB7XG4gICAgdGVybVR5cGU6ICdVTkRFRidcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgSVF1YWQge1xuICAgIHN1YmplY3Q6IElUZXJtXG4gICAgcHJlZGljYXRlOiBJVGVybVxuICAgIG9iamVjdDogSVRlcm1cbiAgICBncmFwaDogSVRlcm1cbiAgICB0b0Nhbm9uaWNhbCgpOiBzdHJpbmdcbiAgICBlcXVhbHMob3RoZXI6IElRdWFkKTogYm9vbGVhblxuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBJVHJpcGxlIGV4dGVuZHMgSVF1YWQge1xuICAgIGdyYXBoOiBJRGVmYXVsdEdyYXBoXG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIElEYXRhRmFjdG9yeSB7XG4gICAgbmFtZWROb2RlKHZhbHVlOiBzdHJpbmcpOiBJTmFtZWROb2RlXG4gICAgYmxhbmtOb2RlKHZhbHVlPzogc3RyaW5nKTogSUJsYW5rTm9kZVxuICAgIGxpdGVyYWwodmFsdWU6IHN0cmluZywgbGFuZ3VhZ2VPckRhdGF0eXBlPzogc3RyaW5nfE5hbWVkTm9kZSk6IElMaXRlcmFsXG4gICAgdmFyaWFibGUodmFsdWU6IHN0cmluZyk6IElWYXJpYWJsZVxuICAgIGRlZmF1bHRHcmFwaCgpOiBJRGVmYXVsdEdyYXBoXG4gICAgdHJpcGxlKHN1YmplY3Q6IElUZXJtLCBwcmVkaWNhdGU6IElUZXJtLCBvYmplY3Q6IElUZXJtKTogSVF1YWRcbiAgICBxdWFkKHN1YmplY3Q6IElUZXJtLCBwcmVkaWNhdGU6IElUZXJtLCBvYmplY3Q6IElUZXJtKTogSVF1YWRcbiAgfVxuXG5cbn1cbiJdfQ==

var fibra;
(function (fibra) {
    'use strict';
    var SelectViewComponentController = (function () {
        function SelectViewComponentController(configurationService, $state) {
            this.configurationService = configurationService;
            this.$state = $state;
        }
        SelectViewComponentController.prototype.setData = function (identifier) {
            var c = this.configurationService.configuration;
            c.primaryEndpoint.localItemQueryTemplate = c.primaryEndpoint.localItemQueryTemplate.replace(/GRAPH <GRAPH>/g, 'GRAPH <http://ldf.fi/fibra/' + identifier + '/>');
            c.primaryEndpoint.autocompletionTextMatchQueryTemplate = c.primaryEndpoint.autocompletionTextMatchQueryTemplate.replace(/GRAPH <GRAPH>/g, 'GRAPH <http://ldf.fi/fibra/' + identifier + '/>');
            this.configurationService.setConfiguration(c);
            this.$state.go('construct');
        };
        return SelectViewComponentController;
    }());/*<auto_generate>*/angular.module('fibra').controller('SelectViewComponentController',['configurationService','$state',function(){return new (Function.prototype.bind.apply(SelectViewComponentController,[null].concat(Array.prototype.slice.apply(arguments))));}]);/*</auto_generate>*/
    fibra.SelectViewComponentController = SelectViewComponentController;
    var SelectViewComponent = (function () {
        function SelectViewComponent() {
            this.controller = SelectViewComponentController;
            this.templateUrl = 'partials/select-view.html';
        }
        return SelectViewComponent;
    }());/*<auto_generate>*/angular.module('fibra').component('selectView',new SelectViewComponent());/*</auto_generate>*/
    fibra.SelectViewComponent = SelectViewComponent;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2FwcC9zY3JpcHRzL3NlbGVjdC12aWV3LWNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFVLEtBQUssQ0FrQmQ7QUFsQkQsV0FBVSxLQUFLLEVBQUMsQ0FBQztJQUNmLFlBQVksQ0FBQTtJQUVaO1FBUUUsdUNBQW9CLG9CQUEwQyxFQUFVLE1BQWdDO1lBQXBGLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7WUFBVSxXQUFNLEdBQU4sTUFBTSxDQUEwQjtRQUFHLENBQUM7UUFQckcsK0NBQU8sR0FBZCxVQUFlLFVBQWtCO1lBQy9CLElBQUksQ0FBQyxHQUFrQixJQUFJLENBQUMsb0JBQW9CLENBQUMsYUFBYSxDQUFBO1lBQzlELENBQUMsQ0FBQyxlQUFlLENBQUMsc0JBQXNCLEdBQUcsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsNkJBQTZCLEdBQUcsVUFBVSxHQUFHLElBQUksQ0FBQyxDQUFBO1lBQ2hLLENBQUMsQ0FBQyxlQUFlLENBQUMsb0NBQW9DLEdBQUcsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxvQ0FBb0MsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsNkJBQTZCLEdBQUcsVUFBVSxHQUFHLElBQUksQ0FBQyxDQUFBO1lBQzVMLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUM3QyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUM3QixDQUFDO1FBRUgsb0NBQUM7SUFBRCxDQVRBLEFBU0MsSUFBQTtJQVRZLG1DQUE2QixnQ0FTekMsQ0FBQTtJQUVEO1FBQUE7WUFDVyxlQUFVLEdBQWtELDZCQUE2QixDQUFBO1lBQ3pGLGdCQUFXLEdBQVcsMkJBQTJCLENBQUE7UUFDNUQsQ0FBQztRQUFELDBCQUFDO0lBQUQsQ0FIQSxBQUdDLElBQUE7SUFIWSx5QkFBbUIsc0JBRy9CLENBQUE7QUFDSCxDQUFDLEVBbEJTLEtBQUssS0FBTCxLQUFLLFFBa0JkIiwiZmlsZSI6InNjcmlwdHMvc2VsZWN0LXZpZXctY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIGZpYnJhIHtcbiAgJ3VzZSBzdHJpY3QnXG5cbiAgZXhwb3J0IGNsYXNzIFNlbGVjdFZpZXdDb21wb25lbnRDb250cm9sbGVyIGltcGxlbWVudHMgYW5ndWxhci5JQ29tcG9uZW50Q29udHJvbGxlciB7XG4gICAgcHVibGljIHNldERhdGEoaWRlbnRpZmllcjogc3RyaW5nKTogdm9pZCB7XG4gICAgICBsZXQgYzogQ29uZmlndXJhdGlvbiA9IHRoaXMuY29uZmlndXJhdGlvblNlcnZpY2UuY29uZmlndXJhdGlvblxuICAgICAgYy5wcmltYXJ5RW5kcG9pbnQubG9jYWxJdGVtUXVlcnlUZW1wbGF0ZSA9IGMucHJpbWFyeUVuZHBvaW50LmxvY2FsSXRlbVF1ZXJ5VGVtcGxhdGUucmVwbGFjZSgvR1JBUEggPEdSQVBIPi9nLCAnR1JBUEggPGh0dHA6Ly9sZGYuZmkvZmlicmEvJyArIGlkZW50aWZpZXIgKyAnLz4nKVxuICAgICAgYy5wcmltYXJ5RW5kcG9pbnQuYXV0b2NvbXBsZXRpb25UZXh0TWF0Y2hRdWVyeVRlbXBsYXRlID0gYy5wcmltYXJ5RW5kcG9pbnQuYXV0b2NvbXBsZXRpb25UZXh0TWF0Y2hRdWVyeVRlbXBsYXRlLnJlcGxhY2UoL0dSQVBIIDxHUkFQSD4vZywgJ0dSQVBIIDxodHRwOi8vbGRmLmZpL2ZpYnJhLycgKyBpZGVudGlmaWVyICsgJy8+JylcbiAgICAgIHRoaXMuY29uZmlndXJhdGlvblNlcnZpY2Uuc2V0Q29uZmlndXJhdGlvbihjKVxuICAgICAgdGhpcy4kc3RhdGUuZ28oJ2NvbnN0cnVjdCcpXG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uZmlndXJhdGlvblNlcnZpY2U6IENvbmZpZ3VyYXRpb25TZXJ2aWNlLCBwcml2YXRlICRzdGF0ZTogYW5ndWxhci51aS5JU3RhdGVTZXJ2aWNlKSB7fVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIFNlbGVjdFZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBhbmd1bGFyLklDb21wb25lbnRPcHRpb25zIHtcbiAgICAgIHB1YmxpYyBjb250cm9sbGVyOiAobmV3ICguLi5hcmdzOiBhbnlbXSkgPT4gYW5ndWxhci5JQ29udHJvbGxlcikgPSBTZWxlY3RWaWV3Q29tcG9uZW50Q29udHJvbGxlclxuICAgICAgcHVibGljIHRlbXBsYXRlVXJsOiBzdHJpbmcgPSAncGFydGlhbHMvc2VsZWN0LXZpZXcuaHRtbCdcbiAgfVxufVxuIl19

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2FwcC9zY3JpcHRzL3NwYXJxbC1hdXRvY29tcGxldGUtY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQVUsS0FBSyxDQTRDZDtBQTVDRCxXQUFVLEtBQUssRUFBQyxDQUFDO0lBQ2YsWUFBWSxDQUFBO0lBQ1o7UUE0QkUsK0NBQW9CLEVBQXFCLEVBQVUseUJBQW9EO1lBNUJ6RyxpQkErQkM7WUFIcUIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7WUFBVSw4QkFBeUIsR0FBekIseUJBQXlCLENBQTJCO1lBeEJoRyxVQUFLLEdBQVksS0FBSyxDQUFBO1lBSXRCLGlCQUFZLEdBQWU7Z0JBQ2hDLEtBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFBO2dCQUNqQixLQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQTtZQUNqQixDQUFDLENBQUE7WUFDTSxhQUFRLEdBQTRCLFVBQUMsS0FBYTtnQkFDdkQsS0FBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtnQkFDeEIsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFBO2dCQUNoQyxLQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQTtnQkFDeEIsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7Z0JBQ2xCLEtBQUksQ0FBQyx5QkFBeUIsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEtBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQ3pGLFVBQUMsY0FBNkI7b0JBQzVCLEtBQUksQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFBO29CQUM3QixLQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQTtnQkFDM0IsQ0FBQyxFQUNEO29CQUNFLEtBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFBO29CQUN6QixLQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQTtnQkFDbkIsQ0FBQyxDQUNGLENBQUE7WUFDSCxDQUFDLENBQUE7WUFFQyxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUM3QixDQUFDO1FBQ0gsNENBQUM7SUFBRCxDQS9CQSxBQStCQyxJQUFBO0lBRUQ7UUFBQTtZQUNXLGFBQVEsR0FBMkI7Z0JBQ3hDLFdBQVcsRUFBRSxHQUFHO2dCQUNoQixLQUFLLEVBQUUsR0FBRztnQkFDVixRQUFRLEVBQUUsR0FBRzthQUNkLENBQUE7WUFDTSxlQUFVLEdBQUcscUNBQXFDLENBQUE7WUFDbEQsZ0JBQVcsR0FBVyxtQ0FBbUMsQ0FBQTtRQUNwRSxDQUFDO1FBQUQsa0NBQUM7SUFBRCxDQVJBLEFBUUMsSUFBQTtJQVJZLGlDQUEyQiw4QkFRdkMsQ0FBQTtBQUNILENBQUMsRUE1Q1MsS0FBSyxLQUFMLEtBQUssUUE0Q2QiLCJmaWxlIjoic2NyaXB0cy9zcGFycWwtYXV0b2NvbXBsZXRlLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBmaWJyYSB7XG4gICd1c2Ugc3RyaWN0J1xuICBjbGFzcyBTcGFycWxBdXRvY29tcGxldGVDb21wb25lbnRDb250cm9sbGVyIHtcbiAgICBwdWJsaWMgbGltaXQ6IG51bWJlclxuICAgIHB1YmxpYyBxdWVyeVJ1bm5pbmc6IGJvb2xlYW5cbiAgICBwdWJsaWMgb25TZWxlY3Q6IChzZWxlY3Rpb246IFJlc3VsdCkgPT4gdm9pZFxuICAgIHB1YmxpYyBlcnJvcjogYm9vbGVhbiA9IGZhbHNlXG4gICAgcHVibGljIHF1ZXJ5OiBzdHJpbmdcbiAgICBwcml2YXRlIHJlc3VsdHM6IFJlc3VsdEdyb3VwW11cbiAgICBwcml2YXRlIGNhbmNlbGxlcjogYW5ndWxhci5JRGVmZXJyZWQ8YW55PlxuICAgIHB1YmxpYyBjbGVhclJlc3VsdHM6ICgpID0+IHZvaWQgPSAoKSA9PiB7XG4gICAgICB0aGlzLnJlc3VsdHMgPSBbXVxuICAgICAgdGhpcy5xdWVyeSA9ICcnXG4gICAgfVxuICAgIHB1YmxpYyBvbkNoYW5nZTogKHF1ZXJ5OiBzdHJpbmcpID0+IHZvaWQgPSAocXVlcnk6IHN0cmluZykgPT4ge1xuICAgICAgdGhpcy5jYW5jZWxsZXIucmVzb2x2ZSgpXG4gICAgICB0aGlzLmNhbmNlbGxlciA9IHRoaXMuJHEuZGVmZXIoKVxuICAgICAgdGhpcy5xdWVyeVJ1bm5pbmcgPSB0cnVlXG4gICAgICB0aGlzLmVycm9yID0gZmFsc2VcbiAgICAgIHRoaXMuc3BhcnFsQXV0b2NvbXBsZXRlU2VydmljZS5hdXRvY29tcGxldGUocXVlcnksIHRoaXMubGltaXQsIHRoaXMuY2FuY2VsbGVyLnByb21pc2UpLnRoZW4oXG4gICAgICAgIChyZXN1bHRzQnlHcm91cDogUmVzdWx0R3JvdXBbXSkgPT4ge1xuICAgICAgICAgIHRoaXMucmVzdWx0cyA9IHJlc3VsdHNCeUdyb3VwXG4gICAgICAgICAgdGhpcy5xdWVyeVJ1bm5pbmcgPSBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5xdWVyeVJ1bm5pbmcgPSBmYWxzZVxuICAgICAgICAgIHRoaXMuZXJyb3IgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgIClcbiAgICB9XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkcTogYW5ndWxhci5JUVNlcnZpY2UsIHByaXZhdGUgc3BhcnFsQXV0b2NvbXBsZXRlU2VydmljZTogU3BhcnFsQXV0b2NvbXBsZXRlU2VydmljZSkge1xuICAgICAgdGhpcy5jYW5jZWxsZXIgPSAkcS5kZWZlcigpXG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIFNwYXJxbEF1dG9jb21wbGV0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIGFuZ3VsYXIuSUNvbXBvbmVudE9wdGlvbnMge1xuICAgICAgcHVibGljIGJpbmRpbmdzOiB7W2lkOiBzdHJpbmddOiBzdHJpbmd9ID0ge1xuICAgICAgICBjb25zdHJhaW50czogJzwnLFxuICAgICAgICBsaW1pdDogJ0AnLFxuICAgICAgICBvblNlbGVjdDogJyYnLFxuICAgICAgfVxuICAgICAgcHVibGljIGNvbnRyb2xsZXIgPSBTcGFycWxBdXRvY29tcGxldGVDb21wb25lbnRDb250cm9sbGVyXG4gICAgICBwdWJsaWMgdGVtcGxhdGVVcmw6IHN0cmluZyA9ICdwYXJ0aWFscy9zcGFycWwtYXV0b2NvbXBsZXRlLmh0bWwnXG4gIH1cbn1cbiJdfQ==

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
        SparqlAutocompleteService.defaultMatchQueryTemplate = "\nPREFIX text: <http://jena.apache.org/text#>\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\nPREFIX skos: <http://www.w3.org/2004/02/skos/core#>\nPREFIX mads: <http://www.loc.gov/mads/rdf/v1#>\nPREFIX owl: <http://www.w3.org/2002/07/owl#>\nPREFIX sf: <http://ldf.fi/functions#>\nPREFIX fibra: <http://ldf.fi/fibra/schema#>\nPREFIX dcterms: <http://purl.org/dc/terms/>\nSELECT ?groupId ?groupLabel ?id ?prefLabel ?matchedLabel ?sameAs ?altLabel { # ADDITIONALVARIABLES\n  {\n    SELECT ?groupId ?id (SUM(?sc) AS ?score) {\n      {\n        SELECT ?groupId ?id ?sc {\n          GRAPH <IGRAPH> {\n            BIND(CONCAT(REPLACE(<QUERY>,\"([\\\\+\\\\-\\\\&\\\\|\\\\!\\\\(\\\\)\\\\{\\\\}\\\\[\\\\]\\\\^\\\\\\\"\\\\~\\\\*\\\\?\\\\:\\\\/\\\\\\\\])\",\"\\\\$1\"),\"*\") AS ?query)\n            (?id ?sc) text:query ?query .\n            ?id a ?groupId .\n            # CONSTRAINTS\n          }\n        } LIMIT <LIMIT>\n      } UNION {\n        GRAPH <IGRAPH> {\n          BIND(CONCAT(\"\\\"\",REPLACE(<QUERY>,\"([\\\\+\\\\-\\\\&\\\\|\\\\!\\\\(\\\\)\\\\{\\\\}\\\\[\\\\]\\\\^\\\\\\\"\\\\~\\\\*\\\\?\\\\:\\\\/\\\\\\\\])\",\"\\\\$1\"),\"\\\"\") AS ?query)\n          (?id ?sc) text:query ?query .\n          ?id skos:prefLabel|rdfs:label|skos:altLabel|mads:authoritativeLabel|mads:variantLabel ?matchedLabel\n          FILTER (LCASE(?matchedLabel)=LCASE(<QUERY>))\n          ?id a ?groupId .\n          # CONSTRAINTS\n        }\n      }\n    }\n    GROUP BY ?groupId ?id\n    HAVING(BOUND(?id))\n  }\n  ?id skos:prefLabel|rdfs:label|skos:altLabel|mads:authoritativeLabel|mads:variantLabel ?matchedLabel\n  FILTER (REGEX(LCASE(?matchedLabel),CONCAT(\"\\\\b\",LCASE(<QUERY>))))\n  {\n    GRAPH <SGRAPH> {\n      ?groupId sf:preferredLanguageLiteral (skos:prefLabel mads:authoritativeLabel rdfs:label skos:altLabel mads:variantLabel <PREFLANG> '' ?groupLabel) .\n    }\n  } UNION {\n    ?id sf:preferredLanguageLiteral (skos:prefLabel mads:authoritativeLabel rdfs:label skos:altLabel mads:variantLabel <PREFLANG> '' ?prefLabel) .\n  } UNION {\n    ?id owl:sameAs ?sameAs .\n  } UNION {\n    ?id skos:altLabel|mads:variantLabel ?altLabel .\n  }\n  # ADDITIONALSELECT\n}\n";
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2FwcC9zY3JpcHRzL3NwYXJxbC1hdXRvY29tcGxldGUtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFVLEtBQUssQ0E0TGQ7QUE1TEQsV0FBVSxLQUFLLEVBQUMsQ0FBQztJQUNmLFlBQVksQ0FBQTtJQUVaLElBQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFBO0lBRXpCO1FBRUUscUJBQW1CLEtBQWE7WUFBYixVQUFLLEdBQUwsS0FBSyxDQUFRO1lBRHpCLFlBQU8sR0FBYSxFQUFFLENBQUE7UUFDTSxDQUFDO1FBQ3RDLGtCQUFDO0lBQUQsQ0FIQSxBQUdDLElBQUE7SUFIWSxpQkFBVyxjQUd2QixDQUFBO0lBRUQ7UUFFRSxnQkFBbUIsR0FBWSxFQUFTLFdBQW9DLEVBQVMsWUFBbUIsRUFBUyxTQUFnQjtZQUE5RyxRQUFHLEdBQUgsR0FBRyxDQUFTO1lBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQXlCO1lBQVMsaUJBQVksR0FBWixZQUFZLENBQU87WUFBUyxjQUFTLEdBQVQsU0FBUyxDQUFPO1lBRDFILDBCQUFxQixHQUFpQyxFQUFFLENBQUE7UUFDcUUsQ0FBQztRQUN2SSxhQUFDO0lBQUQsQ0FIQSxBQUdDLElBQUE7SUFIWSxZQUFNLFNBR2xCLENBQUE7SUFFRDtRQXNERSxtQ0FBb0IsYUFBNEI7WUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBRyxDQUFDO1FBRTdDLGdEQUFZLEdBQW5CLFVBQW9CLEtBQWEsRUFBRSxLQUFhLEVBQUUsU0FBaUM7WUFDakYsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGlDQUFpQyxFQUFFLGNBQWMsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQTtRQUM5RyxDQUFDO1FBeERhLG1EQUF5QixHQUFXLHVuRUFrRHJELENBQUE7UUFRQyxnQ0FBQztJQUFELENBNURBLEFBNERDLElBQUE7SUE1RFksK0JBQXlCLDRCQTREckMsQ0FBQTtJQUVEO1FBRUUseUNBQW9CLEVBQXFCLEVBQVUsYUFBOEIsRUFBVSwwQkFBc0Q7WUFBN0gsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7WUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBaUI7WUFBVSwrQkFBMEIsR0FBMUIsMEJBQTBCLENBQTRCO1FBQ2pKLENBQUM7UUFFTSxzREFBWSxHQUFuQixVQUFvQixLQUFhLEVBQUUsS0FBYSxFQUFFLFNBQWlDO1lBQW5GLGlCQXVHQztZQXRHQyxJQUFJLFNBQVMsR0FBb0IsSUFBSSxVQUFJLENBQVksY0FBTSxPQUFBLElBQUksZUFBUyxFQUFFLEVBQWYsQ0FBZSxDQUFDLENBQUE7WUFDM0UsSUFBSSxjQUFjLEdBQW9CLElBQUksVUFBSSxDQUFZLGNBQU0sT0FBQSxJQUFJLGVBQVMsRUFBRSxFQUFmLENBQWUsQ0FBQyxDQUFBO1lBQ2hGLElBQUksc0JBQXNCLEdBQTBCLElBQUksVUFBSSxDQUFrQixjQUFNLE9BQUEsSUFBSSxVQUFJLENBQVksY0FBTSxPQUFBLElBQUksZUFBUyxFQUFFLEVBQWYsQ0FBZSxDQUFDLEVBQTFDLENBQTBDLENBQUMsQ0FBQTtZQUMvSCxJQUFJLGdCQUFnQixHQUEwQixJQUFJLFVBQUksQ0FBa0IsY0FBTSxPQUFBLElBQUksY0FBUSxFQUFTLEVBQXJCLENBQXFCLENBQUMsQ0FBQTtZQUNwRyxJQUFJLG1CQUFtQixHQUEwQixJQUFJLFVBQUksQ0FBa0IsY0FBTSxPQUFBLElBQUksY0FBUSxFQUFTLEVBQXJCLENBQXFCLENBQUMsQ0FBQTtZQUN2RyxJQUFJLGVBQWUsR0FBMEIsSUFBSSxVQUFJLENBQWtCLGNBQU0sT0FBQSxJQUFJLGNBQVEsRUFBUyxFQUFyQixDQUFxQixDQUFDLENBQUE7WUFDbkcsSUFBSSxpQkFBaUIsR0FBNkMsSUFBSSxVQUFJLENBQXFDLGNBQU0sT0FBQSxJQUFJLGlCQUFXLEVBQXlCLEVBQXhDLENBQXdDLENBQUMsQ0FBQTtZQUM5SixNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxHQUFHLENBQUMsVUFBQSxxQkFBcUI7Z0JBQ3ZHLElBQUksYUFBYSxHQUFXLHFCQUFxQixDQUFDLG9DQUFvQyxDQUFBO2dCQUN0RixhQUFhLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO2dCQUM5RixhQUFhLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxxQkFBcUIsQ0FBQyxzQkFBc0IsQ0FBQyxlQUFlLENBQUMsQ0FBQTtnQkFDckgsYUFBYSxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQTtnQkFDN0QsYUFBYSxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLEtBQUksQ0FBQywwQkFBMEIsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtnQkFDckgsTUFBTSxDQUFDLEtBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsYUFBYSxFQUFFLEVBQUMsT0FBTyxFQUFFLFNBQVMsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUM3RyxVQUFDLFFBQVEsSUFBSyxPQUFBLFFBQVEsQ0FBQyxJQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPO29CQUMzRCxJQUFJLEVBQUUsR0FBVyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFBO29CQUNwQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtvQkFDekIsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO29CQUNwRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7d0JBQ3ZCLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsaUJBQVcsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUE7b0JBQzFGLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQzt3QkFDdEIsZUFBZSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsaUJBQVcsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUE7b0JBQ3hGLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQzt3QkFDMUIsbUJBQW1CLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxpQkFBVyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtvQkFDaEcsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDdkIsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFBO3dCQUNwRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7NEJBQ3hCLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLGlCQUFXLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFBO29CQUNuSCxDQUFDO29CQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3RCLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQTt3QkFDOUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFBO29CQUNoRCxDQUFDO29CQUNELEdBQUcsQ0FBQyxDQUFVLFVBQXdCLEVBQXhCLEtBQUEsUUFBUSxDQUFDLElBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUF4QixjQUF3QixFQUF4QixJQUF3QixDQUFDO3dCQUFsQyxJQUFJLENBQUMsU0FBQTt3QkFBOEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUE7cUJBQUE7Z0JBQzVKLENBQUMsQ0FBQyxFQXBCWSxDQW9CWixDQUNILENBQUMsS0FBSyxDQUFDLGNBQU0sT0FBQSxTQUFTLEVBQVQsQ0FBUyxDQUFDLENBQUE7WUFDMUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ1Asa0ZBQWtGO2dCQUNsRixzQkFBc0IsQ0FBQyxJQUFJLENBQUMsVUFBQSxZQUFZLElBQUksT0FBQSxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFBLEVBQUUsSUFBSSxPQUFBLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUEzQixDQUEyQixDQUFDLEVBQTNDLENBQTJDLENBQUMsRUFBckUsQ0FBcUUsQ0FBQyxDQUFBO2dCQUNsSCw2REFBNkQ7Z0JBQzdELFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBQyxLQUFnQixFQUFFLEVBQVU7b0JBQzFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHO3dCQUNaLElBQUksTUFBTSxHQUFjLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7d0JBQzFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDOzRCQUNyQixTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQTs0QkFDekIsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTs0QkFDbEIsSUFBSSxhQUFhLEdBQXVDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTs0QkFDakYsSUFBSSxjQUFjLEdBQXVDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTs0QkFDbkYsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQ0FDbEIsRUFBRSxDQUFDLENBQUMsY0FBYyxDQUFDO29DQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUE7Z0NBQ3RELGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUE7NEJBQzNDLENBQUM7NEJBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQztnQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLGNBQWMsQ0FBQyxDQUFBOzRCQUNwRSxJQUFJLFVBQVUsR0FBYyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFBOzRCQUNsRCxJQUFJLFdBQVcsR0FBYyxjQUFjLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBOzRCQUNwRCxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dDQUNmLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQztvQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO2dDQUM3QyxjQUFjLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQTs0QkFDckMsQ0FBQzs0QkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDO2dDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFBOzRCQUMzRCxJQUFJLElBQUksR0FBb0IsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFBOzRCQUNwRCxJQUFJLElBQUksR0FBb0IsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBOzRCQUNyRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dDQUNULEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztvQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO2dDQUN6QixnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFBOzRCQUNqQyxDQUFDOzRCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0NBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQTs0QkFDL0MsSUFBSSxHQUFHLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTs0QkFDbEMsSUFBSSxHQUFHLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTs0QkFDbkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQ0FDVCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7b0NBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQ0FDekIsbUJBQW1CLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQTs0QkFDcEMsQ0FBQzs0QkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDO2dDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUE7NEJBQ2xELElBQUksR0FBRyxlQUFlLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFBOzRCQUM5QixJQUFJLEdBQUcsZUFBZSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTs0QkFDL0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQ0FDVCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7b0NBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQ0FDekIsZUFBZSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUE7NEJBQ2hDLENBQUM7NEJBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztnQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQTt3QkFDaEQsQ0FBQztvQkFDSCxDQUFDLENBQUMsQ0FBQTtnQkFDSixDQUFDLENBQUMsQ0FBQTtnQkFDRixJQUFJLEdBQUcsR0FBa0IsRUFBRSxDQUFBO2dCQUMzQixJQUFJLGNBQWMsR0FBc0IsSUFBSSxVQUFJLEVBQWUsQ0FBQTtnQkFDL0QsSUFBSSxJQUFJLEdBQWMsSUFBSSxlQUFTLEVBQUUsQ0FBQTtnQkFDckMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFDLEtBQWdCLEVBQUUsRUFBVTtvQkFDMUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTt3QkFDaEIsSUFBSSxRQUFNLEdBQVcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLGlCQUFXLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBbkMsQ0FBbUMsQ0FBQyxFQUFFLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7d0JBQ2xOLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7NEJBQUMsUUFBTSxDQUFDLHFCQUFxQixDQUFDLFVBQVUsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUE7d0JBQ3hHLFFBQU0sQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLGlCQUFXLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBakMsQ0FBaUMsQ0FBQyxDQUFBO3dCQUNsSCxRQUFNLENBQUMscUJBQXFCLENBQUMsV0FBVyxDQUFDLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQW5DLENBQW1DLENBQUMsQ0FBQTt3QkFDekgsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHOzRCQUM3QixJQUFJLFdBQVcsR0FBZ0IsY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTs0QkFDdEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dDQUNqQixXQUFXLEdBQUcsSUFBSSxXQUFXLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFBO2dDQUMxRSxjQUFjLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQTtnQ0FDcEMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQTs0QkFDdkIsQ0FBQzs0QkFDRCxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFNLENBQUMsQ0FBQTt3QkFDbEMsQ0FBQyxDQUFDLENBQUE7b0JBQ0osQ0FBQztnQkFDSCxDQUFDLENBQUMsQ0FBQTtnQkFDRixNQUFNLENBQUMsR0FBRyxDQUFBO1lBQ1osQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDO1FBQ0gsc0NBQUM7SUFBRCxDQTdHQSxBQTZHQyxJQUFBO0lBN0dZLHFDQUErQixrQ0E2RzNDLENBQUE7QUFFSCxDQUFDLEVBNUxTLEtBQUssS0FBTCxLQUFLLFFBNExkIiwiZmlsZSI6InNjcmlwdHMvc3BhcnFsLWF1dG9jb21wbGV0ZS1zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIGZpYnJhIHtcbiAgJ3VzZSBzdHJpY3QnXG5cbiAgaW1wb3J0IHMgPSBmaS5zZWNvLnNwYXJxbFxuXG4gIGV4cG9ydCBjbGFzcyBSZXN1bHRHcm91cCB7XG4gICAgcHVibGljIHJlc3VsdHM6IFJlc3VsdFtdID0gW11cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbGFiZWw6IHN0cmluZykge31cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBSZXN1bHQge1xuICAgIHB1YmxpYyBhZGRpdGlvbmFsSW5mb3JtYXRpb246IHtbdmFyTmFtZTogc3RyaW5nXTogSU5vZGVbXX0gPSB7fVxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBpZHM6IElOb2RlW10sIHB1YmxpYyBkYXRhc291cmNlczogRW5kcG9pbnRDb25maWd1cmF0aW9uW10sIHB1YmxpYyBtYXRjaGVkTGFiZWw6IElOb2RlLCBwdWJsaWMgcHJlZkxhYmVsOiBJTm9kZSkge31cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBTcGFycWxBdXRvY29tcGxldGVTZXJ2aWNlIHtcblxuICAgIHB1YmxpYyBzdGF0aWMgZGVmYXVsdE1hdGNoUXVlcnlUZW1wbGF0ZTogc3RyaW5nID0gYFxuUFJFRklYIHRleHQ6IDxodHRwOi8vamVuYS5hcGFjaGUub3JnL3RleHQjPlxuUFJFRklYIHJkZnM6IDxodHRwOi8vd3d3LnczLm9yZy8yMDAwLzAxL3JkZi1zY2hlbWEjPlxuUFJFRklYIHNrb3M6IDxodHRwOi8vd3d3LnczLm9yZy8yMDA0LzAyL3Nrb3MvY29yZSM+XG5QUkVGSVggbWFkczogPGh0dHA6Ly93d3cubG9jLmdvdi9tYWRzL3JkZi92MSM+XG5QUkVGSVggb3dsOiA8aHR0cDovL3d3dy53My5vcmcvMjAwMi8wNy9vd2wjPlxuUFJFRklYIHNmOiA8aHR0cDovL2xkZi5maS9mdW5jdGlvbnMjPlxuUFJFRklYIGZpYnJhOiA8aHR0cDovL2xkZi5maS9maWJyYS9zY2hlbWEjPlxuUFJFRklYIGRjdGVybXM6IDxodHRwOi8vcHVybC5vcmcvZGMvdGVybXMvPlxuU0VMRUNUID9ncm91cElkID9ncm91cExhYmVsID9pZCA/cHJlZkxhYmVsID9tYXRjaGVkTGFiZWwgP3NhbWVBcyA/YWx0TGFiZWwgeyAjIEFERElUSU9OQUxWQVJJQUJMRVNcbiAge1xuICAgIFNFTEVDVCA/Z3JvdXBJZCA/aWQgKFNVTSg/c2MpIEFTID9zY29yZSkge1xuICAgICAge1xuICAgICAgICBTRUxFQ1QgP2dyb3VwSWQgP2lkID9zYyB7XG4gICAgICAgICAgR1JBUEggPElHUkFQSD4ge1xuICAgICAgICAgICAgQklORChDT05DQVQoUkVQTEFDRSg8UVVFUlk+LFwiKFtcXFxcXFxcXCtcXFxcXFxcXC1cXFxcXFxcXCZcXFxcXFxcXHxcXFxcXFxcXCFcXFxcXFxcXChcXFxcXFxcXClcXFxcXFxcXHtcXFxcXFxcXH1cXFxcXFxcXFtcXFxcXFxcXF1cXFxcXFxcXF5cXFxcXFxcXFxcXFxcIlxcXFxcXFxcflxcXFxcXFxcKlxcXFxcXFxcP1xcXFxcXFxcOlxcXFxcXFxcL1xcXFxcXFxcXFxcXFxcXFxdKVwiLFwiXFxcXFxcXFwkMVwiKSxcIipcIikgQVMgP3F1ZXJ5KVxuICAgICAgICAgICAgKD9pZCA/c2MpIHRleHQ6cXVlcnkgP3F1ZXJ5IC5cbiAgICAgICAgICAgID9pZCBhID9ncm91cElkIC5cbiAgICAgICAgICAgICMgQ09OU1RSQUlOVFNcbiAgICAgICAgICB9XG4gICAgICAgIH0gTElNSVQgPExJTUlUPlxuICAgICAgfSBVTklPTiB7XG4gICAgICAgIEdSQVBIIDxJR1JBUEg+IHtcbiAgICAgICAgICBCSU5EKENPTkNBVChcIlxcXFxcIlwiLFJFUExBQ0UoPFFVRVJZPixcIihbXFxcXFxcXFwrXFxcXFxcXFwtXFxcXFxcXFwmXFxcXFxcXFx8XFxcXFxcXFwhXFxcXFxcXFwoXFxcXFxcXFwpXFxcXFxcXFx7XFxcXFxcXFx9XFxcXFxcXFxbXFxcXFxcXFxdXFxcXFxcXFxeXFxcXFxcXFxcXFxcXCJcXFxcXFxcXH5cXFxcXFxcXCpcXFxcXFxcXD9cXFxcXFxcXDpcXFxcXFxcXC9cXFxcXFxcXFxcXFxcXFxcXSlcIixcIlxcXFxcXFxcJDFcIiksXCJcXFxcXCJcIikgQVMgP3F1ZXJ5KVxuICAgICAgICAgICg/aWQgP3NjKSB0ZXh0OnF1ZXJ5ID9xdWVyeSAuXG4gICAgICAgICAgP2lkIHNrb3M6cHJlZkxhYmVsfHJkZnM6bGFiZWx8c2tvczphbHRMYWJlbHxtYWRzOmF1dGhvcml0YXRpdmVMYWJlbHxtYWRzOnZhcmlhbnRMYWJlbCA/bWF0Y2hlZExhYmVsXG4gICAgICAgICAgRklMVEVSIChMQ0FTRSg/bWF0Y2hlZExhYmVsKT1MQ0FTRSg8UVVFUlk+KSlcbiAgICAgICAgICA/aWQgYSA/Z3JvdXBJZCAuXG4gICAgICAgICAgIyBDT05TVFJBSU5UU1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIEdST1VQIEJZID9ncm91cElkID9pZFxuICAgIEhBVklORyhCT1VORCg/aWQpKVxuICB9XG4gID9pZCBza29zOnByZWZMYWJlbHxyZGZzOmxhYmVsfHNrb3M6YWx0TGFiZWx8bWFkczphdXRob3JpdGF0aXZlTGFiZWx8bWFkczp2YXJpYW50TGFiZWwgP21hdGNoZWRMYWJlbFxuICBGSUxURVIgKFJFR0VYKExDQVNFKD9tYXRjaGVkTGFiZWwpLENPTkNBVChcIlxcXFxcXFxcYlwiLExDQVNFKDxRVUVSWT4pKSkpXG4gIHtcbiAgICBHUkFQSCA8U0dSQVBIPiB7XG4gICAgICA/Z3JvdXBJZCBzZjpwcmVmZXJyZWRMYW5ndWFnZUxpdGVyYWwgKHNrb3M6cHJlZkxhYmVsIG1hZHM6YXV0aG9yaXRhdGl2ZUxhYmVsIHJkZnM6bGFiZWwgc2tvczphbHRMYWJlbCBtYWRzOnZhcmlhbnRMYWJlbCA8UFJFRkxBTkc+ICcnID9ncm91cExhYmVsKSAuXG4gICAgfVxuICB9IFVOSU9OIHtcbiAgICA/aWQgc2Y6cHJlZmVycmVkTGFuZ3VhZ2VMaXRlcmFsIChza29zOnByZWZMYWJlbCBtYWRzOmF1dGhvcml0YXRpdmVMYWJlbCByZGZzOmxhYmVsIHNrb3M6YWx0TGFiZWwgbWFkczp2YXJpYW50TGFiZWwgPFBSRUZMQU5HPiAnJyA/cHJlZkxhYmVsKSAuXG4gIH0gVU5JT04ge1xuICAgID9pZCBvd2w6c2FtZUFzID9zYW1lQXMgLlxuICB9IFVOSU9OIHtcbiAgICA/aWQgc2tvczphbHRMYWJlbHxtYWRzOnZhcmlhbnRMYWJlbCA/YWx0TGFiZWwgLlxuICB9XG4gICMgQURESVRJT05BTFNFTEVDVFxufVxuYFxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB3b3JrZXJTZXJ2aWNlOiBXb3JrZXJTZXJ2aWNlKSB7fVxuXG4gICAgcHVibGljIGF1dG9jb21wbGV0ZShxdWVyeTogc3RyaW5nLCBsaW1pdDogbnVtYmVyLCBjYW5jZWxsZXI/OiBhbmd1bGFyLklQcm9taXNlPGFueT4pOiBhbmd1bGFyLklQcm9taXNlPFJlc3VsdEdyb3VwW10+IHtcbiAgICAgIHJldHVybiB0aGlzLndvcmtlclNlcnZpY2UuY2FsbCgnc3BhcnFsQXV0b2NvbXBsZXRlV29ya2VyU2VydmljZScsICdhdXRvY29tcGxldGUnLCBbcXVlcnksIGxpbWl0XSwgY2FuY2VsbGVyKVxuICAgIH1cblxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIFNwYXJxbEF1dG9jb21wbGV0ZVdvcmtlclNlcnZpY2Uge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkcTogYW5ndWxhci5JUVNlcnZpY2UsIHByaXZhdGUgc3BhcnFsU2VydmljZTogcy5TcGFycWxTZXJ2aWNlLCBwcml2YXRlIGNvbmZpZ3VyYXRpb25Xb3JrZXJTZXJ2aWNlOiBDb25maWd1cmF0aW9uV29ya2VyU2VydmljZSkge1xuICAgIH1cblxuICAgIHB1YmxpYyBhdXRvY29tcGxldGUocXVlcnk6IHN0cmluZywgbGltaXQ6IG51bWJlciwgY2FuY2VsbGVyPzogYW5ndWxhci5JUHJvbWlzZTxhbnk+KTogYW5ndWxhci5JUHJvbWlzZTxSZXN1bHRHcm91cFtdPiB7XG4gICAgICBsZXQgaWRUb0lkU2V0OiBFTWFwPFN0cmluZ1NldD4gPSBuZXcgRU1hcDxTdHJpbmdTZXQ+KCgpID0+IG5ldyBTdHJpbmdTZXQoKSlcbiAgICAgIGxldCBpZFRvR3JvdXBJZFNldDogRU1hcDxTdHJpbmdTZXQ+ID0gbmV3IEVNYXA8U3RyaW5nU2V0PigoKSA9PiBuZXcgU3RyaW5nU2V0KCkpXG4gICAgICBsZXQgaWZwVmFyUGx1c1ZhbHVlVG9JZFNldDogRU1hcDxFTWFwPFN0cmluZ1NldD4+ID0gbmV3IEVNYXA8RU1hcDxTdHJpbmdTZXQ+PigoKSA9PiBuZXcgRU1hcDxTdHJpbmdTZXQ+KCgpID0+IG5ldyBTdHJpbmdTZXQoKSkpXG4gICAgICBsZXQgaWRUb1ByZWZMYWJlbFNldDogRU1hcDxPTm9kZVNldDxJTm9kZT4+ID0gbmV3IEVNYXA8T05vZGVTZXQ8SU5vZGU+PigoKSA9PiBuZXcgT05vZGVTZXQ8SU5vZGU+KCkpXG4gICAgICBsZXQgaWRUb01hdGNoZWRMYWJlbFNldDogRU1hcDxPTm9kZVNldDxJTm9kZT4+ID0gbmV3IEVNYXA8T05vZGVTZXQ8SU5vZGU+PigoKSA9PiBuZXcgT05vZGVTZXQ8SU5vZGU+KCkpXG4gICAgICBsZXQgaWRUb0FsdExhYmVsU2V0OiBFTWFwPE9Ob2RlU2V0PElOb2RlPj4gPSBuZXcgRU1hcDxPTm9kZVNldDxJTm9kZT4+KCgpID0+IG5ldyBPTm9kZVNldDxJTm9kZT4oKSlcbiAgICAgIGxldCBpZFRvRGF0YXNvdXJjZVNldDogRU1hcDxJZGVudGl0eVNldDxFbmRwb2ludENvbmZpZ3VyYXRpb24+PiA9IG5ldyBFTWFwPElkZW50aXR5U2V0PEVuZHBvaW50Q29uZmlndXJhdGlvbj4+KCgpID0+IG5ldyBJZGVudGl0eVNldDxFbmRwb2ludENvbmZpZ3VyYXRpb24+KCkpXG4gICAgICByZXR1cm4gdGhpcy4kcS5hbGwodGhpcy5jb25maWd1cmF0aW9uV29ya2VyU2VydmljZS5jb25maWd1cmF0aW9uLmFsbEVuZHBvaW50cygpLm1hcChlbmRwb2ludENvbmZpZ3VyYXRpb24gPT4ge1xuICAgICAgICBsZXQgcXVlcnlUZW1wbGF0ZTogc3RyaW5nID0gZW5kcG9pbnRDb25maWd1cmF0aW9uLmF1dG9jb21wbGV0aW9uVGV4dE1hdGNoUXVlcnlUZW1wbGF0ZVxuICAgICAgICBxdWVyeVRlbXBsYXRlID0gcXVlcnlUZW1wbGF0ZS5yZXBsYWNlKC88UVVFUlk+L2csIHMuU3BhcnFsU2VydmljZS5zdHJpbmdUb1NQQVJRTFN0cmluZyhxdWVyeSkpXG4gICAgICAgIHF1ZXJ5VGVtcGxhdGUgPSBxdWVyeVRlbXBsYXRlLnJlcGxhY2UoLyMgQ09OU1RSQUlOVFMvZywgZW5kcG9pbnRDb25maWd1cmF0aW9uLmRhdGFNb2RlbENvbmZpZ3VyYXRpb24udHlwZUNvbnN0cmFpbnRzKVxuICAgICAgICBxdWVyeVRlbXBsYXRlID0gcXVlcnlUZW1wbGF0ZS5yZXBsYWNlKC88TElNSVQ+L2csICcnICsgbGltaXQpXG4gICAgICAgIHF1ZXJ5VGVtcGxhdGUgPSBxdWVyeVRlbXBsYXRlLnJlcGxhY2UoLzxQUkVGTEFORz4vZywgdGhpcy5jb25maWd1cmF0aW9uV29ya2VyU2VydmljZS5jb25maWd1cmF0aW9uLnByZWZlcnJlZExhbmd1YWdlKVxuICAgICAgICByZXR1cm4gdGhpcy5zcGFycWxTZXJ2aWNlLnF1ZXJ5KGVuZHBvaW50Q29uZmlndXJhdGlvbi5lbmRwb2ludC52YWx1ZSwgcXVlcnlUZW1wbGF0ZSwge3RpbWVvdXQ6IGNhbmNlbGxlcn0pLnRoZW4oXG4gICAgICAgICAgKHJlc3BvbnNlKSA9PiByZXNwb25zZS5kYXRhIS5yZXN1bHRzLmJpbmRpbmdzLmZvckVhY2goYmluZGluZyA9PiB7XG4gICAgICAgICAgICBsZXQgaWQ6IHN0cmluZyA9IGJpbmRpbmdbJ2lkJ10udmFsdWVcbiAgICAgICAgICAgIGlkVG9JZFNldC5nb2MoaWQpLmFkZChpZClcbiAgICAgICAgICAgIGlkVG9EYXRhc291cmNlU2V0LmdvYyhpZCkuYWRkKGVuZHBvaW50Q29uZmlndXJhdGlvbilcbiAgICAgICAgICAgIGlmIChiaW5kaW5nWydwcmVmTGFiZWwnXSlcbiAgICAgICAgICAgICAgaWRUb1ByZWZMYWJlbFNldC5nb2MoaWQpLmFkZChEYXRhRmFjdG9yeS5pbnN0YW5jZS5ub2RlRnJvbUJpbmRpbmcoYmluZGluZ1sncHJlZkxhYmVsJ10pKVxuICAgICAgICAgICAgaWYgKGJpbmRpbmdbJ2FsdExhYmVsJ10pXG4gICAgICAgICAgICAgIGlkVG9BbHRMYWJlbFNldC5nb2MoaWQpLmFkZChEYXRhRmFjdG9yeS5pbnN0YW5jZS5ub2RlRnJvbUJpbmRpbmcoYmluZGluZ1snYWx0TGFiZWwnXSkpXG4gICAgICAgICAgICBpZiAoYmluZGluZ1snbWF0Y2hlZExhYmVsJ10pXG4gICAgICAgICAgICAgIGlkVG9NYXRjaGVkTGFiZWxTZXQuZ29jKGlkKS5hZGQoRGF0YUZhY3RvcnkuaW5zdGFuY2Uubm9kZUZyb21CaW5kaW5nKGJpbmRpbmdbJ21hdGNoZWRMYWJlbCddKSlcbiAgICAgICAgICAgIGlmIChiaW5kaW5nWydncm91cElkJ10pIHtcbiAgICAgICAgICAgICAgaWRUb0dyb3VwSWRTZXQuZ29jKGlkKS5hZGQoYmluZGluZ1snZ3JvdXBJZCddLnZhbHVlKVxuICAgICAgICAgICAgICBpZiAoYmluZGluZ1snZ3JvdXBMYWJlbCddKVxuICAgICAgICAgICAgICAgIGlkVG9QcmVmTGFiZWxTZXQuZ29jKGJpbmRpbmdbJ2dyb3VwSWQnXS52YWx1ZSkuYWRkKERhdGFGYWN0b3J5Lmluc3RhbmNlLm5vZGVGcm9tQmluZGluZyhiaW5kaW5nWydncm91cExhYmVsJ10pKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGJpbmRpbmdbJ3NhbWVBcyddKSB7XG4gICAgICAgICAgICAgIGlkVG9JZFNldC5nZXQoaWQpLmFkZChiaW5kaW5nWydzYW1lQXMnXS52YWx1ZSlcbiAgICAgICAgICAgICAgaWRUb0lkU2V0LmdvYyhiaW5kaW5nWydzYW1lQXMnXS52YWx1ZSkuYWRkKGlkKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgdiBvZiByZXNwb25zZS5kYXRhIS5oZWFkLnZhcnMpIGlmICh2LmluZGV4T2YoJ2lmcCcpID09PSAwICYmIGJpbmRpbmdbdl0pIGlmcFZhclBsdXNWYWx1ZVRvSWRTZXQuZ29jKHYuc3Vic3RyaW5nKDMpKS5nb2MoYmluZGluZ1t2XS52YWx1ZSkuYWRkKGlkKVxuICAgICAgICAgIH0pXG4gICAgICAgICkuY2F0Y2goKCkgPT4gdW5kZWZpbmVkKVxuICAgICAgfSkpLnRoZW4oKCkgPT4ge1xuICAgICAgICAvLyBjcmVhdGUgc2FtZUFzZXMgZm9yIGFsbCBvYmplY3RzIHNoYXJpbmcgc2FtZSBpbnZlcnNlIGZ1bmN0aW9uYWwgcHJvcGVydHkgdmFsdWVzXG4gICAgICAgIGlmcFZhclBsdXNWYWx1ZVRvSWRTZXQuZWFjaCh2YWx1ZVRvSWRTZXQgPT4gdmFsdWVUb0lkU2V0LmVhY2goaWRzID0+IGlkcy5lYWNoKGlkID0+IGlkVG9JZFNldC5nb2MoaWQpLmFkZHMoaWRzKSkpKVxuICAgICAgICAvLyBjb25zb2xpZGF0ZSBpZCBzZXRzIGFzIHdlbGwgYXMgYWxsIGlkIC1yZWxhdGVkIGluZm9ybWF0aW9uXG4gICAgICAgIGlkVG9JZFNldC5lYWNoKChpZFNldDogU3RyaW5nU2V0LCBpZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgaWRTZXQuZWFjaChvaWQgPT4ge1xuICAgICAgICAgICAgbGV0IG9pZFNldDogU3RyaW5nU2V0ID0gaWRUb0lkU2V0LmdldChvaWQpXG4gICAgICAgICAgICBpZiAoaWRTZXQgIT09IG9pZFNldCkge1xuICAgICAgICAgICAgICBpZFRvSWRTZXQuc2V0KG9pZCwgaWRTZXQpXG4gICAgICAgICAgICAgIGlkU2V0LmFkZHMob2lkU2V0KVxuICAgICAgICAgICAgICBsZXQgZGF0YXNvdXJjZVNldDogSWRlbnRpdHlTZXQ8RW5kcG9pbnRDb25maWd1cmF0aW9uPiA9IGlkVG9EYXRhc291cmNlU2V0LmdldChpZClcbiAgICAgICAgICAgICAgbGV0IG9EYXRhc291cmNlU2V0OiBJZGVudGl0eVNldDxFbmRwb2ludENvbmZpZ3VyYXRpb24+ID0gaWRUb0RhdGFzb3VyY2VTZXQuZ2V0KG9pZClcbiAgICAgICAgICAgICAgaWYgKGRhdGFzb3VyY2VTZXQpIHtcbiAgICAgICAgICAgICAgICBpZiAob0RhdGFzb3VyY2VTZXQpIGRhdGFzb3VyY2VTZXQuYWRkcyhvRGF0YXNvdXJjZVNldClcbiAgICAgICAgICAgICAgICBpZFRvRGF0YXNvdXJjZVNldC5zZXQob2lkLCBkYXRhc291cmNlU2V0KVxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKG9EYXRhc291cmNlU2V0KSBpZFRvRGF0YXNvdXJjZVNldC5zZXQoaWQsIG9EYXRhc291cmNlU2V0KVxuICAgICAgICAgICAgICBsZXQgZ3JvdXBJZFNldDogU3RyaW5nU2V0ID0gaWRUb0dyb3VwSWRTZXQuZ2V0KGlkKVxuICAgICAgICAgICAgICBsZXQgb0dyb3VwSWRTZXQ6IFN0cmluZ1NldCA9IGlkVG9Hcm91cElkU2V0LmdldChvaWQpXG4gICAgICAgICAgICAgIGlmIChncm91cElkU2V0KSB7XG4gICAgICAgICAgICAgICAgaWYgKG9Hcm91cElkU2V0KSBncm91cElkU2V0LmFkZHMob0dyb3VwSWRTZXQpXG4gICAgICAgICAgICAgICAgaWRUb0dyb3VwSWRTZXQuc2V0KG9pZCwgZ3JvdXBJZFNldClcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChvR3JvdXBJZFNldCkgaWRUb0dyb3VwSWRTZXQuc2V0KGlkLCBvR3JvdXBJZFNldClcbiAgICAgICAgICAgICAgbGV0IG1TZXQ6IE9Ob2RlU2V0PElOb2RlPiA9IGlkVG9QcmVmTGFiZWxTZXQuZ2V0KGlkKVxuICAgICAgICAgICAgICBsZXQgb1NldDogT05vZGVTZXQ8SU5vZGU+ID0gaWRUb1ByZWZMYWJlbFNldC5nZXQob2lkKVxuICAgICAgICAgICAgICBpZiAobVNldCkge1xuICAgICAgICAgICAgICAgIGlmIChvU2V0KSBtU2V0LmFkZHMob1NldClcbiAgICAgICAgICAgICAgICBpZFRvUHJlZkxhYmVsU2V0LnNldChvaWQsIG1TZXQpXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAob1NldCkgaWRUb1ByZWZMYWJlbFNldC5zZXQoaWQsIG9TZXQpXG4gICAgICAgICAgICAgIG1TZXQgPSBpZFRvTWF0Y2hlZExhYmVsU2V0LmdldChpZClcbiAgICAgICAgICAgICAgb1NldCA9IGlkVG9NYXRjaGVkTGFiZWxTZXQuZ2V0KG9pZClcbiAgICAgICAgICAgICAgaWYgKG1TZXQpIHtcbiAgICAgICAgICAgICAgICBpZiAob1NldCkgbVNldC5hZGRzKG9TZXQpXG4gICAgICAgICAgICAgICAgaWRUb01hdGNoZWRMYWJlbFNldC5zZXQob2lkLCBtU2V0KVxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKG9TZXQpIGlkVG9NYXRjaGVkTGFiZWxTZXQuc2V0KGlkLCBvU2V0KVxuICAgICAgICAgICAgICBtU2V0ID0gaWRUb0FsdExhYmVsU2V0LmdldChpZClcbiAgICAgICAgICAgICAgb1NldCA9IGlkVG9BbHRMYWJlbFNldC5nZXQob2lkKVxuICAgICAgICAgICAgICBpZiAobVNldCkge1xuICAgICAgICAgICAgICAgIGlmIChvU2V0KSBtU2V0LmFkZHMob1NldClcbiAgICAgICAgICAgICAgICBpZFRvQWx0TGFiZWxTZXQuc2V0KG9pZCwgbVNldClcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChvU2V0KSBpZFRvQWx0TGFiZWxTZXQuc2V0KGlkLCBvU2V0KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgIGxldCByZXQ6IFJlc3VsdEdyb3VwW10gPSBbXVxuICAgICAgICBsZXQgZ3JvdXBJZFRvR3JvdXA6IEVNYXA8UmVzdWx0R3JvdXA+ID0gbmV3IEVNYXA8UmVzdWx0R3JvdXA+KClcbiAgICAgICAgbGV0IHNlZW46IFN0cmluZ1NldCA9IG5ldyBTdHJpbmdTZXQoKVxuICAgICAgICBpZFRvSWRTZXQuZWFjaCgoaWRTZXQ6IFN0cmluZ1NldCwgaWQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgIGlmICghc2Vlbi5oYXMoaWQpKSB7XG4gICAgICAgICAgICBzZWVuLmFkZHMoaWRTZXQpXG4gICAgICAgICAgICBsZXQgcmVzdWx0OiBSZXN1bHQgPSBuZXcgUmVzdWx0KGlkU2V0LnZhbHVlcygpLm1hcChvaWQgPT4gRGF0YUZhY3RvcnkuaW5zdGFuY2UubmFtZWROb2RlKG9pZCkpLCBpZFRvRGF0YXNvdXJjZVNldC5nZXQoaWQpLnZhbHVlcygpLCBpZFRvTWF0Y2hlZExhYmVsU2V0LmdldChpZCkudmFsdWVzKClbMF0sIGlkVG9QcmVmTGFiZWxTZXQuZ2V0KGlkKS52YWx1ZXMoKVswXSlcbiAgICAgICAgICAgIGlmIChpZFRvQWx0TGFiZWxTZXQuaGFzKGlkKSkgcmVzdWx0LmFkZGl0aW9uYWxJbmZvcm1hdGlvblsnYWx0TGFiZWwnXSA9IGlkVG9BbHRMYWJlbFNldC5nZXQoaWQpLnZhbHVlcygpXG4gICAgICAgICAgICByZXN1bHQuYWRkaXRpb25hbEluZm9ybWF0aW9uWyd0eXBlJ10gPSBpZFRvR3JvdXBJZFNldC5nZXQoaWQpLnZhbHVlcygpLm1hcCh2ID0+IERhdGFGYWN0b3J5Lmluc3RhbmNlLm5hbWVkTm9kZSh2KSlcbiAgICAgICAgICAgIHJlc3VsdC5hZGRpdGlvbmFsSW5mb3JtYXRpb25bJ3R5cGVMYWJlbCddID0gaWRUb0dyb3VwSWRTZXQuZ2V0KGlkKS52YWx1ZXMoKS5tYXAodiA9PiBpZFRvUHJlZkxhYmVsU2V0LmdldCh2KS52YWx1ZXMoKVswXSlcbiAgICAgICAgICAgIGlkVG9Hcm91cElkU2V0LmdldChpZCkuZWFjaChnaWQgPT4ge1xuICAgICAgICAgICAgICBsZXQgcmVzdWx0R3JvdXA6IFJlc3VsdEdyb3VwID0gZ3JvdXBJZFRvR3JvdXAuZ2V0KGdpZClcbiAgICAgICAgICAgICAgaWYgKCFyZXN1bHRHcm91cCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdEdyb3VwID0gbmV3IFJlc3VsdEdyb3VwKGlkVG9QcmVmTGFiZWxTZXQuZ2V0KGdpZCkudmFsdWVzKClbMF0udmFsdWUpXG4gICAgICAgICAgICAgICAgZ3JvdXBJZFRvR3JvdXAuc2V0KGdpZCwgcmVzdWx0R3JvdXApXG4gICAgICAgICAgICAgICAgcmV0LnB1c2gocmVzdWx0R3JvdXApXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmVzdWx0R3JvdXAucmVzdWx0cy5wdXNoKHJlc3VsdClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gcmV0XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG59XG4iXX0=

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2FwcC9zY3JpcHRzL3NwYXJxbC1pdGVtLWNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLElBQVUsS0FBSyxDQWlDZDtBQWpDRCxXQUFVLEtBQUssRUFBQyxDQUFDO0lBQ2YsWUFBWSxDQUFBO0lBRVo7UUFBQTtRQUVBLENBQUM7UUFBRCxrQ0FBQztJQUFELENBRkEsQUFFQyxJQUFBO0lBTUQ7UUFBNEMsaURBQTJCO1FBUXJFLHVDQUFvQixpQkFBb0M7WUFSMUQsaUJBV0M7WUFGRyxpQkFBTyxDQUFBO1lBRFcsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtZQU5qRCxlQUFVLEdBQTBELFVBQUMsT0FBMkM7Z0JBQ3JILEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUM7b0JBQ2QsS0FBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUM5QyxVQUFDLElBQVUsSUFBSyxPQUFBLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxFQUFoQixDQUFnQixDQUNqQyxDQUFBO1lBQ0wsQ0FBQyxDQUFBO1FBR0QsQ0FBQztRQUNILG9DQUFDO0lBQUQsQ0FYQSxBQVdDLENBWDJDLDJCQUEyQixHQVd0RTtJQUVEO1FBQUE7WUFDVyxhQUFRLEdBQTJCO2dCQUN4QyxNQUFNLEVBQUUsR0FBRztnQkFDWCxRQUFRLEVBQUUsR0FBRztnQkFDYixvQkFBb0IsRUFBRSxHQUFHO2FBQzFCLENBQUE7WUFDTSxlQUFVLEdBQUcsNkJBQTZCLENBQUE7WUFDMUMsZ0JBQVcsR0FBVywyQkFBMkIsQ0FBQTtRQUM1RCxDQUFDO1FBQUQsMEJBQUM7SUFBRCxDQVJBLEFBUUMsSUFBQTtJQVJZLHlCQUFtQixzQkFRL0IsQ0FBQTtBQUNILENBQUMsRUFqQ1MsS0FBSyxLQUFMLEtBQUssUUFpQ2QiLCJmaWxlIjoic2NyaXB0cy9zcGFycWwtaXRlbS1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgZmlicmEge1xuICAndXNlIHN0cmljdCdcblxuICBjbGFzcyBTcGFycWxJdGVtQ29tcG9uZW50QmluZGluZ3Mge1xuICAgIHB1YmxpYyBpdGVtSWQ6IElOb2RlXG4gIH1cblxuICBpbnRlcmZhY2UgSVNwYXJxbEl0ZW1Db21wb25lbnRCaW5kaW5nQ2hhbmdlcyB7XG4gICAgaXRlbUlkPzogYW5ndWxhci5JQ2hhbmdlc09iamVjdDxJdGVtPlxuICB9XG5cbiAgY2xhc3MgU3BhcnFsSXRlbUNvbXBvbmVudENvbnRyb2xsZXIgZXh0ZW5kcyBTcGFycWxJdGVtQ29tcG9uZW50QmluZGluZ3Mge1xuICAgIHByaXZhdGUgaXRlbTogSXRlbVxuICAgIHB1YmxpYyAkb25DaGFuZ2VzOiAoY2hhbmdlczogSVNwYXJxbEl0ZW1Db21wb25lbnRCaW5kaW5nQ2hhbmdlcykgPT4gdm9pZCA9IChjaGFuZ2VzOiBJU3BhcnFsSXRlbUNvbXBvbmVudEJpbmRpbmdDaGFuZ2VzKSA9PiB7XG4gICAgICBpZiAodGhpcy5pdGVtSWQpXG4gICAgICAgIHRoaXMuc3BhcnFsSXRlbVNlcnZpY2UuZ2V0SXRlbSh0aGlzLml0ZW1JZCkudGhlbihcbiAgICAgICAgICAoaXRlbTogSXRlbSkgPT4gdGhpcy5pdGVtID0gaXRlbVxuICAgICAgICApXG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc3BhcnFsSXRlbVNlcnZpY2U6IFNwYXJxbEl0ZW1TZXJ2aWNlKSB7XG4gICAgICBzdXBlcigpXG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIFNwYXJxbEl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBhbmd1bGFyLklDb21wb25lbnRPcHRpb25zIHtcbiAgICAgIHB1YmxpYyBiaW5kaW5nczoge1tpZDogc3RyaW5nXTogc3RyaW5nfSA9IHtcbiAgICAgICAgaXRlbUlkOiAnPCcsXG4gICAgICAgIG9uU2VsZWN0OiAnJicsXG4gICAgICAgIHNob3dSZW1vdGVQcm9wZXJ0aWVzOiAnQCdcbiAgICAgIH1cbiAgICAgIHB1YmxpYyBjb250cm9sbGVyID0gU3BhcnFsSXRlbUNvbXBvbmVudENvbnRyb2xsZXJcbiAgICAgIHB1YmxpYyB0ZW1wbGF0ZVVybDogc3RyaW5nID0gJ3BhcnRpYWxzL3NwYXJxbC1pdGVtLmh0bWwnXG4gIH1cbn1cbiJdfQ==

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
        SparqlItemService.getLocalItemPropertiesQuery = "\nPREFIX skos: <http://www.w3.org/2004/02/skos/core#>\nPREFIX mads: <http://www.loc.gov/mads/rdf/v1#>\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\nPREFIX owl: <http://www.w3.org/2002/07/owl#>\nPREFIX sf: <http://ldf.fi/functions#>\nSELECT ?itemLabel ?property ?propertyLabel ?object ?objectLabel {\n  GRAPH <GRAPH> {\n    {\n      <ID> sf:preferredLanguageLiteral (skos:prefLabel mads:authoritativeLabel rdfs:label skos:altLabel mads:variantLabel <PREFLANG> '' ?itemLabel) .\n    } UNION {\n      <ID> ?property ?object .\n      OPTIONAL {\n        ?property sf:preferredLanguageLiteral (skos:prefLabel mads:authoritativeLabel rdfs:label skos:altLabel mads:variantLabel <PREFLANG> '' ?propertyLabelP)\n      }\n      BIND(COALESCE(?propertyLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?property),\".*/\",\"\"),\".*#\",\"\"),\"_\",\" \"),\"([A-Z\u00C5\u00C4\u00D6])\",\" $1\")) AS ?propertyLabel)\n      OPTIONAL {\n        ?object sf:preferredLanguageLiteral (skos:prefLabel mads:authoritativeLabel rdfs:label skos:altLabel mads:variantLabel <PREFLANG> '' ?objectLabelP) .\n      }\n      BIND (IF(ISIRI(?object),COALESCE(?objectLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?object),\".*/\",\"\"),\".*#\",\"\"),\"_\",\" \"),\"([A-Z\u00C5\u00C4\u00D6])\",\" $1\")),?object) AS ?objectLabel)\n    }\n  }\n}";
        SparqlItemService.getItemInversePropertiesQuery = "\nPREFIX skos: <http://www.w3.org/2004/02/skos/core#>\nPREFIX mads: <http://www.loc.gov/mads/rdf/v1#>\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\nPREFIX owl: <http://www.w3.org/2002/07/owl#>\nPREFIX sf: <http://ldf.fi/functions#>\nSELECT ?property ?propertyLabel ?object ?objectLabel {\n  VALUES ?id { <IDS> }\n  ?object ?property ?id .\n  ?id ?property ?object .\n  OPTIONAL {\n    ?property sf:preferredLanguageLiteral (skos:prefLabel mads:authoritativeLabel rdfs:label skos:altLabel mads:variantLabel <PREFLANG> '' ?propertyLabelP)\n  }\n  BIND(COALESCE(?propertyLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?property),\".*/\",\"\"),\".*#\",\"\"),\"_\",\" \"),\"([A-Z\u00C5\u00C4\u00D6])\",\" $1\")) AS ?propertyLabel)\n  OPTIONAL {\n    ?object sf:preferredLanguageLiteral (skos:prefLabel mads:authoritativeLabel rdfs:label skos:altLabel mads:variantLabel <PREFLANG> '' ?objectLabelP) .\n  }\n  BIND (IF(ISIRI(?object),COALESCE(?objectLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?object),\".*/\",\"\"),\".*#\",\"\"),\"_\",\" \"),\"([A-Z\u00C5\u00C4\u00D6])\",\" $1\")),?object) AS ?objectLabel)\n}\n";
        SparqlItemService.getRemoteItemPropertiesQuery = "\nPREFIX skos: <http://www.w3.org/2004/02/skos/core#>\nPREFIX mads: <http://www.loc.gov/mads/rdf/v1#>\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\nPREFIX owl: <http://www.w3.org/2002/07/owl#>\nPREFIX sf: <http://ldf.fi/functions#>\nSELECT ?property ?propertyLabel ?object ?objectLabel {\n  VALUES ?id { <IDS> }\n  ?id ?property ?object .\n  OPTIONAL {\n    ?property sf:preferredLanguageLiteral skos:prefLabel mads:authoritativeLabel rdfs:label skos:altLabel mads:variantLabel <PREFLANG> '' ?propertyLabelP)\n  }\n  BIND(COALESCE(?propertyLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?property),\".*/\",\"\"),\".*#\",\"\"),\"_\",\" \"),\"([A-Z\u00C5\u00C4\u00D6])\",\" $1\")) AS ?propertyLabel)\n  OPTIONAL {\n    ?object sf:preferredLanguageLiteral (skos:prefLabel mads:authoritativeLabel rdfs:label skos:altLabel mads:variantLabel <PREFLANG> '' ?objectLabelP) .\n  }\n  BIND (IF(ISIRI(?object),COALESCE(?objectLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?object),\".*/\",\"\"),\".*#\",\"\"),\"_\",\" \"),\"([A-Z\u00C5\u00C4\u00D6])\",\" $1\")),?object) AS ?objectLabel)\n}\n";
        SparqlItemService.getItemsForExploreQuery = "\nPREFIX skos: <http://www.w3.org/2004/02/skos/core#>\nPREFIX mads: <http://www.loc.gov/mads/rdf/v1#>\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\nPREFIX owl: <http://www.w3.org/2002/07/owl#>\nPREFIX sf: <http://ldf.fi/functions#>\nSELECT ?id ?type ?itemLabel ?property ?propertyLabel ?object ?objectLabel {\n  ?id a ?type .\n  {\n    ?id owl:sameAs ?oid\n    VALUES ?service {\n      <SERVICES>\n    }\n    SERVICE ?service {\n      ?oid ?property ?object .\n      OPTIONAL {\n        ?property sf:preferredLanguageLiteral (skos:prefLabel mads:authoritativeLabel rdfs:label skos:altLabel mads:variantLabel <PREFLANG> '' ?propertyLabelP)\n      }\n      BIND(COALESCE(?propertyLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?property),\".*/\",\"\"),\".*#\",\"\"),\"_\",\" \"),\"([A-Z\u00C5\u00C4\u00D6])\",\" $1\")) AS ?propertyLabel)\n      OPTIONAL {\n        ?object sf:preferredLanguageLiteral (skos:prefLabel mads:authoritativeLabel rdfs:label skos:altLabel mads:variantLabel <PREFLANG> '' ?objectLabelP) .\n      }\n      BIND (IF(ISIRI(?object),COALESCE(?objectLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?object),\".*/\",\"\"),\".*#\",\"\"),\"_\",\" \"),\"([A-Z\u00C5\u00C4\u00D6])\",\" $1\")),?object) AS ?objectLabel)\n    }\n  } UNION {\n    ?id sf:preferredLanguageLiteral (skos:prefLabel mads:authoritativeLabel rdfs:label skos:altLabel mads:variantLabel <PREFLANG> '' ?itemLabel) .\n  } UNION {\n    ?id ?property ?object .\n    OPTIONAL {\n      ?property sf:preferredLanguageLiteral (skos:prefLabel mads:authoritativeLabel rdfs:label skos:altLabel mads:variantLabel <PREFLANG> '' ?propertyLabelP)\n    }\n    BIND(COALESCE(?propertyLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?property),\".*/\",\"\"),\".*#\",\"\"),\"_\",\" \"),\"([A-Z\u00C5\u00C4\u00D6])\",\" $1\")) AS ?propertyLabel)\n    OPTIONAL {\n      ?object sf:preferredLanguageLiteral (skos:prefLabel mads:authoritativeLabel rdfs:label skos:altLabel mads:variantLabel <PREFLANG> '' ?objectLabelP) .\n    }\n    BIND (IF(ISIRI(?object),COALESCE(?objectLabelP,REPLACE(REPLACE(REPLACE(REPLACE(STR(?object),\".*/\",\"\"),\".*#\",\"\"),\"_\",\" \"),\"([A-Z\u00C5\u00C4\u00D6])\",\" $1\")),?object) AS ?objectLabel)\n  }\n}\n";
        SparqlItemService.deleteItemQuery = "\nDELETE {\n  GRAPH <GRAPH> {\n    <ID> ?p ?o .\n    ?s ?p <ID> .\n  }\n}\nWHERE {\n  GRAPH <GRAPH> {\n    { <ID> ?p ?o } UNION { ?s ?p <ID> }\n  }\n}\n";
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2FwcC9zY3JpcHRzL3NwYXJxbC1pdGVtLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxJQUFVLEtBQUssQ0E0VmQ7QUE1VkQsV0FBVSxLQUFLLEVBQUMsQ0FBQztJQUNmLFlBQVksQ0FBQTtJQWNaO1FBQW1DLGlDQUFZO1FBRTdDLHVCQUFZLElBQVcsRUFBRSxLQUFhO1lBQ3BDLGtCQUFNLElBQUksQ0FBQyxDQUFBO1lBQ1gsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDO2dCQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO1FBQy9CLENBQUM7UUFDSCxvQkFBQztJQUFELENBTkEsQUFNQyxDQU5rQyxrQkFBWSxHQU05QztJQU5ZLG1CQUFhLGdCQU16QixDQUFBO0lBRUQ7UUFBMEMsd0NBQWE7UUFDckQsOEJBQVksSUFBVyxFQUFFLEtBQWEsRUFBUyxlQUE2QztZQUFwRCwrQkFBb0QsR0FBcEQsb0JBQW9EO1lBQzFGLGtCQUFNLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQTtZQUQyQixvQkFBZSxHQUFmLGVBQWUsQ0FBOEI7UUFFNUYsQ0FBQztRQUNILDJCQUFDO0lBQUQsQ0FKQSxBQUlDLENBSnlDLGFBQWEsR0FJdEQ7SUFKWSwwQkFBb0IsdUJBSWhDLENBQUE7SUFNRDtRQUF1RCxvQ0FBYTtRQUVsRSwwQkFBWSxRQUFlO1lBQ3pCLGtCQUFNLFFBQVEsQ0FBQyxDQUFBO1lBRlYsV0FBTSxHQUFRLEVBQUUsQ0FBQTtRQUd2QixDQUFDO1FBQ0gsdUJBQUM7SUFBRCxDQUxBLEFBS0MsQ0FMc0QsYUFBYSxHQUtuRTtJQUxZLHNCQUFnQixtQkFLNUIsQ0FBQTtJQUVEO1FBRUUsOEJBQW1CLE1BQTZCO1lBQTdCLFdBQU0sR0FBTixNQUFNLENBQXVCO1lBRHpDLGVBQVUsR0FBdUMsRUFBRSxDQUFBO1FBQ1AsQ0FBQztRQUN0RCwyQkFBQztJQUFELENBSEEsQUFHQyxJQUFBO0lBSFksMEJBQW9CLHVCQUdoQyxDQUFB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QUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO29CQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsaUJBQVcsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFBO1lBQ3BHLENBQUM7UUFDSCxDQUFDO1FBRUgsOEJBQUM7SUFBRCxDQTlHQSxBQThHQyxJQUFBO0lBOUdZLDZCQUF1QiwwQkE4R25DLENBQUE7QUFFSCxDQUFDLEVBNVZTLEtBQUssS0FBTCxLQUFLLFFBNFZkIiwiZmlsZSI6InNjcmlwdHMvc3BhcnFsLWl0ZW0tc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBmaWJyYSB7XG4gICd1c2Ugc3RyaWN0J1xuXG4gIGltcG9ydCBzID0gZmkuc2Vjby5zcGFycWxcblxuICBleHBvcnQgaW50ZXJmYWNlIElTb3VyY2VkTm9kZSBleHRlbmRzIElOb2RlIHtcbiAgICBzb3VyY2VFbmRwb2ludHM6IEVuZHBvaW50Q29uZmlndXJhdGlvbltdXG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIElOb2RlUGx1c0xhYmVsIGV4dGVuZHMgSU5vZGUge1xuICAgIGxhYmVsOiBJTm9kZVxuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBJU291cmNlZE5vZGVQbHVzTGFiZWwgZXh0ZW5kcyBJTm9kZVBsdXNMYWJlbCwgSVNvdXJjZWROb2RlIHt9XG5cbiAgZXhwb3J0IGNsYXNzIE5vZGVQbHVzTGFiZWwgZXh0ZW5kcyBOb2RlRnJvbU5vZGUgaW1wbGVtZW50cyBJTm9kZVBsdXNMYWJlbCB7XG4gICAgcHVibGljIGxhYmVsOiBJTm9kZVxuICAgIGNvbnN0cnVjdG9yKG5vZGU6IElOb2RlLCBsYWJlbD86IElOb2RlKSB7XG4gICAgICBzdXBlcihub2RlKVxuICAgICAgaWYgKGxhYmVsKSB0aGlzLmxhYmVsID0gbGFiZWxcbiAgICB9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgU291cmNlZE5vZGVQbHVzTGFiZWwgZXh0ZW5kcyBOb2RlUGx1c0xhYmVsIGltcGxlbWVudHMgSVNvdXJjZWROb2RlUGx1c0xhYmVsIHtcbiAgICBjb25zdHJ1Y3Rvcihub2RlOiBJTm9kZSwgbGFiZWw/OiBJTm9kZSwgcHVibGljIHNvdXJjZUVuZHBvaW50czogRW5kcG9pbnRDb25maWd1cmF0aW9uW10gPSBbXSkge1xuICAgICAgc3VwZXIobm9kZSwgbGFiZWwpXG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBJUHJvcGVydHlUb1ZhbHVlczxUIGV4dGVuZHMgSU5vZGU+IGV4dGVuZHMgSU5vZGVQbHVzTGFiZWwge1xuICAgIHZhbHVlczogVFtdXG4gIH1cblxuICBleHBvcnQgY2xhc3MgUHJvcGVydHlUb1ZhbHVlczxUIGV4dGVuZHMgSU5vZGU+IGV4dGVuZHMgTm9kZVBsdXNMYWJlbCBpbXBsZW1lbnRzIElQcm9wZXJ0eVRvVmFsdWVzPFQ+IHtcbiAgICBwdWJsaWMgdmFsdWVzOiBUW10gPSBbXVxuICAgIGNvbnN0cnVjdG9yKHByb3BlcnR5OiBJTm9kZSkge1xuICAgICAgc3VwZXIocHJvcGVydHkpXG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIFNvdXJjZVBsdXNQcm9wZXJ0aWVzIHtcbiAgICBwdWJsaWMgcHJvcGVydGllczogUHJvcGVydHlUb1ZhbHVlczxJTm9kZVBsdXNMYWJlbD5bXSA9IFtdXG4gICAgY29uc3RydWN0b3IocHVibGljIHNvdXJjZTogRW5kcG9pbnRDb25maWd1cmF0aW9uKSB7fVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIEl0ZW0gZXh0ZW5kcyBOb2RlUGx1c0xhYmVsIHtcbiAgICBwdWJsaWMgbG9jYWxQcm9wZXJ0aWVzOiBQcm9wZXJ0eVRvVmFsdWVzPElOb2RlUGx1c0xhYmVsPltdID0gW11cbiAgICBwdWJsaWMgcmVtb3RlUHJvcGVydGllczogUHJvcGVydHlUb1ZhbHVlczxJTm9kZVBsdXNMYWJlbD5bXSA9IFtdXG4gICAgcHVibGljIGxvY2FsSW52ZXJzZVByb3BlcnRpZXM6IFByb3BlcnR5VG9WYWx1ZXM8SU5vZGVQbHVzTGFiZWw+W10gPSBbXVxuICAgIHB1YmxpYyByZW1vdGVJbnZlcnNlUHJvcGVydGllczogUHJvcGVydHlUb1ZhbHVlczxJTm9kZVBsdXNMYWJlbD5bXSA9IFtdXG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIElDb25zdHJhaW50IHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJhaW50IGFzIGV4cHJlc3NlZCBhcyBhIFNQQVJRTCBleHByZXNzaW9uXG4gICAgICovXG4gICAgY29uc3RyYWludFN0cmluZzogc3RyaW5nXG4gICAgLyoqXG4gICAgICogT3JkZXJpbmcgaGludCBmb3Igb3JkZXJpbmcgY29uc3RyYWludHMgaW4gdGhlIFNQQVJRTCBxdWVyeS4gVGhlIGxhcmdlciwgdGhlIG1vcmUgaW1wb3J0YW50ICh3aGVyZSBpdCBtYXR0ZXJzKVxuICAgICAqL1xuICAgIHByaW9yaXR5OiBudW1iZXJcbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBTaW1wbGVDb25zdHJhaW50IGltcGxlbWVudHMgSUNvbnN0cmFpbnQge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBjb25zdHJhaW50U3RyaW5nOiBzdHJpbmcsIHB1YmxpYyBwcmlvcml0eTogbnVtYmVyID0gMCkge31cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBTcGFycWxJdGVtU2VydmljZSB7XG5cbiAgICBwdWJsaWMgc3RhdGljIG5zOiBzdHJpbmcgPSAnaHR0cDovL2xkZi5maS9maWJyYS8nXG4gICAgcHVibGljIHN0YXRpYyBzY2hlbWFHcmFwaDogSU5vZGUgPSBuZXcgTmFtZWROb2RlKFNwYXJxbEl0ZW1TZXJ2aWNlLm5zICsgJ3NjaGVtYSMnKVxuICAgIHB1YmxpYyBzdGF0aWMgaW5zdGFuY2VHcmFwaDogSU5vZGUgPSBuZXcgTmFtZWROb2RlKFNwYXJxbEl0ZW1TZXJ2aWNlLm5zICsgJ21haW4vJylcblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TG9jYWxJdGVtUHJvcGVydGllc1F1ZXJ5OiBzdHJpbmcgPSBgXG5QUkVGSVggc2tvczogPGh0dHA6Ly93d3cudzMub3JnLzIwMDQvMDIvc2tvcy9jb3JlIz5cblBSRUZJWCBtYWRzOiA8aHR0cDovL3d3dy5sb2MuZ292L21hZHMvcmRmL3YxIz5cblBSRUZJWCByZGZzOiA8aHR0cDovL3d3dy53My5vcmcvMjAwMC8wMS9yZGYtc2NoZW1hIz5cblBSRUZJWCBvd2w6IDxodHRwOi8vd3d3LnczLm9yZy8yMDAyLzA3L293bCM+XG5QUkVGSVggc2Y6IDxodHRwOi8vbGRmLmZpL2Z1bmN0aW9ucyM+XG5TRUxFQ1QgP2l0ZW1MYWJlbCA/cHJvcGVydHkgP3Byb3BlcnR5TGFiZWwgP29iamVjdCA/b2JqZWN0TGFiZWwge1xuICBHUkFQSCA8R1JBUEg+IHtcbiAgICB7XG4gICAgICA8SUQ+IHNmOnByZWZlcnJlZExhbmd1YWdlTGl0ZXJhbCAoc2tvczpwcmVmTGFiZWwgbWFkczphdXRob3JpdGF0aXZlTGFiZWwgcmRmczpsYWJlbCBza29zOmFsdExhYmVsIG1hZHM6dmFyaWFudExhYmVsIDxQUkVGTEFORz4gJycgP2l0ZW1MYWJlbCkgLlxuICAgIH0gVU5JT04ge1xuICAgICAgPElEPiA/cHJvcGVydHkgP29iamVjdCAuXG4gICAgICBPUFRJT05BTCB7XG4gICAgICAgID9wcm9wZXJ0eSBzZjpwcmVmZXJyZWRMYW5ndWFnZUxpdGVyYWwgKHNrb3M6cHJlZkxhYmVsIG1hZHM6YXV0aG9yaXRhdGl2ZUxhYmVsIHJkZnM6bGFiZWwgc2tvczphbHRMYWJlbCBtYWRzOnZhcmlhbnRMYWJlbCA8UFJFRkxBTkc+ICcnID9wcm9wZXJ0eUxhYmVsUClcbiAgICAgIH1cbiAgICAgIEJJTkQoQ09BTEVTQ0UoP3Byb3BlcnR5TGFiZWxQLFJFUExBQ0UoUkVQTEFDRShSRVBMQUNFKFJFUExBQ0UoU1RSKD9wcm9wZXJ0eSksXCIuKi9cIixcIlwiKSxcIi4qI1wiLFwiXCIpLFwiX1wiLFwiIFwiKSxcIihbQS1aw4XDhMOWXSlcIixcIiAkMVwiKSkgQVMgP3Byb3BlcnR5TGFiZWwpXG4gICAgICBPUFRJT05BTCB7XG4gICAgICAgID9vYmplY3Qgc2Y6cHJlZmVycmVkTGFuZ3VhZ2VMaXRlcmFsIChza29zOnByZWZMYWJlbCBtYWRzOmF1dGhvcml0YXRpdmVMYWJlbCByZGZzOmxhYmVsIHNrb3M6YWx0TGFiZWwgbWFkczp2YXJpYW50TGFiZWwgPFBSRUZMQU5HPiAnJyA/b2JqZWN0TGFiZWxQKSAuXG4gICAgICB9XG4gICAgICBCSU5EIChJRihJU0lSSSg/b2JqZWN0KSxDT0FMRVNDRSg/b2JqZWN0TGFiZWxQLFJFUExBQ0UoUkVQTEFDRShSRVBMQUNFKFJFUExBQ0UoU1RSKD9vYmplY3QpLFwiLiovXCIsXCJcIiksXCIuKiNcIixcIlwiKSxcIl9cIixcIiBcIiksXCIoW0EtWsOFw4TDll0pXCIsXCIgJDFcIikpLD9vYmplY3QpIEFTID9vYmplY3RMYWJlbClcbiAgICB9XG4gIH1cbn1gXG4gICAgcHVibGljIHN0YXRpYyBnZXRJdGVtSW52ZXJzZVByb3BlcnRpZXNRdWVyeTogc3RyaW5nID0gYFxuUFJFRklYIHNrb3M6IDxodHRwOi8vd3d3LnczLm9yZy8yMDA0LzAyL3Nrb3MvY29yZSM+XG5QUkVGSVggbWFkczogPGh0dHA6Ly93d3cubG9jLmdvdi9tYWRzL3JkZi92MSM+XG5QUkVGSVggcmRmczogPGh0dHA6Ly93d3cudzMub3JnLzIwMDAvMDEvcmRmLXNjaGVtYSM+XG5QUkVGSVggb3dsOiA8aHR0cDovL3d3dy53My5vcmcvMjAwMi8wNy9vd2wjPlxuUFJFRklYIHNmOiA8aHR0cDovL2xkZi5maS9mdW5jdGlvbnMjPlxuU0VMRUNUID9wcm9wZXJ0eSA/cHJvcGVydHlMYWJlbCA/b2JqZWN0ID9vYmplY3RMYWJlbCB7XG4gIFZBTFVFUyA/aWQgeyA8SURTPiB9XG4gID9vYmplY3QgP3Byb3BlcnR5ID9pZCAuXG4gID9pZCA/cHJvcGVydHkgP29iamVjdCAuXG4gIE9QVElPTkFMIHtcbiAgICA/cHJvcGVydHkgc2Y6cHJlZmVycmVkTGFuZ3VhZ2VMaXRlcmFsIChza29zOnByZWZMYWJlbCBtYWRzOmF1dGhvcml0YXRpdmVMYWJlbCByZGZzOmxhYmVsIHNrb3M6YWx0TGFiZWwgbWFkczp2YXJpYW50TGFiZWwgPFBSRUZMQU5HPiAnJyA/cHJvcGVydHlMYWJlbFApXG4gIH1cbiAgQklORChDT0FMRVNDRSg/cHJvcGVydHlMYWJlbFAsUkVQTEFDRShSRVBMQUNFKFJFUExBQ0UoUkVQTEFDRShTVFIoP3Byb3BlcnR5KSxcIi4qL1wiLFwiXCIpLFwiLiojXCIsXCJcIiksXCJfXCIsXCIgXCIpLFwiKFtBLVrDhcOEw5ZdKVwiLFwiICQxXCIpKSBBUyA/cHJvcGVydHlMYWJlbClcbiAgT1BUSU9OQUwge1xuICAgID9vYmplY3Qgc2Y6cHJlZmVycmVkTGFuZ3VhZ2VMaXRlcmFsIChza29zOnByZWZMYWJlbCBtYWRzOmF1dGhvcml0YXRpdmVMYWJlbCByZGZzOmxhYmVsIHNrb3M6YWx0TGFiZWwgbWFkczp2YXJpYW50TGFiZWwgPFBSRUZMQU5HPiAnJyA/b2JqZWN0TGFiZWxQKSAuXG4gIH1cbiAgQklORCAoSUYoSVNJUkkoP29iamVjdCksQ09BTEVTQ0UoP29iamVjdExhYmVsUCxSRVBMQUNFKFJFUExBQ0UoUkVQTEFDRShSRVBMQUNFKFNUUig/b2JqZWN0KSxcIi4qL1wiLFwiXCIpLFwiLiojXCIsXCJcIiksXCJfXCIsXCIgXCIpLFwiKFtBLVrDhcOEw5ZdKVwiLFwiICQxXCIpKSw/b2JqZWN0KSBBUyA/b2JqZWN0TGFiZWwpXG59XG5gXG4gICAgcHVibGljIHN0YXRpYyBnZXRSZW1vdGVJdGVtUHJvcGVydGllc1F1ZXJ5OiBzdHJpbmcgPSBgXG5QUkVGSVggc2tvczogPGh0dHA6Ly93d3cudzMub3JnLzIwMDQvMDIvc2tvcy9jb3JlIz5cblBSRUZJWCBtYWRzOiA8aHR0cDovL3d3dy5sb2MuZ292L21hZHMvcmRmL3YxIz5cblBSRUZJWCByZGZzOiA8aHR0cDovL3d3dy53My5vcmcvMjAwMC8wMS9yZGYtc2NoZW1hIz5cblBSRUZJWCBvd2w6IDxodHRwOi8vd3d3LnczLm9yZy8yMDAyLzA3L293bCM+XG5QUkVGSVggc2Y6IDxodHRwOi8vbGRmLmZpL2Z1bmN0aW9ucyM+XG5TRUxFQ1QgP3Byb3BlcnR5ID9wcm9wZXJ0eUxhYmVsID9vYmplY3QgP29iamVjdExhYmVsIHtcbiAgVkFMVUVTID9pZCB7IDxJRFM+IH1cbiAgP2lkID9wcm9wZXJ0eSA/b2JqZWN0IC5cbiAgT1BUSU9OQUwge1xuICAgID9wcm9wZXJ0eSBzZjpwcmVmZXJyZWRMYW5ndWFnZUxpdGVyYWwgc2tvczpwcmVmTGFiZWwgbWFkczphdXRob3JpdGF0aXZlTGFiZWwgcmRmczpsYWJlbCBza29zOmFsdExhYmVsIG1hZHM6dmFyaWFudExhYmVsIDxQUkVGTEFORz4gJycgP3Byb3BlcnR5TGFiZWxQKVxuICB9XG4gIEJJTkQoQ09BTEVTQ0UoP3Byb3BlcnR5TGFiZWxQLFJFUExBQ0UoUkVQTEFDRShSRVBMQUNFKFJFUExBQ0UoU1RSKD9wcm9wZXJ0eSksXCIuKi9cIixcIlwiKSxcIi4qI1wiLFwiXCIpLFwiX1wiLFwiIFwiKSxcIihbQS1aw4XDhMOWXSlcIixcIiAkMVwiKSkgQVMgP3Byb3BlcnR5TGFiZWwpXG4gIE9QVElPTkFMIHtcbiAgICA/b2JqZWN0IHNmOnByZWZlcnJlZExhbmd1YWdlTGl0ZXJhbCAoc2tvczpwcmVmTGFiZWwgbWFkczphdXRob3JpdGF0aXZlTGFiZWwgcmRmczpsYWJlbCBza29zOmFsdExhYmVsIG1hZHM6dmFyaWFudExhYmVsIDxQUkVGTEFORz4gJycgP29iamVjdExhYmVsUCkgLlxuICB9XG4gIEJJTkQgKElGKElTSVJJKD9vYmplY3QpLENPQUxFU0NFKD9vYmplY3RMYWJlbFAsUkVQTEFDRShSRVBMQUNFKFJFUExBQ0UoUkVQTEFDRShTVFIoP29iamVjdCksXCIuKi9cIixcIlwiKSxcIi4qI1wiLFwiXCIpLFwiX1wiLFwiIFwiKSxcIihbQS1aw4XDhMOWXSlcIixcIiAkMVwiKSksP29iamVjdCkgQVMgP29iamVjdExhYmVsKVxufVxuYFxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SXRlbXNGb3JFeHBsb3JlUXVlcnk6IHN0cmluZyA9IGBcblBSRUZJWCBza29zOiA8aHR0cDovL3d3dy53My5vcmcvMjAwNC8wMi9za29zL2NvcmUjPlxuUFJFRklYIG1hZHM6IDxodHRwOi8vd3d3LmxvYy5nb3YvbWFkcy9yZGYvdjEjPlxuUFJFRklYIHJkZnM6IDxodHRwOi8vd3d3LnczLm9yZy8yMDAwLzAxL3JkZi1zY2hlbWEjPlxuUFJFRklYIG93bDogPGh0dHA6Ly93d3cudzMub3JnLzIwMDIvMDcvb3dsIz5cblBSRUZJWCBzZjogPGh0dHA6Ly9sZGYuZmkvZnVuY3Rpb25zIz5cblNFTEVDVCA/aWQgP3R5cGUgP2l0ZW1MYWJlbCA/cHJvcGVydHkgP3Byb3BlcnR5TGFiZWwgP29iamVjdCA/b2JqZWN0TGFiZWwge1xuICA/aWQgYSA/dHlwZSAuXG4gIHtcbiAgICA/aWQgb3dsOnNhbWVBcyA/b2lkXG4gICAgVkFMVUVTID9zZXJ2aWNlIHtcbiAgICAgIDxTRVJWSUNFUz5cbiAgICB9XG4gICAgU0VSVklDRSA/c2VydmljZSB7XG4gICAgICA/b2lkID9wcm9wZXJ0eSA/b2JqZWN0IC5cbiAgICAgIE9QVElPTkFMIHtcbiAgICAgICAgP3Byb3BlcnR5IHNmOnByZWZlcnJlZExhbmd1YWdlTGl0ZXJhbCAoc2tvczpwcmVmTGFiZWwgbWFkczphdXRob3JpdGF0aXZlTGFiZWwgcmRmczpsYWJlbCBza29zOmFsdExhYmVsIG1hZHM6dmFyaWFudExhYmVsIDxQUkVGTEFORz4gJycgP3Byb3BlcnR5TGFiZWxQKVxuICAgICAgfVxuICAgICAgQklORChDT0FMRVNDRSg/cHJvcGVydHlMYWJlbFAsUkVQTEFDRShSRVBMQUNFKFJFUExBQ0UoUkVQTEFDRShTVFIoP3Byb3BlcnR5KSxcIi4qL1wiLFwiXCIpLFwiLiojXCIsXCJcIiksXCJfXCIsXCIgXCIpLFwiKFtBLVrDhcOEw5ZdKVwiLFwiICQxXCIpKSBBUyA/cHJvcGVydHlMYWJlbClcbiAgICAgIE9QVElPTkFMIHtcbiAgICAgICAgP29iamVjdCBzZjpwcmVmZXJyZWRMYW5ndWFnZUxpdGVyYWwgKHNrb3M6cHJlZkxhYmVsIG1hZHM6YXV0aG9yaXRhdGl2ZUxhYmVsIHJkZnM6bGFiZWwgc2tvczphbHRMYWJlbCBtYWRzOnZhcmlhbnRMYWJlbCA8UFJFRkxBTkc+ICcnID9vYmplY3RMYWJlbFApIC5cbiAgICAgIH1cbiAgICAgIEJJTkQgKElGKElTSVJJKD9vYmplY3QpLENPQUxFU0NFKD9vYmplY3RMYWJlbFAsUkVQTEFDRShSRVBMQUNFKFJFUExBQ0UoUkVQTEFDRShTVFIoP29iamVjdCksXCIuKi9cIixcIlwiKSxcIi4qI1wiLFwiXCIpLFwiX1wiLFwiIFwiKSxcIihbQS1aw4XDhMOWXSlcIixcIiAkMVwiKSksP29iamVjdCkgQVMgP29iamVjdExhYmVsKVxuICAgIH1cbiAgfSBVTklPTiB7XG4gICAgP2lkIHNmOnByZWZlcnJlZExhbmd1YWdlTGl0ZXJhbCAoc2tvczpwcmVmTGFiZWwgbWFkczphdXRob3JpdGF0aXZlTGFiZWwgcmRmczpsYWJlbCBza29zOmFsdExhYmVsIG1hZHM6dmFyaWFudExhYmVsIDxQUkVGTEFORz4gJycgP2l0ZW1MYWJlbCkgLlxuICB9IFVOSU9OIHtcbiAgICA/aWQgP3Byb3BlcnR5ID9vYmplY3QgLlxuICAgIE9QVElPTkFMIHtcbiAgICAgID9wcm9wZXJ0eSBzZjpwcmVmZXJyZWRMYW5ndWFnZUxpdGVyYWwgKHNrb3M6cHJlZkxhYmVsIG1hZHM6YXV0aG9yaXRhdGl2ZUxhYmVsIHJkZnM6bGFiZWwgc2tvczphbHRMYWJlbCBtYWRzOnZhcmlhbnRMYWJlbCA8UFJFRkxBTkc+ICcnID9wcm9wZXJ0eUxhYmVsUClcbiAgICB9XG4gICAgQklORChDT0FMRVNDRSg/cHJvcGVydHlMYWJlbFAsUkVQTEFDRShSRVBMQUNFKFJFUExBQ0UoUkVQTEFDRShTVFIoP3Byb3BlcnR5KSxcIi4qL1wiLFwiXCIpLFwiLiojXCIsXCJcIiksXCJfXCIsXCIgXCIpLFwiKFtBLVrDhcOEw5ZdKVwiLFwiICQxXCIpKSBBUyA/cHJvcGVydHlMYWJlbClcbiAgICBPUFRJT05BTCB7XG4gICAgICA/b2JqZWN0IHNmOnByZWZlcnJlZExhbmd1YWdlTGl0ZXJhbCAoc2tvczpwcmVmTGFiZWwgbWFkczphdXRob3JpdGF0aXZlTGFiZWwgcmRmczpsYWJlbCBza29zOmFsdExhYmVsIG1hZHM6dmFyaWFudExhYmVsIDxQUkVGTEFORz4gJycgP29iamVjdExhYmVsUCkgLlxuICAgIH1cbiAgICBCSU5EIChJRihJU0lSSSg/b2JqZWN0KSxDT0FMRVNDRSg/b2JqZWN0TGFiZWxQLFJFUExBQ0UoUkVQTEFDRShSRVBMQUNFKFJFUExBQ0UoU1RSKD9vYmplY3QpLFwiLiovXCIsXCJcIiksXCIuKiNcIixcIlwiKSxcIl9cIixcIiBcIiksXCIoW0EtWsOFw4TDll0pXCIsXCIgJDFcIikpLD9vYmplY3QpIEFTID9vYmplY3RMYWJlbClcbiAgfVxufVxuYFxuXG4gICAgcHVibGljIHN0YXRpYyBkZWxldGVJdGVtUXVlcnk6IHN0cmluZyA9IGBcbkRFTEVURSB7XG4gIEdSQVBIIDxHUkFQSD4ge1xuICAgIDxJRD4gP3AgP28gLlxuICAgID9zID9wIDxJRD4gLlxuICB9XG59XG5XSEVSRSB7XG4gIEdSQVBIIDxHUkFQSD4ge1xuICAgIHsgPElEPiA/cCA/byB9IFVOSU9OIHsgP3MgP3AgPElEPiB9XG4gIH1cbn1cbmBcblxuICAgIHByaXZhdGUgc3RhdGljIGx1dDogc3RyaW5nW10gPSAoKCkgPT4ge1xuICAgICAgbGV0IGx1dDogc3RyaW5nW10gPSBbXVxuICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IDI1NjsgaSsrKVxuICAgICAgICBsdXRbaV0gPSAoaSA8IDE2ID8gJzAnIDogJycpICsgaS50b1N0cmluZygxNilcbiAgICAgIHJldHVybiBsdXRcbiAgICB9KSgpXG5cbiAgICBwdWJsaWMgc3RhdGljIFVVSUQoKTogc3RyaW5nIHtcbiAgICAgIC8qIHRzbGludDpkaXNhYmxlOm5vLWJpdHdpc2UgKi9cbiAgICAgIGxldCBkMDogbnVtYmVyID0gTWF0aC5yYW5kb20oKSAqIDB4ZmZmZmZmZmYgfCAwXG4gICAgICBsZXQgZDE6IG51bWJlciA9IE1hdGgucmFuZG9tKCkgKiAweGZmZmZmZmZmIHwgMFxuICAgICAgbGV0IGQyOiBudW1iZXIgPSBNYXRoLnJhbmRvbSgpICogMHhmZmZmZmZmZiB8IDBcbiAgICAgIGxldCBkMzogbnVtYmVyID0gTWF0aC5yYW5kb20oKSAqIDB4ZmZmZmZmZmYgfCAwXG4gICAgICByZXR1cm4gU3BhcnFsSXRlbVNlcnZpY2UubHV0W2QwICYgMHhmZl0gKyBTcGFycWxJdGVtU2VydmljZS5sdXRbZDAgPj4gOCAmIDB4ZmZdICsgU3BhcnFsSXRlbVNlcnZpY2UubHV0W2QwID4+IDE2ICYgMHhmZl0gKyBTcGFycWxJdGVtU2VydmljZS5sdXRbZDAgPj4gMjQgJiAweGZmXSArICctJyArXG4gICAgICAgIFNwYXJxbEl0ZW1TZXJ2aWNlLmx1dFtkMSAmIDB4ZmZdICsgU3BhcnFsSXRlbVNlcnZpY2UubHV0W2QxID4+IDggJiAweGZmXSArICctJyArIFNwYXJxbEl0ZW1TZXJ2aWNlLmx1dFtkMSA+PiAxNiAmIDB4MGYgfCAweDQwXSArIFNwYXJxbEl0ZW1TZXJ2aWNlLmx1dFtkMSA+PiAyNCAmIDB4ZmZdICsgJy0nICtcbiAgICAgICAgU3BhcnFsSXRlbVNlcnZpY2UubHV0W2QyICYgMHgzZiB8IDB4ODBdICsgU3BhcnFsSXRlbVNlcnZpY2UubHV0W2QyID4+IDggJiAweGZmXSArICctJyArIFNwYXJxbEl0ZW1TZXJ2aWNlLmx1dFtkMiA+PiAxNiAmIDB4ZmZdICsgU3BhcnFsSXRlbVNlcnZpY2UubHV0W2QyID4+IDI0ICYgMHhmZl0gK1xuICAgICAgICBTcGFycWxJdGVtU2VydmljZS5sdXRbZDMgJiAweGZmXSArIFNwYXJxbEl0ZW1TZXJ2aWNlLmx1dFtkMyA+PiA4ICYgMHhmZl0gKyBTcGFycWxJdGVtU2VydmljZS5sdXRbZDMgPj4gMTYgJiAweGZmXSArIFNwYXJxbEl0ZW1TZXJ2aWNlLmx1dFtkMyA+PiAyNCAmIDB4ZmZdXG4gICAgICAvKiB0c2xpbnQ6ZW5hYmxlOm5vLWJpdHdpc2UgKi9cbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHdvcmtlclNlcnZpY2U6IFdvcmtlclNlcnZpY2UpIHt9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYSBzaW5nbGUgaXRlbSBmcm9tIHRoZSBsb2NhbCBzdG9yZVxuICAgICAqIEBwYXJhbSBjYW5jZWxsZXIgcHJvbWlzZSB0aGF0IGNhbiBiZSByZXNvbHZlZCB0byBjYW5jZWwgYSByZW1vdGUgZmV0Y2hcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0SXRlbShpZDogSU5vZGUsIGNhbmNlbGxlcj86IGFuZ3VsYXIuSVByb21pc2U8YW55Pik6IGFuZ3VsYXIuSVByb21pc2U8SXRlbT4ge1xuICAgICAgcmV0dXJuIHRoaXMud29ya2VyU2VydmljZS5jYWxsKCdzcGFycWxJdGVtV29ya2VyU2VydmljZScsICdnZXRJdGVtJywgW2lkXSwgY2FuY2VsbGVyKVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRJdGVtc0ZvckV4cGxvcmUoY2FuY2VsbGVyPzogYW5ndWxhci5JUHJvbWlzZTxhbnk+KTogYW5ndWxhci5JUHJvbWlzZTxJdGVtW10+IHtcbiAgICAgIHJldHVybiB0aGlzLndvcmtlclNlcnZpY2UuY2FsbCgnc3BhcnFsSXRlbVdvcmtlclNlcnZpY2UnLCAnZ2V0SXRlbXNGb3JFeHBsb3JlJywgW10sIGNhbmNlbGxlcilcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlTmV3SXRlbShlcXVpdmFsZW50Tm9kZXM6IElOb2RlW10gPSBbXSwgcHJvcGVydGllczogSVByb3BlcnR5VG9WYWx1ZXM8SU5vZGU+W10gPSBbXSk6IGFuZ3VsYXIuSVByb21pc2U8SU5vZGU+IHtcbiAgICAgIHJldHVybiB0aGlzLndvcmtlclNlcnZpY2UuY2FsbCgnc3BhcnFsSXRlbVdvcmtlclNlcnZpY2UnLCAnY3JlYXRlTmV3SXRlbScsIFtlcXVpdmFsZW50Tm9kZXMsIHByb3BlcnRpZXNdKVxuICAgIH1cblxuICAgIHB1YmxpYyBhbHRlckl0ZW0oaWQ6IElOb2RlLCBwcm9wZXJ0aWVzVG9BZGQ6IElQcm9wZXJ0eVRvVmFsdWVzPElOb2RlPltdLCBwcm9wZXJ0aWVzVG9SZW1vdmU6IElQcm9wZXJ0eVRvVmFsdWVzPElOb2RlPltdID0gW10pOiBhbmd1bGFyLklQcm9taXNlPHN0cmluZz4ge1xuICAgICAgcmV0dXJuIHRoaXMud29ya2VyU2VydmljZS5jYWxsKCdzcGFycWxJdGVtV29ya2VyU2VydmljZScsICdhbHRlckl0ZW0nLCBbaWQsIHByb3BlcnRpZXNUb0FkZCwgcHJvcGVydGllc1RvUmVtb3ZlXSlcbiAgICB9XG5cbiAgICBwdWJsaWMgZGVsZXRlSXRlbShpZDogSU5vZGUpOiBhbmd1bGFyLklQcm9taXNlPHN0cmluZz4ge1xuICAgICAgcmV0dXJuIHRoaXMud29ya2VyU2VydmljZS5jYWxsKCdzcGFycWxJdGVtV29ya2VyU2VydmljZScsICdkZWxldGVJdGVtJywgW2lkXSlcbiAgICB9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgU3BhcnFsSXRlbVdvcmtlclNlcnZpY2Uge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzcGFycWxTZXJ2aWNlOiBzLlNwYXJxbFNlcnZpY2UsIHByaXZhdGUgJHE6IGFuZ3VsYXIuSVFTZXJ2aWNlLCBwcml2YXRlIHNwYXJxbFVwZGF0ZVdvcmtlclNlcnZpY2U6IFNwYXJxbFVwZGF0ZVdvcmtlclNlcnZpY2UsIHByaXZhdGUgY29uZmlndXJhdGlvbldvcmtlclNlcnZpY2U6IENvbmZpZ3VyYXRpb25Xb3JrZXJTZXJ2aWNlKSB7fVxuXG4gICAgcHVibGljIGdldEl0ZW0oaWQ6IElOb2RlLCBjYW5jZWxsZXI/OiBhbmd1bGFyLklQcm9taXNlPGFueT4pOiBhbmd1bGFyLklQcm9taXNlPEl0ZW0+IHtcbiAgICAgIGxldCBxdWVyeVRlbXBsYXRlOiBzdHJpbmcgPSB0aGlzLmNvbmZpZ3VyYXRpb25Xb3JrZXJTZXJ2aWNlLmNvbmZpZ3VyYXRpb24ucHJpbWFyeUVuZHBvaW50LmxvY2FsSXRlbVF1ZXJ5VGVtcGxhdGVcbiAgICAgIHF1ZXJ5VGVtcGxhdGUgPSBxdWVyeVRlbXBsYXRlLnJlcGxhY2UoLzxJRD4vZywgaWQudG9DYW5vbmljYWwoKSlcbiAgICAgIGxldCBpdGVtOiBJdGVtID0gbmV3IEl0ZW0oaWQpXG4gICAgICByZXR1cm4gdGhpcy5zcGFycWxTZXJ2aWNlLnF1ZXJ5KHRoaXMuY29uZmlndXJhdGlvbldvcmtlclNlcnZpY2UuY29uZmlndXJhdGlvbi5wcmltYXJ5RW5kcG9pbnQuZW5kcG9pbnQudmFsdWUsIHF1ZXJ5VGVtcGxhdGUsIHt0aW1lb3V0OiBjYW5jZWxsZXJ9KS50aGVuKFxuICAgICAgICAocmVzcG9uc2U6IGFuZ3VsYXIuSUh0dHBQcm9taXNlQ2FsbGJhY2tBcmc8cy5JU3BhcnFsQmluZGluZ1Jlc3VsdDx7W2lkOiBzdHJpbmddOiBzLklTcGFycWxCaW5kaW5nfT4+KSA9PiB7XG4gICAgICAgICAgbGV0IHByb3BlcnR5TWFwOiBFTWFwPFByb3BlcnR5VG9WYWx1ZXM8SU5vZGVQbHVzTGFiZWw+PiA9IG5ldyBFTWFwPFByb3BlcnR5VG9WYWx1ZXM8SU5vZGVQbHVzTGFiZWw+PigpXG4gICAgICAgICAgbGV0IHByb3BlcnR5VmFsdWVNYXA6IEVNYXA8RU1hcDxJU291cmNlZE5vZGVQbHVzTGFiZWw+PiA9IG5ldyBFTWFwPEVNYXA8SVNvdXJjZWROb2RlUGx1c0xhYmVsPj4oKCkgPT4gbmV3IEVNYXA8SVNvdXJjZWROb2RlUGx1c0xhYmVsPigpKVxuICAgICAgICAgIGZvciAobGV0IGIgb2YgcmVzcG9uc2UuZGF0YSEucmVzdWx0cy5iaW5kaW5ncykge1xuICAgICAgICAgICAgaWYgKGJbJ2l0ZW1MYWJlbCddKSBpdGVtLmxhYmVsID0gRGF0YUZhY3RvcnkuaW5zdGFuY2Uubm9kZUZyb21CaW5kaW5nKGJbJ2l0ZW1MYWJlbCddKVxuICAgICAgICAgICAgdGhpcy5wcm9jZXNzSXRlbVJlc3VsdChpdGVtLmxvY2FsUHJvcGVydGllcywgcHJvcGVydHlNYXAsIHByb3BlcnR5VmFsdWVNYXAsIHRoaXMuY29uZmlndXJhdGlvbldvcmtlclNlcnZpY2UuY29uZmlndXJhdGlvbi5wcmltYXJ5RW5kcG9pbnQsIGIpXG4gICAgICAgICAgfVxuICAgICAgICAgIGxldCBzYW1lQXNlczogUHJvcGVydHlUb1ZhbHVlczxJTm9kZVBsdXNMYWJlbD4gPSBpdGVtLmxvY2FsUHJvcGVydGllcy5maWx0ZXIocCA9PiBPV0wuc2FtZUFzLmVxdWFscyhwKSlbMF1cbiAgICAgICAgICBsZXQgaWRzOiBzdHJpbmdbXSA9IFtpdGVtLnRvQ2Fub25pY2FsKCldXG4gICAgICAgICAgaWYgKHNhbWVBc2VzKSBmb3IgKGxldCB2IG9mIHNhbWVBc2VzLnZhbHVlcykgaWRzLnB1c2godi50b0Nhbm9uaWNhbCgpKVxuICAgICAgICAgIHJldHVybiB0aGlzLiRxLmFsbCh0aGlzLmNvbmZpZ3VyYXRpb25Xb3JrZXJTZXJ2aWNlLmNvbmZpZ3VyYXRpb24ucmVtb3RlRW5kcG9pbnRzKCkubWFwKGVuZHBvaW50ID0+XG4gICAgICAgICAgICB0aGlzLnNwYXJxbFNlcnZpY2UucXVlcnkoZW5kcG9pbnQuZW5kcG9pbnQudmFsdWUsIFNwYXJxbEl0ZW1TZXJ2aWNlLmdldFJlbW90ZUl0ZW1Qcm9wZXJ0aWVzUXVlcnkucmVwbGFjZSgvPElEUz4vZywgaWRzLmpvaW4oJycpKSwge3RpbWVvdXQ6IGNhbmNlbGxlcn0pLnRoZW4oXG4gICAgICAgICAgICAgIChyZXNwb25zZTI6IGFuZ3VsYXIuSUh0dHBQcm9taXNlQ2FsbGJhY2tBcmc8cy5JU3BhcnFsQmluZGluZ1Jlc3VsdDx7W2lkOiBzdHJpbmddOiBzLklTcGFycWxCaW5kaW5nfT4+KSA9PiB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgYiBvZiByZXNwb25zZTIuZGF0YSEucmVzdWx0cy5iaW5kaW5ncylcbiAgICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0l0ZW1SZXN1bHQoaXRlbS5yZW1vdGVQcm9wZXJ0aWVzLCBwcm9wZXJ0eU1hcCwgcHJvcGVydHlWYWx1ZU1hcCwgZW5kcG9pbnQsIGIpXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgKSkudGhlbigoKSA9PiBpdGVtKVxuICAgICAgICB9XG4gICAgICApXG4gICAgfVxuXG4gICAgcHVibGljIGdldEl0ZW1zRm9yRXhwbG9yZShjYW5jZWxsZXI/OiBhbmd1bGFyLklQcm9taXNlPGFueT4pOiBhbmd1bGFyLklQcm9taXNlPEl0ZW1bXT4ge1xuICAgICAgbGV0IHF1ZXJ5VGVtcGxhdGU6IHN0cmluZyA9IFNwYXJxbEl0ZW1TZXJ2aWNlLmdldEl0ZW1zRm9yRXhwbG9yZVF1ZXJ5XG4gICAgICBxdWVyeVRlbXBsYXRlID0gcXVlcnlUZW1wbGF0ZS5yZXBsYWNlKC88U0VSVklDRVM+L2csIHRoaXMuY29uZmlndXJhdGlvbldvcmtlclNlcnZpY2UuY29uZmlndXJhdGlvbi5yZW1vdGVFbmRwb2ludHMoKS5tYXAocCA9PiBwLmVuZHBvaW50LnRvQ2Fub25pY2FsKCkpLmpvaW4oJycpKVxuICAgICAgcmV0dXJuIHRoaXMuc3BhcnFsU2VydmljZS5xdWVyeSh0aGlzLmNvbmZpZ3VyYXRpb25Xb3JrZXJTZXJ2aWNlLmNvbmZpZ3VyYXRpb24ucHJpbWFyeUVuZHBvaW50LmVuZHBvaW50LnZhbHVlLCBxdWVyeVRlbXBsYXRlLCB7dGltZW91dDogY2FuY2VsbGVyfSkudGhlbihcbiAgICAgICAgKHJlc3BvbnNlOiBhbmd1bGFyLklIdHRwUHJvbWlzZUNhbGxiYWNrQXJnPHMuSVNwYXJxbEJpbmRpbmdSZXN1bHQ8e1tpZDogc3RyaW5nXTogcy5JU3BhcnFsQmluZGluZ30+PikgPT4ge1xuICAgICAgICAgIGxldCBpdGVtczogRU9NYXA8SXRlbT4gPSBuZXcgRU9NYXA8SXRlbT4oKVxuICAgICAgICAgIGxldCBpdGVtUHJvcGVydHlNYXA6IEVNYXA8RU1hcDxQcm9wZXJ0eVRvVmFsdWVzPElOb2RlUGx1c0xhYmVsPj4+ID0gbmV3IEVNYXA8RU1hcDxQcm9wZXJ0eVRvVmFsdWVzPElOb2RlUGx1c0xhYmVsPj4+KCgpID0+IG5ldyBFTWFwPFByb3BlcnR5VG9WYWx1ZXM8SU5vZGVQbHVzTGFiZWw+PigpKVxuICAgICAgICAgIGxldCBpdGVtUHJvcGVydHlWYWx1ZU1hcDogRU1hcDxFTWFwPEVNYXA8SVNvdXJjZWROb2RlUGx1c0xhYmVsPj4+ID0gbmV3IEVNYXA8RU1hcDxFTWFwPElTb3VyY2VkTm9kZVBsdXNMYWJlbD4+PigoKSA9PiBuZXcgRU1hcDxFTWFwPElTb3VyY2VkTm9kZVBsdXNMYWJlbD4+KCgpID0+IG5ldyBFTWFwPElTb3VyY2VkTm9kZVBsdXNMYWJlbD4oKSkpXG4gICAgICAgICAgZm9yIChsZXQgYiBvZiByZXNwb25zZS5kYXRhIS5yZXN1bHRzLmJpbmRpbmdzKSB7XG4gICAgICAgICAgICBsZXQgaXRlbTogSXRlbSA9IGl0ZW1zLmdvYyhiWydpZCddLnZhbHVlLCAoKSA9PiBuZXcgSXRlbShEYXRhRmFjdG9yeS5pbnN0YW5jZS5ub2RlRnJvbUJpbmRpbmcoYlsnaWQnXSkpKVxuICAgICAgICAgICAgaWYgKGJbJ2l0ZW1MYWJlbCddKSBpdGVtLmxhYmVsID0gRGF0YUZhY3RvcnkuaW5zdGFuY2Uubm9kZUZyb21CaW5kaW5nKGJbJ2l0ZW1MYWJlbCddKVxuICAgICAgICAgICAgdGhpcy5wcm9jZXNzSXRlbVJlc3VsdChpdGVtLmxvY2FsUHJvcGVydGllcywgaXRlbVByb3BlcnR5TWFwLmdvYyhiWydpZCddLnZhbHVlKSwgaXRlbVByb3BlcnR5VmFsdWVNYXAuZ29jKGJbJ2lkJ10udmFsdWUpLCB0aGlzLmNvbmZpZ3VyYXRpb25Xb3JrZXJTZXJ2aWNlLmNvbmZpZ3VyYXRpb24ucHJpbWFyeUVuZHBvaW50LCBiKVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gaXRlbXMudmFsdWVzKClcbiAgICAgICAgfVxuICAgICAgKVxuICAgIH1cblxuICAgIHB1YmxpYyBkZWxldGVJdGVtKGlkOiBJTm9kZSk6IGFuZ3VsYXIuSVByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgcmV0dXJuIHRoaXMuc3BhcnFsU2VydmljZS51cGRhdGUodGhpcy5jb25maWd1cmF0aW9uV29ya2VyU2VydmljZS5jb25maWd1cmF0aW9uLnByaW1hcnlFbmRwb2ludC51cGRhdGVFbmRwb2ludC52YWx1ZSwgdGhpcy5jb25maWd1cmF0aW9uV29ya2VyU2VydmljZS5jb25maWd1cmF0aW9uLmRlbGV0ZUl0ZW1RdWVyeS5yZXBsYWNlKC88SUQ+L2csIGlkLnRvQ2Fub25pY2FsKCkpKS50aGVuKFxuICAgICAgICAocikgPT4gci5zdGF0dXMgPT09IDIwNCxcbiAgICAgICAgKHIpID0+IGZhbHNlXG4gICAgICApXG4gICAgfVxuXG4gICAgcHVibGljIGFsdGVySXRlbShpZDogSU5vZGUsIHByb3BlcnRpZXNUb0FkZDogSVByb3BlcnR5VG9WYWx1ZXM8SU5vZGU+W10sIHByb3BlcnRpZXNUb1JlbW92ZTogSVByb3BlcnR5VG9WYWx1ZXM8SU5vZGU+W10gPSBbXSk6IGFuZ3VsYXIuSVByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgbGV0IGluc3RhbmNlVHJpcGxlc1RvQWRkOiBJVHJpcGxlW10gPSBbXVxuICAgICAgbGV0IHNjaGVtYVRyaXBsZXNUb0FkZDogSVRyaXBsZVtdID0gW11cbiAgICAgIGxldCBpbnN0YW5jZVRyaXBsZXNUb1JlbW92ZTogSVRyaXBsZVtdID0gW11cbiAgICAgIHByb3BlcnRpZXNUb0FkZC5mb3JFYWNoKHByb3BlcnR5ID0+IHtcbiAgICAgICAgaWYgKHByb3BlcnR5LmxhYmVsKSBzY2hlbWFUcmlwbGVzVG9BZGQucHVzaChuZXcgVHJpcGxlKHByb3BlcnR5LCBTS09TLnByZWZMYWJlbCwgcHJvcGVydHkubGFiZWwpKVxuICAgICAgICBwcm9wZXJ0eS52YWx1ZXMuZm9yRWFjaCh2YWx1ZSA9PiB7XG4gICAgICAgICAgaW5zdGFuY2VUcmlwbGVzVG9BZGQucHVzaChuZXcgVHJpcGxlKGlkLCBwcm9wZXJ0eSwgdmFsdWUpKVxuICAgICAgICAgIGlmICgoPE5vZGVQbHVzTGFiZWw+dmFsdWUpLmxhYmVsKSBpbnN0YW5jZVRyaXBsZXNUb0FkZC5wdXNoKG5ldyBUcmlwbGUodmFsdWUsIFNLT1MucHJlZkxhYmVsLCAoPE5vZGVQbHVzTGFiZWw+dmFsdWUpLmxhYmVsKSlcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgICBwcm9wZXJ0aWVzVG9SZW1vdmUuZm9yRWFjaChwcm9wZXJ0eSA9PiBwcm9wZXJ0eS52YWx1ZXMuZm9yRWFjaCh2YWx1ZSA9PiBpbnN0YW5jZVRyaXBsZXNUb1JlbW92ZS5wdXNoKG5ldyBUcmlwbGUoaWQsIHByb3BlcnR5LCB2YWx1ZSkpKSlcbiAgICAgIHJldHVybiB0aGlzLnNwYXJxbFVwZGF0ZVdvcmtlclNlcnZpY2UudXBkYXRlR3JhcGhzKHRoaXMuY29uZmlndXJhdGlvbldvcmtlclNlcnZpY2UuY29uZmlndXJhdGlvbi5wcmltYXJ5RW5kcG9pbnQudXBkYXRlRW5kcG9pbnQudmFsdWUsIFtuZXcgR3JhcGgoU3BhcnFsSXRlbVNlcnZpY2Uuc2NoZW1hR3JhcGgsIHNjaGVtYVRyaXBsZXNUb0FkZCksIG5ldyBHcmFwaChTcGFycWxJdGVtU2VydmljZS5pbnN0YW5jZUdyYXBoLCBpbnN0YW5jZVRyaXBsZXNUb0FkZCldKVxuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGVOZXdJdGVtKGVxdWl2YWxlbnROb2RlczogSU5vZGVbXSA9IFtdLCBwcm9wZXJ0aWVzOiBQcm9wZXJ0eVRvVmFsdWVzPElOb2RlPltdID0gW10pOiBhbmd1bGFyLklQcm9taXNlPElOb2RlPiB7XG4gICAgICBsZXQgZGVmZXJyZWQ6IGFuZ3VsYXIuSURlZmVycmVkPElOb2RlPiA9IHRoaXMuJHEuZGVmZXIoKVxuICAgICAgbGV0IHN1YmplY3Q6IElOb2RlID0gbmV3IE5hbWVkTm9kZShTcGFycWxJdGVtU2VydmljZS5ucyArIFNwYXJxbEl0ZW1TZXJ2aWNlLlVVSUQoKSlcbiAgICAgIGRlZmVycmVkLm5vdGlmeShzdWJqZWN0KVxuICAgICAgbGV0IHNjaGVtYVRyaXBsZXNUb0FkZDogVHJpcGxlW10gPSBbXVxuICAgICAgbGV0IGluc3RhbmNlVHJpcGxlc1RvQWRkOiBUcmlwbGVbXSA9IFtdXG4gICAgICBlcXVpdmFsZW50Tm9kZXMuZm9yRWFjaChub2RlID0+IGluc3RhbmNlVHJpcGxlc1RvQWRkLnB1c2gobmV3IFRyaXBsZShzdWJqZWN0LCBPV0wuc2FtZUFzLCBub2RlKSkpXG4gICAgICBwcm9wZXJ0aWVzLmZvckVhY2gocHJvcGVydHkgPT4ge1xuICAgICAgICBpZiAocHJvcGVydHkubGFiZWwpIHNjaGVtYVRyaXBsZXNUb0FkZC5wdXNoKG5ldyBUcmlwbGUocHJvcGVydHksIFNLT1MucHJlZkxhYmVsLCBwcm9wZXJ0eS5sYWJlbCkpXG4gICAgICAgIHByb3BlcnR5LnZhbHVlcy5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgICAgICBpbnN0YW5jZVRyaXBsZXNUb0FkZC5wdXNoKG5ldyBUcmlwbGUoc3ViamVjdCwgcHJvcGVydHksIHZhbHVlKSlcbiAgICAgICAgICBpZiAoKDxOb2RlUGx1c0xhYmVsPnZhbHVlKS5sYWJlbCkgaW5zdGFuY2VUcmlwbGVzVG9BZGQucHVzaChuZXcgVHJpcGxlKHZhbHVlLCBTS09TLnByZWZMYWJlbCwgKDxOb2RlUGx1c0xhYmVsPnZhbHVlKS5sYWJlbCkpXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgICAgdGhpcy5zcGFycWxVcGRhdGVXb3JrZXJTZXJ2aWNlLnVwZGF0ZUdyYXBocyh0aGlzLmNvbmZpZ3VyYXRpb25Xb3JrZXJTZXJ2aWNlLmNvbmZpZ3VyYXRpb24ucHJpbWFyeUVuZHBvaW50LnVwZGF0ZUVuZHBvaW50LnZhbHVlLCBbbmV3IEdyYXBoKFNwYXJxbEl0ZW1TZXJ2aWNlLnNjaGVtYUdyYXBoLCBzY2hlbWFUcmlwbGVzVG9BZGQpLCBuZXcgR3JhcGgoU3BhcnFsSXRlbVNlcnZpY2UuaW5zdGFuY2VHcmFwaCwgaW5zdGFuY2VUcmlwbGVzVG9BZGQpXSkudGhlbihcbiAgICAgICAgKCkgPT4gZGVmZXJyZWQucmVzb2x2ZShzdWJqZWN0KSxcbiAgICAgICAgZGVmZXJyZWQucmVqZWN0LFxuICAgICAgICBkZWZlcnJlZC5ub3RpZnlcbiAgICAgIClcbiAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcm9jZXNzSXRlbVJlc3VsdChwcm9wZXJ0aWVzOiBQcm9wZXJ0eVRvVmFsdWVzPElOb2RlUGx1c0xhYmVsPltdLCBwcm9wZXJ0eU1hcDogRU1hcDxQcm9wZXJ0eVRvVmFsdWVzPElOb2RlUGx1c0xhYmVsPj4sIHByb3BlcnR5VmFsdWVNYXA6IEVNYXA8RU1hcDxJU291cmNlZE5vZGVQbHVzTGFiZWw+PiwgZW5kcG9pbnQ6IEVuZHBvaW50Q29uZmlndXJhdGlvbiwgYjoge1t2YXJJZDogc3RyaW5nXTogcy5JU3BhcnFsQmluZGluZ30pOiB2b2lkIHtcbiAgICAgIGlmIChiWydwcm9wZXJ0eSddKSB7XG4gICAgICAgIGxldCBuOiBJU291cmNlZE5vZGVQbHVzTGFiZWwgPSBwcm9wZXJ0eVZhbHVlTWFwLmdvYyhiWydwcm9wZXJ0eSddLnZhbHVlKS5nb2MoYlsnb2JqZWN0J10udmFsdWUsICgpID0+IHtcbiAgICAgICAgICBsZXQgcHJvcGVydHlUb1ZhbHVlczogUHJvcGVydHlUb1ZhbHVlczxJTm9kZVBsdXNMYWJlbD4gPSBwcm9wZXJ0eU1hcC5nb2MoYlsncHJvcGVydHknXS52YWx1ZSwgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHJldDogUHJvcGVydHlUb1ZhbHVlczxJTm9kZVBsdXNMYWJlbD4gPSBuZXcgUHJvcGVydHlUb1ZhbHVlczxJTm9kZVBsdXNMYWJlbD4oRGF0YUZhY3RvcnkuaW5zdGFuY2Uubm9kZUZyb21CaW5kaW5nKGJbJ3Byb3BlcnR5J10pKVxuICAgICAgICAgICAgaWYgKGJbJ3Byb3BlcnR5TGFiZWwnXSkgcmV0LmxhYmVsID0gRGF0YUZhY3RvcnkuaW5zdGFuY2Uubm9kZUZyb21CaW5kaW5nKGJbJ3Byb3BlcnR5TGFiZWwnXSlcbiAgICAgICAgICAgIHByb3BlcnRpZXMucHVzaChyZXQpXG4gICAgICAgICAgICByZXR1cm4gcmV0XG4gICAgICAgICAgfSlcbiAgICAgICAgICBsZXQgb05vZGU6IElTb3VyY2VkTm9kZVBsdXNMYWJlbCA9IG5ldyBTb3VyY2VkTm9kZVBsdXNMYWJlbChEYXRhRmFjdG9yeS5pbnN0YW5jZS5ub2RlRnJvbUJpbmRpbmcoYlsnb2JqZWN0J10pKVxuICAgICAgICAgIHByb3BlcnR5VG9WYWx1ZXMudmFsdWVzLnB1c2gob05vZGUpXG4gICAgICAgICAgcmV0dXJuIG9Ob2RlXG4gICAgICAgIH0pXG4gICAgICAgIG4uc291cmNlRW5kcG9pbnRzLnB1c2goZW5kcG9pbnQpXG4gICAgICAgIGlmIChiWydvYmplY3RMYWJlbCddICYmICFuLmxhYmVsKSBuLmxhYmVsID0gRGF0YUZhY3RvcnkuaW5zdGFuY2Uubm9kZUZyb21CaW5kaW5nKGJbJ29iamVjdExhYmVsJ10pXG4gICAgICB9XG4gICAgfVxuXG4gIH1cblxufVxuIl19

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2FwcC9zY3JpcHRzL3NwYXJxbC10cmVlLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBVSxLQUFLLENBb0VkO0FBcEVELFdBQVUsS0FBSyxFQUFDLENBQUM7SUFDZixZQUFZLENBQUE7SUFJWjtRQXNCRSwyQkFBb0IsYUFBNEI7WUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBRyxDQUFDO1FBQzdDLG1DQUFPLEdBQWQsVUFBZSxRQUFnQixFQUFFLEtBQWEsRUFBRSxTQUFpQztZQUMvRSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMseUJBQXlCLEVBQUUsU0FBUyxFQUFFLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFBO1FBQ3BHLENBQUM7UUF4QmEsbUNBQWlCLEdBQVcsK2lCQW9CN0MsQ0FBQTtRQUtDLHdCQUFDO0lBQUQsQ0ExQkEsQUEwQkMsSUFBQTtJQTFCWSx1QkFBaUIsb0JBMEI3QixDQUFBO0lBRUQ7UUFDRSxpQ0FBb0IsYUFBOEI7WUFBOUIsa0JBQWEsR0FBYixhQUFhLENBQWlCO1FBQUcsQ0FBQztRQUUvQyx5Q0FBTyxHQUFkLFVBQWUsUUFBZ0IsRUFBRSxLQUFhLEVBQUUsU0FBaUM7WUFDL0UsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBQyxPQUFPLEVBQUUsU0FBUyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQ3pFLFVBQUMsUUFBbUc7Z0JBQ2xHLElBQUksT0FBTyxHQUE0QyxFQUFFLENBQUE7Z0JBQ3pELElBQUksT0FBTyxHQUE2QixFQUFFLENBQUE7Z0JBQzFDLFFBQVEsQ0FBQyxJQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPO29CQUM3QyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7d0JBQ3hCLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxjQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUE7b0JBQ3JHLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQzt3QkFDdkIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUE7b0JBQ3RGLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3hCLElBQUksUUFBUSxHQUFXLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUE7d0JBQ2hELEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDOzRCQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUE7d0JBQzlDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFBO29CQUNsRCxDQUFDO29CQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzFCLElBQUksUUFBUSxHQUFXLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUE7d0JBQzdDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDOzRCQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUE7d0JBQzlDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFBO29CQUN2RCxDQUFDO2dCQUNILENBQUMsQ0FBQyxDQUFBO2dCQUNGLElBQUksR0FBRyxHQUFlLEVBQUUsQ0FBQTtnQkFDeEIsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDdkIsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFBQyxJQUFJO3dCQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQzs0QkFDdEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7Z0JBQzdDLENBQUM7Z0JBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQTtZQUNaLENBQUMsQ0FDRixDQUFBO1FBQ0gsQ0FBQztRQUNILDhCQUFDO0lBQUQsQ0FqQ0EsQUFpQ0MsSUFBQTtJQWpDWSw2QkFBdUIsMEJBaUNuQyxDQUFBO0FBRUgsQ0FBQyxFQXBFUyxLQUFLLEtBQUwsS0FBSyxRQW9FZCIsImZpbGUiOiJzY3JpcHRzL3NwYXJxbC10cmVlLXNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgZmlicmEge1xuICAndXNlIHN0cmljdCdcblxuICBpbXBvcnQgcyA9IGZpLnNlY28uc3BhcnFsXG5cbiAgZXhwb3J0IGNsYXNzIFNwYXJxbFRyZWVTZXJ2aWNlIHtcbiAgICBwdWJsaWMgc3RhdGljIGdldENsYXNzVHJlZVF1ZXJ5OiBzdHJpbmcgPSBgXG5QUkVGSVggc2tvczogPGh0dHA6Ly93d3cudzMub3JnLzIwMDQvMDIvc2tvcy9jb3JlIz5cblBSRUZJWCByZGZzOiA8aHR0cDovL3d3dy53My5vcmcvMjAwMC8wMS9yZGYtc2NoZW1hIz5cblBSRUZJWCBzZjogPGh0dHA6Ly9sZGYuZmkvZnVuY3Rpb25zIz5cblNFTEVDVCA/c3ViQ2xhc3MgP3N1cGVyQ2xhc3MgP2NsYXNzID9jbGFzc0xhYmVsID9pbnN0YW5jZXMge1xuICB7XG4gICAgP3N1YkNsYXNzIHJkZnM6c3ViQ2xhc3NPZiA/Y2xhc3MgLlxuICAgIEZJTFRFUiBFWElTVFMge1xuICAgICAgP3AgYSA/c3ViQ2xhc3MgLlxuICAgIH1cbiAgfSBVTklPTiB7XG4gICAge1xuICAgICAgU0VMRUNUID9jbGFzcyAoQ09VTlQoRElTVElOQ1QgP3ApIEFTID9pbnN0YW5jZXMpIHtcbiAgICAgICAgP3AgYSA/Y2xhc3MgLlxuICAgICAgfVxuICAgICAgR1JPVVAgQlkgP2NsYXNzXG4gICAgfVxuICB9XG4gID9jbGFzcyBzZjpwcmVmZXJyZWRMYW5ndWFnZUxpdGVyYWwgKHNrb3M6cHJlZkxhYmVsIHJkZnM6bGFiZWwgc2tvczphbHRMYWJlbCAnZW4nICcnID9jbGFzc0xhYmVsKSAuXG59XG5gXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB3b3JrZXJTZXJ2aWNlOiBXb3JrZXJTZXJ2aWNlKSB7fVxuICAgIHB1YmxpYyBnZXRUcmVlKGVuZHBvaW50OiBzdHJpbmcsIHF1ZXJ5OiBzdHJpbmcsIGNhbmNlbGxlcj86IGFuZ3VsYXIuSVByb21pc2U8YW55Pik6IGFuZ3VsYXIuSVByb21pc2U8VHJlZU5vZGVbXT4ge1xuICAgICAgcmV0dXJuIHRoaXMud29ya2VyU2VydmljZS5jYWxsKCdzcGFycWxUcmVlV29ya2VyU2VydmljZScsICdnZXRUcmVlJywgW2VuZHBvaW50LCBxdWVyeV0sIGNhbmNlbGxlcilcbiAgICB9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgU3BhcnFsVHJlZVdvcmtlclNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc3BhcnFsU2VydmljZTogcy5TcGFycWxTZXJ2aWNlKSB7fVxuXG4gICAgcHVibGljIGdldFRyZWUoZW5kcG9pbnQ6IHN0cmluZywgcXVlcnk6IHN0cmluZywgY2FuY2VsbGVyPzogYW5ndWxhci5JUHJvbWlzZTxhbnk+KTogYW5ndWxhci5JUHJvbWlzZTxUcmVlTm9kZVtdPiB7XG4gICAgICByZXR1cm4gdGhpcy5zcGFycWxTZXJ2aWNlLnF1ZXJ5KGVuZHBvaW50LCBxdWVyeSwge3RpbWVvdXQ6IGNhbmNlbGxlcn0pLnRoZW4oXG4gICAgICAgIChyZXNwb25zZTogYW5ndWxhci5JSHR0cFByb21pc2VDYWxsYmFja0FyZzxzLklTcGFycWxCaW5kaW5nUmVzdWx0PHtbaWQ6IHN0cmluZ106IHMuSVNwYXJxbEJpbmRpbmd9Pj4pID0+IHtcbiAgICAgICAgICBsZXQgcGFyZW50czoge1tpZDogc3RyaW5nXToge1tpZDogc3RyaW5nXTogYm9vbGVhbn19ID0ge31cbiAgICAgICAgICBsZXQgY2xhc3Nlczoge1tpZDogc3RyaW5nXTogVHJlZU5vZGV9ID0ge31cbiAgICAgICAgICByZXNwb25zZS5kYXRhIS5yZXN1bHRzLmJpbmRpbmdzLmZvckVhY2goYmluZGluZyA9PiB7XG4gICAgICAgICAgICBpZiAoYmluZGluZ1snY2xhc3NMYWJlbCddKVxuICAgICAgICAgICAgICBjbGFzc2VzW2JpbmRpbmdbJ2NsYXNzJ10udmFsdWVdID0gbmV3IFRyZWVOb2RlKGJpbmRpbmdbJ2NsYXNzJ10udmFsdWUsIGJpbmRpbmdbJ2NsYXNzTGFiZWwnXS52YWx1ZSlcbiAgICAgICAgICAgIGlmIChiaW5kaW5nWydpbnN0YW5jZXMnXSlcbiAgICAgICAgICAgICAgY2xhc3Nlc1tiaW5kaW5nWydjbGFzcyddLnZhbHVlXS5pbnN0YW5jZXMgPSBwYXJzZUludChiaW5kaW5nWydpbnN0YW5jZXMnXS52YWx1ZSwgMTApXG4gICAgICAgICAgICBpZiAoYmluZGluZ1snc3ViQ2xhc3MnXSkge1xuICAgICAgICAgICAgICBsZXQgc3ViQ2xhc3M6IHN0cmluZyA9IGJpbmRpbmdbJ3N1YkNsYXNzJ10udmFsdWVcbiAgICAgICAgICAgICAgaWYgKCFwYXJlbnRzW3N1YkNsYXNzXSkgcGFyZW50c1tzdWJDbGFzc10gPSB7fVxuICAgICAgICAgICAgICBwYXJlbnRzW3N1YkNsYXNzXVtiaW5kaW5nWydjbGFzcyddLnZhbHVlXSA9IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChiaW5kaW5nWydzdXBlckNsYXNzJ10pIHtcbiAgICAgICAgICAgICAgbGV0IHN1YkNsYXNzOiBzdHJpbmcgPSBiaW5kaW5nWydjbGFzcyddLnZhbHVlXG4gICAgICAgICAgICAgIGlmICghcGFyZW50c1tzdWJDbGFzc10pIHBhcmVudHNbc3ViQ2xhc3NdID0ge31cbiAgICAgICAgICAgICAgcGFyZW50c1tzdWJDbGFzc11bYmluZGluZ1snc3VwZXJDbGFzcyddLnZhbHVlXSA9IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIGxldCByZXQ6IFRyZWVOb2RlW10gPSBbXVxuICAgICAgICAgIGZvciAobGV0IGlkIGluIGNsYXNzZXMpIHtcbiAgICAgICAgICAgIGlmICghcGFyZW50c1tpZF0pIHJldC5wdXNoKGNsYXNzZXNbaWRdKTsgZWxzZSBmb3IgKGxldCBwaWQgaW4gcGFyZW50c1tpZF0pXG4gICAgICAgICAgICAgICAgY2xhc3Nlc1twaWRdLmNoaWxkcmVuLnB1c2goY2xhc3Nlc1tpZF0pXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXRcbiAgICAgICAgfVxuICAgICAgKVxuICAgIH1cbiAgfVxuXG59XG4iXX0=

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2FwcC9zY3JpcHRzL3NwYXJxbC11cGRhdGUtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFVLEtBQUssQ0E0RGQ7QUE1REQsV0FBVSxLQUFLLEVBQUMsQ0FBQztJQUNmLFlBQVksQ0FBQTtJQUlaO1FBRUUsNkJBQW9CLGFBQTRCO1lBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQUcsQ0FBQztRQUU3Qyx5Q0FBVyxHQUFsQixVQUFtQixRQUFnQixFQUFFLFVBQWtCLEVBQUUsYUFBcUI7WUFDNUUsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLDJCQUEyQixFQUFFLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQTtRQUM5RyxDQUFDO1FBRU0sMENBQVksR0FBbkIsVUFBb0IsUUFBZ0IsRUFBRSxXQUFvQixFQUFFLGNBQXVCO1lBQ2pGLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQywyQkFBMkIsRUFBRSxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUE7UUFDaEgsQ0FBQztRQUVILDBCQUFDO0lBQUQsQ0FaQSxBQVlDLElBQUE7SUFaWSx5QkFBbUIsc0JBWS9CLENBQUE7SUFFRDtRQUdFLG1DQUFvQixhQUE4QjtZQUE5QixrQkFBYSxHQUFiLGFBQWEsQ0FBaUI7UUFBRyxDQUFDO1FBRS9DLCtDQUFXLEdBQWxCLFVBQW1CLFFBQWdCLEVBQUUsVUFBdUIsRUFBRSxhQUEwQjtZQUFuRCwwQkFBdUIsR0FBdkIsZUFBdUI7WUFBRSw2QkFBMEIsR0FBMUIsa0JBQTBCO1lBQ3RGLElBQUksY0FBYyxHQUErQixFQUFFLENBQUE7WUFDbkQsSUFBSSxpQkFBaUIsR0FBK0IsRUFBRSxDQUFBO1lBQ3RELElBQUksV0FBVyxHQUFZLEVBQUUsQ0FBQTtZQUM3QixJQUFJLGNBQWMsR0FBWSxF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QUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUN6SixVQUFDLENBQUMsSUFBSyxPQUFBLENBQUMsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFoQixDQUFnQixFQUN2QixVQUFDLENBQUMsSUFBSyxPQUFBLEtBQUssRUFBTCxDQUFLLENBQ2IsQ0FBQTtRQUNILENBQUM7UUFyQ2MsdUNBQWEsR0FBVywwQ0FBMEMsQ0FBQTtRQXVDbkYsZ0NBQUM7SUFBRCxDQXhDQSxBQXdDQyxJQUFBO0lBeENZLCtCQUF5Qiw0QkF3Q3JDLENBQUE7QUFDSCxDQUFDLEVBNURTLEtBQUssS0FBTCxLQUFLLFFBNERkIiwiZmlsZSI6InNjcmlwdHMvc3BhcnFsLXVwZGF0ZS1zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIGZpYnJhIHtcbiAgJ3VzZSBzdHJpY3QnXG5cbiAgaW1wb3J0IHMgPSBmaS5zZWNvLnNwYXJxbFxuXG4gIGV4cG9ydCBjbGFzcyBTcGFycWxVcGRhdGVTZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgd29ya2VyU2VydmljZTogV29ya2VyU2VydmljZSkge31cblxuICAgIHB1YmxpYyB1cGRhdGVRdWFkcyhlbmRwb2ludDogc3RyaW5nLCBxdWFkc1RvQWRkOiBRdWFkW10sIHF1YWRzVG9SZW1vdmU6IFF1YWRbXSk6IGFuZ3VsYXIuSVByb21pc2U8YW55PiB7XG4gICAgICByZXR1cm4gdGhpcy53b3JrZXJTZXJ2aWNlLmNhbGwoJ3NwYXJxbFVwZGF0ZVdvcmtlclNlcnZpY2UnLCAndXBkYXRlJywgW2VuZHBvaW50LCBxdWFkc1RvQWRkLCBxdWFkc1RvUmVtb3ZlXSlcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlR3JhcGhzKGVuZHBvaW50OiBzdHJpbmcsIGdyYXBoc1RvQWRkOiBHcmFwaFtdLCBncmFwaHNUb1JlbW92ZTogR3JhcGhbXSk6IGFuZ3VsYXIuSVByb21pc2U8YW55PiB7XG4gICAgICByZXR1cm4gdGhpcy53b3JrZXJTZXJ2aWNlLmNhbGwoJ3NwYXJxbFVwZGF0ZVdvcmtlclNlcnZpY2UnLCAndXBkYXRlJywgW2VuZHBvaW50LCBncmFwaHNUb0FkZCwgZ3JhcGhzVG9SZW1vdmVdKVxuICAgIH1cblxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIFNwYXJxbFVwZGF0ZVdvcmtlclNlcnZpY2Uge1xuICAgIHByaXZhdGUgc3RhdGljIHF1ZXJ5VGVtcGxhdGU6IHN0cmluZyA9IGBERUxFVEV7PERFTEVURT59SU5TRVJUezxJTlNFUlQ+fVdIRVJFIHt9YFxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzcGFycWxTZXJ2aWNlOiBzLlNwYXJxbFNlcnZpY2UpIHt9XG5cbiAgICBwdWJsaWMgdXBkYXRlUXVhZHMoZW5kcG9pbnQ6IHN0cmluZywgcXVhZHNUb0FkZDogUXVhZFtdID0gW10sIHF1YWRzVG9SZW1vdmU6IFF1YWRbXSA9IFtdKTogYW5ndWxhci5JUHJvbWlzZTxhbnk+IHtcbiAgICAgIGxldCBncmFwaHNUb0FkZE1hcDoge1tncmFwaElkOiBzdHJpbmddOiBHcmFwaH0gPSB7fVxuICAgICAgbGV0IGdyYXBoc1RvUmVtb3ZlTWFwOiB7W2dyYXBoSWQ6IHN0cmluZ106IEdyYXBofSA9IHt9XG4gICAgICBsZXQgZ3JhcGhzVG9BZGQ6IEdyYXBoW10gPSBbXVxuICAgICAgbGV0IGdyYXBoc1RvUmVtb3ZlOiBHcmFwaFtdID0gW11cbiAgICAgIHF1YWRzVG9BZGQuZm9yRWFjaChxID0+IHtcbiAgICAgICAgbGV0IGdyYXBoOiBHcmFwaCA9IGdyYXBoc1RvQWRkTWFwW3EuZ3JhcGgudmFsdWVdXG4gICAgICAgIGlmICghZ3JhcGgpIHtcbiAgICAgICAgICBncmFwaCA9IG5ldyBHcmFwaChxLmdyYXBoKVxuICAgICAgICAgIGdyYXBoc1RvQWRkTWFwW3EuZ3JhcGgudmFsdWVdID0gZ3JhcGhcbiAgICAgICAgICBncmFwaHNUb0FkZC5wdXNoKGdyYXBoKVxuICAgICAgICB9XG4gICAgICAgIGdyYXBoLnRyaXBsZXMucHVzaChxKVxuICAgICAgfSlcbiAgICAgIHF1YWRzVG9SZW1vdmUuZm9yRWFjaChxID0+IHtcbiAgICAgICAgbGV0IGdyYXBoOiBHcmFwaCA9IGdyYXBoc1RvUmVtb3ZlTWFwW3EuZ3JhcGgudmFsdWVdXG4gICAgICAgIGlmICghZ3JhcGgpIHtcbiAgICAgICAgICBncmFwaCA9IG5ldyBHcmFwaChxLmdyYXBoKVxuICAgICAgICAgIGdyYXBoc1RvUmVtb3ZlTWFwW3EuZ3JhcGgudmFsdWVdID0gZ3JhcGhcbiAgICAgICAgICBncmFwaHNUb1JlbW92ZS5wdXNoKGdyYXBoKVxuICAgICAgICB9XG4gICAgICAgIGdyYXBoLnRyaXBsZXMucHVzaChxKVxuICAgICAgfSlcbiAgICAgIHJldHVybiB0aGlzLnVwZGF0ZUdyYXBocyhlbmRwb2ludCwgZ3JhcGhzVG9BZGQsIGdyYXBoc1RvUmVtb3ZlKVxuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVHcmFwaHMoZW5kcG9pbnQ6IHN0cmluZywgZ3JhcGhzVG9BZGQ6IEdyYXBoW10gPSBbXSwgZ3JhcGhzVG9SZW1vdmU6IEdyYXBoW10gPSBbXSk6IGFuZ3VsYXIuSVByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgbGV0IGFkZFN0cmluZzogc3RyaW5nID0gZ3JhcGhzVG9BZGQubWFwKGdyYXBoID0+IChEZWZhdWx0R3JhcGguaW5zdGFuY2UuZXF1YWxzKGdyYXBoLmdyYXBoKSA/ICcnIDogJ0dSQVBIJyArIGdyYXBoLmdyYXBoLnRvQ2Fub25pY2FsKCkpICsgJ3snICsgZ3JhcGgudHJpcGxlcy5tYXAoZyA9PiBnLnRvQ2Fub25pY2FsKCkpLmpvaW4oJyAuICcpICsgJ30nKS5qb2luKCcnKVxuICAgICAgbGV0IHJlbW92ZVN0cmluZzogc3RyaW5nID0gZ3JhcGhzVG9SZW1vdmUubWFwKGdyYXBoID0+IChEZWZhdWx0R3JhcGguaW5zdGFuY2UuZXF1YWxzKGdyYXBoLmdyYXBoKSA/ICcnIDogJ0dSQVBIJyArIGdyYXBoLmdyYXBoLnRvQ2Fub25pY2FsKCkpICsgJ3snICsgZ3JhcGgudHJpcGxlcy5tYXAoZyA9PiBnLnRvQ2Fub25pY2FsKCkpLmpvaW4oJyAuICcpICsgJ30nKS5qb2luKCcnKVxuICAgICAgcmV0dXJuIHRoaXMuc3BhcnFsU2VydmljZS51cGRhdGUoZW5kcG9pbnQsIFNwYXJxbFVwZGF0ZVdvcmtlclNlcnZpY2UucXVlcnlUZW1wbGF0ZS5yZXBsYWNlKC88REVMRVRFPi9nLCByZW1vdmVTdHJpbmcpLnJlcGxhY2UoLzxJTlNFUlQ+L2csIGFkZFN0cmluZykpLnRoZW4oXG4gICAgICAgIChyKSA9PiByLnN0YXR1cyA9PT0gMjA0LFxuICAgICAgICAocikgPT4gZmFsc2VcbiAgICAgIClcbiAgICB9XG5cbiAgfVxufVxuIl19

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2FwcC9zY3JpcHRzL3RyZWUtY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQVUsS0FBSyxDQXVCZDtBQXZCRCxXQUFVLEtBQUssRUFBQyxDQUFDO0lBQ2YsWUFBWSxDQUFBO0lBRVo7UUFVRSxrQkFBbUIsRUFBVSxFQUFTLEtBQWE7WUFBaEMsT0FBRSxHQUFGLEVBQUUsQ0FBUTtZQUFTLFVBQUssR0FBTCxLQUFLLENBQVE7WUFUNUMsYUFBUSxHQUFlLEVBQUUsQ0FBQTtZQUd6QixhQUFRLEdBQVksSUFBSSxDQUFBO1lBQ3hCLFNBQUksR0FBWSxJQUFJLENBQUE7UUFLMkIsQ0FBQztRQUp6QywyQkFBa0IsR0FBb0QsVUFBQyxJQUFjLEVBQUUsQ0FBcUI7WUFDeEgsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ1AsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxRQUFRLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFqQyxDQUFpQyxDQUFDLENBQUE7UUFDL0QsQ0FBQyxDQUFBO1FBRUgsZUFBQztJQUFELENBWEEsQUFXQyxJQUFBO0lBWFksY0FBUSxXQVdwQixDQUFBO0lBRUQ7UUFBQTtZQUNXLGFBQVEsR0FBMkI7Z0JBQ3hDLElBQUksRUFBRSxHQUFHO2dCQUNULFFBQVEsRUFBRSxHQUFHO2FBQ2QsQ0FBQTtZQUNNLGdCQUFXLEdBQVcsb0JBQW9CLENBQUE7UUFDckQsQ0FBQztRQUFELG9CQUFDO0lBQUQsQ0FOQSxBQU1DLElBQUE7SUFOWSxtQkFBYSxnQkFNekIsQ0FBQTtBQUNILENBQUMsRUF2QlMsS0FBSyxLQUFMLEtBQUssUUF1QmQiLCJmaWxlIjoic2NyaXB0cy90cmVlLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBmaWJyYSB7XG4gICd1c2Ugc3RyaWN0J1xuXG4gIGV4cG9ydCBjbGFzcyBUcmVlTm9kZSB7XG4gICAgcHVibGljIGNoaWxkcmVuOiBUcmVlTm9kZVtdID0gW11cbiAgICBwdWJsaWMgaW5zdGFuY2VzOiBudW1iZXJcbiAgICBwdWJsaWMgbWF0Y2hpbmdJbnN0YW5jZXM6IG51bWJlclxuICAgIHB1YmxpYyBzZWxlY3RlZDogYm9vbGVhbiA9IHRydWVcbiAgICBwdWJsaWMgb3BlbjogYm9vbGVhbiA9IHRydWVcbiAgICBwdWJsaWMgc3RhdGljIHJlY3Vyc2l2ZWx5UHJvY2VzczogKG5vZGU6IFRyZWVOb2RlLCBmOiAoVHJlZU5vZGUpID0+IHZvaWQpID0+IHZvaWQgPSAobm9kZTogVHJlZU5vZGUsIGY6IChUcmVlTm9kZSkgPT4gdm9pZCkgPT4ge1xuICAgICAgZihub2RlKVxuICAgICAgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKG4gPT4gVHJlZU5vZGUucmVjdXJzaXZlbHlQcm9jZXNzKG4sIGYpKVxuICAgIH1cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgaWQ6IHN0cmluZywgcHVibGljIGxhYmVsOiBzdHJpbmcpIHt9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgVHJlZUNvbXBvbmVudCBpbXBsZW1lbnRzIGFuZ3VsYXIuSUNvbXBvbmVudE9wdGlvbnMge1xuICAgICAgcHVibGljIGJpbmRpbmdzOiB7W2lkOiBzdHJpbmddOiBzdHJpbmd9ID0ge1xuICAgICAgICB0cmVlOiAnPCcsXG4gICAgICAgIG9uU2VsZWN0OiAnJicsXG4gICAgICB9XG4gICAgICBwdWJsaWMgdGVtcGxhdGVVcmw6IHN0cmluZyA9ICdwYXJ0aWFscy90cmVlLmh0bWwnXG4gIH1cbn1cbiJdfQ==

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2FwcC9zY3JpcHRzL3R5cGUtc2VsZWN0LWNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFVLEtBQUssQ0FVZDtBQVZELFdBQVUsS0FBSyxFQUFDLENBQUM7SUFDZixZQUFZLENBQUE7SUFFWjtRQUFBO1lBQ1csYUFBUSxHQUEyQjtnQkFDeEMsSUFBSSxFQUFFLEdBQUc7Z0JBQ1QsUUFBUSxFQUFFLEdBQUc7YUFDZCxDQUFBO1lBQ00sZ0JBQVcsR0FBVywyQkFBMkIsQ0FBQTtRQUM1RCxDQUFDO1FBQUQsMEJBQUM7SUFBRCxDQU5BLEFBTUMsSUFBQTtJQU5ZLHlCQUFtQixzQkFNL0IsQ0FBQTtBQUNILENBQUMsRUFWUyxLQUFLLEtBQUwsS0FBSyxRQVVkIiwiZmlsZSI6InNjcmlwdHMvdHlwZS1zZWxlY3QtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIGZpYnJhIHtcbiAgJ3VzZSBzdHJpY3QnXG5cbiAgZXhwb3J0IGNsYXNzIFR5cGVTZWxlY3RDb21wb25lbnQgaW1wbGVtZW50cyBhbmd1bGFyLklDb21wb25lbnRPcHRpb25zIHtcbiAgICAgIHB1YmxpYyBiaW5kaW5nczoge1tpZDogc3RyaW5nXTogc3RyaW5nfSA9IHtcbiAgICAgICAgdHJlZTogJzwnLFxuICAgICAgICBvblNlbGVjdDogJyYnLFxuICAgICAgfVxuICAgICAgcHVibGljIHRlbXBsYXRlVXJsOiBzdHJpbmcgPSAncGFydGlhbHMvdHlwZS1zZWxlY3QuaHRtbCdcbiAgfVxufVxuIl19

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2FwcC9zY3JpcHRzL3dvcmtlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQVUsS0FBSyxDQW9RZDtBQXBRRCxXQUFVLEtBQUssRUFBQyxDQUFDO0lBQ2YsWUFBWSxDQUFBO0lBRVo7UUFDRSxvQ0FBbUIsT0FBZSxFQUFTLGFBQXFCLEVBQVMsYUFBdUI7WUFBN0UsWUFBTyxHQUFQLE9BQU8sQ0FBUTtZQUFTLGtCQUFhLEdBQWIsYUFBYSxDQUFRO1lBQVMsa0JBQWEsR0FBYixhQUFhLENBQVU7UUFBRyxDQUFDO1FBQ3RHLGlDQUFDO0lBQUQsQ0FGQSxBQUVDLElBQUE7SUFGWSxnQ0FBMEIsNkJBRXRDLENBQUE7SUFFRDtRQWdFRSx1QkFBWSwwQkFBc0QsRUFBVSwwQ0FBeUUsRUFBRSxVQUFxQyxFQUFFLE9BQStCLEVBQVUsRUFBcUI7WUFoRTlQLGlCQWtLQztZQWxHNkUsK0NBQTBDLEdBQTFDLDBDQUEwQyxDQUErQjtZQUFrRixPQUFFLEdBQUYsRUFBRSxDQUFtQjtZQXZDcFAsa0JBQWEsR0FBVyxDQUFDLENBQUE7WUFDekIsY0FBUyxHQUE2QixFQUFFLENBQUE7WUF1QzlDLElBQUksSUFBSSxHQUFXLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLElBQUksR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQTtZQUMzRSxJQUFJLGFBQWEsR0FBYSwwQkFBMEIsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQztnQkFDMUUsT0FBQSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUFoRyxDQUFnRyxDQUNqRyxDQUFBO1lBQ0QsSUFBSSxPQUFP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QUQsQ0E1RUEsQUE0RUMsSUFBQTtJQTVFWSx5QkFBbUIsc0JBNEUvQixDQUFBO0FBRUgsQ0FBQyxFQXBRUyxLQUFLLEtBQUwsS0FBSyxRQW9RZCIsImZpbGUiOiJzY3JpcHRzL3dvcmtlci1zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIGZpYnJhIHtcbiAgJ3VzZSBzdHJpY3QnXG5cbiAgZXhwb3J0IGNsYXNzIFdvcmtlclNlcnZpY2VDb25maWd1cmF0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgYXBwTmFtZTogc3RyaW5nLCBwdWJsaWMgd29ya2VyVGhyZWFkczogbnVtYmVyLCBwdWJsaWMgaW1wb3J0U2NyaXB0czogc3RyaW5nW10pIHt9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgV29ya2VyU2VydmljZSB7XG5cbiAgICBwcml2YXRlIHN0YXRpYyB3b3JrZXJUZW1wbGF0ZTogc3RyaW5nID0gYFxuICAgICAgdmFyIHdpbmRvdyA9IHNlbGZcbiAgICAgIHNlbGYuaGlzdG9yeSA9IHt9XG4gICAgICBzZWxmLk5vZGUgPSBmdW5jdGlvbiAoKSB7fVxuICAgICAgdmFyIGRvY3VtZW50ID0ge1xuICAgICAgICByZWFkeVN0YXRlOiAnY29tcGxldGUnLFxuICAgICAgICBjb29raWU6ICcnLFxuICAgICAgICBxdWVyeVNlbGVjdG9yOiBmdW5jdGlvbiAoKSB7fSxcbiAgICAgICAgY3JlYXRlRWxlbWVudDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBhdGhuYW1lOiAnJyxcbiAgICAgICAgICAgIHNldEF0dHJpYnV0ZTogZnVuY3Rpb24oKSB7fVxuICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgICAgaW1wb3J0U2NyaXB0cygnPElNUE9SVF9TQ1JJUFRTPicpXG4gICAgICB3aW5kb3cuYW5ndWxhci5tb2R1bGUoJzxBUFBfTkFNRT4nKS5ydW4oWyd3b3JrZXJXb3JrZXJTZXJ2aWNlJywgZnVuY3Rpb24od29ya2VyV29ya2VyU2VydmljZSkge1xuICAgICAgICBzZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbihlKSB7IHdvcmtlcldvcmtlclNlcnZpY2Uub25NZXNzYWdlKGUuZGF0YSkgfSlcbiAgICAgIH1dKVxuICAgICAgd2luZG93LmFuZ3VsYXIuYm9vdHN0cmFwKG51bGwsIFsnPEFQUF9OQU1FPiddKVxuICAgIGBcblxuICAgIHByaXZhdGUgd29ya2VyczogV29ya2VyW11cbiAgICBwcml2YXRlIGN1cnJlbnRXb3JrZXI6IG51bWJlciA9IDBcbiAgICBwcml2YXRlIGRlZmVycmVkczogYW5ndWxhci5JRGVmZXJyZWQ8YW55PltdID0gW11cblxuICAgIHB1YmxpYyBzdGF0aWMgc3RyaXBNYXJrcyhhcmdzOiBhbnkpOiB2b2lkIHtcbiAgICAgIGlmICghYXJncyB8fCAhYXJncy5fX21hcmsgfHwgdHlwZW9mIGFyZ3MgIT09ICdvYmplY3QnKSByZXR1cm5cbiAgICAgIGRlbGV0ZSBhcmdzLl9fbWFya1xuICAgICAgaWYgKGFyZ3MgaW5zdGFuY2VvZiBBcnJheSkgYXJncy5mb3JFYWNoKGFyZyA9PiBXb3JrZXJTZXJ2aWNlLnN0cmlwTWFya3MoYXJnKSlcbiAgICAgIGVsc2Uge1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gYXJncykgaWYgKGFyZ3MuaGFzT3duUHJvcGVydHkoa2V5KSlcbiAgICAgICAgICBXb3JrZXJTZXJ2aWNlLnN0cmlwTWFya3MoYXJnc1trZXldKVxuICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgc2F2ZVByb3RvdHlwZXMoYXJnczogYW55KTogYW55IHtcbiAgICAgIHRoaXMuc2F2ZVByb3RvdHlwZXNJbnRlcm5hbChhcmdzKVxuICAgICAgcmV0dXJuIGFyZ3NcbiAgICB9XG4gICAgcHJpdmF0ZSBzdGF0aWMgc2F2ZVByb3RvdHlwZXNJbnRlcm5hbChhcmdzOiBhbnkpOiB2b2lkIHtcbiAgICAgIGlmICghYXJncyB8fCBhcmdzLl9fY2xhc3NOYW1lIHx8IHR5cGVvZiBhcmdzICE9PSAnb2JqZWN0JykgcmV0dXJuXG4gICAgICBpZiAoYXJncyBpbnN0YW5jZW9mIEFycmF5KSBhcmdzLmZvckVhY2goYXJnID0+IFdvcmtlclNlcnZpY2Uuc2F2ZVByb3RvdHlwZXMoYXJnKSlcbiAgICAgIGVsc2Uge1xuICAgICAgICBpZiAoYXJncy5jb25zdHJ1Y3Rvci5uYW1lICE9PSAnT2JqZWN0Jykge1xuICAgICAgICAgIGxldCBjdXJyZW50UHJvdG90eXBlOiB7fSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihhcmdzKVxuICAgICAgICAgIG91dDogd2hpbGUgKGN1cnJlbnRQcm90b3R5cGUgIT09IE9iamVjdC5wcm90b3R5cGUpIHtcbiAgICAgICAgICAgIGZvciAobGV0IHByb3Agb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoY3VycmVudFByb3RvdHlwZSkpIHtcbiAgICAgICAgICAgICAgaWYgKHByb3AgIT09ICdjb25zdHJ1Y3RvcicgJiYgdHlwZW9mKGFyZ3MuX19wcm90b19fW3Byb3BdKSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGFyZ3MuX19jbGFzc05hbWUgPSBhcmdzLmNvbnN0cnVjdG9yLm5hbWVcbiAgICAgICAgICAgICAgICBicmVhayBvdXRcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3VycmVudFByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihjdXJyZW50UHJvdG90eXBlKVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIWFyZ3MuX19jbGFzc05hbWUpIGFyZ3MuX19jbGFzc05hbWUgPSAnT2JqZWN0J1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGtleSBpbiBhcmdzKSBpZiAoYXJncy5oYXNPd25Qcm9wZXJ0eShrZXkpKVxuICAgICAgICAgIFdvcmtlclNlcnZpY2Uuc2F2ZVByb3RvdHlwZXMoYXJnc1trZXldKVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHdvcmtlclNlcnZpY2VDb25maWd1cmF0aW9uOiBXb3JrZXJTZXJ2aWNlQ29uZmlndXJhdGlvbiwgcHJpdmF0ZSB3b3JrZXJTZXJ2aWNlUHJvdG90eXBlTWFwcGluZ0NvbmZpZ3VyYXRpb246IHtbY2xhc3NOYW1lOiBzdHJpbmddOiBPYmplY3R9LCAkcm9vdFNjb3BlOiBhbmd1bGFyLklSb290U2NvcGVTZXJ2aWNlLCAkd2luZG93OiBhbmd1bGFyLklXaW5kb3dTZXJ2aWNlLCBwcml2YXRlICRxOiBhbmd1bGFyLklRU2VydmljZSkge1xuICAgICAgbGV0IHBhdGg6IHN0cmluZyA9ICR3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgKyAnLy8nICsgJHdpbmRvdy5sb2NhdGlvbi5ob3N0XG4gICAgICBsZXQgaW1wb3J0U2NyaXB0czogc3RyaW5nW10gPSB3b3JrZXJTZXJ2aWNlQ29uZmlndXJhdGlvbi5pbXBvcnRTY3JpcHRzLm1hcChzID0+XG4gICAgICAgIHMuaW5kZXhPZignaHR0cCcpICE9PSAwID8gcGF0aCArIChzLmluZGV4T2YoJy8nKSAhPT0gMCA/ICR3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgOiAnJykgKyBzIDogc1xuICAgICAgKVxuICAgICAgbGV0IGJsb2JVUkw6IHN0cmluZyA9ICgkd2luZG93LlVSTCkuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKFtXb3JrZXJTZXJ2aWNlLndvcmtlclRlbXBsYXRlLnJlcGxhY2UoLzxBUFBfTkFNRT4vZywgd29ya2VyU2VydmljZUNvbmZpZ3VyYXRpb24uYXBwTmFtZSkucmVwbGFjZSgvPElNUE9SVF9TQ1JJUFRTPi9nLCBpbXBvcnRTY3JpcHRzLmpvaW4oJ1xcJyxcXCcnKSldLCB7IHR5cGU6ICdhcHBsaWNhdGlvbi9qYXZhc2NyaXB0JyB9KSk7XG4gICAgICB0aGlzLndvcmtlcnMgPSBbXVxuICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IHdvcmtlclNlcnZpY2VDb25maWd1cmF0aW9uLndvcmtlclRocmVhZHM7IGkrKykge1xuICAgICAgICB0aGlzLndvcmtlcnMucHVzaChuZXcgV29ya2VyKGJsb2JVUkwpKVxuICAgICAgICB0aGlzLndvcmtlcnNbaV0uYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIChlOiBNZXNzYWdlRXZlbnQpID0+IHtcbiAgICAgICAgICBsZXQgZXZlbnRJZDogc3RyaW5nID0gZS5kYXRhLmV2ZW50O1xuICAgICAgICAgIGlmIChldmVudElkID09PSAnYnJvYWRjYXN0Jykge1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KGUuZGF0YS5uYW1lLCB0aGlzLnJlc3RvcmVQcm90b3R5cGVzKGUuZGF0YS5hcmdzKSlcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KClcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGRlZmVycmVkOiBhbmd1bGFyLklEZWZlcnJlZDxhbnk+ID0gdGhpcy5kZWZlcnJlZHNbZS5kYXRhLmlkXVxuICAgICAgICAgICAgaWYgKGRlZmVycmVkKSB7XG4gICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmRlZmVycmVkc1tlLmRhdGEuaWRdXG4gICAgICAgICAgICAgIGlmIChldmVudElkID09PSAnc3VjY2VzcycpXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSh0aGlzLnJlc3RvcmVQcm90b3R5cGVzKGUuZGF0YS5kYXRhKSlcbiAgICAgICAgICAgICAgZWxzZSBpZiAoZXZlbnRJZCA9PT0gJ2ZhaWx1cmUnKVxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh0aGlzLnJlc3RvcmVQcm90b3R5cGVzKGUuZGF0YS5kYXRhKSlcbiAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGRlZmVycmVkLm5vdGlmeSh0aGlzLnJlc3RvcmVQcm90b3R5cGVzKGUuZGF0YS5kYXRhKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljICRicm9hZGNhc3QobmFtZTogc3RyaW5nLCBhcmdzOiBhbnlbXSk6IHZvaWQge1xuICAgICAgdGhpcy53b3JrZXJzLmZvckVhY2godyA9PiB3LnBvc3RNZXNzYWdlKHtuYW1lOiBuYW1lLCBhcmdzOiBXb3JrZXJTZXJ2aWNlLnNhdmVQcm90b3R5cGVzKGFyZ3MpfSkpXG4gICAgfVxuXG4gICAgcHVibGljIGNhbGxBbGw8VD4oc2VydmljZTogc3RyaW5nLCBtZXRob2Q6IHN0cmluZywgYXJnczogYW55W10gPSBbXSwgY2FuY2VsbGVyPzogYW5ndWxhci5JUHJvbWlzZTxhbnk+KTogYW5ndWxhci5JUHJvbWlzZTxUPiB7XG4gICAgICBsZXQgZGVmZXJyZWQ6IGFuZ3VsYXIuSURlZmVycmVkPFQ+ID0gdGhpcy4kcS5kZWZlcigpXG4gICAgICB0aGlzLmRlZmVycmVkcy5wdXNoKGRlZmVycmVkKVxuICAgICAgbGV0IGlkOiBudW1iZXIgPSB0aGlzLmRlZmVycmVkcy5sZW5ndGggLSAxXG4gICAgICBsZXQgbWVzc2FnZTogSU1lc3NhZ2UgPSB7XG4gICAgICAgIGlkOiBpZCxcbiAgICAgICAgc2VydmljZTogc2VydmljZSxcbiAgICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICAgIGFyZ3M6IFdvcmtlclNlcnZpY2Uuc2F2ZVByb3RvdHlwZXMoYXJncylcbiAgICAgIH1cbiAgICAgIGlmIChjYW5jZWxsZXIpIGNhbmNlbGxlci50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy53b3JrZXJzLmZvckVhY2god29ya2VyID0+IHdvcmtlci5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgIGNhbmNlbDogdHJ1ZVxuICAgICAgICB9KSlcbiAgICAgICAgZGVsZXRlIHRoaXMuZGVmZXJyZWRzW2lkXVxuICAgICAgfSlcbiAgICAgIHRoaXMud29ya2Vycy5mb3JFYWNoKHdvcmtlciA9PiB3b3JrZXIucG9zdE1lc3NhZ2UobWVzc2FnZSkpXG4gICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZVxuICAgIH1cbiAgICBwdWJsaWMgY2FsbDxUPihzZXJ2aWNlOiBzdHJpbmcsIG1ldGhvZDogc3RyaW5nLCBhcmdzOiBhbnlbXSA9IFtdLCBjYW5jZWxsZXI/OiBhbmd1bGFyLklQcm9taXNlPGFueT4pOiBhbmd1bGFyLklQcm9taXNlPFQ+IHtcbiAgICAgIGxldCBkZWZlcnJlZDogYW5ndWxhci5JRGVmZXJyZWQ8VD4gPSB0aGlzLiRxLmRlZmVyKClcbiAgICAgIHRoaXMuZGVmZXJyZWRzLnB1c2goZGVmZXJyZWQpXG4gICAgICBsZXQgaWQ6IG51bWJlciA9IHRoaXMuZGVmZXJyZWRzLmxlbmd0aCAtIDFcbiAgICAgIGxldCB3b3JrZXI6IFdvcmtlciA9IHRoaXMud29ya2Vyc1t0aGlzLmN1cnJlbnRXb3JrZXJdXG4gICAgICB0aGlzLmN1cnJlbnRXb3JrZXIgPSAodGhpcy5jdXJyZW50V29ya2VyICsgMSkgJSB0aGlzLndvcmtlcnMubGVuZ3RoXG4gICAgICBpZiAoY2FuY2VsbGVyKSBjYW5jZWxsZXIudGhlbigoKSA9PiB7XG4gICAgICAgIHdvcmtlci5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgIGNhbmNlbDogdHJ1ZVxuICAgICAgICB9KVxuICAgICAgICBkZWxldGUgdGhpcy5kZWZlcnJlZHNbaWRdXG4gICAgICB9KVxuICAgICAgd29ya2VyLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgaWQ6IGlkLFxuICAgICAgICBzZXJ2aWNlOiBzZXJ2aWNlLFxuICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgYXJnczogV29ya2VyU2VydmljZS5zYXZlUHJvdG90eXBlcyhhcmdzKVxuICAgICAgfSlcbiAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlXG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXN0b3JlUHJvdG90eXBlcyhhcmdzOiBhbnkpOiBhbnkge1xuICAgICAgdGhpcy5yZXN0b3JlUHJvdG90eXBlc0ludGVybmFsKGFyZ3MpXG4gICAgICBXb3JrZXJTZXJ2aWNlLnN0cmlwTWFya3MoYXJncylcbiAgICAgIHJldHVybiBhcmdzXG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXN0b3JlUHJvdG90eXBlc0ludGVybmFsKGFyZ3M6IGFueSk6IHZvaWQge1xuICAgICAgaWYgKCFhcmdzIHx8IGFyZ3MuX19tYXJrIHx8IHR5cGVvZiBhcmdzICE9PSAnb2JqZWN0JykgcmV0dXJuXG4gICAgICBhcmdzLl9fbWFyayA9IHRydWVcbiAgICAgIGlmIChhcmdzIGluc3RhbmNlb2YgQXJyYXkpIGFyZ3MuZm9yRWFjaChhcmcgPT4gdGhpcy5yZXN0b3JlUHJvdG90eXBlc0ludGVybmFsKGFyZykpXG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKGFyZ3MuX19jbGFzc05hbWUpIHtcbiAgICAgICAgICBsZXQgcHJvdG90eXBlOiBPYmplY3QgPSB0aGlzLndvcmtlclNlcnZpY2VQcm90b3R5cGVNYXBwaW5nQ29uZmlndXJhdGlvblthcmdzLl9fY2xhc3NOYW1lXVxuICAgICAgICAgIGlmICghcHJvdG90eXBlKSB0aHJvdyAnVW5rbm93biBwcm90b3R5cGUgJyArIGFyZ3MuX19jbGFzc05hbWVcbiAgICAgICAgICBhcmdzLl9fcHJvdG9fXyA9ICBwcm90b3R5cGVcbiAgICAgICAgICBkZWxldGUgYXJncy5fX2NsYXNzTmFtZVxuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGtleSBpbiBhcmdzKSBpZiAoYXJncy5oYXNPd25Qcm9wZXJ0eShrZXkpKVxuICAgICAgICAgIHRoaXMucmVzdG9yZVByb3RvdHlwZXNJbnRlcm5hbChhcmdzW2tleV0pXG4gICAgICB9XG4gICAgfVxuXG4gIH1cblxuICBkZWNsYXJlIHZhciBzZWxmOiBhbnlcblxuICBpbnRlcmZhY2UgSU1lc3NhZ2Uge1xuICAgIGlkPzogbnVtYmVyXG4gICAgbmFtZT86IHN0cmluZ1xuICAgIGFyZ3M/OiBhbnlcbiAgICBjYW5jZWw/OiBib29sZWFuXG4gICAgc2VydmljZT86IHN0cmluZ1xuICAgIG1ldGhvZD86IHN0cmluZ1xuICB9XG5cbiAgZXhwb3J0IGNsYXNzIFdvcmtlcldvcmtlclNlcnZpY2Uge1xuICAgIHByaXZhdGUgY2FuY2VsbGVyczogYW5ndWxhci5JRGVmZXJyZWQ8YW55PltdID0gW11cblxuICAgIHB1YmxpYyBzdGF0aWMgc3RyaXBGdW5jdGlvbnMob2JqKTogYW55IHtcbiAgICAgIGxldCByZXQ6IHt9ID0ge31cbiAgICAgIGZvciAobGV0IGtleSBpbiBvYmopXG4gICAgICAgIGlmICh0eXBlb2Ygb2JqW2tleV0gPT09ICdvYmplY3QnKSByZXRba2V5XSA9IFdvcmtlcldvcmtlclNlcnZpY2Uuc3RyaXBGdW5jdGlvbnMob2JqW2tleV0pXG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBvYmpba2V5XSAhPT0gJ2Z1bmN0aW9uJykgcmV0W2tleV0gPSBvYmpba2V5XVxuICAgICAgcmV0dXJuIHJldFxuICAgIH1cbiAgICBwdWJsaWMgJGJyb2FkY2FzdChuYW1lOiBzdHJpbmcsIGFyZ3M/OiBhbnkpOiB2b2lkIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHNlbGYucG9zdE1lc3NhZ2Uoe2V2ZW50OiAnYnJvYWRjYXN0JywgbmFtZTogbmFtZSwgYXJnczogV29ya2VyU2VydmljZS5zYXZlUHJvdG90eXBlcyhhcmdzKX0pXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGFyZ3MsIGUpXG4gICAgICAgIHRocm93IGVcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB3b3JrZXJTZXJ2aWNlUHJvdG90eXBlTWFwcGluZ0NvbmZpZ3VyYXRpb246ICB7W2NsYXNzTmFtZTogc3RyaW5nXTogT2JqZWN0fSwgcHJpdmF0ZSAkaW5qZWN0b3I6IGFuZ3VsYXIuYXV0by5JSW5qZWN0b3JTZXJ2aWNlLCBwcml2YXRlICRxOiBhbmd1bGFyLklRU2VydmljZSwgcHJpdmF0ZSAkcm9vdFNjb3BlOiBhbmd1bGFyLklSb290U2NvcGVTZXJ2aWNlKSB7fVxuICAgIHB1YmxpYyBvbk1lc3NhZ2UobWVzc2FnZTogSU1lc3NhZ2UpOiB2b2lkIHtcbiAgICAgIGlmIChtZXNzYWdlLmlkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRicm9hZGNhc3QobWVzc2FnZS5uYW1lISwgdGhpcy5yZXN0b3JlUHJvdG90eXBlcyhtZXNzYWdlLmFyZ3MpKVxuICAgICAgICB0aGlzLiRyb290U2NvcGUuJGFwcGx5KClcbiAgICAgIH0gZWxzZSBpZiAobWVzc2FnZS5jYW5jZWwpIHtcbiAgICAgICAgbGV0IGNhbmNlbGxlcjogYW5ndWxhci5JRGVmZXJyZWQ8YW55PiA9IHRoaXMuY2FuY2VsbGVyc1ttZXNzYWdlLmlkXTtcbiAgICAgICAgZGVsZXRlIHRoaXMuY2FuY2VsbGVyc1ttZXNzYWdlLmlkXTtcbiAgICAgICAgaWYgKGNhbmNlbGxlcikgY2FuY2VsbGVyLnJlc29sdmUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBzZXJ2aWNlOiBhbnkgPSB0aGlzLiRpbmplY3Rvci5nZXQobWVzc2FnZS5zZXJ2aWNlISlcbiAgICAgICAgbGV0IGNhbmNlbGxlcjogYW5ndWxhci5JRGVmZXJyZWQ8YW55PiA9IHRoaXMuJHEuZGVmZXIoKTtcbiAgICAgICAgdGhpcy5jYW5jZWxsZXJzW21lc3NhZ2UuaWRdID0gY2FuY2VsbGVyO1xuICAgICAgICBsZXQgcHJvbWlzZTogYW55ID0gc2VydmljZVttZXNzYWdlLm1ldGhvZCFdLmFwcGx5KHNlcnZpY2UsIHRoaXMucmVzdG9yZVByb3RvdHlwZXMobWVzc2FnZS5hcmdzKS5jb25jYXQoY2FuY2VsbGVyLnByb21pc2UpKVxuICAgICAgICBpZiAoIXByb21pc2UgfHwgIXByb21pc2UudGhlbikge1xuICAgICAgICAgIGxldCBkZWZlcnJlZDogYW5ndWxhci5JRGVmZXJyZWQ8YW55PiA9IHRoaXMuJHEuZGVmZXIoKVxuICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocHJvbWlzZSlcbiAgICAgICAgICBwcm9taXNlID0gZGVmZXJyZWQucHJvbWlzZVxuICAgICAgICB9XG4gICAgICAgIHByb21pc2UudGhlbihcbiAgICAgICAgICAoc3VjY2VzcykgPT4ge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuY2FuY2VsbGVyc1ttZXNzYWdlLmlkIV1cbiAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2Uoe2V2ZW50OiAnc3VjY2VzcycsIGlkOiBtZXNzYWdlLmlkLCBkYXRhOiBXb3JrZXJTZXJ2aWNlLnNhdmVQcm90b3R5cGVzKHN1Y2Nlc3MpfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmNhbmNlbGxlcnNbbWVzc2FnZS5pZCFdXG4gICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHtldmVudDogJ2ZhaWx1cmUnLCBpZDogbWVzc2FnZS5pZCwgZGF0YTogV29ya2VyU2VydmljZS5zYXZlUHJvdG90eXBlcyhXb3JrZXJXb3JrZXJTZXJ2aWNlLnN0cmlwRnVuY3Rpb25zKGVycm9yKSl9KVxuICAgICAgICAgIH0sXG4gICAgICAgICAgKHVwZGF0ZSkgPT4ge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuY2FuY2VsbGVyc1ttZXNzYWdlLmlkIV1cbiAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2Uoe2V2ZW50OiAndXBkYXRlJywgaWQ6IG1lc3NhZ2UuaWQsIGRhdGE6IFdvcmtlclNlcnZpY2Uuc2F2ZVByb3RvdHlwZXModXBkYXRlKX0pO1xuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcmVzdG9yZVByb3RvdHlwZXMoYXJnczogYW55KTogYW55IHtcbiAgICAgIHRoaXMucmVzdG9yZVByb3RvdHlwZXNJbnRlcm5hbChhcmdzKVxuICAgICAgV29ya2VyU2VydmljZS5zdHJpcE1hcmtzKGFyZ3MpXG4gICAgICByZXR1cm4gYXJnc1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVzdG9yZVByb3RvdHlwZXNJbnRlcm5hbChhcmdzOiBhbnkpOiB2b2lkIHtcbiAgICAgIGlmICghYXJncyB8fCBhcmdzLl9fbWFyayB8fCB0eXBlb2YgYXJncyAhPT0gJ29iamVjdCcpIHJldHVyblxuICAgICAgYXJncy5fX21hcmsgPSB0cnVlXG4gICAgICBpZiAoYXJncyBpbnN0YW5jZW9mIEFycmF5KSBhcmdzLmZvckVhY2goYXJnID0+IHRoaXMucmVzdG9yZVByb3RvdHlwZXNJbnRlcm5hbChhcmcpKVxuICAgICAgZWxzZSB7XG4gICAgICAgIGlmIChhcmdzLl9fY2xhc3NOYW1lKSB7XG4gICAgICAgICAgbGV0IHByb3RvdHlwZTogT2JqZWN0ID0gdGhpcy53b3JrZXJTZXJ2aWNlUHJvdG90eXBlTWFwcGluZ0NvbmZpZ3VyYXRpb25bYXJncy5fX2NsYXNzTmFtZV1cbiAgICAgICAgICBpZiAoIXByb3RvdHlwZSkgdGhyb3cgJ1Vua25vd24gcHJvdG90eXBlICcgKyBhcmdzLl9fY2xhc3NOYW1lXG4gICAgICAgICAgYXJncy5fX3Byb3RvX18gPSAgcHJvdG90eXBlXG4gICAgICAgICAgZGVsZXRlIGFyZ3MuX19jbGFzc05hbWVcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gYXJncykgaWYgKGFyZ3MuaGFzT3duUHJvcGVydHkoa2V5KSlcbiAgICAgICAgICB0aGlzLnJlc3RvcmVQcm90b3R5cGVzSW50ZXJuYWwoYXJnc1trZXldKVxuICAgICAgfVxuICAgIH1cblxuXG4gIH1cblxufVxuIl19

(function(module) {
try {
  module = angular.module('fibra');
} catch (e) {
  module = angular.module('fibra', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('partials/author-view.html',
    '\n' +
    '<div class="container-fluid">\n' +
    '  <div class="row no-gutter">\n' +
    '    <div class="col-md-12">foo</div>\n' +
    '  </div>\n' +
    '  <div class="row">\n' +
    '    <div class="col-md-12">\n' +
    '      <sparql-autocomplete on-select="$ctrl.createItem(result)"></sparql-autocomplete>\n' +
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
  $templateCache.put('partials/configure-view.html',
    '\n' +
    '<div class="container">\n' +
    '  <h3>Select configuration</h3>\n' +
    '  <ul>\n' +
    '    <li ng-repeat="configuration in $ctrl.configurations">\n' +
    '      <h4><a ng-click="$ctrl.setConfiguration(configuration)">{{configuration.name}}</a></h4>\n' +
    '      <h5>Configured Authorities:</h5>\n' +
    '      <ul class="list-inline">\n' +
    '        <li ng-repeat="endpoint in configuration.authorityEndpoints">{{endpoint.title}}</li>\n' +
    '      </ul>\n' +
    '      <h5>Configured Archives:</h5>\n' +
    '      <ul class="list-inline">\n' +
    '        <li ng-repeat="endpoint in configuration.archiveEndpoints">{{endpoint.title}}</li>\n' +
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
  $templateCache.put('partials/construct-view.html',
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
  $templateCache.put('partials/select-view.html',
    '\n' +
    '<div class="container">\n' +
    '  <h2>Select data</h2>\n' +
    '  <ul>\n' +
    '    <li><a ng-click="$ctrl.setData(\'set1\')">set 1</a></li>\n' +
    '    <li><a ng-click="$ctrl.setData(\'set2\')">set 2</a></li>\n' +
    '    <li><a ng-click="$ctrl.setData(\'set3\')">set 3</a></li>\n' +
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
