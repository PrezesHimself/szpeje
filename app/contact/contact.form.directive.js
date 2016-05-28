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
        var vm = this;
        vm.sendMail = sendMail;
        vm.sending = false;
        function sendMail() {
            vm.sending = true;
            SendGrid.send(
                vm.from,
                vm.subject,
                vm.msg
            )
            .then(function() {
                vm.sending = false;
                vm.message = 'dziękoweczka';
            })
            .catch(function(){
                vm.sending = false;
                vm.message = 'nie poszedł mail';
            })

        }
    }
}());
