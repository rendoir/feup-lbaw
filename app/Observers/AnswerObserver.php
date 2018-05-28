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
        $question = $answer->question;
        $question_author = $question->message->get_author();

        // Notify Question's Author
        if ($user->id != $question_author->id)
            $question_author->notify(new NewAnswer($user, $answer, true));

        // Notify Users who Bookmarked the Question
        foreach ($question->followers as $follower) {
            $follower->notify(new NewAnswer($user, $answer, false));
        }

    }
}
