<?php
    $id = $answer->id;
    $message = $answer->message;
    $content = $message->message_version;
    $author = $message->get_author();
    $score = $message->score;

    $num_comments = $answer->commentable->get_num_comments();  
?>
<!-- Answer -->
<div class="card my-3 question-answer-nlogged <? echo ($id == $question->correct_answer? 'border-success' : '')?> ">
    <div class="row mx-0">
        <div class="col-1 d-flex flex-column align-items-start">
            <div class="p-2 mt-3 mb-auto">
                <i class="fas fa-trophy"></i>
                <p class="text-center mb-0 w-100">{{$score}}</p>
            </div>
        </div>
        <div class="col-11">
            <div class="card-body">
                <p class="card-text">
                    {{$content->content}}

                    @if ($message->was_edited())
                        <span class="badge badge-light float-right mr-2 mt-3">Edited</span>
                    @endif
                </p>
            </div>
            <div class="card-footer bg-transparent d-flex justify-content-between">
                <p class="card-text mb-0">
                    <small class="text-muted">Created by - &nbsp</small>
                </p>
                <div class="mr-auto">
                    <span>{{$author->username}}</span>
                    <span class="badge badge-success">{{$author->getBadge()}}</span>
                </div>
                <div class="text-center m-auto">
                    @if ($num_comments > 0)
                        <a class="show-comments" role="button" data-toggle="collapse" href="#AnswerComments{{$id}}" 
                        aria-expanded="false" aria-controls="AnswerComments{{$id}}" data-message-id="{{$id}}">
                            Show Comments
                        </a>
                    @elseif (Auth::Check())
                    <a class="show-comments" role="button" data-toggle="collapse" href="#AnswerComments{{$id}}" 
                        aria-expanded="false" aria-controls="AnswerComments{{$id}}" data-message-id="{{$id}}">
                            Add Comment
                    </a>
                    @endif
                </div>
                <div class="ml-auto">
                    <p class="text-right mb-0">{{$num_comments}} comments</p>
                </div>
            </div>
        </div>
    </div>
    @if (Auth::check())
        <!-- COMMENTS -->
        <div class="collapse answer-comments" id="AnswerComments{{$id}}" data-message-id="{{$id}}">
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
        </div>
    @elseif ($num_comments > 0)
        <!-- COMMENTS -->
        <div class="collapse answer-comments" id="AnswerComments{{$id}}" data-message-id="{{$id}}"></div>
    @endif
</div>