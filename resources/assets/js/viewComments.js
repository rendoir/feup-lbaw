import { getCommentsURL } from './commentsUtils.js'
import { createCommentHTML } from './commentsUtils.js'
import { getCommentsDropDown } from './commentsUtils.js'
import { createComments } from './commentsUtils.js'

export function viewCommentsRequest(message_id) {

    let commentSelector = ".answer-comments[data-message-id='" + message_id + "']";

    // If area already expanded, its only closing, so not worth making ajax request
    if (document.querySelector(commentSelector).classList.contains('show')) {
        toggleShowMsg(message_id, true);
        return;
    }

    ajax.sendAjaxRequest(
        'get', getCommentsURL(message_id), {}, (data) => {
            getCommentsHandler(data.target, message_id);
        }
    );
}

// Handler to the get comments request response
function getCommentsHandler(response, message_id) {
    let comments = JSON.parse(response.responseText);

    createComments(comments, message_id);
}