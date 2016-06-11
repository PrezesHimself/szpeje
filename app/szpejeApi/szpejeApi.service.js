angular.module('szpeje.szpejeApi', [])
    .service('SzpejeApi', ['$http', '$q', function ($http, $q) {

        var _self = this;

        this.deleteSzpeje = function() {
            var url = '/api/szpeje';
            promise = $http.delete(url).error(function (response, status) {
            });

            return promise;
        };

        this.insertSzpeje = function(data) {
            var url = '/api/szpeje';
            promise = $http.post(url, data).error(function (response, status) {
            });

            return promise;
        };

        this.getSzpeje = function(search) {
            var url = '/api/szpeje';
            promise = $http.get(url).error(function (response, status) {
            });

            return promise;
        };

        this.getSzpejeByCategoryId = function(categoryId) {
            var url = '/api/szpeje?categoryId='+categoryId;
            console.log(url, 'test');
            promise = $http.get(url).error(function (response, status) {
            });

            return promise;
        };

        this.getCategories = function() {
            return [
                {id: 1, name: 'Meble'},
                {id: 2, name: 'Szpeje'}
            ];
        }

    }]);
