angular.module('szpeje.behanceApi', [])
    .service('BehanceApi', ['$http', '$q', function ($http, $q) {

        var _self = this;


        var user = 'szpeje';
        var apiKey = '2BqtKltLmzjwtcnjw41xNsrmRdM41rpr';

        this.getUser = function() {
            var url = 'http://www.behance.net/v2/users/'+ user +'?api_key='+ apiKey +'&callback=JSON_CALLBACK';
            promise = $http.jsonp(url).error(function (response, status) {
            });

            return promise;
        }

        this.getProject = function(projectId) {
            var url = 'http://behance.net/v2/projects/'+ projectId +'?api_key='+ apiKey +'&callback=JSON_CALLBACK';
            promise = $http.jsonp(url).error(function (response, status) {
            });

            return promise;
        }

        this.getSzpeje = function(page) {
          var url = 'http://behance.net/v2/users/'+ user +
              '/projects?api_key='+ apiKey +
              '&page='+ page +
              '&callback=JSON_CALLBACK';
          return $http.jsonp(url).error(function (response, status) {
          }).success(function(data, status, headers, config) {
            data.date = new Date();
          });
        }

    }]);
