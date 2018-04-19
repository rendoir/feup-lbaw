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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(5);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * First, we will load all of this project's Javascript utilities and other
 * dependencies. Then, we will be ready to develop a robust and powerful
 * application frontend using useful Laravel and JavaScript libraries.
 */

// require('./bootstrap');

// require('./navbar.js');
__webpack_require__(2);

__webpack_require__(3);

//Text Editor
//require('./tablist.js');
//require('./simplemde.js');

/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

ajax = __webpack_require__(4);

function addEventListeners() {
    var comments = document.querySelector('.show-comments');
    if (comments != null) comments.addEventListener('click', sendCommentsRequest);
}

function sendCommentsRequest() {
    ajax.sendAjaxRequest('get', getCommentsURL(), {}, commentsHandler);
}

function getCommentsURL() {
    var message_id = document.querySelector('.answer-comments').getAttribute('data-message-id');

    return window.location.pathname + '/answers/' + message_id + '/comments';
}

function commentsHandler() {
    var response = JSON.parse(this.responseText);

    createComments(response);
}

function createComments(comments) {

    // Direct comments container
    var secondDiv = document.createElement("div");
    secondDiv.class = "d-flex list-group list-group-flush";

    for (var i = 0; i < comments.length; ++i) {

        /*let paragraph = document.createElement("p");
        paragraph.classList.add("text-center");
        paragraph.classList.add("mb-0"); 
        paragraph.classList.add("w-100");
        paragraph.appendChild(document.createTextNode(comments[i].score));
         let votes = document.createElement("div");
        votes.classList.add("col-1");
        votes.classList.add("my-auto"); 
        votes.classList.add("text-center");
        votes.appendChild(paragraph);
         let content = document.createElement("p");
        content.classList.add("px-2");
        content.appendChild(document.createTextNode(comments[i].content.version));
         let author = document.createElement("p");
        author.classList.add("discrete");
        author.classList.add("text-right");
        author.appendChild(document.createTextNode(comments[i].author));
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
        thirdDiv.class = "list-group-item px-0 bg-transparent";
        thirdDiv.appendChild(forthDiv);*/

        secondDiv.appendChild(createCommentHTML(comments[i]));
    }

    var firstDiv = document.createElement("div");
    firstDiv.classList.add("card-footer");
    firstDiv.classList.add("comments-card");
    firstDiv.appendChild(secondDiv);
    console.log(firstDiv.outerHTML);

    var final = document.querySelector('.answer-comments');
    if (final.firstChild == null) final.appendChild(firstDiv);else final.replaceChild(firstDiv, final.firstChild);
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
    thirdDiv.class = "list-group-item px-0 bg-transparent";
    thirdDiv.appendChild(forthDiv);

    //secondDiv.appendChild(thirdDiv);
    return thirdDiv;
}

window.addEventListener('load', addEventListeners);

/***/ }),
/* 4 */
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
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);