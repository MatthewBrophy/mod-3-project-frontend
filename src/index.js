//welcome screen
document.body.style.backgroundColor = 'black';
let welcomeDiv = document.getElementById('main-button');
let startButton = document.getElementById('main-button');
startButton.addEventListener('click', function() {
	welcomeDiv.remove();
	renderPage();
});

function renderPage() {
	showMap();
}
