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
				debugger;
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
