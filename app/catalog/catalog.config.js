(function() {
  'use strict';

    angular.module('szpeje.catalog',
    ['ui.router'])
    .config(function($stateProvider) {
        $stateProvider
            .state('app.catalog', {
                url: 'catalog/:projectId',
                templateUrl: 'tpl/catalog/catalog.tpl.html',
                controller: 'CatalogController',
                controllerAs: 'vm'
            });
    });

}());
