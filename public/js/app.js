/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = createComments;
/* harmony export (immutable) */ __webpack_exports__["a"] = createCommentHTML;
/* harmony export (immutable) */ __webpack_exports__["c"] = getCommentsDropDown;
/* harmony export (immutable) */ __webpack_exports__["d"] = getCommentsURL;
/* harmony export (immutable) */ __webpack_exports__["e"] = getUniqueCommentURL;
/* harmony export (immutable) */ __webpack_exports__["f"] = toggleShowMsg;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__comments_js__ = __webpack_require__(2);


function createComments(comments, message_id) {

    if (comments.length == 0) return;

    // Direct comments container
    var secondDiv = document.createElement("div");
    secondDiv.classList.add("d-flex");
    secondDiv.classList.add("list-group");
    secondDiv.classList.add("list-group-flush");

    for (var i = 0; i < comments.length; ++i) {
        secondDiv.appendChild(createCommentHTML(comments[i]));
    }var firstDiv = document.createElement("div");
    firstDiv.classList.add("card-footer");
    firstDiv.classList.add("comments-card");
    firstDiv.appendChild(secondDiv);

    var final = getCommentsDropDown(message_id);
    if (final.firstChild == null) final.appendChild(firstDiv);else final.replaceChild(firstDiv, final.firstChild);

    toggleShowMsg(message_id, false);

    // Adding event listener freshly added html
    Object(__WEBPACK_IMPORTED_MODULE_0__comments_js__["editCommentsEventListener"])();
}

function createCommentHTML(comment) {

    return comment.is_owner ? createOwnCommentHTML(comment) : createSimpleCommentHTML(comment);
}

function createSimpleCommentHTML(comment) {

    var paragraph = document.createElement("p");
    paragraph.classList.add("text-center");
    paragraph.classList.add("mb-0");
    paragraph.classList.add("w-100");
    paragraph.appendChild(document.createTextNode(comment.score));

    var votes = document.createElement("div");
    votes.classList.add("col-1");
    votes.classList.add("my-auto");
    votes.classList.add("text-center");
    votes.appendChild(paragraph);

    var content = document.createElement("p");
    content.classList.add("px-2");
    content.appendChild(document.createTextNode(comment.content.version));

    var author = document.createElement("p");
    author.classList.add("discrete");
    author.classList.add("text-right");
    author.appendChild(document.createTextNode(comment.author));

    var contentDiv = document.createElement("div");
    contentDiv.classList.add("pl-3");
    contentDiv.classList.add("my-1");
    contentDiv.classList.add("col-11");
    contentDiv.appendChild(content);
    contentDiv.appendChild(author);

    var forthDiv = document.createElement("div");
    forthDiv.classList.add("mx-sm-0");
    forthDiv.classList.add("row");
    forthDiv.appendChild(votes);
    forthDiv.appendChild(contentDiv);

    var thirdDiv = document.createElement("div");
    thirdDiv.classList.add("list-group-item");
    thirdDiv.classList.add("px-0");
    thirdDiv.classList.add("bg-transparent");
    thirdDiv.appendChild(forthDiv);

    return thirdDiv;
}

