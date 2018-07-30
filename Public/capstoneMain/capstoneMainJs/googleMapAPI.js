// Javascript code required to run the google map API
var map;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: 22.28552, lng: 114.15769},
	  zoom: 12
	});
}