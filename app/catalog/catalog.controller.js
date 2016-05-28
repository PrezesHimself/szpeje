'use strict';

(function() {

    function CatalogController(SzpejeService, $stateParams, $uibModal) {
        var _self = this;

        this.openImage = openImage;

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
        function openImage(imageUrl) {
            var modalInstance = $uibModal.open({
                 template: '<img src="{{imageUrl}}" />test',
                 size: 'fs',
                 resolve: {
                       imageUrl: function () {
                         return imageUrl;
                       }
                   }
               });
        }
    }

    CatalogController.$inject = ['SzpejeService', '$stateParams', '$uibModal']

    angular.module('szpeje.catalog')
        .controller('CatalogController', CatalogController);
})();
