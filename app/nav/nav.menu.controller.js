'use strict';

(function() {

    function MenuController($scope, $uibModalInstance) {
        var _self = this;

        this.hide = hide;

        function hide() {
          $uibModalInstance.close();
        };

        console.log(_self);

    }

    MenuController.$inject = [
      '$scope',
      '$uibModalInstance'
    ]

    angular.module('szpeje.nav')
        .controller('MenuController', MenuController);
})();
