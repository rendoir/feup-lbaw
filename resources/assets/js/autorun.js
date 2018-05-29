let ajax = require('./ajax.js');
let Mustache = require('mustache');

// GET side profile info
if(window.location.pathname.match( /questions\/\D|questions(?!\/)/ ) != null){
    let pages_num = [0,0,0,0,0];
    let page_enum = {"nav-new" : 0, "nav-hot" : 1, "nav-voted" : 2, "nav-active" : 3, "nav-search" : 4};
    let urls = ["/getRecentQuestions", "/getHotQuestions", "/getHighlyVotedQuestions", "/getActiveQuestions", "/questions/search"];
    let endOfPage = false;
    let questionType = $('div.tab-pane.active.show')[0];
    if (questionType != null)
        questionType = questionType.id;
    if(questionType == "nav-search") {
        let search_param = window.location.search;
        urls[page_enum[questionType]] += search_param;
    }
    let url = urls[page_enum[questionType]];

    // GET questions on certain page
    function getQuestions(pageNum, handler) {
        if (questionType == null)
            return null;

        defaultHandler = (data) => {
            $('div.loader-ellips').removeClass('show');
            let template = $('template#questions')[0];
            let questions = null;

            try {
                questions = JSON.parse(data.target.responseText)
            } catch (e) {}

            let mustacheRender = Mustache.render(template.innerHTML, questions);
            if(pageNum == 0){
                if(pages_num[page_enum[questionType]] == 0)
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
        $('div.loader-ellips').addClass('show');
        if(questionType == "nav-search")
            ajax.sendAjaxRequest('GET', url + "&page=" + pageNum, null, handler);
        else
            ajax.sendAjaxRequest('GET', url + "?page=" + pageNum, null, handler);
    }

    ajax.sendAjaxRequest('GET', "/min-profile", null,(data) => {
        let template = $('template#minProfile')[0];
        let info = null;
        if (template == null)
            return;

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
        window.history.pushState("", "", '/questions/recent');
        if(questionType == "nav-new")
            return;
        questionType = "nav-new";
        url = urls[page_enum[questionType]];
        if(pages_num[0] == 0){
            getQuestions(0);
        }
    });
    $('a#nav-hot-tab')[0].addEventListener("click", function () {
        window.history.pushState("", "", '/questions/hot');
        if(questionType == "nav-hot")
            return;
        questionType = "nav-hot";
        url = urls[page_enum[questionType]];
        if(pages_num[1] == 0){
            getQuestions(0);
        }
    });
    $('a#nav-voted-tab')[0].addEventListener("click", function () {
        window.history.pushState("", "", '/questions/highly-voted');
        if(questionType == "nav-voted")
            return;
        questionType = "nav-voted";
        url = urls[page_enum[questionType]]
        if(pages_num[2] == 0){
            getQuestions(0);
        }
    });
    $('a#nav-active-tab')[0].addEventListener("click", function () {
        window.history.pushState("", "", '/questions/active');
        if(questionType == "nav-active")
            return;
        questionType = "nav-active";
        url = urls[page_enum[questionType]];
        if(pages_num[3] == 0){
            getQuestions(0);
        }
    });
    let last_search;
    $('button#search-button-nav')[0].addEventListener("click", function (event) {
        event.preventDefault();
        let search = $('input#search-input-nav').val();
        url = "/questions/search?search=" + search;
        if(last_search != url) {
            $('a.nav-item.nav-link.active').removeClass("active").removeClass("show");
            $('div.tab-pane.active.show').removeClass("active").removeClass("show");
            $('div#nav-search').addClass("active").addClass("show");
            questionType = "nav-search";
            last_search = url;
            window.history.pushState("", "", '/questions?search=' + search);
            pages_num[4] = 0;
            getQuestions(0);
        }
    });
    $('input#search-input-nav').on("change paste keyup", function(event) {
        event.preventDefault();
        let search = $('input#search-input-nav').val();
        url = "/questions/search?search=" + search;
        if(last_search != url) {
            $('a.nav-item.nav-link.active').removeClass("active").removeClass("show");
            $('div.tab-pane.active.show').removeClass("active").removeClass("show");
            $('div#nav-search').addClass("active").addClass("show");
            questionType = "nav-search";
            last_search = url;
            window.history.pushState("", "", '/questions?search=' + search);
            pages_num[4] = 0;
            getQuestions(0);
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
else if(window.location.pathname.match( /questions\/\d/ ) != null) {
    let categories = $('div#categories')[0].children;
    let tags = "";
    for(var category of categories){
        tags += '[' + category.innerHTML + ']';
    }
    ajax.sendAjaxRequest('GET', "/questions/search?num_per_page=3&operator=or&search="+tags, null,(data) => {
        let template = $('template#related')[0];
        let info = null;
        if (template == null)
            return;

        try {
            info = JSON.parse(data.target.responseText)
        } catch(e) {}

        let mustacheRender = Mustache.render(template.innerHTML, info);
        template.parentElement.innerHTML = mustacheRender;
    });
}

if(window.location.pathname.match( /users\/[^\/]*(?!\/)$|users\/[^\/]*\/$/ ) != null){
    let pages_num = [0,0,0];
    let page_enum = {"nav-questions" : 0, "nav-answers" : 1, "nav-comments" : 2};
    let templates = ['template#questions', 'template#answers', 'template#comments'];
    let t = ['#total-questions', '#total-answers', '#total-comments'];
    let urls = ["/getQuestions", "/getAnswers", "/getComments"];
    let endOfPage = false;
    let questionType = $('div.tab-pane.active.show')[0];
    if (questionType != null)
        questionType = questionType.id;
    let url = urls[page_enum[questionType]];


    // GET questions on certain page
    function getQuestions(pageNum, handler) {
        if (questionType == null)
            return null;

        defaultHandler = (data) => {
            $('div.loader-ellips').removeClass('show');
            let templateQuery = templates[page_enum[questionType]];
            let template = document.querySelector(templateQuery);
            let questions = null;

            try {
                questions = JSON.parse(data.target.responseText)
            } catch (e) {}

            if(document.querySelector(t[page_enum[questionType]]).classList.contains("template-for-fill")) {
                document.querySelector(t[page_enum[questionType]]).classList.remove("template-for-fill");
                document.querySelector(t[page_enum[questionType]]).innerHTML = questions.total;
            }

            let mustacheRender = Mustache.render(template.innerHTML, questions);

            if(document.querySelector(t[page_enum[questionType]]).innerHTML > 5 * pages_num[page_enum[questionType]])
                endOfPage = false;

            if(pages_num[page_enum[questionType]] == 0){
                pages_num[page_enum[questionType]]++;
                $('div#' + questionType)[0].innerHTML = mustacheRender;
            }
            else
                $('div#' + questionType)[0].innerHTML += mustacheRender;
        };

        if(handler == null)
            handler = defaultHandler;
        $('div.loader-ellips').addClass('show');
        ajax.sendAjaxRequest('GET', "/users/" + $('h2#username')[0].innerHTML + url + "?page=" + pageNum, null, handler);
    }

    getQuestions(pages_num[page_enum[questionType]]);

    $('a#nav-questions-tab')[0].addEventListener("click", function () {
        if(questionType == "nav-questions")
            return;
        questionType = "nav-questions";
        url = urls[page_enum[questionType]];
        if(pages_num[0] == 0){
            getQuestions(0);
        }
    });
    $('a#nav-answers-tab')[0].addEventListener("click", function () {
        if(questionType == "nav-answers")
            return;
        questionType = "nav-answers";
        url = urls[page_enum[questionType]];
        if(pages_num[1] == 0){
            getQuestions(0);
        }
    });
    $('a#nav-comments-tab')[0].addEventListener("click", function () {
        if(questionType == "nav-comments")
            return;
        questionType = "nav-comments";
        url = urls[page_enum[questionType]];
        if(pages_num[2] == 0){
            getQuestions(0);
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

