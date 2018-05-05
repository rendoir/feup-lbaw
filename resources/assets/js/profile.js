var ajax = require('./ajax.js');

function uploadImage(abbr, type) {
  let save_changes = document.querySelector("#"+abbr+"-save");
  let select_image = document.querySelector("#"+abbr+"-input");
  let profile_img = document.querySelector("#"+abbr+"-img");

  if(save_changes == null || select_image == null)
    return;

  save_changes.addEventListener("click", function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    if(select_image.files.length == 0)
      return;

    let image = select_image.files[0];

    let form_data = new FormData();

    let request = new XMLHttpRequest();
    request.addEventListener('load', function(event) {
      let response = this.responseText;
      if(this.status == 200)
        profile_img.src = response + '?time=' + performance.now();
      else if(e.target.status == 403)
        window.location.replace('/login');
      else result.outerHTML = '<div id="bio-alert" class="alert alert-danger alert-dismissible" role="alert"><div class="container"><div class="d-flex justify-content-between"><div>Error changing your image.</div><button type="button" class="close" style="position: inherit; padding: inherit" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div></div></div>'
    });

    request.open('POST', '/users/edit/image/'+type, true);
    request.setRequestHeader('X-CSRF-TOKEN', document.querySelector('meta[name="csrf-token"]').content);
    form_data.append('image', image);
    request.send(form_data);
  });
}

uploadImage('bg', 'background');
uploadImage('p', 'profile');

function editBiography() {
  let bio_save = document.querySelector("#bio-save");
  if(bio_save == null) return;
  bio_save.addEventListener("click", function(e) {
    let bio_input = document.querySelector("#bio-input");
    if(bio_input == null) return;
    ajax.sendAjaxRequest('POST', '/users/edit/biography', {biography: bio_input.value}, editBiographyHandler);
  });
}

function editBiographyHandler(e) {
  let header = document.querySelector("header");
  let result = document.createElement('div');
  header.appendChild(result);
  if(e.target.status == 200)
    result.outerHTML = '<div id="bio-alert" class="alert alert-success alert-dismissible" role="alert"><div class="container"><div class="d-flex justify-content-between"><div>You changed your biography with success!</div><button type="button" class="close" style="position: inherit; padding: inherit" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div></div></div>'
  else if(e.target.status == 403)
    window.location.replace('/login');
  else result.outerHTML = '<div id="bio-alert" class="alert alert-danger alert-dismissible" role="alert"><div class="container"><div class="d-flex justify-content-between"><div>Error changing your biography.</div><button type="button" class="close" style="position: inherit; padding: inherit" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div></div></div>'
  $("#bio-alert").fadeTo(2000, 500).slideUp(500, function(){
    $(this).remove();
  });
}

editBiography();
