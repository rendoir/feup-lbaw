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
    <section id="question" class="sweet-grey" data-message-id="{{$id}}">
        <div class="container py-3">
            <header class="border-bottom sticky-top d-flex">
                @if ($message->is_banned)
                <div class="container-messages">
                  <div>
                    <div class="alert alert-danger alert-dismissible m-0" style="width: 100%" role="alert">
                        <div class="container">
                            <div class="d-flex justify-content-between">
                            <div>Careful, this message has been banned!</div>
                            <button type="button" class="close" style="position: inherit; padding: inherit" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
                @endif
                <h3>{{$question->title}}</h3>
                @if (Auth::id() == $author->id)
                <div class="discrete ml-auto mr-1 text-center mt-auto mb-auto d-flex">
                    <form id="form_edit_question" name="edit_question" action="{{ url('edit_question') }}">
                        <input type="hidden" class="form-control" name="question_id" value="{{$id}}"></span>
                        <input type="hidden" class="form-control" name="title" value="{{$question->title}}"></span>
                        <input type="hidden" class="form-control" name="content" value="{{$content->content}}"></span>
                        <input type="hidden" class="form-control" name="tags" value="@foreach ($question->categories as $tag) {{$tag->name}} @endforeach"></span>
                        <button type="submit" class="discrete btn btn-link" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit">
                            <i class="fas fa-pencil-alt m-0"></i>
                        </button>
                    </form>
                    <button class="discrete btn btn-link" data-toggle="modal" href="#deleteQuestionModal" data-message-id='{{$id}}'>
                        <i class="far fa-trash-alt p-0" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete"></i>
                    </button>
                </div>
                @endif
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

                <div class="d-flex">
                    <p class="mb-0">
                        <small>Created by - </small>
                        <a href="/users/{{$author->username}}">{{$author->username}}</a>
                    </p>
                    <div class="mr-auto">
                        <span class="badge badge-success">{{$author->getBadge()}}</span>
                    </div>
                    <div id="categories">
                        @each('partials.category', $question->categories, 'category')
                    </div>
                </div>

                <!-- Question Comments -->
                <div class="text-center">
                    <a class="btn btn-outline-secondary my-4 show-question-comments" role="button" data-toggle="collapse" href="#MessageComments{{$id}}"
                    aria-expanded="false" aria-controls="MessageComments{{$id}}" data-message-id="{{$id}}">
                        Show Comments
                    </a>
                </div>
                <div class="collapse message-comments" id="MessageComments{{$id}}" data-message-id="{{$id}}">
                @if (Auth::check())
                    <div class="comment-creator card-footer comments-card px-0 px-sm-4 comment">
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
                </div>
                <!-- END Question comments -->
            </div>
            <div class="col-md-3 p-3">
                      <div class="mb-3">
                          <span class="font-weight-bold w-100">Answers: </span>
                          <span class="w-100">{{$num_answers}}</span>
                      </div>
                      <div class="mb-3">
                          <span class="font-weight-bold w-100">Votes: </span>
                          <span class="w-100 score">{{$score}}</span>
                      </div>
                      @if (Auth::check())
                        <?php
                          $has_bookmark = Auth::user()->hasBookmarkOn($question->id);
                          $has_report = Auth::user()->hasReportOn($message->id);
                        ?>
                        <div class="row mb-3">
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
                  @endif
                  @endif
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
            <div class="aside-content" style="top: 150px">
                <div class="text-center">
                    <h4 class="border-bottom">Related Questions</h4>
                </div>
                <div id="related-questions">
                    @include('templates.related_template')
                    @for ($i = 0; $i < 3; $i++)
                        @include('partials.related')
                    @endfor
                </div>
            </div>
        </aside>
    </div>
</section>

<!-- Question deletion modal -->
<div class="modal fade" id="deleteQuestionModal" tabindex="-1" role="dialog" aria-labelledby="deleteQuestionModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="deleteQuestionModalLabel">Delete Question</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                Are you sure you want to delete this question?<br>
                The process is irreversible and might affect other users negatively.
            </div>
            <div class="modal-footer">
                <button id="delete-question" type="button" class="btn btn-outline-danger" data-dismiss="modal">Delete</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal">Cancel</button>
            </div>
        </div>
    </div>
</div>

<!-- Answer edition' modal -->
<div class="modal fade" id="editAnswerModal" tabindex="-1" role="dialog" aria-labelledby="editAnswerModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="deleteAnswerModalLabel">Edit Answer</h4>
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
