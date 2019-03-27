//welcome screen
let body = document.getElementById('body');
let welcomeDiv = document.getElementById('main-button');
let startButton = document.getElementById('main-button');
startButton.addEventListener('click', function() {
	body.style.overflow = 'auto';
	welcomeDiv.remove();
	renderPage();
});

function renderPage() {
	showMap();
}
