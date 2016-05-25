'use strict';

(function() {

    function MenuController($scope, $uibModalInstance) {
        var _self = this;

        this.hide = hide;

        function hide(e) {
          $uibModalInstance.close();
          e.stopPropagation();
        };

    }

    MenuController.$inject = [
      '$scope',
      '$uibModalInstance'
    ]

    angular.module('szpeje.nav')
        .controller('MenuController', MenuController);
})();
