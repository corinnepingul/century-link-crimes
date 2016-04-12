// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require bootstrap-sprockets
//= require jquery_ujs
//= require turbolinks
//= require_tree .

jQuery(function($) {
    // Asynchronously Load the map API
    var script = document.createElement('script');
    script.src = "http://maps.googleapis.com/maps/api/js?&callback=initialize";
    document.body.appendChild(script);
});

function initialize() {
  var map;
  var bounds = new google.maps.LatLngBounds();
  var mapOptions = {
      mapTypeId: 'roadmap'
  };
  var categoryHash = {};

  // Display a map on the page
  map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
  map.setTilt(45);

  // Map the destination (Century Link)
  marker = new google.maps.Marker({
    position: new google.maps.LatLng("47.593304", "-122.332165"),
    map: map,
    icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
  });

  jQuery.getJSON('https://data.seattle.gov/resource/3k2p-39jp.json?$where=within_circle(incident_location, 47.593304, -122.332165,1069)', function(data) {
    for(i = 0; i < data.length; i++ ) {
      var obj = data[i];

      if(obj.hasOwnProperty("latitude") && obj.hasOwnProperty("longitude")) {
        var position = new google.maps.LatLng(obj["latitude"], obj["longitude"]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map
        });

        if(obj.hasOwnProperty("event_clearance_subgroup") != null) {
          if(categoryHash.hasOwnProperty(obj["event_clearance_subgroup"])) {
            categoryHash[obj["event_clearance_subgroup"]] += 1;
          } else {
            categoryHash[obj["event_clearance_subgroup"]] = 1;
          }
        }

        map.fitBounds(bounds);
      } else { continue; }
    }

    // <div class="btn-group" data-toggle="buttons">
    //   <label class="btn btn-primary active">
    //     <input type="checkbox" checked autocomplete="off"> Checkbox 1 (pre-checked)
    //   </label>
    //   <label class="btn btn-primary">
    //     <input type="checkbox" autocomplete="off"> Checkbox 2
    //   </label>
    //   <label class="btn btn-primary">
    //     <input type="checkbox" autocomplete="off"> Checkbox 3
    //   </label>
    // </div>

    $.each(categoryHash, function(key, value) {
      var $label = $("<label></label>");
      var $input = $("<input/>");
      $input.attr("type", "checkbox");
      $input.attr("autocomplete", "off");
      $label.append($input);
      $label.addClass("btn btn-default btn-custom");
      $label.text(key);
      $(".hello").append($label);
    });
    // $("#category-list").append(btnGroup);

    // for(var key in categoryHash) {
    //   var label = document.createElement("label");
    //   var input = document.createElement("input");
    //   label.classList.add("btn", "btn-default");
    //   input.setAttribute("type", "checkbox");
    //   input.setAttribute("autocomplete", "off");
    //   label.appendChild(input);
    //   label.value(document.createTextNode(key));
    //   var listItem = document.createElement("li");
    //   // var button = document.createElement("button");
    //   // button.appendChild(document.createTextNode(key));
    //   // button.className = "btn btn-default btn-custom";
    //   // listItem.appendChild(button);
    //   listItem.appendChild(label);
    //   list.appendChild(listItem);
    // }
  });


  // Info Window Content
  // var infoWindowContent = [
  //     ['<div class="info_content">' +
  //     '<h3>London Eye</h3>' +
  //     '<p>The London Eye is a giant Ferris wheel situated on the banks of the River Thames. The entire structure is 135 metres (443 ft) tall and the wheel has a diameter of 120 metres (394 ft).</p>' +        '</div>'],
  //     ['<div class="info_content">' +
  //     '<h3>Palace of Westminster</h3>' +
  //     '<p>The Palace of Westminster is the meeting place of the House of Commons and the House of Lords, the two houses of the Parliament of the United Kingdom. Commonly known as the Houses of Parliament after its tenants.</p>' +
  //     '</div>']
  // ];
}

$(".navbar-brand").click(initialize());
