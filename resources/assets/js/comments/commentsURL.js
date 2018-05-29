function getAnswerCommentsURL(message_id) {
    return window.location.pathname + '/answers/' + message_id + '/comments';
}

function getUniqueAnswerCommentURL(commentable_id, comment_id) {
    return getAnswerCommentsURL(commentable_id) + '/' + comment_id;
}

function getQuestionCommentsURL() {
    return window.location.pathname + '/comments';
}

function getUniqueQuestionCommentURL() {
    return window.location.pathname + '/comments';
}

module.exports = {
    getAnswerCommentsURL,
    getUniqueAnswerCommentURL,
    getQuestionCommentsURL,
    getUniqueQuestionCommentURL
};