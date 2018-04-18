ajax = require('./ajax.js');

function addEventListeners() {
    let logout = document.querySelector('.show-comments');
    if(logout != null)
        logout.addEventListener('click', sendCommentsRequest);
}

function sendCommentsRequest() {
    let message_id = document.querySelector('.answer-comments').getAttribute('data-message-id');
    let route = '/' + message_id + '/comments';
    console.log(route);

    ajax.sendAjaxRequest('get', route, {}, commentsHandler);
}

function commentsHandler() {
    if (this.statusCode != 200) {
        console.error("ERROR");
    }
    
    let response = JSON.parse(this.responseText)
    console.log("SHITEIHTIE");
}

function getCommentsHTML() {

    let paragraph = document.createElement("p");
    paragraph.class="text-center mb-0 w-100";
    paragraph.innerHTML = "";

    let votes = document.createElement("div");
    votes.class="col-1 my-auto text-center";
    votes.appendChild(paragraph);

    let content = document.createElement("p");
    content.class="px-2";
    content.innerHTML = "";

    let author = document.createElement("p");
    author.class="text-right discrete";
    author.innerHTML = "";

    let contentDiv = document.createElement("div");
    contentDiv.class="col-11 my-1 pl-3";
    contentDiv.appendChild(content);
    contentDiv.appendChild(author);

    let forthDiv = document.createElement("div");
    forthDiv.class="row mx-sm-0";

    ///////////

    let thirdDiv = document.createElement("div");
    thirdDiv.class="d-flex list-group list-group-flush";

    let secondDiv = document.createElement("div");
    secondDiv.class= "card-footer comments-card";
    secondDiv.appendChild(thirdDiv);

    let firstDiv = document.createElement("div");
    firstDiv.class="card-footer comments-card";
    firstDiv.appendChild(secondDiv);

    let comments = document.querySelector('.answer-comments');
    comments.appendChild(firstDiv);


        /*<div class="row mx-sm-0">
            <div class="col-1 my-auto text-center">
                <p class="text-center mb-0 w-100">3</p>
            </div>
            <div class="col-11 my-1 pl-3">
                <p class="px-2">lorem ipsum is a filler text commonly used to demonstrate the textual elements
                    of a graphic document or visual presentation. Replacing content with
                    placeholder text allows designers to design the form of the content before
                    the content itself has been produced.</p>
                <p class="text-right discrete">
                    AndreFCruz
                </p>
            </div>
        </div>*/

}

window.addEventListener('load', addEventListeners);

