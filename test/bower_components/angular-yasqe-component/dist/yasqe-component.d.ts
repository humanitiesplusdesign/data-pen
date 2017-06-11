/// <reference types="angular" />
declare namespace fi.seco.yasqe {
    interface IYasqeComponentBindingChanges {
        content?: angular.IChangesObject<string>;
        endpoint?: angular.IChangesObject<string>;
    }
    class YasqeComponentController implements angular.IComponentController {
        private $element;
        private $timeout;
        onQueryResults: (vars: {
            results: any;
        }) => void;
        onContentChanged: (vars: {
            content: string;
        }) => void;
        onInit: (vars: {
            yasqe: any;
        }) => void;
        endpoint: string;
        content: string;
        showQueryButton: string;
        private yasqe;
        constructor($element: angular.IAugmentedJQuery, $timeout: angular.ITimeoutService);
        $postLink(): void;
        $onChanges(changes: IYasqeComponentBindingChanges): void;
    }
    class YasqeComponent implements angular.IComponentOptions {
        bindings: {
            [id: string]: string;
        };
        controller: string;
    }
}
