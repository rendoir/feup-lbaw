ajax = require('./ajax.js');

import { viewCommentsRequest } from './viewComments.js'
import { addCommentRequest } from './addComment.js'

function addEventListeners() {
    
    viewCommentsEventListener();
    addCommentsEventListener();
    editCommentsEventListener();
    removeCommentsEventListener();
}

function viewCommentsEventListener() {
    let comments = document.querySelectorAll('.show-comments');
    if (comments == null)
        return;
    
    for (let comment of comments) {

        let message_id = comment.getAttribute('data-message-id');
        if (message_id == null)
            return;

        comment.addEventListener('click', function() {
            viewCommentsRequest(message_id);
        });
    }
}

function addCommentsEventListener() {
    let submitBtns = document.querySelectorAll('.new-comment-submit');
    if (submitBtns == null)
        return;
    
    for (let submitBtn of submitBtns) {

        let message_id = submitBtn.getAttribute('data-message-id');
        if (message_id == null)
            return;

        submitBtn.addEventListener('click', function() {
            addCommentRequest(message_id);
        });
    }
}

function editCommentsEventListener() {
    //TODO
}

function removeCommentsEventListener() {
    //TODO
}

export function getCommentsURL(message_id) {
    return window.location.pathname + '/answers/' + message_id + '/comments';
}

export function createCommentHTML(comment) {

    let paragraph = document.createElement("p");
    paragraph.classList.add("text-center");
    paragraph.classList.add("mb-0"); 
    paragraph.classList.add("w-100");
    paragraph.appendChild(document.createTextNode(comment.score));

    let votes = document.createElement("div");
    votes.classList.add("col-1");
    votes.classList.add("my-auto"); 
    votes.classList.add("text-center");
    votes.appendChild(paragraph);

    let content = document.createElement("p");
    content.classList.add("px-2");
    content.appendChild(document.createTextNode(comment.content.version));

    let author = document.createElement("p");
    author.classList.add("discrete");
    author.classList.add("text-right");
    author.appendChild(document.createTextNode(comment.author));

    let contentDiv = document.createElement("div");
    contentDiv.classList.add("pl-3");
    contentDiv.classList.add("my-1");
    contentDiv.classList.add("col-11");
    contentDiv.appendChild(content);
    contentDiv.appendChild(author);

    let forthDiv = document.createElement("div");
    forthDiv.classList.add("mx-sm-0");
    forthDiv.classList.add("row");
    forthDiv.appendChild(votes);
    forthDiv.appendChild(contentDiv);

    let thirdDiv = document.createElement("div");
    thirdDiv.classList.add("list-group-item");
    thirdDiv.classList.add("px-0");
    thirdDiv.classList.add("bg-transparent");
    thirdDiv.appendChild(forthDiv);

    return thirdDiv;
}

window.addEventListener('load', addEventListeners);
