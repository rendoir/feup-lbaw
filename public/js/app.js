function addEventListeners() {
  let logout = document.querySelector('#logout');
  if(logout != null) logout.addEventListener('click', sendLogoutRequest);

  let login = document.querySelector('#login');
  if(login != null) login.addEventListener('click', sendLoginRequest);

  let signup = document.querySelector('#signup');
  if(signup != null) signup.addEventListener('click', sendSignupRequest);
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

function sendSignupRequest() {
  let form = document.querySelector('#signup_form');
  let name = form.querySelector('input[name=name]').value;
  let email = form.querySelector('input[name=email]').value;
  let password = form.querySelector('input[name=password]').value;
  let password_confirmation = form.querySelector('input[name=password_confirmation]').value;
  sendAjaxRequest('post', 'register', {name: name, email: email, password: password, password_confirmation: password_confirmation}, sendSignupHandler);
}

function sendLogoutHandler() {
  window.location.reload(true);
}

function sendLoginHandler() {
  window.location.reload(true);
}

function sendSignupHandler() {
  window.location.replace("/questions");
  console.log("REGISTERED!!!");
}

addEventListeners();
