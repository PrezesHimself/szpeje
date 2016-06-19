'use strict';

// Declare app level module which depends on views, and components
angular.module('szpeje', [
  'ui.router',
  'szpeje.home',
  'szpeje.catalog',
  'szpeje.contact',
  'szpeje.nav',
  'szpeje.loader',
  'szpeje.szpejeApi',
  'szpeje.admin',
  'szpeje.behanceApi',
  'ui.bootstrap',
  'ngAside',
  'ngAnimate',
  'ngTouch',
  'satellizer'
])
.config(['$urlRouterProvider', '$stateProvider', '$locationProvider', '$authProvider',
    function($urlRouterProvider, $stateProvider, $locationProvider, $authProvider) {

      $urlRouterProvider
        .otherwise('home');

      $stateProvider.state('app', {
          abstract: true,
          url: '/',
          template: '<ui-view/>'
      });

      $locationProvider.html5Mode(true);

  }]);
