var ajax = require('../ajax.js');
var alert = require('../alerts.js');
var url = require('./commentsURL.js');

function removeComment(commentTrashBtn) {

    let deleteBtn = document.getElementById('delete-comment');
    if (deleteBtn == null)
        return;

    let comment_id = commentTrashBtn.getAttribute("data-message-id");
    if (comment_id == null)
        return;

    let comment = commentTrashBtn.parentNode.parentNode.parentNode;
    let commentsGroup = comment.parentNode.parentNode.parentNode;
    let answer_id = commentsGroup.parentNode.parentNode.getAttribute("data-message-id");

    let callFunction = function () {
        removeCommentRequest(comment_id, answer_id, comment.parentNode);
    };
    deleteBtn.addEventListener('click', callFunction);

    $('#deleteCommentModal').on('hide.bs.modal', function (e) {
        deleteBtn.removeEventListener('click', callFunction);
    });
}

function removeCommentRequest(comment_id, answer_id, commentNode) {

    let requestBody = {
        "comment": comment_id,
        "commentable": answer_id
    };

    ajax.sendAjaxRequest(
        'delete', url.getUniqueAnswerCommentURL(answer_id, comment_id), requestBody, (data) => {
            removeCommentHandler(data.target, commentNode);
        }
    );
}

function removeCommentHandler(response, commentNode) {
    if (response.status == 403) {
        alert.displayError("You have no permission to delete this comment");
        return;
    }
    else if (response.status != 200) {
        alert.displayError("Failed to delete the comment");
        return;
    }

    let dadNode = commentNode.parentNode;

    if ((commentNode.nextElementSibling == null) &&
        (commentNode.previousElementSibling == null)) {

        let ancestorNode = dadNode.parentNode.parentNode;
        ancestorNode.parentNode.removeChild(ancestorNode);
    }
    else
        dadNode.removeChild(commentNode);
}

module.exports = {
    removeComment
};