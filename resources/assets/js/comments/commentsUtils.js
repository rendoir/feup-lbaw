var Mustache = require('mustache');

function createComments(response, message_id) {

    if (response.comments.length == 0)
        return;

    let template = document.querySelector("template.comments").innerHTML;
    let placeholder = document.createElement("span");

    placeholder.innerHTML = Mustache.render(template, response);

    let final = getCommentsDropDown(message_id);
    let child = final.firstElementChild;

    // child can either be a comment or the comment-adder or null,
    // if there are no comments and the user is not authenticated
    if (child == null || child.classList.contains('comment-creator')) {
        final.insertBefore(placeholder, child);
    }
    else
        final.replaceChild(placeholder, child);

    toggleShowMsg(message_id, false);
}

function createCommentHTML(comment) {
    
    let template = document.querySelector("template.comment").innerHTML;

    return Mustache.render(template, comment);
}

function getCommentsDropDown(message_id) {
    let commentSelector = ".answer-comments[data-message-id='" + message_id + "']";
    return document.querySelector(commentSelector);
}

function getCommentsURL(message_id) {
    return window.location.pathname + '/answers/' + message_id + '/comments';
}

function getUniqueCommentURL(commentable_id, comment_id) {
    return getCommentsURL(commentable_id) + '/' + comment_id;
}

/**
 * 
 * @param {String} message_id 
 * @param {boolean} show - If true, it's supposed to to 'Show Comments' , if false it's supposed to 'Hide Comments'
 */
function toggleShowMsg(message_id, show) {
    let toggler = document.querySelector("a[aria-controls='AnswerComments" + message_id + "']");

    if (!show) {
        toggler.innerHTML = "Hide Comments";
        return;
    }

    let numComments = toggler.parentNode.nextElementSibling.firstElementChild;
    let value = numComments.innerText.split(" ")[0];

    toggler.innerHTML = (value > 0 ? "Show Comments" : "Add Comment");
}

module.exports = {
    createComments,
    createCommentHTML,
    getCommentsDropDown,
    getCommentsURL,
    getUniqueCommentURL,
    toggleShowMsg
};
