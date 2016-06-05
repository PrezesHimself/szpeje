'use strict';

(function() {

    function CatalogController(SzpejeApi, $stateParams, $uibModal) {
        var vm = this;

        this.openImage = openImage;

        if (!$stateParams.projectId) {
          SzpejeApi.getSzpeje()
            .then(function(results) {
              vm.projects = results;
            })
        } else {
          SzpejeApi.getSzpeje()
            .then(function(results)  {
              console.log(results);
              vm.szpeje = _.chain(results.data)
                          .map(function(item) {
                              item.json = JSON.parse(item.json);
                              return item;
                          })
                          .filter(function(item) {
                              return item.categoryId == $stateParams.projectId
                          })
                          .value();
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

    CatalogController.$inject = ['SzpejeApi', '$stateParams', '$uibModal']

    angular.module('szpeje.catalog')
        .controller('CatalogController', CatalogController);
})();
