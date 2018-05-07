var Mustache = require('mustache');

function createAnswer(answer_info) {

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
}

function getAnswersURL() {
    return window.location.pathname + '/answers'; 
}

module.exports = {
    createAnswer,
    getAnswersURL
};