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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);
module.exports = __webpack_require__(6);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * First, we will load all of this project's Javascript utilities and other
 * dependencies. Then, we will be ready to develop a robust and powerful
 * application frontend using useful Laravel and JavaScript libraries.
 */

// require('./bootstrap');

// require('./navbar.js');

questions = __webpack_require__(3);

__webpack_require__(4);

__webpack_require__(5);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

ajax = __webpack_require__(0);

function created(data) {
    var reply = JSON.parse(data.target.response);
    window.location.replace("http://localhost:8000/questions/" + reply.id);
}

function submit() {
    ajax.sendAjaxRequest('POST', 'ask_question', { "title": "ola", "messageContent": "area", "author": 25 }, created);
}

module.exports = {
    submit: submit
};

/***/ }),
/* 4 */
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

ajax = __webpack_require__(0);

function addEventListeners() {
    var comments = document.querySelector('.show-comments');
    if (comments == null) return;

    var message_id = comments.getAttribute('data-message-id');
    if (message_id == null) return;

    comments.addEventListener('click', function () {
        sendCommentsRequest(message_id);
    });
}

function sendCommentsRequest(message_id) {

    var commentSelector = ".answer-comments[data-message-id='" + message_id + "']";

    // If area already expanded, its only closing, so not worth making ajax request
    if (document.querySelector(commentSelector).classList.contains('show')) {
        toggleShowMsg(message_id, true);
        return;
    }

    ajax.sendAjaxRequest('get', getCommentsURL(message_id), {}, function (data) {
        commentsHandler(data.target, message_id);
    });
}

function getCommentsURL(message_id) {
    return window.location.pathname + '/answers/' + message_id + '/comments';
}

function commentsHandler(response, message_id) {
    var comments = JSON.parse(response.responseText);

    createComments(comments, message_id);
}

