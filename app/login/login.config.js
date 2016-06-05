(function() {
  'use strict';

    angular.module('szpeje.login',
    ['ui.router'])
    .config(function($stateProvider) {
        $stateProvider
            .state('app.login', {
                url: 'login',
                templateUrl: 'app/tpl/login/login.tpl.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            });
    });

    function _skipIfAuthenticated($q, $state, $auth) {
        var defer = $q.defer();
        if($auth.authenticate()) {
            defer.reject(); /* (1) */
        } else {
            defer.resolve(); /* (2) */
        }
            return defer.promise;
    }

}());
