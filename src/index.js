document.addEventListener('DOMContentLoaded', function() {});

function fetchWeather() {
	fetch('https://api.darksky.net/forecast/4e39d108b8018f13ec1aa2d8be2e4830/37.8267,-122.4233', {
		method: 'GET',
		mode: 'no-cors',
		headers: { 'Content-Type': 'application/json' }
	})
		.then((res) => res.json())
		.then((results) => console.log(results));
}

fetchWeather();
