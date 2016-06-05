(function() {
    'use strict';
    angular
        .module('szpeje.loader')
        .directive('szpejeLoader', szpejeLoader);

    function szpejeLoader() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/tpl/loader/loader.directive.tpl.html',
            controller: LoaderController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    LoaderController.$inject = [];

    function LoaderController() {

    }
}());
