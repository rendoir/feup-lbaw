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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
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
function createComments(comments, message_id) {

    //TODO - mby this should not be needed, handled outside and not after request
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
}

function createCommentHTML(comment) {

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

function getCommentsDropDown(message_id) {
    var commentSelector = ".answer-comments[data-message-id='" + message_id + "']";
    return document.querySelector(commentSelector);
}

function getCommentsURL(message_id) {
    return window.location.pathname + '/answers/' + message_id + '/comments';
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
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(3);
module.exports = __webpack_require__(9);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * First, we will load all of this project's Javascript utilities and other
 * dependencies. Then, we will be ready to develop a robust and powerful
 * application frontend using useful Laravel and JavaScript libraries.
 */

// require('./bootstrap');

// require('./navbar.js');

questions = __webpack_require__(4);

__webpack_require__(5);

__webpack_require__(6);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

ajax = __webpack_require__(1);

function created(data) {
    var reply = JSON.parse(data.target.response);
    window.location.replace("http://localhost:8000/questions/" + reply.id);
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
/* 5 */
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
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__viewComments_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__addComment_js__ = __webpack_require__(8);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

ajax = __webpack_require__(1);




function addEventListeners() {

    viewCommentsEventListener();
    addCommentsEventListener();
    editCommentsEventListener();
    removeCommentsEventListener();
}

function viewCommentsEventListener() {
    var comments = document.querySelectorAll('.show-comments');
    if (comments == null) return;

    var _loop = function _loop(comment) {

        var message_id = comment.getAttribute('data-message-id');
        if (message_id == null) return {
                v: void 0
            };

        comment.addEventListener('click', function () {
            Object(__WEBPACK_IMPORTED_MODULE_0__viewComments_js__["a" /* viewCommentsRequest */])(message_id);
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

function addCommentsEventListener() {
    var submitBtns = document.querySelectorAll('.new-comment-submit');
    if (submitBtns == null) return;

    var _loop2 = function _loop2(submitBtn) {

        var message_id = submitBtn.getAttribute('data-message-id');
        if (message_id == null) return {
                v: void 0
            };

        submitBtn.addEventListener('click', function () {
            Object(__WEBPACK_IMPORTED_MODULE_1__addComment_js__["a" /* addCommentRequest */])(message_id);
        });
    };

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = submitBtns[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var submitBtn = _step2.value;

            var _ret2 = _loop2(submitBtn);

            if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }
}

function editCommentsEventListener() {
    //TODO
}

function removeCommentsEventListener() {
    //TODO
}

window.addEventListener('load', addEventListeners);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = viewCommentsRequest;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commentsUtils_js__ = __webpack_require__(0);





function viewCommentsRequest(message_id) {

    var commentSelector = ".answer-comments[data-message-id='" + message_id + "']";

    // If area already expanded, its only closing, so not worth making ajax request
    if (document.querySelector(commentSelector).classList.contains('show')) {
        toggleShowMsg(message_id, true);
        return;
    }

    ajax.sendAjaxRequest('get', Object(__WEBPACK_IMPORTED_MODULE_0__commentsUtils_js__["d" /* getCommentsURL */])(message_id), {}, function (data) {
        getCommentsHandler(data.target, message_id);
    });
}

// Handler to the get comments request response
function getCommentsHandler(response, message_id) {
    var comments = JSON.parse(response.responseText);

    Object(__WEBPACK_IMPORTED_MODULE_0__commentsUtils_js__["b" /* createComments */])(comments, message_id);
}

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = addCommentRequest;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commentsUtils_js__ = __webpack_require__(0);





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
    var newComment = JSON.parse(response.responseText);

    var comments = Object(__WEBPACK_IMPORTED_MODULE_0__commentsUtils_js__["c" /* getCommentsDropDown */])(message_id);
    if (comments.firstChild.nodeName != "#text") comments.firstChild.firstChild.appendChild(Object(__WEBPACK_IMPORTED_MODULE_0__commentsUtils_js__["a" /* createCommentHTML */])(newComment));else Object(__WEBPACK_IMPORTED_MODULE_0__commentsUtils_js__["b" /* createComments */])([newComment], message_id);
}

/***/ }),
/* 9 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);