$(function initializeMap (){

  var fullstackAcademy = new google.maps.LatLng(40.705086, -74.009151);

  var styleArr = [{
    featureType: 'landscape',
    stylers: [{ saturation: -100 }, { lightness: 60 }]
  }, {
    featureType: 'road.local',
    stylers: [{ saturation: -100 }, { lightness: 40 }, { visibility: 'on' }]
  }, {
    featureType: 'transit',
    stylers: [{ saturation: -100 }, { visibility: 'simplified' }]
  }, {
    featureType: 'administrative.province',
    stylers: [{ visibility: 'off' }]
  }, {
    featureType: 'water',
    stylers: [{ visibility: 'on' }, { lightness: 30 }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [{ color: '#ef8c25' }, { lightness: 40 }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ visibility: 'off' }]
  }, {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [{ color: '#b6c54c' }, { lightness: 40 }, { saturation: -40 }]
  }];

  var mapCanvas = document.getElementById('map-canvas');

  var currentMap = new google.maps.Map(mapCanvas, {
    center: fullstackAcademy,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: styleArr
  });

  var iconURLs = {
    hotel: '/images/lodging_0star.png',
    restaurant: '/images/restaurant.png',
    activity: '/images/star-3.png'
  };

  function drawMarker (type, coords) {
    var latLng = new google.maps.LatLng(coords[0], coords[1]);
    var iconURL = iconURLs[type];
    var marker = new google.maps.Marker({
      icon: iconURL,
      position: latLng
    });
    marker.setMap(currentMap);
    marker.coords = coords;
    marker.type = type;
    markers.push(marker)
    console.log('markers is:', markers)
  }

  var markers = [];




  // Removes the markers from the map, but keeps them in the array.
  function clearMarker(index) {
    markers[index].setMap(null);
  }

  // drawMarker('hotel', [40.705137, -74.007624]);
  // drawMarker('restaurant', [40.705137, -74.013940]);
  // drawMarker('activity', [40.716291, -73.995315]);

  hotels.forEach((current, idx) => {
    $('#hotel-choices').append("<option>" + current.name + "</option>")
  })

  restaurants.forEach((current, idx) => {
    $('#restaurant-choices').append("<option>" + current.name + "</option>")
  })

  activities.forEach((current, idx) => {
    $('#activity-choices').append("<option>" + current.name + "</option>")
  })

  var itineraryHTML1 = "<div class='col-lg-10 col-md-10 col-ms-10 col-xs-10'>"
  var itineraryHTML2 = "</div><div class='col-lg-2 col-md-2 col-sm-2 col-xs-2'><span class='glyphicon glyphicon-remove-circle'></span></div>"

  $("select").next().on('click', function() {
    var type = $(this).prev().attr('name');
    var value = $(this).prev().val();

    if(type === 'hotel') {
      if ($('#hotel-itinerary').children().length === 0) {
          var $appendObj = $(itineraryHTML1 + "<p>" + value + "</p>" + itineraryHTML2);
          $appendObj.data =
          $('#hotel-itinerary').append(itineraryHTML1 + "<p>" + value + "</p>" + itineraryHTML2)
          var coords = hotels.find((element) => element.name === value ).place.location;
          console.log("this is coords", coords)
          drawMarker('hotel', coords);
      } else {
        $('#hotel-itinerary').children().remove()
        $('#hotel-itinerary').append(itineraryHTML1 + "<p>" + value + "</p>" + itineraryHTML2)
          // markers = markers.filter((current) => )

        drawMarker('hotel', coords);
      }
    } else if (type === 'restaurant') {
      $('#rest-itinerary').append(itineraryHTML1 + "<p>" + value + "</p>" + itineraryHTML2)
      var coords = restaurants.find((element) => element.name === value ).place.location;
      drawMarker('restaurant', coords);
    } else if (type === 'activity') {
      $('#act-itinerary').append(itineraryHTML1 + "<p>" + value + "</p>" + itineraryHTML2)
      var coords = activities.find((element) => element.name === value ).place.location;
      drawMarker('activity', coords);
    }
  });

});


































