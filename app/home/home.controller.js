'use strict';

(function() {

    function HomeController(SzpejeApi) {
        var vm = this;

        SzpejeApi.getSzpeje()
          .then(function(results) {
              vm.szpeje = _.map(results.data, function(item) {  
                 return JSON.parse(item.json);
              });
          });

    }

    HomeController.$inject = ['SzpejeApi']

    angular.module('szpeje.home')
        .controller('HomeController', HomeController);
})();
