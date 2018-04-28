var ajax = require('./ajax.js');

import { getUniqueCommentURL } from "./commentsUtils";

export function removeComment(commentTrashBtn) {

    let deleteBtn = document.querySelector('#delete-comment');
    if (deleteBtn == null)
        return;

    let comment_id = commentTrashBtn.getAttribute("data-message-id");
    if (comment_id == null)
        return;

    let comment = commentTrashBtn.parentNode.parentNode.parentNode;
    let commentsGroup = comment.parentNode.parentNode.parentNode;
    let answer_id = commentsGroup.parentNode.parentNode.getAttribute("data-message-id");
    
    deleteBtn.addEventListener('click', function() {
        removeCommentRequest(comment_id, answer_id, comment.parentNode);
    });
}

function removeCommentRequest(comment_id, answer_id, commentNode) {

    let requestBody = {
        "comment": comment_id,
        "commentable": answer_id
    };

    ajax.sendAjaxRequest(
        'delete', getUniqueCommentURL(answer_id, comment_id), requestBody, (data) => {
            removeCommentHandler(data.target, commentNode);
        }
    );
}

function removeCommentHandler(response, commentNode) {
    if (response.status == 403) {
        displayError("You have no permission to delete this comment");
        return;
    }
    else if (response.status != 200) {
        displayError("Failed to delete the comment");
        return;
    }

    let parentNode = commentNode.parentNode;
    parentNode.removeChild(commentNode);
}