var ajax = require('../ajax.js');
var alert = require('../alerts.js');
var url = require('./answersURL.js');

function editAnswer(editTrigger) {

    let editBtn = document.getElementById('edit-answer');
    if (editBtn == null)
        return;

    let edit_id = editTrigger.getAttribute("data-message-id");
    if (edit_id == null)
        return;

    let contentParent = document.querySelector(".answer-content[data-message-id='" + edit_id + "']");
    if (contentParent == null)
        return;

    let markdown = contentParent.children[0];
    if (!markdown.classList.contains("answer-hidden-markdown")) {
        alert.displayError("Failed to get Answer markdown");
        return;
    }

    let editor = document.getElementById("edit-editor");
    editor.value = markdown.innerHTML;

    editBtn.addEventListener('click', function () {
        editAnswerRequest(edit_id, contentParent.parentElement, editor);
    });
}

function editAnswerRequest(answer_id, answerPlaceholder, editor) {

    let requestBody = {
        "answer": answer_id,
        "content": editor.value
    };

    ajax.sendAjaxRequest(
        'put', url.getAnswerIdURL(answer_id), requestBody, (data) => {
            editAnswerHandler(data.target, answer_id, answerPlaceholder);
        }
    );
}

function editAnswerHandler(response, answer_id, answerPlaceholder) {
    if (response.status == 403) {
        alert.displayError("You have no permission to edit this answer");
        return;
    }
    else if (response.status != 200) {
        alert.displayError("Failed to edit the answer");
        return;
    }

    let children = answerPlaceholder.children;
    for (let i = 1; !children[i].classList.contains("badge") && i < children.length - 1; ++i) {
        answerPlaceholder.removeChild(children[i]);
        i--;
    }

    let answer = JSON.parse(response.responseText).answer;
    let markdown = answer.content.version;
    children[0].children[0].innerHTML = markdown;

    let js = document.createElement("p");
    js.innerHTML = markdownToJs(markdown);
    answerPlaceholder.insertBefore(js, children[2]);

}

function markdownToJs(markdown) {
    let instance = new Object();
    instance.options = { renderingConfig: { codeSyntaxHighlighting: true } };

    let bound = SimpleMDE.prototype.markdown.bind(instance, decodeHTML(markdown));
    return bound();
}

module.exports = {
    editAnswer
};