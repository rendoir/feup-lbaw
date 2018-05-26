<?php

namespace App\Http\Controllers\Question;

use App\Commentable;
use App\Message;
use App\MessageVersion;
use App\Question;
use App\Answer;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

class AnswersController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Answers Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles getting all the answers regarding a question
    |
    */

    /**
     * @param $comment
     * @return array
     */
    private function getAnswerJSON($answer)
    {
        $message = $answer->message;
        $content = $message->message_version;
        $author = $message->get_author();
        $positive = $message->getVote();
        $correct = $answer->question->correct_answer == $answer->id ? 'border-success' : '';

        return array(
            "id" => $answer->id,
            "author" => $author->username,
            "score" => $message->score,
            "was_edited" => $message->was_edited(),
            "is_owner" => ($author->id == Auth::id()),
            "num_comments" => $answer->num_comments(),
            "discrete_p" => $positive === true ? '' : 'discrete',
            "discrete_n" => $positive === false ? '' : 'discrete',
            'correct' => $correct,
            'author_badge' => $author->getBadge(),
            "content" => array (
                "version" => $content->content,
                "creation_time" => $content->creation_time,
                "author" => ($content->moderator_id != null? $content->moderator_id : $content->author)
            )
        );
    }

    public function getAnswers(Request $request) {
        $answers = Question::find($request->id)->answers();

        $answers_array = array();

        foreach ($answers as $answer)
            array_push($answers_array, $this->getAnswerJSON($answer));

        $result = array("answers" => $answers_array, "is_authenticated" => Auth::check());

        return response()->json($result);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function addAnswer(Request $request)
    {
        if (!Auth::check())
            return response()->json(
                array("is_authenticated" => false)
            );

        // Placeholder for future variables
        $answer_id = null;
        $answer = null;

        DB::transaction(function() use (&$request, &$answer_id, &$answer) {
            $user_id = User::find(Auth::id())->id;
            $answer_id = Message::create(['author' => $user_id])->id;

            Commentable::create(['id' => $answer_id]);
            $answer = Answer::create(['id' => $answer_id, 'question_id' => $request->question]);
            MessageVersion::create(['content' => $request->input('content'), 'message_id' => $answer_id]);
        });

        return response()->json(
            array(
                "answer" => $this->getAnswerJSON($answer),
                "is_authenticated" => true
            )
        );
    }
}
