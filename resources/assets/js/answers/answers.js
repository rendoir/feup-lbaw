var messages = require('../messages.js');
var answersGetter = require('./getAnswers.js');
var answersAdder = require('./addAnswer.js');

function addAnswerEventListeners() {

    answersGetter.getAnswersRequest();
    
    addAnswerEventListener();
}

function addAnswerEventListener() {
    messages.genericClickListener('#answer-creator', answersAdder.addAnswerRequest);
}

window.addEventListener('load', addAnswerEventListeners);
