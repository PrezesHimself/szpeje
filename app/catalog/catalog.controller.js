'use strict';

(function() {

    function CatalogController(BehanceApi, $stateParams, $uibModal) {
        var _self = this;

        this.openImage = openImage;

        if (!$stateParams.projectId) {
          BehanceApi.getSzpeje()
            .then(function(results) {
              _self.projects = results.data.projects;
            })
        } else {
          BehanceApi.getProject($stateParams.projectId)
            .then(function(results)  {
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

    CatalogController.$inject = ['BehanceApi', '$stateParams', '$uibModal']

    angular.module('szpeje.catalog')
        .controller('CatalogController', CatalogController);
})();
