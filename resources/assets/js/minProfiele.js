let ajax = require('./ajax.js');
let Mustache = require('mustache');

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