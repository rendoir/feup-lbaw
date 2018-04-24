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
        <section class="mx-5">
          <textarea id="editor" name="content">
          </textarea>

          <script>
            var simplemde = new SimpleMDE({ element: document.getElementById("editor") });
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
