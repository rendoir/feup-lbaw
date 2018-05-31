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

    let editor = $("#edit-editor");
    let mde = editor.data("mde");    
    mde.value(markdown.innerHTML);

    let callFunction = function () {
        editAnswerRequest(edit_id, contentParent.parentElement, mde.value());
    };
    editBtn.addEventListener('click', callFunction);

    $('#editAnswerModal').on('hide.bs.modal', function (e) {
        editBtn.removeEventListener('click', callFunction);
    });
}

function editAnswerRequest(answer_id, answerPlaceholder, content) {

    let requestBody = {
        "answer": answer_id,
        "content": content
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

    let children = answerPlaceholder.children[0].children;
    answerPlaceholder = answerPlaceholder.children[0];

    for (let i = 1; i < children.length && !children[i].classList.contains("badge"); ++i) {
        answerPlaceholder.removeChild(children[i]);
        i--;
    }

    let answer = JSON.parse(response.responseText).answer;
    let markdown = answer.content.version;
    children[0].innerHTML = markdown;

    let js = document.createElement("p");
    js.innerHTML = markdownToJs(markdown);
    answerPlaceholder.insertBefore(js, children[1]);

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