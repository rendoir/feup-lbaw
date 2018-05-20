var ajax = require('../ajax.js');
var alert = require('../alerts.js');
var utils = require('./answersUtils.js');
var comments = require('../comments/comments.js');

function addAnswerRequest(message_id) {

    let contentNode = document.querySelector(".new-answer-content");
    if (contentNode == null || contentNode.value.trim() == "")
        return;

    let requestBody = {
        "content": contentNode.value,
        "question": message_id
    };

    ajax.sendAjaxRequest(
        'post', utils.getAnswersURL(), requestBody, (data) => {
            addAnswerHandler(data.target);
        }
    );
}

function addAnswerHandler(response) {
    if (response.status == 403) {
        alert.displayError("You have no permission to execute this action.");
        return;
    }
    else if (response.status != 200) {
        alert.displayError("Failed to add a new Answer.");
        return;
    }

    let responseJSON = JSON.parse(response.responseText);
    utils.createAnswer({ 'answer': responseJSON.answer, 'is_authenticated': responseJSON.is_authenticated });

    // Add event listeners for handling comments
    let answer_id = responseJSON.answer.id;
    comments.addEventListeners();

    utils.jumpToElement("answer-" + answer_id);

    //Cleaning answer creator content
    // TODO

    // This does not work
    let contentNode = document.querySelector(".new-answer-content");
    contentNode.value = "";
}

module.exports = {
    addAnswerRequest
};
