export function removeComment(comment) {

    let deleteBtn = document.querySelector('#delete-comment');
    if (deleteBtn == null)
        return;

    let comment_id = comment.getAttribute("data-message-id");
    if (comment_id == null)
        return;
    
    deleteBtn.addEventListener('click', function() {
        removeCommentRequest(comment_id, comment);
    });
}

function removeCommentRequest(comment_id, commentNode) {
    console.log("Pintou" + comment_id);

    let requestBody = {
        "comment": comment_id
    };

    /*ajax.sendAjaxRequest(
        'delete', getCommentsURL(message_id), requestBody, (data) => {
            addCommentHandler(data.target, comment);
        }
    );*/ // TODO
}

function removeCommentHandler(response, commentNode) {
    // TODO
}