function createOwnCommentHTML(comment) {

    var content = document.createElement("p");
    content.classList.add("editable-content");
    content.appendChild(document.createTextNode(comment.content.version));

    var contentCommendId = document.createAttribute("data-message-id");
    contentCommendId.value = comment.id;
    content.setAttributeNode(contentCommendId);

    var score = document.createElement("p");
    score.classList.add("discrete");
    score.classList.add("mr-2");
    score.appendChild(document.createTextNode(comment.score));

    var trophyIcon = document.createElement("pi");
    trophyIcon.classList.add("fas");
    trophyIcon.classList.add("fa-trophy");

    var trophy = document.createElement("span");
    trophy.classList.add("discrete");
    trophy.classList.add("mx-1");
    trophy.appendChild(trophyIcon);

    var separator = document.createElement("span");
    separator.classList.add("discrete");
    separator.classList.add("mx-2");
    separator.appendChild(document.createTextNode("│"));

    var editIcon = document.createElement("i");
    editIcon.classList.add("fas");
    editIcon.classList.add("fa-pencil-alt");

    var editBtn = document.createElement("button");
    editBtn.classList.add("btn");
    editBtn.classList.add("btn-link");
    editBtn.classList.add("discrete");
    editBtn.classList.add("mx-1");
    editBtn.classList.add("p-0");
    editBtn.classList.add("edit-comments");
    editBtn.appendChild(editIcon);

    var editDataToggle = document.createAttribute("data-toggle");
    editDataToggle.value = "tooltip";
    editBtn.setAttributeNode(editDataToggle);

    var editDataPlacement = document.createAttribute("data-placement");
    editDataPlacement.value = "top";
    editBtn.setAttributeNode(editDataPlacement);

    var editTitle = document.createAttribute("title");
    editTitle.value = " ";
    editBtn.setAttributeNode(editTitle);

    var editOriginalTitle = document.createAttribute("data-original-title");
    editOriginalTitle.value = "Edit";
    editBtn.setAttributeNode(editOriginalTitle);

    var dataCommentId = document.createAttribute("data-message-id");
    dataCommentId.value = comment.id;
    editBtn.setAttributeNode(dataCommentId);

    var deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far");
    deleteIcon.classList.add("fa-trash-alt");

    var deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn");
    deleteBtn.classList.add("btn-link");
    deleteBtn.classList.add("discrete");
    deleteBtn.classList.add("mx-1");
    deleteBtn.classList.add("p-0");
    deleteBtn.appendChild(deleteIcon);

    var deleteDataToggle = document.createAttribute("data-toggle");
    deleteDataToggle.value = "tooltip";
    deleteBtn.setAttributeNode(deleteDataToggle);

    var deleteDataPlacement = document.createAttribute("data-placement");
    deleteDataPlacement.value = "top";
    deleteBtn.setAttributeNode(deleteDataPlacement);

    var deleteTitle = document.createAttribute("title");
    deleteTitle.value = " ";
    deleteBtn.setAttributeNode(deleteTitle);

    var deleteOriginalTitle = document.createAttribute("data-original-title");
    deleteOriginalTitle.value = "Delete";
    deleteBtn.setAttributeNode(deleteOriginalTitle);

    var authorBtns = document.createElement("small");
    authorBtns.classList.add("my-auto");
    authorBtns.appendChild(editBtn);
    authorBtns.appendChild(deleteBtn);

    var author = document.createElement("p");
    author.classList.add("discrete");
    author.classList.add("ml-auto");
    author.appendChild(document.createTextNode(comment.author));

    var info = document.createElement("div");
    info.classList.add("d-flex");
    info.classList.add("flex-wrap");
    info.classList.add("mt-3");
    info.appendChild(score);
    info.appendChild(trophy);
    info.appendChild(separator);
    info.appendChild(authorBtns);
    info.appendChild(author);

    var forthDiv = document.createElement("div");
    forthDiv.classList.add("mx-sm-0");
    forthDiv.appendChild(content);
    forthDiv.appendChild(info);

    var thirdDiv = document.createElement("div");
    thirdDiv.classList.add("list-group-item");
    thirdDiv.classList.add("ml-5");
    thirdDiv.classList.add("pl-5");
    thirdDiv.classList.add("pr-3");
    thirdDiv.classList.add("bg-transparent");
    thirdDiv.appendChild(forthDiv);

    return thirdDiv;
}

function getCommentsDropDown(message_id) {
    var commentSelector = ".answer-comments[data-message-id='" + message_id + "']";
    return document.querySelector(commentSelector);
}

function getCommentsURL(message_id) {
    return window.location.pathname + '/answers/' + message_id + '/comments';
}

function getUniqueCommentURL(commentable_id, comment_id) {
    return getCommentsURL(commentable_id) + '/' + comment_id;
}

/**
 * 
 * @param {String} message_id 
 * @param {boolean} show - If true, it's supposed to to 'Show Comments' , if false it's supposed to 'Hide Comments'
 */
