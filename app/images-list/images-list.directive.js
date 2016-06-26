(function() {
    'use strict';
    angular
        .module('szpeje.images-list')
        .directive('szpejeImagesList', szpejeImagesList);

    function szpejeImagesList() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/tpl/images-list/images-list.directive.tpl.html',
            scope: {
                szpeje: "=",
                search: "=?"
            },
            controller: ImagesListController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    ImagesListController.$inject = [];

    function ImagesListController() {
        var vm = this;

    }
}());
