import { getCommentsURL } from './commentsUtils.js'
import { createCommentHTML } from './commentsUtils.js'
import { getCommentsDropDown } from './commentsUtils.js'
import { createComments } from './commentsUtils.js'

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
    let newComment = JSON.parse(response.responseText);

    let comments = getCommentsDropDown(message_id);
    if (comments.firstChild.nodeName != "#text")
        comments.firstChild.firstChild.appendChild(
            createCommentHTML(newComment)
        );
    else
        createComments([newComment], message_id);

    // Cleaning input text
    let contentSelector = ".new-comment-content[data-message-id='" + message_id + "']";
    document.querySelector(contentSelector).value = "";
}