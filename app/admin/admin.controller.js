'use strict';

(function() {

    function AdminController($q, $rootScope, BehanceApi, SzpejeApi, $auth) {
        var vm = this;

        vm.synchronize = synchronize;
        vm.save = save;
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


        function init() {
            SzpejeApi.getSzpeje()
              .then(function(results) {
                  results.data = _.map(results.data, function(item) {
                      return JSON.parse(item.json);
                  });
                  vm.localSzpeje = results.data;
            });

            SzpejeApi.getCategories()
                .then(function(results){
                    vm.categories = results.data;
                });
        };

        function synchronize() {
            BehanceApi.getSzpeje()
              .then(function(results) {
                  var promises = [];
                  var remoteSzpeje = [];
                  _.each(results.data.projects, function(item) {
                      promises.push(BehanceApi.getProject(item.id));
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

                         })
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

        function save() {
            SzpejeApi.deleteSzpeje()
                .then(function(){
                    var payload = _.map(vm.localSzpeje, function(item) {
                        return {
                            src : item.src,
                            id : item.id,
                            categoryId : item.categoryId,
                            categoryName : item.categoryName,
                            caption_plain: item.caption_plain,
                            available: item.available,
                            json: JSON.stringify(item)
                        };
                    });
                    SzpejeApi.insertSzpeje(payload)
                        .then(function() {
                              $rootScope.$broadcast('szpeje-saved');
                        }
                    );
                });
        }

    }

    AdminController.$inject = ['$q', '$rootScope', 'BehanceApi', 'SzpejeApi', '$auth']

    angular.module('szpeje.admin')
        .controller('AdminController', AdminController);
})();
