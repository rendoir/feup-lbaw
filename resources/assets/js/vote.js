var ajax = require('./ajax.js');

function addVoteEvent(query) {
	let vote_buttons = document.querySelectorAll(query);
	if(vote_buttons == null) return;
	console.log(vote_buttons);
	for (let button of vote_buttons) {
		button.addEventListener('click', function() {
			let message_id = button.dataset.message_id;
			let positive = button.dataset.positive;
			let url = '/messages/' + message_id + '/vote';
			let data = { positive: positive };
			console.log("Sending ajax request");
			ajax.sendAjaxRequest('post', url, data, function() {
				console.log("Received response " + this.status);
			});
		});
	}
}

addVoteEvent('#question-body .vote');

module.exports = {
    addVoteEvent
};
