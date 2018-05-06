<?php

namespace App\Http\Controllers\Question;

use App\Commentable;
use App\Message;
use App\MessageVersion;
use App\Comment;
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
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function addAnswer(Request $request)
    {
        if (!Auth::check())
            return response()->json(
                array("is_authenticated" => false)
            );

        // Placeholder for the id of the answer that is going to be created
        $answer_id = null;

        DB::transaction(function() use (&$request, &$answer_id) {
            $user_id = User::find(Auth::id())->id;
            $answer_id = Message::create(['author' => $user_id])->id;
            
            Commentable::create(['id' => $answer_id]);
            //Answer::create(['id' => $answer_id->id, 'question_id' => $request->question]);
            DB::insert("INSERT INTO answers (id, question_id) VALUES (?, ?)", [$answer_id, $request->question]);
            MessageVersion::create(['content' => $request->input('content'), 'message_id' => $answer_id]);
        });

        return response()->json(
            array(
                //"answer" => $this->getCommentJSON(Answer::find($answer_id)),
                "is_authenticated" => true
            )
        );
    }
}
