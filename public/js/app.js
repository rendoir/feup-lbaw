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
var Mustache = __webpack_require__(10);



function createComments(response, message_id) {

    if (response.comments.length == 0) return;

    var template = document.querySelector("template.comments").innerHTML;
    var placeholder = document.createElement("span");

    placeholder.innerHTML = Mustache.render(template, response);;

    var final = getCommentsDropDown(message_id);
    if (final.firstChild == null) final.appendChild(placeholder);else final.replaceChild(placeholder, final.firstChild);

    toggleShowMsg(message_id, false);

    // Adding event listener to freshly added html
    Object(__WEBPACK_IMPORTED_MODULE_0__comments_js__["editCommentsEventListener"])();
}

function createCommentHTML(comment) {

    var template = document.querySelector("template.comment").innerHTML;
    var placeholder = document.createElement("span");

    placeholder.innerHTML = Mustache.render(template, comment);
    return placeholder;
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
/* harmony export (immutable) */ __webpack_exports__["addSingleCommentEventListener"] = addSingleCommentEventListener;
/* harmony export (immutable) */ __webpack_exports__["editCommentsEventListener"] = editCommentsEventListener;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__viewComments_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__addComment_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__editComment_js__ = __webpack_require__(12);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };





function addEventListeners() {

    viewCommentsEventListener();
    addCommentsEventListener();

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

function genericEnterListener(selector, method) {

    var comments = document.querySelectorAll(selector);
    if (comments == null) return;

    var _loop2 = function _loop2(comment) {

        var message_id = comment.getAttribute('data-message-id');
        if (message_id == null) return {
                v: void 0
            };

        comment.addEventListener('keyup', function (event) {
            if (event.keyCode == 13) {
                method(message_id);
            }
        });
    };

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = comments[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var comment = _step2.value;

            var _ret2 = _loop2(comment);

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

function viewCommentsEventListener() {
    genericClickListener('.show-comments', __WEBPACK_IMPORTED_MODULE_0__viewComments_js__["a" /* viewCommentsRequest */]);
}

function addCommentsEventListener() {
    genericClickListener('.new-comment-submit', __WEBPACK_IMPORTED_MODULE_1__addComment_js__["a" /* addCommentRequest */]);
    genericEnterListener('.new-comment-content', __WEBPACK_IMPORTED_MODULE_1__addComment_js__["a" /* addCommentRequest */]);
}

function addSingleCommentEventListener(message_id) {

    var comment = document.querySelector(".edit-comments[data-message-id='" + message_id + "']");

    comment.addEventListener('click', function () {
        Object(__WEBPACK_IMPORTED_MODULE_2__editComment_js__["a" /* setEditMode */])(message_id);
    });
}

function editCommentsEventListener() {
    genericClickListener('.edit-comments', __WEBPACK_IMPORTED_MODULE_2__editComment_js__["a" /* setEditMode */]);
}

function removeCommentsEventListener() {
    genericClickListener('.delete-comments', deleteCommentRequest);
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

__webpack_require__(1);
__webpack_require__(6);
__webpack_require__(7);
__webpack_require__(8);
__webpack_require__(2);

/***/ }),
/* 6 */
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
/***/ (function(module, exports, __webpack_require__) {

var ajax = __webpack_require__(1);

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
        enforceWhitelist: true, // flag - should ONLY use tags allowed in whitelist
        autocomplete: true, // flag - show native suggeestions list as you type
        whitelist: [], // is this list has any items, then only allow tags from this list
        blacklist: [], // a list of non-allowed tags
        maxTags: Infinity, // maximum number of tags
        suggestionsMinChars: 1, // minimum characters to input to see sugegstions list
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
                //e.target.blur();
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
    ajax.sendAjaxRequest("get", "tag_list", {}, function (event) {
        var request = event.target;
        var response = JSON.parse(request.response);
        var tag_list = [];
        for (var i = 0; i < response.length; i++) {
            tag_list.push(response[i].name);
        }
        var tagify = new Tagify(input, { whitelist: tag_list });
    });
}

addTags();

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = viewCommentsRequest;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commentsUtils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errors_js__ = __webpack_require__(3);
var ajax = __webpack_require__(1);







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
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */

/*global define: false Mustache: true*/

(function defineMustache (global, factory) {
  if (typeof exports === 'object' && exports && typeof exports.nodeName !== 'string') {
    factory(exports); // CommonJS
  } else if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
  } else {
    global.Mustache = {};
    factory(global.Mustache); // script, wsh, asp
  }
}(this, function mustacheFactory (mustache) {

  var objectToString = Object.prototype.toString;
  var isArray = Array.isArray || function isArrayPolyfill (object) {
    return objectToString.call(object) === '[object Array]';
  };

  function isFunction (object) {
    return typeof object === 'function';
  }

  /**
   * More correct typeof string handling array
   * which normally returns typeof 'object'
   */
  function typeStr (obj) {
    return isArray(obj) ? 'array' : typeof obj;
  }

  function escapeRegExp (string) {
    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
  }

  /**
   * Null safe way of checking whether or not an object,
   * including its prototype, has a given property
   */
  function hasProperty (obj, propName) {
    return obj != null && typeof obj === 'object' && (propName in obj);
  }

  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
  // See https://github.com/janl/mustache.js/issues/189
  var regExpTest = RegExp.prototype.test;
  function testRegExp (re, string) {
    return regExpTest.call(re, string);
  }

  var nonSpaceRe = /\S/;
  function isWhitespace (string) {
    return !testRegExp(nonSpaceRe, string);
  }

  var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };

  function escapeHtml (string) {
    return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap (s) {
      return entityMap[s];
    });
  }

  var whiteRe = /\s*/;
  var spaceRe = /\s+/;
  var equalsRe = /\s*=/;
  var curlyRe = /\s*\}/;
  var tagRe = /#|\^|\/|>|\{|&|=|!/;

  /**
   * Breaks up the given `template` string into a tree of tokens. If the `tags`
   * argument is given here it must be an array with two string values: the
   * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
   * course, the default is to use mustaches (i.e. mustache.tags).
   *
   * A token is an array with at least 4 elements. The first element is the
   * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
   * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
   * all text that appears outside a symbol this element is "text".
   *
   * The second element of a token is its "value". For mustache tags this is
   * whatever else was inside the tag besides the opening symbol. For text tokens
   * this is the text itself.
   *
   * The third and fourth elements of the token are the start and end indices,
   * respectively, of the token in the original template.
   *
   * Tokens that are the root node of a subtree contain two more elements: 1) an
   * array of tokens in the subtree and 2) the index in the original template at
   * which the closing tag for that section begins.
   */
  function parseTemplate (template, tags) {
    if (!template)
      return [];

    var sections = [];     // Stack to hold section tokens
    var tokens = [];       // Buffer to hold the tokens
    var spaces = [];       // Indices of whitespace tokens on the current line
    var hasTag = false;    // Is there a {{tag}} on the current line?
    var nonSpace = false;  // Is there a non-space char on the current line?

    // Strips all whitespace tokens array for the current line
    // if there was a {{#tag}} on it and otherwise only space.
    function stripSpace () {
      if (hasTag && !nonSpace) {
        while (spaces.length)
          delete tokens[spaces.pop()];
      } else {
        spaces = [];
      }

      hasTag = false;
      nonSpace = false;
    }

    var openingTagRe, closingTagRe, closingCurlyRe;
    function compileTags (tagsToCompile) {
      if (typeof tagsToCompile === 'string')
        tagsToCompile = tagsToCompile.split(spaceRe, 2);

      if (!isArray(tagsToCompile) || tagsToCompile.length !== 2)
        throw new Error('Invalid tags: ' + tagsToCompile);

      openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + '\\s*');
      closingTagRe = new RegExp('\\s*' + escapeRegExp(tagsToCompile[1]));
      closingCurlyRe = new RegExp('\\s*' + escapeRegExp('}' + tagsToCompile[1]));
    }

    compileTags(tags || mustache.tags);

    var scanner = new Scanner(template);

    var start, type, value, chr, token, openSection;
    while (!scanner.eos()) {
      start = scanner.pos;

      // Match any text between tags.
      value = scanner.scanUntil(openingTagRe);

      if (value) {
        for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
          chr = value.charAt(i);

          if (isWhitespace(chr)) {
            spaces.push(tokens.length);
          } else {
            nonSpace = true;
          }

          tokens.push([ 'text', chr, start, start + 1 ]);
          start += 1;

          // Check for whitespace on the current line.
          if (chr === '\n')
            stripSpace();
        }
      }

      // Match the opening tag.
      if (!scanner.scan(openingTagRe))
        break;

      hasTag = true;

      // Get the tag type.
      type = scanner.scan(tagRe) || 'name';
      scanner.scan(whiteRe);

      // Get the tag value.
      if (type === '=') {
        value = scanner.scanUntil(equalsRe);
        scanner.scan(equalsRe);
        scanner.scanUntil(closingTagRe);
      } else if (type === '{') {
        value = scanner.scanUntil(closingCurlyRe);
        scanner.scan(curlyRe);
        scanner.scanUntil(closingTagRe);
        type = '&';
      } else {
        value = scanner.scanUntil(closingTagRe);
      }

      // Match the closing tag.
      if (!scanner.scan(closingTagRe))
        throw new Error('Unclosed tag at ' + scanner.pos);

      token = [ type, value, start, scanner.pos ];
      tokens.push(token);

      if (type === '#' || type === '^') {
        sections.push(token);
      } else if (type === '/') {
        // Check section nesting.
        openSection = sections.pop();

        if (!openSection)
          throw new Error('Unopened section "' + value + '" at ' + start);

        if (openSection[1] !== value)
          throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
      } else if (type === 'name' || type === '{' || type === '&') {
        nonSpace = true;
      } else if (type === '=') {
        // Set the tags for the next time around.
        compileTags(value);
      }
    }

    // Make sure there are no open sections when we're done.
    openSection = sections.pop();

    if (openSection)
      throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);

    return nestTokens(squashTokens(tokens));
  }

  /**
   * Combines the values of consecutive text tokens in the given `tokens` array
   * to a single token.
   */
  function squashTokens (tokens) {
    var squashedTokens = [];

    var token, lastToken;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      token = tokens[i];

      if (token) {
        if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
          lastToken[1] += token[1];
          lastToken[3] = token[3];
        } else {
          squashedTokens.push(token);
          lastToken = token;
        }
      }
    }

    return squashedTokens;
  }

  /**
   * Forms the given array of `tokens` into a nested tree structure where
   * tokens that represent a section have two additional items: 1) an array of
   * all tokens that appear in that section and 2) the index in the original
   * template that represents the end of that section.
   */
  function nestTokens (tokens) {
    var nestedTokens = [];
    var collector = nestedTokens;
    var sections = [];

    var token, section;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      token = tokens[i];

      switch (token[0]) {
        case '#':
        case '^':
          collector.push(token);
          sections.push(token);
          collector = token[4] = [];
          break;
        case '/':
          section = sections.pop();
          section[5] = token[2];
          collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
          break;
        default:
          collector.push(token);
      }
    }

    return nestedTokens;
  }

  /**
   * A simple string scanner that is used by the template parser to find
   * tokens in template strings.
   */
  function Scanner (string) {
    this.string = string;
    this.tail = string;
    this.pos = 0;
  }

  /**
   * Returns `true` if the tail is empty (end of string).
   */
  Scanner.prototype.eos = function eos () {
    return this.tail === '';
  };

  /**
   * Tries to match the given regular expression at the current position.
   * Returns the matched text if it can match, the empty string otherwise.
   */
  Scanner.prototype.scan = function scan (re) {
    var match = this.tail.match(re);

    if (!match || match.index !== 0)
      return '';

    var string = match[0];

    this.tail = this.tail.substring(string.length);
    this.pos += string.length;

    return string;
  };

  /**
   * Skips all text until the given regular expression can be matched. Returns
   * the skipped string, which is the entire tail if no match can be made.
   */
  Scanner.prototype.scanUntil = function scanUntil (re) {
    var index = this.tail.search(re), match;

    switch (index) {
      case -1:
        match = this.tail;
        this.tail = '';
        break;
      case 0:
        match = '';
        break;
      default:
        match = this.tail.substring(0, index);
        this.tail = this.tail.substring(index);
    }

    this.pos += match.length;

    return match;
  };

  /**
   * Represents a rendering context by wrapping a view object and
   * maintaining a reference to the parent context.
   */
  function Context (view, parentContext) {
    this.view = view;
    this.cache = { '.': this.view };
    this.parent = parentContext;
  }

  /**
   * Creates a new context using the given view with this context
   * as the parent.
   */
  Context.prototype.push = function push (view) {
    return new Context(view, this);
  };

  /**
   * Returns the value of the given name in this context, traversing
   * up the context hierarchy if the value is absent in this context's view.
   */
  Context.prototype.lookup = function lookup (name) {
    var cache = this.cache;

    var value;
    if (cache.hasOwnProperty(name)) {
      value = cache[name];
    } else {
      var context = this, names, index, lookupHit = false;

      while (context) {
        if (name.indexOf('.') > 0) {
          value = context.view;
          names = name.split('.');
          index = 0;

          /**
           * Using the dot notion path in `name`, we descend through the
           * nested objects.
           *
           * To be certain that the lookup has been successful, we have to
           * check if the last object in the path actually has the property
           * we are looking for. We store the result in `lookupHit`.
           *
           * This is specially necessary for when the value has been set to
           * `undefined` and we want to avoid looking up parent contexts.
           **/
          while (value != null && index < names.length) {
            if (index === names.length - 1)
              lookupHit = hasProperty(value, names[index]);

            value = value[names[index++]];
          }
        } else {
          value = context.view[name];
          lookupHit = hasProperty(context.view, name);
        }

        if (lookupHit)
          break;

        context = context.parent;
      }

      cache[name] = value;
    }

    if (isFunction(value))
      value = value.call(this.view);

    return value;
  };

  /**
   * A Writer knows how to take a stream of tokens and render them to a
   * string, given a context. It also maintains a cache of templates to
   * avoid the need to parse the same template twice.
   */
  function Writer () {
    this.cache = {};
  }

  /**
   * Clears all cached templates in this writer.
   */
  Writer.prototype.clearCache = function clearCache () {
    this.cache = {};
  };

  /**
   * Parses and caches the given `template` and returns the array of tokens
   * that is generated from the parse.
   */
  Writer.prototype.parse = function parse (template, tags) {
    var cache = this.cache;
    var tokens = cache[template];

    if (tokens == null)
      tokens = cache[template] = parseTemplate(template, tags);

    return tokens;
  };

  /**
   * High-level method that is used to render the given `template` with
   * the given `view`.
   *
   * The optional `partials` argument may be an object that contains the
   * names and templates of partials that are used in the template. It may
   * also be a function that is used to load partial templates on the fly
   * that takes a single argument: the name of the partial.
   */
  Writer.prototype.render = function render (template, view, partials) {
    var tokens = this.parse(template);
    var context = (view instanceof Context) ? view : new Context(view);
    return this.renderTokens(tokens, context, partials, template);
  };

  /**
   * Low-level method that renders the given array of `tokens` using
   * the given `context` and `partials`.
   *
   * Note: The `originalTemplate` is only ever used to extract the portion
   * of the original template that was contained in a higher-order section.
   * If the template doesn't use higher-order sections, this argument may
   * be omitted.
   */
  Writer.prototype.renderTokens = function renderTokens (tokens, context, partials, originalTemplate) {
    var buffer = '';

    var token, symbol, value;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      value = undefined;
      token = tokens[i];
      symbol = token[0];

      if (symbol === '#') value = this.renderSection(token, context, partials, originalTemplate);
      else if (symbol === '^') value = this.renderInverted(token, context, partials, originalTemplate);
      else if (symbol === '>') value = this.renderPartial(token, context, partials, originalTemplate);
      else if (symbol === '&') value = this.unescapedValue(token, context);
      else if (symbol === 'name') value = this.escapedValue(token, context);
      else if (symbol === 'text') value = this.rawValue(token);

      if (value !== undefined)
        buffer += value;
    }

    return buffer;
  };

  Writer.prototype.renderSection = function renderSection (token, context, partials, originalTemplate) {
    var self = this;
    var buffer = '';
    var value = context.lookup(token[1]);

    // This function is used to render an arbitrary template
    // in the current context by higher-order sections.
    function subRender (template) {
      return self.render(template, context, partials);
    }

    if (!value) return;

    if (isArray(value)) {
      for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
        buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate);
      }
    } else if (typeof value === 'object' || typeof value === 'string' || typeof value === 'number') {
      buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate);
    } else if (isFunction(value)) {
      if (typeof originalTemplate !== 'string')
        throw new Error('Cannot use higher-order sections without the original template');

      // Extract the portion of the original template that the section contains.
      value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);

      if (value != null)
        buffer += value;
    } else {
      buffer += this.renderTokens(token[4], context, partials, originalTemplate);
    }
    return buffer;
  };

  Writer.prototype.renderInverted = function renderInverted (token, context, partials, originalTemplate) {
    var value = context.lookup(token[1]);

    // Use JavaScript's definition of falsy. Include empty arrays.
    // See https://github.com/janl/mustache.js/issues/186
    if (!value || (isArray(value) && value.length === 0))
      return this.renderTokens(token[4], context, partials, originalTemplate);
  };

  Writer.prototype.renderPartial = function renderPartial (token, context, partials) {
    if (!partials) return;

    var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
    if (value != null)
      return this.renderTokens(this.parse(value), context, partials, value);
  };

  Writer.prototype.unescapedValue = function unescapedValue (token, context) {
    var value = context.lookup(token[1]);
    if (value != null)
      return value;
  };

  Writer.prototype.escapedValue = function escapedValue (token, context) {
    var value = context.lookup(token[1]);
    if (value != null)
      return mustache.escape(value);
  };

  Writer.prototype.rawValue = function rawValue (token) {
    return token[1];
  };

  mustache.name = 'mustache.js';
  mustache.version = '2.3.0';
  mustache.tags = [ '{{', '}}' ];

  // All high-level mustache.* functions use this writer.
  var defaultWriter = new Writer();

  /**
   * Clears all cached templates in the default writer.
   */
  mustache.clearCache = function clearCache () {
    return defaultWriter.clearCache();
  };

  /**
   * Parses and caches the given template in the default writer and returns the
   * array of tokens it contains. Doing this ahead of time avoids the need to
   * parse templates on the fly as they are rendered.
   */
  mustache.parse = function parse (template, tags) {
    return defaultWriter.parse(template, tags);
  };

  /**
   * Renders the `template` with the given `view` and `partials` using the
   * default writer.
   */
  mustache.render = function render (template, view, partials) {
    if (typeof template !== 'string') {
      throw new TypeError('Invalid template! Template should be a "string" ' +
                          'but "' + typeStr(template) + '" was given as the first ' +
                          'argument for mustache#render(template, view, partials)');
    }

    return defaultWriter.render(template, view, partials);
  };

  // This is here for backwards compatibility with 0.4.x.,
  /*eslint-disable */ // eslint wants camel cased function name
  mustache.to_html = function to_html (template, view, partials, send) {
    /*eslint-enable*/

    var result = mustache.render(template, view, partials);

    if (isFunction(send)) {
      send(result);
    } else {
      return result;
    }
  };

  // Export the escaping function so that the user may override it.
  // See https://github.com/janl/mustache.js/issues/244
  mustache.escape = escapeHtml;

  // Export these mainly for testing, but also for advanced usage.
  mustache.Scanner = Scanner;
  mustache.Context = Context;
  mustache.Writer = Writer;

  return mustache;
}));


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = addCommentRequest;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commentsUtils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errors_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__comments_js__ = __webpack_require__(2);
var ajax = __webpack_require__(1);








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
    if (comments.firstChild.nodeName != "#text") {
        comments.firstElementChild.firstElementChild.firstElementChild.appendChild(Object(__WEBPACK_IMPORTED_MODULE_0__commentsUtils_js__["a" /* createCommentHTML */])(newComment));
        Object(__WEBPACK_IMPORTED_MODULE_2__comments_js__["addSingleCommentEventListener"])(newComment.id);
    } else Object(__WEBPACK_IMPORTED_MODULE_0__commentsUtils_js__["b" /* createComments */])({ 'comments': [newComment] }, message_id);

    // Cleaning input text
    var contentSelector = ".new-comment-content[data-message-id='" + message_id + "']";
    document.querySelector(contentSelector).value = "";
}

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = setEditMode;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commentsUtils_js__ = __webpack_require__(0);
var ajax = __webpack_require__(1);



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
/* 13 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: \n}\n^\n      Invalid CSS after \"}\": expected \"}\", was \"\"\n      in /home/edgar/Documents/University/lbaw1763/resources/assets/sass/style.scss (line 489, column 2)\n    at runLoaders (/home/edgar/Documents/University/lbaw1763/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/edgar/Documents/University/lbaw1763/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/edgar/Documents/University/lbaw1763/node_modules/loader-runner/lib/LoaderRunner.js:230:18\n    at context.callback (/home/edgar/Documents/University/lbaw1763/node_modules/loader-runner/lib/LoaderRunner.js:111:13)\n    at Object.asyncSassJobQueue.push [as callback] (/home/edgar/Documents/University/lbaw1763/node_modules/sass-loader/lib/loader.js:55:13)\n    at Object.done [as callback] (/home/edgar/Documents/University/lbaw1763/node_modules/neo-async/async.js:7974:18)\n    at options.error (/home/edgar/Documents/University/lbaw1763/node_modules/node-sass/lib/index.js:294:32)");

/***/ })
/******/ ]);