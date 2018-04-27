var Mustache = require('mustache');

import { editCommentsEventListener } from './comments.js'

export function createComments(response, message_id) {

    if (response.comments.length == 0)
        return;

    let template = document.querySelector("template.comments").innerHTML;
    let tester = Mustache.render(template, response);

    let placeholder = document.createElement("span");
    placeholder.innerHTML = tester;

    let final = getCommentsDropDown(message_id);
    if (final.firstChild == null)
        final.appendChild(placeholder);
    else
        final.replaceChild(placeholder, final.firstChild);

    toggleShowMsg(message_id, false);

    // Adding event listener to freshly added html
    editCommentsEventListener();
}

export function createCommentHTML(comment) {

    return (comment.is_owner ?
        createOwnCommentHTML(comment) :
        createSimpleCommentHTML(comment));
}

function createSimpleCommentHTML(comment) {



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

function createOwnCommentHTML(comment) {

    let content = document.createElement("p");
    content.classList.add("editable-content");
    content.appendChild(document.createTextNode(comment.content.version));

    let contentCommendId = document.createAttribute("data-message-id");
    contentCommendId.value = comment.id;
    content.setAttributeNode(contentCommendId);

    let score = document.createElement("p");
    score.classList.add("discrete");
    score.classList.add("mr-2");
    score.appendChild(document.createTextNode(comment.score));

    let trophyIcon = document.createElement("pi");
    trophyIcon.classList.add("fas");
    trophyIcon.classList.add("fa-trophy");

    let trophy = document.createElement("span");
    trophy.classList.add("discrete");
    trophy.classList.add("mx-1");
    trophy.appendChild(trophyIcon);

    let separator = document.createElement("span");
    separator.classList.add("discrete");
    separator.classList.add("mx-2");
    separator.appendChild(document.createTextNode("│"));

    let editIcon = document.createElement("i");
    editIcon.classList.add("fas");
    editIcon.classList.add("fa-pencil-alt");

    let editBtn = document.createElement("button");
    editBtn.classList.add("btn");
    editBtn.classList.add("btn-link");
    editBtn.classList.add("discrete");
    editBtn.classList.add("mx-1");
    editBtn.classList.add("p-0");
    editBtn.classList.add("edit-comments");
    editBtn.appendChild(editIcon);

    let editDataToggle = document.createAttribute("data-toggle");
    editDataToggle.value = "tooltip";
    editBtn.setAttributeNode(editDataToggle);

    let editDataPlacement = document.createAttribute("data-placement");
    editDataPlacement.value = "top";
    editBtn.setAttributeNode(editDataPlacement);

    let editTitle = document.createAttribute("title");
    editTitle.value = " ";
    editBtn.setAttributeNode(editTitle);

    let editOriginalTitle = document.createAttribute("data-original-title");
    editOriginalTitle.value = "Edit";
    editBtn.setAttributeNode(editOriginalTitle);

    let dataCommentId = document.createAttribute("data-message-id");
    dataCommentId.value = comment.id;
    editBtn.setAttributeNode(dataCommentId);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far");
    deleteIcon.classList.add("fa-trash-alt");

    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn");
    deleteBtn.classList.add("btn-link");
    deleteBtn.classList.add("discrete");
    deleteBtn.classList.add("mx-1");
    deleteBtn.classList.add("p-0");
    deleteBtn.appendChild(deleteIcon);

    let deleteDataToggle = document.createAttribute("data-toggle");
    deleteDataToggle.value = "tooltip";
    deleteBtn.setAttributeNode(deleteDataToggle);

    let deleteDataPlacement = document.createAttribute("data-placement");
    deleteDataPlacement.value = "top";
    deleteBtn.setAttributeNode(deleteDataPlacement);

    let deleteTitle = document.createAttribute("title");
    deleteTitle.value = " ";
    deleteBtn.setAttributeNode(deleteTitle);

    let deleteOriginalTitle = document.createAttribute("data-original-title");
    deleteOriginalTitle.value = "Delete";
    deleteBtn.setAttributeNode(deleteOriginalTitle);

    let authorBtns = document.createElement("small");
    authorBtns.classList.add("my-auto");
    authorBtns.appendChild(editBtn);
    authorBtns.appendChild(deleteBtn);

    let author = document.createElement("p");
    author.classList.add("discrete");
    author.classList.add("ml-auto");
    author.appendChild(document.createTextNode(comment.author));

    let info = document.createElement("div");
    info.classList.add("d-flex");
    info.classList.add("flex-wrap");
    info.classList.add("mt-3");
    info.appendChild(score);
    info.appendChild(trophy);
    info.appendChild(separator);
    info.appendChild(authorBtns);
    info.appendChild(author);

    let forthDiv = document.createElement("div");
    forthDiv.classList.add("mx-sm-0");
    forthDiv.appendChild(content);
    forthDiv.appendChild(info);

    let thirdDiv = document.createElement("div");
    thirdDiv.classList.add("list-group-item");
    thirdDiv.classList.add("ml-5");
    thirdDiv.classList.add("pl-5");
    thirdDiv.classList.add("pr-3");
    thirdDiv.classList.add("bg-transparent");
    thirdDiv.appendChild(forthDiv);

    return thirdDiv;
}

export function getCommentsDropDown(message_id) {
    let commentSelector = ".answer-comments[data-message-id='" + message_id + "']";
    return document.querySelector(commentSelector);
}

export function getCommentsURL(message_id) {
    return window.location.pathname + '/answers/' + message_id + '/comments';
}

export function getUniqueCommentURL(commentable_id, comment_id) {
    return getCommentsURL(commentable_id) + '/' + comment_id;
}

/**
 * 
 * @param {String} message_id 
 * @param {boolean} show - If true, it's supposed to to 'Show Comments' , if false it's supposed to 'Hide Comments'
 */
export function toggleShowMsg(message_id, show) {
    let toggler = document.querySelector("a[aria-controls='AnswerComments" + message_id + "']");

    toggler.innerHTML = (show ? "Show" : "Hide") + " Comments";
}
