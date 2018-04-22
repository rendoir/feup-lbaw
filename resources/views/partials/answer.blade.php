<?php
    $message = $answer->message;
    $content = $message->message_version;
    $author = $message->get_author();
    $score = $message->score;

    $num_comments = $answer->commentable->get_num_comments();  
?>
<!-- Answer -->
<div class="card my-3 question-answer-nlogged <? echo ($answer->id == $question->correct_answer? 'border-success' : '')?> ">
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
                        <a class="show-comments" role="button" data-toggle="collapse" href="#AnswerComments{{$i}}" aria-expanded="false" aria-controls="AnswerComments{{$i}}">
                            Show Comments
                        </a>
                    @endif
                </div>
                <div class="ml-auto">
                    <p class="text-right mb-0">{{$num_comments}} comments</p>
                </div>
            </div>
        </div>
    </div>

    <!-- COMMENTS -->
    @if ($num_comments > 0)
        <div class="collapse answer-comments" id="AnswerComments{{$i}}" data-message-id="{{$answer->id}}"></div>
    @endif
</div>