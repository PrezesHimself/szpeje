(function() {
  'use strict';

    angular.module('szpeje.home',
    ['ui.router'])
    .config(function($stateProvider) {
        $stateProvider
            .state('app.home', {
                url: 'home',
                templateUrl: 'home/home.tpl.html',
                controller: 'HomeController',
                controllerAs: 'vm'
            });
    })
    .run(function() {
      console.log('test');
    })

}());
