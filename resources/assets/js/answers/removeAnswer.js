var ajax = require('../ajax.js');
var alert = require('../alerts.js');

function removeAnswer(removeTrigger) {

    let removeBtn = document.getElementById('delete-answer');
    if (removeBtn == null)
        return;

    let remove_id = removeTrigger.getAttribute("data-message-id");
    if (remove_id == null)
        return;

    removeBtn.addEventListener('click', function () {
        //removeAnswerRequest(comment_id, answer_id, comment.parentNode);
    });
}

module.exports = {
    removeAnswer
};