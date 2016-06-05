(function() {
  'use strict';

    angular.module('szpeje.admin',
    ['ui.router'])
    .config(function($stateProvider) {
        $stateProvider
            .state('app.admin', {
                url: 'admin',
                templateUrl: 'app/tpl/admin/admin.tpl.html',
                controller: 'AdminController',
                controllerAs: 'vm'
            });
    });
//    .run(function($rootScope) {
      // $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      //     console.log(toState);
      //     if (toState.name === 'app.admin') {
      //        event.preventDefault();
      //        Profile.authCheck().then(function(returned) {
      //          if (returned.status === 200) {
      //            console.log("yes!");
      //            console.log(toState.name);
      //            //$state.go($state);
      //          } else {
      //            $state.go('auth');
      //          }
      //        });
      //     }
      //  });
    // });

}());
