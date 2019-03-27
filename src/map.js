function showMap() {
	console.log('getting to show map');
	const RESORTS = 'http://localhost:3000/api/v1/resorts';
	let center = [ -118.291388, 45.97 ];
	mapboxgl.accessToken =
		'pk.eyJ1IjoibXRiYWtlcnNwbGl0dGVyIiwiYSI6ImNqc3dxemJtaDBoYXY0M3BqN3VkMDA3dWgifQ.96NXAB8dmRLa8O2ac_KUqA';

	let map = new mapboxgl.Map({
		container: 'main-map',
		center: center,
		zoom: 5.5,
		maxZoom: 10,
		style: 'mapbox://styles/mapbox/outdoors-v9'
	});

	map.addControl(
		new MapboxGeocoder({
			accessToken: mapboxgl.accessToken
		})
	);
	map.addControl(new mapboxgl.NavigationControl());

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

		createPopupButton(resort, marker, myLatlng, div, map);
	}

	function createPopupButton(resort, marker, myLatlng, div, map) {
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

		let resortButton = document.createElement('button');
		resortButton.classList = 'popup-button';
		resortButton.textContent = 'Resort Reviews';
		resortButton.addEventListener('click', function() {
			buildReviewBox(resort);
		});

		div.appendChild(weatherButton);
		div.appendChild(resortButton);
		div.appendChild(zoomOutButton);
	}
}