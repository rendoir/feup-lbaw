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
    let submitBtns = document.querySelectorAll('.new-comment-submit');
    if (submitBtns == null)
        return;
    
    for (let submitBtn of submitBtns) {

        let message_id = submitBtn.getAttribute('data-message-id');
        if (message_id == null)
            return;

        submitBtn.addEventListener('click', function() {
            addCommentRequest(message_id);
        });
    }
}

function editCommentsEventListener() {
let comments = document.querySelectorAll('.edit-comments');
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

function removeCommentsEventListener() {
    //TODO
}

window.addEventListener('load', addEventListeners);
