//welcome screen
let body = document.getElementById('body');
let welcomeDiv = document.getElementById('main-button');
let startButton = document.getElementById('main-button');
let mainImage = document.getElementById('main-image');
startButton.addEventListener('click', function() {
	mainImage.innerHTML = '';
	body.style.overflow = 'auto';
	welcomeDiv.remove();
	renderPage();
});

function renderPage() {
	showMap();
}
