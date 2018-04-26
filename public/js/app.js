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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__viewComments_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__addComment_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__editComment_js__ = __webpack_require__(11);
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
module.exports = __webpack_require__(13);


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

__webpack_require__(8);

__webpack_require__(2);

__webpack_require__(12);

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

decodeHTML = function decodeHTML(html) {
		var txt = document.createElement('textarea');
		txt.innerHTML = html;
		return txt.value;
};

function applyMarkdown() {
		window.addEventListener("load", function () {
				var markdown_content = document.querySelectorAll(".markdown");
				var instance = new Object();
				instance.options = { renderingConfig: { codeSyntaxHighlighting: true } };
				for (var i = 0; i < markdown_content.length; i++) {
						markdown_content[i].style.visibility = "visible";
						var bound = SimpleMDE.prototype.markdown.bind(instance, decodeHTML(markdown_content[i].innerHTML));
						markdown_content[i].innerHTML = bound();
				}
		});
}

applyMarkdown();

/***/ }),
/* 8 */
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
/* 9 */
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
/* 10 */
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
/* 11 */
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

    addKeyListeners(input, contentNode, comment_id);
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
/* 12 */
/***/ (function(module, exports) {

function Tagify(input, settings) {
    // protection
    if (!input) {
        console.warn('Tagify: ', 'invalid input element ', input);
        return this;
    }

    this.settings = this.extend({}, settings, this.DEFAULTS);
    this.settings.readonly = input.hasAttribute('readonly'); // if "readonly" do not include an "input" element inside the Tags component

    this.legacyFixes();

    if (input.pattern) try {
        this.settings.pattern = new RegExp(input.pattern);
    } catch (e) {}

    if (settings && settings.delimiters) {
        try {
            this.settings.delimiters = new RegExp("[" + settings.delimiters + "]");
        } catch (e) {}
    }

    this.id = Math.random().toString(36).substr(2, 9), // almost-random ID (because, fuck it)
    this.value = []; // An array holding all the (currently used) tags
    this.DOM = {}; // Store all relevant DOM elements in an Object
    this.extend(this, new this.EventDispatcher());
    this.build(input);
    this.events();
}

Tagify.prototype = {
    DEFAULTS: {
        delimiters: ",", // [regex] split tags by any of these delimiters
        pattern: "", // pattern to validate input by
        callbacks: {}, // exposed callbacks object to be triggered on certain events
        duplicates: false, // flag - allow tuplicate tags
        enforceWhitelist: false, // flag - should ONLY use tags allowed in whitelist
        autocomplete: true, // flag - show native suggeestions list as you type
        whitelist: [], // is this list has any items, then only allow tags from this list
        blacklist: [], // a list of non-allowed tags
        maxTags: Infinity, // maximum number of tags
        suggestionsMinChars: 2, // minimum characters to input to see sugegstions list
        maxSuggestions: 10
    },

    /**
     * Fixes which require backword support
     */
    legacyFixes: function legacyFixes() {
        var _s = this.settings;

        // For backwards compatibility with older versions, which use 'enforeWhitelist' instead of 'enforceWhitelist'.
        if (_s.hasOwnProperty("enforeWhitelist") && !_s.hasOwnProperty("enforceWhitelist")) {
            _s["enforceWhitelist"] = _s["enforeWhitelist"];
            delete _s["enforeWhitelist"];
            console.warn("Please update your Tagify settings. The 'enforeWhitelist' property is deprecated and you should be using 'enforceWhitelist'.");
        }
    },

    /**
     * builds the HTML of this component
     * @param  {Object} input [DOM element which would be "transformed" into "Tags"]
     */
    build: function build(input) {
        var that = this,
            value = input.value,
            inputHTML = '<div><input list="tagifySuggestions' + this.id + '" class="placeholder"/><span>' + input.placeholder + '</span></div>';
        this.DOM.originalInput = input;
        this.DOM.scope = document.createElement('tags');
        input.className && (this.DOM.scope.className = input.className); // copy any class names from the original input element to the Tags element
        this.DOM.scope.innerHTML = inputHTML;
        this.DOM.input = this.DOM.scope.querySelector('input');

        if (this.settings.readonly) this.DOM.scope.classList.add('readonly');

        input.parentNode.insertBefore(this.DOM.scope, input);
        this.DOM.scope.appendChild(input);

        // if "autocomplete" flag on toggeled & "whitelist" has items, build suggestions list
        if (this.settings.autocomplete && this.settings.whitelist.length) {
            if ("suggestions" in this) this.suggestions.init();else this.DOM.datalist = this.buildDataList();
        }

        // if the original input already had any value (tags)
        if (value) this.addTags(value).forEach(function (tag) {
            tag && tag.classList.add('tagify--noAnim');
        });
    },

    /**
     * Reverts back any changes made by this component
     */
    destroy: function destroy() {
        this.DOM.scope.parentNode.appendChild(this.DOM.originalInput);
        this.DOM.scope.parentNode.removeChild(this.DOM.scope);
    },

    /**
     * Merge two objects into a new one
     */
    extend: function extend(o, o1, o2) {
        if (!(o instanceof Object)) o = {};

        if (o2) {
            copy(o, o2);
            copy(o, o1);
        } else copy(o, o1);

        function copy(a, b) {
            // copy o2 to o
            for (var key in b) {
                if (b.hasOwnProperty(key)) a[key] = b[key];
            }
        }

        return o;
    },

    /**
     * A constructor for exposing events to the outside
     */
    EventDispatcher: function EventDispatcher() {
        // Create a DOM EventTarget object
        var target = document.createTextNode('');

        // Pass EventTarget interface calls to DOM EventTarget object
        this.off = target.removeEventListener.bind(target);
        this.on = target.addEventListener.bind(target);
        this.trigger = function (eventName, data) {
            var e;
            if (!eventName) return;

            if (this.isJQueryPlugin) $(this.DOM.originalInput).triggerHandler(eventName, [data]);else {
                try {
                    e = new CustomEvent(eventName, { "detail": data });
                } catch (err) {
                    e = document.createEvent("Event");
                    e.initEvent("toggle", false, false);
                }
                target.dispatchEvent(e);
            }
        };
    },

    /**
     * DOM events listeners binding
     */
    events: function events() {
        var that = this,
            events = {
            //  event name / event callback / element to be listening to
            paste: ['onPaste', 'input'],
            focus: ['onFocusBlur', 'input'],
            blur: ['onFocusBlur', 'input'],
            input: ['onInput', 'input'],
            keydown: ['onKeydown', 'input'],
            click: ['onClickScope', 'scope']
        },
            customList = ['add', 'remove', 'duplicate', 'maxTagsExceed', 'blacklisted', 'notWhitelisted'];

        for (var e in events) {
            this.DOM[events[e][1]].addEventListener(e, this.callbacks[events[e][0]].bind(this));
        }customList.forEach(function (name) {
            that.on(name, that.settings.callbacks[name]);
        });

        if (this.isJQueryPlugin) $(this.DOM.originalInput).on('tagify.removeAllTags', this.removeAllTags.bind(this));
    },

    /**
     * DOM events callbacks
     */
    callbacks: {
        onFocusBlur: function onFocusBlur(e) {
            var text = e.target.value.trim();

            if (e.type == "focus") e.target.className = 'input';else if (e.type == "blur" && text) {
                if (this.addTags(text).length) e.target.value = '';
            } else {
                e.target.className = 'input placeholder';
                this.DOM.input.removeAttribute('style');
            }
        },

        onKeydown: function onKeydown(e) {
            var s = e.target.value,
                lastTag,
                that = this;

            if (e.key == "Backspace" && (s == "" || s.charCodeAt(0) == 8203)) {
                lastTag = this.DOM.scope.querySelectorAll('tag:not(.tagify--hide)');
                lastTag = lastTag[lastTag.length - 1];
                this.removeTag(lastTag);
            }
            if (e.key == "Escape") {
                e.target.value = '';
                e.target.blur();
            }
            if (e.key == "Enter") {
                e.preventDefault(); // solves Chrome bug - http://stackoverflow.com/a/20398191/104380
                if (this.addTags(s).length) e.target.value = '';
                return false;
            } else {
                if (this.noneDatalistInput) clearTimeout(this.noneDatalistInput);
                this.noneDatalistInput = setTimeout(function () {
                    that.noneDatalistInput = null;
                }, 50);
            }
        },

        onInput: function onInput(e) {
            var value = e.target.value,
                lastChar = value[value.length - 1],
                isDatalistInput = !this.noneDatalistInput && value.length > 1,
                showSuggestions = value.length >= this.settings.suggestionsMinChars,
                datalistInDOM;

            e.target.style.width = (e.target.value.length + 1) * 7 + 'px';

            // if( value.indexOf(',') != -1 || isDatalistInput ){
            if (value.slice().search(this.settings.delimiters) != -1 || isDatalistInput) {
                if (this.addTags(value).length) e.target.value = ''; // clear the input field's value
            } else if (this.settings.autocomplete && this.settings.whitelist.length) {
                datalistInDOM = this.DOM.input.parentNode.contains(this.DOM.datalist);

                // if sugegstions should be hidden
                if (!showSuggestions && datalistInDOM) this.DOM.input.parentNode.removeChild(this.DOM.datalist);else if (showSuggestions && !datalistInDOM) {
                    this.DOM.input.parentNode.appendChild(this.DOM.datalist);
                }
            }
        },

        onPaste: function onPaste(e) {
            var that = this;
            if (this.noneDatalistInput) clearTimeout(this.noneDatalistInput);
            this.noneDatalistInput = setTimeout(function () {
                that.noneDatalistInput = null;
            }, 50);
        },

        onClickScope: function onClickScope(e) {
            if (e.target.tagName == "TAGS") this.DOM.input.focus();
            if (e.target.tagName == "X") {
                this.removeTag(e.target.parentNode);
            }
        }
    },

    /**
     * Build tags suggestions using HTML datalist
     * @return {[type]} [description]
     */
    buildDataList: function buildDataList() {
        var OPTIONS = "",
            i,
            datalist = document.createElement('datalist');

        datalist.id = 'tagifySuggestions' + this.id;
        datalist.innerHTML = "<label> \
                                select from the list: \
                                <select> \
                                    <option value=''></option> \
                                    [OPTIONS] \
                                </select> \
                            </label>";

        for (i = this.settings.whitelist.length; i--;) {
            OPTIONS += "<option>" + this.settings.whitelist[i] + "</option>";
        }datalist.innerHTML = datalist.innerHTML.replace('[OPTIONS]', OPTIONS); // inject the options string in the right place

        //  this.DOM.input.insertAdjacentHTML('afterend', datalist); // append the datalist HTML string in the Tags

        return datalist;
    },

    getNodeIndex: function getNodeIndex(node) {
        var index = 0;
        while (node = node.previousSibling) {
            if (node.nodeType != 3 || !/^\s*$/.test(node.data)) index++;
        }return index;
    },

    /**
     * Searches if any tag with a certain value already exis
     * @param  {String} s [text value to search for]
     * @return {boolean}  [found / not found]
     */
    isTagDuplicate: function isTagDuplicate(s) {
        return this.value.some(function (item) {
            return s.toLowerCase() === item.value.toLowerCase();
        });
    },

    /**
     * Mark a tag element by its value
     * @param  {String / Number} value  [text value to search for]
     * @param  {Object}          tagElm [a specific "tag" element to compare to the other tag elements siblings]
     * @return {boolean}                [found / not found]
     */
    markTagByValue: function markTagByValue(value, tagElm) {
        var tagsElms, tagsElmsLen;

        if (!tagElm) {
            tagsElms = this.DOM.scope.querySelectorAll('tag');
            for (tagsElmsLen = tagsElms.length; tagsElmsLen--;) {
                if (tagsElms[tagsElmsLen].textContent.toLowerCase().includes(value.toLowerCase())) tagElm = tagsElms[tagsElmsLen];
            }
        }

        // check AGAIN if "tagElm" is defined
        if (tagElm) {
            tagElm.classList.add('tagify--mark');
            setTimeout(function () {
                tagElm.classList.remove('tagify--mark');
            }, 2000);
            return true;
        } else {}

        return false;
    },

    /**
     * make sure the tag, or words in it, is not in the blacklist
     */
    isTagBlacklisted: function isTagBlacklisted(v) {
        v = v.split(' ');
        return this.settings.blacklist.filter(function (x) {
            return v.indexOf(x) != -1;
        }).length;
    },

    /**
     * make sure the tag, or words in it, is not in the blacklist
     */
    isTagWhitelisted: function isTagWhitelisted(v) {
        return this.settings.whitelist.indexOf(v) != -1;
    },

    /**
     * add a "tag" element to the "tags" component
     * @param  {String/Array} tagsItems [A string (single or multiple values with a delimiter), or an Array of Objects]
     * @return {Array} Array of DOM elements (tags)
     */
    addTags: function addTags(tagsItems) {
        var that = this,
            tagElems = [];

        this.DOM.input.removeAttribute('style');

        /**
         * pre-proccess the tagsItems, which can be a complex tagsItems like an Array of Objects or a string comprised of multiple words
         * so each item should be iterated on and a tag created for.
         * @return {Array} [Array of Objects]
         */
        function normalizeTags(tagsItems) {
            var whitelistWithProps = this.settings.whitelist[0] instanceof Object,
                isComplex = tagsItems instanceof Array && "value" in tagsItems[0],
                // checks if the value is a "complex" which means an Array of Objects, each object is a tag
            result = tagsItems; // the returned result

            // no need to continue if "tagsItems" is an Array of Objects
            if (isComplex) return result;

            // search if the tag exists in the whitelist as an Object (has props), to be able to use its properties
            if (!isComplex && typeof tagsItems == "string" && whitelistWithProps) {
                var matchObj = this.settings.whitelist.filter(function (item) {
                    return item.value.toLowerCase() == tagsItems.toLowerCase();
                });

                if (matchObj[0]) {
                    isComplex = true;
                    result = matchObj; // set the Array (with the found Object) as the new value
                }
            }

            // if the value is a "simple" String, ex: "aaa, bbb, ccc"
            if (!isComplex) {
                tagsItems = tagsItems.trim();
                if (!tagsItems) return [];

                // go over each tag and add it (if there were multiple ones)
                result = tagsItems.split(this.settings.delimiters).map(function (v) {
                    return { value: v.trim() };
                });
            }

            return result.filter(function (n) {
                return n;
            }); // cleanup the array from "undefined", "false" or empty items;
        }

        /**
         * validate a tag object BEFORE the actual tag will be created & appeneded
         * @param  {Object} tagData  [{"value":"text", "class":whatever", ...}]
         * @return {Boolean/String}  ["true" if validation has passed, String or "false" for any type of error]
         */
        function validateTag(tagData) {
            var value = tagData.value.trim(),
                maxTagsExceed = this.value.length >= this.settings.maxTags,
                isDuplicate,
                eventName__error,
                tagAllowed;

            // check for empty value
            if (!value) return "empty";

            // check if pattern should be used and if so, use it to test the value
            if (this.settings.pattern && !this.settings.pattern.test(value)) return "pattern";

            // check if the tag already exists
            if (this.isTagDuplicate(value)) {
                this.trigger('duplicate', value);

                if (!this.settings.duplicates) {
                    // this.markTagByValue(value, tagElm)
                    return "duplicate";
                }
            }

            // check if the tag is allowed by the rules set
            tagAllowed = !this.isTagBlacklisted(value) && (!this.settings.enforceWhitelist || this.isTagWhitelisted(value)) && !maxTagsExceed;

            // Check against blacklist & whitelist (if enforced)
            if (!tagAllowed) {
                tagData.class = tagData.class ? tagData.class + " tagify--notAllowed" : "tagify--notAllowed";

                // broadcast why the tag was not allowed
                if (maxTagsExceed) eventName__error = 'maxTagsExceed';else if (this.isTagBlacklisted(value)) eventName__error = 'blacklisted';else if (this.settings.enforceWhitelist && !this.isTagWhitelisted(value)) eventName__error = 'notWhitelisted';

                this.trigger(eventName__error, { value: value, index: this.value.length });

                return "notAllowed";
            }

            return true;
        }

        /**
         * appened (validated) tag to the component's DOM scope
         * @return {[type]} [description]
         */
        function appendTag(tagElm) {
            this.DOM.scope.insertBefore(tagElm, this.DOM.input.parentNode);
        }

        //////////////////////
        tagsItems = normalizeTags.call(this, tagsItems);

        tagsItems.forEach(function (tagData) {
            var isTagValidated = validateTag.call(that, tagData);

            if (isTagValidated === true || isTagValidated == "notAllowed") {
                // create the tag element
                var tagElm = that.createTagElem(tagData);

                // add the tag to the component's DOM
                appendTag.call(that, tagElm);

                // remove the tag "slowly"
                if (isTagValidated == "notAllowed") {
                    setTimeout(function () {
                        that.removeTag(tagElm, true);
                    }, 1000);
                } else {
                    // update state
                    that.value.push(tagData);
                    that.update();
                    that.trigger('add', that.extend({}, tagData, { index: that.value.length, tag: tagElm }));

                    tagElems.push(tagElm);
                }
            }
        });

        return tagElems;
    },

    /**
     * creates a DOM tag element and injects it into the component (this.DOM.scope)
     * @param  Object}  tagData [text value & properties for the created tag]
     * @return {Object} [DOM element]
     */
    createTagElem: function createTagElem(tagData) {
        var tagElm = document.createElement('tag');

        // for a certain Tag element, add attributes.
        function addTagAttrs(tagElm, tagData) {
            var i,
                keys = Object.keys(tagData);
            for (i = keys.length; i--;) {
                var propName = keys[i];
                if (!tagData.hasOwnProperty(propName)) return;
                tagElm.setAttribute(propName, tagData[propName]);
            }
        }

        // The space below is important - http://stackoverflow.com/a/19668740/104380
        tagElm.innerHTML = "<x></x><div><span title='" + tagData.value + "'>" + tagData.value + " </span></div>";

        // add any attribuets, if exists
        addTagAttrs(tagElm, tagData);

        return tagElm;
    },

    /**
     * Removes a tag
     * @param  {Object}  tagElm    [DOM element]
     * @param  {Boolean} silent    [A flag, which when turned on, does not removes any value and does not update the original input value but simply removes the tag from tagify]
     */
    removeTag: function removeTag(tagElm, silent) {
        var tagData,
            tagIdx = this.getNodeIndex(tagElm);

        if (!tagElm) return;

        tagElm.style.width = parseFloat(window.getComputedStyle(tagElm).width) + 'px';
        document.body.clientTop; // force repaint for the width to take affect before the "hide" class below
        tagElm.classList.add('tagify--hide');

        // manual timeout (hack, since transitionend cannot be used because of hover)
        setTimeout(function () {
            tagElm.parentNode.removeChild(tagElm);
        }, 400);

        if (!silent) {
            tagData = this.value.splice(tagIdx, 1)[0]; // remove the tag from the data object
            this.update(); // update the original input with the current value
            this.trigger('remove', this.extend({}, tagData, { index: tagIdx, tag: tagElm }));
        }
    },

    removeAllTags: function removeAllTags() {
        this.value = [];
        this.update();
        Array.prototype.slice.call(this.DOM.scope.querySelectorAll('tag')).forEach(function (elm) {
            elm.parentNode.removeChild(elm);
        });
    },

    /**
     * update the origianl (hidden) input field's value
     */
    update: function update() {
        var tagsAsString = this.value.map(function (v) {
            return v.value;
        }).join(',');
        this.DOM.originalInput.value = tagsAsString;
    }
};

function addTags() {
    var input = document.querySelector('input[name=tags]');
    if (input == null) return;
    var tagify = new Tagify(input);
}

addTags();

/***/ }),
/* 13 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);