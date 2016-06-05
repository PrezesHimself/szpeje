'use strict';

(function() {

    function MenuController($scope, $uibModalInstance) {
        var vm = this;

        this.hide = hide;

        function hide() {
          $uibModalInstance.close();
        };

    }

    MenuController.$inject = [
      '$scope',
      '$uibModalInstance'
    ]

    angular.module('szpeje.nav')
        .controller('MenuController', MenuController);
})();
