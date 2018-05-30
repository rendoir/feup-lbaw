var ajax = require('./ajax.js');
var alerts = require('./alerts.js');

function addSubmitEvent() {
  let button = document.getElementById('submit_question');
  if(button == null) return;
  button.addEventListener('click', function() {
    let form = document.getElementById('submit_question_form');
    let url = form.dataset.redirect;

    let question =  document.querySelector('input[name="question"]');
    let question_id = question == null ? null : question.value;
    let title = document.querySelector('input[name="title"]').value;
    let content = document.querySelector('textarea[name="content"]').value;
    let tags = document.querySelector('input[name="tags"]').value;

    let data = {
      question: question_id,
      title: title,
      content: content,
      tags: tags
    };

    ajax.sendAjaxRequest('post', url, data, function() {
      if(this.status == 400) {
        alerts.displayError(this.responseText);
      } else {
        let response = JSON.parse(this.responseText);
        window.location = '/questions/' + response.question;
      }
    });
  });
}

addSubmitEvent();
