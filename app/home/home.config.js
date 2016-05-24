(function() {
  'use strict';

    angular.module('szpeje.home',
    ['ui.router'])
    .config(function($stateProvider) {
        $stateProvider
            .state('app.home', {
                url: 'home',
                templateUrl: 'tpl/home/home.tpl.html',
                controller: 'HomeController',
                controllerAs: 'vm'
            });
    });

}());
