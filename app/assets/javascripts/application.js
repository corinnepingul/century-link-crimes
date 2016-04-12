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
// //= require turbolinks
// //= require_tree .
//
jQuery(function($) {
    // Asynchronously Load the map API
    var script = document.createElement('script');
    script.src = "http://maps.googleapis.com/maps/api/js?&callback=initialize";
    document.body.appendChild(script);
});
//
// var url = "https://data.seattle.gov/resource/3k2p-39jp.json";
//
function initialize() {
  var map;
  var bounds = new google.maps.LatLngBounds();
  var mapOptions = {
      mapTypeId: 'roadmap'
  };
//   var categoryHash = {};
//
  // Display a map on the page
  map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
  map.setTilt(45);

  var pos = new google.maps.LatLng("47.593304", "-122.332165");
  // Map the destination (Century Link)
  marker = new google.maps.Marker({
    position: pos,
    map: map,
    icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
  });
  bounds.extend(pos);
  map.fitBounds(bounds);

//   jQuery.getJSON(url + "?$where=within_circle(incident_location, 47.593304, -122.332165,1069)", function(data) {
//     for(i = 0; i < data.length; i++ ) {
//       var obj = data[i];
//
//       if(obj.hasOwnProperty("latitude") && obj.hasOwnProperty("longitude")) {
//         var position = new google.maps.LatLng(obj["latitude"], obj["longitude"]);
//         bounds.extend(position);
//         marker = new google.maps.Marker({
//             position: position,
//             map: map
//         });
//
//         if(obj.hasOwnProperty("event_clearance_subgroup") != null) {
//           if(categoryHash.hasOwnProperty(obj["event_clearance_subgroup"])) {
//             categoryHash[obj["event_clearance_subgroup"]] += 1;
//           } else {
//             categoryHash[obj["event_clearance_subgroup"]] = 1;
//           }
//         }
//
//         map.fitBounds(bounds);
//       } else { continue; }
//     }
//
//     // Category buttons
// //     <button type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off">
// //   Single toggle
// // </button>
//     $.each(categoryHash, function(key, value) {
//       var $btn = $("<button></button");
//       $btn.addClass("btn btn-default btn-custom");
//       $btn.attr("type", "button");
//       $btn.attr("data-toggle", "button");
//       $btn.attr("aria-pressed", "false");
//       $btn.attr("autocomplete", "off");
//       $btn.text(key);
//       $(".btn-group").append($btn);
//     });
//   });
//
//   // if a button is clicked, remove all the current data,
//   // make an api call for it and
//   // display the relevant data on the map
//
//
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

// $(document).ready(function() {
//   $(".btn-group").on("click", ".btn-custom", function(event) {
//     var btn = $(event.target);
//     if(!btn.hasClass("active")) {
//       // if it had the active class, that means it's being unchecked
//       var map;
//       var type = btn.text();
//       var bounds = new google.maps.LatLngBounds();
//       var mapOptions = {
//           mapTypeId: 'roadmap'
//       };
//
//       // Display a map on the page
//       map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
//       map.setTilt(45);
//
//       // Map the destination (Century Link)
//       marker = new google.maps.Marker({
//         position: new google.maps.LatLng("47.593304", "-122.332165"),
//         map: map,
//         icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
//       });
//
//       jQuery.getJSON(url + "?$where=within_circle(incident_location, 47.593304, -122.332165,1069)&initial_type_subgroup=" + type, function(data) {
//         for(i = 0; i < data.length; i++ ) {
//           var obj = data[i];
//
//           if(obj.hasOwnProperty("latitude") && obj.hasOwnProperty("longitude")) {
//             var position = new google.maps.LatLng(obj["latitude"], obj["longitude"]);
//             bounds.extend(position);
//             marker = new google.maps.Marker({
//                 position: position,
//                 map: map
//             });
//
//             map.fitBounds(bounds);
//           } else { continue; }
//         }
//       });
//     }
//   });
// });
