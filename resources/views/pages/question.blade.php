@extends('layouts.app')

@section('title', 'Main')

<?php
$message = $question->message;
$content = $message->message_version;
$author = $message->get_author();
$score = $message->score;
$answers = $question->answers();
$num_answers = $question->get_num_answers();
?>

@section('question-title')
    <section id="question" class="sweet-grey">
        <div class="container py-3">
            <header class="border-bottom sticky-top">
                <h3>{{$question->title}}</h3>
            </header>
        </div>
    </section>
@endsection

@section('content')

<section id="question-body" class="sweet-grey">
    <div class="container">
        <main  class="row" style="overflow-y:auto">
            <div class="col-md-9 p-3">
                <div class="markdown main-content display-content" style="visibility: hidden;">{{$content->content}}</div>
                <!-- Question Comments -->
                <div class="text-center">
                    <button class="btn btn-secundary my-4" type="button" data-toggle="collapse" data-target="#QuestionComments" aria-expanded="false"
                        aria-controls="QuestionComments">
                        Show Question Comments
                    </button>
                </div>
                <div class="collapse" id="QuestionComments">
                    <div class="card-footer comments-card">
                        <div class="d-flex list-group list-group-flush">
                            <div class="list-group-item px-0 bg-transparent">
                                <div class="row mx-sm-0">
                                    <div class="col-1 my-auto text-center">
                                        <p class="text-center mb-0 w-100">3</p>
                                    </div>
                                    <div class="col-11 my-1 pl-3">
                                        <p class="px-2">lorem ipsum is a filler text commonly used to demonstrate the textual
                                            elements of a graphic document or visual presentation. Replacing
                                            content with placeholder text allows designers to design the form
                                            of the content before the content itself has been produced.</p>
                                        <p class="text-right discrete">
                                            AndreFCruz
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="list-group-item px-0 bg-transparent">
                                <div class="row mx-sm-0">
                                    <div class="col-1 my-1 text-center">
                                        <p class="text-center mb-0 w-100">1</p>
                                    </div>
                                    <div class="col-11 my-1 pl-4">
                                        <p>Etiam semper lacus eu dolor dictum, a odio laoreet. Praesent luctus hendrerit
                                            dapibus.
                                        </p>
                                        <p class="text-right discrete">
                                            jflcarvalho
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="list-group-item px-0 bg-transparent">
                                <div class="row mx-sm-0">
                                    <div class="col-1 my-auto text-center">
                                        <p class="text-center mb-0 w-100">1</p>
                                    </div>
                                    <div class="col-11 my-auto pl-4">
                                        <p>This is a sample comment!! *Insert meme here*</p>
                                        <p class="text-right discrete">
                                            EdgarACarneiro
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="list-group-item px-0 bg-transparent">
                                <div class="row mx-sm-0">
                                    <div class="col-1 my-auto text-center">
                                        <p class="text-center mb-0 w-100">-1</p>
                                    </div>
                                    <div class="col-11 my-auto pl-4">
                                        <p>Etiam semper lacus eu dolor dictum, a dictum odio laoreet. Praesent luctus
                                            hendrerit dapibus. Bada badu badumtsss.</p>
                                        <p class="text-right discrete">
                                            rendoir
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- END Question comments -->
            </div>
            <div class="col-md-3 p-3 d-flex flex-column justify-content-between">
                <div>
                    <div>
                        <span class="font-weight-bold w-100">Answers: </span>
                        <span class="w-100">{{$num_answers}}</span>
                    </div>
                    <div>
                        <span class="font-weight-bold w-100">Votes: </span>
                        <span class="w-100">{{$score}}</span>
                    </div>
                    @if (Auth::check())
                      <span id="bookmark" class="{{Auth::user()->hasBookmarkOn($question->id) ? 'active' : 'inactive'}}" data-message-id="{{$question->id}}"><i class="far fa-heart"></i></span>
                    @endif
                </div>

                <div>
                    <div class="d-flex">
                        <p class="mb-0">
                            <small>Created by - &nbsp</small>
                        </p>
                        <div class="mr-auto">
                            <span>{{$author->username}}</span>
                            <span class="badge badge-success">{{$author->getBadge()}}</span>
                        </div>
                    </div>
                    <div>
                        @each('partials.category', $question->categories, 'category')
                    </div>
                </div>
            </div>
        </main>
    </div>
</section>

<section class="container">
    <div class="row">
        <div id="answers-container" class="col-md-9">
            @if (Auth::check())
            <!-- Text editor -->
            <div class="card mt-3">
                <div class="main-content m-3">
                    <textarea id="editor" class="new-answer-content" name="messageContent">
                    </textarea>
                </div>
                <div class="text-right w-100 pr-4 mb-3">
                    <button id="answer-creator" class="p-2 align-left btn btn-outline-info px-3" data-message-id="{{$question->id}}">Post answer</button>
                </div>
            </div>
            @endif

            @foreach($answers as $answer)
                @include('partials.answer', ['answer' => $answer])
            @endforeach
        </div>
        <!-- related questions -->
        <aside class="col-md-3 mt-3">
            <div class="aside-content" style="top: 15%">
                <div class="card">
                    <div class="card-header bg-transparent">Related Questions</div>
                    <div class="card-body">
                        <h5 class="card-title">Success card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Comments' modal -->
<div class="modal fade" id="deleteCommentModal" tabindex="-1" role="dialog" aria-labelledby="deleteCommentModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="deleteCommentModalLabel">Delete</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                Are you sure you want to delete this comment? <br>
                The process is irreversible.
            </div>
            <div class="modal-footer">
                <button id="delete-comment" type="button" class="btn btn-outline-danger" data-dismiss="modal">Delete</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal">Cancel</button>
            </div>
        </div>
    </div>
</div>

@include('templates.answers')
@include('templates.comments')
@include('templates.alerts')

@endsection
