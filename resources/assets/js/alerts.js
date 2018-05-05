var Mustache = require('mustache');

function displayError(errorMessage) {
    displayMessage(errorMessage, false);
}

function displaySuccess(successMessage) {
    displayMessage(successMessage, true);
}

function displayMessage(message, isSuccess) {

    let template = document.querySelector("template#alert-template").innerHTML;
    let placeholder = document.createElement("span");

    placeholder.innerHTML = Mustache.render(template, { message: errorMessage, isSucess: isSuccess });

    let header = document.querySelector("header");
    header.appendChild(placeholder);

    return placeholder;
}

module.exports = {
    displayError,
    displaySuccess
};
