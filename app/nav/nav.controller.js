'use strict';

(function() {

    function NavController($aside, $rootScope, SzpejeApi) {
        var vm = this;

        this.toggleMenu = toggleMenu;

        getCategories();

        $rootScope.$on('szpeje-saved', getCategories);

        function toggleMenu() {
          var asideInstance = $aside.open({
                templateUrl: 'app/tpl/nav/aside.tpl.html',
                controller: 'MenuController',
                placement: 'right',
                size: 'lg',
                backdrop: true,
                openedClass: 'modal-open menu',
                bindToController: true,
                controllerAs: 'vm',
                resolve: {
                      projects: function() {
                          return vm.projects;
                      }
                },
          });
        }

        function getCategories() {
            SzpejeApi.getCategories()
                .then(function(results){
                    vm.categories = results.data;
                });
        }
    }

    NavController.$inject = ['$aside', '$rootScope','SzpejeApi']

    angular.module('szpeje.nav')
        .controller('NavController', NavController);
})();
