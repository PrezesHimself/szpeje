'use strict';

(function() {

    function AdminController($q, $rootScope, BehanceApi, SzpejeApi, $auth, $uibModal, NgTableParams) {
        var vm = this;

        vm.synchronize = synchronize;
        vm.saveOne = saveOne;
        vm.saveAll = saveAll;
        init();

        vm.isAuth = $auth.isAuthenticated();
        vm.authenticate = function(provider) {
              vm.auth = $auth.authenticate(provider)
                  .then(function(response) {
                  vm.isAuth = $auth.isAuthenticated();
              });
        };

        vm.login = function() {
            $auth.login({
                email: vm.email,
                password: vm.password
            })
            .then(function(response) {
              vm.isAuth = $auth.isAuthenticated();
            })
        };

        vm.delete = function(id) {
            vm.localSzpeje = _.reject(vm.localSzpeje, {id: id})
        }

        vm.logout = function() {
            $auth.logout()
                .then(function(response) {
                    vm.isAuth = $auth.isAuthenticated();
              });
        };

        vm.openInModal = function(item) {
            var modalInstance = $uibModal.open({
                 templateUrl : 'app/tpl/admin/modals/edit.tpl.html',
                 size: 'lg',
                 controller: AdminEditController,
                 controllerAs: 'vm',
                 resolve: {
                       item: function () {
                         return item;
                       }
                   }
               });
        }

        function AdminEditController($uibModalInstance, item) {
            var vm = this;
            vm.item = item;
        }
        function performSave(item) {
            _.map(item, function () {
                return {
                    src : item.src,
                    id : item.id,
                    categoryId : item.categoryId,
                    categoryName : item.categoryName,
                    caption_plain: item.caption_plain,
                    available: item.available,
                    json: JSON.stringify(item)
                }
            });
            return SzpejeApi.updateSzpeje(item)
        }
        function saveOne(item) {
            vm.showLoader = true;
            performSave(item)
                .then(function() {
                    vm.showLoader = false;
                })
        }

        function refreshTable() {
            vm.tableParams = new NgTableParams({}, { dataset: vm.localSzpeje});
        }

        function init() {

            SzpejeApi.getSzpeje()
              .then(function(results) {
                  results.data = _.map(results.data, function(item) {
                      return JSON.parse(item.json);
                  });
                  vm.localSzpeje = results.data;
                  _.map(vm.localSzpeje, function(item) {
                      item.removePhoto = function(module) {
                          if (item.modules.length > 1) {
                              item.modules.splice(item.modules.indexOf(module), 1);
                              console.log(item.modules.length, 'test');
                          } else {
                              alert('hej ho nie bedziem usuwać ostatniego zdjęcia!');
                          }
                      }
                      item.remove = function() {
                          console.log(this, 'test');
                          vm.localSzpeje.splice(vm.localSzpeje.indexOf(this), 1);
                          refreshTable();
                      }
                      return item;
                  });
                  refreshTable();
            });

            SzpejeApi.getCategories()
                .then(function(results){
                    vm.categories = results;
                });
        };

        function synchronize() {
            vm.showLoader = true;
            var allProjectsPromise = $q.all(
                [
                    BehanceApi.getSzpeje(1),
                    BehanceApi.getSzpeje(2),
                    BehanceApi.getSzpeje(3),
                    BehanceApi.getSzpeje(4),
                    BehanceApi.getSzpeje(5),
                    BehanceApi.getSzpeje(6),
                    BehanceApi.getSzpeje(7),
                    BehanceApi.getSzpeje(8),
                    BehanceApi.getSzpeje(9),
                    BehanceApi.getSzpeje(10)
                ]
            );

            allProjectsPromise
              .then(function(results) {
                  console.log(results);
                  var promises = [];
                  var remoteSzpeje = [];
                  _.each(results, function(page) {
                      _.each(page.data.projects, function (item) {
                          promises.push(BehanceApi.getProject(item.id));
                      })
                  });
                  $q.all(promises)
                    .then(function(szpeje) {
                            _.each(szpeje, function(item) {
                                console.log(item);
                                remoteSzpeje.push(item.data.project);
                            });
                         vm.remoteSzpeje = remoteSzpeje;
                         _.each(vm.remoteSzpeje, function(remoteSzpej) {
                             if(!_.some(vm.localSzpeje, {id: remoteSzpej.id})) {
                                 vm.localSzpeje.push(remoteSzpej);
                             }

                         });
                         refreshTable();
                         vm.showLoader = false;
                    });
              });

        }

        function clearSzpejeCollection() {
            BehanceApi.deleteSzpeje();
        }

        vm.insertCategory = function() {
            if(!vm.newCategory.length || _.some(vm.categories, {name: vm.newCategory})) {
                return;
            };
            SzpejeApi.insertCategory(
                {
                    name: vm.newCategory,
                    uri: vm.newCategory.toLowerCase().split(' ').join('-')
                }
            )
            .then(function(result) {
                vm.categories.push(result.data[0]);
                vm.newCategory = '';
            })
        }

        vm.removeCategory = function(category) {

            vm.categories.splice(vm.categories.indexOf(category), 1)
            SzpejeApi.removeCategory(
                category
            );
        }

        function saveAll() {
            vm.showLoader = true;
            var promises = _.map(vm.localSzpeje, function(item) {
                return performSave(item);
            });

            $q.all(promises)
                .then(function() {
                    vm.showLoader = false;
                      $rootScope.$broadcast('szpeje-saved');
                }
            );
        }

    }

    AdminController.$inject = ['$q', '$rootScope', 'BehanceApi', 'SzpejeApi', '$auth', '$uibModal', 'NgTableParams']

    angular.module('szpeje.admin')
        .controller('AdminController', AdminController);
})();
