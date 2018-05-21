let ajax = require('./ajax.js');
let Mustache = require('mustache');

let page_num = 1;
let endOfPage = false;

// GET recent questions on certain page
function getRecentQuestions(pageNum, handler) {
    defaultHandler = (data) => {
        let template = $('template#questions')[0];
        let questions = null;

        try {
            questions = JSON.parse(data.target.responseText)
        } catch (e) {}

        let mustacheRender = Mustache.render(template.innerHTML, questions);
        $('div#nav-new')[0].innerHTML += mustacheRender;

        if(questions.questions.length != 0)
            endOfPage = false;
    };
    if(handler == null)
        handler = defaultHandler;
    ajax.sendAjaxRequest('GET', "/getRecentQuestions?page=" + pageNum, null, handler);
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
}

if(window.location.pathname.match( /questions\/recent/ ) != null) {
    getRecentQuestions(page_num, function (data) {
        let template = $('template#questions')[0];
        let questions = null;

        try {
            questions = JSON.parse(data.target.responseText)
        } catch (e) {
        }

        let mustacheRender = Mustache.render(template.innerHTML, questions);
        $('div#nav-new')[0].innerHTML = mustacheRender;
    });
}

$(window).scroll(function () {
    if (!endOfPage) {
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
            endOfPage = true;
            page_num++;
            getRecentQuestions(page_num);
        }
    }
});