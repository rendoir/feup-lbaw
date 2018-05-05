decodeHTML = function (html) {
	var txt = document.createElement('textarea');
	txt.innerHTML = html;
	return txt.value;
};

function applyMarkdown() {
	window.addEventListener("load", function () {
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
