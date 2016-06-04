angular.module('szpeje.szpejeApi', [])
    .service('SzpejeApi', ['$http', '$q', function ($http, $q) {

        var _self = this;

        this.deleteSzpeje = function() {
            var url = '/api/szpeje';
            promise = $http.delete(url).error(function (response, status) {
                alert(status);
            });

            return promise;
        }

    }]);
