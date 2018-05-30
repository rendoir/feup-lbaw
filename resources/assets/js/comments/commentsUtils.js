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
    let placeholder = document.createElement("span");

    placeholder.innerHTML = Mustache.render(template, comment);
    return placeholder.children[0];
}

function getCommentsDropDown(message_id) {
    let commentSelector = ".message-comments[data-message-id='" + message_id + "']";
    return document.querySelector(commentSelector);
}

/**
 * 
 * @param {String} message_id 
 * @param {boolean} show - If true, it's supposed to to 'Show Comments' , if false it's supposed to 'Hide Comments'
 */
function toggleShowMsg(message_id, show) {

    let toggler = document.querySelector("a[aria-controls='MessageComments" + message_id + "']");

    if (!show) {
        toggler.innerHTML = "Hide Comments";
        return;
    }

    let numComments = toggler.parentNode.nextElementSibling.firstElementChild;
    let value = numComments != null ? numComments.innerText.split(" ")[0] : 0;

    toggler.innerHTML = (isNaN(value) && value > 0 ? "Show Comments" : "Add Comment");

}

module.exports = {
    createComments,
    createCommentHTML,
    getCommentsDropDown,
    toggleShowMsg
};
