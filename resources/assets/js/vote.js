var ajax = require('./ajax.js');

function addVoteEvent(query) {
	let vote_buttons = document.querySelectorAll(query);
	if(vote_buttons == null) return;
	for (let button of vote_buttons) {
		button.addEventListener('click', function() {
			let message_id = button.dataset.message_id;
			let positive = button.dataset.positive;
			let url = '/messages/' + message_id + '/vote';
			let data = { positive: positive };
			ajax.sendAjaxRequest('post', url, data, function() {
				if(this.status == 401)
					window.location = "/login";
				else if (this.status == 403)
					console.log("TODO");
				else if (this.status == 200)
					console.log("TODO");
			});
		});
	}
}

addVoteEvent('#question-body .vote');

module.exports = {
    addVoteEvent
};
