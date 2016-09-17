(function() {
  'use strict';

    angular.module('szpeje.catalog',
    ['ui.router'])
    .config(function($stateProvider) {
        $stateProvider
            .state('app.catalog', {
                url: 'catalog/:catgoryId?/:itemId?',
                templateUrl: 'app/tpl/catalog/catalog.tpl.html',
                controller: 'CatalogController',
                controllerAs: 'vm'
            });
    });

}());
