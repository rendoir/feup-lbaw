var Mustache = require('mustache');

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

    let header = document.querySelector("#navbar");
    header.insertAdjacentElement("afterend", placeholder);

    return placeholder;
}

module.exports = {
    displayError,
    displaySuccess
};
