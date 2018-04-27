import { viewCommentsRequest } from './viewComments.js'
import { addCommentRequest } from './addComment.js'
import { setEditMode } from './editComment.js'

function addEventListeners() {
    
    viewCommentsEventListener();
    addCommentsEventListener();

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

function genericEnterListener(selector, method) {
    
    let comments = document.querySelectorAll(selector);
    if (comments == null)
        return;
    
    for (let comment of comments) {

        let message_id = comment.getAttribute('data-message-id');
        if (message_id == null)
            return;

        comment.addEventListener('keyup', function(event) {
            if (event.keyCode == 13) {
                method(message_id);
            }
        });
    }
}

function viewCommentsEventListener() {
    genericClickListener('.show-comments', viewCommentsRequest);
}

function addCommentsEventListener() {
    genericClickListener('.new-comment-submit', addCommentRequest);
    genericEnterListener('.new-comment-content', addCommentRequest);
}

export function addSingleCommentEventListener(message_id) {
    
    let comment = document.querySelector(".edit-comments[data-message-id='" + message_id + "']");

    comment.addEventListener('click', function() {
        setEditMode(message_id);
    });
}

export function editCommentsEventListener() {
    genericClickListener('.edit-comments', setEditMode);
}

function removeCommentsEventListener() {
    genericClickListener('.delete-comments', deleteCommentRequest);
}

window.addEventListener('load', addEventListeners);
