'use strict';

(function() {

    function ContactController(SendGrid) {
        var _self = this;
        this.sendMail = sendMail;

        function sendMail() {

            SendGrid.send(
                _self.subject,
                _self.msg,
                _self.email
            );

        }
    }

    ContactController.$inject = ['SendGrid']

    angular.module('szpeje.contact')
        .controller('ContactController', ContactController);
})();
