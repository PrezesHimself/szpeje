'use strict';

(function() {

    function AdminController($q, BehanceApi) {
        var vm = this;

        vm.synchronize = synchronize;
        vm.save = save;

        function synchronize() {
            BehanceApi.getSzpeje()
                .then(function(results) {
                    vm.projects = results.data.projects;
                });
        }

        function save() {
            console.log(save);
        }

    }

    AdminController.$inject = ['$q', 'BehanceApi']

    angular.module('szpeje.admin')
        .controller('AdminController', AdminController);
})();
