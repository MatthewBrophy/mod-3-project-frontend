//mapping
document.body.style.backgroundColor = 'black';
let welcomeDiv = document.getElementById('main-button');
let startButton = document.getElementById('main-button');
let snowFlake = document.getElementById('snowflake');
startButton.addEventListener('click', function() {
	snowFlake.innerHTML = '';
	welcomeDiv.remove();
	showMap();
});

function showMap() {
	const RESORTS = 'http://localhost:3000/api/v1/resorts';
	const WEATHER = 'http://localhost:3000/api/v1/weather';
	let test = [];
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
				buildWeatherPopup(resort, weather);
			});
	}

	function buildWeatherPopup(resort, weather) {
		let weatherPopup = document.getElementById('light');
		weatherPopup.style.display = 'block';
		let fade = document.getElementById('fade');
		fade.style.display = 'block';

		let buttonWrapper = document.createElement('div');
		buttonWrapper.id = 'button-wrapper';
		let closeButton = document.createElement('button');
		closeButton.classList = 'close-button';
		closeButton.textContent = 'Close';
		closeButton.addEventListener('click', function() {
			weatherPopup.innerHTML = '';
			closeButton.remove();
			weatherPopup.style.display = 'none';
			fade.style.display = 'none';
		});

		buttonWrapper.appendChild(closeButton);
		displayWeather(resort, weatherPopup, weather, buttonWrapper);
	}

	function displayWeather(resort, weatherPopup, weather, buttonWrapper) {
		weatherPopup.innerHTML = '';
		let mainDisplayPane = document.createElement('div');
		mainDisplayPane.classList.add('container', 'text-align-center');
		let titleRow = document.createElement('div');
		titleRow.id = 'center-text';
		titleRow.classList.add('row');
		let titleDiv = document.createElement('div');
		let title = document.createElement('h2');
		title.textContent = resort.name;

		let iconRow = document.createElement('div');
		iconRow.id = 'center-text';
		iconRow.classList.add('row');
		let iconDiv = document.createElement('div');
		let icon = document.createElement('i');
		icon.classList = weatherIconFunction(weather);
		icon.id = 'lg-weather';

		let weatherBlurb = document.createElement('span');
		weatherBlurb.id = 'weatherBlurb';
		weatherBlurb.textContent = `    ${weather.currently.summary}`;

		let dualPane = document.createElement('div');
		dualPane.classList.add('row');
		let leftPane = document.createElement('div');
		leftPane.classList.add('col-md-6', 'left-pane-border');
		let rightPane = document.createElement('div');
		rightPane.classList.add('col-md-6', 'right-pane-border');
		let leftPaneContent = document.createElement('div');
		let leftPaneTitle = document.createElement('p');
		leftPaneTitle.id = 'pane-title';
		leftPaneTitle.innerText = 'Current Conditions';
		let rightPaneContent = document.createElement('div');
		let rightPaneTitle = document.createElement('p');
		rightPaneTitle.id = 'pane-title';
		rightPaneTitle.innerText = 'Weekly Summary';

		let currentWeatherStats = document.createElement('ul');
		let currentTemp = document.createElement('li');
		currentTemp.textContent = `Temperature: ${weather.currently.temperature} °F`;

		let currentUvIndex = document.createElement('li');
		if (weather.currently.uvIndex <= 2) {
			currentUvIndex.innerText = `UV Index: ${weather.currently.uvIndex} Safe!`;
			currentUvIndex.classList.add('green-text');
		} else if (weather.currently.uvIndex >= 3 && weather.currently.uvIndex < 6) {
			currentUvIndex.innerText = `UV Index: ${weather.currently.uvIndex} Moderate...be mindful.`;
			currentUvIndex.classList.add('orange-text');
		} else {
			currentUvIndex.innerText = `UV Index: ${weather.currently.uvIndex} STAY INSIDE BRAH'!`;
			currentUvIndex.classList.add('red-text');
		}

		let currentWindSpeed = document.createElement('li');
		currentWindSpeed.innerText = `Wind Speed ${weather.currently.windSpeed} mph`;

		let forecastSummary = document.createElement('p');
		forecastSummary.id = 'forecast-summary';
		forecastSummary.innerText = weather.daily.summary;

		let closeButtonRow = document.createElement('div');
		closeButtonRow.classList.add('row');
		closeButtonRow.id = 'center-text';
		let closeButton = document.createElement('button');
		closeButton.classList = 'close-button';
		closeButton.textContent = 'Close';
		closeButton.onclick = () => {
			weatherPopup.innerHTML = '';
			closeButton.remove();
			weatherPopup.style.display = 'none';
			fade.style.display = 'none';
		};

		weatherPopup.appendChild(mainDisplayPane);
		mainDisplayPane.appendChild(titleRow);
		titleRow.appendChild(titleDiv);
		titleDiv.appendChild(title);

		mainDisplayPane.appendChild(iconRow);
		iconRow.appendChild(iconDiv);
		iconDiv.appendChild(icon);
		iconDiv.appendChild(weatherBlurb);

		mainDisplayPane.appendChild(dualPane);
		dualPane.appendChild(leftPane);
		dualPane.appendChild(rightPane);
		leftPane.appendChild(leftPaneContent);
		rightPane.appendChild(rightPaneContent);
		leftPaneContent.appendChild(leftPaneTitle);
		rightPaneContent.appendChild(rightPaneTitle);

		leftPaneContent.appendChild(currentWeatherStats);
		currentWeatherStats.appendChild(currentTemp);
		currentWeatherStats.appendChild(currentUvIndex);
		currentWeatherStats.appendChild(currentWindSpeed);

		console.log(weather);
	}

	function buildReviewBox(resort) {
		let reviewPopup = document.getElementById('review-light');
		reviewPopup.style.display = 'block';
		let fade = document.getElementById('review-fade');
		fade.style.display = 'block';

		let buttonWrapper = document.createElement('div');
		buttonWrapper.id = 'button-wrapper';
		let closeButton = document.createElement('button');
		closeButton.classList = 'close-button';
		closeButton.textContent = 'Close';
		closeButton.addEventListener('click', function() {
			reviewPopup.innerHTML = '';
			closeButton.remove();
			reviewPopup.style.display = 'none';
			fade.style.display = 'none';
		});

		buttonWrapper.appendChild(closeButton);
		reviewPopup.appendChild(buttonWrapper);
		getReviews(reviewPopup, resort);
		console.log('reached review function');

		let newCommentButton = document.createElement('button');
		newCommentButton.classList = 'popup-button';
		newCommentButton.textContent = 'Leave a review';
		newCommentButton.addEventListener('click', function() {
			reviewPopup.innerHTML = '';
			renderReviewForm(reviewPopup, resort);
		});

		reviewPopup.appendChild(newCommentButton);
	}

	function getReviews(resortPopup, resort) {
		fetch(`http://localhost:3000/api/v1/resorts/${resort.id}/comments`)
			.then(function(response) {
				return response.json();
			})
			.then(function(comments) {
				for (comment of comments) {
					displayReviews(resortPopup, resort, comment);
				}
			});
	}

	function displayReviews(resortPopup, resort, comment) {
		let reviewUl = document.createElement('ul');
		let reviewDiv = document.createElement('div');
		let reviewTitle = document.createElement('h4');
		reviewTitle.textContent = comment.title;
		let reviewLi = document.createElement('li');
		reviewLi.textContent = comment.content;

		reviewDiv.appendChild(reviewTitle);
		reviewDiv.appendChild(reviewLi);
		reviewUl.appendChild(reviewDiv);
		resortPopup.appendChild(reviewUl);
	}

	function renderReviewForm(reviewPopup, resort) {
		let reviewForm = document.createElement('form');

		let titleDiv = document.createElement('div');
		titleDiv.classList = 'form-group';

		let titleLabel = document.createElement('label');
		titleLabel.for = 'review-title';
		titleLabel.textContent = 'Title';

		let titleInput = document.createElement('input');
		titleInput.classList = 'title-control';
		titleInput.id = 'review-title';

		let contentDiv = document.createElement('div');
		contentDiv.classList = 'form-group';

		let contentLabel = document.createElement('label');
		contentLabel.for = 'review-content';
		contentLabel.textContent = 'Review';

		let contentInput = document.createElement('textarea');
		contentInput.classList = 'form-control';
		contentInput.id = 'review-content';

		let submitButton = document.createElement('button');
		submitButton.textContent = 'Submit';
		submitButton.type = 'submit';
		submitButton.classList = 'popup-button';

		reviewForm.addEventListener('submit', function(event) {
			event.preventDefault();
			let titleEntry = document.getElementById('review-title').value;
			let contentEntry = document.getElementById('review-content').value;
			persistComment(titleEntry, contentEntry, resort);
			reviewPopup.innerHTML = '';
			buildReviewBox(resort);
		});

		titleDiv.appendChild(titleLabel);
		titleDiv.appendChild(titleInput);

		contentDiv.appendChild(contentLabel);
		contentDiv.appendChild(contentInput);

		reviewForm.appendChild(titleDiv);
		reviewForm.appendChild(contentDiv);

		reviewForm.appendChild(submitButton);
		reviewPopup.appendChild(reviewForm);
	}

	function persistComment(titleEntry, contentEntry, resort) {
		let newReview = {
			resort_id: resort.id,
			date: null,
			title: titleEntry,
			content: contentEntry
		};
		fetch(`http://localhost:3000/api/v1/resorts/${resort.id}/comments`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newReview)
		});
	}

	function weatherIconFunction(weather) {
		switch (weather.currently.icon) {
			case 'clear-day':
				return 'fas fa-sun';
				break;
			case 'clear-night':
				return 'fas fa-moon';
				break;
			case 'cloudy':
				return 'fas fa-cloud';
				break;
			case 'partly-cloudy-day':
				return 'fa fa-cloud-sun ';
				break;
			case 'partly-cloudy-night':
				return 'fas fa-cloud-moon';
				break;
			case 'snow':
				return 'fas fa-snowflake';
				break;
			case 'rain':
				return 'fa fa-cloud-rain';
				break;
			case 'fog':
				return 'fas fa-water';
				break;
			case 'wind':
				return 'fas fa-wind';
				break;
		}
	}
}
