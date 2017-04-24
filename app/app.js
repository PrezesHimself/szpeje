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
  'szpeje.about',
  'szpeje.admin',
  'szpeje.behanceApi',
  'szpeje.images-list',
  'ui.bootstrap',
  'ngAside',
  'ngAnimate',
  'ngTouch',
  'satellizer',
  'ngTable',
  'ngMessages',
  'angular-preload-image'
])
.config(['$urlRouterProvider', '$stateProvider', '$locationProvider', '$authProvider',
        function($urlRouterProvider, $stateProvider, $locationProvider, $authProvider) {
            console.log('test');
              $urlRouterProvider
                .otherwise('home');

              $stateProvider.state('app', {
                  abstract: true,
                  url: '/',
                  template: '<ui-view/>'
              });

              $locationProvider.html5Mode(true);

  }]);
