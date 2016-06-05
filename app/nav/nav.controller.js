'use strict';

(function() {

    function NavController($aside, SzpejeApi) {
        var _self = this;

        this.toggleMenu = toggleMenu;

        SzpejeApi.getSzpeje()
          .then(function(results){
            console.log(results);
            _self.projects = results.data;
          })

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
                          return _self.projects;
                      }
                },
          });
        }
    }

    NavController.$inject = ['$aside', 'SzpejeApi']

    angular.module('szpeje.nav')
        .controller('NavController', NavController);
})();
