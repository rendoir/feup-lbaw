@extends('layouts.app')

@section('title', 'AskQuestion')

@section('content')

    <section class="container">

      <form method="post" action="javascript:questions.submit()">
         {{ csrf_field() }}

        <div class="pt-4 pb-3 pl-3">
            <h2>
                Write your Question!
            </h2>
        </div>

        <!-- Add title -->
        <div class="pt-4 pb-1 pl-3 ">
            <h5>
                Choose a suitable question title!
            </h5>
        </div>
        <div class="input-group mb-3" style="height: 50px;">
            <input type="text" name="title" class="form-control" aria-label="Username" aria-describedby="basic-addon1" data-role="tagsinput">
        </div>

        <!-- Text editor -->
        <section class="main-content">
          <textarea id="editor" name="content">
          </textarea>

          <style>
              .main-content {
                  border: 1px solid #ddd;
                  display: flex;
                  flex-flow: row wrap;
              }

              .main-content > * {
                  flex: 1 100%;
              }

              .editor-toolbar {
                  border-bottom: 1px solid #ddd;
                  border-top-style: none;
                  border-left-style: none;
                  border-right-style: none;
              }

              .CodeMirror.cm-s-paper.CodeMirror-wrap  {
                  border-style: none;
                  display: inline-block;
              }

              .editor-preview-side.editor-preview-active-side {
                  border-style: none;
                  position: initial;
                  display: inline-block;
                  min-height: 320px;
                  border-top: 1px solid #ddd;
                  background-color: #eee;
              }

              .editor-statusbar {
                  border-top: 1px solid #ddd;
              }


              @media all and (min-width: 800px) {
                  .CodeMirror.cm-s-paper.CodeMirror-wrap  { order: 1; flex: 1 50%; }
                  .editor-preview-side.editor-preview-active-side { order: 2; flex: 1 50%; border-left: 1px solid #ddd; border-top: none; }
                  .editor-statusbar  { order: 3; }
              }
          </style>

          <script>
            var simplemde = new SimpleMDE({ renderingConfig: { codeSyntaxHighlighting: true}, element: document.getElementById("editor"), forceSync: true, toolbar: ["bold", "italic", "strikethrough", "heading", "code", "quote", "unordered-list", "ordered-list", "link", "image", "table", "horizontal-rule", "preview",
          		{
          			name: "side-by-side",
          			action: function customPreview(editor){
                    var cm = editor.codemirror;
                  	var wrapper = cm.getWrapperElement();
                    var main = document.querySelector(".main-content");
                  	var preview = wrapper.nextSibling;
                  	var toolbarButton = editor.toolbarElements["side-by-side"];
                  	var useSideBySideListener = false;
                  	if(/editor-preview-active-side/.test(preview.className)) {
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
                  		setTimeout(function() {
                  			preview.className += " editor-preview-active-side";
                  		}, 1);
                  		toolbarButton.className += " active";
                  		wrapper.className += " CodeMirror-sided";
                      main.className += " preview-content";
                  		useSideBySideListener = true;
                  	}

                  	// Hide normal preview if active
                  	var previewNormal = wrapper.lastChild;
                  	if(/editor-preview-active/.test(previewNormal.className)) {
                  		previewNormal.className = previewNormal.className.replace(
                  			/\s*editor-preview-active\s*/g, ""
                  		);
                  		var toolbar = editor.toolbarElements.preview;
                  		var toolbar_div = wrapper.previousSibling;
                  		toolbar.className = toolbar.className.replace(/\s*active\s*/g, "");
                  		toolbar_div.className = toolbar_div.className.replace(/\s*disabled-for-preview*/g, "");
                  	}

                  	var sideBySideRenderingFunction = function() {
                  		preview.innerHTML = editor.options.previewRender(editor.value(), preview);
                  	};

                  	if(!cm.sideBySideRenderingFunction) {
                  		cm.sideBySideRenderingFunction = sideBySideRenderingFunction;
                  	}

                  	if(useSideBySideListener) {
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
          		}]});
            simplemde.value("");
          </script>
        </section>

        <!-- Add tags and post buttons -->
        <div class="pt-4 pb-1 pl-3 ">
            <h5>
                Identify your tags with # and separate them using spaces!
            </h5>
        </div>
        <div class="input-group mb-3" style="height: 50px;">
            <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">Tags</span>
            </div>
            <input type="text" name="tags" class="form-control" placeholder="#nodejs #html5 #css" aria-label="Username" aria-describedby="basic-addon1" pattern="(#\w+ ?\s*)*" data-role="tagsinput">
        </div>

        <div class="text-right">
            <input type="submit" class="btn btn-lg btn-info my-4 mr-5" role="button">
        </div>

      </form>

    </section>

@endsection
