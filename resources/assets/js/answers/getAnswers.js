var ajax = require('../ajax.js');
var alert = require('../alerts.js');
var utils = require('./answersUtils.js');
var url = require('./answersURL.js');
var comments = require('../comments/comments.js');
var question = require('../question.js');
var common = require('../utils.js');
var answerEditor = require('./editAnswer.js');
var answerRemover = require('./removeAnswer.js');

function getAnswersRequest() {

    // If not in a question's page
    if (document.getElementById("question") == null)
        return;

    ajax.sendAjaxRequest(
        'get', url.getAnswersURL(), {}, getAnswersHandler
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
        question.addReportEvent('#answers-container');
        question.addMarkCorrectEvent();

        // Add event listeners associated to answers' modals
        addModalsListeners();
    }
    else alert.displayError("Failed to retrieve Question's answers");
}

function addModalsListeners() {
    $('#editAnswerModal').on('show.bs.modal', function (e) {
        answerEditor.editAnswer($(e.relatedTarget)[0]);
    });
    $('#deleteAnswerModal').on('show.bs.modal', function (e) {
        answerRemover.removeAnswer($(e.relatedTarget)[0]);
        e.stopImmediatePropagation();
    });
}

module.exports = {
    getAnswersRequest
};
