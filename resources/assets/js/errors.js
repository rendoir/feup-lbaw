export function displayError(errorMessage) {

    let forthDiv = document.createElement("div");

    let span = document.createElement("span");
    let ariaSpan = document.createAttribute("aria-hidden");
    ariaSpan.value = "true";
    span.setAttributeNode(ariaSpan);
    span.innerText = errorMessage;

    let button = document.createElement("button");
    button.classList.add("close");
    button.appendChild(span);

    let typeBtn = document.createAttribute("type");
    typeBtn.value = "button";
    button.setAttributeNode(typeBtn);

    let styleBtn = document.createAttribute("style");
    styleBtn.value = "position: inherit; padding: inherit";
    button.setAttributeNode(styleBtn);

    let dismissBtn = document.createAttribute("data-dismiss");
    dismissBtn.value = "alert";
    button.setAttributeNode(dismissBtn);

    let ariaBtn = document.createAttribute("aria-label");
    ariaBtn.value = "Close";
    button.setAttributeNode(ariaBtn);

    let thirdDiv = document.createElement("div");
    thirdDiv.classList.add("d-flex");
    thirdDiv.classList.add("justify-content-between");
    thirdDiv.appendChild(forthDiv);
    thirdDiv.appendChild(button);

    let secondDiv = document.createElement("div");
    secondDiv.classList.add("container");
    secondDiv.appendChild(thirdDiv);

    let firstDiv = document.createElement("div");
    firstDiv.classList.add("alert");
    firstDiv.classList.add("alert-danger");
    firstDiv.classList.add("alert-dismissible");
    firstDiv.appendChild(secondDiv);

    let roleDiv = document.createAttribute("role");
    roleDiv.value = "alert";
    firstDiv.setAttributeNode(roleDiv);

    document.querySelector('header').appendChild(firstDiv);
}