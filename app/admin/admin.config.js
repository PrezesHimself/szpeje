(function() {
  'use strict';

    angular.module('szpeje.admin',
    ['ui.router'])
    .config(function($stateProvider) {
        $stateProvider
            .state('app.admin', {
                url: 'admin',
                templateUrl: 'app/tpl/admin/admin.tpl.html',
                controller: 'AdminController',
                controllerAs: 'vm'
            });
    });

}());
