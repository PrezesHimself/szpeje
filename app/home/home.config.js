(function() {
  'use strict';

    angular.module('szpeje.home',
    ['ui.router'])
    .config(function($stateProvider) {
        $stateProvider
            .state('app.home', {
                url: 'app/home',
                templateUrl: 'app/tpl/home/home.tpl.html',
                controller: 'HomeController',
                controllerAs: 'vm'
            });
    });

}());
