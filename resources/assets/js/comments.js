ajax = require('./ajax.js');

import { viewCommentsRequest } from './viewComments.js'
import { addCommentRequest } from './addComment.js'

function addEventListeners() {
    
    viewCommentsEventListener();
    addCommentsEventListener();
    editCommentsEventListener();
    removeCommentsEventListener();
}

function viewCommentsEventListener() {
    let comments = document.querySelectorAll('.show-comments');
    if (comments == null)
        return;
    
    for (let comment of comments) {

        let message_id = comment.getAttribute('data-message-id');
        if (message_id == null)
            return;

        comment.addEventListener('click', function() {
            viewCommentsRequest(message_id);
        });
    }
}

function addCommentsEventListener() {
    //TODO
}

function editCommentsEventListener() {
    //TODO
}

function removeCommentsEventListener() {
    //TODO
}

window.addEventListener('load', addEventListeners);
