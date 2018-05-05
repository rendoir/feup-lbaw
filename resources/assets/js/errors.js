var Mustache = require('mustache');

function displayError(errorMessage) {

    let template = document.querySelector("template#error-template").innerHTML;
    let placeholder = document.createElement("span");

    placeholder.innerHTML = Mustache.render(template, { message: errorMessage });

    let header = document.querySelector("header");
    header.appendChild(placeholder);
}

module.exports = {
    displayError
};