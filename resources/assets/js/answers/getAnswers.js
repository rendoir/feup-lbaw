var ajax = require('../ajax.js');
var alert = require('../alerts.js');
var utils = require('./answersUtils.js');

function getAnswersRequest() {

    // If not in a question's page
    if (document.getElementById("question") == null)
        return;

    ajax.sendAjaxRequest(
        'get', utils.getAnswersURL(), {}, getAnswersHandler
    );
}

// Handler to the get comments request response
function getAnswersHandler() {

    if (this.status == 200) {
        let responseJSON = JSON.parse(this.responseText);
        //createComments(responseJSON, message_id);
        console.log(responseJSON);
    }
    else alert.displayError("Failed to retrieve Question's answers");
}

module.exports = {
    getAnswersRequest
};