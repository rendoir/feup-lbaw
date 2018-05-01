function saveChangesEvent() {
  let save_changes = document.querySelector("#save_changes");
  let select_image = document.querySelector("input[name=image]");
  let profile_img = document.querySelector("img.profile_img");
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
      profile_img.src = response + '?time=' + performance.now();
    });

    request.open('POST', 'profile/image/edit', true);
    request.setRequestHeader('X-CSRF-TOKEN', document.querySelector('meta[name="csrf-token"]').content);
    form_data.append('image', image);
    request.send(form_data);
  });
}

saveChangesEvent();
