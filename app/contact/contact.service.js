(function() {
    'use strict';

    angular.module('szpeje.contact').factory('SendGrid', sendGrid);

    sendGrid.$inject = ['$http'];

    function sendGrid($http) {


        var apiKey = 'szpeje2016';
        var username = 'szpeje';

        return {
           send: function(from, subject, msg) {
               var method = 'POST';
               var url = "/api/email";
               return $http.post(url, {
                   from: from,
                   subject: subject,
                   msg: msg
               }).
               success(function(data, status) {}).
               error(function(data, status) {});
           }
       };
    }
}());
