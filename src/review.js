function buildReviewBox(resort) {
	let reviewPopup = document.getElementById('review-light');
	reviewPopup.style.display = 'block';
	let fade = document.getElementById('review-fade');
	fade.style.display = 'block';

	let buttonWrapper = document.createElement('div');
	buttonWrapper.id = 'button-wrapper';
	let closeButton = document.createElement('button');
	closeButton.id = 'x';
	closeButton.textContent = 'x';
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

function renderReviewForm(reviewPopup, resort) {
	let reviewForm = document.createElement('form');
	let reviewDiv = document.createElement('div');
	let fade = document.getElementById('review-fade');
	reviewDiv.id = 'review-div';

	let titleDiv = document.createElement('div');
	titleDiv.classList = 'form-group';

	let titleLabel = document.createElement('label');
	titleLabel.for = 'review-title';
	titleLabel.textContent = 'Title';

	let titleInput = document.createElement('input');
	titleInput.classList = 'form-control';
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
		persistComment(reviewPopup, titleEntry, contentEntry, resort);
		reviewDiv.remove();
		buildReviewBox(resort);
	});

	let closeButton = document.createElement('button');
	closeButton.id = 'x';
	closeButton.textContent = 'x';
	closeButton.addEventListener('click', function() {
		reviewPopup.innerHTML = '';
		closeButton.remove();
		reviewPopup.style.display = 'none';
		fade.style.display = 'none';
	});

	titleDiv.appendChild(titleLabel);
	titleDiv.appendChild(titleInput);

	contentDiv.appendChild(contentLabel);
	contentDiv.appendChild(contentInput);

	reviewForm.appendChild(titleDiv);
	reviewForm.appendChild(contentDiv);

	reviewForm.appendChild(submitButton);
	reviewDiv.appendChild(reviewForm);
	reviewPopup.appendChild(closeButton);
	reviewPopup.appendChild(reviewDiv);
}

function getReviews(resortPopup, resort) {
	fetch(`http://localhost:3000/api/v1/resorts/${resort.id}/comments`)
		.then(function(response) {
			return response.json();
		})
		.then(function(comments) {
			debugger;
			for (comment of comments) {
				displayReviews(resortPopup, resort, comment);
			}
		});
}

function displayReviews(resortPopup, resort, comment) {
	let reviewUl = document.createElement('ul');
	let reviewDiv = document.createElement('div');

	let likeButton = document.createElement('button');
	likeButton.addEventListener('click', function() {
		addLike(resortPopup, resort, comment);
	});

	let reviewTitle = document.createElement('h4');
	reviewTitle.textContent = comment.title;

	let reviewLi = document.createElement('li');
	reviewLi.textContent = comment.content;

	reviewDiv.appendChild(reviewTitle);
	reviewDiv.appendChild(reviewLi);
	reviewDiv.appendChild(likeButton);
	reviewUl.appendChild(reviewDiv);
}

function persistComment(reviewPopup, titleEntry, contentEntry, resort) {
	debugger;
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
	})
		.then(function(response) {
			return response.json();
		})
		.then(function(reviewReponse) {
			displayReviews(newReview, reviewPopup, resort);
		});
}
