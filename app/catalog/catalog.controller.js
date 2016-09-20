'use strict';

(function() {

    function CatalogController(SzpejeApi, $stateParams, $uibModal, $q) {
        var vm = this;

        vm.openContactModal = openContactModal;

        this.openImage = openImage;
        vm.slides = [];

        var cateogryPromise = SzpejeApi.getCategorieByName($stateParams.catgoryId)
            .then(function(result){
                vm.category = result;
            });

        if($stateParams.itemId) {
            $q.all([
                cateogryPromise,
                SzpejeApi.getSzpejeById($stateParams.itemId)
            ])
                .then(function (result) {
                    vm.szpeja = result[1];
                    var currIndex = 0;
                    _.each(vm.szpeja.modules, function(item) {
                        if(!item.sizes) {
                            return;
                        }

                        vm.slides.push({
                            image: item.sizes.disp,
                            text: item.caption_plain,
                            id: currIndex++
                        });
                    });
                });

        } else if (!$stateParams.catgoryId) {
            SzpejeApi.getSzpeje()
                .then(function(results) {

            results.data = _.filter(results.data, {available: true});

            var res = _.map(results.data, function(item) {
                return JSON.parse(item.json);
            });

                vm.projects = res;
            });

        } else if($stateParams.catgoryId){

          SzpejeApi.getSzpejeByCategoryId($stateParams.catgoryId)
            .then(function(results)  {
                  var res = _.map(results.data, function(item) {
                      return JSON.parse(item.json);
                  });

                  vm.szpeje = _.filter(res, function(item) {
                      return item.price && item.available;
                  });

                  if($stateParams.itemId) {
                      vm.szpeja = _.find(vm.szpeje, {id: +$stateParams.itemId});
                      var currIndex = 0;
                      _.each(vm.szpeja.modules, function(item) {
                          if(!item.sizes) {
                              return;
                          }

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

        function openContactModal(subject) {
            var modalInstance = $uibModal.open({
                  template:
                        '<p class="szp-modal__close"><a href="#" ng-click="vm.close()"><i class="fa fa-times"></i></a></p>' +
                        '<szpeje-contact-form subject="vm.subject" close-fn="vm.close()" style="padding:20px; display: block;"></szpeje-contact-form>',
                  size: 'lg',
                  bindToController: true,
                  controllerAs: 'vm',
                  controller: function($uibModalInstance) {
                      this.subject = subject;
                      this.close = function() {
                          $uibModalInstance.dismiss('cancel');
                      }
                  }
            });
        }
    }

    CatalogController.$inject = ['SzpejeApi', '$stateParams', '$uibModal', '$q']

    angular.module('szpeje.catalog')
        .controller('CatalogController', CatalogController);
})();
