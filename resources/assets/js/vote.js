var ajax = require('./ajax.js');

function addVoteEvent(query) {
	let vote_buttons = document.querySelectorAll(query);
	if(vote_buttons == null) return;
	console.log(vote_buttons);
	for (let button of vote_buttons) {
		button.addEventListener('click', function() {
			let message_id = button.dataset.message_id;
			let positive = button.dataset.positive;
			let url = 'messages/' + message_id + '/vote';
			let data = { positive: positive };
			console.log("A TUA PRIMA");
			/*ajax.sendAjaxRequest('post', url, data, function() {
				console.log(this.status);
			});*/
		});
	}
}

addVoteEvent('#question-body .vote');

module.exports = {
    addVoteEvent
};
