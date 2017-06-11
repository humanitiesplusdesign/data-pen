angular.module('fi.seco.yasqe', []);
var fi;
(function (fi) {
    var seco;
    (function (seco) {
        var yasqe;
        (function (yasqe) {
            'use strict';
            var YasqeComponentController = (function () {
                function YasqeComponentController($element, $timeout) {
                    this.$element = $element;
                    this.$timeout = $timeout;
                }
                YasqeComponentController.prototype.$postLink = function () {
                    var _this = this;
                    if (!this.content)
                        this.content = '';
                    this.yasqe = YASQE(this.$element[0], { createShareLink: false, sparql: { endpoint: this.endpoint, callbacks: { complete: function (results) { return _this.onQueryResults({ results: results }); } }, showQueryButton: this.showQueryButton } });
                    this.yasqe.setValue(this.content);
                    this.yasqe.on('change', function () { return _this.onContentChanged({ content: _this.yasqe.getValue() }); });
                    this.onInit({ yasqe: this.yasqe });
                };
                YasqeComponentController.prototype.$onChanges = function (changes) {
                    if (changes.endpoint && !changes.endpoint.isFirstChange())
                        this.yasqe.options.sparql.endpoint = changes.endpoint.currentValue;
                    if (changes.content && !changes.content.isFirstChange() && changes.content.currentValue !== this.yasqe.getValue())
                        this.yasqe.setValue(changes.content.currentValue);
                };
                return YasqeComponentController;
            }());/*<auto_generate>*/angular.module('fi.seco.yasqe').controller('YasqeComponentController',['$element','$timeout',function(){return new (Function.prototype.bind.apply(YasqeComponentController,[null].concat(Array.prototype.slice.apply(arguments))));}]);/*</auto_generate>*/
            yasqe.YasqeComponentController = YasqeComponentController;
            var YasqeComponent = (function () {
                function YasqeComponent() {
                    this.bindings = {
                        content: '<',
                        onContentChanged: '&',
                        onQueryResults: '&',
                        endpoint: '<',
                        onInit: '&',
                        showQueryButton: '@'
                    };
                    this.controller = 'YasqeComponentController'; // (new (...args: any[]) => angular.IController) = SelectViewComponentController
                }
                return YasqeComponent;
            }());/*<auto_generate>*/angular.module('fi.seco.yasqe').component('yasqe',new YasqeComponent());/*</auto_generate>*/
            yasqe.YasqeComponent = YasqeComponent;
        })(yasqe = seco.yasqe || (seco.yasqe = {}));
    })(seco = fi.seco || (fi.seco = {}));
})(fi || (fi = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy95YXNxZS1jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDLENBQUE7QUFDbkMsSUFBVSxFQUFFLENBK0NYO0FBL0NELFdBQVUsRUFBRTtJQUFDLElBQUEsSUFBSSxDQStDaEI7SUEvQ1ksV0FBQSxJQUFJO1FBQUMsSUFBQSxLQUFLLENBK0N0QjtRQS9DaUIsV0FBQSxLQUFLO1lBQ3JCLFlBQVksQ0FBQTtZQVNaO2dCQVdFLGtDQUFvQixRQUFrQyxFQUFVLFFBQWlDO29CQUE3RSxhQUFRLEdBQVIsUUFBUSxDQUEwQjtvQkFBVSxhQUFRLEdBQVIsUUFBUSxDQUF5QjtnQkFBRyxDQUFDO2dCQUM5Riw0Q0FBUyxHQUFoQjtvQkFBQSxpQkFNQztvQkFMQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7d0JBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUE7b0JBQ3BDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBQyxlQUFlLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxFQUFFLFFBQVEsRUFBRSxVQUFDLE9BQU8sSUFBSyxPQUFBLEtBQUksQ0FBQyxjQUFjLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDLENBQUMsRUFBdkMsQ0FBdUMsRUFBQyxFQUFFLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFLEVBQUMsQ0FBQyxDQUFBO29CQUN4TixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7b0JBQ2pDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxjQUFNLE9BQUEsS0FBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUMsT0FBTyxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEVBQUMsQ0FBQyxFQUF2RCxDQUF1RCxDQUFDLENBQUE7b0JBQ3RGLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBQyxDQUFDLENBQUE7Z0JBQ2xDLENBQUM7Z0JBQ00sNkNBQVUsR0FBakIsVUFBa0IsT0FBc0M7b0JBQ3RELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxDQUFDO3dCQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUE7b0JBQzdILEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsWUFBWSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7d0JBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQTtnQkFDdEssQ0FBQztnQkFDSCwrQkFBQztZQUFELENBdkJBLEFBdUJDLElBQUE7WUF2QlksOEJBQXdCLDJCQXVCcEMsQ0FBQTtZQUVEO2dCQUFBO29CQUNTLGFBQVEsR0FBMkI7d0JBQ3hDLE9BQU8sRUFBRSxHQUFHO3dCQUNaLGdCQUFnQixFQUFFLEdBQUc7d0JBQ3JCLGNBQWMsRUFBRSxHQUFHO3dCQUNuQixRQUFRLEVBQUUsR0FBRzt3QkFDYixNQUFNLEVBQUUsR0FBRzt3QkFDWCxlQUFlLEVBQUUsR0FBRztxQkFDckIsQ0FBQTtvQkFDTSxlQUFVLEdBQVcsMEJBQTBCLENBQUEsQ0FBQyxnRkFBZ0Y7Z0JBQ3pJLENBQUM7Z0JBQUQscUJBQUM7WUFBRCxDQVZBLEFBVUMsSUFBQTtZQVZZLG9CQUFjLGlCQVUxQixDQUFBO1FBRUgsQ0FBQyxFQS9DaUIsS0FBSyxHQUFMLFVBQUssS0FBTCxVQUFLLFFBK0N0QjtJQUFELENBQUMsRUEvQ1ksSUFBSSxHQUFKLE9BQUksS0FBSixPQUFJLFFBK0NoQjtBQUFELENBQUMsRUEvQ1MsRUFBRSxLQUFGLEVBQUUsUUErQ1giLCJmaWxlIjoieWFzcWUtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ2ZpLnNlY28ueWFzcWUnLCBbXSlcbm5hbWVzcGFjZSBmaS5zZWNvLnlhc3FlIHtcbiAgJ3VzZSBzdHJpY3QnXG5cbiAgZGVjbGFyZSB2YXIgWUFTUUU6IGFueVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgSVlhc3FlQ29tcG9uZW50QmluZGluZ0NoYW5nZXMge1xuICAgIGNvbnRlbnQ/OiBhbmd1bGFyLklDaGFuZ2VzT2JqZWN0PHN0cmluZz5cbiAgICBlbmRwb2ludD86IGFuZ3VsYXIuSUNoYW5nZXNPYmplY3Q8c3RyaW5nPlxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIFlhc3FlQ29tcG9uZW50Q29udHJvbGxlciBpbXBsZW1lbnRzIGFuZ3VsYXIuSUNvbXBvbmVudENvbnRyb2xsZXIge1xuXG4gICAgcHVibGljIG9uUXVlcnlSZXN1bHRzOiAodmFyczoge3Jlc3VsdHM6IGFueX0pID0+IHZvaWRcbiAgICBwdWJsaWMgb25Db250ZW50Q2hhbmdlZDogKHZhcnM6IHtjb250ZW50OiBzdHJpbmd9KSA9PiB2b2lkXG4gICAgcHVibGljIG9uSW5pdDogKHZhcnM6IHt5YXNxZTogYW55fSkgPT4gdm9pZFxuICAgIHB1YmxpYyBlbmRwb2ludDogc3RyaW5nXG4gICAgcHVibGljIGNvbnRlbnQ6IHN0cmluZ1xuICAgIHB1YmxpYyBzaG93UXVlcnlCdXR0b246IHN0cmluZ1xuXG4gICAgcHJpdmF0ZSB5YXNxZTogYW55XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRlbGVtZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnksIHByaXZhdGUgJHRpbWVvdXQ6IGFuZ3VsYXIuSVRpbWVvdXRTZXJ2aWNlKSB7fVxuICAgIHB1YmxpYyAkcG9zdExpbmsoKTogdm9pZCB7XG4gICAgICBpZiAoIXRoaXMuY29udGVudCkgdGhpcy5jb250ZW50ID0gJydcbiAgICAgIHRoaXMueWFzcWUgPSBZQVNRRSh0aGlzLiRlbGVtZW50WzBdLCB7Y3JlYXRlU2hhcmVMaW5rOiBmYWxzZSwgc3BhcnFsOiB7IGVuZHBvaW50OiB0aGlzLmVuZHBvaW50LCBjYWxsYmFja3M6IHsgY29tcGxldGU6IChyZXN1bHRzKSA9PiB0aGlzLm9uUXVlcnlSZXN1bHRzKHtyZXN1bHRzOiByZXN1bHRzfSl9LCBzaG93UXVlcnlCdXR0b246IHRoaXMuc2hvd1F1ZXJ5QnV0dG9uIH19KVxuICAgICAgdGhpcy55YXNxZS5zZXRWYWx1ZSh0aGlzLmNvbnRlbnQpXG4gICAgICB0aGlzLnlhc3FlLm9uKCdjaGFuZ2UnLCAoKSA9PiB0aGlzLm9uQ29udGVudENoYW5nZWQoe2NvbnRlbnQ6IHRoaXMueWFzcWUuZ2V0VmFsdWUoKX0pKVxuICAgICAgdGhpcy5vbkluaXQoe3lhc3FlOiB0aGlzLnlhc3FlfSlcbiAgICB9XG4gICAgcHVibGljICRvbkNoYW5nZXMoY2hhbmdlczogSVlhc3FlQ29tcG9uZW50QmluZGluZ0NoYW5nZXMpOiB2b2lkIHtcbiAgICAgIGlmIChjaGFuZ2VzLmVuZHBvaW50ICYmICFjaGFuZ2VzLmVuZHBvaW50LmlzRmlyc3RDaGFuZ2UoKSkgdGhpcy55YXNxZS5vcHRpb25zLnNwYXJxbC5lbmRwb2ludCA9IGNoYW5nZXMuZW5kcG9pbnQuY3VycmVudFZhbHVlXG4gICAgICBpZiAoY2hhbmdlcy5jb250ZW50ICYmICFjaGFuZ2VzLmNvbnRlbnQuaXNGaXJzdENoYW5nZSgpICYmIGNoYW5nZXMuY29udGVudC5jdXJyZW50VmFsdWUgIT09IHRoaXMueWFzcWUuZ2V0VmFsdWUoKSkgdGhpcy55YXNxZS5zZXRWYWx1ZShjaGFuZ2VzLmNvbnRlbnQuY3VycmVudFZhbHVlKVxuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBZYXNxZUNvbXBvbmVudCBpbXBsZW1lbnRzIGFuZ3VsYXIuSUNvbXBvbmVudE9wdGlvbnMge1xuICAgIHB1YmxpYyBiaW5kaW5nczoge1tpZDogc3RyaW5nXTogc3RyaW5nfSA9IHtcbiAgICAgIGNvbnRlbnQ6ICc8JyxcbiAgICAgIG9uQ29udGVudENoYW5nZWQ6ICcmJyxcbiAgICAgIG9uUXVlcnlSZXN1bHRzOiAnJicsXG4gICAgICBlbmRwb2ludDogJzwnLFxuICAgICAgb25Jbml0OiAnJicsXG4gICAgICBzaG93UXVlcnlCdXR0b246ICdAJ1xuICAgIH1cbiAgICBwdWJsaWMgY29udHJvbGxlcjogc3RyaW5nID0gJ1lhc3FlQ29tcG9uZW50Q29udHJvbGxlcicgLy8gKG5ldyAoLi4uYXJnczogYW55W10pID0+IGFuZ3VsYXIuSUNvbnRyb2xsZXIpID0gU2VsZWN0Vmlld0NvbXBvbmVudENvbnRyb2xsZXJcbiAgfVxuXG59XG4iXX0=
