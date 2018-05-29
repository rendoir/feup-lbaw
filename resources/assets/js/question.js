var ajax = require('./ajax.js');
var errors = require('./alerts.js');

function findAncestor (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
}

decodeHTML = function (html) {
	var txt = document.createElement('textarea');
	txt.innerHTML = html;
	return txt.value;
};

function applyMarkdown() {
	document.addEventListener("DOMContentLoaded", function () {
		let markdown_content = document.querySelectorAll(".markdown");

		let instance = new Object();
		instance.options = { renderingConfig: { codeSyntaxHighlighting: true } };

		for (let i = 0; i < markdown_content.length; i++) {
			markdown_content[i].style.visibility = "visible";
			let bound = SimpleMDE.prototype.markdown.bind(instance, decodeHTML(markdown_content[i].innerHTML));
			markdown_content[i].innerHTML = bound();
		}
	});
}

applyMarkdown();

function bookmarkEvent() {
	let bookmark = document.querySelector("#bookmark");
	if (bookmark == null) return;
	let i = bookmark.querySelector("i");
	bookmark.addEventListener("click", function () {
		$(bookmark).tooltip('hide');
		let message_id = bookmark.getAttribute('data-message-id');
		let is_active = bookmark.classList.contains('active');
		let url = '/users/bookmarks/' + message_id;
		let data = { question_id: message_id };
		ajax.sendAjaxRequest('post', url, data, function () {
			if (this.status == 200) {
				if (is_active) {
					bookmark.classList.add('inactive');
					bookmark.classList.remove('active');
					i.className = i.className.replace('fas', 'far');
				} else {
					bookmark.classList.add('active');
					bookmark.classList.remove('inactive');
					i.className = i.className.replace('far', 'fas');
				}
			}
		});
	});
}

bookmarkEvent();

function addVoteEvent(container) {
	let vote_buttons = document.querySelectorAll(container + ' .vote');
	let scores = document.querySelectorAll(container + ' .score');
	voteEvent(vote_buttons, scores);
}

function voteEvent(vote_buttons, scores) {
	if (vote_buttons == null) return;
	for (let i = 0; i < vote_buttons.length; i++) {
		let button = vote_buttons[i];
		button.addEventListener('click', function () {
			let message_id = button.dataset.message_id;
			let positive = button.dataset.positive;
			let url = '/messages/' + message_id + '/vote';
			let data = { positive: positive };
			ajax.sendAjaxRequest('post', url, data, function () {
				if (this.status == 401)
					window.location = "/login";
				else if (this.status == 404)
					window.location = "/404";
				else if (this.status == 403) {
					let alert_elem = errors.displayError("You cannot vote your messages.");
					$(alert_elem).delay(4000).slideUp(500, function () {
						$(this).remove();
					});
				} else if (this.status == 200) {
					if (button.classList.contains('discrete')) {
						button.classList.remove('discrete');
						let pair_i = positive === 'true' ? (i + 1) : (i - 1);
						if (!vote_buttons[pair_i].classList.contains('discrete'))
							vote_buttons[pair_i].classList.add('discrete');
					} else button.classList.add('discrete');
					let score = scores[Math.floor(i / 2)];
					score.innerHTML = JSON.parse(this.responseText).score;
				}
			});
		});
	}
}

addVoteEvent('#question-body');

function addMarkCorrectEvent() {
	let answers = document.querySelectorAll(".answer");
	for (let answer of answers) {
		markCorrectEvent(answer);
	}
}

function markCorrectEvent(answer) {
	let button = answer.querySelector(".mark");
	if (button == null) return;
	button.addEventListener('click', function () {
		let answer_id = button.dataset.message_id;
		let url = '/messages/' + answer_id + '/mark_correct';
		ajax.sendAjaxRequest('post', url, null, function () {
			if (this.status == 401)
				window.location = "/login";
			else if (this.status == 404)
				window.location = "/404";
			else if (this.status == 403) {
				let alert_elem = errors.displayError("You cannot mark this answer as correct.");
				$(alert_elem).delay(4000).slideUp(500, function () {
					$(this).remove();
				});
			} else if (this.status == 200) {
				if (button.classList.contains('marked')) {
					button.classList.remove('marked');
					answer.classList.remove('border-success');
				} else {
					let old_correct = document.querySelector(".answer.border-success");
					if (old_correct != null) {
						old_correct.classList.remove('border-success');
						let old_correct_button = old_correct.querySelector(".mark.marked");
						if (old_correct_button != null)
							old_correct_button.classList.remove('marked');
					}
					button.classList.add('marked');
					answer.classList.add('border-success');
				}
			}
		});
	});
}

function addReportEvent(container) {
	let reports = document.querySelectorAll(container + ' .report');
	reportEvent(reports);
}

function reportEvent(reports) {
	if (reports == null) return;
	for (let i = 0; i < reports.length; i++) {
		let button = reports[i];
		button.addEventListener('click', function () {
			$(bookmark).tooltip('hide');
			if (!button.classList.contains('discrete'))
				return;
			let message_id = button.dataset.message_id;
			let url = '/messages/' + message_id + '/report';
			ajax.sendAjaxRequest('post', url, { message_id: message_id }, function () {
				if (this.status == 401)
					window.location = "/login";
				else if (this.status == 404)
					window.location = "/404";
				else if (this.status == 200) {
					button.classList.remove('discrete');
					let response = JSON.parse(this.responseText);
					if(!response.is_banned) return;
					if(!response.type == 'question') {
            let element = findAncestor(button, response.type);
  					element.parentNode.removeChild(element);
          }
          errors.displaySuccess("The " + response.type + " you've reported has been removed. Thank you for keeping SegFault clean!");
				}
			});
		});
	}
}

addReportEvent("#question-body");

function removeQuestionEvent() {
	$('#deleteQuestionModal').on('show.bs.modal', function (e) {
		removeQuestion($(e.relatedTarget)[0]);
	});
}

function removeQuestion(delTrigger) {

	let question_id = delTrigger.getAttribute("data-message-id");
	if (question_id == null)
		return;

	let deleteBtn = document.getElementById('delete-question');
	if (deleteBtn == null)
		return;

	deleteBtn.addEventListener('click', function () {
		ajax.sendAjaxRequest(
			'delete',
			window.location + '/delete',
			{ "question": question_id },
			() => {
				if (this.status == 401)
					window.location = "/login";
				else if (this.status == 404)
					window.location = "/404";
				else if (this.status != 200)
					window.location = '/questions/recent';
				else
					errors.displayError("Failed to delete the question");
			}
		);
	});
}

removeQuestionEvent();

module.exports = {
	addVoteEvent,
	addMarkCorrectEvent,
	markCorrectEvent,
	voteEvent,
	addReportEvent,
	reportEvent
};
