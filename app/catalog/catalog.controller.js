'use strict';

(function() {

    function CatalogController(SzpejeApi, $stateParams, $uibModal) {
        var vm = this;

        this.openImage = openImage;
        vm.slides = [];

        if (!$stateParams.catgoryId) {
          SzpejeApi.getSzpeje()
            .then(function(results) {
              vm.projects = results;
            });

        } else if($stateParams.catgoryId){
          vm.category = _.find(SzpejeApi.getCategories(), function(item) {
            return item.id == $stateParams.catgoryId;
          });

          SzpejeApi.getSzpejeByCategoryId($stateParams.catgoryId)
            .then(function(results)  {
                  var res = _.map(results.data, function(item) {
                      return JSON.parse(item.json);
                  });
                  vm.szpeje = _.filter(res, function(item) {
                      return item.price && item.available;
                  })
                  if($stateParams.itemId) {
                      vm.szpeja = _.find(vm.szpeje, {id: +$stateParams.itemId});
                      var currIndex = 0;
                      _.each(vm.szpeja.modules, function(item) {
                          vm.slides.push({
                            image: item.sizes.disp,
                            text: item.caption_plain,
                            id: currIndex++
                          });
                      })
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
