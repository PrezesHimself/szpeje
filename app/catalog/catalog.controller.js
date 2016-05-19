'use strict';

(function() {

    function CatalogController(SzpejeService) {
        var _self = this;

        SzpejeService.getSzpeje()
          .then(function(results){
            console.log(results);
            _self.projects = results.data.projects;
          })
    }

    CatalogController.$inject = ['SzpejeService']

    angular.module('szpeje.catalog')
        .controller('CatalogController', CatalogController);
})();
