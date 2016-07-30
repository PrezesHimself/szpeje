'use strict';

(function() {

    function HomeController(SzpejeApi) {
        var vm = this;

        SzpejeApi.getSzpeje()
            .then(function(results) {

        results.data = _.filter(results.data, {available: true});

        var res = _.map(results.data, function(item) {
             return JSON.parse(item.json);
        });

            vm.projects = res;
        });

    }

    HomeController.$inject = ['SzpejeApi']

    angular.module('szpeje.home')
        .controller('HomeController', HomeController);
})();
