/* global hotels restaurants */

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
    markers.push(marker);
    // console.log('markers is:', markers, 'marker.coords is', marker.coords)
  }

  var markers = [];

  // Removes the markers from the map, but keeps them in the array.
  function clearMarker(index) {
    markers[index].setMap(null);
  }

  var currentDay = 1;
  var daysArray = [];
  var firstDay = new DayObj();
  daysArray.push(firstDay)

  function DayObj () {
    var obj = {};
    this.day = daysArray.length+1;
    this.hotel = {}
    this.restaurants = 1;
    this.activities = 1;
  }

  function AttractionCreator (name, coords, html, type) {
    this.name = name;
    this.coords = coords;
    this.html = html;
    this.type = type;
  }

  var buttonArr = [1];

  $('#add-btn').on('click', function(){
    var buttonHTML = "<button type='button' class='btn btn-primary btn-day btn-circle'>" + (buttonArr.length + 1) + "</button>";
    buttonArr.push(buttonArr.length + 1);
    $(this).prev().after(buttonHTML);
    var newDay = new DayObj;
    console.log('the new day:', newDay)
    daysArray.push(newDay);

  });

  $('.panel-heading').on('click', '.btn-day', function(){
    $('.currentday').removeClass('currentday');
    $(this).addClass( "currentday" );
    currentDay = $(this).text();
  });




  hotels.forEach((current, idx) => {
    $('#hotel-choices').append("<option>" + current.name + "</option>");
  });

  restaurants.forEach((current, idx) => {
    $('#restaurant-choices').append("<option>" + current.name + "</option>");
  });

  activities.forEach((current, idx) => {
    $('#activity-choices').append("<option>" + current.name + "</option>");
  });

  var itineraryHTML1 = "<div class='col-lg-10 col-md-10 col-ms-10 col-xs-10'>";
  var itineraryHTML2 = "</div><div class='col-lg-2 col-md-2 col-sm-2 col-xs-2'><button class='btn btn-xs btn-danger remove btn-circle'>x</button></div>";

  $("select").next().on('click', function() {
    var type = $(this).prev().attr('name');
    var value = $(this).prev().val();


    if(type === 'hotel') {
      var coords = hotels.find((element) => element.name === value ).place.location;
      if ($('#hotel-itinerary').children().length === 0) {
          var html = itineraryHTML1 + "<p data-coords='" + coords + "'>" + value + "</p>" + itineraryHTML2
          $('#hotel-itinerary').append(html);
          drawMarker('hotel', coords);

          var newHotel = new AttractionCreator(value, coords, html, 'hotel')
          daysArray[currentDay-1].hotel = newHotel;
          console.log('the new hotel:', newHotel);
          console.log('added at day', currentDay-1)
          console.log(daysArray);
      } else {
        var html = itineraryHTML1 + "<p data-coords='" + coords + "'>" + value + "</p>" + itineraryHTML2;
        var coordsToDelete = $('#hotel-itinerary p')[0].dataset.coords;
        var index;
        var markerToDelete = markers.forEach((current, idx) => {
          if (current.coords.toString() === coordsToDelete.toString()) {
            index = idx;
          }
        });
        clearMarker(index);
        $('#hotel-itinerary').children().remove();
        $('#hotel-itinerary').append(html);
        drawMarker('hotel', coords);

        var newHotel = new AttractionCreator(value, coords, html, 'hotel')
        console.log('the new hotel:', newHotel);
        console.log('added at day', currentDay-1)
        daysArray[currentDay-1].hotel = newHotel;
        console.log(daysArray);
      }
    } else if (type === 'restaurant') {
      var coords = restaurants.find((element) => element.name === value ).place.location;

      $('#rest-itinerary').append(itineraryHTML1 + "<p data-coords='" + coords + "'>" + value + "</p>" + itineraryHTML2);

      drawMarker('restaurant', coords);
    } else if (type === 'activity') {
      var coords = activities.find((element) => element.name === value ).place.location;

      $('#act-itinerary').append(itineraryHTML1 + "<p data-coords='" + coords + "'>" + value + "</p>" + itineraryHTML2);

      drawMarker('activity', coords);
    }
  });

    $('.parent-remove').on('click', 'button', function() {
        var $elem = $(this);

        var $current = $elem.parent();
        var $content = $current.prev();
        var coordsToDelete = $content.find('p')[0].dataset.coords;

        var index;
        markers.forEach((current, idx) => {
          if (current.coords.toString() === coordsToDelete) {
           index = idx;
          }
        });

        clearMarker(index);

        $current.remove();
        $content.remove();
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
