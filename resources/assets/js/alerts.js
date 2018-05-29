var Mustache = require('mustache');

function addTimedError(msg) {
  let error = displayError(msg);
  $(error).delay(4000).slideUp(500, function () {
    $(this).remove();
  });
}

function addTimedSuccess(msg) {
  let success = displaySuccess(msg);
  $(success).delay(4000).slideUp(500, function () {
    $(this).remove();
  });
}

function displayError(errorMessage) {
    return displayMessage(errorMessage, false);
}

function displaySuccess(successMessage) {
    return displayMessage(successMessage, true);
}

function displayMessage(message, isSuccess) {

    let template = document.querySelector("template#alert-template").innerHTML;
    let placeholder = document.createElement("div");

    placeholder.innerHTML = Mustache.render(template, { message: message, isSucess: isSuccess });

    let container = document.querySelector(".container-messages");
    container.appendChild(placeholder);

    return placeholder;
}

module.exports = {
    displayError,
    displaySuccess,
    addTimedError,
    addTimedSuccess
};
