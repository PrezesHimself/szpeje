'use strict';

(function() {

    function HomeController() {
        var _self = this;
        console.log('gogo');
    }

    HomeController.$inject = []

    angular.module('szpeje.home')
        .controller('HomeController', HomeController);
})();
