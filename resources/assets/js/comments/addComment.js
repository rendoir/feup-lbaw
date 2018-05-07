var ajax = require('../ajax.js');
var alert = require('../alerts.js');

import { getCommentsURL } from './commentsUtils.js'
import { createCommentHTML } from './commentsUtils.js'
import { getCommentsDropDown } from './commentsUtils.js'
import { createComments } from './commentsUtils.js'
import { addCommentEditEventListener } from './comments.js';

export function addCommentRequest(message_id) {

    let contentSelector = ".new-comment-content[data-message-id='" + message_id + "']";

    let contentNode = document.querySelector(contentSelector);
    if (contentNode == null || contentNode.value == "")
        return;

    let requestBody = {
        "content": contentNode.value,
        "commentable": message_id
    };

    ajax.sendAjaxRequest(
        'post', getCommentsURL(message_id), requestBody, (data) => {
            addCommentHandler(data.target, message_id);
        }
    );
}

// Handler to the add comment request response
function addCommentHandler(response, message_id) {
    if (response.status == 403) {
        alert.displayError("You have no permission to execute this action.");
        return;
    }
    else if (response.status != 200) {
        alert.displayError("Failed to add a new Comment.");
        return;
    }

    let responseJSON = JSON.parse(response.responseText);
    let newComment = responseJSON.comment;

    let comments = getCommentsDropDown(message_id);
    let commentsSection = comments.firstElementChild;

    if (!commentsSection.classList.contains('comment-creator')) {
        commentsSection.firstElementChild
            .firstElementChild
            .innerHTML += createCommentHTML(responseJSON);
        addCommentEditEventListener(newComment.id);
    }
    else
        createComments({ 'comments': [newComment], 'is_authenticated': responseJSON.is_authenticated }, message_id);

    // Cleaning input text
    let contentSelector = ".new-comment-content[data-message-id='" + message_id + "']";
    document.querySelector(contentSelector).value = "";
}