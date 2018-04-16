function addEventListeners() {
  let logout = document.querySelector('#logout');
  if(logout != null) logout.addEventListener('click', sendLogoutRequest);

  let login = document.querySelector('#login');
  if(login != null) login.addEventListener('click', sendLoginRequest);
}

function encodeForAjax(data) {
  if (data == null) return null;
  return Object.keys(data).map(function(k){
    return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
  }).join('&');
}

function sendAjaxRequest(method, url, data, handler) {
  let request = new XMLHttpRequest();

  request.open(method, url, true);
  request.setRequestHeader('X-CSRF-TOKEN', document.querySelector('meta[name="csrf-token"]').content);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  request.addEventListener('load', handler);
  request.send(encodeForAjax(data));
}

function sendLogoutRequest() {
  sendAjaxRequest('get', 'logout', null, sendLogoutHandler);
}

function sendLoginRequest() {
  let form = document.querySelector('#signin_form');
  let email = form.querySelector('input[type=text]').value;
  let password = form.querySelector('input[type=password]').value;
  sendAjaxRequest('post', 'login', {email: email, password: password}, sendLoginHandler);
}

function sendRegisterRequest() {
  let form = document.querySelector('#signin_form');
  let email = form.querySelector('input[type=text]').value;
  let password = form.querySelector('input[type=password]').value;
  sendAjaxRequest('post', 'login', {email: email, password: password}, sendLoginHandler);
}

function sendLogoutHandler() {
  window.location.reload(true);
}

function sendLoginHandler() {
  window.location.reload(true);
}

addEventListeners();
