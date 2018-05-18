var ajax = require('../ajax.js');
var alert = require('../alerts.js');
var utils = require('./commentsUtils.js');

function viewCommentsRequest(message_id) {

    // If area already expanded, its only closing, so not worth making ajax request
    if (utils.getCommentsDropDown(message_id).classList.contains('show')) {
        utils.toggleShowMsg(message_id, true);
        return;
    }

    ajax.sendAjaxRequest(
        'get', utils.getCommentsURL(message_id), {}, (data) => {
            getCommentsHandler(data.target, message_id);
        }
    );
}

// Handler to the get comments request response
function getCommentsHandler(response, message_id) {

    if (response.status == 200) {
        let responseJSON = JSON.parse(response.responseText);
        utils.createComments(responseJSON, message_id);
    }
    else alert.displayError("Failed to retrieve the requested Comments");
}

module.exports = {
    viewCommentsRequest
};