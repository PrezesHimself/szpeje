(function() {
    'use strict';
    angular
        .module('szpeje.contact')
        .directive('szpejeContactForm', szpejeContactForm);

    function szpejeContactForm() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/tpl/contact/contact-form.directive.tpl.html',
            scope: {
                subject: '=?'
            },
            controller: ContactFormController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    ContactFormController.$inject = ['SendGrid'];

    function ContactFormController(SendGrid) {
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
}());
