angular.module('fi.seco.yasr', []);
var fi;
(function (fi) {
    var seco;
    (function (seco) {
        var yasr;
        (function (yasr) {
            'use strict';
            var YasrComponentController = (function () {
                function YasrComponentController($element) {
                    this.$element = $element;
                }
                YasrComponentController.prototype.$postLink = function () {
                    this.yasr = YASR(this.$element[0], { getUsedPrefixes: this.prefixes });
                    this.onInit({ yasr: this.yasr });
                };
                YasrComponentController.prototype.$onChanges = function (changes) {
                    if (this.yasr && changes.data && changes.data.currentValue)
                        this.yasr.setResponse(changes.data.currentValue);
                    if (this.yasr && changes.prefixes)
                        this.yasr.options.getUsedPrefixes = changes.prefixes.currentValue;
                };
                return YasrComponentController;
            }());/*<auto_generate>*/angular.module('fi.seco.yasqe').controller('YasrComponentController',['$element',function(){return new (Function.prototype.bind.apply(YasrComponentController,[null].concat(Array.prototype.slice.apply(arguments))));}]);/*</auto_generate>*/
            yasr.YasrComponentController = YasrComponentController;
            var YasrComponent = (function () {
                function YasrComponent() {
                    this.bindings = {
                        data: '<',
                        prefixes: '<',
                        onInit: '&'
                    };
                    this.controller = 'YasrComponentController'; // (new (...args: any[]) => angular.IController) = SelectViewComponentController
                }
                return YasrComponent;
            }());/*<auto_generate>*/angular.module('fi.seco.yasqe').component('yasr',new YasrComponent());/*</auto_generate>*/
            yasr.YasrComponent = YasrComponent;
        })(yasr = seco.yasr || (seco.yasr = {}));
    })(seco = fi.seco || (fi.seco = {}));
})(fi || (fi = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy95YXNyLWNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQTtBQUNsQyxJQUFVLEVBQUUsQ0FzQ1g7QUF0Q0QsV0FBVSxFQUFFO0lBQUMsSUFBQSxJQUFJLENBc0NoQjtJQXRDWSxXQUFBLElBQUk7UUFBQyxJQUFBLElBQUksQ0FzQ3JCO1FBdENpQixXQUFBLElBQUk7WUFDcEIsWUFBWSxDQUFBO1lBU1o7Z0JBUUUsaUNBQW9CLFFBQWtDO29CQUFsQyxhQUFRLEdBQVIsUUFBUSxDQUEwQjtnQkFBRyxDQUFDO2dCQUNuRCwyQ0FBUyxHQUFoQjtvQkFDRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsZUFBZSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUMsQ0FBQyxDQUFBO29CQUNyRSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFBO2dCQUNoQyxDQUFDO2dCQUNNLDRDQUFVLEdBQWpCLFVBQWtCLE9BQXFDO29CQUNyRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7d0JBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQTtvQkFDNUcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQTtnQkFDdEcsQ0FBQztnQkFDSCw4QkFBQztZQUFELENBakJBLEFBaUJDLElBQUE7WUFqQlksNEJBQXVCLDBCQWlCbkMsQ0FBQTtZQUVEO2dCQUFBO29CQUNTLGFBQVEsR0FBMkI7d0JBQ3hDLElBQUksRUFBRSxHQUFHO3dCQUNULFFBQVEsRUFBRSxHQUFHO3dCQUNiLE1BQU0sRUFBRSxHQUFHO3FCQUNaLENBQUE7b0JBQ00sZUFBVSxHQUFXLHlCQUF5QixDQUFBLENBQUMsZ0ZBQWdGO2dCQUN4SSxDQUFDO2dCQUFELG9CQUFDO1lBQUQsQ0FQQSxBQU9DLElBQUE7WUFQWSxrQkFBYSxnQkFPekIsQ0FBQTtRQUVILENBQUMsRUF0Q2lCLElBQUksR0FBSixTQUFJLEtBQUosU0FBSSxRQXNDckI7SUFBRCxDQUFDLEVBdENZLElBQUksR0FBSixPQUFJLEtBQUosT0FBSSxRQXNDaEI7QUFBRCxDQUFDLEVBdENTLEVBQUUsS0FBRixFQUFFLFFBc0NYIiwiZmlsZSI6Inlhc3ItY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ2ZpLnNlY28ueWFzcicsIFtdKVxubmFtZXNwYWNlIGZpLnNlY28ueWFzciB7XG4gICd1c2Ugc3RyaWN0J1xuXG4gIGRlY2xhcmUgdmFyIFlBU1I6IGFueVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgSVlhc3JDb21wb25lbnRCaW5kaW5nQ2hhbmdlcyB7XG4gICAgZGF0YT86IGFuZ3VsYXIuSUNoYW5nZXNPYmplY3Q8c3RyaW5nPlxuICAgIHByZWZpeGVzPzogYW5ndWxhci5JQ2hhbmdlc09iamVjdDwoKSA9PiB7fT5cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBZYXNyQ29tcG9uZW50Q29udHJvbGxlciBpbXBsZW1lbnRzIGFuZ3VsYXIuSUNvbXBvbmVudENvbnRyb2xsZXIge1xuXG4gICAgcHVibGljIG9uSW5pdDogKHZhcnM6IHt5YXNyOiBhbnl9KSA9PiB2b2lkXG4gICAgcHVibGljIGRhdGE6IHN0cmluZ1xuICAgIHB1YmxpYyBwcmVmaXhlczogKCkgPT4ge31cblxuICAgIHByaXZhdGUgeWFzcjogYW55XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRlbGVtZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnkpIHt9XG4gICAgcHVibGljICRwb3N0TGluaygpOiB2b2lkIHtcbiAgICAgIHRoaXMueWFzciA9IFlBU1IodGhpcy4kZWxlbWVudFswXSwgeyBnZXRVc2VkUHJlZml4ZXM6IHRoaXMucHJlZml4ZXN9KVxuICAgICAgdGhpcy5vbkluaXQoe3lhc3I6IHRoaXMueWFzcn0pXG4gICAgfVxuICAgIHB1YmxpYyAkb25DaGFuZ2VzKGNoYW5nZXM6IElZYXNyQ29tcG9uZW50QmluZGluZ0NoYW5nZXMpOiB2b2lkIHtcbiAgICAgIGlmICh0aGlzLnlhc3IgJiYgY2hhbmdlcy5kYXRhICYmIGNoYW5nZXMuZGF0YS5jdXJyZW50VmFsdWUpIHRoaXMueWFzci5zZXRSZXNwb25zZShjaGFuZ2VzLmRhdGEuY3VycmVudFZhbHVlKVxuICAgICAgaWYgKHRoaXMueWFzciAmJiBjaGFuZ2VzLnByZWZpeGVzKSB0aGlzLnlhc3Iub3B0aW9ucy5nZXRVc2VkUHJlZml4ZXMgPSBjaGFuZ2VzLnByZWZpeGVzLmN1cnJlbnRWYWx1ZVxuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBZYXNyQ29tcG9uZW50IGltcGxlbWVudHMgYW5ndWxhci5JQ29tcG9uZW50T3B0aW9ucyB7XG4gICAgcHVibGljIGJpbmRpbmdzOiB7W2lkOiBzdHJpbmddOiBzdHJpbmd9ID0ge1xuICAgICAgZGF0YTogJzwnLFxuICAgICAgcHJlZml4ZXM6ICc8JyxcbiAgICAgIG9uSW5pdDogJyYnXG4gICAgfVxuICAgIHB1YmxpYyBjb250cm9sbGVyOiBzdHJpbmcgPSAnWWFzckNvbXBvbmVudENvbnRyb2xsZXInIC8vIChuZXcgKC4uLmFyZ3M6IGFueVtdKSA9PiBhbmd1bGFyLklDb250cm9sbGVyKSA9IFNlbGVjdFZpZXdDb21wb25lbnRDb250cm9sbGVyXG4gIH1cblxufVxuIl19
