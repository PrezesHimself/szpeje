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
            promise = $http.get(url).error(function (response, status) {
            });

            return promise;
        };

        this.getCategories = function() {
            var url = '/api/categories';
            promise = $http.get(url).error(function (response, status) {
            });

            return promise;
        }

        this.updateSzpeje = function(item) {
            var url = '/api/szpejeUpdate';
            promise = $http.post(url, item).error(function (response, status) {
            });

            return promise;
        }

        this.insertCategory = function(data) {
            var url = '/api/categories';
            promise = $http(
                {
                    url: url,
                    method: 'PUT',
                    data: data,
                    headers: {"Content-Type": "application/json;charset=utf-8"}
                }
            );

            return promise;
        }

        this.removeCategory = function(data) {
            var url = '/api/categories';
            promise = $http(
                {
                    url: url,
                    method: 'DELETE',
                    data: data,
                    headers: {"Content-Type": "application/json;charset=utf-8"}
                }
            );

            return promise;
        }

    }]);
