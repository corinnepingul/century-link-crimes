// // This is a manifest file that'll be compiled into application.js, which will include all the files
// // listed below.
// //
// // Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// // or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
// //
// // It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// // compiled file.
// //
// // Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// // about supported directives.
// //
// //= require jquery
// //= require bootstrap-sprockets
// //= require jquery_ujs
// //= require_tree .

var url = "https://data.seattle.gov/resource/3k2p-39jp.json";
var map;
var markers = [];
//
function initialize() {
  var bounds = new google.maps.LatLngBounds();
  var mapOptions = {
    mapTypeId: 'roadmap'
  };

  // Display a map on the page
  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  map.setTilt(45);

  // Map the destination (Century Link)
  var positionCenturyLink = new google.maps.LatLng("47.593304", "-122.332165");
  marker = new google.maps.Marker({
    position: positionCenturyLink,
    map: map,
    icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
  });
  bounds.extend(positionCenturyLink);
  map.fitBounds(bounds);

  // Map markers for general API call
  var data = JSON.parse($("#data").attr("data"));

  for(i = 0; i < data.length; i++ ) {
    var obj = data[i];

    if(obj.hasOwnProperty("latitude") && obj.hasOwnProperty("longitude")) {
      var position = new google.maps.LatLng(obj["latitude"], obj["longitude"]);
      bounds.extend(position);
      addMarker(position);
      map.fitBounds(bounds);
    } else { continue; }
  }
//   // Info Window Content
//   // var infoWindowContent = [
//   //     ['<div class="info_content">' +
//   //     '<h3>London Eye</h3>' +
//   //     '<p>The London Eye is a giant Ferris wheel situated on the banks of the River Thames. The entire structure is 135 metres (443 ft) tall and the wheel has a diameter of 120 metres (394 ft).</p>' +        '</div>'],
//   //     ['<div class="info_content">' +
//   //     '<h3>Palace of Westminster</h3>' +
//   //     '<p>The Palace of Westminster is the meeting place of the House of Commons and the House of Lords, the two houses of the Parliament of the United Kingdom. Commonly known as the Houses of Parliament after its tenants.</p>' +
//   //     '</div>']
//   // ];
}

$(document).ready(function() {
  $("#menu-toggle").on("click", function(event) {
    event.preventDefault();
    $("#wrapper").toggleClass("toggled");
  });

  $(".category-group").on("click", ".category-link", function(event) {
    event.preventDefault();
    deleteMarkers();
    var btn = $(event.target);
    var type = btn.text();

    jQuery.getJSON(url + "?$where=within_circle(incident_location, 47.593304, -122.332165,1069)&event_clearance_subgroup=" + type, function(data) {
      for(i = 0; i < data.length; i++ ) {
        var obj = data[i];

        if(obj.hasOwnProperty("latitude") && obj.hasOwnProperty("longitude")) {
          var position = new google.maps.LatLng(obj["latitude"], obj["longitude"]);
          addMarker(position);

        } else { continue; }
      }
    });

    // if($("#wrapper").css("padding-left") == "250px") {
    //   console.log("hello");
    //   $("#wrapper").removeClass("toggled");
    // }
  });
});

// MARKER FUNCTIONS ------------------------------------------------------------

// Adds a marker to the map and push to the array.
function addMarker(location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  markers.push(marker);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}
