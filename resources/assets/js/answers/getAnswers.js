var ajax = require('../ajax.js');
var alert = require('../alerts.js');
var utils = require('./answersUtils.js');
var comments = require('../comments/comments.js');
var question = require('../question.js');
var common = require('../utils.js');

function getAnswersRequest() {

    // If not in a question's page
    if (document.getElementById("question") == null)
        return;

    ajax.sendAjaxRequest(
        'get', utils.getAnswersURL(), {}, getAnswersHandler
    );
}

// Handler for the question's answers request
function getAnswersHandler() {

    if (this.status == 200) {
        let responseJSON = JSON.parse(this.responseText);

        utils.cleanAnswers();

        for (let answer of responseJSON.answers)
            utils.createAnswer({ 'answer': answer, 'is_authenticated': responseJSON.is_authenticated });

        common.sortAnswers();
        comments.addEventListeners();
        question.addVoteEvent('#answers-container');
        question.addMarkCorrectEvent();
    }
    else alert.displayError("Failed to retrieve Question's answers");
}

module.exports = {
    getAnswersRequest
};
