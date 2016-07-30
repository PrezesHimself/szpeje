'use strict';

(function() {

    function ContactController(SendGrid, $stateParams) {
        var vm = this;

        vm.subject = $stateParams.subject;

        var mapDiv = document.getElementById('map');

        geocoder = new google.maps.Geocoder();

        var latlng = new google.maps.LatLng(50.0701868, 20.0412981);
        var mapOptions = {
            zoom: 15,
            center: latlng
        };

        var map = new google.maps.Map(mapDiv, mapOptions);

        google.maps.event.addListenerOnce(map, 'idle', codeAddress);

        function codeAddress() {

            // Define address to center map to
            var address = 'os. Centrum E1, Kraków, Nowa Huta ';

            geocoder.geocode({
                'address': address
            }, function (results, status) {

                if (status == google.maps.GeocoderStatus.OK) {

                    // Center map on location
                    map.setCenter(results[0].geometry.location);

                    // Add marker on location
                    var marker = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location
                    });

                } else {

                    alert("Geocode was not successful for the following reason: " + status);
                }
            });
        }
    }

    ContactController.$inject = ['SendGrid', '$stateParams']

    angular.module('szpeje.contact')
        .controller('ContactController', ContactController);
})();
