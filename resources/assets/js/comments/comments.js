var messages = require('../messages.js');

import { viewCommentsRequest } from './viewComments.js'
import { addCommentRequest } from './addComment.js'
import { setEditMode } from './editComment.js'
import { removeComment } from './removeComment.js';

function addEventListeners() {

    viewCommentsEventListener();
    addCommentsEventListener();
    removeCommentsEventListener()

    // Some event listeners are only added when the respective
    // html elements triggering the events are created
}

function viewCommentsEventListener() {
    messages.genericClickListener('.show-comments', viewCommentsRequest);
}

function addCommentsEventListener() {
    messages.genericClickListener('.new-comment-submit', addCommentRequest);
    messages.genericEnterListener('.new-comment-content', addCommentRequest);
}

export function addSingleCommentEventListener(message_id) {

    let comment = document.querySelector(".edit-comments[data-message-id='" + message_id + "']");

    comment.addEventListener('click', function () {
        setEditMode(message_id);
    });
}

export function editCommentsEventListener() {
    messages.genericClickListener('.edit-comments', setEditMode);
}

function removeCommentsEventListener() {

    $('#deleteCommentModal').on('show.bs.modal', function (e) {
        removeComment($(e.relatedTarget)[0]);
    });

    /* 
    let deleteModal = document.querySelector('#deleteCommentModal');
    if (deleteModal == null)
        return;

    deleteModal.addEventListener('show.bs.modal', function(e) {
        console.log(e.relatedTarget);
    });
    */
}

window.addEventListener('load', addEventListeners);
