@extends('layouts.app')

@section('title', 'AskQuestion')

@section('content')
    <section class="container">

      <div id="submit_question_form" data-redirect="@if ($isEdition) /edit_question @else /ask_question @endif">
         {{ csrf_field() }}

        @if (($isEdition))
        <input type="hidden" name="question" class="form-control" value="{{$question_id}}">
        @endif

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
            <input type="text" name="title" class="form-control" aria-label="Username" aria-describedby="basic-addon1" data-role="tagsinput" value="{{$title}}" required>
        </div>

        <!-- Text editor -->
        <section class="main-content question-editor">
          <textarea id="editor" name="content" value="{{$content}}" required>
          </textarea>
        </section>

        <!-- Add tags and post buttons -->
        <div class="pt-4 pb-1 pl-3 ">
            <h5>
                Choose a maximum of 5 tags that suit your question!
            </h5>
        </div>
        <div class="input-group mb-3" style="height: 50px;">
            <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">Tags</span>
            </div>
            <input type="text" value="{{$tags}}" name="tags" class="form-control d-flex align-items-center py-0" data-role="tagsinput" style="display: none !important;">
        </div>

        <div class="text-right">
            <input id="submit_question" type="button" class="btn btn-lg btn-info my-4 mr-5" role="button" value="Submit">
        </div>

      </div>

    </section>
    @include('templates.alerts')

@endsection
