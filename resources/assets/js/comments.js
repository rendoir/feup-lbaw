ajax = require('./ajax.js');

import { viewCommentsRequest } from './viewComments.js'
import { addCommentRequest } from './addComment.js'
import { setEditMode } from './editComment.js'

function addEventListeners() {
    
    viewCommentsEventListener();
    addCommentsEventListener();
    removeCommentsEventListener();

    // Some event listeners are only added when the respective
    // html elements triggering the events are created
}

function genericClickListener(selector, method) {

    let comments = document.querySelectorAll(selector);
    if (comments == null)
        return;
    
    for (let comment of comments) {

        let message_id = comment.getAttribute('data-message-id');
        if (message_id == null)
            return;

        comment.addEventListener('click', function() {
            method(message_id);
        });
    }
}

function viewCommentsEventListener() {
    genericClickListener('.show-comments', viewCommentsRequest);
}

function addCommentsEventListener() {
    genericClickListener('.new-comment-submit', addCommentRequest);
}

export function editCommentsEventListener() {
    genericClickListener('.edit-comments', setEditMode);
}

function removeCommentsEventListener() {
    //TODO
}

window.addEventListener('load', addEventListeners);
