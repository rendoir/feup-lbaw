var messages = require('../messages.js');

module.exports = {
    addSingleEventListeners,
    editCommentsEventListener
};

var commentsViewer = require('./viewComments.js');
var commentsCreator = require('./addComment.js');
var commentsEditor = require('./editComment.js');
var commentsRemover = require('./removeComment.js');

function addEventListeners() {

    viewCommentsEventListener();
    addCommentsEventListener();
    removeCommentsEventListener();

    // Some event listeners are only added when the respective
    // html elements triggering the events are created
}

function addSingleEventListeners(message_id) {
    viewSingleCommentEventListener(message_id);
    addSingleCommentEventListener(message_id);
}

function viewCommentsEventListener() {
    messages.genericClickListener('.show-comments', commentsViewer.viewCommentsRequest);
}

function viewSingleCommentEventListener(message_id) {
    messages.genericSingleClickListener('.show-comments', commentsViewer.viewCommentsRequest, message_id);
}

function addCommentsEventListener() {
    messages.genericClickListener('.new-comment-submit', commentsCreator.addCommentRequest);
    messages.genericEnterListener('.new-comment-content', commentsCreator.addCommentRequest);
}

function addSingleCommentEventListener(message_id) {
    messages.genericSingleClickListener('.new-comment-submit', commentsCreator.addCommentRequest, message_id);
    messages.genericSingleEnterListener('.new-comment-content', commentsCreator.addCommentRequest, message_id);
}

function editCommentsEventListener() {
    messages.genericClickListener('.edit-comments', commentsEditor.setEditMode);
}

function removeCommentsEventListener() {

    $('#deleteCommentModal').on('show.bs.modal', function (e) {
        commentsRemover.removeComment($(e.relatedTarget)[0]);
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

//window.addEventListener('load', addEventListeners);
