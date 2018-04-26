var ajax = require('./ajax.js');

function addEventListeners() {
    let logout = document.querySelector('#logout');
    if(logout != null) logout.addEventListener('click', sendLogoutRequest);

    let login = document.querySelector('#login');
    if(login != null) login.addEventListener('click', sendLoginRequest);
}

function sendLogoutRequest() {
    ajax.sendAjaxRequest('get', 'logout', null, sendLogoutHandler);
}

function sendLoginRequest() {
    let form = document.querySelector('#signin_form');
    let email = form.querySelector('input[type=text]').value;
    let password = form.querySelector('input[type=password]').value;
    ajax.sendAjaxRequest('post', 'login', {email: email, password: password}, sendLoginHandler);
}

function sendRegisterRequest() {
    let form = document.querySelector('#signin_form');
    let email = form.querySelector('input[type=text]').value;
    let password = form.querySelector('input[type=password]').value;
    ajax.sendAjaxRequest('post', 'login', {email: email, password: password}, sendLoginHandler);
}

function sendLogoutHandler() {
    if (this.statusCode != 200) {
        console.error("ERROR");
    }
    window.location.reload(true);
}

function sendLoginHandler() {
    if (this.statusCode != 200) {
        console.error("ERROR");
    }
    window.location.reload(true);
}

window.addEventListener('load', addEventListeners);