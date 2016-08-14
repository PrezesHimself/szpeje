'use strict';

(function() {

    function ContactController(SendGrid, $stateParams) {
        var vm = this;

        vm.subject = $stateParams.subject;

        var mapDiv = document.getElementById('map');

        geocoder = new google.maps.Geocoder();

        var latlng = new google.maps.LatLng(50.06993888, 20.0412459,15);
        var mapOptions = {
            zoom: 15,
            center: latlng
        };
        var marker = new google.maps.Marker({
            position: latlng,
            title:"Hello World!"
        });
        var map = new google.maps.Map(mapDiv, mapOptions);
        marker.setMap(map);

    }

    ContactController.$inject = ['SendGrid', '$stateParams']

    angular.module('szpeje.contact')
        .controller('ContactController', ContactController);
})();
