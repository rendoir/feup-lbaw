function uploadProfileImage() {
  let save_changes = document.querySelector("#p-save");
  let select_image = document.querySelector("#p-input");
  let profile_img = document.querySelector("#p-img");
  if(save_changes == null || select_image == null)
    return;
  save_changes.addEventListener("click", function() {
    if(select_image.files.length == 0)
      return;

    let image = select_image.files[0];

    let form_data = new FormData();

    let request = new XMLHttpRequest();
    request.addEventListener('load', function(event) {
      let response = this.responseText;
      if(this.status == 200)
        profile_img.src = response + '?time=' + performance.now();
      else window.location.replace('/login');
    });

    request.open('POST', '/users/edit/profile_image', true);
    request.setRequestHeader('X-CSRF-TOKEN', document.querySelector('meta[name="csrf-token"]').content);
    form_data.append('image', image);
    request.send(form_data);
  });
}

uploadProfileImage();

function uploadBackgroundImage() {
  let save_changes = document.querySelector("#bg-save");
  let select_image = document.querySelector("#bg-input");
  let profile_img = document.querySelector("#bg-img");
  if(save_changes == null || select_image == null)
    return;
  save_changes.addEventListener("click", function() {
    if(select_image.files.length == 0)
      return;

    let image = select_image.files[0];

    let form_data = new FormData();

    let request = new XMLHttpRequest();
    request.addEventListener('load', function(event) {
      let response = this.responseText;
      if(this.status == 200)
        profile_img.src = response + '?time=' + performance.now();
      else window.location.replace('/login');
    });

    request.open('POST', '/users/edit/background_image', true);
    request.setRequestHeader('X-CSRF-TOKEN', document.querySelector('meta[name="csrf-token"]').content);
    form_data.append('image', image);
    request.send(form_data);
  });
}

uploadBackgroundImage();
