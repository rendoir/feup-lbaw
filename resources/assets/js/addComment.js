import { getCommentsURL } from './comments.js'

export function addCommentRequest(message_id) {

    let contentSelector = ".new-comment-content[data-message-id='" + message_id + "']";

    let contentNode = document.querySelector(contentSelector);
    if (contentNode == null || contentNode.value == "")
        return;

    let requestBody = {
        "content": contentNode.value,
        "author": 1,
        "commentable": message_id
    };

    ajax.sendAjaxRequest(
        'post', getCommentsURL(message_id), requestBody, requestHandler
    );
}

//TODO
function requestHandler() {
    console.log(JSON.parse(this.responseText));
}