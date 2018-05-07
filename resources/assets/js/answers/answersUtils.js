var Mustache = require('mustache');

function createAnswer(answer_info) {

    let template = document.querySelector("template.answer").innerHTML;
    let placeholder = document.createElement("span");

    placeholder.innerHTML = Mustache.render(template, answer_info);
    console.log(placeholder);

    let answers = document.getElementById("answers-container");
    console.log(answers);
    answers.appendChild(placeholder.firstElementChild);
}

function getAnswersURL() {
    return window.location.pathname + '/answers'; 
}

module.exports = {
    createAnswer,
    getAnswersURL
};