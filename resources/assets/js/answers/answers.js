var messages = require('../messages.js');
var answersGetter = require('./getAnswers.js');
var answersAdder = require('./getAnswers.js');

function addAnswerEventListeners() {

    answersGetter.getAnswersRequest();
    
    addAnswerEventListener();
}

function addAnswerEventListener() {
    messages.genericClickListener('#answer-creator', answersAdder.addAnswerRequest);
}

window.addEventListener('load', addAnswerEventListeners);
