'use strict';

// Declare app level module which depends on views, and components
angular.module('szpeje', [
  'ui.router',
  'szpeje.home',
  'szpeje.catalog',
  'szpeje.contact'
])
.config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider) {

      $urlRouterProvider
        .otherwise('/home');

      $stateProvider.state('app', {
          abstract: true,
          url: '/',
          template: '<ui-view/>'
      });

      $locationProvider.html5Mode(true);

    }])
.run(function(){
  console.log('running angular',angular.version.full);
});
