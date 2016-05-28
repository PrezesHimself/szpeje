(function() {
    'use strict';
    var app = angular.module("szpeje.nav", []);

    app.directive("szpejeNav", function() {
        return {
          restrict: "E",
          controller: "NavController",
          templateUrl: "app/tpl/nav/nav.tpl.html",
          controllerAs: 'vm',
          bindToController: true,
        };
    });
}());