function createComments(comments, message_id) {

    // Direct comments container
    var secondDiv = document.createElement("div");
    secondDiv.class = "d-flex list-group list-group-flush";

    for (var i = 0; i < comments.length; ++i) {
        secondDiv.appendChild(createCommentHTML(comments[i]));
    }var firstDiv = document.createElement("div");
    firstDiv.classList.add("card-footer");
    firstDiv.classList.add("comments-card");
    firstDiv.appendChild(secondDiv);

    var final = document.querySelector(".answer-comments[data-message-id='" + message_id + "']");
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
    thirdDiv.class = "list-group-item px-0 bg-transparent";
    thirdDiv.appendChild(forthDiv);

    return thirdDiv;
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

window.addEventListener('load', addEventListeners);

/***/ }),
/* 6 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: Cannot find module 'node-sass'\n    at Function.Module._resolveFilename (module.js:469:15)\n    at Function.Module._load (module.js:417:25)\n    at Module.require (module.js:497:17)\n    at require (internal/module.js:20:19)\n    at Object.<anonymous> (/home/bayard/Github/lbaw1763/node_modules/sass-loader/lib/loader.js:3:14)\n    at Module._compile (module.js:570:32)\n    at Object.Module._extensions..js (module.js:579:10)\n    at Module.load (module.js:487:32)\n    at tryModuleLoad (module.js:446:12)\n    at Function.Module._load (module.js:438:3)\n    at Module.require (module.js:497:17)\n    at require (internal/module.js:20:19)\n    at loadLoader (/home/bayard/Github/lbaw1763/node_modules/loader-runner/lib/loadLoader.js:13:17)\n    at iteratePitchingLoaders (/home/bayard/Github/lbaw1763/node_modules/loader-runner/lib/LoaderRunner.js:169:2)\n    at iteratePitchingLoaders (/home/bayard/Github/lbaw1763/node_modules/loader-runner/lib/LoaderRunner.js:165:10)\n    at /home/bayard/Github/lbaw1763/node_modules/loader-runner/lib/LoaderRunner.js:173:18\n    at loadLoader (/home/bayard/Github/lbaw1763/node_modules/loader-runner/lib/loadLoader.js:36:3)\n    at iteratePitchingLoaders (/home/bayard/Github/lbaw1763/node_modules/loader-runner/lib/LoaderRunner.js:169:2)\n    at iteratePitchingLoaders (/home/bayard/Github/lbaw1763/node_modules/loader-runner/lib/LoaderRunner.js:165:10)\n    at /home/bayard/Github/lbaw1763/node_modules/loader-runner/lib/LoaderRunner.js:173:18\n    at loadLoader (/home/bayard/Github/lbaw1763/node_modules/loader-runner/lib/loadLoader.js:36:3)\n    at iteratePitchingLoaders (/home/bayard/Github/lbaw1763/node_modules/loader-runner/lib/LoaderRunner.js:169:2)\n    at iteratePitchingLoaders (/home/bayard/Github/lbaw1763/node_modules/loader-runner/lib/LoaderRunner.js:165:10)\n    at /home/bayard/Github/lbaw1763/node_modules/loader-runner/lib/LoaderRunner.js:173:18\n    at loadLoader (/home/bayard/Github/lbaw1763/node_modules/loader-runner/lib/loadLoader.js:36:3)\n    at iteratePitchingLoaders (/home/bayard/Github/lbaw1763/node_modules/loader-runner/lib/LoaderRunner.js:169:2)\n    at runLoaders (/home/bayard/Github/lbaw1763/node_modules/loader-runner/lib/LoaderRunner.js:362:2)\n    at NormalModule.doBuild (/home/bayard/Github/lbaw1763/node_modules/webpack/lib/NormalModule.js:182:3)\n    at NormalModule.build (/home/bayard/Github/lbaw1763/node_modules/webpack/lib/NormalModule.js:275:15)\n    at Compilation.buildModule (/home/bayard/Github/lbaw1763/node_modules/webpack/lib/Compilation.js:151:10)\n    at runLoaders (/home/bayard/Github/lbaw1763/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/bayard/Github/lbaw1763/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/bayard/Github/lbaw1763/node_modules/loader-runner/lib/LoaderRunner.js:170:18\n    at loadLoader (/home/bayard/Github/lbaw1763/node_modules/loader-runner/lib/loadLoader.js:27:11)\n    at iteratePitchingLoaders (/home/bayard/Github/lbaw1763/node_modules/loader-runner/lib/LoaderRunner.js:169:2)\n    at iteratePitchingLoaders (/home/bayard/Github/lbaw1763/node_modules/loader-runner/lib/LoaderRunner.js:165:10)\n    at /home/bayard/Github/lbaw1763/node_modules/loader-runner/lib/LoaderRunner.js:173:18\n    at loadLoader (/home/bayard/Github/lbaw1763/node_modules/loader-runner/lib/loadLoader.js:36:3)\n    at iteratePitchingLoaders (/home/bayard/Github/lbaw1763/node_modules/loader-runner/lib/LoaderRunner.js:169:2)\n    at iteratePitchingLoaders (/home/bayard/Github/lbaw1763/node_modules/loader-runner/lib/LoaderRunner.js:165:10)\n    at /home/bayard/Github/lbaw1763/node_modules/loader-runner/lib/LoaderRunner.js:173:18\n    at loadLoader (/home/bayard/Github/lbaw1763/node_modules/loader-runner/lib/loadLoader.js:36:3)\n    at iteratePitchingLoaders (/home/bayard/Github/lbaw1763/node_modules/loader-runner/lib/LoaderRunner.js:169:2)\n    at iteratePitchingLoaders (/home/bayard/Github/lbaw1763/node_modules/loader-runner/lib/LoaderRunner.js:165:10)\n    at /home/bayard/Github/lbaw1763/node_modules/loader-runner/lib/LoaderRunner.js:173:18\n    at loadLoader (/home/bayard/Github/lbaw1763/node_modules/loader-runner/lib/loadLoader.js:36:3)\n    at iteratePitchingLoaders (/home/bayard/Github/lbaw1763/node_modules/loader-runner/lib/LoaderRunner.js:169:2)\n    at runLoaders (/home/bayard/Github/lbaw1763/node_modules/loader-runner/lib/LoaderRunner.js:362:2)\n    at NormalModule.doBuild (/home/bayard/Github/lbaw1763/node_modules/webpack/lib/NormalModule.js:182:3)\n    at NormalModule.build (/home/bayard/Github/lbaw1763/node_modules/webpack/lib/NormalModule.js:275:15)\n    at Compilation.buildModule (/home/bayard/Github/lbaw1763/node_modules/webpack/lib/Compilation.js:151:10)\n    at moduleFactory.create (/home/bayard/Github/lbaw1763/node_modules/webpack/lib/Compilation.js:454:10)\n    at factory (/home/bayard/Github/lbaw1763/node_modules/webpack/lib/NormalModuleFactory.js:243:5)\n    at applyPluginsAsyncWaterfall (/home/bayard/Github/lbaw1763/node_modules/webpack/lib/NormalModuleFactory.js:94:13)\n    at /home/bayard/Github/lbaw1763/node_modules/tapable/lib/Tapable.js:268:11\n    at NormalModuleFactory.params.normalModuleFactory.plugin (/home/bayard/Github/lbaw1763/node_modules/webpack/lib/CompatibilityPlugin.js:52:5)\n    at NormalModuleFactory.applyPluginsAsyncWaterfall (/home/bayard/Github/lbaw1763/node_modules/tapable/lib/Tapable.js:272:13)\n    at resolver (/home/bayard/Github/lbaw1763/node_modules/webpack/lib/NormalModuleFactory.js:69:10)\n    at process.nextTick (/home/bayard/Github/lbaw1763/node_modules/webpack/lib/NormalModuleFactory.js:196:7)\n    at _combinedTickCallback (internal/process/next_tick.js:73:7)");

/***/ })
/******/ ]);