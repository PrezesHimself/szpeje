'use strict';

(function() {

    function HomeController(SzpejeApi) {
        var vm = this;

        SzpejeApi.getSzpeje()
          .then(function(results) {
              vm.szpeje = _.map(results.data, function(item) {
                 item.json = JSON.parse(item.json);
                 return item;
              });
          });

    }

    HomeController.$inject = ['SzpejeApi']

    angular.module('szpeje.home')
        .controller('HomeController', HomeController);
})();
