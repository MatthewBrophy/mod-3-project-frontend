// //snow
// // 1. Define a color for the snow
// snowStorm.snowColor = '#fff';
// // 2. To optimize, define the max number of flakes that can
// // be shown on screen at once
// snowStorm.flakesMaxActive = 200;
// // 3. Allow the snow to flicker in and out of the view
// snowStorm.useTwinkleEffect = true;
// // 4. Start the snowstorm!
// snowStorm.start();

//mapping

let center = [ -98.5795, 39.8282 ];
mapboxgl.accessToken =
	'pk.eyJ1IjoibXRiYWtlcnNwbGl0dGVyIiwiYSI6ImNqc3dxemJtaDBoYXY0M3BqN3VkMDA3dWgifQ.96NXAB8dmRLa8O2ac_KUqA';

var map = new mapboxgl.Map({
	container: 'main-map',
	center: center,
	zoom: 3,
	style: 'mapbox://styles/mapbox/outdoors-v9'
});

let resorts = 'http://localhost:3000/api/v1/resorts';
fetch(resorts)
	.then(function(response) {
		return response.json();
	})
	.then(function(resorts) {
		for (var i = 0; i < resorts.length; i++) {
			var obj = resorts[i];
			let myLatlng = new mapboxgl.LngLat(obj.longitude, obj.latitude);
			var marker = document.createElement('div');
			marker.id = 'marker';
			new mapboxgl.Marker(marker)
				.setLngLat(myLatlng)
				.setPopup(
					new mapboxgl.Popup({ offset: 25 }).setHTML('<h3>' + obj.name + '</h3><p>' + obj.address1 + '</p>')
				)
				.addTo(map);
		}
	});
