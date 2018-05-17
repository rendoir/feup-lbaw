function tagSearchEvent() {
  let search = document.getElementById("tag_search");
  if (search == null) return;
  let tags = document.querySelectorAll(".tagcloud ul li a");

  search.addEventListener("input", function() {
    let pattern = new RegExp(search.value, 'i');
    for(let i = 0; i < tags.length; i++) {
      if(!pattern.test(tags[i].innerHTML)) {
        tags[i].parentElement.style.display = "none";
      } else {
        tags[i].parentElement.style.display = "inline-block";
      }
    }
  });
}

tagSearchEvent();
