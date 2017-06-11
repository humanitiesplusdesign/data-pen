/// <reference types="angular" />
declare namespace fi.seco.yasr {
    interface IYasrComponentBindingChanges {
        data?: angular.IChangesObject<string>;
        prefixes?: angular.IChangesObject<() => {}>;
    }
    class YasrComponentController implements angular.IComponentController {
        private $element;
        onInit: (vars: {
            yasr: any;
        }) => void;
        data: string;
        prefixes: () => {};
        private yasr;
        constructor($element: angular.IAugmentedJQuery);
        $postLink(): void;
        $onChanges(changes: IYasrComponentBindingChanges): void;
    }
    class YasrComponent implements angular.IComponentOptions {
        bindings: {
            [id: string]: string;
        };
        controller: string;
    }
}
