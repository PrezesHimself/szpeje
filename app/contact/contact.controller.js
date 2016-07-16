'use strict';

(function() {

    function ContactController(SendGrid, $stateParams) {
        var vm = this;

        vm.subject = $stateParams.subject; 
    }

    ContactController.$inject = ['SendGrid', '$stateParams']

    angular.module('szpeje.contact')
        .controller('ContactController', ContactController);
})();
