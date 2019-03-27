const WEATHER = 'http://localhost:3000/api/v1/weather';

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

	let forecastDisplay = document.createElement('div');
	forecastDisplay.classList.add('container');
	let forecastRow = document.createElement('div');
	forecastRow.classList.add('card-group');

	let day1forecast = document.createElement('div');
	day1forecast.classList.add('card');
	let day1Img = document.createElement('i');
	day1Img.id = 'sm-weather';
	day1Img.classList = forecast1IconFunction(weather);
	day1Img.classList.add('card-img-top');
	let day1CardBody = document.createElement('div');
	day1CardBody.classList.add('card-body');
	let day1Title = document.createElement('h5');
	day1Title.innerText = 'test';

	let day2forecast = document.createElement('div');
	day2forecast.classList.add('card');
	let day2Img = document.createElement('i');
	day2Img.id = 'sm-weather';
	day2Img.classList = forecast2IconFunction(weather);
	day2Img.classList.add('card-img-top');

	let day3forecast = document.createElement('div');
	day3forecast.classList.add('card');
	let day3Img = document.createElement('i');
	day3Img.id = 'sm-weather';
	day3Img.classList = forecast3IconFunction(weather);
	day3Img.classList.add('card-img-top');

	let day4forecast = document.createElement('div');
	day4forecast.classList.add('card');
	let day4Img = document.createElement('i');
	day4Img.id = 'sm-weather';
	day4Img.classList = forecast4IconFunction(weather);
	day4Img.classList.add('card-img-top');

	let day5forecast = document.createElement('div');
	day5forecast.classList.add('card');
	let day5Img = document.createElement('i');
	day5Img.id = 'sm-weather';
	day5Img.classList = forecast5IconFunction(weather);
	day5Img.classList.add('card-img-top');

	/* <div class="card">
			<img class="card-img-top" src="..." alt="Card image cap">
			<div class="card-body">
				<h5 class="card-title">Card title</h5>
				<p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
				<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
			</div>
  </div> */

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

	rightPaneContent.appendChild(forecastSummary);
	rightPaneContent.appendChild(forecastDisplay);
	forecastDisplay.appendChild(forecastRow);

	forecastRow.appendChild(day1forecast);
	day1forecast.appendChild(day1Img);
	day1forecast.appendChild(day1CardBody);
	day1CardBody.appendChild(day1Title);

	forecastRow.appendChild(day2forecast);
	day2forecast.appendChild(day2Img);

	forecastRow.appendChild(day3forecast);
	day3forecast.appendChild(day3Img);

	forecastRow.appendChild(day4forecast);
	day4forecast.appendChild(day4Img);

	forecastRow.appendChild(day5forecast);
	day5forecast.appendChild(day5Img);

	mainDisplayPane.appendChild(closeButtonRow);
	closeButtonRow.appendChild(closeButton);

	console.log(weather);
}
