var ajax = require('./ajax.js');

import { getCommentsURL } from './commentsUtils.js'
import { createCommentHTML } from './commentsUtils.js'
import { getCommentsDropDown } from './commentsUtils.js'
import { createComments } from './commentsUtils.js'
import { displayError } from './errors.js';
import { addSingleCommentEventListener } from './comments.js';

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
        displayError("You have no permission to execute this action");
        return;
    }
    else if (response.status != 200) {
        displayError("Failed to add a new Comment");
        return;
    }

    let newComment = JSON.parse(response.responseText);

    let comments = getCommentsDropDown(message_id);
    if (comments.firstChild.nodeName != "#text") {
        comments.firstElementChild
                .firstElementChild
                .firstElementChild
                .innerHTML += createCommentHTML(newComment);
        addSingleCommentEventListener(newComment.id);
    }
    else
        createComments({'comments': [newComment]}, message_id);

    // Cleaning input text
    let contentSelector = ".new-comment-content[data-message-id='" + message_id + "']";
    document.querySelector(contentSelector).value = "";
}