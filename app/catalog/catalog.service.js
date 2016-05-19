angular.module('szpeje.catalog')
    .service('SzpejeService', ['$http', function ($http) {

        var _self = this;

            this.getSzpeje = function() {
              var user = 'DelikatesyProjektowe';
              var apiKey = 'ONmbhVbzOEFvhmBHVfkOZfqLN4SX8FIz';
              var url = 'http://behance.net/v2/users/'+ user +'/projects?api_key='+ apiKey +'&callback=JSON_CALLBACK';
              var promise = $http.jsonp(url).error(function (response, status) {
                alert(status);
              });
              return promise;
            }

    }]);
