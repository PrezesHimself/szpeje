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
          SzpejeApi.getSzpejeByCategoryId($stateParams.projectId)
            .then(function(results)  {
                console.log(results, 'res');
                  vm.szpeje = _.map(results.data, function(item) {
                      return JSON.parse(item.json);
                  });
                  console.log(vm.szpeje);
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
