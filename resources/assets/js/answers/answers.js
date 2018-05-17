var messages = require('../messages.js');
var answersGetter = require('./getAnswers.js');

import { addAnswerRequest } from './addAnswer.js'

function addAnswerEventListeners() {

    answersGetter.getAnswersRequest();
    
    addAnswerEventListener();
}

function addAnswerEventListener() {
    messages.genericClickListener('#answer-creator', addAnswerRequest);
}

window.addEventListener('load', addAnswerEventListeners);
