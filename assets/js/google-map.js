/*! 
	Author: Danqing Ni
	| license 
*/

var __FLAG__ 		= 'images/flag.png',
		__MARKER__	= 'images/marker.png',
		__PIN__			= 'images/pin.png',
		__KEY__ 		= 'AIzaSyBcbvpuGwzx1X9mqto_bmiNSJeFCYKK4go',
		__PLACE__ 	= 'https://maps.googleapis.com/maps/api/place/textsearch/json?sensor=false&key='
									+ __KEY__,
		__LAT__			= 0,
		__LNG__			= 0;

var map, zoomVal = 4,
		intialPoint, targetPosition, targetMarker, targetCircle, targetRadius = 1000;


var markerOption = {
			draggable: true,
			cursor: 'pointer',
		},
		circleOption = {
			draggable: true,
			visible: true,
			editable: true,
			fillColor: 'gray',
			fillOpacity: 0.5,
		};

function loadMap() {
	var mapOptions = {
		zoom: zoomVal,
		center: intialPoint,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	map = new google.maps.Map(document.getElementById('map-canvas'),
			mapOptions);
			
	google.maps.event.addListener(map, 'click', setTarget);
}		
		
function loadMapScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBcbvpuGwzx1X9mqto_bmiNSJeFCYKK4go&libraries=places&sensor=false&' +
      'callback=initialMap';
  document.body.appendChild(script);
}

function initialMap() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			intialPoint = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			zoomVal = 12;
			loadMap();
		});
	}	else {
		intialPoint = new google.maps.LatLng(__LAT__, __LNG__);
		zoomVal = 4;
		alert("Geolocation is not supported by this browser.");
		loadMap();
	}
	
	$( '#search>input' ).keypress(function(event){
		if(event.which == 13) {
			//key enter
			textSearch();
		}
	});
	$( '#search>button' ).click(textSearch);
	$( '#longitude' ).change(function() {
		targetPosition = new google.maps.LatLng($( '#latitude' ).val(), $( '#longitude' ).val());
		targetMarker.setPosition(targetPosition);
		targetCircle.setCenter(targetPosition);
		map.setCenter(targetPosition);
	});
	$( '#latitude' ).change(function() {
		targetPosition = new google.maps.LatLng($( '#latitude' ).val(), $( '#longitude' ).val());
		targetMarker.setPosition(targetPosition);
		targetCircle.setCenter(targetPosition);
		map.setCenter(targetPosition);
	});
	$( '#radius' ).val(targetRadius);
	$( '#radius' ).change(function() {
		targetCircle.setRadius( parseFloat($( '#radius' ).val()) );
	});
}

function setTarget(event) {
	targetPosition = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
	$('#latitude').val(targetPosition.lat());
	$('#longitude').val(targetPosition.lng());
	if(targetMarker)
		targetMarker.setMap(null);
	if(targetCircle)
		targetCircle.setMap(null);
		
	targetMarker = setMarker(targetPosition, __PIN__);
	targetCircle = setCircle(targetPosition, parseFloat($('#radius').val()));
	
	google.maps.event.addListener(targetMarker, 'dragend', function(){
		targetCircle.setCenter(targetMarker.getPosition());
		targetPosition = new google.maps.LatLng(
			targetMarker.getPosition().lat(), targetMarker.getPosition().lng());
		$('#latitude').val(targetPosition.lat());
		$('#longitude').val(targetPosition.lng());
	});
		
	google.maps.event.addListener(targetCircle, 'center_changed', function(){
		targetMarker.setPosition(targetCircle.getCenter());
		targetPosition = new google.maps.LatLng(
			targetCircle.getCenter().lat(), targetCircle.getCenter().lng());
		$('#latitude').val(targetPosition.lat());
		$('#longitude').val(targetPosition.lng());
	});

	google.maps.event.addListener(targetCircle, 'radius_changed', function(){
		$('#radius').val(targetCircle.getRadius());
	});
}

function setMarker(position, icon) {
	var newMarker = new google.maps.Marker(markerOption);
	newMarker.setPosition(position);
	newMarker.setIcon(__BASE__ + icon);
	newMarker.setMap(map);
	return newMarker;
}

function setCircle(center, radius) {
	if(!center) {
		console.log("target point has not been set!");
		return;
	}
	var newCircle = new google.maps.Circle(circleOption);
	newCircle.setCenter(center);
	newCircle.setRadius(parseFloat( radius ));
	newCircle.setMap(map);
	return newCircle;
}

function textSearch() {
  var request = {
			query: $( '#search>input' ).val(),
		};
	var service = new google.maps.places.PlacesService(map);
	service.textSearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
		map.setCenter(results[0].geometry.location);
  }
}
