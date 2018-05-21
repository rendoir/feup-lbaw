let ajax = require('./ajax.js');
let Mustache = require('mustache');

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
    ajax.sendAjaxRequest('GET', "/getRecentQuestions", null, (data) => {
        let template = $('template#questions')[0];
        let questions = null;

        try {
            questions = JSON.parse(data.target.responseText)
        } catch(e) {}

        let mustacheRender = Mustache.render(template.innerHTML, questions);
        $('div#nav-new')[0].innerHTML = mustacheRender;
    });
}

