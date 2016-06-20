'use strict';

(function() {

    function HomeController(SzpejeApi) {
        var vm = this;

        SzpejeApi.getSzpeje()
          .then(function(results) {
              var res = _.map(results.data, function(item) {
                 return JSON.parse(item.json);
              });
              vm.szpeje = _.filter(res, function(item) {
                  return item.price && item.available;
              });
              console.log(vm.szpeje);
          });

    }

    HomeController.$inject = ['SzpejeApi']

    angular.module('szpeje.home')
        .controller('HomeController', HomeController);
})();
