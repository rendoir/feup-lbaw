var Mustache = require('mustache');

function createAnswer(answer_info) {

    let template = document.querySelector("template.answer").innerHTML;
    let placeholder = document.createElement("span");

    placeholder.innerHTML = Mustache.render(template, answer_info);

    let answers = document.getElementById("answers-container");
    answers.appendChild(placeholder.firstElementChild);
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
    
    let int = setInterval(function() {
      window.scrollTo(0, pos);
      pos += 80;
      
      if (pos >= (top + height))
        clearInterval(int);

    }, 20);
}

module.exports = {
    createAnswer,
    getAnswersURL,
    jumpToElement
};