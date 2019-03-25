// document.addEventListener('DOMContentLoaded', function() {});

// function fetchWeather() {
// 	fetch('https://api.darksky.net/forecast/4e39d108b8018f13ec1aa2d8be2e4830/37.8267,-122.4233', {
// 		method: 'GET',
// 		mode: 'no-cors',
// 		headers: { 'Content-Type': 'application/json' }
// 	})
// 		.then((res) => res.json())
// 		.then((results) => console.log(results));
// }

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

let flatiron = [ -98.5795, 39.8282 ];
mapboxgl.accessToken =
	'pk.eyJ1IjoibXRiYWtlcnNwbGl0dGVyIiwiYSI6ImNqc3dxemJtaDBoYXY0M3BqN3VkMDA3dWgifQ.96NXAB8dmRLa8O2ac_KUqA';

var map = new mapboxgl.Map({
	container: 'main-map',
	center: [ -98.5795, 39.8282 ],
	zoom: 3,
	style: 'mapbox://styles/mapbox/dark-v10'
});

fetchWeather();
