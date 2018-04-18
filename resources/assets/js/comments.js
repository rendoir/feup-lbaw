ajax = require('./ajax.js');

function addEventListeners() {
    let logout = document.querySelector('.show-comments');
    if (logout != null)
        logout.addEventListener('click', sendCommentsRequest);
}

function sendCommentsRequest() {
    let message_id = document.querySelector('.answer-comments').getAttribute('data-message-id');
    let route = '/' + message_id + '/comments';
    console.log(route);

    ajax.sendAjaxRequest('get', route, { id: message_id }, commentsHandler);
}

function commentsHandler() {
    let response = JSON.parse(this.responseText);
    //console.log(response);

    getCommentsHTML(response);
}

function getCommentsHTML(comments) {

    // Direct comments container
    let secondDiv = document.createElement("div");
    secondDiv.class = "d-flex list-group list-group-flush";

    console.log("SHITEHTIEH ");
    console.log(comments);


    for (let i = 0; i < comments.length; ++i) {

        let paragraph = document.createElement("p");
        paragraph.classList.add("text-center");
        paragraph.classList.add("mb-0"); 
        paragraph.classList.add("w-100");
        paragraph.appendChild(document.createTextNode(comments[i].score));

        let votes = document.createElement("div");
        votes.classList.add("col-1");
        votes.classList.add("my-auto"); 
        votes.classList.add("text-center");
        votes.appendChild(paragraph);

        let content = document.createElement("p");
        content.classList.add("px-2");
        content.appendChild(document.createTextNode(comments[i].content.version));

        let author = document.createElement("p");
        author.classList.add("discrete");
        author.classList.add("text-right");
        author.appendChild(document.createTextNode(comments[i].author));

        let contentDiv = document.createElement("div");
        contentDiv.classList.add("pl-3");
        contentDiv.classList.add("my-1");
        contentDiv.classList.add("col-11");
        contentDiv.appendChild(content);
        contentDiv.appendChild(author);

        let forthDiv = document.createElement("div");
        forthDiv.classList.add("mx-sm-0");
        forthDiv.classList.add("row");
        forthDiv.appendChild(votes);
        forthDiv.appendChild(contentDiv);

        let thirdDiv = document.createElement("div");
        thirdDiv.class = "list-group-item px-0 bg-transparent";
        thirdDiv.appendChild(forthDiv);

        secondDiv.appendChild(thirdDiv);
    }

    console.log(secondDiv.innerHTML);

    let firstDiv = document.createElement("div");
    firstDiv.classList.add("card-footer");
    firstDiv.classList.add("comments-card");
    firstDiv.appendChild(secondDiv);
    console.log(firstDiv.outerHTML);

    let final = document.querySelector('.answer-comments');
    final.appendChild(firstDiv);


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

