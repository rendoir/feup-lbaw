var ajax = require('../ajax.js');
var alert = require('../alerts.js');

function editAnswer(editTrigger) {

    let editBtn = document.getElementById('edit-answer');
    if (editBtn == null)
        return;

    let edit_id = editTrigger.getAttribute("data-message-id");
    if (edit_id == null)
        return;

    editBtn.addEventListener('click', function () {
        //editAnswerRequest(comment_id, answer_id, comment.parentNode);
    });
}

module.exports = {
    editAnswer
};