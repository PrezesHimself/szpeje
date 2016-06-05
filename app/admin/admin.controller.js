'use strict';

(function() {

    function AdminController($q, $rootScope, BehanceApi, SzpejeApi) {
        var vm = this;

        vm.synchronize = synchronize;
        vm.save = save;


        function synchronize() {
            BehanceApi.getSzpeje()
              .then(function(results) {
                  var projectIds = [];
                  var promises = [];

                  _.each(results.data.projects, function(item) {
                      projectIds.push(item.id);
                      promises.push(BehanceApi.getProject(item.id));
                  });
                  $q.all([SzpejeApi.getSzpeje()].concat(promises))
                    .then(function(results) {
                        var modules = angular.copy(results);
                        var categoryId, categoryName;
                        modules.shift();
                        modules = _.chain(modules)
                          .map(function(item) {
                              categoryId = item.data.project.id
                              categoryName = item.data.project.name
                              return _.map(item.data.project.modules, function(item) {
                                  if(results[0].data.length) {
                                      var local = _.find(results[0].data, function(l) {
                                        return l.id == item.id;
                                      });
                                        item = _.extend(JSON.parse(local.json));
                                  }
                                  item.categoryId = categoryId;
                                  item.categoryName = categoryName;

                                  console.log(item);
                                  return item;
                              });
                          })
                          .flatten()
                          .value();
                          console.log(modules);
                        vm.modules = modules;
                    });
              });

        }

        function clearSzpejeCollection() {
            BehanceApi.deleteSzpeje();
        }

        function save() {
            SzpejeApi.deleteSzpeje()
                .then(function(){
                    var payload = _.map(vm.modules, function(item) {
                        return {
                            src : item.src,
                            id : item.id,
                            categoryId : item.categoryId,
                            categoryName : item.categoryName,
                            caption_plain: item.caption_plain,
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
