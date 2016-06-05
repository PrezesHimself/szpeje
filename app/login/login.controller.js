'use strict';

(function() {

    function LoginController() {
        var _self = this;

        console.log('test');
    }

    LoginController.$inject = []

    angular.module('szpeje.login')
        .controller('LoginController', LoginController);
})();
