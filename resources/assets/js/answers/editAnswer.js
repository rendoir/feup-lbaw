var ajax = require('../ajax.js');
var alert = require('../alerts.js');

function editAnswer(editTrigger) {

    let editBtn = document.getElementById('edit-answer');
    if (editBtn == null)
        return;

    let edit_id = editTrigger.getAttribute("data-message-id");
    if (edit_id == null)
        return;

    let contentParent = document.querySelector(".answer-content[data-message-id='" + edit_id + "']");
    if (contentParent == null)
        return;

    console.log(contentParent);

    // Usar os filhos para progredir

    editBtn.addEventListener('click', function () {
        //editAnswerRequest(comment_id, answer_id, comment.parentNode);
    });
}

module.exports = {
    editAnswer
};