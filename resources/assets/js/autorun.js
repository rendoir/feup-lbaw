let ajax = require('./ajax.js');
let Mustache = require('mustache');

let pages_num = [0,0,0,0];
let page_enum = {"nav-new" : 0, "nav-hot" : 1, "nav-voted" : 2, "nav-active" : 3};
let urls = ["/getRecentQuestions", "/getHotQuestions", "/getHighlyVotedQuestions", "/getActiveQuestions"];
let endOfPage = false;
let questionType = $('div.tab-pane.active.show')[0].id;
let url = urls[page_enum[questionType]];

// GET questions on certain page
function getQuestions(pageNum, handler) {
    defaultHandler = (data) => {
        let template = $('template#questions')[0];
        let questions = null;

        try {
            questions = JSON.parse(data.target.responseText)
        } catch (e) {}

        let mustacheRender = Mustache.render(template.innerHTML, questions);
        if(pages_num[page_enum[questionType]] == 0){
            pages_num[page_enum[questionType]]++;
            $('div#' + questionType)[0].innerHTML = mustacheRender;
        }
        else
            $('div#' + questionType)[0].innerHTML += mustacheRender;

        if(questions.questions.length != 0)
            endOfPage = false;
    };
    if(handler == null)
        handler = defaultHandler;
    ajax.sendAjaxRequest('GET', url + "?page=" + pageNum, null, handler);
}

// GET side profile info
if(window.location.pathname.match( /questions\/\D|questions(?!\/)/ ) != null){
        ajax.sendAjaxRequest('GET', "/min-profile", null,(data) => {
        let template = $('template#minProfile')[0];
        let info = null;

        try {
            info = JSON.parse(data.target.responseText)
        } catch(e) {}

        let mustacheRender = Mustache.render(template.innerHTML, info);
        template.parentElement.children[0].outerHTML = mustacheRender;
        template.parentElement.removeChild(template);
    });

    pages_num[page_enum[questionType]]++;
    getQuestions(pages_num[page_enum[questionType]], function (data) {
        let template = $('template#questions')[0];
        let questions = null;

        try {
            questions = JSON.parse(data.target.responseText)
        } catch (e) {
        }

        let mustacheRender = Mustache.render(template.innerHTML, questions);
        let nav = $('div#' + questionType)[0].innerHTML;
        $('div#nav-new')[0].innerHTML = nav;
        $('div#nav-hot')[0].innerHTML = nav;
        $('div#nav-voted')[0].innerHTML = nav;
        $('div#nav-active')[0].innerHTML = nav;
        $('div#' + questionType)[0].innerHTML = mustacheRender;
    });

    $('a#nav-new-tab')[0].addEventListener("click", function () {
        if(questionType == "nav-new")
            return;
        questionType = "nav-new";
        url = urls[page_enum[questionType]];
        if(pages_num[0] == 0){
            getQuestions(1);
        }
    });
    $('a#nav-hot-tab')[0].addEventListener("click", function () {
        if(questionType == "nav-hot")
            return;
        questionType = "nav-hot";
        url = urls[page_enum[questionType]];
        if(pages_num[1] == 0){
            getQuestions(1);
        }
    });
    $('a#nav-voted-tab')[0].addEventListener("click", function () {
        if(questionType == "nav-voted")
            return;
        questionType = "nav-voted";
        url = urls[page_enum[questionType]]
        if(pages_num[2] == 0){
            getQuestions(1);
        }
    });
    $('a#nav-active-tab')[0].addEventListener("click", function () {
        if(questionType == "nav-active")
            return;
        questionType = "nav-active";
        url = urls[page_enum[questionType]];
        if(pages_num[3] == 0){
            getQuestions(1);
        }
    });

    $(window).scroll(function () {
        if (!endOfPage) {
            if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
                endOfPage = true;
                pages_num[page_enum[questionType]]++;
                getQuestions(pages_num[page_enum[questionType]]);
            }
        }
    });
}