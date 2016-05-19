(function() {
  'use strict';

    angular.module('szpeje.contact',
    ['ui.router'])
    .config(function($stateProvider) {
        $stateProvider
            .state('app.contact', {
                url: 'contact',
                templateUrl: 'contact/contact.tpl.html',
                controller: 'ContactController',
                controllerAs: 'vm'
            });
    })
    .run(function() {
      console.log('test');
    })

}());
