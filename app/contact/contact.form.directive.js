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
                heading: '@?',
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
        vm.postSzpeje = postSzpeje;
        vm.szpeje = szpeje;
        vm.sending = false;

        function szpeje() {
            SendGrid.szpeje()
            .then(function(result) {
                console.log(result, 'result');
                vm.szpeje = result.data;
            });
        }
        function postSzpeje() {
            SendGrid.postSzpeje()
            .then(function(result) {
                console.log(result, 'result');
                vm.szpeje = result.data;
            });
        }
        function sendMail() {
            console.log(vm.form);

            if (!vm.form.$valid) {
                return;
            }

            vm.sending = true;
            SendGrid.send(
                vm.from,
                vm.subject,
                vm.msg
            )
            .then(function() {
                vm.sending = false;
                vm.message = 'Dziękujemy za kontakt!';
            })
            .catch(function(){
                vm.sending = false;
                vm.message = 'Nie udało się wysłać wiadomości, sprawdź czy wszystkie pola wypełnione są prawidłowo';
            })

        }
    }
}());
