<?php

namespace App\Observers;

use App\Notifications\NewAnswer;
use App\Answer;
use App\Question;

class AnswerObserver
{
    public function created(Answer $answer)
    {
        $user = $answer->message->get_author();
        $question = Question::find($answer->question_id);
        $message = $question->message;
        $author = $message->get_author();
        // foreach ($user->followers as $follower) {
            $author->notify(new NewAnswer($user, $answer));
        // }
    }
}
