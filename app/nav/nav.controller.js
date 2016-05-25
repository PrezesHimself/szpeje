'use strict';

(function() {

    function NavController($aside) {
        var _self = this;

        this.toggleMenu = toggleMenu;

        function toggleMenu() {
          console.log('test');
          var asideInstance = $aside.open({
              templateUrl: 'tpl/nav/aside.tpl.html',
              controller: 'MenuController',
              placement: 'right',
              size: 'lg',
              backdrop: true,
              bindToController: true,
              controllerAs: 'vm',
          });
        }
    }

    NavController.$inject = ['$aside']

    angular.module('szpeje.nav')
        .controller('NavController', NavController);
})();
