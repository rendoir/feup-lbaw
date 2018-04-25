decodeHTML = function (html) {
	var txt = document.createElement('textarea');
	txt.innerHTML = html;
	return txt.value;
};

function applyMarkdown() {
  window.addEventListener("load", function() {
    let markdown_content = document.querySelectorAll(".markdown");
    for(let i = 0; i < markdown_content.length; i++) {
      markdown_content[i].innerHTML = SimpleMDE.prototype.markdown(decodeHTML(markdown_content[i].innerHTML));
    }
  });
}

applyMarkdown();
