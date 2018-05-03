function saveChangesEvent() {
  let save_changes = document.querySelector("#save_changes");
  let select_image = document.querySelector("#input_profile");
  let profile_img = document.querySelector("img.img-profile-big");
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

    request.open('POST', '/users/edit/image', true);
    request.setRequestHeader('X-CSRF-TOKEN', document.querySelector('meta[name="csrf-token"]').content);
    form_data.append('image', image);
    request.send(form_data);
  });
}

saveChangesEvent();
