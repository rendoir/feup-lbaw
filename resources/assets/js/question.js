var ajax = require('./ajax.js');

decodeHTML = function (html) {
	var txt = document.createElement('textarea');
	txt.innerHTML = html;
	return txt.value;
};

function applyMarkdown() {
	document.addEventListener("DOMContentLoaded", function () {
		let markdown_content = document.querySelectorAll(".markdown");

		let instance = new Object();
		instance.options = { renderingConfig: { codeSyntaxHighlighting: true } };

		for (let i = 0; i < markdown_content.length; i++) {
			markdown_content[i].style.visibility = "visible";
			let bound = SimpleMDE.prototype.markdown.bind(instance, decodeHTML(markdown_content[i].innerHTML));
			markdown_content[i].innerHTML = bound();
		}
	});
}

applyMarkdown();

function bookmarkEvent() {
	let bookmark = document.querySelector("#bookmark");
	if(bookmark == null) return;
	let i = bookmark.querySelector("i");
	bookmark.addEventListener("click", function() {
		let message_id = bookmark.getAttribute('data-message-id');
		let is_active = bookmark.className == 'active';
		let method = is_active ? 'delete' : 'post';
		let url = '/users/bookmarks/' + message_id;
		let data = { question_id: message_id };
		ajax.sendAjaxRequest(method, url, data, function() {
			if(this.status == 200){
				if(is_active) {
					bookmark.className = 'inactive';
					i.className = i.className.replace('fas', 'far');
				} else {
					bookmark.className = 'active';
					i.className = i.className.replace('far', 'fas');
				}
			}
	  });
	});
}

bookmarkEvent();
