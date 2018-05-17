var ajax = require('../ajax.js');
var alert = require('../alerts.js');
var utils = require('./answersUtils.js');

import { addSingleEventListeners } from '../comments/comments.js';

export function getAnswersRequest() {

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

        for (let answer of responseJSON.answers) {
            utils.createAnswer({ 'answer': answer, 'is_authenticated': responseJSON.is_authenticated });
            console.log(answer);

            // Add event listeners for handling comments
            addSingleEventListeners(answer.id);
        }
    }
    else alert.displayError("Failed to retrieve Question's answers");
}

/*module.exports = {
    getAnswersRequest
};*/