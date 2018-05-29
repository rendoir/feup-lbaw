@extends('layouts.app')

@section('title', 'Main')

<?php
$message = $question->message;
$id = $message->id;
$content = $message->message_version;
$author = $message->get_author();
$score = $message->score;
$answers = $question->answers();
$num_answers = $question->get_num_answers();
$positive = $message->getVote();
?>

@section('question-title')
    <section id="question" class="sweet-grey" data-message-id="{{$question->id}}">
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
                    <a class="btn btn-outline-secondary my-4 show-question-comments" role="button" data-toggle="collapse" href="#MessageComments{{$id}}"
                    aria-expanded="false" aria-controls="MessageComments{{$id}}" data-message-id="{{$id}}">
                        Show Comments
                    </a>
                </div>
                <div class="collapse message-comments w-100" id="MessageComments{{$id}}" data-message-id="{{$id}}">
                @if (Auth::check())
                    <div class="comment-creator card-footer comments-card px-0 px-sm-4">
                        <div class="d-flex list-group list-group-flush">
                            <div class="list-group-item bg-transparent">
                                <div class="input-group mt-3">
                                    <input class="form-control new-comment-content" placeholder="New Comment" aria-label="New Comment" aria-describedby="basic-addon2" type="text" data-message-id="{{$id}}">
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-success new-comment-submit" type="button" data-message-id="{{$id}}">Add Comment</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                @endif
                <!-- <div class="collapse" id="QuestionComments">
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
                        </div>
                    </div> -->
                </div>
                <!-- END Question comments -->
            </div>
            <div class="col-md-3 p-3 d-flex flex-column justify-content-between">
                      <div>
                          <span class="font-weight-bold w-100">Answers: </span>
                          <span class="w-100">{{$num_answers}}</span>
                      </div>
                      <div>
                          <span class="font-weight-bold w-100">Votes: </span>
                          <span class="w-100 score">{{$score}}</span>
                      </div>
                      @if (Auth::check())
                        <?php
                          $has_bookmark = Auth::user()->hasBookmarkOn($question->id);
                          $has_report = Auth::user()->hasReportOn($message->id);
                        ?>
                        <div class="row">
                          @if (Auth::id() != $author->id)
                            <div class="col-6 text-center border-right">
                              <button class="btn btn-link report {{$has_report ? '' : 'discrete'}}" style="font-size: 1.5em;" data-toggle="tooltip" data-placement="top" data-original-title="Report" data-message_id='{{$question->id}}'>
                                  <i class="fas fa-exclamation-triangle"></i>
                              </button>
                            </div>
                            <div class="col-6 text-center">
                              <button style="font-size: 1.5em;" id="bookmark" class="btn btn-link {{$has_bookmark ? 'active' : 'inactive'}}" data-message-id="{{$question->id}}" data-toggle="tooltip" data-placement="top" data-original-title="Bookmark">
                                <i class="{{$has_bookmark ? 'fas' : 'far'}} fa-heart"></i>
                              </button>
                            </div>
                          @else
                          <div class="w-100 text-center">
                            <button style="font-size: 1.5em;" id="bookmark" class="btn btn-link {{$has_bookmark ? 'active' : 'inactive'}}" data-message-id="{{$question->id}}" data-toggle="tooltip" data-placement="top" data-original-title="Bookmark">
                              <i class="{{$has_bookmark ? 'fas' : 'far'}} fa-heart"></i>
                            </button>
                          </div>
                        @endif
                      </div>
                      @endif

                <div>
                  @if (Auth::check())
                  @if (Auth::id() != $author->id)
                  <div class="row" style="font-size: 1.5em;">
                        <div class="col-6 text-center">
                            <i class="vote fas fa-thumbs-up <?=$positive === true ? '' : 'discrete';?>" data-message_id="{{$id}}" data-positive="true"></i>
                        </div>
                        <div class="col-6 border-left text-center">
                            <i class="vote fas fa-thumbs-down <?=$positive === false ? '' : 'discrete';?>" data-message_id="{{$id}}" data-positive="false"></i>
                        </div>
                    </div>
                  </div>
                  @endif
                  @endif
                </div>

                <div>
                    <div class="d-flex">
                        <p class="mb-0">
                            <small>Created by - </small>
                            <a href="/users/{{$author->username}}">{{$author->username}}</a>
                        </p>
                        <div class="mr-auto">
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
        <div class="col-md-9">
            @if (Auth::check())
            <!-- Text editor -->
            <div class="card mt-3">
                <div class="main-content m-3">
                    <textarea id="editor" class="new-answer-content" name="messageContent">
                    </textarea>
                </div>
                <div class="text-right w-100 pr-4 mb-3">
                    <button id="answer-creator" class="p-2 align-left btn btn-outline-info px-3" data-message-id="{{$id}}">Post answer</button>
                </div>
            </div>
            @endif

            <div id="answers-container">
              @for($i = 0 ; $i < $num_answers && $i < 10; ++$i)
                  @include('partials.answer')
              @endfor
          </div>
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

<!-- Answer edition' modal -->
<div class="modal fade" id="editAnswerModal" tabindex="-1" role="dialog" aria-labelledby="editAnswerModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="deleteCommentModalLabel">Edit Answer</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <section class="main-content question-editor">
                    <textarea id="edit-editor" name="messageContent">
                    </textarea>
                </section>
            </div>
            <div class="modal-footer">
                <button id="edit-answer" type="button" class="btn btn-outline-danger" data-dismiss="modal">Edit</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal">Cancel</button>
            </div>
        </div>
    </div>
</div>

<!-- Answer deletion' modal -->
<div class="modal fade" id="deleteAnswerModal" tabindex="-1" role="dialog" aria-labelledby="deleteAnswerModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="deleteCommentModalLabel">Delete Answer</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                Are you sure you want to delete this answer? <br>
                The process is irreversible.
            </div>
            <div class="modal-footer">
                <button id="delete-answer" type="button" class="btn btn-outline-danger" data-dismiss="modal">Delete</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal">Cancel</button>
            </div>
        </div>
    </div>
</div>

<!-- Comments' modal -->
<div class="modal fade" id="deleteCommentModal" tabindex="-1" role="dialog" aria-labelledby="deleteCommentModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="deleteCommentModalLabel">Delete Comment</h4>
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
