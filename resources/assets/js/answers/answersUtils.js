var Mustache = require('mustache');
var answerEditor = require('./editAnswer.js');
var answerRemover = require('./removeAnswer.js');

function createAnswer(answer_info) {

    let template = document.querySelector("template.answer").innerHTML;
    let placeholder = document.createElement("span");

    answer_info.hasComments = (answer_info.answer.num_comments > 0 ? true : false);
    addMarkdownFunction(answer_info);

    placeholder.innerHTML = Mustache.render(template, answer_info);
    addMissingEventListeners();

    let answers = document.getElementById("answers-container");
    answers.appendChild(placeholder.firstElementChild);
}

// Function to add the event listeners missing to the freshly added answers: edition and deletion
function addMissingEventListeners() {
    $('#editAnswerModal').on('show.bs.modal', function (e) {
        answerEditor.editAnswer($(e.relatedTarget)[0]);
    });
    $('#deleteAnswerModal').on('show.bs.modal', function (e) {
        answerRemover.removeAnswer($(e.relatedTarget)[0]);
    });
}

function cleanAnswers() {
    let answers = document.getElementById("answers-container");

    for (let child of answers.childNodes) {
        if (child.id == "answer-skeleton")
            answers.removeChild(child);
    }
}

function addMarkdownFunction(answer_info) {

    answer_info.markdown = function () {
        return function (text, render) {

            let instance = new Object();
            instance.options = { renderingConfig: { codeSyntaxHighlighting: true } };

            let bound = SimpleMDE.prototype.markdown.bind(instance, decodeHTML(render(text)));
            return bound();
        }
    }
}

function getAnswersURL() {
    return window.location.pathname + '/answers';
}

function jumpToElement(elementID) {
    let element = document.getElementById(elementID);

    //Getting Y and Height of target element
    let top = element.offsetTop;
    let height = element.offsetHeight;

    //Go there with a smooth transition
    let pos = window.screenY;
    let finalPos = top + height;

    let int = setInterval(function () {
        window.scrollTo(0, pos);

        inc = (finalPos - pos) / 15;
        pos += (inc > 5 ? inc : 5);

        if (pos >= finalPos)
            clearInterval(int);

    }, 20);
}

module.exports = {
    createAnswer,
    cleanAnswers,
    getAnswersURL,
    jumpToElement
};
