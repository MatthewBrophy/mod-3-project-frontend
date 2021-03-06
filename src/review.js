function buildReviewBox(resort) {
	let reviewPopup = document.getElementById('review-light');
	reviewPopup.style.display = 'block';
	let fade = document.getElementById('review-fade');
	fade.style.display = 'block';

	let buttonWrapper = document.createElement('div');
	buttonWrapper.id = 'button-wrapper';
	let reviewResortTitle = document.createElement('h3');
	reviewResortTitle.textContent = `${resort.name} Reviews`;
	let closeButton = document.createElement('button');
	closeButton.id = 'x';
	closeButton.textContent = 'x';
	closeButton.onclick = () => {
		reviewPopup.innerHTML = '';
		closeButton.remove();
		reviewPopup.style.display = 'none';
		fade.style.display = 'none';
	};

	buttonWrapper.appendChild(reviewResortTitle);
	buttonWrapper.appendChild(closeButton);
	reviewPopup.appendChild(buttonWrapper);
	getReviews(resort);

	let newCommentButton = document.createElement('button');
	newCommentButton.classList = 'popup-button';
	newCommentButton.id = 'comment-button';
	newCommentButton.textContent = 'Leave a review';
	newCommentButton.onclick = () => {
		reviewPopup.innerHTML = '';
		renderReviewForm(reviewPopup, resort);
	};
	buttonWrapper.appendChild(newCommentButton);
}

function getReviews(resort) {
	fetch(`https://mighty-cliffs-43940.herokuapp.com/api/v1/resorts/${resort.id}/comments`)
		.then((res) => res.json())
		.then((reviews) => displayReviews(reviews));
}

function displayReviews(reviews) {
	let reviewDisplay = document.getElementById('review-light');
	let reviewContainer = document.createElement('div');
	reviewContainer.id = 'review-container';
	reviewContainer.classList.add('container');
	reviewContainer.innerHTML = '';
	reviewDisplay.appendChild(reviewContainer);

	reviews.forEach((review) => {
		if (review.title != null) {
			let reviewTitleRow = document.createElement('div');
			reviewTitleRow.classList.add('row');
			reviewTitleRow.id = 'review-title-row';
			let reviewTitleContainer = document.createElement('div');
			reviewTitleContainer.id = 'review-title-container';
			let reviewTitle = document.createElement('h5');
			reviewTitle.innerText = review.title;

			reviewContainer.appendChild(reviewTitleRow);
			reviewTitleRow.appendChild(reviewTitleContainer);
			reviewTitleContainer.appendChild(reviewTitle);

			let reviewContentRow = document.createElement('div');
			reviewContentRow.classList.add('row');
			reviewContentRow.id = 'review-content-row';
			let reviewContentContainer = document.createElement('div');

			let reviewContent = document.createElement('p');
			reviewContent.innerText = review.content;

			reviewContainer.appendChild(reviewContentRow);
			reviewContentRow.appendChild(reviewContentContainer);
			reviewContentContainer.appendChild(reviewContent);

			let reviewDateContainer = document.createElement('div');
			reviewDateContainer.id = 'review-date-container';
			let reviewDate = document.createElement('p');
			reviewDate.innerText = review.date;
			reviewDate.id = 'review-date';

			reviewDateContainer.appendChild(reviewDate);
			reviewTitleRow.appendChild(reviewDateContainer);
		}
	});
}

function renderReviewForm(reviewPopup, resort) {
	let reviewForm = document.createElement('form');
	let reviewDiv = document.createElement('div');
	let fade = document.getElementById('review-fade');
	reviewDiv.classList.add('review-div', 'container');

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

	let closeButton = document.createElement('button');
	closeButton.id = 'x';
	closeButton.textContent = 'x';
	closeButton.onclick = () => {
		reviewPopup.innerHTML = '';
		closeButton.remove();
		reviewPopup.style.display = 'none';
		fade.style.display = 'none';
	};

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

	reviewForm.onsubmit = (e) => {
		e.preventDefault();
		let titleEntry = document.getElementById('review-title').value;
		let contentEntry = document.getElementById('review-content').value;
		createNewReview(titleEntry, contentEntry, resort);
		reviewDiv.remove();
	};
}

function createNewReview(titleEntry, contentEntry, resort) {
	let resortToPass = resort;
	fetch(`https://mighty-cliffs-43940.herokuapp.com/api/v1/resorts/${resort.id}/comments`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			resort_id: resort.id,
			date: new Date(Date.now()).toString().slice(4, 15),
			title: titleEntry,
			content: contentEntry
		})
	})
		.then((res) => res.json())
		.then((json) => {
			buildReviewBox(resortToPass);
		});
}
