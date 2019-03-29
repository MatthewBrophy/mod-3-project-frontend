const WEATHER = 'https://mighty-cliffs-43940.herokuapp.com/api/v1/weather';

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
	let title = document.createElement('h1');
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

	//weather display pane//
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

	//current weather//
	let currentWeatherStats = document.createElement('ul');
	let currentTemp = document.createElement('li');
	currentTemp.textContent = `Temperature:		${weather.currently.temperature} °F`;

	let currentCloudCover = document.createElement('li');
	currentCloudCover.innerText = `Cloud Cover:		${weather.currently.cloudCover * 100}%`;

	let currentUvIndex = document.createElement('li');
	if (weather.currently.uvIndex <= 2) {
		currentUvIndex.innerText = `UV Index:		${weather.currently.uvIndex} Safe!`;
		currentUvIndex.classList.add('green-text');
	} else if (weather.currently.uvIndex >= 3 && weather.currently.uvIndex < 6) {
		currentUvIndex.innerText = `UV Index:		${weather.currently.uvIndex} Moderate...Lube up BROHAM!.`;
		currentUvIndex.classList.add('orange-text');
	} else {
		currentUvIndex.innerText = `UV Index:		${weather.currently.uvIndex} STAY INSIDE BRAH'!`;
		currentUvIndex.classList.add('red-text');
	}

	let currentWindSpeed = document.createElement('li');
	currentWindSpeed.innerText = `Wind Speed:		${weather.currently.windSpeed} mph`;

	let forecastSummary = document.createElement('p');
	forecastSummary.id = 'forecast-summary';
	forecastSummary.innerText = weather.daily.summary;

	let forecastDisplay = document.createElement('div');
	forecastDisplay.classList.add('container');
	let forecastRow = document.createElement('div');
	forecastRow.classList.add('card-group');

	let closeButtonRow = document.createElement('div');
	closeButtonRow.classList.add('row');
	closeButtonRow.id = 'center-text';
	let closeButton = document.createElement('button');
	closeButton.id = 'x';
	closeButton.textContent = 'x';
	closeButton.onclick = () => {
		weatherPopup.innerHTML = '';
		closeButton.remove();
		weatherPopup.style.display = 'none';
		fade.style.display = 'none';
	};

	let day1forecast = document.createElement('div');
	day1forecast.classList.add('card');
	let day1Img = document.createElement('i');
	day1Img.id = 'sm-weather';
	day1Img.classList = forecast1IconFunction(weather);
	day1Img.classList.add('card-img-top');
	let day1CardBody = document.createElement('div');
	day1CardBody.classList.add('card-body');
	day1CardBody.id = 'cardBody';
	let day1Title = document.createElement('h5');
	day1Title.innerText = new Date(weather.daily.data[1].time * 1000).toString().slice(0, 3);
	let day1weatherDetail = document.createElement('p');
	day1weatherDetail.id = 'weather-detail';
	day1weatherDetail.classList.add('card-text');
	day1weatherDetail.innerText = weather.daily.data[1].icon.replace(/-/g, ' ').replace('day', '').replace('night', '');

	let day2forecast = document.createElement('div');
	day2forecast.classList.add('card');
	let day2Img = document.createElement('i');
	day2Img.id = 'sm-weather';
	day2Img.classList = forecast2IconFunction(weather);
	day2Img.classList.add('card-img-top');
	let day2CardBody = document.createElement('div');
	day2CardBody.classList.add('card-body');
	day2CardBody.id = 'cardBody';
	let day2Title = document.createElement('h5');
	day2Title.innerText = new Date(weather.daily.data[2].time * 1000).toString().slice(0, 3);
	let day2weatherDetail = document.createElement('p');
	day2weatherDetail.classList.add('card-text');
	day2weatherDetail.innerText = weather.daily.data[2].icon.replace(/-/g, ' ').replace('day', '').replace('night', '');

	let day3forecast = document.createElement('div');
	day3forecast.classList.add('card');
	let day3Img = document.createElement('i');
	day3Img.id = 'sm-weather';
	day3Img.classList = forecast3IconFunction(weather);
	day3Img.classList.add('card-img-top');
	let day3CardBody = document.createElement('div');
	day3CardBody.classList.add('card-body');
	day3CardBody.id = 'cardBody';
	let day3Title = document.createElement('h5');
	day3Title.innerText = new Date(weather.daily.data[3].time * 1000).toString().slice(0, 3);
	let day3weatherDetail = document.createElement('p');
	day3weatherDetail.classList.add('card-text');
	day3weatherDetail.innerText = weather.daily.data[3].icon.replace(/-/g, ' ').replace('day', '').replace('night', '');

	let day4forecast = document.createElement('div');
	day4forecast.classList.add('card');
	let day4Img = document.createElement('i');
	day4Img.id = 'sm-weather';
	day4Img.classList = forecast4IconFunction(weather);
	day4Img.classList.add('card-img-top');
	let day4CardBody = document.createElement('div');
	day4CardBody.classList.add('card-body');
	day4CardBody.id = 'cardBody';
	let day4Title = document.createElement('h5');
	day4Title.innerText = new Date(weather.daily.data[4].time * 1000).toString().slice(0, 3);
	let day4weatherDetail = document.createElement('p');
	day4weatherDetail.classList.add('card-text');
	day4weatherDetail.innerText = weather.daily.data[4].icon.replace(/-/g, ' ').replace('day', '').replace('night', '');

	let day5forecast = document.createElement('div');
	day5forecast.classList.add('card');
	let day5Img = document.createElement('i');
	day5Img.id = 'sm-weather';
	day5Img.classList = forecast5IconFunction(weather);
	day5Img.classList.add('card-img-top');
	let day5CardBody = document.createElement('div');
	day5CardBody.classList.add('card-body');
	day5CardBody.id = 'cardBody';
	let day5Title = document.createElement('h5');
	day5Title.innerText = new Date(weather.daily.data[5].time * 1000).toString().slice(0, 3);
	let day5weatherDetail = document.createElement('p');
	day5weatherDetail.classList.add('card-text');
	day5weatherDetail.innerText = weather.daily.data[5].icon.replace(/-/g, ' ').replace('day', '').replace('night', '');

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
	currentWeatherStats.appendChild(currentCloudCover);
	currentWeatherStats.appendChild(currentUvIndex);
	currentWeatherStats.appendChild(currentWindSpeed);

	rightPaneContent.appendChild(forecastSummary);
	rightPaneContent.appendChild(forecastDisplay);
	forecastDisplay.appendChild(forecastRow);

	forecastRow.appendChild(day1forecast);
	day1forecast.appendChild(day1Img);
	day1forecast.appendChild(day1CardBody);
	day1CardBody.appendChild(day1Title);
	day1forecast.appendChild(day1weatherDetail);

	forecastRow.appendChild(day2forecast);
	day2forecast.appendChild(day2Img);
	day2forecast.appendChild(day2CardBody);
	day2CardBody.appendChild(day2Title);
	day2forecast.appendChild(day2weatherDetail);

	forecastRow.appendChild(day3forecast);
	day3forecast.appendChild(day3Img);
	day3forecast.appendChild(day3CardBody);
	day3CardBody.appendChild(day3Title);
	day3forecast.appendChild(day3weatherDetail);

	forecastRow.appendChild(day4forecast);
	day4forecast.appendChild(day4Img);
	day4forecast.appendChild(day4CardBody);
	day4CardBody.appendChild(day4Title);
	day4forecast.appendChild(day4weatherDetail);

	forecastRow.appendChild(day5forecast);
	day5forecast.appendChild(day5Img);
	day5forecast.appendChild(day5CardBody);
	day5CardBody.appendChild(day5Title);
	day5forecast.appendChild(day5weatherDetail);

	mainDisplayPane.appendChild(closeButtonRow);
	closeButtonRow.appendChild(closeButton);
}
