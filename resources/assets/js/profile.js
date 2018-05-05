var ajax = require('./ajax.js');
var errors = require('./alerts.js');

function uploadImage(abbr, type) {
  let save_changes = document.querySelector("#" + abbr + "-save");
  let select_image = document.querySelector("#" + abbr + "-input");
  let profile_img = document.querySelector("#" + abbr + "-img");

  if (save_changes == null || select_image == null)
    return;

  save_changes.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    if (select_image.files.length == 0)
      return;

    let image = select_image.files[0];

    let form_data = new FormData();

    let request = new XMLHttpRequest();
    request.addEventListener('load', function (event) {
      let response = this.responseText;

      if (this.status == 200) {
        profile_img.src = response + '?time=' + performance.now();
      }
      else if (e.target.status == 403) {
        window.location.replace('/login');
      }
      else
        errors.displayError("Error changing your image.");
    });

    request.open('POST', '/users/edit/image/' + type, true);
    request.setRequestHeader('X-CSRF-TOKEN', document.querySelector('meta[name="csrf-token"]').content);
    form_data.append('image', image);
    request.send(form_data);
  });
}

uploadImage('bg', 'background');
uploadImage('p', 'profile');

function editBiography() {
  let bio_save = document.querySelector("#bio-save");
  if (bio_save == null) return;

  bio_save.addEventListener("click", function (e) {
    let bio_input = document.querySelector("#bio-input");
    if (bio_input == null)
      return;

    ajax.sendAjaxRequest('POST', '/users/edit/biography', { biography: bio_input.value }, editBiographyHandler);
  });
}

function editBiographyHandler(e) {
  let alert_elem;

  if (e.target.status == 200) {
    alert_elem = errors.displaySuccess("You changed your biography with success!");
  }
  else if (e.target.status == 403) {
    window.location.replace('/login');
  }
  else
    alert_elem = errors.displayError("Error changing your biography.");

  $(alert_elem).fadeTo(2000, 500).slideUp(500, function () {
    $(this).remove();
  });
}

editBiography();
