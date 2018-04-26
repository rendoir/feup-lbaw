import { getUniqueCommentURL } from './commentsUtils.js'

export function setEditMode(comment_id) {

    let contentSelector = ".editable-content[data-message-id='" + comment_id + "']";

    let contentNode = document.querySelector(contentSelector);
    if (contentNode == null)
        return;

    let parentNode = contentNode.parentNode;
    let content = contentNode.innerText;
    parentNode.removeChild(contentNode);
    
    let input = document.createElement("input");
    input.classList.add('form-control');
    input.value = content;

    parentNode.insertBefore(input, parentNode.firstChild);

}

function addKeyListeners(inputNode, oldNode, comment_id) {
    inputNode.addEventListener('keyup', function(event) {
        
        
        switch(event.keyCode)
        {
            // ENTER was pressed
            case (13):
                requestEdition(inputNode, oldNode, comment_id);
                break;
            
            // ESC was pressed 
            case (27):
                getPreviousComment(inputNode, oldNode);
                return;
        }
    });
}

function requestEdition(inputNode, oldNode, comment_id) {

    let commentsGroup = inputNode.parentNode.parentNode.parentNode;
    let answer_id = commentsGroup.parentNode.parentNode.getAttribute("data-message-id");

    let requestBody = {
        "content": inputNode.value,
        "commentable": answer_id,
        "comment": comment_id
    };

    ajax.sendAjaxRequest(
        'put', getUniqueCommentURL(answer_id, comment_id), requestBody, (data) => {
            editCommentHandler(data.target, inputNode, oldNode);
        }
    );
}

function editCommentHandler(response, inputNode, oldNode) {
    if (response.status == 403) {
        displayError("You have no permission to execute this action");
        return;
    }
    else if (response.status != 200) {
        displayError("Failed to edit the Comment");
        return;
    }

    let edittedComment = JSON.parse(response.responseText);
    oldNode.innerText = edittedComment.content.version;
    
    getPreviousComment(inputNode, oldNode);
}

function getPreviousComment(inputNode, previousNode) {
    
    let parentNode = inputNode.parentNode;
    parentNode.removeChild(inputNode);

    parentNode.insertBefore(previousNode, parentNode.firstChild);
}