function toggleShowMsg(message_id, show) {
    var toggler = document.querySelector("a[aria-controls='AnswerComments" + message_id + "']");

    toggler.innerHTML = (show ? "Show" : "Hide") + " Comments";
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

function encodeForAjax(data) {
    if (data == null) return null;
    return Object.keys(data).map(function (k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
    }).join('&');
}

function sendAjaxRequest(method, url, data, handler) {
    var request = new XMLHttpRequest();

    request.open(method, url, true);
    request.setRequestHeader('X-CSRF-TOKEN', document.querySelector('meta[name="csrf-token"]').content);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.addEventListener('load', handler);
    request.send(encodeForAjax(data));
}

module.exports = {
    sendAjaxRequest: sendAjaxRequest
};

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["editCommentsEventListener"] = editCommentsEventListener;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__viewComments_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__addComment_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__editComment_js__ = __webpack_require__(10);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

ajax = __webpack_require__(1);





function addEventListeners() {

    viewCommentsEventListener();
    addCommentsEventListener();
    removeCommentsEventListener();

    // Some event listeners are only added when the respective
    // html elements triggering the events are created
}

function genericClickListener(selector, method) {

    var comments = document.querySelectorAll(selector);
    if (comments == null) return;

    var _loop = function _loop(comment) {

        var message_id = comment.getAttribute('data-message-id');
        if (message_id == null) return {
                v: void 0
            };

        comment.addEventListener('click', function () {
            method(message_id);
        });
    };

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = comments[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var comment = _step.value;

            var _ret = _loop(comment);

            if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}

function viewCommentsEventListener() {
    genericClickListener('.show-comments', __WEBPACK_IMPORTED_MODULE_0__viewComments_js__["a" /* viewCommentsRequest */]);
}

function addCommentsEventListener() {
    genericClickListener('.new-comment-submit', __WEBPACK_IMPORTED_MODULE_1__addComment_js__["a" /* addCommentRequest */]);
}

function editCommentsEventListener() {
    genericClickListener('.edit-comments', __WEBPACK_IMPORTED_MODULE_2__editComment_js__["a" /* setEditMode */]);
}

function removeCommentsEventListener() {
    //TODO
}

window.addEventListener('load', addEventListeners);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = displayError;
function displayError(errorMessage) {

    var forthDiv = document.createElement("div");

    var span = document.createElement("span");
    var ariaSpan = document.createAttribute("aria-hidden");
    ariaSpan.value = "true";
    span.setAttributeNode(ariaSpan);
    span.innerText = errorMessage;

    var button = document.createElement("button");
    button.classList.add("close");
    button.appendChild(span);

    var typeBtn = document.createAttribute("type");
    typeBtn.value = "button";
    button.setAttributeNode(typeBtn);

    var styleBtn = document.createAttribute("style");
    styleBtn.value = "position: inherit; padding: inherit";
    button.setAttributeNode(styleBtn);

    var dismissBtn = document.createAttribute("data-dismiss");
    dismissBtn.value = "alert";
    button.setAttributeNode(dismissBtn);

    var ariaBtn = document.createAttribute("aria-label");
    ariaBtn.value = "Close";
    button.setAttributeNode(ariaBtn);

    var thirdDiv = document.createElement("div");
    thirdDiv.classList.add("d-flex");
    thirdDiv.classList.add("justify-content-between");
    thirdDiv.appendChild(forthDiv);
    thirdDiv.appendChild(button);

    var secondDiv = document.createElement("div");
    secondDiv.classList.add("container");
    secondDiv.appendChild(thirdDiv);

    var firstDiv = document.createElement("div");
    firstDiv.classList.add("alert");
    firstDiv.classList.add("alert-danger");
    firstDiv.classList.add("alert-dismissible");
    firstDiv.appendChild(secondDiv);

    var roleDiv = document.createAttribute("role");
    roleDiv.value = "alert";
    firstDiv.setAttributeNode(roleDiv);

    document.querySelector('header').appendChild(firstDiv);
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(5);
module.exports = __webpack_require__(12);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * First, we will load all of this project's Javascript utilities and other
 * dependencies. Then, we will be ready to develop a robust and powerful
 * application frontend using useful Laravel and JavaScript libraries.
 */

// require('./bootstrap');

// require('./navbar.js');

questions = __webpack_require__(6);

__webpack_require__(7);

__webpack_require__(2);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

ajax = __webpack_require__(1);

function created(data) {
    var reply = JSON.parse(data.target.response);
    window.location = "questions/" + reply.id;
}

function submit() {
    title = $("input[name ='title']")[0].value;
    content = $("textarea[name='content']")[0].value;
    ajax.sendAjaxRequest('POST', 'ask_question', { "title": title, "messageContent": content }, created);
}

module.exports = {
    submit: submit
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

$(window).scroll(function () {
    var $heightScrolled = $(window).scrollTop();

    if ($heightScrolled > 30) {
        $('body > header.sticky-top').addClass("sticky-shadow");
    } else if ($heightScrolled <= 0) {
        $('body > header.sticky-top').removeClass("sticky-shadow");
    }
});

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = viewCommentsRequest;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commentsUtils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errors_js__ = __webpack_require__(3);






function viewCommentsRequest(message_id) {

    // If area already expanded, its only closing, so not worth making ajax request
    if (Object(__WEBPACK_IMPORTED_MODULE_0__commentsUtils_js__["c" /* getCommentsDropDown */])(message_id).classList.contains('show')) {
        Object(__WEBPACK_IMPORTED_MODULE_0__commentsUtils_js__["f" /* toggleShowMsg */])(message_id, true);
        return;
    }

    ajax.sendAjaxRequest('get', Object(__WEBPACK_IMPORTED_MODULE_0__commentsUtils_js__["d" /* getCommentsURL */])(message_id), {}, function (data) {
        getCommentsHandler(data.target, message_id);
    });
}

// Handler to the get comments request response
function getCommentsHandler(response, message_id) {

    if (response.status == 200) {
        var comments = JSON.parse(response.responseText);
        Object(__WEBPACK_IMPORTED_MODULE_0__commentsUtils_js__["b" /* createComments */])(comments, message_id);
    } else Object(__WEBPACK_IMPORTED_MODULE_1__errors_js__["a" /* displayError */])("Failed to retrieve the requested Comments");
}

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = addCommentRequest;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commentsUtils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errors_js__ = __webpack_require__(3);






function addCommentRequest(message_id) {

    var contentSelector = ".new-comment-content[data-message-id='" + message_id + "']";

    var contentNode = document.querySelector(contentSelector);
    if (contentNode == null || contentNode.value == "") return;

    var requestBody = {
        "content": contentNode.value,
        "commentable": message_id
    };

    ajax.sendAjaxRequest('post', Object(__WEBPACK_IMPORTED_MODULE_0__commentsUtils_js__["d" /* getCommentsURL */])(message_id), requestBody, function (data) {
        addCommentHandler(data.target, message_id);
    });
}

// Handler to the add comment request response
function addCommentHandler(response, message_id) {
    if (response.status == 403) {
        Object(__WEBPACK_IMPORTED_MODULE_1__errors_js__["a" /* displayError */])("You have no permission to execute this action");
        return;
    } else if (response.status != 200) {
        Object(__WEBPACK_IMPORTED_MODULE_1__errors_js__["a" /* displayError */])("Failed to add a new Comment");
        return;
    }

    var newComment = JSON.parse(response.responseText);

    var comments = Object(__WEBPACK_IMPORTED_MODULE_0__commentsUtils_js__["c" /* getCommentsDropDown */])(message_id);
    if (comments.firstChild.nodeName != "#text") comments.firstChild.firstChild.appendChild(Object(__WEBPACK_IMPORTED_MODULE_0__commentsUtils_js__["a" /* createCommentHTML */])(newComment));else Object(__WEBPACK_IMPORTED_MODULE_0__commentsUtils_js__["b" /* createComments */])([newComment], message_id);

    // Cleaning input text
    var contentSelector = ".new-comment-content[data-message-id='" + message_id + "']";
    document.querySelector(contentSelector).value = "";
}

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = setEditMode;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commentsUtils_js__ = __webpack_require__(0);


function setEditMode(comment_id) {

    var contentSelector = ".editable-content[data-message-id='" + comment_id + "']";

    var contentNode = document.querySelector(contentSelector);
    if (contentNode == null) return;

    var parentNode = contentNode.parentNode;
    var content = contentNode.innerText;
    parentNode.removeChild(contentNode);

    var input = document.createElement("input");
    input.classList.add('form-control');
    input.value = content;

    parentNode.insertBefore(input, parentNode.firstChild);
}

function addKeyListeners(inputNode, oldNode, comment_id) {
    inputNode.addEventListener('keyup', function (event) {

        switch (event.keyCode) {
            // ENTER was pressed
            case 13:
                requestEdition(inputNode, oldNode, comment_id);
                break;

            // ESC was pressed 
            case 27:
                getPreviousComment(inputNode, oldNode);
                return;
        }
    });
}

function requestEdition(inputNode, oldNode, comment_id) {

    var commentsGroup = inputNode.parentNode.parentNode.parentNode;
    var answer_id = commentsGroup.parentNode.parentNode.getAttribute("data-message-id");

    var requestBody = {
        "content": inputNode.value,
        "commentable": answer_id,
        "comment": comment_id
    };

    ajax.sendAjaxRequest('put', Object(__WEBPACK_IMPORTED_MODULE_0__commentsUtils_js__["e" /* getUniqueCommentURL */])(answer_id, comment_id), requestBody, function (data) {
        editCommentHandler(data.target, inputNode, oldNode);
    });
}

function editCommentHandler(response, inputNode, oldNode) {
    if (response.status == 403) {
        displayError("You have no permission to execute this action");
        return;
    } else if (response.status != 200) {
        displayError("Failed to edit the Comment");
        return;
    }

    var edittedComment = JSON.parse(response.responseText);
    oldNode.innerText = edittedComment.content.version;

    getPreviousComment(inputNode, oldNode);
}

function getPreviousComment(inputNode, previousNode) {

    var parentNode = inputNode.parentNode;
    parentNode.removeChild(inputNode);

    parentNode.insertBefore(previousNode, parentNode.firstChild);
}

/***/ }),
/* 11 */,
/* 12 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);