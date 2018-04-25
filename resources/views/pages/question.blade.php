@extends('layouts.app')

@section('title', 'Main')

@section('content')

<?php
    $message = $question->message;
    $content = $message->message_version;
    $author = $message->get_author();
    $score = $message->score;
    $answers = $question->answers();
    $num_answers = $question->get_num_answers();
?>

<section id="question" class="sticky-top bg-light" class="sweet-grey">
    <div class="container py-3">
        <header class="border-bottom sticky-top">
            <h3>{{$question->title}}</h3>
        </header>
    </div>
</section>
<section id="question-body" class="sweet-grey">
    <div class="container">
        <main  class="row" style="overflow-y:auto">
            <div class="col-md-9 p-3">
                <div class="markdown main-content">{{$content->content}}</div>
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
                        @each('partials.category', $message->categories, 'category')
                    </div>
                </div>
            </div>
        </main>
    </div>
</section>

<div class="container">
    <div class="row">
        <div class="col-md-9">
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
</div>

@endsection
