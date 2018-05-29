var ajax = require('../ajax.js');
var alert = require('../alerts.js');
var url = require('./answersURL.js');

function removeAnswer(removeTrigger) {

    let removeBtn = document.getElementById('delete-answer');
    if (removeBtn == null)
        return;

    let remove_id = removeTrigger.getAttribute("data-message-id");
    if (remove_id == null)
        return;

    let callFunction = function () {
        removeAnswerRequest(remove_id);
    };
    removeBtn.addEventListener('click', callFunction);

    $('#deleteAnswerModal').on('hide.bs.modal', function (e) {
        removeBtn.removeEventListener('click', callFunction);
    });
}

function removeAnswerRequest(answer_id) {

    let requestBody = {
        "answer": answer_id,
    };

    ajax.sendAjaxRequest(
        'delete', url.getAnswerIdURL(answer_id), requestBody, (data) => {
            removeAnswerHandler(data.target, answer_id);
        }
    );
}

function removeAnswerHandler(response, answer_id) {
    if (response.status == 403) {
        alert.displayError("You have no permission to delete this answer");
        return;
    }
    else if (response.status != 200) {
        alert.displayError("Failed to delete the answer");
        return;
    }

    let answer = document.getElementById("answer-" + answer_id);
    if (answer == null)
        return;
    
    answer.parentNode.removeChild(answer);
}

module.exports = {
    removeAnswer
};