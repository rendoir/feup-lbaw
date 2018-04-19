@extends('layouts.app')

@section('title', 'AskQuestion')

@section('content')

    <div class="pt-4 pb-3 pl-3">
        <h2>
            Write your Question!
        </h2>
    </div>

    <section id="question-editor" class="mx-5">

        <!-- Add tags and post buttons -->
        <div class="pt-4 pb-1 pl-3 ">
            <h5>
                Identify your tags with # and separate them using commas!
            </h5>
        </div>
        <div class="input-group mb-3" style="height: 50px;">
            <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">Tags</span>
            </div>
            <input type="text" class="form-control" value="nodejs,html5,css" aria-label="Username" aria-describedby="basic-addon1" pattern="(#\w+,?\s*)*" data-role="tagsinput">
        </div>

        <div class="text-right">
            <a class="btn btn-lg btn-info my-4 mr-5 " href="question.html" role="button">Post your Question</a>
        </div>
    </section>

@endsection