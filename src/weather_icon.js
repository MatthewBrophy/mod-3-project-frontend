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
