'use strict';

(function() {

    function NavController($aside, SzpejeService) {
        var _self = this;

        this.toggleMenu = toggleMenu;

        SzpejeService.getSzpeje()
          .then(function(results){
            console.log(results);
            _self.projects = results.data.projects;
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

    NavController.$inject = ['$aside', 'SzpejeService']

    angular.module('szpeje.nav')
        .controller('NavController', NavController);
})();
