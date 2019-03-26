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
document.body.style.backgroundColor = 'black';
let welcomeDiv = document.getElementById('main-button');
let startButton = document.createElement('button');
startButton.textContent = 'Enter the Gnar';
startButton.classList = 'main-button';
welcomeDiv.appendChild(startButton);
startButton.addEventListener('click', function() {
	welcomeDiv.remove();
	showMap();
});

function showMap() {
	const RESORTS = 'http://localhost:3000/api/v1/resorts';
	const WEATHER = 'http://localhost:3000/api/v1/weather';

	let center = [ -118.291388, 45.97 ];
	mapboxgl.accessToken =
		'pk.eyJ1IjoibXRiYWtlcnNwbGl0dGVyIiwiYSI6ImNqc3dxemJtaDBoYXY0M3BqN3VkMDA3dWgifQ.96NXAB8dmRLa8O2ac_KUqA';

	let map = new mapboxgl.Map({
		container: 'main-map',
		center: center,
		zoom: 5.5,
		style: 'mapbox://styles/mapbox/outdoors-v9'
	});

	fetch(RESORTS)
		.then(function(response) {
			return response.json();
		})
		.then(function(resorts) {
			for (resort of resorts) {
				buildPopUp(resort);
			}
		});

	function buildPopUp(resort) {
		let myLatlng = new mapboxgl.LngLat(resort.longitude, resort.latitude);
		let marker = document.createElement('div');
		marker.id = 'marker';

		let div = window.document.createElement('div');
		let title = document.createElement('h3');
		title.textContent = resort.name;
		let baseElevation = document.createElement('p');
		if (resort.bottom_elevation) {
			baseElevation.textContent = `Base Elevation: ${resort.bottom_elevation} ft`;
		}

		let topElevation = document.createElement('p');
		if (resort.top_elevation) {
			topElevation.textContent = `Top Elevation: ${resort.top_elevation} ft`;
		}
		let snowfall = document.createElement('p');
		snowfall.textContent = `Average Snowfall: ${Math.floor(resort.annual_snowfall / 2.54)} inches`;
		let liftCapacity = document.createElement('p');
		if (resort.hourly_lift_capacity) {
			liftCapacity.textContent = `Lift Capacity: ${resort.hourly_lift_capacity} skiers/hr`;
		}

		div.appendChild(title);
		div.appendChild(snowfall);
		div.appendChild(baseElevation);
		div.appendChild(topElevation);
		div.appendChild(liftCapacity);

		createPopupButton(marker, myLatlng, div, map);
	}

	function createPopupButton(marker, myLatlng, div, map) {
		let popup = new mapboxgl.Popup().setLngLat(myLatlng).setDOMContent(div).addTo(map);
		new mapboxgl.Marker(marker).setLngLat(myLatlng).setPopup(popup).addTo(map);
		marker.addEventListener('click', function() {
			map.flyTo({
				center: myLatlng,
				zoom: 12
			});
		});

		let zoomOutButton = document.createElement('button');
		zoomOutButton.classList = 'popup-button';
		zoomOutButton.textContent = 'Full Extent';
		zoomOutButton.addEventListener('click', function() {
			popup.remove();
			map.flyTo({
				center: center,
				zoom: 5.5
			});
		});

		let weatherButton = document.createElement('button');
		weatherButton.classList = 'popup-button';
		weatherButton.textContent = 'Weather Report';
		weatherButton.addEventListener('click', function() {
			getWeather(resort);
		});

		let websiteButton = document.createElement('button');
		websiteButton.classList = 'popup-button';
		websiteButton.textContent = 'Resort Website';
		websiteButton.addEventListener('click', function() {
			mainDisplay.innerHTML = '';
			window.location = resort.official_website;
		});

		div.appendChild(weatherButton);
		div.appendChild(websiteButton);
		div.appendChild(zoomOutButton);
	}

	function getWeather(resort) {
		fetch(WEATHER, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				latitude: `${resort.latitude}`,
				longitude: `${resort.longitude}`
			})
		})
			.then((res) => res.json())
			.then((weather) => {
				buildWeatherPopup(weather);
				debugger;
			});
	}

	function buildWeatherPopup(weather) {
		let weatherPopup = document.getElementById('light');
		weatherPopup.style.display = 'block';
		let fade = document.getElementById('fade');
		fade.style.display = 'block';

		let closeButton = document.createElement('button');
		closeButton.classList = 'close-button';
		closeButton.textContent = 'Close';
		closeButton.addEventListener('click', function() {
			closeButton.remove();
			weatherPopup.style.display = 'none';
			fade.style.display = 'none';
		});

		weatherPopup.appendChild(closeButton);

		displayWeather(weatherPopup, weather);
	}

	function displayWeather(weatherPopup, weather) {
		let weatherSummary = document.createElement('p');
		weatherSummary.textContent = weather.daily.summary;
		weatherPopup.appendChild(weatherSummary);
		console.log('Reached display weather function');
	}
}
