(function() {
  'use strict';

    angular.module('szpeje.about',
    ['ui.router'])
    .config(function($stateProvider) {
        $stateProvider
            .state('app.about', {
                url: 'about',
                templateUrl: 'app/tpl/about/about.tpl.html',
                controller: function() { console.log('noop') }
            });
    });

}());
