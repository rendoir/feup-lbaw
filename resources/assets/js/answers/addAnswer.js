var ajax = require('../ajax.js');
var alert = require('../alerts.js');
var utils = require('./answersUtils.js');

export function addAnswerRequest(message_id) {

    let contentNode = document.querySelector(".new-answer-content");

    if (contentNode == null || contentNode.value.trim() == "")
        return;

    let requestBody = {
        "content": contentNode.value,
        "question": message_id
    };

    ajax.sendAjaxRequest(
        'post', utils.getAnswersURL(), requestBody, (data) => {
            addAnswerHandler(data.target, message_id);
        }
    );
}

function addAnswerHandler(response, message_id) {
    if (response.status == 403) {
        alert.displayError("You have no permission to execute this action");
        return;
    }
    else if (response.status != 200) {
        alert.displayError("Failed to add a new Answer");
        return;
    }

    // TODO
}