angular.module('szpeje.catalog')
    .service('SzpejeService', ['$http', '$cacheFactory', '$q', function ($http, $cacheFactory, $q) {

        var _self = this;

        var cache = $cacheFactory('dataCache');

            this.getSzpeje = function() {

              var ONE_MINUTE = 1 * 60 * 1000; /* ms */

              var cacheId = 'szpeje';
              var cachedData = cache.get(cacheId);
              var promise
              if (cachedData && (new Date() - cachedData.date) < ONE_MINUTE) {
                 var deferred = $q.defer();
                 deferred.resolve({data:cachedData});
                 return deferred.promise;
              }

              var user = 'DelikatesyProjektowe';
              var apiKey = 'ONmbhVbzOEFvhmBHVfkOZfqLN4SX8FIz';
              var url = 'http://behance.net/v2/users/'+ user +'/projects?api_key='+ apiKey +'&callback=JSON_CALLBACK';
              promise = $http.jsonp(url).error(function (response, status) {
                alert(status);
              }).success(function(data, status, headers, config) {
                data.date = new Date();
                cache.put(cacheId, data);
              });
              return promise;
            }

    }]);
