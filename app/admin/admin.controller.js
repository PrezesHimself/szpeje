'use strict';

(function() {

    function AdminController($q, $rootScope, BehanceApi, SzpejeApi) {
        var vm = this;

        vm.synchronize = synchronize;
        vm.save = save;

        init();

        function init() {
            SzpejeApi.getSzpeje()
              .then(function(results) {
                  results.data = _.map(results.data, function(item) {
                      return JSON.parse(item.json);
                  });
                  vm.localSzpeje = results.data;
                  console.log(vm.localSzpeje);
            });

            vm.categories = SzpejeApi.getCategories();
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

    AdminController.$inject = ['$q', '$rootScope', 'BehanceApi', 'SzpejeApi']

    angular.module('szpeje.admin')
        .controller('AdminController', AdminController);
})();
