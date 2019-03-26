//snow
// 1. Define a color for the snow
snowStorm.snowColor = '#fff';
// 2. To optimize, define the max number of flakes that can
// be shown on screen at once
snowStorm.flakesMaxActive = 200;
// 3. Allow the snow to flicker in and out of the view
snowStorm.useTwinkleEffect = true;
// 4. Start the snowstorm!
snowStorm.start();

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
			buildPopUp(resorts);
		});

	function buildPopUp(resorts) {
		for (let i = 0; i < resorts.length; i++) {
			let obj = resorts[i];
			let myLatlng = new mapboxgl.LngLat(obj.longitude, obj.latitude);
			let marker = document.createElement('div');
			marker.id = 'marker';

			let div = window.document.createElement('div');
			let title = document.createElement('h3');
			title.textContent = obj.name;
			let baseElevation = document.createElement('p');
			if (obj.bottom_elevation) {
				baseElevation.textContent = `Base Elevation: ${obj.bottom_elevation} ft`;
			}
			let topElevation = document.createElement('p');
			if (obj.top_elevation) {
				topElevation.textContent = `Top Elevation: ${obj.top_elevation} ft`;
			}
			let snowfall = document.createElement('p');
			snowfall.textContent = `Average Snowfall: ${Math.floor(obj.annual_snowfall / 2.54)} inches`;
			let liftCapacity = document.createElement('p');
			if (obj.hourly_lift_capacity) {
				liftCapacity.textContent = `Lift Capacity: ${obj.hourly_lift_capacity} skiers/hr`;
			}

			let weatherButton = document.createElement('button');
			weatherButton.classList = 'popup-button';
			weatherButton.textContent = 'Weather Report';
			weatherButton.addEventListener('click', function() {
				getWeather(obj);
			});

			let websiteButton = document.createElement('button');
			websiteButton.classList = 'popup-button';
			websiteButton.textContent = 'Resort Website';
			websiteButton.addEventListener('click', function() {
				mainDisplay.innerHTML = '';
				window.location = obj.official_website;
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

			div.appendChild(title);
			div.appendChild(snowfall);
			div.appendChild(baseElevation);
			div.appendChild(topElevation);
			div.appendChild(liftCapacity);
			div.appendChild(weatherButton);
			div.appendChild(websiteButton);
			div.appendChild(zoomOutButton);
			let popup = new mapboxgl.Popup().setLngLat(myLatlng).setDOMContent(div).addTo(map);
			new mapboxgl.Marker(marker).setLngLat(myLatlng).setPopup(popup).addTo(map);
			marker.addEventListener('click', function() {
				map.flyTo({
					center: myLatlng,
					zoom: 12
				});
			});
		}
	}

	//connect to dark sky api
	function getWeather(obj) {
		fetch(`http://localhost:3000/api/v1/weather`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				latitude: `${obj.latitude}`,
				longitude: `${obj.longitude}`
			})
		})
			.then((res) => res.json())
			.then((results) => {
				buildWeatherPopup(results);
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

		displayWeather(weather);
	}

	function displayWeather() {
		console.log('Reached display weather function');
	}
}

function renderSplitScreen() {}
