var ajax = require('../ajax.js');
var alert = require('../alerts.js');
var utils = require('./commentsUtils.js');
var url = require('./commentsURL.js');;
var editor = require('./editComment.js');
var questionPage = require('../question.js');

function viewQuestionComments(message_id) {
    viewCommentsRequest(message_id, url.getQuestionCommentsURL());
}

function viewAnswerComments(message_id) {
    viewCommentsRequest(message_id, url.getAnswerCommentsURL(message_id));
}

function viewCommentsRequest(message_id, urlString) {
    // If area already expanded, its only closing, so not worth making ajax request
    if (utils.getCommentsDropDown(message_id).classList.contains('show')) {
        utils.toggleShowMsg(message_id, true);
        return;
    }
    console.log('urmoma');
    if (urlString == url.getQuestionCommentsURL()) {
        console.log(boi + " " + message_id);
        return;
    }

    ajax.sendAjaxRequest(
        'get', urlString, {}, (data) => {
            getCommentsHandler(data.target, message_id);
        }
    );
}

// Handler to the get comments request response
function getCommentsHandler(response, message_id) {

    if (response.status == 200) {
        let responseJSON = JSON.parse(response.responseText);
        utils.createComments(responseJSON, message_id);

        // Enabling edition of freshly added comments
        for (let comment of responseJSON.comments) {
            editor.enableEditMode(comment.id);
            enableVote(comment.id);
        }
    }
    else alert.displayError("Failed to retrieve the requested Comments");
}

function enableVote(message_id) {
    let buttons = document.querySelectorAll(".vote[data-message_id='" + message_id + "']");
    if (buttons == null || buttons.length == 0)
        return;
    let scores = buttons[0].parentElement.querySelectorAll(".score");

    questionPage.voteEvent(buttons, scores);
}

module.exports = {
    viewAnswerComments,
    viewQuestionComments
};
