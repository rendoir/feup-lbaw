import { getCommentsURL } from './comments.js'

export function addCommentRequest(message_id) {

    let contentSelector = ".new-comment-content[data-message-id='" + message_id + "']";

    console.log(message_id + "--" + document.querySelector(contentSelector).value);
} 