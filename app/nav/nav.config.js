(function() {
    'use strict';
    var app = angular.module("szpeje.nav", []);

    app.directive("szpejeNav", function() {
        return {
          restrict: "E",
          controller: "NavController",
          templateUrl: "tpl/nav/nav.tpl.html",
          controllerAs: 'vm',
          bindToController: true,
        };
    });
}());
