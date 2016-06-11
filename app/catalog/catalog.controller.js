'use strict';

(function() {

    function CatalogController(SzpejeApi, $stateParams, $uibModal) {
        var vm = this;

        this.openImage = openImage;

        if (!$stateParams.catgoryId) {
          SzpejeApi.getSzpeje()
            .then(function(results) {
              vm.projects = results;
            })
        } else if($stateParams.catgoryId){
          SzpejeApi.getSzpejeByCategoryId($stateParams.catgoryId)
            .then(function(results)  {
                  vm.szpeje = _.map(results.data, function(item) {
                      return JSON.parse(item.json);
                  });

                  if($stateParams.itemId) {
                      console.log('obj');
                      vm.szpeja = _.find(vm.szpeje, {id: +$stateParams.itemId});
                      console.log(vm.szpeja);
                      console.log(vm.szpeje);
                  }
            });
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
