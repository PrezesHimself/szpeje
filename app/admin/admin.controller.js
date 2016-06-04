'use strict';

(function() {

    function AdminController($q, BehanceApi, SzpejeApi) {
        var vm = this;

        vm.synchronize = synchronize;
        vm.save = save;

        function synchronize() {
            BehanceApi.getSzpeje()
                .then(function(results) {
                    vm.projects = results.data.projects;
                    SzpejeApi.deleteSzpeje();
                });
        }

        function clearSzpejeCollection() {
            BehanceApi.deleteSzpeje();
        }

        function save() {
            console.log(save);
        }

    }

    AdminController.$inject = ['$q', 'BehanceApi', 'SzpejeApi']

    angular.module('szpeje.admin')
        .controller('AdminController', AdminController);
})();
