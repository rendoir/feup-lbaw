var ajax = require('./ajax.js');
var errors = require('./alerts.js');

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
	if(bookmark == null) return;
	let i = bookmark.querySelector("i");
	bookmark.addEventListener("click", function() {
		let message_id = bookmark.getAttribute('data-message-id');
		let is_active = bookmark.className == 'active';
		let method = is_active ? 'delete' : 'post';
		let url = '/users/bookmarks/' + message_id;
		let data = { question_id: message_id };
		ajax.sendAjaxRequest(method, url, data, function() {
			if(this.status == 200){
				if(is_active) {
					bookmark.className = 'inactive';
					i.className = i.className.replace('fas', 'far');
				} else {
					bookmark.className = 'active';
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
	if(vote_buttons == null) return;
	for (let i = 0; i < vote_buttons.length; i++) {
		let button = vote_buttons[i];
		button.addEventListener('click', function() {
			let message_id = button.dataset.message_id;
			let positive = button.dataset.positive;
			let url = '/messages/' + message_id + '/vote';
			let data = { positive: positive };
			ajax.sendAjaxRequest('post', url, data, function() {
				if(this.status == 401)
					window.location = "/login";
				else if (this.status == 403) {
					let alert_elem = errors.displayError("You cannot vote your messages.");
					$(alert_elem).delay(4000).slideUp(500, function () {
	          $(this).remove();
	        });
				}	else if (this.status == 200) {
					if(button.classList.contains('discrete')) {
						button.classList.remove('discrete');
						let pair_i = positive === 'true' ? (i+1) : (i-1);
						if(!vote_buttons[pair_i].classList.contains('discrete'))
							vote_buttons[pair_i].classList.add('discrete');
					}	else button.classList.add('discrete');
					let score = scores[Math.floor(i/2)];
					score.innerHTML = JSON.parse(this.responseText).score;
				}
			});
		});
	}
}

addVoteEvent('#question-body');

function addMarkCorrectEvent() {
	let mark_buttons = document.querySelectorAll(".mark");
	for(let button of mark_buttons) {
		button.addEventListener('click', function() {
			let answer_id = button.dataset.message_id;
			let url = '/messages/' + answer_id + '/mark_correct';
			ajax.sendAjaxRequest('post', url, null, function() {
				console.log(this.status);
			});
		});
	}
}

module.exports = {
    addVoteEvent,
		addMarkCorrectEvent
};
