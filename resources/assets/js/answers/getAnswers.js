var ajax = require('../ajax.js');
var alert = require('../alerts.js');
var utils = require('./answersUtils.js');
var comments = require('../comments/comments.js');
var vote = require('../vote.js');

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

        // Add event listeners for handling comments
        comments.addEventListeners();

        //Vote events
        vote.addVoteEvent('#answers-container .vote');
    }
    else alert.displayError("Failed to retrieve Question's answers");
}

module.exports = {
    getAnswersRequest
};
