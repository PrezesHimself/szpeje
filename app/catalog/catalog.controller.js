'use strict';

(function() {

    function CatalogController(SzpejeService, $stateParams) {
        var _self = this;

        if (!$stateParams.projectId) {
          SzpejeService.getSzpeje()
            .then(function(results){
              console.log(results);
              _self.projects = results.data.projects;
            })
        } else {
          SzpejeService.getProject($stateParams.projectId)
            .then(function(results){
              console.log(results);
              _self.project = results.data.project;
            })
        }
    }

    CatalogController.$inject = ['SzpejeService', '$stateParams']

    angular.module('szpeje.catalog')
        .controller('CatalogController', CatalogController);
})();
