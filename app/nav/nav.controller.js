'use strict';

(function() {

    function NavController($aside, $rootScope, SzpejeApi) {
        var vm = this;

        this.toggleMenu = toggleMenu;

        getSzpeje();

        $rootScope.$on('szpeje-saved', getSzpeje);

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

        function getSzpeje() {
            SzpejeApi.getSzpeje()
              .then(function(results){
                vm.categories = _.chain(results.data)
                                  .groupBy('categoryId')
                                  .map(function(item) {
                                      return {
                                        categoryId: item[0].categoryId,
                                        categoryName: item[0].categoryName
                                      }
                                  })
                                  .value();
              })
        }
    }

    NavController.$inject = ['$aside', '$rootScope','SzpejeApi']

    angular.module('szpeje.nav')
        .controller('NavController', NavController);
})();
