<?php
    $message = $comment->message;
    $content = $message->message_version;
    $score = $message->score;

    $question = \App\Question::find($comment->commentable_id);
    if($question == null)
      $question = \App\Question::find(\App\Answer::find($comment->commentable_id)->question_id);
?>
<a class="card my-3 question-card <?= ($question->correct_answer != null ? 'border-success' : '') ?>" href="{{ route('questions', ['id' => $question->id]) }}">
    <div class="row mx-0">
        <div class="col-sm-2 py-3 border-right rounded-left d-flex flex-column justify-content-around bg-light">
            <div>
                <div class="row mx-0">
                    <p class="text-center font-weight-bold mb-2 w-100">Votes</p>
                    <p class="text-center mb-0 w-100">{{$score}}</p>
                </div>
            </div>
        </div>
        <div class="col-sm-10">
            <div class="card-body">
                <h5 class="card-title">{{$question->title}}</h5>
                <p class="card-text"><?=substr($content->content, 0, 240)?>...</p>
            </div>
        </div>
    </div>
</a>
