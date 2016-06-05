'use strict';

(function() {

    function AdminController($q, BehanceApi, SzpejeApi) {
        var vm = this;

        vm.synchronize = synchronize;
        vm.save = save;

        function synchronize() {
            $q.all([BehanceApi.getSzpeje(), SzpejeApi.getSzpeje()])
                .then(function(results) {
                    vm.localProjects = _.chain(results[1].data)
                                        .groupBy('id')
                                        .value();

                    vm.remoteProjects = angular.copy(_.chain(results[0].data.projects)
                                        .groupBy('id')
                                        .value());

                    vm.projects = _.map(results[0].data.projects, function(item){
                        item.local = vm.localProjects[item.id] ? vm.localProjects[item.id][0] : null;
                        item.remote = vm.remoteProjects[item.id][0];
                        item.setRemoteValue = function(key) {
                            item[key] = item.remote[key];
                        }
                        for(var key in item){
                            item[key] = item.local && item.local[key] ? item.local[key] : item[key]
                        }
                        return item;
                    });
                });
        }

        function clearSzpejeCollection() {
            BehanceApi.deleteSzpeje();
        }

        function save() {
            SzpejeApi.deleteSzpeje()
                .then(function(){
                    var payload = _.map(vm.projects, function(item) {
                        return {
                            name:   item.name,
                            url:    item.url,
                            id:     item.id
                        };
                    });
                    SzpejeApi.insertSzpeje(payload);
                });
        }

    }

    AdminController.$inject = ['$q', 'BehanceApi', 'SzpejeApi']

    angular.module('szpeje.admin')
        .controller('AdminController', AdminController);
})();
