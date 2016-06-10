var fibra;
(function (fibra) {
    'use strict';
    var m = angular.module('fibra', ['http-auth-interceptor', 'ngStorage', 'ui.router', 'fi.seco.sparql']);
    m.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('main', {
            url: '/',
            templateUrl: 'partials/main.html',
            controller: 'MainController'
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQVUsS0FBSyxDQTRDZDtBQTVDRCxXQUFVLEtBQUssRUFBQyxDQUFDO0lBQ2YsWUFBWSxDQUFBO0lBWVosSUFBSSxDQUFDLEdBQW9CLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUUsdUJBQXVCLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsQ0FBRSxDQUFDLENBQUE7SUFDekgsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFDLGNBQXlDLEVBQUUsa0JBQWlEO1FBQ3BHLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNqQyxjQUFjLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUMzQixHQUFHLEVBQUUsR0FBRztZQUNSLFdBQVcsRUFBRSxvQkFBb0I7WUFDakMsVUFBVSxFQUFFLGdCQUFnQjtTQUMzQixDQUFDLENBQUE7SUFDTixDQUFDLENBQUMsQ0FBQTtJQUNGLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxxQkFBcUI7UUFDN0IscUJBQXFCLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9DLENBQUMsQ0FBQyxDQUFBO0lBQ0YsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLFVBQTJDLEVBQUUsYUFBa0IsRUFBRSxLQUEyQixFQUFFLFdBQTBDO1FBQzdJLFVBQVUsQ0FBQyxRQUFRLEdBQUc7WUFDcEIsUUFBUSxFQUFFLEtBQUs7WUFDZixRQUFRLEVBQUUsU0FBUztZQUNuQixRQUFRLEVBQUUsU0FBUztTQUNwQixDQUFBO1FBQ0QsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQztZQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsR0FBRyxhQUFhLENBQUMsYUFBYSxDQUFBO1FBQzdHLFVBQVUsQ0FBQyxPQUFPLEdBQUc7WUFDbkIsVUFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFBO1lBQ3BDLGFBQWEsQ0FBQyxhQUFhLEdBQUcsUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxHQUFHLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUNoSCxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLEdBQUcsYUFBYSxDQUFDLGFBQWEsQ0FBQTtZQUM1RSxXQUFXLENBQUMsY0FBYyxFQUFFLENBQUE7UUFDOUIsQ0FBQyxDQUFBO1FBQ0QsVUFBVSxDQUFDLFdBQVcsR0FBRztZQUN2QixVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUE7WUFDcEMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxFQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUMsRUFBRSx5QkFBeUIsQ0FBQyxDQUFBO1FBQ3RFLENBQUMsQ0FBQTtRQUNELFVBQVUsQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEVBQUUsY0FBTSxPQUFBLFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLElBQUksRUFBbkMsQ0FBbUMsQ0FBQyxDQUFBO0lBQ3ZGLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxFQTVDUyxLQUFLLEtBQUwsS0FBSyxRQTRDZCIsImZpbGUiOiJzY3JpcHRzL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBmaWJyYSB7XG4gICd1c2Ugc3RyaWN0J1xuXG4gIGludGVyZmFjZSBJQXV0aGVudGljYXRpb25Sb290U2NvcGVTZXJ2aWNlIGV4dGVuZHMgYW5ndWxhci5JUm9vdFNjb3BlU2VydmljZSB7XG4gICAgc2V0QXV0aDogKCkgPT4gdm9pZFxuICAgIGRpc21pc3NBdXRoOiAoKSA9PiB2b2lkXG4gICAgYXV0aEluZm86IHtcbiAgICAgIGF1dGhPcGVuOiBib29sZWFuXG4gICAgICB1c2VybmFtZTogc3RyaW5nXG4gICAgICBwYXNzd29yZDogc3RyaW5nXG4gICAgfVxuICB9XG5cbiAgbGV0IG06IGFuZ3VsYXIuSU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdmaWJyYScsIFsgJ2h0dHAtYXV0aC1pbnRlcmNlcHRvcicsICduZ1N0b3JhZ2UnLCAndWkucm91dGVyJywgJ2ZpLnNlY28uc3BhcnFsJyBdKVxuICBtLmNvbmZpZygoJHN0YXRlUHJvdmlkZXI6IGFuZ3VsYXIudWkuSVN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcjogYW5ndWxhci51aS5JVXJsUm91dGVyUHJvdmlkZXIpID0+IHtcbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJylcbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnbWFpbicsIHtcbiAgICAgIHVybDogJy8nLFxuICAgICAgdGVtcGxhdGVVcmw6ICdwYXJ0aWFscy9tYWluLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ01haW5Db250cm9sbGVyJ1xuICAgICAgfSlcbiAgfSlcbiAgbS5jb25maWcoKCRsb2NhbFN0b3JhZ2VQcm92aWRlcikgPT4ge1xuICAgICRsb2NhbFN0b3JhZ2VQcm92aWRlci5zZXRLZXlQcmVmaXgoJ2ZpYnJhLScpO1xuICB9KVxuICBtLnJ1bigoJHJvb3RTY29wZTogSUF1dGhlbnRpY2F0aW9uUm9vdFNjb3BlU2VydmljZSwgJGxvY2FsU3RvcmFnZTogYW55LCAkaHR0cDogYW5ndWxhci5JSHR0cFNlcnZpY2UsIGF1dGhTZXJ2aWNlOiBhbmd1bGFyLmh0dHBBdXRoLklBdXRoU2VydmljZSkgPT4ge1xuICAgICRyb290U2NvcGUuYXV0aEluZm8gPSB7XG4gICAgICBhdXRoT3BlbjogZmFsc2UsXG4gICAgICB1c2VybmFtZTogdW5kZWZpbmVkLFxuICAgICAgcGFzc3dvcmQ6IHVuZGVmaW5lZFxuICAgIH1cbiAgICBpZiAoJGxvY2FsU3RvcmFnZS5hdXRob3JpemF0aW9uKSAkaHR0cC5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vblsnQXV0aG9yaXphdGlvbiddID0gJGxvY2FsU3RvcmFnZS5hdXRob3JpemF0aW9uXG4gICAgJHJvb3RTY29wZS5zZXRBdXRoID0gKCkgPT4ge1xuICAgICAgJHJvb3RTY29wZS5hdXRoSW5mby5hdXRoT3BlbiA9IGZhbHNlXG4gICAgICAkbG9jYWxTdG9yYWdlLmF1dGhvcml6YXRpb24gPSAnQmFzaWMgJyArIGJ0b2EoJHJvb3RTY29wZS5hdXRoSW5mby51c2VybmFtZSArICc6JyArICRyb290U2NvcGUuYXV0aEluZm8ucGFzc3dvcmQpXG4gICAgICAkaHR0cC5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vblsnQXV0aG9yaXphdGlvbiddID0gJGxvY2FsU3RvcmFnZS5hdXRob3JpemF0aW9uXG4gICAgICBhdXRoU2VydmljZS5sb2dpbkNvbmZpcm1lZCgpXG4gICAgfVxuICAgICRyb290U2NvcGUuZGlzbWlzc0F1dGggPSAoKSA9PiB7XG4gICAgICAkcm9vdFNjb3BlLmF1dGhJbmZvLmF1dGhPcGVuID0gZmFsc2VcbiAgICAgIGF1dGhTZXJ2aWNlLmxvZ2luQ2FuY2VsbGVkKHtzdGF0dXM6IDQwMX0sICdBdXRoZW50aWNhdGlvbiByZXF1aXJlZCcpXG4gICAgfVxuICAgICRyb290U2NvcGUuJG9uKCdldmVudDphdXRoLWxvZ2luUmVxdWlyZWQnLCAoKSA9PiAkcm9vdFNjb3BlLmF1dGhJbmZvLmF1dGhPcGVuID0gdHJ1ZSlcbiAgfSlcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

var fibra;
(function (fibra) {
    'use strict';
    var MainController = (function () {
        function MainController($scope) {
            this.$scope = $scope;
            var queryTemplate = "PREFIX text: <http://jena.apache.org/text#>\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\nPREFIX skos: <http://www.w3.org/2004/02/skos/core#>\nPREFIX sf: <http://ldf.fi/functions#>\nSELECT ?groupId ?groupLabel ?id ?matchedLabel ?prefLabel (GROUP_CONCAT(?altLabel;SEPARATOR=', ') AS ?additionalInformation) {\n{\n  SELECT DISTINCT ?groupId ?id ?matchedLabel {\n    BIND(CONCAT(<QUERY>,\" \",REPLACE(<QUERY>,\"([\\\\+\\\\-\\\\&\\\\|\\\\!\\\\(\\\\)\\\\{\\\\}\\\\[\\\\]\\\\^\\\\\\\"\\\\~\\\\*\\\\?\\\\:\\\\/\\\\\\\\])\",\"\\\\$1\"),\"*\") AS ?query)\n    ?id text:query ?query .\n    ?id skos:prefLabel|rdfs:label|skos:altLabel ?matchedLabel\n    FILTER (REGEX(LCASE(?matchedLabel),CONCAT(\"\\\\b\",LCASE(<QUERY>))))\n    ?id a ?groupId .\n    FILTER EXISTS {\n      ?groupId skos:prefLabel|rdfs:label ?groupLabel\n    }\n    # CONSTRAINTS\n  } LIMIT <LIMIT>\n}\n?groupId sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?groupLabel) .\n?id sf:preferredLanguageLiteral (skos:prefLabel rdfs:label skos:altLabel 'en' '' ?prefLabel) .\nOPTIONAL {\n  ?id skos:altLabel ?altLabel .\n}\n}\nGROUP BY ?groupId ?groupLabel ?id ?matchedLabel ?prefLabel\nHAVING(BOUND(?id) && COUNT(?altLabel)<10) # workaround for Schoenberg bug\n";
            $scope.acConfig = [
                {
                    id: 'schoenberg',
                    title: 'Schoenberg',
                    endpoint: 'http://ldf.fi/schoenberg/sparql',
                    queryTemplate: queryTemplate
                },
                {
                    id: 'emlo',
                    title: 'EMLO',
                    endpoint: 'http://ldf.fi/emlo/sparql',
                    queryTemplate: queryTemplate
                },
                { id: 'procope',
                    title: 'Procope',
                    endpoint: 'http://ldf.fi/procope/sparql',
                    queryTemplate: queryTemplate
                }
            ];
            $scope.getClassTreeQuery = fibra.SparqlTreeService.getClassTreeQuery;
        }/*<auto_generate>*/MainController.$inject = ['$scope']; MainController.$componentName = 'MainController'/*</auto_generate>*/
        return MainController;
    }());/*<auto_generate>*/angular.module('fibra').controller('MainController',MainController);/*</auto_generate>*/
    fibra.MainController = MainController;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvbWFpbi1jdHJsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQVUsS0FBSyxDQTBEZDtBQTFERCxXQUFVLEtBQUssRUFBQyxDQUFDO0lBQ2YsWUFBWSxDQUFBO0lBTVo7UUFDRSx3QkFBb0IsTUFBa0I7WUFBbEIsV0FBTSxHQUFOLE1BQU0sQ0FBWTtZQUNwQyxJQUFJLGFBQWEsR0FBVyxzdUNBMEJqQyxDQUFBO1lBQ0ssTUFBTSxDQUFDLFFBQVEsR0FBRztnQkFDaEI7b0JBQ0UsRUFBRSxFQUFFLFlBQVk7b0JBQ2hCLEtBQUssRUFBRSxZQUFZO29CQUNuQixRQUFRLEVBQUUsaUNBQWlDO29CQUMzQyxhQUFhLEVBQUUsYUFBYTtpQkFDN0I7Z0JBQ0Q7b0JBQ0UsRUFBRSxFQUFFLE1BQU07b0JBQ1YsS0FBSyxFQUFFLE1BQU07b0JBQ2IsUUFBUSxFQUFFLDJCQUEyQjtvQkFDckMsYUFBYSxFQUFFLGFBQWE7aUJBQzdCO2dCQUNELEVBQUUsRUFBRSxFQUFFLFNBQVM7b0JBQ2IsS0FBSyxFQUFFLFNBQVM7b0JBQ2hCLFFBQVEsRUFBRSw4QkFBOEI7b0JBQ3hDLGFBQWEsRUFBRSxhQUFhO2lCQUM3QjthQUNGLENBQUE7WUFDRCxNQUFNLENBQUMsaUJBQWlCLEdBQUcsdUJBQWlCLENBQUMsaUJBQWlCLENBQUE7UUFDaEUsQ0FBQztRQUNILHFCQUFDO0lBQUQsQ0FsREEsQUFrREMsSUFBQTtJQWxEWSxvQkFBYyxpQkFrRDFCLENBQUE7QUFDSCxDQUFDLEVBMURTLEtBQUssS0FBTCxLQUFLLFFBMERkIiwiZmlsZSI6InNjcmlwdHMvbWFpbi1jdHJsLmpzIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIGZpYnJhIHtcbiAgJ3VzZSBzdHJpY3QnXG4gIGludGVyZmFjZSBJTWFpblNjb3BlIGV4dGVuZHMgYW5ndWxhci5JU2NvcGUge1xuICAgIGdldENsYXNzVHJlZVF1ZXJ5OiBzdHJpbmdcbiAgICBhY0NvbmZpZzogSVNwYXJxbEF1dG9jb21wbGV0aW9uQ29uZmlndXJhdGlvbltdXG4gIH1cblxuICBleHBvcnQgY2xhc3MgTWFpbkNvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOiBJTWFpblNjb3BlKSB7XG4gICAgICBsZXQgcXVlcnlUZW1wbGF0ZTogc3RyaW5nID0gYFBSRUZJWCB0ZXh0OiA8aHR0cDovL2plbmEuYXBhY2hlLm9yZy90ZXh0Iz5cblBSRUZJWCByZGZzOiA8aHR0cDovL3d3dy53My5vcmcvMjAwMC8wMS9yZGYtc2NoZW1hIz5cblBSRUZJWCBza29zOiA8aHR0cDovL3d3dy53My5vcmcvMjAwNC8wMi9za29zL2NvcmUjPlxuUFJFRklYIHNmOiA8aHR0cDovL2xkZi5maS9mdW5jdGlvbnMjPlxuU0VMRUNUID9ncm91cElkID9ncm91cExhYmVsID9pZCA/bWF0Y2hlZExhYmVsID9wcmVmTGFiZWwgKEdST1VQX0NPTkNBVCg/YWx0TGFiZWw7U0VQQVJBVE9SPScsICcpIEFTID9hZGRpdGlvbmFsSW5mb3JtYXRpb24pIHtcbntcbiAgU0VMRUNUIERJU1RJTkNUID9ncm91cElkID9pZCA/bWF0Y2hlZExhYmVsIHtcbiAgICBCSU5EKENPTkNBVCg8UVVFUlk+LFwiIFwiLFJFUExBQ0UoPFFVRVJZPixcIihbXFxcXFxcXFwrXFxcXFxcXFwtXFxcXFxcXFwmXFxcXFxcXFx8XFxcXFxcXFwhXFxcXFxcXFwoXFxcXFxcXFwpXFxcXFxcXFx7XFxcXFxcXFx9XFxcXFxcXFxbXFxcXFxcXFxdXFxcXFxcXFxeXFxcXFxcXFxcXFxcXCJcXFxcXFxcXH5cXFxcXFxcXCpcXFxcXFxcXD9cXFxcXFxcXDpcXFxcXFxcXC9cXFxcXFxcXFxcXFxcXFxcXSlcIixcIlxcXFxcXFxcJDFcIiksXCIqXCIpIEFTID9xdWVyeSlcbiAgICA/aWQgdGV4dDpxdWVyeSA/cXVlcnkgLlxuICAgID9pZCBza29zOnByZWZMYWJlbHxyZGZzOmxhYmVsfHNrb3M6YWx0TGFiZWwgP21hdGNoZWRMYWJlbFxuICAgIEZJTFRFUiAoUkVHRVgoTENBU0UoP21hdGNoZWRMYWJlbCksQ09OQ0FUKFwiXFxcXFxcXFxiXCIsTENBU0UoPFFVRVJZPikpKSlcbiAgICA/aWQgYSA/Z3JvdXBJZCAuXG4gICAgRklMVEVSIEVYSVNUUyB7XG4gICAgICA/Z3JvdXBJZCBza29zOnByZWZMYWJlbHxyZGZzOmxhYmVsID9ncm91cExhYmVsXG4gICAgfVxuICAgICMgQ09OU1RSQUlOVFNcbiAgfSBMSU1JVCA8TElNSVQ+XG59XG4/Z3JvdXBJZCBzZjpwcmVmZXJyZWRMYW5ndWFnZUxpdGVyYWwgKHNrb3M6cHJlZkxhYmVsIHJkZnM6bGFiZWwgc2tvczphbHRMYWJlbCAnZW4nICcnID9ncm91cExhYmVsKSAuXG4/aWQgc2Y6cHJlZmVycmVkTGFuZ3VhZ2VMaXRlcmFsIChza29zOnByZWZMYWJlbCByZGZzOmxhYmVsIHNrb3M6YWx0TGFiZWwgJ2VuJyAnJyA/cHJlZkxhYmVsKSAuXG5PUFRJT05BTCB7XG4gID9pZCBza29zOmFsdExhYmVsID9hbHRMYWJlbCAuXG59XG59XG5HUk9VUCBCWSA/Z3JvdXBJZCA/Z3JvdXBMYWJlbCA/aWQgP21hdGNoZWRMYWJlbCA/cHJlZkxhYmVsXG5IQVZJTkcoQk9VTkQoP2lkKSAmJiBDT1VOVCg/YWx0TGFiZWwpPDEwKSAjIHdvcmthcm91bmQgZm9yIFNjaG9lbmJlcmcgYnVnXG5gXG4gICAgICAkc2NvcGUuYWNDb25maWcgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICBpZDogJ3NjaG9lbmJlcmcnLFxuICAgICAgICAgIHRpdGxlOiAnU2Nob2VuYmVyZycsXG4gICAgICAgICAgZW5kcG9pbnQ6ICdodHRwOi8vbGRmLmZpL3NjaG9lbmJlcmcvc3BhcnFsJyxcbiAgICAgICAgICBxdWVyeVRlbXBsYXRlOiBxdWVyeVRlbXBsYXRlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpZDogJ2VtbG8nLFxuICAgICAgICAgIHRpdGxlOiAnRU1MTycsXG4gICAgICAgICAgZW5kcG9pbnQ6ICdodHRwOi8vbGRmLmZpL2VtbG8vc3BhcnFsJyxcbiAgICAgICAgICBxdWVyeVRlbXBsYXRlOiBxdWVyeVRlbXBsYXRlXG4gICAgICAgIH0sXG4gICAgICAgIHsgaWQ6ICdwcm9jb3BlJyxcbiAgICAgICAgICB0aXRsZTogJ1Byb2NvcGUnLFxuICAgICAgICAgIGVuZHBvaW50OiAnaHR0cDovL2xkZi5maS9wcm9jb3BlL3NwYXJxbCcsXG4gICAgICAgICAgcXVlcnlUZW1wbGF0ZTogcXVlcnlUZW1wbGF0ZVxuICAgICAgICB9XG4gICAgICBdXG4gICAgICAkc2NvcGUuZ2V0Q2xhc3NUcmVlUXVlcnkgPSBTcGFycWxUcmVlU2VydmljZS5nZXRDbGFzc1RyZWVRdWVyeVxuICAgIH1cbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

var fibra;
(function (fibra) {
    'use strict';
    var TreeNode = (function () {
        function TreeNode(id, label) {
            this.id = id;
            this.label = label;
            // public matchingInstances: number
            this.children = [];
            // this.matchingInstances = instances
        }
        return TreeNode;
    }());
    fibra.TreeNode = TreeNode;
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
                        classes[binding['class'].value] = new TreeNode(binding['class'].value, binding['classLabel'].value);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvc3BhcnFsLXRyZWUtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFVLEtBQUssQ0F1RWQ7QUF2RUQsV0FBVSxLQUFLLEVBQUMsQ0FBQztJQUNmLFlBQVksQ0FBQTtJQUlaO1FBSUUsa0JBQW1CLEVBQVUsRUFBUyxLQUFhO1lBQWhDLE9BQUUsR0FBRixFQUFFLENBQVE7WUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFRO1lBSG5ELG1DQUFtQztZQUM1QixhQUFRLEdBQWUsRUFBRSxDQUFBO1lBRzlCLHFDQUFxQztRQUN2QyxDQUFDO1FBQ0gsZUFBQztJQUFELENBUEEsQUFPQyxJQUFBO0lBUFksY0FBUSxXQU9wQixDQUFBO0lBRUQ7UUF1QkUsMkJBQW9CLGFBQThCO1lBQTlCLGtCQUFhLEdBQWIsYUFBYSxDQUFpQjtRQUFHLENBQUM7UUFFL0MsbUNBQU8sR0FBZCxVQUFlLFFBQWdCLEVBQUUsS0FBYSxFQUFFLFNBQWlDO1lBQy9FLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUMsT0FBTyxFQUFFLFNBQVMsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUN6RSxVQUFDLFFBQW1HO2dCQUNsRyxJQUFJLE9BQU8sR0FBNEMsRUFBRSxDQUFBO2dCQUN6RCxJQUFJLE9BQU8sR0FBNkIsRUFBRSxDQUFBO2dCQUMxQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUEsT0FBTztvQkFDNUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO3dCQUN4QixPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFBO29CQUNyRyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7d0JBQ3ZCLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFBO29CQUN0RixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN4QixJQUFJLFFBQVEsR0FBVyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFBO3dCQUNoRCxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQzs0QkFBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFBO3dCQUM5QyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQTtvQkFDbEQsQ0FBQztvQkFDRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMxQixJQUFJLFFBQVEsR0FBVyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFBO3dCQUM3QyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQzs0QkFBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFBO3dCQUM5QyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQTtvQkFDdkQsQ0FBQztnQkFDSCxDQUFDLENBQUMsQ0FBQTtnQkFDRixJQUFJLEdBQUcsR0FBZSxFQUFFLENBQUE7Z0JBQ3hCLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ3ZCLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQUMsSUFBSTt3QkFBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7NEJBQ3RFLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO2dCQUM3QyxDQUFDO2dCQUNELE1BQU0sQ0FBQyxHQUFHLENBQUE7WUFDWixDQUFDLENBQ0YsQ0FBQTtRQUNILENBQUM7UUFyRGEsbUNBQWlCLEdBQVcsK2lCQW9CN0MsQ0FBQTtRQWtDQyx3QkFBQztJQUFELENBdkRBLEFBdURDLElBQUE7SUF2RFksdUJBQWlCLG9CQXVEN0IsQ0FBQTtBQUVILENBQUMsRUF2RVMsS0FBSyxLQUFMLEtBQUssUUF1RWQiLCJmaWxlIjoic2NyaXB0cy9zcGFycWwtdHJlZS1zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIGZpYnJhIHtcbiAgJ3VzZSBzdHJpY3QnXG5cbiAgaW1wb3J0IHMgPSBmaS5zZWNvLnNwYXJxbFxuXG4gIGV4cG9ydCBjbGFzcyBUcmVlTm9kZSB7XG4gICAgLy8gcHVibGljIG1hdGNoaW5nSW5zdGFuY2VzOiBudW1iZXJcbiAgICBwdWJsaWMgY2hpbGRyZW46IFRyZWVOb2RlW10gPSBbXVxuICAgIHB1YmxpYyBpbnN0YW5jZXM6IG51bWJlclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBpZDogc3RyaW5nLCBwdWJsaWMgbGFiZWw6IHN0cmluZykge1xuICAgICAgLy8gdGhpcy5tYXRjaGluZ0luc3RhbmNlcyA9IGluc3RhbmNlc1xuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBTcGFycWxUcmVlU2VydmljZSB7XG4gICAgcHVibGljIHN0YXRpYyBnZXRDbGFzc1RyZWVRdWVyeTogc3RyaW5nID0gYFxuUFJFRklYIHNrb3M6IDxodHRwOi8vd3d3LnczLm9yZy8yMDA0LzAyL3Nrb3MvY29yZSM+XG5QUkVGSVggcmRmczogPGh0dHA6Ly93d3cudzMub3JnLzIwMDAvMDEvcmRmLXNjaGVtYSM+XG5QUkVGSVggc2Y6IDxodHRwOi8vbGRmLmZpL2Z1bmN0aW9ucyM+XG5TRUxFQ1QgP3N1YkNsYXNzID9zdXBlckNsYXNzID9jbGFzcyA/Y2xhc3NMYWJlbCA/aW5zdGFuY2VzIHtcbiAge1xuICAgID9zdWJDbGFzcyByZGZzOnN1YkNsYXNzT2YgP2NsYXNzIC5cbiAgICBGSUxURVIgRVhJU1RTIHtcbiAgICAgID9wIGEgP3N1YkNsYXNzIC5cbiAgICB9XG4gIH0gVU5JT04ge1xuICAgIHtcbiAgICAgIFNFTEVDVCA/Y2xhc3MgKENPVU5UKERJU1RJTkNUID9wKSBBUyA/aW5zdGFuY2VzKSB7XG4gICAgICAgID9wIGEgP2NsYXNzIC5cbiAgICAgIH1cbiAgICAgIEdST1VQIEJZID9jbGFzc1xuICAgIH1cbiAgfVxuICA/Y2xhc3Mgc2Y6cHJlZmVycmVkTGFuZ3VhZ2VMaXRlcmFsIChza29zOnByZWZMYWJlbCByZGZzOmxhYmVsIHNrb3M6YWx0TGFiZWwgJ2VuJyAnJyA/Y2xhc3NMYWJlbCkgLlxufVxuYFxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzcGFycWxTZXJ2aWNlOiBzLlNwYXJxbFNlcnZpY2UpIHt9XG5cbiAgICBwdWJsaWMgZ2V0VHJlZShlbmRwb2ludDogc3RyaW5nLCBxdWVyeTogc3RyaW5nLCBjYW5jZWxsZXI/OiBhbmd1bGFyLklQcm9taXNlPGFueT4pOiBhbmd1bGFyLklQcm9taXNlPFRyZWVOb2RlW10+IHtcbiAgICAgIHJldHVybiB0aGlzLnNwYXJxbFNlcnZpY2UucXVlcnkoZW5kcG9pbnQsIHF1ZXJ5LCB7dGltZW91dDogY2FuY2VsbGVyfSkudGhlbihcbiAgICAgICAgKHJlc3BvbnNlOiBhbmd1bGFyLklIdHRwUHJvbWlzZUNhbGxiYWNrQXJnPHMuSVNwYXJxbEJpbmRpbmdSZXN1bHQ8e1tpZDogc3RyaW5nXTogcy5JU3BhcnFsQmluZGluZ30+PikgPT4ge1xuICAgICAgICAgIGxldCBwYXJlbnRzOiB7W2lkOiBzdHJpbmddOiB7W2lkOiBzdHJpbmddOiBib29sZWFufX0gPSB7fVxuICAgICAgICAgIGxldCBjbGFzc2VzOiB7W2lkOiBzdHJpbmddOiBUcmVlTm9kZX0gPSB7fVxuICAgICAgICAgIHJlc3BvbnNlLmRhdGEucmVzdWx0cy5iaW5kaW5ncy5mb3JFYWNoKGJpbmRpbmcgPT4ge1xuICAgICAgICAgICAgaWYgKGJpbmRpbmdbJ2NsYXNzTGFiZWwnXSlcbiAgICAgICAgICAgICAgY2xhc3Nlc1tiaW5kaW5nWydjbGFzcyddLnZhbHVlXSA9IG5ldyBUcmVlTm9kZShiaW5kaW5nWydjbGFzcyddLnZhbHVlLCBiaW5kaW5nWydjbGFzc0xhYmVsJ10udmFsdWUpXG4gICAgICAgICAgICBpZiAoYmluZGluZ1snaW5zdGFuY2VzJ10pXG4gICAgICAgICAgICAgIGNsYXNzZXNbYmluZGluZ1snY2xhc3MnXS52YWx1ZV0uaW5zdGFuY2VzID0gcGFyc2VJbnQoYmluZGluZ1snaW5zdGFuY2VzJ10udmFsdWUsIDEwKVxuICAgICAgICAgICAgaWYgKGJpbmRpbmdbJ3N1YkNsYXNzJ10pIHtcbiAgICAgICAgICAgICAgbGV0IHN1YkNsYXNzOiBzdHJpbmcgPSBiaW5kaW5nWydzdWJDbGFzcyddLnZhbHVlXG4gICAgICAgICAgICAgIGlmICghcGFyZW50c1tzdWJDbGFzc10pIHBhcmVudHNbc3ViQ2xhc3NdID0ge31cbiAgICAgICAgICAgICAgcGFyZW50c1tzdWJDbGFzc11bYmluZGluZ1snY2xhc3MnXS52YWx1ZV0gPSB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYmluZGluZ1snc3VwZXJDbGFzcyddKSB7XG4gICAgICAgICAgICAgIGxldCBzdWJDbGFzczogc3RyaW5nID0gYmluZGluZ1snY2xhc3MnXS52YWx1ZVxuICAgICAgICAgICAgICBpZiAoIXBhcmVudHNbc3ViQ2xhc3NdKSBwYXJlbnRzW3N1YkNsYXNzXSA9IHt9XG4gICAgICAgICAgICAgIHBhcmVudHNbc3ViQ2xhc3NdW2JpbmRpbmdbJ3N1cGVyQ2xhc3MnXS52YWx1ZV0gPSB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICBsZXQgcmV0OiBUcmVlTm9kZVtdID0gW11cbiAgICAgICAgICBmb3IgKGxldCBpZCBpbiBjbGFzc2VzKSB7XG4gICAgICAgICAgICBpZiAoIXBhcmVudHNbaWRdKSByZXQucHVzaChjbGFzc2VzW2lkXSk7IGVsc2UgZm9yIChsZXQgcGlkIGluIHBhcmVudHNbaWRdKVxuICAgICAgICAgICAgICAgIGNsYXNzZXNbcGlkXS5jaGlsZHJlbi5wdXNoKGNsYXNzZXNbaWRdKVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmV0XG4gICAgICAgIH1cbiAgICAgIClcbiAgICB9XG4gIH1cblxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

var fibra;
(function (fibra) {
    'use strict';
    var SparqlTreeComponentController = (function () {
        function SparqlTreeComponentController($q, sparqlTreeService) {
            var _this = this;
            this.$q = $q;
            this.sparqlTreeService = sparqlTreeService;
            this.sparqlTreeService.getTree(this.endpoint, this.query).then(function (tree) { return _this.tree = tree; });
        }/*<auto_generate>*/SparqlTreeComponentController.$inject = ['$q','sparqlTreeService']; SparqlTreeComponentController.$componentName = 'SparqlTreeComponentController'/*</auto_generate>*/
        return SparqlTreeComponentController;
    }());/*<auto_generate>*/angular.module('fibra').controller('SparqlTreeComponentController',SparqlTreeComponentController);/*</auto_generate>*/
    var SparqlTreeComponent = (function () {
        function SparqlTreeComponent() {
            this.bindings = {
                endpoint: '<',
                query: '<',
            };
            this.controller = SparqlTreeComponentController;
            this.templateUrl = 'partials/sparql-tree.html';
        }/*<auto_generate>*/SparqlTreeComponent.$inject = []; SparqlTreeComponent.$componentName = 'sparqlTree'/*</auto_generate>*/
        return SparqlTreeComponent;
    }());/*<auto_generate>*/angular.module('fibra').component('sparqlTree',new SparqlTreeComponent());/*</auto_generate>*/
    fibra.SparqlTreeComponent = SparqlTreeComponent;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvc3BhcnFsLXRyZWUtY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQVUsS0FBSyxDQXFCZDtBQXJCRCxXQUFVLEtBQUssRUFBQyxDQUFDO0lBQ2YsWUFBWSxDQUFBO0lBQ1o7UUFJRSx1Q0FBb0IsRUFBcUIsRUFBVSxpQkFBb0M7WUFKekYsaUJBU0M7WUFMcUIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7WUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1lBQ3JGLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUM3RCxVQUFDLElBQWdCLElBQUssT0FBQSxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksRUFBaEIsQ0FBZ0IsQ0FDdkMsQ0FBQTtRQUNILENBQUM7UUFDSCxvQ0FBQztJQUFELENBVEEsQUFTQyxJQUFBO0lBRUQ7UUFBQTtZQUNXLGFBQVEsR0FBMkI7Z0JBQ3hDLFFBQVEsRUFBRSxHQUFHO2dCQUNiLEtBQUssRUFBRSxHQUFHO2FBQ1gsQ0FBQTtZQUNNLGVBQVUsR0FBYSw2QkFBNkIsQ0FBQTtZQUNwRCxnQkFBVyxHQUFXLDJCQUEyQixDQUFBO1FBQzVELENBQUM7UUFBRCwwQkFBQztJQUFELENBUEEsQUFPQyxJQUFBO0lBUFkseUJBQW1CLHNCQU8vQixDQUFBO0FBQ0gsQ0FBQyxFQXJCUyxLQUFLLEtBQUwsS0FBSyxRQXFCZCIsImZpbGUiOiJzY3JpcHRzL3NwYXJxbC10cmVlLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBmaWJyYSB7XG4gICd1c2Ugc3RyaWN0J1xuICBjbGFzcyBTcGFycWxUcmVlQ29tcG9uZW50Q29udHJvbGxlciB7XG4gICAgcHJpdmF0ZSBlbmRwb2ludDogc3RyaW5nXG4gICAgcHJpdmF0ZSBxdWVyeTogc3RyaW5nXG4gICAgcHJpdmF0ZSB0cmVlOiBUcmVlTm9kZVtdXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkcTogYW5ndWxhci5JUVNlcnZpY2UsIHByaXZhdGUgc3BhcnFsVHJlZVNlcnZpY2U6IFNwYXJxbFRyZWVTZXJ2aWNlKSB7XG4gICAgICB0aGlzLnNwYXJxbFRyZWVTZXJ2aWNlLmdldFRyZWUodGhpcy5lbmRwb2ludCAsIHRoaXMucXVlcnkpLnRoZW4oXG4gICAgICAgICh0cmVlOiBUcmVlTm9kZVtdKSA9PiB0aGlzLnRyZWUgPSB0cmVlXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIFNwYXJxbFRyZWVDb21wb25lbnQgaW1wbGVtZW50cyBhbmd1bGFyLklDb21wb25lbnRPcHRpb25zIHtcbiAgICAgIHB1YmxpYyBiaW5kaW5nczoge1tpZDogc3RyaW5nXTogc3RyaW5nfSA9IHtcbiAgICAgICAgZW5kcG9pbnQ6ICc8JyxcbiAgICAgICAgcXVlcnk6ICc8JyxcbiAgICAgIH1cbiAgICAgIHB1YmxpYyBjb250cm9sbGVyOiBGdW5jdGlvbiA9IFNwYXJxbFRyZWVDb21wb25lbnRDb250cm9sbGVyXG4gICAgICBwdWJsaWMgdGVtcGxhdGVVcmw6IHN0cmluZyA9ICdwYXJ0aWFscy9zcGFycWwtdHJlZS5odG1sJ1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

var fibra;
(function (fibra) {
    'use strict';
    var ResultsByDatasource = (function () {
        function ResultsByDatasource(id, title, resultsByGroup) {
            this.id = id;
            this.title = title;
            this.resultsByGroup = resultsByGroup;
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
        function Result(id, matchedLabel, prefLabel, additionalInformation) {
            this.id = id;
            this.matchedLabel = matchedLabel;
            this.prefLabel = prefLabel;
            this.additionalInformation = additionalInformation;
        }
        return Result;
    }());
    fibra.Result = Result;
    var SparqlAutocompleteService = (function () {
        function SparqlAutocompleteService($q, sparqlService) {
            this.$q = $q;
            this.sparqlService = sparqlService;
        }/*<auto_generate>*/SparqlAutocompleteService.$inject = ['$q','sparqlService']; SparqlAutocompleteService.$componentName = 'sparqlAutocompleteService'/*</auto_generate>*/
        SparqlAutocompleteService.prototype.autocomplete = function (query, constraints, limit, configurations, canceller) {
            var _this = this;
            return this.$q.all(configurations.map(function (configuration) {
                var queryTemplate = configuration.queryTemplate;
                queryTemplate = queryTemplate.replace(/<QUERY>/g, _this.sparqlService.stringToSPARQLString(query));
                if (constraints)
                    queryTemplate = queryTemplate.replace(/# CONSTRAINTS/g, constraints);
                queryTemplate = queryTemplate.replace(/<LIMIT>/g, '' + limit);
                return _this.sparqlService.query(configuration.endpoint, queryTemplate, { timeout: canceller }).then(function (response) {
                    var ret = [];
                    var groupToResults = {};
                    response.data.results.bindings.forEach(function (binding) {
                        if (!groupToResults[binding['groupId'].value])
                            groupToResults[binding['groupId'].value] = new ResultGroup(binding['groupLabel'].value);
                        groupToResults[binding['groupId'].value].results.push(new Result(binding['id'].value, binding['matchedLabel'].value, binding['prefLabel'].value, binding['additionalInformation'] ? binding['additionalInformation'].value : ''));
                    });
                    for (var groupId in groupToResults)
                        ret.push(groupToResults[groupId]);
                    return new ResultsByDatasource(configuration.id, configuration.title, ret);
                });
            }));
        };
        return SparqlAutocompleteService;
    }());/*<auto_generate>*/angular.module('fibra').service('sparqlAutocompleteService',SparqlAutocompleteService);/*</auto_generate>*/
    fibra.SparqlAutocompleteService = SparqlAutocompleteService;
})(fibra || (fibra = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvc3BhcnFsLWF1dG9jb21wbGV0ZS1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQVUsS0FBSyxDQWtEZDtBQWxERCxXQUFVLEtBQUssRUFBQyxDQUFDO0lBQ2YsWUFBWSxDQUFBO0lBSVo7UUFDRSw2QkFBbUIsRUFBVSxFQUFTLEtBQWEsRUFBUyxjQUE2QjtZQUF0RSxPQUFFLEdBQUYsRUFBRSxDQUFRO1lBQVMsVUFBSyxHQUFMLEtBQUssQ0FBUTtZQUFTLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBQUcsQ0FBQztRQUMvRiwwQkFBQztJQUFELENBRkEsQUFFQyxJQUFBO0lBRlkseUJBQW1CLHNCQUUvQixDQUFBO0lBRUQ7UUFFRSxxQkFBbUIsS0FBYTtZQUFiLFVBQUssR0FBTCxLQUFLLENBQVE7WUFEekIsWUFBTyxHQUFhLEVBQUUsQ0FBQTtRQUNNLENBQUM7UUFDdEMsa0JBQUM7SUFBRCxDQUhBLEFBR0MsSUFBQTtJQUhZLGlCQUFXLGNBR3ZCLENBQUE7SUFFRDtRQUNFLGdCQUFtQixFQUFVLEVBQVMsWUFBb0IsRUFBUyxTQUFpQixFQUFTLHFCQUE2QjtZQUF2RyxPQUFFLEdBQUYsRUFBRSxDQUFRO1lBQVMsaUJBQVksR0FBWixZQUFZLENBQVE7WUFBUyxjQUFTLEdBQVQsU0FBUyxDQUFRO1lBQVMsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUFRO1FBQUcsQ0FBQztRQUNoSSxhQUFDO0lBQUQsQ0FGQSxBQUVDLElBQUE7SUFGWSxZQUFNLFNBRWxCLENBQUE7SUFTRDtRQUNFLG1DQUFvQixFQUFxQixFQUFVLGFBQThCO1lBQTdELE9BQUUsR0FBRixFQUFFLENBQW1CO1lBQVUsa0JBQWEsR0FBYixhQUFhLENBQWlCO1FBQUksQ0FBQztRQUUvRSxnREFBWSxHQUFuQixVQUFvQixLQUFhLEVBQUUsV0FBbUIsRUFBRSxLQUFhLEVBQUUsY0FBb0QsRUFBRSxTQUFpQztZQUE5SixpQkFtQkM7WUFsQkMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsVUFBQSxhQUFhO2dCQUNqRCxJQUFJLGFBQWEsR0FBVyxhQUFhLENBQUMsYUFBYSxDQUFBO2dCQUN2RCxhQUFhLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsS0FBSSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO2dCQUNqRyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUM7b0JBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsV0FBVyxDQUFDLENBQUE7Z0JBQ3JGLGFBQWEsR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUE7Z0JBQzdELE1BQU0sQ0FBQyxLQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLGFBQWEsRUFBRSxFQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FDL0YsVUFBQyxRQUFtRztvQkFDbEcsSUFBSSxHQUFHLEdBQWtCLEVBQUUsQ0FBQTtvQkFDM0IsSUFBSSxjQUFjLEdBQXFDLEVBQUUsQ0FBQTtvQkFDekQsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLE9BQU87d0JBQzVDLEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQTt3QkFDdEksY0FBYyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxHQUFHLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFBO29CQUNuTyxDQUFDLENBQUMsQ0FBQTtvQkFDRixHQUFHLENBQUMsQ0FBQyxJQUFJLE9BQU8sSUFBSSxjQUFjLENBQUM7d0JBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtvQkFDckUsTUFBTSxDQUFDLElBQUksbUJBQW1CLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxhQUFhLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFBO2dCQUM1RSxDQUFDLENBQ0YsQ0FBQTtZQUNILENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDTCxDQUFDO1FBQ0gsZ0NBQUM7SUFBRCxDQXZCQSxBQXVCQyxJQUFBO0lBdkJZLCtCQUF5Qiw0QkF1QnJDLENBQUE7QUFFSCxDQUFDLEVBbERTLEtBQUssS0FBTCxLQUFLLFFBa0RkIiwiZmlsZSI6InNjcmlwdHMvc3BhcnFsLWF1dG9jb21wbGV0ZS1zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIGZpYnJhIHtcbiAgJ3VzZSBzdHJpY3QnXG5cbiAgaW1wb3J0IHMgPSBmaS5zZWNvLnNwYXJxbFxuXG4gIGV4cG9ydCBjbGFzcyBSZXN1bHRzQnlEYXRhc291cmNlIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgaWQ6IHN0cmluZywgcHVibGljIHRpdGxlOiBzdHJpbmcsIHB1YmxpYyByZXN1bHRzQnlHcm91cDogUmVzdWx0R3JvdXBbXSkge31cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBSZXN1bHRHcm91cCB7XG4gICAgcHVibGljIHJlc3VsdHM6IFJlc3VsdFtdID0gW11cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbGFiZWw6IHN0cmluZykge31cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBSZXN1bHQge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBpZDogc3RyaW5nLCBwdWJsaWMgbWF0Y2hlZExhYmVsOiBzdHJpbmcsIHB1YmxpYyBwcmVmTGFiZWw6IHN0cmluZywgcHVibGljIGFkZGl0aW9uYWxJbmZvcm1hdGlvbjogc3RyaW5nKSB7fVxuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBJU3BhcnFsQXV0b2NvbXBsZXRpb25Db25maWd1cmF0aW9uIHtcbiAgICBpZDogc3RyaW5nXG4gICAgdGl0bGU6IHN0cmluZ1xuICAgIGVuZHBvaW50OiBzdHJpbmdcbiAgICBxdWVyeVRlbXBsYXRlOiBzdHJpbmdcbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBTcGFycWxBdXRvY29tcGxldGVTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRxOiBhbmd1bGFyLklRU2VydmljZSwgcHJpdmF0ZSBzcGFycWxTZXJ2aWNlOiBzLlNwYXJxbFNlcnZpY2UpIHsgfVxuXG4gICAgcHVibGljIGF1dG9jb21wbGV0ZShxdWVyeTogc3RyaW5nLCBjb25zdHJhaW50czogc3RyaW5nLCBsaW1pdDogbnVtYmVyLCBjb25maWd1cmF0aW9uczogSVNwYXJxbEF1dG9jb21wbGV0aW9uQ29uZmlndXJhdGlvbltdLCBjYW5jZWxsZXI/OiBhbmd1bGFyLklQcm9taXNlPGFueT4pOiBhbmd1bGFyLklQcm9taXNlPFJlc3VsdHNCeURhdGFzb3VyY2VbXT4ge1xuICAgICAgcmV0dXJuIHRoaXMuJHEuYWxsKGNvbmZpZ3VyYXRpb25zLm1hcChjb25maWd1cmF0aW9uID0+IHtcbiAgICAgICAgbGV0IHF1ZXJ5VGVtcGxhdGU6IHN0cmluZyA9IGNvbmZpZ3VyYXRpb24ucXVlcnlUZW1wbGF0ZVxuICAgICAgICBxdWVyeVRlbXBsYXRlID0gcXVlcnlUZW1wbGF0ZS5yZXBsYWNlKC88UVVFUlk+L2csIHRoaXMuc3BhcnFsU2VydmljZS5zdHJpbmdUb1NQQVJRTFN0cmluZyhxdWVyeSkpXG4gICAgICAgIGlmIChjb25zdHJhaW50cykgcXVlcnlUZW1wbGF0ZSA9IHF1ZXJ5VGVtcGxhdGUucmVwbGFjZSgvIyBDT05TVFJBSU5UUy9nLCBjb25zdHJhaW50cylcbiAgICAgICAgcXVlcnlUZW1wbGF0ZSA9IHF1ZXJ5VGVtcGxhdGUucmVwbGFjZSgvPExJTUlUPi9nLCAnJyArIGxpbWl0KVxuICAgICAgICByZXR1cm4gdGhpcy5zcGFycWxTZXJ2aWNlLnF1ZXJ5KGNvbmZpZ3VyYXRpb24uZW5kcG9pbnQsIHF1ZXJ5VGVtcGxhdGUsIHt0aW1lb3V0OiBjYW5jZWxsZXJ9KS50aGVuKFxuICAgICAgICAgIChyZXNwb25zZTogYW5ndWxhci5JSHR0cFByb21pc2VDYWxsYmFja0FyZzxzLklTcGFycWxCaW5kaW5nUmVzdWx0PHtbaWQ6IHN0cmluZ106IHMuSVNwYXJxbEJpbmRpbmd9Pj4pID0+IHtcbiAgICAgICAgICAgIGxldCByZXQ6IFJlc3VsdEdyb3VwW10gPSBbXVxuICAgICAgICAgICAgbGV0IGdyb3VwVG9SZXN1bHRzOiB7W2dyb3VwSWQ6IHN0cmluZ106IFJlc3VsdEdyb3VwfSA9IHt9XG4gICAgICAgICAgICByZXNwb25zZS5kYXRhLnJlc3VsdHMuYmluZGluZ3MuZm9yRWFjaChiaW5kaW5nID0+IHtcbiAgICAgICAgICAgICAgaWYgKCFncm91cFRvUmVzdWx0c1tiaW5kaW5nWydncm91cElkJ10udmFsdWVdKSBncm91cFRvUmVzdWx0c1tiaW5kaW5nWydncm91cElkJ10udmFsdWVdID0gbmV3IFJlc3VsdEdyb3VwKGJpbmRpbmdbJ2dyb3VwTGFiZWwnXS52YWx1ZSlcbiAgICAgICAgICAgICAgZ3JvdXBUb1Jlc3VsdHNbYmluZGluZ1snZ3JvdXBJZCddLnZhbHVlXS5yZXN1bHRzLnB1c2gobmV3IFJlc3VsdChiaW5kaW5nWydpZCddLnZhbHVlLCBiaW5kaW5nWydtYXRjaGVkTGFiZWwnXS52YWx1ZSwgYmluZGluZ1sncHJlZkxhYmVsJ10udmFsdWUsIGJpbmRpbmdbJ2FkZGl0aW9uYWxJbmZvcm1hdGlvbiddID8gYmluZGluZ1snYWRkaXRpb25hbEluZm9ybWF0aW9uJ10udmFsdWUgOiAnJykpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgZm9yIChsZXQgZ3JvdXBJZCBpbiBncm91cFRvUmVzdWx0cykgcmV0LnB1c2goZ3JvdXBUb1Jlc3VsdHNbZ3JvdXBJZF0pXG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlc3VsdHNCeURhdGFzb3VyY2UoY29uZmlndXJhdGlvbi5pZCwgY29uZmlndXJhdGlvbi50aXRsZSwgcmV0KVxuICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgICAgfSkpXG4gICAgfVxuICB9XG5cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

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
                _this.sparqlAutocompleteService.autocomplete(query, _this.constraints, _this.limit, _this.configurations, _this.canceller.promise).then(function (resultsByDatasource) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvc3BhcnFsLWF1dG9jb21wbGV0ZS1jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBVSxLQUFLLENBb0NkO0FBcENELFdBQVUsS0FBSyxFQUFDLENBQUM7SUFDZixZQUFZLENBQUE7SUFDWjtRQW1CRSwrQ0FBb0IsRUFBcUIsRUFBVSx5QkFBb0Q7WUFuQnpHLGlCQXNCQztZQUhxQixPQUFFLEdBQUYsRUFBRSxDQUFtQjtZQUFVLDhCQUF5QixHQUF6Qix5QkFBeUIsQ0FBMkI7WUFYaEcsYUFBUSxHQUE0QixVQUFDLEtBQWE7Z0JBQ3ZELEtBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFBO2dCQUN4QixLQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFBO2dCQUN4QixLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUE7Z0JBQ2hDLEtBQUksQ0FBQyx5QkFBeUIsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEtBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSSxDQUFDLEtBQUssRUFBRSxLQUFJLENBQUMsY0FBYyxFQUFFLEtBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUNoSSxVQUFDLG1CQUEwQztvQkFDekMsS0FBSSxDQUFDLG1CQUFtQixHQUFHLG1CQUFtQixDQUFBO29CQUM5QyxLQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQTtnQkFDM0IsQ0FBQyxDQUNGLENBQUE7WUFDSCxDQUFDLENBQUE7WUFFQyxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUM3QixDQUFDO1FBQ0gsNENBQUM7SUFBRCxDQXRCQSxBQXNCQyxJQUFBO0lBRUQ7UUFBQTtZQUNXLGFBQVEsR0FBMkI7Z0JBQ3hDLGNBQWMsRUFBRSxHQUFHO2dCQUNuQixXQUFXLEVBQUUsR0FBRztnQkFDaEIsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsUUFBUSxFQUFFLEdBQUc7YUFDZCxDQUFBO1lBQ00sZUFBVSxHQUFhLHFDQUFxQyxDQUFBO1lBQzVELGdCQUFXLEdBQVcsbUNBQW1DLENBQUE7UUFDcEUsQ0FBQztRQUFELGtDQUFDO0lBQUQsQ0FUQSxBQVNDLElBQUE7SUFUWSxpQ0FBMkIsOEJBU3ZDLENBQUE7QUFDSCxDQUFDLEVBcENTLEtBQUssS0FBTCxLQUFLLFFBb0NkIiwiZmlsZSI6InNjcmlwdHMvc3BhcnFsLWF1dG9jb21wbGV0ZS1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgZmlicmEge1xuICAndXNlIHN0cmljdCdcbiAgY2xhc3MgU3BhcnFsQXV0b2NvbXBsZXRlQ29tcG9uZW50Q29udHJvbGxlciB7XG4gICAgcHVibGljIGNvbmZpZ3VyYXRpb25zOiBJU3BhcnFsQXV0b2NvbXBsZXRpb25Db25maWd1cmF0aW9uW11cbiAgICBwdWJsaWMgbGltaXQ6IG51bWJlclxuICAgIHB1YmxpYyBjb25zdHJhaW50czogc3RyaW5nXG4gICAgcHVibGljIHF1ZXJ5UnVubmluZzogYm9vbGVhblxuICAgIHB1YmxpYyBvblNlbGVjdDogKHNlbGVjdGlvbjogUmVzdWx0KSA9PiB2b2lkXG4gICAgcHJpdmF0ZSByZXN1bHRzQnlEYXRhc291cmNlOiBSZXN1bHRzQnlEYXRhc291cmNlW11cbiAgICBwcml2YXRlIGNhbmNlbGxlcjogYW5ndWxhci5JRGVmZXJyZWQ8YW55PlxuICAgIHB1YmxpYyBvbkNoYW5nZTogKHF1ZXJ5OiBzdHJpbmcpID0+IHZvaWQgPSAocXVlcnk6IHN0cmluZykgPT4ge1xuICAgICAgdGhpcy5xdWVyeVJ1bm5pbmcgPSB0cnVlXG4gICAgICB0aGlzLmNhbmNlbGxlci5yZXNvbHZlKClcbiAgICAgIHRoaXMuY2FuY2VsbGVyID0gdGhpcy4kcS5kZWZlcigpXG4gICAgICB0aGlzLnNwYXJxbEF1dG9jb21wbGV0ZVNlcnZpY2UuYXV0b2NvbXBsZXRlKHF1ZXJ5LCB0aGlzLmNvbnN0cmFpbnRzLCB0aGlzLmxpbWl0LCB0aGlzLmNvbmZpZ3VyYXRpb25zLCB0aGlzLmNhbmNlbGxlci5wcm9taXNlKS50aGVuKFxuICAgICAgICAocmVzdWx0c0J5RGF0YXNvdXJjZTogUmVzdWx0c0J5RGF0YXNvdXJjZVtdKSA9PiB7XG4gICAgICAgICAgdGhpcy5yZXN1bHRzQnlEYXRhc291cmNlID0gcmVzdWx0c0J5RGF0YXNvdXJjZVxuICAgICAgICAgIHRoaXMucXVlcnlSdW5uaW5nID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgKVxuICAgIH1cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRxOiBhbmd1bGFyLklRU2VydmljZSwgcHJpdmF0ZSBzcGFycWxBdXRvY29tcGxldGVTZXJ2aWNlOiBTcGFycWxBdXRvY29tcGxldGVTZXJ2aWNlKSB7XG4gICAgICB0aGlzLmNhbmNlbGxlciA9ICRxLmRlZmVyKClcbiAgICB9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgU3BhcnFsQXV0b2NvbXBsZXRlQ29tcG9uZW50IGltcGxlbWVudHMgYW5ndWxhci5JQ29tcG9uZW50T3B0aW9ucyB7XG4gICAgICBwdWJsaWMgYmluZGluZ3M6IHtbaWQ6IHN0cmluZ106IHN0cmluZ30gPSB7XG4gICAgICAgIGNvbmZpZ3VyYXRpb25zOiAnPCcsXG4gICAgICAgIGNvbnN0cmFpbnRzOiAnPCcsXG4gICAgICAgIGxpbWl0OiAnQCcsXG4gICAgICAgIG9uU2VsZWN0OiAnJidcbiAgICAgIH1cbiAgICAgIHB1YmxpYyBjb250cm9sbGVyOiBGdW5jdGlvbiA9IFNwYXJxbEF1dG9jb21wbGV0ZUNvbXBvbmVudENvbnRyb2xsZXJcbiAgICAgIHB1YmxpYyB0ZW1wbGF0ZVVybDogc3RyaW5nID0gJ3BhcnRpYWxzL3NwYXJxbC1hdXRvY29tcGxldGUuaHRtbCdcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

(function(module) {
try {
  module = angular.module('app');
} catch (e) {
  module = angular.module('app', []);
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
    '          <h4>Class tree</h4>\n' +
    '          <sparql-tree endpoint="\'http://ldf.fi/procope/sparql\'" query="getClassTreeQuery"></sparql-tree>\n' +
    '        </div>\n' +
    '        <div class="col-md-4" id="middle-column">\n' +
    '          <h4>Autocompletion</h4>\n' +
    '          <sparql-autocomplete configurations="acConfig" limit="30"></sparql-autocomplete>\n' +
    '        </div>\n' +
    '        <div class="col-md-5" id="right-column"></div>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </body>\n' +
    '</html>');
}]);
})();

(function(module) {
try {
  module = angular.module('app');
} catch (e) {
  module = angular.module('app', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('partials/sparql-autocomplete.html',
    '\n' +
    '<div class="form-group">\n' +
    '  <input class="form-control" ng-model="query" ng-model-options="{ debounce: 500 }" ng-change="$ctrl.onChange(query)"/><span class="glyphicon glyphicon-refresh fa-spin form-control-feedback" ng-show="$ctrl.queryRunning"></span>\n' +
    '</div>\n' +
    '<div ng-repeat="datasource in $ctrl.resultsByDatasource track by $index">\n' +
    '  <h4>{{datasource.title}}</h4>\n' +
    '  <ul>\n' +
    '    <li ng-repeat="group in datasource.resultsByGroup track by $index">{{group.label}}\n' +
    '      <ul>\n' +
    '        <li ng-repeat="result in group.results track by $index">{{result.matchedLabel}}<span ng-if="result.matchedLabel !== result.prefLabel">-&gt; {{result.prefLabel}}</span><span ng-if="result.additionalInformation!=\'\'">&nbsp;({{result.additionalInformation}})</span></li>\n' +
    '      </ul>\n' +
    '    </li>\n' +
    '  </ul>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('app');
} catch (e) {
  module = angular.module('app', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('partials/sparql-tree.html',
    '\n' +
    '<script type="text/ng-template" id="sparql-treenode.html"><span>{{node.label}}</span><span class="pull-right">{{node.matchingInstances != node.matchingInstances ? node.matchingInstances+\'/\'+node.instances : node.instances}}</span>\n' +
    '  <ul>\n' +
    '    <li ng-repeat="node in node.children" ng-include="\'sparql-treenode.html\'" ng-click="selectElement(node,$event.ctrlKey);$event.stopPropagation()" ng-class="{selected:isSelected(node)}"></li>\n' +
    '  </ul>\n' +
    '</script>\n' +
    '<ul>\n' +
    '  <li ng-repeat="node in $ctrl.tree" ng-include="\'sparql-treenode.html\'" ng-click="selectElement(node,$event.ctrlKey);$event.stopPropagation()" ng-class="{selected:isSelected(node)}"></li>\n' +
    '</ul>');
}]);
})();
