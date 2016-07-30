'use strict';

(function() {

    function ContactController(SendGrid, $stateParams) {
        var vm = this;

        vm.subject = $stateParams.subject;
        console.log(google.maps, 'test');
        var mapDiv = document.getElementById('map');
        var map = new google.maps.Map(mapDiv, {
            center: {lat: 44.540, lng: -78.546},
            zoom: 8
        });
    }

    ContactController.$inject = ['SendGrid', '$stateParams']

    angular.module('szpeje.contact')
        .controller('ContactController', ContactController);
})();
