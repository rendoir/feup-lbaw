var ajax = require('../ajax.js');
var alert = require('../alerts.js');
var utils = require('./commentsUtils.js');
var commentsEditor = require('./editComment.js');

function addCommentRequest(message_id) {

    let contentSelector = ".new-comment-content[data-message-id='" + message_id + "']";

    let contentNode = document.querySelector(contentSelector);
    if (contentNode == null || contentNode.value == "")
        return;

    let requestBody = {
        "content": contentNode.value,
        "commentable": message_id
    };

    ajax.sendAjaxRequest(
        'post', utils.getCommentsURL(message_id), requestBody, (data) => {
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

    let comments = utils.getCommentsDropDown(message_id);
    let commentsSection = comments.firstElementChild;

    if (!commentsSection.classList.contains('comment-creator')) {
        commentsSection.firstElementChild
            .firstElementChild
            .innerHTML += utils.createCommentHTML(responseJSON);
        addCommentEditEventListener(newComment.id);
    }
    else
        utils.createComments({ 'comments': [newComment], 'is_authenticated': responseJSON.is_authenticated }, message_id);

    // Cleaning input text
    let contentSelector = ".new-comment-content[data-message-id='" + message_id + "']";
    document.querySelector(contentSelector).value = "";
}

// Adding edit capability to freshly added comment
function addCommentEditEventListener(message_id) {

    let comment = document.querySelector(".edit-comments[data-message-id='" + message_id + "']");

    comment.addEventListener('click', function () {
        commentsEditor.setEditMode(message_id);
    });
}

module.exports = {
    addCommentRequest
};