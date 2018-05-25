var ajax = require('./ajax.js');
var errors = require('./alerts.js');

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

module.exports = {
    addVoteEvent
};
