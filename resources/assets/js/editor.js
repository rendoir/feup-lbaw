var editor_element = document.getElementById("editor");

if (editor_element != null) {
    
    var simplemde = new SimpleMDE({
        renderingConfig: { codeSyntaxHighlighting: true }, element: editor_element, forceSync: true, toolbar: ["bold", "italic", "strikethrough", "heading", "code", "quote", "unordered-list", "ordered-list", "link", "image", "table", "horizontal-rule", "preview",
            {
                name: "side-by-side",
                action: function customPreview(editor) {
                    var cm = editor.codemirror;
                    var wrapper = cm.getWrapperElement();
                    var main = document.querySelector(".main-content");
                    var preview = wrapper.nextSibling;
                    var toolbarButton = editor.toolbarElements["side-by-side"];
                    var useSideBySideListener = false;
                    if (/editor-preview-active-side/.test(preview.className)) {
                        preview.className = preview.className.replace(
                            /\s*editor-preview-active-side\s*/g, ""
                        );
                        main.className = main.className.replace(/\s*preview-content\s*/g, "");
                        toolbarButton.className = toolbarButton.className.replace(/\s*active\s*/g, "");
                        wrapper.className = wrapper.className.replace(/\s*CodeMirror-sided\s*/g, " ");
                    } else {
                        // When the preview button is clicked for the first time,
                        // give some time for the transition from editor.css to fire and the view to slide from right to left,
                        // instead of just appearing.
                        setTimeout(function () {
                            preview.className += " editor-preview-active-side";
                        }, 1);
                        toolbarButton.className += " active";
                        wrapper.className += " CodeMirror-sided";
                        main.className += " preview-content";
                        useSideBySideListener = true;
                    }

                    // Hide normal preview if active
                    var previewNormal = wrapper.lastChild;
                    if (/editor-preview-active/.test(previewNormal.className)) {
                        previewNormal.className = previewNormal.className.replace(
                            /\s*editor-preview-active\s*/g, ""
                        );
                        var toolbar = editor.toolbarElements.preview;
                        var toolbar_div = wrapper.previousSibling;
                        toolbar.className = toolbar.className.replace(/\s*active\s*/g, "");
                        toolbar_div.className = toolbar_div.className.replace(/\s*disabled-for-preview*/g, "");
                    }

                    var sideBySideRenderingFunction = function () {
                        preview.innerHTML = editor.options.previewRender(editor.value(), preview);
                    };

                    if (!cm.sideBySideRenderingFunction) {
                        cm.sideBySideRenderingFunction = sideBySideRenderingFunction;
                    }

                    if (useSideBySideListener) {
                        preview.innerHTML = editor.options.previewRender(editor.value(), preview);
                        cm.on("update", cm.sideBySideRenderingFunction);
                    } else {
                        cm.off("update", cm.sideBySideRenderingFunction);
                    }

                    // Refresh to fix selection being off (#309)
                    cm.refresh();
                },
                className: "fa fa-columns no-disable",
                title: "Toggle Side by Side",
            }]
    });

    simplemde.value("");
}
