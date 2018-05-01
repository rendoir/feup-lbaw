function saveChangesEvent() {
  let save_changes = document.querySelector("#save_changes");
  let select_image = document.querySelector("input[name=image]");
  if(save_changes == null || select_image == null)
    return;
  save_changes.addEventListener("click", function() {
    if(select_image.files.length == 0)
      return;

    let image = select_image.files[0];

    let form_data = new FormData();

    let request = new XMLHttpRequest();
    request.addEventListener('load', function(event) {
      console.log("HEUHEUHEUEHUEHEUHEUEHU");
    });

    request.open('POST', 'profile/image/edit', true);
    request.setRequestHeader('X-CSRF-TOKEN', document.querySelector('meta[name="csrf-token"]').content);
    form_data.append('image', image);
    request.send(form_data);
  });
}

saveChangesEvent();
