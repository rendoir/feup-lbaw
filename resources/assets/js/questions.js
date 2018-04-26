ajax = require("./ajax.js");

function created(data){
    let reply = JSON.parse(data.target.response)
    window.location = "questions/" + reply.id;
}

function submit() {
    title = $("input[name ='title']")[0].value;
    content = $("textarea[name='content']")[0].value;
    ajax.sendAjaxRequest('POST', 'ask_question', {"title": title, "messageContent": content}, created);
}

module.exports = {
    submit
};
