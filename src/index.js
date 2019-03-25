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
const RESORTS = 'http://localhost:3000/api/v1/resorts';

let center = [ -98.5795, 39.8282 ];
mapboxgl.accessToken =
	'pk.eyJ1IjoibXRiYWtlcnNwbGl0dGVyIiwiYSI6ImNqc3dxemJtaDBoYXY0M3BqN3VkMDA3dWgifQ.96NXAB8dmRLa8O2ac_KUqA';

var map = new mapboxgl.Map({
	container: 'main-map',
	center: center,
	zoom: 3,
	style: 'mapbox://styles/mapbox/outdoors-v9'
});

fetch(RESORTS)
	.then(function(response) {
		return response.json();
	})
	.then(function(resorts) {
		buildPopUp(resorts);
	});

function buildPopUp(resorts) {
	for (let i = 0; i < resorts.length; i++) {
		let obj = resorts[i];
		let myLatlng = new mapboxgl.LngLat(obj.longitude, obj.latitude);
		let marker = document.createElement('div');
		marker.id = 'marker';
		var div = window.document.createElement('div');
		var title = document.createElement('h3');
		let weatherButton = document.createElement('button');
		weatherButton.textContent = 'Weather Report';
		weatherButton.addEventListener('click', function() {
			getWeather(obj);
		});
		title.textContent = obj.name;
		div.appendChild(title);
		div.appendChild(weatherButton);
		var popup = new mapboxgl.Popup().setLngLat(myLatlng).setDOMContent(div).addTo(map);
		new mapboxgl.Marker(marker).setLngLat(myLatlng).setPopup(popup).addTo(map);
	}
}

//connect to dark sky api
function getWeather(obj) {
	console.log('reached weather function');
	console.log(obj);
	let WEATHER_API = `https://weather-app-rails.herokuapp.com/weather?loc=${obj.latitude}_${obj.longitude}`;
	fetch(WEATHER_API)
		.then(function(response) {
			return response.json();
		})
		.then(function(weather) {
			displayWeather(weather);
		});
}

function displayWeather(weather) {
	console.log(weather);
	let mapDiv = document.getElementById('map-container');
	let weatherDiv = document.createElement('div');
	let summary = document.createElement('h3');
	summary.textContent = weather.summary;

	weatherDiv.appendChild(summary);
	// mapDiv.appendChild(weatherDiv);
}
