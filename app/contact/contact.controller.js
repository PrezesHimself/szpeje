'use strict';

(function() {

    function ContactController(SendGrid) {

    }

    ContactController.$inject = ['SendGrid']

    angular.module('szpeje.contact')
        .controller('ContactController', ContactController);
})();
