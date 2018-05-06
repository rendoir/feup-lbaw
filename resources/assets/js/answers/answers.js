var messages = require('../messages.js');

import { addAnswerRequest } from './addAnswer.js'

function addAnswerEventListeners() {

    addAnswerEventListener();
}

function addAnswerEventListener() {
    messages.genericClickListener('#answer-creator', addAnswerRequest);
}

window.addEventListener('load', addAnswerEventListeners);
