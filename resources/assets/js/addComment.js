import { getCommentsURL } from './comments.js'
import { createCommentHTML } from './comments.js'

export function addCommentRequest(message_id) {

    let contentSelector = ".new-comment-content[data-message-id='" + message_id + "']";

    let contentNode = document.querySelector(contentSelector);
    if (contentNode == null || contentNode.value == "")
        return;

    let requestBody = {
        "content": contentNode.value,
        "commentable": message_id
    };

    ajax.sendAjaxRequest(
        'post', getCommentsURL(message_id), requestBody, (data) => {
            requestHandler(data.target, message_id);
        }
    );
}

//TODO
function requestHandler(response, message_id) {
    let newComment = JSON.parse(response.responseText);

    let commentSelector = ".answer-comments[data-message-id='" + message_id + "']";
    let final = document.querySelector(commentSelector);
    console.log(final.firstChild);
    if (final.firstChild.nodeName != "#text")
        final.firstChild.firstChild.appendChild(createCommentHTML(newComment));
    else {
        let secondDiv = document.createElement("div");
        secondDiv.classList.add("d-flex");
        secondDiv.classList.add("list-group");
        secondDiv.classList.add("list-group-flush");
        secondDiv.appendChild(createCommentHTML(newComment));
    
        let firstDiv = document.createElement("div");
        firstDiv.classList.add("card-footer");
        firstDiv.classList.add("comments-card");
        firstDiv.appendChild(secondDiv);
    
        let commentSelector = ".answer-comments[data-message-id='" + message_id + "']";
        let final = document.querySelector(commentSelector);
        if (final.firstChild == null)
            final.appendChild(firstDiv);
        else
            final.replaceChild(firstDiv, final.firstChild);
    
        toggleShowMsg(message_id, false);
    }
}