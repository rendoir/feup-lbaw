export function edit(message_id) {

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
            addCommentHandler(data.target, message_id);
        }
    );
}

export function setEditMode(message_id) {

    let contentSelector = ".editable-content[data-message-id='" + message_id + "']";

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

    addKeyListeners(input, contentNode);
}

function addKeyListeners(inputNode, oldNode) {
    inputNode.addEventListener('keyup', function(event) {
        
        
        switch(event.keyCode)
        {
            // ENTER was pressed
            case (13):
                // TODO - Request para edit a bdad

                updatePreviousComment(inputNode, oldNode);
                break;
            
            // ESC was pressed 
            case (27):
                getPreviousComment(inputNode, oldNode);
                return;
        }
    });
}

function updatePreviousComment(inputNode, updatedNode) {

    let parentNode = inputNode.parentNode;
    let content = inputNode.value;
    parentNode.removeChild(inputNode);
    
    updatedNode.innerText = content;

    parentNode.insertBefore(updatedNode, parentNode.firstChild);
}

function getPreviousComment(inputNode, previousNode) {
    
    let parentNode = inputNode.parentNode;
    parentNode.removeChild(inputNode);

    parentNode.insertBefore(previousNode, parentNode.firstChild);
}