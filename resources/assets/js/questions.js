ajax = require("./ajax.js");

function created(data){
    let reply = JSON.parse(data.target.response)
    window.location.replace("http://localhost:8000/questions/" + reply.id);
}

function submit() {
    ajax.sendAjaxRequest('POST', 'ask_question', {"title": "ola", "messageContent": "area", "author": 25}, created);
}

module.exports = {
    submit
};