// function initialize_gmaps() {
//     // initialize new google maps LatLng object
//     var myLatlng = new google.maps.LatLng(40.705189,-74.009209);
//     // set the map options hash
//     var mapOptions = {
//         zoomControl: false,
//         streetViewControl: false,
//         mapTypeControl: false,
//         scrollwheel: false,
//         center: myLatlng,
//         zoom: 16,
//         mapTypeId: google.maps.MapTypeId.ROADMAP,
//         //styles thanks to Adam Krogh.
//         styles: [
//             {
//                 "featureType": "all",
//                 "elementType": "labels.text.fill",
//                 "stylers": [
//                     {
//                         "color": "#ffffff"
//                     }
//                 ]
//             },
//             {
//                 "featureType": "all",
//                 "elementType": "labels.text.stroke",
//                 "stylers": [
//                     {
//                         "color": "#000000"
//                     },
//                     {
//                         "lightness": 13
//                     }
//                 ]
//             },
//             {
//                 "featureType": "administrative",
//                 "elementType": "geometry.fill",
//                 "stylers": [
//                     {
//                         "color": "#000000"
//                     }
//                 ]
//             },
//             {
//                 "featureType": "administrative",
//                 "elementType": "geometry.stroke",
//                 "stylers": [
//                     {
//                         "color": "#144b53"
//                     },
//                     {
//                         "lightness": 14
//                     },
//                     {
//                         "weight": 1.4
//                     }
//                 ]
//             },
//             {
//                 "featureType": "landscape",
//                 "elementType": "all",
//                 "stylers": [
//                     {
//                         "color": "#08304b"
//                     }
//                 ]
//             },
//             {
//                 "featureType": "poi",
//                 "elementType": "geometry",
//                 "stylers": [
//                     {
//                         "color": "#0c4152"
//                     },
//                     {
//                         "lightness": 5
//                     }
//                 ]
//             },
//             {
//                 "featureType": "road.highway",
//                 "elementType": "geometry.fill",
//                 "stylers": [
//                     {
//                         "color": "#000000"
//                     }
//                 ]
//             },
//             {
//                 "featureType": "road.highway",
//                 "elementType": "geometry.stroke",
//                 "stylers": [
//                     {
//                         "color": "#0b434f"
//                     },
//                     {
//                         "lightness": 25
//                     }
//                 ]
//             },
//             {
//                 "featureType": "road.arterial",
//                 "elementType": "geometry.fill",
//                 "stylers": [
//                     {
//                         "color": "#000000"
//                     }
//                 ]
//             },
//             {
//                 "featureType": "road.arterial",
//                 "elementType": "geometry.stroke",
//                 "stylers": [
//                     {
//                         "color": "#0b3d51"
//                     },
//                     {
//                         "lightness": 16
//                     }
//                 ]
//             },
//             {
//                 "featureType": "road.local",
//                 "elementType": "geometry",
//                 "stylers": [
//                     {
//                         "color": "#000000"
//                     }
//                 ]
//             },
//             {
//                 "featureType": "transit",
//                 "elementType": "all",
//                 "stylers": [
//                     {
//                         "color": "#146474"
//                     }
//                 ]
//             },
//             {
//                 "featureType": "water",
//                 "elementType": "all",
//                 "stylers": [
//                     {
//                         "color": "#021019"
//                     }
//                 ]
//             }
//         ]
//     };
//     // get the maps div's HTML obj
//     var map_canvas_obj = document.getElementById("map-canvas");
//     // initialize a new Google Map with the options
//     var map = new google.maps.Map(map_canvas_obj, mapOptions);
//     // Add the marker to the map
//     var marker = new google.maps.Marker({
//         position: myLatlng,
//         title:"Hello World!"
//     });
//     // Add the marker to the map by calling setMap()
//     marker.setMap(map);
// }
//
// $(document).ready(function() {
//     initialize_gmaps();
// });
